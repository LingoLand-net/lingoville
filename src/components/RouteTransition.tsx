import type { ReactNode } from 'react';

export function RouteTransition({ locationKey, children }: { locationKey: string; children: ReactNode }) {
  // Changing the key remounts the div → the CSS `route-in` animation replays.
  return (
    <div key={locationKey} className="route-transition">
      {children}
    </div>
  );
}