import { ICommonConfiguration, eArbitrumNetwork, eAvalancheNetwork, eEthereumNetwork, eFantomNetwork, ePolygonNetwork } from '../../helpers/types';
import {
  MOCK_CHAINLINK_AGGREGATORS_PRICES,
  ZERO_ADDRESS,
  oneEther,
  oneRay,
} from '../../helpers/constants';

// ----------------
// PROTOCOL GLOBAL PARAMS 
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons',
  ATokenNamePrefix: 'UwU interest bearing',
  StableDebtTokenNamePrefix: 'UwU stable debt bearing',
  VariableDebtTokenNamePrefix: 'UwU variable debt bearing',
  SymbolPrefix: '',
  ProviderId: 0, // Overriden in index.ts
  OracleQuoteCurrency: 'ETH',
  // OracleQuoteCurrency: 'FTM',
  OracleQuoteUnit: oneEther.toString(),
  ProtocolGlobalParams: {
    TokenDistributorPercentageBase: '10000',
    MockUsdPriceInWei: '5848466240000000',
    UsdAddress: '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96',
    NilAddress: '0x0000000000000000000000000000000000000000',
    OneAddress: '0x0000000000000000000000000000000000000001',
    AaveReferral: '0',
  },

  // ----------------
  // COMMON PROTOCOL PARAMS ACROSS POOLS AND NETWORKS
  // ----------------

  Mocks: {
    AllAssetsInitialPrices: {
      ...MOCK_CHAINLINK_AGGREGATORS_PRICES,
    },
  }, 
  // TODO: reorg alphabetically, checking the reason of tests failing
  LendingRateOracleRatesCommon: {
    DAI: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    USDC: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    FRAX: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    WETH: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    WBTC: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    SPELL: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    SIFU: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    MIM: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    // LUSD: {
    //   borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    // },
    CRV: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    CVX_WETH: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
  },
  // ----------------
  // COMMON PROTOCOL ADDRESSES ACROSS POOLS
  // ----------------

  // If PoolAdmin/emergencyAdmin is set, will take priority over PoolAdminIndex/emergencyAdminIndex
  PoolAdmin: {
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.buidlerevm]: undefined,
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.hardhat]: undefined,
    [eEthereumNetwork.kovan]: undefined,
    [eEthereumNetwork.ropsten]: undefined,
    [eEthereumNetwork.main]: undefined,
    [eEthereumNetwork.tenderly]: undefined,
    [eFantomNetwork.fantom]: undefined,
    [ePolygonNetwork.matic]: undefined,
  },
  PoolAdminIndex: 0,
  EmergencyAdmin: {
    [eEthereumNetwork.hardhat]: undefined,
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.buidlerevm]: undefined,
    [eEthereumNetwork.kovan]: undefined,
    [eEthereumNetwork.ropsten]: undefined,
    [eEthereumNetwork.main]: undefined,
    [eEthereumNetwork.tenderly]: undefined,
    [eFantomNetwork.fantom]: undefined,
    [ePolygonNetwork.matic]: undefined,
  },
  EmergencyAdminIndex: 1,
  ProviderRegistry: {
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  ProviderRegistryOwner: {
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  LendingRateOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  LendingPoolCollateralManager: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  LendingPoolConfigurator: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  LendingPool: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  WethGateway: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  TokenDistributor: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  AaveOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  FallbackOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '0x9D274c3b5E380Fc92A1eEaC31193DF03bA2aaB1e',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  ChainlinkAggregator: {
    [eEthereumNetwork.coverage]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.buidlerevm]: {},
    [ePolygonNetwork.matic]: {},
    [eArbitrumNetwork.arbitrum]: {},
    [eFantomNetwork.fantom]: {},
    [eEthereumNetwork.kovan]: {},
    [eEthereumNetwork.ropsten]: {},
    [eEthereumNetwork.main]: {
      DAI: '0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9',
      USDC: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
      FRAX: '0xb9e1e3a9feff48998e45fa90847ed4d467e8bcfd',
      WETH: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
      WBTC: '0xf4030086522a5beea4988f8ca5b36dbc97bee88c',
      SPELL: '0x8c110b94c5f1d347facf5e1e938ab2db60e3c9a8',
      MIM: '0x7a364e8770418566e3eb2001a96116e6138eb32f',
      // LUSD: ZERO_ADDRESS,
      CRV: '0xcd627aa160a6fa45eb793d19ef54f5062f20f33f',
      SIFU: ZERO_ADDRESS,
      CVX_WETH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.tenderly]: {},
  },
  ReserveAssets: {
    [eEthereumNetwork.coverage]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.buidlerevm]: {},
    [eEthereumNetwork.main]: {},
    [eEthereumNetwork.kovan]: {},
    [eEthereumNetwork.ropsten]: {},
    [eEthereumNetwork.tenderly]: {},
    [eFantomNetwork.ftmTestnet]: {},
    [ePolygonNetwork.matic]: {},
  },
  ReservesConfig: {},
  ATokenDomainSeparator: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  WETH: {
    [eEthereumNetwork.coverage]: '', // deployed in local evm
    [eEthereumNetwork.hardhat]: '', // deployed in local evm
    [eEthereumNetwork.buidlerevm]: '', // deployed in local evm
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: ''
  },
  WrappedNativeToken: {
    [eEthereumNetwork.coverage]: '', // deployed in local evm
    [eEthereumNetwork.hardhat]: '', // deployed in local evm
    [eEthereumNetwork.buidlerevm]: '', // deployed in local evm
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  ReserveFactorTreasuryAddress: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '0x2f3273C5147F9f177086d3DaDf6F7C1bAC2EAD1E',
    [eEthereumNetwork.tenderly]: '',
    [eFantomNetwork.fantom]: '',
    [ePolygonNetwork.matic]: '',
  },
  IncentivesController: {
    [ePolygonNetwork.matic]: ZERO_ADDRESS,
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
    [eEthereumNetwork.buidlerevm]: ZERO_ADDRESS,
    [eEthereumNetwork.kovan]: ZERO_ADDRESS,
    [eEthereumNetwork.ropsten]: ZERO_ADDRESS,
    [eEthereumNetwork.main]: '0x5fBE9907661773494B10FFB8920eeFE0F5092018',
    [eEthereumNetwork.tenderly]: ZERO_ADDRESS,
    [eFantomNetwork.fantom]: ZERO_ADDRESS,
  },
};
