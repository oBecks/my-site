// How long Conversation logs are kept. The chat notice and /privacy both show
// this number. Kept apart from conversation-log.ts so client code can import
// it without pulling in the database driver.
export const LOG_RETENTION_DAYS = 90;
