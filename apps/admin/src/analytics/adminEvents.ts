/** Browser admin portal events for Pendo. Never include PII such as emails. */

import type { Plan, Role } from "../api/client";

declare global {
  interface Window {
    pendo?: {
      track: (
        eventName: string,
        metadata?: Record<string, string | boolean | number | undefined>
      ) => void;
    };
  }
}

export interface SubscriptionUpdatedMetadata {
  plan: Plan;
  previousPlan?: Plan;
  seats: number;
  previousSeats?: number;
  organizationId?: string;
}

export type MemberAccessChangeType = "role_changed" | "deactivated" | "reactivated";

export interface MemberAccessChangedMetadata {
  changeType: MemberAccessChangeType;
  memberId: string;
  newRole: Role;
  previousRole: Role;
  active: boolean;
  organizationId?: string;
}

function track(
  eventName: string,
  metadata: Record<string, string | boolean | number | undefined>
): void {
  try {
    window.pendo?.track(eventName, metadata);
  } catch {
    // Tracking must never break the admin portal.
  }
}

export function trackSubscriptionUpdated(metadata: SubscriptionUpdatedMetadata): void {
  track("subscription_updated", { ...metadata });
}

export function trackMemberAccessChanged(metadata: MemberAccessChangedMetadata): void {
  track("member_access_changed", { ...metadata });
}
