import { delay as wait, http, HttpHandler } from 'msw';
import { handlers as postHandlers } from './postsMockHandler.ts';
import { handlers as userHandlers } from './authMockHandler.ts';
import { handlers as rbaHandlers } from './rbaMockHandler.ts';
import { handlers as feedbackHandler } from './feedbackMockHandler.ts';

export const handlers: HttpHandler[] = [
	...postHandlers,
	...userHandlers,
	...feedbackHandler,
	...rbaHandlers,
].map((handler) => {
	const { url, method = 'GET', resolver, delay } = handler;
	const delayedResponse = async (ctx: any) => {
		await wait(delay || 1500);
		return resolver(ctx);
	};
	switch (method) {
		case 'POST':
			return http.post(url, delayedResponse);
		case 'PUT':
			return http.put(url, delayedResponse);
		case 'DELETE':
			return http.delete(url, delayedResponse);
		default:
			return http.get(url, delayedResponse);
	}
});

