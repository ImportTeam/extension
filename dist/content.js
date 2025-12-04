import{b as zn,p as ee,E as w,a as u,n as qn,d as ce,l as re,L as ie}from"./assets/index-CtnQ7lw9.js";import{C as Fn}from"./assets/constants-4DKqSpZt.js";const $n=window.self===window.top;function Hn(t){if(!$n){zn.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const Wn=`
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
`,ve=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",o=new Set(["KRW","JPY"]),r={style:"currency",currency:n};let i=t;o.has(n)&&(r.minimumFractionDigits=0,r.maximumFractionDigits=0,i=Math.round(t));const a=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(a,r).format(i)},Gn=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),ot="picsel-toggle-host",rt="picsel-toggle-panel",Kn={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},Yn=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return Kn[e]||String(t)},g={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},jn=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const o=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(o){const p=document.createElement("img");p.src=o,p.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(p)}else{const p=document.createElement("span");p.textContent="No Image",p.style.fontSize="11px",p.style.color="#64748b",n.appendChild(p)}const r=document.createElement("div");r.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const a=document.createElement("div");a.className="picsel-price";const c=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=ve(c,t.currency??"KRW");if(l){const p=document.createElement("div");p.className="picsel-final-price",p.textContent=l,a.appendChild(p)}const d=ve(t.originalPrice,t.currency??"KRW"),m=Gn(t.originalPrice,c);if(d&&m){const p=document.createElement("div");p.className="picsel-original-price",p.textContent=d;const b=document.createElement("div");b.className="picsel-discount-tag",b.textContent=`-${m}%`,a.appendChild(p),a.appendChild(b)}if(r.appendChild(i),r.appendChild(a),t.shippingInfo){const p=document.createElement("div");p.className="picsel-shipping",p.textContent=`배송: ${t.shippingInfo}`,r.appendChild(p)}return e.appendChild(n),e.appendChild(r),e};const{entries:nn,setPrototypeOf:qt,isFrozen:Vn,getPrototypeOf:Xn,getOwnPropertyDescriptor:Zn}=Object;let{freeze:q,seal:H,create:pt}=Object,{apply:ft,construct:mt}=typeof Reflect<"u"&&Reflect;q||(q=function(e){return e});H||(H=function(e){return e});ft||(ft=function(e,n){for(var o=arguments.length,r=new Array(o>2?o-2:0),i=2;i<o;i++)r[i-2]=arguments[i];return e.apply(n,r)});mt||(mt=function(e){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return new e(...o)});const Be=F(Array.prototype.forEach),Jn=F(Array.prototype.lastIndexOf),Ft=F(Array.prototype.pop),Ce=F(Array.prototype.push),Qn=F(Array.prototype.splice),ze=F(String.prototype.toLowerCase),it=F(String.prototype.toString),ct=F(String.prototype.match),Se=F(String.prototype.replace),eo=F(String.prototype.indexOf),to=F(String.prototype.trim),G=F(Object.prototype.hasOwnProperty),z=F(RegExp.prototype.test),Ae=no(TypeError);function F(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return ft(t,e,o)}}function no(t){return function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return mt(t,n)}}function C(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ze;qt&&qt(t,null);let o=e.length;for(;o--;){let r=e[o];if(typeof r=="string"){const i=n(r);i!==r&&(Vn(e)||(e[o]=i),r=i)}t[r]=!0}return t}function oo(t){for(let e=0;e<t.length;e++)G(t,e)||(t[e]=null);return t}function Q(t){const e=pt(null);for(const[n,o]of nn(t))G(t,n)&&(Array.isArray(o)?e[n]=oo(o):o&&typeof o=="object"&&o.constructor===Object?e[n]=Q(o):e[n]=o);return e}function Te(t,e){for(;t!==null;){const o=Zn(t,e);if(o){if(o.get)return F(o.get);if(typeof o.value=="function")return F(o.value)}t=Xn(t)}function n(){return null}return n}const $t=q(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),st=q(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),at=q(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ro=q(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),lt=q(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),io=q(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ht=q(["#text"]),Wt=q(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ut=q(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Gt=q(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Oe=q(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),co=H(/\{\{[\w\W]*|[\w\W]*\}\}/gm),so=H(/<%[\w\W]*|[\w\W]*%>/gm),ao=H(/\$\{[\w\W]*/gm),lo=H(/^data-[\-\w.\u00B7-\uFFFF]+$/),uo=H(/^aria-[\-\w]+$/),on=H(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),po=H(/^(?:\w+script|data):/i),fo=H(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),rn=H(/^html$/i),mo=H(/^[a-z][.\w]*(-[.\w]+)+$/i);var Kt=Object.freeze({__proto__:null,ARIA_ATTR:uo,ATTR_WHITESPACE:fo,CUSTOM_ELEMENT:mo,DATA_ATTR:lo,DOCTYPE_NAME:rn,ERB_EXPR:so,IS_ALLOWED_URI:on,IS_SCRIPT_OR_DATA:po,MUSTACHE_EXPR:co,TMPLIT_EXPR:ao});const Pe={element:1,text:3,progressingInstruction:7,comment:8,document:9},go=function(){return typeof window>"u"?null:window},ho=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let o=null;const r="data-tt-policy-suffix";n&&n.hasAttribute(r)&&(o=n.getAttribute(r));const i="dompurify"+(o?"#"+o:"");try{return e.createPolicy(i,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Yt=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function cn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:go();const e=E=>cn(E);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Pe.document||!t.Element)return e.isSupported=!1,e;let{document:n}=t;const o=n,r=o.currentScript,{DocumentFragment:i,HTMLTemplateElement:a,Node:c,Element:l,NodeFilter:d,NamedNodeMap:m=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:b,trustedTypes:y}=t,h=l.prototype,_=Te(h,"cloneNode"),S=Te(h,"remove"),N=Te(h,"nextSibling"),K=Te(h,"childNodes"),V=Te(h,"parentNode");if(typeof a=="function"){const E=n.createElement("template");E.content&&E.content.ownerDocument&&(n=E.content.ownerDocument)}let A,te="";const{implementation:Y,createNodeIterator:$e,createDocumentFragment:be,getElementsByTagName:xe}=n,{importNode:Pn}=o;let U=Yt();e.isSupported=typeof nn=="function"&&typeof V=="function"&&Y&&Y.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:He,ERB_EXPR:We,TMPLIT_EXPR:Ge,DATA_ATTR:wn,ARIA_ATTR:vn,IS_SCRIPT_OR_DATA:Nn,ATTR_WHITESPACE:gt,CUSTOM_ELEMENT:Rn}=Kt;let{IS_ALLOWED_URI:ht}=Kt,I=null;const bt=C({},[...$t,...st,...at,...lt,...Ht]);let L=null;const xt=C({},[...Wt,...ut,...Gt,...Oe]);let v=Object.seal(pt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ee=null,Ke=null;const se=Object.seal(pt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Et=!0,Ye=!0,yt=!1,_t=!0,ae=!1,Ne=!0,ne=!1,je=!1,Ve=!1,le=!1,Re=!1,Ie=!1,Ct=!0,St=!1;const In="user-content-";let Xe=!0,ye=!1,ue={},de=null;const At=C({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Tt=null;const Pt=C({},["audio","video","img","source","image","track"]);let Ze=null;const wt=C({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ke="http://www.w3.org/1998/Math/MathML",De="http://www.w3.org/2000/svg",X="http://www.w3.org/1999/xhtml";let pe=X,Je=!1,Qe=null;const kn=C({},[ke,De,X],it);let Le=C({},["mi","mo","mn","ms","mtext"]),Me=C({},["annotation-xml"]);const Dn=C({},["title","style","font","a","script"]);let _e=null;const Ln=["application/xhtml+xml","text/html"],Mn="text/html";let k=null,fe=null;const Bn=n.createElement("form"),vt=function(s){return s instanceof RegExp||s instanceof Function},et=function(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(fe&&fe===s)){if((!s||typeof s!="object")&&(s={}),s=Q(s),_e=Ln.indexOf(s.PARSER_MEDIA_TYPE)===-1?Mn:s.PARSER_MEDIA_TYPE,k=_e==="application/xhtml+xml"?it:ze,I=G(s,"ALLOWED_TAGS")?C({},s.ALLOWED_TAGS,k):bt,L=G(s,"ALLOWED_ATTR")?C({},s.ALLOWED_ATTR,k):xt,Qe=G(s,"ALLOWED_NAMESPACES")?C({},s.ALLOWED_NAMESPACES,it):kn,Ze=G(s,"ADD_URI_SAFE_ATTR")?C(Q(wt),s.ADD_URI_SAFE_ATTR,k):wt,Tt=G(s,"ADD_DATA_URI_TAGS")?C(Q(Pt),s.ADD_DATA_URI_TAGS,k):Pt,de=G(s,"FORBID_CONTENTS")?C({},s.FORBID_CONTENTS,k):At,Ee=G(s,"FORBID_TAGS")?C({},s.FORBID_TAGS,k):Q({}),Ke=G(s,"FORBID_ATTR")?C({},s.FORBID_ATTR,k):Q({}),ue=G(s,"USE_PROFILES")?s.USE_PROFILES:!1,Et=s.ALLOW_ARIA_ATTR!==!1,Ye=s.ALLOW_DATA_ATTR!==!1,yt=s.ALLOW_UNKNOWN_PROTOCOLS||!1,_t=s.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ae=s.SAFE_FOR_TEMPLATES||!1,Ne=s.SAFE_FOR_XML!==!1,ne=s.WHOLE_DOCUMENT||!1,le=s.RETURN_DOM||!1,Re=s.RETURN_DOM_FRAGMENT||!1,Ie=s.RETURN_TRUSTED_TYPE||!1,Ve=s.FORCE_BODY||!1,Ct=s.SANITIZE_DOM!==!1,St=s.SANITIZE_NAMED_PROPS||!1,Xe=s.KEEP_CONTENT!==!1,ye=s.IN_PLACE||!1,ht=s.ALLOWED_URI_REGEXP||on,pe=s.NAMESPACE||X,Le=s.MATHML_TEXT_INTEGRATION_POINTS||Le,Me=s.HTML_INTEGRATION_POINTS||Me,v=s.CUSTOM_ELEMENT_HANDLING||{},s.CUSTOM_ELEMENT_HANDLING&&vt(s.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(v.tagNameCheck=s.CUSTOM_ELEMENT_HANDLING.tagNameCheck),s.CUSTOM_ELEMENT_HANDLING&&vt(s.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(v.attributeNameCheck=s.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),s.CUSTOM_ELEMENT_HANDLING&&typeof s.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(v.allowCustomizedBuiltInElements=s.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ae&&(Ye=!1),Re&&(le=!0),ue&&(I=C({},Ht),L=[],ue.html===!0&&(C(I,$t),C(L,Wt)),ue.svg===!0&&(C(I,st),C(L,ut),C(L,Oe)),ue.svgFilters===!0&&(C(I,at),C(L,ut),C(L,Oe)),ue.mathMl===!0&&(C(I,lt),C(L,Gt),C(L,Oe))),s.ADD_TAGS&&(typeof s.ADD_TAGS=="function"?se.tagCheck=s.ADD_TAGS:(I===bt&&(I=Q(I)),C(I,s.ADD_TAGS,k))),s.ADD_ATTR&&(typeof s.ADD_ATTR=="function"?se.attributeCheck=s.ADD_ATTR:(L===xt&&(L=Q(L)),C(L,s.ADD_ATTR,k))),s.ADD_URI_SAFE_ATTR&&C(Ze,s.ADD_URI_SAFE_ATTR,k),s.FORBID_CONTENTS&&(de===At&&(de=Q(de)),C(de,s.FORBID_CONTENTS,k)),Xe&&(I["#text"]=!0),ne&&C(I,["html","head","body"]),I.table&&(C(I,["tbody"]),delete Ee.tbody),s.TRUSTED_TYPES_POLICY){if(typeof s.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ae('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof s.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ae('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=s.TRUSTED_TYPES_POLICY,te=A.createHTML("")}else A===void 0&&(A=ho(y,r)),A!==null&&typeof te=="string"&&(te=A.createHTML(""));q&&q(s),fe=s}},Nt=C({},[...st,...at,...ro]),Rt=C({},[...lt,...io]),On=function(s){let f=V(s);(!f||!f.tagName)&&(f={namespaceURI:pe,tagName:"template"});const x=ze(s.tagName),P=ze(f.tagName);return Qe[s.namespaceURI]?s.namespaceURI===De?f.namespaceURI===X?x==="svg":f.namespaceURI===ke?x==="svg"&&(P==="annotation-xml"||Le[P]):!!Nt[x]:s.namespaceURI===ke?f.namespaceURI===X?x==="math":f.namespaceURI===De?x==="math"&&Me[P]:!!Rt[x]:s.namespaceURI===X?f.namespaceURI===De&&!Me[P]||f.namespaceURI===ke&&!Le[P]?!1:!Rt[x]&&(Dn[x]||!Nt[x]):!!(_e==="application/xhtml+xml"&&Qe[s.namespaceURI]):!1},j=function(s){Ce(e.removed,{element:s});try{V(s).removeChild(s)}catch{S(s)}},oe=function(s,f){try{Ce(e.removed,{attribute:f.getAttributeNode(s),from:f})}catch{Ce(e.removed,{attribute:null,from:f})}if(f.removeAttribute(s),s==="is")if(le||Re)try{j(f)}catch{}else try{f.setAttribute(s,"")}catch{}},It=function(s){let f=null,x=null;if(Ve)s="<remove></remove>"+s;else{const R=ct(s,/^[\r\n\t ]+/);x=R&&R[0]}_e==="application/xhtml+xml"&&pe===X&&(s='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+s+"</body></html>");const P=A?A.createHTML(s):s;if(pe===X)try{f=new b().parseFromString(P,_e)}catch{}if(!f||!f.documentElement){f=Y.createDocument(pe,"template",null);try{f.documentElement.innerHTML=Je?te:P}catch{}}const O=f.body||f.documentElement;return s&&x&&O.insertBefore(n.createTextNode(x),O.childNodes[0]||null),pe===X?xe.call(f,ne?"html":"body")[0]:ne?f.documentElement:O},kt=function(s){return $e.call(s.ownerDocument||s,s,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},tt=function(s){return s instanceof p&&(typeof s.nodeName!="string"||typeof s.textContent!="string"||typeof s.removeChild!="function"||!(s.attributes instanceof m)||typeof s.removeAttribute!="function"||typeof s.setAttribute!="function"||typeof s.namespaceURI!="string"||typeof s.insertBefore!="function"||typeof s.hasChildNodes!="function")},Dt=function(s){return typeof c=="function"&&s instanceof c};function Z(E,s,f){Be(E,x=>{x.call(e,s,f,fe)})}const Lt=function(s){let f=null;if(Z(U.beforeSanitizeElements,s,null),tt(s))return j(s),!0;const x=k(s.nodeName);if(Z(U.uponSanitizeElement,s,{tagName:x,allowedTags:I}),Ne&&s.hasChildNodes()&&!Dt(s.firstElementChild)&&z(/<[/\w!]/g,s.innerHTML)&&z(/<[/\w!]/g,s.textContent)||s.nodeType===Pe.progressingInstruction||Ne&&s.nodeType===Pe.comment&&z(/<[/\w]/g,s.data))return j(s),!0;if(!(se.tagCheck instanceof Function&&se.tagCheck(x))&&(!I[x]||Ee[x])){if(!Ee[x]&&Bt(x)&&(v.tagNameCheck instanceof RegExp&&z(v.tagNameCheck,x)||v.tagNameCheck instanceof Function&&v.tagNameCheck(x)))return!1;if(Xe&&!de[x]){const P=V(s)||s.parentNode,O=K(s)||s.childNodes;if(O&&P){const R=O.length;for(let $=R-1;$>=0;--$){const J=_(O[$],!0);J.__removalCount=(s.__removalCount||0)+1,P.insertBefore(J,N(s))}}}return j(s),!0}return s instanceof l&&!On(s)||(x==="noscript"||x==="noembed"||x==="noframes")&&z(/<\/no(script|embed|frames)/i,s.innerHTML)?(j(s),!0):(ae&&s.nodeType===Pe.text&&(f=s.textContent,Be([He,We,Ge],P=>{f=Se(f,P," ")}),s.textContent!==f&&(Ce(e.removed,{element:s.cloneNode()}),s.textContent=f)),Z(U.afterSanitizeElements,s,null),!1)},Mt=function(s,f,x){if(Ct&&(f==="id"||f==="name")&&(x in n||x in Bn))return!1;if(!(Ye&&!Ke[f]&&z(wn,f))){if(!(Et&&z(vn,f))){if(!(se.attributeCheck instanceof Function&&se.attributeCheck(f,s))){if(!L[f]||Ke[f]){if(!(Bt(s)&&(v.tagNameCheck instanceof RegExp&&z(v.tagNameCheck,s)||v.tagNameCheck instanceof Function&&v.tagNameCheck(s))&&(v.attributeNameCheck instanceof RegExp&&z(v.attributeNameCheck,f)||v.attributeNameCheck instanceof Function&&v.attributeNameCheck(f,s))||f==="is"&&v.allowCustomizedBuiltInElements&&(v.tagNameCheck instanceof RegExp&&z(v.tagNameCheck,x)||v.tagNameCheck instanceof Function&&v.tagNameCheck(x))))return!1}else if(!Ze[f]){if(!z(ht,Se(x,gt,""))){if(!((f==="src"||f==="xlink:href"||f==="href")&&s!=="script"&&eo(x,"data:")===0&&Tt[s])){if(!(yt&&!z(Nn,Se(x,gt,"")))){if(x)return!1}}}}}}}return!0},Bt=function(s){return s!=="annotation-xml"&&ct(s,Rn)},Ot=function(s){Z(U.beforeSanitizeAttributes,s,null);const{attributes:f}=s;if(!f||tt(s))return;const x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:L,forceKeepAttr:void 0};let P=f.length;for(;P--;){const O=f[P],{name:R,namespaceURI:$,value:J}=O,me=k(R),nt=J;let M=R==="value"?nt:to(nt);if(x.attrName=me,x.attrValue=M,x.keepAttr=!0,x.forceKeepAttr=void 0,Z(U.uponSanitizeAttribute,s,x),M=x.attrValue,St&&(me==="id"||me==="name")&&(oe(R,s),M=In+M),Ne&&z(/((--!?|])>)|<\/(style|title|textarea)/i,M)){oe(R,s);continue}if(me==="attributename"&&ct(M,"href")){oe(R,s);continue}if(x.forceKeepAttr)continue;if(!x.keepAttr){oe(R,s);continue}if(!_t&&z(/\/>/i,M)){oe(R,s);continue}ae&&Be([He,We,Ge],zt=>{M=Se(M,zt," ")});const Ut=k(s.nodeName);if(!Mt(Ut,me,M)){oe(R,s);continue}if(A&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!$)switch(y.getAttributeType(Ut,me)){case"TrustedHTML":{M=A.createHTML(M);break}case"TrustedScriptURL":{M=A.createScriptURL(M);break}}if(M!==nt)try{$?s.setAttributeNS($,R,M):s.setAttribute(R,M),tt(s)?j(s):Ft(e.removed)}catch{oe(R,s)}}Z(U.afterSanitizeAttributes,s,null)},Un=function E(s){let f=null;const x=kt(s);for(Z(U.beforeSanitizeShadowDOM,s,null);f=x.nextNode();)Z(U.uponSanitizeShadowNode,f,null),Lt(f),Ot(f),f.content instanceof i&&E(f.content);Z(U.afterSanitizeShadowDOM,s,null)};return e.sanitize=function(E){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},f=null,x=null,P=null,O=null;if(Je=!E,Je&&(E="<!-->"),typeof E!="string"&&!Dt(E))if(typeof E.toString=="function"){if(E=E.toString(),typeof E!="string")throw Ae("dirty is not a string, aborting")}else throw Ae("toString is not a function");if(!e.isSupported)return E;if(je||et(s),e.removed=[],typeof E=="string"&&(ye=!1),ye){if(E.nodeName){const J=k(E.nodeName);if(!I[J]||Ee[J])throw Ae("root node is forbidden and cannot be sanitized in-place")}}else if(E instanceof c)f=It("<!---->"),x=f.ownerDocument.importNode(E,!0),x.nodeType===Pe.element&&x.nodeName==="BODY"||x.nodeName==="HTML"?f=x:f.appendChild(x);else{if(!le&&!ae&&!ne&&E.indexOf("<")===-1)return A&&Ie?A.createHTML(E):E;if(f=It(E),!f)return le?null:Ie?te:""}f&&Ve&&j(f.firstChild);const R=kt(ye?E:f);for(;P=R.nextNode();)Lt(P),Ot(P),P.content instanceof i&&Un(P.content);if(ye)return E;if(le){if(Re)for(O=be.call(f.ownerDocument);f.firstChild;)O.appendChild(f.firstChild);else O=f;return(L.shadowroot||L.shadowrootmode)&&(O=Pn.call(o,O,!0)),O}let $=ne?f.outerHTML:f.innerHTML;return ne&&I["!doctype"]&&f.ownerDocument&&f.ownerDocument.doctype&&f.ownerDocument.doctype.name&&z(rn,f.ownerDocument.doctype.name)&&($="<!DOCTYPE "+f.ownerDocument.doctype.name+`>
`+$),ae&&Be([He,We,Ge],J=>{$=Se($,J," ")}),A&&Ie?A.createHTML($):$},e.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(E),je=!0},e.clearConfig=function(){fe=null,je=!1},e.isValidAttribute=function(E,s,f){fe||et({});const x=k(E),P=k(s);return Mt(x,P,f)},e.addHook=function(E,s){typeof s=="function"&&Ce(U[E],s)},e.removeHook=function(E,s){if(s!==void 0){const f=Jn(U[E],s);return f===-1?void 0:Qn(U[E],f,1)[0]}return Ft(U[E])},e.removeHooks=function(E){U[E]=[]},e.removeAllHooks=function(){U=Yt()},e}var jt=cn();const bo=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),xo=(t,e)=>typeof t!="number"||e===null?null:t-e,Vt=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,o]of Object.entries(e))if(t.includes(n))return o;return t.replace("카드","").substring(0,2).toUpperCase()},Eo=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:o,svg:r}of n)for(const i of o)if(e.includes(i.toUpperCase()))return chrome.runtime.getURL(`assets/card/${r}`);return null},yo=(t,e,n)=>{const o=" recommended",r=document.createElement("div");r.className=`picsel-card-benefit-item${o}`;const i=t.cardName||t.card||"카드",c=Eo(i)||t.imageUrl;if(c){const h=document.createElement("div");h.className="picsel-card-image-wrapper";const _=document.createElement("img");_.src=c,_.alt=i,_.className="picsel-card-image",_.onerror=()=>{const S=Vt(i);h.textContent="";const N=document.createElement("div");N.className="picsel-card-initial",N.textContent=jt.sanitize(S,{ALLOWED_TAGS:[]}),h.appendChild(N)},h.appendChild(_),r.appendChild(h)}else{const h=Vt(i),_=document.createElement("div");_.className="picsel-card-image-wrapper";const S=document.createElement("div");S.className="picsel-card-initial",S.textContent=jt.sanitize(h,{ALLOWED_TAGS:[]}),_.appendChild(S),r.appendChild(_)}const l=document.createElement("div");l.className="picsel-card-info";const d=document.createElement("div");if(d.className="picsel-card-header",(t.discountAmount??0)>0){const h=document.createElement("span");h.className="picsel-recommended-badge",h.textContent=`${e+1}위`,d.appendChild(h)}const m=document.createElement("span");m.className="picsel-card-name";const p=i.includes(",")?i.split(",")[0].trim():i;if(m.textContent=p,d.appendChild(m),l.appendChild(d),t.benefit){const h=document.createElement("div");h.className="picsel-card-benefit-desc",h.textContent=t.benefit,l.appendChild(h)}r.appendChild(l);const b=document.createElement("div");if(b.className="picsel-card-amount",t.benefitType==="installment"){const h=document.createElement("div");h.className="picsel-card-installment",h.textContent=t.benefit||"무이자",b.appendChild(h)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const S=document.createElement("div");S.className="picsel-card-final-price";const N=ve(t.finalPrice,n);S.textContent=N,b.appendChild(S)}const h=document.createElement("div");h.className="picsel-card-discount";const _=ve(t.discountAmount,n);h.textContent=`-${_}`,b.appendChild(h)}else if(typeof t.rate=="number"&&t.rate>0){const h=document.createElement("div");h.className="picsel-card-rate",h.textContent=`${t.rate}%`,b.appendChild(h)}return r.appendChild(b),r},_o=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const y=document.createElement("section");y.className="picsel-section picsel-card-section";const h=document.createElement("h4");h.className="picsel-section-title",h.textContent="카드별 혜택",y.appendChild(h);const _=document.createElement("div");return _.className="picsel-empty-benefits",_.textContent="카드 혜택 정보를 불러오는 중...",y.appendChild(_),y}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(y=>{const h=y;if(h.benefitType==="point"||h.benefitType==="installment")return null;const _=h.rate??h.discount;let S=0,N=0;typeof _=="number"&&_>100||h.benefitType==="discount"?(S=typeof _=="number"&&_>100?_:h.discount??0,N=0):(N=typeof _=="number"&&_<=100?_:0,S=bo(n,N)??0);const K=xo(n,S);return{...h,cardName:h.cardName??h.card,rate:N,discountAmount:S??void 0,finalPrice:K??void 0}}).filter(y=>y!==null).sort((y,h)=>{const _=y?.discountAmount??0,S=h?.discountAmount??0;if(_!==S)return S-_;const N=y?.rate??0;return(h?.rate??0)-N})[0];if(!i)return null;const a=document.createElement("section");a.className="picsel-section picsel-card-section";const c=document.createElement("h4");c.className="picsel-section-title",c.textContent="추천 카드 혜택",a.appendChild(c);const l=document.createElement("div");l.className="picsel-card-benefit-list";const d=t.currency??"KRW",m=yo(i,0,d);l.appendChild(m),a.appendChild(l);const p=[],b=t.elevenst?.totalPointAmount??0;if(b>0&&p.push(`최대 적립 포인트 ${b.toLocaleString()}P`),t.giftCardDiscount?.description&&p.push(t.giftCardDiscount.description),t.cashback?.description&&p.push(t.cashback.description),p.length>0){const y=document.createElement("div");y.className="picsel-sub-benefits",p.forEach(h=>{const _=document.createElement("div");_.className="picsel-sub-benefit-item",_.textContent=h,y.appendChild(_)}),a.appendChild(y)}return a},Co=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const o=document.createElement("button");return o.className="picsel-footer-confirm",o.textContent="확인했습니다",o.type="button",o.addEventListener("click",()=>{ge(!1)}),n.appendChild(o),e.appendChild(n),e},Xt=t=>{const{buttonBadgeEl:e}=g;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(r=>{const i=r,a=i.rate??i.discount;return typeof a=="number"?a:0}).filter(r=>r>0):[];if(n.length>0){const r=Math.max(...n);e.textContent=`최대 ${r}%`,e.style.display="inline-flex";return}const o=t.cashback?.amount;if(typeof o=="number"&&o>0){const r=ve(o,t.currency??"KRW");e.textContent=r?`${r} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},sn=()=>{const{contentEl:t,cachedData:e}=g;if(!t)return;if(t.textContent="",!e){const a=document.createElement("p");a.className="picsel-empty-state",a.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(a),Xt(null);return}const n=e,o=jn(n);t.appendChild(o);const r=_o(n);r&&t.appendChild(r);const i=Co();i&&t.appendChild(i),Xt(n)},ge=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:o}=g;!e||!n||!o||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),o.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),o.textContent="PicSel 혜택 보기"))},So=()=>{if(g.mounted)return;if(document.getElementById(ot)){const i=document.getElementById(ot);i&&(g.hostElement=i,g.shadowRoot=i.shadowRoot,i.shadowRoot&&(g.toggleButton=i.shadowRoot.querySelector(".picsel-toggle-button"),g.buttonLabelEl=i.shadowRoot.querySelector(".picsel-toggle-label"),g.buttonBadgeEl=i.shadowRoot.querySelector(".picsel-toggle-badge"),g.panelEl=i.shadowRoot.querySelector(`#${rt}`),g.closeButtonEl=i.shadowRoot.querySelector(".picsel-close-button"),g.contentEl=i.shadowRoot.querySelector(".picsel-panel-content"),g.panelTitleEl=i.shadowRoot.querySelector(".picsel-panel-title"))),g.mounted=!0;return}g.hostElement=document.createElement("div"),g.hostElement.id=ot,g.hostElement.style.position="fixed",g.hostElement.style.bottom="24px",g.hostElement.style.right="24px",g.hostElement.style.zIndex=String(2147483647),g.shadowRoot=g.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=Wn,g.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",g.shadowRoot.appendChild(e),g.toggleButton=document.createElement("button"),g.toggleButton.className="picsel-toggle-button",g.toggleButton.type="button",g.toggleButton.setAttribute("aria-expanded","false"),g.buttonLabelEl=document.createElement("span"),g.buttonLabelEl.className="picsel-toggle-label",g.buttonLabelEl.textContent="PicSel 혜택 보기",g.toggleButton.appendChild(g.buttonLabelEl),g.buttonBadgeEl=document.createElement("span"),g.buttonBadgeEl.className="picsel-toggle-badge",g.toggleButton.appendChild(g.buttonBadgeEl),e.appendChild(g.toggleButton),g.panelEl=document.createElement("div"),g.panelEl.className="picsel-panel",g.panelEl.id=rt,g.panelEl.setAttribute("role","dialog"),g.panelEl.setAttribute("aria-hidden","true"),g.toggleButton.setAttribute("aria-controls",rt);const n=document.createElement("div");n.className="picsel-panel-header",g.panelTitleEl=document.createElement("div"),g.panelTitleEl.className="picsel-panel-title",g.panelTitleEl.textContent="PicSel 혜택 정보",g.closeButtonEl=document.createElement("button"),g.closeButtonEl.type="button",g.closeButtonEl.className="picsel-close-button",g.closeButtonEl.setAttribute("aria-label","닫기"),g.closeButtonEl.textContent="✕",n.appendChild(g.panelTitleEl),n.appendChild(g.closeButtonEl),g.panelEl.appendChild(n),g.contentEl=document.createElement("div"),g.contentEl.className="picsel-panel-content",g.panelEl.appendChild(g.contentEl),e.appendChild(g.panelEl);const o=g.panelEl,r=g.hostElement;g.toggleButton.addEventListener("click",()=>{const i=!o.classList.contains("open");ge(i)}),g.closeButtonEl.addEventListener("click",()=>{ge(!1)}),window.addEventListener("keydown",i=>{i.key==="Escape"&&ge(!1)}),document.addEventListener("click",i=>{if(!o.classList.contains("open"))return;const a=i.composedPath();r&&!a.includes(r)&&ge(!1)},!0),document.body.appendChild(g.hostElement),g.mounted=!0},an=()=>{if(g.panelTitleEl&&g.cachedData?.site){const t=Yn(g.cachedData.site);g.panelTitleEl.textContent=`${t} 혜택 정보`}},ln=t=>{g.cachedData={...t},So(),an(),sn(),ge(!1)},Ao=t=>{if(g.cachedData={...g.cachedData??{},...t},!g.mounted){ln(g.cachedData);return}an(),sn()};class he{extractNumber(e){const o=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return o?parseInt(o[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const o of n)try{const r=this.getTextBySelector(e,o);if(r)return r}catch(r){ee.error(w.PAR_E004,`Selector error: ${o}`,{data:{siteName:this.siteName,selector:o},error:r instanceof Error?r:void 0})}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const o=e.querySelectorAll('[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]');for(const l of o){const m=(l.textContent||"").match(n);if(m)return ee.debug("Found price in container",{siteName:this.siteName,price:m[0]}),m[0]}const r=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i,a=0;const c=1e3;for(;(i=r.nextNode())&&a<c;){a++;const d=(i.textContent||"").match(n);if(d)return ee.debug("Found price via TreeWalker",{siteName:this.siteName,price:d[0],nodesScanned:a}),d[0]}return a>=c&&ee.warn("TreeWalker hit node limit",{siteName:this.siteName,limit:c}),null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,o=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:o||void 0}}}const W={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",'[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},To=t=>{for(const e of W.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Po=t=>{try{const e=t.querySelector(W.mainImage);if(e?.src){let o=e.src;return o.startsWith("//")&&(o=`https:${o}`),o=o.split("?")[0],o}const n=t.querySelector(W.thumbnailContainer);if(n){const o=n.querySelector("ul > li:first-child img");if(o){let r=o.src;if(r)return r.startsWith("//")&&(r=`https:${r}`),r.includes("thumbnails/remote/")&&(r=r.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),r=r.split("?")[0],r}}return null}catch(e){return u.error(w.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},wo=t=>{try{const e=[],n=new Set,o=t.querySelector(W.thumbnailContainer);if(o){const r=o.querySelectorAll("ul > li img");for(const i of r){let c=i.src;if(c&&!n.has(c)&&(c.startsWith("//")&&(c=`https:${c}`),c.includes("thumbnails/remote/")&&(c=c.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),c=c.split("?")[0],!n.has(c)&&(e.push(c),n.add(c),e.length>=10)))break}}return e}catch(e){return u.error(w.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},T=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},un=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},dn=t=>typeof t=="number"&&t>100&&t<1e8,Ue=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},Zt=t=>t>=100&&t<=1e8,vo=t=>{let e=null,n=null,o=null;for(const r of W.amount)try{const i=t.querySelector(r);if(!i||!i.textContent)continue;const a=i.textContent.trim();if(!/[\d,]+\s*원?/.test(a)&&!/^\d{1,3}(,\d{3})*$/.test(a.replace(/[^\d,]/g,"")))continue;const c=T(a);if(!c||!Zt(c))continue;if(u.debug(`Found via selector "${r}"`,{value:c}),/final|discount|final-price|deal|sale|coupon/i.test(r)){o=c,e=c;break}n||(n=c),e||(e=c)}catch(i){u.debug(`Selector ${r} failed`,{error:i})}if(!e){const r=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of r){const c=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c){const l=T(c[1]);if(l&&Zt(l)){u.debug("Found via regex in element",{value:l}),e=l;break}}}}return{amount:e,originalPrice:n,discountPrice:o}},No=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=n.nextNode();){const r=(o.textContent||"").replace(/\u00A0/g," ");for(const i of e){const a=r.match(i);if(a&&a[1]){const c=T(a[1]);if(c)return u.debug("Found price via text walker",{value:c}),c}}}return null},Ro=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const o of e){const r=(o.textContent||"").replace(/\u00A0/g," ").trim(),i=(o.getAttribute("data-price")||"").trim(),c=`${r} ${i}`.trim().match(n);if(c&&c[1]){const l=T(c[1]);if(l)return u.debug("Found price by element scan",{value:l}),l}}}catch(e){u.debug("findPriceByElementScan error",{error:e})}return null},qe=t=>{for(const[e,n]of Object.entries(Fn))if(t.includes(e))return n;return null},Io=t=>{const e=[],n=W.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const a=i,c=a.src,l=a.alt||"";if(!c)return;let d=l.trim();d||(d=qe(c)||""),d&&!d.includes("카드")&&(d=`${d}카드`),c&&d&&(e.some(m=>m.cardName===d)||(e.push({src:c,alt:l,cardName:d}),u.debug("카드 이미지 발견",{cardName:d,src:c.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(a=>{const c=a,l=c.src,d=c.alt||"";if(!l||(c.width||c.naturalWidth)>100)return;let p=d.trim();p||(p=qe(l)||""),p&&!p.includes("카드")&&(p=`${p}카드`),l&&p&&!e.some(b=>b.cardName===p)&&e.push({src:l,alt:d,cardName:p})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const a=i,c=a.src,l=a.alt||"";if(!c||(a.width||a.naturalWidth)>100)return;let m=l.trim();m||(m=qe(c)||""),m&&!m.includes("카드")&&(m=`${m}카드`),c&&m&&!e.some(p=>p.cardName===m)&&e.push({src:c,alt:l,cardName:m})}),u.debug("추출된 카드 이미지 총",{count:e.length}),e},ko=t=>{const e=[],n=W.cardBenefitPopup,o=t.querySelector(n.container);if(!o)return u.debug("카드 혜택 팝업을 찾을 수 없음"),e;const r=o.querySelector(n.iframe);if(r)try{const a=r.contentDocument||r.contentWindow?.document;if(a)return Do(a)}catch{u.warn("iframe 접근 불가 (cross-origin)")}const i=o.querySelector(n.content);return i?Lo(i):e},Do=t=>{const e=[],n=W.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(r=>{const i=r.querySelector(n.cardName),a=r.querySelector(n.benefitRate),c=r.querySelector(n.benefitDesc),l=i?.textContent?.trim()||"",d=a?.textContent?.trim()||"",m=c?.textContent?.trim()||r.textContent?.trim()||"";if(l){const p=un(d||m)??void 0;e.push({card:l,cardName:l,benefit:m||d||"혜택 제공",discount:p,rate:p})}}),e},Lo=t=>{const e=[],n=t.textContent||"",o=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const r of o){let i;for(;(i=r.exec(n))!==null;){const a=i[1].includes("카드")?i[1]:`${i[1]}카드`,c=parseFloat(i[2]);e.some(l=>l.card===a)||e.push({card:a,cardName:a,benefit:`최대 ${c}% 할인/적립`,discount:c,rate:c})}}return e},Mo=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(o=>{const r=o.textContent||"",i=r.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const a=i[1].includes("카드")?i[1]:`${i[1]}카드`,c=parseFloat(i[2]);if(!e.some(l=>l.card===a)){let l=`최대 ${c}% 할인/적립`;const d=r.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);d&&(l=`최대 ${c}% ${d[0]}`),e.push({card:a,cardName:a,benefit:l,discount:c,rate:c})}}}),e},Bo=t=>{let e=[];const n=Io(t),o=ko(t);if(o.length>0&&(u.info("팝업에서 카드 혜택 파싱",{count:o.length}),e=o),Mo(t).forEach(i=>{e.some(a=>a.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(W.benefitBadge);if(i){const a=i.querySelectorAll("img.benefit-ico"),c=[],l=[];a.forEach(p=>{const b=p.getAttribute("src");if(b){const y=qe(b);y&&(c.push(y),l.push(b))}});const d=i.querySelector(".benefit-label")?.textContent?.trim(),m=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(d){const p=un(d),b=c.length>0?`${c.slice(0,3).join(", ")}${c.length>3?" 외":""}`:"쿠팡 파트너 카드",y=p??void 0;e.push({card:b,cardName:b,benefit:`${d}${m?` (${m})`:""}`,discount:y,rate:y,imageUrl:l[0]})}}}return e=e.map((i,a)=>{if(!i.imageUrl){const c=i.cardName||i.card||"";let l=n.find(d=>{const m=Ue(d.cardName),p=Ue(c);return m===p});if(l||(l=n.find(d=>{const m=Ue(d.cardName).replace("카드",""),p=Ue(c).replace("카드","");return m.includes(p)||p.includes(m)})),!l&&a<n.length&&(l=n[a],u.debug("인덱스 기반 매칭",{cardName:c,matchedCardName:l.cardName})),l)return{...i,imageUrl:l.src}}return i}),e.sort((i,a)=>(a.discount??0)-(i.discount??0)),u.debug("최종 카드 혜택",{benefits:e}),e},Oo=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const r=parseInt(n[1],10);return{rate:r,description:`기프트카드 ${r}% 할인`}}const o=t.querySelectorAll("div, span, p");for(const r of o){const i=r.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const a=i.match(/(\d+)\s*%/);if(a)return{rate:parseInt(a[1],10),description:i.trim()}}}return null},Uo=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const r of e){const i=r.textContent||"",a=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(a&&i.includes("쿠팡캐시")){const c=T(a[1]);if(c)return{amount:c,description:`쿠팡캐시 ${c.toLocaleString()} 원 적립`}}}const o=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(o){const r=T(o[1]);if(r)return{amount:r,description:`쿠팡캐시 ${r.toLocaleString()} 원 적립`}}return null},zo=t=>{try{const e=[],n=new Set,o=t.querySelector(W.instantOption);if(!o)return e;const r=o.querySelectorAll("section > ul > li");for(const i of r)try{const a=i.querySelectorAll("div");if(a.length<2)continue;let c="";for(const p of a){const b=p.textContent||"";if(!b.includes("원")&&b.trim().length>0&&!b.includes("px")){c=b.trim();break}}let l="";for(const p of a){const y=(p.textContent||"").match(/[\d,]+원/);if(y){l=y[0].replace(/[,원]/g,"");break}}if(!l)continue;const d=parseInt(l);if(!d||d<100||!c||c.length<2)continue;const m=`${c}-${d}`;if(n.has(m))continue;if(e.push({name:c,price:d}),n.add(m),e.length>=15)break}catch(a){u.warn("Error parsing list item",{error:a});continue}return e}catch(e){return u.error(w.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},qo=t=>t.querySelector(W.shipping)?.textContent?.trim()||null,Fo=(t,e)=>{if(!dn(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let o=Math.round(t*(n/100));return e.maxDiscount&&o>e.maxDiscount&&(o=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:o},$o=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},pn=(t,e)=>t.map(o=>{const r=$o(o);return e&&dn(e)&&(r.discountAmount=Fo(e,r)),r}).sort((o,r)=>o.discountAmount!==void 0&&r.discountAmount!==void 0?r.discountAmount-o.discountAmount:(r.rate??0)-(o.rate??0)),fn=t=>{const e=new Map;for(const n of t){const o=Ho(n.cardName||n.card),r=e.get(o);if(!r)e.set(o,n);else{const i=r.rate??r.discount??0;(n.rate??n.discount??0)>i&&e.set(o,n)}}return Array.from(e.values())},Ho=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","NH","BC","비씨","스마일"],n=t.toLowerCase();for(const o of e)if(n.includes(o.toLowerCase()))return o;return t};class mn extends he{siteName="Coupang";selectors={amount:W.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return u.debug(`isCheckoutPage("${e}") = ${n}`),n}parse(e){try{u.info("🔍 Parsing Coupang page...");const n=To(e),o=Po(e),r=wo(e),i=vo(e);let a=i.amount;const{originalPrice:c,discountPrice:l}=i;if(a||(a=No(e)),a||(a=Ro(e)),!a)return u.debug("❌ No price found"),null;const d=Bo(e),m=pn(d,a),p=fn(m),b=Oo(e),y=Uo(e),h=qo(e),_=zo(e);return u.info(`✅ Found: ${a} KRW, Cards: ${p.length}`),{price:a,amount:a,currency:"KRW",title:n||void 0,imageUrl:o||void 0,images:r,variants:_,originalPrice:c||void 0,discountPrice:l||void 0,cardBenefits:p,giftCardDiscount:b||void 0,cashback:y||void 0,shippingInfo:h||void 0,discounts:[]}}catch(n){return u.error(w.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const D={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},Wo=[/11st\.co\.kr\/products\/(\d+)/,/m\.11st\.co\.kr\/products\/(\d+)/],dt={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},Go=t=>{const e=D.product;try{const n=t.querySelector(e.title);if(n?.textContent){const r=n.textContent.trim();return u.debug("제목 추출",{title:r}),r}const o=t.querySelector(e.titleAlt);if(o?.textContent){const r=o.textContent.trim();return u.debug("제목 추출 (alt)",{title:r}),r}}catch(n){u.error(w.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},Ko=t=>{try{const e=t.querySelector(D.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return u.debug("부제목 추출",{subtitle:n}),n}}catch(e){u.error(w.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},Yo=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const o=t.match(n);if(o?.[1])return u.debug("상품ID 추출",{productId:o[1]}),o[1]}}catch(e){u.error(w.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},gn=t=>{const e=D.image;try{const n=t.querySelector(e.main);if(n?.src){const i=we(n.src);return u.debug("메인 이미지 추출",{src:i}),i}const o=t.querySelector(e.mainAlt);if(o?.src){const i=we(o.src);return u.debug("메인 이미지 추출 (alt)",{src:i}),i}const r=t.querySelector(`${e.main}[data-src]`);if(r?.dataset?.src){const i=we(r.dataset.src);return u.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){u.error(w.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},jo=t=>{const e=[],n=new Set,o=D.image;try{const r=gn(t);r&&(e.push(r),n.add(r)),t.querySelectorAll(o.thumbnail).forEach(c=>{const l=c,d=l.src||l.dataset?.src;if(d){const m=we(d),p=Jt(m);n.has(p)||(e.push(p),n.add(p))}}),t.querySelectorAll(o.thumbnailAlt).forEach(c=>{const l=c,d=l.src||l.dataset?.src;if(d){const m=we(d),p=Jt(m);n.has(p)||(e.push(p),n.add(p))}}),u.debug("전체 이미지 추출",{count:e.length})}catch(r){u.error(w.PAR_E001,"전체 이미지 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},Vo=t=>{const e=D.seller,n={seller:null,rating:null};try{const o=t.querySelector(e.name);o?.textContent&&(n.seller=o.textContent.trim(),u.debug("판매자 추출",{seller:n.seller}));const r=t.querySelector(e.rating);r?.textContent&&(n.rating=r.textContent.trim(),u.debug("판매자 등급 추출",{rating:n.rating}))}catch(o){u.error(w.PAR_E001,"판매자 정보 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return n};function we(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function Jt(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const Xo=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=D.price;try{const o=t.querySelector(n.originalPrice);o?.textContent&&(e.originalPrice=T(o.textContent),u.debug("정가",{price:e.originalPrice}));const r=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);r?.textContent&&(e.discountPrice=T(r.textContent),e.amount=e.discountPrice,u.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=T(i.textContent),u.debug("할인율",{rate:e.discountRate}));const a=t.querySelector(n.maxDiscountPrice);a?.textContent&&(e.maxDiscountPrice=T(a.textContent),u.debug("최대할인가",{price:e.maxDiscountPrice}));const c=t.querySelector(n.maxDiscountRate);c?.textContent&&(e.maxDiscountRate=T(c.textContent),u.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(o){u.error(w.PAR_E002,"가격 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},Zo=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const o of n){const r=o.textContent||"";for(const i of e){const a=r.match(i);if(a?.[1]){const c=T(a[1]);if(c&&c>100&&c<1e8)return u.debug("가격 발견",{value:c}),c}}}return null},Jo=t=>{const e=[],n=D.price;try{const o=t.querySelector(n.maxDiscountLayer);if(!o)return e;o.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const a=i.querySelector(".title"),c=i.querySelector(".price");if(a&&c){const l=a.textContent?.trim()||"",d=c.textContent?.trim()||"",m=T(d.replace("-",""));l&&m&&l!=="판매가"&&(e.push({type:l,amount:m}),u.debug("DiscountDetail",{type:l,amount:m}))}})}catch(o){u.error(w.PAR_E002,"DiscountDetail 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},Qo=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=er(t),e.totalPointAmount=e.points.reduce((n,o)=>n+o.amount,0),e.cardBenefits=tr(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,o)=>n+o.benefitAmount,0),e.installments=rr(t),e.maxInstallmentMonths=e.installments.reduce((n,o)=>Math.max(n,o.maxMonths),0),e.coupons=sr(t),u.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){u.error(w.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},er=t=>{const e=[],n=D.pointDetail;try{const o=t.querySelector(n.container);if(o){const r=o.querySelector(n.totalPoint);if(r?.textContent){const a=T(r.textContent);a&&(e.push({amount:a,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),u.debug("최대 적립 포인트",{amount:a}))}const i=o.querySelector(n.elevenPaySection);if(i){const a=i.querySelector(".total .value");if(a?.textContent){const l=T(a.textContent);l&&!e.find(d=>d.amount===l&&d.type==="최대적립포인트")&&(e.push({amount:l,type:"11pay포인트",description:"11pay 결제 시 적립"}),u.debug("11pay 포인트 총액",{amount:l}))}i.querySelectorAll(".desc li").forEach(l=>{const d=l.querySelector(".c_layer_expand button.c_product_btn"),m=l.querySelector(".value");if(d&&m){const p=d.textContent?.trim()||"",b=T(m.textContent||"");b&&p&&!p.includes("카드")&&(e.push({amount:b,type:p,description:p}),u.debug("포인트 항목",{type:p,amount:b}))}})}}if(e.length===0){const r=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(r?.textContent){const i=T(r.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),u.debug("기본 포인트",{amount:i}))}}}catch(o){u.error(w.PAR_E003,"포인트 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},tr=t=>{const e=[],n=D.cardDiscount;try{const o=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let r=null;for(const a of o)if(r=t.querySelector(a),r){u.debug("카드 혜택 컨테이너 찾음",{selector:a});break}if(u.debug("other_benefits 컨테이너",{found:!!r}),r){const a=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let c=null;for(const l of a)if(c=r.querySelectorAll(l),c.length>0){u.debug("benefit 블록 찾음",{selector:l,count:c.length});break}if(u.debug("benefit 블록 수",{count:c?.length||0}),!c||c.length===0){const l=r.querySelector("dl");if(u.debug("dl 요소",{found:!!l}),l){const d=l.children;u.debug("dl children",{count:d.length})}}c&&c.length>0&&c.forEach(l=>{const m=l.querySelector("dt")?.textContent?.trim()||"";if(u.debug("메인 타이틀",{mainTitle:m}),!m)return;const p=nr(m);p&&p.benefitAmount>0&&(e.push(p),u.debug("메인 혜택 추가",{mainParsed:p}));const b=l.querySelector("dd");if(b){const y=b.querySelectorAll(".tit_sub");u.debug("서브타이틀 수",{count:y.length}),y.forEach(h=>{const _=h.textContent?.trim()||"";if(u.debug("서브타이틀",{subTitle:_}),_.includes("안내사항")||_.includes("적립제외"))return;let S=h.nextElementSibling;for(;S&&S.tagName!=="UL"&&S.tagName!=="SPAN";)S=S.nextElementSibling;if(S&&S.tagName==="UL"){const N=S.querySelectorAll("li");u.debug("리스트 아이템 수",{count:N.length}),N.forEach(K=>{const V=K.textContent?.trim()||"";u.debug("아이템",{itemText:V});const A=or(_,V);A&&(e.find(Y=>Y.cardName===A.cardName&&Y.benefitType===A.benefitType&&Y.benefitAmount===A.benefitAmount)||(e.push(A),u.debug("서브 혜택 추가",{subBenefit:A})))})}})}})}else u.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(c=>{const l=c.textContent?.trim()||"";if(l.includes("카드")||l.includes("신한")){const m=c.closest("li")?.querySelector(".value")?.textContent?.trim()||"",p=T(m);if(p){const b=l.replace(" 결제 시","").trim();e.find(y=>y.cardName===b&&y.benefitType==="포인트")||e.push({cardName:b,benefitAmount:p,benefitType:"포인트",condition:"결제 시"})}}}),u.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(o){u.error(w.PAR_E003,"카드 혜택 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e};function nr(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const l of e){const d=t.match(l);if(d){n=d[1];break}}if(!n)return null;let o=0,r="",i="";const a=t.match(/최대\s*(\d+)%\s*적립/);a&&(o=parseInt(a[1],10),r="적립",i="결제 시");const c=t.match(/([\d,]+)원\s*할인/);return c&&(o=T(c[1])||0,r="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:o,benefitType:r||(t.includes("할인")?"할인":"적립"),condition:i}}function or(t,e){if(!e)return null;let n="",o=0,r="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const a=e.match(/([\d,]+)원\s*할인/);a&&(o=T(a[1])||0,r="할인");const c=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return c&&!r&&(o=parseFloat(c[1]),r="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!o||!r?null:{cardName:n,benefitAmount:o,benefitType:r,condition:i}}const rr=t=>{const e=[],n=D.installment;try{const o=t.querySelector(n.dialogContainer);if(o&&(o.querySelectorAll(".card_box").forEach(i=>{const c=i.querySelector("dt")?.textContent?.trim()||"";if(!c)return;i.querySelectorAll("dd").forEach(d=>{const m=d.textContent?.trim()||"";if(!m)return;const p=ir(c,m);p&&e.push(p)})}),u.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const r=t.querySelector(n.triggerButton);if(r){const c=(r.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);c&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"})}cr(t).forEach(a=>{e.find(c=>c.cardName===a.cardName)||e.push(a)})}u.info("총 무이자 할부 카드",{count:e.length})}catch(o){u.error(w.PAR_E003,"무이자 할부 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e};function ir(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const o=n[1],i=o.split(",").map(m=>parseInt(m.trim(),10)).filter(m=>!isNaN(m)),a=i.length>0?Math.max(...i):0;if(a===0)return null;let c=null;const l=e.match(/(\d+)만원/);l&&(c=parseInt(l[1],10)*1e4);let d="";return e.includes("11pay")?d="11pay 결제 시":e.includes("카카오페이")?d="카카오페이 결제 시":c&&(d=`${c/1e4}만원 이상`),{cardName:t,maxMonths:a,minAmount:c,months:`${o}개월`,condition:d}}function cr(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(r=>{const i=r.textContent||"",a=i.match(/최대\s*(\d+)\s*개월\s*무이자/);a&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(a[1],10),minAmount:null,months:`최대 ${a[1]}개월`,condition:"무이자 할부"}),n.forEach(c=>{if(i.includes(c)){const d=i.substring(i.indexOf(c)).match(/([\d,]+)개월/);if(d&&!e.find(p=>p.cardName.includes(c))){const p=d[1],b=p.split(",").map(h=>parseInt(h.trim(),10)),y=Math.max(...b.filter(h=>!isNaN(h)));e.push({cardName:`${c}카드`,maxMonths:y,minAmount:null,months:`${p}개월`,condition:""})}}})}),e}const sr=t=>{const e=[],n=D.coupon;try{const o=t.querySelector(n.badge);if(o?.textContent){const i=o.textContent.trim(),a=ar(i);a&&(e.push(a),u.debug("쿠폰 추출",{coupon:a}))}t.querySelectorAll(n.item).forEach(i=>{const a=i.querySelector(n.name),c=i.querySelector(n.discount);if(a||c){const l=a?.textContent?.trim()||"쿠폰",d=c?.textContent||"",m=d.includes("원")?T(d):null,p=d.includes("%")?T(d):null;e.push({name:l,discountAmount:m,discountRate:p})}})}catch(o){u.error(w.PAR_E003,"쿠폰 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e};function ar(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:T(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function Qt(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:o,name:r}of n)for(const i of o)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${r} (신용)`:e.includes("체크카드")?`${r} (체크)`:r;return e||t}function lr(t,e){const n=t.map(o=>{const r=Qt(o.cardName),i=o.benefitType==="할인",a=o.benefitAmount<=100?o.benefitAmount:0;let c="";return i?c=`${o.benefitAmount.toLocaleString()}원 할인`:o.benefitAmount<=100?c=`${o.benefitAmount}% 적립`:c=`${o.benefitAmount.toLocaleString()}P 적립`,{card:r,cardName:r,benefit:c,discount:i?o.benefitAmount:0,rate:a,condition:o.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(o=>{if(o.cardName==="__INSTALLMENT_SUMMARY__")return;const r=Qt(o.cardName);n.push({card:r,cardName:r,benefit:`${o.months} 무이자`,discount:0,rate:0,condition:o.condition,benefitType:"installment",pointAmount:0})}),n}class hn extends he{siteName=dt.siteName;selectors={amount:[D.price.salePrice,D.price.salePriceAlt,D.price.maxDiscountPrice],title:[D.product.title,D.product.titleAlt],image:[D.image.main,D.image.mainAlt]};static isProductPage(e){const n=Wo.some(o=>o.test(e));return u.debug(`isProductPage("${e}") = ${n}`),n}static extractProductId(e){return Yo(e)}parse(e){try{u.info("🔍 Parsing 11번가 page...");const n=Go(e),o=Ko(e),r=gn(e),i=jo(e),a=Vo(e),c=Xo(e);let l=c.amount;const{originalPrice:d,discountPrice:m,maxDiscountPrice:p,discountRate:b,maxDiscountRate:y}=c;if(l||(l=Zo(e)),!l)return u.debug("❌ No price found"),null;const h=Jo(e),_=Qo(e),{points:S,cardBenefits:N,installments:K,coupons:V,totalPointAmount:A,totalCardBenefitAmount:te,maxInstallmentMonths:Y}=_,$e=lr(N,K),be=[];return b&&be.push({rate:b,type:"SALE_DISCOUNT",description:"할인가"}),h.forEach(xe=>{be.push({rate:xe.amount,type:xe.type.toUpperCase().replace(/\s+/g,"_"),description:xe.type})}),u.info(`✅ Found: ${l.toLocaleString()} ${dt.currency}`),u.debug("파싱 결과",{title:n,totalPointAmount:A,cardBenefitsCount:N.length,installmentsCount:K.length,maxInstallmentMonths:Y}),{price:l,amount:l,currency:dt.currency,title:n?`${n}${o?` ${o}`:""}`:void 0,imageUrl:r||void 0,images:i,originalPrice:d||void 0,discountPrice:m||p||void 0,discountRate:b||void 0,cardBenefits:$e,discounts:be,elevenst:{maxDiscountPrice:p,maxDiscountRate:y,maxInstallmentMonths:Y,points:S,installments:K,coupons:V,totalPointAmount:A,totalCardBenefitAmount:te,seller:a.seller,sellerRating:a.rating,discountDetails:h}}}catch(n){return u.error(w.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const B={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},ur={productPage:/gmarket\.co\.kr\/item/i,vipPage:/gmarket\.co\.kr\/n\/(?:vip|item)/i,generalProduct:/gmarket\.co\.kr.*(?:goodscode|itemno)=/i},dr=t=>{const e=t.querySelector(B.product.title);if(e?.textContent){const n=e.textContent.trim();return u.debug("상품명",{title:n}),n}return u.warn("상품명을 찾을 수 없음"),null},pr=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const o of e){const i=o.src;if(i.includes("/still/600"))return u.debug("메인 이미지 (600px)",{src:i}),i}for(const o of e){const i=o.src;if(i.includes("/still/"))return u.debug("메인 이미지",{src:i}),i}const n=t.querySelector(B.product.mainImage);return n?.src?(u.debug("대체 이미지",{src:n.src}),n.src):(u.warn("상품 이미지를 찾을 수 없음"),null)},fr=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(o=>{let i=o.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),u.debug("총 이미지",{count:e.length}),e},mr=t=>{const e={},n=t.querySelector(B.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const o=t.querySelector(B.seller.official);e.isOfficial=!!o;const r=t.querySelector(B.seller.seller);return r?.textContent&&(e.seller=r.textContent.trim()),e},Fe=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return T(e)},gr=t=>{const e=B.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const r=Fe(n.textContent);if(r)return u.debug("결제할인가",{price:r}),r}const o=t.querySelector(e.discountPriceAlt);if(o?.textContent){const r=Fe(o.textContent);if(r)return u.debug("결제할인가 (alt)",{price:r}),r}return null},hr=t=>{const e=B.price,n=t.querySelector(e.salePrice);if(n?.textContent){const o=Fe(n.textContent);if(o)return u.debug("판매가",{price:o}),o}return null},br=t=>{const e=B.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const o=Fe(n.textContent);if(o)return u.debug("정가",{price:o}),o}return null},xr=t=>{const e=B.price,n=t.querySelector(e.discountRate);if(n?.textContent){const o=n.textContent.match(/(\d+)\s*%/);if(o){const r=parseInt(o[1],10);return u.debug("할인율",{rate:r}),r}}return null},Er=t=>{u.debug("가격 정보 추출 시작...");const e=br(t),n=hr(t),o=gr(t),r=xr(t),i=o||n||e;return u.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:o,discountRate:r}),{amount:i,originalPrice:e,salePrice:n,discountPrice:o,discountRate:r}},yr=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const o=n.textContent||"";if(o.includes("원")){const r=o.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(r){const i=T(r[1]);if(i&&i>=1e3)return u.debug("DOM 스캔 가격",{price:i}),i}}}return null},_r=t=>{const e=[],n=B.cardBenefit,o=t.querySelector(n.container);return o?(o.querySelectorAll(".gmarketcard_area img").forEach(i=>{const a=i,c=a.src,l=a.alt||"";if(c){let d=l;d||(c.includes("smile")||c.includes("Smile")?d="스마일카드":c.includes("samsung")?d="삼성카드":d="G마켓 제휴카드"),e.push({card:d,cardName:d,benefit:"G마켓 제휴카드 혜택",imageUrl:c}),u.debug("제휴카드",{cardName:d,src:c})}}),e):(u.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},Cr=t=>{const e=[],n=B.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(r=>{const i=r.querySelector(n.discountItemTitle),a=r.querySelector(n.discountItemDesc),c=r.querySelector(n.discountItemPrice),l=i?.textContent?.trim()||"",d=a?.textContent?.trim()||"";let m;if(c?.textContent){const p=c.textContent.match(/(\d{1,3}(?:,\d{3})*)/);p&&(m=parseInt(p[1].replace(/,/g,""),10))}l&&(e.push({title:l,description:d,discountPrice:m}),u.debug("결제 할인",{title:l,description:d}))}),e},Sr=t=>{u.debug("카드 혜택 추출 시작...");const e=[],n=_r(t);e.push(...n),Cr(t).forEach(i=>{const a=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(a){const c=a[1].includes("카드")?a[1]:`${a[1]}카드`,l=i.title.match(/(\d+(?:\.\d+)?)\s*%/),d=l?parseFloat(l[1]):void 0;e.some(m=>m.cardName===c)||e.push({card:c,cardName:c,benefit:i.title,discount:d,rate:d})}});const r=t.querySelector(".box__payment-discount");if(r){const a=(r.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(a){const c=parseInt(a[1],10);e.some(l=>l.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${c}% 할인`,discount:c,rate:c})}}return e.sort((i,a)=>(a.discount??0)-(i.discount??0)),u.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},Ar=t=>{const e=B.additionalBenefits,o=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!o)return null;let r="etc";o.includes("신세계포인트")?r="shinsegae_point":o.includes("스마일페이")?r="smile_pay":o.includes("스마일캐시")?r="smile_cash":o.includes("OK캐쉬백")&&(r="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(c=>{const l=c.querySelector(e.benefitLabel),d=c.querySelector(e.benefitValue),m=l?.textContent?.trim()||"",p=d?.textContent?.trim()||"";m&&p&&i.push({label:m,value:p})}),u.debug("추가 혜택",{type:r,title:o}),{type:r,title:o,details:i}},bn=t=>{u.debug("추가 혜택 추출 시작...");const e=[],n=B.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(r=>{const i=Ar(r);i&&e.push(i)}),u.debug("총 추가 혜택",{count:e.length}),e},Tr=t=>{const e=bn(t);for(const n of e)for(const o of n.details){const r=o.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(r)return{amount:parseInt(r[1].replace(/,/g,""),10),description:`${n.title}: ${o.value}`}}return null},Pr=t=>{const e=B.shipping,o=!!t.querySelector(e.starDelivery),r=t.querySelector(e.shippingInfo),i=o?"스타배송":"일반배송";let a,c,l=!1;if(r){const d=r.textContent||"",m=d.match(/(\d{1,3}(?:,\d{3})*)\s*원/);m?a=`${m[1]}원`:d.includes("무료")&&(a="무료",l=!0);const p=d.match(/(\d+\/\d+|\d+일)/);p&&(c=p[1])}return u.debug("배송 정보",{method:i,isStarDelivery:o,fee:a}),{method:i,isStarDelivery:o,isFree:l,fee:a,estimatedDate:c}};class xn extends he{siteName="Gmarket";selectors={amount:[B.price.discountPrice,B.price.salePrice,B.price.originalPrice]};static isCheckoutPage(e){const n=ur,o=n.productPage.test(e)||n.vipPage.test(e)||n.generalProduct.test(e);return ee.debug("isCheckoutPage check",{url:e,isCheckout:o}),o}parse(e){try{ee.info("Parsing Gmarket page...");const n=dr(e),o=pr(e),r=fr(e),i=mr(e),a=Er(e);let c=a.amount;if(c||(c=yr(e)),!c)return ee.warn("No price found in Gmarket page"),null;const l=Sr(e),d=pn(l,c),m=fn(d),p=bn(e),b=Tr(e),y=Pr(e);return ee.info("Parse successful",{amount:c,cardCount:m.length}),{price:c,amount:c,currency:"KRW",title:n||void 0,imageUrl:o||void 0,images:r,variants:[],originalPrice:a.originalPrice||void 0,discountPrice:a.discountPrice||void 0,cardBenefits:m,additionalBenefits:p.length>0?p:void 0,cashback:b||void 0,shippingInfo:y||void 0,sellerInfo:i||void 0,discounts:[]}}catch(n){return ee.error(w.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const wr={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class En extends he{siteName="Amazon";selectors={amount:wr.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{u.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(u.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return u.debug("❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return u.debug("❌ Invalid amount",{amount:o}),null;const r=this.extractCurrency(n),{title:i,imageUrl:a}=this.extractCommonInfo(e);return u.info(`✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return u.error(w.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const vr={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class yn extends he{siteName="eBay";selectors={amount:vr.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{u.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(u.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return u.debug("❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return u.debug("❌ Invalid amount",{amount:o}),null;const r=this.extractCurrency(n),{title:i,imageUrl:a}=this.extractCommonInfo(e);return u.info(`✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return u.error(w.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Nr={amount:[]};class _n extends he{siteName="Fallback";selectors={amount:Nr.amount};parse(e){try{u.info("🔍 Fallback parsing (text heuristic)...");const o=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!o)return u.debug('❌ No price with "원" found'),null;const r=this.extractNumber(o[1]);if(!r||!this.isValidPrice(r))return u.debug("❌ Invalid amount",{amount:r}),null;const{title:i,imageUrl:a}=this.extractCommonInfo(e);return u.info(`✅ Found: ${r} KRW (via text heuristic)`),{price:r,amount:r,currency:"KRW",title:i||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return u.error(w.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function Rr(t){return mn.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:hn.isProductPage(t)?{site:"11st",isCheckout:!0}:xn.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:En.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:yn.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function Ir(t){switch(t){case"coupang":return new mn;case"11st":return new hn;case"gmarket":return new xn;case"amazon":return new En;case"ebay":return new yn;default:return new _n}}function kr(){return new _n}function Cn(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},o=>{o?.success&&qn.debug("Product data saved",{source:e,messageType:n})})}function Sn(t,e){let n=null;const o=(...r)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...r),n=null},e)};return o.cancel=()=>{n&&(clearTimeout(n),n=null)},o}const Dr=500;function Lr(t){let e=!1,n=null;const o=Sn(i=>{ce.info("Dynamic content detected",{reason:i}),t(`dynamic-${i}`)||ce.warn("Dynamic reparse produced no result")},Dr),r=i=>{const a=i.some(p=>Array.from(p.addedNodes).some(b=>b instanceof Element?b.tagName==="IFRAME"||!!b.querySelector("iframe"):!1)),c=!e&&i.some(p=>Array.from(p.addedNodes).some(b=>b instanceof Element?b.classList.contains("benefit")||!!b.querySelector(".benefit")||b.closest(".other_benefits")&&(b.querySelector("dt")||b.querySelector("dd")):!1)),l=document.querySelector(".other_benefits .benefit dt");if(!(c&&l||a))return;c&&(e=!0),o(a?"iframe":"benefit-content"),a&&n&&(n.disconnect(),n=null,ce.debug("Observer disconnected after iframe detection"))};n=new MutationObserver(r),n.observe(document.body,{childList:!0,subtree:!0})}const Mr=500,Br=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],Or=()=>!!document.querySelector(".other_benefits .benefit dt");function Ur(t){if(!window.location.hostname.includes("11st.co.kr"))return;ce.info("Setting up 11번가 benefit watcher");const e=Sn(a=>{Or()&&(ce.info("Benefit content found",{source:a}),t(a))},Mr),n=new WeakSet,o=()=>{Br.forEach(a=>{document.querySelectorAll(a).forEach(l=>{n.has(l)||(n.add(l),l.addEventListener("click",()=>{ce.debug("Benefit button clicked"),setTimeout(()=>e("benefit-click"),800)}))})})};o();let r=null;const i=new MutationObserver(()=>{o()});i.observe(document.body,{childList:!0,subtree:!0}),r=setTimeout(()=>{i.disconnect(),ce.debug("Benefit button observer disconnected (timeout)")},5e3),window.addEventListener("beforeunload",()=>{r&&clearTimeout(r),i.disconnect()},{once:!0})}const zr=window.self===window.top;let en=!1;function An(){const t=window.location.href,e=Rr(t);if(!e)return re.debug(ie.PARSER,"Not a supported page",{url:t}),null;re.info(ie.PARSER,`Site detected: ${e.site}`,{url:t});let o=Ir(e.site).parse(document);return!o&&(re.warn(ie.PARSER,"Primary parser failed, trying fallback",{site:e.site}),o=kr().parse(document),!o)?(re.error(ie.PARSER,w.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(re.info(ie.PARSER,"Parse successful",{title:o.title?.substring(0,50),amount:o.amount,cardBenefitsCount:o.cardBenefits?.length??0}),{paymentInfo:o,site:e.site})}function Tn(t,e){return{...t,site:e}}function tn(t){const e=An();return e?(Ao(Tn(e.paymentInfo,e.site)),Cn(e.paymentInfo,t),!0):!1}function qr(){const t=An();if(!t){re.warn(ie.BOOTSTRAP,"Failed to extract payment info on init");return}ln(Tn(t.paymentInfo,t.site)),Cn(t.paymentInfo,"initial")}function Fr(){!zr||en||(en=!0,re.info(ie.BOOTSTRAP,"Content script starting"),qr(),Lr(t=>tn(t)),Ur(t=>{tn(t)}))}Hn(Fr);
