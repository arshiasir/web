import aboutGeometric from '../assets/images/about_geometric_shapes_1779712914711.png';
import arshiaPortrait from '../assets/images/arshia.png';
import calkiloMockup from '../assets/images/calkilo_mockup_1779713789930.png';
import couchiniMockup from '../assets/images/couchini_mockup_1779713805197.png';
import faceauthMockup from '../assets/images/faceauth_mockup_1779713858799.png';
import hyperstarMockup from '../assets/images/hyperstar_mockup_1779713838569.png';
import tipaxMockup from '../assets/images/tipax_mockup_1779713822171.png';
import tvarxMockup from '../assets/images/tvarx.png';

const screenAssets = import.meta.glob('../assets/images/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

// Resolve an asset by filename from src/assets/images/.
// In JSON just put the file name, e.g. screens: [{ image: 'calkilo_scan.png' }]
export function resolveAsset(name?: string): string | undefined {
  if (!name) return undefined;
  return screenAssets[`../assets/images/${name}`];
}

export const imageLinks = {
  arshiaPortrait,
  aboutGeometric,
  calkiloMockup,
  couchiniMockup,
  tipaxMockup,
  hyperstarMockup,
  faceauthMockup,
  tvarxMockup,
} as const;
