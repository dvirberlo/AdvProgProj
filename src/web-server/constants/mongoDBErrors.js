// extracted from https://www.npmjs.com/package/mongodb-error-codes

"use strict";
exports.__esModule = true;
exports.MongoError = void 0;
exports.MongoError = {
  OK: {
    code: 0,
    categories: [],
  },
  InternalError: {
    code: 1,
    categories: [],
  },
  BadValue: {
    code: 2,
    categories: [],
  },
  OBSOLETE_DuplicateKey: {
    code: 3,
    categories: [],
  },
  NoSuchKey: {
    code: 4,
    categories: [],
  },
  GraphContainsCycle: {
    code: 5,
    categories: [],
  },
  HostUnreachable: {
    code: 6,
    categories: ["NetworkError", "RetriableError"],
  },
  HostNotFound: {
    code: 7,
    categories: ["NetworkError", "RetriableError"],
  },
  UnknownError: {
    code: 8,
    categories: [],
  },
  FailedToParse: {
    code: 9,
    categories: [],
  },
  CannotMutateObject: {
    code: 10,
    categories: [],
  },
  UserNotFound: {
    code: 11,
    categories: [],
  },
  UnsupportedFormat: {
    code: 12,
    categories: [],
  },
  Unauthorized: {
    code: 13,
    categories: [],
  },
  TypeMismatch: {
    code: 14,
    categories: [],
  },
  Overflow: {
    code: 15,
    categories: ["ValidationError"],
  },
  InvalidLength: {
    code: 16,
    categories: [],
  },
  ProtocolError: {
    code: 17,
    categories: [],
  },
  AuthenticationFailed: {
    code: 18,
    categories: [],
  },
  CannotReuseObject: {
    code: 19,
    categories: [],
  },
  IllegalOperation: {
    code: 20,
    categories: [],
  },
  EmptyArrayOperation: {
    code: 21,
    categories: [],
  },
  InvalidBSON: {
    code: 22,
    categories: ["ValidationError"],
  },
  AlreadyInitialized: {
    code: 23,
    categories: [],
  },
  LockTimeout: {
    code: 24,
    categories: ["Interruption"],
  },
  RemoteValidationError: {
    code: 25,
    categories: [],
  },
  NamespaceNotFound: {
    code: 26,
    categories: [],
  },
  IndexNotFound: {
    code: 27,
    categories: [],
  },
  PathNotViable: {
    code: 28,
    categories: [],
  },
  NonExistentPath: {
    code: 29,
    categories: [],
  },
  InvalidPath: {
    code: 30,
    categories: [],
  },
  RoleNotFound: {
    code: 31,
    categories: [],
  },
  RolesNotRelated: {
    code: 32,
    categories: [],
  },
  PrivilegeNotFound: {
    code: 33,
    categories: [],
  },
  CannotBackfillArray: {
    code: 34,
    categories: [],
  },
  UserModificationFailed: {
    code: 35,
    categories: [],
  },
  RemoteChangeDetected: {
    code: 36,
    categories: [],
  },
  FileRenameFailed: {
    code: 37,
    categories: [],
  },
  FileNotOpen: {
    code: 38,
    categories: [],
  },
  FileStreamFailed: {
    code: 39,
    categories: [],
  },
  ConflictingUpdateOperators: {
    code: 40,
    categories: [],
  },
  FileAlreadyOpen: {
    code: 41,
    categories: [],
  },
  LogWriteFailed: {
    code: 42,
    categories: [],
  },
  CursorNotFound: {
    code: 43,
    categories: ["CursorInvalidatedError"],
  },
  UserDataInconsistent: {
    code: 45,
    categories: [],
  },
  LockBusy: {
    code: 46,
    categories: [],
  },
  NoMatchingDocument: {
    code: 47,
    categories: [],
  },
  NamespaceExists: {
    code: 48,
    categories: [],
  },
  InvalidRoleModification: {
    code: 49,
    categories: [],
  },
  MaxTimeMSExpired: {
    code: 50,
    categories: ["Interruption", "ExceededTimeLimitError"],
  },
  ManualInterventionRequired: {
    code: 51,
    categories: [],
  },
  DollarPrefixedFieldName: {
    code: 52,
    categories: [],
  },
  InvalidIdField: {
    code: 53,
    categories: [],
  },
  NotSingleValueField: {
    code: 54,
    categories: [],
  },
  InvalidDBRef: {
    code: 55,
    categories: [],
  },
  EmptyFieldName: {
    code: 56,
    categories: [],
  },
  DottedFieldName: {
    code: 57,
    categories: [],
  },
  RoleModificationFailed: {
    code: 58,
    categories: [],
  },
  CommandNotFound: {
    code: 59,
    categories: [],
  },
  OBSOLETE_DatabaseNotFound: {
    code: 60,
    categories: [],
  },
  ShardKeyNotFound: {
    code: 61,
    categories: [],
  },
  OplogOperationUnsupported: {
    code: 62,
    categories: [],
  },
  StaleShardVersion: {
    code: 63,
    categories: ["StaleShardVersionError", "NeedRetargettingError"],
  },
  WriteConcernFailed: {
    code: 64,
    categories: ["WriteConcernError"],
  },
  MultipleErrorsOccurred: {
    code: 65,
    categories: [],
  },
  ImmutableField: {
    code: 66,
    categories: [],
  },
  CannotCreateIndex: {
    code: 67,
    categories: [],
  },
  IndexAlreadyExists: {
    code: 68,
    categories: [],
  },
  AuthSchemaIncompatible: {
    code: 69,
    categories: [],
  },
  ShardNotFound: {
    code: 70,
    categories: [],
  },
  ReplicaSetNotFound: {
    code: 71,
    categories: [],
  },
  InvalidOptions: {
    code: 72,
    categories: [],
  },
  InvalidNamespace: {
    code: 73,
    categories: [],
  },
  NodeNotFound: {
    code: 74,
    categories: [],
  },
  WriteConcernLegacyOK: {
    code: 75,
    categories: ["WriteConcernError"],
  },
  NoReplicationEnabled: {
    code: 76,
    categories: [],
  },
  OperationIncomplete: {
    code: 77,
    categories: [],
  },
  CommandResultSchemaViolation: {
    code: 78,
    categories: [],
  },
  UnknownReplWriteConcern: {
    code: 79,
    categories: ["WriteConcernError"],
  },
  RoleDataInconsistent: {
    code: 80,
    categories: [],
  },
  NoMatchParseContext: {
    code: 81,
    categories: [],
  },
  NoProgressMade: {
    code: 82,
    categories: [],
  },
  RemoteResultsUnavailable: {
    code: 83,
    categories: [],
  },
  OBSOLETE_DuplicateKeyValue: {
    code: 84,
    categories: [],
  },
  IndexOptionsConflict: {
    code: 85,
    categories: [],
  },
  IndexKeySpecsConflict: {
    code: 86,
    categories: [],
  },
  CannotSplit: {
    code: 87,
    categories: [],
  },
  OBSOLETE_SplitFailed: {
    code: 88,
    categories: [],
  },
  NetworkTimeout: {
    code: 89,
    categories: ["NetworkError", "RetriableError", "NetworkTimeoutError"],
  },
  CallbackCanceled: {
    code: 90,
    categories: ["CancellationError"],
  },
  ShutdownInProgress: {
    code: 91,
    categories: ["ShutdownError", "CancellationError", "RetriableError"],
  },
  SecondaryAheadOfPrimary: {
    code: 92,
    categories: [],
  },
  InvalidReplicaSetConfig: {
    code: 93,
    categories: [],
  },
  NotYetInitialized: {
    code: 94,
    categories: [],
  },
  NotSecondary: {
    code: 95,
    categories: [],
  },
  OperationFailed: {
    code: 96,
    categories: ["CursorInvalidatedError"],
  },
  NoProjectionFound: {
    code: 97,
    categories: [],
  },
  DBPathInUse: {
    code: 98,
    categories: [],
  },
  UnsatisfiableWriteConcern: {
    code: 100,
    categories: ["WriteConcernError"],
  },
  OutdatedClient: {
    code: 101,
    categories: [],
  },
  IncompatibleAuditMetadata: {
    code: 102,
    categories: [],
  },
  NewReplicaSetConfigurationIncompatible: {
    code: 103,
    categories: [],
  },
  NodeNotElectable: {
    code: 104,
    categories: [],
  },
  IncompatibleShardingMetadata: {
    code: 105,
    categories: [],
  },
  DistributedClockSkewed: {
    code: 106,
    categories: [],
  },
  LockFailed: {
    code: 107,
    categories: [],
  },
  InconsistentReplicaSetNames: {
    code: 108,
    categories: [],
  },
  ConfigurationInProgress: {
    code: 109,
    categories: [],
  },
  CannotInitializeNodeWithData: {
    code: 110,
    categories: [],
  },
  NotExactValueField: {
    code: 111,
    categories: [],
  },
  WriteConflict: {
    code: 112,
    categories: [],
  },
  InitialSyncFailure: {
    code: 113,
    categories: [],
  },
  InitialSyncOplogSourceMissing: {
    code: 114,
    categories: [],
  },
  CommandNotSupported: {
    code: 115,
    categories: [],
  },
  DocTooLargeForCapped: {
    code: 116,
    categories: [],
  },
  ConflictingOperationInProgress: {
    code: 117,
    categories: [],
  },
  NamespaceNotSharded: {
    code: 118,
    categories: [],
  },
  InvalidSyncSource: {
    code: 119,
    categories: [],
  },
  OplogStartMissing: {
    code: 120,
    categories: [],
  },
  DocumentValidationFailure: {
    code: 121,
    categories: [],
  },
  OBSOLETE_ReadAfterOptimeTimeout: {
    code: 122,
    categories: [],
  },
  NotAReplicaSet: {
    code: 123,
    categories: [],
  },
  IncompatibleElectionProtocol: {
    code: 124,
    categories: [],
  },
  CommandFailed: {
    code: 125,
    categories: [],
  },
  RPCProtocolNegotiationFailed: {
    code: 126,
    categories: [],
  },
  UnrecoverableRollbackError: {
    code: 127,
    categories: [],
  },
  LockNotFound: {
    code: 128,
    categories: [],
  },
  LockStateChangeFailed: {
    code: 129,
    categories: [],
  },
  SymbolNotFound: {
    code: 130,
    categories: [],
  },
  OBSOLETE_ConfigServersInconsistent: {
    code: 132,
    categories: [],
  },
  FailedToSatisfyReadPreference: {
    code: 133,
    categories: [],
  },
  ReadConcernMajorityNotAvailableYet: {
    code: 134,
    categories: [],
  },
  StaleTerm: {
    code: 135,
    categories: [],
  },
  CappedPositionLost: {
    code: 136,
    categories: [],
  },
  IncompatibleShardingConfigVersion: {
    code: 137,
    categories: [],
  },
  RemoteOplogStale: {
    code: 138,
    categories: [],
  },
  JSInterpreterFailure: {
    code: 139,
    categories: [],
  },
  InvalidSSLConfiguration: {
    code: 140,
    categories: [],
  },
  SSLHandshakeFailed: {
    code: 141,
    categories: [],
  },
  JSUncatchableError: {
    code: 142,
    categories: [],
  },
  CursorInUse: {
    code: 143,
    categories: [],
  },
  IncompatibleCatalogManager: {
    code: 144,
    categories: [],
  },
  PooledConnectionsDropped: {
    code: 145,
    categories: [],
  },
  ExceededMemoryLimit: {
    code: 146,
    categories: [],
  },
  ZLibError: {
    code: 147,
    categories: [],
  },
  ReadConcernMajorityNotEnabled: {
    code: 148,
    categories: ["VoteAbortError"],
  },
  NoConfigPrimary: {
    code: 149,
    categories: [],
  },
  StaleEpoch: {
    code: 150,
    categories: ["StaleShardVersionError", "NeedRetargettingError"],
  },
  OperationCannotBeBatched: {
    code: 151,
    categories: [],
  },
  OplogOutOfOrder: {
    code: 152,
    categories: [],
  },
  ChunkTooBig: {
    code: 153,
    categories: [],
  },
  InconsistentShardIdentity: {
    code: 154,
    categories: [],
  },
  CannotApplyOplogWhilePrimary: {
    code: 155,
    categories: [],
  },
  OBSOLETE_NeedsDocumentMove: {
    code: 156,
    categories: [],
  },
  CanRepairToDowngrade: {
    code: 157,
    categories: [],
  },
  MustUpgrade: {
    code: 158,
    categories: [],
  },
  DurationOverflow: {
    code: 159,
    categories: [],
  },
  MaxStalenessOutOfRange: {
    code: 160,
    categories: [],
  },
  IncompatibleCollationVersion: {
    code: 161,
    categories: [],
  },
  CollectionIsEmpty: {
    code: 162,
    categories: [],
  },
  ZoneStillInUse: {
    code: 163,
    categories: [],
  },
  InitialSyncActive: {
    code: 164,
    categories: [],
  },
  ViewDepthLimitExceeded: {
    code: 165,
    categories: [],
  },
  CommandNotSupportedOnView: {
    code: 166,
    categories: [],
  },
  OptionNotSupportedOnView: {
    code: 167,
    categories: [],
  },
  InvalidPipelineOperator: {
    code: 168,
    categories: [],
  },
  CommandOnShardedViewNotSupportedOnMongod: {
    code: 169,
    categories: [],
  },
  TooManyMatchingDocuments: {
    code: 170,
    categories: [],
  },
  CannotIndexParallelArrays: {
    code: 171,
    categories: [],
  },
  TransportSessionClosed: {
    code: 172,
    categories: [],
  },
  TransportSessionNotFound: {
    code: 173,
    categories: [],
  },
  TransportSessionUnknown: {
    code: 174,
    categories: [],
  },
  QueryPlanKilled: {
    code: 175,
    categories: ["CursorInvalidatedError"],
  },
  FileOpenFailed: {
    code: 176,
    categories: [],
  },
  ZoneNotFound: {
    code: 177,
    categories: [],
  },
  RangeOverlapConflict: {
    code: 178,
    categories: [],
  },
  WindowsPdhError: {
    code: 179,
    categories: [],
  },
  BadPerfCounterPath: {
    code: 180,
    categories: [],
  },
  AmbiguousIndexKeyPattern: {
    code: 181,
    categories: [],
  },
  InvalidViewDefinition: {
    code: 182,
    categories: [],
  },
  ClientMetadataMissingField: {
    code: 183,
    categories: [],
  },
  ClientMetadataAppNameTooLarge: {
    code: 184,
    categories: [],
  },
  ClientMetadataDocumentTooLarge: {
    code: 185,
    categories: [],
  },
  ClientMetadataCannotBeMutated: {
    code: 186,
    categories: [],
  },
  LinearizableReadConcernError: {
    code: 187,
    categories: [],
  },
  IncompatibleServerVersion: {
    code: 188,
    categories: [],
  },
  PrimarySteppedDown: {
    code: 189,
    categories: ["NotPrimaryError", "RetriableError"],
  },
  MasterSlaveConnectionFailure: {
    code: 190,
    categories: [],
  },
  OBSOLETE_BalancerLostDistributedLock: {
    code: 191,
    categories: [],
  },
  FailPointEnabled: {
    code: 192,
    categories: [],
  },
  NoShardingEnabled: {
    code: 193,
    categories: [],
  },
  BalancerInterrupted: {
    code: 194,
    categories: [],
  },
  ViewPipelineMaxSizeExceeded: {
    code: 195,
    categories: [],
  },
  InvalidIndexSpecificationOption: {
    code: 197,
    categories: [],
  },
  OBSOLETE_ReceivedOpReplyMessage: {
    code: 198,
    categories: [],
  },
  ReplicaSetMonitorRemoved: {
    code: 199,
    categories: [],
  },
  ChunkRangeCleanupPending: {
    code: 200,
    categories: [],
  },
  CannotBuildIndexKeys: {
    code: 201,
    categories: [],
  },
  NetworkInterfaceExceededTimeLimit: {
    code: 202,
    categories: ["ExceededTimeLimitError", "NetworkTimeoutError"],
  },
  ShardingStateNotInitialized: {
    code: 203,
    categories: [],
  },
  TimeProofMismatch: {
    code: 204,
    categories: [],
  },
  ClusterTimeFailsRateLimiter: {
    code: 205,
    categories: [],
  },
  NoSuchSession: {
    code: 206,
    categories: [],
  },
  InvalidUUID: {
    code: 207,
    categories: [],
  },
  TooManyLocks: {
    code: 208,
    categories: [],
  },
  StaleClusterTime: {
    code: 209,
    categories: [],
  },
  CannotVerifyAndSignLogicalTime: {
    code: 210,
    categories: [],
  },
  KeyNotFound: {
    code: 211,
    categories: [],
  },
  IncompatibleRollbackAlgorithm: {
    code: 212,
    categories: [],
  },
  DuplicateSession: {
    code: 213,
    categories: [],
  },
  AuthenticationRestrictionUnmet: {
    code: 214,
    categories: [],
  },
  DatabaseDropPending: {
    code: 215,
    categories: [],
  },
  ElectionInProgress: {
    code: 216,
    categories: [],
  },
  IncompleteTransactionHistory: {
    code: 217,
    categories: [],
  },
  UpdateOperationFailed: {
    code: 218,
    categories: [],
  },
  FTDCPathNotSet: {
    code: 219,
    categories: [],
  },
  FTDCPathAlreadySet: {
    code: 220,
    categories: [],
  },
  IndexModified: {
    code: 221,
    categories: [],
  },
  CloseChangeStream: {
    code: 222,
    categories: [],
  },
  IllegalOpMsgFlag: {
    code: 223,
    categories: ["ConnectionFatalMessageParseError"],
  },
  QueryFeatureNotAllowed: {
    code: 224,
    categories: [],
  },
  TransactionTooOld: {
    code: 225,
    categories: ["VoteAbortError"],
  },
  AtomicityFailure: {
    code: 226,
    categories: [],
  },
  CannotImplicitlyCreateCollection: {
    code: 227,
    categories: [],
  },
  SessionTransferIncomplete: {
    code: 228,
    categories: [],
  },
  MustDowngrade: {
    code: 229,
    categories: [],
  },
  DNSHostNotFound: {
    code: 230,
    categories: [],
  },
  DNSProtocolError: {
    code: 231,
    categories: [],
  },
  MaxSubPipelineDepthExceeded: {
    code: 232,
    categories: [],
  },
  TooManyDocumentSequences: {
    code: 233,
    categories: ["ConnectionFatalMessageParseError"],
  },
  RetryChangeStream: {
    code: 234,
    categories: [],
  },
  InternalErrorNotSupported: {
    code: 235,
    categories: [],
  },
  ForTestingErrorExtraInfo: {
    code: 236,
    categories: [],
  },
  CursorKilled: {
    code: 237,
    categories: ["Interruption", "CursorInvalidatedError"],
  },
  NotImplemented: {
    code: 238,
    categories: [],
  },
  SnapshotTooOld: {
    code: 239,
    categories: ["SnapshotError"],
  },
  DNSRecordTypeMismatch: {
    code: 240,
    categories: [],
  },
  ConversionFailure: {
    code: 241,
    categories: [],
  },
  CannotCreateCollection: {
    code: 242,
    categories: [],
  },
  IncompatibleWithUpgradedServer: {
    code: 243,
    categories: [],
  },
  NOT_YET_AVAILABLE_TransactionAborted: {
    code: 244,
    categories: [],
  },
  BrokenPromise: {
    code: 245,
    categories: [],
  },
  SnapshotUnavailable: {
    code: 246,
    categories: ["SnapshotError"],
  },
  ProducerConsumerQueueBatchTooLarge: {
    code: 247,
    categories: [],
  },
  ProducerConsumerQueueEndClosed: {
    code: 248,
    categories: [],
  },
  StaleDbVersion: {
    code: 249,
    categories: [],
  },
  StaleChunkHistory: {
    code: 250,
    categories: ["SnapshotError"],
  },
  NoSuchTransaction: {
    code: 251,
    categories: ["VoteAbortError"],
  },
  ReentrancyNotAllowed: {
    code: 252,
    categories: [],
  },
  FreeMonHttpInFlight: {
    code: 253,
    categories: [],
  },
  FreeMonHttpTemporaryFailure: {
    code: 254,
    categories: [],
  },
  FreeMonHttpPermanentFailure: {
    code: 255,
    categories: [],
  },
  TransactionCommitted: {
    code: 256,
    categories: [],
  },
  TransactionTooLarge: {
    code: 257,
    categories: [],
  },
  UnknownFeatureCompatibilityVersion: {
    code: 258,
    categories: [],
  },
  KeyedExecutorRetry: {
    code: 259,
    categories: [],
  },
  InvalidResumeToken: {
    code: 260,
    categories: [],
  },
  TooManyLogicalSessions: {
    code: 261,
    categories: [],
  },
  ExceededTimeLimit: {
    code: 262,
    categories: ["Interruption", "ExceededTimeLimitError", "RetriableError"],
  },
  OperationNotSupportedInTransaction: {
    code: 263,
    categories: ["VoteAbortError"],
  },
  TooManyFilesOpen: {
    code: 264,
    categories: [],
  },
  OrphanedRangeCleanUpFailed: {
    code: 265,
    categories: [],
  },
  FailPointSetFailed: {
    code: 266,
    categories: [],
  },
  PreparedTransactionInProgress: {
    code: 267,
    categories: [],
  },
  CannotBackup: {
    code: 268,
    categories: [],
  },
  DataModifiedByRepair: {
    code: 269,
    categories: [],
  },
  RepairedReplicaSetNode: {
    code: 270,
    categories: [],
  },
  JSInterpreterFailureWithStack: {
    code: 271,
    categories: [],
  },
  MigrationConflict: {
    code: 272,
    categories: ["SnapshotError"],
  },
  ProducerConsumerQueueProducerQueueDepthExceeded: {
    code: 273,
    categories: [],
  },
  ProducerConsumerQueueConsumed: {
    code: 274,
    categories: [],
  },
  ExchangePassthrough: {
    code: 275,
    categories: [],
  },
  IndexBuildAborted: {
    code: 276,
    categories: [],
  },
  AlarmAlreadyFulfilled: {
    code: 277,
    categories: [],
  },
  UnsatisfiableCommitQuorum: {
    code: 278,
    categories: [],
  },
  ClientDisconnect: {
    code: 279,
    categories: ["Interruption"],
  },
  ChangeStreamFatalError: {
    code: 280,
    categories: ["NonResumableChangeStreamError"],
  },
  TransactionCoordinatorSteppingDown: {
    code: 281,
    categories: ["Interruption", "InternalOnly"],
  },
  TransactionCoordinatorReachedAbortDecision: {
    code: 282,
    categories: ["Interruption", "InternalOnly"],
  },
  WouldChangeOwningShard: {
    code: 283,
    categories: [],
  },
  ForTestingErrorExtraInfoWithExtraInfoInNamespace: {
    code: 284,
    categories: [],
  },
  IndexBuildAlreadyInProgress: {
    code: 285,
    categories: [],
  },
  ChangeStreamHistoryLost: {
    code: 286,
    categories: ["NonResumableChangeStreamError"],
  },
  TransactionCoordinatorDeadlineTaskCanceled: {
    code: 287,
    categories: ["InternalOnly"],
  },
  ChecksumMismatch: {
    code: 288,
    categories: ["ConnectionFatalMessageParseError"],
  },
  WaitForMajorityServiceEarlierOpTimeAvailable: {
    code: 289,
    categories: ["InternalOnly"],
  },
  TransactionExceededLifetimeLimitSeconds: {
    code: 290,
    categories: ["Interruption", "ExceededTimeLimitError"],
  },
  NoQueryExecutionPlans: {
    code: 291,
    categories: [],
  },
  QueryExceededMemoryLimitNoDiskUseAllowed: {
    code: 292,
    categories: [],
  },
  InvalidSeedList: {
    code: 293,
    categories: [],
  },
  InvalidTopologyType: {
    code: 294,
    categories: [],
  },
  InvalidHeartBeatFrequency: {
    code: 295,
    categories: [],
  },
  TopologySetNameRequired: {
    code: 296,
    categories: [],
  },
  HierarchicalAcquisitionLevelViolation: {
    code: 297,
    categories: [],
  },
  InvalidServerType: {
    code: 298,
    categories: [],
  },
  OCSPCertificateStatusRevoked: {
    code: 299,
    categories: [],
  },
  RangeDeletionAbandonedBecauseCollectionWithUUIDDoesNotExist: {
    code: 300,
    categories: [],
  },
  DataCorruptionDetected: {
    code: 301,
    categories: [],
  },
  OCSPCertificateStatusUnknown: {
    code: 302,
    categories: [],
  },
  SplitHorizonChange: {
    code: 303,
    categories: ["CloseConnectionError"],
  },
  ShardInvalidatedForTargeting: {
    code: 304,
    categories: [],
  },
  ReadThroughCacheLookupCanceled: {
    code: 306,
    categories: ["InternalOnly"],
  },
  RangeDeletionAbandonedBecauseTaskDocumentDoesNotExist: {
    code: 307,
    categories: [],
  },
  CurrentConfigNotCommittedYet: {
    code: 308,
    categories: [],
  },
  ExhaustCommandFinished: {
    code: 309,
    categories: [],
  },
  PeriodicJobIsStopped: {
    code: 310,
    categories: ["CancellationError"],
  },
  TransactionCoordinatorCanceled: {
    code: 311,
    categories: ["InternalOnly"],
  },
  OperationIsKilledAndDelisted: {
    code: 312,
    categories: ["CancellationError", "InternalOnly"],
  },
  ResumableRangeDeleterDisabled: {
    code: 313,
    categories: [],
  },
  ObjectIsBusy: {
    code: 314,
    categories: [],
  },
  TooStaleToSyncFromSource: {
    code: 315,
    categories: ["InternalOnly"],
  },
  QueryTrialRunCompleted: {
    code: 316,
    categories: ["InternalOnly"],
  },
  ConnectionPoolExpired: {
    code: 317,
    categories: ["NetworkError", "RetriableError", "InternalOnly"],
  },
  ForTestingOptionalErrorExtraInfo: {
    code: 318,
    categories: [],
  },
  MovePrimaryInProgress: {
    code: 319,
    categories: [],
  },
  TenantMigrationConflict: {
    code: 320,
    categories: ["TenantMigrationError", "TenantMigrationConflictError"],
  },
  TenantMigrationCommitted: {
    code: 321,
    categories: ["TenantMigrationError"],
  },
  APIVersionError: {
    code: 322,
    categories: ["VersionedAPIError"],
  },
  APIStrictError: {
    code: 323,
    categories: ["VersionedAPIError"],
  },
  APIDeprecationError: {
    code: 324,
    categories: ["VersionedAPIError"],
  },
  TenantMigrationAborted: {
    code: 325,
    categories: ["TenantMigrationError"],
  },
  OplogQueryMinTsMissing: {
    code: 326,
    categories: [],
  },
  NoSuchTenantMigration: {
    code: 327,
    categories: [],
  },
  TenantMigrationAccessBlockerShuttingDown: {
    code: 328,
    categories: ["InternalOnly"],
  },
  TenantMigrationInProgress: {
    code: 329,
    categories: [],
  },
  SkipCommandExecution: {
    code: 330,
    categories: [],
  },
  FailedToRunWithReplyBuilder: {
    code: 331,
    categories: [],
  },
  CannotDowngrade: {
    code: 332,
    categories: [],
  },
  ServiceExecutorInShutdown: {
    code: 333,
    categories: ["ShutdownError", "CancellationError", "InternalOnly"],
  },
  MechanismUnavailable: {
    code: 334,
    categories: [],
  },
  TenantMigrationForgotten: {
    code: 335,
    categories: [],
  },
  TimeseriesBucketCleared: {
    code: 336,
    categories: ["InternalOnly"],
  },
  AuthenticationAbandoned: {
    code: 337,
    categories: ["InternalOnly"],
  },
  ReshardCollectionInProgress: {
    code: 338,
    categories: [],
  },
  NoSuchReshardCollection: {
    code: 339,
    categories: [],
  },
  ReshardCollectionCommitted: {
    code: 340,
    categories: [],
  },
  ReshardCollectionAborted: {
    code: 341,
    categories: [],
  },
  ReshardingCriticalSectionTimeout: {
    code: 342,
    categories: [],
  },
  ShardCannotRefreshDueToLocksHeld: {
    code: 343,
    categories: [],
  },
  AuditingNotEnabled: {
    code: 344,
    categories: [],
  },
  RuntimeAuditConfigurationNotEnabled: {
    code: 345,
    categories: [],
  },
  ChangeStreamInvalidated: {
    code: 346,
    categories: [],
  },
  APIMismatchError: {
    code: 347,
    categories: ["VersionedAPIError", "VoteAbortError"],
  },
  ChangeStreamTopologyChange: {
    code: 348,
    categories: [],
  },
  KeyPatternShorterThanBound: {
    code: 349,
    categories: [],
  },
  ReshardCollectionTruncatedError: {
    code: 350,
    categories: [],
  },
  ChangeStreamStartAfterInvalidate: {
    code: 351,
    categories: [],
  },
  UnsupportedOpQueryCommand: {
    code: 352,
    categories: [],
  },
  NonRetryableTenantMigrationConflict: {
    code: 353,
    categories: ["TenantMigrationError", "TenantMigrationConflictError"],
  },
  LoadBalancerSupportMismatch: {
    code: 354,
    categories: ["CloseConnectionError"],
  },
  InterruptedDueToStorageChange: {
    code: 355,
    categories: ["Interruption", "CancellationError"],
  },
  TxnRetryCounterTooOld: {
    code: 356,
    categories: ["VoteAbortError"],
  },
  InvalidBSONType: {
    code: 357,
    categories: [],
  },
  InternalTransactionNotSupported: {
    code: 358,
    categories: [],
  },
  CannotEnableIndexConstraint: {
    code: 359,
    categories: [],
  },
  SocketException: {
    code: 9001,
    categories: ["NetworkError", "RetriableError"],
  },
  OBSOLETE_RecvStaleConfig: {
    code: 9996,
    categories: [],
  },
  CannotGrowDocumentInCappedNamespace: {
    code: 10003,
    categories: [],
  },
  LegacyNotPrimary: {
    code: 10058,
    categories: [],
  },
  NotWritablePrimary: {
    code: 10107,
    categories: ["NotPrimaryError", "RetriableError"],
  },
  BSONObjectTooLarge: {
    code: 10334,
    categories: [],
  },
  DuplicateKey: {
    code: 11000,
    categories: [],
  },
  InterruptedAtShutdown: {
    code: 11600,
    categories: [
      "Interruption",
      "ShutdownError",
      "CancellationError",
      "RetriableError",
    ],
  },
  Interrupted: {
    code: 11601,
    categories: ["Interruption"],
  },
  InterruptedDueToReplStateChange: {
    code: 11602,
    categories: ["Interruption", "NotPrimaryError", "RetriableError"],
  },
  BackgroundOperationInProgressForDatabase: {
    code: 12586,
    categories: [],
  },
  BackgroundOperationInProgressForNamespace: {
    code: 12587,
    categories: [],
  },
  OBSOLETE_PrepareConfigsFailed: {
    code: 13104,
    categories: [],
  },
  MergeStageNoMatchingDocument: {
    code: 13113,
    categories: [],
  },
  DatabaseDifferCase: {
    code: 13297,
    categories: [],
  },
  StaleConfig: {
    code: 13388,
    categories: ["StaleShardVersionError", "NeedRetargettingError"],
  },
  NotPrimaryNoSecondaryOk: {
    code: 13435,
    categories: ["NotPrimaryError", "RetriableError"],
  },
  NotPrimaryOrSecondary: {
    code: 13436,
    categories: ["NotPrimaryError", "RetriableError"],
  },
  OutOfDiskSpace: {
    code: 14031,
    categories: [],
  },
  OBSOLETE_KeyTooLong: {
    code: 17280,
    categories: [],
  },
  ClientMarkedKilled: {
    code: 46841,
    categories: ["Interruption", "CancellationError"],
  },
  NotARetryableWriteCommand: {
    code: 50768,
    categories: [],
  },
  ConfigServerUnreachable: {
    code: 56846,
    categories: [],
  },
};
