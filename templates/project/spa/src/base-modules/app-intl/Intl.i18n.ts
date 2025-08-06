import {
	homeHeroDescriptor,
	navbarDescriptor,
	loginFormDescriptor,
	deviceDetailsDescriptor,
	deviceGalleryDescriptor,
	miniCartLayoutDescriptor,
	shoppingCartDescriptor,
} from '@ui-modules';
import { commonDescriptor } from './commonDescriptor';
import { feedbackHandlerDescriptor } from '../feedback-handler/FeedbackHandler.i18n';

export const enMessages = {
	shoppingCart: shoppingCartDescriptor.en,
	miniCartLayout: miniCartLayoutDescriptor.en,
	deviceGallery: deviceGalleryDescriptor.en,
	deviceDetails: deviceDetailsDescriptor.en,
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
