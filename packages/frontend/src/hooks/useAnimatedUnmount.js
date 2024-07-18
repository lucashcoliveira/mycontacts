import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShoulRender] = useState(visible);

  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShoulRender(true);
    }

    function handlleAnimationEnd() {
      setShoulRender(false);
    }

    const elementRef = animatedElementRef.current;

    if (!visible && elementRef) {
      elementRef.addEventListener('animationend', handlleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handlleAnimationEnd);
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animatedElementRef,
  };
}
