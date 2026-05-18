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
		url: `${config.apiBaseUrl}/auth/v1/login`,
		method: 'POST',
		resolver: async ({ request }) => {
			const body = await request.json();
			const { username } = body;
			log('login with params: ', body);
			const mockUser = getMockUser(username);
			const headers = new Headers();
			const mockToken = 'T3heTaj24j4m58ajlAA';
			headers.append('Content-Type', 'application/json');
			headers.append('x-amdocs-token', mockToken);
			headers.append('set-cookie', `x-amdocs-token=${mockToken}; Path=/; Max-Age=1800; Expires=Thu, 30 Oct 2025 13:19:14 GMT; Secure; HttpOnly; SameSite=Strict`);
			return HttpResponse.json(mockUser, { headers });
		}
	},
	{
		url: `${config.apiBaseUrl}/auth/v1/generateAnonymousToken`,
		method: 'POST',
		resolver: async () => {
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');
			// Mirror BE: return token in header and set-cookie
			const mockToken = 'ODYyMzI0W...mocked-anon-token...eQy6oXUOjAA';
			headers.append('x-amdocs-token', mockToken);
			headers.append('set-cookie', `x-amdocs-token=${mockToken}; Path=/; Max-Age=1800; Expires=Thu, 30 Oct 2025 13:19:14 GMT; Secure; HttpOnly; SameSite=Strict`);
			return HttpResponse.json({}, { headers });
		}
	},
	{
		url: `${config.apiBaseUrl}/auth/v1/logout`,
		resolver: () => HttpResponse.json({})
	},
];