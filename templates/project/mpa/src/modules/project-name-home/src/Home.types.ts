import { NavigateFunction, User } from '@sdk';

export type HomeContextType = {
    onLogout: () => void;
    navigate: NavigateFunction
    userInfo?: User
    onStartBuyFlow: () => void;
}

export type HomeProps = object