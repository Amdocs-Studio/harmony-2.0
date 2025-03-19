import { User, NavigateFunction } from '@sdk';

export type ModuleNameContextType = {
	navigate: NavigateFunction
	userInfo?: User
}

export type ModuleNameProps = object