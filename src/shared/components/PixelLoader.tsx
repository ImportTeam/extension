/**
 * PixelLoader Component
 * 
 * PicSel 브랜드 로딩 애니메이션
 * 4-픽셀 그리드가 펄스 효과로 로딩 상태 표현
 */

import { PixelGrid } from './PixelGrid';

interface PixelLoaderProps {
  /** 로딩 메시지 */
  message?: string;
  /** 로더 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 전체 화면 오버레이 */
  fullScreen?: boolean;
  /** 커스텀 클래스 */
  className?: string;
}

const SIZE_CONFIG = {
  sm: { pixelSize: 3, gridSize: 4 },
  md: { pixelSize: 4, gridSize: 4 },
  lg: { pixelSize: 6, gridSize: 4 }
};

export const PixelLoader = ({ 
  message, 
  size = 'md',
  fullScreen = false,
  className = ''
}: PixelLoaderProps) => {
  const { pixelSize, gridSize } = SIZE_CONFIG[size];

  const loaderContent = (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <PixelGrid 
        pixelSize={pixelSize}
        gridSize={gridSize}
        variant="accent"
        animated
      />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

/**
 * 인라인 로더 (텍스트 옆에 표시)
 */
export const PixelLoaderInline = ({ 
  className = '' 
}: { 
  className?: string 
}) => (
  <PixelGrid 
    pixelSize={2}
    gridSize={4}
    variant="accent"
    animated
    className={className}
  />
);

/**
 * 버튼 로딩 상태용 미니 로더
 */
export const PixelLoaderButton = () => (
  <PixelGrid 
    pixelSize={2}
    gridSize={3}
    variant="primary"
    animated
    className="inline-block"
  />
);
