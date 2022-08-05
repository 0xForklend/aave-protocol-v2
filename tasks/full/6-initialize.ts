import { ConfigNames, getTreasuryAddress, loadPoolConfig } from '../../helpers/configuration';
import { ICommonConfiguration, eNetwork } from '../../helpers/types';
import {
  authorizeWETHGateway,
  deployLendingPoolCollateralManager,
  deployUiPoolDataProviderV2,
  deployWalletBalancerProvider,
} from '../../helpers/contracts-deployments';
import { chainlinkAggregatorProxy, chainlinkEthUsdAggregatorProxy } from '../../helpers/constants';
import { configureReservesByHelper, initReservesByHelper } from '../../helpers/init-helpers';
import {
  getAaveProtocolDataProvider,
  getLendingPoolAddressesProvider,
} from '../../helpers/contracts-getters';
import { getFirstSigner, getWETHGateway } from '../../helpers/contracts-getters';
import { notFalsyOrZeroAddress, waitForTx } from '../../helpers/misc-utils';

import { exit } from 'process';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { task } from 'hardhat/config';

task('full:initialize-lending-pool', 'Initialize lending pool configuration.')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    try {
      // await localBRE.run('set-DRE');
      // const network = <eNetwork>localBRE.network.name;
      // const poolConfig = loadPoolConfig(pool);
      // const {
      //   ATokenNamePrefix,
      //   StableDebtTokenNamePrefix,
      //   VariableDebtTokenNamePrefix,
      //   SymbolPrefix,
      //   ReserveAssets,
      //   ReservesConfig,
      //   LendingPoolCollateralManager,
      //   WethGateway,
      //   IncentivesController,
      // } = poolConfig as ICommonConfiguration;

      // const reserveAssets = await getParamPerNetwork(ReserveAssets, network);
      // const incentivesController = await getParamPerNetwork(IncentivesController, network);
      // const addressesProvider = await getLendingPoolAddressesProvider();

      // const testHelpers = await getAaveProtocolDataProvider();

      // const admin = await addressesProvider.getPoolAdmin();
      // const oracle = await addressesProvider.getPriceOracle();

      // if (!reserveAssets) {
      //   throw 'Reserve assets is undefined. Check ReserveAssets configuration at config directory';
      // }

      // const treasuryAddress = await getTreasuryAddress(poolConfig);

      // await initReservesByHelper(
      //   ReservesConfig,
      //   reserveAssets,
      //   ATokenNamePrefix,
      //   StableDebtTokenNamePrefix,
      //   VariableDebtTokenNamePrefix,
      //   SymbolPrefix,
      //   admin,
      //   treasuryAddress,
      //   incentivesController,
      //   pool,
      //   verify
      // );
      // await configureReservesByHelper(ReservesConfig, reserveAssets, testHelpers, admin);

      // let collateralManagerAddress = await getParamPerNetwork(
      //   LendingPoolCollateralManager,
      //   network
      // );
      // if (!notFalsyOrZeroAddress(collateralManagerAddress)) {
      //   const collateralManager = await deployLendingPoolCollateralManager(verify);
      //   collateralManagerAddress = collateralManager.address;
      // }
      // // Seems unnecessary to register the collateral manager in the JSON db

      // console.log(
      //   '\tSetting lending pool collateral manager implementation with address',
      //   collateralManagerAddress
      // );
      // await waitForTx(
      //   await addressesProvider.setLendingPoolCollateralManager(collateralManagerAddress)
      // );

      // console.log(
      //   '\tSetting AaveProtocolDataProvider at AddressesProvider at id: 0x01',
      //   collateralManagerAddress
      // );
      // const aaveProtocolDataProvider = await getAaveProtocolDataProvider();
      // await waitForTx(
      //   await addressesProvider.setAddress(
      //     '0x0100000000000000000000000000000000000000000000000000000000000000',
      //     aaveProtocolDataProvider.address
      //   )
      // );

      // await deployWalletBalancerProvider(verify);

      // const uiPoolDataProvider = await deployUiPoolDataProviderV2(
      //   chainlinkAggregatorProxy[localBRE.network.name],
      //   chainlinkEthUsdAggregatorProxy[localBRE.network.name],
      //   verify
      // );
      // console.log('UiPoolDataProvider deployed at:', uiPoolDataProvider.address);

      // const lendingPoolAddress = await addressesProvider.getLendingPool();

      // let gateWay = getParamPerNetwork(WethGateway, network);
      // if (!notFalsyOrZeroAddress(gateWay)) {
      //   gateWay = (await getWETHGateway()).address;
      // }
      // console.log('GATEWAY', gateWay);
      /*
      UiPoolDataProvider deployed at: 0xD00C0F560ef543028B81Fdf96034bEDbaD06Ec26
      GATEWAY 0x229DDD5Afa33Cc825cBBA11c9673eC90bf10460f
      AuthorizeWETHGateway 0x229DDD5Afa33Cc825cBBA11c9673eC90bf10460f 0xD9fec257AcCf436433A2D702F73e7D7F748f1B44
      */
      const gateWay = '0x229DDD5Afa33Cc825cBBA11c9673eC90bf10460f';
      const lendingPoolAddress = '0xD9fec257AcCf436433A2D702F73e7D7F748f1B44';
      await authorizeWETHGateway(gateWay, lendingPoolAddress);
    } catch (err) {
      console.error(err);
      exit(1);
    }
  });
