export function triggerEmberBurst() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cc-ember-burst"));
  }
}
