export default interface Laptop {
    id: string;
    brand: string;
    name: string;
    quantity: number;
    description: string;
    discount: number;
    disk: string;
    featured: boolean;
    inStock: boolean;
    offerPrice: number;
    price: number;
    processor: string;
    ram: string;
    screenSize: string;
    tag: string;
    imgUrl: string[];
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    reviews: string;
  }