import{C as se}from"./assets/constants-4DKqSpZt.js";const ae=window.self===window.top;function le(t){if(!ae){console.debug("[ContentScript] Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const de=`
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
`,k=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",o=new Set(["KRW","JPY"]),r={style:"currency",currency:n};let i=t;o.has(n)&&(r.minimumFractionDigits=0,r.maximumFractionDigits=0,i=Math.round(t));const s=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(s,r).format(i)},ue=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),$="picsel-toggle-host",q="picsel-toggle-panel",pe={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},fe=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return pe[e]||String(t)},p={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},me=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const o=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(o){const d=document.createElement("img");d.src=o,d.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(d)}else{const d=document.createElement("span");d.textContent="No Image",d.style.fontSize="11px",d.style.color="#64748b",n.appendChild(d)}const r=document.createElement("div");r.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const s=document.createElement("div");s.className="picsel-price";const c=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,a=k(c,t.currency??"KRW");if(a){const d=document.createElement("div");d.className="picsel-final-price",d.textContent=a,s.appendChild(d)}const l=k(t.originalPrice,t.currency??"KRW"),u=ue(t.originalPrice,c);if(l&&u){const d=document.createElement("div");d.className="picsel-original-price",d.textContent=l;const m=document.createElement("div");m.className="picsel-discount-tag",m.textContent=`-${u}%`,s.appendChild(d),s.appendChild(m)}if(r.appendChild(i),r.appendChild(s),t.shippingInfo){const d=document.createElement("div");d.className="picsel-shipping",d.textContent=`배송: ${t.shippingInfo}`,r.appendChild(d)}return e.appendChild(n),e.appendChild(r),e},ge=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),he=(t,e)=>typeof t!="number"||e===null?null:t-e,z=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,o]of Object.entries(e))if(t.includes(n))return o;return t.replace("카드","").substring(0,2).toUpperCase()},xe=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:o,svg:r}of n)for(const i of o)if(e.includes(i.toUpperCase()))return chrome.runtime.getURL(`assets/card/${r}`);return null},be=(t,e,n)=>{const o=" recommended",r=document.createElement("div");r.className=`picsel-card-benefit-item${o}`;const i=t.cardName||t.card||"카드",c=xe(i)||t.imageUrl;if(c){const f=document.createElement("div");f.className="picsel-card-image-wrapper";const g=document.createElement("img");g.src=c,g.alt=i,g.className="picsel-card-image",g.onerror=()=>{const x=z(i);f.innerHTML=`
				<div class="picsel-card-initial">${x}</div>
			`},f.appendChild(g),r.appendChild(f)}else{const f=z(i),g=document.createElement("div");g.className="picsel-card-image-wrapper",g.innerHTML=`<div class="picsel-card-initial">${f}</div>`,r.appendChild(g)}const a=document.createElement("div");a.className="picsel-card-info";const l=document.createElement("div");if(l.className="picsel-card-header",(t.discountAmount??0)>0){const f=document.createElement("span");f.className="picsel-recommended-badge",f.textContent=`${e+1}위`,l.appendChild(f)}const u=document.createElement("span");u.className="picsel-card-name";const d=i.includes(",")?i.split(",")[0].trim():i;if(u.textContent=d,l.appendChild(u),a.appendChild(l),t.benefit){const f=document.createElement("div");f.className="picsel-card-benefit-desc",f.textContent=t.benefit,a.appendChild(f)}r.appendChild(a);const m=document.createElement("div");if(m.className="picsel-card-amount",t.benefitType==="installment"){const f=document.createElement("div");f.className="picsel-card-installment",f.textContent=t.benefit||"무이자",m.appendChild(f)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const x=document.createElement("div");x.className="picsel-card-final-price";const C=k(t.finalPrice,n);x.textContent=C,m.appendChild(x)}const f=document.createElement("div");f.className="picsel-card-discount";const g=k(t.discountAmount,n);f.textContent=`-${g}`,m.appendChild(f)}else if(typeof t.rate=="number"&&t.rate>0){const f=document.createElement("div");f.className="picsel-card-rate",f.textContent=`${t.rate}%`,m.appendChild(f)}return r.appendChild(m),r},ye=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const h=document.createElement("section");h.className="picsel-section picsel-card-section";const f=document.createElement("h4");f.className="picsel-section-title",f.textContent="카드별 혜택",h.appendChild(f);const g=document.createElement("div");return g.className="picsel-empty-benefits",g.textContent="카드 혜택 정보를 불러오는 중...",h.appendChild(g),h}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(h=>{const f=h;if(f.benefitType==="point"||f.benefitType==="installment")return null;const g=f.rate??f.discount;let x=0,C=0;typeof g=="number"&&g>100||f.benefitType==="discount"?(x=typeof g=="number"&&g>100?g:f.discount??0,C=0):(C=typeof g=="number"&&g<=100?g:0,x=ge(n,C)??0);const S=he(n,x);return{...f,cardName:f.cardName??f.card,rate:C,discountAmount:x??void 0,finalPrice:S??void 0}}).filter(h=>h!==null).sort((h,f)=>{const g=h?.discountAmount??0,x=f?.discountAmount??0;if(g!==x)return x-g;const C=h?.rate??0;return(f?.rate??0)-C})[0];if(!i)return null;const s=document.createElement("section");s.className="picsel-section picsel-card-section";const c=document.createElement("h4");c.className="picsel-section-title",c.textContent="추천 카드 혜택",s.appendChild(c);const a=document.createElement("div");a.className="picsel-card-benefit-list";const l=t.currency??"KRW",u=be(i,0,l);a.appendChild(u),s.appendChild(a);const d=[],m=t.elevenst?.totalPointAmount??0;if(m>0&&d.push(`최대 적립 포인트 ${m.toLocaleString()}P`),t.giftCardDiscount?.description&&d.push(t.giftCardDiscount.description),t.cashback?.description&&d.push(t.cashback.description),d.length>0){const h=document.createElement("div");h.className="picsel-sub-benefits",d.forEach(f=>{const g=document.createElement("div");g.className="picsel-sub-benefit-item",g.textContent=f,h.appendChild(g)}),s.appendChild(h)}return s},Ce=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const o=document.createElement("button");return o.className="picsel-footer-confirm",o.textContent="확인했습니다",o.type="button",o.addEventListener("click",()=>{v(!1)}),n.appendChild(o),e.appendChild(n),e},L=t=>{const{buttonBadgeEl:e}=p;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(r=>{const i=r,s=i.rate??i.discount;return typeof s=="number"?s:0}).filter(r=>r>0):[];if(n.length>0){const r=Math.max(...n);e.textContent=`최대 ${r}%`,e.style.display="inline-flex";return}const o=t.cashback?.amount;if(typeof o=="number"&&o>0){const r=k(o,t.currency??"KRW");e.textContent=r?`${r} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},H=()=>{const{contentEl:t,cachedData:e}=p;if(!t)return;if(t.textContent="",!e){const s=document.createElement("p");s.className="picsel-empty-state",s.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(s),L(null);return}const n=e,o=me(n);t.appendChild(o);const r=ye(n);r&&t.appendChild(r);const i=Ce();i&&t.appendChild(i),L(n)},v=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:o}=p;!e||!n||!o||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),o.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),o.textContent="PicSel 혜택 보기"))},Pe=()=>{if(p.mounted)return;if(document.getElementById($)){const i=document.getElementById($);i&&(p.hostElement=i,p.shadowRoot=i.shadowRoot,i.shadowRoot&&(p.toggleButton=i.shadowRoot.querySelector(".picsel-toggle-button"),p.buttonLabelEl=i.shadowRoot.querySelector(".picsel-toggle-label"),p.buttonBadgeEl=i.shadowRoot.querySelector(".picsel-toggle-badge"),p.panelEl=i.shadowRoot.querySelector(`#${q}`),p.closeButtonEl=i.shadowRoot.querySelector(".picsel-close-button"),p.contentEl=i.shadowRoot.querySelector(".picsel-panel-content"),p.panelTitleEl=i.shadowRoot.querySelector(".picsel-panel-title"))),p.mounted=!0;return}p.hostElement=document.createElement("div"),p.hostElement.id=$,p.hostElement.style.position="fixed",p.hostElement.style.bottom="24px",p.hostElement.style.right="24px",p.hostElement.style.zIndex=String(2147483647),p.shadowRoot=p.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=de,p.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",p.shadowRoot.appendChild(e),p.toggleButton=document.createElement("button"),p.toggleButton.className="picsel-toggle-button",p.toggleButton.type="button",p.toggleButton.setAttribute("aria-expanded","false"),p.buttonLabelEl=document.createElement("span"),p.buttonLabelEl.className="picsel-toggle-label",p.buttonLabelEl.textContent="PicSel 혜택 보기",p.toggleButton.appendChild(p.buttonLabelEl),p.buttonBadgeEl=document.createElement("span"),p.buttonBadgeEl.className="picsel-toggle-badge",p.toggleButton.appendChild(p.buttonBadgeEl),e.appendChild(p.toggleButton),p.panelEl=document.createElement("div"),p.panelEl.className="picsel-panel",p.panelEl.id=q,p.panelEl.setAttribute("role","dialog"),p.panelEl.setAttribute("aria-hidden","true"),p.toggleButton.setAttribute("aria-controls",q);const n=document.createElement("div");n.className="picsel-panel-header",p.panelTitleEl=document.createElement("div"),p.panelTitleEl.className="picsel-panel-title",p.panelTitleEl.textContent="PicSel 혜택 정보",p.closeButtonEl=document.createElement("button"),p.closeButtonEl.type="button",p.closeButtonEl.className="picsel-close-button",p.closeButtonEl.setAttribute("aria-label","닫기"),p.closeButtonEl.textContent="✕",n.appendChild(p.panelTitleEl),n.appendChild(p.closeButtonEl),p.panelEl.appendChild(n),p.contentEl=document.createElement("div"),p.contentEl.className="picsel-panel-content",p.panelEl.appendChild(p.contentEl),e.appendChild(p.panelEl);const o=p.panelEl,r=p.hostElement;p.toggleButton.addEventListener("click",()=>{const i=!o.classList.contains("open");v(i)}),p.closeButtonEl.addEventListener("click",()=>{v(!1)}),window.addEventListener("keydown",i=>{i.key==="Escape"&&v(!1)}),document.addEventListener("click",i=>{if(!o.classList.contains("open"))return;const s=i.composedPath();r&&!s.includes(r)&&v(!1)},!0),document.body.appendChild(p.hostElement),p.mounted=!0},j=()=>{if(p.panelTitleEl&&p.cachedData?.site){const t=fe(p.cachedData.site);p.panelTitleEl.textContent=`${t} 혜택 정보`}},V=t=>{p.cachedData={...t},Pe(),j(),H(),v(!1)},Ee=t=>{if(p.cachedData={...p.cachedData??{},...t},!p.mounted){V(p.cachedData);return}j(),H()};class N{extractNumber(e){const o=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return o?parseInt(o[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const o of n)try{const r=this.getTextBySelector(e,o);if(r)return r}catch(r){console.debug(`[${this.siteName}] Selector error: ${o}`,r)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=o.nextNode();){const s=(r.textContent||"").match(n);if(s)return console.log(`[${this.siteName}] Found price via TreeWalker: "${s[0]}"`),s[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,o=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:o||void 0}}}const P={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",'[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},Se=t=>{for(const e of P.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},_e=t=>{try{const e=t.querySelector(P.mainImage);if(e?.src){let o=e.src;return o.startsWith("//")&&(o="https:"+o),o=o.split("?")[0],o}const n=t.querySelector(P.thumbnailContainer);if(n){const o=n.querySelector("ul > li:first-child img");if(o){let r=o.src;if(r)return r.startsWith("//")&&(r="https:"+r),r.includes("thumbnails/remote/")&&(r=r.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),r=r.split("?")[0],r}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},ve=t=>{try{const e=[],n=new Set,o=t.querySelector(P.thumbnailContainer);if(o){const r=o.querySelectorAll("ul > li img");for(const i of r){let c=i.src;if(c&&!n.has(c)&&(c.startsWith("//")&&(c="https:"+c),c.includes("thumbnails/remote/")&&(c=c.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),c=c.split("?")[0],!n.has(c)&&(e.push(c),n.add(c),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},b=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},F=t=>t>=100&&t<=1e8,we=t=>{let e=null,n=null,o=null;for(const r of P.amount)try{const i=t.querySelector(r);if(!i||!i.textContent)continue;const s=i.textContent.trim();if(!/[\d,]+\s*원?/.test(s)&&!/^\d{1,3}(,\d{3})*$/.test(s.replace(/[^\d,]/g,"")))continue;const c=b(s);if(!c||!F(c))continue;if(console.log(`[CoupangParser][Price] Found via selector "${r}": ${c}`),/final|discount|final-price|deal|sale|coupon/i.test(r)){o=c,e=c;break}n||(n=c),e||(e=c)}catch(i){console.debug(`[CoupangParser][Price] Selector ${r} failed`,i)}if(!e){const r=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of r){const c=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c){const a=b(c[1]);if(a&&F(a)){console.log(`[CoupangParser][Price] Found via regex in element: ${a}`),e=a;break}}}}return{amount:e,originalPrice:n,discountPrice:o}},ke=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=n.nextNode();){const r=(o.textContent||"").replace(/\u00A0/g," ");for(const i of e){const s=r.match(i);if(s&&s[1]){const c=b(s[1]);if(c)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${c}`),c}}}return null},Ne=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const o of e){const r=(o.textContent||"").replace(/\u00A0/g," ").trim(),i=(o.getAttribute("data-price")||"").trim(),c=`${r} ${i}`.trim().match(n);if(c&&c[1]){const a=b(c[1]);if(a)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${a}`),a}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},A=t=>{for(const[e,n]of Object.entries(se))if(t.includes(e))return n;return null},Y=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},Be=t=>{const e=[],n=P.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const s=i,c=s.src,a=s.alt||"";if(!c)return;let l=a.trim();l||(l=A(c)||""),l&&!l.includes("카드")&&(l=`${l}카드`),c&&l&&(e.some(u=>u.cardName===l)||(e.push({src:c,alt:a,cardName:l}),console.log("[CoupangParser] 카드 이미지 발견:",{cardName:l,src:c.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(s=>{const c=s,a=c.src,l=c.alt||"";if(!a||(c.width||c.naturalWidth)>100)return;let d=l.trim();d||(d=A(a)||""),d&&!d.includes("카드")&&(d=`${d}카드`),a&&d&&!e.some(m=>m.cardName===d)&&e.push({src:a,alt:l,cardName:d})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const s=i,c=s.src,a=s.alt||"";if(!c||(s.width||s.naturalWidth)>100)return;let u=a.trim();u||(u=A(c)||""),u&&!u.includes("카드")&&(u=`${u}카드`),c&&u&&!e.some(d=>d.cardName===u)&&e.push({src:c,alt:a,cardName:u})}),console.log("[CoupangParser] 추출된 카드 이미지 총:",e.length),e},Ae=t=>{const e=[],n=P.cardBenefitPopup,o=t.querySelector(n.container);if(!o)return console.log("[CoupangParser] 카드 혜택 팝업을 찾을 수 없음"),e;const r=o.querySelector(n.iframe);if(r)try{const s=r.contentDocument||r.contentWindow?.document;if(s)return Ie(s)}catch{console.log("[CoupangParser] iframe 접근 불가 (cross-origin)")}const i=o.querySelector(n.content);return i?Te(i):e},Ie=t=>{const e=[],n=P.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(r=>{const i=r.querySelector(n.cardName),s=r.querySelector(n.benefitRate),c=r.querySelector(n.benefitDesc),a=i?.textContent?.trim()||"",l=s?.textContent?.trim()||"",u=c?.textContent?.trim()||r.textContent?.trim()||"";if(a){const d=Y(l||u);e.push({card:a,cardName:a,benefit:u||l||"혜택 제공",discount:d,rate:d})}}),e},Te=t=>{const e=[],n=t.textContent||"",o=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const r of o){let i;for(;(i=r.exec(n))!==null;){const s=i[1].includes("카드")?i[1]:`${i[1]}카드`,c=parseFloat(i[2]);e.some(a=>a.card===s)||e.push({card:s,cardName:s,benefit:`최대 ${c}% 할인/적립`,discount:c,rate:c})}}return e},De=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(o=>{const r=o.textContent||"",i=r.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const s=i[1].includes("카드")?i[1]:`${i[1]}카드`,c=parseFloat(i[2]);if(!e.some(a=>a.card===s)){let a=`최대 ${c}% 할인/적립`;const l=r.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);l&&(a=`최대 ${c}% ${l[0]}`),e.push({card:s,cardName:s,benefit:a,discount:c,rate:c})}}}),e},$e=t=>{let e=[];const n=Be(t),o=Ae(t);if(o.length>0&&(console.log("[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:",o.length),e=o),De(t).forEach(i=>{e.some(s=>s.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(P.benefitBadge);if(i){const s=i.querySelectorAll("img.benefit-ico"),c=[],a=[];s.forEach(d=>{const m=d.getAttribute("src");if(m){const h=A(m);h&&(c.push(h),a.push(m))}});const l=i.querySelector(".benefit-label")?.textContent?.trim(),u=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(l){const d=Y(l),m=c.length>0?`${c.slice(0,3).join(", ")}${c.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({card:m,cardName:m,benefit:`${l}${u?` (${u})`:""}`,discount:d,rate:d,imageUrl:a[0]})}}}return e=e.map(i=>{if(!i.imageUrl){const s=i.cardName||i.card||"",c=n.find(a=>{const l=a.cardName.toLowerCase(),u=s.toLowerCase();return l.includes(u.replace("카드",""))||u.includes(l.replace("카드",""))});if(c)return{...i,imageUrl:c.src}}return i}),e.sort((i,s)=>(s.discount??0)-(i.discount??0)),console.log("[CoupangParser] 최종 카드 혜택:",e),e},qe=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const r=parseInt(n[1],10);return{rate:r,description:`기프트카드 ${r}% 할인`}}const o=t.querySelectorAll("div, span, p");for(const r of o){const i=r.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const s=i.match(/(\d+)\s*%/);if(s)return{rate:parseInt(s[1],10),description:i.trim()}}}return null},Re=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const r of e){const i=r.textContent||"",s=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s&&i.includes("쿠팡캐시")){const c=b(s[1]);if(c)return{amount:c,description:`쿠팡캐시 ${c.toLocaleString()} 원 적립`}}}const o=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(o){const r=b(o[1]);if(r)return{amount:r,description:`쿠팡캐시 ${r.toLocaleString()} 원 적립`}}return null},Me=t=>{try{const e=[],n=new Set,o=t.querySelector(P.instantOption);if(!o)return e;const r=o.querySelectorAll("section > ul > li");for(const i of r)try{const s=i.querySelectorAll("div");if(s.length<2)continue;let c="";for(const d of s){const m=d.textContent||"";if(!m.includes("원")&&m.trim().length>0&&!m.includes("px")){c=m.trim();break}}let a="";for(const d of s){const h=(d.textContent||"").match(/[\d,]+원/);if(h){a=h[0].replace(/[,원]/g,"");break}}if(!a)continue;const l=parseInt(a);if(!l||l<100||!c||c.length<2)continue;const u=`${c}-${l}`;if(n.has(u))continue;if(e.push({name:c,price:l}),n.add(u),e.length>=15)break}catch(s){console.warn("[CoupangParser] Error parsing list item:",s);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},ze=t=>t.querySelector(P.shipping)?.textContent?.trim()||null;class G extends N{siteName="Coupang";selectors={amount:P.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=Se(e),o=_e(e),r=ve(e),i=we(e);let s=i.amount;const{originalPrice:c,discountPrice:a}=i;if(s||(s=ke(e)),s||(s=Ne(e)),!s)return console.debug("[CoupangParser] ❌ No price found"),null;const l=$e(e).map(f=>{const g=f.rate??f.discount,x=f.cardName||f.card;return{card:x,cardName:x,benefit:f.benefit,discount:g,rate:g}}),u=qe(e),d=Re(e),m=ze(e),h=Me(e);return console.log(`[CoupangParser] ✅ Found: ${s} KRW`),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:o||void 0,images:r,variants:h,originalPrice:c||void 0,discountPrice:a||void 0,cardBenefits:l,giftCardDiscount:u||void 0,cashback:d||void 0,shippingInfo:m||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const y={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},Le=[/11st\.co\.kr\/products\/(\d+)/,/m\.11st\.co\.kr\/products\/(\d+)/],R={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},Fe=t=>{const e=y.product;try{const n=t.querySelector(e.title);if(n?.textContent){const r=n.textContent.trim();return console.log("[11stParser][Product] 제목:",r),r}const o=t.querySelector(e.titleAlt);if(o?.textContent){const r=o.textContent.trim();return console.log("[11stParser][Product] 제목 (alt):",r),r}}catch(n){console.error("[11stParser][Product] 제목 추출 오류:",n)}return null},Ue=t=>{try{const e=t.querySelector(y.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return console.log("[11stParser][Product] 부제목:",n),n}}catch(e){console.error("[11stParser][Product] 부제목 추출 오류:",e)}return null},Oe=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const o=t.match(n);if(o?.[1])return console.log("[11stParser][Product] 상품ID:",o[1]),o[1]}}catch(e){console.error("[11stParser][Product] 상품ID 추출 오류:",e)}return null},X=t=>{const e=y.image;try{const n=t.querySelector(e.main);if(n?.src){const i=w(n.src);return console.log("[11stParser][Image] 메인 이미지:",i),i}const o=t.querySelector(e.mainAlt);if(o?.src){const i=w(o.src);return console.log("[11stParser][Image] 메인 이미지 (alt):",i),i}const r=t.querySelector(`${e.main}[data-src]`);if(r?.dataset?.src){const i=w(r.dataset.src);return console.log("[11stParser][Image] 메인 이미지 (lazy):",i),i}}catch(n){console.error("[11stParser][Image] 이미지 추출 오류:",n)}return null},We=t=>{const e=[],n=new Set,o=y.image;try{const r=X(t);r&&(e.push(r),n.add(r)),t.querySelectorAll(o.thumbnail).forEach(c=>{const a=c,l=a.src||a.dataset?.src;if(l){const u=w(l),d=U(u);n.has(d)||(e.push(d),n.add(d))}}),t.querySelectorAll(o.thumbnailAlt).forEach(c=>{const a=c,l=a.src||a.dataset?.src;if(l){const u=w(l),d=U(u);n.has(d)||(e.push(d),n.add(d))}}),console.log("[11stParser][Image] 전체 이미지 수:",e.length)}catch(r){console.error("[11stParser][Image] 전체 이미지 추출 오류:",r)}return e},Ke=t=>{const e=y.seller,n={seller:null,rating:null};try{const o=t.querySelector(e.name);o?.textContent&&(n.seller=o.textContent.trim(),console.log("[11stParser][Seller] 판매자:",n.seller));const r=t.querySelector(e.rating);r?.textContent&&(n.rating=r.textContent.trim(),console.log("[11stParser][Seller] 등급:",n.rating))}catch(o){console.error("[11stParser][Seller] 판매자 정보 추출 오류:",o)}return n};function w(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function U(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const He=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=y.price;try{const o=t.querySelector(n.originalPrice);o?.textContent&&(e.originalPrice=b(o.textContent),console.log("[11stParser][Price] 정가:",e.originalPrice));const r=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);r?.textContent&&(e.discountPrice=b(r.textContent),e.amount=e.discountPrice,console.log("[11stParser][Price] 판매가:",e.discountPrice));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=b(i.textContent),console.log("[11stParser][Price] 할인율:",e.discountRate));const s=t.querySelector(n.maxDiscountPrice);s?.textContent&&(e.maxDiscountPrice=b(s.textContent),console.log("[11stParser][Price] 최대할인가:",e.maxDiscountPrice));const c=t.querySelector(n.maxDiscountRate);c?.textContent&&(e.maxDiscountRate=b(c.textContent),console.log("[11stParser][Price] 최대할인율:",e.maxDiscountRate)),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(o){console.error("[11stParser][Price] 가격 추출 오류:",o)}return e},je=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const o of n){const r=o.textContent||"";for(const i of e){const s=r.match(i);if(s?.[1]){const c=b(s[1]);if(c&&c>100&&c<1e8)return console.log("[11stParser][findPriceInDOM] 가격 발견:",c),c}}}return null},Ve=t=>{const e=[],n=y.price;try{const o=t.querySelector(n.maxDiscountLayer);if(!o)return e;o.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const s=i.querySelector(".title"),c=i.querySelector(".price");if(s&&c){const a=s.textContent?.trim()||"",l=c.textContent?.trim()||"",u=b(l.replace("-",""));a&&u&&a!=="판매가"&&(e.push({type:a,amount:u}),console.log("[11stParser][DiscountDetail]",a,u))}})}catch(o){console.error("[11stParser][DiscountDetail] 오류:",o)}return e},Ye=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=Ge(t),e.totalPointAmount=e.points.reduce((n,o)=>n+o.amount,0),e.cardBenefits=Xe(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,o)=>n+o.benefitAmount,0),e.installments=Qe(t),e.maxInstallmentMonths=e.installments.reduce((n,o)=>Math.max(n,o.maxMonths),0),e.coupons=nt(t),console.log("[11stParser][Benefits] 총 포인트:",e.totalPointAmount),console.log("[11stParser][Benefits] 총 카드혜택:",e.totalCardBenefitAmount),console.log("[11stParser][Benefits] 최대 무이자:",e.maxInstallmentMonths,"개월")}catch(n){console.error("[11stParser][Benefits] 혜택 추출 오류:",n)}return e},Ge=t=>{const e=[],n=y.pointDetail;try{const o=t.querySelector(n.container);if(o){const r=o.querySelector(n.totalPoint);if(r?.textContent){const s=b(r.textContent);s&&(e.push({amount:s,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),console.log("[11stParser][Points] 최대 적립 포인트:",s))}const i=o.querySelector(n.elevenPaySection);if(i){const s=i.querySelector(".total .value");if(s?.textContent){const a=b(s.textContent);a&&!e.find(l=>l.amount===a&&l.type==="최대적립포인트")&&(e.push({amount:a,type:"11pay포인트",description:"11pay 결제 시 적립"}),console.log("[11stParser][Points] 11pay 포인트 총액:",a))}i.querySelectorAll(".desc li").forEach(a=>{const l=a.querySelector(".c_layer_expand button.c_product_btn"),u=a.querySelector(".value");if(l&&u){const d=l.textContent?.trim()||"",m=b(u.textContent||"");m&&d&&!d.includes("카드")&&(e.push({amount:m,type:d,description:d}),console.log("[11stParser][Points]",d,":",m))}})}}if(e.length===0){const r=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(r?.textContent){const i=b(r.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),console.log("[11stParser][Points] 기본 포인트:",i))}}}catch(o){console.error("[11stParser][Points] 포인트 추출 오류:",o)}return e},Xe=t=>{const e=[],n=y.cardDiscount;try{const o=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let r=null;for(const s of o)if(r=t.querySelector(s),r){console.log("[11stParser][CardBenefit] 컨테이너 찾음:",s);break}if(console.log("[11stParser][CardBenefit] other_benefits 컨테이너:",r?"찾음":"없음"),r){const s=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let c=null;for(const a of s)if(c=r.querySelectorAll(a),c.length>0){console.log("[11stParser][CardBenefit] benefit 찾음:",a,c.length);break}if(console.log("[11stParser][CardBenefit] benefit 블록 수:",c?.length||0),!c||c.length===0){const a=r.querySelector("dl");if(console.log("[11stParser][CardBenefit] dl 요소:",a?"찾음":"없음"),a){const l=a.children;console.log("[11stParser][CardBenefit] dl children 수:",l.length);for(let u=0;u<Math.min(l.length,3);u++)console.log(`[11stParser][CardBenefit] dl child[${u}]:`,l[u].tagName,l[u].className)}}c&&c.length>0&&c.forEach(a=>{const u=a.querySelector("dt")?.textContent?.trim()||"";if(console.log("[11stParser][CardBenefit] 메인 타이틀:",u),!u)return;const d=Je(u);d&&d.benefitAmount>0&&(e.push(d),console.log("[11stParser][CardBenefit] 메인 혜택 추가:",d));const m=a.querySelector("dd");if(m){const h=m.querySelectorAll(".tit_sub");console.log("[11stParser][CardBenefit] 서브타이틀 수:",h.length),h.forEach(f=>{const g=f.textContent?.trim()||"";if(console.log("[11stParser][CardBenefit] 서브타이틀:",g),g.includes("안내사항")||g.includes("적립제외"))return;let x=f.nextElementSibling;for(;x&&x.tagName!=="UL"&&x.tagName!=="SPAN";)x=x.nextElementSibling;if(x&&x.tagName==="UL"){const C=x.querySelectorAll("li");console.log("[11stParser][CardBenefit] 리스트 아이템 수:",C.length),C.forEach(S=>{const B=S.textContent?.trim()||"";console.log("[11stParser][CardBenefit] 아이템:",B);const E=Ze(g,B);E&&(e.find(_=>_.cardName===E.cardName&&_.benefitType===E.benefitType&&_.benefitAmount===E.benefitAmount)||(e.push(E),console.log("[11stParser][CardBenefit] 서브 혜택 추가:",E)))})}})}})}else console.log("[11stParser][CardBenefit] ⚠️ other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(c=>{const a=c.textContent?.trim()||"";if(a.includes("카드")||a.includes("신한")){const u=c.closest("li")?.querySelector(".value")?.textContent?.trim()||"",d=b(u);if(d){const m=a.replace(" 결제 시","").trim();e.find(h=>h.cardName===m&&h.benefitType==="포인트")||e.push({cardName:m,benefitAmount:d,benefitType:"포인트",condition:"결제 시"})}}}),console.log("[11stParser][CardBenefit] 추출된 카드 혜택:",e.length),e.forEach((s,c)=>{console.log(`  [${c+1}] ${s.cardName}: ${s.benefitAmount}${s.benefitType==="적립"?"%":s.benefitType==="할인"?"원":""} ${s.benefitType}`)})}catch(o){console.error("[11stParser][CardBenefit] 카드 혜택 추출 오류:",o)}return e};function Je(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const a of e){const l=t.match(a);if(l){n=l[1];break}}if(!n)return null;let o=0,r="",i="";const s=t.match(/최대\s*(\d+)%\s*적립/);s&&(o=parseInt(s[1],10),r="적립",i="결제 시");const c=t.match(/([\d,]+)원\s*할인/);return c&&(o=b(c[1])||0,r="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:o,benefitType:r||(t.includes("할인")?"할인":"적립"),condition:i}}function Ze(t,e){if(!e)return null;let n="",o=0,r="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const s=e.match(/([\d,]+)원\s*할인/);s&&(o=b(s[1])||0,r="할인");const c=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return c&&!r&&(o=parseFloat(c[1]),r="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!o||!r?null:{cardName:n,benefitAmount:o,benefitType:r,condition:i}}const Qe=t=>{const e=[],n=y.installment;try{const o=t.querySelector(n.dialogContainer);if(o&&(o.querySelectorAll(".card_box").forEach(i=>{const c=i.querySelector("dt")?.textContent?.trim()||"";if(!c)return;i.querySelectorAll("dd").forEach(l=>{const u=l.textContent?.trim()||"";if(!u)return;const d=et(c,u);d&&e.push(d)})}),console.log("[11stParser][Installment] card_box에서 추출:",e.length)),e.length===0){const r=t.querySelector(n.triggerButton);if(r){const c=(r.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);c&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"})}tt(t).forEach(s=>{e.find(c=>c.cardName===s.cardName)||e.push(s)})}console.log("[11stParser][Installment] 총 무이자 할부 카드 수:",e.length)}catch(o){console.error("[11stParser][Installment] 무이자 할부 추출 오류:",o)}return e};function et(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const o=n[1],i=o.split(",").map(u=>parseInt(u.trim(),10)).filter(u=>!isNaN(u)),s=i.length>0?Math.max(...i):0;if(s===0)return null;let c=null;const a=e.match(/(\d+)만원/);a&&(c=parseInt(a[1],10)*1e4);let l="";return e.includes("11pay")?l="11pay 결제 시":e.includes("카카오페이")?l="카카오페이 결제 시":c&&(l=`${c/1e4}만원 이상`),{cardName:t,maxMonths:s,minAmount:c,months:o+"개월",condition:l}}function tt(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(r=>{const i=r.textContent||"",s=i.match(/최대\s*(\d+)\s*개월\s*무이자/);s&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"}),n.forEach(c=>{if(i.includes(c)){const l=i.substring(i.indexOf(c)).match(/([\d,]+)개월/);if(l&&!e.find(d=>d.cardName.includes(c))){const d=l[1],m=d.split(",").map(f=>parseInt(f.trim(),10)),h=Math.max(...m.filter(f=>!isNaN(f)));e.push({cardName:c+"카드",maxMonths:h,minAmount:null,months:d+"개월",condition:""})}}})}),e}const nt=t=>{const e=[],n=y.coupon;try{const o=t.querySelector(n.badge);if(o?.textContent){const i=o.textContent.trim(),s=ot(i);s&&(e.push(s),console.log("[11stParser][Coupon]",s))}t.querySelectorAll(n.item).forEach(i=>{const s=i.querySelector(n.name),c=i.querySelector(n.discount);if(s||c){const a=s?.textContent?.trim()||"쿠폰",l=c?.textContent||"",u=l.includes("원")?b(l):null,d=l.includes("%")?b(l):null;e.push({name:a,discountAmount:u,discountRate:d})}})}catch(o){console.error("[11stParser][Coupon] 쿠폰 추출 오류:",o)}return e};function ot(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:b(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function O(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:o,name:r}of n)for(const i of o)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${r} (신용)`:e.includes("체크카드")?`${r} (체크)`:r;return e||t}function rt(t,e){const n=t.map(o=>{const r=O(o.cardName),i=o.benefitType==="할인",s=o.benefitAmount<=100?o.benefitAmount:0;let c="";return i?c=`${o.benefitAmount.toLocaleString()}원 할인`:o.benefitAmount<=100?c=`${o.benefitAmount}% 적립`:c=`${o.benefitAmount.toLocaleString()}P 적립`,{card:r,cardName:r,benefit:c,discount:i?o.benefitAmount:0,rate:s,condition:o.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(o=>{if(o.cardName==="__INSTALLMENT_SUMMARY__")return;const r=O(o.cardName);n.push({card:r,cardName:r,benefit:`${o.months} 무이자`,discount:0,rate:0,condition:o.condition,benefitType:"installment",pointAmount:0})}),n}class J extends N{siteName=R.siteName;selectors={amount:[y.price.salePrice,y.price.salePriceAlt,y.price.maxDiscountPrice],title:[y.product.title,y.product.titleAlt],image:[y.image.main,y.image.mainAlt]};static isProductPage(e){const n=Le.some(o=>o.test(e));return console.log(`[ElevenStreetParser] isProductPage("${e}") = ${n}`),n}static extractProductId(e){return Oe(e)}parse(e){try{console.log("[ElevenStreetParser] 🔍 Parsing 11번가 page...");const n=Fe(e),o=Ue(e),r=X(e),i=We(e),s=Ke(e),c=He(e);let a=c.amount;const{originalPrice:l,discountPrice:u,maxDiscountPrice:d,discountRate:m,maxDiscountRate:h}=c;if(a||(a=je(e)),!a)return console.debug("[ElevenStreetParser] ❌ No price found"),null;const f=Ve(e),g=Ye(e),{points:x,cardBenefits:C,installments:S,coupons:B,totalPointAmount:E,totalCardBenefitAmount:M,maxInstallmentMonths:_}=g,ce=rt(C,S),T=[];return m&&T.push({rate:m,type:"SALE_DISCOUNT",description:"할인가"}),f.forEach(D=>{T.push({rate:D.amount,type:D.type.toUpperCase().replace(/\s+/g,"_"),description:D.type})}),console.log(`[ElevenStreetParser] ✅ Found: ${a.toLocaleString()} ${R.currency}`),console.log(`[ElevenStreetParser] 📌 Title: ${n}`),console.log(`[ElevenStreetParser] 🎁 총 포인트: ${E.toLocaleString()}P`),console.log(`[ElevenStreetParser] 💳 카드 혜택 수: ${C.length}`),console.log(`[ElevenStreetParser] 🏦 무이자 할부 카드 수: ${S.length}, 최대 ${_}개월`),{price:a,amount:a,currency:R.currency,title:n?`${n}${o?` ${o}`:""}`:void 0,imageUrl:r||void 0,images:i,originalPrice:l||void 0,discountPrice:u||d||void 0,discountRate:m||void 0,cardBenefits:ce,discounts:T,elevenst:{maxDiscountPrice:d,maxDiscountRate:h,maxInstallmentMonths:_,points:x,installments:S,coupons:B,totalPointAmount:E,totalCardBenefitAmount:M,seller:s.seller,sellerRating:s.rating,discountDetails:f}}}catch(n){return console.error("[ElevenStreetParser] ❌ Parse error:",n),null}}}const it={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class Z extends N{siteName="Amazon";selectors={amount:it.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[AmazonParser] ❌ Invalid amount:",o),null;const r=this.extractCurrency(n),{title:i,imageUrl:s}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const ct={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class Q extends N{siteName="eBay";selectors={amount:ct.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[EbayParser] ❌ Invalid amount:",o),null;const r=this.extractCurrency(n),{title:i,imageUrl:s}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const st={amount:[]};class ee extends N{siteName="Fallback";selectors={amount:st.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const o=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!o)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const r=this.extractNumber(o[1]);if(!r||!this.isValidPrice(r))return console.debug("[FallbackParser] ❌ Invalid amount:",r),null;const{title:i,imageUrl:s}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${r} KRW (via text heuristic)`),{price:r,amount:r,currency:"KRW",title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}function at(t){return G.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:J.isProductPage(t)?{site:"11st",isCheckout:!0}:Z.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:Q.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function lt(t){switch(t){case"coupang":return new G;case"11st":return new J;case"amazon":return new Z;case"ebay":return new Q;default:return new ee}}function dt(){return new ee}function te(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},o=>{o?.success&&console.log(`[ContentScript] ✅ Product data saved (source: ${e})`)})}function ut(t){let e=!1;const n=new MutationObserver(o=>{const r=o.some(l=>Array.from(l.addedNodes).some(u=>u instanceof Element?u.tagName==="IFRAME"||!!u.querySelector("iframe"):!1)),i=!e&&o.some(l=>Array.from(l.addedNodes).some(u=>u instanceof Element?u.classList.contains("benefit")||!!u.querySelector(".benefit")||u.closest(".other_benefits")&&(u.querySelector("dt")||u.querySelector("dd")):!1)),s=document.querySelector(".other_benefits .benefit dt");if(!(i&&s||r))return;i&&(e=!0);const a=r?"iframe":"benefit-content";console.log(`[ContentScript] 🔄 Dynamic content detected (${a})`),setTimeout(()=>{t(`dynamic-${a}`)||console.warn("[ContentScript] ❌ Dynamic reparse produced no result")},500),r&&n.disconnect()});n.observe(document.body,{childList:!0,subtree:!0})}const ne=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],pt=[...ne,".max_saveing_point .c_layer_expand button"],ft='.dialog_cont .btn_close, .layer_pop .btn_close, [class*="popup"] .close',I=()=>!!document.querySelector(".other_benefits .benefit dt");function mt(t){if(!window.location.hostname.includes("11st.co.kr"))return;console.log("[ContentScript] 🔍 Setting up 11번가 benefit watcher..."),oe(t);const e=()=>{ne.forEach(o=>{document.querySelectorAll(o).forEach(i=>{i.getAttribute("data-picsel-watched")||(i.setAttribute("data-picsel-watched","true"),i.addEventListener("click",()=>{console.log("[ContentScript] 🖱️ Benefit button clicked, waiting for content..."),setTimeout(()=>{I()&&(console.log("[ContentScript] ✅ Benefit content found after click!"),t("benefit-click"))},1e3)}))})})};e(),new MutationObserver(()=>{e()}).observe(document.body,{childList:!0,subtree:!0}),setTimeout(e,3e3)}function oe(t){if(I()){console.log("[ContentScript] ✅ Benefit content already exists, skip auto-click");return}let e=null;for(const n of pt){const o=document.querySelector(n);if(!o)continue;const r=o.textContent||"";if(r.includes("무이자")||r.includes("할인")||r.includes("추가")||r.includes("혜택")){e=o,console.log("[ContentScript] 🎯 Found benefit button:",n,r.substring(0,30));break}}if(!e){console.log("[ContentScript] ⚠️ No benefit button found for auto-click"),setTimeout(()=>{document.querySelector(".additional_benefits button")&&!I()&&(console.log("[ContentScript] 🔄 Retry auto-click benefit button..."),oe(t))},3e3);return}console.log("[ContentScript] 🖱️ Auto-clicking benefit button to load content..."),e.click(),setTimeout(()=>{const n=document.querySelector(ft);n&&(console.log("[ContentScript] ❌ Closing benefit dialog after load..."),n.click()),setTimeout(()=>{I()?(console.log("[ContentScript] ✅ Benefit content loaded via auto-click!"),t("auto-click-benefit")):console.log("[ContentScript] ⚠️ Benefit content not found after auto-click")},500)},1e3)}const gt=window.self===window.top;let W=!1;function re(){const t=window.location.href,e=at(t);if(!e)return console.log("[Content] ❌ Not a supported page"),null;console.log(`[Content] ✅ Site detected: ${e.site}`);let o=lt(e.site).parse(document);return!o&&(console.warn("[Content] ⚠️ Primary parser failed, trying fallback"),o=dt().parse(document),!o)?(console.warn("[Content] ❌ Fallback parser also failed"),null):(console.log("[Content] ✅ Parse successful:",{title:o.title?.substring(0,50),amount:o.amount}),{paymentInfo:o,site:e.site})}function ie(t,e){return{...t,site:e}}function K(t){const e=re();return e?(Ee(ie(e.paymentInfo,e.site)),te(e.paymentInfo,t),!0):!1}function ht(){const t=re();if(!t){console.warn("[ContentScript] ❌ Failed to extract payment info");return}V(ie(t.paymentInfo,t.site)),te(t.paymentInfo,"initial")}function xt(){!gt||W||(W=!0,ht(),ut(t=>K(t)),mt(t=>{K(t)}))}le(xt);
