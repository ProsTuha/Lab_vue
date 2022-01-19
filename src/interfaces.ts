export interface ICategory {
  id: number;
  logoPath: string;
  categoryName: string;
}

export interface IProduct {
  id: number;
  categoryId: number;
  productName: string;
  productDescription: string;
  productPrice: number; 
  productGenre: string;
  productRating: number;
  productImagePath: string;
  creationDate: string;
}
