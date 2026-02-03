import { createContext, useContext } from 'react';
import { NavbarContextType } from './Navbar.types';

export const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbarContext = () => useContext(NavbarContext) as NavbarContextType;
