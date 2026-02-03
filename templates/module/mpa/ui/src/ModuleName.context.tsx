import { createContext, useContext } from 'react';
import { ModuleNameContextType } from './ModuleName.types';

export const ModuleNameContext = createContext<ModuleNameContextType | undefined>(undefined);
export const useModuleNameContext = () => useContext(ModuleNameContext) as ModuleNameContextType;

