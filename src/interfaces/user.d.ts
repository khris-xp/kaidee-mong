export interface IUser {
	_id: string;
	email: string;
	name: string;
	role: number;
	cart: Array<object>;
	createdAt: Date | undefined;
	updatedAt: Date | undefined;
	__v: number;
}
