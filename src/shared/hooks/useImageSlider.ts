import { useState } from 'react';

interface UseImageSliderReturn {
  currentSlideIdx: number;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
}

export const useImageSlider = (totalSlides: number): UseImageSliderReturn => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const handlePrevSlide = (): void => {
    if (totalSlides > 1) {
      setCurrentSlideIdx((idx) => (idx - 1 + totalSlides) % totalSlides);
    }
  };

  const handleNextSlide = (): void => {
    if (totalSlides > 1) {
      setCurrentSlideIdx((idx) => (idx + 1) % totalSlides);
    }
  };

  return {
    currentSlideIdx,
    handlePrevSlide,
    handleNextSlide,
  };
};
