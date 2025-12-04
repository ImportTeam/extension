import{b as Ce,p as A,E,a as l,n as _e,d as P,l as N,L as B}from"./assets/index-Dt1PdjWI.js";import{C as Se}from"./assets/constants-4DKqSpZt.js";const Pe=window.self===window.top;function ve(t){if(!Pe){Ce.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const we=`
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
`,q=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const s=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(s,o).format(i)},ke=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),K="picsel-toggle-host",W="picsel-toggle-panel",Ae={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},Ne=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return Ae[e]||String(t)},f={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},Be=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const u=document.createElement("img");u.src=r,u.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(u)}else{const u=document.createElement("span");u.textContent="No Image",u.style.fontSize="11px",u.style.color="#64748b",n.appendChild(u)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const s=document.createElement("div");s.className="picsel-price";const c=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,a=q(c,t.currency??"KRW");if(a){const u=document.createElement("div");u.className="picsel-final-price",u.textContent=a,s.appendChild(u)}const d=q(t.originalPrice,t.currency??"KRW"),p=ke(t.originalPrice,c);if(d&&p){const u=document.createElement("div");u.className="picsel-original-price",u.textContent=d;const g=document.createElement("div");g.className="picsel-discount-tag",g.textContent=`-${p}%`,s.appendChild(u),s.appendChild(g)}if(o.appendChild(i),o.appendChild(s),t.shippingInfo){const u=document.createElement("div");u.className="picsel-shipping",u.textContent=`배송: ${t.shippingInfo}`,o.appendChild(u)}return e.appendChild(n),e.appendChild(o),e},Ie=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),Re=(t,e)=>typeof t!="number"||e===null?null:t-e,j=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,r]of Object.entries(e))if(t.includes(n))return r;return t.replace("카드","").substring(0,2).toUpperCase()},De=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:r,svg:o}of n)for(const i of r)if(e.includes(i.toUpperCase()))return chrome.runtime.getURL(`assets/card/${o}`);return null},Te=(t,e,n)=>{const r=" recommended",o=document.createElement("div");o.className=`picsel-card-benefit-item${r}`;const i=t.cardName||t.card||"카드",c=De(i)||t.imageUrl;if(c){const m=document.createElement("div");m.className="picsel-card-image-wrapper";const b=document.createElement("img");b.src=c,b.alt=i,b.className="picsel-card-image",b.onerror=()=>{const y=j(i);m.innerHTML=`
				<div class="picsel-card-initial">${y}</div>
			`},m.appendChild(b),o.appendChild(m)}else{const m=j(i),b=document.createElement("div");b.className="picsel-card-image-wrapper",b.innerHTML=`<div class="picsel-card-initial">${m}</div>`,o.appendChild(b)}const a=document.createElement("div");a.className="picsel-card-info";const d=document.createElement("div");if(d.className="picsel-card-header",(t.discountAmount??0)>0){const m=document.createElement("span");m.className="picsel-recommended-badge",m.textContent=`${e+1}위`,d.appendChild(m)}const p=document.createElement("span");p.className="picsel-card-name";const u=i.includes(",")?i.split(",")[0].trim():i;if(p.textContent=u,d.appendChild(p),a.appendChild(d),t.benefit){const m=document.createElement("div");m.className="picsel-card-benefit-desc",m.textContent=t.benefit,a.appendChild(m)}o.appendChild(a);const g=document.createElement("div");if(g.className="picsel-card-amount",t.benefitType==="installment"){const m=document.createElement("div");m.className="picsel-card-installment",m.textContent=t.benefit||"무이자",g.appendChild(m)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const y=document.createElement("div");y.className="picsel-card-final-price";const S=q(t.finalPrice,n);y.textContent=S,g.appendChild(y)}const m=document.createElement("div");m.className="picsel-card-discount";const b=q(t.discountAmount,n);m.textContent=`-${b}`,g.appendChild(m)}else if(typeof t.rate=="number"&&t.rate>0){const m=document.createElement("div");m.className="picsel-card-rate",m.textContent=`${t.rate}%`,g.appendChild(m)}return o.appendChild(g),o},qe=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const h=document.createElement("section");h.className="picsel-section picsel-card-section";const m=document.createElement("h4");m.className="picsel-section-title",m.textContent="카드별 혜택",h.appendChild(m);const b=document.createElement("div");return b.className="picsel-empty-benefits",b.textContent="카드 혜택 정보를 불러오는 중...",h.appendChild(b),h}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(h=>{const m=h;if(m.benefitType==="point"||m.benefitType==="installment")return null;const b=m.rate??m.discount;let y=0,S=0;typeof b=="number"&&b>100||m.benefitType==="discount"?(y=typeof b=="number"&&b>100?b:m.discount??0,S=0):(S=typeof b=="number"&&b<=100?b:0,y=Ie(n,S)??0);const k=Re(n,y);return{...m,cardName:m.cardName??m.card,rate:S,discountAmount:y??void 0,finalPrice:k??void 0}}).filter(h=>h!==null).sort((h,m)=>{const b=h?.discountAmount??0,y=m?.discountAmount??0;if(b!==y)return y-b;const S=h?.rate??0;return(m?.rate??0)-S})[0];if(!i)return null;const s=document.createElement("section");s.className="picsel-section picsel-card-section";const c=document.createElement("h4");c.className="picsel-section-title",c.textContent="추천 카드 혜택",s.appendChild(c);const a=document.createElement("div");a.className="picsel-card-benefit-list";const d=t.currency??"KRW",p=Te(i,0,d);a.appendChild(p),s.appendChild(a);const u=[],g=t.elevenst?.totalPointAmount??0;if(g>0&&u.push(`최대 적립 포인트 ${g.toLocaleString()}P`),t.giftCardDiscount?.description&&u.push(t.giftCardDiscount.description),t.cashback?.description&&u.push(t.cashback.description),u.length>0){const h=document.createElement("div");h.className="picsel-sub-benefits",u.forEach(m=>{const b=document.createElement("div");b.className="picsel-sub-benefit-item",b.textContent=m,h.appendChild(b)}),s.appendChild(h)}return s},$e=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{R(!1)}),n.appendChild(r),e.appendChild(n),e},V=t=>{const{buttonBadgeEl:e}=f;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const i=o,s=i.rate??i.discount;return typeof s=="number"?s:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=q(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},ee=()=>{const{contentEl:t,cachedData:e}=f;if(!t)return;if(t.textContent="",!e){const s=document.createElement("p");s.className="picsel-empty-state",s.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(s),V(null);return}const n=e,r=Be(n);t.appendChild(r);const o=qe(n);o&&t.appendChild(o);const i=$e();i&&t.appendChild(i),V(n)},R=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=f;!e||!n||!r||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),r.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),r.textContent="PicSel 혜택 보기"))},Me=()=>{if(f.mounted)return;if(document.getElementById(K)){const i=document.getElementById(K);i&&(f.hostElement=i,f.shadowRoot=i.shadowRoot,i.shadowRoot&&(f.toggleButton=i.shadowRoot.querySelector(".picsel-toggle-button"),f.buttonLabelEl=i.shadowRoot.querySelector(".picsel-toggle-label"),f.buttonBadgeEl=i.shadowRoot.querySelector(".picsel-toggle-badge"),f.panelEl=i.shadowRoot.querySelector(`#${W}`),f.closeButtonEl=i.shadowRoot.querySelector(".picsel-close-button"),f.contentEl=i.shadowRoot.querySelector(".picsel-panel-content"),f.panelTitleEl=i.shadowRoot.querySelector(".picsel-panel-title"))),f.mounted=!0;return}f.hostElement=document.createElement("div"),f.hostElement.id=K,f.hostElement.style.position="fixed",f.hostElement.style.bottom="24px",f.hostElement.style.right="24px",f.hostElement.style.zIndex=String(2147483647),f.shadowRoot=f.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=we,f.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",f.shadowRoot.appendChild(e),f.toggleButton=document.createElement("button"),f.toggleButton.className="picsel-toggle-button",f.toggleButton.type="button",f.toggleButton.setAttribute("aria-expanded","false"),f.buttonLabelEl=document.createElement("span"),f.buttonLabelEl.className="picsel-toggle-label",f.buttonLabelEl.textContent="PicSel 혜택 보기",f.toggleButton.appendChild(f.buttonLabelEl),f.buttonBadgeEl=document.createElement("span"),f.buttonBadgeEl.className="picsel-toggle-badge",f.toggleButton.appendChild(f.buttonBadgeEl),e.appendChild(f.toggleButton),f.panelEl=document.createElement("div"),f.panelEl.className="picsel-panel",f.panelEl.id=W,f.panelEl.setAttribute("role","dialog"),f.panelEl.setAttribute("aria-hidden","true"),f.toggleButton.setAttribute("aria-controls",W);const n=document.createElement("div");n.className="picsel-panel-header",f.panelTitleEl=document.createElement("div"),f.panelTitleEl.className="picsel-panel-title",f.panelTitleEl.textContent="PicSel 혜택 정보",f.closeButtonEl=document.createElement("button"),f.closeButtonEl.type="button",f.closeButtonEl.className="picsel-close-button",f.closeButtonEl.setAttribute("aria-label","닫기"),f.closeButtonEl.textContent="✕",n.appendChild(f.panelTitleEl),n.appendChild(f.closeButtonEl),f.panelEl.appendChild(n),f.contentEl=document.createElement("div"),f.contentEl.className="picsel-panel-content",f.panelEl.appendChild(f.contentEl),e.appendChild(f.panelEl);const r=f.panelEl,o=f.hostElement;f.toggleButton.addEventListener("click",()=>{const i=!r.classList.contains("open");R(i)}),f.closeButtonEl.addEventListener("click",()=>{R(!1)}),window.addEventListener("keydown",i=>{i.key==="Escape"&&R(!1)}),document.addEventListener("click",i=>{if(!r.classList.contains("open"))return;const s=i.composedPath();o&&!s.includes(o)&&R(!1)},!0),document.body.appendChild(f.hostElement),f.mounted=!0},te=()=>{if(f.panelTitleEl&&f.cachedData?.site){const t=Ne(f.cachedData.site);f.panelTitleEl.textContent=`${t} 혜택 정보`}},ne=t=>{f.cachedData={...t},Me(),te(),ee(),R(!1)},ze=t=>{if(f.cachedData={...f.cachedData??{},...t},!f.mounted){ne(f.cachedData);return}te(),ee()};class D{extractNumber(e){const r=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return r?parseInt(r[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){A.error(E.PAR_E004,`Selector error: ${r}`,{data:{siteName:this.siteName,selector:r},error:o instanceof Error?o:void 0})}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const r=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=r.nextNode();){const s=(o.textContent||"").match(n);if(s)return A.debug("Found price via TreeWalker",{siteName:this.siteName,price:s[0]}),s[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const v={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",'[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},Le=t=>{for(const e of v.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Ue=t=>{try{const e=t.querySelector(v.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r="https:"+r),r=r.split("?")[0],r}const n=t.querySelector(v.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o="https:"+o),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return l.error(E.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},Oe=t=>{try{const e=[],n=new Set,r=t.querySelector(v.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let c=i.src;if(c&&!n.has(c)&&(c.startsWith("//")&&(c="https:"+c),c.includes("thumbnails/remote/")&&(c=c.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),c=c.split("?")[0],!n.has(c)&&(e.push(c),n.add(c),e.length>=10)))break}}return e}catch(e){return l.error(E.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},x=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},re=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},oe=t=>typeof t=="number"&&t>100&&t<1e8,M=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},Y=t=>t>=100&&t<=1e8,Fe=t=>{let e=null,n=null,r=null;for(const o of v.amount)try{const i=t.querySelector(o);if(!i||!i.textContent)continue;const s=i.textContent.trim();if(!/[\d,]+\s*원?/.test(s)&&!/^\d{1,3}(,\d{3})*$/.test(s.replace(/[^\d,]/g,"")))continue;const c=x(s);if(!c||!Y(c))continue;if(l.debug(`Found via selector "${o}"`,{value:c}),/final|discount|final-price|deal|sale|coupon/i.test(o)){r=c,e=c;break}n||(n=c),e||(e=c)}catch(i){l.debug(`Selector ${o} failed`,{error:i})}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of o){const c=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c){const a=x(c[1]);if(a&&Y(a)){l.debug("Found via regex in element",{value:a}),e=a;break}}}}return{amount:e,originalPrice:n,discountPrice:r}},Ke=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const i of e){const s=o.match(i);if(s&&s[1]){const c=x(s[1]);if(c)return l.debug("Found price via text walker",{value:c}),c}}}return null},We=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),i=(r.getAttribute("data-price")||"").trim(),c=`${o} ${i}`.trim().match(n);if(c&&c[1]){const a=x(c[1]);if(a)return l.debug("Found price by element scan",{value:a}),a}}}catch(e){l.debug("findPriceByElementScan error",{error:e})}return null},z=t=>{for(const[e,n]of Object.entries(Se))if(t.includes(e))return n;return null},He=t=>{const e=[],n=v.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const s=i,c=s.src,a=s.alt||"";if(!c)return;let d=a.trim();d||(d=z(c)||""),d&&!d.includes("카드")&&(d=`${d}카드`),c&&d&&(e.some(p=>p.cardName===d)||(e.push({src:c,alt:a,cardName:d}),l.debug("카드 이미지 발견",{cardName:d,src:c.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(s=>{const c=s,a=c.src,d=c.alt||"";if(!a||(c.width||c.naturalWidth)>100)return;let u=d.trim();u||(u=z(a)||""),u&&!u.includes("카드")&&(u=`${u}카드`),a&&u&&!e.some(g=>g.cardName===u)&&e.push({src:a,alt:d,cardName:u})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const s=i,c=s.src,a=s.alt||"";if(!c||(s.width||s.naturalWidth)>100)return;let p=a.trim();p||(p=z(c)||""),p&&!p.includes("카드")&&(p=`${p}카드`),c&&p&&!e.some(u=>u.cardName===p)&&e.push({src:c,alt:a,cardName:p})}),l.debug("추출된 카드 이미지 총",{count:e.length}),e},Ge=t=>{const e=[],n=v.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return l.debug("카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const s=o.contentDocument||o.contentWindow?.document;if(s)return je(s)}catch{l.warn("iframe 접근 불가 (cross-origin)")}const i=r.querySelector(n.content);return i?Ve(i):e},je=t=>{const e=[],n=v.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const i=o.querySelector(n.cardName),s=o.querySelector(n.benefitRate),c=o.querySelector(n.benefitDesc),a=i?.textContent?.trim()||"",d=s?.textContent?.trim()||"",p=c?.textContent?.trim()||o.textContent?.trim()||"";if(a){const u=re(d||p)??void 0;e.push({card:a,cardName:a,benefit:p||d||"혜택 제공",discount:u,rate:u})}}),e},Ve=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let i;for(;(i=o.exec(n))!==null;){const s=i[1].includes("카드")?i[1]:`${i[1]}카드`,c=parseFloat(i[2]);e.some(a=>a.card===s)||e.push({card:s,cardName:s,benefit:`최대 ${c}% 할인/적립`,discount:c,rate:c})}}return e},Ye=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",i=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const s=i[1].includes("카드")?i[1]:`${i[1]}카드`,c=parseFloat(i[2]);if(!e.some(a=>a.card===s)){let a=`최대 ${c}% 할인/적립`;const d=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);d&&(a=`최대 ${c}% ${d[0]}`),e.push({card:s,cardName:s,benefit:a,discount:c,rate:c})}}}),e},Xe=t=>{let e=[];const n=He(t),r=Ge(t);if(r.length>0&&(l.info("팝업에서 카드 혜택 파싱",{count:r.length}),e=r),Ye(t).forEach(i=>{e.some(s=>s.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(v.benefitBadge);if(i){const s=i.querySelectorAll("img.benefit-ico"),c=[],a=[];s.forEach(u=>{const g=u.getAttribute("src");if(g){const h=z(g);h&&(c.push(h),a.push(g))}});const d=i.querySelector(".benefit-label")?.textContent?.trim(),p=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(d){const u=re(d),g=c.length>0?`${c.slice(0,3).join(", ")}${c.length>3?" 외":""}`:"쿠팡 파트너 카드",h=u??void 0;e.push({card:g,cardName:g,benefit:`${d}${p?` (${p})`:""}`,discount:h,rate:h,imageUrl:a[0]})}}}return e=e.map((i,s)=>{if(!i.imageUrl){const c=i.cardName||i.card||"";let a=n.find(d=>{const p=M(d.cardName),u=M(c);return p===u});if(a||(a=n.find(d=>{const p=M(d.cardName).replace("카드",""),u=M(c).replace("카드","");return p.includes(u)||u.includes(p)})),!a&&s<n.length&&(a=n[s],l.debug("인덱스 기반 매칭",{cardName:c,matchedCardName:a.cardName})),a)return{...i,imageUrl:a.src}}return i}),e.sort((i,s)=>(s.discount??0)-(i.discount??0)),l.debug("최종 카드 혜택",{benefits:e}),e},Je=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const s=i.match(/(\d+)\s*%/);if(s)return{rate:parseInt(s[1],10),description:i.trim()}}}return null},Ze=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",s=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s&&i.includes("쿠팡캐시")){const c=x(s[1]);if(c)return{amount:c,description:`쿠팡캐시 ${c.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=x(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},Qe=t=>{try{const e=[],n=new Set,r=t.querySelector(v.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const s=i.querySelectorAll("div");if(s.length<2)continue;let c="";for(const u of s){const g=u.textContent||"";if(!g.includes("원")&&g.trim().length>0&&!g.includes("px")){c=g.trim();break}}let a="";for(const u of s){const h=(u.textContent||"").match(/[\d,]+원/);if(h){a=h[0].replace(/[,원]/g,"");break}}if(!a)continue;const d=parseInt(a);if(!d||d<100||!c||c.length<2)continue;const p=`${c}-${d}`;if(n.has(p))continue;if(e.push({name:c,price:d}),n.add(p),e.length>=15)break}catch(s){l.warn("Error parsing list item",{error:s});continue}return e}catch(e){return l.error(E.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},et=t=>t.querySelector(v.shipping)?.textContent?.trim()||null,tt=(t,e)=>{if(!oe(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let r=Math.round(t*(n/100));return e.maxDiscount&&r>e.maxDiscount&&(r=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:r},nt=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},ie=(t,e)=>t.map(r=>{const o=nt(r);return e&&oe(e)&&(o.discountAmount=tt(e,o)),o}).sort((r,o)=>r.discountAmount!==void 0&&o.discountAmount!==void 0?o.discountAmount-r.discountAmount:(o.rate??0)-(r.rate??0)),ce=t=>{const e=new Map;for(const n of t){const r=rt(n.cardName||n.card),o=e.get(r);if(!o)e.set(r,n);else{const i=o.rate??o.discount??0;(n.rate??n.discount??0)>i&&e.set(r,n)}}return Array.from(e.values())},rt=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","NH","BC","비씨","스마일"],n=t.toLowerCase();for(const r of e)if(n.includes(r.toLowerCase()))return r;return t};class se extends D{siteName="Coupang";selectors={amount:v.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return l.debug(`isCheckoutPage("${e}") = ${n}`),n}parse(e){try{l.info("🔍 Parsing Coupang page...");const n=Le(e),r=Ue(e),o=Oe(e),i=Fe(e);let s=i.amount;const{originalPrice:c,discountPrice:a}=i;if(s||(s=Ke(e)),s||(s=We(e)),!s)return l.debug("❌ No price found"),null;const d=Xe(e),p=ie(d,s),u=ce(p),g=Je(e),h=Ze(e),m=et(e),b=Qe(e);return l.info(`✅ Found: ${s} KRW, Cards: ${u.length}`),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:b,originalPrice:c||void 0,discountPrice:a||void 0,cardBenefits:u,giftCardDiscount:g||void 0,cashback:h||void 0,shippingInfo:m||void 0,discounts:[]}}catch(n){return l.error(E.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const C={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},ot=[/11st\.co\.kr\/products\/(\d+)/,/m\.11st\.co\.kr\/products\/(\d+)/],H={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},it=t=>{const e=C.product;try{const n=t.querySelector(e.title);if(n?.textContent){const o=n.textContent.trim();return l.debug("제목 추출",{title:o}),o}const r=t.querySelector(e.titleAlt);if(r?.textContent){const o=r.textContent.trim();return l.debug("제목 추출 (alt)",{title:o}),o}}catch(n){l.error(E.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},ct=t=>{try{const e=t.querySelector(C.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return l.debug("부제목 추출",{subtitle:n}),n}}catch(e){l.error(E.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},st=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const r=t.match(n);if(r?.[1])return l.debug("상품ID 추출",{productId:r[1]}),r[1]}}catch(e){l.error(E.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},ae=t=>{const e=C.image;try{const n=t.querySelector(e.main);if(n?.src){const i=T(n.src);return l.debug("메인 이미지 추출",{src:i}),i}const r=t.querySelector(e.mainAlt);if(r?.src){const i=T(r.src);return l.debug("메인 이미지 추출 (alt)",{src:i}),i}const o=t.querySelector(`${e.main}[data-src]`);if(o?.dataset?.src){const i=T(o.dataset.src);return l.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){l.error(E.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},at=t=>{const e=[],n=new Set,r=C.image;try{const o=ae(t);o&&(e.push(o),n.add(o)),t.querySelectorAll(r.thumbnail).forEach(c=>{const a=c,d=a.src||a.dataset?.src;if(d){const p=T(d),u=X(p);n.has(u)||(e.push(u),n.add(u))}}),t.querySelectorAll(r.thumbnailAlt).forEach(c=>{const a=c,d=a.src||a.dataset?.src;if(d){const p=T(d),u=X(p);n.has(u)||(e.push(u),n.add(u))}}),l.debug("전체 이미지 추출",{count:e.length})}catch(o){l.error(E.PAR_E001,"전체 이미지 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},lt=t=>{const e=C.seller,n={seller:null,rating:null};try{const r=t.querySelector(e.name);r?.textContent&&(n.seller=r.textContent.trim(),l.debug("판매자 추출",{seller:n.seller}));const o=t.querySelector(e.rating);o?.textContent&&(n.rating=o.textContent.trim(),l.debug("판매자 등급 추출",{rating:n.rating}))}catch(r){l.error(E.PAR_E001,"판매자 정보 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return n};function T(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function X(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const dt=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=C.price;try{const r=t.querySelector(n.originalPrice);r?.textContent&&(e.originalPrice=x(r.textContent),l.debug("정가",{price:e.originalPrice}));const o=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);o?.textContent&&(e.discountPrice=x(o.textContent),e.amount=e.discountPrice,l.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=x(i.textContent),l.debug("할인율",{rate:e.discountRate}));const s=t.querySelector(n.maxDiscountPrice);s?.textContent&&(e.maxDiscountPrice=x(s.textContent),l.debug("최대할인가",{price:e.maxDiscountPrice}));const c=t.querySelector(n.maxDiscountRate);c?.textContent&&(e.maxDiscountRate=x(c.textContent),l.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(r){l.error(E.PAR_E002,"가격 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},ut=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const r of n){const o=r.textContent||"";for(const i of e){const s=o.match(i);if(s?.[1]){const c=x(s[1]);if(c&&c>100&&c<1e8)return l.debug("가격 발견",{value:c}),c}}}return null},pt=t=>{const e=[],n=C.price;try{const r=t.querySelector(n.maxDiscountLayer);if(!r)return e;r.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const s=i.querySelector(".title"),c=i.querySelector(".price");if(s&&c){const a=s.textContent?.trim()||"",d=c.textContent?.trim()||"",p=x(d.replace("-",""));a&&p&&a!=="판매가"&&(e.push({type:a,amount:p}),l.debug("DiscountDetail",{type:a,amount:p}))}})}catch(r){l.error(E.PAR_E002,"DiscountDetail 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},ft=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=mt(t),e.totalPointAmount=e.points.reduce((n,r)=>n+r.amount,0),e.cardBenefits=gt(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,r)=>n+r.benefitAmount,0),e.installments=xt(t),e.maxInstallmentMonths=e.installments.reduce((n,r)=>Math.max(n,r.maxMonths),0),e.coupons=Ct(t),l.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){l.error(E.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},mt=t=>{const e=[],n=C.pointDetail;try{const r=t.querySelector(n.container);if(r){const o=r.querySelector(n.totalPoint);if(o?.textContent){const s=x(o.textContent);s&&(e.push({amount:s,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),l.debug("최대 적립 포인트",{amount:s}))}const i=r.querySelector(n.elevenPaySection);if(i){const s=i.querySelector(".total .value");if(s?.textContent){const a=x(s.textContent);a&&!e.find(d=>d.amount===a&&d.type==="최대적립포인트")&&(e.push({amount:a,type:"11pay포인트",description:"11pay 결제 시 적립"}),l.debug("11pay 포인트 총액",{amount:a}))}i.querySelectorAll(".desc li").forEach(a=>{const d=a.querySelector(".c_layer_expand button.c_product_btn"),p=a.querySelector(".value");if(d&&p){const u=d.textContent?.trim()||"",g=x(p.textContent||"");g&&u&&!u.includes("카드")&&(e.push({amount:g,type:u,description:u}),l.debug("포인트 항목",{type:u,amount:g}))}})}}if(e.length===0){const o=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(o?.textContent){const i=x(o.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),l.debug("기본 포인트",{amount:i}))}}}catch(r){l.error(E.PAR_E003,"포인트 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},gt=t=>{const e=[],n=C.cardDiscount;try{const r=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let o=null;for(const s of r)if(o=t.querySelector(s),o){l.debug("카드 혜택 컨테이너 찾음",{selector:s});break}if(l.debug("other_benefits 컨테이너",{found:!!o}),o){const s=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let c=null;for(const a of s)if(c=o.querySelectorAll(a),c.length>0){l.debug("benefit 블록 찾음",{selector:a,count:c.length});break}if(l.debug("benefit 블록 수",{count:c?.length||0}),!c||c.length===0){const a=o.querySelector("dl");if(l.debug("dl 요소",{found:!!a}),a){const d=a.children;l.debug("dl children",{count:d.length})}}c&&c.length>0&&c.forEach(a=>{const p=a.querySelector("dt")?.textContent?.trim()||"";if(l.debug("메인 타이틀",{mainTitle:p}),!p)return;const u=bt(p);u&&u.benefitAmount>0&&(e.push(u),l.debug("메인 혜택 추가",{mainParsed:u}));const g=a.querySelector("dd");if(g){const h=g.querySelectorAll(".tit_sub");l.debug("서브타이틀 수",{count:h.length}),h.forEach(m=>{const b=m.textContent?.trim()||"";if(l.debug("서브타이틀",{subTitle:b}),b.includes("안내사항")||b.includes("적립제외"))return;let y=m.nextElementSibling;for(;y&&y.tagName!=="UL"&&y.tagName!=="SPAN";)y=y.nextElementSibling;if(y&&y.tagName==="UL"){const S=y.querySelectorAll("li");l.debug("리스트 아이템 수",{count:S.length}),S.forEach(k=>{const $=k.textContent?.trim()||"";l.debug("아이템",{itemText:$});const w=ht(b,$);w&&(e.find(I=>I.cardName===w.cardName&&I.benefitType===w.benefitType&&I.benefitAmount===w.benefitAmount)||(e.push(w),l.debug("서브 혜택 추가",{subBenefit:w})))})}})}})}else l.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(c=>{const a=c.textContent?.trim()||"";if(a.includes("카드")||a.includes("신한")){const p=c.closest("li")?.querySelector(".value")?.textContent?.trim()||"",u=x(p);if(u){const g=a.replace(" 결제 시","").trim();e.find(h=>h.cardName===g&&h.benefitType==="포인트")||e.push({cardName:g,benefitAmount:u,benefitType:"포인트",condition:"결제 시"})}}}),l.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(r){l.error(E.PAR_E003,"카드 혜택 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function bt(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const a of e){const d=t.match(a);if(d){n=d[1];break}}if(!n)return null;let r=0,o="",i="";const s=t.match(/최대\s*(\d+)%\s*적립/);s&&(r=parseInt(s[1],10),o="적립",i="결제 시");const c=t.match(/([\d,]+)원\s*할인/);return c&&(r=x(c[1])||0,o="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:r,benefitType:o||(t.includes("할인")?"할인":"적립"),condition:i}}function ht(t,e){if(!e)return null;let n="",r=0,o="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const s=e.match(/([\d,]+)원\s*할인/);s&&(r=x(s[1])||0,o="할인");const c=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return c&&!o&&(r=parseFloat(c[1]),o="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!r||!o?null:{cardName:n,benefitAmount:r,benefitType:o,condition:i}}const xt=t=>{const e=[],n=C.installment;try{const r=t.querySelector(n.dialogContainer);if(r&&(r.querySelectorAll(".card_box").forEach(i=>{const c=i.querySelector("dt")?.textContent?.trim()||"";if(!c)return;i.querySelectorAll("dd").forEach(d=>{const p=d.textContent?.trim()||"";if(!p)return;const u=yt(c,p);u&&e.push(u)})}),l.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const o=t.querySelector(n.triggerButton);if(o){const c=(o.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);c&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"})}Et(t).forEach(s=>{e.find(c=>c.cardName===s.cardName)||e.push(s)})}l.info("총 무이자 할부 카드",{count:e.length})}catch(r){l.error(E.PAR_E003,"무이자 할부 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function yt(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const r=n[1],i=r.split(",").map(p=>parseInt(p.trim(),10)).filter(p=>!isNaN(p)),s=i.length>0?Math.max(...i):0;if(s===0)return null;let c=null;const a=e.match(/(\d+)만원/);a&&(c=parseInt(a[1],10)*1e4);let d="";return e.includes("11pay")?d="11pay 결제 시":e.includes("카카오페이")?d="카카오페이 결제 시":c&&(d=`${c/1e4}만원 이상`),{cardName:t,maxMonths:s,minAmount:c,months:r+"개월",condition:d}}function Et(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(o=>{const i=o.textContent||"",s=i.match(/최대\s*(\d+)\s*개월\s*무이자/);s&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"}),n.forEach(c=>{if(i.includes(c)){const d=i.substring(i.indexOf(c)).match(/([\d,]+)개월/);if(d&&!e.find(u=>u.cardName.includes(c))){const u=d[1],g=u.split(",").map(m=>parseInt(m.trim(),10)),h=Math.max(...g.filter(m=>!isNaN(m)));e.push({cardName:c+"카드",maxMonths:h,minAmount:null,months:u+"개월",condition:""})}}})}),e}const Ct=t=>{const e=[],n=C.coupon;try{const r=t.querySelector(n.badge);if(r?.textContent){const i=r.textContent.trim(),s=_t(i);s&&(e.push(s),l.debug("쿠폰 추출",{coupon:s}))}t.querySelectorAll(n.item).forEach(i=>{const s=i.querySelector(n.name),c=i.querySelector(n.discount);if(s||c){const a=s?.textContent?.trim()||"쿠폰",d=c?.textContent||"",p=d.includes("원")?x(d):null,u=d.includes("%")?x(d):null;e.push({name:a,discountAmount:p,discountRate:u})}})}catch(r){l.error(E.PAR_E003,"쿠폰 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function _t(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:x(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function J(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:r,name:o}of n)for(const i of r)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${o} (신용)`:e.includes("체크카드")?`${o} (체크)`:o;return e||t}function St(t,e){const n=t.map(r=>{const o=J(r.cardName),i=r.benefitType==="할인",s=r.benefitAmount<=100?r.benefitAmount:0;let c="";return i?c=`${r.benefitAmount.toLocaleString()}원 할인`:r.benefitAmount<=100?c=`${r.benefitAmount}% 적립`:c=`${r.benefitAmount.toLocaleString()}P 적립`,{card:o,cardName:o,benefit:c,discount:i?r.benefitAmount:0,rate:s,condition:r.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(r=>{if(r.cardName==="__INSTALLMENT_SUMMARY__")return;const o=J(r.cardName);n.push({card:o,cardName:o,benefit:`${r.months} 무이자`,discount:0,rate:0,condition:r.condition,benefitType:"installment",pointAmount:0})}),n}class le extends D{siteName=H.siteName;selectors={amount:[C.price.salePrice,C.price.salePriceAlt,C.price.maxDiscountPrice],title:[C.product.title,C.product.titleAlt],image:[C.image.main,C.image.mainAlt]};static isProductPage(e){const n=ot.some(r=>r.test(e));return l.debug(`isProductPage("${e}") = ${n}`),n}static extractProductId(e){return st(e)}parse(e){try{l.info("🔍 Parsing 11번가 page...");const n=it(e),r=ct(e),o=ae(e),i=at(e),s=lt(e),c=dt(e);let a=c.amount;const{originalPrice:d,discountPrice:p,maxDiscountPrice:u,discountRate:g,maxDiscountRate:h}=c;if(a||(a=ut(e)),!a)return l.debug("❌ No price found"),null;const m=pt(e),b=ft(e),{points:y,cardBenefits:S,installments:k,coupons:$,totalPointAmount:w,totalCardBenefitAmount:G,maxInstallmentMonths:I}=b,Ee=St(S,k),O=[];return g&&O.push({rate:g,type:"SALE_DISCOUNT",description:"할인가"}),m.forEach(F=>{O.push({rate:F.amount,type:F.type.toUpperCase().replace(/\s+/g,"_"),description:F.type})}),l.info(`✅ Found: ${a.toLocaleString()} ${H.currency}`),l.debug("파싱 결과",{title:n,totalPointAmount:w,cardBenefitsCount:S.length,installmentsCount:k.length,maxInstallmentMonths:I}),{price:a,amount:a,currency:H.currency,title:n?`${n}${r?` ${r}`:""}`:void 0,imageUrl:o||void 0,images:i,originalPrice:d||void 0,discountPrice:p||u||void 0,discountRate:g||void 0,cardBenefits:Ee,discounts:O,elevenst:{maxDiscountPrice:u,maxDiscountRate:h,maxInstallmentMonths:I,points:y,installments:k,coupons:$,totalPointAmount:w,totalCardBenefitAmount:G,seller:s.seller,sellerRating:s.rating,discountDetails:m}}}catch(n){return l.error(E.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const _={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},Pt={productPage:/gmarket\.co\.kr\/item/i,vipPage:/gmarket\.co\.kr\/n\/(?:vip|item)/i,generalProduct:/gmarket\.co\.kr.*(?:goodscode|itemno)=/i},vt=t=>{const e=t.querySelector(_.product.title);if(e?.textContent){const n=e.textContent.trim();return l.debug("상품명",{title:n}),n}return l.warn("상품명을 찾을 수 없음"),null},wt=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const r of e){const i=r.src;if(i.includes("/still/600"))return l.debug("메인 이미지 (600px)",{src:i}),i}for(const r of e){const i=r.src;if(i.includes("/still/"))return l.debug("메인 이미지",{src:i}),i}const n=t.querySelector(_.product.mainImage);return n?.src?(l.debug("대체 이미지",{src:n.src}),n.src):(l.warn("상품 이미지를 찾을 수 없음"),null)},kt=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(r=>{let i=r.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),l.debug("총 이미지",{count:e.length}),e},At=t=>{const e={},n=t.querySelector(_.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const r=t.querySelector(_.seller.official);e.isOfficial=!!r;const o=t.querySelector(_.seller.seller);return o?.textContent&&(e.seller=o.textContent.trim()),e},U=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return x(e)},Nt=t=>{const e=_.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const o=U(n.textContent);if(o)return l.debug("결제할인가",{price:o}),o}const r=t.querySelector(e.discountPriceAlt);if(r?.textContent){const o=U(r.textContent);if(o)return l.debug("결제할인가 (alt)",{price:o}),o}return null},Bt=t=>{const e=_.price,n=t.querySelector(e.salePrice);if(n?.textContent){const r=U(n.textContent);if(r)return l.debug("판매가",{price:r}),r}return null},It=t=>{const e=_.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const r=U(n.textContent);if(r)return l.debug("정가",{price:r}),r}return null},Rt=t=>{const e=_.price,n=t.querySelector(e.discountRate);if(n?.textContent){const r=n.textContent.match(/(\d+)\s*%/);if(r){const o=parseInt(r[1],10);return l.debug("할인율",{rate:o}),o}}return null},Dt=t=>{l.debug("가격 정보 추출 시작...");const e=It(t),n=Bt(t),r=Nt(t),o=Rt(t),i=r||n||e;return l.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}),{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}},Tt=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const r=n.textContent||"";if(r.includes("원")){const o=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(o){const i=x(o[1]);if(i&&i>=1e3)return l.debug("DOM 스캔 가격",{price:i}),i}}}return null},qt=t=>{const e=[],n=_.cardBenefit,r=t.querySelector(n.container);return r?(r.querySelectorAll(".gmarketcard_area img").forEach(i=>{const s=i,c=s.src,a=s.alt||"";if(c){let d=a;d||(c.includes("smile")||c.includes("Smile")?d="스마일카드":c.includes("samsung")?d="삼성카드":d="G마켓 제휴카드"),e.push({card:d,cardName:d,benefit:"G마켓 제휴카드 혜택",imageUrl:c}),l.debug("제휴카드",{cardName:d,src:c})}}),e):(l.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},$t=t=>{const e=[],n=_.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(o=>{const i=o.querySelector(n.discountItemTitle),s=o.querySelector(n.discountItemDesc),c=o.querySelector(n.discountItemPrice),a=i?.textContent?.trim()||"",d=s?.textContent?.trim()||"";let p;if(c?.textContent){const u=c.textContent.match(/(\d{1,3}(?:,\d{3})*)/);u&&(p=parseInt(u[1].replace(/,/g,""),10))}a&&(e.push({title:a,description:d,discountPrice:p}),l.debug("결제 할인",{title:a,description:d}))}),e},Mt=t=>{l.debug("카드 혜택 추출 시작...");const e=[],n=qt(t);e.push(...n),$t(t).forEach(i=>{const s=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(s){const c=s[1].includes("카드")?s[1]:`${s[1]}카드`,a=i.title.match(/(\d+(?:\.\d+)?)\s*%/),d=a?parseFloat(a[1]):void 0;e.some(p=>p.cardName===c)||e.push({card:c,cardName:c,benefit:i.title,discount:d,rate:d})}});const o=t.querySelector(".box__payment-discount");if(o){const s=(o.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(s){const c=parseInt(s[1],10);e.some(a=>a.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${c}% 할인`,discount:c,rate:c})}}return e.sort((i,s)=>(s.discount??0)-(i.discount??0)),l.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},zt=t=>{const e=_.additionalBenefits,r=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!r)return null;let o="etc";r.includes("신세계포인트")?o="shinsegae_point":r.includes("스마일페이")?o="smile_pay":r.includes("스마일캐시")?o="smile_cash":r.includes("OK캐쉬백")&&(o="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(c=>{const a=c.querySelector(e.benefitLabel),d=c.querySelector(e.benefitValue),p=a?.textContent?.trim()||"",u=d?.textContent?.trim()||"";p&&u&&i.push({label:p,value:u})}),l.debug("추가 혜택",{type:o,title:r}),{type:o,title:r,details:i}},de=t=>{l.debug("추가 혜택 추출 시작...");const e=[],n=_.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(o=>{const i=zt(o);i&&e.push(i)}),l.debug("총 추가 혜택",{count:e.length}),e},Lt=t=>{const e=de(t);for(const n of e)for(const r of n.details){const o=r.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(o)return{amount:parseInt(o[1].replace(/,/g,""),10),description:`${n.title}: ${r.value}`}}return null},Ut=t=>{const e=_.shipping,r=!!t.querySelector(e.starDelivery),o=t.querySelector(e.shippingInfo),i=r?"스타배송":"일반배송";let s,c,a=!1;if(o){const d=o.textContent||"",p=d.match(/(\d{1,3}(?:,\d{3})*)\s*원/);p?s=`${p[1]}원`:d.includes("무료")&&(s="무료",a=!0);const u=d.match(/(\d+\/\d+|\d+일)/);u&&(c=u[1])}return l.debug("배송 정보",{method:i,isStarDelivery:r,fee:s}),{method:i,isStarDelivery:r,isFree:a,fee:s,estimatedDate:c}};class ue extends D{siteName="Gmarket";selectors={amount:[_.price.discountPrice,_.price.salePrice,_.price.originalPrice]};static isCheckoutPage(e){const n=Pt,r=n.productPage.test(e)||n.vipPage.test(e)||n.generalProduct.test(e);return A.debug("isCheckoutPage check",{url:e,isCheckout:r}),r}parse(e){try{A.info("Parsing Gmarket page...");const n=vt(e),r=wt(e),o=kt(e),i=At(e),s=Dt(e);let c=s.amount;if(c||(c=Tt(e)),!c)return A.warn("No price found in Gmarket page"),null;const a=Mt(e),d=ie(a,c),p=ce(d),u=de(e),g=Lt(e),h=Ut(e);return A.info("Parse successful",{amount:c,cardCount:p.length}),{price:c,amount:c,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:[],originalPrice:s.originalPrice||void 0,discountPrice:s.discountPrice||void 0,cardBenefits:p,additionalBenefits:u.length>0?u:void 0,cashback:g||void 0,shippingInfo:h||void 0,sellerInfo:i||void 0,discounts:[]}}catch(n){return A.error(E.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Ot={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class pe extends D{siteName="Amazon";selectors={amount:Ot.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{l.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(l.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return l.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return l.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:s}=this.extractCommonInfo(e);return l.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return l.error(E.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Ft={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class fe extends D{siteName="eBay";selectors={amount:Ft.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{l.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(l.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return l.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return l.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:s}=this.extractCommonInfo(e);return l.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return l.error(E.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Kt={amount:[]};class me extends D{siteName="Fallback";selectors={amount:Kt.amount};parse(e){try{l.info("🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return l.debug('❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return l.debug("❌ Invalid amount",{amount:o}),null;const{title:i,imageUrl:s}=this.extractCommonInfo(e);return l.info(`✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return l.error(E.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function Wt(t){return se.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:le.isProductPage(t)?{site:"11st",isCheckout:!0}:ue.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:pe.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:fe.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function Ht(t){switch(t){case"coupang":return new se;case"11st":return new le;case"gmarket":return new ue;case"amazon":return new pe;case"ebay":return new fe;default:return new me}}function Gt(){return new me}function ge(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},r=>{r?.success&&_e.debug("Product data saved",{source:e,messageType:n})})}function jt(t){let e=!1;const n=new MutationObserver(r=>{const o=r.some(d=>Array.from(d.addedNodes).some(p=>p instanceof Element?p.tagName==="IFRAME"||!!p.querySelector("iframe"):!1)),i=!e&&r.some(d=>Array.from(d.addedNodes).some(p=>p instanceof Element?p.classList.contains("benefit")||!!p.querySelector(".benefit")||p.closest(".other_benefits")&&(p.querySelector("dt")||p.querySelector("dd")):!1)),s=document.querySelector(".other_benefits .benefit dt");if(!(i&&s||o))return;i&&(e=!0);const a=o?"iframe":"benefit-content";P.info("Dynamic content detected",{reason:a}),setTimeout(()=>{t(`dynamic-${a}`)||P.warn("Dynamic reparse produced no result")},500),o&&n.disconnect()});n.observe(document.body,{childList:!0,subtree:!0})}const be=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],Vt=[...be,".max_saveing_point .c_layer_expand button"],Yt='.dialog_cont .btn_close, .layer_pop .btn_close, [class*="popup"] .close',L=()=>!!document.querySelector(".other_benefits .benefit dt");function Xt(t){if(!window.location.hostname.includes("11st.co.kr"))return;P.info("Setting up 11번가 benefit watcher"),he(t);const e=()=>{be.forEach(r=>{document.querySelectorAll(r).forEach(i=>{i.getAttribute("data-picsel-watched")||(i.setAttribute("data-picsel-watched","true"),i.addEventListener("click",()=>{P.debug("Benefit button clicked, waiting for content..."),setTimeout(()=>{L()&&(P.info("Benefit content found after click"),t("benefit-click"))},1e3)}))})})};e(),new MutationObserver(()=>{e()}).observe(document.body,{childList:!0,subtree:!0}),setTimeout(e,3e3)}function he(t){if(L()){P.debug("Benefit content already exists, skip auto-click");return}let e=null;for(const n of Vt){const r=document.querySelector(n);if(!r)continue;const o=r.textContent||"";if(o.includes("무이자")||o.includes("할인")||o.includes("추가")||o.includes("혜택")){e=r,P.debug("Found benefit button",{selector:n,text:o.substring(0,30)});break}}if(!e){P.debug("No benefit button found for auto-click"),setTimeout(()=>{document.querySelector(".additional_benefits button")&&!L()&&(P.debug("Retry auto-click benefit button"),he(t))},3e3);return}P.info("Auto-clicking benefit button to load content"),e.click(),setTimeout(()=>{const n=document.querySelector(Yt);n&&(P.debug("Closing benefit dialog after load"),n.click()),setTimeout(()=>{L()?(P.info("Benefit content loaded via auto-click"),t("auto-click-benefit")):P.warn("Benefit content not found after auto-click")},500)},1e3)}const Jt=window.self===window.top;let Z=!1;function xe(){const t=window.location.href,e=Wt(t);if(!e)return N.debug(B.PARSER,"Not a supported page",{url:t}),null;N.info(B.PARSER,`Site detected: ${e.site}`,{url:t});let r=Ht(e.site).parse(document);return!r&&(N.warn(B.PARSER,"Primary parser failed, trying fallback",{site:e.site}),r=Gt().parse(document),!r)?(N.error(B.PARSER,E.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(N.info(B.PARSER,"Parse successful",{title:r.title?.substring(0,50),amount:r.amount,cardBenefitsCount:r.cardBenefits?.length??0}),{paymentInfo:r,site:e.site})}function ye(t,e){return{...t,site:e}}function Q(t){const e=xe();return e?(ze(ye(e.paymentInfo,e.site)),ge(e.paymentInfo,t),!0):!1}function Zt(){const t=xe();if(!t){N.warn(B.BOOTSTRAP,"Failed to extract payment info on init");return}ne(ye(t.paymentInfo,t.site)),ge(t.paymentInfo,"initial")}function Qt(){!Jt||Z||(Z=!0,N.info(B.BOOTSTRAP,"Content script starting"),Zt(),jt(t=>Q(t)),Xt(t=>{Q(t)}))}ve(Qt);
