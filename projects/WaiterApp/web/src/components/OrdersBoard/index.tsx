import { useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Array<Order>;
  onCancelOrder(orderId: string): void;
  onChangeStatus(orderId: string, status: Order['status']): void;
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeStatus,
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIdLoading] = useState(false);

  function handleOpenOrder(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;
    setIdLoading(true);

    await api.delete(`/orders/${selectedOrder._id}`);
    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);

    setIdLoading(false);
    setIsModalVisible(false);
    setSelectedOrder(null);
    onCancelOrder(selectedOrder._id);
  }

  async function handleChangeOrderStatus() {
    console.log('🚀 ~ handleChangeOrderStatus ~ selectedOrder:', selectedOrder);
    if (!selectedOrder) return;
    setIdLoading(true);

    const status =
      selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder._id}`, {
      status,
    });
    toast.success(
      `O pedido da mesa ${selectedOrder.table} teve o status alterado!`
    );

    setIdLoading(false);
    setIsModalVisible(false);
    setSelectedOrder(null);
    onChangeStatus(selectedOrder._id, status);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenOrder(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
