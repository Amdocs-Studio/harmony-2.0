import { User, NavigateFunction, LoginPayload, useAppIntl, MessagesType, ConfigType } from '@sdk';

export type LoginFormContextType = {
	navigate: NavigateFunction
	userInfo?: User;
	login: (payload: LoginPayload) => void;
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage']
	messages: MessagesType;
	config: ConfigType;
}

export type LoginFormProps = object