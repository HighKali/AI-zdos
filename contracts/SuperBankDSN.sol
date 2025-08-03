// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SuperBankDSN is ERC20, Ownable {
    uint256 public constant ANNUAL_RATE = 5;
    mapping(address => uint256) public staked;
    mapping(address => uint256) public stakeTime;

    constructor() ERC20("NETKALI", "DSN") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function stake(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _transfer(msg.sender, address(this), amount);
        staked[msg.sender] += amount;
        stakeTime[msg.sender] = block.timestamp;
    }

    function unstake() external {
        uint256 s = staked[msg.sender];
        require(s > 0, "Nothing staked");
        uint256 duration = block.timestamp - stakeTime[msg.sender];
        uint256 reward = (s * ANNUAL_RATE * duration) / (100 * 365 days);
        delete staked[msg.sender];
        delete stakeTime[msg.sender];
        _transfer(address(this), msg.sender, s + reward);
    }
}