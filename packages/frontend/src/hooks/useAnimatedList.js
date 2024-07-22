import {
  createRef, useCallback, useEffect, useRef, useState,
} from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);

  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListener = useRef(new Map());

  const handleAnimatonEnd = useCallback((itemId) => {
    const removeListener = animationEndListener.current.get(itemId);
    removeListener();

    animationEndListener.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((id) => itemId !== id),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animtedRef = animatedRefs.current.get(itemId);
      const animatedElement = animtedRef?.current;
      const alredyHasListeners = animationEndListener.current.has(itemId);

      if (animatedElement && !alredyHasListeners) {
        const onAnimationEnd = () => handleAnimatonEnd(itemId);
        const removeListenert = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListener.current.set(itemId, removeListenert);
      }
    });
  }, [handleAnimatonEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListeners = animationEndListener.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const getAnimatedRef = useCallback((itemID) => {
    let animatedRef = animatedRefs.current.get(itemID);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemID, animatedRef);
    }
    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);
  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
