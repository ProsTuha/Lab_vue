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
  publisher: string;
  country: string;
  edition: string;
  announcementDate: string;
  tags: string;
  systemRequirements: string;
}

export interface IUser {
  id: number;
  login: string;
  role: string;
  firstName: string;
  lastName: string;
  password: string;
  sex: 'Male'|'Female';
  age: number;
  address: string;
  shippingAddress: string;
  paymentCard: string;
}
