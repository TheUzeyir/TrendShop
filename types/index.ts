export type ProductItem = {
  name: string;
  price: string;
  img: string;
};

export type Product = {
  category: string;
  sosial: string;
  name: string;
  description: string;
  person: string;
  link: string;
  items: ProductItem[];
};