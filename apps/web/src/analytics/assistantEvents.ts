/** Browser research assistant events. Never include prompt or reply text. */

export type AssistantReplyOutcome = "answered" | "not_configured" | "failed";

export interface AssistantReplyMetadata {
  outcome: AssistantReplyOutcome;
  /** Model that answered, or "none" when the assistant isn't configured or failed. */
  model: string;
  /** Messages in the conversation after this request finished. */
  messageCount: number;
  /** Number of questions the visitor has sent in this conversation. */
  conversationTurn: number;
  errorMessage?: string;
}

export function trackAssistantReplyReceived(metadata: AssistantReplyMetadata): void {
  try {
    window.pendo?.track("assistant_reply_received", {
      ...metadata,
      errorMessage: metadata.errorMessage?.slice(0, 100),
    });
  } catch {
    // Tracking must never break the assistant panel.
  }
}
