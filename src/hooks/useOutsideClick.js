import React, { useEffect, useRef } from 'react';

export default function useClickEvent(close, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClickEvent(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('clicked outside modal');
        close();
      }
    }

    document.addEventListener('click', handleClickEvent, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClickEvent, listenCapturing);
  }, [close, listenCapturing]);

  return ref;
}
