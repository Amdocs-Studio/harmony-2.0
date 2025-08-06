import { NavigateFunction, User } from '@sdk';

export type NavbarContextType = {
    onLogout: () => void;
    navigate: NavigateFunction
    userInfo?: User
    onBackToHome: () => void
}

export type NavbarProps = object