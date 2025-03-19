import { ResponseResolver } from 'msw';

export type MockHandlerType = {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	url: string;
	args?: any;
	resolver: ResponseResolver<any>;
	params?: any;
};