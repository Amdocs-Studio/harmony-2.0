import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './ModuleNameConfig';

const POSTS_TAG = 'Posts';

type Post = {
	id: number;
	title: string;
	body: string;
}
type PostsResponse = Post[];

export const moduleNameApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({
		baseUrl: 'posts'
	}),
	tagTypes: [POSTS_TAG],
	endpoints: (build) => ({
		getPosts: build.query<PostsResponse, void>({
			query: () => '',
			providesTags: [POSTS_TAG]
		}),
		addPost: build.mutation<Post, Partial<Post>>({
			query(body) {
				return {
					url: '',
					method: 'POST',
					body
				};
			},
			invalidatesTags: [POSTS_TAG]
		}),
		getPost: build.query<Post, number>({
			query: (id) => `/${id}`,
			providesTags: [POSTS_TAG]
		}),
		updatePost: build.mutation<Post, Partial<Post>>({
			query(data) {
				const { id, ...body } = data;
				return {
					url: `/${id}`,
					method: 'PUT',
					body
				};
			},
			invalidatesTags: ( post ) => [{ type: POSTS_TAG, id: post?.id }]
		}),
		deletePost: build.mutation<{ success: boolean; id: number }, number>({
			query(id) {
				return {
					url: `/${id}`,
					method: 'DELETE'
				};
			},
			invalidatesTags: (result) => [{ type: POSTS_TAG, id: result?.id }]
		})
	})
});

/*
Uncomment this block if you want to use redux-persist
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const moduleNameApiReducer = persistReducer({
		key: config.apiSliceName,
		storage,
		version: 1,
		whitelist: ['queries', 'mutations']
	}, moduleNameApi.reducer)

	*/

export const moduleNameApiReducer = moduleNameApi.reducer;