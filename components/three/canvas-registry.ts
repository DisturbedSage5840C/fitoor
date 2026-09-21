// Only one WebGL canvas should be live at a time — low/mid-tier devices choke
// on multiple simultaneous contexts, and iOS Safari hard-caps them. Each
// CanvasGate registers itself as it mounts, evicting whichever gate mounted
// before it.
type Unmount = () => void;

const active = new Map<string, Unmount>();

export function activateCanvas(id: string, unmount: Unmount) {
  for (const [otherId, otherUnmount] of active) {
    if (otherId !== id) {
      otherUnmount();
      active.delete(otherId);
    }
  }
  active.set(id, unmount);
}

export function deactivateCanvas(id: string) {
  active.delete(id);
}
