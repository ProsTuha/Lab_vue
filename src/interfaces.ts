export interface ICategory {
  id: number;
  logoPath: string;
  categoryName: string;
}

interface iProduct {
  id: number;
  categoryId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
}
