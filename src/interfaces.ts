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
  productGenre: string; // ИЗМЕНИТЬ НА ПЕРЕЧИСЛЕНИЕ!
  productRating: number;
  productImagePath: string;
}
