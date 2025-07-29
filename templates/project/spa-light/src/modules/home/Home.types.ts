import { NavigateFunction, User } from '@sdk';

export type HomeContextType = {
    onLogout: () => void;
    navigate: NavigateFunction
    userInfo?: User
}

export type HomeProps = object