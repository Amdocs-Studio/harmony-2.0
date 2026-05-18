import { useSelector } from 'react-redux';
import type { RootState } from '@sdk';
export const useAppSelector = useSelector.withTypes<RootState>();