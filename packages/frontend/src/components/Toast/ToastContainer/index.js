import { Container } from './styles';
import ToastMessaaaage from '../ToastMessage';
import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const {
    messages,
    handleRemoveMessage,

  } = useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessaaaage
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
