import { User, NavigateFunction, useAuth } from '@sdk';

export type LoginContextType = {
	navigate: NavigateFunction
	userInfo?: User
	login: ReturnType <typeof useAuth>['login']
}

export type LoginProps = object