import { WifiAuthenticationType } from './types';

export const TYPES: Record<WifiAuthenticationType, string> = {
  nopass: 'No authentication',
  WEP: 'WEP authentication',
  WPA: 'WPA/WPA2 authentication',
};
