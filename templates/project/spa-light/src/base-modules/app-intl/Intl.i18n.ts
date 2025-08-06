import {
	homeHeroDescriptor,
	navbarDescriptor,
	loginFormDescriptor,
} from '@ui-modules';
import { commonDescriptor } from './commonDescriptor';
import { feedbackHandlerDescriptor } from '../feedback-handler/FeedbackHandler.i18n';

export const enMessages = {
	login: loginFormDescriptor.en,
	EMPTY: ' ',
	common: commonDescriptor.en,
	feedbackHandler: feedbackHandlerDescriptor.en,
	homeHero: homeHeroDescriptor.en,
	navbar: navbarDescriptor.en,
} as const;

export const messages = {
	en: enMessages,
} as const;
