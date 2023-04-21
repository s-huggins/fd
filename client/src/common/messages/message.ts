/**
 * Base class for messages/commands flowing between
 * background.ts <--msg--> contentScript.ts
 * background.ts <--msg--> popup.ts
 */
export abstract class Message {
  abstract readonly id: string;
}
