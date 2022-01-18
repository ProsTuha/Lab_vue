export interface ICategory {
  id: number;
  logoPath: string;
  categoryName: string;
}

interface iProduct {
  id: number;
  categoryId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productGenre: string;
  productRating: number;
  productImagePath: string;
}
