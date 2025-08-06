import { User, NavigateFunction, useAppIntl, MessagesType, ConfigType } from '@sdk';

export type ModuleNameContextType = {
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage']
	messages: MessagesType;
	config: ConfigType
}

export type ModuleNameProps = object