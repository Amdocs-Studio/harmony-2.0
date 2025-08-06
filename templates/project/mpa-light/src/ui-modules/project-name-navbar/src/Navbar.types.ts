import { User, NavigateFunction, useAppIntl, MessagesType, ConfigType } from '@sdk';

export type NavbarContextType = {
	navigate: NavigateFunction;
	userInfo?: User;
	formatMessage: ReturnType<typeof useAppIntl>['formatMessage'];
	messages: MessagesType;
	config: ConfigType;
	onBackToHome: () => void;
	onLogout: () => void;
	onLoginClick: () => void;
}

export type NavbarProps = object