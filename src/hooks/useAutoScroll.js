import {useEffect, useState} from 'react';

const useAutoScroll = ({itemLength, flatListRef, index, setIndex}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % itemLength);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [itemLength, setIndex]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: index,
        animated: true,
      });
    }
  }, [index, flatListRef]);
};

export default useAutoScroll;
