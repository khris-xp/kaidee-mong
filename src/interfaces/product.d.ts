export interface ICart {
    _id: string;
    quantity: number;
}

export interface IProduct {
    product_id: string;
    title: string;
    price: number;
    description: string;
    content: string;
    category: string;
    images: IImages;
    sold: number;
    checked: boolean;
}

export interface IImages {
    public_id: string;
    url: string;
}