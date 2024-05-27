import { Container } from './styles';
import ToastMessaaaage from '../ToastMessage';

export default function ToastContainer() {
  return (
    <Container>
      <ToastMessaaaage text="Default Toast" />
      <ToastMessaaaage text="Error toast" type="danger" />
      <ToastMessaaaage text="Success toast" type="success" />
    </Container>
  );
}
