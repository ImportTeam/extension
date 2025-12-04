import { useEffect, RefObject } from 'react';
import { logger, LogDomain } from '../utils/logger';

interface UseWindowResizeOptions {
  enabled: boolean;
  contentRef: RefObject<HTMLDivElement>;
}

export const useWindowResize = ({
  enabled,
  contentRef,
}: UseWindowResizeOptions): void => {
  useEffect(() => {
    if (!enabled || !contentRef.current) return;

    const calculateAndResizeWindow = (): void => {
      if (!contentRef.current) return;

      const contentHeight = contentRef.current.scrollHeight;
      logger.debug(LogDomain.UI, 'Content scroll height', { contentHeight });

      // Header height measurement
      const headerEl = document.querySelector('[style*="flexShrink"]');
      const headerHeight = headerEl ? headerEl.clientHeight : 52;

      // Total height = header + content + padding
      const totalHeight = Math.min(headerHeight + contentHeight + 24, 900);

      logger.debug(LogDomain.UI, 'Calculated total height', {
        headerHeight,
        contentHeight,
        totalHeight,
      });

      try {
        window.resizeTo(420, totalHeight);
        logger.debug(LogDomain.UI, 'Window resized', { width: 420, height: totalHeight });
      } catch (err) {
        logger.warn(LogDomain.UI, 'Cannot resize window', { error: err });
      }
    };

    // Initial resize
    calculateAndResizeWindow();

    // Observe content changes
    const resizeObserver = new ResizeObserver(() => {
      calculateAndResizeWindow();
    });

    resizeObserver.observe(contentRef.current);

    // Image load handlers
    const images = contentRef.current.querySelectorAll('img');
    let loadedCount = 0;

    const onImageLoad = (): void => {
      loadedCount++;
      if (loadedCount === images.length) {
        setTimeout(calculateAndResizeWindow, 100);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', onImageLoad);
        img.addEventListener('error', onImageLoad);
      }
    });

    if (loadedCount === images.length) {
      setTimeout(calculateAndResizeWindow, 100);
    }

    return (): void => {
      resizeObserver.disconnect();
      images.forEach((img) => {
        img.removeEventListener('load', onImageLoad);
        img.removeEventListener('error', onImageLoad);
      });
    };
  }, [enabled, contentRef]);
};

