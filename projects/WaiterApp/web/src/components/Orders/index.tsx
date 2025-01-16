import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket']
    });

    socket.on('new_order', (order) => {
      setOrders(prev => prev.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get('/orders').then(({ data }) => {
      setOrders(data);
    });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const production = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prev) => prev.filter((order) => order._id !== orderId));
  }

  function handleStatusOrderChange(orderId: string, status: Order['status']) {
		console.log('🚀 ~ handleStatusOrderChange ~ orderId:', orderId);
		
    setOrders((prev) =>
      prev.map((order) =>
        order._id !== orderId ? { ...order, status } : order
      ));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleStatusOrderChange}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={production}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleStatusOrderChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleStatusOrderChange}
      />
    </Container>
  );
}
