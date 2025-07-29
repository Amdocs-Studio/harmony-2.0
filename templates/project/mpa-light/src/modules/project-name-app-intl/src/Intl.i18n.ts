import { loginDescriptor } from '../../project-name-login/src/Login.i18n';
import { commonDescriptor } from './commonDescriptor';
import { feedbackHandlerDescriptor } from '../../project-name-feedback-handler/src/FeedbackHandler.i18n';
import { homeDescriptor } from '../../project-name-home/src/Home.i18n';
import { navbarDescriptor } from '../../project-name-navbar/src/Navbar.i18n';

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
