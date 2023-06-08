import { writable, type Writable } from 'svelte/store';
import type { IUser } from '../interfaces/user';
import { userService } from '../services/user.services';

export const initialUser: IUser = {
	_id: '',
	name: '',
	email: '',
	role: 0,
	cart: [],
	createdAt: undefined,
	updatedAt: undefined,
	__v: 0
};

export const user: Writable<IUser> = writable(initialUser);

export const updateUserProfile = async (): Promise<void> => {
	const profileData = await userService.getUserProfile();
	user.set(profileData);
};

updateUserProfile();
