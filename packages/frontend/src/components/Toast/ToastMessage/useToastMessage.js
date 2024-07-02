import { useEffect } from 'react';

export default function useToastMessage(message, onRemoveMessage) {
  useEffect(() => {
    const timeOutIdd = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeOutIdd);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return {
    handleRemoveToast,
  };
}
