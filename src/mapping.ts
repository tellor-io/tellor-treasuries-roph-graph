import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  TreasuryIssued,
  TreasuryPaid,
  TreasuryPurchased
} from "../generated/Contract/Contract"
import { TreasuryIssuedEntity, TreasuryPaidEntity, TreasuryPurchasedEntity } from "../generated/schema"

export function handleTreasuryIssued(event: TreasuryIssued): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let issuedTreasury = new TreasuryIssuedEntity(event.block.timestamp.toString());
  let contract = Contract.bind(event.address);
  let treasury = contract.treasury(event.params._id);
  let totalLocked = contract.totalLocked();
  issuedTreasury.treasuryId = event.params._id;
  issuedTreasury.maxAmount = event.params._amount;
  issuedTreasury.rate = event.params._rate;
  issuedTreasury.dateStarted = treasury.value0;
  issuedTreasury.purchasedAmount = treasury.value3;
  issuedTreasury.duration = treasury.value4;
  issuedTreasury.endVoteCount = treasury.value5;
  issuedTreasury.endVoteCountRecorded = treasury.value6;
  issuedTreasury.totalLocked = totalLocked;
  // BigInt and BigDecimal math are supported
  // Entity fields can be set based on event parameters
  // Entities can be written to the store with `.save()`
  issuedTreasury.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getTreasuryAccount(...)
  // - contract.getTreasuryCount(...)
  // - contract.getTreasuryDetails(...)
  // - contract.getTreasuryFundsByUser(...)
  // - contract.getTreasuryOwners(...)
  // - contract.token(...)
  // - contract.totalLocked(...)
  // - contract.treasury(...)
  // - contract.treasuryCount(...)
  // - contract.verify(...)
  // - contract.wasPaid(...)
}

export function handleTreasuryPaid(event: TreasuryPaid): void {
  let paidTreasury = new TreasuryPaidEntity(event.block.timestamp.toHex());
  let contract = Contract.bind(event.address);
  let totalLocked = contract.totalLocked();
  let treasury = contract.treasury(BigInt.fromString((7).toString()));
  // let treasuryCount = contract.treasuryCount().toString();
  // let treasuryArray: any[] = [];
  // for (let i = 1; i <= parseInt(treasuryCount); i++) {
  //   let treasuryAccount = contract.getTreasuryAccount(BigInt.fromString(i.toString()), event.params._investor);
  //   if (parseInt(treasuryAccount.value0.toString()) != 0 ) {
  //     let treasury = contract.treasury(BigInt.fromString(i.toString()));
  //     treasuryArray.push([i, treasuryAccount.value0.toString(), treasuryAccount.value1, treasuryAccount.value2, treasury.value0, treasury.value1, treasury.value2, treasury.value3, treasury.value4, treasury.value5, treasury.value6]);
  //   }
  // };
  paidTreasury.investor = event.params._investor;
  paidTreasury.amountPaid = event.params._amount;
  paidTreasury.totalLocked = totalLocked;
  paidTreasury.timestamp = event.block.timestamp;
  paidTreasury.dateStarted = treasury.value0;
  paidTreasury.maxAmount = treasury.value1;
  paidTreasury.rate = treasury.value2;
  paidTreasury.purchasedAmount = treasury.value3;
  paidTreasury.duration = treasury.value4;
  paidTreasury.endVoteCount = treasury.value5;
  paidTreasury.endVoteCountRecorded = treasury.value6;
  // paidTreasury.treasuryArray = treasuryArray;
  paidTreasury.save();
}

export function handleTreasuryPurchased(event: TreasuryPurchased): void {
  let boughtTreasury = new TreasuryPurchasedEntity(event.block.timestamp.toHex());
  let contract = Contract.bind(event.address);
  let totalLocked = contract.totalLocked();
  let treasury = contract.treasury(BigInt.fromString((8).toString()));
  // let treasuryCount = contract.treasuryCount().toString();
  // let treasuryArray: any[] = [];
  // for (let i = 1; i <= parseInt(treasuryCount); i++) {
  //   let treasuryAccount = contract.getTreasuryAccount(BigInt.fromString(i.toString()), event.params._investor);
  //   if (parseInt(treasuryAccount.value0.toString()) != 0 ) {
  //     let treasury = contract.treasury(BigInt.fromString(i.toString()));
  //     treasuryArray.push([i, treasuryAccount.value0.toString(), treasuryAccount.value1, treasuryAccount.value2, treasury.value0, treasury.value1, treasury.value2, treasury.value3, treasury.value4, treasury.value5, treasury.value6]);
  //   }
  // };
  boughtTreasury.investor = event.params._investor;
  boughtTreasury.amountBought = event.params._amount;
  boughtTreasury.totalLocked = totalLocked;
  boughtTreasury.timestamp = event.block.timestamp;
  boughtTreasury.dateStarted = treasury.value0;
  boughtTreasury.maxAmount = treasury.value1;
  boughtTreasury.rate = treasury.value2;
  boughtTreasury.purchasedAmount = treasury.value3;
  boughtTreasury.duration = treasury.value4;
  boughtTreasury.endVoteCount = treasury.value5;
  boughtTreasury.endVoteCountRecorded = treasury.value6;
  // boughtTreasury.treasuryArray = treasuryArray;
  boughtTreasury.save();
}
