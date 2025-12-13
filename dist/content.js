import{b as jn,p as oe,E as w,a as d,n as at,d as ee,l as R,L as k}from"./assets/index-CtnQ7lw9.js";import{u as Ge}from"./assets/store-SF67hG8t.js";import{C as Yn}from"./assets/constants-DOucEiR9.js";import{S as Vn}from"./assets/chromeStorage-BOBytA-p.js";const Xn=window.self===window.top;function Zn(t){if(!Xn){jn.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const Jn=`
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
`,ye=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const c=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(c,o).format(i)},Qn=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),lt="picsel-toggle-host",ut="picsel-toggle-panel",er={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},tr=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return er[e]||String(t)},h={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null,comparison:{status:"idle",query:null,error:null,data:null}},nr=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const p=document.createElement("img");p.src=r,p.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(p)}else{const p=document.createElement("span");p.textContent="No Image",p.style.fontSize="11px",p.style.color="#64748b",n.appendChild(p)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const c=document.createElement("div");c.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=ye(s,t.currency??"KRW");if(l){const p=document.createElement("div");p.className="picsel-final-price",p.textContent=l,c.appendChild(p)}const u=ye(t.originalPrice,t.currency??"KRW"),f=Qn(t.originalPrice,s);if(u&&f){const p=document.createElement("div");p.className="picsel-original-price",p.textContent=u;const b=document.createElement("div");b.className="picsel-discount-tag",b.textContent=`-${f}%`,c.appendChild(p),c.appendChild(b)}if(o.appendChild(i),o.appendChild(c),t.shippingInfo){const p=document.createElement("div");p.className="picsel-shipping",p.textContent=`배송: ${t.shippingInfo}`,o.appendChild(p)}return e.appendChild(n),e.appendChild(o),e};const{entries:dn,setPrototypeOf:Yt,isFrozen:rr,getPrototypeOf:or,getOwnPropertyDescriptor:ir}=Object;let{freeze:H,seal:j,create:xt}=Object,{apply:yt,construct:Et}=typeof Reflect<"u"&&Reflect;H||(H=function(e){return e});j||(j=function(e){return e});yt||(yt=function(e,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return e.apply(n,o)});Et||(Et=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new e(...r)});const ze=G(Array.prototype.forEach),sr=G(Array.prototype.lastIndexOf),Vt=G(Array.prototype.pop),we=G(Array.prototype.push),cr=G(Array.prototype.splice),qe=G(String.prototype.toLowerCase),dt=G(String.prototype.toString),pt=G(String.prototype.match),ve=G(String.prototype.replace),ar=G(String.prototype.indexOf),lr=G(String.prototype.trim),V=G(Object.prototype.hasOwnProperty),W=G(RegExp.prototype.test),Pe=ur(TypeError);function G(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return yt(t,e,r)}}function ur(t){return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Et(t,n)}}function S(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:qe;Yt&&Yt(t,null);let r=e.length;for(;r--;){let o=e[r];if(typeof o=="string"){const i=n(o);i!==o&&(rr(e)||(e[r]=i),o=i)}t[o]=!0}return t}function dr(t){for(let e=0;e<t.length;e++)V(t,e)||(t[e]=null);return t}function Q(t){const e=xt(null);for(const[n,r]of dn(t))V(t,n)&&(Array.isArray(r)?e[n]=dr(r):r&&typeof r=="object"&&r.constructor===Object?e[n]=Q(r):e[n]=r);return e}function Ne(t,e){for(;t!==null;){const r=ir(t,e);if(r){if(r.get)return G(r.get);if(typeof r.value=="function")return G(r.value)}t=or(t)}function n(){return null}return n}const Xt=H(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ft=H(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),mt=H(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pr=H(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),gt=H(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fr=H(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Zt=H(["#text"]),Jt=H(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ht=H(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Qt=H(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Fe=H(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),mr=j(/\{\{[\w\W]*|[\w\W]*\}\}/gm),gr=j(/<%[\w\W]*|[\w\W]*%>/gm),hr=j(/\$\{[\w\W]*/gm),br=j(/^data-[\-\w.\u00B7-\uFFFF]+$/),xr=j(/^aria-[\-\w]+$/),pn=j(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),yr=j(/^(?:\w+script|data):/i),Er=j(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fn=j(/^html$/i),_r=j(/^[a-z][.\w]*(-[.\w]+)+$/i);var en=Object.freeze({__proto__:null,ARIA_ATTR:xr,ATTR_WHITESPACE:Er,CUSTOM_ELEMENT:_r,DATA_ATTR:br,DOCTYPE_NAME:fn,ERB_EXPR:gr,IS_ALLOWED_URI:pn,IS_SCRIPT_OR_DATA:yr,MUSTACHE_EXPR:mr,TMPLIT_EXPR:hr});const Re={element:1,text:3,progressingInstruction:7,comment:8,document:9},Cr=function(){return typeof window>"u"?null:window},Sr=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const i="dompurify"+(r?"#"+r:"");try{return e.createPolicy(i,{createHTML(c){return c},createScriptURL(c){return c}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},tn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function mn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Cr();const e=E=>mn(E);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==Re.document||!t.Element)return e.isSupported=!1,e;let{document:n}=t;const r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:c,Node:s,Element:l,NodeFilter:u,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:b,trustedTypes:_}=t,m=l.prototype,y=Ne(m,"cloneNode"),C=Ne(m,"remove"),T=Ne(m,"nextSibling"),q=Ne(m,"childNodes"),O=Ne(m,"parentNode");if(typeof c=="function"){const E=n.createElement("template");E.content&&E.content.ownerDocument&&(n=E.content.ownerDocument)}let A,ie="";const{implementation:X,createNodeIterator:Ke,createDocumentFragment:_e,getElementsByTagName:Ce}=n,{importNode:On}=r;let $=tn();e.isSupported=typeof dn=="function"&&typeof O=="function"&&X&&X.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:je,ERB_EXPR:Ye,TMPLIT_EXPR:Ve,DATA_ATTR:Mn,ARIA_ATTR:Ln,IS_SCRIPT_OR_DATA:Bn,ATTR_WHITESPACE:At,CUSTOM_ELEMENT:Un}=en;let{IS_ALLOWED_URI:Tt}=en,M=null;const wt=S({},[...Xt,...ft,...mt,...gt,...Zt]);let B=null;const vt=S({},[...Jt,...ht,...Qt,...Fe]);let N=Object.seal(xt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Se=null,Xe=null;const ue=Object.seal(xt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Pt=!0,Ze=!0,Nt=!1,Rt=!0,de=!1,Ie=!0,se=!1,Je=!1,Qe=!1,pe=!1,De=!1,Oe=!1,kt=!0,It=!1;const zn="user-content-";let et=!0,Ae=!1,fe={},Z=null;const tt=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Dt=null;const Ot=S({},["audio","video","img","source","image","track"]);let nt=null;const Mt=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Me="http://www.w3.org/1998/Math/MathML",Le="http://www.w3.org/2000/svg",te="http://www.w3.org/1999/xhtml";let me=te,rt=!1,ot=null;const Fn=S({},[Me,Le,te],dt);let Be=S({},["mi","mo","mn","ms","mtext"]),Ue=S({},["annotation-xml"]);const qn=S({},["title","style","font","a","script"]);let Te=null;const $n=["application/xhtml+xml","text/html"],Wn="text/html";let D=null,ge=null;const Hn=n.createElement("form"),Lt=function(a){return a instanceof RegExp||a instanceof Function},it=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ge&&ge===a)){if((!a||typeof a!="object")&&(a={}),a=Q(a),Te=$n.indexOf(a.PARSER_MEDIA_TYPE)===-1?Wn:a.PARSER_MEDIA_TYPE,D=Te==="application/xhtml+xml"?dt:qe,M=V(a,"ALLOWED_TAGS")?S({},a.ALLOWED_TAGS,D):wt,B=V(a,"ALLOWED_ATTR")?S({},a.ALLOWED_ATTR,D):vt,ot=V(a,"ALLOWED_NAMESPACES")?S({},a.ALLOWED_NAMESPACES,dt):Fn,nt=V(a,"ADD_URI_SAFE_ATTR")?S(Q(Mt),a.ADD_URI_SAFE_ATTR,D):Mt,Dt=V(a,"ADD_DATA_URI_TAGS")?S(Q(Ot),a.ADD_DATA_URI_TAGS,D):Ot,Z=V(a,"FORBID_CONTENTS")?S({},a.FORBID_CONTENTS,D):tt,Se=V(a,"FORBID_TAGS")?S({},a.FORBID_TAGS,D):Q({}),Xe=V(a,"FORBID_ATTR")?S({},a.FORBID_ATTR,D):Q({}),fe=V(a,"USE_PROFILES")?a.USE_PROFILES:!1,Pt=a.ALLOW_ARIA_ATTR!==!1,Ze=a.ALLOW_DATA_ATTR!==!1,Nt=a.ALLOW_UNKNOWN_PROTOCOLS||!1,Rt=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,de=a.SAFE_FOR_TEMPLATES||!1,Ie=a.SAFE_FOR_XML!==!1,se=a.WHOLE_DOCUMENT||!1,pe=a.RETURN_DOM||!1,De=a.RETURN_DOM_FRAGMENT||!1,Oe=a.RETURN_TRUSTED_TYPE||!1,Qe=a.FORCE_BODY||!1,kt=a.SANITIZE_DOM!==!1,It=a.SANITIZE_NAMED_PROPS||!1,et=a.KEEP_CONTENT!==!1,Ae=a.IN_PLACE||!1,Tt=a.ALLOWED_URI_REGEXP||pn,me=a.NAMESPACE||te,Be=a.MATHML_TEXT_INTEGRATION_POINTS||Be,Ue=a.HTML_INTEGRATION_POINTS||Ue,N=a.CUSTOM_ELEMENT_HANDLING||{},a.CUSTOM_ELEMENT_HANDLING&&Lt(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(N.tagNameCheck=a.CUSTOM_ELEMENT_HANDLING.tagNameCheck),a.CUSTOM_ELEMENT_HANDLING&&Lt(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(N.attributeNameCheck=a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),a.CUSTOM_ELEMENT_HANDLING&&typeof a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(N.allowCustomizedBuiltInElements=a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),de&&(Ze=!1),De&&(pe=!0),fe&&(M=S({},Zt),B=[],fe.html===!0&&(S(M,Xt),S(B,Jt)),fe.svg===!0&&(S(M,ft),S(B,ht),S(B,Fe)),fe.svgFilters===!0&&(S(M,mt),S(B,ht),S(B,Fe)),fe.mathMl===!0&&(S(M,gt),S(B,Qt),S(B,Fe))),a.ADD_TAGS&&(typeof a.ADD_TAGS=="function"?ue.tagCheck=a.ADD_TAGS:(M===wt&&(M=Q(M)),S(M,a.ADD_TAGS,D))),a.ADD_ATTR&&(typeof a.ADD_ATTR=="function"?ue.attributeCheck=a.ADD_ATTR:(B===vt&&(B=Q(B)),S(B,a.ADD_ATTR,D))),a.ADD_URI_SAFE_ATTR&&S(nt,a.ADD_URI_SAFE_ATTR,D),a.FORBID_CONTENTS&&(Z===tt&&(Z=Q(Z)),S(Z,a.FORBID_CONTENTS,D)),a.ADD_FORBID_CONTENTS&&(Z===tt&&(Z=Q(Z)),S(Z,a.ADD_FORBID_CONTENTS,D)),et&&(M["#text"]=!0),se&&S(M,["html","head","body"]),M.table&&(S(M,["tbody"]),delete Se.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw Pe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Pe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=a.TRUSTED_TYPES_POLICY,ie=A.createHTML("")}else A===void 0&&(A=Sr(_,o)),A!==null&&typeof ie=="string"&&(ie=A.createHTML(""));H&&H(a),ge=a}},Bt=S({},[...ft,...mt,...pr]),Ut=S({},[...gt,...fr]),Gn=function(a){let g=O(a);(!g||!g.tagName)&&(g={namespaceURI:me,tagName:"template"});const x=qe(a.tagName),P=qe(g.tagName);return ot[a.namespaceURI]?a.namespaceURI===Le?g.namespaceURI===te?x==="svg":g.namespaceURI===Me?x==="svg"&&(P==="annotation-xml"||Be[P]):!!Bt[x]:a.namespaceURI===Me?g.namespaceURI===te?x==="math":g.namespaceURI===Le?x==="math"&&Ue[P]:!!Ut[x]:a.namespaceURI===te?g.namespaceURI===Le&&!Ue[P]||g.namespaceURI===Me&&!Be[P]?!1:!Ut[x]&&(qn[x]||!Bt[x]):!!(Te==="application/xhtml+xml"&&ot[a.namespaceURI]):!1},J=function(a){we(e.removed,{element:a});try{O(a).removeChild(a)}catch{C(a)}},ce=function(a,g){try{we(e.removed,{attribute:g.getAttributeNode(a),from:g})}catch{we(e.removed,{attribute:null,from:g})}if(g.removeAttribute(a),a==="is")if(pe||De)try{J(g)}catch{}else try{g.setAttribute(a,"")}catch{}},zt=function(a){let g=null,x=null;if(Qe)a="<remove></remove>"+a;else{const I=pt(a,/^[\r\n\t ]+/);x=I&&I[0]}Te==="application/xhtml+xml"&&me===te&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");const P=A?A.createHTML(a):a;if(me===te)try{g=new b().parseFromString(P,Te)}catch{}if(!g||!g.documentElement){g=X.createDocument(me,"template",null);try{g.documentElement.innerHTML=rt?ie:P}catch{}}const F=g.body||g.documentElement;return a&&x&&F.insertBefore(n.createTextNode(x),F.childNodes[0]||null),me===te?Ce.call(g,se?"html":"body")[0]:se?g.documentElement:F},Ft=function(a){return Ke.call(a.ownerDocument||a,a,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},st=function(a){return a instanceof p&&(typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||!(a.attributes instanceof f)||typeof a.removeAttribute!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function")},qt=function(a){return typeof s=="function"&&a instanceof s};function ne(E,a,g){ze(E,x=>{x.call(e,a,g,ge)})}const $t=function(a){let g=null;if(ne($.beforeSanitizeElements,a,null),st(a))return J(a),!0;const x=D(a.nodeName);if(ne($.uponSanitizeElement,a,{tagName:x,allowedTags:M}),Ie&&a.hasChildNodes()&&!qt(a.firstElementChild)&&W(/<[/\w!]/g,a.innerHTML)&&W(/<[/\w!]/g,a.textContent)||a.nodeType===Re.progressingInstruction||Ie&&a.nodeType===Re.comment&&W(/<[/\w]/g,a.data))return J(a),!0;if(!(ue.tagCheck instanceof Function&&ue.tagCheck(x))&&(!M[x]||Se[x])){if(!Se[x]&&Ht(x)&&(N.tagNameCheck instanceof RegExp&&W(N.tagNameCheck,x)||N.tagNameCheck instanceof Function&&N.tagNameCheck(x)))return!1;if(et&&!Z[x]){const P=O(a)||a.parentNode,F=q(a)||a.childNodes;if(F&&P){const I=F.length;for(let K=I-1;K>=0;--K){const re=y(F[K],!0);re.__removalCount=(a.__removalCount||0)+1,P.insertBefore(re,T(a))}}}return J(a),!0}return a instanceof l&&!Gn(a)||(x==="noscript"||x==="noembed"||x==="noframes")&&W(/<\/no(script|embed|frames)/i,a.innerHTML)?(J(a),!0):(de&&a.nodeType===Re.text&&(g=a.textContent,ze([je,Ye,Ve],P=>{g=ve(g,P," ")}),a.textContent!==g&&(we(e.removed,{element:a.cloneNode()}),a.textContent=g)),ne($.afterSanitizeElements,a,null),!1)},Wt=function(a,g,x){if(kt&&(g==="id"||g==="name")&&(x in n||x in Hn))return!1;if(!(Ze&&!Xe[g]&&W(Mn,g))){if(!(Pt&&W(Ln,g))){if(!(ue.attributeCheck instanceof Function&&ue.attributeCheck(g,a))){if(!B[g]||Xe[g]){if(!(Ht(a)&&(N.tagNameCheck instanceof RegExp&&W(N.tagNameCheck,a)||N.tagNameCheck instanceof Function&&N.tagNameCheck(a))&&(N.attributeNameCheck instanceof RegExp&&W(N.attributeNameCheck,g)||N.attributeNameCheck instanceof Function&&N.attributeNameCheck(g,a))||g==="is"&&N.allowCustomizedBuiltInElements&&(N.tagNameCheck instanceof RegExp&&W(N.tagNameCheck,x)||N.tagNameCheck instanceof Function&&N.tagNameCheck(x))))return!1}else if(!nt[g]){if(!W(Tt,ve(x,At,""))){if(!((g==="src"||g==="xlink:href"||g==="href")&&a!=="script"&&ar(x,"data:")===0&&Dt[a])){if(!(Nt&&!W(Bn,ve(x,At,"")))){if(x)return!1}}}}}}}return!0},Ht=function(a){return a!=="annotation-xml"&&pt(a,Un)},Gt=function(a){ne($.beforeSanitizeAttributes,a,null);const{attributes:g}=a;if(!g||st(a))return;const x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:B,forceKeepAttr:void 0};let P=g.length;for(;P--;){const F=g[P],{name:I,namespaceURI:K,value:re}=F,he=D(I),ct=re;let U=I==="value"?ct:lr(ct);if(x.attrName=he,x.attrValue=U,x.keepAttr=!0,x.forceKeepAttr=void 0,ne($.uponSanitizeAttribute,a,x),U=x.attrValue,It&&(he==="id"||he==="name")&&(ce(I,a),U=zn+U),Ie&&W(/((--!?|])>)|<\/(style|title|textarea)/i,U)){ce(I,a);continue}if(he==="attributename"&&pt(U,"href")){ce(I,a);continue}if(x.forceKeepAttr)continue;if(!x.keepAttr){ce(I,a);continue}if(!Rt&&W(/\/>/i,U)){ce(I,a);continue}de&&ze([je,Ye,Ve],jt=>{U=ve(U,jt," ")});const Kt=D(a.nodeName);if(!Wt(Kt,he,U)){ce(I,a);continue}if(A&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!K)switch(_.getAttributeType(Kt,he)){case"TrustedHTML":{U=A.createHTML(U);break}case"TrustedScriptURL":{U=A.createScriptURL(U);break}}if(U!==ct)try{K?a.setAttributeNS(K,I,U):a.setAttribute(I,U),st(a)?J(a):Vt(e.removed)}catch{ce(I,a)}}ne($.afterSanitizeAttributes,a,null)},Kn=function E(a){let g=null;const x=Ft(a);for(ne($.beforeSanitizeShadowDOM,a,null);g=x.nextNode();)ne($.uponSanitizeShadowNode,g,null),$t(g),Gt(g),g.content instanceof i&&E(g.content);ne($.afterSanitizeShadowDOM,a,null)};return e.sanitize=function(E){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=null,x=null,P=null,F=null;if(rt=!E,rt&&(E="<!-->"),typeof E!="string"&&!qt(E))if(typeof E.toString=="function"){if(E=E.toString(),typeof E!="string")throw Pe("dirty is not a string, aborting")}else throw Pe("toString is not a function");if(!e.isSupported)return E;if(Je||it(a),e.removed=[],typeof E=="string"&&(Ae=!1),Ae){if(E.nodeName){const re=D(E.nodeName);if(!M[re]||Se[re])throw Pe("root node is forbidden and cannot be sanitized in-place")}}else if(E instanceof s)g=zt("<!---->"),x=g.ownerDocument.importNode(E,!0),x.nodeType===Re.element&&x.nodeName==="BODY"||x.nodeName==="HTML"?g=x:g.appendChild(x);else{if(!pe&&!de&&!se&&E.indexOf("<")===-1)return A&&Oe?A.createHTML(E):E;if(g=zt(E),!g)return pe?null:Oe?ie:""}g&&Qe&&J(g.firstChild);const I=Ft(Ae?E:g);for(;P=I.nextNode();)$t(P),Gt(P),P.content instanceof i&&Kn(P.content);if(Ae)return E;if(pe){if(De)for(F=_e.call(g.ownerDocument);g.firstChild;)F.appendChild(g.firstChild);else F=g;return(B.shadowroot||B.shadowrootmode)&&(F=On.call(r,F,!0)),F}let K=se?g.outerHTML:g.innerHTML;return se&&M["!doctype"]&&g.ownerDocument&&g.ownerDocument.doctype&&g.ownerDocument.doctype.name&&W(fn,g.ownerDocument.doctype.name)&&(K="<!DOCTYPE "+g.ownerDocument.doctype.name+`>
`+K),de&&ze([je,Ye,Ve],re=>{K=ve(K,re," ")}),A&&Oe?A.createHTML(K):K},e.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};it(E),Je=!0},e.clearConfig=function(){ge=null,Je=!1},e.isValidAttribute=function(E,a,g){ge||it({});const x=D(E),P=D(a);return Wt(x,P,g)},e.addHook=function(E,a){typeof a=="function"&&we($[E],a)},e.removeHook=function(E,a){if(a!==void 0){const g=sr($[E],a);return g===-1?void 0:cr($[E],g,1)[0]}return Vt($[E])},e.removeHooks=function(E){$[E]=[]},e.removeAllHooks=function(){$=tn()},e}var nn=mn();const Ar=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),Tr=(t,e)=>typeof t!="number"||e===null?null:t-e,rn=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,r]of Object.entries(e))if(t.includes(n))return r;return t.replace("카드","").substring(0,2).toUpperCase()},wr=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드","SAMSUNG CARD"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:r,svg:o}of n)for(const i of r)if(e.includes(i.toUpperCase()))try{return chrome?.runtime?.getURL(`assets/card/${o}`)??null}catch{return null}return null},vr=(t,e,n)=>{const r=" recommended",o=document.createElement("div");o.className=`picsel-card-benefit-item${r}`;const i=t.cardName||t.card||"카드",s=wr(i)||t.imageUrl;if(s){const m=document.createElement("div");m.className="picsel-card-image-wrapper";const y=document.createElement("img");y.src=s,y.alt=i,y.className="picsel-card-image",y.onerror=()=>{const C=rn(i);m.textContent="";const T=document.createElement("div");T.className="picsel-card-initial",T.textContent=nn.sanitize(C,{ALLOWED_TAGS:[]}),m.appendChild(T)},m.appendChild(y),o.appendChild(m)}else{const m=rn(i),y=document.createElement("div");y.className="picsel-card-image-wrapper";const C=document.createElement("div");C.className="picsel-card-initial",C.textContent=nn.sanitize(m,{ALLOWED_TAGS:[]}),y.appendChild(C),o.appendChild(y)}const l=document.createElement("div");l.className="picsel-card-info";const u=document.createElement("div");if(u.className="picsel-card-header",(t.discountAmount??0)>0){const m=document.createElement("span");m.className="picsel-recommended-badge",m.textContent=`${e+1}위`,u.appendChild(m)}const f=document.createElement("span");f.className="picsel-card-name";const p=i.includes(",")?i.split(",")[0].trim():i;if(f.textContent=p,u.appendChild(f),l.appendChild(u),t.benefit){const m=document.createElement("div");m.className="picsel-card-benefit-desc",m.textContent=t.benefit,l.appendChild(m)}o.appendChild(l);const b=document.createElement("div");if(b.className="picsel-card-amount",t.benefitType==="installment"){const m=document.createElement("div");m.className="picsel-card-installment",m.textContent=t.benefit||"무이자",b.appendChild(m)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const C=document.createElement("div");C.className="picsel-card-final-price";const T=ye(t.finalPrice,n);C.textContent=T,b.appendChild(C)}const m=document.createElement("div");m.className="picsel-card-discount";const y=ye(t.discountAmount,n);m.textContent=`-${y}`,b.appendChild(m)}else if(typeof t.rate=="number"&&t.rate>0){const m=document.createElement("div");m.className="picsel-card-rate",m.textContent=`${t.rate}%`,b.appendChild(m)}return o.appendChild(b),o},Pr=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const _=document.createElement("section");_.className="picsel-section picsel-card-section picsel-hidden",_.setAttribute("data-empty","true"),_.style.display="none";const m=document.createElement("h4");m.className="picsel-section-title",m.textContent="카드별 혜택",_.appendChild(m);const y=document.createElement("div");return y.className="picsel-empty-benefits",y.textContent="이 상품에는 카드 혜택이 없어요",_.appendChild(y),_}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(_=>{const m=_;if(m.benefitType==="point"||m.benefitType==="installment")return null;const y=m.rate??m.discount;let C=0,T=0;typeof y=="number"&&y>100||m.benefitType==="discount"?(C=typeof y=="number"&&y>100?y:m.discount??0,T=0):(T=typeof y=="number"&&y<=100?y:0,C=Ar(n,T)??0);const q=Tr(n,C);return{...m,cardName:m.cardName??m.card,rate:T,discountAmount:C??void 0,finalPrice:q??void 0}}).filter(_=>_!==null).sort((_,m)=>{const y=_?.discountAmount??0,C=m?.discountAmount??0;if(y!==C)return C-y;const T=_?.rate??0;return(m?.rate??0)-T})[0];if(!i)return null;const c=document.createElement("section");c.className="picsel-section picsel-card-section";const s=document.createElement("h4");s.className="picsel-section-title",s.textContent="추천 카드 혜택",c.appendChild(s);const l=document.createElement("div");l.className="picsel-card-benefit-list";const u=t.currency??"KRW",f=vr(i,0,u);l.appendChild(f),c.appendChild(l);const p=[],b=t.elevenst?.totalPointAmount??0;if(b>0&&p.push(`최대 적립 포인트 ${b.toLocaleString()}P`),t.giftCardDiscount?.description&&p.push(t.giftCardDiscount.description),t.cashback?.description&&p.push(t.cashback.description),p.length>0){const _=document.createElement("div");_.className="picsel-sub-benefits",p.forEach(m=>{const y=document.createElement("div");y.className="picsel-sub-benefit-item",y.textContent=m,_.appendChild(y)}),c.appendChild(_)}return c},Nr=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{xe(!1)}),n.appendChild(r),e.appendChild(n),e},Rr={danawa:"다나와",naver:"네이버쇼핑",coupang:"쿠팡","11st":"11번가",gmarket:"G마켓"},kr=async t=>{if(t&&h.comparison.status!=="loading"&&!(h.comparison.status==="success"&&h.comparison.query===t)){h.comparison={status:"loading",query:t,error:null,data:null},be();try{if(!chrome?.runtime?.sendMessage){h.comparison={status:"error",query:t,error:"Chrome extension API를 사용할 수 없습니다.",data:null},be();return}const e=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!e?.success){h.comparison={status:"error",query:t,error:e?.error||"가격 비교 서버가 실행 중이 아닙니다. pnpm run server 실행이 필요합니다.",data:null},be();return}const n=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:t});n?.success?h.comparison={status:"success",query:t,error:null,data:n.data}:h.comparison={status:"error",query:t,error:n?.error||"가격 비교 검색 실패",data:null}}catch(e){h.comparison={status:"error",query:t,error:e instanceof Error?e.message:"알 수 없는 오류",data:null}}finally{be()}}},on=t=>{const{buttonBadgeEl:e}=h;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const i=o,c=i.rate??i.discount;return typeof c=="number"?c:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=ye(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},be=()=>{const{contentEl:t,cachedData:e}=h;if(!t)return;if(t.textContent="",!e){const c=document.createElement("p");c.className="picsel-empty-state",c.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(c),on(null);return}const n=e,{displayMode:r}=Ge.getState(),o=nr(n);if(t.appendChild(o),r==="lowest-price"){const c=document.createElement("section");c.className="picsel-section picsel-lowest-price-section";const s=document.createElement("h4");s.className="picsel-section-title",s.textContent="💰 최저가 비교",c.appendChild(s);const l=n.title??"",u=!!h.panelEl?.classList.contains("open");u&&l&&kr(l);const f=h.comparison.status,p=h.comparison.data;if(u)if(f==="loading"){const b=document.createElement("div");b.className="picsel-empty-state",b.textContent="가격 비교 중입니다...",c.appendChild(b)}else if(f==="error"){const b=document.createElement("div");b.className="picsel-empty-state",b.textContent=h.comparison.error||"가격 비교 중 오류가 발생했습니다.",c.appendChild(b)}else if(f==="success"&&p?.results?.length){const _=(Array.isArray(p.results)?p.results:[]).filter(m=>m&&m.success&&Array.isArray(m.products)).flatMap(m=>m.products.map(y=>({provider:m.provider,name:y.name,price:y.price,currency:y.currency,url:y.url}))).filter(m=>typeof m.price=="number"&&m.price>0).sort((m,y)=>m.price-y.price).slice(0,3);if(_.length){const m=document.createElement("div");m.style.display="flex",m.style.flexDirection="column",m.style.gap="8px",_.forEach(y=>{const C=document.createElement("a");C.href=y.url||"#",C.target="_blank",C.rel="noreferrer",C.style.display="flex",C.style.alignItems="center",C.style.justifyContent="space-between",C.style.gap="10px",C.style.padding="10px 12px",C.style.background="#ffffff",C.style.border="1px solid #e5e7eb",C.style.borderRadius="12px",C.style.textDecoration="none",C.style.color="inherit",C.style.transition="background-color 0.15s ease";const T=document.createElement("div");T.style.display="flex",T.style.flexDirection="column",T.style.gap="2px",T.style.minWidth="0";const q=document.createElement("span");q.style.fontSize="11px",q.style.color="#6b7280",q.textContent=Rr[y.provider]||y.provider;const O=document.createElement("span");O.style.fontSize="12px",O.style.fontWeight="600",O.style.color="#111827",O.style.whiteSpace="nowrap",O.style.overflow="hidden",O.style.textOverflow="ellipsis",O.textContent=y.name,T.appendChild(q),T.appendChild(O);const A=document.createElement("strong");A.style.fontSize="13px",A.style.fontWeight="800",A.style.color="#111827",A.style.flexShrink="0",A.textContent=ye(y.price,y.currency??"KRW")||`${y.price}`,C.appendChild(T),C.appendChild(A),m.appendChild(C)}),c.appendChild(m)}else{const m=document.createElement("div");m.className="picsel-empty-state",m.textContent="검색 결과가 없습니다.",c.appendChild(m)}}else{const b=document.createElement("div");b.className="picsel-empty-state",b.textContent="상품명을 찾을 수 없어 가격 비교를 실행할 수 없습니다.",c.appendChild(b)}else{const b=document.createElement("div");b.className="picsel-empty-state",b.textContent="패널을 열면 최저가 비교를 시작합니다.",c.appendChild(b)}t.appendChild(c)}else{const c=Pr(n);c&&t.appendChild(c)}const i=Nr();i&&t.appendChild(i),on(n)},xe=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=h;!e||!n||!r||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),r.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),r.textContent="PicSel 혜택 보기"))},Ir=()=>{if(h.mounted)return;if(document.getElementById(lt)){const i=document.getElementById(lt);i&&(h.hostElement=i,h.shadowRoot=i.shadowRoot,i.shadowRoot&&(h.toggleButton=i.shadowRoot.querySelector(".picsel-toggle-button"),h.buttonLabelEl=i.shadowRoot.querySelector(".picsel-toggle-label"),h.buttonBadgeEl=i.shadowRoot.querySelector(".picsel-toggle-badge"),h.panelEl=i.shadowRoot.querySelector(`#${ut}`),h.closeButtonEl=i.shadowRoot.querySelector(".picsel-close-button"),h.contentEl=i.shadowRoot.querySelector(".picsel-panel-content"),h.panelTitleEl=i.shadowRoot.querySelector(".picsel-panel-title"))),h.mounted=!0;return}h.hostElement=document.createElement("div"),h.hostElement.id=lt,h.hostElement.style.position="fixed",h.hostElement.style.bottom="24px",h.hostElement.style.right="24px",h.hostElement.style.zIndex=String(2147483647),h.shadowRoot=h.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=Jn,h.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",h.shadowRoot.appendChild(e),h.toggleButton=document.createElement("button"),h.toggleButton.className="picsel-toggle-button",h.toggleButton.type="button",h.toggleButton.setAttribute("aria-expanded","false"),h.buttonLabelEl=document.createElement("span"),h.buttonLabelEl.className="picsel-toggle-label",h.buttonLabelEl.textContent="PicSel 혜택 보기",h.toggleButton.appendChild(h.buttonLabelEl),h.buttonBadgeEl=document.createElement("span"),h.buttonBadgeEl.className="picsel-toggle-badge",h.toggleButton.appendChild(h.buttonBadgeEl),e.appendChild(h.toggleButton),h.panelEl=document.createElement("div"),h.panelEl.className="picsel-panel",h.panelEl.id=ut,h.panelEl.setAttribute("role","dialog"),h.panelEl.setAttribute("aria-hidden","true"),h.toggleButton.setAttribute("aria-controls",ut);const n=document.createElement("div");n.className="picsel-panel-header",h.panelTitleEl=document.createElement("div"),h.panelTitleEl.className="picsel-panel-title",h.panelTitleEl.textContent="PicSel 혜택 정보",h.closeButtonEl=document.createElement("button"),h.closeButtonEl.type="button",h.closeButtonEl.className="picsel-close-button",h.closeButtonEl.setAttribute("aria-label","닫기"),h.closeButtonEl.textContent="✕",n.appendChild(h.panelTitleEl),n.appendChild(h.closeButtonEl),h.panelEl.appendChild(n),h.contentEl=document.createElement("div"),h.contentEl.className="picsel-panel-content",h.panelEl.appendChild(h.contentEl),e.appendChild(h.panelEl);const r=h.panelEl,o=h.hostElement;h.toggleButton.addEventListener("click",()=>{const i=!r.classList.contains("open");xe(i)}),h.closeButtonEl.addEventListener("click",()=>{xe(!1)}),window.addEventListener("keydown",i=>{i.key==="Escape"&&xe(!1)}),document.addEventListener("click",i=>{if(!r.classList.contains("open"))return;const c=i.composedPath();o&&!c.includes(o)&&xe(!1)},!0),document.body.appendChild(h.hostElement),h.mounted=!0},gn=()=>{if(h.panelTitleEl&&h.cachedData?.site){const t=tr(h.cachedData.site);h.panelTitleEl.textContent=`${t} 혜택 정보`}},hn=t=>{h.cachedData={...t},Ir(),gn(),be(),xe(!1)},bn=t=>{if(h.cachedData={...h.cachedData??{},...t},!h.mounted){hn(h.cachedData);return}gn(),be()},v=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},xn=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},Dr=t=>t.includes("원")||t.includes("KRW")?"KRW":t.includes("$")||t.includes("USD")?"USD":t.includes("€")||t.includes("EUR")?"EUR":t.includes("¥")||t.includes("JPY")?"JPY":"KRW",Ct=t=>typeof t=="number"&&t>100&&t<1e8,ae=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},_t=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","BC","NH"];for(const n of e)if(t.includes(n))return n;return t.replace(/카드$/g,"")};class Ee{extractNumber(e){return v(e)}extractCurrency(e){return Dr(e)}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){oe.error(w.PAR_E004,`Selector error: ${r}`,{data:{siteName:this.siteName,selector:r},error:o instanceof Error?o:void 0})}return null}isValidPrice(e){return Ct(e)}searchPriceInDOM(e,n){const r=e.querySelectorAll('[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]');for(const l of r){const f=(l.textContent||"").match(n);if(f)return oe.debug("Found price in container",{siteName:this.siteName,price:f[0]}),f[0]}const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i,c=0;const s=1e3;for(;(i=o.nextNode())&&c<s;){c++;const u=(i.textContent||"").match(n);if(u)return oe.debug("Found price via TreeWalker",{siteName:this.siteName,price:u[0],nodesScanned:c}),u[0]}return c>=s&&oe.warn("TreeWalker hit node limit",{siteName:this.siteName,limit:s}),null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const Y={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",".deal-price",".special-price",".discount-price strong",'[class*="sale"] strong','[class*="discount"] strong','div[class*="price"] > strong','span[class*="price"] > strong','[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]',".deal-title",".special-title",'h1[class*="product"]','h1[class*="title"]',"h1"],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},Or=t=>{for(const e of Y.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Mr=t=>{try{const e=t.querySelector(Y.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r=`https:${r}`),r=r.split("?")[0],r}const n=t.querySelector(Y.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o=`https:${o}`),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return d.error(w.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},Lr=t=>{try{const e=[],n=new Set,r=t.querySelector(Y.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let s=i.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s=`https:${s}`),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return d.error(w.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},sn=t=>t>=100&&t<=1e8,Br=t=>{let e=null,n=null,r=null;for(const o of Y.amount)try{const i=t.querySelector(o);if(!i||!i.textContent)continue;const c=i.textContent.trim();if(!/[\d,]+\s*원?/.test(c)&&!/^\d{1,3}(,\d{3})*$/.test(c.replace(/[^\d,]/g,"")))continue;const s=v(c);if(!s||!sn(s))continue;if(d.debug(`Found via selector "${o}"`,{value:s}),/final|discount|final-price|deal|sale|coupon/i.test(o)){r=s,e=s;break}n||(n=s),e||(e=s)}catch(i){d.debug(`Selector ${o} failed`,{error:i})}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of o){const s=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s){const l=v(s[1]);if(l&&sn(l)){d.debug("Found via regex in element",{value:l}),e=l;break}}}}return{amount:e,originalPrice:n,discountPrice:r}},Ur=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const i of e){const c=o.match(i);if(c&&c[1]){const s=v(c[1]);if(s)return d.debug("Found price via text walker",{value:s}),s}}}return null},zr=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),i=(r.getAttribute("data-price")||"").trim(),s=`${o} ${i}`.trim().match(n);if(s&&s[1]){const l=v(s[1]);if(l)return d.debug("Found price by element scan",{value:l}),l}}}catch(e){d.debug("findPriceByElementScan error",{error:e})}return null},Fr={신한:"assets/card/shinhanCard.svg",우리:"assets/card/wooriCard.svg",BC:"assets/card/bcCard.svg",비씨:"assets/card/bcCard.svg",롯데:"assets/card/lotteCard.svg",KB:"assets/card/kbCard.svg",국민:"assets/card/kbCard.svg",NH:"assets/card/nhCard",농협:"assets/card/hanaCard.svg",삼성:"assets/card/samsungCard.svg",하나:"assets/card/hanaCard.svg",현대:"assets/card/hyundaiCard.svg",비자:"assets/card/visaCard.svg",마스터:"assets/card/masterCard.svg"},qr=t=>{const e=_t(ae(t)),n=Fr[e];if(!n)return null;try{return chrome.runtime.getURL(n)}catch{return null}},$e=t=>{for(const[e,n]of Object.entries(Yn))if(t.includes(e))return n;return null},$r=t=>{const e=[],n=Y.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(!s)return;let u=l.trim();u||(u=$e(s)||""),u&&!u.includes("카드")&&(u=`${u}카드`),s&&u&&(e.some(f=>f.cardName===u)||(e.push({src:s,alt:l,cardName:u}),d.debug("카드 이미지 발견",{cardName:u,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(c=>{const s=c,l=s.src,u=s.alt||"";if(!l||(s.width||s.naturalWidth)>100)return;let p=u.trim();p||(p=$e(l)||""),p&&!p.includes("카드")&&(p=`${p}카드`),l&&p&&!e.some(b=>b.cardName===p)&&e.push({src:l,alt:u,cardName:p})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(!s||(c.width||c.naturalWidth)>100)return;let f=l.trim();f||(f=$e(s)||""),f&&!f.includes("카드")&&(f=`${f}카드`),s&&f&&!e.some(p=>p.cardName===f)&&e.push({src:s,alt:l,cardName:f})}),d.debug("추출된 카드 이미지 총",{count:e.length}),e},Wr=t=>{const e=[],n=Y.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return d.debug("카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const c=o.contentDocument||o.contentWindow?.document;if(c)return Hr(c)}catch{d.warn("iframe 접근 불가 (cross-origin)")}const i=r.querySelector(n.content);return i?Gr(i):e},Hr=t=>{const e=[],n=Y.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const i=o.querySelector(n.cardName),c=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),l=i?.textContent?.trim()||"",u=c?.textContent?.trim()||"",f=s?.textContent?.trim()||o.textContent?.trim()||"";if(l){const p=xn(u||f)??void 0;e.push({card:l,cardName:l,benefit:f||u||"혜택 제공",discount:p,rate:p})}}),e},Gr=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let i;for(;(i=o.exec(n))!==null;){const c=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);e.some(l=>l.card===c)||e.push({card:c,cardName:c,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},Kr=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",i=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const c=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);if(!e.some(l=>l.card===c)){let l=`최대 ${s}% 할인/적립`;const u=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);u&&(l=`최대 ${s}% ${u[0]}`),e.push({card:c,cardName:c,benefit:l,discount:s,rate:s})}}}),e},jr=t=>{let e=[];const n=$r(t),r=Wr(t);if(r.length>0&&(d.info("팝업에서 카드 혜택 파싱",{count:r.length}),e=r),Kr(t).forEach(i=>{e.some(c=>c.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(Y.benefitBadge);if(i){const c=i.querySelectorAll("img.benefit-ico"),s=[],l=[];c.forEach(p=>{const b=p.getAttribute("src");if(b){const _=$e(b);_&&(s.push(_),l.push(b))}});const u=i.querySelector(".benefit-label")?.textContent?.trim(),f=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(u){const p=xn(u),b=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드",_=p??void 0;e.push({card:b,cardName:b,benefit:`${u}${f?` (${f})`:""}`,discount:_,rate:_,imageUrl:l[0]})}}}return e=e.map((i,c)=>{if(!i.imageUrl){const s=i.cardName||i.card||"",l=_t(ae(s));let u=n.find(f=>{const p=ae(f.cardName),b=ae(s);return p===b});if(u||(u=n.find(f=>{const p=ae(f.cardName).replace("카드",""),b=ae(s).replace("카드","");return p.includes(b)||b.includes(p)})),u||(u=n.find(f=>_t(ae(f.cardName))===l)),!u&&c<n.length&&(u=n[c],d.debug("인덱스 기반 매칭",{cardName:s,matchedCardName:u.cardName})),!u){const f=qr(s);if(f)return d.debug("로컬 아이콘 폴백 사용",{cardName:s,benefitKey:l}),{...i,imageUrl:f}}if(u)return{...i,imageUrl:u.src}}return i}),e.sort((i,c)=>(c.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{benefits:e}),e},Yr=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const c=i.match(/(\d+)\s*%/);if(c)return{rate:parseInt(c[1],10),description:i.trim()}}}return null},Vr=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",c=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c&&i.includes("쿠팡캐시")){const s=v(c[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=v(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},Xr=t=>{try{const e=[],n=new Set,r=t.querySelector(Y.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const c=i.querySelectorAll("div");if(c.length<2)continue;let s="";for(const p of c){const b=p.textContent||"";if(!b.includes("원")&&b.trim().length>0&&!b.includes("px")){s=b.trim();break}}let l="";for(const p of c){const _=(p.textContent||"").match(/[\d,]+원/);if(_){l=_[0].replace(/[,원]/g,"");break}}if(!l)continue;const u=parseInt(l);if(!u||u<100||!s||s.length<2)continue;const f=`${s}-${u}`;if(n.has(f))continue;if(e.push({name:s,price:u}),n.add(f),e.length>=15)break}catch(c){d.warn("Error parsing list item",{error:c});continue}return e}catch(e){return d.error(w.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},Zr=t=>t.querySelector(Y.shipping)?.textContent?.trim()||null,Jr=(t,e)=>{if(!Ct(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let r=Math.round(t*(n/100));return e.maxDiscount&&r>e.maxDiscount&&(r=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:r},Qr=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},yn=(t,e)=>t.map(r=>{const o=Qr(r);return e&&Ct(e)&&(o.discountAmount=Jr(e,o)),o}).sort((r,o)=>r.discountAmount!==void 0&&o.discountAmount!==void 0?o.discountAmount-r.discountAmount:(o.rate??0)-(r.rate??0)),En=t=>{const e=new Map;for(const n of t){const r=eo(n.cardName||n.card),o=e.get(r);if(!o)e.set(r,n);else{const i=o.rate??o.discount??0;(n.rate??n.discount??0)>i&&e.set(r,n)}}return Array.from(e.values())},eo=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","NH","BC","비씨","스마일"],n=t.toLowerCase();for(const r of e)if(n.includes(r.toLowerCase()))return r;return t};class _n extends Ee{siteName="Coupang";selectors={amount:Y.amount};static isCheckoutPage(e){if(!/coupang\.com/.test(e))return!1;const o=![/coupang\.com\/?$/,/shop\.coupang\.com/,/coupang\.com\/np\/categories/,/coupang\.com\/np\/search/,/coupang\.com\/np\/campaigns/,/coupang\.com\/np\/cart/,/coupang\.com\/np\/checkout/,/coupang\.com\/my\//,/coupang\.com\/np\/login/,/coupang\.com\/np\/register/].some(i=>i.test(e));return d.debug(`isCheckoutPage("${e}") = ${o}`),o}parse(e){try{d.info("🔍 Parsing Coupang page...");const n=Or(e),r=Mr(e),o=Lr(e),i=Br(e);let c=i.amount;const{originalPrice:s,discountPrice:l}=i;if(c||(c=Ur(e)),c||(c=zr(e)),!c)return d.debug("❌ No price found"),null;const u=jr(e),f=yn(u,c),p=En(f),b=Yr(e),_=Vr(e),m=Zr(e),y=Xr(e);return d.info(`✅ Found: ${c} KRW, Cards: ${p.length}`),{price:c,amount:c,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:y,originalPrice:s||void 0,discountPrice:l||void 0,cardBenefits:p,giftCardDiscount:b||void 0,cashback:_||void 0,shippingInfo:m||void 0,discounts:[]}}catch(n){return d.error(w.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const L={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",salePriceAlt2:".c_product_price .price .value",salePriceAlt3:'[class*="price"] .value',discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price",dealPrice:'.deal_price .value, [class*="deal"] .price',specialPrice:".special_price .value"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",titleAlt2:'h1[class*="title"]',titleAlt3:"h1.product_name",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},bt={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},to=t=>{const e=L.product;try{const n=t.querySelector(e.title);if(n?.textContent){const o=n.textContent.trim();return d.debug("제목 추출",{title:o}),o}const r=t.querySelector(e.titleAlt);if(r?.textContent){const o=r.textContent.trim();return d.debug("제목 추출 (alt)",{title:o}),o}}catch(n){d.error(w.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},no=t=>{try{const e=t.querySelector(L.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return d.debug("부제목 추출",{subtitle:n}),n}}catch(e){d.error(w.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},ro=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const r=t.match(n);if(r?.[1])return d.debug("상품ID 추출",{productId:r[1]}),r[1]}}catch(e){d.error(w.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},Cn=t=>{const e=L.image;try{const n=t.querySelector(e.main);if(n?.src){const i=ke(n.src);return d.debug("메인 이미지 추출",{src:i}),i}const r=t.querySelector(e.mainAlt);if(r?.src){const i=ke(r.src);return d.debug("메인 이미지 추출 (alt)",{src:i}),i}const o=t.querySelector(`${e.main}[data-src]`);if(o?.dataset?.src){const i=ke(o.dataset.src);return d.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){d.error(w.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},oo=t=>{const e=[],n=new Set,r=L.image;try{const o=Cn(t);o&&(e.push(o),n.add(o)),t.querySelectorAll(r.thumbnail).forEach(s=>{const l=s,u=l.src||l.dataset?.src;if(u){const f=ke(u),p=cn(f);n.has(p)||(e.push(p),n.add(p))}}),t.querySelectorAll(r.thumbnailAlt).forEach(s=>{const l=s,u=l.src||l.dataset?.src;if(u){const f=ke(u),p=cn(f);n.has(p)||(e.push(p),n.add(p))}}),d.debug("전체 이미지 추출",{count:e.length})}catch(o){d.error(w.PAR_E001,"전체 이미지 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},io=t=>{const e=L.seller,n={seller:null,rating:null};try{const r=t.querySelector(e.name);r?.textContent&&(n.seller=r.textContent.trim(),d.debug("판매자 추출",{seller:n.seller}));const o=t.querySelector(e.rating);o?.textContent&&(n.rating=o.textContent.trim(),d.debug("판매자 등급 추출",{rating:n.rating}))}catch(r){d.error(w.PAR_E001,"판매자 정보 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return n};function ke(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function cn(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const so=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=L.price;try{const r=t.querySelector(n.originalPrice);r?.textContent&&(e.originalPrice=v(r.textContent),d.debug("정가",{price:e.originalPrice}));const o=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);o?.textContent&&(e.discountPrice=v(o.textContent),e.amount=e.discountPrice,d.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=v(i.textContent),d.debug("할인율",{rate:e.discountRate}));const c=t.querySelector(n.maxDiscountPrice);c?.textContent&&(e.maxDiscountPrice=v(c.textContent),d.debug("최대할인가",{price:e.maxDiscountPrice}));const s=t.querySelector(n.maxDiscountRate);s?.textContent&&(e.maxDiscountRate=v(s.textContent),d.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(r){d.error(w.PAR_E002,"가격 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},co=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const r of n){const o=r.textContent||"";for(const i of e){const c=o.match(i);if(c?.[1]){const s=v(c[1]);if(s&&s>100&&s<1e8)return d.debug("가격 발견",{value:s}),s}}}return null},ao=t=>{const e=[],n=L.price;try{const r=t.querySelector(n.maxDiscountLayer);if(!r)return e;r.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const c=i.querySelector(".title"),s=i.querySelector(".price");if(c&&s){const l=c.textContent?.trim()||"",u=s.textContent?.trim()||"",f=v(u.replace("-",""));l&&f&&l!=="판매가"&&(e.push({type:l,amount:f}),d.debug("DiscountDetail",{type:l,amount:f}))}})}catch(r){d.error(w.PAR_E002,"DiscountDetail 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},lo=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=uo(t),e.totalPointAmount=e.points.reduce((n,r)=>n+r.amount,0),e.cardBenefits=po(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,r)=>n+r.benefitAmount,0),e.installments=go(t),e.maxInstallmentMonths=e.installments.reduce((n,r)=>Math.max(n,r.maxMonths),0),e.coupons=xo(t),d.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){d.error(w.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},uo=t=>{const e=[],n=L.pointDetail;try{const r=t.querySelector(n.container);if(r){const o=r.querySelector(n.totalPoint);if(o?.textContent){const c=v(o.textContent);c&&(e.push({amount:c,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),d.debug("최대 적립 포인트",{amount:c}))}const i=r.querySelector(n.elevenPaySection);if(i){const c=i.querySelector(".total .value");if(c?.textContent){const l=v(c.textContent);l&&!e.find(u=>u.amount===l&&u.type==="최대적립포인트")&&(e.push({amount:l,type:"11pay포인트",description:"11pay 결제 시 적립"}),d.debug("11pay 포인트 총액",{amount:l}))}i.querySelectorAll(".desc li").forEach(l=>{const u=l.querySelector(".c_layer_expand button.c_product_btn"),f=l.querySelector(".value");if(u&&f){const p=u.textContent?.trim()||"",b=v(f.textContent||"");b&&p&&!p.includes("카드")&&(e.push({amount:b,type:p,description:p}),d.debug("포인트 항목",{type:p,amount:b}))}})}}if(e.length===0){const o=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(o?.textContent){const i=v(o.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),d.debug("기본 포인트",{amount:i}))}}}catch(r){d.error(w.PAR_E003,"포인트 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},po=t=>{const e=[],n=L.cardDiscount;try{const r=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let o=null;for(const c of r)if(o=t.querySelector(c),o){d.debug("카드 혜택 컨테이너 찾음",{selector:c});break}if(d.debug("other_benefits 컨테이너",{found:!!o}),o){const c=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let s=null;for(const l of c)if(s=o.querySelectorAll(l),s.length>0){d.debug("benefit 블록 찾음",{selector:l,count:s.length});break}if(d.debug("benefit 블록 수",{count:s?.length||0}),!s||s.length===0){const l=o.querySelector("dl");if(d.debug("dl 요소",{found:!!l}),l){const u=l.children;d.debug("dl children",{count:u.length})}}s&&s.length>0&&s.forEach(l=>{const f=l.querySelector("dt")?.textContent?.trim()||"";if(d.debug("메인 타이틀",{mainTitle:f}),!f)return;const p=fo(f);p&&p.benefitAmount>0&&(e.push(p),d.debug("메인 혜택 추가",{mainParsed:p}));const b=l.querySelector("dd");if(b){const _=b.querySelectorAll(".tit_sub");d.debug("서브타이틀 수",{count:_.length}),_.forEach(m=>{const y=m.textContent?.trim()||"";if(d.debug("서브타이틀",{subTitle:y}),y.includes("안내사항")||y.includes("적립제외"))return;let C=m.nextElementSibling;for(;C&&C.tagName!=="UL"&&C.tagName!=="SPAN";)C=C.nextElementSibling;if(C&&C.tagName==="UL"){const T=C.querySelectorAll("li");d.debug("리스트 아이템 수",{count:T.length}),T.forEach(q=>{const O=q.textContent?.trim()||"";d.debug("아이템",{itemText:O});const A=mo(y,O);A&&(e.find(X=>X.cardName===A.cardName&&X.benefitType===A.benefitType&&X.benefitAmount===A.benefitAmount)||(e.push(A),d.debug("서브 혜택 추가",{subBenefit:A})))})}})}})}else d.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(s=>{const l=s.textContent?.trim()||"";if(l.includes("카드")||l.includes("신한")){const f=s.closest("li")?.querySelector(".value")?.textContent?.trim()||"",p=v(f);if(p){const b=l.replace(" 결제 시","").trim();e.find(_=>_.cardName===b&&_.benefitType==="포인트")||e.push({cardName:b,benefitAmount:p,benefitType:"포인트",condition:"결제 시"})}}}),d.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(r){d.error(w.PAR_E003,"카드 혜택 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function fo(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const l of e){const u=t.match(l);if(u){n=u[1];break}}if(!n)return null;let r=0,o="",i="";const c=t.match(/최대\s*(\d+)%\s*적립/);c&&(r=parseInt(c[1],10),o="적립",i="결제 시");const s=t.match(/([\d,]+)원\s*할인/);return s&&(r=v(s[1])||0,o="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:r,benefitType:o||(t.includes("할인")?"할인":"적립"),condition:i}}function mo(t,e){if(!e)return null;let n="",r=0,o="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const c=e.match(/([\d,]+)원\s*할인/);c&&(r=v(c[1])||0,o="할인");const s=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return s&&!o&&(r=parseFloat(s[1]),o="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!r||!o?null:{cardName:n,benefitAmount:r,benefitType:o,condition:i}}const go=t=>{const e=[],n=L.installment;try{const r=t.querySelector(n.dialogContainer);if(r&&(r.querySelectorAll(".card_box").forEach(i=>{const s=i.querySelector("dt")?.textContent?.trim()||"";if(!s)return;i.querySelectorAll("dd").forEach(u=>{const f=u.textContent?.trim()||"";if(!f)return;const p=ho(s,f);p&&e.push(p)})}),d.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const o=t.querySelector(n.triggerButton);if(o){const s=(o.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);s&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"})}bo(t).forEach(c=>{e.find(s=>s.cardName===c.cardName)||e.push(c)})}d.info("총 무이자 할부 카드",{count:e.length})}catch(r){d.error(w.PAR_E003,"무이자 할부 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function ho(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const r=n[1],i=r.split(",").map(f=>parseInt(f.trim(),10)).filter(f=>!isNaN(f)),c=i.length>0?Math.max(...i):0;if(c===0)return null;let s=null;const l=e.match(/(\d+)만원/);l&&(s=parseInt(l[1],10)*1e4);let u="";return e.includes("11pay")?u="11pay 결제 시":e.includes("카카오페이")?u="카카오페이 결제 시":s&&(u=`${s/1e4}만원 이상`),{cardName:t,maxMonths:c,minAmount:s,months:`${r}개월`,condition:u}}function bo(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(o=>{const i=o.textContent||"",c=i.match(/최대\s*(\d+)\s*개월\s*무이자/);c&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"}),n.forEach(s=>{if(i.includes(s)){const u=i.substring(i.indexOf(s)).match(/([\d,]+)개월/);if(u&&!e.find(p=>p.cardName.includes(s))){const p=u[1],b=p.split(",").map(m=>parseInt(m.trim(),10)),_=Math.max(...b.filter(m=>!isNaN(m)));e.push({cardName:`${s}카드`,maxMonths:_,minAmount:null,months:`${p}개월`,condition:""})}}})}),e}const xo=t=>{const e=[],n=L.coupon;try{const r=t.querySelector(n.badge);if(r?.textContent){const i=r.textContent.trim(),c=yo(i);c&&(e.push(c),d.debug("쿠폰 추출",{coupon:c}))}t.querySelectorAll(n.item).forEach(i=>{const c=i.querySelector(n.name),s=i.querySelector(n.discount);if(c||s){const l=c?.textContent?.trim()||"쿠폰",u=s?.textContent||"",f=u.includes("원")?v(u):null,p=u.includes("%")?v(u):null;e.push({name:l,discountAmount:f,discountRate:p})}})}catch(r){d.error(w.PAR_E003,"쿠폰 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function yo(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:v(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function an(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:r,name:o}of n)for(const i of r)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${o} (신용)`:e.includes("체크카드")?`${o} (체크)`:o;return e||t}function Eo(t,e){const n=t.map(r=>{const o=an(r.cardName),i=r.benefitType==="할인",c=r.benefitAmount<=100?r.benefitAmount:0;let s="";return i?s=`${r.benefitAmount.toLocaleString()}원 할인`:r.benefitAmount<=100?s=`${r.benefitAmount}% 적립`:s=`${r.benefitAmount.toLocaleString()}P 적립`,{card:o,cardName:o,benefit:s,discount:i?r.benefitAmount:0,rate:c,condition:r.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(r=>{if(r.cardName==="__INSTALLMENT_SUMMARY__")return;const o=an(r.cardName);n.push({card:o,cardName:o,benefit:`${r.months} 무이자`,discount:0,rate:0,condition:r.condition,benefitType:"installment",pointAmount:0})}),n}class Sn extends Ee{siteName=bt.siteName;selectors={amount:[L.price.salePrice,L.price.salePriceAlt,L.price.maxDiscountPrice],title:[L.product.title,L.product.titleAlt],image:[L.image.main,L.image.mainAlt]};static isProductPage(e){if(!/11st\.co\.kr/.test(e))return!1;const o=![/11st\.co\.kr\/?$/,/11st\.co\.kr\/category/,/11st\.co\.kr\/search/,/11st\.co\.kr\/browsing/,/11st\.co\.kr\/best/,/11st\.co\.kr\/event$/,/11st\.co\.kr\/cart/,/11st\.co\.kr\/order/,/11st\.co\.kr\/my11st/,/11st\.co\.kr\/login/,/11st\.co\.kr\/member/].some(i=>i.test(e));return d.debug(`isProductPage("${e}") = ${o}`),o}static extractProductId(e){return ro(e)}parse(e){try{d.info("🔍 Parsing 11번가 page...");const n=to(e),r=no(e),o=Cn(e),i=oo(e),c=io(e),s=so(e);let l=s.amount;const{originalPrice:u,discountPrice:f,maxDiscountPrice:p,discountRate:b,maxDiscountRate:_}=s;if(l||(l=co(e)),!l)return d.debug("❌ No price found"),null;const m=ao(e),y=lo(e),{points:C,cardBenefits:T,installments:q,coupons:O,totalPointAmount:A,totalCardBenefitAmount:ie,maxInstallmentMonths:X}=y,Ke=Eo(T,q),_e=[];return b&&_e.push({rate:b,type:"SALE_DISCOUNT",description:"할인가"}),m.forEach(Ce=>{_e.push({rate:Ce.amount,type:Ce.type.toUpperCase().replace(/\s+/g,"_"),description:Ce.type})}),d.info(`✅ Found: ${l.toLocaleString()} ${bt.currency}`),d.debug("파싱 결과",{title:n,totalPointAmount:A,cardBenefitsCount:T.length,installmentsCount:q.length,maxInstallmentMonths:X}),{price:l,amount:l,currency:bt.currency,title:n?`${n}${r?` ${r}`:""}`:void 0,imageUrl:o||void 0,images:i,originalPrice:u||void 0,discountPrice:f||p||void 0,discountRate:b||void 0,cardBenefits:Ke,discounts:_e,elevenst:{maxDiscountPrice:p,maxDiscountRate:_,maxInstallmentMonths:X,points:C,installments:q,coupons:O,totalPointAmount:A,totalCardBenefitAmount:ie,seller:c.seller,sellerRating:c.rating,discountDetails:m}}}catch(n){return d.error(w.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const z={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},_o=t=>{const e=t.querySelector(z.product.title);if(e?.textContent){const n=e.textContent.trim();return d.debug("상품명",{title:n}),n}return d.warn("상품명을 찾을 수 없음"),null},Co=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const r of e){const i=r.src;if(i.includes("/still/600"))return d.debug("메인 이미지 (600px)",{src:i}),i}for(const r of e){const i=r.src;if(i.includes("/still/"))return d.debug("메인 이미지",{src:i}),i}const n=t.querySelector(z.product.mainImage);return n?.src?(d.debug("대체 이미지",{src:n.src}),n.src):(d.warn("상품 이미지를 찾을 수 없음"),null)},So=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(r=>{let i=r.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),d.debug("총 이미지",{count:e.length}),e},Ao=t=>{const e={},n=t.querySelector(z.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const r=t.querySelector(z.seller.official);e.isOfficial=!!r;const o=t.querySelector(z.seller.seller);return o?.textContent&&(e.seller=o.textContent.trim()),e},We=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return v(e)},To=t=>{const e=z.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const o=We(n.textContent);if(o)return d.debug("결제할인가",{price:o}),o}const r=t.querySelector(e.discountPriceAlt);if(r?.textContent){const o=We(r.textContent);if(o)return d.debug("결제할인가 (alt)",{price:o}),o}return null},wo=t=>{const e=z.price,n=t.querySelector(e.salePrice);if(n?.textContent){const r=We(n.textContent);if(r)return d.debug("판매가",{price:r}),r}return null},vo=t=>{const e=z.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const r=We(n.textContent);if(r)return d.debug("정가",{price:r}),r}return null},Po=t=>{const e=z.price,n=t.querySelector(e.discountRate);if(n?.textContent){const r=n.textContent.match(/(\d+)\s*%/);if(r){const o=parseInt(r[1],10);return d.debug("할인율",{rate:o}),o}}return null},No=t=>{d.debug("가격 정보 추출 시작...");const e=vo(t),n=wo(t),r=To(t),o=Po(t),i=r||n||e;return d.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}),{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}},Ro=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const r=n.textContent||"";if(r.includes("원")){const o=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(o){const i=v(o[1]);if(i&&i>=1e3)return d.debug("DOM 스캔 가격",{price:i}),i}}}return null},ko=t=>{const e=[],n=z.cardBenefit,r=t.querySelector(n.container);return r?(r.querySelectorAll(".gmarketcard_area img").forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(s){let u=l;u||(s.includes("smile")||s.includes("Smile")?u="스마일카드":s.includes("samsung")?u="삼성카드":u="G마켓 제휴카드"),e.push({card:u,cardName:u,benefit:"G마켓 제휴카드 혜택",imageUrl:s}),d.debug("제휴카드",{cardName:u,src:s})}}),e):(d.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},Io=t=>{const e=[],n=z.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(o=>{const i=o.querySelector(n.discountItemTitle),c=o.querySelector(n.discountItemDesc),s=o.querySelector(n.discountItemPrice),l=i?.textContent?.trim()||"",u=c?.textContent?.trim()||"";let f;if(s?.textContent){const p=s.textContent.match(/(\d{1,3}(?:,\d{3})*)/);p&&(f=parseInt(p[1].replace(/,/g,""),10))}l&&(e.push({title:l,description:u,discountPrice:f}),d.debug("결제 할인",{title:l,description:u}))}),e},Do=t=>{d.debug("카드 혜택 추출 시작...");const e=[],n=ko(t);e.push(...n),Io(t).forEach(i=>{const c=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(c){const s=c[1].includes("카드")?c[1]:`${c[1]}카드`,l=i.title.match(/(\d+(?:\.\d+)?)\s*%/),u=l?parseFloat(l[1]):void 0;e.some(f=>f.cardName===s)||e.push({card:s,cardName:s,benefit:i.title,discount:u,rate:u})}});const o=t.querySelector(".box__payment-discount");if(o){const c=(o.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(c){const s=parseInt(c[1],10);e.some(l=>l.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${s}% 할인`,discount:s,rate:s})}}return e.sort((i,c)=>(c.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},Oo=t=>{const e=z.additionalBenefits,r=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!r)return null;let o="etc";r.includes("신세계포인트")?o="shinsegae_point":r.includes("스마일페이")?o="smile_pay":r.includes("스마일캐시")?o="smile_cash":r.includes("OK캐쉬백")&&(o="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(s=>{const l=s.querySelector(e.benefitLabel),u=s.querySelector(e.benefitValue),f=l?.textContent?.trim()||"",p=u?.textContent?.trim()||"";f&&p&&i.push({label:f,value:p})}),d.debug("추가 혜택",{type:o,title:r}),{type:o,title:r,details:i}},An=t=>{d.debug("추가 혜택 추출 시작...");const e=[],n=z.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(o=>{const i=Oo(o);i&&e.push(i)}),d.debug("총 추가 혜택",{count:e.length}),e},Mo=t=>{const e=An(t);for(const n of e)for(const r of n.details){const o=r.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(o)return{amount:parseInt(o[1].replace(/,/g,""),10),description:`${n.title}: ${r.value}`}}return null},Lo=t=>{const e=z.shipping,r=!!t.querySelector(e.starDelivery),o=t.querySelector(e.shippingInfo),i=r?"스타배송":"일반배송";let c,s,l=!1;if(o){const u=o.textContent||"",f=u.match(/(\d{1,3}(?:,\d{3})*)\s*원/);f?c=`${f[1]}원`:u.includes("무료")&&(c="무료배송",l=!0);const p=u.match(/(\d+\/\d+|\d+일)/);p&&(s=p[1])}return d.debug("배송 정보",{method:i,isStarDelivery:r,fee:c}),{method:i,isStarDelivery:r,isFree:l,fee:c,estimatedDate:s}};class Tn extends Ee{siteName="Gmarket";selectors={amount:[z.price.discountPrice,z.price.salePrice,z.price.originalPrice]};static isCheckoutPage(e){if(!/gmarket\.co\.kr/.test(e))return!1;const o=![/gmarket\.co\.kr\/?$/,/gmarket\.co\.kr\/n\/category/,/gmarket\.co\.kr\/n\/search/,/gmarket\.co\.kr\/n\/best$/,/gmarket\.co\.kr\/n\/deals$/,/gmarket\.co\.kr\/n\/event$/,/gmarket\.co\.kr\/cart/,/gmarket\.co\.kr\/order/,/gmarket\.co\.kr\/my/,/gmarket\.co\.kr\/login/,/gmarket\.co\.kr\/join/].some(i=>i.test(e));return oe.debug("isCheckoutPage check",{url:e,isCheckout:o}),o}parse(e){try{oe.info("Parsing Gmarket page...");const n=_o(e),r=Co(e),o=So(e),i=Ao(e),c=No(e);let s=c.amount;if(s||(s=Ro(e)),!s)return oe.warn("No price found in Gmarket page"),null;const l=Do(e),u=yn(l,s),f=En(u),p=An(e),b=Mo(e),_=Lo(e);return oe.info("Parse successful",{amount:s,cardCount:f.length}),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:[],originalPrice:c.originalPrice||void 0,discountPrice:c.discountPrice||void 0,cardBenefits:f,additionalBenefits:p.length>0?p:void 0,cashback:b||void 0,shippingInfo:_||void 0,sellerInfo:i||void 0,discounts:[]}}catch(n){return oe.error(w.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Bo={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class wn extends Ee{siteName="Amazon";selectors={amount:Bo.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{d.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(w.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Uo={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class vn extends Ee{siteName="eBay";selectors={amount:Uo.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{d.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(w.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const zo={amount:[]};class Pn extends Ee{siteName="Fallback";selectors={amount:zo.amount};parse(e){try{d.info("🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return d.debug('❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return d.debug("❌ Invalid amount",{amount:o}),null;const{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(w.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function Fo(t){return _n.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:Sn.isProductPage(t)?{site:"11st",isCheckout:!0}:Tn.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:wn.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:vn.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function qo(t){switch(t){case"coupang":return new _n;case"11st":return new Sn;case"gmarket":return new Tn;case"amazon":return new wn;case"ebay":return new vn;default:return new Pn}}function $o(){return new Pn}function Nn(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";if(!chrome?.runtime?.sendMessage){at.warn("Chrome extension API not available",{messageType:n,source:e});return}chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},r=>{if(chrome.runtime.lastError){at.warn("Failed to send message to background",{error:chrome.runtime.lastError.message,messageType:n,source:e});return}r?.success&&at.debug("Product data saved",{source:e,messageType:n})})}function Rn(t,e){let n=null;const r=(...o)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...o),n=null},e)};return r.cancel=()=>{n&&(clearTimeout(n),n=null)},r}const Wo=500;function Ho(t){let e=!1,n=null,r=!1;const o=Rn(s=>{r||(ee.info("Dynamic content detected",{reason:s}),t(`dynamic-${s}`)||ee.warn("Dynamic reparse produced no result"))},Wo),i=s=>{if(r)return;const l=s.some(_=>Array.from(_.addedNodes).some(m=>m instanceof Element?m.tagName==="IFRAME"||!!m.querySelector("iframe"):!1)),u=!e&&s.some(_=>Array.from(_.addedNodes).some(m=>m instanceof Element?m.classList.contains("benefit")||!!m.querySelector(".benefit")||m.closest(".other_benefits")&&(m.querySelector("dt")||m.querySelector("dd")):!1)),f=document.querySelector(".other_benefits .benefit dt");if(!(u&&f||l))return;u&&(e=!0),o(l?"iframe":"benefit-content"),l&&(c(),ee.debug("Observer disconnected after iframe detection"))},c=()=>{r||(r=!0,n&&(n.disconnect(),n=null),ee.debug("DynamicContentObserver cleaned up"))};return document.body?(n=new MutationObserver(i),n.observe(document.body,{childList:!0,subtree:!0}),c):(ee.warn("document.body not available, observer not started"),c)}const Go=500,Ko=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],jo=()=>!!document.querySelector(".other_benefits .benefit dt");function Yo(t){if(!window.location.hostname.includes("11st.co.kr"))return()=>{};ee.info("Setting up 11번가 benefit watcher");let e=!1,n=null,r=null;const o=new Map,i=Rn(u=>{e||jo()&&(ee.info("Benefit content found",{source:u}),t(u))},Go),c=new WeakSet,s=()=>{e||Ko.forEach(u=>{document.querySelectorAll(u).forEach(p=>{if(c.has(p))return;c.add(p);const b=()=>{ee.debug("Benefit button clicked"),setTimeout(()=>i("benefit-click"),800)};o.set(p,b),p.addEventListener("click",b)})})};s(),r=new MutationObserver(()=>{s()}),document.body&&r.observe(document.body,{childList:!0,subtree:!0}),n=setTimeout(()=>{r&&!e&&(r.disconnect(),r=null,ee.debug("Benefit button observer disconnected (timeout)"))},5e3);const l=()=>{e||(e=!0,n&&(clearTimeout(n),n=null),r&&(r.disconnect(),r=null),o.forEach((u,f)=>{f.removeEventListener("click",u)}),o.clear(),ee.debug("ElevenStreetBenefitWatcher cleaned up"))};return window.addEventListener("beforeunload",l,{once:!0}),l}const Vo=window.self===window.top;let ln=!1,le=null;const He=[];async function kn(t,e){try{if(R.info(k.NETWORK,"💰 [LOWEST_PRICE] Initiating price comparison",{url:t,product:e,timestamp:new Date().toISOString()}),!chrome?.runtime?.sendMessage){R.error(k.NETWORK,w.NET_E002,"Chrome extension API not available",{});return}R.debug(k.NETWORK,"[LOWEST_PRICE] Checking server health...");const n=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!n?.success){R.error(k.NETWORK,w.NET_E002,"[LOWEST_PRICE] Server not available",{error:n?.error||"Server check failed"});return}R.info(k.NETWORK,"[LOWEST_PRICE] Server healthy, sending comparison request");const r=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:e});r?.success?R.info(k.NETWORK,"✅ [LOWEST_PRICE] Price comparison completed",{resultCount:r.data?.results?.length||0,fromCache:r.data?.fromCache,totalDuration:r.data?.totalDuration}):R.warn(k.NETWORK,"[LOWEST_PRICE] Price comparison failed",{error:r?.error})}catch(n){R.error(k.NETWORK,w.NET_E002,"[LOWEST_PRICE] Request error",{error:n instanceof Error?n:new Error(String(n))})}}async function In(t=1500,e=!1){const n=Ge.persist;n&&(n.hasHydrated?.()&&!e||await new Promise(r=>{let o=!1;const i=window.setTimeout(()=>{o||(o=!0,r())},t),c=n.onFinishHydration?.(()=>{o||(o=!0,window.clearTimeout(i),c&&c(),r())});try{n.rehydrate?.()}catch{}}))}function Dn(){const t=window.location.href,e=Fo(t);if(!e)return R.debug(k.PARSER,"Not a supported page",{url:t}),null;R.info(k.PARSER,`Site detected: ${e.site}`,{url:t});let r=qo(e.site).parse(document);return!r&&(R.warn(k.PARSER,"Primary parser failed, trying fallback",{site:e.site}),r=$o().parse(document),!r)?(R.error(k.PARSER,w.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(R.info(k.PARSER,"Parse successful",{title:r.title?.substring(0,50),amount:r.amount,cardBenefitsCount:r.cardBenefits?.length??0}),{paymentInfo:r,site:e.site})}function St(t,e){return{...t,site:e}}function un(t){const e=Dn();return e?(le=e,bn(St(e.paymentInfo,e.site)),Nn(e.paymentInfo,t),!0):!1}function Xo(){const t=Dn();if(!t){R.warn(k.BOOTSTRAP,"Failed to extract payment info on init");return}le=t,hn(St(t.paymentInfo,t.site)),Nn(t.paymentInfo,"initial"),(async()=>{await In();const e=Ge.getState();if(R.info(k.BOOTSTRAP,"⚙️ Display mode check",{displayMode:e.displayMode,autoFetchLowestPrice:e.autoFetchLowestPrice,hasTitle:!!t.paymentInfo.title}),e.displayMode==="lowest-price"){if(!t.paymentInfo.title){R.warn(k.BOOTSTRAP,"⚠️ [LOWEST_PRICE] Cannot fetch: no product title");return}e.autoFetchLowestPrice?(R.info(k.BOOTSTRAP,"🚀 [LOWEST_PRICE] Auto fetch enabled",{displayMode:e.displayMode,productTitle:t.paymentInfo.title.substring(0,50)}),kn(window.location.href,t.paymentInfo.title)):R.info(k.BOOTSTRAP,"⏸️ [LOWEST_PRICE] Manual mode (will fetch when panel opens)",{displayMode:e.displayMode})}else R.debug(k.BOOTSTRAP,"💳 Card benefits mode selected")})()}function Zo(){He.forEach(t=>{try{t()}catch(e){R.warn(k.BOOTSTRAP,"Cleanup error",{error:e})}}),He.length=0}function Jo(){if(!Vo||ln)return;ln=!0,R.info(k.BOOTSTRAP,"Content script starting"),Xo(),chrome?.storage?.onChanged&&chrome.storage.onChanged.addListener((n,r)=>{r==="local"&&(!n||!Object.prototype.hasOwnProperty.call(n,Vn.SETTINGS)||(async()=>{await In(1500,!0);const o=Ge.getState();le&&bn(St(le.paymentInfo,le.site)),o.displayMode==="lowest-price"&&o.autoFetchLowestPrice&&le?.paymentInfo?.title&&kn(window.location.href,le.paymentInfo.title)})())});const t=Ho(n=>un(n));He.push(t);const e=Yo(n=>{un(n)});He.push(e),window.addEventListener("beforeunload",Zo,{once:!0})}Zn(Jo);
