import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  ChildAccountCreated,
  Deposit,
  EmergencyWithdrawalExecuted,
  EmergencyWithdrawalRequested,
  OwnershipTransferred,
  Withdrawal
} from "../generated/SafeNest/SafeNest"

export function createChildAccountCreatedEvent(
  parent: Address,
  childId: Bytes,
  withdrawalDate: BigInt
): ChildAccountCreated {
  let childAccountCreatedEvent = changetype<ChildAccountCreated>(newMockEvent())

  childAccountCreatedEvent.parameters = new Array()

  childAccountCreatedEvent.parameters.push(
    new ethereum.EventParam("parent", ethereum.Value.fromAddress(parent))
  )
  childAccountCreatedEvent.parameters.push(
    new ethereum.EventParam("childId", ethereum.Value.fromFixedBytes(childId))
  )
  childAccountCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawalDate",
      ethereum.Value.fromUnsignedBigInt(withdrawalDate)
    )
  )

  return childAccountCreatedEvent
}

export function createDepositEvent(
  parent: Address,
  childId: Bytes,
  amount: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("parent", ethereum.Value.fromAddress(parent))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("childId", ethereum.Value.fromFixedBytes(childId))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositEvent
}

export function createEmergencyWithdrawalExecutedEvent(
  parent: Address,
  childId: Bytes,
  amount: BigInt
): EmergencyWithdrawalExecuted {
  let emergencyWithdrawalExecutedEvent =
    changetype<EmergencyWithdrawalExecuted>(newMockEvent())

  emergencyWithdrawalExecutedEvent.parameters = new Array()

  emergencyWithdrawalExecutedEvent.parameters.push(
    new ethereum.EventParam("parent", ethereum.Value.fromAddress(parent))
  )
  emergencyWithdrawalExecutedEvent.parameters.push(
    new ethereum.EventParam("childId", ethereum.Value.fromFixedBytes(childId))
  )
  emergencyWithdrawalExecutedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return emergencyWithdrawalExecutedEvent
}

export function createEmergencyWithdrawalRequestedEvent(
  parent: Address,
  childId: Bytes,
  amount: BigInt,
  requestTime: BigInt
): EmergencyWithdrawalRequested {
  let emergencyWithdrawalRequestedEvent =
    changetype<EmergencyWithdrawalRequested>(newMockEvent())

  emergencyWithdrawalRequestedEvent.parameters = new Array()

  emergencyWithdrawalRequestedEvent.parameters.push(
    new ethereum.EventParam("parent", ethereum.Value.fromAddress(parent))
  )
  emergencyWithdrawalRequestedEvent.parameters.push(
    new ethereum.EventParam("childId", ethereum.Value.fromFixedBytes(childId))
  )
  emergencyWithdrawalRequestedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  emergencyWithdrawalRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "requestTime",
      ethereum.Value.fromUnsignedBigInt(requestTime)
    )
  )

  return emergencyWithdrawalRequestedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createWithdrawalEvent(
  recipient: Address,
  childId: Bytes,
  amount: BigInt
): Withdrawal {
  let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

  withdrawalEvent.parameters = new Array()

  withdrawalEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("childId", ethereum.Value.fromFixedBytes(childId))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawalEvent
}
