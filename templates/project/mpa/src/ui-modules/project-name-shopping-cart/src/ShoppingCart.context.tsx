import { createContext, useContext } from 'react';
import { ShoppingCartContextType } from './ShoppingCart.types';

export const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const useShoppingCartContext = () => useContext(ShoppingCartContext) as ShoppingCartContextType;
