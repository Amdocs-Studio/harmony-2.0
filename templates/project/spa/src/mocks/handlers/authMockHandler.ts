import { HttpResponse } from 'msw';
import { User, config } from '@sdk';
import { MockHandlerType } from '../types';

const { log } = console;

const getMockUser = (username: string): User => {
	switch (username) {
		case 'admin':
			return {
				name: 'Test Admin',
				id: Date.now(),
				email: 'test.admin@email.com',
				phone: '123456788',
				username: username,
				website: 'https://testadmin.com',
			};
		default:
			return {
				name: 'Test User',
				id: Date.now(),
				email: 'test.auth@email.com',
				phone: '123456789',
				username: username,
				website: 'https://testuser.com',
			};
	}
};

export const handlers: MockHandlerType[] = [
	{
		url: `${config.apiBaseUrl}/v1/auth/login`,
		method: 'POST',
		resolver: async ({ request }) => {
			const body = await request.json();
			const { username } = body;
			log('login with params: ', body);
			const mockUser = getMockUser(username);
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('X-token', username === 'admin' ? 'T3heTaj24j4m58ajlAA' : 'T3heTaj24j4m58ajlakf1');
			return HttpResponse.json(mockUser, { headers });
		}
	},
	{
		url: `${config.apiBaseUrl}/v1/auth/logout`,
		resolver: () => HttpResponse.json({})
	},
];