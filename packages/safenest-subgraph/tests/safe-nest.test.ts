import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { ChildAccountCreated } from "../generated/schema"
import { ChildAccountCreated as ChildAccountCreatedEvent } from "../generated/SafeNest/SafeNest"
import { handleChildAccountCreated } from "../src/safe-nest"
import { createChildAccountCreatedEvent } from "./safe-nest-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let parent = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let childId = Bytes.fromI32(1234567890)
    let withdrawalDate = BigInt.fromI32(234)
    let newChildAccountCreatedEvent = createChildAccountCreatedEvent(
      parent,
      childId,
      withdrawalDate
    )
    handleChildAccountCreated(newChildAccountCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChildAccountCreated created and stored", () => {
    assert.entityCount("ChildAccountCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChildAccountCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "parent",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChildAccountCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "childId",
      "1234567890"
    )
    assert.fieldEquals(
      "ChildAccountCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "withdrawalDate",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
