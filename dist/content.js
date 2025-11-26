var X=Object.defineProperty;var Q=(o,r,n)=>r in o?X(o,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[r]=n;var N=(o,r,n)=>Q(o,typeof r!="symbol"?r+"":r,n);class R{extractNumber(r){const e=r.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return e?parseInt(e[1],10):null}extractCurrency(r){return r.includes("원")||r.includes("KRW")?"KRW":r.includes("$")||r.includes("USD")?"USD":r.includes("€")||r.includes("EUR")?"EUR":r.includes("¥")||r.includes("JPY")?"JPY":"KRW"}getTextBySelector(r,n){var t;const e=r.querySelector(n);return((t=e==null?void 0:e.textContent)==null?void 0:t.trim())||null}getTextBySelectors(r,n){for(const e of n)try{const t=this.getTextBySelector(r,e);if(t)return t}catch(t){console.debug(`[${this.siteName}] Selector error: ${e}`,t)}return null}isValidPrice(r){return r>100&&r<1e8}}class U extends R{constructor(){super(...arguments);N(this,"siteName","Coupang");N(this,"selectors",{amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount"]})}static isCheckoutPage(n){return/coupang\.com\/vp\//.test(n)||/coupang\.com\/n\//.test(n)||/coupang\.com\/products\//.test(n)}parse(n){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const e=this.extractTitle(n);console.log(`[CoupangParser] Title: ${e||"(not found)"}`);const t=this.extractProductImage(n);t&&console.log(`[CoupangParser] Image: ${t.substring(0,60)}...`);const a=this.extractAllProductImages(n);a.length>0&&console.log(`[CoupangParser] Additional images: ${a.length} found`);const{amount:c,originalPrice:i,discountPrice:d}=this.extractPrices(n);if(!c)return console.debug("[CoupangParser] ❌ No price found"),null;console.log(`[CoupangParser] Price: ${c} (original: ${i}, discount: ${d})`);const l=this.extractCardBenefits(n);console.log(`[CoupangParser] Card benefits: ${l.length} found`);const x=this.extractGiftCardDiscount(n);x&&console.log(`[CoupangParser] Gift card discount: ${x.rate}%`);const p=this.extractCashback(n);p&&console.log(`[CoupangParser] Cashback: ${p.amount.toLocaleString()} KRW`);const b=this.extractShippingInfo(n);console.log(`[CoupangParser] Shipping: ${b||"(not found)"}`);const m=this.extractVariants(n);return m.length>0&&console.log(`[CoupangParser] Variants: ${m.length} found`),{amount:c,currency:"KRW",confidence:.95,metadata:{source:"coupang-dom"},title:e,imageUrl:t,images:a,variants:m,originalPrice:i,discountPrice:d,cardBenefits:l,giftCardDiscount:x,cashback:p,shippingInfo:b}}catch(e){return console.error("[CoupangParser] ❌ Parse error:",e),null}}extractTitle(n){const e=[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'];for(const t of e){const a=n.querySelector(t);if(a!=null&&a.textContent)return a.textContent.trim()}return null}extractPrices(n){let e=null,t=null,a=null;const c=n.querySelector(".price-amount.sales-price-amount");c!=null&&c.textContent&&(t=this.extractNumber(c.textContent),e=t);const i=n.querySelector(".price-amount.final-price-amount");return i!=null&&i.textContent&&(a=this.extractNumber(i.textContent),a&&(e=a)),e||(e=this.searchPriceInDOM(n)),{amount:e,originalPrice:t,discountPrice:a}}extractCardBenefits(n){var l,x,p,b;const e=[],t=n.querySelector(".ccid-benefit-badge");if(!t)return console.log("[CoupangParser] 📌 No card benefit badge found"),e;const a=t.querySelectorAll("img.benefit-ico"),c=[];a.forEach(m=>{const g=m.getAttribute("src");if(g){const v=this.extractCardNameFromUrl(g);v&&c.push(v)}});const i=(x=(l=t.querySelector(".benefit-label"))==null?void 0:l.textContent)==null?void 0:x.trim(),d=(b=(p=t.querySelector(".benefit-label-highlight"))==null?void 0:p.textContent)==null?void 0:b.trim();if(i){const m=this.extractPercentage(i),g=c.length>0?`${c.slice(0,3).join(", ")}${c.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({cardName:g,benefit:`${i}${d?` (${d})`:""}`,rate:m}),console.log("[CoupangParser] ✅ Card benefit extracted:",{cards:g,benefit:i,rate:m})}return e}extractCardNameFromUrl(n){const e={shinhan:"신한카드",woori:"우리카드",bc:"BC카드",lotte:"롯데카드",kb:"KB국민카드",nh:"NH농협카드",samsung:"삼성카드","hana-sk":"하나SK카드"};for(const[t,a]of Object.entries(e))if(n.includes(t))return a;return null}extractPercentage(n){const e=n.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0}extractShippingInfo(n){var t;const e=n.querySelector('[class*="shipping"]');return((t=e==null?void 0:e.textContent)==null?void 0:t.trim())||null}searchPriceInDOM(n){const e=n.createTreeWalker(n.body,NodeFilter.SHOW_TEXT,null);let t;const a=/(\d{1,3}(?:,\d{3})*)\s*원/;for(;t=e.nextNode();){const i=(t.textContent||"").match(a);if(i)return console.log(`[CoupangParser] Found price via TreeWalker: "${i[1]}원"`),this.extractNumber(i[1])}return null}extractGiftCardDiscount(n){const t=n.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(t){const c=parseInt(t[1],10);return{rate:c,description:`기프트카드 ${c}% 할인`}}const a=n.querySelectorAll("div, span, p");for(const c of a){const i=c.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const d=i.match(/(\d+)\s*%/);if(d)return{rate:parseInt(d[1],10),description:i.trim()}}}return null}extractCashback(n){const e=n.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const c of e){const i=c.textContent||"",d=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(d&&i.includes("쿠팡캐시")){const l=this.extractNumber(d[1]);if(l)return{amount:l,description:`쿠팡캐시 ${l.toLocaleString()} 원 적립`}}}const a=n.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(a){const c=this.extractNumber(a[1]);if(c)return{amount:c,description:`쿠팡캐시 ${c.toLocaleString()} 원 적립`}}return null}extractProductImage(n){try{const e=n.querySelector("img.twc-w-full.twc-max-h-\\[546px\\]");if(e!=null&&e.src){let a=e.src;return a.startsWith("//")&&(a="https:"+a),a=a.split("?")[0],console.log("[CoupangParser] Main product image from direct selector:",a.substring(0,100)),a}const t=n.querySelector("div.twc-w-\\[70px\\]");if(t){const a=t.querySelector("ul > li:first-child img");if(a){let c=a.src;if(c)return c.startsWith("//")&&(c="https:"+c),c.includes("thumbnails/remote/")&&(c=c.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),c=c.split("?")[0],console.log("[CoupangParser] Main product image from gallery:",c.substring(0,100)),c}}return console.log("[CoupangParser] No main product image found"),null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}}extractAllProductImages(n){try{const e=[],t=new Set,a=n.querySelector("div.twc-w-\\[70px\\]");if(a){const c=a.querySelectorAll("ul > li img");console.log("[CoupangParser] Thumbnail gallery found with",c.length,"items");for(const i of c){let l=i.src;if(l&&!t.has(l)&&(l.startsWith("//")&&(l="https:"+l),l.includes("thumbnails/remote/")&&(l=l.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),l=l.split("?")[0],!t.has(l)&&(e.push(l),t.add(l),console.log("[CoupangParser] Added slide image:",l.substring(0,100)),e.length>=10)))break}}return console.log("[CoupangParser] Total product slide images collected:",e.length),e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}}extractVariants(n){try{const e=[],t=new Set,a=n.querySelector(".instant-option");if(!a)return console.log("[CoupangParser] No .instant-option found"),e;console.log("[CoupangParser] Found .instant-option section");const c=a.querySelectorAll("section > ul > li");console.log("[CoupangParser] List items in instant-option:",c.length);for(const i of c)try{const d=i.querySelectorAll("div");if(d.length<2)continue;let l="";for(const m of d){const g=m.textContent||"";if(!g.includes("원")&&g.trim().length>0&&!g.includes("px")){l=g.trim();break}}let x="";for(const m of d){const v=(m.textContent||"").match(/[\d,]+원/);if(v){x=v[0].replace(/[,원]/g,"");break}}if(!x)continue;const p=parseInt(x);if(!p||p<100||!l||l.length<2)continue;const b=`${l}-${p}`;if(t.has(b))continue;if(e.push({name:l,price:p}),t.add(b),console.log(`[CoupangParser] Added variant: ${l} - ₩${p.toLocaleString()}`),e.length>=15)break}catch(d){console.warn("[CoupangParser] Error parsing list item:",d);continue}return console.log("[CoupangParser] Total variants extracted:",e.length),e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}}}class _ extends R{constructor(){super(...arguments);N(this,"siteName","Amazon");N(this,"selectors",{amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']})}static isCheckoutPage(n){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(n)}parse(n){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let e=this.getTextBySelectors(n,this.selectors.amount);if(e||(console.log("[AmazonParser] Trying full DOM search..."),e=this.searchPriceInDOM(n)),!e)return console.debug("[AmazonParser] ❌ Amount not found"),null;const t=this.extractNumber(e);if(!t||!this.isValidPrice(t))return console.debug("[AmazonParser] ❌ Invalid amount:",t),null;const a=this.extractCurrency(e);return console.log(`[AmazonParser] ✅ Found: ${t} ${a}`),{amount:t,currency:a,confidence:.9,metadata:{source:"amazon-dom"}}}catch(e){return console.error("[AmazonParser] ❌ Parse error:",e),null}}searchPriceInDOM(n){const e=n.createTreeWalker(n.body,NodeFilter.SHOW_TEXT,null);let t;const a=/\$[\d,]+\.?\d*/;for(;t=e.nextNode();){const i=(t.textContent||"").match(a);if(i)return console.log(`[AmazonParser] Found price in text: "${i[0]}"`),i[0]}return null}}class V extends R{constructor(){super(...arguments);N(this,"siteName","eBay");N(this,"selectors",{amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']})}static isCheckoutPage(n){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(n)}parse(n){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let e=this.getTextBySelectors(n,this.selectors.amount);if(e||(console.log("[EbayParser] Trying full DOM search..."),e=this.searchPriceInDOM(n)),!e)return console.debug("[EbayParser] ❌ Amount not found"),null;const t=this.extractNumber(e);if(!t||!this.isValidPrice(t))return console.debug("[EbayParser] ❌ Invalid amount:",t),null;const a=this.extractCurrency(e);return console.log(`[EbayParser] ✅ Found: ${t} ${a}`),{amount:t,currency:a,confidence:.85,metadata:{source:"ebay-dom"}}}catch(e){return console.error("[EbayParser] ❌ Parse error:",e),null}}searchPriceInDOM(n){const e=n.createTreeWalker(n.body,NodeFilter.SHOW_TEXT,null);let t;const a=/\$[\d,]+\.?\d*/;for(;t=e.nextNode();){const i=(t.textContent||"").match(a);if(i)return console.log(`[EbayParser] Found price in text: "${i[0]}"`),i[0]}return null}}class Z extends R{constructor(){super(...arguments);N(this,"siteName","Fallback");N(this,"selectors",{amount:[]})}parse(n){var e;try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const a=(((e=n.body)==null?void 0:e.textContent)||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!a)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const c=this.extractNumber(a[1]);return!c||!this.isValidPrice(c)?(console.debug("[FallbackParser] ❌ Invalid amount:",c),null):(console.log(`[FallbackParser] ✅ Found: ${c} KRW (via text heuristic)`),{amount:c,currency:"KRW",confidence:.5,metadata:{source:"fallback-heuristic"}})}catch(t){return console.error("[FallbackParser] ❌ Parse error:",t),null}}}const W="picsel-toggle-host",M="picsel-toggle-panel";let P=null,w=null,C=null,T=null,E=null,u=null,A=null,k=null,B=!1,z=null;const F=(o,r="KRW")=>{if(typeof o!="number"||!Number.isFinite(o))return null;const n=r||"KRW",e=new Set(["KRW","JPY"]),t={style:"currency",currency:n};let a=o;e.has(n)&&(t.minimumFractionDigits=0,t.maximumFractionDigits=0,a=Math.round(o));const c=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(c,t).format(a)},ee=(o,r)=>typeof o!="number"||typeof r!="number"||o<=0||r>=o?null:Math.round((o-r)/o*100),te=()=>{if(B)return;if(document.getElementById(W)){const t=document.getElementById(W);t&&(P=t,w=t.shadowRoot,w&&(C=w.querySelector(".picsel-toggle-button"),T=w.querySelector(".picsel-toggle-label"),E=w.querySelector(".picsel-toggle-badge"),u=w.querySelector(`#${M}`),A=w.querySelector(".picsel-close-button"),k=w.querySelector(".picsel-panel-content"))),B=!0;return}P=document.createElement("div"),P.id=W,P.style.position="fixed",P.style.bottom="24px",P.style.right="24px",P.style.zIndex=String(2147483647),w=P.attachShadow({mode:"open"});const o=document.createElement("style");o.textContent=`
		:host {
			all: initial;
			position: fixed;
			inset: auto 24px 24px auto;
			z-index: 2147483647;
			font-family: 'Pretendard', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif;
		}

		*, *::before, *::after {
			box-sizing: border-box;
		}

		.picsel-toggle-container {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 12px;
			color: #0f172a;
			font-size: 14px;
			font-weight: 500;
		}

		.picsel-toggle-button {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			padding: 12px 20px;
			border-radius: 999px;
			border: none;
			cursor: pointer;
			background: linear-gradient(135deg, #2563eb, #38bdf8);
			color: #ffffff;
			box-shadow: 0 10px 24px rgba(37, 99, 235, 0.35);
			font-weight: 600;
			font-size: 15px;
			transition: transform 0.2s ease, box-shadow 0.2s ease;
		}

		.picsel-toggle-button:hover {
			transform: translateY(-1px);
			box-shadow: 0 14px 32px rgba(37, 99, 235, 0.4);
		}

		.picsel-toggle-button:active {
			transform: translateY(0);
			box-shadow: 0 8px 18px rgba(37, 99, 235, 0.32);
		}

		.picsel-toggle-label {
			white-space: nowrap;
			font-size: 15px;
		}

		.picsel-toggle-badge {
			display: none;
			align-items: center;
			justify-content: center;
			font-size: 13px;
			font-weight: 600;
			padding: 2px 8px;
			border-radius: 999px;
			background: rgba(255, 255, 255, 0.2);
			border: 1px solid rgba(255, 255, 255, 0.3);
		}

		.picsel-panel {
			width: 360px;
			max-height: 78vh;
			background: #ffffff;
			border-radius: 16px;
			box-shadow: 0 24px 48px rgba(15, 23, 42, 0.32);
			border: 1px solid rgba(148, 163, 184, 0.18);
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
			padding: 16px;
			background: linear-gradient(135deg, #111827, #1f2937);
			color: #f8fafc;
		}

		.picsel-panel-title {
			font-size: 14px;
			font-weight: 600;
		}

		.picsel-close-button {
			width: 28px;
			height: 28px;
			border-radius: 999px;
			border: none;
			background: rgba(255, 255, 255, 0.15);
			color: #f8fafc;
			font-size: 14px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: background 0.2s ease;
		}

		.picsel-close-button:hover {
			background: rgba(255, 255, 255, 0.28);
		}

		.picsel-panel-content {
			padding: 20px;
			display: flex;
			flex-direction: column;
			gap: 18px;
			overflow-y: auto;
		}

		.picsel-empty-state {
			font-size: 13px;
			color: #475569;
			text-align: center;
		}

		.picsel-product {
			display: flex;
			gap: 16px;
		}

		.picsel-product-thumb {
			width: 96px;
			height: 96px;
			border-radius: 12px;
			overflow: hidden;
			background: #e2e8f0;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
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
			gap: 10px;
		}

		.picsel-product-title {
			font-size: 15px;
			font-weight: 600;
			color: #111827;
			line-height: 1.4;
			margin: 0;
		}

		.picsel-price {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-original-price {
			font-size: 13px;
			color: #94a3b8;
			text-decoration: line-through;
		}

		.picsel-final-price {
			font-size: 20px;
			font-weight: 700;
			color: #1f2937;
		}

		.picsel-discount-tag {
			width: fit-content;
			padding: 2px 8px;
			border-radius: 999px;
			background: rgba(16, 185, 129, 0.16);
			color: #0f766e;
			font-size: 12px;
			font-weight: 600;
		}

		.picsel-section {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-section-title {
			font-size: 14px;
			font-weight: 600;
			color: #0f172a;
		}

		.picsel-benefit-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.picsel-benefit-item {
			padding: 12px 14px;
			border-radius: 12px;
			background: #f8fafc;
			border: 1px solid rgba(148, 163, 184, 0.24);
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
			color: #475569;
		}

		.picsel-extra-list {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-extra-item {
			font-size: 13px;
			color: #1d4ed8;
			background: rgba(191, 219, 254, 0.4);
			border: 1px solid rgba(147, 197, 253, 0.7);
			padding: 8px 10px;
			border-radius: 10px;
		}

		.picsel-shipping {
			font-size: 12px;
			color: #475569;
			display: flex;
			gap: 6px;
			align-items: center;
		}

		.picsel-variants {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.picsel-variant-item {
			display: flex;
			justify-content: space-between;
			padding: 10px 12px;
			border-radius: 10px;
			background: #f1f5f9;
			font-size: 12px;
			color: #0f172a;
			border: 1px solid rgba(148, 163, 184, 0.24);
			gap: 12px;
		}

		.picsel-variant-name {
			font-weight: 500;
		}

		.picsel-variant-price {
			font-weight: 600;
			color: #1f2937;
		}

		.picsel-variant-discount {
			color: #0f766e;
		}

		::-webkit-scrollbar {
			width: 6px;
		}

		::-webkit-scrollbar-thumb {
			background: rgba(15, 23, 42, 0.2);
			border-radius: 999px;
		}

		::-webkit-scrollbar-track {
			background: transparent;
		}
	`,w.appendChild(o);const r=document.createElement("div");r.className="picsel-toggle-container",w.appendChild(r),C=document.createElement("button"),C.className="picsel-toggle-button",C.type="button",C.setAttribute("aria-expanded","false"),T=document.createElement("span"),T.className="picsel-toggle-label",T.textContent="PicSel 혜택 보기",C.appendChild(T),E=document.createElement("span"),E.className="picsel-toggle-badge",C.appendChild(E),r.appendChild(C),u=document.createElement("div"),u.className="picsel-panel",u.id=M,u.setAttribute("role","dialog"),u.setAttribute("aria-hidden","true"),C.setAttribute("aria-controls",M);const n=document.createElement("div");n.className="picsel-panel-header";const e=document.createElement("div");e.className="picsel-panel-title",e.textContent="PicSel 혜택 정보",A=document.createElement("button"),A.type="button",A.className="picsel-close-button",A.setAttribute("aria-label","닫기"),A.textContent="✕",n.appendChild(e),n.appendChild(A),u.appendChild(n),k=document.createElement("div"),k.className="picsel-panel-content",u.appendChild(k),r.appendChild(u),C.addEventListener("click",()=>{const t=!(u!=null&&u.classList.contains("open"));D(t)}),A.addEventListener("click",()=>{D(!1)}),window.addEventListener("keydown",t=>{t.key==="Escape"&&D(!1)}),document.addEventListener("click",t=>{if(!(u!=null&&u.classList.contains("open")))return;const a=t.composedPath();P&&!a.includes(P)&&D(!1)},!0),document.body.appendChild(P),B=!0},D=o=>{!u||!C||!T||(o?(u.classList.add("open"),u.setAttribute("aria-hidden","false"),C.setAttribute("aria-expanded","true"),T.textContent="PicSel 혜택 닫기"):(u.classList.remove("open"),u.setAttribute("aria-hidden","true"),C.setAttribute("aria-expanded","false"),T.textContent="PicSel 혜택 보기"))},O=o=>{var e;if(!E)return;if(!o){E.style.display="none";return}const r=Array.isArray(o.cardBenefits)?o.cardBenefits.map(t=>typeof(t==null?void 0:t.rate)=="number"?t.rate:0).filter(t=>t>0):[];if(r.length>0){const t=Math.max(...r);E.textContent=`최대 ${t}%`,E.style.display="inline-flex";return}const n=(e=o.cashback)==null?void 0:e.amount;if(typeof n=="number"&&n>0){const t=F(n,o.currency??"KRW");E.textContent=t?`${t} 적립`:"캐시백 혜택",E.style.display="inline-flex";return}E.style.display="none"},j=()=>{var g,v;if(!k)return;if(k.textContent="",!z){const s=document.createElement("p");s.className="picsel-empty-state",s.textContent="상품 정보를 불러오는 중입니다.",k.appendChild(s),O(null);return}const o=z,r=document.createElement("div");r.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const e=o.imageUrl||Array.isArray(o.images)&&o.images[0]||null;if(e){const s=document.createElement("img");s.src=e,s.alt=o.title?`${o.title} 이미지`:"상품 이미지",n.appendChild(s)}else{const s=document.createElement("span");s.textContent="No Image",s.style.fontSize="11px",s.style.color="#64748b",n.appendChild(s)}const t=document.createElement("div");t.className="picsel-product-info";const a=document.createElement("h3");a.className="picsel-product-title",a.textContent=o.title||"상품 정보를 찾을 수 없어요.";const c=document.createElement("div");c.className="picsel-price";const i=typeof o.discountPrice=="number"&&o.discountPrice>0?o.discountPrice:o.amount,d=F(i,o.currency??"KRW");if(d){const s=document.createElement("div");s.className="picsel-final-price",s.textContent=d,c.appendChild(s)}const l=F(o.originalPrice,o.currency??"KRW"),x=ee(o.originalPrice,i);if(l&&x){const s=document.createElement("div");s.className="picsel-original-price",s.textContent=l;const f=document.createElement("div");f.className="picsel-discount-tag",f.textContent=`-${x}%`,c.appendChild(s),c.appendChild(f)}if(t.appendChild(a),t.appendChild(c),o.shippingInfo){const s=document.createElement("div");s.className="picsel-shipping",s.textContent=`배송: ${o.shippingInfo}`,t.appendChild(s)}r.appendChild(n),r.appendChild(t),k.appendChild(r);const p=Array.isArray(o.cardBenefits)?o.cardBenefits.slice(0,3):[];if(p.length>0){const s=document.createElement("section");s.className="picsel-section";const f=document.createElement("h4");f.className="picsel-section-title",f.textContent="카드 혜택 TOP",s.appendChild(f);const y=document.createElement("div");y.className="picsel-benefit-list",p.forEach(S=>{const h=document.createElement("div");h.className="picsel-benefit-item";const $=document.createElement("div");if($.className="picsel-card-name",$.textContent=S.cardName||"제휴 카드",h.appendChild($),S.benefit){const I=document.createElement("div");I.className="picsel-benefit-desc",I.textContent=S.benefit,h.appendChild(I)}y.appendChild(h)}),s.appendChild(y),k.appendChild(s)}const b=[];if((g=o.giftCardDiscount)!=null&&g.description&&b.push(`🎁 ${o.giftCardDiscount.description}`),(v=o.cashback)!=null&&v.description&&b.push(`💰 ${o.cashback.description}`),b.length>0){const s=document.createElement("section");s.className="picsel-section";const f=document.createElement("h4");f.className="picsel-section-title",f.textContent="추가 혜택",s.appendChild(f);const y=document.createElement("div");y.className="picsel-extra-list",b.forEach(S=>{const h=document.createElement("div");h.className="picsel-extra-item",h.textContent=S,y.appendChild(h)}),s.appendChild(y),k.appendChild(s)}const m=Array.isArray(o.variants)?o.variants.slice(0,3):[];if(m.length>0){const s=document.createElement("section");s.className="picsel-section";const f=document.createElement("h4");f.className="picsel-section-title",f.textContent="다른 구성",s.appendChild(f);const y=document.createElement("div");y.className="picsel-variants",m.forEach(S=>{const h=document.createElement("div");h.className="picsel-variant-item";const $=document.createElement("div");$.className="picsel-variant-name",$.textContent=S.name||"옵션";const I=document.createElement("div");I.className="picsel-variant-price";const J=F(S.price,o.currency??"KRW");if(I.textContent=J||"-",h.appendChild($),h.appendChild(I),S.discount){const q=document.createElement("div");q.className="picsel-variant-discount",q.textContent=S.discount,h.appendChild(q)}y.appendChild(h)}),s.appendChild(y),k.appendChild(s)}O(o)},H=o=>{z={...o},te(),j(),D(!1)},Y=o=>{if(z={...z??{},...o},!B){H(z);return}j()};if(window.self!==window.top){const o=window.location.href,r=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:o,host:r,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function ne(){const o=window.location.href;return U.isCheckoutPage(o)?{site:"coupang",isCheckout:!0}:_.isCheckoutPage(o)?{site:"amazon",isCheckout:!0}:V.isCheckoutPage(o)?{site:"ebay",isCheckout:!0}:{site:"unknown",isCheckout:!1}}function oe(o){switch(o){case"coupang":return new U;case"amazon":return new _;case"ebay":return new V;default:return null}}function G(){const{site:o,isCheckout:r}=ne();if(!r)return console.log("[ContentScript] Not a checkout page"),null;console.log(`[ContentScript] Checkout detected: ${o}`);const n=oe(o);if(n){const t=n.parse(document);if(t)return t}return console.log("[ContentScript] Trying fallback..."),new Z().parse(document)}function re(o){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:o,url:window.location.href,timestamp:Date.now()},r=>{var n,e;r!=null&&r.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:r.success,savedAmount:(n=r.savedData)==null?void 0:n.amount,savedCurrency:(e=r.savedData)==null?void 0:e.currency}),Y(o)):console.error("[ContentScript] ❌ Background error:",{error:r==null?void 0:r.error,message:r==null?void 0:r.message})})}function K(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const o=G();if(!o){console.warn("[ContentScript] Failed to extract");return}console.log("[ContentScript] Extracted data:",o),H(o),console.log("[ContentScript] Sending to background..."),re(o)}function L(){const o=new MutationObserver(r=>{r.some(e=>e.addedNodes.length>0&&Array.from(e.addedNodes).some(t=>t.tagName==="IFRAME"||t instanceof Element&&t.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const e=G();e&&(console.log("[ContentScript] ✅ Dynamic content re-parsed:",e),Y(e),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:e,timestamp:Date.now(),source:"dynamic-iframe"},t=>{t!=null&&t.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")}))},500),o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{K(),L()}):(K(),L());
