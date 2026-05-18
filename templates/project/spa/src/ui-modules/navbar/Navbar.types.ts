import { NavigateFunction, User } from '@sdk';
import { FormatMessageType } from '@msgs';

export type NavbarContextType = {
    onLogout: () => void;
    navigate: NavigateFunction
    userInfo?: User
    onBackToHome: () => void
    formatMessage: FormatMessageType
}

export type NavbarProps = object