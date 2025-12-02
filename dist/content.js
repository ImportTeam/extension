import{C as H}from"./assets/constants-4DKqSpZt.js";class P{extractNumber(e){const c=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return c?parseInt(c[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const c of n)try{const o=this.getTextBySelector(e,c);if(o)return o}catch(o){console.debug(`[${this.siteName}] Selector error: ${c}`,o)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const c=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=c.nextNode();){const i=(o.textContent||"").match(n);if(i)return console.log(`[${this.siteName}] Found price via TreeWalker: "${i[0]}"`),i[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,c=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:c||void 0}}}const b={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",'[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},j=t=>{for(const e of b.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},V=t=>{try{const e=t.querySelector(b.mainImage);if(e?.src){let c=e.src;return c.startsWith("//")&&(c="https:"+c),c=c.split("?")[0],c}const n=t.querySelector(b.thumbnailContainer);if(n){const c=n.querySelector("ul > li:first-child img");if(c){let o=c.src;if(o)return o.startsWith("//")&&(o="https:"+o),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},G=t=>{try{const e=[],n=new Set,c=t.querySelector(b.thumbnailContainer);if(c){const o=c.querySelectorAll("ul > li img");for(const r of o){let s=r.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s="https:"+s),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},y=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},A=t=>t>=100&&t<=1e8,Y=t=>{let e=null,n=null,c=null;for(const o of b.amount)try{const r=t.querySelector(o);if(!r||!r.textContent)continue;const i=r.textContent.trim();if(!/[\d,]+\s*원?/.test(i)&&!/^\d{1,3}(,\d{3})*$/.test(i.replace(/[^\d,]/g,"")))continue;const s=y(i);if(!s||!A(s))continue;if(console.log(`[CoupangParser][Price] Found via selector "${o}": ${s}`),/final|discount|final-price|deal|sale|coupon/i.test(o)){c=s,e=s;break}n||(n=s),e||(e=s)}catch(r){console.debug(`[CoupangParser][Price] Selector ${o} failed`,r)}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const r of o){const s=(r.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s){const p=y(s[1]);if(p&&A(p)){console.log(`[CoupangParser][Price] Found via regex in element: ${p}`),e=p;break}}}}return{amount:e,originalPrice:n,discountPrice:c}},X=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let c;for(;c=n.nextNode();){const o=(c.textContent||"").replace(/\u00A0/g," ");for(const r of e){const i=o.match(r);if(i&&i[1]){const s=y(i[1]);if(s)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${s}`),s}}}return null},J=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const c of e){const o=(c.textContent||"").replace(/\u00A0/g," ").trim(),r=(c.getAttribute("data-price")||"").trim(),s=`${o} ${r}`.trim().match(n);if(s&&s[1]){const p=y(s[1]);if(p)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${p}`),p}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},v=t=>{for(const[e,n]of Object.entries(H))if(t.includes(e))return n;return null},D=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},Z=t=>{const e=[],n=b.cardImages;return t.querySelectorAll(n.directClass).forEach(r=>{const i=r,s=i.src,p=i.alt||"";if(!s)return;let d=p.trim();d||(d=v(s)||""),d&&!d.includes("카드")&&(d=`${d}카드`),s&&d&&(e.some(u=>u.cardName===d)||(e.push({src:s,alt:p,cardName:d}),console.log("[CoupangParser] 카드 이미지 발견:",{cardName:d,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(i=>{const s=i,p=s.src,d=s.alt||"";if(!p||(s.width||s.naturalWidth)>100)return;let l=d.trim();l||(l=v(p)||""),l&&!l.includes("카드")&&(l=`${l}카드`),p&&l&&!e.some(m=>m.cardName===l)&&e.push({src:p,alt:d,cardName:l})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(r=>{const i=r,s=i.src,p=i.alt||"";if(!s||(i.width||i.naturalWidth)>100)return;let u=p.trim();u||(u=v(s)||""),u&&!u.includes("카드")&&(u=`${u}카드`),s&&u&&!e.some(l=>l.cardName===u)&&e.push({src:s,alt:p,cardName:u})}),console.log("[CoupangParser] 추출된 카드 이미지 총:",e.length),e},Q=t=>{const e=[],n=b.cardBenefitPopup,c=t.querySelector(n.container);if(!c)return console.log("[CoupangParser] 카드 혜택 팝업을 찾을 수 없음"),e;const o=c.querySelector(n.iframe);if(o)try{const i=o.contentDocument||o.contentWindow?.document;if(i)return ee(i)}catch{console.log("[CoupangParser] iframe 접근 불가 (cross-origin)")}const r=c.querySelector(n.content);return r?te(r):e},ee=t=>{const e=[],n=b.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const r=o.querySelector(n.cardName),i=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),p=r?.textContent?.trim()||"",d=i?.textContent?.trim()||"",u=s?.textContent?.trim()||o.textContent?.trim()||"";if(p){const l=D(d||u);e.push({card:p,cardName:p,benefit:u||d||"혜택 제공",discount:l,rate:l})}}),e},te=t=>{const e=[],n=t.textContent||"",c=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of c){let r;for(;(r=o.exec(n))!==null;){const i=r[1].includes("카드")?r[1]:`${r[1]}카드`,s=parseFloat(r[2]);e.some(p=>p.card===i)||e.push({card:i,cardName:i,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},ne=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(c=>{const o=c.textContent||"",r=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(r){const i=r[1].includes("카드")?r[1]:`${r[1]}카드`,s=parseFloat(r[2]);if(!e.some(p=>p.card===i)){let p=`최대 ${s}% 할인/적립`;const d=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);d&&(p=`최대 ${s}% ${d[0]}`),e.push({card:i,cardName:i,benefit:p,discount:s,rate:s})}}}),e},oe=t=>{let e=[];const n=Z(t),c=Q(t);if(c.length>0&&(console.log("[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:",c.length),e=c),ne(t).forEach(r=>{e.some(i=>i.card===r.card)||e.push(r)}),e.length===0){const r=t.querySelector(b.benefitBadge);if(r){const i=r.querySelectorAll("img.benefit-ico"),s=[],p=[];i.forEach(l=>{const m=l.getAttribute("src");if(m){const f=v(m);f&&(s.push(f),p.push(m))}});const d=r.querySelector(".benefit-label")?.textContent?.trim(),u=r.querySelector(".benefit-label-highlight")?.textContent?.trim();if(d){const l=D(d),m=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({card:m,cardName:m,benefit:`${d}${u?` (${u})`:""}`,discount:l,rate:l,imageUrl:p[0]})}}}return e=e.map(r=>{if(!r.imageUrl){const i=r.cardName||r.card||"",s=n.find(p=>{const d=p.cardName.toLowerCase(),u=i.toLowerCase();return d.includes(u.replace("카드",""))||u.includes(d.replace("카드",""))});if(s)return{...r,imageUrl:s.src}}return r}),e.sort((r,i)=>(i.discount??0)-(r.discount??0)),console.log("[CoupangParser] 최종 카드 혜택:",e),e},re=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const c=t.querySelectorAll("div, span, p");for(const o of c){const r=o.textContent||"";if(r.includes("기프트카드")&&r.includes("%")){const i=r.match(/(\d+)\s*%/);if(i)return{rate:parseInt(i[1],10),description:r.trim()}}}return null},ce=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const r=o.textContent||"",i=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(i&&r.includes("쿠팡캐시")){const s=y(i[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const c=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(c){const o=y(c[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},ie=t=>{try{const e=[],n=new Set,c=t.querySelector(b.instantOption);if(!c)return e;const o=c.querySelectorAll("section > ul > li");for(const r of o)try{const i=r.querySelectorAll("div");if(i.length<2)continue;let s="";for(const l of i){const m=l.textContent||"";if(!m.includes("원")&&m.trim().length>0&&!m.includes("px")){s=m.trim();break}}let p="";for(const l of i){const f=(l.textContent||"").match(/[\d,]+원/);if(f){p=f[0].replace(/[,원]/g,"");break}}if(!p)continue;const d=parseInt(p);if(!d||d<100||!s||s.length<2)continue;const u=`${s}-${d}`;if(n.has(u))continue;if(e.push({name:s,price:d}),n.add(u),e.length>=15)break}catch(i){console.warn("[CoupangParser] Error parsing list item:",i);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},se=t=>t.querySelector(b.shipping)?.textContent?.trim()||null;class M extends P{siteName="Coupang";selectors={amount:b.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=j(e),c=V(e),o=G(e),r=Y(e);let i=r.amount;const{originalPrice:s,discountPrice:p}=r;if(i||(i=X(e)),i||(i=J(e)),!i)return console.debug("[CoupangParser] ❌ No price found"),null;const d=oe(e).map(g=>{const x=g.rate??g.discount,w=g.cardName||g.card;return{card:w,cardName:w,benefit:g.benefit,discount:x,rate:x}}),u=re(e),l=ce(e),m=se(e),f=ie(e);return console.log(`[CoupangParser] ✅ Found: ${i} KRW`),{price:i,amount:i,currency:"KRW",title:n||void 0,imageUrl:c||void 0,images:o,variants:f,originalPrice:s||void 0,discountPrice:p||void 0,cardBenefits:d,giftCardDiscount:u||void 0,cashback:l||void 0,shippingInfo:m||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const ae={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class L extends P{siteName="Amazon";selectors={amount:ae.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const c=this.extractNumber(n);if(!c||!this.isValidPrice(c))return console.debug("[AmazonParser] ❌ Invalid amount:",c),null;const o=this.extractCurrency(n),{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${c} ${o}`),{price:c,amount:c,currency:o,title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const le={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class q extends P{siteName="eBay";selectors={amount:le.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const c=this.extractNumber(n);if(!c||!this.isValidPrice(c))return console.debug("[EbayParser] ❌ Invalid amount:",c),null;const o=this.extractCurrency(n),{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${c} ${o}`),{price:c,amount:c,currency:o,title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const pe={amount:[]};class F extends P{siteName="Fallback";selectors={amount:pe.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const c=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!c)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const o=this.extractNumber(c[1]);if(!o||!this.isValidPrice(o))return console.debug("[FallbackParser] ❌ Invalid amount:",o),null;const{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const de=`
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
`,E=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",c=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let r=t;c.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,r=Math.round(t));const i=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(i,o).format(r)},ue=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),S="picsel-toggle-host",N="picsel-toggle-panel",me={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},fe=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return me[e]||String(t)},a={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},ge=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const c=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(c){const l=document.createElement("img");l.src=c,l.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(l)}else{const l=document.createElement("span");l.textContent="No Image",l.style.fontSize="11px",l.style.color="#64748b",n.appendChild(l)}const o=document.createElement("div");o.className="picsel-product-info";const r=document.createElement("h3");r.className="picsel-product-title",r.textContent=t.title||"상품 정보를 찾을 수 없어요.";const i=document.createElement("div");i.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,p=E(s,t.currency??"KRW");if(p){const l=document.createElement("div");l.className="picsel-final-price",l.textContent=p,i.appendChild(l)}const d=E(t.originalPrice,t.currency??"KRW"),u=ue(t.originalPrice,s);if(d&&u){const l=document.createElement("div");l.className="picsel-original-price",l.textContent=d;const m=document.createElement("div");m.className="picsel-discount-tag",m.textContent=`-${u}%`,i.appendChild(l),i.appendChild(m)}if(o.appendChild(r),o.appendChild(i),t.shippingInfo){const l=document.createElement("div");l.className="picsel-shipping",l.textContent=`배송: ${t.shippingInfo}`,o.appendChild(l)}return e.appendChild(n),e.appendChild(o),e},he=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),xe=(t,e)=>typeof t!="number"||e===null?null:t-e,I=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,c]of Object.entries(e))if(t.includes(n))return c;return t.replace("카드","").substring(0,2).toUpperCase()},be=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:c,svg:o}of n)for(const r of c)if(e.includes(r.toUpperCase()))return chrome.runtime.getURL(`assets/card/${o}`);return null},Ce=(t,e,n)=>{const c=e===0?" recommended":e===1?" rank-2":e===2?" rank-3":"",o=document.createElement("div");o.className=`picsel-card-benefit-item${c}`;const r=t.cardName||t.card||"카드",s=be(r)||t.imageUrl;if(s){const f=document.createElement("div");f.className="picsel-card-image-wrapper";const g=document.createElement("img");g.src=s,g.alt=r,g.className="picsel-card-image",g.onerror=()=>{const x=I(r);f.innerHTML=`
				<div class="picsel-card-initial">${x}</div>
			`},f.appendChild(g),o.appendChild(f)}else{const f=I(r),g=document.createElement("div");g.className="picsel-card-image-wrapper",g.innerHTML=`<div class="picsel-card-initial">${f}</div>`,o.appendChild(g)}const p=document.createElement("div");p.className="picsel-card-info";const d=document.createElement("div");if(d.className="picsel-card-header",e<3&&(t.discountAmount??0)>0){const f=document.createElement("span");f.className="picsel-recommended-badge",f.textContent=`${e+1}위`,d.appendChild(f)}const u=document.createElement("span");u.className="picsel-card-name";const l=r.includes(",")?r.split(",")[0].trim():r;if(u.textContent=l,d.appendChild(u),p.appendChild(d),t.benefit){const f=document.createElement("div");f.className="picsel-card-benefit-desc",f.textContent=t.benefit,p.appendChild(f)}o.appendChild(p);const m=document.createElement("div");if(m.className="picsel-card-amount",typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const x=document.createElement("div");x.className="picsel-card-final-price";const w=E(t.finalPrice,n);x.textContent=w,m.appendChild(x)}const f=document.createElement("div");f.className="picsel-card-discount";const g=E(t.discountAmount,n);f.textContent=`-${g}`,m.appendChild(f)}else if(typeof t.rate=="number"){const f=document.createElement("div");f.className="picsel-card-rate",f.textContent=`${t.rate}%`,m.appendChild(f)}return o.appendChild(m),o},ye=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const d=document.createElement("section");d.className="picsel-section picsel-card-section";const u=document.createElement("h4");u.className="picsel-section-title",u.textContent="카드별 혜택",d.appendChild(u);const l=document.createElement("div");return l.className="picsel-empty-benefits",l.textContent="카드 혜택 정보를 불러오는 중...",d.appendChild(l),d}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,c=e.map(d=>{const u=d,l=u.rate??u.discount,m=he(n,l),f=xe(n,m);return{...u,cardName:u.cardName??u.card,rate:l,discountAmount:m??void 0,finalPrice:f??void 0}}).sort((d,u)=>{const l=d.discountAmount??0;return(u.discountAmount??0)-l}),o=document.createElement("section");o.className="picsel-section picsel-card-section";const r=document.createElement("h4");r.className="picsel-section-title",r.textContent="카드별 혜택 비교",o.appendChild(r);const i=document.createElement("div");i.className="picsel-card-benefit-list";const s=t.currency??"KRW";c.forEach((d,u)=>{const l=Ce(d,u,s);i.appendChild(l)}),o.appendChild(i);const p=[];if(t.giftCardDiscount?.description&&p.push(t.giftCardDiscount.description),t.cashback?.description&&p.push(t.cashback.description),p.length>0){const d=document.createElement("div");d.className="picsel-sub-benefits",p.forEach(u=>{const l=document.createElement("div");l.className="picsel-sub-benefit-item",l.textContent=u,d.appendChild(l)}),o.appendChild(d)}return o};let k=!1,h=null;const Ee=t=>{if(k||!a.shadowRoot)return;h=document.createElement("div"),h.className="picsel-comparison-panel",h.innerHTML=`
		<div class="picsel-comparison-header">
			<h3>💰 가격 비교</h3>
			<button class="picsel-comparison-close" type="button">✕</button>
		</div>
		<div class="picsel-comparison-loading">
			<div class="picsel-spinner"></div>
			<p>다나와, 네이버쇼핑, 쿠팡에서 검색 중...</p>
		</div>
	`,h.querySelector(".picsel-comparison-close")?.addEventListener("click",B),a.shadowRoot.appendChild(h),k=!0,we(t)},B=()=>{h&&a.shadowRoot&&(a.shadowRoot.removeChild(h),h=null,k=!1)},we=async t=>{if(!h)return;const e=t.title||"",n=t.amount||0;try{const c=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:e});if(!h)return;c.success&&c.data?ve(c.data,n):$(c.error||"가격 비교 서버에 연결할 수 없습니다")}catch(c){if(!h)return;$(c instanceof Error?c.message:"오류 발생")}},ve=(t,e)=>{if(!h)return;const n=h.querySelector(".picsel-comparison-loading");n&&n.remove();const c=document.createElement("div");c.className="picsel-comparison-current",c.innerHTML=`
		<span>현재 페이지 가격:</span>
		<strong>${e.toLocaleString("ko-KR")}원</strong>
	`,h.appendChild(c);const o=document.createElement("div");o.className="picsel-comparison-results";const r={danawa:"다나와",naver:"네이버쇼핑",coupang:"쿠팡"},i={danawa:"#0066cc",naver:"#03cf5d",coupang:"#f73c00"};for(const p of t.results){const d=document.createElement("div");d.className="picsel-comparison-provider";const u=document.createElement("div");if(u.className="picsel-comparison-provider-header",u.innerHTML=`
			<span style="color: ${i[p.provider]||"#333"}; font-weight: 600;">
				${r[p.provider]||p.provider}
			</span>
			${p.success?`<span class="picsel-comparison-count">${p.products.length}개</span>`:'<span class="picsel-comparison-error-badge">실패</span>'}
		`,d.appendChild(u),p.success&&p.products.length>0){const l=document.createElement("div");l.className="picsel-comparison-product-list";for(const m of p.products.slice(0,3)){const f=m.price<e,g=e-m.price,x=document.createElement("a");x.className="picsel-comparison-product",x.href=m.url,x.target="_blank",x.rel="noopener noreferrer",x.innerHTML=`
					${m.image?`<img src="${m.image}" alt="" class="picsel-comparison-img" />`:""}
					<div class="picsel-comparison-info">
						<p class="picsel-comparison-name">${m.name}</p>
						<div class="picsel-comparison-price-row">
							<span class="picsel-comparison-price" style="color: ${f?"#e91e63":"#333"};">
								${m.price.toLocaleString("ko-KR")}원
							</span>
							${f?`<span class="picsel-comparison-saving">${g.toLocaleString("ko-KR")}원 저렴</span>`:""}
						</div>
						<div class="picsel-comparison-meta">
							${m.rating?`<span>⭐ ${m.rating}</span>`:""}
							${m.deliveryInfo?`<span style="color: #4caf50;">${m.deliveryInfo}</span>`:""}
						</div>
					</div>
				`,l.appendChild(x)}d.appendChild(l)}else if(p.error){const l=document.createElement("p");l.className="picsel-comparison-provider-error",l.textContent=p.error,d.appendChild(l)}else{const l=document.createElement("p");l.className="picsel-comparison-empty",l.textContent="검색 결과 없음",d.appendChild(l)}o.appendChild(d)}h.appendChild(o);const s=document.createElement("div");s.className="picsel-comparison-meta-info",s.innerHTML=`
		${t.fromCache?'<span class="picsel-comparison-cache">캐시</span>':""}
		<span>${(t.totalDuration/1e3).toFixed(1)}초</span>
	`,h.appendChild(s)},$=t=>{if(!h)return;const e=h.querySelector(".picsel-comparison-loading");e&&(e.innerHTML=`
			<div class="picsel-comparison-error">
				<p>⚠️ ${t}</p>
				<code>pnpm run server</code>
				<p class="picsel-comparison-help">터미널에서 위 명령어를 실행 후 다시 시도해주세요.</p>
			</div>
		`)},ke=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const c=document.createElement("button");c.className="picsel-footer-compare",c.textContent="💰 가격 비교",c.type="button",c.addEventListener("click",()=>{k?B():Ee(t)}),n.appendChild(c);const o=document.createElement("button");return o.className="picsel-footer-confirm",o.textContent="확인했습니다",o.type="button",o.addEventListener("click",()=>{B(),C(!1)}),n.appendChild(o),e.appendChild(n),e},T=t=>{const{buttonBadgeEl:e}=a;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const r=o,i=r.rate??r.discount;return typeof i=="number"?i:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const c=t.cashback?.amount;if(typeof c=="number"&&c>0){const o=E(c,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},O=()=>{const{contentEl:t,cachedData:e}=a;if(!t)return;if(t.textContent="",!e){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(i),T(null);return}const n=e,c=ge(n);t.appendChild(c);const o=ye(n);o&&t.appendChild(o);const r=ke(n);r&&t.appendChild(r),T(n)},C=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:c}=a;!e||!n||!c||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),c.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),c.textContent="PicSel 혜택 보기"))},Pe=()=>{if(a.mounted)return;if(document.getElementById(S)){const r=document.getElementById(S);r&&(a.hostElement=r,a.shadowRoot=r.shadowRoot,r.shadowRoot&&(a.toggleButton=r.shadowRoot.querySelector(".picsel-toggle-button"),a.buttonLabelEl=r.shadowRoot.querySelector(".picsel-toggle-label"),a.buttonBadgeEl=r.shadowRoot.querySelector(".picsel-toggle-badge"),a.panelEl=r.shadowRoot.querySelector(`#${N}`),a.closeButtonEl=r.shadowRoot.querySelector(".picsel-close-button"),a.contentEl=r.shadowRoot.querySelector(".picsel-panel-content"),a.panelTitleEl=r.shadowRoot.querySelector(".picsel-panel-title"))),a.mounted=!0;return}a.hostElement=document.createElement("div"),a.hostElement.id=S,a.hostElement.style.position="fixed",a.hostElement.style.bottom="24px",a.hostElement.style.right="24px",a.hostElement.style.zIndex=String(2147483647),a.shadowRoot=a.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=de,a.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",a.shadowRoot.appendChild(e),a.toggleButton=document.createElement("button"),a.toggleButton.className="picsel-toggle-button",a.toggleButton.type="button",a.toggleButton.setAttribute("aria-expanded","false"),a.buttonLabelEl=document.createElement("span"),a.buttonLabelEl.className="picsel-toggle-label",a.buttonLabelEl.textContent="PicSel 혜택 보기",a.toggleButton.appendChild(a.buttonLabelEl),a.buttonBadgeEl=document.createElement("span"),a.buttonBadgeEl.className="picsel-toggle-badge",a.toggleButton.appendChild(a.buttonBadgeEl),e.appendChild(a.toggleButton),a.panelEl=document.createElement("div"),a.panelEl.className="picsel-panel",a.panelEl.id=N,a.panelEl.setAttribute("role","dialog"),a.panelEl.setAttribute("aria-hidden","true"),a.toggleButton.setAttribute("aria-controls",N);const n=document.createElement("div");n.className="picsel-panel-header",a.panelTitleEl=document.createElement("div"),a.panelTitleEl.className="picsel-panel-title",a.panelTitleEl.textContent="PicSel 혜택 정보",a.closeButtonEl=document.createElement("button"),a.closeButtonEl.type="button",a.closeButtonEl.className="picsel-close-button",a.closeButtonEl.setAttribute("aria-label","닫기"),a.closeButtonEl.textContent="✕",n.appendChild(a.panelTitleEl),n.appendChild(a.closeButtonEl),a.panelEl.appendChild(n),a.contentEl=document.createElement("div"),a.contentEl.className="picsel-panel-content",a.panelEl.appendChild(a.contentEl),e.appendChild(a.panelEl);const c=a.panelEl,o=a.hostElement;a.toggleButton.addEventListener("click",()=>{const r=!c.classList.contains("open");C(r)}),a.closeButtonEl.addEventListener("click",()=>{C(!1)}),window.addEventListener("keydown",r=>{r.key==="Escape"&&C(!1)}),document.addEventListener("click",r=>{if(!c.classList.contains("open"))return;const i=r.composedPath();o&&!i.includes(o)&&C(!1)},!0),document.body.appendChild(a.hostElement),a.mounted=!0},U=()=>{if(a.panelTitleEl&&a.cachedData?.site){const t=fe(a.cachedData.site);a.panelTitleEl.textContent=`${t} 혜택 정보`}},W=t=>{a.cachedData={...t},Pe(),U(),O(),C(!1)},K=t=>{if(a.cachedData={...a.cachedData??{},...t},!a.mounted){W(a.cachedData);return}U(),O()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function Se(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),M.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):L.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):q.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function Ne(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new M;case"amazon":return new L;case"ebay":return new q;default:return new F}}function _(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=Se(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:c}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${c}`);const o=Ne(n);if(console.log(`[Content] 📝 Using parser: ${o.siteName}`),!o)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;let r=o.parse(document);if(r)console.log("[Content] ✅ Parse successful:",{title:r.title?.substring(0,50),amount:r.amount,hasCardBenefits:!!r.cardBenefits});else if(console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),r=new F().parse(document),!r)return null;return{paymentInfo:r,site:n}}function Be(t,e){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},n=>{n?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:n.success,savedAmount:n.savedData?.amount,savedCurrency:n.savedData?.currency}),K({...t,site:e})):console.error("[ContentScript] ❌ Background error:",{error:n?.error,message:n?.message})})}function R(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=_();if(!t){console.warn("[ContentScript] Failed to extract");return}const{paymentInfo:e,site:n}=t;console.log("[ContentScript] Extracted data:",e),W({...e,site:n}),console.log("[ContentScript] Sending to background..."),Be(e,n)}function z(){const t=new MutationObserver(e=>{e.some(c=>c.addedNodes.length>0&&Array.from(c.addedNodes).some(o=>o.tagName==="IFRAME"||o instanceof Element&&o.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const c=_();if(c){const{paymentInfo:o,site:r}=c;console.log("[ContentScript] ✅ Dynamic content re-parsed:",o),K({...o,site:r}),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:o,timestamp:Date.now(),source:"dynamic-iframe"},i=>{i?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")})}},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{R(),z()}):(R(),z());
