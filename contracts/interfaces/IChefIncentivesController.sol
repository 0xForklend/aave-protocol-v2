// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IChefIncentivesController {
  function handleAction(
    address user,
    uint256 userBalance,
    uint256 totalSupply
  ) external;

  function addPool(address _token, uint256 _allocPoint) external;

  function claim(address _user, address[] calldata _tokens) external;

  function setClaimReceiver(address _user, address _receiver) external;
}
