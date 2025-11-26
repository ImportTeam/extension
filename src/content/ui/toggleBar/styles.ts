export const toggleBarStyles = `
		:host {
			all: initial;
			position: fixed;
			inset: auto 24px 24px auto;
			z-index: 2147483647;
			font-family: 'Pretendard', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif;
		}

		*, *::before, *::after {
			box-sizing: border-box;
		}

		.picsel-toggle-container {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 12px;
			color: #0f172a;
			font-size: 14px;
			font-weight: 500;
		}

		.picsel-toggle-button {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			padding: 12px 20px;
			border-radius: 999px;
			border: none;
			cursor: pointer;
			background: linear-gradient(135deg, #2563eb, #38bdf8);
			color: #ffffff;
			box-shadow: 0 10px 24px rgba(37, 99, 235, 0.35);
			font-weight: 600;
			font-size: 15px;
			transition: transform 0.2s ease, box-shadow 0.2s ease;
		}

		.picsel-toggle-button:hover {
			transform: translateY(-1px);
			box-shadow: 0 14px 32px rgba(37, 99, 235, 0.4);
		}

		.picsel-toggle-button:active {
			transform: translateY(0);
			box-shadow: 0 8px 18px rgba(37, 99, 235, 0.32);
		}

		.picsel-toggle-label {
			white-space: nowrap;
			font-size: 15px;
		}

		.picsel-toggle-badge {
			display: none;
			align-items: center;
			justify-content: center;
			font-size: 13px;
			font-weight: 600;
			padding: 2px 8px;
			border-radius: 999px;
			background: rgba(255, 255, 255, 0.2);
			border: 1px solid rgba(255, 255, 255, 0.3);
		}

		.picsel-panel {
			width: 360px;
			max-height: 78vh;
			background: #ffffff;
			border-radius: 16px;
			box-shadow: 0 24px 48px rgba(15, 23, 42, 0.32);
			border: 1px solid rgba(148, 163, 184, 0.18);
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
			padding: 16px;
			background: linear-gradient(135deg, #111827, #1f2937);
			color: #f8fafc;
		}

		.picsel-panel-title {
			font-size: 14px;
			font-weight: 600;
		}

		.picsel-close-button {
			width: 28px;
			height: 28px;
			border-radius: 999px;
			border: none;
			background: rgba(255, 255, 255, 0.15);
			color: #f8fafc;
			font-size: 14px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: background 0.2s ease;
		}

		.picsel-close-button:hover {
			background: rgba(255, 255, 255, 0.28);
		}

		.picsel-panel-content {
			padding: 20px;
			display: flex;
			flex-direction: column;
			gap: 18px;
			overflow-y: auto;
		}

		.picsel-empty-state {
			font-size: 13px;
			color: #475569;
			text-align: center;
		}

		.picsel-product {
			display: flex;
			gap: 16px;
		}

		.picsel-product-thumb {
			width: 96px;
			height: 96px;
			border-radius: 12px;
			overflow: hidden;
			background: #e2e8f0;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
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
			gap: 10px;
		}

		.picsel-product-title {
			font-size: 15px;
			font-weight: 600;
			color: #111827;
			line-height: 1.4;
			margin: 0;
		}

		.picsel-price {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-original-price {
			font-size: 13px;
			color: #94a3b8;
			text-decoration: line-through;
		}

		.picsel-final-price {
			font-size: 20px;
			font-weight: 700;
			color: #1f2937;
		}

		.picsel-discount-tag {
			width: fit-content;
			padding: 2px 8px;
			border-radius: 999px;
			background: rgba(16, 185, 129, 0.16);
			color: #0f766e;
			font-size: 12px;
			font-weight: 600;
		}

		.picsel-section {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-section-title {
			font-size: 14px;
			font-weight: 600;
			color: #0f172a;
		}

		.picsel-benefit-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-benefit-item {
			padding: 12px 14px;
			border-radius: 12px;
			background: #f8fafc;
			border: 1px solid rgba(148, 163, 184, 0.24);
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
			color: #475569;
		}

		.picsel-extra-list {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-extra-item {
			font-size: 13px;
			color: #1d4ed8;
			background: rgba(191, 219, 254, 0.4);
			border: 1px solid rgba(147, 197, 253, 0.7);
			padding: 8px 10px;
			border-radius: 10px;
		}

		.picsel-shipping {
			font-size: 12px;
			color: #475569;
			display: flex;
			gap: 6px;
			align-items: center;
		}

		.picsel-variants {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-variant-item {
			display: flex;
			justify-content: space-between;
			padding: 10px 12px;
			border-radius: 10px;
			background: #f1f5f9;
			font-size: 12px;
			color: #0f172a;
			border: 1px solid rgba(148, 163, 184, 0.24);
			gap: 12px;
		}

		.picsel-variant-name {
			font-weight: 500;
		}

		.picsel-variant-price {
			font-weight: 600;
			color: #1f2937;
		}

		.picsel-variant-discount {
			color: #0f766e;
		}

		::-webkit-scrollbar {
			width: 6px;
		}

		::-webkit-scrollbar-thumb {
			background: rgba(15, 23, 42, 0.2);
			border-radius: 999px;
		}

		::-webkit-scrollbar-track {
			background: transparent;
		}
`;
