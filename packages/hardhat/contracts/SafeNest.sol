// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title SafeNest
 * @notice A smart contract that allows parents to save USDC for their children until they turn 18.
 * @dev Implements time-locked savings accounts with support for emergency withdrawals.
 */
contract SafeNest is Ownable, ReentrancyGuard {
    IERC20 public immutable usdcToken;

    /// @notice Stores information about a child's account.
    /// @dev `balance` is the total amount of USDC saved for the child.
    /// @dev `withdrawalDate` is the date when the child can access the funds (e.g., 18th birthday).
    /// @dev `child` is the address of the child who will receive the funds.
    /// @dev `exists` indicates if the account has been created.
    struct ChildAccount {
        uint256 balance;
        uint256 withdrawalDate;
        address child;
        bool exists;
    }

      /// @dev Mapping from parent address to child ID to ChildAccount.
    mapping(address => mapping(bytes32 => ChildAccount)) private childAccounts;

    /// @dev Mapping from parent address to child ID to emergency withdrawal request timestamp.
    mapping(address => mapping(bytes32 => uint256)) private emergencyWithdrawalRequests;

       /// @notice Emitted when a new child account is created.
    /// @param parent The address of the parent who created the account.
    /// @param childId The unique identifier for the child.
    /// @param withdrawalDate The date when the child can access the funds.
    event ChildAccountCreated(address indexed parent, bytes32 indexed childId, uint256 withdrawalDate);

    /// @notice Emitted when USDC is deposited into a child's account.
    /// @param parent The address of the parent who made the deposit.
    /// @param childId The unique identifier for the child.
    /// @param amount The amount of USDC deposited.
    event Deposit(address indexed parent, bytes32 indexed childId, uint256 amount);

    /// @notice Emitted when USDC is withdrawn from a child's account.
    /// @param recipient The address that received the withdrawn funds.
    /// @param childId The unique identifier for the child.
    /// @param amount The amount of USDC withdrawn.
    event Withdrawal(address indexed recipient, bytes32 indexed childId, uint256 amount);

    /// @notice Emitted when an emergency withdrawal is requested.
    /// @param parent The address of the parent who requested the emergency withdrawal.
    /// @param childId The unique identifier for the child.
    /// @param amount The amount of USDC requested for emergency withdrawal.
    /// @param requestTime The timestamp when the emergency withdrawal request was made.
    event EmergencyWithdrawalRequested(address indexed parent, bytes32 indexed childId, uint256 amount, uint256 requestTime);

    /// @notice Emitted when an emergency withdrawal is executed.
    /// @param parent The address of the parent who executed the emergency withdrawal.
    /// @param childId The unique identifier for the child.
    /// @param amount The amount of USDC withdrawn in the emergency.
    event EmergencyWithdrawalExecuted(address indexed parent, bytes32 indexed childId, uint256 amount);


    /**
     * @dev Constructor that sets the address of the USDC token contract.
     * @param _usdcToken Address of the USDC token contract.
     */
    constructor(address _usdcToken) Ownable(msg.sender) {
    require(_usdcToken != address(0), "Invalid USDC token address");
    usdcToken = IERC20(_usdcToken);
}

    /**
     * @dev Creates a new child account.
     * @param childId Unique identifier for the child (generated off-chain).
     * @param withdrawalDate Timestamp when the child can withdraw funds (18th birthday).
     */
    function createChildAccount(bytes32 childId, uint256 withdrawalDate) external {
        require(!childAccounts[msg.sender][childId].exists, "Child account already exists");
        require(withdrawalDate > block.timestamp, "Withdrawal date must be in the future");

        childAccounts[msg.sender][childId] = ChildAccount({
            balance: 0,
            withdrawalDate: withdrawalDate,
            exists: true
        });

        emit ChildAccountCreated(msg.sender, childId, withdrawalDate);
    }

    /**
     * @dev Deposits USDC into a child's account.
     * @param childId Unique identifier of the child.
     * @param amount Amount of USDC to deposit.
     */
    function deposit(bytes32 childId, uint256 amount) external nonReentrant {
        require(childAccounts[msg.sender][childId].exists, "Child account does not exist");
        require(amount > 0, "Deposit amount must be greater than 0");
        require(usdcToken.transferFrom(msg.sender, address(this), amount), "USDC transfer failed");

        childAccounts[msg.sender][childId].balance += amount;
        emit Deposit(msg.sender, childId, amount);
    }

    /**
     * @dev Withdraws the entire balance for a child who has reached the withdrawal date.
     * @param parent Address of the parent.
     * @param childId Unique identifier of the child.
     */
    function withdraw(address parent, bytes32 childId) external nonReentrant {
        ChildAccount storage account = childAccounts[parent][childId];
        require(account.exists, "Child account does not exist");
        require(block.timestamp >= account.withdrawalDate, "Withdrawal date not reached");
        require(account.balance > 0, "No balance to withdraw");

        uint256 amount = account.balance;
        account.balance = 0;

        require(usdcToken.transfer(msg.sender, amount), "USDC transfer failed");
        emit Withdrawal(msg.sender, childId, amount);
    }

    /**
     * @dev Allows the parent to make an emergency withdrawal.
     * @param childId Unique identifier of the child.
     * @param amount Amount to withdraw.
     */
    function emergencyWithdraw(bytes32 childId, uint256 amount) external nonReentrant {
        ChildAccount storage account = childAccounts[msg.sender][childId];
        require(account.exists, "Child account does not exist");
        require(amount > 0 && amount <= account.balance, "Invalid withdrawal amount");

        account.balance -= amount;
        require(usdcToken.transfer(msg.sender, amount), "USDC transfer failed");
        emit EmergencyWithdrawal(msg.sender, childId, amount);
    }

    /**
     * @dev Retrieves the balance of a child's account.
     * @param parent Address of the parent.
     * @param childId Unique identifier of the child.
     * @return balance Current balance of the child's account.
     */
    function getChildBalance(address parent, bytes32 childId) external view returns (uint256 balance) {
        require(childAccounts[parent][childId].exists, "Child account does not exist");
        return childAccounts[parent][childId].balance;
    }

    /**
     * @dev Retrieves the withdrawal date of a child's account.
     * @param parent Address of the parent.
     * @param childId Unique identifier of the child.
     * @return withdrawalDate Timestamp when the child can withdraw funds.
     */
    function getWithdrawalDate(address parent, bytes32 childId) external view returns (uint256 withdrawalDate) {
        require(childAccounts[parent][childId].exists, "Child account does not exist");
        return childAccounts[parent][childId].withdrawalDate;
    }
}
