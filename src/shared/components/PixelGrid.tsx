/**
 * PixelGrid Component
 * 
 * PicSel 브랜드의 시그니처 4-픽셀 그리드 패턴
 * 로고의 'i' 도트에서 추출한 픽셀 모티프를 재현
 */

import { useMemo } from 'react';

interface PixelGridProps {
  /** 픽셀 크기 (px) */
  pixelSize?: number;
  /** 그리드 크기 (픽셀 개수) */
  gridSize?: number;
  /** 애니메이션 활성화 */
  animated?: boolean;
  /** 컬러 모드 */
  variant?: 'primary' | 'accent' | 'muted' | 'gradient';
  /** 커스텀 클래스 */
  className?: string;
}

export const PixelGrid = ({ 
  pixelSize = 4,
  gridSize = 4,
  animated = false,
  variant = 'primary',
  className = ''
}: PixelGridProps) => {
  const totalPixels = gridSize * gridSize;
  
  // 그라데이션 모드일 때 픽셀별 색상 계산
  const getPixelColor = (index: number): string => {
    if (variant === 'gradient') {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const distance = Math.sqrt(Math.pow(row - gridSize/2, 2) + Math.pow(col - gridSize/2, 2));
      const maxDistance = Math.sqrt(2) * gridSize / 2;
      const intensity = 900 - Math.floor((distance / maxDistance) * 400); // 900 -> 500
      return `bg-picsel-${intensity}`;
    }
    
    return variant === 'primary' ? 'bg-picsel-500' :
           variant === 'accent' ? 'bg-pixel-500' :
           'bg-picsel-300';
  };

  // 애니메이션 딜레이 계산 (중앙에서 바깥으로)
  const getAnimationDelay = (index: number): number => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const centerRow = (gridSize - 1) / 2;
    const centerCol = (gridSize - 1) / 2;
    const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
    return distance * 0.1;
  };

  const pixels = useMemo(() => 
    Array.from({ length: totalPixels }, (_, i) => ({
      id: i,
      color: getPixelColor(i),
      delay: animated ? getAnimationDelay(i) : 0
    })),
    [gridSize, variant, animated]
  );

  return (
    <div 
      className={`inline-grid gap-[1px] ${className}`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, ${pixelSize}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${pixelSize}px)`
      }}
    >
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className={`${pixel.color} ${animated ? 'animate-pixel-pulse' : ''}`}
          style={animated ? { animationDelay: `${pixel.delay}s` } : undefined}
        />
      ))}
    </div>
  );
};

/**
 * 대형 픽셀 그리드 (장식용)
 */
export const PixelGridLarge = ({ 
  className = '' 
}: { 
  className?: string 
}) => (
  <PixelGrid 
    pixelSize={8} 
    gridSize={6} 
    variant="gradient" 
    animated 
    className={className}
  />
);

/**
 * 미니 픽셀 그리드 (아이콘 크기)
 */
export const PixelGridIcon = ({ 
  variant = 'primary' as const,
  className = '' 
}: { 
  variant?: 'primary' | 'accent' | 'muted',
  className?: string 
}) => (
  <PixelGrid 
    pixelSize={3} 
    gridSize={4} 
    variant={variant}
    className={className}
  />
);
