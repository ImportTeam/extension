import{b as Hn,p as re,E as v,a as d,n as Ht,d as Z,l as H,L as W}from"./assets/index-CtnQ7lw9.js";import{u as sn}from"./assets/store-CFTU3jlD.js";import{C as Wn}from"./assets/constants-4DKqSpZt.js";import"./assets/chromeStorage-8YJmZKR_.js";const Gn=window.self===window.top;function Kn(t){if(!Gn){Hn.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const Yn=`
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
`,Ne=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const s=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(s,o).format(i)},jn=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),ot="picsel-toggle-host",it="picsel-toggle-panel",Vn={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},Xn=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return Vn[e]||String(t)},h={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},Zn=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const p=document.createElement("img");p.src=r,p.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(p)}else{const p=document.createElement("span");p.textContent="No Image",p.style.fontSize="11px",p.style.color="#64748b",n.appendChild(p)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const s=document.createElement("div");s.className="picsel-price";const c=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=Ne(c,t.currency??"KRW");if(l){const p=document.createElement("div");p.className="picsel-final-price",p.textContent=l,s.appendChild(p)}const u=Ne(t.originalPrice,t.currency??"KRW"),f=jn(t.originalPrice,c);if(u&&f){const p=document.createElement("div");p.className="picsel-original-price",p.textContent=u;const x=document.createElement("div");x.className="picsel-discount-tag",x.textContent=`-${f}%`,s.appendChild(p),s.appendChild(x)}if(o.appendChild(i),o.appendChild(s),t.shippingInfo){const p=document.createElement("div");p.className="picsel-shipping",p.textContent=`배송: ${t.shippingInfo}`,o.appendChild(p)}return e.appendChild(n),e.appendChild(o),e};const{entries:an,setPrototypeOf:Wt,isFrozen:Jn,getPrototypeOf:Qn,getOwnPropertyDescriptor:er}=Object;let{freeze:z,seal:G,create:ft}=Object,{apply:mt,construct:gt}=typeof Reflect<"u"&&Reflect;z||(z=function(e){return e});G||(G=function(e){return e});mt||(mt=function(e,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return e.apply(n,o)});gt||(gt=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new e(...r)});const Be=F(Array.prototype.forEach),tr=F(Array.prototype.lastIndexOf),Gt=F(Array.prototype.pop),Se=F(Array.prototype.push),nr=F(Array.prototype.splice),qe=F(String.prototype.toLowerCase),ct=F(String.prototype.toString),st=F(String.prototype.match),Ae=F(String.prototype.replace),rr=F(String.prototype.indexOf),or=F(String.prototype.trim),Y=F(Object.prototype.hasOwnProperty),q=F(RegExp.prototype.test),Te=ir(TypeError);function F(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return mt(t,e,r)}}function ir(t){return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return gt(t,n)}}function C(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:qe;Wt&&Wt(t,null);let r=e.length;for(;r--;){let o=e[r];if(typeof o=="string"){const i=n(o);i!==o&&(Jn(e)||(e[r]=i),o=i)}t[o]=!0}return t}function cr(t){for(let e=0;e<t.length;e++)Y(t,e)||(t[e]=null);return t}function ne(t){const e=ft(null);for(const[n,r]of an(t))Y(t,n)&&(Array.isArray(r)?e[n]=cr(r):r&&typeof r=="object"&&r.constructor===Object?e[n]=ne(r):e[n]=r);return e}function ve(t,e){for(;t!==null;){const r=er(t,e);if(r){if(r.get)return F(r.get);if(typeof r.value=="function")return F(r.value)}t=Qn(t)}function n(){return null}return n}const Kt=z(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),at=z(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),lt=z(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),sr=z(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ut=z(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ar=z(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Yt=z(["#text"]),jt=z(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),dt=z(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Vt=z(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ue=z(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),lr=G(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ur=G(/<%[\w\W]*|[\w\W]*%>/gm),dr=G(/\$\{[\w\W]*/gm),pr=G(/^data-[\-\w.\u00B7-\uFFFF]+$/),fr=G(/^aria-[\-\w]+$/),ln=G(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),mr=G(/^(?:\w+script|data):/i),gr=G(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),un=G(/^html$/i),hr=G(/^[a-z][.\w]*(-[.\w]+)+$/i);var Xt=Object.freeze({__proto__:null,ARIA_ATTR:fr,ATTR_WHITESPACE:gr,CUSTOM_ELEMENT:hr,DATA_ATTR:pr,DOCTYPE_NAME:un,ERB_EXPR:ur,IS_ALLOWED_URI:ln,IS_SCRIPT_OR_DATA:mr,MUSTACHE_EXPR:lr,TMPLIT_EXPR:dr});const we={element:1,text:3,progressingInstruction:7,comment:8,document:9},br=function(){return typeof window>"u"?null:window},xr=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const i="dompurify"+(r?"#"+r:"");try{return e.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Zt=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function dn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:br();const e=E=>dn(E);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==we.document||!t.Element)return e.isSupported=!1,e;let{document:n}=t;const r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:c,Element:l,NodeFilter:u,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:x,trustedTypes:y}=t,g=l.prototype,_=ve(g,"cloneNode"),S=ve(g,"remove"),N=ve(g,"nextSibling"),j=ve(g,"childNodes"),J=ve(g,"parentNode");if(typeof s=="function"){const E=n.createElement("template");E.content&&E.content.ownerDocument&&(n=E.content.ownerDocument)}let T,oe="";const{implementation:V,createNodeIterator:He,createDocumentFragment:xe,getElementsByTagName:Ee}=n,{importNode:kn}=r;let U=Zt();e.isSupported=typeof an=="function"&&typeof J=="function"&&V&&V.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:We,ERB_EXPR:Ge,TMPLIT_EXPR:Ke,DATA_ATTR:Rn,ARIA_ATTR:In,IS_SCRIPT_OR_DATA:Dn,ATTR_WHITESPACE:xt,CUSTOM_ELEMENT:Mn}=Xt;let{IS_ALLOWED_URI:Et}=Xt,R=null;const yt=C({},[...Kt,...at,...lt,...ut,...Yt]);let M=null;const _t=C({},[...jt,...dt,...Vt,...Ue]);let P=Object.seal(ft(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ye=null,Ye=null;const ae=Object.seal(ft(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ct=!0,je=!0,St=!1,At=!0,le=!1,ke=!0,ie=!1,Ve=!1,Xe=!1,ue=!1,Re=!1,Ie=!1,Tt=!0,vt=!1;const Ln="user-content-";let Ze=!0,_e=!1,de={},pe=null;const wt=C({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Pt=null;const Nt=C({},["audio","video","img","source","image","track"]);let Je=null;const kt=C({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),De="http://www.w3.org/1998/Math/MathML",Me="http://www.w3.org/2000/svg",Q="http://www.w3.org/1999/xhtml";let fe=Q,Qe=!1,et=null;const On=C({},[De,Me,Q],ct);let Le=C({},["mi","mo","mn","ms","mtext"]),Oe=C({},["annotation-xml"]);const Bn=C({},["title","style","font","a","script"]);let Ce=null;const Un=["application/xhtml+xml","text/html"],qn="text/html";let I=null,me=null;const zn=n.createElement("form"),Rt=function(a){return a instanceof RegExp||a instanceof Function},tt=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(me&&me===a)){if((!a||typeof a!="object")&&(a={}),a=ne(a),Ce=Un.indexOf(a.PARSER_MEDIA_TYPE)===-1?qn:a.PARSER_MEDIA_TYPE,I=Ce==="application/xhtml+xml"?ct:qe,R=Y(a,"ALLOWED_TAGS")?C({},a.ALLOWED_TAGS,I):yt,M=Y(a,"ALLOWED_ATTR")?C({},a.ALLOWED_ATTR,I):_t,et=Y(a,"ALLOWED_NAMESPACES")?C({},a.ALLOWED_NAMESPACES,ct):On,Je=Y(a,"ADD_URI_SAFE_ATTR")?C(ne(kt),a.ADD_URI_SAFE_ATTR,I):kt,Pt=Y(a,"ADD_DATA_URI_TAGS")?C(ne(Nt),a.ADD_DATA_URI_TAGS,I):Nt,pe=Y(a,"FORBID_CONTENTS")?C({},a.FORBID_CONTENTS,I):wt,ye=Y(a,"FORBID_TAGS")?C({},a.FORBID_TAGS,I):ne({}),Ye=Y(a,"FORBID_ATTR")?C({},a.FORBID_ATTR,I):ne({}),de=Y(a,"USE_PROFILES")?a.USE_PROFILES:!1,Ct=a.ALLOW_ARIA_ATTR!==!1,je=a.ALLOW_DATA_ATTR!==!1,St=a.ALLOW_UNKNOWN_PROTOCOLS||!1,At=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,le=a.SAFE_FOR_TEMPLATES||!1,ke=a.SAFE_FOR_XML!==!1,ie=a.WHOLE_DOCUMENT||!1,ue=a.RETURN_DOM||!1,Re=a.RETURN_DOM_FRAGMENT||!1,Ie=a.RETURN_TRUSTED_TYPE||!1,Xe=a.FORCE_BODY||!1,Tt=a.SANITIZE_DOM!==!1,vt=a.SANITIZE_NAMED_PROPS||!1,Ze=a.KEEP_CONTENT!==!1,_e=a.IN_PLACE||!1,Et=a.ALLOWED_URI_REGEXP||ln,fe=a.NAMESPACE||Q,Le=a.MATHML_TEXT_INTEGRATION_POINTS||Le,Oe=a.HTML_INTEGRATION_POINTS||Oe,P=a.CUSTOM_ELEMENT_HANDLING||{},a.CUSTOM_ELEMENT_HANDLING&&Rt(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(P.tagNameCheck=a.CUSTOM_ELEMENT_HANDLING.tagNameCheck),a.CUSTOM_ELEMENT_HANDLING&&Rt(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(P.attributeNameCheck=a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),a.CUSTOM_ELEMENT_HANDLING&&typeof a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(P.allowCustomizedBuiltInElements=a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),le&&(je=!1),Re&&(ue=!0),de&&(R=C({},Yt),M=[],de.html===!0&&(C(R,Kt),C(M,jt)),de.svg===!0&&(C(R,at),C(M,dt),C(M,Ue)),de.svgFilters===!0&&(C(R,lt),C(M,dt),C(M,Ue)),de.mathMl===!0&&(C(R,ut),C(M,Vt),C(M,Ue))),a.ADD_TAGS&&(typeof a.ADD_TAGS=="function"?ae.tagCheck=a.ADD_TAGS:(R===yt&&(R=ne(R)),C(R,a.ADD_TAGS,I))),a.ADD_ATTR&&(typeof a.ADD_ATTR=="function"?ae.attributeCheck=a.ADD_ATTR:(M===_t&&(M=ne(M)),C(M,a.ADD_ATTR,I))),a.ADD_URI_SAFE_ATTR&&C(Je,a.ADD_URI_SAFE_ATTR,I),a.FORBID_CONTENTS&&(pe===wt&&(pe=ne(pe)),C(pe,a.FORBID_CONTENTS,I)),Ze&&(R["#text"]=!0),ie&&C(R,["html","head","body"]),R.table&&(C(R,["tbody"]),delete ye.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw Te('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Te('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');T=a.TRUSTED_TYPES_POLICY,oe=T.createHTML("")}else T===void 0&&(T=xr(y,o)),T!==null&&typeof oe=="string"&&(oe=T.createHTML(""));z&&z(a),me=a}},It=C({},[...at,...lt,...sr]),Dt=C({},[...ut,...ar]),Fn=function(a){let m=J(a);(!m||!m.tagName)&&(m={namespaceURI:fe,tagName:"template"});const b=qe(a.tagName),w=qe(m.tagName);return et[a.namespaceURI]?a.namespaceURI===Me?m.namespaceURI===Q?b==="svg":m.namespaceURI===De?b==="svg"&&(w==="annotation-xml"||Le[w]):!!It[b]:a.namespaceURI===De?m.namespaceURI===Q?b==="math":m.namespaceURI===Me?b==="math"&&Oe[w]:!!Dt[b]:a.namespaceURI===Q?m.namespaceURI===Me&&!Oe[w]||m.namespaceURI===De&&!Le[w]?!1:!Dt[b]&&(Bn[b]||!It[b]):!!(Ce==="application/xhtml+xml"&&et[a.namespaceURI]):!1},X=function(a){Se(e.removed,{element:a});try{J(a).removeChild(a)}catch{S(a)}},ce=function(a,m){try{Se(e.removed,{attribute:m.getAttributeNode(a),from:m})}catch{Se(e.removed,{attribute:null,from:m})}if(m.removeAttribute(a),a==="is")if(ue||Re)try{X(m)}catch{}else try{m.setAttribute(a,"")}catch{}},Mt=function(a){let m=null,b=null;if(Xe)a="<remove></remove>"+a;else{const k=st(a,/^[\r\n\t ]+/);b=k&&k[0]}Ce==="application/xhtml+xml"&&fe===Q&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");const w=T?T.createHTML(a):a;if(fe===Q)try{m=new x().parseFromString(w,Ce)}catch{}if(!m||!m.documentElement){m=V.createDocument(fe,"template",null);try{m.documentElement.innerHTML=Qe?oe:w}catch{}}const B=m.body||m.documentElement;return a&&b&&B.insertBefore(n.createTextNode(b),B.childNodes[0]||null),fe===Q?Ee.call(m,ie?"html":"body")[0]:ie?m.documentElement:B},Lt=function(a){return He.call(a.ownerDocument||a,a,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},nt=function(a){return a instanceof p&&(typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||!(a.attributes instanceof f)||typeof a.removeAttribute!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function")},Ot=function(a){return typeof c=="function"&&a instanceof c};function ee(E,a,m){Be(E,b=>{b.call(e,a,m,me)})}const Bt=function(a){let m=null;if(ee(U.beforeSanitizeElements,a,null),nt(a))return X(a),!0;const b=I(a.nodeName);if(ee(U.uponSanitizeElement,a,{tagName:b,allowedTags:R}),ke&&a.hasChildNodes()&&!Ot(a.firstElementChild)&&q(/<[/\w!]/g,a.innerHTML)&&q(/<[/\w!]/g,a.textContent)||a.nodeType===we.progressingInstruction||ke&&a.nodeType===we.comment&&q(/<[/\w]/g,a.data))return X(a),!0;if(!(ae.tagCheck instanceof Function&&ae.tagCheck(b))&&(!R[b]||ye[b])){if(!ye[b]&&qt(b)&&(P.tagNameCheck instanceof RegExp&&q(P.tagNameCheck,b)||P.tagNameCheck instanceof Function&&P.tagNameCheck(b)))return!1;if(Ze&&!pe[b]){const w=J(a)||a.parentNode,B=j(a)||a.childNodes;if(B&&w){const k=B.length;for(let $=k-1;$>=0;--$){const te=_(B[$],!0);te.__removalCount=(a.__removalCount||0)+1,w.insertBefore(te,N(a))}}}return X(a),!0}return a instanceof l&&!Fn(a)||(b==="noscript"||b==="noembed"||b==="noframes")&&q(/<\/no(script|embed|frames)/i,a.innerHTML)?(X(a),!0):(le&&a.nodeType===we.text&&(m=a.textContent,Be([We,Ge,Ke],w=>{m=Ae(m,w," ")}),a.textContent!==m&&(Se(e.removed,{element:a.cloneNode()}),a.textContent=m)),ee(U.afterSanitizeElements,a,null),!1)},Ut=function(a,m,b){if(Tt&&(m==="id"||m==="name")&&(b in n||b in zn))return!1;if(!(je&&!Ye[m]&&q(Rn,m))){if(!(Ct&&q(In,m))){if(!(ae.attributeCheck instanceof Function&&ae.attributeCheck(m,a))){if(!M[m]||Ye[m]){if(!(qt(a)&&(P.tagNameCheck instanceof RegExp&&q(P.tagNameCheck,a)||P.tagNameCheck instanceof Function&&P.tagNameCheck(a))&&(P.attributeNameCheck instanceof RegExp&&q(P.attributeNameCheck,m)||P.attributeNameCheck instanceof Function&&P.attributeNameCheck(m,a))||m==="is"&&P.allowCustomizedBuiltInElements&&(P.tagNameCheck instanceof RegExp&&q(P.tagNameCheck,b)||P.tagNameCheck instanceof Function&&P.tagNameCheck(b))))return!1}else if(!Je[m]){if(!q(Et,Ae(b,xt,""))){if(!((m==="src"||m==="xlink:href"||m==="href")&&a!=="script"&&rr(b,"data:")===0&&Pt[a])){if(!(St&&!q(Dn,Ae(b,xt,"")))){if(b)return!1}}}}}}}return!0},qt=function(a){return a!=="annotation-xml"&&st(a,Mn)},zt=function(a){ee(U.beforeSanitizeAttributes,a,null);const{attributes:m}=a;if(!m||nt(a))return;const b={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:M,forceKeepAttr:void 0};let w=m.length;for(;w--;){const B=m[w],{name:k,namespaceURI:$,value:te}=B,ge=I(k),rt=te;let L=k==="value"?rt:or(rt);if(b.attrName=ge,b.attrValue=L,b.keepAttr=!0,b.forceKeepAttr=void 0,ee(U.uponSanitizeAttribute,a,b),L=b.attrValue,vt&&(ge==="id"||ge==="name")&&(ce(k,a),L=Ln+L),ke&&q(/((--!?|])>)|<\/(style|title|textarea)/i,L)){ce(k,a);continue}if(ge==="attributename"&&st(L,"href")){ce(k,a);continue}if(b.forceKeepAttr)continue;if(!b.keepAttr){ce(k,a);continue}if(!At&&q(/\/>/i,L)){ce(k,a);continue}le&&Be([We,Ge,Ke],$t=>{L=Ae(L,$t," ")});const Ft=I(a.nodeName);if(!Ut(Ft,ge,L)){ce(k,a);continue}if(T&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!$)switch(y.getAttributeType(Ft,ge)){case"TrustedHTML":{L=T.createHTML(L);break}case"TrustedScriptURL":{L=T.createScriptURL(L);break}}if(L!==rt)try{$?a.setAttributeNS($,k,L):a.setAttribute(k,L),nt(a)?X(a):Gt(e.removed)}catch{ce(k,a)}}ee(U.afterSanitizeAttributes,a,null)},$n=function E(a){let m=null;const b=Lt(a);for(ee(U.beforeSanitizeShadowDOM,a,null);m=b.nextNode();)ee(U.uponSanitizeShadowNode,m,null),Bt(m),zt(m),m.content instanceof i&&E(m.content);ee(U.afterSanitizeShadowDOM,a,null)};return e.sanitize=function(E){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},m=null,b=null,w=null,B=null;if(Qe=!E,Qe&&(E="<!-->"),typeof E!="string"&&!Ot(E))if(typeof E.toString=="function"){if(E=E.toString(),typeof E!="string")throw Te("dirty is not a string, aborting")}else throw Te("toString is not a function");if(!e.isSupported)return E;if(Ve||tt(a),e.removed=[],typeof E=="string"&&(_e=!1),_e){if(E.nodeName){const te=I(E.nodeName);if(!R[te]||ye[te])throw Te("root node is forbidden and cannot be sanitized in-place")}}else if(E instanceof c)m=Mt("<!---->"),b=m.ownerDocument.importNode(E,!0),b.nodeType===we.element&&b.nodeName==="BODY"||b.nodeName==="HTML"?m=b:m.appendChild(b);else{if(!ue&&!le&&!ie&&E.indexOf("<")===-1)return T&&Ie?T.createHTML(E):E;if(m=Mt(E),!m)return ue?null:Ie?oe:""}m&&Xe&&X(m.firstChild);const k=Lt(_e?E:m);for(;w=k.nextNode();)Bt(w),zt(w),w.content instanceof i&&$n(w.content);if(_e)return E;if(ue){if(Re)for(B=xe.call(m.ownerDocument);m.firstChild;)B.appendChild(m.firstChild);else B=m;return(M.shadowroot||M.shadowrootmode)&&(B=kn.call(r,B,!0)),B}let $=ie?m.outerHTML:m.innerHTML;return ie&&R["!doctype"]&&m.ownerDocument&&m.ownerDocument.doctype&&m.ownerDocument.doctype.name&&q(un,m.ownerDocument.doctype.name)&&($="<!DOCTYPE "+m.ownerDocument.doctype.name+`>
`+$),le&&Be([We,Ge,Ke],te=>{$=Ae($,te," ")}),T&&Ie?T.createHTML($):$},e.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};tt(E),Ve=!0},e.clearConfig=function(){me=null,Ve=!1},e.isValidAttribute=function(E,a,m){me||tt({});const b=I(E),w=I(a);return Ut(b,w,m)},e.addHook=function(E,a){typeof a=="function"&&Se(U[E],a)},e.removeHook=function(E,a){if(a!==void 0){const m=tr(U[E],a);return m===-1?void 0:nr(U[E],m,1)[0]}return Gt(U[E])},e.removeHooks=function(E){U[E]=[]},e.removeAllHooks=function(){U=Zt()},e}var Jt=dn();const Er=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),yr=(t,e)=>typeof t!="number"||e===null?null:t-e,Qt=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,r]of Object.entries(e))if(t.includes(n))return r;return t.replace("카드","").substring(0,2).toUpperCase()},_r=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드","SAMSUNG CARD"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:r,svg:o}of n)for(const i of r)if(e.includes(i.toUpperCase()))try{return chrome?.runtime?.getURL(`assets/card/${o}`)??null}catch{return null}return null},Cr=(t,e,n)=>{const r=" recommended",o=document.createElement("div");o.className=`picsel-card-benefit-item${r}`;const i=t.cardName||t.card||"카드",c=_r(i)||t.imageUrl;if(c){const g=document.createElement("div");g.className="picsel-card-image-wrapper";const _=document.createElement("img");_.src=c,_.alt=i,_.className="picsel-card-image",_.onerror=()=>{const S=Qt(i);g.textContent="";const N=document.createElement("div");N.className="picsel-card-initial",N.textContent=Jt.sanitize(S,{ALLOWED_TAGS:[]}),g.appendChild(N)},g.appendChild(_),o.appendChild(g)}else{const g=Qt(i),_=document.createElement("div");_.className="picsel-card-image-wrapper";const S=document.createElement("div");S.className="picsel-card-initial",S.textContent=Jt.sanitize(g,{ALLOWED_TAGS:[]}),_.appendChild(S),o.appendChild(_)}const l=document.createElement("div");l.className="picsel-card-info";const u=document.createElement("div");if(u.className="picsel-card-header",(t.discountAmount??0)>0){const g=document.createElement("span");g.className="picsel-recommended-badge",g.textContent=`${e+1}위`,u.appendChild(g)}const f=document.createElement("span");f.className="picsel-card-name";const p=i.includes(",")?i.split(",")[0].trim():i;if(f.textContent=p,u.appendChild(f),l.appendChild(u),t.benefit){const g=document.createElement("div");g.className="picsel-card-benefit-desc",g.textContent=t.benefit,l.appendChild(g)}o.appendChild(l);const x=document.createElement("div");if(x.className="picsel-card-amount",t.benefitType==="installment"){const g=document.createElement("div");g.className="picsel-card-installment",g.textContent=t.benefit||"무이자",x.appendChild(g)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const S=document.createElement("div");S.className="picsel-card-final-price";const N=Ne(t.finalPrice,n);S.textContent=N,x.appendChild(S)}const g=document.createElement("div");g.className="picsel-card-discount";const _=Ne(t.discountAmount,n);g.textContent=`-${_}`,x.appendChild(g)}else if(typeof t.rate=="number"&&t.rate>0){const g=document.createElement("div");g.className="picsel-card-rate",g.textContent=`${t.rate}%`,x.appendChild(g)}return o.appendChild(x),o},Sr=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const y=document.createElement("section");y.className="picsel-section picsel-card-section picsel-hidden",y.setAttribute("data-empty","true"),y.style.display="none";const g=document.createElement("h4");g.className="picsel-section-title",g.textContent="카드별 혜택",y.appendChild(g);const _=document.createElement("div");return _.className="picsel-empty-benefits",_.textContent="이 상품에는 카드 혜택이 없어요",y.appendChild(_),y}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(y=>{const g=y;if(g.benefitType==="point"||g.benefitType==="installment")return null;const _=g.rate??g.discount;let S=0,N=0;typeof _=="number"&&_>100||g.benefitType==="discount"?(S=typeof _=="number"&&_>100?_:g.discount??0,N=0):(N=typeof _=="number"&&_<=100?_:0,S=Er(n,N)??0);const j=yr(n,S);return{...g,cardName:g.cardName??g.card,rate:N,discountAmount:S??void 0,finalPrice:j??void 0}}).filter(y=>y!==null).sort((y,g)=>{const _=y?.discountAmount??0,S=g?.discountAmount??0;if(_!==S)return S-_;const N=y?.rate??0;return(g?.rate??0)-N})[0];if(!i)return null;const s=document.createElement("section");s.className="picsel-section picsel-card-section";const c=document.createElement("h4");c.className="picsel-section-title",c.textContent="추천 카드 혜택",s.appendChild(c);const l=document.createElement("div");l.className="picsel-card-benefit-list";const u=t.currency??"KRW",f=Cr(i,0,u);l.appendChild(f),s.appendChild(l);const p=[],x=t.elevenst?.totalPointAmount??0;if(x>0&&p.push(`최대 적립 포인트 ${x.toLocaleString()}P`),t.giftCardDiscount?.description&&p.push(t.giftCardDiscount.description),t.cashback?.description&&p.push(t.cashback.description),p.length>0){const y=document.createElement("div");y.className="picsel-sub-benefits",p.forEach(g=>{const _=document.createElement("div");_.className="picsel-sub-benefit-item",_.textContent=g,y.appendChild(_)}),s.appendChild(y)}return s},Ar=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{he(!1)}),n.appendChild(r),e.appendChild(n),e},en=t=>{const{buttonBadgeEl:e}=h;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const i=o,s=i.rate??i.discount;return typeof s=="number"?s:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=Ne(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},pn=()=>{const{contentEl:t,cachedData:e}=h;if(!t)return;if(t.textContent="",!e){const s=document.createElement("p");s.className="picsel-empty-state",s.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(s),en(null);return}const n=e,{displayMode:r}=sn.getState(),o=Zn(n);if(t.appendChild(o),r==="lowest-price"){const s=document.createElement("section");s.className="picsel-section picsel-lowest-price-section";const c=document.createElement("h4");c.className="picsel-section-title",c.textContent="💰 최저가 비교",s.appendChild(c);const l=document.createElement("div");l.className="picsel-empty-state",l.textContent="최저가 비교 기능은 개발 중입니다. 카드 혜택 모드로 전환하거나 수동으로 가격 비교를 시도해보세요.",s.appendChild(l),t.appendChild(s)}else{const s=Sr(n);s&&t.appendChild(s)}const i=Ar();i&&t.appendChild(i),en(n)},he=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=h;!e||!n||!r||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),r.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),r.textContent="PicSel 혜택 보기"))},Tr=()=>{if(h.mounted)return;if(document.getElementById(ot)){const i=document.getElementById(ot);i&&(h.hostElement=i,h.shadowRoot=i.shadowRoot,i.shadowRoot&&(h.toggleButton=i.shadowRoot.querySelector(".picsel-toggle-button"),h.buttonLabelEl=i.shadowRoot.querySelector(".picsel-toggle-label"),h.buttonBadgeEl=i.shadowRoot.querySelector(".picsel-toggle-badge"),h.panelEl=i.shadowRoot.querySelector(`#${it}`),h.closeButtonEl=i.shadowRoot.querySelector(".picsel-close-button"),h.contentEl=i.shadowRoot.querySelector(".picsel-panel-content"),h.panelTitleEl=i.shadowRoot.querySelector(".picsel-panel-title"))),h.mounted=!0;return}h.hostElement=document.createElement("div"),h.hostElement.id=ot,h.hostElement.style.position="fixed",h.hostElement.style.bottom="24px",h.hostElement.style.right="24px",h.hostElement.style.zIndex=String(2147483647),h.shadowRoot=h.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=Yn,h.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",h.shadowRoot.appendChild(e),h.toggleButton=document.createElement("button"),h.toggleButton.className="picsel-toggle-button",h.toggleButton.type="button",h.toggleButton.setAttribute("aria-expanded","false"),h.buttonLabelEl=document.createElement("span"),h.buttonLabelEl.className="picsel-toggle-label",h.buttonLabelEl.textContent="PicSel 혜택 보기",h.toggleButton.appendChild(h.buttonLabelEl),h.buttonBadgeEl=document.createElement("span"),h.buttonBadgeEl.className="picsel-toggle-badge",h.toggleButton.appendChild(h.buttonBadgeEl),e.appendChild(h.toggleButton),h.panelEl=document.createElement("div"),h.panelEl.className="picsel-panel",h.panelEl.id=it,h.panelEl.setAttribute("role","dialog"),h.panelEl.setAttribute("aria-hidden","true"),h.toggleButton.setAttribute("aria-controls",it);const n=document.createElement("div");n.className="picsel-panel-header",h.panelTitleEl=document.createElement("div"),h.panelTitleEl.className="picsel-panel-title",h.panelTitleEl.textContent="PicSel 혜택 정보",h.closeButtonEl=document.createElement("button"),h.closeButtonEl.type="button",h.closeButtonEl.className="picsel-close-button",h.closeButtonEl.setAttribute("aria-label","닫기"),h.closeButtonEl.textContent="✕",n.appendChild(h.panelTitleEl),n.appendChild(h.closeButtonEl),h.panelEl.appendChild(n),h.contentEl=document.createElement("div"),h.contentEl.className="picsel-panel-content",h.panelEl.appendChild(h.contentEl),e.appendChild(h.panelEl);const r=h.panelEl,o=h.hostElement;h.toggleButton.addEventListener("click",()=>{const i=!r.classList.contains("open");he(i)}),h.closeButtonEl.addEventListener("click",()=>{he(!1)}),window.addEventListener("keydown",i=>{i.key==="Escape"&&he(!1)}),document.addEventListener("click",i=>{if(!r.classList.contains("open"))return;const s=i.composedPath();o&&!s.includes(o)&&he(!1)},!0),document.body.appendChild(h.hostElement),h.mounted=!0},fn=()=>{if(h.panelTitleEl&&h.cachedData?.site){const t=Xn(h.cachedData.site);h.panelTitleEl.textContent=`${t} 혜택 정보`}},mn=t=>{h.cachedData={...t},Tr(),fn(),pn(),he(!1)},vr=t=>{if(h.cachedData={...h.cachedData??{},...t},!h.mounted){mn(h.cachedData);return}fn(),pn()},A=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},gn=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},wr=t=>t.includes("원")||t.includes("KRW")?"KRW":t.includes("$")||t.includes("USD")?"USD":t.includes("€")||t.includes("EUR")?"EUR":t.includes("¥")||t.includes("JPY")?"JPY":"KRW",bt=t=>typeof t=="number"&&t>100&&t<1e8,se=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},ht=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","BC","NH"];for(const n of e)if(t.includes(n))return n;return t.replace(/카드$/g,"")};class be{extractNumber(e){return A(e)}extractCurrency(e){return wr(e)}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){re.error(v.PAR_E004,`Selector error: ${r}`,{data:{siteName:this.siteName,selector:r},error:o instanceof Error?o:void 0})}return null}isValidPrice(e){return bt(e)}searchPriceInDOM(e,n){const r=e.querySelectorAll('[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]');for(const l of r){const f=(l.textContent||"").match(n);if(f)return re.debug("Found price in container",{siteName:this.siteName,price:f[0]}),f[0]}const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i,s=0;const c=1e3;for(;(i=o.nextNode())&&s<c;){s++;const u=(i.textContent||"").match(n);if(u)return re.debug("Found price via TreeWalker",{siteName:this.siteName,price:u[0],nodesScanned:s}),u[0]}return s>=c&&re.warn("TreeWalker hit node limit",{siteName:this.siteName,limit:c}),null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const K={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",".deal-price",".special-price",".discount-price strong",'[class*="sale"] strong','[class*="discount"] strong','div[class*="price"] > strong','span[class*="price"] > strong','[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]',".deal-title",".special-title",'h1[class*="product"]','h1[class*="title"]',"h1"],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},Pr=t=>{for(const e of K.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Nr=t=>{try{const e=t.querySelector(K.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r=`https:${r}`),r=r.split("?")[0],r}const n=t.querySelector(K.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o=`https:${o}`),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return d.error(v.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},kr=t=>{try{const e=[],n=new Set,r=t.querySelector(K.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let c=i.src;if(c&&!n.has(c)&&(c.startsWith("//")&&(c=`https:${c}`),c.includes("thumbnails/remote/")&&(c=c.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),c=c.split("?")[0],!n.has(c)&&(e.push(c),n.add(c),e.length>=10)))break}}return e}catch(e){return d.error(v.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},tn=t=>t>=100&&t<=1e8,Rr=t=>{let e=null,n=null,r=null;for(const o of K.amount)try{const i=t.querySelector(o);if(!i||!i.textContent)continue;const s=i.textContent.trim();if(!/[\d,]+\s*원?/.test(s)&&!/^\d{1,3}(,\d{3})*$/.test(s.replace(/[^\d,]/g,"")))continue;const c=A(s);if(!c||!tn(c))continue;if(d.debug(`Found via selector "${o}"`,{value:c}),/final|discount|final-price|deal|sale|coupon/i.test(o)){r=c,e=c;break}n||(n=c),e||(e=c)}catch(i){d.debug(`Selector ${o} failed`,{error:i})}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of o){const c=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c){const l=A(c[1]);if(l&&tn(l)){d.debug("Found via regex in element",{value:l}),e=l;break}}}}return{amount:e,originalPrice:n,discountPrice:r}},Ir=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const i of e){const s=o.match(i);if(s&&s[1]){const c=A(s[1]);if(c)return d.debug("Found price via text walker",{value:c}),c}}}return null},Dr=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),i=(r.getAttribute("data-price")||"").trim(),c=`${o} ${i}`.trim().match(n);if(c&&c[1]){const l=A(c[1]);if(l)return d.debug("Found price by element scan",{value:l}),l}}}catch(e){d.debug("findPriceByElementScan error",{error:e})}return null},Mr={신한:"assets/card/shinhanCard.svg",우리:"assets/card/wooriCard.svg",BC:"assets/card/bcCard.svg",비씨:"assets/card/bcCard.svg",롯데:"assets/card/lotteCard.svg",KB:"assets/card/kbCard.svg",국민:"assets/card/kbCard.svg",NH:"assets/card/nhCard",농협:"assets/card/hanaCard.svg",삼성:"assets/card/samsungCard.svg",하나:"assets/card/hanaCard.svg",현대:"assets/card/hyundaiCard.svg",비자:"assets/card/visaCard.svg",마스터:"assets/card/masterCard.svg"},Lr=t=>{const e=ht(se(t)),n=Mr[e];if(!n)return null;try{return chrome.runtime.getURL(n)}catch{return null}},ze=t=>{for(const[e,n]of Object.entries(Wn))if(t.includes(e))return n;return null},Or=t=>{const e=[],n=K.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const s=i,c=s.src,l=s.alt||"";if(!c)return;let u=l.trim();u||(u=ze(c)||""),u&&!u.includes("카드")&&(u=`${u}카드`),c&&u&&(e.some(f=>f.cardName===u)||(e.push({src:c,alt:l,cardName:u}),d.debug("카드 이미지 발견",{cardName:u,src:c.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(s=>{const c=s,l=c.src,u=c.alt||"";if(!l||(c.width||c.naturalWidth)>100)return;let p=u.trim();p||(p=ze(l)||""),p&&!p.includes("카드")&&(p=`${p}카드`),l&&p&&!e.some(x=>x.cardName===p)&&e.push({src:l,alt:u,cardName:p})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const s=i,c=s.src,l=s.alt||"";if(!c||(s.width||s.naturalWidth)>100)return;let f=l.trim();f||(f=ze(c)||""),f&&!f.includes("카드")&&(f=`${f}카드`),c&&f&&!e.some(p=>p.cardName===f)&&e.push({src:c,alt:l,cardName:f})}),d.debug("추출된 카드 이미지 총",{count:e.length}),e},Br=t=>{const e=[],n=K.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return d.debug("카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const s=o.contentDocument||o.contentWindow?.document;if(s)return Ur(s)}catch{d.warn("iframe 접근 불가 (cross-origin)")}const i=r.querySelector(n.content);return i?qr(i):e},Ur=t=>{const e=[],n=K.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const i=o.querySelector(n.cardName),s=o.querySelector(n.benefitRate),c=o.querySelector(n.benefitDesc),l=i?.textContent?.trim()||"",u=s?.textContent?.trim()||"",f=c?.textContent?.trim()||o.textContent?.trim()||"";if(l){const p=gn(u||f)??void 0;e.push({card:l,cardName:l,benefit:f||u||"혜택 제공",discount:p,rate:p})}}),e},qr=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let i;for(;(i=o.exec(n))!==null;){const s=i[1].includes("카드")?i[1]:`${i[1]}카드`,c=parseFloat(i[2]);e.some(l=>l.card===s)||e.push({card:s,cardName:s,benefit:`최대 ${c}% 할인/적립`,discount:c,rate:c})}}return e},zr=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",i=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const s=i[1].includes("카드")?i[1]:`${i[1]}카드`,c=parseFloat(i[2]);if(!e.some(l=>l.card===s)){let l=`최대 ${c}% 할인/적립`;const u=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);u&&(l=`최대 ${c}% ${u[0]}`),e.push({card:s,cardName:s,benefit:l,discount:c,rate:c})}}}),e},Fr=t=>{let e=[];const n=Or(t),r=Br(t);if(r.length>0&&(d.info("팝업에서 카드 혜택 파싱",{count:r.length}),e=r),zr(t).forEach(i=>{e.some(s=>s.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(K.benefitBadge);if(i){const s=i.querySelectorAll("img.benefit-ico"),c=[],l=[];s.forEach(p=>{const x=p.getAttribute("src");if(x){const y=ze(x);y&&(c.push(y),l.push(x))}});const u=i.querySelector(".benefit-label")?.textContent?.trim(),f=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(u){const p=gn(u),x=c.length>0?`${c.slice(0,3).join(", ")}${c.length>3?" 외":""}`:"쿠팡 파트너 카드",y=p??void 0;e.push({card:x,cardName:x,benefit:`${u}${f?` (${f})`:""}`,discount:y,rate:y,imageUrl:l[0]})}}}return e=e.map((i,s)=>{if(!i.imageUrl){const c=i.cardName||i.card||"",l=ht(se(c));let u=n.find(f=>{const p=se(f.cardName),x=se(c);return p===x});if(u||(u=n.find(f=>{const p=se(f.cardName).replace("카드",""),x=se(c).replace("카드","");return p.includes(x)||x.includes(p)})),u||(u=n.find(f=>ht(se(f.cardName))===l)),!u&&s<n.length&&(u=n[s],d.debug("인덱스 기반 매칭",{cardName:c,matchedCardName:u.cardName})),!u){const f=Lr(c);if(f)return d.debug("로컬 아이콘 폴백 사용",{cardName:c,benefitKey:l}),{...i,imageUrl:f}}if(u)return{...i,imageUrl:u.src}}return i}),e.sort((i,s)=>(s.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{benefits:e}),e},$r=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const s=i.match(/(\d+)\s*%/);if(s)return{rate:parseInt(s[1],10),description:i.trim()}}}return null},Hr=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",s=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s&&i.includes("쿠팡캐시")){const c=A(s[1]);if(c)return{amount:c,description:`쿠팡캐시 ${c.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=A(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},Wr=t=>{try{const e=[],n=new Set,r=t.querySelector(K.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const s=i.querySelectorAll("div");if(s.length<2)continue;let c="";for(const p of s){const x=p.textContent||"";if(!x.includes("원")&&x.trim().length>0&&!x.includes("px")){c=x.trim();break}}let l="";for(const p of s){const y=(p.textContent||"").match(/[\d,]+원/);if(y){l=y[0].replace(/[,원]/g,"");break}}if(!l)continue;const u=parseInt(l);if(!u||u<100||!c||c.length<2)continue;const f=`${c}-${u}`;if(n.has(f))continue;if(e.push({name:c,price:u}),n.add(f),e.length>=15)break}catch(s){d.warn("Error parsing list item",{error:s});continue}return e}catch(e){return d.error(v.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},Gr=t=>t.querySelector(K.shipping)?.textContent?.trim()||null,Kr=(t,e)=>{if(!bt(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let r=Math.round(t*(n/100));return e.maxDiscount&&r>e.maxDiscount&&(r=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:r},Yr=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},hn=(t,e)=>t.map(r=>{const o=Yr(r);return e&&bt(e)&&(o.discountAmount=Kr(e,o)),o}).sort((r,o)=>r.discountAmount!==void 0&&o.discountAmount!==void 0?o.discountAmount-r.discountAmount:(o.rate??0)-(r.rate??0)),bn=t=>{const e=new Map;for(const n of t){const r=jr(n.cardName||n.card),o=e.get(r);if(!o)e.set(r,n);else{const i=o.rate??o.discount??0;(n.rate??n.discount??0)>i&&e.set(r,n)}}return Array.from(e.values())},jr=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","NH","BC","비씨","스마일"],n=t.toLowerCase();for(const r of e)if(n.includes(r.toLowerCase()))return r;return t};class xn extends be{siteName="Coupang";selectors={amount:K.amount};static isCheckoutPage(e){if(!/coupang\.com/.test(e))return!1;const o=![/coupang\.com\/?$/,/shop\.coupang\.com/,/coupang\.com\/np\/categories/,/coupang\.com\/np\/search/,/coupang\.com\/np\/campaigns/,/coupang\.com\/np\/cart/,/coupang\.com\/np\/checkout/,/coupang\.com\/my\//,/coupang\.com\/np\/login/,/coupang\.com\/np\/register/].some(i=>i.test(e));return d.debug(`isCheckoutPage("${e}") = ${o}`),o}parse(e){try{d.info("🔍 Parsing Coupang page...");const n=Pr(e),r=Nr(e),o=kr(e),i=Rr(e);let s=i.amount;const{originalPrice:c,discountPrice:l}=i;if(s||(s=Ir(e)),s||(s=Dr(e)),!s)return d.debug("❌ No price found"),null;const u=Fr(e),f=hn(u,s),p=bn(f),x=$r(e),y=Hr(e),g=Gr(e),_=Wr(e);return d.info(`✅ Found: ${s} KRW, Cards: ${p.length}`),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:_,originalPrice:c||void 0,discountPrice:l||void 0,cardBenefits:p,giftCardDiscount:x||void 0,cashback:y||void 0,shippingInfo:g||void 0,discounts:[]}}catch(n){return d.error(v.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const D={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",salePriceAlt2:".c_product_price .price .value",salePriceAlt3:'[class*="price"] .value',discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price",dealPrice:'.deal_price .value, [class*="deal"] .price',specialPrice:".special_price .value"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",titleAlt2:'h1[class*="title"]',titleAlt3:"h1.product_name",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},pt={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},Vr=t=>{const e=D.product;try{const n=t.querySelector(e.title);if(n?.textContent){const o=n.textContent.trim();return d.debug("제목 추출",{title:o}),o}const r=t.querySelector(e.titleAlt);if(r?.textContent){const o=r.textContent.trim();return d.debug("제목 추출 (alt)",{title:o}),o}}catch(n){d.error(v.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},Xr=t=>{try{const e=t.querySelector(D.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return d.debug("부제목 추출",{subtitle:n}),n}}catch(e){d.error(v.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},Zr=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const r=t.match(n);if(r?.[1])return d.debug("상품ID 추출",{productId:r[1]}),r[1]}}catch(e){d.error(v.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},En=t=>{const e=D.image;try{const n=t.querySelector(e.main);if(n?.src){const i=Pe(n.src);return d.debug("메인 이미지 추출",{src:i}),i}const r=t.querySelector(e.mainAlt);if(r?.src){const i=Pe(r.src);return d.debug("메인 이미지 추출 (alt)",{src:i}),i}const o=t.querySelector(`${e.main}[data-src]`);if(o?.dataset?.src){const i=Pe(o.dataset.src);return d.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){d.error(v.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},Jr=t=>{const e=[],n=new Set,r=D.image;try{const o=En(t);o&&(e.push(o),n.add(o)),t.querySelectorAll(r.thumbnail).forEach(c=>{const l=c,u=l.src||l.dataset?.src;if(u){const f=Pe(u),p=nn(f);n.has(p)||(e.push(p),n.add(p))}}),t.querySelectorAll(r.thumbnailAlt).forEach(c=>{const l=c,u=l.src||l.dataset?.src;if(u){const f=Pe(u),p=nn(f);n.has(p)||(e.push(p),n.add(p))}}),d.debug("전체 이미지 추출",{count:e.length})}catch(o){d.error(v.PAR_E001,"전체 이미지 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},Qr=t=>{const e=D.seller,n={seller:null,rating:null};try{const r=t.querySelector(e.name);r?.textContent&&(n.seller=r.textContent.trim(),d.debug("판매자 추출",{seller:n.seller}));const o=t.querySelector(e.rating);o?.textContent&&(n.rating=o.textContent.trim(),d.debug("판매자 등급 추출",{rating:n.rating}))}catch(r){d.error(v.PAR_E001,"판매자 정보 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return n};function Pe(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function nn(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const eo=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=D.price;try{const r=t.querySelector(n.originalPrice);r?.textContent&&(e.originalPrice=A(r.textContent),d.debug("정가",{price:e.originalPrice}));const o=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);o?.textContent&&(e.discountPrice=A(o.textContent),e.amount=e.discountPrice,d.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=A(i.textContent),d.debug("할인율",{rate:e.discountRate}));const s=t.querySelector(n.maxDiscountPrice);s?.textContent&&(e.maxDiscountPrice=A(s.textContent),d.debug("최대할인가",{price:e.maxDiscountPrice}));const c=t.querySelector(n.maxDiscountRate);c?.textContent&&(e.maxDiscountRate=A(c.textContent),d.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(r){d.error(v.PAR_E002,"가격 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},to=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const r of n){const o=r.textContent||"";for(const i of e){const s=o.match(i);if(s?.[1]){const c=A(s[1]);if(c&&c>100&&c<1e8)return d.debug("가격 발견",{value:c}),c}}}return null},no=t=>{const e=[],n=D.price;try{const r=t.querySelector(n.maxDiscountLayer);if(!r)return e;r.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const s=i.querySelector(".title"),c=i.querySelector(".price");if(s&&c){const l=s.textContent?.trim()||"",u=c.textContent?.trim()||"",f=A(u.replace("-",""));l&&f&&l!=="판매가"&&(e.push({type:l,amount:f}),d.debug("DiscountDetail",{type:l,amount:f}))}})}catch(r){d.error(v.PAR_E002,"DiscountDetail 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},ro=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=oo(t),e.totalPointAmount=e.points.reduce((n,r)=>n+r.amount,0),e.cardBenefits=io(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,r)=>n+r.benefitAmount,0),e.installments=ao(t),e.maxInstallmentMonths=e.installments.reduce((n,r)=>Math.max(n,r.maxMonths),0),e.coupons=po(t),d.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){d.error(v.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},oo=t=>{const e=[],n=D.pointDetail;try{const r=t.querySelector(n.container);if(r){const o=r.querySelector(n.totalPoint);if(o?.textContent){const s=A(o.textContent);s&&(e.push({amount:s,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),d.debug("최대 적립 포인트",{amount:s}))}const i=r.querySelector(n.elevenPaySection);if(i){const s=i.querySelector(".total .value");if(s?.textContent){const l=A(s.textContent);l&&!e.find(u=>u.amount===l&&u.type==="최대적립포인트")&&(e.push({amount:l,type:"11pay포인트",description:"11pay 결제 시 적립"}),d.debug("11pay 포인트 총액",{amount:l}))}i.querySelectorAll(".desc li").forEach(l=>{const u=l.querySelector(".c_layer_expand button.c_product_btn"),f=l.querySelector(".value");if(u&&f){const p=u.textContent?.trim()||"",x=A(f.textContent||"");x&&p&&!p.includes("카드")&&(e.push({amount:x,type:p,description:p}),d.debug("포인트 항목",{type:p,amount:x}))}})}}if(e.length===0){const o=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(o?.textContent){const i=A(o.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),d.debug("기본 포인트",{amount:i}))}}}catch(r){d.error(v.PAR_E003,"포인트 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},io=t=>{const e=[],n=D.cardDiscount;try{const r=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let o=null;for(const s of r)if(o=t.querySelector(s),o){d.debug("카드 혜택 컨테이너 찾음",{selector:s});break}if(d.debug("other_benefits 컨테이너",{found:!!o}),o){const s=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let c=null;for(const l of s)if(c=o.querySelectorAll(l),c.length>0){d.debug("benefit 블록 찾음",{selector:l,count:c.length});break}if(d.debug("benefit 블록 수",{count:c?.length||0}),!c||c.length===0){const l=o.querySelector("dl");if(d.debug("dl 요소",{found:!!l}),l){const u=l.children;d.debug("dl children",{count:u.length})}}c&&c.length>0&&c.forEach(l=>{const f=l.querySelector("dt")?.textContent?.trim()||"";if(d.debug("메인 타이틀",{mainTitle:f}),!f)return;const p=co(f);p&&p.benefitAmount>0&&(e.push(p),d.debug("메인 혜택 추가",{mainParsed:p}));const x=l.querySelector("dd");if(x){const y=x.querySelectorAll(".tit_sub");d.debug("서브타이틀 수",{count:y.length}),y.forEach(g=>{const _=g.textContent?.trim()||"";if(d.debug("서브타이틀",{subTitle:_}),_.includes("안내사항")||_.includes("적립제외"))return;let S=g.nextElementSibling;for(;S&&S.tagName!=="UL"&&S.tagName!=="SPAN";)S=S.nextElementSibling;if(S&&S.tagName==="UL"){const N=S.querySelectorAll("li");d.debug("리스트 아이템 수",{count:N.length}),N.forEach(j=>{const J=j.textContent?.trim()||"";d.debug("아이템",{itemText:J});const T=so(_,J);T&&(e.find(V=>V.cardName===T.cardName&&V.benefitType===T.benefitType&&V.benefitAmount===T.benefitAmount)||(e.push(T),d.debug("서브 혜택 추가",{subBenefit:T})))})}})}})}else d.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(c=>{const l=c.textContent?.trim()||"";if(l.includes("카드")||l.includes("신한")){const f=c.closest("li")?.querySelector(".value")?.textContent?.trim()||"",p=A(f);if(p){const x=l.replace(" 결제 시","").trim();e.find(y=>y.cardName===x&&y.benefitType==="포인트")||e.push({cardName:x,benefitAmount:p,benefitType:"포인트",condition:"결제 시"})}}}),d.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(r){d.error(v.PAR_E003,"카드 혜택 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function co(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const l of e){const u=t.match(l);if(u){n=u[1];break}}if(!n)return null;let r=0,o="",i="";const s=t.match(/최대\s*(\d+)%\s*적립/);s&&(r=parseInt(s[1],10),o="적립",i="결제 시");const c=t.match(/([\d,]+)원\s*할인/);return c&&(r=A(c[1])||0,o="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:r,benefitType:o||(t.includes("할인")?"할인":"적립"),condition:i}}function so(t,e){if(!e)return null;let n="",r=0,o="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const s=e.match(/([\d,]+)원\s*할인/);s&&(r=A(s[1])||0,o="할인");const c=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return c&&!o&&(r=parseFloat(c[1]),o="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!r||!o?null:{cardName:n,benefitAmount:r,benefitType:o,condition:i}}const ao=t=>{const e=[],n=D.installment;try{const r=t.querySelector(n.dialogContainer);if(r&&(r.querySelectorAll(".card_box").forEach(i=>{const c=i.querySelector("dt")?.textContent?.trim()||"";if(!c)return;i.querySelectorAll("dd").forEach(u=>{const f=u.textContent?.trim()||"";if(!f)return;const p=lo(c,f);p&&e.push(p)})}),d.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const o=t.querySelector(n.triggerButton);if(o){const c=(o.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);c&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"})}uo(t).forEach(s=>{e.find(c=>c.cardName===s.cardName)||e.push(s)})}d.info("총 무이자 할부 카드",{count:e.length})}catch(r){d.error(v.PAR_E003,"무이자 할부 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function lo(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const r=n[1],i=r.split(",").map(f=>parseInt(f.trim(),10)).filter(f=>!isNaN(f)),s=i.length>0?Math.max(...i):0;if(s===0)return null;let c=null;const l=e.match(/(\d+)만원/);l&&(c=parseInt(l[1],10)*1e4);let u="";return e.includes("11pay")?u="11pay 결제 시":e.includes("카카오페이")?u="카카오페이 결제 시":c&&(u=`${c/1e4}만원 이상`),{cardName:t,maxMonths:s,minAmount:c,months:`${r}개월`,condition:u}}function uo(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(o=>{const i=o.textContent||"",s=i.match(/최대\s*(\d+)\s*개월\s*무이자/);s&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"}),n.forEach(c=>{if(i.includes(c)){const u=i.substring(i.indexOf(c)).match(/([\d,]+)개월/);if(u&&!e.find(p=>p.cardName.includes(c))){const p=u[1],x=p.split(",").map(g=>parseInt(g.trim(),10)),y=Math.max(...x.filter(g=>!isNaN(g)));e.push({cardName:`${c}카드`,maxMonths:y,minAmount:null,months:`${p}개월`,condition:""})}}})}),e}const po=t=>{const e=[],n=D.coupon;try{const r=t.querySelector(n.badge);if(r?.textContent){const i=r.textContent.trim(),s=fo(i);s&&(e.push(s),d.debug("쿠폰 추출",{coupon:s}))}t.querySelectorAll(n.item).forEach(i=>{const s=i.querySelector(n.name),c=i.querySelector(n.discount);if(s||c){const l=s?.textContent?.trim()||"쿠폰",u=c?.textContent||"",f=u.includes("원")?A(u):null,p=u.includes("%")?A(u):null;e.push({name:l,discountAmount:f,discountRate:p})}})}catch(r){d.error(v.PAR_E003,"쿠폰 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function fo(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:A(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function rn(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:r,name:o}of n)for(const i of r)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${o} (신용)`:e.includes("체크카드")?`${o} (체크)`:o;return e||t}function mo(t,e){const n=t.map(r=>{const o=rn(r.cardName),i=r.benefitType==="할인",s=r.benefitAmount<=100?r.benefitAmount:0;let c="";return i?c=`${r.benefitAmount.toLocaleString()}원 할인`:r.benefitAmount<=100?c=`${r.benefitAmount}% 적립`:c=`${r.benefitAmount.toLocaleString()}P 적립`,{card:o,cardName:o,benefit:c,discount:i?r.benefitAmount:0,rate:s,condition:r.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(r=>{if(r.cardName==="__INSTALLMENT_SUMMARY__")return;const o=rn(r.cardName);n.push({card:o,cardName:o,benefit:`${r.months} 무이자`,discount:0,rate:0,condition:r.condition,benefitType:"installment",pointAmount:0})}),n}class yn extends be{siteName=pt.siteName;selectors={amount:[D.price.salePrice,D.price.salePriceAlt,D.price.maxDiscountPrice],title:[D.product.title,D.product.titleAlt],image:[D.image.main,D.image.mainAlt]};static isProductPage(e){if(!/11st\.co\.kr/.test(e))return!1;const o=![/11st\.co\.kr\/?$/,/11st\.co\.kr\/category/,/11st\.co\.kr\/search/,/11st\.co\.kr\/browsing/,/11st\.co\.kr\/best/,/11st\.co\.kr\/event$/,/11st\.co\.kr\/cart/,/11st\.co\.kr\/order/,/11st\.co\.kr\/my11st/,/11st\.co\.kr\/login/,/11st\.co\.kr\/member/].some(i=>i.test(e));return d.debug(`isProductPage("${e}") = ${o}`),o}static extractProductId(e){return Zr(e)}parse(e){try{d.info("🔍 Parsing 11번가 page...");const n=Vr(e),r=Xr(e),o=En(e),i=Jr(e),s=Qr(e),c=eo(e);let l=c.amount;const{originalPrice:u,discountPrice:f,maxDiscountPrice:p,discountRate:x,maxDiscountRate:y}=c;if(l||(l=to(e)),!l)return d.debug("❌ No price found"),null;const g=no(e),_=ro(e),{points:S,cardBenefits:N,installments:j,coupons:J,totalPointAmount:T,totalCardBenefitAmount:oe,maxInstallmentMonths:V}=_,He=mo(N,j),xe=[];return x&&xe.push({rate:x,type:"SALE_DISCOUNT",description:"할인가"}),g.forEach(Ee=>{xe.push({rate:Ee.amount,type:Ee.type.toUpperCase().replace(/\s+/g,"_"),description:Ee.type})}),d.info(`✅ Found: ${l.toLocaleString()} ${pt.currency}`),d.debug("파싱 결과",{title:n,totalPointAmount:T,cardBenefitsCount:N.length,installmentsCount:j.length,maxInstallmentMonths:V}),{price:l,amount:l,currency:pt.currency,title:n?`${n}${r?` ${r}`:""}`:void 0,imageUrl:o||void 0,images:i,originalPrice:u||void 0,discountPrice:f||p||void 0,discountRate:x||void 0,cardBenefits:He,discounts:xe,elevenst:{maxDiscountPrice:p,maxDiscountRate:y,maxInstallmentMonths:V,points:S,installments:j,coupons:J,totalPointAmount:T,totalCardBenefitAmount:oe,seller:s.seller,sellerRating:s.rating,discountDetails:g}}}catch(n){return d.error(v.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const O={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},go=t=>{const e=t.querySelector(O.product.title);if(e?.textContent){const n=e.textContent.trim();return d.debug("상품명",{title:n}),n}return d.warn("상품명을 찾을 수 없음"),null},ho=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const r of e){const i=r.src;if(i.includes("/still/600"))return d.debug("메인 이미지 (600px)",{src:i}),i}for(const r of e){const i=r.src;if(i.includes("/still/"))return d.debug("메인 이미지",{src:i}),i}const n=t.querySelector(O.product.mainImage);return n?.src?(d.debug("대체 이미지",{src:n.src}),n.src):(d.warn("상품 이미지를 찾을 수 없음"),null)},bo=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(r=>{let i=r.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),d.debug("총 이미지",{count:e.length}),e},xo=t=>{const e={},n=t.querySelector(O.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const r=t.querySelector(O.seller.official);e.isOfficial=!!r;const o=t.querySelector(O.seller.seller);return o?.textContent&&(e.seller=o.textContent.trim()),e},Fe=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return A(e)},Eo=t=>{const e=O.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const o=Fe(n.textContent);if(o)return d.debug("결제할인가",{price:o}),o}const r=t.querySelector(e.discountPriceAlt);if(r?.textContent){const o=Fe(r.textContent);if(o)return d.debug("결제할인가 (alt)",{price:o}),o}return null},yo=t=>{const e=O.price,n=t.querySelector(e.salePrice);if(n?.textContent){const r=Fe(n.textContent);if(r)return d.debug("판매가",{price:r}),r}return null},_o=t=>{const e=O.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const r=Fe(n.textContent);if(r)return d.debug("정가",{price:r}),r}return null},Co=t=>{const e=O.price,n=t.querySelector(e.discountRate);if(n?.textContent){const r=n.textContent.match(/(\d+)\s*%/);if(r){const o=parseInt(r[1],10);return d.debug("할인율",{rate:o}),o}}return null},So=t=>{d.debug("가격 정보 추출 시작...");const e=_o(t),n=yo(t),r=Eo(t),o=Co(t),i=r||n||e;return d.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}),{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}},Ao=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const r=n.textContent||"";if(r.includes("원")){const o=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(o){const i=A(o[1]);if(i&&i>=1e3)return d.debug("DOM 스캔 가격",{price:i}),i}}}return null},To=t=>{const e=[],n=O.cardBenefit,r=t.querySelector(n.container);return r?(r.querySelectorAll(".gmarketcard_area img").forEach(i=>{const s=i,c=s.src,l=s.alt||"";if(c){let u=l;u||(c.includes("smile")||c.includes("Smile")?u="스마일카드":c.includes("samsung")?u="삼성카드":u="G마켓 제휴카드"),e.push({card:u,cardName:u,benefit:"G마켓 제휴카드 혜택",imageUrl:c}),d.debug("제휴카드",{cardName:u,src:c})}}),e):(d.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},vo=t=>{const e=[],n=O.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(o=>{const i=o.querySelector(n.discountItemTitle),s=o.querySelector(n.discountItemDesc),c=o.querySelector(n.discountItemPrice),l=i?.textContent?.trim()||"",u=s?.textContent?.trim()||"";let f;if(c?.textContent){const p=c.textContent.match(/(\d{1,3}(?:,\d{3})*)/);p&&(f=parseInt(p[1].replace(/,/g,""),10))}l&&(e.push({title:l,description:u,discountPrice:f}),d.debug("결제 할인",{title:l,description:u}))}),e},wo=t=>{d.debug("카드 혜택 추출 시작...");const e=[],n=To(t);e.push(...n),vo(t).forEach(i=>{const s=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(s){const c=s[1].includes("카드")?s[1]:`${s[1]}카드`,l=i.title.match(/(\d+(?:\.\d+)?)\s*%/),u=l?parseFloat(l[1]):void 0;e.some(f=>f.cardName===c)||e.push({card:c,cardName:c,benefit:i.title,discount:u,rate:u})}});const o=t.querySelector(".box__payment-discount");if(o){const s=(o.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(s){const c=parseInt(s[1],10);e.some(l=>l.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${c}% 할인`,discount:c,rate:c})}}return e.sort((i,s)=>(s.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},Po=t=>{const e=O.additionalBenefits,r=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!r)return null;let o="etc";r.includes("신세계포인트")?o="shinsegae_point":r.includes("스마일페이")?o="smile_pay":r.includes("스마일캐시")?o="smile_cash":r.includes("OK캐쉬백")&&(o="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(c=>{const l=c.querySelector(e.benefitLabel),u=c.querySelector(e.benefitValue),f=l?.textContent?.trim()||"",p=u?.textContent?.trim()||"";f&&p&&i.push({label:f,value:p})}),d.debug("추가 혜택",{type:o,title:r}),{type:o,title:r,details:i}},_n=t=>{d.debug("추가 혜택 추출 시작...");const e=[],n=O.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(o=>{const i=Po(o);i&&e.push(i)}),d.debug("총 추가 혜택",{count:e.length}),e},No=t=>{const e=_n(t);for(const n of e)for(const r of n.details){const o=r.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(o)return{amount:parseInt(o[1].replace(/,/g,""),10),description:`${n.title}: ${r.value}`}}return null},ko=t=>{const e=O.shipping,r=!!t.querySelector(e.starDelivery),o=t.querySelector(e.shippingInfo),i=r?"스타배송":"일반배송";let s,c,l=!1;if(o){const u=o.textContent||"",f=u.match(/(\d{1,3}(?:,\d{3})*)\s*원/);f?s=`${f[1]}원`:u.includes("무료")&&(s="무료배송",l=!0);const p=u.match(/(\d+\/\d+|\d+일)/);p&&(c=p[1])}return d.debug("배송 정보",{method:i,isStarDelivery:r,fee:s}),{method:i,isStarDelivery:r,isFree:l,fee:s,estimatedDate:c}};class Cn extends be{siteName="Gmarket";selectors={amount:[O.price.discountPrice,O.price.salePrice,O.price.originalPrice]};static isCheckoutPage(e){if(!/gmarket\.co\.kr/.test(e))return!1;const o=![/gmarket\.co\.kr\/?$/,/gmarket\.co\.kr\/n\/category/,/gmarket\.co\.kr\/n\/search/,/gmarket\.co\.kr\/n\/best$/,/gmarket\.co\.kr\/n\/deals$/,/gmarket\.co\.kr\/n\/event$/,/gmarket\.co\.kr\/cart/,/gmarket\.co\.kr\/order/,/gmarket\.co\.kr\/my/,/gmarket\.co\.kr\/login/,/gmarket\.co\.kr\/join/].some(i=>i.test(e));return re.debug("isCheckoutPage check",{url:e,isCheckout:o}),o}parse(e){try{re.info("Parsing Gmarket page...");const n=go(e),r=ho(e),o=bo(e),i=xo(e),s=So(e);let c=s.amount;if(c||(c=Ao(e)),!c)return re.warn("No price found in Gmarket page"),null;const l=wo(e),u=hn(l,c),f=bn(u),p=_n(e),x=No(e),y=ko(e);return re.info("Parse successful",{amount:c,cardCount:f.length}),{price:c,amount:c,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:[],originalPrice:s.originalPrice||void 0,discountPrice:s.discountPrice||void 0,cardBenefits:f,additionalBenefits:p.length>0?p:void 0,cashback:x||void 0,shippingInfo:y||void 0,sellerInfo:i||void 0,discounts:[]}}catch(n){return re.error(v.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Ro={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class Sn extends be{siteName="Amazon";selectors={amount:Ro.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{d.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:s}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return d.error(v.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Io={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class An extends be{siteName="eBay";selectors={amount:Io.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{d.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:s}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return d.error(v.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Do={amount:[]};class Tn extends be{siteName="Fallback";selectors={amount:Do.amount};parse(e){try{d.info("🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return d.debug('❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return d.debug("❌ Invalid amount",{amount:o}),null;const{title:i,imageUrl:s}=this.extractCommonInfo(e);return d.info(`✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:i||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return d.error(v.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function Mo(t){return xn.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:yn.isProductPage(t)?{site:"11st",isCheckout:!0}:Cn.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:Sn.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:An.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function Lo(t){switch(t){case"coupang":return new xn;case"11st":return new yn;case"gmarket":return new Cn;case"amazon":return new Sn;case"ebay":return new An;default:return new Tn}}function Oo(){return new Tn}function vn(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},r=>{if(chrome.runtime.lastError){Ht.warn("Failed to send message to background",{error:chrome.runtime.lastError.message,messageType:n,source:e});return}r?.success&&Ht.debug("Product data saved",{source:e,messageType:n})})}function wn(t,e){let n=null;const r=(...o)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...o),n=null},e)};return r.cancel=()=>{n&&(clearTimeout(n),n=null)},r}const Bo=500;function Uo(t){let e=!1,n=null,r=!1;const o=wn(c=>{r||(Z.info("Dynamic content detected",{reason:c}),t(`dynamic-${c}`)||Z.warn("Dynamic reparse produced no result"))},Bo),i=c=>{if(r)return;const l=c.some(y=>Array.from(y.addedNodes).some(g=>g instanceof Element?g.tagName==="IFRAME"||!!g.querySelector("iframe"):!1)),u=!e&&c.some(y=>Array.from(y.addedNodes).some(g=>g instanceof Element?g.classList.contains("benefit")||!!g.querySelector(".benefit")||g.closest(".other_benefits")&&(g.querySelector("dt")||g.querySelector("dd")):!1)),f=document.querySelector(".other_benefits .benefit dt");if(!(u&&f||l))return;u&&(e=!0),o(l?"iframe":"benefit-content"),l&&(s(),Z.debug("Observer disconnected after iframe detection"))},s=()=>{r||(r=!0,n&&(n.disconnect(),n=null),Z.debug("DynamicContentObserver cleaned up"))};return document.body?(n=new MutationObserver(i),n.observe(document.body,{childList:!0,subtree:!0}),s):(Z.warn("document.body not available, observer not started"),s)}const qo=500,zo=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],Fo=()=>!!document.querySelector(".other_benefits .benefit dt");function $o(t){if(!window.location.hostname.includes("11st.co.kr"))return()=>{};Z.info("Setting up 11번가 benefit watcher");let e=!1,n=null,r=null;const o=new Map,i=wn(u=>{e||Fo()&&(Z.info("Benefit content found",{source:u}),t(u))},qo),s=new WeakSet,c=()=>{e||zo.forEach(u=>{document.querySelectorAll(u).forEach(p=>{if(s.has(p))return;s.add(p);const x=()=>{Z.debug("Benefit button clicked"),setTimeout(()=>i("benefit-click"),800)};o.set(p,x),p.addEventListener("click",x)})})};c(),r=new MutationObserver(()=>{c()}),document.body&&r.observe(document.body,{childList:!0,subtree:!0}),n=setTimeout(()=>{r&&!e&&(r.disconnect(),r=null,Z.debug("Benefit button observer disconnected (timeout)"))},5e3);const l=()=>{e||(e=!0,n&&(clearTimeout(n),n=null),r&&(r.disconnect(),r=null),o.forEach((u,f)=>{f.removeEventListener("click",u)}),o.clear(),Z.debug("ElevenStreetBenefitWatcher cleaned up"))};return window.addEventListener("beforeunload",l,{once:!0}),l}const Ho=window.self===window.top;let on=!1;const $e=[];async function Wo(t,e){try{H.info(W.NETWORK,"Sending price comparison request",{url:t,product:e});const n=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:e,providers:["coupang","11st","gmarket"]});n?.success?H.info(W.NETWORK,"Price comparison completed",{resultCount:n.data?.results?.length||0}):H.warn(W.NETWORK,"Price comparison failed",{error:n?.error})}catch(n){H.error(W.NETWORK,v.NET_E002,"Price comparison request error",{error:n instanceof Error?n:new Error(String(n))})}}function Pn(){const t=window.location.href,e=Mo(t);if(!e)return H.debug(W.PARSER,"Not a supported page",{url:t}),null;H.info(W.PARSER,`Site detected: ${e.site}`,{url:t});let r=Lo(e.site).parse(document);return!r&&(H.warn(W.PARSER,"Primary parser failed, trying fallback",{site:e.site}),r=Oo().parse(document),!r)?(H.error(W.PARSER,v.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(H.info(W.PARSER,"Parse successful",{title:r.title?.substring(0,50),amount:r.amount,cardBenefitsCount:r.cardBenefits?.length??0}),{paymentInfo:r,site:e.site})}function Nn(t,e){return{...t,site:e}}function cn(t){const e=Pn();return e?(vr(Nn(e.paymentInfo,e.site)),vn(e.paymentInfo,t),!0):!1}function Go(){const t=Pn();if(!t){H.warn(W.BOOTSTRAP,"Failed to extract payment info on init");return}mn(Nn(t.paymentInfo,t.site)),vn(t.paymentInfo,"initial");const e=sn.getState();e.autoFetchLowestPrice&&t.paymentInfo.title&&(H.info(W.BOOTSTRAP,"Auto fetch lowest price enabled",{displayMode:e.displayMode}),Wo(window.location.href,t.paymentInfo.title))}function Ko(){$e.forEach(t=>{try{t()}catch(e){H.warn(W.BOOTSTRAP,"Cleanup error",{error:e})}}),$e.length=0}function Yo(){if(!Ho||on)return;on=!0,H.info(W.BOOTSTRAP,"Content script starting"),Go();const t=Uo(n=>cn(n));$e.push(t);const e=$o(n=>{cn(n)});$e.push(e),window.addEventListener("beforeunload",Ko,{once:!0})}Kn(Yo);
