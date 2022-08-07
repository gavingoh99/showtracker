import { useState } from 'react';
import CarouselContent from './CarouselContent';
import CarouselControl from './CarouselControl';
import { TMDBShow } from '../types';

export default function Carousel({
  name,
  shows,
}: {
  name: String;
  shows: TMDBShow[];
}) {
  const [sliderHasMoved, setSliderHasMoved] = useState(false);
  const [sliderMoving, setSliderMoving] = useState(false);
  const [sliderMoveDirection, setSliderMoveDirection] = useState('');
  const [itemsInRow, setItemsInRow] = useState(5);
  const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0);
  const [movePercentage, setMovePercentage] = useState(0);
  const totalItems = shows.length;

  if (shows.length === 0) return null;
  const renderSliderContent = () => {
    const left = [],
      mid = [],
      right = [];

    for (let i = 0; i < itemsInRow; i++) {
      if (sliderHasMoved) {
        if (lowestVisibleIndex + i - itemsInRow < 0) {
          left.push(totalItems - itemsInRow + i + lowestVisibleIndex);
        } else {
          left.push(lowestVisibleIndex - itemsInRow + i);
        }
      }
      if (i + lowestVisibleIndex >= totalItems) {
        mid.push(i + lowestVisibleIndex - totalItems);
      } else {
        mid.push(i + lowestVisibleIndex);
      }
      if (i + lowestVisibleIndex + itemsInRow >= totalItems) {
        right.push(i + lowestVisibleIndex + itemsInRow - totalItems);
      } else {
        right.push(i + lowestVisibleIndex + itemsInRow);
      }
    }
    const combinedIndex = [...left, ...mid, ...right];
    if (sliderHasMoved) {
      const leadingIndex =
        combinedIndex[0] === 0 ? totalItems - 1 : combinedIndex[0] - 1;
      combinedIndex.unshift(leadingIndex);
    }
    const trailingIndex =
      combinedIndex[combinedIndex.length - 1] === totalItems - 1
        ? 0
        : combinedIndex[combinedIndex.length - 1] + 1;
    combinedIndex.push(trailingIndex);
    const sliderContents = [];
    for (let index of combinedIndex) {
      sliderContents.push(<CarouselContent show={shows[index]} />);
    }
    if (!sliderHasMoved) {
      for (let i = 0; i < itemsInRow; i++) {
        sliderContents.unshift(<div className='w-1/5' />);
      }
    }
    return sliderContents;
  };
  const handlePrev = () => {
    let newIndex: number;
    if (lowestVisibleIndex < itemsInRow) {
      newIndex = lowestVisibleIndex !== 0 ? 0 : totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex - itemsInRow;
    }
    let newMovePercentage;
    if (lowestVisibleIndex === 0) {
      newMovePercentage = 0;
    } else if (lowestVisibleIndex - newIndex < itemsInRow) {
      newMovePercentage =
        ((itemsInRow - (lowestVisibleIndex - newIndex)) / itemsInRow) * 100;
    } else {
      newMovePercentage = 0;
    }
    setSliderMoving(true);
    setSliderMoveDirection('left');
    setMovePercentage(newMovePercentage);
    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setSliderMoving(false);
    }, 1000);
  };
  const handleNext = () => {
    let newIndex: number;
    if (lowestVisibleIndex === totalItems - itemsInRow) {
      newIndex = 0;
    } else if (lowestVisibleIndex + itemsInRow > totalItems - itemsInRow) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex + itemsInRow;
    }
    let newMovePercentage;
    if (newIndex !== 0) {
      newMovePercentage = ((newIndex - lowestVisibleIndex) / itemsInRow) * 100;
    } else {
      newMovePercentage = 100;
    }
    setSliderMoving(true);
    setSliderMoveDirection('right');
    setMovePercentage(newMovePercentage);
    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setSliderMoving(false);
    }, 1000);
    if (!sliderHasMoved) setSliderHasMoved(true);
  };
  let style = {};
  if (sliderMoving) {
    let translate = '';
    if (sliderMoveDirection === 'right') {
      translate = `translateX(-${100 + movePercentage + 100 / itemsInRow}%)`;
    } else if (sliderMoveDirection === 'left') {
      translate = `translateX(-${movePercentage + 100 / itemsInRow}%)`;
    }

    style = {
      transform: translate,
      transitionDuration: '750ms',
    };
  } else {
    style = {
      transform: `translateX(-${
        100 + (sliderHasMoved ? 100 / itemsInRow : 0)
      }%)`,
    };
  }
  return (
    <div className='flex flex-col pb-10'>
      <div className='pl-10 text-3xl pb-5 font-roboto'>{name}</div>
      <div className='flex justify-center items-center pl-10 pr-10 relative overflow-hidden'>
        {sliderHasMoved && (
          <CarouselControl onClick={handlePrev} isLeft={true} />
        )}
        <div
          className='carousel whitespace-nowrap h-full flex flex-1 items-center'
          style={style}
        >
          {renderSliderContent()}
        </div>
        <CarouselControl onClick={handleNext} isLeft={false} />
      </div>
    </div>
  );
}
