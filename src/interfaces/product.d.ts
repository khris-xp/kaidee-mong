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

export interface INewProduct {
    product_id: string;
    title: string;
    price: number;
    description: string;
    content: string;
    category: string;
    images: IImages;
}

export interface IImages {
    public_id: string;
    url: string;
}