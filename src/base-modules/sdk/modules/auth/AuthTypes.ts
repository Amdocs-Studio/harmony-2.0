export enum AUTH_TAG_TYPES  {
	AUTH = 'AUTH'
}

export type User = {
	id: number,
	name: string,
	username: string,
	email: string,
	phone: string,
	website: string,
}

export type LoginPayload = {
	username: string,
	password: string,
}

export type AuthStateType = {
	token?: string,
	user?: User,
}