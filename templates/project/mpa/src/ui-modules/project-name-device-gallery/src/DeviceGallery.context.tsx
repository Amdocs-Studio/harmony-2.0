import { createContext, useContext } from 'react';
import { DeviceGalleryContextType } from './DeviceGallery.types';

export const DeviceGalleryContext = createContext<DeviceGalleryContextType | undefined>(undefined);

export const useDeviceGalleryContext = () => useContext(DeviceGalleryContext) as DeviceGalleryContextType;
