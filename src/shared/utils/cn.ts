/**
 * cn - className 유틸리티
 * 
 * clsx + tailwind-merge 조합
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export { clsx, type ClassValue };
