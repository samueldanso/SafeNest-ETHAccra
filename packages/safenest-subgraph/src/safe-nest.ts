import {
  ChildAccountCreated as ChildAccountCreatedEvent,
  Deposit as DepositEvent,
  EmergencyWithdrawalExecuted as EmergencyWithdrawalExecutedEvent,
  EmergencyWithdrawalRequested as EmergencyWithdrawalRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/SafeNest/SafeNest"
import {
  ChildAccountCreated,
  Deposit,
  EmergencyWithdrawalExecuted,
  EmergencyWithdrawalRequested,
  OwnershipTransferred,
  Withdrawal
} from "../generated/schema"

export function handleChildAccountCreated(
  event: ChildAccountCreatedEvent
): void {
  let entity = new ChildAccountCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.parent = event.params.parent
  entity.childId = event.params.childId
  entity.withdrawalDate = event.params.withdrawalDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.parent = event.params.parent
  entity.childId = event.params.childId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmergencyWithdrawalExecuted(
  event: EmergencyWithdrawalExecutedEvent
): void {
  let entity = new EmergencyWithdrawalExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.parent = event.params.parent
  entity.childId = event.params.childId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmergencyWithdrawalRequested(
  event: EmergencyWithdrawalRequestedEvent
): void {
  let entity = new EmergencyWithdrawalRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.parent = event.params.parent
  entity.childId = event.params.childId
  entity.amount = event.params.amount
  entity.requestTime = event.params.requestTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.childId = event.params.childId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
