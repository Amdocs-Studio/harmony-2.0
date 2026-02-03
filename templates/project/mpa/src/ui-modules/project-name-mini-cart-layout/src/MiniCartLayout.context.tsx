import { createContext, useContext } from 'react';
import { MiniCartLayoutContextType } from './MiniCartLayout.types';

export const MiniCartLayoutContext = createContext<MiniCartLayoutContextType | undefined>(undefined);

export const useMiniCartLayoutContext = () => useContext(MiniCartLayoutContext) as MiniCartLayoutContextType;
