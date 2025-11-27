import { useState, useEffect } from 'react';
import type { ParsedProductInfo, CardBenefit } from '../types';

interface UseProductDataReturn {
  product: ParsedProductInfo | null;
  topBenefits: CardBenefit[];
  imageSlides: string[];
  loading: boolean;
}

export const useProductData = (): UseProductDataReturn => {
  const [product, setProduct] = useState<ParsedProductInfo | null>(null);
  const [topBenefits, setTopBenefits] = useState<CardBenefit[]>([]);
  const [imageSlides, setImageSlides] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductData = async (): Promise<void> => {
      try {
        const result = await chrome.storage.local.get(['currentProduct']);
        if (result.currentProduct) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const p = result.currentProduct as any;
          console.log('[useProductData] Loaded product:', {
            title: p.title?.substring(0, 50),
            imageUrl: p.imageUrl?.substring(0, 80) || 'none',
            imagesCount: p.images?.length || 0,
            variantsCount: p.variants?.length || 0,
          });
          setProduct(p);

          // Sort and get top 3 benefits
          if (Array.isArray(p.cardBenefits)) {
            const sorted = [...p.cardBenefits]
              .sort((a: CardBenefit, b: CardBenefit) => (b.rate || 0) - (a.rate || 0))
              .slice(0, 3);
            setTopBenefits(sorted);
          }

          // Build image slides
          const slides: string[] = [];
          if (p.imageUrl) {
            slides.push(p.imageUrl);
          }
          if (Array.isArray(p.images) && p.images.length > 0) {
            slides.push(...p.images.filter((img: unknown) => typeof img === 'string'));
          }

          setImageSlides(slides);
          console.log('[useProductData] Images loaded:', slides.length);
        }
      } catch (err) {
        console.error('[useProductData] Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, []);

  return {
    product,
    topBenefits,
    imageSlides,
    loading,
  };
};
