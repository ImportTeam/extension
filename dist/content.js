import{C as W}from"./assets/constants-4DKqSpZt.js";class v{extractNumber(e){const c=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return c?parseInt(c[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const c of n)try{const o=this.getTextBySelector(e,c);if(o)return o}catch(o){console.debug(`[${this.siteName}] Selector error: ${c}`,o)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const c=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=c.nextNode();){const i=(o.textContent||"").match(n);if(i)return console.log(`[${this.siteName}] Found price via TreeWalker: "${i[0]}"`),i[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,c=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:c||void 0}}}const x={amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",'[class*="price"]',".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price"],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},_=t=>{for(const e of x.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},K=t=>{try{const e=t.querySelector(x.mainImage);if(e?.src){let c=e.src;return c.startsWith("//")&&(c="https:"+c),c=c.split("?")[0],c}const n=t.querySelector(x.thumbnailContainer);if(n){const c=n.querySelector("ul > li:first-child img");if(c){let o=c.src;if(o)return o.startsWith("//")&&(o="https:"+o),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},j=t=>{try{const e=[],n=new Set,c=t.querySelector(x.thumbnailContainer);if(c){const o=c.querySelectorAll("ul > li img");for(const r of o){let s=r.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s="https:"+s),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},P=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},Y=t=>{let e=null,n=null,c=null;for(const o of x.amount)try{const r=t.querySelector(o);if(!r||!r.textContent)continue;const i=P(r.textContent);if(!i)continue;if(/final|discount|final-price|deal|sale/i.test(o)){c=i,e=i;break}n||(n=i),e||(e=i)}catch(r){console.debug(`[CoupangParser][Price] Selector ${o} failed`,r)}return{amount:e,originalPrice:n,discountPrice:c}},V=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let c;for(;c=n.nextNode();){const o=(c.textContent||"").replace(/\u00A0/g," ");for(const r of e){const i=o.match(r);if(i&&i[1]){const s=P(i[1]);if(s)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${s}`),s}}}return null},H=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const c of e){const o=(c.textContent||"").replace(/\u00A0/g," ").trim(),r=(c.getAttribute("data-price")||"").trim(),s=`${o} ${r}`.trim().match(n);if(s&&s[1]){const l=P(s[1]);if(l)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${l}`),l}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},G=t=>{for(const[e,n]of Object.entries(W))if(t.includes(e))return n;return null},T=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},J=t=>{const e=[],n=x.cardBenefitPopup,c=t.querySelector(n.container);if(!c)return console.log("[CoupangParser] 카드 혜택 팝업을 찾을 수 없음"),e;const o=c.querySelector(n.iframe);if(o)try{const i=o.contentDocument||o.contentWindow?.document;if(i)return X(i)}catch{console.log("[CoupangParser] iframe 접근 불가 (cross-origin)")}const r=c.querySelector(n.content);return r?Z(r):e},X=t=>{const e=[],n=x.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const r=o.querySelector(n.cardName),i=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),l=r?.textContent?.trim()||"",p=i?.textContent?.trim()||"",u=s?.textContent?.trim()||o.textContent?.trim()||"";if(l){const d=T(p||u);e.push({card:l,cardName:l,benefit:u||p||"혜택 제공",discount:d,rate:d})}}),e},Z=t=>{const e=[],n=t.textContent||"",c=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of c){let r;for(;(r=o.exec(n))!==null;){const i=r[1].includes("카드")?r[1]:`${r[1]}카드`,s=parseFloat(r[2]);e.some(l=>l.card===i)||e.push({card:i,cardName:i,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},Q=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(c=>{const o=c.textContent||"",r=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(r){const i=r[1].includes("카드")?r[1]:`${r[1]}카드`,s=parseFloat(r[2]);if(!e.some(l=>l.card===i)){let l=`최대 ${s}% 할인/적립`;const p=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);p&&(l=`최대 ${s}% ${p[0]}`),e.push({card:i,cardName:i,benefit:l,discount:s,rate:s})}}}),e},ee=t=>{let e=[];const n=J(t);if(n.length>0&&(console.log("[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:",n.length),e=n),Q(t).forEach(o=>{e.some(r=>r.card===o.card)||e.push(o)}),e.length===0){const o=t.querySelector(x.benefitBadge);if(o){const r=o.querySelectorAll("img.benefit-ico"),i=[];r.forEach(p=>{const u=p.getAttribute("src");if(u){const d=G(u);d&&i.push(d)}});const s=o.querySelector(".benefit-label")?.textContent?.trim(),l=o.querySelector(".benefit-label-highlight")?.textContent?.trim();if(s){const p=T(s),u=i.length>0?`${i.slice(0,3).join(", ")}${i.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({card:u,cardName:u,benefit:`${s}${l?` (${l})`:""}`,discount:p,rate:p})}}}return e.sort((o,r)=>(r.discount??0)-(o.discount??0)),console.log("[CoupangParser] 최종 카드 혜택:",e),e},te=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const c=t.querySelectorAll("div, span, p");for(const o of c){const r=o.textContent||"";if(r.includes("기프트카드")&&r.includes("%")){const i=r.match(/(\d+)\s*%/);if(i)return{rate:parseInt(i[1],10),description:r.trim()}}}return null},ne=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const r=o.textContent||"",i=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(i&&r.includes("쿠팡캐시")){const s=P(i[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const c=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(c){const o=P(c[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},oe=t=>{try{const e=[],n=new Set,c=t.querySelector(x.instantOption);if(!c)return e;const o=c.querySelectorAll("section > ul > li");for(const r of o)try{const i=r.querySelectorAll("div");if(i.length<2)continue;let s="";for(const d of i){const f=d.textContent||"";if(!f.includes("원")&&f.trim().length>0&&!f.includes("px")){s=f.trim();break}}let l="";for(const d of i){const b=(d.textContent||"").match(/[\d,]+원/);if(b){l=b[0].replace(/[,원]/g,"");break}}if(!l)continue;const p=parseInt(l);if(!p||p<100||!s||s.length<2)continue;const u=`${s}-${p}`;if(n.has(u))continue;if(e.push({name:s,price:p}),n.add(u),e.length>=15)break}catch(i){console.warn("[CoupangParser] Error parsing list item:",i);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},re=t=>t.querySelector(x.shipping)?.textContent?.trim()||null;class $ extends v{siteName="Coupang";selectors={amount:x.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=_(e),c=K(e),o=j(e),r=Y(e);let i=r.amount;const{originalPrice:s,discountPrice:l}=r;if(i||(i=V(e)),i||(i=H(e)),!i)return console.debug("[CoupangParser] ❌ No price found"),null;const p=ee(e).map(g=>{const C=g.rate??g.discount,h=g.cardName||g.card;return{card:h,cardName:h,benefit:g.benefit,discount:C,rate:C}}),u=te(e),d=ne(e),f=re(e),b=oe(e);return console.log(`[CoupangParser] ✅ Found: ${i} KRW`),{price:i,amount:i,currency:"KRW",title:n||void 0,imageUrl:c||void 0,images:o,variants:b,originalPrice:s||void 0,discountPrice:l||void 0,cardBenefits:p,giftCardDiscount:u||void 0,cashback:d||void 0,shippingInfo:f||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const ce={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class R extends v{siteName="Amazon";selectors={amount:ce.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const c=this.extractNumber(n);if(!c||!this.isValidPrice(c))return console.debug("[AmazonParser] ❌ Invalid amount:",c),null;const o=this.extractCurrency(n),{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${c} ${o}`),{price:c,amount:c,currency:o,title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const ie={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class z extends v{siteName="eBay";selectors={amount:ie.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const c=this.extractNumber(n);if(!c||!this.isValidPrice(c))return console.debug("[EbayParser] ❌ Invalid amount:",c),null;const o=this.extractCurrency(n),{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${c} ${o}`),{price:c,amount:c,currency:o,title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const ae={amount:[]};class F extends v{siteName="Fallback";selectors={amount:ae.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const c=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!c)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const o=this.extractNumber(c[1]);if(!o||!this.isValidPrice(o))return console.debug("[FallbackParser] ❌ Invalid amount:",o),null;const{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const se=`
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
`,k=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",c=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let r=t;c.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,r=Math.round(t));const i=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(i,o).format(r)},le=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),N="picsel-toggle-host",B="picsel-toggle-panel",de={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},pe=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return de[e]||String(t)},a={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},ue=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const c=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(c){const d=document.createElement("img");d.src=c,d.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(d)}else{const d=document.createElement("span");d.textContent="No Image",d.style.fontSize="11px",d.style.color="#64748b",n.appendChild(d)}const o=document.createElement("div");o.className="picsel-product-info";const r=document.createElement("h3");r.className="picsel-product-title",r.textContent=t.title||"상품 정보를 찾을 수 없어요.";const i=document.createElement("div");i.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=k(s,t.currency??"KRW");if(l){const d=document.createElement("div");d.className="picsel-final-price",d.textContent=l,i.appendChild(d)}const p=k(t.originalPrice,t.currency??"KRW"),u=le(t.originalPrice,s);if(p&&u){const d=document.createElement("div");d.className="picsel-original-price",d.textContent=p;const f=document.createElement("div");f.className="picsel-discount-tag",f.textContent=`-${u}%`,i.appendChild(d),i.appendChild(f)}if(o.appendChild(r),o.appendChild(i),t.shippingInfo){const d=document.createElement("div");d.className="picsel-shipping",d.textContent=`배송: ${t.shippingInfo}`,o.appendChild(d)}return e.appendChild(n),e.appendChild(o),e},fe=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),me=(t,e)=>typeof t!="number"||e===null?null:t-e,ge=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const l=document.createElement("section");l.className="picsel-section picsel-card-section";const p=document.createElement("h4");p.className="picsel-section-title",p.textContent="카드별 혜택",l.appendChild(p);const u=document.createElement("div");return u.className="picsel-empty-benefits",u.textContent="카드 혜택 정보를 불러오는 중...",u.style.padding="16px",u.style.textAlign="center",u.style.color="#64748b",u.style.fontSize="13px",l.appendChild(u),l}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,c=e.map(l=>{const p=l,u=p.rate??p.discount,d=fe(n,u),f=me(n,d);return{...p,cardName:p.cardName??p.card,rate:u,discountAmount:d??void 0,finalPrice:f??void 0}}).sort((l,p)=>{const u=l.discountAmount??0;return(p.discountAmount??0)-u}),o=document.createElement("section");o.className="picsel-section picsel-card-section";const r=document.createElement("h4");r.className="picsel-section-title",r.textContent="카드별 혜택 비교",o.appendChild(r);const i=document.createElement("div");i.className="picsel-card-benefit-list",c.forEach((l,p)=>{const u=p===0?" recommended":p===1?" rank-2":p===2?" rank-3":"",d=document.createElement("div");d.className=`picsel-card-benefit-item${u}`;const f=document.createElement("div");f.className="picsel-card-left";const b=document.createElement("div");if(b.className="picsel-card-name-row",p<3&&(l.discountAmount??0)>0){const m=document.createElement("span");m.className="picsel-recommended-badge",m.textContent=`${p+1}위`,b.appendChild(m)}const g=document.createElement("span");g.className="picsel-card-name";const C=l.cardName||"제휴 카드";if(C.includes(",")){const m=C.split(",").map(y=>y.trim());m.forEach((y,E)=>{const S=document.createElement("span");S.textContent=y,g.appendChild(S),E<m.length-1&&g.appendChild(document.createElement("br"))})}else g.textContent=C;if(b.appendChild(g),f.appendChild(b),l.benefit){const m=document.createElement("div");m.className="picsel-card-benefit-desc",m.textContent=l.benefit,f.appendChild(m)}const h=document.createElement("div");if(h.className="picsel-card-right",typeof l.discountAmount=="number"&&l.discountAmount>0){const m=document.createElement("div");m.className="picsel-card-discount";const y=k(l.discountAmount,t.currency??"KRW");if(m.textContent=`-${y}`,h.appendChild(m),typeof l.finalPrice=="number"){const E=document.createElement("div");E.className="picsel-card-final";const S=k(l.finalPrice,t.currency??"KRW");E.textContent=`최종 ${S}`,h.appendChild(E)}}else if(typeof l.rate=="number"){const m=document.createElement("div");m.className="picsel-card-rate",m.textContent=`${l.rate}%`,h.appendChild(m)}d.appendChild(f),d.appendChild(h),i.appendChild(d)}),o.appendChild(i);const s=[];if(t.giftCardDiscount?.description&&s.push(t.giftCardDiscount.description),t.cashback?.description&&s.push(t.cashback.description),s.length>0){const l=document.createElement("div");l.className="picsel-sub-benefits",s.forEach(p=>{const u=document.createElement("div");u.className="picsel-sub-benefit-item",u.textContent=p,l.appendChild(u)}),o.appendChild(l)}return o},xe=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("button");return n.className="picsel-footer-confirm",n.textContent="확인했습니다",n.type="button",n.addEventListener("click",()=>{a.panelEl&&a.panelEl.classList.remove("show")}),e.appendChild(n),e},A=t=>{const{buttonBadgeEl:e}=a;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const r=o,i=r.rate??r.discount;return typeof i=="number"?i:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const c=t.cashback?.amount;if(typeof c=="number"&&c>0){const o=k(c,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},q=()=>{const{contentEl:t,cachedData:e}=a;if(!t)return;if(t.textContent="",!e){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(i),A(null);return}const n=e,c=ue(n);t.appendChild(c);const o=ge(n);o&&t.appendChild(o);const r=xe();r&&t.appendChild(r),A(n)},w=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:c}=a;!e||!n||!c||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),c.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),c.textContent="PicSel 혜택 보기"))},be=()=>{if(a.mounted)return;if(document.getElementById(N)){const r=document.getElementById(N);r&&(a.hostElement=r,a.shadowRoot=r.shadowRoot,r.shadowRoot&&(a.toggleButton=r.shadowRoot.querySelector(".picsel-toggle-button"),a.buttonLabelEl=r.shadowRoot.querySelector(".picsel-toggle-label"),a.buttonBadgeEl=r.shadowRoot.querySelector(".picsel-toggle-badge"),a.panelEl=r.shadowRoot.querySelector(`#${B}`),a.closeButtonEl=r.shadowRoot.querySelector(".picsel-close-button"),a.contentEl=r.shadowRoot.querySelector(".picsel-panel-content"),a.panelTitleEl=r.shadowRoot.querySelector(".picsel-panel-title"))),a.mounted=!0;return}a.hostElement=document.createElement("div"),a.hostElement.id=N,a.hostElement.style.position="fixed",a.hostElement.style.bottom="24px",a.hostElement.style.right="24px",a.hostElement.style.zIndex=String(2147483647),a.shadowRoot=a.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=se,a.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",a.shadowRoot.appendChild(e),a.toggleButton=document.createElement("button"),a.toggleButton.className="picsel-toggle-button",a.toggleButton.type="button",a.toggleButton.setAttribute("aria-expanded","false"),a.buttonLabelEl=document.createElement("span"),a.buttonLabelEl.className="picsel-toggle-label",a.buttonLabelEl.textContent="PicSel 혜택 보기",a.toggleButton.appendChild(a.buttonLabelEl),a.buttonBadgeEl=document.createElement("span"),a.buttonBadgeEl.className="picsel-toggle-badge",a.toggleButton.appendChild(a.buttonBadgeEl),e.appendChild(a.toggleButton),a.panelEl=document.createElement("div"),a.panelEl.className="picsel-panel",a.panelEl.id=B,a.panelEl.setAttribute("role","dialog"),a.panelEl.setAttribute("aria-hidden","true"),a.toggleButton.setAttribute("aria-controls",B);const n=document.createElement("div");n.className="picsel-panel-header",a.panelTitleEl=document.createElement("div"),a.panelTitleEl.className="picsel-panel-title",a.panelTitleEl.textContent="PicSel 혜택 정보",a.closeButtonEl=document.createElement("button"),a.closeButtonEl.type="button",a.closeButtonEl.className="picsel-close-button",a.closeButtonEl.setAttribute("aria-label","닫기"),a.closeButtonEl.textContent="✕",n.appendChild(a.panelTitleEl),n.appendChild(a.closeButtonEl),a.panelEl.appendChild(n),a.contentEl=document.createElement("div"),a.contentEl.className="picsel-panel-content",a.panelEl.appendChild(a.contentEl),e.appendChild(a.panelEl);const c=a.panelEl,o=a.hostElement;a.toggleButton.addEventListener("click",()=>{const r=!c.classList.contains("open");w(r)}),a.closeButtonEl.addEventListener("click",()=>{w(!1)}),window.addEventListener("keydown",r=>{r.key==="Escape"&&w(!1)}),document.addEventListener("click",r=>{if(!c.classList.contains("open"))return;const i=r.composedPath();o&&!i.includes(o)&&w(!1)},!0),document.body.appendChild(a.hostElement),a.mounted=!0},M=()=>{if(a.panelTitleEl&&a.cachedData?.site){const t=pe(a.cachedData.site);a.panelTitleEl.textContent=`${t} 혜택 정보`}},L=t=>{a.cachedData={...t},be(),M(),q(),w(!1)},O=t=>{if(a.cachedData={...a.cachedData??{},...t},!a.mounted){L(a.cachedData);return}M(),q()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function he(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),$.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):R.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):z.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function Ce(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new $;case"amazon":return new R;case"ebay":return new z;default:return new F}}function U(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=he(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:c}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${c}`);const o=Ce(n);if(console.log(`[Content] 📝 Using parser: ${o.siteName}`),!o)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;let r=o.parse(document);if(r)console.log("[Content] ✅ Parse successful:",{title:r.title?.substring(0,50),amount:r.amount,hasCardBenefits:!!r.cardBenefits});else if(console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),r=new F().parse(document),!r)return null;return{paymentInfo:r,site:n}}function ye(t,e){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},n=>{n?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:n.success,savedAmount:n.savedData?.amount,savedCurrency:n.savedData?.currency}),O({...t,site:e})):console.error("[ContentScript] ❌ Background error:",{error:n?.error,message:n?.message})})}function D(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=U();if(!t){console.warn("[ContentScript] Failed to extract");return}const{paymentInfo:e,site:n}=t;console.log("[ContentScript] Extracted data:",e),L({...e,site:n}),console.log("[ContentScript] Sending to background..."),ye(e,n)}function I(){const t=new MutationObserver(e=>{e.some(c=>c.addedNodes.length>0&&Array.from(c.addedNodes).some(o=>o.tagName==="IFRAME"||o instanceof Element&&o.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const c=U();if(c){const{paymentInfo:o,site:r}=c;console.log("[ContentScript] ✅ Dynamic content re-parsed:",o),O({...o,site:r}),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:o,timestamp:Date.now(),source:"dynamic-iframe"},i=>{i?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")})}},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{D(),I()}):(D(),I());
