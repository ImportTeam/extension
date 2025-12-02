export const toggleBarStyles = `
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

		/* Card Benefits Section - 메인 콘텐츠 */
		.picsel-card-section {
			margin-top: 8px;
		}

		.picsel-card-benefit-list {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.picsel-card-benefit-item {
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 16px 18px;
			border-radius: 14px;
			background: #ffffff;
			border: 1px solid #e2e8f0;
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
			transition: all 0.2s ease;
			overflow: hidden;
		}

		.picsel-card-benefit-item:hover {
			border-color: #c7d2fe;
			box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.15);
			transform: translateY(-1px);
		}

		/* 1위 - Indigo 그라데이션 */
		.picsel-card-benefit-item.recommended {
			background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
			border: 2px solid #6366f1;
			box-shadow: 0 4px 14px -3px rgba(99, 102, 241, 0.3);
		}

		.picsel-card-benefit-item.recommended:hover {
			box-shadow: 0 6px 20px -3px rgba(99, 102, 241, 0.4);
		}

		/* 2위 스타일 */
		.picsel-card-benefit-item.rank-2 {
			background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
			border: 1px solid #22c55e;
		}

		/* 3위 스타일 */
		.picsel-card-benefit-item.rank-3 {
			background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
			border: 1px solid #f59e0b;
		}

		.picsel-card-left {
			display: flex;
			flex-direction: column;
			gap: 4px;
			flex: 1;
			min-width: 0;
		}

		.picsel-card-name-row {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.picsel-recommended-badge {
			font-size: 10px;
			font-weight: 800;
			color: #ffffff;
			background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
			padding: 4px 10px;
			border-radius: 999px;
			white-space: nowrap;
			box-shadow: 0 2px 4px -1px rgba(99, 102, 241, 0.4);
		}

		/* 2위 배지 */
		.picsel-card-benefit-item.rank-2 .picsel-recommended-badge {
			background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
			box-shadow: 0 2px 4px -1px rgba(34, 197, 94, 0.4);
		}

		/* 3위 배지 */
		.picsel-card-benefit-item.rank-3 .picsel-recommended-badge {
			background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
			box-shadow: 0 2px 4px -1px rgba(245, 158, 11, 0.4);
		}

		.picsel-card-benefit-item .picsel-card-name {
			font-size: 14px;
			font-weight: 700;
			color: #1e293b;
			line-height: 1.5;
		}

		.picsel-card-benefit-item.recommended .picsel-card-name {
			color: #3730a3;
		}

		.picsel-card-benefit-item.rank-2 .picsel-card-name {
			color: #166534;
		}

		.picsel-card-benefit-item.rank-3 .picsel-card-name {
			color: #92400e;
		}

		.picsel-card-benefit-desc {
			font-size: 12px;
			color: #64748b;
			margin-top: 4px;
		}

		.picsel-card-benefit-item.recommended .picsel-card-benefit-desc {
			color: #4338ca;
		}

		.picsel-card-benefit-item.rank-2 .picsel-card-benefit-desc {
			color: #15803d;
		}

		.picsel-card-benefit-item.rank-3 .picsel-card-benefit-desc {
			color: #b45309;
		}

		.picsel-card-right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 2px;
			flex-shrink: 0;
		}

		.picsel-card-discount {
			font-size: 17px;
			font-weight: 800;
			color: #dc2626;
			text-shadow: 0 1px 2px rgba(220, 38, 38, 0.1);
		}

		.picsel-card-benefit-item.recommended .picsel-card-discount {
			color: #4f46e5;
		}

		.picsel-card-benefit-item.rank-2 .picsel-card-discount {
			color: #16a34a;
		}

		.picsel-card-benefit-item.rank-3 .picsel-card-discount {
			color: #d97706;
		}

		.picsel-card-final {
			font-size: 11px;
			color: #64748b;
			font-weight: 500;
		}

		.picsel-card-benefit-item.recommended .picsel-card-final {
			color: #6366f1;
		}

		.picsel-card-benefit-item.rank-2 .picsel-card-final {
			color: #22c55e;
		}

		.picsel-card-benefit-item.rank-3 .picsel-card-final {
			color: #f59e0b;
		}

		.picsel-card-rate {
			font-size: 14px;
			font-weight: 700;
			color: #0ea5e9;
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
			padding: 14px 24px;
			font-size: 14px;
			font-weight: 600;
			color: #ffffff;
			background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
			border: none;
			border-radius: 18px;
			box-shadow: 0 4px 14px -3px rgba(99, 102, 241, 0.5);
			cursor: pointer;
			transition: all 0.2s ease;
		}

		.picsel-footer-confirm:hover {
			background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
			box-shadow: 0 6px 20px -3px rgba(99, 102, 241, 0.6);
			transform: translateY(-1px);
		}

		.picsel-footer-confirm:active {
			transform: translateY(0);
			box-shadow: 0 2px 8px -2px rgba(99, 102, 241, 0.4);
		}

		/* Sub Benefits - 카드 섹션 아래 */
		.picsel-sub-benefits {
			margin-top: 12px;
			padding: 12px;
			background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
			border-radius: 12px;
			border: 1px solid #e9d5ff;
		}

		.picsel-sub-benefit-item {
			font-size: 12px;
			color: #7c3aed;
			padding: 6px 0;
			font-weight: 500;
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
`;
