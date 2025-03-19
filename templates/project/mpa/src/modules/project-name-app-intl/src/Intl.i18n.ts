import { shoppingCartDescriptor } from '../../project-name-shopping-cart/src/ShoppingCart.i18n';
import { miniCartLayoutDescriptor } from '../../project-name-mini-cart-layout/src/MiniCartLayout.i18n';
import { deviceGalleryDescriptor } from '../../project-name-device-gallery/src/DeviceGallery.i18n';
import { deviceDetailsDescriptor } from '../../project-name-device-details/src/DeviceDetails.i18n';
import { commonDescriptor } from './commonDescriptor';
import { feedbackHandlerDescriptor } from '../../project-name-feedback-handler/src/FeedbackHandler.i18n';
import { homeDescriptor } from '../../project-name-home/src/Home.i18n';
import { navbarDescriptor } from '../../project-name-navbar/src/Navbar.i18n';

export const enMessages = {
	shoppingCart: shoppingCartDescriptor.en,
	miniCartLayout: miniCartLayoutDescriptor.en,
	deviceGallery: deviceGalleryDescriptor.en,
	deviceDetails: deviceDetailsDescriptor.en,
	EMPTY: ' ',
	common: commonDescriptor.en,
	feedbackHandler: feedbackHandlerDescriptor.en,
	home: homeDescriptor.en,
	navbar: navbarDescriptor.en,
} as const;

export const messages = {
	en: enMessages,
} as const;
