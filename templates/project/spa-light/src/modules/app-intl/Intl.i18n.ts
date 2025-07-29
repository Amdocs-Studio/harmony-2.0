import { loginDescriptor } from '../login/Login.i18n';
import { commonDescriptor } from './commonDescriptor';
import { feedbackHandlerDescriptor } from '../feedback-handler/FeedbackHandler.i18n';
import { homeDescriptor } from '../home/Home.i18n';
import { navbarDescriptor } from '../navbar/Navbar.i18n';

export const enMessages = {
	login: loginDescriptor.en,
	EMPTY: ' ',
	common: commonDescriptor.en,
	feedbackHandler: feedbackHandlerDescriptor.en,
	home: homeDescriptor.en,
	navbar: navbarDescriptor.en,
} as const;

export const messages = {
	en: enMessages,
} as const;
