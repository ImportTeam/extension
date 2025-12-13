import{b as jn,p as se,E as T,a as d,n as lt,d as ee,l as N,L as I}from"./assets/index-CtnQ7lw9.js";import{u as ke}from"./assets/store-SF67hG8t.js";import{C as Yn}from"./assets/constants-DOucEiR9.js";import{S as Vn}from"./assets/chromeStorage-BOBytA-p.js";const Xn=window.self===window.top;function Zn(t){if(!Xn){jn.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const Jn=`
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
`,de=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const a=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(a,o).format(i)},Qn=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),ut="picsel-toggle-host",dt="picsel-toggle-panel",er={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},tr=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return er[e]||String(t)},m={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null,comparison:{status:"idle",query:null,error:null,data:null}},nr=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const p=document.createElement("img");p.src=r,p.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(p)}else{const p=document.createElement("span");p.textContent="No Image",p.style.fontSize="11px",p.style.color="#64748b",n.appendChild(p)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const a=document.createElement("div");a.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,u=de(s,t.currency??"KRW");if(u){const p=document.createElement("div");p.className="picsel-final-price",p.textContent=u,a.appendChild(p)}const l=de(t.originalPrice,t.currency??"KRW"),f=Qn(t.originalPrice,s);if(l&&f){const p=document.createElement("div");p.className="picsel-original-price",p.textContent=l;const g=document.createElement("div");g.className="picsel-discount-tag",g.textContent=`-${f}%`,a.appendChild(p),a.appendChild(g)}if(o.appendChild(i),o.appendChild(a),t.shippingInfo){const p=document.createElement("div");p.className="picsel-shipping",p.textContent=`배송: ${t.shippingInfo}`,o.appendChild(p)}return e.appendChild(n),e.appendChild(o),e};const{entries:pn,setPrototypeOf:Xt,isFrozen:rr,getPrototypeOf:or,getOwnPropertyDescriptor:ir}=Object;let{freeze:W,seal:K,create:Et}=Object,{apply:_t,construct:Ct}=typeof Reflect<"u"&&Reflect;W||(W=function(e){return e});K||(K=function(e){return e});_t||(_t=function(e,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return e.apply(n,o)});Ct||(Ct=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new e(...r)});const Fe=H(Array.prototype.forEach),sr=H(Array.prototype.lastIndexOf),Zt=H(Array.prototype.pop),we=H(Array.prototype.push),cr=H(Array.prototype.splice),$e=H(String.prototype.toLowerCase),pt=H(String.prototype.toString),ft=H(String.prototype.match),ve=H(String.prototype.replace),ar=H(String.prototype.indexOf),lr=H(String.prototype.trim),Y=H(Object.prototype.hasOwnProperty),$=H(RegExp.prototype.test),Pe=ur(TypeError);function H(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return _t(t,e,r)}}function ur(t){return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Ct(t,n)}}function C(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:$e;Xt&&Xt(t,null);let r=e.length;for(;r--;){let o=e[r];if(typeof o=="string"){const i=n(o);i!==o&&(rr(e)||(e[r]=i),o=i)}t[o]=!0}return t}function dr(t){for(let e=0;e<t.length;e++)Y(t,e)||(t[e]=null);return t}function Q(t){const e=Et(null);for(const[n,r]of pn(t))Y(t,n)&&(Array.isArray(r)?e[n]=dr(r):r&&typeof r=="object"&&r.constructor===Object?e[n]=Q(r):e[n]=r);return e}function Re(t,e){for(;t!==null;){const r=ir(t,e);if(r){if(r.get)return H(r.get);if(typeof r.value=="function")return H(r.value)}t=or(t)}function n(){return null}return n}const Jt=W(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),mt=W(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gt=W(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pr=W(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ht=W(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fr=W(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Qt=W(["#text"]),en=W(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),bt=W(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),tn=W(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),qe=W(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),mr=K(/\{\{[\w\W]*|[\w\W]*\}\}/gm),gr=K(/<%[\w\W]*|[\w\W]*%>/gm),hr=K(/\$\{[\w\W]*/gm),br=K(/^data-[\-\w.\u00B7-\uFFFF]+$/),xr=K(/^aria-[\-\w]+$/),fn=K(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),yr=K(/^(?:\w+script|data):/i),Er=K(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),mn=K(/^html$/i),_r=K(/^[a-z][.\w]*(-[.\w]+)+$/i);var nn=Object.freeze({__proto__:null,ARIA_ATTR:xr,ATTR_WHITESPACE:Er,CUSTOM_ELEMENT:_r,DATA_ATTR:br,DOCTYPE_NAME:mn,ERB_EXPR:gr,IS_ALLOWED_URI:fn,IS_SCRIPT_OR_DATA:yr,MUSTACHE_EXPR:mr,TMPLIT_EXPR:hr});const Ne={element:1,text:3,progressingInstruction:7,comment:8,document:9},Cr=function(){return typeof window>"u"?null:window},Sr=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const i="dompurify"+(r?"#"+r:"");try{return e.createPolicy(i,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},rn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function gn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Cr();const e=E=>gn(E);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==Ne.document||!t.Element)return e.isSupported=!1,e;let{document:n}=t;const r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:a,Node:s,Element:u,NodeFilter:l,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:g,trustedTypes:x}=t,h=u.prototype,_=Re(h,"cloneNode"),S=Re(h,"remove"),A=Re(h,"nextSibling"),L=Re(h,"childNodes"),te=Re(h,"parentNode");if(typeof a=="function"){const E=n.createElement("template");E.content&&E.content.ownerDocument&&(n=E.content.ownerDocument)}let v,ce="";const{implementation:X,createNodeIterator:je,createDocumentFragment:_e,getElementsByTagName:Ce}=n,{importNode:On}=r;let q=rn();e.isSupported=typeof pn=="function"&&typeof te=="function"&&X&&X.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Ye,ERB_EXPR:Ve,TMPLIT_EXPR:Xe,DATA_ATTR:Mn,ARIA_ATTR:Ln,IS_SCRIPT_OR_DATA:Bn,ATTR_WHITESPACE:wt,CUSTOM_ELEMENT:Un}=nn;let{IS_ALLOWED_URI:vt}=nn,O=null;const Pt=C({},[...Jt,...mt,...gt,...ht,...Qt]);let B=null;const Rt=C({},[...en,...bt,...tn,...qe]);let R=Object.seal(Et(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Se=null,Ze=null;const pe=Object.seal(Et(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Nt=!0,Je=!0,It=!1,kt=!0,fe=!1,De=!0,ae=!1,Qe=!1,et=!1,me=!1,Oe=!1,Me=!1,Dt=!0,Ot=!1;const zn="user-content-";let tt=!0,Ae=!1,ge={},Z=null;const nt=C({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Mt=null;const Lt=C({},["audio","video","img","source","image","track"]);let rt=null;const Bt=C({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Le="http://www.w3.org/1998/Math/MathML",Be="http://www.w3.org/2000/svg",ne="http://www.w3.org/1999/xhtml";let he=ne,ot=!1,it=null;const Fn=C({},[Le,Be,ne],pt);let Ue=C({},["mi","mo","mn","ms","mtext"]),ze=C({},["annotation-xml"]);const qn=C({},["title","style","font","a","script"]);let Te=null;const $n=["application/xhtml+xml","text/html"],Wn="text/html";let D=null,be=null;const Hn=n.createElement("form"),Ut=function(c){return c instanceof RegExp||c instanceof Function},st=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(be&&be===c)){if((!c||typeof c!="object")&&(c={}),c=Q(c),Te=$n.indexOf(c.PARSER_MEDIA_TYPE)===-1?Wn:c.PARSER_MEDIA_TYPE,D=Te==="application/xhtml+xml"?pt:$e,O=Y(c,"ALLOWED_TAGS")?C({},c.ALLOWED_TAGS,D):Pt,B=Y(c,"ALLOWED_ATTR")?C({},c.ALLOWED_ATTR,D):Rt,it=Y(c,"ALLOWED_NAMESPACES")?C({},c.ALLOWED_NAMESPACES,pt):Fn,rt=Y(c,"ADD_URI_SAFE_ATTR")?C(Q(Bt),c.ADD_URI_SAFE_ATTR,D):Bt,Mt=Y(c,"ADD_DATA_URI_TAGS")?C(Q(Lt),c.ADD_DATA_URI_TAGS,D):Lt,Z=Y(c,"FORBID_CONTENTS")?C({},c.FORBID_CONTENTS,D):nt,Se=Y(c,"FORBID_TAGS")?C({},c.FORBID_TAGS,D):Q({}),Ze=Y(c,"FORBID_ATTR")?C({},c.FORBID_ATTR,D):Q({}),ge=Y(c,"USE_PROFILES")?c.USE_PROFILES:!1,Nt=c.ALLOW_ARIA_ATTR!==!1,Je=c.ALLOW_DATA_ATTR!==!1,It=c.ALLOW_UNKNOWN_PROTOCOLS||!1,kt=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,fe=c.SAFE_FOR_TEMPLATES||!1,De=c.SAFE_FOR_XML!==!1,ae=c.WHOLE_DOCUMENT||!1,me=c.RETURN_DOM||!1,Oe=c.RETURN_DOM_FRAGMENT||!1,Me=c.RETURN_TRUSTED_TYPE||!1,et=c.FORCE_BODY||!1,Dt=c.SANITIZE_DOM!==!1,Ot=c.SANITIZE_NAMED_PROPS||!1,tt=c.KEEP_CONTENT!==!1,Ae=c.IN_PLACE||!1,vt=c.ALLOWED_URI_REGEXP||fn,he=c.NAMESPACE||ne,Ue=c.MATHML_TEXT_INTEGRATION_POINTS||Ue,ze=c.HTML_INTEGRATION_POINTS||ze,R=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&Ut(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(R.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&Ut(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(R.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(R.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),fe&&(Je=!1),Oe&&(me=!0),ge&&(O=C({},Qt),B=[],ge.html===!0&&(C(O,Jt),C(B,en)),ge.svg===!0&&(C(O,mt),C(B,bt),C(B,qe)),ge.svgFilters===!0&&(C(O,gt),C(B,bt),C(B,qe)),ge.mathMl===!0&&(C(O,ht),C(B,tn),C(B,qe))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?pe.tagCheck=c.ADD_TAGS:(O===Pt&&(O=Q(O)),C(O,c.ADD_TAGS,D))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?pe.attributeCheck=c.ADD_ATTR:(B===Rt&&(B=Q(B)),C(B,c.ADD_ATTR,D))),c.ADD_URI_SAFE_ATTR&&C(rt,c.ADD_URI_SAFE_ATTR,D),c.FORBID_CONTENTS&&(Z===nt&&(Z=Q(Z)),C(Z,c.FORBID_CONTENTS,D)),c.ADD_FORBID_CONTENTS&&(Z===nt&&(Z=Q(Z)),C(Z,c.ADD_FORBID_CONTENTS,D)),tt&&(O["#text"]=!0),ae&&C(O,["html","head","body"]),O.table&&(C(O,["tbody"]),delete Se.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw Pe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Pe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');v=c.TRUSTED_TYPES_POLICY,ce=v.createHTML("")}else v===void 0&&(v=Sr(x,o)),v!==null&&typeof ce=="string"&&(ce=v.createHTML(""));W&&W(c),be=c}},zt=C({},[...mt,...gt,...pr]),Ft=C({},[...ht,...fr]),Gn=function(c){let b=te(c);(!b||!b.tagName)&&(b={namespaceURI:he,tagName:"template"});const y=$e(c.tagName),P=$e(b.tagName);return it[c.namespaceURI]?c.namespaceURI===Be?b.namespaceURI===ne?y==="svg":b.namespaceURI===Le?y==="svg"&&(P==="annotation-xml"||Ue[P]):!!zt[y]:c.namespaceURI===Le?b.namespaceURI===ne?y==="math":b.namespaceURI===Be?y==="math"&&ze[P]:!!Ft[y]:c.namespaceURI===ne?b.namespaceURI===Be&&!ze[P]||b.namespaceURI===Le&&!Ue[P]?!1:!Ft[y]&&(qn[y]||!zt[y]):!!(Te==="application/xhtml+xml"&&it[c.namespaceURI]):!1},J=function(c){we(e.removed,{element:c});try{te(c).removeChild(c)}catch{S(c)}},le=function(c,b){try{we(e.removed,{attribute:b.getAttributeNode(c),from:b})}catch{we(e.removed,{attribute:null,from:b})}if(b.removeAttribute(c),c==="is")if(me||Oe)try{J(b)}catch{}else try{b.setAttribute(c,"")}catch{}},qt=function(c){let b=null,y=null;if(et)c="<remove></remove>"+c;else{const k=ft(c,/^[\r\n\t ]+/);y=k&&k[0]}Te==="application/xhtml+xml"&&he===ne&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const P=v?v.createHTML(c):c;if(he===ne)try{b=new g().parseFromString(P,Te)}catch{}if(!b||!b.documentElement){b=X.createDocument(he,"template",null);try{b.documentElement.innerHTML=ot?ce:P}catch{}}const F=b.body||b.documentElement;return c&&y&&F.insertBefore(n.createTextNode(y),F.childNodes[0]||null),he===ne?Ce.call(b,ae?"html":"body")[0]:ae?b.documentElement:F},$t=function(c){return je.call(c.ownerDocument||c,c,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},ct=function(c){return c instanceof p&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof f)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},Wt=function(c){return typeof s=="function"&&c instanceof s};function re(E,c,b){Fe(E,y=>{y.call(e,c,b,be)})}const Ht=function(c){let b=null;if(re(q.beforeSanitizeElements,c,null),ct(c))return J(c),!0;const y=D(c.nodeName);if(re(q.uponSanitizeElement,c,{tagName:y,allowedTags:O}),De&&c.hasChildNodes()&&!Wt(c.firstElementChild)&&$(/<[/\w!]/g,c.innerHTML)&&$(/<[/\w!]/g,c.textContent)||c.nodeType===Ne.progressingInstruction||De&&c.nodeType===Ne.comment&&$(/<[/\w]/g,c.data))return J(c),!0;if(!(pe.tagCheck instanceof Function&&pe.tagCheck(y))&&(!O[y]||Se[y])){if(!Se[y]&&Kt(y)&&(R.tagNameCheck instanceof RegExp&&$(R.tagNameCheck,y)||R.tagNameCheck instanceof Function&&R.tagNameCheck(y)))return!1;if(tt&&!Z[y]){const P=te(c)||c.parentNode,F=L(c)||c.childNodes;if(F&&P){const k=F.length;for(let G=k-1;G>=0;--G){const oe=_(F[G],!0);oe.__removalCount=(c.__removalCount||0)+1,P.insertBefore(oe,A(c))}}}return J(c),!0}return c instanceof u&&!Gn(c)||(y==="noscript"||y==="noembed"||y==="noframes")&&$(/<\/no(script|embed|frames)/i,c.innerHTML)?(J(c),!0):(fe&&c.nodeType===Ne.text&&(b=c.textContent,Fe([Ye,Ve,Xe],P=>{b=ve(b,P," ")}),c.textContent!==b&&(we(e.removed,{element:c.cloneNode()}),c.textContent=b)),re(q.afterSanitizeElements,c,null),!1)},Gt=function(c,b,y){if(Dt&&(b==="id"||b==="name")&&(y in n||y in Hn))return!1;if(!(Je&&!Ze[b]&&$(Mn,b))){if(!(Nt&&$(Ln,b))){if(!(pe.attributeCheck instanceof Function&&pe.attributeCheck(b,c))){if(!B[b]||Ze[b]){if(!(Kt(c)&&(R.tagNameCheck instanceof RegExp&&$(R.tagNameCheck,c)||R.tagNameCheck instanceof Function&&R.tagNameCheck(c))&&(R.attributeNameCheck instanceof RegExp&&$(R.attributeNameCheck,b)||R.attributeNameCheck instanceof Function&&R.attributeNameCheck(b,c))||b==="is"&&R.allowCustomizedBuiltInElements&&(R.tagNameCheck instanceof RegExp&&$(R.tagNameCheck,y)||R.tagNameCheck instanceof Function&&R.tagNameCheck(y))))return!1}else if(!rt[b]){if(!$(vt,ve(y,wt,""))){if(!((b==="src"||b==="xlink:href"||b==="href")&&c!=="script"&&ar(y,"data:")===0&&Mt[c])){if(!(It&&!$(Bn,ve(y,wt,"")))){if(y)return!1}}}}}}}return!0},Kt=function(c){return c!=="annotation-xml"&&ft(c,Un)},jt=function(c){re(q.beforeSanitizeAttributes,c,null);const{attributes:b}=c;if(!b||ct(c))return;const y={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:B,forceKeepAttr:void 0};let P=b.length;for(;P--;){const F=b[P],{name:k,namespaceURI:G,value:oe}=F,xe=D(k),at=oe;let U=k==="value"?at:lr(at);if(y.attrName=xe,y.attrValue=U,y.keepAttr=!0,y.forceKeepAttr=void 0,re(q.uponSanitizeAttribute,c,y),U=y.attrValue,Ot&&(xe==="id"||xe==="name")&&(le(k,c),U=zn+U),De&&$(/((--!?|])>)|<\/(style|title|textarea)/i,U)){le(k,c);continue}if(xe==="attributename"&&ft(U,"href")){le(k,c);continue}if(y.forceKeepAttr)continue;if(!y.keepAttr){le(k,c);continue}if(!kt&&$(/\/>/i,U)){le(k,c);continue}fe&&Fe([Ye,Ve,Xe],Vt=>{U=ve(U,Vt," ")});const Yt=D(c.nodeName);if(!Gt(Yt,xe,U)){le(k,c);continue}if(v&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!G)switch(x.getAttributeType(Yt,xe)){case"TrustedHTML":{U=v.createHTML(U);break}case"TrustedScriptURL":{U=v.createScriptURL(U);break}}if(U!==at)try{G?c.setAttributeNS(G,k,U):c.setAttribute(k,U),ct(c)?J(c):Zt(e.removed)}catch{le(k,c)}}re(q.afterSanitizeAttributes,c,null)},Kn=function E(c){let b=null;const y=$t(c);for(re(q.beforeSanitizeShadowDOM,c,null);b=y.nextNode();)re(q.uponSanitizeShadowNode,b,null),Ht(b),jt(b),b.content instanceof i&&E(b.content);re(q.afterSanitizeShadowDOM,c,null)};return e.sanitize=function(E){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},b=null,y=null,P=null,F=null;if(ot=!E,ot&&(E="<!-->"),typeof E!="string"&&!Wt(E))if(typeof E.toString=="function"){if(E=E.toString(),typeof E!="string")throw Pe("dirty is not a string, aborting")}else throw Pe("toString is not a function");if(!e.isSupported)return E;if(Qe||st(c),e.removed=[],typeof E=="string"&&(Ae=!1),Ae){if(E.nodeName){const oe=D(E.nodeName);if(!O[oe]||Se[oe])throw Pe("root node is forbidden and cannot be sanitized in-place")}}else if(E instanceof s)b=qt("<!---->"),y=b.ownerDocument.importNode(E,!0),y.nodeType===Ne.element&&y.nodeName==="BODY"||y.nodeName==="HTML"?b=y:b.appendChild(y);else{if(!me&&!fe&&!ae&&E.indexOf("<")===-1)return v&&Me?v.createHTML(E):E;if(b=qt(E),!b)return me?null:Me?ce:""}b&&et&&J(b.firstChild);const k=$t(Ae?E:b);for(;P=k.nextNode();)Ht(P),jt(P),P.content instanceof i&&Kn(P.content);if(Ae)return E;if(me){if(Oe)for(F=_e.call(b.ownerDocument);b.firstChild;)F.appendChild(b.firstChild);else F=b;return(B.shadowroot||B.shadowrootmode)&&(F=On.call(r,F,!0)),F}let G=ae?b.outerHTML:b.innerHTML;return ae&&O["!doctype"]&&b.ownerDocument&&b.ownerDocument.doctype&&b.ownerDocument.doctype.name&&$(mn,b.ownerDocument.doctype.name)&&(G="<!DOCTYPE "+b.ownerDocument.doctype.name+`>
`+G),fe&&Fe([Ye,Ve,Xe],oe=>{G=ve(G,oe," ")}),v&&Me?v.createHTML(G):G},e.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};st(E),Qe=!0},e.clearConfig=function(){be=null,Qe=!1},e.isValidAttribute=function(E,c,b){be||st({});const y=D(E),P=D(c);return Gt(y,P,b)},e.addHook=function(E,c){typeof c=="function"&&we(q[E],c)},e.removeHook=function(E,c){if(c!==void 0){const b=sr(q[E],c);return b===-1?void 0:cr(q[E],b,1)[0]}return Zt(q[E])},e.removeHooks=function(E){q[E]=[]},e.removeAllHooks=function(){q=rn()},e}var on=gn();const Ar=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),Tr=(t,e)=>typeof t!="number"||e===null?null:t-e,sn=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,r]of Object.entries(e))if(t.includes(n))return r;return t.replace("카드","").substring(0,2).toUpperCase()},wr=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드","SAMSUNG CARD"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:r,svg:o}of n)for(const i of r)if(e.includes(i.toUpperCase()))try{return chrome?.runtime?.getURL(`assets/card/${o}`)??null}catch{return null}return null},vr=(t,e,n)=>{const r=" recommended",o=document.createElement("div");o.className=`picsel-card-benefit-item${r}`;const i=t.cardName||t.card||"카드",s=wr(i)||t.imageUrl;if(s){const h=document.createElement("div");h.className="picsel-card-image-wrapper";const _=document.createElement("img");_.src=s,_.alt=i,_.className="picsel-card-image",_.onerror=()=>{const S=sn(i);h.textContent="";const A=document.createElement("div");A.className="picsel-card-initial",A.textContent=on.sanitize(S,{ALLOWED_TAGS:[]}),h.appendChild(A)},h.appendChild(_),o.appendChild(h)}else{const h=sn(i),_=document.createElement("div");_.className="picsel-card-image-wrapper";const S=document.createElement("div");S.className="picsel-card-initial",S.textContent=on.sanitize(h,{ALLOWED_TAGS:[]}),_.appendChild(S),o.appendChild(_)}const u=document.createElement("div");u.className="picsel-card-info";const l=document.createElement("div");if(l.className="picsel-card-header",(t.discountAmount??0)>0){const h=document.createElement("span");h.className="picsel-recommended-badge",h.textContent=`${e+1}위`,l.appendChild(h)}const f=document.createElement("span");f.className="picsel-card-name";const p=i.includes(",")?i.split(",")[0].trim():i;if(f.textContent=p,l.appendChild(f),u.appendChild(l),t.benefit){const h=document.createElement("div");h.className="picsel-card-benefit-desc",h.textContent=t.benefit,u.appendChild(h)}o.appendChild(u);const g=document.createElement("div");if(g.className="picsel-card-amount",t.benefitType==="installment"){const h=document.createElement("div");h.className="picsel-card-installment",h.textContent=t.benefit||"무이자",g.appendChild(h)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const S=document.createElement("div");S.className="picsel-card-final-price";const A=de(t.finalPrice,n);S.textContent=A,g.appendChild(S)}const h=document.createElement("div");h.className="picsel-card-discount";const _=de(t.discountAmount,n);h.textContent=`-${_}`,g.appendChild(h)}else if(typeof t.rate=="number"&&t.rate>0){const h=document.createElement("div");h.className="picsel-card-rate",h.textContent=`${t.rate}%`,g.appendChild(h)}return o.appendChild(g),o},Pr=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const x=document.createElement("section");x.className="picsel-section picsel-card-section picsel-hidden",x.setAttribute("data-empty","true"),x.style.display="none";const h=document.createElement("h4");h.className="picsel-section-title",h.textContent="카드별 혜택",x.appendChild(h);const _=document.createElement("div");return _.className="picsel-empty-benefits",_.textContent="이 상품에는 카드 혜택이 없어요",x.appendChild(_),x}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(x=>{const h=x;if(h.benefitType==="point"||h.benefitType==="installment")return null;const _=h.rate??h.discount;let S=0,A=0;typeof _=="number"&&_>100||h.benefitType==="discount"?(S=typeof _=="number"&&_>100?_:h.discount??0,A=0):(A=typeof _=="number"&&_<=100?_:0,S=Ar(n,A)??0);const L=Tr(n,S);return{...h,cardName:h.cardName??h.card,rate:A,discountAmount:S??void 0,finalPrice:L??void 0}}).filter(x=>x!==null).sort((x,h)=>{const _=x?.discountAmount??0,S=h?.discountAmount??0;if(_!==S)return S-_;const A=x?.rate??0;return(h?.rate??0)-A})[0];if(!i)return null;const a=document.createElement("section");a.className="picsel-section picsel-card-section";const s=document.createElement("h4");s.className="picsel-section-title",s.textContent="추천 카드 혜택",a.appendChild(s);const u=document.createElement("div");u.className="picsel-card-benefit-list";const l=t.currency??"KRW",f=vr(i,0,l);u.appendChild(f),a.appendChild(u);const p=[],g=t.elevenst?.totalPointAmount??0;if(g>0&&p.push(`최대 적립 포인트 ${g.toLocaleString()}P`),t.giftCardDiscount?.description&&p.push(t.giftCardDiscount.description),t.cashback?.description&&p.push(t.cashback.description),p.length>0){const x=document.createElement("div");x.className="picsel-sub-benefits",p.forEach(h=>{const _=document.createElement("div");_.className="picsel-sub-benefit-item",_.textContent=h,x.appendChild(_)}),a.appendChild(x)}return a},Rr=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{ye(!1)}),n.appendChild(r),e.appendChild(n),e},Nr={danawa:"다나와",naver:"네이버쇼핑",coupang:"쿠팡","11st":"11번가",gmarket:"G마켓"},Ir=async t=>{if(t&&m.comparison.status!=="loading"&&!(m.comparison.status==="success"&&m.comparison.query===t)&&!(m.comparison.status==="error"&&m.comparison.query===t)){m.comparison={status:"loading",query:t,error:null,data:null};try{if(!chrome?.runtime?.sendMessage){m.comparison={status:"error",query:t,error:"Chrome extension API를 사용할 수 없습니다.",data:null};return}const e=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!e?.success){m.comparison={status:"error",query:t,error:e?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null};return}const n=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:t});n?.success?m.comparison={status:"success",query:t,error:null,data:n.data}:m.comparison={status:"error",query:t,error:n?.error||"가격 비교 검색 실패",data:null}}catch(e){m.comparison={status:"error",query:t,error:e instanceof Error?e.message:"알 수 없는 오류",data:null}}}},kr=t=>{t&&m.comparison.status!=="loading"&&((m.comparison.status==="success"||m.comparison.status==="error")&&m.comparison.query===t||(m.comparison={status:"loading",query:t,error:null,data:null},V(),Ir(t).finally(()=>{V()})))},xt=t=>{const{buttonBadgeEl:e}=m;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const i=o,a=i.rate??i.discount;return typeof a=="number"?a:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=de(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},V=()=>{const{contentEl:t,cachedData:e}=m;if(!t)return;if(t.textContent="",!e){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(i),xt(null);return}const n=e,{displayMode:r}=ke.getState(),o=nr(n);if(t.appendChild(o),r==="lowest-price"){const i=document.createElement("section");i.className="picsel-section picsel-lowest-price-section";const a=document.createElement("h4");a.className="picsel-section-title",a.textContent="💰 최저가 비교",i.appendChild(a);const s=!!m.panelEl?.classList.contains("open"),u=m.comparison.status,l=m.comparison.data;if(s)if(u==="loading"){const f=document.createElement("div");f.className="picsel-empty-state",f.textContent="가격 비교 중입니다...",i.appendChild(f)}else if(u==="error"){const f=document.createElement("div");f.className="picsel-empty-state",f.textContent=m.comparison.error||"가격 비교 중 오류가 발생했습니다.",i.appendChild(f)}else if(u==="success"&&l){if(l.is_cheaper!==void 0&&l.price_diff!==void 0){const g=document.createElement("div");g.style.padding="12px",g.style.marginBottom="12px",g.style.background=l.is_cheaper?"#f0fdf4":"#fef2f2",g.style.border=`1px solid ${l.is_cheaper?"#86efac":"#fecaca"}`,g.style.borderRadius="8px",g.style.fontSize="13px",g.style.fontWeight="600",g.style.color=l.is_cheaper?"#166534":"#991b1b",l.is_cheaper?g.textContent=`✅ 다나와가 ${de(l.price_diff,"KRW")} 더 저렴합니다!`:g.textContent="❌ 현재 가격이 더 저렴하거나 비슷합니다.",i.appendChild(g)}const p=(Array.isArray(l.results)?l.results:[]).filter(g=>g&&g.success&&Array.isArray(g.products)).flatMap(g=>g.products.map(x=>({provider:g.provider,name:x.name,price:x.price,currency:x.currency,url:x.url}))).filter(g=>typeof g.price=="number"&&g.price>0).sort((g,x)=>g.price-x.price).slice(0,3);if(p.length){const g=document.createElement("div");g.style.display="flex",g.style.flexDirection="column",g.style.gap="8px",p.forEach(x=>{const h=document.createElement("a");h.href=x.url||"#",h.target="_blank",h.rel="noreferrer",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="space-between",h.style.gap="10px",h.style.padding="10px 12px",h.style.background="#ffffff",h.style.border="1px solid #e5e7eb",h.style.borderRadius="12px",h.style.textDecoration="none",h.style.color="inherit",h.style.transition="background-color 0.15s ease";const _=document.createElement("div");_.style.display="flex",_.style.flexDirection="column",_.style.gap="2px",_.style.minWidth="0";const S=document.createElement("span");S.style.fontSize="11px",S.style.color="#6b7280",S.textContent=Nr[x.provider]||x.provider;const A=document.createElement("span");A.style.fontSize="12px",A.style.fontWeight="600",A.style.color="#111827",A.style.whiteSpace="nowrap",A.style.overflow="hidden",A.style.textOverflow="ellipsis",A.textContent=x.name,_.appendChild(S),_.appendChild(A);const L=document.createElement("strong");L.style.fontSize="13px",L.style.fontWeight="800",L.style.color="#111827",L.style.flexShrink="0",L.textContent=de(x.price,x.currency??"KRW")||`${x.price}`,h.appendChild(_),h.appendChild(L),g.appendChild(h)}),i.appendChild(g)}else{const g=document.createElement("div");g.className="picsel-empty-state",g.textContent="검색 결과가 없습니다.",i.appendChild(g)}}else{const f=document.createElement("div");f.className="picsel-empty-state",f.textContent="상품명을 찾을 수 없어 가격 비교를 실행할 수 없습니다.",i.appendChild(f)}else{const f=document.createElement("div");f.className="picsel-empty-state",f.textContent="패널을 열면 최저가 비교를 시작합니다.",i.appendChild(f)}t.appendChild(i)}else{const i=Pr(n);i&&t.appendChild(i);const a=Rr();a&&t.appendChild(a)}xt(r==="lowest-price"?null:n)},ye=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=m;if(!(!e||!n||!r))if(t){e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),r.textContent="PicSel 혜택 닫기";const{displayMode:o}=ke.getState();o==="lowest-price"&&m.cachedData?.title?kr(m.cachedData.title):V()}else e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),r.textContent="PicSel 혜택 보기"},Dr=()=>{if(m.mounted)return;if(document.getElementById(ut)){const i=document.getElementById(ut);i&&(m.hostElement=i,m.shadowRoot=i.shadowRoot,i.shadowRoot&&(m.toggleButton=i.shadowRoot.querySelector(".picsel-toggle-button"),m.buttonLabelEl=i.shadowRoot.querySelector(".picsel-toggle-label"),m.buttonBadgeEl=i.shadowRoot.querySelector(".picsel-toggle-badge"),m.panelEl=i.shadowRoot.querySelector(`#${dt}`),m.closeButtonEl=i.shadowRoot.querySelector(".picsel-close-button"),m.contentEl=i.shadowRoot.querySelector(".picsel-panel-content"),m.panelTitleEl=i.shadowRoot.querySelector(".picsel-panel-title"))),m.mounted=!0;return}m.hostElement=document.createElement("div"),m.hostElement.id=ut,m.hostElement.style.position="fixed",m.hostElement.style.bottom="24px",m.hostElement.style.right="24px",m.hostElement.style.zIndex=String(2147483647),m.shadowRoot=m.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=Jn,m.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",m.shadowRoot.appendChild(e),m.toggleButton=document.createElement("button"),m.toggleButton.className="picsel-toggle-button",m.toggleButton.type="button",m.toggleButton.setAttribute("aria-expanded","false"),m.buttonLabelEl=document.createElement("span"),m.buttonLabelEl.className="picsel-toggle-label",m.buttonLabelEl.textContent="PicSel 혜택 보기",m.toggleButton.appendChild(m.buttonLabelEl),m.buttonBadgeEl=document.createElement("span"),m.buttonBadgeEl.className="picsel-toggle-badge",m.toggleButton.appendChild(m.buttonBadgeEl),e.appendChild(m.toggleButton),m.panelEl=document.createElement("div"),m.panelEl.className="picsel-panel",m.panelEl.id=dt,m.panelEl.setAttribute("role","dialog"),m.panelEl.setAttribute("aria-hidden","true"),m.toggleButton.setAttribute("aria-controls",dt);const n=document.createElement("div");n.className="picsel-panel-header",m.panelTitleEl=document.createElement("div"),m.panelTitleEl.className="picsel-panel-title",m.panelTitleEl.textContent="PicSel 혜택 정보",m.closeButtonEl=document.createElement("button"),m.closeButtonEl.type="button",m.closeButtonEl.className="picsel-close-button",m.closeButtonEl.setAttribute("aria-label","닫기"),m.closeButtonEl.textContent="✕",n.appendChild(m.panelTitleEl),n.appendChild(m.closeButtonEl),m.panelEl.appendChild(n),m.contentEl=document.createElement("div"),m.contentEl.className="picsel-panel-content",m.panelEl.appendChild(m.contentEl),e.appendChild(m.panelEl);const r=m.panelEl,o=m.hostElement;m.toggleButton.addEventListener("click",()=>{const i=!r.classList.contains("open");ye(i)}),m.closeButtonEl.addEventListener("click",()=>{ye(!1)}),window.addEventListener("keydown",i=>{i.key==="Escape"&&ye(!1)}),document.addEventListener("click",i=>{if(!r.classList.contains("open"))return;const a=i.composedPath();o&&!a.includes(o)&&ye(!1)},!0),document.body.appendChild(m.hostElement),m.mounted=!0},hn=()=>{if(m.panelTitleEl&&m.cachedData?.site){const t=tr(m.cachedData.site);m.panelTitleEl.textContent=`${t} 혜택 정보`}},bn=t=>{m.cachedData={...t},Dr(),hn(),V(),ye(!1)},At=t=>{if(m.cachedData={...m.cachedData??{},...t},!m.mounted){bn(m.cachedData);return}hn(),V()},w=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},xn=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},Or=t=>t.includes("원")||t.includes("KRW")?"KRW":t.includes("$")||t.includes("USD")?"USD":t.includes("€")||t.includes("EUR")?"EUR":t.includes("¥")||t.includes("JPY")?"JPY":"KRW",Tt=t=>typeof t=="number"&&t>100&&t<1e8,ue=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},St=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","BC","NH"];for(const n of e)if(t.includes(n))return n;return t.replace(/카드$/g,"")};class Ee{extractNumber(e){return w(e)}extractCurrency(e){return Or(e)}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){se.error(T.PAR_E004,`Selector error: ${r}`,{data:{siteName:this.siteName,selector:r},error:o instanceof Error?o:void 0})}return null}isValidPrice(e){return Tt(e)}searchPriceInDOM(e,n){const r=e.querySelectorAll('[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]');for(const u of r){const f=(u.textContent||"").match(n);if(f)return se.debug("Found price in container",{siteName:this.siteName,price:f[0]}),f[0]}const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i,a=0;const s=1e3;for(;(i=o.nextNode())&&a<s;){a++;const l=(i.textContent||"").match(n);if(l)return se.debug("Found price via TreeWalker",{siteName:this.siteName,price:l[0],nodesScanned:a}),l[0]}return a>=s&&se.warn("TreeWalker hit node limit",{siteName:this.siteName,limit:s}),null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const j={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",".deal-price",".special-price",".discount-price strong",'[class*="sale"] strong','[class*="discount"] strong','div[class*="price"] > strong','span[class*="price"] > strong','[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]',".deal-title",".special-title",'h1[class*="product"]','h1[class*="title"]',"h1"],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},Mr=t=>{for(const e of j.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Lr=t=>{try{const e=t.querySelector(j.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r=`https:${r}`),r=r.split("?")[0],r}const n=t.querySelector(j.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o=`https:${o}`),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return d.error(T.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},Br=t=>{try{const e=[],n=new Set,r=t.querySelector(j.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let s=i.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s=`https:${s}`),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return d.error(T.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},cn=t=>t>=100&&t<=1e8,Ur=t=>{let e=null,n=null,r=null;for(const o of j.amount)try{const i=t.querySelector(o);if(!i||!i.textContent)continue;const a=i.textContent.trim();if(!/[\d,]+\s*원?/.test(a)&&!/^\d{1,3}(,\d{3})*$/.test(a.replace(/[^\d,]/g,"")))continue;const s=w(a);if(!s||!cn(s))continue;if(d.debug(`Found via selector "${o}"`,{value:s}),/final|discount|final-price|deal|sale|coupon/i.test(o)){r=s,e=s;break}n||(n=s),e||(e=s)}catch(i){d.debug(`Selector ${o} failed`,{error:i})}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of o){const s=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s){const u=w(s[1]);if(u&&cn(u)){d.debug("Found via regex in element",{value:u}),e=u;break}}}}return{amount:e,originalPrice:n,discountPrice:r}},zr=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const i of e){const a=o.match(i);if(a&&a[1]){const s=w(a[1]);if(s)return d.debug("Found price via text walker",{value:s}),s}}}return null},Fr=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),i=(r.getAttribute("data-price")||"").trim(),s=`${o} ${i}`.trim().match(n);if(s&&s[1]){const u=w(s[1]);if(u)return d.debug("Found price by element scan",{value:u}),u}}}catch(e){d.debug("findPriceByElementScan error",{error:e})}return null},qr={신한:"assets/card/shinhanCard.svg",우리:"assets/card/wooriCard.svg",BC:"assets/card/bcCard.svg",비씨:"assets/card/bcCard.svg",롯데:"assets/card/lotteCard.svg",KB:"assets/card/kbCard.svg",국민:"assets/card/kbCard.svg",NH:"assets/card/nhCard",농협:"assets/card/hanaCard.svg",삼성:"assets/card/samsungCard.svg",하나:"assets/card/hanaCard.svg",현대:"assets/card/hyundaiCard.svg",비자:"assets/card/visaCard.svg",마스터:"assets/card/masterCard.svg"},$r=t=>{const e=St(ue(t)),n=qr[e];if(!n)return null;try{return chrome.runtime.getURL(n)}catch{return null}},We=t=>{for(const[e,n]of Object.entries(Yn))if(t.includes(e))return n;return null},Wr=t=>{const e=[],n=j.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const a=i,s=a.src,u=a.alt||"";if(!s)return;let l=u.trim();l||(l=We(s)||""),l&&!l.includes("카드")&&(l=`${l}카드`),s&&l&&(e.some(f=>f.cardName===l)||(e.push({src:s,alt:u,cardName:l}),d.debug("카드 이미지 발견",{cardName:l,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(a=>{const s=a,u=s.src,l=s.alt||"";if(!u||(s.width||s.naturalWidth)>100)return;let p=l.trim();p||(p=We(u)||""),p&&!p.includes("카드")&&(p=`${p}카드`),u&&p&&!e.some(g=>g.cardName===p)&&e.push({src:u,alt:l,cardName:p})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const a=i,s=a.src,u=a.alt||"";if(!s||(a.width||a.naturalWidth)>100)return;let f=u.trim();f||(f=We(s)||""),f&&!f.includes("카드")&&(f=`${f}카드`),s&&f&&!e.some(p=>p.cardName===f)&&e.push({src:s,alt:u,cardName:f})}),d.debug("추출된 카드 이미지 총",{count:e.length}),e},Hr=t=>{const e=[],n=j.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return d.debug("카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const a=o.contentDocument||o.contentWindow?.document;if(a)return Gr(a)}catch{d.warn("iframe 접근 불가 (cross-origin)")}const i=r.querySelector(n.content);return i?Kr(i):e},Gr=t=>{const e=[],n=j.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const i=o.querySelector(n.cardName),a=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),u=i?.textContent?.trim()||"",l=a?.textContent?.trim()||"",f=s?.textContent?.trim()||o.textContent?.trim()||"";if(u){const p=xn(l||f)??void 0;e.push({card:u,cardName:u,benefit:f||l||"혜택 제공",discount:p,rate:p})}}),e},Kr=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let i;for(;(i=o.exec(n))!==null;){const a=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);e.some(u=>u.card===a)||e.push({card:a,cardName:a,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},jr=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",i=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const a=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);if(!e.some(u=>u.card===a)){let u=`최대 ${s}% 할인/적립`;const l=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);l&&(u=`최대 ${s}% ${l[0]}`),e.push({card:a,cardName:a,benefit:u,discount:s,rate:s})}}}),e},Yr=t=>{let e=[];const n=Wr(t),r=Hr(t);if(r.length>0&&(d.info("팝업에서 카드 혜택 파싱",{count:r.length}),e=r),jr(t).forEach(i=>{e.some(a=>a.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(j.benefitBadge);if(i){const a=i.querySelectorAll("img.benefit-ico"),s=[],u=[];a.forEach(p=>{const g=p.getAttribute("src");if(g){const x=We(g);x&&(s.push(x),u.push(g))}});const l=i.querySelector(".benefit-label")?.textContent?.trim(),f=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(l){const p=xn(l),g=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드",x=p??void 0;e.push({card:g,cardName:g,benefit:`${l}${f?` (${f})`:""}`,discount:x,rate:x,imageUrl:u[0]})}}}return e=e.map((i,a)=>{if(!i.imageUrl){const s=i.cardName||i.card||"",u=St(ue(s));let l=n.find(f=>{const p=ue(f.cardName),g=ue(s);return p===g});if(l||(l=n.find(f=>{const p=ue(f.cardName).replace("카드",""),g=ue(s).replace("카드","");return p.includes(g)||g.includes(p)})),l||(l=n.find(f=>St(ue(f.cardName))===u)),!l&&a<n.length&&(l=n[a],d.debug("인덱스 기반 매칭",{cardName:s,matchedCardName:l.cardName})),!l){const f=$r(s);if(f)return d.debug("로컬 아이콘 폴백 사용",{cardName:s,benefitKey:u}),{...i,imageUrl:f}}if(l)return{...i,imageUrl:l.src}}return i}),e.sort((i,a)=>(a.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{benefits:e}),e},Vr=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const a=i.match(/(\d+)\s*%/);if(a)return{rate:parseInt(a[1],10),description:i.trim()}}}return null},Xr=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",a=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(a&&i.includes("쿠팡캐시")){const s=w(a[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=w(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},Zr=t=>{try{const e=[],n=new Set,r=t.querySelector(j.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const a=i.querySelectorAll("div");if(a.length<2)continue;let s="";for(const p of a){const g=p.textContent||"";if(!g.includes("원")&&g.trim().length>0&&!g.includes("px")){s=g.trim();break}}let u="";for(const p of a){const x=(p.textContent||"").match(/[\d,]+원/);if(x){u=x[0].replace(/[,원]/g,"");break}}if(!u)continue;const l=parseInt(u);if(!l||l<100||!s||s.length<2)continue;const f=`${s}-${l}`;if(n.has(f))continue;if(e.push({name:s,price:l}),n.add(f),e.length>=15)break}catch(a){d.warn("Error parsing list item",{error:a});continue}return e}catch(e){return d.error(T.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},Jr=t=>t.querySelector(j.shipping)?.textContent?.trim()||null,Qr=(t,e)=>{if(!Tt(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let r=Math.round(t*(n/100));return e.maxDiscount&&r>e.maxDiscount&&(r=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:r},eo=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},yn=(t,e)=>t.map(r=>{const o=eo(r);return e&&Tt(e)&&(o.discountAmount=Qr(e,o)),o}).sort((r,o)=>r.discountAmount!==void 0&&o.discountAmount!==void 0?o.discountAmount-r.discountAmount:(o.rate??0)-(r.rate??0)),En=t=>{const e=new Map;for(const n of t){const r=to(n.cardName||n.card),o=e.get(r);if(!o)e.set(r,n);else{const i=o.rate??o.discount??0;(n.rate??n.discount??0)>i&&e.set(r,n)}}return Array.from(e.values())},to=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","NH","BC","비씨","스마일"],n=t.toLowerCase();for(const r of e)if(n.includes(r.toLowerCase()))return r;return t};class _n extends Ee{siteName="Coupang";selectors={amount:j.amount};static isCheckoutPage(e){if(!/coupang\.com/.test(e))return!1;const o=![/coupang\.com\/?$/,/shop\.coupang\.com/,/coupang\.com\/np\/categories/,/coupang\.com\/np\/search/,/coupang\.com\/np\/campaigns/,/coupang\.com\/np\/cart/,/coupang\.com\/np\/checkout/,/coupang\.com\/my\//,/coupang\.com\/np\/login/,/coupang\.com\/np\/register/].some(i=>i.test(e));return d.debug(`isCheckoutPage("${e}") = ${o}`),o}parse(e){try{d.info("🔍 Parsing Coupang page...");const n=Mr(e),r=Lr(e),o=Br(e),i=Ur(e);let a=i.amount;const{originalPrice:s,discountPrice:u}=i;if(a||(a=zr(e)),a||(a=Fr(e)),!a)return d.debug("❌ No price found"),null;const l=Yr(e),f=yn(l,a),p=En(f),g=Vr(e),x=Xr(e),h=Jr(e),_=Zr(e);return d.info(`✅ Found: ${a} KRW, Cards: ${p.length}`),{price:a,amount:a,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:_,originalPrice:s||void 0,discountPrice:u||void 0,cardBenefits:p,giftCardDiscount:g||void 0,cashback:x||void 0,shippingInfo:h||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const M={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",salePriceAlt2:".c_product_price .price .value",salePriceAlt3:'[class*="price"] .value',discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price",dealPrice:'.deal_price .value, [class*="deal"] .price',specialPrice:".special_price .value"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",titleAlt2:'h1[class*="title"]',titleAlt3:"h1.product_name",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},yt={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},no=t=>{const e=M.product;try{const n=t.querySelector(e.title);if(n?.textContent){const o=n.textContent.trim();return d.debug("제목 추출",{title:o}),o}const r=t.querySelector(e.titleAlt);if(r?.textContent){const o=r.textContent.trim();return d.debug("제목 추출 (alt)",{title:o}),o}}catch(n){d.error(T.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},ro=t=>{try{const e=t.querySelector(M.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return d.debug("부제목 추출",{subtitle:n}),n}}catch(e){d.error(T.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},oo=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const r=t.match(n);if(r?.[1])return d.debug("상품ID 추출",{productId:r[1]}),r[1]}}catch(e){d.error(T.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},Cn=t=>{const e=M.image;try{const n=t.querySelector(e.main);if(n?.src){const i=Ie(n.src);return d.debug("메인 이미지 추출",{src:i}),i}const r=t.querySelector(e.mainAlt);if(r?.src){const i=Ie(r.src);return d.debug("메인 이미지 추출 (alt)",{src:i}),i}const o=t.querySelector(`${e.main}[data-src]`);if(o?.dataset?.src){const i=Ie(o.dataset.src);return d.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){d.error(T.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},io=t=>{const e=[],n=new Set,r=M.image;try{const o=Cn(t);o&&(e.push(o),n.add(o)),t.querySelectorAll(r.thumbnail).forEach(s=>{const u=s,l=u.src||u.dataset?.src;if(l){const f=Ie(l),p=an(f);n.has(p)||(e.push(p),n.add(p))}}),t.querySelectorAll(r.thumbnailAlt).forEach(s=>{const u=s,l=u.src||u.dataset?.src;if(l){const f=Ie(l),p=an(f);n.has(p)||(e.push(p),n.add(p))}}),d.debug("전체 이미지 추출",{count:e.length})}catch(o){d.error(T.PAR_E001,"전체 이미지 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},so=t=>{const e=M.seller,n={seller:null,rating:null};try{const r=t.querySelector(e.name);r?.textContent&&(n.seller=r.textContent.trim(),d.debug("판매자 추출",{seller:n.seller}));const o=t.querySelector(e.rating);o?.textContent&&(n.rating=o.textContent.trim(),d.debug("판매자 등급 추출",{rating:n.rating}))}catch(r){d.error(T.PAR_E001,"판매자 정보 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return n};function Ie(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function an(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const co=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=M.price;try{const r=t.querySelector(n.originalPrice);r?.textContent&&(e.originalPrice=w(r.textContent),d.debug("정가",{price:e.originalPrice}));const o=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);o?.textContent&&(e.discountPrice=w(o.textContent),e.amount=e.discountPrice,d.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=w(i.textContent),d.debug("할인율",{rate:e.discountRate}));const a=t.querySelector(n.maxDiscountPrice);a?.textContent&&(e.maxDiscountPrice=w(a.textContent),d.debug("최대할인가",{price:e.maxDiscountPrice}));const s=t.querySelector(n.maxDiscountRate);s?.textContent&&(e.maxDiscountRate=w(s.textContent),d.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(r){d.error(T.PAR_E002,"가격 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},ao=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const r of n){const o=r.textContent||"";for(const i of e){const a=o.match(i);if(a?.[1]){const s=w(a[1]);if(s&&s>100&&s<1e8)return d.debug("가격 발견",{value:s}),s}}}return null},lo=t=>{const e=[],n=M.price;try{const r=t.querySelector(n.maxDiscountLayer);if(!r)return e;r.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const a=i.querySelector(".title"),s=i.querySelector(".price");if(a&&s){const u=a.textContent?.trim()||"",l=s.textContent?.trim()||"",f=w(l.replace("-",""));u&&f&&u!=="판매가"&&(e.push({type:u,amount:f}),d.debug("DiscountDetail",{type:u,amount:f}))}})}catch(r){d.error(T.PAR_E002,"DiscountDetail 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},uo=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=po(t),e.totalPointAmount=e.points.reduce((n,r)=>n+r.amount,0),e.cardBenefits=fo(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,r)=>n+r.benefitAmount,0),e.installments=ho(t),e.maxInstallmentMonths=e.installments.reduce((n,r)=>Math.max(n,r.maxMonths),0),e.coupons=yo(t),d.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){d.error(T.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},po=t=>{const e=[],n=M.pointDetail;try{const r=t.querySelector(n.container);if(r){const o=r.querySelector(n.totalPoint);if(o?.textContent){const a=w(o.textContent);a&&(e.push({amount:a,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),d.debug("최대 적립 포인트",{amount:a}))}const i=r.querySelector(n.elevenPaySection);if(i){const a=i.querySelector(".total .value");if(a?.textContent){const u=w(a.textContent);u&&!e.find(l=>l.amount===u&&l.type==="최대적립포인트")&&(e.push({amount:u,type:"11pay포인트",description:"11pay 결제 시 적립"}),d.debug("11pay 포인트 총액",{amount:u}))}i.querySelectorAll(".desc li").forEach(u=>{const l=u.querySelector(".c_layer_expand button.c_product_btn"),f=u.querySelector(".value");if(l&&f){const p=l.textContent?.trim()||"",g=w(f.textContent||"");g&&p&&!p.includes("카드")&&(e.push({amount:g,type:p,description:p}),d.debug("포인트 항목",{type:p,amount:g}))}})}}if(e.length===0){const o=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(o?.textContent){const i=w(o.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),d.debug("기본 포인트",{amount:i}))}}}catch(r){d.error(T.PAR_E003,"포인트 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},fo=t=>{const e=[],n=M.cardDiscount;try{const r=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let o=null;for(const a of r)if(o=t.querySelector(a),o){d.debug("카드 혜택 컨테이너 찾음",{selector:a});break}if(d.debug("other_benefits 컨테이너",{found:!!o}),o){const a=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let s=null;for(const u of a)if(s=o.querySelectorAll(u),s.length>0){d.debug("benefit 블록 찾음",{selector:u,count:s.length});break}if(d.debug("benefit 블록 수",{count:s?.length||0}),!s||s.length===0){const u=o.querySelector("dl");if(d.debug("dl 요소",{found:!!u}),u){const l=u.children;d.debug("dl children",{count:l.length})}}s&&s.length>0&&s.forEach(u=>{const f=u.querySelector("dt")?.textContent?.trim()||"";if(d.debug("메인 타이틀",{mainTitle:f}),!f)return;const p=mo(f);p&&p.benefitAmount>0&&(e.push(p),d.debug("메인 혜택 추가",{mainParsed:p}));const g=u.querySelector("dd");if(g){const x=g.querySelectorAll(".tit_sub");d.debug("서브타이틀 수",{count:x.length}),x.forEach(h=>{const _=h.textContent?.trim()||"";if(d.debug("서브타이틀",{subTitle:_}),_.includes("안내사항")||_.includes("적립제외"))return;let S=h.nextElementSibling;for(;S&&S.tagName!=="UL"&&S.tagName!=="SPAN";)S=S.nextElementSibling;if(S&&S.tagName==="UL"){const A=S.querySelectorAll("li");d.debug("리스트 아이템 수",{count:A.length}),A.forEach(L=>{const te=L.textContent?.trim()||"";d.debug("아이템",{itemText:te});const v=go(_,te);v&&(e.find(X=>X.cardName===v.cardName&&X.benefitType===v.benefitType&&X.benefitAmount===v.benefitAmount)||(e.push(v),d.debug("서브 혜택 추가",{subBenefit:v})))})}})}})}else d.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(s=>{const u=s.textContent?.trim()||"";if(u.includes("카드")||u.includes("신한")){const f=s.closest("li")?.querySelector(".value")?.textContent?.trim()||"",p=w(f);if(p){const g=u.replace(" 결제 시","").trim();e.find(x=>x.cardName===g&&x.benefitType==="포인트")||e.push({cardName:g,benefitAmount:p,benefitType:"포인트",condition:"결제 시"})}}}),d.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(r){d.error(T.PAR_E003,"카드 혜택 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function mo(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const u of e){const l=t.match(u);if(l){n=l[1];break}}if(!n)return null;let r=0,o="",i="";const a=t.match(/최대\s*(\d+)%\s*적립/);a&&(r=parseInt(a[1],10),o="적립",i="결제 시");const s=t.match(/([\d,]+)원\s*할인/);return s&&(r=w(s[1])||0,o="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:r,benefitType:o||(t.includes("할인")?"할인":"적립"),condition:i}}function go(t,e){if(!e)return null;let n="",r=0,o="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const a=e.match(/([\d,]+)원\s*할인/);a&&(r=w(a[1])||0,o="할인");const s=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return s&&!o&&(r=parseFloat(s[1]),o="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!r||!o?null:{cardName:n,benefitAmount:r,benefitType:o,condition:i}}const ho=t=>{const e=[],n=M.installment;try{const r=t.querySelector(n.dialogContainer);if(r&&(r.querySelectorAll(".card_box").forEach(i=>{const s=i.querySelector("dt")?.textContent?.trim()||"";if(!s)return;i.querySelectorAll("dd").forEach(l=>{const f=l.textContent?.trim()||"";if(!f)return;const p=bo(s,f);p&&e.push(p)})}),d.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const o=t.querySelector(n.triggerButton);if(o){const s=(o.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);s&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"})}xo(t).forEach(a=>{e.find(s=>s.cardName===a.cardName)||e.push(a)})}d.info("총 무이자 할부 카드",{count:e.length})}catch(r){d.error(T.PAR_E003,"무이자 할부 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function bo(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const r=n[1],i=r.split(",").map(f=>parseInt(f.trim(),10)).filter(f=>!isNaN(f)),a=i.length>0?Math.max(...i):0;if(a===0)return null;let s=null;const u=e.match(/(\d+)만원/);u&&(s=parseInt(u[1],10)*1e4);let l="";return e.includes("11pay")?l="11pay 결제 시":e.includes("카카오페이")?l="카카오페이 결제 시":s&&(l=`${s/1e4}만원 이상`),{cardName:t,maxMonths:a,minAmount:s,months:`${r}개월`,condition:l}}function xo(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(o=>{const i=o.textContent||"",a=i.match(/최대\s*(\d+)\s*개월\s*무이자/);a&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(a[1],10),minAmount:null,months:`최대 ${a[1]}개월`,condition:"무이자 할부"}),n.forEach(s=>{if(i.includes(s)){const l=i.substring(i.indexOf(s)).match(/([\d,]+)개월/);if(l&&!e.find(p=>p.cardName.includes(s))){const p=l[1],g=p.split(",").map(h=>parseInt(h.trim(),10)),x=Math.max(...g.filter(h=>!isNaN(h)));e.push({cardName:`${s}카드`,maxMonths:x,minAmount:null,months:`${p}개월`,condition:""})}}})}),e}const yo=t=>{const e=[],n=M.coupon;try{const r=t.querySelector(n.badge);if(r?.textContent){const i=r.textContent.trim(),a=Eo(i);a&&(e.push(a),d.debug("쿠폰 추출",{coupon:a}))}t.querySelectorAll(n.item).forEach(i=>{const a=i.querySelector(n.name),s=i.querySelector(n.discount);if(a||s){const u=a?.textContent?.trim()||"쿠폰",l=s?.textContent||"",f=l.includes("원")?w(l):null,p=l.includes("%")?w(l):null;e.push({name:u,discountAmount:f,discountRate:p})}})}catch(r){d.error(T.PAR_E003,"쿠폰 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function Eo(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:w(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function ln(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:r,name:o}of n)for(const i of r)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${o} (신용)`:e.includes("체크카드")?`${o} (체크)`:o;return e||t}function _o(t,e){const n=t.map(r=>{const o=ln(r.cardName),i=r.benefitType==="할인",a=r.benefitAmount<=100?r.benefitAmount:0;let s="";return i?s=`${r.benefitAmount.toLocaleString()}원 할인`:r.benefitAmount<=100?s=`${r.benefitAmount}% 적립`:s=`${r.benefitAmount.toLocaleString()}P 적립`,{card:o,cardName:o,benefit:s,discount:i?r.benefitAmount:0,rate:a,condition:r.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(r=>{if(r.cardName==="__INSTALLMENT_SUMMARY__")return;const o=ln(r.cardName);n.push({card:o,cardName:o,benefit:`${r.months} 무이자`,discount:0,rate:0,condition:r.condition,benefitType:"installment",pointAmount:0})}),n}class Sn extends Ee{siteName=yt.siteName;selectors={amount:[M.price.salePrice,M.price.salePriceAlt,M.price.maxDiscountPrice],title:[M.product.title,M.product.titleAlt],image:[M.image.main,M.image.mainAlt]};static isProductPage(e){if(!/11st\.co\.kr/.test(e))return!1;const o=![/11st\.co\.kr\/?$/,/11st\.co\.kr\/category/,/11st\.co\.kr\/search/,/11st\.co\.kr\/browsing/,/11st\.co\.kr\/best/,/11st\.co\.kr\/event$/,/11st\.co\.kr\/cart/,/11st\.co\.kr\/order/,/11st\.co\.kr\/my11st/,/11st\.co\.kr\/login/,/11st\.co\.kr\/member/].some(i=>i.test(e));return d.debug(`isProductPage("${e}") = ${o}`),o}static extractProductId(e){return oo(e)}parse(e){try{d.info("🔍 Parsing 11번가 page...");const n=no(e),r=ro(e),o=Cn(e),i=io(e),a=so(e),s=co(e);let u=s.amount;const{originalPrice:l,discountPrice:f,maxDiscountPrice:p,discountRate:g,maxDiscountRate:x}=s;if(u||(u=ao(e)),!u)return d.debug("❌ No price found"),null;const h=lo(e),_=uo(e),{points:S,cardBenefits:A,installments:L,coupons:te,totalPointAmount:v,totalCardBenefitAmount:ce,maxInstallmentMonths:X}=_,je=_o(A,L),_e=[];return g&&_e.push({rate:g,type:"SALE_DISCOUNT",description:"할인가"}),h.forEach(Ce=>{_e.push({rate:Ce.amount,type:Ce.type.toUpperCase().replace(/\s+/g,"_"),description:Ce.type})}),d.info(`✅ Found: ${u.toLocaleString()} ${yt.currency}`),d.debug("파싱 결과",{title:n,totalPointAmount:v,cardBenefitsCount:A.length,installmentsCount:L.length,maxInstallmentMonths:X}),{price:u,amount:u,currency:yt.currency,title:n?`${n}${r?` ${r}`:""}`:void 0,imageUrl:o||void 0,images:i,originalPrice:l||void 0,discountPrice:f||p||void 0,discountRate:g||void 0,cardBenefits:je,discounts:_e,elevenst:{maxDiscountPrice:p,maxDiscountRate:x,maxInstallmentMonths:X,points:S,installments:L,coupons:te,totalPointAmount:v,totalCardBenefitAmount:ce,seller:a.seller,sellerRating:a.rating,discountDetails:h}}}catch(n){return d.error(T.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const z={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},Co=t=>{const e=t.querySelector(z.product.title);if(e?.textContent){const n=e.textContent.trim();return d.debug("상품명",{title:n}),n}return d.warn("상품명을 찾을 수 없음"),null},So=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const r of e){const i=r.src;if(i.includes("/still/600"))return d.debug("메인 이미지 (600px)",{src:i}),i}for(const r of e){const i=r.src;if(i.includes("/still/"))return d.debug("메인 이미지",{src:i}),i}const n=t.querySelector(z.product.mainImage);return n?.src?(d.debug("대체 이미지",{src:n.src}),n.src):(d.warn("상품 이미지를 찾을 수 없음"),null)},Ao=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(r=>{let i=r.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),d.debug("총 이미지",{count:e.length}),e},To=t=>{const e={},n=t.querySelector(z.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const r=t.querySelector(z.seller.official);e.isOfficial=!!r;const o=t.querySelector(z.seller.seller);return o?.textContent&&(e.seller=o.textContent.trim()),e},He=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return w(e)},wo=t=>{const e=z.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const o=He(n.textContent);if(o)return d.debug("결제할인가",{price:o}),o}const r=t.querySelector(e.discountPriceAlt);if(r?.textContent){const o=He(r.textContent);if(o)return d.debug("결제할인가 (alt)",{price:o}),o}return null},vo=t=>{const e=z.price,n=t.querySelector(e.salePrice);if(n?.textContent){const r=He(n.textContent);if(r)return d.debug("판매가",{price:r}),r}return null},Po=t=>{const e=z.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const r=He(n.textContent);if(r)return d.debug("정가",{price:r}),r}return null},Ro=t=>{const e=z.price,n=t.querySelector(e.discountRate);if(n?.textContent){const r=n.textContent.match(/(\d+)\s*%/);if(r){const o=parseInt(r[1],10);return d.debug("할인율",{rate:o}),o}}return null},No=t=>{d.debug("가격 정보 추출 시작...");const e=Po(t),n=vo(t),r=wo(t),o=Ro(t),i=r||n||e;return d.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}),{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}},Io=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const r=n.textContent||"";if(r.includes("원")){const o=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(o){const i=w(o[1]);if(i&&i>=1e3)return d.debug("DOM 스캔 가격",{price:i}),i}}}return null},ko=t=>{const e=[],n=z.cardBenefit,r=t.querySelector(n.container);return r?(r.querySelectorAll(".gmarketcard_area img").forEach(i=>{const a=i,s=a.src,u=a.alt||"";if(s){let l=u;l||(s.includes("smile")||s.includes("Smile")?l="스마일카드":s.includes("samsung")?l="삼성카드":l="G마켓 제휴카드"),e.push({card:l,cardName:l,benefit:"G마켓 제휴카드 혜택",imageUrl:s}),d.debug("제휴카드",{cardName:l,src:s})}}),e):(d.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},Do=t=>{const e=[],n=z.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(o=>{const i=o.querySelector(n.discountItemTitle),a=o.querySelector(n.discountItemDesc),s=o.querySelector(n.discountItemPrice),u=i?.textContent?.trim()||"",l=a?.textContent?.trim()||"";let f;if(s?.textContent){const p=s.textContent.match(/(\d{1,3}(?:,\d{3})*)/);p&&(f=parseInt(p[1].replace(/,/g,""),10))}u&&(e.push({title:u,description:l,discountPrice:f}),d.debug("결제 할인",{title:u,description:l}))}),e},Oo=t=>{d.debug("카드 혜택 추출 시작...");const e=[],n=ko(t);e.push(...n),Do(t).forEach(i=>{const a=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(a){const s=a[1].includes("카드")?a[1]:`${a[1]}카드`,u=i.title.match(/(\d+(?:\.\d+)?)\s*%/),l=u?parseFloat(u[1]):void 0;e.some(f=>f.cardName===s)||e.push({card:s,cardName:s,benefit:i.title,discount:l,rate:l})}});const o=t.querySelector(".box__payment-discount");if(o){const a=(o.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(a){const s=parseInt(a[1],10);e.some(u=>u.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${s}% 할인`,discount:s,rate:s})}}return e.sort((i,a)=>(a.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},Mo=t=>{const e=z.additionalBenefits,r=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!r)return null;let o="etc";r.includes("신세계포인트")?o="shinsegae_point":r.includes("스마일페이")?o="smile_pay":r.includes("스마일캐시")?o="smile_cash":r.includes("OK캐쉬백")&&(o="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(s=>{const u=s.querySelector(e.benefitLabel),l=s.querySelector(e.benefitValue),f=u?.textContent?.trim()||"",p=l?.textContent?.trim()||"";f&&p&&i.push({label:f,value:p})}),d.debug("추가 혜택",{type:o,title:r}),{type:o,title:r,details:i}},An=t=>{d.debug("추가 혜택 추출 시작...");const e=[],n=z.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(o=>{const i=Mo(o);i&&e.push(i)}),d.debug("총 추가 혜택",{count:e.length}),e},Lo=t=>{const e=An(t);for(const n of e)for(const r of n.details){const o=r.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(o)return{amount:parseInt(o[1].replace(/,/g,""),10),description:`${n.title}: ${r.value}`}}return null},Bo=t=>{const e=z.shipping,r=!!t.querySelector(e.starDelivery),o=t.querySelector(e.shippingInfo),i=r?"스타배송":"일반배송";let a,s,u=!1;if(o){const l=o.textContent||"",f=l.match(/(\d{1,3}(?:,\d{3})*)\s*원/);f?a=`${f[1]}원`:l.includes("무료")&&(a="무료배송",u=!0);const p=l.match(/(\d+\/\d+|\d+일)/);p&&(s=p[1])}return d.debug("배송 정보",{method:i,isStarDelivery:r,fee:a}),{method:i,isStarDelivery:r,isFree:u,fee:a,estimatedDate:s}};class Tn extends Ee{siteName="Gmarket";selectors={amount:[z.price.discountPrice,z.price.salePrice,z.price.originalPrice]};static isCheckoutPage(e){if(!/gmarket\.co\.kr/.test(e))return!1;const o=![/gmarket\.co\.kr\/?$/,/gmarket\.co\.kr\/n\/category/,/gmarket\.co\.kr\/n\/search/,/gmarket\.co\.kr\/n\/best$/,/gmarket\.co\.kr\/n\/deals$/,/gmarket\.co\.kr\/n\/event$/,/gmarket\.co\.kr\/cart/,/gmarket\.co\.kr\/order/,/gmarket\.co\.kr\/my/,/gmarket\.co\.kr\/login/,/gmarket\.co\.kr\/join/].some(i=>i.test(e));return se.debug("isCheckoutPage check",{url:e,isCheckout:o}),o}parse(e){try{se.info("Parsing Gmarket page...");const n=Co(e),r=So(e),o=Ao(e),i=To(e),a=No(e);let s=a.amount;if(s||(s=Io(e)),!s)return se.warn("No price found in Gmarket page"),null;const u=Oo(e),l=yn(u,s),f=En(l),p=An(e),g=Lo(e),x=Bo(e);return se.info("Parse successful",{amount:s,cardCount:f.length}),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:[],originalPrice:a.originalPrice||void 0,discountPrice:a.discountPrice||void 0,cardBenefits:f,additionalBenefits:p.length>0?p:void 0,cashback:g||void 0,shippingInfo:x||void 0,sellerInfo:i||void 0,discounts:[]}}catch(n){return se.error(T.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Uo={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class wn extends Ee{siteName="Amazon";selectors={amount:Uo.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{d.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:a}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const zo={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class vn extends Ee{siteName="eBay";selectors={amount:zo.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{d.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:a}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Fo={amount:[]};class Pn extends Ee{siteName="Fallback";selectors={amount:Fo.amount};parse(e){try{d.info("🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return d.debug('❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return d.debug("❌ Invalid amount",{amount:o}),null;const{title:i,imageUrl:a}=this.extractCommonInfo(e);return d.info(`✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function qo(t){return _n.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:Sn.isProductPage(t)?{site:"11st",isCheckout:!0}:Tn.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:wn.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:vn.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function $o(t){switch(t){case"coupang":return new _n;case"11st":return new Sn;case"gmarket":return new Tn;case"amazon":return new wn;case"ebay":return new vn;default:return new Pn}}function Wo(){return new Pn}function Rn(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";if(!chrome?.runtime?.sendMessage){lt.warn("Chrome extension API not available",{messageType:n,source:e});return}chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},r=>{if(chrome.runtime.lastError){lt.warn("Failed to send message to background",{error:chrome.runtime.lastError.message,messageType:n,source:e});return}r?.success&&lt.debug("Product data saved",{source:e,messageType:n})})}function Nn(t,e){let n=null;const r=(...o)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...o),n=null},e)};return r.cancel=()=>{n&&(clearTimeout(n),n=null)},r}const Ho=500;function Go(t){let e=!1,n=null,r=!1;const o=Nn(s=>{r||(ee.info("Dynamic content detected",{reason:s}),t(`dynamic-${s}`)||ee.warn("Dynamic reparse produced no result"))},Ho),i=s=>{if(r)return;const u=s.some(x=>Array.from(x.addedNodes).some(h=>h instanceof Element?h.tagName==="IFRAME"||!!h.querySelector("iframe"):!1)),l=!e&&s.some(x=>Array.from(x.addedNodes).some(h=>h instanceof Element?h.classList.contains("benefit")||!!h.querySelector(".benefit")||h.closest(".other_benefits")&&(h.querySelector("dt")||h.querySelector("dd")):!1)),f=document.querySelector(".other_benefits .benefit dt");if(!(l&&f||u))return;l&&(e=!0),o(u?"iframe":"benefit-content"),u&&(a(),ee.debug("Observer disconnected after iframe detection"))},a=()=>{r||(r=!0,n&&(n.disconnect(),n=null),ee.debug("DynamicContentObserver cleaned up"))};return document.body?(n=new MutationObserver(i),n.observe(document.body,{childList:!0,subtree:!0}),a):(ee.warn("document.body not available, observer not started"),a)}const Ko=500,jo=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],Yo=()=>!!document.querySelector(".other_benefits .benefit dt");function Vo(t){if(!window.location.hostname.includes("11st.co.kr"))return()=>{};ee.info("Setting up 11번가 benefit watcher");let e=!1,n=null,r=null;const o=new Map,i=Nn(l=>{e||Yo()&&(ee.info("Benefit content found",{source:l}),t(l))},Ko),a=new WeakSet,s=()=>{e||jo.forEach(l=>{document.querySelectorAll(l).forEach(p=>{if(a.has(p))return;a.add(p);const g=()=>{ee.debug("Benefit button clicked"),setTimeout(()=>i("benefit-click"),800)};o.set(p,g),p.addEventListener("click",g)})})};s(),r=new MutationObserver(()=>{s()}),document.body&&r.observe(document.body,{childList:!0,subtree:!0}),n=setTimeout(()=>{r&&!e&&(r.disconnect(),r=null,ee.debug("Benefit button observer disconnected (timeout)"))},5e3);const u=()=>{e||(e=!0,n&&(clearTimeout(n),n=null),r&&(r.disconnect(),r=null),o.forEach((l,f)=>{f.removeEventListener("click",l)}),o.clear(),ee.debug("ElevenStreetBenefitWatcher cleaned up"))};return window.addEventListener("beforeunload",u,{once:!0}),u}const Xo=window.self===window.top;let un=!1,ie=null;const Ge=[];async function In(t,e,n,r){try{if(N.info(I.NETWORK,"💰 [LOWEST_PRICE] Initiating price comparison",{url:t,product:e,currentPrice:n,site:r,timestamp:new Date().toISOString()}),m.comparison={status:"loading",query:e,error:null,data:null},V(),!chrome?.runtime?.sendMessage){N.error(I.NETWORK,T.NET_E002,"Chrome extension API not available",{}),m.comparison={status:"error",query:e,error:"Chrome extension API를 사용할 수 없습니다.",data:null},V();return}N.debug(I.NETWORK,"[LOWEST_PRICE] Checking server health...");const o=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!o?.success){N.error(I.NETWORK,T.NET_E002,"[LOWEST_PRICE] Server not available",{error:o?.error||"Server check failed"}),m.comparison={status:"error",query:e,error:o?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null},V();return}N.info(I.NETWORK,"[LOWEST_PRICE] Server healthy, sending comparison request");const i=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:e,currentPrice:n,currentUrl:t});i?.success?(N.info(I.NETWORK,"✅ [LOWEST_PRICE] Price comparison completed",{resultCount:i.data?.results?.length||0,fromCache:i.data?.fromCache,totalDuration:i.data?.totalDuration}),m.comparison={status:"success",query:e,error:null,data:i.data},V()):(N.warn(I.NETWORK,"[LOWEST_PRICE] Price comparison failed",{error:i?.error}),m.comparison={status:"error",query:e,error:i?.error||"가격 비교 검색 실패",data:null},V())}catch(o){N.error(I.NETWORK,T.NET_E002,"[LOWEST_PRICE] Request error",{error:o instanceof Error?o:new Error(String(o))}),m.comparison={status:"error",query:e,error:o instanceof Error?o.message:"알 수 없는 오류",data:null},V()}}async function kn(t=1500,e=!1){const n=ke.persist;n&&(n.hasHydrated?.()&&!e||await new Promise(r=>{let o=!1;const i=window.setTimeout(()=>{o||(o=!0,r())},t),a=n.onFinishHydration?.(()=>{o||(o=!0,window.clearTimeout(i),a&&a(),r())});try{n.rehydrate?.()}catch{}}))}function Dn(){const t=window.location.href,e=qo(t);if(!e)return N.debug(I.PARSER,"Not a supported page",{url:t}),null;N.info(I.PARSER,`Site detected: ${e.site}`,{url:t});let r=$o(e.site).parse(document);return!r&&(N.warn(I.PARSER,"Primary parser failed, trying fallback",{site:e.site}),r=Wo().parse(document),!r)?(N.error(I.PARSER,T.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(N.info(I.PARSER,"Parse successful",{title:r.title?.substring(0,50),amount:r.amount,cardBenefitsCount:r.cardBenefits?.length??0}),{paymentInfo:r,site:e.site})}function Ke(t,e){return{...t,site:e}}function dn(t){const e=Dn();return e?(ie=e,At(Ke(e.paymentInfo,e.site)),Rn(e.paymentInfo,t),!0):!1}function Zo(){const t=Dn();if(!t){N.warn(I.BOOTSTRAP,"Failed to extract payment info on init");return}ie=t,bn(Ke(t.paymentInfo,t.site)),Rn(t.paymentInfo,"initial"),(async()=>{await kn();const e=ke.getState();if(At(Ke(t.paymentInfo,t.site)),N.info(I.BOOTSTRAP,"⚙️ Display mode check",{displayMode:e.displayMode,autoFetchLowestPrice:e.autoFetchLowestPrice,hasTitle:!!t.paymentInfo.title}),e.displayMode==="lowest-price"){if(!t.paymentInfo.title){N.warn(I.BOOTSTRAP,"⚠️ [LOWEST_PRICE] Cannot fetch: no product title");return}e.autoFetchLowestPrice?(N.info(I.BOOTSTRAP,"🚀 [LOWEST_PRICE] Auto fetch enabled",{displayMode:e.displayMode,productTitle:t.paymentInfo.title.substring(0,50)}),In(window.location.href,t.paymentInfo.title,t.paymentInfo.amount,t.site)):N.info(I.BOOTSTRAP,"⏸️ [LOWEST_PRICE] Manual mode (will fetch when panel opens)",{displayMode:e.displayMode})}else N.debug(I.BOOTSTRAP,"💳 Card benefits mode selected")})()}function Jo(){Ge.forEach(t=>{try{t()}catch(e){N.warn(I.BOOTSTRAP,"Cleanup error",{error:e})}}),Ge.length=0}function Qo(){if(!Xo||un)return;un=!0,N.info(I.BOOTSTRAP,"Content script starting"),Zo(),chrome?.storage?.onChanged&&chrome.storage.onChanged.addListener((n,r)=>{r==="local"&&(!n||!Object.prototype.hasOwnProperty.call(n,Vn.SETTINGS)||(async()=>{await kn(1500,!0);const o=ke.getState();ie&&At(Ke(ie.paymentInfo,ie.site)),o.displayMode==="lowest-price"&&o.autoFetchLowestPrice&&ie?.paymentInfo?.title&&In(window.location.href,ie.paymentInfo.title,ie.paymentInfo.amount,ie.site)})())});const t=Go(n=>dn(n));Ge.push(t);const e=Vo(n=>{dn(n)});Ge.push(e),window.addEventListener("beforeunload",Jo,{once:!0})}Zn(Qo);
