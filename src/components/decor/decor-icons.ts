/**
 * Shared types and factoids for the cosmic decor system.
 */

export type IconName =
  | 'astronaut'
  | 'iss'
  | 'satellite'
  | 'asteroid'
  | 'planet'
  | 'saturn'
  | 'moon'
  | 'sun'
  | 'galaxy'
  | 'star-system'
  | 'alien'
  | 'alien-ship'
  | 'ufo'
  | 'comet'
  | 'rocket'
  | 'telescope'
  | 'blackhole';

export const factoids: Record<IconName, string> = {
  astronaut: 'EVA · 408 km',
  iss: 'ISS · LEO',
  satellite: 'Voyager-1',
  asteroid: '243 Ida',
  planet: 'Kepler-186f',
  saturn: 'Saturn · ⌀ 120 k km',
  moon: 'Luna · 384 k km',
  sun: 'Sol · G2V',
  galaxy: 'Andromeda · M31',
  'star-system': 'TRAPPIST-1',
  alien: 'Lifeform · unknown',
  'alien-ship': 'Scout vessel',
  ufo: 'Unidentified',
  comet: 'Halley · 76 yr',
  rocket: 'Falcon · T-0',
  telescope: 'JWST · L2',
  blackhole: 'Sgr A* · 4M M☉',
};
