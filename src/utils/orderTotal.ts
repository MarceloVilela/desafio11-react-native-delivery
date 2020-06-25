import { Alert } from 'react-native';

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Order {
  price: number;
  quantity?: number;
  extras: Extra[];
}

const orderTotal = ({ price, quantity = 1, extras }: Order): number => {
  let extrasTotal = 0;

  if (extras.length !== 0) {
    const reducer = (
      accumulator: number,
      { quantity = 0, value }: Extra,
    ): number => {
      return accumulator + quantity * value;
    };

    extrasTotal = extras.reduce(reducer, 0);
  }

  const unitCost = Number(extrasTotal) + Number(price);
  return unitCost * quantity;
};

export default orderTotal;
