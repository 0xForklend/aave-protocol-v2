import { IMaticConfiguration, ePolygonNetwork } from '../../helpers/types';
import {
  strategyAAVE,
  strategyDAI,
  strategyFRAX,
  strategyMATIC,
  strategyUSDC,
  strategyUSDT,
  strategyWBTC,
  strategyWETH,
  strategyWFTM,
} from './reservesConfigs';

import { CommonsConfig } from './commons';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const MaticConfig: IMaticConfiguration = {
  ...CommonsConfig,
  MarketId: 'Matic Market',
  ProviderId: 3,
  ReservesConfig: {
    DAI: strategyDAI,
    USDC: strategyUSDC,
    FRAX: strategyFRAX,
    WFTM: strategyWFTM,
    WETH: strategyWETH,
    WBTC: strategyWBTC,
  },
  ReserveAssets: {
    [ePolygonNetwork.matic]: {
      DAI: '0xFC539A559e170f848323e19dfD66007520510085',
      USDC: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7',
      FRAX: '0x00DBeB1e45485d53DF7C2F0dF1Aa0b6Dc30311d3',
      WETH: '0xB4D962106206D88372C542C8ffeCACaefb728A60',
      WBTC: '0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6',
    },
    [ePolygonNetwork.mumbai]: {
      // Mock tokens with a simple "mint" external function, except wmatic
      DAI: '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
      USDC: '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e',
      USDT: '0xBD21A10F619BE90d6066c941b04e340841F1F989',
      WBTC: '0x0d787a4a1548f673ed375445535a6c7A1EE56180',
      WETH: '0x3C68CE8504087f89c640D02d133646d98e64ddd9',
      WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    },
  },
};

export default MaticConfig;
