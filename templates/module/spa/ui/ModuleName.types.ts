import { User, NavigateFunction } from '@sdk';
import { FormatMessageType } from '@msgs';

export type ModuleNameContextType = {
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: FormatMessageType
}

export type ModuleNameProps = object