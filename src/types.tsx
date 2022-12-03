import React from 'react';
import type { WifiConfig } from 'wifi-qr';

export type { WifiAuthenticationType } from 'wifi-qr';

export type FormValues = WifiConfig;

export type UpdateValuesCallback = (
  fieldName: keyof FormValues
) => (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
