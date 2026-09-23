// Lets anything on the page open the Assistant without sharing React state
// with the widget, which lives in the root layout.
export const OPEN_ASSISTANT_EVENT = "assistant:open";

export function openAssistant() {
  window.dispatchEvent(new Event(OPEN_ASSISTANT_EVENT));
}
