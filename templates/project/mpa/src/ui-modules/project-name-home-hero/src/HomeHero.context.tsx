import { createContext, useContext } from 'react';
import { HomeHeroContextType } from './HomeHero.types';

export const HomeHeroContext = createContext<HomeHeroContextType | undefined>(undefined);

export const useHomeHeroContext = () => useContext(HomeHeroContext) as HomeHeroContextType;
