import {
  createRef, useCallback, useRef, useState,
} from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);

  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());

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

  // const handleAnimatonEnd = useCallback((id) => {
  //   setItems((prevState) => prevState.filter((item) => item.id !== id));
  //   setPendingRemovalItemsIds(
  //     (prevState) => prevState.filter((itemId) => itemId !== id),
  //   );
  // }, []);

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
