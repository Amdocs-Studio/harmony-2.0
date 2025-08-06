import { User, NavigateFunction, useAppIntl, MessagesType, ConfigType, useAuth } from '@sdk';

export type LoginFormContextType = {
	navigate: NavigateFunction
	userInfo?: User
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage']
	messages: MessagesType;
	config: ConfigType;
	login: ReturnType <typeof useAuth>['login']
}

export type LoginFormProps = object