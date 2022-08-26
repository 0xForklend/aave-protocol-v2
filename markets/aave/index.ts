import { IAaveConfiguration, eArbitrumNetwork, eEthereumNetwork, eFantomNetwork, ePolygonNetwork } from '../../helpers/types';
import {
  strategyCRV,
  strategyCVX_WETH,
  strategyDAI,
  strategyFRAX,
  strategyLUSD,
  strategyMIM,
  strategySIFU,
  strategySPELL,
  strategyUSDC,
  strategyWBTC,
  strategyWETH,
} from './reservesConfigs';

import { CommonsConfig } from './commons';
import { ZERO_ADDRESS } from '../../helpers/constants';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const AaveConfig: IAaveConfiguration = {
  ...CommonsConfig,
  MarketId: 'UwU genesis market',
  ProviderId: 1,
  ReservesConfig: {
    DAI: strategyDAI,
    USDC: strategyUSDC,
    FRAX: strategyFRAX,
    WETH: strategyWETH,
    WBTC: strategyWBTC,
    SPELL: strategySPELL,
    SIFU: strategySIFU,
    MIM: strategyMIM,
    // LUSD: strategyLUSD,
    CRV: strategyCRV,
    CVX_WETH: strategyCVX_WETH,
  },
  ReserveAssets: {
    [ePolygonNetwork.matic]: {},
    [eEthereumNetwork.buidlerevm]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.coverage]: {},
    [eArbitrumNetwork.arbitrum]: {},
    [eFantomNetwork.fantom]: {},
    [eEthereumNetwork.kovan]: {},
    [eEthereumNetwork.ropsten]: { },
    [eEthereumNetwork.main]: {
      DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
      USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      FRAX: '0x853d955acef822db058eb8505911ed77f175b99e',
      WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      SPELL: '0x090185f2135308bad17527004364ebcc2d37e5f6',
      SIFU: '0x29127fe04ffa4c32acac0ffe17280abd74eac313',
      MIM: '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3',
      // LUSD: '0x5f98805a4e8be255a32880fdec7f6728c6568ba0',
      CRV: '0xd533a949740bb3306d119cc777fa900ba034cd52',
      CVX_WETH: '0x3A283D9c08E8b55966afb64C515f5143cf907611',
    },
    [eEthereumNetwork.tenderly]: {},
  },
};

export default AaveConfig;
