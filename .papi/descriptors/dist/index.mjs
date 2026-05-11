// .papi/descriptors/src/common.ts
var table = new Uint8Array(128);
for (let i = 0; i < 64; i++) table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
var toBinary = (base64) => {
  const n = base64.length, bytes = new Uint8Array((n - Number(base64[n - 1] === "=") - Number(base64[n - 2] === "=")) * 3 / 4 | 0);
  for (let i2 = 0, j = 0; i2 < n; ) {
    const c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
    const c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
    bytes[j++] = c0 << 2 | c1 >> 4;
    bytes[j++] = c1 << 4 | c2 >> 2;
    bytes[j++] = c2 << 6 | c3;
  }
  return bytes;
};

// .papi/descriptors/src/dot.ts
var descriptorValues = import("./descriptors-LVUIXWU7.mjs").then((module) => module["Dot"]);
var metadataTypes = import("./metadataTypes-RFRDCP54.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset = {};
var extensions = {};
var getMetadata = () => import("./dot_metadata-DTAULUV5.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis = "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3";
var _allDescriptors = { descriptors: descriptorValues, metadataTypes, asset, extensions, getMetadata, genesis };
var dot_default = _allDescriptors;

// .papi/descriptors/src/dotCoretime.ts
var descriptorValues2 = import("./descriptors-LVUIXWU7.mjs").then((module) => module["DotCoretime"]);
var metadataTypes2 = import("./metadataTypes-RFRDCP54.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset2 = {};
var extensions2 = {};
var getMetadata2 = () => import("./dotCoretime_metadata-6HW7UPJE.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis2 = "0xefb56e30d9b4a24099f88820987d0f45fb645992416535d87650d98e00f46fc4";
var _allDescriptors2 = { descriptors: descriptorValues2, metadataTypes: metadataTypes2, asset: asset2, extensions: extensions2, getMetadata: getMetadata2, genesis: genesis2 };
var dotCoretime_default = _allDescriptors2;

// .papi/descriptors/src/dotPeople.ts
var descriptorValues3 = import("./descriptors-LVUIXWU7.mjs").then((module) => module["DotPeople"]);
var metadataTypes3 = import("./metadataTypes-RFRDCP54.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset3 = {};
var extensions3 = {};
var getMetadata3 = () => import("./dotPeople_metadata-B24HTEN5.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis3 = "0x67fa177a097bfa18f77ea95ab56e9bcdfeb0e5b8a40e46298bb93e16b6fc5008";
var _allDescriptors3 = { descriptors: descriptorValues3, metadataTypes: metadataTypes3, asset: asset3, extensions: extensions3, getMetadata: getMetadata3, genesis: genesis3 };
var dotPeople_default = _allDescriptors3;

// .papi/descriptors/src/ksm.ts
var descriptorValues4 = import("./descriptors-LVUIXWU7.mjs").then((module) => module["Ksm"]);
var metadataTypes4 = import("./metadataTypes-RFRDCP54.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset4 = {};
var extensions4 = {};
var getMetadata4 = () => import("./ksm_metadata-BSLB337A.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis4 = "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe";
var _allDescriptors4 = { descriptors: descriptorValues4, metadataTypes: metadataTypes4, asset: asset4, extensions: extensions4, getMetadata: getMetadata4, genesis: genesis4 };
var ksm_default = _allDescriptors4;

// .papi/descriptors/src/ksmPeople.ts
var descriptorValues5 = import("./descriptors-LVUIXWU7.mjs").then((module) => module["KsmPeople"]);
var metadataTypes5 = import("./metadataTypes-RFRDCP54.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset5 = {};
var extensions5 = {};
var getMetadata5 = () => import("./ksmPeople_metadata-V5GQHX36.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis5 = "0xc1af4cb4eb3918e5db15086c0cc5ec17fb334f728b7c65dd44bfe1e174ff8b3f";
var _allDescriptors5 = { descriptors: descriptorValues5, metadataTypes: metadataTypes5, asset: asset5, extensions: extensions5, getMetadata: getMetadata5, genesis: genesis5 };
var ksmPeople_default = _allDescriptors5;

// .papi/descriptors/src/ksmCoretime.ts
var descriptorValues6 = import("./descriptors-LVUIXWU7.mjs").then((module) => module["KsmCoretime"]);
var metadataTypes6 = import("./metadataTypes-RFRDCP54.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset6 = {};
var extensions6 = {};
var getMetadata6 = () => import("./ksmCoretime_metadata-MO6OOR7Z.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis6 = "0x638cd2b9af4b3bb54b8c1f0d22711fc89924ca93300f0caf25a580432b29d050";
var _allDescriptors6 = { descriptors: descriptorValues6, metadataTypes: metadataTypes6, asset: asset6, extensions: extensions6, getMetadata: getMetadata6, genesis: genesis6 };
var ksmCoretime_default = _allDescriptors6;

// .papi/descriptors/src/common-types.ts
import { _Enum } from "polkadot-api";
var DigestItem = _Enum;
var Phase = _Enum;
var DispatchClass = _Enum;
var TokenError = _Enum;
var ArithmeticError = _Enum;
var TransactionalError = _Enum;
var PreimageEvent = _Enum;
var BalanceStatus = _Enum;
var PreimagePalletHoldReason = _Enum;
var TransactionPaymentEvent = _Enum;
var StakingRewardDestination = _Enum;
var StakingForcing = _Enum;
var OffencesEvent = _Enum;
var GrandpaEvent = _Enum;
var XcmV3Junctions = _Enum;
var XcmV3Junction = _Enum;
var XcmV3JunctionNetworkId = _Enum;
var XcmV3JunctionBodyId = _Enum;
var XcmV2JunctionBodyPart = _Enum;
var XcmV3MultiassetAssetId = _Enum;
var XcmV5Junctions = _Enum;
var XcmV5Junction = _Enum;
var XcmV5NetworkId = _Enum;
var XcmVersionedLocation = _Enum;
var ConvictionVotingVoteAccountVote = _Enum;
var PreimagesBounded = _Enum;
var CommonClaimsEvent = _Enum;
var ChildBountiesEvent = _Enum;
var ElectionProviderMultiPhaseEvent = _Enum;
var ElectionProviderMultiPhaseElectionCompute = _Enum;
var ElectionProviderMultiPhasePhase = _Enum;
var BagsListEvent = _Enum;
var NominationPoolsPoolState = _Enum;
var NominationPoolsCommissionClaimPermission = _Enum;
var NominationPoolsClaimPermission = _Enum;
var ParachainsHrmpEvent = _Enum;
var ParachainsDisputesEvent = _Enum;
var ParachainsDisputeLocation = _Enum;
var ParachainsDisputeResult = _Enum;
var CommonParasRegistrarEvent = _Enum;
var CommonSlotsEvent = _Enum;
var CommonAuctionsEvent = _Enum;
var PolkadotRuntimeParachainsCoretimeEvent = _Enum;
var XcmV5Instruction = _Enum;
var XcmV3MultiassetFungibility = _Enum;
var XcmV3MultiassetAssetInstance = _Enum;
var XcmV3MaybeErrorCode = _Enum;
var XcmV2OriginKind = _Enum;
var XcmV5AssetFilter = _Enum;
var XcmV5WildAsset = _Enum;
var XcmV2MultiassetWildFungibility = _Enum;
var XcmV3WeightLimit = _Enum;
var XcmVersionedAssets = _Enum;
var ParachainsInclusionAggregateMessageOrigin = _Enum;
var ParachainsInclusionUmpQueueId = _Enum;
var GovernanceOrigin = _Enum;
var ParachainsOrigin = _Enum;
var PreimageOldRequestStatus = _Enum;
var PreimageRequestStatus = _Enum;
var BabeDigestsNextConfigDescriptor = _Enum;
var BabeAllowedSlots = _Enum;
var BabeDigestsPreDigest = _Enum;
var BalancesTypesReasons = _Enum;
var WestendRuntimeRuntimeFreezeReason = _Enum;
var NominationPoolsPalletFreezeReason = _Enum;
var TransactionPaymentReleases = _Enum;
var GrandpaStoredState = _Enum;
var TreasuryPaymentState = _Enum;
var ConvictionVotingVoteVoting = _Enum;
var VotingConviction = _Enum;
var TraitsScheduleDispatchTime = _Enum;
var ClaimsStatementKind = _Enum;
var Version = _Enum;
var ChildBountyStatus = _Enum;
var PolkadotPrimitivesV6PvfPrepKind = _Enum;
var PvfExecKind = _Enum;
var ValidityAttestation = _Enum;
var PolkadotPrimitivesV6DisputeStatement = _Enum;
var PolkadotPrimitivesV6ValidDisputeStatementKind = _Enum;
var InvalidDisputeStatementKind = _Enum;
var BrokerCoretimeInterfaceCoreAssignment = _Enum;
var ParachainsParasParaLifecycle = _Enum;
var UpgradeGoAhead = _Enum;
var UpgradeRestriction = _Enum;
var CommonCrowdloanLastContribution = _Enum;
var XcmV3Response = _Enum;
var XcmV3TraitsError = _Enum;
var XcmV4Response = _Enum;
var XcmPalletVersionMigrationStage = _Enum;
var XcmVersionedAssetId = _Enum;
var ReferendaTypesCurve = _Enum;
var MultiAddress = _Enum;
var BalancesAdjustmentDirection = _Enum;
var StakingPalletConfigOpBig = _Enum;
var StakingPalletConfigOp = _Enum;
var GrandpaEquivocation = _Enum;
var NominationPoolsBondExtra = _Enum;
var NominationPoolsConfigOp = _Enum;
var XcmVersionedXcm = _Enum;
var XcmV3Instruction = _Enum;
var XcmV3MultiassetMultiAssetFilter = _Enum;
var XcmV3MultiassetWildMultiAsset = _Enum;
var XcmV4Instruction = _Enum;
var XcmV4AssetAssetFilter = _Enum;
var XcmV4AssetWildAsset = _Enum;
var TransactionValidityUnknownTransaction = _Enum;
var TransactionValidityTransactionSource = _Enum;
var OccupiedCoreAssumption = _Enum;
var SlashingOffenceKind = _Enum;
var MmrPrimitivesError = _Enum;
var XcmVersionedAsset = _Enum;
var IdentityJudgement = _Enum;
var IdentityData = _Enum;

// .papi/descriptors/src/index.ts
var metadatas = {
  ["0x6e8df549e3c17a4aa26693347b7b9146ea5966e3a56f7ce9d0df4a37d6702778"]: dot_default,
  ["0x239547a0d1a01c279beb6bce2a5512d8c69be693d37f1fc6fb13b14385b0ccec"]: dotCoretime_default,
  ["0x3f0652ba1159157eff567b8e0e5987c8fc67a614f0909ce0f65f0d8a2b532864"]: dotPeople_default,
  ["0x6434f13616e65084d99b48eb9e729696a19d0807c99eb2d6df566bf8bad084ab"]: ksm_default,
  ["0x75b13346b8ee5488fcc7486397469043ce0887169baf884f8c97fd986c3e4510"]: ksmPeople_default,
  ["0x5acb028effa13d1d489c15d12fa6f8df5c0fd80844082cff07a7d358c214e179"]: ksmCoretime_default
};
var getMetadata7 = async (codeHash) => {
  try {
    return await metadatas[codeHash].getMetadata();
  } catch {
  }
  return null;
};
export {
  ArithmeticError,
  BabeAllowedSlots,
  BabeDigestsNextConfigDescriptor,
  BabeDigestsPreDigest,
  BagsListEvent,
  BalanceStatus,
  BalancesAdjustmentDirection,
  BalancesTypesReasons,
  BrokerCoretimeInterfaceCoreAssignment,
  ChildBountiesEvent,
  ChildBountyStatus,
  ClaimsStatementKind,
  CommonAuctionsEvent,
  CommonClaimsEvent,
  CommonCrowdloanLastContribution,
  CommonParasRegistrarEvent,
  CommonSlotsEvent,
  ConvictionVotingVoteAccountVote,
  ConvictionVotingVoteVoting,
  DigestItem,
  DispatchClass,
  ElectionProviderMultiPhaseElectionCompute,
  ElectionProviderMultiPhaseEvent,
  ElectionProviderMultiPhasePhase,
  GovernanceOrigin,
  GrandpaEquivocation,
  GrandpaEvent,
  GrandpaStoredState,
  IdentityData,
  IdentityJudgement,
  InvalidDisputeStatementKind,
  MmrPrimitivesError,
  MultiAddress,
  NominationPoolsBondExtra,
  NominationPoolsClaimPermission,
  NominationPoolsCommissionClaimPermission,
  NominationPoolsConfigOp,
  NominationPoolsPalletFreezeReason,
  NominationPoolsPoolState,
  OccupiedCoreAssumption,
  OffencesEvent,
  ParachainsDisputeLocation,
  ParachainsDisputeResult,
  ParachainsDisputesEvent,
  ParachainsHrmpEvent,
  ParachainsInclusionAggregateMessageOrigin,
  ParachainsInclusionUmpQueueId,
  ParachainsOrigin,
  ParachainsParasParaLifecycle,
  Phase,
  PolkadotPrimitivesV6DisputeStatement,
  PolkadotPrimitivesV6PvfPrepKind,
  PolkadotPrimitivesV6ValidDisputeStatementKind,
  PolkadotRuntimeParachainsCoretimeEvent,
  PreimageEvent,
  PreimageOldRequestStatus,
  PreimagePalletHoldReason,
  PreimageRequestStatus,
  PreimagesBounded,
  PvfExecKind,
  ReferendaTypesCurve,
  SlashingOffenceKind,
  StakingForcing,
  StakingPalletConfigOp,
  StakingPalletConfigOpBig,
  StakingRewardDestination,
  TokenError,
  TraitsScheduleDispatchTime,
  TransactionPaymentEvent,
  TransactionPaymentReleases,
  TransactionValidityTransactionSource,
  TransactionValidityUnknownTransaction,
  TransactionalError,
  TreasuryPaymentState,
  UpgradeGoAhead,
  UpgradeRestriction,
  ValidityAttestation,
  Version,
  VotingConviction,
  WestendRuntimeRuntimeFreezeReason,
  XcmPalletVersionMigrationStage,
  XcmV2JunctionBodyPart,
  XcmV2MultiassetWildFungibility,
  XcmV2OriginKind,
  XcmV3Instruction,
  XcmV3Junction,
  XcmV3JunctionBodyId,
  XcmV3JunctionNetworkId,
  XcmV3Junctions,
  XcmV3MaybeErrorCode,
  XcmV3MultiassetAssetId,
  XcmV3MultiassetAssetInstance,
  XcmV3MultiassetFungibility,
  XcmV3MultiassetMultiAssetFilter,
  XcmV3MultiassetWildMultiAsset,
  XcmV3Response,
  XcmV3TraitsError,
  XcmV3WeightLimit,
  XcmV4AssetAssetFilter,
  XcmV4AssetWildAsset,
  XcmV4Instruction,
  XcmV4Response,
  XcmV5AssetFilter,
  XcmV5Instruction,
  XcmV5Junction,
  XcmV5Junctions,
  XcmV5NetworkId,
  XcmV5WildAsset,
  XcmVersionedAsset,
  XcmVersionedAssetId,
  XcmVersionedAssets,
  XcmVersionedLocation,
  XcmVersionedXcm,
  dot_default as dot,
  dotCoretime_default as dotCoretime,
  dotPeople_default as dotPeople,
  getMetadata7 as getMetadata,
  ksm_default as ksm,
  ksmCoretime_default as ksmCoretime,
  ksmPeople_default as ksmPeople
};
