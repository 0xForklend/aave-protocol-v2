import {
  deployLendingPoolAddressesProvider,
  deployLendingPoolAddressesProviderRegistry,
} from '../../helpers/contracts-deployments';

import { AaveConfig } from '../../markets/aave';
import { getEthersSigners } from '../../helpers/contracts-helpers';
import { getFirstSigner } from '../../helpers/contracts-getters';
import { task } from 'hardhat/config';
import { waitForTx } from '../../helpers/misc-utils';

task(
  'dev:deploy-address-provider',
  'Deploy address provider, registry and fee provider for dev enviroment'
)
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, localBRE) => {
    await localBRE.run('set-DRE');
    const deployer = await getFirstSigner();
    const admin = await (await getEthersSigners())[0].getAddress();

    const addressesProvider = await deployLendingPoolAddressesProvider(AaveConfig.MarketId, verify);
    await waitForTx(
      await addressesProvider.setPoolAdmin(admin, {
        nonce: await deployer.getTransactionCount('pending'),
      })
    );
    await waitForTx(
      await addressesProvider.setEmergencyAdmin(admin, {
        nonce: await deployer.getTransactionCount('pending'),
      })
    );

    const addressesProviderRegistry = await deployLendingPoolAddressesProviderRegistry(verify);
    await waitForTx(
      await addressesProviderRegistry.registerAddressesProvider(addressesProvider.address, 1, {
        nonce: await deployer.getTransactionCount('pending'),
      })
    );
  });
