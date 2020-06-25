import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import orderTotal from '../../utils/orderTotal';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedValue: number;
  thumbnail_url: string;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Order extends Food {
  quantity?: number;
  extras: Extra[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const response = await api.get<Order[]>('/orders');

      const ordersFormatted = response.data.map(item => {
        const { price, quantity, extras } = item;
        const value = orderTotal({ price, quantity, extras });

        return {
          ...item,
          formattedPrice: formatValue(value),
        };
      });

      setOrders(ordersFormatted);
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedPrice}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
