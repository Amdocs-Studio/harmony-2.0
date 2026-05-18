import { HttpResponse } from 'msw';
import { FeedbackHandlerConfigType, config as sdkConfig } from '@sdk';
import { MockHandlerType } from '../types';

const config: FeedbackHandlerConfigType = {
	dummy_success_snackbar: {
		title: 'Confirmation',
		message: 'Some dummy success snackbar, dummy value is: {dummyValue}',
		type: 'success',
		timeout: 6000,
		position: 'top-center',
		feedbackType: 'snackbar',
	},
	dummy_error_snackbar: {
		title: 'Failed',
		message: 'Some dummy error feedback',
		type: 'error',
		position: 'top-center',
		feedbackType: 'snackbar',
	},
};

export const handlers: MockHandlerType[] = [
	{
		url: `${sdkConfig.apiBaseUrl}/feedback-config`,
		resolver: () => HttpResponse.json(config)
	},
];