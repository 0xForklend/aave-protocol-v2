import { ConfigNames, loadPoolConfig } from '../../helpers/configuration';
import {
  deployATokenImplementations,
  deployATokensAndRatesHelper,
  deployLendingPool,
  deployLendingPoolConfigurator,
  deployStableAndVariableTokensHelper,
} from '../../helpers/contracts-deployments';
import {
  getFirstSigner,
  getLendingPool,
  getLendingPoolAddressesProvider,
  getLendingPoolConfiguratorProxy,
} from '../../helpers/contracts-getters';

import { eContractid } from '../../helpers/types';
import { insertContractAddressInDb } from '../../helpers/contracts-helpers';
import { task } from 'hardhat/config';
import { waitForTx } from '../../helpers/misc-utils';

task('dev:deploy-lending-pool', 'Deploy lending pool for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    await localBRE.run('set-DRE');
    const deployer = await getFirstSigner();
    const addressesProvider = await getLendingPoolAddressesProvider();
    const poolConfig = loadPoolConfig(pool);

    const lendingPoolImpl = await deployLendingPool(verify);

    // Set lending pool impl to Address Provider
    await waitForTx(
      await addressesProvider.setLendingPoolImpl(lendingPoolImpl.address, {
        nonce: await deployer.getTransactionCount('pending'),
      })
    );

    const address = await addressesProvider.getLendingPool();
    const lendingPoolProxy = await getLendingPool(address);

    await insertContractAddressInDb(eContractid.LendingPool, lendingPoolProxy.address);

    const lendingPoolConfiguratorImpl = await deployLendingPoolConfigurator(verify);

    // Set lending pool conf impl to Address Provider
    await waitForTx(
      await addressesProvider.setLendingPoolConfiguratorImpl(lendingPoolConfiguratorImpl.address, {
        nonce: await deployer.getTransactionCount('pending'),
      })
    );

    const lendingPoolConfiguratorProxy = await getLendingPoolConfiguratorProxy(
      await addressesProvider.getLendingPoolConfigurator()
    );
    await insertContractAddressInDb(
      eContractid.LendingPoolConfigurator,
      lendingPoolConfiguratorProxy.address
    );

    // Deploy deployment helpers
    await deployStableAndVariableTokensHelper(
      [lendingPoolProxy.address, addressesProvider.address],
      verify
    );
    await deployATokensAndRatesHelper(
      [lendingPoolProxy.address, addressesProvider.address, lendingPoolConfiguratorProxy.address],
      verify
    );
    await deployATokenImplementations(pool, poolConfig.ReservesConfig, verify);
  });
