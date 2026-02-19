// .papi/descriptors/src/dot.ts
import "polkadot-api";

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
var PreimagePalletHoldReason = _Enum;
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
var PolkadotPrimitivesV6ExecutorParamsExecutorParam = _Enum;
var PolkadotPrimitivesV6PvfPrepKind = _Enum;
var PvfExecKind = _Enum;
var ValidityAttestation = _Enum;
var PolkadotPrimitivesV6DisputeStatement = _Enum;
var PolkadotPrimitivesV6ValidDisputeStatementKind = _Enum;
var InvalidDisputeStatementKind = _Enum;
var PolkadotRuntimeParachainsSchedulerCommonAssignment = _Enum;
var ParachainsParasParaLifecycle = _Enum;
var UpgradeGoAhead = _Enum;
var UpgradeRestriction = _Enum;
var BrokerCoretimeInterfaceCoreAssignment = _Enum;
var MultiSigner = _Enum;
var CommonCrowdloanLastContribution = _Enum;
var XcmV3Response = _Enum;
var XcmV3TraitsError = _Enum;
var XcmV4Response = _Enum;
var XcmPalletVersionMigrationStage = _Enum;
var XcmVersionedAssetId = _Enum;
var MultiAddress = _Enum;
var BalancesAdjustmentDirection = _Enum;
var StakingPalletConfigOpBig = _Enum;
var StakingPalletConfigOp = _Enum;
var GrandpaEquivocation = _Enum;
var NominationPoolsBondExtra = _Enum;
var NominationPoolsConfigOp = _Enum;
var MultiSignature = _Enum;
var XcmVersionedXcm = _Enum;
var XcmV3Instruction = _Enum;
var XcmV3MultiassetMultiAssetFilter = _Enum;
var XcmV3MultiassetWildMultiAsset = _Enum;
var XcmV4Instruction = _Enum;
var XcmV4AssetAssetFilter = _Enum;
var XcmV4AssetWildAsset = _Enum;
var ReferendaTypesCurve = _Enum;
var TransactionValidityUnknownTransaction = _Enum;
var TransactionValidityTransactionSource = _Enum;
var OccupiedCoreAssumption = _Enum;
var SlashingOffenceKind = _Enum;
var MmrPrimitivesError = _Enum;
var PolkadotRuntimeCommonAssignedSlotsEvent = _Enum;
var RootTestingEvent = _Enum;
var PolkadotRuntimeCommonIdentityMigratorEvent = _Enum;
var IdentityJudgement = _Enum;
var IdentityData = _Enum;
var WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin = _Enum;
var PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart = _Enum;
var ExtensionsCheckMortality = _Enum;
var XcmVersionedAsset = _Enum;

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
var descriptorValues = import("./descriptors-UYQRSYMB.mjs").then((module) => module["Dot"]);
var metadataTypes = import("./metadataTypes-QDQX3AFB.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset = {};
var getMetadata = () => import("./dot_metadata-IEVGS5TB.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis = "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3";
var _allDescriptors = { descriptors: descriptorValues, metadataTypes, asset, getMetadata, genesis };
var dot_default = _allDescriptors;

// .papi/descriptors/src/ksm.ts
import "polkadot-api";
var descriptorValues2 = import("./descriptors-UYQRSYMB.mjs").then((module) => module["Ksm"]);
var metadataTypes2 = import("./metadataTypes-QDQX3AFB.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset2 = {};
var getMetadata2 = () => import("./ksm_metadata-HWXZEFNN.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis2 = "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe";
var _allDescriptors2 = { descriptors: descriptorValues2, metadataTypes: metadataTypes2, asset: asset2, getMetadata: getMetadata2, genesis: genesis2 };
var ksm_default = _allDescriptors2;

// .papi/descriptors/src/wnd.ts
import "polkadot-api";
var descriptorValues3 = import("./descriptors-UYQRSYMB.mjs").then((module) => module["Wnd"]);
var metadataTypes3 = import("./metadataTypes-QDQX3AFB.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset3 = {};
var getMetadata3 = () => import("./wnd_metadata-QGFZYVJE.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis3 = "0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e";
var _allDescriptors3 = { descriptors: descriptorValues3, metadataTypes: metadataTypes3, asset: asset3, getMetadata: getMetadata3, genesis: genesis3 };
var wnd_default = _allDescriptors3;

// .papi/descriptors/src/kahm.ts
import "polkadot-api";
var descriptorValues4 = import("./descriptors-UYQRSYMB.mjs").then((module) => module["Kahm"]);
var metadataTypes4 = import("./metadataTypes-QDQX3AFB.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset4 = {};
var getMetadata4 = () => import("./kahm_metadata-AICQSS5B.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis4 = "0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a";
var _allDescriptors4 = { descriptors: descriptorValues4, metadataTypes: metadataTypes4, asset: asset4, getMetadata: getMetadata4, genesis: genesis4 };
var kahm_default = _allDescriptors4;

// .papi/descriptors/src/wah.ts
import "polkadot-api";
var descriptorValues5 = import("./descriptors-UYQRSYMB.mjs").then((module) => module["Wah"]);
var metadataTypes5 = import("./metadataTypes-QDQX3AFB.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset5 = {};
var getMetadata5 = () => import("./wah_metadata-7ENDOIRY.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis5 = "0x67f9723393ef76214df0118c34bbbd3dbebc8ed46a10973a8c969d48fe7598c9";
var _allDescriptors5 = { descriptors: descriptorValues5, metadataTypes: metadataTypes5, asset: asset5, getMetadata: getMetadata5, genesis: genesis5 };
var wah_default = _allDescriptors5;

// .papi/descriptors/src/dotCoretime.ts
import "polkadot-api";
var descriptorValues6 = import("./descriptors-UYQRSYMB.mjs").then((module) => module["DotCoretime"]);
var metadataTypes6 = import("./metadataTypes-QDQX3AFB.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset6 = {};
var getMetadata6 = () => import("./dotCoretime_metadata-IDXFBJUW.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis6 = "0xefb56e30d9b4a24099f88820987d0f45fb645992416535d87650d98e00f46fc4";
var _allDescriptors6 = { descriptors: descriptorValues6, metadataTypes: metadataTypes6, asset: asset6, getMetadata: getMetadata6, genesis: genesis6 };
var dotCoretime_default = _allDescriptors6;

// .papi/descriptors/src/dotPeople.ts
import "polkadot-api";
var descriptorValues7 = import("./descriptors-UYQRSYMB.mjs").then((module) => module["DotPeople"]);
var metadataTypes7 = import("./metadataTypes-QDQX3AFB.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset7 = {};
var getMetadata7 = () => import("./dotPeople_metadata-2CQXVK66.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis7 = "0x67fa177a097bfa18f77ea95ab56e9bcdfeb0e5b8a40e46298bb93e16b6fc5008";
var _allDescriptors7 = { descriptors: descriptorValues7, metadataTypes: metadataTypes7, asset: asset7, getMetadata: getMetadata7, genesis: genesis7 };
var dotPeople_default = _allDescriptors7;

// .papi/descriptors/src/index.ts
var metadatas = {
  ["0xea937e06567742acd4321eb8acc4911a389130405c8ce6a9a6f81e3557d66740"]: dot_default,
  ["0x9bfa95446bff3c013666fd4c421cb0d8ce16b2e905a6589b58981876abf471d9"]: ksm_default,
  ["0xee6d70c902e426f11890146bbbb3da440cf45e49240f525f0cece9e9be1fcc6c"]: kahm_default,
  ["0xac70e823f8800dd6bfa9eacfd0b52a6b6a7426bb97682fa7f8c5b077051bb4fa"]: wah_default,
  ["0xd1f5b09101944a723ad59199c3340b8edb4fa932a32b8704b0f8451ce419f606"]: dotCoretime_default,
  ["0x25cd8ba734c11875b1b9bf5387d3a685564cc981f48415148c255ea689d60bde"]: dotPeople_default
};
var getMetadata8 = async (codeHash) => {
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
  ExtensionsCheckMortality,
  GovernanceOrigin,
  GrandpaEquivocation,
  GrandpaEvent,
  GrandpaStoredState,
  IdentityData,
  IdentityJudgement,
  InvalidDisputeStatementKind,
  MmrPrimitivesError,
  MultiAddress,
  MultiSignature,
  MultiSigner,
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
  PolkadotPrimitivesV6ExecutorParamsExecutorParam,
  PolkadotPrimitivesV6PvfPrepKind,
  PolkadotPrimitivesV6ValidDisputeStatementKind,
  PolkadotRuntimeCommonAssignedSlotsEvent,
  PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart,
  PolkadotRuntimeCommonIdentityMigratorEvent,
  PolkadotRuntimeParachainsCoretimeEvent,
  PolkadotRuntimeParachainsSchedulerCommonAssignment,
  PreimageEvent,
  PreimageOldRequestStatus,
  PreimagePalletHoldReason,
  PreimageRequestStatus,
  PreimagesBounded,
  PvfExecKind,
  ReferendaTypesCurve,
  RootTestingEvent,
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
  WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin,
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
  getMetadata8 as getMetadata,
  kahm_default as kahm,
  ksm_default as ksm,
  wah_default as wah,
  wnd_default as wnd
};
