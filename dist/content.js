import{C as O}from"./assets/constants-4DKqSpZt.js";class E{extractNumber(e){const r=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return r?parseInt(r[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){console.debug(`[${this.siteName}] Selector error: ${r}`,o)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const r=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=r.nextNode();){const i=(o.textContent||"").match(n);if(i)return console.log(`[${this.siteName}] Found price via TreeWalker: "${i[0]}"`),i[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const g={amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",'[class*="price"]',".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price"],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},U=t=>{for(const e of g.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},W=t=>{try{const e=t.querySelector(g.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r="https:"+r),r=r.split("?")[0],r}const n=t.querySelector(g.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o="https:"+o),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},_=t=>{try{const e=[],n=new Set,r=t.querySelector(g.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const c of o){let a=c.src;if(a&&!n.has(a)&&(a.startsWith("//")&&(a="https:"+a),a.includes("thumbnails/remote/")&&(a=a.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),a=a.split("?")[0],!n.has(a)&&(e.push(a),n.add(a),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},y=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},K=t=>{let e=null,n=null,r=null;for(const o of g.amount)try{const c=t.querySelector(o);if(!c||!c.textContent)continue;const i=y(c.textContent);if(!i)continue;if(/final|discount|final-price|deal|sale/i.test(o)){r=i,e=i;break}n||(n=i),e||(e=i)}catch(c){console.debug(`[CoupangParser][Price] Selector ${o} failed`,c)}return{amount:e,originalPrice:n,discountPrice:r}},j=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const c of e){const i=o.match(c);if(i&&i[1]){const a=y(i[1]);if(a)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${a}`),a}}}return null},H=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),c=(r.getAttribute("data-price")||"").trim(),a=`${o} ${c}`.trim().match(n);if(a&&a[1]){const l=y(a[1]);if(l)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${l}`),l}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},V=t=>{for(const[e,n]of Object.entries(O))if(t.includes(e))return n;return null},B=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},G=t=>{const e=[],n=g.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return console.log("[CoupangParser] 카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const i=o.contentDocument||o.contentWindow?.document;if(i)return Y(i)}catch{console.log("[CoupangParser] iframe 접근 불가 (cross-origin)")}const c=r.querySelector(n.content);return c?J(c):e},Y=t=>{const e=[],n=g.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const c=o.querySelector(n.cardName),i=o.querySelector(n.benefitRate),a=o.querySelector(n.benefitDesc),l=c?.textContent?.trim()||"",p=i?.textContent?.trim()||"",u=a?.textContent?.trim()||o.textContent?.trim()||"";if(l){const d=B(p||u);e.push({card:l,cardName:l,benefit:u||p||"혜택 제공",discount:d,rate:d})}}),e},J=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let c;for(;(c=o.exec(n))!==null;){const i=c[1].includes("카드")?c[1]:`${c[1]}카드`,a=parseFloat(c[2]);e.some(l=>l.card===i)||e.push({card:i,cardName:i,benefit:`최대 ${a}% 할인/적립`,discount:a,rate:a})}}return e},X=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",c=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(c){const i=c[1].includes("카드")?c[1]:`${c[1]}카드`,a=parseFloat(c[2]);if(!e.some(l=>l.card===i)){let l=`최대 ${a}% 할인/적립`;const p=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);p&&(l=`최대 ${a}% ${p[0]}`),e.push({card:i,cardName:i,benefit:l,discount:a,rate:a})}}}),e},Z=t=>{let e=[];const n=G(t);if(n.length>0&&(console.log("[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:",n.length),e=n),X(t).forEach(o=>{e.some(c=>c.card===o.card)||e.push(o)}),e.length===0){const o=t.querySelector(g.benefitBadge);if(o){const c=o.querySelectorAll("img.benefit-ico"),i=[];c.forEach(p=>{const u=p.getAttribute("src");if(u){const d=V(u);d&&i.push(d)}});const a=o.querySelector(".benefit-label")?.textContent?.trim(),l=o.querySelector(".benefit-label-highlight")?.textContent?.trim();if(a){const p=B(a),u=i.length>0?`${i.slice(0,3).join(", ")}${i.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({card:u,cardName:u,benefit:`${a}${l?` (${l})`:""}`,discount:p,rate:p})}}}return e.sort((o,c)=>(c.discount??0)-(o.discount??0)),console.log("[CoupangParser] 최종 카드 혜택:",e),e},Q=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const c=o.textContent||"";if(c.includes("기프트카드")&&c.includes("%")){const i=c.match(/(\d+)\s*%/);if(i)return{rate:parseInt(i[1],10),description:c.trim()}}}return null},ee=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const c=o.textContent||"",i=c.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(i&&c.includes("쿠팡캐시")){const a=y(i[1]);if(a)return{amount:a,description:`쿠팡캐시 ${a.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=y(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},te=t=>{try{const e=[],n=new Set,r=t.querySelector(g.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const c of o)try{const i=c.querySelectorAll("div");if(i.length<2)continue;let a="";for(const d of i){const m=d.textContent||"";if(!m.includes("원")&&m.trim().length>0&&!m.includes("px")){a=m.trim();break}}let l="";for(const d of i){const x=(d.textContent||"").match(/[\d,]+원/);if(x){l=x[0].replace(/[,원]/g,"");break}}if(!l)continue;const p=parseInt(l);if(!p||p<100||!a||a.length<2)continue;const u=`${a}-${p}`;if(n.has(u))continue;if(e.push({name:a,price:p}),n.add(u),e.length>=15)break}catch(i){console.warn("[CoupangParser] Error parsing list item:",i);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},ne=t=>t.querySelector(g.shipping)?.textContent?.trim()||null;class A extends E{siteName="Coupang";selectors={amount:g.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=U(e),r=W(e),o=_(e),c=K(e);let i=c.amount;const{originalPrice:a,discountPrice:l}=c;if(i||(i=j(e)),i||(i=H(e)),!i)return console.debug("[CoupangParser] ❌ No price found"),null;const p=Z(e).map(h=>({card:h.cardName,benefit:h.benefit,discount:h.rate})),u=Q(e),d=ee(e),m=ne(e),x=te(e);return console.log(`[CoupangParser] ✅ Found: ${i} KRW`),{price:i,amount:i,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:x,originalPrice:a||void 0,discountPrice:l||void 0,cardBenefits:p,giftCardDiscount:u||void 0,cashback:d||void 0,shippingInfo:m||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const oe={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class D extends E{siteName="Amazon";selectors={amount:oe.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return console.debug("[AmazonParser] ❌ Invalid amount:",r),null;const o=this.extractCurrency(n),{title:c,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:c||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const ce={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class T extends E{siteName="eBay";selectors={amount:ce.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return console.debug("[EbayParser] ❌ Invalid amount:",r),null;const o=this.extractCurrency(n),{title:c,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:c||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const re={amount:[]};class $ extends E{siteName="Fallback";selectors={amount:re.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return console.debug("[FallbackParser] ❌ Invalid amount:",o),null;const{title:c,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:c||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const ie=`
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
			margin-top: 4px;
		}

		.picsel-card-benefit-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-card-benefit-item {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 14px 16px;
			border-radius: 12px;
			background: #ffffff;
			border: 1px solid #e5e7eb;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
			transition: all 0.2s ease;
		}

		.picsel-card-benefit-item.recommended {
			background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
			border-color: #f59e0b;
			box-shadow: 0 2px 8px -2px rgba(245, 158, 11, 0.3);
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
			font-size: 11px;
			font-weight: 700;
			color: #92400e;
			background: rgba(255, 255, 255, 0.8);
			padding: 2px 8px;
			border-radius: 999px;
			white-space: nowrap;
		}

		.picsel-card-benefit-item .picsel-card-name {
			font-size: 14px;
			font-weight: 700;
			color: #1f2937;
		}

		.picsel-card-benefit-item.recommended .picsel-card-name {
			color: #92400e;
		}

		.picsel-card-benefit-desc {
			font-size: 12px;
			color: #6b7280;
		}

		.picsel-card-benefit-item.recommended .picsel-card-benefit-desc {
			color: #a16207;
		}

		.picsel-card-right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 2px;
			flex-shrink: 0;
		}

		.picsel-card-discount {
			font-size: 16px;
			font-weight: 800;
			color: #dc2626;
		}

		.picsel-card-benefit-item.recommended .picsel-card-discount {
			color: #b91c1c;
		}

		.picsel-card-final {
			font-size: 11px;
			color: #6b7280;
		}

		.picsel-card-benefit-item.recommended .picsel-card-final {
			color: #a16207;
		}

		.picsel-card-rate {
			font-size: 14px;
			font-weight: 700;
			color: #4f46e5;
		}

		/* Footer Section */
		.picsel-footer {
			margin-top: 4px;
			padding-top: 12px;
			border-top: 1px solid #e5e7eb;
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
`,C=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let c=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,c=Math.round(t));const i=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(i,o).format(c)},se=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),P="picsel-toggle-host",S="picsel-toggle-panel",ae={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},le=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return ae[e]||String(t)},s={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},de=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const d=document.createElement("img");d.src=r,d.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(d)}else{const d=document.createElement("span");d.textContent="No Image",d.style.fontSize="11px",d.style.color="#64748b",n.appendChild(d)}const o=document.createElement("div");o.className="picsel-product-info";const c=document.createElement("h3");c.className="picsel-product-title",c.textContent=t.title||"상품 정보를 찾을 수 없어요.";const i=document.createElement("div");i.className="picsel-price";const a=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=C(a,t.currency??"KRW");if(l){const d=document.createElement("div");d.className="picsel-final-price",d.textContent=l,i.appendChild(d)}const p=C(t.originalPrice,t.currency??"KRW"),u=se(t.originalPrice,a);if(p&&u){const d=document.createElement("div");d.className="picsel-original-price",d.textContent=p;const m=document.createElement("div");m.className="picsel-discount-tag",m.textContent=`-${u}%`,i.appendChild(d),i.appendChild(m)}if(o.appendChild(c),o.appendChild(i),t.shippingInfo){const d=document.createElement("div");d.className="picsel-shipping",d.textContent=`배송: ${t.shippingInfo}`,o.appendChild(d)}return e.appendChild(n),e.appendChild(o),e},pe=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),ue=(t,e)=>typeof t!="number"||e===null?null:t-e,me=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const a=document.createElement("section");a.className="picsel-section picsel-card-section";const l=document.createElement("h4");l.className="picsel-section-title",l.innerHTML="💳 카드별 혜택",a.appendChild(l);const p=document.createElement("div");return p.className="picsel-empty-benefits",p.textContent="카드 혜택 정보를 불러오는 중...",p.style.padding="16px",p.style.textAlign="center",p.style.color="#64748b",p.style.fontSize="13px",a.appendChild(p),a}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,r=e.map(a=>{const l=a,p=l.rate??l.discount,u=pe(n,p),d=ue(n,u);return{...l,cardName:l.cardName??l.card,rate:p,discountAmount:u??void 0,finalPrice:d??void 0}}).sort((a,l)=>{const p=a.discountAmount??0;return(l.discountAmount??0)-p}),o=document.createElement("section");o.className="picsel-section picsel-card-section";const c=document.createElement("h4");c.className="picsel-section-title",c.innerHTML="💳 카드별 혜택 비교",o.appendChild(c);const i=document.createElement("div");return i.className="picsel-card-benefit-list",r.forEach((a,l)=>{const p=l===0&&(a.discountAmount??0)>0,u=document.createElement("div");u.className=`picsel-card-benefit-item${p?" recommended":""}`;const d=document.createElement("div");d.className="picsel-card-left";const m=document.createElement("div");if(m.className="picsel-card-name-row",p){const f=document.createElement("span");f.className="picsel-recommended-badge",f.textContent="🏆 최고 혜택",m.appendChild(f)}const x=document.createElement("span");if(x.className="picsel-card-name",x.textContent=a.cardName||"제휴 카드",m.appendChild(x),d.appendChild(m),a.benefit){const f=document.createElement("div");f.className="picsel-card-benefit-desc",f.textContent=a.benefit,d.appendChild(f)}const h=document.createElement("div");if(h.className="picsel-card-right",typeof a.discountAmount=="number"&&a.discountAmount>0){const f=document.createElement("div");f.className="picsel-card-discount";const q=C(a.discountAmount,t.currency??"KRW");if(f.textContent=`-${q}`,h.appendChild(f),typeof a.finalPrice=="number"){const w=document.createElement("div");w.className="picsel-card-final";const L=C(a.finalPrice,t.currency??"KRW");w.textContent=`최종 ${L}`,h.appendChild(w)}}else if(typeof a.rate=="number"){const f=document.createElement("div");f.className="picsel-card-rate",f.textContent=`${a.rate}%`,h.appendChild(f)}u.appendChild(d),u.appendChild(h),i.appendChild(u)}),o.appendChild(i),o},fe=t=>{const e=[];if(t.giftCardDiscount?.description&&e.push(`🎁 ${t.giftCardDiscount.description}`),t.cashback?.description&&e.push(`💰 ${t.cashback.description}`),e.length===0)return null;const n=document.createElement("footer");n.className="picsel-footer";const r=document.createElement("div");return r.className="picsel-footer-list",e.forEach(o=>{const c=document.createElement("div");c.className="picsel-footer-item",c.textContent=o,r.appendChild(c)}),n.appendChild(r),n},k=t=>{const{buttonBadgeEl:e}=s;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const c=o,i=c.rate??c.discount;return typeof i=="number"?i:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=C(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},I=()=>{const{contentEl:t,cachedData:e}=s;if(!t)return;if(t.textContent="",!e){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(i),k(null);return}const n=e,r=de(n);t.appendChild(r);const o=me(n);o&&t.appendChild(o);const c=fe(n);c&&t.appendChild(c),k(n)},b=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=s;!e||!n||!r||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),r.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),r.textContent="PicSel 혜택 보기"))},ge=()=>{if(s.mounted)return;if(document.getElementById(P)){const c=document.getElementById(P);c&&(s.hostElement=c,s.shadowRoot=c.shadowRoot,c.shadowRoot&&(s.toggleButton=c.shadowRoot.querySelector(".picsel-toggle-button"),s.buttonLabelEl=c.shadowRoot.querySelector(".picsel-toggle-label"),s.buttonBadgeEl=c.shadowRoot.querySelector(".picsel-toggle-badge"),s.panelEl=c.shadowRoot.querySelector(`#${S}`),s.closeButtonEl=c.shadowRoot.querySelector(".picsel-close-button"),s.contentEl=c.shadowRoot.querySelector(".picsel-panel-content"),s.panelTitleEl=c.shadowRoot.querySelector(".picsel-panel-title"))),s.mounted=!0;return}s.hostElement=document.createElement("div"),s.hostElement.id=P,s.hostElement.style.position="fixed",s.hostElement.style.bottom="24px",s.hostElement.style.right="24px",s.hostElement.style.zIndex=String(2147483647),s.shadowRoot=s.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=ie,s.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",s.shadowRoot.appendChild(e),s.toggleButton=document.createElement("button"),s.toggleButton.className="picsel-toggle-button",s.toggleButton.type="button",s.toggleButton.setAttribute("aria-expanded","false"),s.buttonLabelEl=document.createElement("span"),s.buttonLabelEl.className="picsel-toggle-label",s.buttonLabelEl.textContent="PicSel 혜택 보기",s.toggleButton.appendChild(s.buttonLabelEl),s.buttonBadgeEl=document.createElement("span"),s.buttonBadgeEl.className="picsel-toggle-badge",s.toggleButton.appendChild(s.buttonBadgeEl),e.appendChild(s.toggleButton),s.panelEl=document.createElement("div"),s.panelEl.className="picsel-panel",s.panelEl.id=S,s.panelEl.setAttribute("role","dialog"),s.panelEl.setAttribute("aria-hidden","true"),s.toggleButton.setAttribute("aria-controls",S);const n=document.createElement("div");n.className="picsel-panel-header",s.panelTitleEl=document.createElement("div"),s.panelTitleEl.className="picsel-panel-title",s.panelTitleEl.textContent="PicSel 혜택 정보",s.closeButtonEl=document.createElement("button"),s.closeButtonEl.type="button",s.closeButtonEl.className="picsel-close-button",s.closeButtonEl.setAttribute("aria-label","닫기"),s.closeButtonEl.textContent="✕",n.appendChild(s.panelTitleEl),n.appendChild(s.closeButtonEl),s.panelEl.appendChild(n),s.contentEl=document.createElement("div"),s.contentEl.className="picsel-panel-content",s.panelEl.appendChild(s.contentEl),e.appendChild(s.panelEl);const r=s.panelEl,o=s.hostElement;s.toggleButton.addEventListener("click",()=>{const c=!r.classList.contains("open");b(c)}),s.closeButtonEl.addEventListener("click",()=>{b(!1)}),window.addEventListener("keydown",c=>{c.key==="Escape"&&b(!1)}),document.addEventListener("click",c=>{if(!r.classList.contains("open"))return;const i=c.composedPath();o&&!i.includes(o)&&b(!1)},!0),document.body.appendChild(s.hostElement),s.mounted=!0},R=()=>{if(s.panelTitleEl&&s.cachedData?.site){const t=le(s.cachedData.site);s.panelTitleEl.textContent=`${t} 혜택 정보`}},z=t=>{s.cachedData={...t},ge(),R(),I(),b(!1)},F=t=>{if(s.cachedData={...s.cachedData??{},...t},!s.mounted){z(s.cachedData);return}R(),I()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function he(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),A.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):D.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):T.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function xe(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new A;case"amazon":return new D;case"ebay":return new T;default:return new $}}function M(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=he(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:r}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${r}`);const o=xe(n);if(console.log(`[Content] 📝 Using parser: ${o.siteName}`),!o)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;let c=o.parse(document);if(c)console.log("[Content] ✅ Parse successful:",{title:c.title?.substring(0,50),amount:c.amount,hasCardBenefits:!!c.cardBenefits});else if(console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),c=new $().parse(document),!c)return null;return{paymentInfo:c,site:n}}function be(t,e){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},n=>{n?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:n.success,savedAmount:n.savedData?.amount,savedCurrency:n.savedData?.currency}),F({...t,site:e})):console.error("[ContentScript] ❌ Background error:",{error:n?.error,message:n?.message})})}function v(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=M();if(!t){console.warn("[ContentScript] Failed to extract");return}const{paymentInfo:e,site:n}=t;console.log("[ContentScript] Extracted data:",e),z({...e,site:n}),console.log("[ContentScript] Sending to background..."),be(e,n)}function N(){const t=new MutationObserver(e=>{e.some(r=>r.addedNodes.length>0&&Array.from(r.addedNodes).some(o=>o.tagName==="IFRAME"||o instanceof Element&&o.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const r=M();if(r){const{paymentInfo:o,site:c}=r;console.log("[ContentScript] ✅ Dynamic content re-parsed:",o),F({...o,site:c}),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:o,timestamp:Date.now(),source:"dynamic-iframe"},i=>{i?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")})}},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{v(),N()}):(v(),N());
