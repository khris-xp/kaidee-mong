export interface IProduct {
    _id: string;
    name: string;
    price: number;
    sale_price: number;
    rating: number;
    image: string;
}

export interface ICart {
    _id: string;
    quantity: number;
}