/** Novus by Pendo agent, loaded by the install script in index.html. */
type PendoMetadata = Record<string, string | number | boolean>;

interface PendoIdentity {
  visitor: PendoMetadata & { id: string };
  account?: PendoMetadata & { id: string };
}

interface PendoAgent {
  initialize: (options: PendoIdentity) => void;
  identify: (identity: PendoIdentity) => void;
  /** Not stubbed by the install script, so it exists only after the agent loads. */
  clearSession?: () => void;
  track: (eventName: string, metadata?: PendoMetadata) => void;
}

declare var pendo: PendoAgent;
