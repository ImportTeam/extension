import{C as M}from"./assets/constants-4DKqSpZt.js";class E{extractNumber(e){const c=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return c?parseInt(c[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const c of n)try{const o=this.getTextBySelector(e,c);if(o)return o}catch(o){console.debug(`[${this.siteName}] Selector error: ${c}`,o)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const c=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=c.nextNode();){const i=(o.textContent||"").match(n);if(i)return console.log(`[${this.siteName}] Found price via TreeWalker: "${i[0]}"`),i[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,c=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:c||void 0}}}const g={amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",'[class*="price"]',".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price"],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},U=t=>{for(const e of g.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},O=t=>{try{const e=t.querySelector(g.mainImage);if(e?.src){let c=e.src;return c.startsWith("//")&&(c="https:"+c),c=c.split("?")[0],c}const n=t.querySelector(g.thumbnailContainer);if(n){const c=n.querySelector("ul > li:first-child img");if(c){let o=c.src;if(o)return o.startsWith("//")&&(o="https:"+o),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},W=t=>{try{const e=[],n=new Set,c=t.querySelector(g.thumbnailContainer);if(c){const o=c.querySelectorAll("ul > li img");for(const r of o){let s=r.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s="https:"+s),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},x=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},_=t=>{let e=null,n=null,c=null;for(const o of g.amount)try{const r=t.querySelector(o);if(!r||!r.textContent)continue;const i=x(r.textContent);if(!i)continue;if(/final|discount|final-price|deal|sale/i.test(o)){c=i,e=i;break}n||(n=i),e||(e=i)}catch(r){console.debug(`[CoupangParser][Price] Selector ${o} failed`,r)}return{amount:e,originalPrice:n,discountPrice:c}},K=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let c;for(;c=n.nextNode();){const o=(c.textContent||"").replace(/\u00A0/g," ");for(const r of e){const i=o.match(r);if(i&&i[1]){const s=x(i[1]);if(s)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${s}`),s}}}return null},j=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const c of e){const o=(c.textContent||"").replace(/\u00A0/g," ").trim(),r=(c.getAttribute("data-price")||"").trim(),s=`${o} ${r}`.trim().match(n);if(s&&s[1]){const u=x(s[1]);if(u)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${u}`),u}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},y=t=>{for(const[e,n]of Object.entries(M))if(t.includes(e))return n;return null},A=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},H=t=>{const e=[],n=g.cardImages;return t.querySelectorAll(n.directClass).forEach(r=>{const i=r,s=i.src,u=i.alt||"";if(!s)return;let d=u.trim();d||(d=y(s)||""),d&&!d.includes("카드")&&(d=`${d}카드`),s&&d&&(e.some(p=>p.cardName===d)||(e.push({src:s,alt:u,cardName:d}),console.log("[CoupangParser] 카드 이미지 발견:",{cardName:d,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(i=>{const s=i,u=s.src,d=s.alt||"";if(!u||(s.width||s.naturalWidth)>100)return;let a=d.trim();a||(a=y(u)||""),a&&!a.includes("카드")&&(a=`${a}카드`),u&&a&&!e.some(f=>f.cardName===a)&&e.push({src:u,alt:d,cardName:a})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(r=>{const i=r,s=i.src,u=i.alt||"";if(!s||(i.width||i.naturalWidth)>100)return;let p=u.trim();p||(p=y(s)||""),p&&!p.includes("카드")&&(p=`${p}카드`),s&&p&&!e.some(a=>a.cardName===p)&&e.push({src:s,alt:u,cardName:p})}),console.log("[CoupangParser] 추출된 카드 이미지 총:",e.length),e},V=t=>{const e=[],n=g.cardBenefitPopup,c=t.querySelector(n.container);if(!c)return console.log("[CoupangParser] 카드 혜택 팝업을 찾을 수 없음"),e;const o=c.querySelector(n.iframe);if(o)try{const i=o.contentDocument||o.contentWindow?.document;if(i)return G(i)}catch{console.log("[CoupangParser] iframe 접근 불가 (cross-origin)")}const r=c.querySelector(n.content);return r?Y(r):e},G=t=>{const e=[],n=g.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const r=o.querySelector(n.cardName),i=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),u=r?.textContent?.trim()||"",d=i?.textContent?.trim()||"",p=s?.textContent?.trim()||o.textContent?.trim()||"";if(u){const a=A(d||p);e.push({card:u,cardName:u,benefit:p||d||"혜택 제공",discount:a,rate:a})}}),e},Y=t=>{const e=[],n=t.textContent||"",c=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of c){let r;for(;(r=o.exec(n))!==null;){const i=r[1].includes("카드")?r[1]:`${r[1]}카드`,s=parseFloat(r[2]);e.some(u=>u.card===i)||e.push({card:i,cardName:i,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},J=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(c=>{const o=c.textContent||"",r=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(r){const i=r[1].includes("카드")?r[1]:`${r[1]}카드`,s=parseFloat(r[2]);if(!e.some(u=>u.card===i)){let u=`최대 ${s}% 할인/적립`;const d=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);d&&(u=`최대 ${s}% ${d[0]}`),e.push({card:i,cardName:i,benefit:u,discount:s,rate:s})}}}),e},X=t=>{let e=[];const n=H(t),c=V(t);if(c.length>0&&(console.log("[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:",c.length),e=c),J(t).forEach(r=>{e.some(i=>i.card===r.card)||e.push(r)}),e.length===0){const r=t.querySelector(g.benefitBadge);if(r){const i=r.querySelectorAll("img.benefit-ico"),s=[],u=[];i.forEach(a=>{const f=a.getAttribute("src");if(f){const m=y(f);m&&(s.push(m),u.push(f))}});const d=r.querySelector(".benefit-label")?.textContent?.trim(),p=r.querySelector(".benefit-label-highlight")?.textContent?.trim();if(d){const a=A(d),f=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({card:f,cardName:f,benefit:`${d}${p?` (${p})`:""}`,discount:a,rate:a,imageUrl:u[0]})}}}return e=e.map(r=>{if(!r.imageUrl){const i=r.cardName||r.card||"",s=n.find(u=>{const d=u.cardName.toLowerCase(),p=i.toLowerCase();return d.includes(p.replace("카드",""))||p.includes(d.replace("카드",""))});if(s)return{...r,imageUrl:s.src}}return r}),e.sort((r,i)=>(i.discount??0)-(r.discount??0)),console.log("[CoupangParser] 최종 카드 혜택:",e),e},Z=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const c=t.querySelectorAll("div, span, p");for(const o of c){const r=o.textContent||"";if(r.includes("기프트카드")&&r.includes("%")){const i=r.match(/(\d+)\s*%/);if(i)return{rate:parseInt(i[1],10),description:r.trim()}}}return null},Q=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const r=o.textContent||"",i=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(i&&r.includes("쿠팡캐시")){const s=x(i[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const c=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(c){const o=x(c[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},ee=t=>{try{const e=[],n=new Set,c=t.querySelector(g.instantOption);if(!c)return e;const o=c.querySelectorAll("section > ul > li");for(const r of o)try{const i=r.querySelectorAll("div");if(i.length<2)continue;let s="";for(const a of i){const f=a.textContent||"";if(!f.includes("원")&&f.trim().length>0&&!f.includes("px")){s=f.trim();break}}let u="";for(const a of i){const m=(a.textContent||"").match(/[\d,]+원/);if(m){u=m[0].replace(/[,원]/g,"");break}}if(!u)continue;const d=parseInt(u);if(!d||d<100||!s||s.length<2)continue;const p=`${s}-${d}`;if(n.has(p))continue;if(e.push({name:s,price:d}),n.add(p),e.length>=15)break}catch(i){console.warn("[CoupangParser] Error parsing list item:",i);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},te=t=>t.querySelector(g.shipping)?.textContent?.trim()||null;class I extends E{siteName="Coupang";selectors={amount:g.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=U(e),c=O(e),o=W(e),r=_(e);let i=r.amount;const{originalPrice:s,discountPrice:u}=r;if(i||(i=K(e)),i||(i=j(e)),!i)return console.debug("[CoupangParser] ❌ No price found"),null;const d=X(e).map(h=>{const P=h.rate??h.discount,S=h.cardName||h.card;return{card:S,cardName:S,benefit:h.benefit,discount:P,rate:P}}),p=Z(e),a=Q(e),f=te(e),m=ee(e);return console.log(`[CoupangParser] ✅ Found: ${i} KRW`),{price:i,amount:i,currency:"KRW",title:n||void 0,imageUrl:c||void 0,images:o,variants:m,originalPrice:s||void 0,discountPrice:u||void 0,cardBenefits:d,giftCardDiscount:p||void 0,cashback:a||void 0,shippingInfo:f||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const ne={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class $ extends E{siteName="Amazon";selectors={amount:ne.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const c=this.extractNumber(n);if(!c||!this.isValidPrice(c))return console.debug("[AmazonParser] ❌ Invalid amount:",c),null;const o=this.extractCurrency(n),{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${c} ${o}`),{price:c,amount:c,currency:o,title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const oe={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class D extends E{siteName="eBay";selectors={amount:oe.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const c=this.extractNumber(n);if(!c||!this.isValidPrice(c))return console.debug("[EbayParser] ❌ Invalid amount:",c),null;const o=this.extractCurrency(n),{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${c} ${o}`),{price:c,amount:c,currency:o,title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const re={amount:[]};class T extends E{siteName="Fallback";selectors={amount:re.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const c=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!c)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const o=this.extractNumber(c[1]);if(!o||!this.isValidPrice(o))return console.debug("[FallbackParser] ❌ Invalid amount:",o),null;const{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const ce=`
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
			width: 48px;
			height: 48px;
			border-radius: 6px;
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
			border-radius: 6px;
			font-size: 11px;
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
			font-size: 15px;
			font-weight: 700;
			color: #dc2626;
		}

		/* 모든 순위에서 할인 금액은 빨간색 유지 (할인 = 빨강 직관적) */
		.picsel-card-benefit-item.recommended .picsel-card-discount,
		.picsel-card-benefit-item.rank-2 .picsel-card-discount,
		.picsel-card-benefit-item.rank-3 .picsel-card-discount {
			color: #dc2626;
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
`,C=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",c=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let r=t;c.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,r=Math.round(t));const i=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(i,o).format(r)},ie=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),w="picsel-toggle-host",k="picsel-toggle-panel",ae={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},se=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return ae[e]||String(t)},l={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},le=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const c=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(c){const a=document.createElement("img");a.src=c,a.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(a)}else{const a=document.createElement("span");a.textContent="No Image",a.style.fontSize="11px",a.style.color="#64748b",n.appendChild(a)}const o=document.createElement("div");o.className="picsel-product-info";const r=document.createElement("h3");r.className="picsel-product-title",r.textContent=t.title||"상품 정보를 찾을 수 없어요.";const i=document.createElement("div");i.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,u=C(s,t.currency??"KRW");if(u){const a=document.createElement("div");a.className="picsel-final-price",a.textContent=u,i.appendChild(a)}const d=C(t.originalPrice,t.currency??"KRW"),p=ie(t.originalPrice,s);if(d&&p){const a=document.createElement("div");a.className="picsel-original-price",a.textContent=d;const f=document.createElement("div");f.className="picsel-discount-tag",f.textContent=`-${p}%`,i.appendChild(a),i.appendChild(f)}if(o.appendChild(r),o.appendChild(i),t.shippingInfo){const a=document.createElement("div");a.className="picsel-shipping",a.textContent=`배송: ${t.shippingInfo}`,o.appendChild(a)}return e.appendChild(n),e.appendChild(o),e},de=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),pe=(t,e)=>typeof t!="number"||e===null?null:t-e,ue=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,c]of Object.entries(e))if(t.includes(n))return c;return t.replace("카드","").substring(0,2).toUpperCase()},fe=(t,e,n)=>{const c=e===0?" recommended":e===1?" rank-2":e===2?" rank-3":"",o=document.createElement("div");o.className=`picsel-card-benefit-item${c}`;const r=t.cardName||t.card||"카드";if(t.imageUrl){const a=document.createElement("div");a.className="picsel-card-image-wrapper";const f=document.createElement("img");f.src=t.imageUrl,f.alt=r,f.className="picsel-card-image",f.onerror=()=>{const m=ue(r);a.innerHTML=`
				<div class="picsel-card-initial">${m}</div>
			`},a.appendChild(f),o.appendChild(a)}const i=document.createElement("div");i.className="picsel-card-info";const s=document.createElement("div");if(s.className="picsel-card-header",e<3&&(t.discountAmount??0)>0){const a=document.createElement("span");a.className="picsel-recommended-badge",a.textContent=`${e+1}위`,s.appendChild(a)}const u=document.createElement("span");u.className="picsel-card-name";const d=r.includes(",")?r.split(",")[0].trim():r;if(u.textContent=d,s.appendChild(u),i.appendChild(s),t.benefit){const a=document.createElement("div");a.className="picsel-card-benefit-desc",a.textContent=t.benefit,i.appendChild(a)}o.appendChild(i);const p=document.createElement("div");if(p.className="picsel-card-amount",typeof t.discountAmount=="number"&&t.discountAmount>0){const a=document.createElement("div");a.className="picsel-card-discount";const f=C(t.discountAmount,n);if(a.textContent=`-${f}`,p.appendChild(a),typeof t.finalPrice=="number"){const m=document.createElement("div");m.className="picsel-card-final";const h=C(t.finalPrice,n);m.textContent=`→ ${h}`,p.appendChild(m)}}else if(typeof t.rate=="number"){const a=document.createElement("div");a.className="picsel-card-rate",a.textContent=`${t.rate}%`,p.appendChild(a)}return o.appendChild(p),o},me=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const d=document.createElement("section");d.className="picsel-section picsel-card-section";const p=document.createElement("h4");p.className="picsel-section-title",p.textContent="카드별 혜택",d.appendChild(p);const a=document.createElement("div");return a.className="picsel-empty-benefits",a.textContent="카드 혜택 정보를 불러오는 중...",d.appendChild(a),d}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,c=e.map(d=>{const p=d,a=p.rate??p.discount,f=de(n,a),m=pe(n,f);return{...p,cardName:p.cardName??p.card,rate:a,discountAmount:f??void 0,finalPrice:m??void 0}}).sort((d,p)=>{const a=d.discountAmount??0;return(p.discountAmount??0)-a}),o=document.createElement("section");o.className="picsel-section picsel-card-section";const r=document.createElement("h4");r.className="picsel-section-title",r.textContent="카드별 혜택 비교",o.appendChild(r);const i=document.createElement("div");i.className="picsel-card-benefit-list";const s=t.currency??"KRW";c.forEach((d,p)=>{const a=fe(d,p,s);i.appendChild(a)}),o.appendChild(i);const u=[];if(t.giftCardDiscount?.description&&u.push(t.giftCardDiscount.description),t.cashback?.description&&u.push(t.cashback.description),u.length>0){const d=document.createElement("div");d.className="picsel-sub-benefits",u.forEach(p=>{const a=document.createElement("div");a.className="picsel-sub-benefit-item",a.textContent=p,d.appendChild(a)}),o.appendChild(d)}return o},ge=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("button");return n.className="picsel-footer-confirm",n.textContent="확인했습니다",n.type="button",n.addEventListener("click",()=>{l.panelEl&&l.panelEl.classList.remove("show")}),e.appendChild(n),e},v=t=>{const{buttonBadgeEl:e}=l;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const r=o,i=r.rate??r.discount;return typeof i=="number"?i:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const c=t.cashback?.amount;if(typeof c=="number"&&c>0){const o=C(c,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},R=()=>{const{contentEl:t,cachedData:e}=l;if(!t)return;if(t.textContent="",!e){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(i),v(null);return}const n=e,c=le(n);t.appendChild(c);const o=me(n);o&&t.appendChild(o);const r=ge();r&&t.appendChild(r),v(n)},b=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:c}=l;!e||!n||!c||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),c.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),c.textContent="PicSel 혜택 보기"))},he=()=>{if(l.mounted)return;if(document.getElementById(w)){const r=document.getElementById(w);r&&(l.hostElement=r,l.shadowRoot=r.shadowRoot,r.shadowRoot&&(l.toggleButton=r.shadowRoot.querySelector(".picsel-toggle-button"),l.buttonLabelEl=r.shadowRoot.querySelector(".picsel-toggle-label"),l.buttonBadgeEl=r.shadowRoot.querySelector(".picsel-toggle-badge"),l.panelEl=r.shadowRoot.querySelector(`#${k}`),l.closeButtonEl=r.shadowRoot.querySelector(".picsel-close-button"),l.contentEl=r.shadowRoot.querySelector(".picsel-panel-content"),l.panelTitleEl=r.shadowRoot.querySelector(".picsel-panel-title"))),l.mounted=!0;return}l.hostElement=document.createElement("div"),l.hostElement.id=w,l.hostElement.style.position="fixed",l.hostElement.style.bottom="24px",l.hostElement.style.right="24px",l.hostElement.style.zIndex=String(2147483647),l.shadowRoot=l.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=ce,l.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",l.shadowRoot.appendChild(e),l.toggleButton=document.createElement("button"),l.toggleButton.className="picsel-toggle-button",l.toggleButton.type="button",l.toggleButton.setAttribute("aria-expanded","false"),l.buttonLabelEl=document.createElement("span"),l.buttonLabelEl.className="picsel-toggle-label",l.buttonLabelEl.textContent="PicSel 혜택 보기",l.toggleButton.appendChild(l.buttonLabelEl),l.buttonBadgeEl=document.createElement("span"),l.buttonBadgeEl.className="picsel-toggle-badge",l.toggleButton.appendChild(l.buttonBadgeEl),e.appendChild(l.toggleButton),l.panelEl=document.createElement("div"),l.panelEl.className="picsel-panel",l.panelEl.id=k,l.panelEl.setAttribute("role","dialog"),l.panelEl.setAttribute("aria-hidden","true"),l.toggleButton.setAttribute("aria-controls",k);const n=document.createElement("div");n.className="picsel-panel-header",l.panelTitleEl=document.createElement("div"),l.panelTitleEl.className="picsel-panel-title",l.panelTitleEl.textContent="PicSel 혜택 정보",l.closeButtonEl=document.createElement("button"),l.closeButtonEl.type="button",l.closeButtonEl.className="picsel-close-button",l.closeButtonEl.setAttribute("aria-label","닫기"),l.closeButtonEl.textContent="✕",n.appendChild(l.panelTitleEl),n.appendChild(l.closeButtonEl),l.panelEl.appendChild(n),l.contentEl=document.createElement("div"),l.contentEl.className="picsel-panel-content",l.panelEl.appendChild(l.contentEl),e.appendChild(l.panelEl);const c=l.panelEl,o=l.hostElement;l.toggleButton.addEventListener("click",()=>{const r=!c.classList.contains("open");b(r)}),l.closeButtonEl.addEventListener("click",()=>{b(!1)}),window.addEventListener("keydown",r=>{r.key==="Escape"&&b(!1)}),document.addEventListener("click",r=>{if(!c.classList.contains("open"))return;const i=r.composedPath();o&&!i.includes(o)&&b(!1)},!0),document.body.appendChild(l.hostElement),l.mounted=!0},z=()=>{if(l.panelTitleEl&&l.cachedData?.site){const t=se(l.cachedData.site);l.panelTitleEl.textContent=`${t} 혜택 정보`}},q=t=>{l.cachedData={...t},he(),z(),R(),b(!1)},F=t=>{if(l.cachedData={...l.cachedData??{},...t},!l.mounted){q(l.cachedData);return}z(),R()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function be(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),I.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):$.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):D.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function xe(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new I;case"amazon":return new $;case"ebay":return new D;default:return new T}}function L(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=be(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:c}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${c}`);const o=xe(n);if(console.log(`[Content] 📝 Using parser: ${o.siteName}`),!o)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;let r=o.parse(document);if(r)console.log("[Content] ✅ Parse successful:",{title:r.title?.substring(0,50),amount:r.amount,hasCardBenefits:!!r.cardBenefits});else if(console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),r=new T().parse(document),!r)return null;return{paymentInfo:r,site:n}}function Ce(t,e){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},n=>{n?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:n.success,savedAmount:n.savedData?.amount,savedCurrency:n.savedData?.currency}),F({...t,site:e})):console.error("[ContentScript] ❌ Background error:",{error:n?.error,message:n?.message})})}function N(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=L();if(!t){console.warn("[ContentScript] Failed to extract");return}const{paymentInfo:e,site:n}=t;console.log("[ContentScript] Extracted data:",e),q({...e,site:n}),console.log("[ContentScript] Sending to background..."),Ce(e,n)}function B(){const t=new MutationObserver(e=>{e.some(c=>c.addedNodes.length>0&&Array.from(c.addedNodes).some(o=>o.tagName==="IFRAME"||o instanceof Element&&o.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const c=L();if(c){const{paymentInfo:o,site:r}=c;console.log("[ContentScript] ✅ Dynamic content re-parsed:",o),F({...o,site:r}),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:o,timestamp:Date.now(),source:"dynamic-iframe"},i=>{i?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")})}},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{N(),B()}):(N(),B());
