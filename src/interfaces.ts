export interface ICategory {
  id: number;
  logoPath: string;
  categoryName: string;
}

export interface IProduct {
  id: number;
  categoryId: string;
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
  sex: string;
  age: number;
  address: string;
  shippingAddress: string;
  paymentCard: string;
}
