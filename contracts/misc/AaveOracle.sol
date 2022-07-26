// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {IPriceOracleGetter} from '../interfaces/IPriceOracleGetter.sol';
import {Ownable} from '../dependencies/openzeppelin/contracts/Ownable.sol';
import {IChainlinkAggregator} from '../interfaces/IChainlinkAggregator.sol';

contract AaveOracle is IPriceOracleGetter, Ownable {
  event BaseCurrencySet(address indexed baseCurrency, uint256 baseCurrencyUnit);
  event AssetSourceUpdated(address indexed asset, address indexed source);

  mapping(address => IChainlinkAggregator) private assetsSources;
  address public immutable BASE_CURRENCY;
  uint256 public immutable BASE_CURRENCY_UNIT;

  constructor(
    address[] memory assets,
    address[] memory sources,
    address fallbackOracle,
    address baseCurrency,
    uint256 baseCurrencyUnit
  ) public {
    _setAssetsSources(assets, sources);
    BASE_CURRENCY = baseCurrency;
    BASE_CURRENCY_UNIT = baseCurrencyUnit;
    emit BaseCurrencySet(baseCurrency, baseCurrencyUnit);
  }

  /// @notice Gets an asset price by address
  /// @param asset The asset address
  function getAssetPrice(address asset) external view override returns (uint256) {
    IChainlinkAggregator source = assetsSources[asset];
    if (asset == BASE_CURRENCY) {
      return BASE_CURRENCY_UNIT;
    } else {
      int256 price = IChainlinkAggregator(source).latestAnswer();
      return uint256(price);
    }
  }

  /// @notice External function called by the Aave governance to set or replace sources of assets
  /// @param assets The addresses of the assets
  /// @param sources The address of the source of each asset
  function setAssetSources(address[] calldata assets, address[] calldata sources)
    external
    onlyOwner
  {
    _setAssetsSources(assets, sources);
  }

  /// @notice Internal function to set the sources for each asset
  /// @param assets The addresses of the assets
  /// @param sources The address of the source of each asset
  function _setAssetsSources(address[] memory assets, address[] memory sources) internal {
    require(assets.length == sources.length, 'INCONSISTENT_PARAMS_LENGTH');
    for (uint256 i = 0; i < assets.length; i++) {
      assetsSources[assets[i]] = IChainlinkAggregator(sources[i]);
      emit AssetSourceUpdated(assets[i], sources[i]);
    }
  }
}
