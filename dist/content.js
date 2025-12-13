import{b as jn,p as ae,E as T,a as p,n as ut,d as ne,l as N,L as R}from"./assets/index-CtnQ7lw9.js";import{u as Se}from"./assets/store-SF67hG8t.js";import{C as Yn}from"./assets/constants-DOucEiR9.js";import{S as Vn}from"./assets/chromeStorage-BOBytA-p.js";const Xn=window.self===window.top;function Zn(t){if(!Xn){jn.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const Jn=`
		:host {
			all: initial;
			position: fixed;
			inset: auto 24px 24px auto;
			z-index: 2147483647;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
			color: #1f2937;
		}

		*, *::before, *::after {
			box-sizing: border-box;
		}

		.picsel-toggle-container {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 12px;
		}

		.picsel-toggle-button {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			padding: 12px 20px;
			border-radius: 999px;
			border: none;
			cursor: pointer;
			background: #4f46e5; /* Indigo-600 */
			color: #ffffff;
			box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
			font-weight: 600;
			font-size: 15px;
			transition: all 0.2s ease;
		}

		.picsel-toggle-button:hover {
			background: #4338ca; /* Indigo-700 */
			transform: translateY(-1px);
			box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.4);
		}

		.picsel-toggle-button:active {
			transform: translateY(0);
		}

		.picsel-toggle-label {
			white-space: nowrap;
			font-size: 15px;
		}

		.picsel-toggle-badge {
			display: none;
			align-items: center;
			justify-content: center;
			font-size: 12px;
			font-weight: 700;
			padding: 2px 8px;
			border-radius: 999px;
			background: #eef2ff; /* Indigo-50 */
			color: #4f46e5; /* Indigo-600 */
			margin-left: 4px;
		}

		.picsel-panel {
			width: 360px;
			max-height: 78vh;
			background: #f3f4f6; /* Gray-100 */
			border-radius: 16px;
			box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
			border: 1px solid #e5e7eb;
			overflow: hidden;
			display: none;
			flex-direction: column;
		}

		.picsel-panel.open {
			display: flex;
		}

		.picsel-panel-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16px 20px;
			background: #393E44; /* Brand Color */
			color: #ffffff;
		}

		.picsel-panel-title {
			font-size: 15px;
			font-weight: 600;
		}

		.picsel-close-button {
			width: 24px;
			height: 24px;
			border-radius: 4px;
			border: none;
			background: transparent;
			color: #9ca3af; /* Gray-400 */
			font-size: 18px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: color 0.2s ease;
			padding: 0;
		}

		.picsel-close-button:hover {
			color: #ffffff;
		}

		.picsel-panel-content {
			padding: 16px;
			display: flex;
			flex-direction: column;
			gap: 12px;
			overflow-y: auto;
		}

		.picsel-empty-state {
			font-size: 13px;
			color: #6b7280;
			text-align: center;
			padding: 20px;
		}

		/* Product Card */
		.picsel-product {
			display: flex;
			gap: 12px;
			background: #ffffff;
			padding: 12px;
			border-radius: 12px;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		}

		.picsel-product-thumb {
			width: 72px;
			height: 72px;
			border-radius: 8px;
			overflow: hidden;
			background: #f3f4f6;
			flex-shrink: 0;
			border: 1px solid #e5e7eb;
		}

		.picsel-product-thumb img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.picsel-product-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 4px;
			min-width: 0;
		}

		.picsel-product-title {
			font-size: 14px;
			font-weight: 600;
			color: #111827;
			line-height: 1.4;
			margin: 0;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.picsel-price {
			display: flex;
			align-items: baseline;
			gap: 6px;
			margin-top: 4px;
		}

		.picsel-original-price {
			font-size: 12px;
			color: #9ca3af;
			text-decoration: line-through;
		}

		.picsel-final-price {
			font-size: 16px;
			font-weight: 800;
			color: #111827;
		}

		.picsel-discount-tag {
			padding: 2px 6px;
			border-radius: 4px;
			background: #eef2ff;
			color: #4f46e5;
			font-size: 11px;
			font-weight: 700;
		}

		.picsel-shipping {
			font-size: 11px;
			color: #6b7280;
			margin-top: 2px;
		}

		/* Sections */
		.picsel-section {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-section-title {
			font-size: 13px;
			font-weight: 700;
			color: #111827;
			margin: 0;
		}

		.picsel-benefit-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-benefit-item {
			padding: 12px;
			border-radius: 12px;
			background: #ffffff;
			border: 1px solid #e5e7eb;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.picsel-card-name {
			font-size: 13px;
			font-weight: 600;
			color: #1f2937;
		}

		.picsel-benefit-desc {
			font-size: 12px;
			color: #6b7280;
		}

		.picsel-extra-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-extra-item {
			font-size: 13px;
			font-weight: 600;
			color: #4f46e5;
			background: #ffffff;
			border: 2px solid #818cf8;
			padding: 12px;
			border-radius: 12px;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
			display: flex;
			align-items: center;
			gap: 8px;
		}

		/* Card Benefits Section - 메인 콘텐츠 (8pt 그리드) */
		.picsel-card-section {
			margin-top: 8px;
		}

		.picsel-card-benefit-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-card-benefit-item {
			display: flex;
			align-items: center;
			gap: 12px;
			padding: 12px;
			border-radius: 8px;
			background: #ffffff;
			border: 1px solid #e5e7eb;
		}

		.picsel-card-benefit-item:hover {
			background: #f9fafb;
		}

		/* 카드 이미지 영역 */
		.picsel-card-image-wrapper {
			width: 80px;
			height: 80px;
			border-radius: 10px;
			overflow: hidden;
			background: #f3f4f6;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}

		.picsel-card-image {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		.picsel-card-icon-fallback {
			color: #9ca3af;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		/* 카드 이니셜 (이미지 없을 때) */
		.picsel-card-initial {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #f1f5f9;
			border-radius: 10px;
			font-size: 18px;
			font-weight: 700;
			color: #64748b;
			letter-spacing: -0.5px;
		}

		/* 카드 정보 영역 */
		.picsel-card-info {
			flex: 1;
			min-width: 0;
		}

		.picsel-card-header {
			display: flex;
			align-items: center;
			gap: 6px;
			flex-wrap: wrap;
		}

		/* 할인 금액 영역 */
		.picsel-card-amount {
			text-align: right;
			flex-shrink: 0;
		}

		/* 1위 스타일 - 가장 진한 강조 */
		.picsel-card-benefit-item.recommended {
			border-left: 3px solid #4f46e5;
			background: #f8fafc;
		}

		/* 2위 스타일 - 중간 강조 */
		.picsel-card-benefit-item.rank-2 {
			border-left: 3px solid #818cf8;
			background: #f8fafc;
		}

		/* 3위 스타일 - 약한 강조 */
		.picsel-card-benefit-item.rank-3 {
			border-left: 3px solid #c7d2fe;
			background: #f8fafc;
		}

		/* 순위 배지 - Indigo 계열 명도 변화 */
		.picsel-recommended-badge {
			font-size: 11px;
			font-weight: 600;
			color: #4f46e5;
			background: #eef2ff;
			padding: 2px 6px;
			border-radius: 4px;
		}

		.picsel-card-benefit-item.rank-2 .picsel-recommended-badge {
			color: #6366f1;
			background: #eef2ff;
		}

		.picsel-card-benefit-item.rank-3 .picsel-recommended-badge {
			color: #818cf8;
			background: #f5f3ff;
		}

		.picsel-card-name {
			font-size: 13px;
			font-weight: 600;
			color: #1f2937;
		}

		/* 혜택 설명 - 여러 줄 허용 */
		.picsel-card-benefit-desc {
			font-size: 12px;
			color: #6b7280;
			margin-top: 2px;
			line-height: 1.4;
			word-break: keep-all;
		}

		.picsel-card-discount {
			font-size: 12px;
			font-weight: 500;
			color: #dc2626;
		}

		/* 모든 순위에서 할인 금액은 빨간색 유지 (할인 = 빨강 직관적) */
		.picsel-card-benefit-item.recommended .picsel-card-discount,
		.picsel-card-benefit-item.rank-2 .picsel-card-discount,
		.picsel-card-benefit-item.rank-3 .picsel-card-discount {
			color: #dc2626;
		}

		/* 최종 가격 (위에 크게 표시) */
		.picsel-card-final-price {
			font-size: 15px;
			font-weight: 700;
			color: #1f2937;
		}

		.picsel-card-final {
			font-size: 11px;
			color: #64748b;
			font-weight: 500;
		}

		/* 최종가격은 모두 동일한 회색 (보조 정보) */
		.picsel-card-benefit-item.recommended .picsel-card-final,
		.picsel-card-benefit-item.rank-2 .picsel-card-final,
		.picsel-card-benefit-item.rank-3 .picsel-card-final {
			color: #64748b;
		}

		.picsel-card-rate {
			font-size: 14px;
			font-weight: 700;
			color: #4f46e5;
		}

		/* Footer Section */
		.picsel-footer {
			margin-top: 12px;
			padding-top: 12px;
		}

		.picsel-footer-confirm {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			padding: 12px 24px;
			font-size: 14px;
			font-weight: 600;
			color: #ffffff;
			background: #4f46e5;
			border: none;
			border-radius: 16px;
			cursor: pointer;
			transition: background-color 0.15s ease;
		}

		.picsel-footer-confirm:hover {
			background: #4338ca;
		}

		.picsel-footer-confirm:active {
			background: #3730a3;
		}

		/* Sub Benefits - 중립적 회색 배경 (보조 정보) */
		.picsel-sub-benefits {
			margin-top: 12px;
			padding: 12px 16px;
			background: #f8fafc;
			border-radius: 8px;
			border: 1px solid #e2e8f0;
		}

		.picsel-sub-benefit-item {
			font-size: 13px;
			color: #475569;
			padding: 4px 0;
			font-weight: 500;
			display: flex;
			align-items: center;
			gap: 8px;
			line-height: 1.4;
		}

		.picsel-sub-benefit-item::before {
			content: '•';
			color: #94a3b8;
			font-weight: 700;
			flex-shrink: 0;
		}

		.picsel-sub-benefit-item:first-child {
			padding-top: 0;
		}

		.picsel-sub-benefit-item:last-child {
			padding-bottom: 0;
		}

		.picsel-footer-list {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-footer-item {
			font-size: 13px;
			color: #4f46e5;
			padding: 10px 12px;
			background: #eef2ff;
			border-radius: 8px;
		}

		/* Empty Benefits */
		.picsel-empty-benefits {
			padding: 16px;
			text-align: center;
			color: #9ca3af;
			font-size: 13px;
		}

		.picsel-variants {
			display: flex;
			flex-direction: column; /* Vertical stack */
			gap: 8px;
		}

		.picsel-variant-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 12px 16px;
			border-radius: 12px;
			background: #ffffff;
			font-size: 13px;
			color: #1f2937;
			border: 1px solid #e5e7eb;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
			cursor: pointer;
			transition: background-color 0.2s;
		}

		.picsel-variant-item:hover {
			background-color: #f9fafb;
		}

		.picsel-variant-name {
			font-weight: 600;
			color: #374151;
		}

		.picsel-variant-price {
			font-weight: 700;
			color: #1f2937;
			font-size: 14px;
		}

		.picsel-variant-discount {
			color: #4f46e5;
			font-weight: 700;
			background: #eef2ff;
			padding: 2px 6px;
			border-radius: 4px;
			font-size: 11px;
			margin-left: auto; /* Push to right */
		}

		.picsel-panel-footer {
			padding: 16px 20px;
			background: #ffffff;
			border-top: 1px solid #e5e7eb;
			margin-top: auto; /* Push to bottom */
		}

		.picsel-cta-button {
			width: 100%;
			height: 48px;
			background: #4f46e5;
			color: #ffffff;
			font-size: 16px;
			font-weight: 700;
			border: none;
			border-radius: 12px;
			cursor: pointer;
			box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
			transition: background-color 0.2s;
		}

		.picsel-cta-button:hover {
			background: #4338ca;
		}

		::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}

		::-webkit-scrollbar-thumb {
			background: #d1d5db;
			border-radius: 999px;
		}

		::-webkit-scrollbar-track {
			background: transparent;
		}

		/* Footer Buttons Container */
		.picsel-footer-buttons {
			display: flex;
			gap: 8px;
		}

		.picsel-footer-compare {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 12px 16px;
			font-size: 14px;
			font-weight: 600;
			color: #4f46e5;
			background: #eef2ff;
			border: none;
			border-radius: 16px;
			cursor: pointer;
			transition: background-color 0.15s ease;
		}

		.picsel-footer-compare:hover {
			background: #e0e7ff;
		}

		/* Price Comparison Panel */
		.picsel-comparison-panel {
			position: fixed;
			bottom: 160px;
			right: 24px;
			width: 380px;
			max-height: 500px;
			background: #ffffff;
			border-radius: 12px;
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
			overflow: hidden;
			z-index: 2147483646;
			display: flex;
			flex-direction: column;
		}

		.picsel-comparison-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 12px 16px;
			background: #f8f9fa;
			border-bottom: 1px solid #eee;
		}

		.picsel-comparison-header h3 {
			margin: 0;
			font-size: 16px;
			font-weight: 600;
			color: #333;
		}

		.picsel-comparison-close {
			background: none;
			border: none;
			font-size: 18px;
			color: #888;
			cursor: pointer;
			padding: 4px;
		}

		.picsel-comparison-loading {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 40px;
		}

		.picsel-spinner {
			width: 40px;
			height: 40px;
			border: 3px solid #f3f3f3;
			border-top: 3px solid #4f46e5;
			border-radius: 50%;
			animation: spin 1s linear infinite;
		}

		@keyframes spin {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}

		.picsel-comparison-loading p {
			margin-top: 16px;
			color: #666;
			font-size: 14px;
		}

		.picsel-comparison-error {
			text-align: center;
		}

		.picsel-comparison-error p {
			color: #e74c3c;
			margin-bottom: 12px;
		}

		.picsel-comparison-error code {
			display: block;
			padding: 12px;
			background: #2d3748;
			color: #68d391;
			border-radius: 6px;
			font-size: 14px;
			margin-bottom: 12px;
		}

		.picsel-comparison-help {
			color: #666 !important;
			font-size: 12px !important;
		}

		.picsel-comparison-current {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 12px 16px;
			background: #fff9e6;
			border-bottom: 1px solid #ffeaa7;
		}

		.picsel-comparison-current strong {
			font-size: 18px;
			color: #f39c12;
		}

		.picsel-comparison-results {
			flex: 1;
			overflow-y: auto;
			max-height: 350px;
		}

		.picsel-comparison-provider {
			padding: 12px 16px;
			border-bottom: 1px solid #eee;
		}

		.picsel-comparison-provider-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 8px;
		}

		.picsel-comparison-count {
			font-size: 12px;
			color: #888;
		}

		.picsel-comparison-error-badge {
			font-size: 10px;
			padding: 2px 6px;
			background: #ffebee;
			color: #c62828;
			border-radius: 4px;
		}

		.picsel-comparison-product-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-comparison-product {
			display: flex;
			gap: 10px;
			padding: 8px;
			background: #f8f9fa;
			border-radius: 8px;
			text-decoration: none;
			color: inherit;
			transition: background-color 0.2s;
		}

		.picsel-comparison-product:hover {
			background: #e9ecef;
		}

		.picsel-comparison-img {
			width: 50px;
			height: 50px;
			object-fit: cover;
			border-radius: 6px;
		}

		.picsel-comparison-info {
			flex: 1;
			min-width: 0;
		}

		.picsel-comparison-name {
			margin: 0 0 4px 0;
			font-size: 12px;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.picsel-comparison-price-row {
			display: flex;
			align-items: center;
			gap: 6px;
			margin-bottom: 2px;
		}

		.picsel-comparison-price {
			font-size: 14px;
			font-weight: 600;
		}

		.picsel-comparison-saving {
			font-size: 10px;
			padding: 1px 4px;
			background: #fce4ec;
			color: #c2185b;
			border-radius: 3px;
		}

		.picsel-comparison-meta {
			display: flex;
			gap: 8px;
			font-size: 11px;
			color: #888;
		}

		.picsel-comparison-provider-error {
			font-size: 12px;
			color: #e74c3c;
			padding: 8px;
			margin: 0;
		}

		.picsel-comparison-empty {
			font-size: 12px;
			color: #888;
			padding: 8px;
			text-align: center;
			margin: 0;
		}

		.picsel-comparison-meta-info {
			display: flex;
			justify-content: flex-end;
			gap: 8px;
			padding: 8px 16px;
			font-size: 11px;
			color: #888;
			border-top: 1px solid #eee;
		}

		.picsel-comparison-cache {
			padding: 2px 6px;
			background: #e3f2fd;
			color: #1976d2;
			border-radius: 4px;
		}

		/* ========== 새 최저가 비교 UI 스타일 ========== */
		
		/* 절약 배너 */
		.picsel-savings-banner {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 12px 16px;
			background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
			border-radius: 8px;
			margin: 0 0 16px 0;
		}

		.picsel-savings-icon {
			width: 20px;
			height: 20px;
			background: #4caf50;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}

		.picsel-savings-icon svg {
			width: 12px;
			height: 12px;
			color: white;
		}

		.picsel-savings-text {
			font-size: 14px;
			font-weight: 600;
			color: #2e7d32;
			margin: 0;
		}

		.picsel-no-savings-banner {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 12px 16px;
			background: #f5f5f5;
			border-radius: 8px;
			margin: 0 0 16px 0;
		}

		.picsel-no-savings-banner .picsel-savings-icon {
			background: #9e9e9e;
		}

		.picsel-no-savings-banner .picsel-savings-text {
			color: #616161;
			font-weight: 500;
		}

		/* 섹션 헤더 */
		.picsel-section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;
		}

		.picsel-section-title {
			font-size: 14px;
			font-weight: 600;
			color: #333;
			margin: 0;
		}

		.picsel-section-note {
			font-size: 11px;
			color: #888;
			margin: 0;
		}

		/* 가격 리스트 */
		.picsel-price-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
			margin-bottom: 16px;
		}

		.picsel-price-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 12px 14px;
			background: #fafafa;
			border-radius: 8px;
			border: 1px solid #eee;
			transition: all 0.15s ease;
			cursor: pointer;
			text-decoration: none;
		}

		.picsel-price-item:hover {
			background: #f5f5f5;
			border-color: #ddd;
		}

		.picsel-price-item-top {
			background: #f8fbff;
			border: 2px solid #2196f3;
		}

		.picsel-price-item-top:hover {
			background: #f0f7ff;
			border-color: #1976d2;
		}

		.picsel-price-item-left {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.picsel-price-item-right {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.picsel-mall-row {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.picsel-mall-name {
			font-size: 14px;
			font-weight: 600;
			color: #333;
			margin: 0;
		}

		.picsel-lowest-badge {
			display: inline-flex;
			align-items: center;
			padding: 2px 8px;
			background: #2196f3;
			color: white;
			font-size: 10px;
			font-weight: 600;
			border-radius: 4px;
		}

		.picsel-price-subtext {
			font-size: 11px;
			color: #999;
			margin: 0;
		}

		.picsel-price-value {
			font-size: 16px;
			font-weight: 700;
			color: #333;
			margin: 0;
		}

		.picsel-price-item-top .picsel-price-value {
			color: #1976d2;
		}

		.picsel-price-arrow {
			width: 16px;
			height: 16px;
			color: #bbb;
			flex-shrink: 0;
		}

		.picsel-price-item:hover .picsel-price-arrow {
			color: #888;
		}

		/* 하단 링크 */
		.picsel-footer-link {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 4px;
			padding: 10px;
			font-size: 12px;
			color: #666;
			text-decoration: none;
			border-top: 1px solid #eee;
			margin: 0 -16px -16px -16px;
			transition: all 0.15s ease;
		}

		.picsel-footer-link:hover {
			background: #f5f5f5;
			color: #333;
		}

		.picsel-footer-link svg {
			width: 14px;
			height: 14px;
		}

		/* 히어로 섹션 (현재 사이트 가격) */
		.picsel-hero-section {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 12px 16px;
			background: #fff;
			border: 1px solid #eee;
			border-radius: 8px;
			margin-bottom: 16px;
		}

		.picsel-hero-left {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.picsel-hero-label {
			font-size: 11px;
			color: #888;
			margin: 0;
		}

		.picsel-hero-price {
			font-size: 20px;
			font-weight: 700;
			color: #333;
			margin: 0;
		}

		.picsel-hero-tag {
			display: inline-flex;
			align-items: center;
			padding: 4px 10px;
			background: #f5f5f5;
			color: #666;
			font-size: 12px;
			font-weight: 500;
			border-radius: 6px;
			align-self: flex-start;
		}
`,me=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const a=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(a,o).format(i)},Qn=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),dt="picsel-toggle-host",pt="picsel-toggle-panel",er={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},tr=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return er[e]||String(t)},f={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null,comparison:{status:"idle",query:null,error:null,data:null}},nr=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const d=document.createElement("img");d.src=r,d.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(d)}else{const d=document.createElement("span");d.textContent="No Image",d.style.fontSize="11px",d.style.color="#64748b",n.appendChild(d)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const a=document.createElement("div");a.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,u=me(s,t.currency??"KRW");if(u){const d=document.createElement("div");d.className="picsel-final-price",d.textContent=u,a.appendChild(d)}const l=me(t.originalPrice,t.currency??"KRW"),m=Qn(t.originalPrice,s);if(l&&m){const d=document.createElement("div");d.className="picsel-original-price",d.textContent=l;const x=document.createElement("div");x.className="picsel-discount-tag",x.textContent=`-${m}%`,a.appendChild(d),a.appendChild(x)}if(o.appendChild(i),o.appendChild(a),t.shippingInfo){const d=document.createElement("div");d.className="picsel-shipping",d.textContent=`배송: ${t.shippingInfo}`,o.appendChild(d)}return e.appendChild(n),e.appendChild(o),e};const{entries:fn,setPrototypeOf:Zt,isFrozen:rr,getPrototypeOf:or,getOwnPropertyDescriptor:ir}=Object;let{freeze:W,seal:V,create:_t}=Object,{apply:Ct,construct:St}=typeof Reflect<"u"&&Reflect;W||(W=function(e){return e});V||(V=function(e){return e});Ct||(Ct=function(e,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return e.apply(n,o)});St||(St=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new e(...r)});const $e=H(Array.prototype.forEach),sr=H(Array.prototype.lastIndexOf),Jt=H(Array.prototype.pop),ke=H(Array.prototype.push),cr=H(Array.prototype.splice),He=H(String.prototype.toLowerCase),ft=H(String.prototype.toString),mt=H(String.prototype.match),Ne=H(String.prototype.replace),ar=H(String.prototype.indexOf),lr=H(String.prototype.trim),Z=H(Object.prototype.hasOwnProperty),$=H(RegExp.prototype.test),Re=ur(TypeError);function H(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Ct(t,e,r)}}function ur(t){return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return St(t,n)}}function C(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:He;Zt&&Zt(t,null);let r=e.length;for(;r--;){let o=e[r];if(typeof o=="string"){const i=n(o);i!==o&&(rr(e)||(e[r]=i),o=i)}t[o]=!0}return t}function dr(t){for(let e=0;e<t.length;e++)Z(t,e)||(t[e]=null);return t}function te(t){const e=_t(null);for(const[n,r]of fn(t))Z(t,n)&&(Array.isArray(r)?e[n]=dr(r):r&&typeof r=="object"&&r.constructor===Object?e[n]=te(r):e[n]=r);return e}function Ie(t,e){for(;t!==null;){const r=ir(t,e);if(r){if(r.get)return H(r.get);if(typeof r.value=="function")return H(r.value)}t=or(t)}function n(){return null}return n}const Qt=W(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),gt=W(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ht=W(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pr=W(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),xt=W(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fr=W(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),en=W(["#text"]),tn=W(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),bt=W(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),nn=W(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),We=W(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),mr=V(/\{\{[\w\W]*|[\w\W]*\}\}/gm),gr=V(/<%[\w\W]*|[\w\W]*%>/gm),hr=V(/\$\{[\w\W]*/gm),xr=V(/^data-[\-\w.\u00B7-\uFFFF]+$/),br=V(/^aria-[\-\w]+$/),mn=V(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Er=V(/^(?:\w+script|data):/i),yr=V(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gn=V(/^html$/i),_r=V(/^[a-z][.\w]*(-[.\w]+)+$/i);var rn=Object.freeze({__proto__:null,ARIA_ATTR:br,ATTR_WHITESPACE:yr,CUSTOM_ELEMENT:_r,DATA_ATTR:xr,DOCTYPE_NAME:gn,ERB_EXPR:gr,IS_ALLOWED_URI:mn,IS_SCRIPT_OR_DATA:Er,MUSTACHE_EXPR:mr,TMPLIT_EXPR:hr});const De={element:1,text:3,progressingInstruction:7,comment:8,document:9},Cr=function(){return typeof window>"u"?null:window},Sr=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const i="dompurify"+(r?"#"+r:"");try{return e.createPolicy(i,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},on=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Cr();const e=_=>hn(_);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==De.document||!t.Element)return e.isSupported=!1,e;let{document:n}=t;const r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:a,Node:s,Element:u,NodeFilter:l,NamedNodeMap:m=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:d,DOMParser:x,trustedTypes:E}=t,h=u.prototype,y=Ie(h,"cloneNode"),S=Ie(h,"remove"),P=Ie(h,"nextSibling"),O=Ie(h,"childNodes"),G=Ie(h,"parentNode");if(typeof a=="function"){const _=n.createElement("template");_.content&&_.content.ownerDocument&&(n=_.content.ownerDocument)}let A,Y="";const{implementation:K,createNodeIterator:le,createDocumentFragment:re,getElementsByTagName:ue}=n,{importNode:Te}=r;let D=on();e.isSupported=typeof fn=="function"&&typeof G=="function"&&K&&K.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Ve,ERB_EXPR:Xe,TMPLIT_EXPR:Ze,DATA_ATTR:On,ARIA_ATTR:Ln,IS_SCRIPT_OR_DATA:Bn,ATTR_WHITESPACE:vt,CUSTOM_ELEMENT:Un}=rn;let{IS_ALLOWED_URI:Pt}=rn,L=null;const kt=C({},[...Qt,...gt,...ht,...xt,...en]);let U=null;const Nt=C({},[...tn,...bt,...nn,...We]);let k=Object.seal(_t(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,Je=null;const ge=Object.seal(_t(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Rt=!0,Qe=!0,It=!1,Dt=!0,he=!1,Oe=!0,de=!1,et=!1,tt=!1,xe=!1,Le=!1,Be=!1,Mt=!0,Ot=!1;const zn="user-content-";let nt=!0,ve=!1,be={},Q=null;const rt=C({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Lt=null;const Bt=C({},["audio","video","img","source","image","track"]);let ot=null;const Ut=C({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ue="http://www.w3.org/1998/Math/MathML",ze="http://www.w3.org/2000/svg",oe="http://www.w3.org/1999/xhtml";let Ee=oe,it=!1,st=null;const Fn=C({},[Ue,ze,oe],ft);let Fe=C({},["mi","mo","mn","ms","mtext"]),qe=C({},["annotation-xml"]);const qn=C({},["title","style","font","a","script"]);let Pe=null;const $n=["application/xhtml+xml","text/html"],Wn="text/html";let M=null,ye=null;const Hn=n.createElement("form"),zt=function(c){return c instanceof RegExp||c instanceof Function},ct=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ye&&ye===c)){if((!c||typeof c!="object")&&(c={}),c=te(c),Pe=$n.indexOf(c.PARSER_MEDIA_TYPE)===-1?Wn:c.PARSER_MEDIA_TYPE,M=Pe==="application/xhtml+xml"?ft:He,L=Z(c,"ALLOWED_TAGS")?C({},c.ALLOWED_TAGS,M):kt,U=Z(c,"ALLOWED_ATTR")?C({},c.ALLOWED_ATTR,M):Nt,st=Z(c,"ALLOWED_NAMESPACES")?C({},c.ALLOWED_NAMESPACES,ft):Fn,ot=Z(c,"ADD_URI_SAFE_ATTR")?C(te(Ut),c.ADD_URI_SAFE_ATTR,M):Ut,Lt=Z(c,"ADD_DATA_URI_TAGS")?C(te(Bt),c.ADD_DATA_URI_TAGS,M):Bt,Q=Z(c,"FORBID_CONTENTS")?C({},c.FORBID_CONTENTS,M):rt,we=Z(c,"FORBID_TAGS")?C({},c.FORBID_TAGS,M):te({}),Je=Z(c,"FORBID_ATTR")?C({},c.FORBID_ATTR,M):te({}),be=Z(c,"USE_PROFILES")?c.USE_PROFILES:!1,Rt=c.ALLOW_ARIA_ATTR!==!1,Qe=c.ALLOW_DATA_ATTR!==!1,It=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Dt=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,he=c.SAFE_FOR_TEMPLATES||!1,Oe=c.SAFE_FOR_XML!==!1,de=c.WHOLE_DOCUMENT||!1,xe=c.RETURN_DOM||!1,Le=c.RETURN_DOM_FRAGMENT||!1,Be=c.RETURN_TRUSTED_TYPE||!1,tt=c.FORCE_BODY||!1,Mt=c.SANITIZE_DOM!==!1,Ot=c.SANITIZE_NAMED_PROPS||!1,nt=c.KEEP_CONTENT!==!1,ve=c.IN_PLACE||!1,Pt=c.ALLOWED_URI_REGEXP||mn,Ee=c.NAMESPACE||oe,Fe=c.MATHML_TEXT_INTEGRATION_POINTS||Fe,qe=c.HTML_INTEGRATION_POINTS||qe,k=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&zt(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(k.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&zt(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(k.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(k.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),he&&(Qe=!1),Le&&(xe=!0),be&&(L=C({},en),U=[],be.html===!0&&(C(L,Qt),C(U,tn)),be.svg===!0&&(C(L,gt),C(U,bt),C(U,We)),be.svgFilters===!0&&(C(L,ht),C(U,bt),C(U,We)),be.mathMl===!0&&(C(L,xt),C(U,nn),C(U,We))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?ge.tagCheck=c.ADD_TAGS:(L===kt&&(L=te(L)),C(L,c.ADD_TAGS,M))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?ge.attributeCheck=c.ADD_ATTR:(U===Nt&&(U=te(U)),C(U,c.ADD_ATTR,M))),c.ADD_URI_SAFE_ATTR&&C(ot,c.ADD_URI_SAFE_ATTR,M),c.FORBID_CONTENTS&&(Q===rt&&(Q=te(Q)),C(Q,c.FORBID_CONTENTS,M)),c.ADD_FORBID_CONTENTS&&(Q===rt&&(Q=te(Q)),C(Q,c.ADD_FORBID_CONTENTS,M)),nt&&(L["#text"]=!0),de&&C(L,["html","head","body"]),L.table&&(C(L,["tbody"]),delete we.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw Re('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Re('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=c.TRUSTED_TYPES_POLICY,Y=A.createHTML("")}else A===void 0&&(A=Sr(E,o)),A!==null&&typeof Y=="string"&&(Y=A.createHTML(""));W&&W(c),ye=c}},Ft=C({},[...gt,...ht,...pr]),qt=C({},[...xt,...fr]),Gn=function(c){let g=G(c);(!g||!g.tagName)&&(g={namespaceURI:Ee,tagName:"template"});const b=He(c.tagName),v=He(g.tagName);return st[c.namespaceURI]?c.namespaceURI===ze?g.namespaceURI===oe?b==="svg":g.namespaceURI===Ue?b==="svg"&&(v==="annotation-xml"||Fe[v]):!!Ft[b]:c.namespaceURI===Ue?g.namespaceURI===oe?b==="math":g.namespaceURI===ze?b==="math"&&qe[v]:!!qt[b]:c.namespaceURI===oe?g.namespaceURI===ze&&!qe[v]||g.namespaceURI===Ue&&!Fe[v]?!1:!qt[b]&&(qn[b]||!Ft[b]):!!(Pe==="application/xhtml+xml"&&st[c.namespaceURI]):!1},ee=function(c){ke(e.removed,{element:c});try{G(c).removeChild(c)}catch{S(c)}},pe=function(c,g){try{ke(e.removed,{attribute:g.getAttributeNode(c),from:g})}catch{ke(e.removed,{attribute:null,from:g})}if(g.removeAttribute(c),c==="is")if(xe||Le)try{ee(g)}catch{}else try{g.setAttribute(c,"")}catch{}},$t=function(c){let g=null,b=null;if(tt)c="<remove></remove>"+c;else{const I=mt(c,/^[\r\n\t ]+/);b=I&&I[0]}Pe==="application/xhtml+xml"&&Ee===oe&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const v=A?A.createHTML(c):c;if(Ee===oe)try{g=new x().parseFromString(v,Pe)}catch{}if(!g||!g.documentElement){g=K.createDocument(Ee,"template",null);try{g.documentElement.innerHTML=it?Y:v}catch{}}const q=g.body||g.documentElement;return c&&b&&q.insertBefore(n.createTextNode(b),q.childNodes[0]||null),Ee===oe?ue.call(g,de?"html":"body")[0]:de?g.documentElement:q},Wt=function(c){return le.call(c.ownerDocument||c,c,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},at=function(c){return c instanceof d&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof m)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},Ht=function(c){return typeof s=="function"&&c instanceof s};function ie(_,c,g){$e(_,b=>{b.call(e,c,g,ye)})}const Gt=function(c){let g=null;if(ie(D.beforeSanitizeElements,c,null),at(c))return ee(c),!0;const b=M(c.nodeName);if(ie(D.uponSanitizeElement,c,{tagName:b,allowedTags:L}),Oe&&c.hasChildNodes()&&!Ht(c.firstElementChild)&&$(/<[/\w!]/g,c.innerHTML)&&$(/<[/\w!]/g,c.textContent)||c.nodeType===De.progressingInstruction||Oe&&c.nodeType===De.comment&&$(/<[/\w]/g,c.data))return ee(c),!0;if(!(ge.tagCheck instanceof Function&&ge.tagCheck(b))&&(!L[b]||we[b])){if(!we[b]&&jt(b)&&(k.tagNameCheck instanceof RegExp&&$(k.tagNameCheck,b)||k.tagNameCheck instanceof Function&&k.tagNameCheck(b)))return!1;if(nt&&!Q[b]){const v=G(c)||c.parentNode,q=O(c)||c.childNodes;if(q&&v){const I=q.length;for(let j=I-1;j>=0;--j){const se=y(q[j],!0);se.__removalCount=(c.__removalCount||0)+1,v.insertBefore(se,P(c))}}}return ee(c),!0}return c instanceof u&&!Gn(c)||(b==="noscript"||b==="noembed"||b==="noframes")&&$(/<\/no(script|embed|frames)/i,c.innerHTML)?(ee(c),!0):(he&&c.nodeType===De.text&&(g=c.textContent,$e([Ve,Xe,Ze],v=>{g=Ne(g,v," ")}),c.textContent!==g&&(ke(e.removed,{element:c.cloneNode()}),c.textContent=g)),ie(D.afterSanitizeElements,c,null),!1)},Kt=function(c,g,b){if(Mt&&(g==="id"||g==="name")&&(b in n||b in Hn))return!1;if(!(Qe&&!Je[g]&&$(On,g))){if(!(Rt&&$(Ln,g))){if(!(ge.attributeCheck instanceof Function&&ge.attributeCheck(g,c))){if(!U[g]||Je[g]){if(!(jt(c)&&(k.tagNameCheck instanceof RegExp&&$(k.tagNameCheck,c)||k.tagNameCheck instanceof Function&&k.tagNameCheck(c))&&(k.attributeNameCheck instanceof RegExp&&$(k.attributeNameCheck,g)||k.attributeNameCheck instanceof Function&&k.attributeNameCheck(g,c))||g==="is"&&k.allowCustomizedBuiltInElements&&(k.tagNameCheck instanceof RegExp&&$(k.tagNameCheck,b)||k.tagNameCheck instanceof Function&&k.tagNameCheck(b))))return!1}else if(!ot[g]){if(!$(Pt,Ne(b,vt,""))){if(!((g==="src"||g==="xlink:href"||g==="href")&&c!=="script"&&ar(b,"data:")===0&&Lt[c])){if(!(It&&!$(Bn,Ne(b,vt,"")))){if(b)return!1}}}}}}}return!0},jt=function(c){return c!=="annotation-xml"&&mt(c,Un)},Yt=function(c){ie(D.beforeSanitizeAttributes,c,null);const{attributes:g}=c;if(!g||at(c))return;const b={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:U,forceKeepAttr:void 0};let v=g.length;for(;v--;){const q=g[v],{name:I,namespaceURI:j,value:se}=q,_e=M(I),lt=se;let z=I==="value"?lt:lr(lt);if(b.attrName=_e,b.attrValue=z,b.keepAttr=!0,b.forceKeepAttr=void 0,ie(D.uponSanitizeAttribute,c,b),z=b.attrValue,Ot&&(_e==="id"||_e==="name")&&(pe(I,c),z=zn+z),Oe&&$(/((--!?|])>)|<\/(style|title|textarea)/i,z)){pe(I,c);continue}if(_e==="attributename"&&mt(z,"href")){pe(I,c);continue}if(b.forceKeepAttr)continue;if(!b.keepAttr){pe(I,c);continue}if(!Dt&&$(/\/>/i,z)){pe(I,c);continue}he&&$e([Ve,Xe,Ze],Xt=>{z=Ne(z,Xt," ")});const Vt=M(c.nodeName);if(!Kt(Vt,_e,z)){pe(I,c);continue}if(A&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!j)switch(E.getAttributeType(Vt,_e)){case"TrustedHTML":{z=A.createHTML(z);break}case"TrustedScriptURL":{z=A.createScriptURL(z);break}}if(z!==lt)try{j?c.setAttributeNS(j,I,z):c.setAttribute(I,z),at(c)?ee(c):Jt(e.removed)}catch{pe(I,c)}}ie(D.afterSanitizeAttributes,c,null)},Kn=function _(c){let g=null;const b=Wt(c);for(ie(D.beforeSanitizeShadowDOM,c,null);g=b.nextNode();)ie(D.uponSanitizeShadowNode,g,null),Gt(g),Yt(g),g.content instanceof i&&_(g.content);ie(D.afterSanitizeShadowDOM,c,null)};return e.sanitize=function(_){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=null,b=null,v=null,q=null;if(it=!_,it&&(_="<!-->"),typeof _!="string"&&!Ht(_))if(typeof _.toString=="function"){if(_=_.toString(),typeof _!="string")throw Re("dirty is not a string, aborting")}else throw Re("toString is not a function");if(!e.isSupported)return _;if(et||ct(c),e.removed=[],typeof _=="string"&&(ve=!1),ve){if(_.nodeName){const se=M(_.nodeName);if(!L[se]||we[se])throw Re("root node is forbidden and cannot be sanitized in-place")}}else if(_ instanceof s)g=$t("<!---->"),b=g.ownerDocument.importNode(_,!0),b.nodeType===De.element&&b.nodeName==="BODY"||b.nodeName==="HTML"?g=b:g.appendChild(b);else{if(!xe&&!he&&!de&&_.indexOf("<")===-1)return A&&Be?A.createHTML(_):_;if(g=$t(_),!g)return xe?null:Be?Y:""}g&&tt&&ee(g.firstChild);const I=Wt(ve?_:g);for(;v=I.nextNode();)Gt(v),Yt(v),v.content instanceof i&&Kn(v.content);if(ve)return _;if(xe){if(Le)for(q=re.call(g.ownerDocument);g.firstChild;)q.appendChild(g.firstChild);else q=g;return(U.shadowroot||U.shadowrootmode)&&(q=Te.call(r,q,!0)),q}let j=de?g.outerHTML:g.innerHTML;return de&&L["!doctype"]&&g.ownerDocument&&g.ownerDocument.doctype&&g.ownerDocument.doctype.name&&$(gn,g.ownerDocument.doctype.name)&&(j="<!DOCTYPE "+g.ownerDocument.doctype.name+`>
`+j),he&&$e([Ve,Xe,Ze],se=>{j=Ne(j,se," ")}),A&&Be?A.createHTML(j):j},e.setConfig=function(){let _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ct(_),et=!0},e.clearConfig=function(){ye=null,et=!1},e.isValidAttribute=function(_,c,g){ye||ct({});const b=M(_),v=M(c);return Kt(b,v,g)},e.addHook=function(_,c){typeof c=="function"&&ke(D[_],c)},e.removeHook=function(_,c){if(c!==void 0){const g=sr(D[_],c);return g===-1?void 0:cr(D[_],g,1)[0]}return Jt(D[_])},e.removeHooks=function(_){D[_]=[]},e.removeAllHooks=function(){D=on()},e}var sn=hn();const Ar=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),Tr=(t,e)=>typeof t!="number"||e===null?null:t-e,cn=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,r]of Object.entries(e))if(t.includes(n))return r;return t.replace("카드","").substring(0,2).toUpperCase()},wr=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드","SAMSUNG CARD"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:r,svg:o}of n)for(const i of r)if(e.includes(i.toUpperCase()))try{return chrome?.runtime?.getURL(`assets/card/${o}`)??null}catch{return null}return null},vr=(t,e,n)=>{const r=" recommended",o=document.createElement("div");o.className=`picsel-card-benefit-item${r}`;const i=t.cardName||t.card||"카드",s=wr(i)||t.imageUrl;if(s){const h=document.createElement("div");h.className="picsel-card-image-wrapper";const y=document.createElement("img");y.src=s,y.alt=i,y.className="picsel-card-image",y.onerror=()=>{const S=cn(i);h.textContent="";const P=document.createElement("div");P.className="picsel-card-initial",P.textContent=sn.sanitize(S,{ALLOWED_TAGS:[]}),h.appendChild(P)},h.appendChild(y),o.appendChild(h)}else{const h=cn(i),y=document.createElement("div");y.className="picsel-card-image-wrapper";const S=document.createElement("div");S.className="picsel-card-initial",S.textContent=sn.sanitize(h,{ALLOWED_TAGS:[]}),y.appendChild(S),o.appendChild(y)}const u=document.createElement("div");u.className="picsel-card-info";const l=document.createElement("div");if(l.className="picsel-card-header",(t.discountAmount??0)>0){const h=document.createElement("span");h.className="picsel-recommended-badge",h.textContent=`${e+1}위`,l.appendChild(h)}const m=document.createElement("span");m.className="picsel-card-name";const d=i.includes(",")?i.split(",")[0].trim():i;if(m.textContent=d,l.appendChild(m),u.appendChild(l),t.benefit){const h=document.createElement("div");h.className="picsel-card-benefit-desc",h.textContent=t.benefit,u.appendChild(h)}o.appendChild(u);const x=document.createElement("div");if(x.className="picsel-card-amount",t.benefitType==="installment"){const h=document.createElement("div");h.className="picsel-card-installment",h.textContent=t.benefit||"무이자",x.appendChild(h)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const S=document.createElement("div");S.className="picsel-card-final-price";const P=me(t.finalPrice,n);S.textContent=P,x.appendChild(S)}const h=document.createElement("div");h.className="picsel-card-discount";const y=me(t.discountAmount,n);h.textContent=`-${y}`,x.appendChild(h)}else if(typeof t.rate=="number"&&t.rate>0){const h=document.createElement("div");h.className="picsel-card-rate",h.textContent=`${t.rate}%`,x.appendChild(h)}return o.appendChild(x),o},Pr=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const E=document.createElement("section");E.className="picsel-section picsel-card-section picsel-hidden",E.setAttribute("data-empty","true"),E.style.display="none";const h=document.createElement("h4");h.className="picsel-section-title",h.textContent="카드별 혜택",E.appendChild(h);const y=document.createElement("div");return y.className="picsel-empty-benefits",y.textContent="이 상품에는 카드 혜택이 없어요",E.appendChild(y),E}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(E=>{const h=E;if(h.benefitType==="point"||h.benefitType==="installment")return null;const y=h.rate??h.discount;let S=0,P=0;typeof y=="number"&&y>100||h.benefitType==="discount"?(S=typeof y=="number"&&y>100?y:h.discount??0,P=0):(P=typeof y=="number"&&y<=100?y:0,S=Ar(n,P)??0);const O=Tr(n,S);return{...h,cardName:h.cardName??h.card,rate:P,discountAmount:S??void 0,finalPrice:O??void 0}}).filter(E=>E!==null).sort((E,h)=>{const y=E?.discountAmount??0,S=h?.discountAmount??0;if(y!==S)return S-y;const P=E?.rate??0;return(h?.rate??0)-P})[0];if(!i)return null;const a=document.createElement("section");a.className="picsel-section picsel-card-section";const s=document.createElement("h4");s.className="picsel-section-title",s.textContent="추천 카드 혜택",a.appendChild(s);const u=document.createElement("div");u.className="picsel-card-benefit-list";const l=t.currency??"KRW",m=vr(i,0,l);u.appendChild(m),a.appendChild(u);const d=[],x=t.elevenst?.totalPointAmount??0;if(x>0&&d.push(`최대 적립 포인트 ${x.toLocaleString()}P`),t.giftCardDiscount?.description&&d.push(t.giftCardDiscount.description),t.cashback?.description&&d.push(t.cashback.description),d.length>0){const E=document.createElement("div");E.className="picsel-sub-benefits",d.forEach(h=>{const y=document.createElement("div");y.className="picsel-sub-benefit-item",y.textContent=h,E.appendChild(y)}),a.appendChild(E)}return a},kr=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{Ce(!1)}),n.appendChild(r),e.appendChild(n),e},Nr=async t=>{if(t&&f.comparison.status!=="loading"&&!(f.comparison.status==="success"&&f.comparison.query===t)&&!(f.comparison.status==="error"&&f.comparison.query===t)){f.comparison={status:"loading",query:t,error:null,data:null};try{if(!chrome?.runtime?.sendMessage){f.comparison={status:"error",query:t,error:"Chrome extension API를 사용할 수 없습니다.",data:null};return}const e=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!e?.success){f.comparison={status:"error",query:t,error:e?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null};return}const n=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:t});n?.success?f.comparison={status:"success",query:t,error:null,data:n.data}:f.comparison={status:"error",query:t,error:n?.error||"가격 비교 검색 실패",data:null}}catch(e){f.comparison={status:"error",query:t,error:e instanceof Error?e.message:"알 수 없는 오류",data:null}}}},Rr=t=>{t&&f.comparison.status!=="loading"&&((f.comparison.status==="success"||f.comparison.status==="error")&&f.comparison.query===t||(f.comparison={status:"loading",query:t,error:null,data:null},J(),Nr(t).finally(()=>{J()})))},Et=t=>{const{buttonBadgeEl:e}=f;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const i=o,a=i.rate??i.discount;return typeof a=="number"?a:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=me(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},J=()=>{const{contentEl:t,cachedData:e}=f;if(!t)return;if(t.textContent="",!e){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(i),Et(null);return}const n=e,{displayMode:r}=Se.getState(),o=nr(n);if(t.appendChild(o),r==="lowest-price"){const i=document.createElement("section");i.className="picsel-section picsel-lowest-price-section";const a=!!f.panelEl?.classList.contains("open"),s=f.comparison.status,u=f.comparison.data;if(a)if(s==="loading"){const l=document.createElement("div");l.className="picsel-empty-state",l.textContent="가격 비교 중...",i.appendChild(l)}else if(s==="error"){const l=document.createElement("div");l.className="picsel-empty-state",l.textContent=f.comparison.error||"가격 비교 중 오류가 발생했습니다.",i.appendChild(l)}else if(s==="success"&&u){if(u.is_cheaper&&u.price_diff&&u.price_diff>0){const d=document.createElement("div");d.className="picsel-savings-banner";const x=document.createElement("span");x.className="picsel-savings-icon",x.innerHTML='<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10l3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';const E=document.createElement("span");E.className="picsel-savings-text",E.textContent=`지금 ${me(u.price_diff,"KRW")}원 더 아낄 수 있어요!`,d.appendChild(x),d.appendChild(E),i.appendChild(d)}else if(u.is_cheaper===!1){const d=document.createElement("div");d.className="picsel-no-savings-banner",d.textContent="현재 가격이 가장 저렴합니다.",i.appendChild(d)}const m=(Array.isArray(u.results)?u.results:[]).filter(d=>d&&d.success&&Array.isArray(d.products)).flatMap(d=>d.products.map(x=>({provider:d.provider,name:x.name,price:x.price,currency:x.currency,url:x.url}))).filter(d=>typeof d.price=="number"&&d.price>0).sort((d,x)=>d.price-x.price).slice(0,3);if(m.length>0){const d=document.createElement("div");d.className="picsel-section-header";const x=document.createElement("span");x.className="picsel-section-title",x.textContent="최저가 추천";const E=document.createElement("span");E.className="picsel-section-note",E.textContent="배송비 포함 기준",d.appendChild(x),d.appendChild(E),i.appendChild(d);const h=document.createElement("div");if(h.className="picsel-price-list",m.forEach((y,S)=>{const P=S===0,O=document.createElement("a");O.href=y.url||"#",O.target="_blank",O.rel="noreferrer",O.className=P?"picsel-price-item picsel-price-item-top":"picsel-price-item";const G=document.createElement("div");G.className="picsel-price-item-left";const A=document.createElement("div");A.className="picsel-mall-row";const Y=document.createElement("span");if(Y.className="picsel-mall-name",Y.textContent=y.name||y.provider||"알 수 없음",A.appendChild(Y),P){const D=document.createElement("span");D.className="picsel-lowest-badge",D.textContent="최저가",A.appendChild(D)}G.appendChild(A);const K=document.createElement("span");K.className="picsel-price-subtext",K.textContent="다나와 제공",G.appendChild(K);const le=document.createElement("div");le.className="picsel-price-item-right";const re=document.createElement("span");re.className="picsel-price-value";const ue=me(y.price,y.currency??"KRW");re.textContent=ue?`${ue.replace("₩","").replace(",",",")}`:`${y.price.toLocaleString()}원`;const Te=document.createElement("span");Te.className="picsel-price-arrow",Te.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',le.appendChild(re),le.appendChild(Te),O.appendChild(G),O.appendChild(le),h.appendChild(O)}),i.appendChild(h),u.link){const y=document.createElement("a");y.href=u.link,y.target="_blank",y.rel="noreferrer",y.className="picsel-footer-link",y.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2h7m0 0v7m0-7L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 정확한 정보 확인하기',i.appendChild(y)}}else{const d=document.createElement("div");d.className="picsel-empty-state",d.textContent="검색 결과가 없습니다.",i.appendChild(d)}}else{const l=document.createElement("div");l.className="picsel-empty-state",l.textContent="상품명을 찾을 수 없어 가격 비교를 실행할 수 없습니다.",i.appendChild(l)}else{const l=document.createElement("div");l.className="picsel-empty-state",l.textContent="패널을 열면 최저가 비교를 시작합니다.",i.appendChild(l)}t.appendChild(i)}else{const i=Pr(n);i&&t.appendChild(i);const a=kr();a&&t.appendChild(a)}Et(r==="lowest-price"?null:n)},Ce=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=f;if(!(!e||!n||!r))if(t){e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),r.textContent="PicSel 혜택 닫기";const{displayMode:o}=Se.getState();o==="lowest-price"&&f.cachedData?.title?Rr(f.cachedData.title):J()}else e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),r.textContent="PicSel 혜택 보기"},Ir=()=>{if(f.mounted)return;if(document.getElementById(dt)){const i=document.getElementById(dt);i&&(f.hostElement=i,f.shadowRoot=i.shadowRoot,i.shadowRoot&&(f.toggleButton=i.shadowRoot.querySelector(".picsel-toggle-button"),f.buttonLabelEl=i.shadowRoot.querySelector(".picsel-toggle-label"),f.buttonBadgeEl=i.shadowRoot.querySelector(".picsel-toggle-badge"),f.panelEl=i.shadowRoot.querySelector(`#${pt}`),f.closeButtonEl=i.shadowRoot.querySelector(".picsel-close-button"),f.contentEl=i.shadowRoot.querySelector(".picsel-panel-content"),f.panelTitleEl=i.shadowRoot.querySelector(".picsel-panel-title"))),f.mounted=!0;return}f.hostElement=document.createElement("div"),f.hostElement.id=dt,f.hostElement.style.position="fixed",f.hostElement.style.bottom="24px",f.hostElement.style.right="24px",f.hostElement.style.zIndex=String(2147483647),f.shadowRoot=f.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=Jn,f.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",f.shadowRoot.appendChild(e),f.toggleButton=document.createElement("button"),f.toggleButton.className="picsel-toggle-button",f.toggleButton.type="button",f.toggleButton.setAttribute("aria-expanded","false"),f.buttonLabelEl=document.createElement("span"),f.buttonLabelEl.className="picsel-toggle-label",f.buttonLabelEl.textContent="PicSel 혜택 보기",f.toggleButton.appendChild(f.buttonLabelEl),f.buttonBadgeEl=document.createElement("span"),f.buttonBadgeEl.className="picsel-toggle-badge",f.toggleButton.appendChild(f.buttonBadgeEl),e.appendChild(f.toggleButton),f.panelEl=document.createElement("div"),f.panelEl.className="picsel-panel",f.panelEl.id=pt,f.panelEl.setAttribute("role","dialog"),f.panelEl.setAttribute("aria-hidden","true"),f.toggleButton.setAttribute("aria-controls",pt);const n=document.createElement("div");n.className="picsel-panel-header",f.panelTitleEl=document.createElement("div"),f.panelTitleEl.className="picsel-panel-title",f.panelTitleEl.textContent="PicSel 혜택 정보",f.closeButtonEl=document.createElement("button"),f.closeButtonEl.type="button",f.closeButtonEl.className="picsel-close-button",f.closeButtonEl.setAttribute("aria-label","닫기"),f.closeButtonEl.textContent="✕",n.appendChild(f.panelTitleEl),n.appendChild(f.closeButtonEl),f.panelEl.appendChild(n),f.contentEl=document.createElement("div"),f.contentEl.className="picsel-panel-content",f.panelEl.appendChild(f.contentEl),e.appendChild(f.panelEl);const r=f.panelEl,o=f.hostElement;f.toggleButton.addEventListener("click",()=>{const i=!r.classList.contains("open");Ce(i)}),f.closeButtonEl.addEventListener("click",()=>{Ce(!1)}),window.addEventListener("keydown",i=>{i.key==="Escape"&&Ce(!1)}),document.addEventListener("click",i=>{if(!r.classList.contains("open"))return;const a=i.composedPath();o&&!a.includes(o)&&Ce(!1)},!0),document.body.appendChild(f.hostElement),f.mounted=!0},xn=()=>{const{displayMode:t}=Se.getState();if(f.panelTitleEl)if(t==="lowest-price")f.panelTitleEl.textContent="가격 비교 리포트";else if(f.cachedData?.site){const e=tr(f.cachedData.site);f.panelTitleEl.textContent=`${e} 혜택 정보`}else f.panelTitleEl.textContent="PicSel 혜택 정보"},bn=t=>{f.cachedData={...t},Ir(),xn(),J(),Ce(!1)},Tt=t=>{if(f.cachedData={...f.cachedData??{},...t},!f.mounted){bn(f.cachedData);return}xn(),J()},w=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},En=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},Dr=t=>t.includes("원")||t.includes("KRW")?"KRW":t.includes("$")||t.includes("USD")?"USD":t.includes("€")||t.includes("EUR")?"EUR":t.includes("¥")||t.includes("JPY")?"JPY":"KRW",wt=t=>typeof t=="number"&&t>100&&t<1e8,fe=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},At=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","BC","NH"];for(const n of e)if(t.includes(n))return n;return t.replace(/카드$/g,"")};class Ae{extractNumber(e){return w(e)}extractCurrency(e){return Dr(e)}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){ae.error(T.PAR_E004,`Selector error: ${r}`,{data:{siteName:this.siteName,selector:r},error:o instanceof Error?o:void 0})}return null}isValidPrice(e){return wt(e)}searchPriceInDOM(e,n){const r=e.querySelectorAll('[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]');for(const u of r){const m=(u.textContent||"").match(n);if(m)return ae.debug("Found price in container",{siteName:this.siteName,price:m[0]}),m[0]}const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i,a=0;const s=1e3;for(;(i=o.nextNode())&&a<s;){a++;const l=(i.textContent||"").match(n);if(l)return ae.debug("Found price via TreeWalker",{siteName:this.siteName,price:l[0],nodesScanned:a}),l[0]}return a>=s&&ae.warn("TreeWalker hit node limit",{siteName:this.siteName,limit:s}),null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const X={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",".deal-price",".special-price",".discount-price strong",'[class*="sale"] strong','[class*="discount"] strong','div[class*="price"] > strong','span[class*="price"] > strong','[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]',".deal-title",".special-title",'h1[class*="product"]','h1[class*="title"]',"h1"],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},Mr=t=>{for(const e of X.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Or=t=>{try{const e=t.querySelector(X.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r=`https:${r}`),r=r.split("?")[0],r}const n=t.querySelector(X.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o=`https:${o}`),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return p.error(T.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},Lr=t=>{try{const e=[],n=new Set,r=t.querySelector(X.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let s=i.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s=`https:${s}`),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return p.error(T.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},an=t=>t>=100&&t<=1e8,Br=t=>{let e=null,n=null,r=null;for(const o of X.amount)try{const i=t.querySelector(o);if(!i||!i.textContent)continue;const a=i.textContent.trim();if(!/[\d,]+\s*원?/.test(a)&&!/^\d{1,3}(,\d{3})*$/.test(a.replace(/[^\d,]/g,"")))continue;const s=w(a);if(!s||!an(s))continue;if(p.debug(`Found via selector "${o}"`,{value:s}),/final|discount|final-price|deal|sale|coupon/i.test(o)){r=s,e=s;break}n||(n=s),e||(e=s)}catch(i){p.debug(`Selector ${o} failed`,{error:i})}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of o){const s=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s){const u=w(s[1]);if(u&&an(u)){p.debug("Found via regex in element",{value:u}),e=u;break}}}}return{amount:e,originalPrice:n,discountPrice:r}},Ur=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const i of e){const a=o.match(i);if(a&&a[1]){const s=w(a[1]);if(s)return p.debug("Found price via text walker",{value:s}),s}}}return null},zr=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),i=(r.getAttribute("data-price")||"").trim(),s=`${o} ${i}`.trim().match(n);if(s&&s[1]){const u=w(s[1]);if(u)return p.debug("Found price by element scan",{value:u}),u}}}catch(e){p.debug("findPriceByElementScan error",{error:e})}return null},Fr={신한:"assets/card/shinhanCard.svg",우리:"assets/card/wooriCard.svg",BC:"assets/card/bcCard.svg",비씨:"assets/card/bcCard.svg",롯데:"assets/card/lotteCard.svg",KB:"assets/card/kbCard.svg",국민:"assets/card/kbCard.svg",NH:"assets/card/nhCard",농협:"assets/card/hanaCard.svg",삼성:"assets/card/samsungCard.svg",하나:"assets/card/hanaCard.svg",현대:"assets/card/hyundaiCard.svg",비자:"assets/card/visaCard.svg",마스터:"assets/card/masterCard.svg"},qr=t=>{const e=At(fe(t)),n=Fr[e];if(!n)return null;try{return chrome.runtime.getURL(n)}catch{return null}},Ge=t=>{for(const[e,n]of Object.entries(Yn))if(t.includes(e))return n;return null},$r=t=>{const e=[],n=X.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const a=i,s=a.src,u=a.alt||"";if(!s)return;let l=u.trim();l||(l=Ge(s)||""),l&&!l.includes("카드")&&(l=`${l}카드`),s&&l&&(e.some(m=>m.cardName===l)||(e.push({src:s,alt:u,cardName:l}),p.debug("카드 이미지 발견",{cardName:l,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(a=>{const s=a,u=s.src,l=s.alt||"";if(!u||(s.width||s.naturalWidth)>100)return;let d=l.trim();d||(d=Ge(u)||""),d&&!d.includes("카드")&&(d=`${d}카드`),u&&d&&!e.some(x=>x.cardName===d)&&e.push({src:u,alt:l,cardName:d})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const a=i,s=a.src,u=a.alt||"";if(!s||(a.width||a.naturalWidth)>100)return;let m=u.trim();m||(m=Ge(s)||""),m&&!m.includes("카드")&&(m=`${m}카드`),s&&m&&!e.some(d=>d.cardName===m)&&e.push({src:s,alt:u,cardName:m})}),p.debug("추출된 카드 이미지 총",{count:e.length}),e},Wr=t=>{const e=[],n=X.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return p.debug("카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const a=o.contentDocument||o.contentWindow?.document;if(a)return Hr(a)}catch{p.warn("iframe 접근 불가 (cross-origin)")}const i=r.querySelector(n.content);return i?Gr(i):e},Hr=t=>{const e=[],n=X.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const i=o.querySelector(n.cardName),a=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),u=i?.textContent?.trim()||"",l=a?.textContent?.trim()||"",m=s?.textContent?.trim()||o.textContent?.trim()||"";if(u){const d=En(l||m)??void 0;e.push({card:u,cardName:u,benefit:m||l||"혜택 제공",discount:d,rate:d})}}),e},Gr=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let i;for(;(i=o.exec(n))!==null;){const a=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);e.some(u=>u.card===a)||e.push({card:a,cardName:a,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},Kr=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",i=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const a=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);if(!e.some(u=>u.card===a)){let u=`최대 ${s}% 할인/적립`;const l=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);l&&(u=`최대 ${s}% ${l[0]}`),e.push({card:a,cardName:a,benefit:u,discount:s,rate:s})}}}),e},jr=t=>{let e=[];const n=$r(t),r=Wr(t);if(r.length>0&&(p.info("팝업에서 카드 혜택 파싱",{count:r.length}),e=r),Kr(t).forEach(i=>{e.some(a=>a.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(X.benefitBadge);if(i){const a=i.querySelectorAll("img.benefit-ico"),s=[],u=[];a.forEach(d=>{const x=d.getAttribute("src");if(x){const E=Ge(x);E&&(s.push(E),u.push(x))}});const l=i.querySelector(".benefit-label")?.textContent?.trim(),m=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(l){const d=En(l),x=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드",E=d??void 0;e.push({card:x,cardName:x,benefit:`${l}${m?` (${m})`:""}`,discount:E,rate:E,imageUrl:u[0]})}}}return e=e.map((i,a)=>{if(!i.imageUrl){const s=i.cardName||i.card||"",u=At(fe(s));let l=n.find(m=>{const d=fe(m.cardName),x=fe(s);return d===x});if(l||(l=n.find(m=>{const d=fe(m.cardName).replace("카드",""),x=fe(s).replace("카드","");return d.includes(x)||x.includes(d)})),l||(l=n.find(m=>At(fe(m.cardName))===u)),!l&&a<n.length&&(l=n[a],p.debug("인덱스 기반 매칭",{cardName:s,matchedCardName:l.cardName})),!l){const m=qr(s);if(m)return p.debug("로컬 아이콘 폴백 사용",{cardName:s,benefitKey:u}),{...i,imageUrl:m}}if(l)return{...i,imageUrl:l.src}}return i}),e.sort((i,a)=>(a.discount??0)-(i.discount??0)),p.debug("최종 카드 혜택",{benefits:e}),e},Yr=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const a=i.match(/(\d+)\s*%/);if(a)return{rate:parseInt(a[1],10),description:i.trim()}}}return null},Vr=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",a=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(a&&i.includes("쿠팡캐시")){const s=w(a[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=w(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},Xr=t=>{try{const e=[],n=new Set,r=t.querySelector(X.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const a=i.querySelectorAll("div");if(a.length<2)continue;let s="";for(const d of a){const x=d.textContent||"";if(!x.includes("원")&&x.trim().length>0&&!x.includes("px")){s=x.trim();break}}let u="";for(const d of a){const E=(d.textContent||"").match(/[\d,]+원/);if(E){u=E[0].replace(/[,원]/g,"");break}}if(!u)continue;const l=parseInt(u);if(!l||l<100||!s||s.length<2)continue;const m=`${s}-${l}`;if(n.has(m))continue;if(e.push({name:s,price:l}),n.add(m),e.length>=15)break}catch(a){p.warn("Error parsing list item",{error:a});continue}return e}catch(e){return p.error(T.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},Zr=t=>t.querySelector(X.shipping)?.textContent?.trim()||null,Jr=(t,e)=>{if(!wt(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let r=Math.round(t*(n/100));return e.maxDiscount&&r>e.maxDiscount&&(r=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:r},Qr=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},yn=(t,e)=>t.map(r=>{const o=Qr(r);return e&&wt(e)&&(o.discountAmount=Jr(e,o)),o}).sort((r,o)=>r.discountAmount!==void 0&&o.discountAmount!==void 0?o.discountAmount-r.discountAmount:(o.rate??0)-(r.rate??0)),_n=t=>{const e=new Map;for(const n of t){const r=eo(n.cardName||n.card),o=e.get(r);if(!o)e.set(r,n);else{const i=o.rate??o.discount??0;(n.rate??n.discount??0)>i&&e.set(r,n)}}return Array.from(e.values())},eo=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","NH","BC","비씨","스마일"],n=t.toLowerCase();for(const r of e)if(n.includes(r.toLowerCase()))return r;return t};class Cn extends Ae{siteName="Coupang";selectors={amount:X.amount};static isCheckoutPage(e){if(!/coupang\.com/.test(e))return!1;const o=![/coupang\.com\/?$/,/shop\.coupang\.com/,/coupang\.com\/np\/categories/,/coupang\.com\/np\/search/,/coupang\.com\/np\/campaigns/,/coupang\.com\/np\/cart/,/coupang\.com\/np\/checkout/,/coupang\.com\/my\//,/coupang\.com\/np\/login/,/coupang\.com\/np\/register/].some(i=>i.test(e));return p.debug(`isCheckoutPage("${e}") = ${o}`),o}parse(e){try{p.info("🔍 Parsing Coupang page...");const n=Mr(e),r=Or(e),o=Lr(e),i=Br(e);let a=i.amount;const{originalPrice:s,discountPrice:u}=i;if(a||(a=Ur(e)),a||(a=zr(e)),!a)return p.debug("❌ No price found"),null;const l=jr(e),m=yn(l,a),d=_n(m),x=Yr(e),E=Vr(e),h=Zr(e),y=Xr(e);return p.info(`✅ Found: ${a} KRW, Cards: ${d.length}`),{price:a,amount:a,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:y,originalPrice:s||void 0,discountPrice:u||void 0,cardBenefits:d,giftCardDiscount:x||void 0,cashback:E||void 0,shippingInfo:h||void 0,discounts:[]}}catch(n){return p.error(T.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const B={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",salePriceAlt2:".c_product_price .price .value",salePriceAlt3:'[class*="price"] .value',discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price",dealPrice:'.deal_price .value, [class*="deal"] .price',specialPrice:".special_price .value"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",titleAlt2:'h1[class*="title"]',titleAlt3:"h1.product_name",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},yt={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},to=t=>{const e=B.product;try{const n=t.querySelector(e.title);if(n?.textContent){const o=n.textContent.trim();return p.debug("제목 추출",{title:o}),o}const r=t.querySelector(e.titleAlt);if(r?.textContent){const o=r.textContent.trim();return p.debug("제목 추출 (alt)",{title:o}),o}}catch(n){p.error(T.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},no=t=>{try{const e=t.querySelector(B.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return p.debug("부제목 추출",{subtitle:n}),n}}catch(e){p.error(T.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},ro=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const r=t.match(n);if(r?.[1])return p.debug("상품ID 추출",{productId:r[1]}),r[1]}}catch(e){p.error(T.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},Sn=t=>{const e=B.image;try{const n=t.querySelector(e.main);if(n?.src){const i=Me(n.src);return p.debug("메인 이미지 추출",{src:i}),i}const r=t.querySelector(e.mainAlt);if(r?.src){const i=Me(r.src);return p.debug("메인 이미지 추출 (alt)",{src:i}),i}const o=t.querySelector(`${e.main}[data-src]`);if(o?.dataset?.src){const i=Me(o.dataset.src);return p.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){p.error(T.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},oo=t=>{const e=[],n=new Set,r=B.image;try{const o=Sn(t);o&&(e.push(o),n.add(o)),t.querySelectorAll(r.thumbnail).forEach(s=>{const u=s,l=u.src||u.dataset?.src;if(l){const m=Me(l),d=ln(m);n.has(d)||(e.push(d),n.add(d))}}),t.querySelectorAll(r.thumbnailAlt).forEach(s=>{const u=s,l=u.src||u.dataset?.src;if(l){const m=Me(l),d=ln(m);n.has(d)||(e.push(d),n.add(d))}}),p.debug("전체 이미지 추출",{count:e.length})}catch(o){p.error(T.PAR_E001,"전체 이미지 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},io=t=>{const e=B.seller,n={seller:null,rating:null};try{const r=t.querySelector(e.name);r?.textContent&&(n.seller=r.textContent.trim(),p.debug("판매자 추출",{seller:n.seller}));const o=t.querySelector(e.rating);o?.textContent&&(n.rating=o.textContent.trim(),p.debug("판매자 등급 추출",{rating:n.rating}))}catch(r){p.error(T.PAR_E001,"판매자 정보 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return n};function Me(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function ln(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const so=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=B.price;try{const r=t.querySelector(n.originalPrice);r?.textContent&&(e.originalPrice=w(r.textContent),p.debug("정가",{price:e.originalPrice}));const o=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);o?.textContent&&(e.discountPrice=w(o.textContent),e.amount=e.discountPrice,p.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=w(i.textContent),p.debug("할인율",{rate:e.discountRate}));const a=t.querySelector(n.maxDiscountPrice);a?.textContent&&(e.maxDiscountPrice=w(a.textContent),p.debug("최대할인가",{price:e.maxDiscountPrice}));const s=t.querySelector(n.maxDiscountRate);s?.textContent&&(e.maxDiscountRate=w(s.textContent),p.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(r){p.error(T.PAR_E002,"가격 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},co=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const r of n){const o=r.textContent||"";for(const i of e){const a=o.match(i);if(a?.[1]){const s=w(a[1]);if(s&&s>100&&s<1e8)return p.debug("가격 발견",{value:s}),s}}}return null},ao=t=>{const e=[],n=B.price;try{const r=t.querySelector(n.maxDiscountLayer);if(!r)return e;r.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const a=i.querySelector(".title"),s=i.querySelector(".price");if(a&&s){const u=a.textContent?.trim()||"",l=s.textContent?.trim()||"",m=w(l.replace("-",""));u&&m&&u!=="판매가"&&(e.push({type:u,amount:m}),p.debug("DiscountDetail",{type:u,amount:m}))}})}catch(r){p.error(T.PAR_E002,"DiscountDetail 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},lo=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=uo(t),e.totalPointAmount=e.points.reduce((n,r)=>n+r.amount,0),e.cardBenefits=po(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,r)=>n+r.benefitAmount,0),e.installments=go(t),e.maxInstallmentMonths=e.installments.reduce((n,r)=>Math.max(n,r.maxMonths),0),e.coupons=bo(t),p.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){p.error(T.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},uo=t=>{const e=[],n=B.pointDetail;try{const r=t.querySelector(n.container);if(r){const o=r.querySelector(n.totalPoint);if(o?.textContent){const a=w(o.textContent);a&&(e.push({amount:a,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),p.debug("최대 적립 포인트",{amount:a}))}const i=r.querySelector(n.elevenPaySection);if(i){const a=i.querySelector(".total .value");if(a?.textContent){const u=w(a.textContent);u&&!e.find(l=>l.amount===u&&l.type==="최대적립포인트")&&(e.push({amount:u,type:"11pay포인트",description:"11pay 결제 시 적립"}),p.debug("11pay 포인트 총액",{amount:u}))}i.querySelectorAll(".desc li").forEach(u=>{const l=u.querySelector(".c_layer_expand button.c_product_btn"),m=u.querySelector(".value");if(l&&m){const d=l.textContent?.trim()||"",x=w(m.textContent||"");x&&d&&!d.includes("카드")&&(e.push({amount:x,type:d,description:d}),p.debug("포인트 항목",{type:d,amount:x}))}})}}if(e.length===0){const o=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(o?.textContent){const i=w(o.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),p.debug("기본 포인트",{amount:i}))}}}catch(r){p.error(T.PAR_E003,"포인트 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},po=t=>{const e=[],n=B.cardDiscount;try{const r=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let o=null;for(const a of r)if(o=t.querySelector(a),o){p.debug("카드 혜택 컨테이너 찾음",{selector:a});break}if(p.debug("other_benefits 컨테이너",{found:!!o}),o){const a=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let s=null;for(const u of a)if(s=o.querySelectorAll(u),s.length>0){p.debug("benefit 블록 찾음",{selector:u,count:s.length});break}if(p.debug("benefit 블록 수",{count:s?.length||0}),!s||s.length===0){const u=o.querySelector("dl");if(p.debug("dl 요소",{found:!!u}),u){const l=u.children;p.debug("dl children",{count:l.length})}}s&&s.length>0&&s.forEach(u=>{const m=u.querySelector("dt")?.textContent?.trim()||"";if(p.debug("메인 타이틀",{mainTitle:m}),!m)return;const d=fo(m);d&&d.benefitAmount>0&&(e.push(d),p.debug("메인 혜택 추가",{mainParsed:d}));const x=u.querySelector("dd");if(x){const E=x.querySelectorAll(".tit_sub");p.debug("서브타이틀 수",{count:E.length}),E.forEach(h=>{const y=h.textContent?.trim()||"";if(p.debug("서브타이틀",{subTitle:y}),y.includes("안내사항")||y.includes("적립제외"))return;let S=h.nextElementSibling;for(;S&&S.tagName!=="UL"&&S.tagName!=="SPAN";)S=S.nextElementSibling;if(S&&S.tagName==="UL"){const P=S.querySelectorAll("li");p.debug("리스트 아이템 수",{count:P.length}),P.forEach(O=>{const G=O.textContent?.trim()||"";p.debug("아이템",{itemText:G});const A=mo(y,G);A&&(e.find(K=>K.cardName===A.cardName&&K.benefitType===A.benefitType&&K.benefitAmount===A.benefitAmount)||(e.push(A),p.debug("서브 혜택 추가",{subBenefit:A})))})}})}})}else p.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(s=>{const u=s.textContent?.trim()||"";if(u.includes("카드")||u.includes("신한")){const m=s.closest("li")?.querySelector(".value")?.textContent?.trim()||"",d=w(m);if(d){const x=u.replace(" 결제 시","").trim();e.find(E=>E.cardName===x&&E.benefitType==="포인트")||e.push({cardName:x,benefitAmount:d,benefitType:"포인트",condition:"결제 시"})}}}),p.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(r){p.error(T.PAR_E003,"카드 혜택 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function fo(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const u of e){const l=t.match(u);if(l){n=l[1];break}}if(!n)return null;let r=0,o="",i="";const a=t.match(/최대\s*(\d+)%\s*적립/);a&&(r=parseInt(a[1],10),o="적립",i="결제 시");const s=t.match(/([\d,]+)원\s*할인/);return s&&(r=w(s[1])||0,o="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:r,benefitType:o||(t.includes("할인")?"할인":"적립"),condition:i}}function mo(t,e){if(!e)return null;let n="",r=0,o="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const a=e.match(/([\d,]+)원\s*할인/);a&&(r=w(a[1])||0,o="할인");const s=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return s&&!o&&(r=parseFloat(s[1]),o="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!r||!o?null:{cardName:n,benefitAmount:r,benefitType:o,condition:i}}const go=t=>{const e=[],n=B.installment;try{const r=t.querySelector(n.dialogContainer);if(r&&(r.querySelectorAll(".card_box").forEach(i=>{const s=i.querySelector("dt")?.textContent?.trim()||"";if(!s)return;i.querySelectorAll("dd").forEach(l=>{const m=l.textContent?.trim()||"";if(!m)return;const d=ho(s,m);d&&e.push(d)})}),p.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const o=t.querySelector(n.triggerButton);if(o){const s=(o.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);s&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"})}xo(t).forEach(a=>{e.find(s=>s.cardName===a.cardName)||e.push(a)})}p.info("총 무이자 할부 카드",{count:e.length})}catch(r){p.error(T.PAR_E003,"무이자 할부 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function ho(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const r=n[1],i=r.split(",").map(m=>parseInt(m.trim(),10)).filter(m=>!isNaN(m)),a=i.length>0?Math.max(...i):0;if(a===0)return null;let s=null;const u=e.match(/(\d+)만원/);u&&(s=parseInt(u[1],10)*1e4);let l="";return e.includes("11pay")?l="11pay 결제 시":e.includes("카카오페이")?l="카카오페이 결제 시":s&&(l=`${s/1e4}만원 이상`),{cardName:t,maxMonths:a,minAmount:s,months:`${r}개월`,condition:l}}function xo(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(o=>{const i=o.textContent||"",a=i.match(/최대\s*(\d+)\s*개월\s*무이자/);a&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(a[1],10),minAmount:null,months:`최대 ${a[1]}개월`,condition:"무이자 할부"}),n.forEach(s=>{if(i.includes(s)){const l=i.substring(i.indexOf(s)).match(/([\d,]+)개월/);if(l&&!e.find(d=>d.cardName.includes(s))){const d=l[1],x=d.split(",").map(h=>parseInt(h.trim(),10)),E=Math.max(...x.filter(h=>!isNaN(h)));e.push({cardName:`${s}카드`,maxMonths:E,minAmount:null,months:`${d}개월`,condition:""})}}})}),e}const bo=t=>{const e=[],n=B.coupon;try{const r=t.querySelector(n.badge);if(r?.textContent){const i=r.textContent.trim(),a=Eo(i);a&&(e.push(a),p.debug("쿠폰 추출",{coupon:a}))}t.querySelectorAll(n.item).forEach(i=>{const a=i.querySelector(n.name),s=i.querySelector(n.discount);if(a||s){const u=a?.textContent?.trim()||"쿠폰",l=s?.textContent||"",m=l.includes("원")?w(l):null,d=l.includes("%")?w(l):null;e.push({name:u,discountAmount:m,discountRate:d})}})}catch(r){p.error(T.PAR_E003,"쿠폰 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function Eo(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:w(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function un(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:r,name:o}of n)for(const i of r)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${o} (신용)`:e.includes("체크카드")?`${o} (체크)`:o;return e||t}function yo(t,e){const n=t.map(r=>{const o=un(r.cardName),i=r.benefitType==="할인",a=r.benefitAmount<=100?r.benefitAmount:0;let s="";return i?s=`${r.benefitAmount.toLocaleString()}원 할인`:r.benefitAmount<=100?s=`${r.benefitAmount}% 적립`:s=`${r.benefitAmount.toLocaleString()}P 적립`,{card:o,cardName:o,benefit:s,discount:i?r.benefitAmount:0,rate:a,condition:r.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(r=>{if(r.cardName==="__INSTALLMENT_SUMMARY__")return;const o=un(r.cardName);n.push({card:o,cardName:o,benefit:`${r.months} 무이자`,discount:0,rate:0,condition:r.condition,benefitType:"installment",pointAmount:0})}),n}class An extends Ae{siteName=yt.siteName;selectors={amount:[B.price.salePrice,B.price.salePriceAlt,B.price.maxDiscountPrice],title:[B.product.title,B.product.titleAlt],image:[B.image.main,B.image.mainAlt]};static isProductPage(e){if(!/11st\.co\.kr/.test(e))return!1;const o=![/11st\.co\.kr\/?$/,/11st\.co\.kr\/category/,/11st\.co\.kr\/search/,/11st\.co\.kr\/browsing/,/11st\.co\.kr\/best/,/11st\.co\.kr\/event$/,/11st\.co\.kr\/cart/,/11st\.co\.kr\/order/,/11st\.co\.kr\/my11st/,/11st\.co\.kr\/login/,/11st\.co\.kr\/member/].some(i=>i.test(e));return p.debug(`isProductPage("${e}") = ${o}`),o}static extractProductId(e){return ro(e)}parse(e){try{p.info("🔍 Parsing 11번가 page...");const n=to(e),r=no(e),o=Sn(e),i=oo(e),a=io(e),s=so(e);let u=s.amount;const{originalPrice:l,discountPrice:m,maxDiscountPrice:d,discountRate:x,maxDiscountRate:E}=s;if(u||(u=co(e)),!u)return p.debug("❌ No price found"),null;const h=ao(e),y=lo(e),{points:S,cardBenefits:P,installments:O,coupons:G,totalPointAmount:A,totalCardBenefitAmount:Y,maxInstallmentMonths:K}=y,le=yo(P,O),re=[];return x&&re.push({rate:x,type:"SALE_DISCOUNT",description:"할인가"}),h.forEach(ue=>{re.push({rate:ue.amount,type:ue.type.toUpperCase().replace(/\s+/g,"_"),description:ue.type})}),p.info(`✅ Found: ${u.toLocaleString()} ${yt.currency}`),p.debug("파싱 결과",{title:n,totalPointAmount:A,cardBenefitsCount:P.length,installmentsCount:O.length,maxInstallmentMonths:K}),{price:u,amount:u,currency:yt.currency,title:n?`${n}${r?` ${r}`:""}`:void 0,imageUrl:o||void 0,images:i,originalPrice:l||void 0,discountPrice:m||d||void 0,discountRate:x||void 0,cardBenefits:le,discounts:re,elevenst:{maxDiscountPrice:d,maxDiscountRate:E,maxInstallmentMonths:K,points:S,installments:O,coupons:G,totalPointAmount:A,totalCardBenefitAmount:Y,seller:a.seller,sellerRating:a.rating,discountDetails:h}}}catch(n){return p.error(T.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const F={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},_o=t=>{const e=t.querySelector(F.product.title);if(e?.textContent){const n=e.textContent.trim();return p.debug("상품명",{title:n}),n}return p.warn("상품명을 찾을 수 없음"),null},Co=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const r of e){const i=r.src;if(i.includes("/still/600"))return p.debug("메인 이미지 (600px)",{src:i}),i}for(const r of e){const i=r.src;if(i.includes("/still/"))return p.debug("메인 이미지",{src:i}),i}const n=t.querySelector(F.product.mainImage);return n?.src?(p.debug("대체 이미지",{src:n.src}),n.src):(p.warn("상품 이미지를 찾을 수 없음"),null)},So=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(r=>{let i=r.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),p.debug("총 이미지",{count:e.length}),e},Ao=t=>{const e={},n=t.querySelector(F.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const r=t.querySelector(F.seller.official);e.isOfficial=!!r;const o=t.querySelector(F.seller.seller);return o?.textContent&&(e.seller=o.textContent.trim()),e},Ke=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return w(e)},To=t=>{const e=F.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const o=Ke(n.textContent);if(o)return p.debug("결제할인가",{price:o}),o}const r=t.querySelector(e.discountPriceAlt);if(r?.textContent){const o=Ke(r.textContent);if(o)return p.debug("결제할인가 (alt)",{price:o}),o}return null},wo=t=>{const e=F.price,n=t.querySelector(e.salePrice);if(n?.textContent){const r=Ke(n.textContent);if(r)return p.debug("판매가",{price:r}),r}return null},vo=t=>{const e=F.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const r=Ke(n.textContent);if(r)return p.debug("정가",{price:r}),r}return null},Po=t=>{const e=F.price,n=t.querySelector(e.discountRate);if(n?.textContent){const r=n.textContent.match(/(\d+)\s*%/);if(r){const o=parseInt(r[1],10);return p.debug("할인율",{rate:o}),o}}return null},ko=t=>{p.debug("가격 정보 추출 시작...");const e=vo(t),n=wo(t),r=To(t),o=Po(t),i=r||n||e;return p.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}),{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}},No=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const r=n.textContent||"";if(r.includes("원")){const o=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(o){const i=w(o[1]);if(i&&i>=1e3)return p.debug("DOM 스캔 가격",{price:i}),i}}}return null},Ro=t=>{const e=[],n=F.cardBenefit,r=t.querySelector(n.container);return r?(r.querySelectorAll(".gmarketcard_area img").forEach(i=>{const a=i,s=a.src,u=a.alt||"";if(s){let l=u;l||(s.includes("smile")||s.includes("Smile")?l="스마일카드":s.includes("samsung")?l="삼성카드":l="G마켓 제휴카드"),e.push({card:l,cardName:l,benefit:"G마켓 제휴카드 혜택",imageUrl:s}),p.debug("제휴카드",{cardName:l,src:s})}}),e):(p.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},Io=t=>{const e=[],n=F.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(o=>{const i=o.querySelector(n.discountItemTitle),a=o.querySelector(n.discountItemDesc),s=o.querySelector(n.discountItemPrice),u=i?.textContent?.trim()||"",l=a?.textContent?.trim()||"";let m;if(s?.textContent){const d=s.textContent.match(/(\d{1,3}(?:,\d{3})*)/);d&&(m=parseInt(d[1].replace(/,/g,""),10))}u&&(e.push({title:u,description:l,discountPrice:m}),p.debug("결제 할인",{title:u,description:l}))}),e},Do=t=>{p.debug("카드 혜택 추출 시작...");const e=[],n=Ro(t);e.push(...n),Io(t).forEach(i=>{const a=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(a){const s=a[1].includes("카드")?a[1]:`${a[1]}카드`,u=i.title.match(/(\d+(?:\.\d+)?)\s*%/),l=u?parseFloat(u[1]):void 0;e.some(m=>m.cardName===s)||e.push({card:s,cardName:s,benefit:i.title,discount:l,rate:l})}});const o=t.querySelector(".box__payment-discount");if(o){const a=(o.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(a){const s=parseInt(a[1],10);e.some(u=>u.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${s}% 할인`,discount:s,rate:s})}}return e.sort((i,a)=>(a.discount??0)-(i.discount??0)),p.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},Mo=t=>{const e=F.additionalBenefits,r=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!r)return null;let o="etc";r.includes("신세계포인트")?o="shinsegae_point":r.includes("스마일페이")?o="smile_pay":r.includes("스마일캐시")?o="smile_cash":r.includes("OK캐쉬백")&&(o="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(s=>{const u=s.querySelector(e.benefitLabel),l=s.querySelector(e.benefitValue),m=u?.textContent?.trim()||"",d=l?.textContent?.trim()||"";m&&d&&i.push({label:m,value:d})}),p.debug("추가 혜택",{type:o,title:r}),{type:o,title:r,details:i}},Tn=t=>{p.debug("추가 혜택 추출 시작...");const e=[],n=F.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(o=>{const i=Mo(o);i&&e.push(i)}),p.debug("총 추가 혜택",{count:e.length}),e},Oo=t=>{const e=Tn(t);for(const n of e)for(const r of n.details){const o=r.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(o)return{amount:parseInt(o[1].replace(/,/g,""),10),description:`${n.title}: ${r.value}`}}return null},Lo=t=>{const e=F.shipping,r=!!t.querySelector(e.starDelivery),o=t.querySelector(e.shippingInfo),i=r?"스타배송":"일반배송";let a,s,u=!1;if(o){const l=o.textContent||"",m=l.match(/(\d{1,3}(?:,\d{3})*)\s*원/);m?a=`${m[1]}원`:l.includes("무료")&&(a="무료배송",u=!0);const d=l.match(/(\d+\/\d+|\d+일)/);d&&(s=d[1])}return p.debug("배송 정보",{method:i,isStarDelivery:r,fee:a}),{method:i,isStarDelivery:r,isFree:u,fee:a,estimatedDate:s}};class wn extends Ae{siteName="Gmarket";selectors={amount:[F.price.discountPrice,F.price.salePrice,F.price.originalPrice]};static isCheckoutPage(e){if(!/gmarket\.co\.kr/.test(e))return!1;const o=![/gmarket\.co\.kr\/?$/,/gmarket\.co\.kr\/n\/category/,/gmarket\.co\.kr\/n\/search/,/gmarket\.co\.kr\/n\/best$/,/gmarket\.co\.kr\/n\/deals$/,/gmarket\.co\.kr\/n\/event$/,/gmarket\.co\.kr\/cart/,/gmarket\.co\.kr\/order/,/gmarket\.co\.kr\/my/,/gmarket\.co\.kr\/login/,/gmarket\.co\.kr\/join/].some(i=>i.test(e));return ae.debug("isCheckoutPage check",{url:e,isCheckout:o}),o}parse(e){try{ae.info("Parsing Gmarket page...");const n=_o(e),r=Co(e),o=So(e),i=Ao(e),a=ko(e);let s=a.amount;if(s||(s=No(e)),!s)return ae.warn("No price found in Gmarket page"),null;const u=Do(e),l=yn(u,s),m=_n(l),d=Tn(e),x=Oo(e),E=Lo(e);return ae.info("Parse successful",{amount:s,cardCount:m.length}),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:[],originalPrice:a.originalPrice||void 0,discountPrice:a.discountPrice||void 0,cardBenefits:m,additionalBenefits:d.length>0?d:void 0,cashback:x||void 0,shippingInfo:E||void 0,sellerInfo:i||void 0,discounts:[]}}catch(n){return ae.error(T.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Bo={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class vn extends Ae{siteName="Amazon";selectors={amount:Bo.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{p.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(p.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return p.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return p.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:a}=this.extractCommonInfo(e);return p.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return p.error(T.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Uo={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class Pn extends Ae{siteName="eBay";selectors={amount:Uo.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{p.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(p.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return p.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return p.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:a}=this.extractCommonInfo(e);return p.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return p.error(T.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const zo={amount:[]};class kn extends Ae{siteName="Fallback";selectors={amount:zo.amount};parse(e){try{p.info("🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return p.debug('❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return p.debug("❌ Invalid amount",{amount:o}),null;const{title:i,imageUrl:a}=this.extractCommonInfo(e);return p.info(`✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return p.error(T.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function Fo(t){return Cn.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:An.isProductPage(t)?{site:"11st",isCheckout:!0}:wn.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:vn.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:Pn.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function qo(t){switch(t){case"coupang":return new Cn;case"11st":return new An;case"gmarket":return new wn;case"amazon":return new vn;case"ebay":return new Pn;default:return new kn}}function $o(){return new kn}function Nn(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";if(!chrome?.runtime?.sendMessage){ut.warn("Chrome extension API not available",{messageType:n,source:e});return}chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},r=>{if(chrome.runtime.lastError){ut.warn("Failed to send message to background",{error:chrome.runtime.lastError.message,messageType:n,source:e});return}r?.success&&ut.debug("Product data saved",{source:e,messageType:n})})}function Rn(t,e){let n=null;const r=(...o)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...o),n=null},e)};return r.cancel=()=>{n&&(clearTimeout(n),n=null)},r}const Wo=500;function Ho(t){let e=!1,n=null,r=!1;const o=Rn(s=>{r||(ne.info("Dynamic content detected",{reason:s}),t(`dynamic-${s}`)||ne.warn("Dynamic reparse produced no result"))},Wo),i=s=>{if(r)return;const u=s.some(E=>Array.from(E.addedNodes).some(h=>h instanceof Element?h.tagName==="IFRAME"||!!h.querySelector("iframe"):!1)),l=!e&&s.some(E=>Array.from(E.addedNodes).some(h=>h instanceof Element?h.classList.contains("benefit")||!!h.querySelector(".benefit")||h.closest(".other_benefits")&&(h.querySelector("dt")||h.querySelector("dd")):!1)),m=document.querySelector(".other_benefits .benefit dt");if(!(l&&m||u))return;l&&(e=!0),o(u?"iframe":"benefit-content"),u&&(a(),ne.debug("Observer disconnected after iframe detection"))},a=()=>{r||(r=!0,n&&(n.disconnect(),n=null),ne.debug("DynamicContentObserver cleaned up"))};return document.body?(n=new MutationObserver(i),n.observe(document.body,{childList:!0,subtree:!0}),a):(ne.warn("document.body not available, observer not started"),a)}const Go=500,Ko=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],jo=()=>!!document.querySelector(".other_benefits .benefit dt");function Yo(t){if(!window.location.hostname.includes("11st.co.kr"))return()=>{};ne.info("Setting up 11번가 benefit watcher");let e=!1,n=null,r=null;const o=new Map,i=Rn(l=>{e||jo()&&(ne.info("Benefit content found",{source:l}),t(l))},Go),a=new WeakSet,s=()=>{e||Ko.forEach(l=>{document.querySelectorAll(l).forEach(d=>{if(a.has(d))return;a.add(d);const x=()=>{ne.debug("Benefit button clicked"),setTimeout(()=>i("benefit-click"),800)};o.set(d,x),d.addEventListener("click",x)})})};s(),r=new MutationObserver(()=>{s()}),document.body&&r.observe(document.body,{childList:!0,subtree:!0}),n=setTimeout(()=>{r&&!e&&(r.disconnect(),r=null,ne.debug("Benefit button observer disconnected (timeout)"))},5e3);const u=()=>{e||(e=!0,n&&(clearTimeout(n),n=null),r&&(r.disconnect(),r=null),o.forEach((l,m)=>{m.removeEventListener("click",l)}),o.clear(),ne.debug("ElevenStreetBenefitWatcher cleaned up"))};return window.addEventListener("beforeunload",u,{once:!0}),u}const Vo=window.self===window.top;let dn=!1,ce=null;const je=[];async function In(t,e,n,r){try{if(N.info(R.NETWORK,"💰 [LOWEST_PRICE] Initiating price comparison",{url:t,product:e,currentPrice:n,site:r,timestamp:new Date().toISOString()}),f.comparison={status:"loading",query:e,error:null,data:null},J(),!chrome?.runtime?.sendMessage){N.error(R.NETWORK,T.NET_E002,"Chrome extension API not available",{}),f.comparison={status:"error",query:e,error:"Chrome extension API를 사용할 수 없습니다.",data:null},J();return}N.debug(R.NETWORK,"[LOWEST_PRICE] Checking server health...");const o=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!o?.success){N.error(R.NETWORK,T.NET_E002,"[LOWEST_PRICE] Server not available",{error:o?.error||"Server check failed"}),f.comparison={status:"error",query:e,error:o?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null},J();return}N.info(R.NETWORK,"[LOWEST_PRICE] Server healthy, sending comparison request");const i=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:e,currentPrice:n,currentUrl:t});i?.success?(N.info(R.NETWORK,"✅ [LOWEST_PRICE] Price comparison completed",{resultCount:i.data?.results?.length||0,fromCache:i.data?.fromCache,totalDuration:i.data?.totalDuration}),f.comparison={status:"success",query:e,error:null,data:i.data},J()):(N.warn(R.NETWORK,"[LOWEST_PRICE] Price comparison failed",{error:i?.error}),f.comparison={status:"error",query:e,error:i?.error||"가격 비교 검색 실패",data:null},J())}catch(o){N.error(R.NETWORK,T.NET_E002,"[LOWEST_PRICE] Request error",{error:o instanceof Error?o:new Error(String(o))}),f.comparison={status:"error",query:e,error:o instanceof Error?o.message:"알 수 없는 오류",data:null},J()}}async function Dn(t=1500,e=!1){const n=Se.persist;n&&(n.hasHydrated?.()&&!e||await new Promise(r=>{let o=!1;const i=window.setTimeout(()=>{o||(o=!0,r())},t),a=n.onFinishHydration?.(()=>{o||(o=!0,window.clearTimeout(i),a&&a(),r())});try{n.rehydrate?.()}catch{}}))}function Mn(){const t=window.location.href,e=Fo(t);if(!e)return N.debug(R.PARSER,"Not a supported page",{url:t}),null;N.info(R.PARSER,`Site detected: ${e.site}`,{url:t});let r=qo(e.site).parse(document);return!r&&(N.warn(R.PARSER,"Primary parser failed, trying fallback",{site:e.site}),r=$o().parse(document),!r)?(N.error(R.PARSER,T.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(N.info(R.PARSER,"Parse successful",{title:r.title?.substring(0,50),amount:r.amount,cardBenefitsCount:r.cardBenefits?.length??0}),{paymentInfo:r,site:e.site})}function Ye(t,e){return{...t,site:e}}function pn(t){const e=Mn();return e?(ce=e,Tt(Ye(e.paymentInfo,e.site)),Nn(e.paymentInfo,t),!0):!1}function Xo(){const t=Mn();if(!t){N.warn(R.BOOTSTRAP,"Failed to extract payment info on init");return}ce=t,bn(Ye(t.paymentInfo,t.site)),Nn(t.paymentInfo,"initial"),(async()=>{await Dn();const e=Se.getState();if(Tt(Ye(t.paymentInfo,t.site)),N.info(R.BOOTSTRAP,"⚙️ Display mode check",{displayMode:e.displayMode,autoFetchLowestPrice:e.autoFetchLowestPrice,hasTitle:!!t.paymentInfo.title}),e.displayMode==="lowest-price"){if(!t.paymentInfo.title){N.warn(R.BOOTSTRAP,"⚠️ [LOWEST_PRICE] Cannot fetch: no product title");return}e.autoFetchLowestPrice?(N.info(R.BOOTSTRAP,"🚀 [LOWEST_PRICE] Auto fetch enabled",{displayMode:e.displayMode,productTitle:t.paymentInfo.title.substring(0,50)}),In(window.location.href,t.paymentInfo.title,t.paymentInfo.amount,t.site)):N.info(R.BOOTSTRAP,"⏸️ [LOWEST_PRICE] Manual mode (will fetch when panel opens)",{displayMode:e.displayMode})}else N.debug(R.BOOTSTRAP,"💳 Card benefits mode selected")})()}function Zo(){je.forEach(t=>{try{t()}catch(e){N.warn(R.BOOTSTRAP,"Cleanup error",{error:e})}}),je.length=0}function Jo(){if(!Vo||dn)return;dn=!0,N.info(R.BOOTSTRAP,"Content script starting"),Xo(),chrome?.storage?.onChanged&&chrome.storage.onChanged.addListener((n,r)=>{r==="local"&&(!n||!Object.prototype.hasOwnProperty.call(n,Vn.SETTINGS)||(async()=>{await Dn(1500,!0);const o=Se.getState();ce&&Tt(Ye(ce.paymentInfo,ce.site)),o.displayMode==="lowest-price"&&o.autoFetchLowestPrice&&ce?.paymentInfo?.title&&In(window.location.href,ce.paymentInfo.title,ce.paymentInfo.amount,ce.site)})())});const t=Ho(n=>pn(n));je.push(t);const e=Yo(n=>{pn(n)});je.push(e),window.addEventListener("beforeunload",Zo,{once:!0})}Zn(Jo);
