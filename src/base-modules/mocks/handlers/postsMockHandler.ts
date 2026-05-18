import { HttpResponse } from 'msw';
import { MockHandlerType } from '../types';
import { config } from '@sdk';

const mockPosts = [
	{
		'userId': 1,
		'id': 1,
		'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
		'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
	},
	{
		'userId': 1,
		'id': 2,
		'title': 'qui est esse',
		'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
	},
	{
		'userId': 1,
		'id': 3,
		'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
		'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
	},
	{
		'userId': 1,
		'id': 4,
		'title': 'eum et est occaecati',
		'body': 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
	},
	{
		'userId': 1,
		'id': 5,
		'title': 'nesciunt quas odio',
		'body': 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque'
	}
];

export const handlers: MockHandlerType[] = [
	{
		url: config.apiBaseUrl + '/posts',
		delay: 2000,
		resolver: () => {
			return HttpResponse.json({
				posts: [...mockPosts],
			});
		}
	},
	{
		url: config.apiBaseUrl + '/posts/:id',
		resolver: ({ id }) => {
			const post = mockPosts.find((post) => post.id === id);
			if (!post) {
				return new HttpResponse(null, { status: 404 });
			}
			return HttpResponse.json({
				post,
			});
		}
	},
	{
		url: config.apiBaseUrl + '/posts',
		method: 'POST',
		resolver: () => {
			return HttpResponse.json({});
		}
	},
	{
		url: config.apiBaseUrl + '/posts/:id',
		method: 'DELETE',
		resolver: ({ id }) => {
			const post = mockPosts.find((post) => post.id === id);
			if (!post) {
				return new HttpResponse(null, { status: 404 });
			}
			return HttpResponse.json({
				post,
			});
		}
	},

];