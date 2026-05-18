import { HttpResponse } from 'msw';
import { config, PoliciesType } from '@sdk';
import { MockHandlerType } from '../types';

const policies = [
	{
		id: 'bill_history_module',
		value: 'visible'
	},
	{
		id: 'add-new-line',
		value: 'disabled'
	},
	{
		id: 'shopping-blocked-message',
		value: 'hidden'
	},
	{
		id: 'manage-profile-details-visible-readonly',
		value: 'visible'
	},
	{
		id: 'change-ownership',
		value: 'visible'
	},
	{
		id: 'unbilled-events-module-view-subscriptions',
		value: 'hidden'
	}
] as PoliciesType;

export const handlers: MockHandlerType[] = [
	{ url: `${config.apiBaseUrl}/v1/rba/policies`, resolver: () => HttpResponse.json(policies) },
];