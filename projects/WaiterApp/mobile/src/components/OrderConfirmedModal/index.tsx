import { Modal, StatusBar } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButon } from './styles';

interface OrderConfirmedModalProps {
  visible: boolean;
  onClose(): void;
}

export function OrderConfirmedModal({ visible, onClose }: OrderConfirmedModalProps){
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <Container>
        <CheckCircle />
        <Text weight={600} size={20} color={'#FFF'} style={{ marginTop: 12 }}>Pedido confirmado</Text>
        <Text color={'#FFF'} opacity={0.9} style={{ marginTop: 4 }}>O pedido já na fila de produção!</Text>
        <OkButon onPress={onClose}>
          <Text color={'#D73035'} weight={600}>OK</Text>
        </OkButon>
      </Container>
      <StatusBar backgroundColor="#D73035" translucent={false}/>
    </Modal>
  );
}
