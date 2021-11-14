export interface IWish {
  id: number;
  name: string;
  description: string;
  url: string;
  price: string;
}

export interface IWishDTO {
  name: string;
  description?: string;
  url?: string;
  price?: string;
}