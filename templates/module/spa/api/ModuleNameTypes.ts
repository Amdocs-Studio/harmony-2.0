export type SomeActionPayloadType = {
	code: string;
};

export interface ModuleNameStateType {
	someState: string;
}

export const POSTS_TAG = 'Posts';

export type Post = {
	id: number;
	title: string;
	body: string;
}

export type PostsResponse = {
	posts: Post[]
};