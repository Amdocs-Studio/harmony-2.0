import { shoppingCartDescriptor } from '../shopping-cart/ShoppingCart.i18n';
import { miniCartLayoutDescriptor } from '../mini-cart-layout/MiniCartLayout.i18n';
import { deviceGalleryDescriptor } from '../device-gallery/DeviceGallery.i18n';
import { deviceDetailsDescriptor } from '../device-details/DeviceDetails.i18n';
import { commonDescriptor } from './commonDescriptor';
import { feedbackHandlerDescriptor } from '../feedback-handler/FeedbackHandler.i18n';
import { homeDescriptor } from '../home/Home.i18n';
import { navbarDescriptor } from '../navbar/Navbar.i18n';

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
