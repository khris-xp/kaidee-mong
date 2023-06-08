import { get, writable } from 'svelte/store';
import type { ICart } from '../interfaces/product';

export const cartItems = writable<ICart[]>([]);
export const addToCart = (id: string) => {
	const items = get(cartItems);
	const itemPosition = items.findIndex((item) => {
		return item._id == id;
	});

	if (itemPosition !== -1) {
		cartItems.update(() => {
			const updatedItems = items.map((item) => {
				if (item._id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});

			return updatedItems;
		});
	} else {
		cartItems.update(() => {
			return [...items, { _id: id, quantity: 1 }];
		});
	}
};

export const removeFromCart = (id: string) => {
	const items = get(cartItems);
	const itemPosition = items.findIndex((item) => {
		return item._id == id;
	});

	if (items[itemPosition]?.quantity - 1 === 0) {
		items.splice(itemPosition, 1);
	}

	cartItems.update(() => {
		const updatedItems = items.map((item) => {
			if (item._id === id) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});

		return updatedItems;
	});
};
