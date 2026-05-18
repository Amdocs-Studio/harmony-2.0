import { HttpResponse } from 'msw';
import { config, PoliciesType } from '@sdk';
import { MockHandlerType } from '../types';

const policies = [
	{
		id: 'add_new_device',
		value: 'hidden'
	},
	{
		id: 'add_new_line',
		value: 'visible'
	},
	{
		id: 'upgrade_device',
		value: 'disabled'
	},
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

const adminPolicies = [
	{
		id: 'add_new_device',
		value: 'visible'
	},
	{
		id: 'add_new_line',
		value: 'visible'
	},
	{
		id: 'upgrade_device',
		value: 'visible'
	},
	{
		id: 'bill_history_module',
		value: 'visible'
	},
	{
		id: 'add-new-line',
		value: 'visible'
	},
	{
		id: 'shopping-blocked-message',
		value: 'visible'
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
		value: 'visible'
	}
] as PoliciesType;

export const handlers: MockHandlerType[] = [
	{
		url: `${config.apiBaseUrl}/v1/rba/policies`,
		resolver: ({ request }) => {
			const xToken = request?.headers?.get('authorization') || '';
			if (xToken.indexOf('T3heTaj24j4m58ajlAA') >= 0) {
				return HttpResponse.json(adminPolicies);
			}
			return HttpResponse.json(policies);
		}
	},
];