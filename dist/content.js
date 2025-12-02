import{C as L}from"./assets/constants-4DKqSpZt.js";class y{extractNumber(e){const c=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return c?parseInt(c[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const c of n)try{const o=this.getTextBySelector(e,c);if(o)return o}catch(o){console.debug(`[${this.siteName}] Selector error: ${c}`,o)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const c=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=c.nextNode();){const i=(o.textContent||"").match(n);if(i)return console.log(`[${this.siteName}] Found price via TreeWalker: "${i[0]}"`),i[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,c=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:c||void 0}}}const g={amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",'[class*="price"]',".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price"],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{container:'.twc-w-\\[76px\\], [class*="w-[76px]"], [class*="card-icon"], [class*="card-image"]',image:"img"},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},U=t=>{for(const e of g.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},O=t=>{try{const e=t.querySelector(g.mainImage);if(e?.src){let c=e.src;return c.startsWith("//")&&(c="https:"+c),c=c.split("?")[0],c}const n=t.querySelector(g.thumbnailContainer);if(n){const c=n.querySelector("ul > li:first-child img");if(c){let o=c.src;if(o)return o.startsWith("//")&&(o="https:"+o),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},W=t=>{try{const e=[],n=new Set,c=t.querySelector(g.thumbnailContainer);if(c){const o=c.querySelectorAll("ul > li img");for(const r of o){let l=r.src;if(l&&!n.has(l)&&(l.startsWith("//")&&(l="https:"+l),l.includes("thumbnails/remote/")&&(l=l.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),l=l.split("?")[0],!n.has(l)&&(e.push(l),n.add(l),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},b=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},_=t=>{let e=null,n=null,c=null;for(const o of g.amount)try{const r=t.querySelector(o);if(!r||!r.textContent)continue;const i=b(r.textContent);if(!i)continue;if(/final|discount|final-price|deal|sale/i.test(o)){c=i,e=i;break}n||(n=i),e||(e=i)}catch(r){console.debug(`[CoupangParser][Price] Selector ${o} failed`,r)}return{amount:e,originalPrice:n,discountPrice:c}},K=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let c;for(;c=n.nextNode();){const o=(c.textContent||"").replace(/\u00A0/g," ");for(const r of e){const i=o.match(r);if(i&&i[1]){const l=b(i[1]);if(l)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${l}`),l}}}return null},j=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const c of e){const o=(c.textContent||"").replace(/\u00A0/g," ").trim(),r=(c.getAttribute("data-price")||"").trim(),l=`${o} ${r}`.trim().match(n);if(l&&l[1]){const u=b(l[1]);if(u)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${u}`),u}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},k=t=>{for(const[e,n]of Object.entries(L))if(t.includes(e))return n;return null},A=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},H=t=>{const e=[],n=g.cardImages;return t.querySelectorAll(n.container).forEach(r=>{const i=r.querySelector(n.image);if(i&&i.src){const l=i.alt||"",u=i.src;let d=l.replace(/\s*(카드|로고|아이콘|이미지)/g,"").trim();d||(d=k(u)||""),d&&!d.includes("카드")&&(d=`${d}카드`),u&&d&&(e.some(p=>p.cardName===d)||e.push({src:u,alt:l,cardName:d}))}}),t.querySelectorAll('img[src*="card"], img[alt*="카드"], img[class*="card"]').forEach(r=>{const i=r,l=i.src,u=i.alt||"";if((i.width||i.naturalWidth)>150)return;let p=u.replace(/\s*(카드|로고|아이콘|이미지)/g,"").trim();p||(p=k(l)||""),p&&!p.includes("카드")&&(p=`${p}카드`),l&&p&&!e.some(s=>s.cardName===p)&&e.push({src:l,alt:u,cardName:p})}),console.log("[CoupangParser] 추출된 카드 이미지:",e),e},V=t=>{const e=[],n=g.cardBenefitPopup,c=t.querySelector(n.container);if(!c)return console.log("[CoupangParser] 카드 혜택 팝업을 찾을 수 없음"),e;const o=c.querySelector(n.iframe);if(o)try{const i=o.contentDocument||o.contentWindow?.document;if(i)return Y(i)}catch{console.log("[CoupangParser] iframe 접근 불가 (cross-origin)")}const r=c.querySelector(n.content);return r?G(r):e},Y=t=>{const e=[],n=g.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const r=o.querySelector(n.cardName),i=o.querySelector(n.benefitRate),l=o.querySelector(n.benefitDesc),u=r?.textContent?.trim()||"",d=i?.textContent?.trim()||"",p=l?.textContent?.trim()||o.textContent?.trim()||"";if(u){const s=A(d||p);e.push({card:u,cardName:u,benefit:p||d||"혜택 제공",discount:s,rate:s})}}),e},G=t=>{const e=[],n=t.textContent||"",c=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of c){let r;for(;(r=o.exec(n))!==null;){const i=r[1].includes("카드")?r[1]:`${r[1]}카드`,l=parseFloat(r[2]);e.some(u=>u.card===i)||e.push({card:i,cardName:i,benefit:`최대 ${l}% 할인/적립`,discount:l,rate:l})}}return e},J=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(c=>{const o=c.textContent||"",r=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(r){const i=r[1].includes("카드")?r[1]:`${r[1]}카드`,l=parseFloat(r[2]);if(!e.some(u=>u.card===i)){let u=`최대 ${l}% 할인/적립`;const d=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);d&&(u=`최대 ${l}% ${d[0]}`),e.push({card:i,cardName:i,benefit:u,discount:l,rate:l})}}}),e},X=t=>{let e=[];const n=H(t),c=V(t);if(c.length>0&&(console.log("[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:",c.length),e=c),J(t).forEach(r=>{e.some(i=>i.card===r.card)||e.push(r)}),e.length===0){const r=t.querySelector(g.benefitBadge);if(r){const i=r.querySelectorAll("img.benefit-ico"),l=[],u=[];i.forEach(s=>{const f=s.getAttribute("src");if(f){const m=k(f);m&&(l.push(m),u.push(f))}});const d=r.querySelector(".benefit-label")?.textContent?.trim(),p=r.querySelector(".benefit-label-highlight")?.textContent?.trim();if(d){const s=A(d),f=l.length>0?`${l.slice(0,3).join(", ")}${l.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({card:f,cardName:f,benefit:`${d}${p?` (${p})`:""}`,discount:s,rate:s,imageUrl:u[0]})}}}return e=e.map(r=>{if(!r.imageUrl){const i=r.cardName||r.card||"",l=n.find(u=>{const d=u.cardName.toLowerCase(),p=i.toLowerCase();return d.includes(p.replace("카드",""))||p.includes(d.replace("카드",""))});if(l)return{...r,imageUrl:l.src}}return r}),e.sort((r,i)=>(i.discount??0)-(r.discount??0)),console.log("[CoupangParser] 최종 카드 혜택:",e),e},Z=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const c=t.querySelectorAll("div, span, p");for(const o of c){const r=o.textContent||"";if(r.includes("기프트카드")&&r.includes("%")){const i=r.match(/(\d+)\s*%/);if(i)return{rate:parseInt(i[1],10),description:r.trim()}}}return null},Q=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const r=o.textContent||"",i=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(i&&r.includes("쿠팡캐시")){const l=b(i[1]);if(l)return{amount:l,description:`쿠팡캐시 ${l.toLocaleString()} 원 적립`}}}const c=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(c){const o=b(c[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},ee=t=>{try{const e=[],n=new Set,c=t.querySelector(g.instantOption);if(!c)return e;const o=c.querySelectorAll("section > ul > li");for(const r of o)try{const i=r.querySelectorAll("div");if(i.length<2)continue;let l="";for(const s of i){const f=s.textContent||"";if(!f.includes("원")&&f.trim().length>0&&!f.includes("px")){l=f.trim();break}}let u="";for(const s of i){const m=(s.textContent||"").match(/[\d,]+원/);if(m){u=m[0].replace(/[,원]/g,"");break}}if(!u)continue;const d=parseInt(u);if(!d||d<100||!l||l.length<2)continue;const p=`${l}-${d}`;if(n.has(p))continue;if(e.push({name:l,price:d}),n.add(p),e.length>=15)break}catch(i){console.warn("[CoupangParser] Error parsing list item:",i);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},te=t=>t.querySelector(g.shipping)?.textContent?.trim()||null;class I extends y{siteName="Coupang";selectors={amount:g.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=U(e),c=O(e),o=W(e),r=_(e);let i=r.amount;const{originalPrice:l,discountPrice:u}=r;if(i||(i=K(e)),i||(i=j(e)),!i)return console.debug("[CoupangParser] ❌ No price found"),null;const d=X(e).map(h=>{const P=h.rate??h.discount,v=h.cardName||h.card;return{card:v,cardName:v,benefit:h.benefit,discount:P,rate:P}}),p=Z(e),s=Q(e),f=te(e),m=ee(e);return console.log(`[CoupangParser] ✅ Found: ${i} KRW`),{price:i,amount:i,currency:"KRW",title:n||void 0,imageUrl:c||void 0,images:o,variants:m,originalPrice:l||void 0,discountPrice:u||void 0,cardBenefits:d,giftCardDiscount:p||void 0,cashback:s||void 0,shippingInfo:f||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const ne={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class D extends y{siteName="Amazon";selectors={amount:ne.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const c=this.extractNumber(n);if(!c||!this.isValidPrice(c))return console.debug("[AmazonParser] ❌ Invalid amount:",c),null;const o=this.extractCurrency(n),{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${c} ${o}`),{price:c,amount:c,currency:o,title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const oe={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class T extends y{siteName="eBay";selectors={amount:oe.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const c=this.extractNumber(n);if(!c||!this.isValidPrice(c))return console.debug("[EbayParser] ❌ Invalid amount:",c),null;const o=this.extractCurrency(n),{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${c} ${o}`),{price:c,amount:c,currency:o,title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const re={amount:[]};class $ extends y{siteName="Fallback";selectors={amount:re.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const c=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!c)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const o=this.extractNumber(c[1]);if(!o||!this.isValidPrice(o))return console.debug("[FallbackParser] ❌ Invalid amount:",o),null;const{title:r,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:r||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const ce=`
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
			align-items: center;
			gap: 14px;
			padding: 14px 16px;
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
		}

		/* 카드 이미지 영역 */
		.picsel-card-image-wrapper {
			width: 52px;
			height: 52px;
			border-radius: 10px;
			overflow: hidden;
			background: #f8fafc;
			border: 1px solid #e2e8f0;
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
			color: #94a3b8;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		/* 카드 정보 영역 */
		.picsel-card-info {
			flex: 1;
			min-width: 0;
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.picsel-card-header {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		/* 할인 금액 영역 */
		.picsel-card-amount {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 2px;
			flex-shrink: 0;
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

		.picsel-card-benefit-item.recommended .picsel-card-image-wrapper {
			border-color: #a5b4fc;
			background: rgba(255, 255, 255, 0.8);
		}

		/* 2위 스타일 */
		.picsel-card-benefit-item.rank-2 {
			background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
			border: 1px solid #22c55e;
		}

		.picsel-card-benefit-item.rank-2 .picsel-card-image-wrapper {
			border-color: #86efac;
			background: rgba(255, 255, 255, 0.8);
		}

		/* 3위 스타일 */
		.picsel-card-benefit-item.rank-3 {
			background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
			border: 1px solid #f59e0b;
		}

		.picsel-card-benefit-item.rank-3 .picsel-card-image-wrapper {
			border-color: #fcd34d;
			background: rgba(255, 255, 255, 0.8);
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
		}

		.picsel-footer-confirm:active {
			transform: translateY(0);
			box-shadow: 0 2px 8px -2px rgba(99, 102, 241, 0.4);
		}

		/* Sub Benefits - 카드 섹션 아래 (쿠팡캐시 등) */
		.picsel-sub-benefits {
			margin-top: 12px;
			padding: 14px 16px;
			background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);
			border-radius: 12px;
			border: 1px solid #22d3ee;
		}

		.picsel-sub-benefit-item {
			font-size: 13px;
			color: #0891b2;
			padding: 6px 0;
			font-weight: 600;
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.picsel-sub-benefit-item::before {
			content: '';
			width: 6px;
			height: 6px;
			background: #06b6d4;
			border-radius: 50%;
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
`,C=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",c=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let r=t;c.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,r=Math.round(t));const i=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(i,o).format(r)},ie=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),E="picsel-toggle-host",w="picsel-toggle-panel",ae={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},se=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return ae[e]||String(t)},a={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},le=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const c=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(c){const s=document.createElement("img");s.src=c,s.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(s)}else{const s=document.createElement("span");s.textContent="No Image",s.style.fontSize="11px",s.style.color="#64748b",n.appendChild(s)}const o=document.createElement("div");o.className="picsel-product-info";const r=document.createElement("h3");r.className="picsel-product-title",r.textContent=t.title||"상품 정보를 찾을 수 없어요.";const i=document.createElement("div");i.className="picsel-price";const l=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,u=C(l,t.currency??"KRW");if(u){const s=document.createElement("div");s.className="picsel-final-price",s.textContent=u,i.appendChild(s)}const d=C(t.originalPrice,t.currency??"KRW"),p=ie(t.originalPrice,l);if(d&&p){const s=document.createElement("div");s.className="picsel-original-price",s.textContent=d;const f=document.createElement("div");f.className="picsel-discount-tag",f.textContent=`-${p}%`,i.appendChild(s),i.appendChild(f)}if(o.appendChild(r),o.appendChild(i),t.shippingInfo){const s=document.createElement("div");s.className="picsel-shipping",s.textContent=`배송: ${t.shippingInfo}`,o.appendChild(s)}return e.appendChild(n),e.appendChild(o),e},de=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),pe=(t,e)=>typeof t!="number"||e===null?null:t-e,ue=(t,e,n)=>{const c=e===0?" recommended":e===1?" rank-2":e===2?" rank-3":"",o=document.createElement("div");if(o.className=`picsel-card-benefit-item${c}`,t.imageUrl){const s=document.createElement("div");s.className="picsel-card-image-wrapper";const f=document.createElement("img");f.src=t.imageUrl,f.alt=t.cardName||t.card||"카드",f.className="picsel-card-image",f.onerror=()=>{s.innerHTML=`
				<div class="picsel-card-icon-fallback">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
						<line x1="1" y1="10" x2="23" y2="10"></line>
					</svg>
				</div>
			`},s.appendChild(f),o.appendChild(s)}else{const s=document.createElement("div");s.className="picsel-card-image-wrapper",s.innerHTML=`
			<div class="picsel-card-icon-fallback">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
					<line x1="1" y1="10" x2="23" y2="10"></line>
				</svg>
			</div>
		`,o.appendChild(s)}const r=document.createElement("div");r.className="picsel-card-info";const i=document.createElement("div");if(i.className="picsel-card-header",e<3&&(t.discountAmount??0)>0){const s=document.createElement("span");s.className="picsel-recommended-badge",s.textContent=`${e+1}위`,i.appendChild(s)}const l=document.createElement("span");l.className="picsel-card-name";const u=t.cardName||t.card||"제휴 카드",d=u.includes(",")?u.split(",")[0].trim():u;if(l.textContent=d,i.appendChild(l),r.appendChild(i),t.benefit){const s=document.createElement("div");s.className="picsel-card-benefit-desc",s.textContent=t.benefit,r.appendChild(s)}o.appendChild(r);const p=document.createElement("div");if(p.className="picsel-card-amount",typeof t.discountAmount=="number"&&t.discountAmount>0){const s=document.createElement("div");s.className="picsel-card-discount";const f=C(t.discountAmount,n);if(s.textContent=`-${f}`,p.appendChild(s),typeof t.finalPrice=="number"){const m=document.createElement("div");m.className="picsel-card-final";const h=C(t.finalPrice,n);m.textContent=`→ ${h}`,p.appendChild(m)}}else if(typeof t.rate=="number"){const s=document.createElement("div");s.className="picsel-card-rate",s.textContent=`${t.rate}%`,p.appendChild(s)}return o.appendChild(p),o},fe=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const d=document.createElement("section");d.className="picsel-section picsel-card-section";const p=document.createElement("h4");p.className="picsel-section-title",p.textContent="카드별 혜택",d.appendChild(p);const s=document.createElement("div");return s.className="picsel-empty-benefits",s.textContent="카드 혜택 정보를 불러오는 중...",d.appendChild(s),d}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,c=e.map(d=>{const p=d,s=p.rate??p.discount,f=de(n,s),m=pe(n,f);return{...p,cardName:p.cardName??p.card,rate:s,discountAmount:f??void 0,finalPrice:m??void 0}}).sort((d,p)=>{const s=d.discountAmount??0;return(p.discountAmount??0)-s}),o=document.createElement("section");o.className="picsel-section picsel-card-section";const r=document.createElement("h4");r.className="picsel-section-title",r.textContent="카드별 혜택 비교",o.appendChild(r);const i=document.createElement("div");i.className="picsel-card-benefit-list";const l=t.currency??"KRW";c.forEach((d,p)=>{const s=ue(d,p,l);i.appendChild(s)}),o.appendChild(i);const u=[];if(t.giftCardDiscount?.description&&u.push(t.giftCardDiscount.description),t.cashback?.description&&u.push(t.cashback.description),u.length>0){const d=document.createElement("div");d.className="picsel-sub-benefits",u.forEach(p=>{const s=document.createElement("div");s.className="picsel-sub-benefit-item",s.textContent=p,d.appendChild(s)}),o.appendChild(d)}return o},me=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("button");return n.className="picsel-footer-confirm",n.textContent="확인했습니다",n.type="button",n.addEventListener("click",()=>{a.panelEl&&a.panelEl.classList.remove("show")}),e.appendChild(n),e},S=t=>{const{buttonBadgeEl:e}=a;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const r=o,i=r.rate??r.discount;return typeof i=="number"?i:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const c=t.cashback?.amount;if(typeof c=="number"&&c>0){const o=C(c,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},R=()=>{const{contentEl:t,cachedData:e}=a;if(!t)return;if(t.textContent="",!e){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(i),S(null);return}const n=e,c=le(n);t.appendChild(c);const o=fe(n);o&&t.appendChild(o);const r=me();r&&t.appendChild(r),S(n)},x=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:c}=a;!e||!n||!c||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),c.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),c.textContent="PicSel 혜택 보기"))},ge=()=>{if(a.mounted)return;if(document.getElementById(E)){const r=document.getElementById(E);r&&(a.hostElement=r,a.shadowRoot=r.shadowRoot,r.shadowRoot&&(a.toggleButton=r.shadowRoot.querySelector(".picsel-toggle-button"),a.buttonLabelEl=r.shadowRoot.querySelector(".picsel-toggle-label"),a.buttonBadgeEl=r.shadowRoot.querySelector(".picsel-toggle-badge"),a.panelEl=r.shadowRoot.querySelector(`#${w}`),a.closeButtonEl=r.shadowRoot.querySelector(".picsel-close-button"),a.contentEl=r.shadowRoot.querySelector(".picsel-panel-content"),a.panelTitleEl=r.shadowRoot.querySelector(".picsel-panel-title"))),a.mounted=!0;return}a.hostElement=document.createElement("div"),a.hostElement.id=E,a.hostElement.style.position="fixed",a.hostElement.style.bottom="24px",a.hostElement.style.right="24px",a.hostElement.style.zIndex=String(2147483647),a.shadowRoot=a.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=ce,a.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",a.shadowRoot.appendChild(e),a.toggleButton=document.createElement("button"),a.toggleButton.className="picsel-toggle-button",a.toggleButton.type="button",a.toggleButton.setAttribute("aria-expanded","false"),a.buttonLabelEl=document.createElement("span"),a.buttonLabelEl.className="picsel-toggle-label",a.buttonLabelEl.textContent="PicSel 혜택 보기",a.toggleButton.appendChild(a.buttonLabelEl),a.buttonBadgeEl=document.createElement("span"),a.buttonBadgeEl.className="picsel-toggle-badge",a.toggleButton.appendChild(a.buttonBadgeEl),e.appendChild(a.toggleButton),a.panelEl=document.createElement("div"),a.panelEl.className="picsel-panel",a.panelEl.id=w,a.panelEl.setAttribute("role","dialog"),a.panelEl.setAttribute("aria-hidden","true"),a.toggleButton.setAttribute("aria-controls",w);const n=document.createElement("div");n.className="picsel-panel-header",a.panelTitleEl=document.createElement("div"),a.panelTitleEl.className="picsel-panel-title",a.panelTitleEl.textContent="PicSel 혜택 정보",a.closeButtonEl=document.createElement("button"),a.closeButtonEl.type="button",a.closeButtonEl.className="picsel-close-button",a.closeButtonEl.setAttribute("aria-label","닫기"),a.closeButtonEl.textContent="✕",n.appendChild(a.panelTitleEl),n.appendChild(a.closeButtonEl),a.panelEl.appendChild(n),a.contentEl=document.createElement("div"),a.contentEl.className="picsel-panel-content",a.panelEl.appendChild(a.contentEl),e.appendChild(a.panelEl);const c=a.panelEl,o=a.hostElement;a.toggleButton.addEventListener("click",()=>{const r=!c.classList.contains("open");x(r)}),a.closeButtonEl.addEventListener("click",()=>{x(!1)}),window.addEventListener("keydown",r=>{r.key==="Escape"&&x(!1)}),document.addEventListener("click",r=>{if(!c.classList.contains("open"))return;const i=r.composedPath();o&&!i.includes(o)&&x(!1)},!0),document.body.appendChild(a.hostElement),a.mounted=!0},z=()=>{if(a.panelTitleEl&&a.cachedData?.site){const t=se(a.cachedData.site);a.panelTitleEl.textContent=`${t} 혜택 정보`}},q=t=>{a.cachedData={...t},ge(),z(),R(),x(!1)},F=t=>{if(a.cachedData={...a.cachedData??{},...t},!a.mounted){q(a.cachedData);return}z(),R()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function he(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),I.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):D.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):T.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function xe(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new I;case"amazon":return new D;case"ebay":return new T;default:return new $}}function M(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=he(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:c}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${c}`);const o=xe(n);if(console.log(`[Content] 📝 Using parser: ${o.siteName}`),!o)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;let r=o.parse(document);if(r)console.log("[Content] ✅ Parse successful:",{title:r.title?.substring(0,50),amount:r.amount,hasCardBenefits:!!r.cardBenefits});else if(console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),r=new $().parse(document),!r)return null;return{paymentInfo:r,site:n}}function be(t,e){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},n=>{n?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:n.success,savedAmount:n.savedData?.amount,savedCurrency:n.savedData?.currency}),F({...t,site:e})):console.error("[ContentScript] ❌ Background error:",{error:n?.error,message:n?.message})})}function N(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=M();if(!t){console.warn("[ContentScript] Failed to extract");return}const{paymentInfo:e,site:n}=t;console.log("[ContentScript] Extracted data:",e),q({...e,site:n}),console.log("[ContentScript] Sending to background..."),be(e,n)}function B(){const t=new MutationObserver(e=>{e.some(c=>c.addedNodes.length>0&&Array.from(c.addedNodes).some(o=>o.tagName==="IFRAME"||o instanceof Element&&o.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const c=M();if(c){const{paymentInfo:o,site:r}=c;console.log("[ContentScript] ✅ Dynamic content re-parsed:",o),F({...o,site:r}),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:o,timestamp:Date.now(),source:"dynamic-iframe"},i=>{i?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")})}},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{N(),B()}):(N(),B());
