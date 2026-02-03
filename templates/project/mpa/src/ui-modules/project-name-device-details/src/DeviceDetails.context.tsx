import { createContext, useContext } from 'react';
import { DeviceDetailsContextType } from './DeviceDetails.types';

export const DeviceDetailsContext = createContext<DeviceDetailsContextType | undefined>(undefined);

export const useDeviceDetailsContext = () => useContext(DeviceDetailsContext) as DeviceDetailsContextType;
