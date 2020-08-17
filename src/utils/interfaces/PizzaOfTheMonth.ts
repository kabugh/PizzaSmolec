export default interface PizzaOfTheMonth {
  name: string;
  description: string;
  image: { fields: { file: { url: string } } };
  price: number;
}
