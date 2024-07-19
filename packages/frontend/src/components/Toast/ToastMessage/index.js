import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import useAnimatedUnmount from '../../../hooks/useAnimatedUnmount';

export default function ToastMessage({ message, onRemoveMessage, isLeaving }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(!isLeaving);

  useEffect(() => {
    const timeOutIdd = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => {
      clearTimeout(timeOutIdd);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedElementRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="x" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}
ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['defalut', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
};
