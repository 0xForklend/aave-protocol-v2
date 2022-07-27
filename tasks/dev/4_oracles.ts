import { ConfigNames, getQuoteCurrency, loadPoolConfig } from '../../helpers/configuration';
import { ICommonConfiguration, TokenContractId, iAssetBase } from '../../helpers/types';
import {
  deployAaveOracle,
  deployLendingRateOracle,
  deployPriceOracle,
} from '../../helpers/contracts-deployments';
import {
  deployAllMockAggregators,
  setInitialAssetPricesInOracle,
  setInitialMarketRatesInRatesOracleByHelper,
} from '../../helpers/oracles-helpers';
import { getAllAggregatorsAddresses, getAllTokenAddresses } from '../../helpers/mock-helpers';
import {
  getAllMockedTokens,
  getFirstSigner,
  getLendingPoolAddressesProvider,
  getPairsTokenAggregator,
} from '../../helpers/contracts-getters';

import { task } from 'hardhat/config';
import { waitForTx } from '../../helpers/misc-utils';

task('dev:deploy-oracles', 'Deploy oracles for dev environment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    await localBRE.run('set-DRE');
    const poolConfig = loadPoolConfig(pool);
    const {
      Mocks: { AllAssetsInitialPrices },
      ProtocolGlobalParams: { UsdAddress, MockUsdPriceInWei },
      LendingRateOracleRatesCommon,
      OracleQuoteCurrency,
      OracleQuoteUnit,
    } = poolConfig as ICommonConfiguration;

    const defaultTokenList = {
      ...Object.fromEntries(Object.keys(TokenContractId).map((symbol) => [symbol, ''])),
      USD: UsdAddress,
    } as iAssetBase<string>;
    const deployer = await getFirstSigner();
    const mockTokens = await getAllMockedTokens();
    const mockTokensAddress = Object.keys(mockTokens).reduce<iAssetBase<string>>((prev, curr) => {
      prev[curr as keyof iAssetBase<string>] = mockTokens[curr].address;
      return prev;
    }, defaultTokenList);
    const addressesProvider = await getLendingPoolAddressesProvider();
    const admin = await addressesProvider.getPoolAdmin();

    const fallbackOracle = await deployPriceOracle(verify);
    await waitForTx(
      await fallbackOracle.setEthUsdPrice(MockUsdPriceInWei, {
        nonce: await deployer.getTransactionCount('pending'),
      })
    );
    await setInitialAssetPricesInOracle(AllAssetsInitialPrices, mockTokensAddress, fallbackOracle);

    const mockAggregators = await deployAllMockAggregators(AllAssetsInitialPrices, verify);

    const allTokenAddresses = getAllTokenAddresses(mockTokens);
    const allAggregatorsAddresses = getAllAggregatorsAddresses(mockAggregators);

    const [tokens, aggregators] = getPairsTokenAggregator(
      allTokenAddresses,
      allAggregatorsAddresses,
      OracleQuoteCurrency
    );

    await deployAaveOracle(
      [
        tokens,
        aggregators,
        fallbackOracle.address,
        await getQuoteCurrency(poolConfig),
        OracleQuoteUnit,
      ],
      verify
    );
    await waitForTx(
      await addressesProvider.setPriceOracle(fallbackOracle.address, {
        nonce: await deployer.getTransactionCount('pending'),
      })
    );

    const lendingRateOracle = await deployLendingRateOracle(verify);
    await waitForTx(
      await addressesProvider.setLendingRateOracle(lendingRateOracle.address, {
        nonce: await deployer.getTransactionCount('pending'),
      })
    );

    const { USD, ...tokensAddressesWithoutUsd } = allTokenAddresses;
    const allReservesAddresses = {
      ...tokensAddressesWithoutUsd,
    };
    await setInitialMarketRatesInRatesOracleByHelper(
      LendingRateOracleRatesCommon,
      allReservesAddresses,
      lendingRateOracle,
      admin
    );
  });
