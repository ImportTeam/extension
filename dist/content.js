import{C as X}from"./assets/constants-4DKqSpZt.js";class R{extractNumber(e){const o=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return o?parseInt(o[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const o of n)try{const r=this.getTextBySelector(e,o);if(r)return r}catch(r){console.debug(`[${this.siteName}] Selector error: ${o}`,r)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=o.nextNode();){const a=(r.textContent||"").match(n);if(a)return console.log(`[${this.siteName}] Found price via TreeWalker: "${a[0]}"`),a[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,o=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:o||void 0}}}const v={amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount"],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]'},Z=t=>{for(const e of v.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Q=t=>{try{const e=t.querySelector(v.mainImage);if(e?.src){let o=e.src;return o.startsWith("//")&&(o="https:"+o),o=o.split("?")[0],o}const n=t.querySelector(v.thumbnailContainer);if(n){const o=n.querySelector("ul > li:first-child img");if(o){let r=o.src;if(r)return r.startsWith("//")&&(r="https:"+r),r.includes("thumbnails/remote/")&&(r=r.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),r=r.split("?")[0],r}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},ee=t=>{try{const e=[],n=new Set,o=t.querySelector(v.thumbnailContainer);if(o){const r=o.querySelectorAll("ul > li img");for(const c of r){let s=c.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s="https:"+s),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},D=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},te=t=>{let e=null,n=null,o=null;const r=t.querySelector(".price-amount.sales-price-amount");r?.textContent&&(n=D(r.textContent),e=n);const c=t.querySelector(".price-amount.final-price-amount");return c?.textContent&&(o=D(c.textContent),o&&(e=o)),{amount:e,originalPrice:n,discountPrice:o}},ne=t=>{const e=/(\d{1,3}(?:,\d{3})*)\s*원/,n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=n.nextNode();){const c=(o.textContent||"").match(e);if(c)return D(c[1])}return null},oe=t=>{for(const[e,n]of Object.entries(X))if(t.includes(e))return n;return null},re=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},ie=t=>{const e=[],n=t.querySelector(v.benefitBadge);if(!n)return e;const o=n.querySelectorAll("img.benefit-ico"),r=[];o.forEach(s=>{const m=s.getAttribute("src");if(m){const g=oe(m);g&&r.push(g)}});const c=n.querySelector(".benefit-label")?.textContent?.trim(),a=n.querySelector(".benefit-label-highlight")?.textContent?.trim();if(c){const s=re(c),m=r.length>0?`${r.slice(0,3).join(", ")}${r.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({cardName:m,benefit:`${c}${a?` (${a})`:""}`,rate:s})}return e},ce=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const r=parseInt(n[1],10);return{rate:r,description:`기프트카드 ${r}% 할인`}}const o=t.querySelectorAll("div, span, p");for(const r of o){const c=r.textContent||"";if(c.includes("기프트카드")&&c.includes("%")){const a=c.match(/(\d+)\s*%/);if(a)return{rate:parseInt(a[1],10),description:c.trim()}}}return null},ae=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const r of e){const c=r.textContent||"",a=c.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(a&&c.includes("쿠팡캐시")){const s=D(a[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const o=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(o){const r=D(o[1]);if(r)return{amount:r,description:`쿠팡캐시 ${r.toLocaleString()} 원 적립`}}return null},se=t=>{try{const e=[],n=new Set,o=t.querySelector(v.instantOption);if(!o)return e;const r=o.querySelectorAll("section > ul > li");for(const c of r)try{const a=c.querySelectorAll("div");if(a.length<2)continue;let s="";for(const w of a){const h=w.textContent||"";if(!h.includes("원")&&h.trim().length>0&&!h.includes("px")){s=h.trim();break}}let m="";for(const w of a){const N=(w.textContent||"").match(/[\d,]+원/);if(N){m=N[0].replace(/[,원]/g,"");break}}if(!m)continue;const g=parseInt(m);if(!g||g<100||!s||s.length<2)continue;const S=`${s}-${g}`;if(n.has(S))continue;if(e.push({name:s,price:g}),n.add(S),e.length>=15)break}catch(a){console.warn("[CoupangParser] Error parsing list item:",a);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},le=t=>t.querySelector(v.shipping)?.textContent?.trim()||null;class W extends R{siteName="Coupang";selectors={amount:v.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=Z(e),o=Q(e),r=ee(e),c=te(e);let a=c.amount;const{originalPrice:s,discountPrice:m}=c;if(a||(a=ne(e)),!a)return console.debug("[CoupangParser] ❌ No price found"),null;const g=ie(e).map(i=>({card:i.cardName,benefit:i.benefit,discount:i.rate})),S=ce(e),w=ae(e),h=le(e),N=se(e);return console.log(`[CoupangParser] ✅ Found: ${a} KRW`),{price:a,amount:a,currency:"KRW",title:n||void 0,imageUrl:o||void 0,images:r,variants:N,originalPrice:s||void 0,discountPrice:m||void 0,cardBenefits:g,giftCardDiscount:S||void 0,cashback:w||void 0,shippingInfo:h||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const de={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class K extends R{siteName="Amazon";selectors={amount:de.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[AmazonParser] ❌ Invalid amount:",o),null;const r=this.extractCurrency(n),{title:c,imageUrl:a}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:c||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const ue={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class _ extends R{siteName="eBay";selectors={amount:ue.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[EbayParser] ❌ Invalid amount:",o),null;const r=this.extractCurrency(n),{title:c,imageUrl:a}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:c||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const pe={amount:[]};class V extends R{siteName="Fallback";selectors={amount:pe.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const o=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!o)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const r=this.extractNumber(o[1]);if(!r||!this.isValidPrice(r))return console.debug("[FallbackParser] ❌ Invalid amount:",r),null;const{title:c,imageUrl:a}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${r} KRW (via text heuristic)`),{price:r,amount:r,currency:"KRW",title:c||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const me=`
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
			background: #111827; /* Gray-900 */
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
`,z=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",o=new Set(["KRW","JPY"]),r={style:"currency",currency:n};let c=t;o.has(n)&&(r.minimumFractionDigits=0,r.maximumFractionDigits=0,c=Math.round(t));const a=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(a,r).format(c)},fe=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),M="picsel-toggle-host",q="picsel-toggle-panel";let x=null,b=null,f=null,k=null,C=null,d=null,P=null,y=null,B=!1,T=null;const ge=()=>{if(B)return;if(document.getElementById(M)){const r=document.getElementById(M);r&&(x=r,b=r.shadowRoot,b&&(f=b.querySelector(".picsel-toggle-button"),k=b.querySelector(".picsel-toggle-label"),C=b.querySelector(".picsel-toggle-badge"),d=b.querySelector(`#${q}`),P=b.querySelector(".picsel-close-button"),y=b.querySelector(".picsel-panel-content"))),B=!0;return}x=document.createElement("div"),x.id=M,x.style.position="fixed",x.style.bottom="24px",x.style.right="24px",x.style.zIndex=String(2147483647),b=x.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=me,b.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",b.appendChild(e),f=document.createElement("button"),f.className="picsel-toggle-button",f.type="button",f.setAttribute("aria-expanded","false"),k=document.createElement("span"),k.className="picsel-toggle-label",k.textContent="PicSel 혜택 보기",f.appendChild(k),C=document.createElement("span"),C.className="picsel-toggle-badge",f.appendChild(C),e.appendChild(f),d=document.createElement("div"),d.className="picsel-panel",d.id=q,d.setAttribute("role","dialog"),d.setAttribute("aria-hidden","true"),f.setAttribute("aria-controls",q);const n=document.createElement("div");n.className="picsel-panel-header";const o=document.createElement("div");o.className="picsel-panel-title",o.textContent="PicSel 혜택 정보",P=document.createElement("button"),P.type="button",P.className="picsel-close-button",P.setAttribute("aria-label","닫기"),P.textContent="✕",n.appendChild(o),n.appendChild(P),d.appendChild(n),y=document.createElement("div"),y.className="picsel-panel-content",d.appendChild(y),e.appendChild(d),f.addEventListener("click",()=>{const r=!d?.classList.contains("open");$(r)}),P.addEventListener("click",()=>{$(!1)}),window.addEventListener("keydown",r=>{r.key==="Escape"&&$(!1)}),document.addEventListener("click",r=>{if(!d?.classList.contains("open"))return;const c=r.composedPath();x&&!c.includes(x)&&$(!1)},!0),document.body.appendChild(x),B=!0},$=t=>{!d||!f||!k||(t?(d.classList.add("open"),d.setAttribute("aria-hidden","false"),f.setAttribute("aria-expanded","true"),k.textContent="PicSel 혜택 닫기"):(d.classList.remove("open"),d.setAttribute("aria-hidden","true"),f.setAttribute("aria-expanded","false"),k.textContent="PicSel 혜택 보기"))},F=t=>{if(!C)return;if(!t){C.style.display="none";return}const e=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>typeof o?.rate=="number"?o.rate:0).filter(o=>o>0):[];if(e.length>0){const o=Math.max(...e);C.textContent=`최대 ${o}%`,C.style.display="inline-flex";return}const n=t.cashback?.amount;if(typeof n=="number"&&n>0){const o=z(n,t.currency??"KRW");C.textContent=o?`${o} 적립`:"캐시백 혜택",C.style.display="inline-flex";return}C.style.display="none"},j=()=>{if(!y)return;if(y.textContent="",!T){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",y.appendChild(i),F(null);return}const t=T,e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const o=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(o){const i=document.createElement("img");i.src=o,i.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(i)}else{const i=document.createElement("span");i.textContent="No Image",i.style.fontSize="11px",i.style.color="#64748b",n.appendChild(i)}const r=document.createElement("div");r.className="picsel-product-info";const c=document.createElement("h3");c.className="picsel-product-title",c.textContent=t.title||"상품 정보를 찾을 수 없어요.";const a=document.createElement("div");a.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,m=z(s,t.currency??"KRW");if(m){const i=document.createElement("div");i.className="picsel-final-price",i.textContent=m,a.appendChild(i)}const g=z(t.originalPrice,t.currency??"KRW"),S=fe(t.originalPrice,s);if(g&&S){const i=document.createElement("div");i.className="picsel-original-price",i.textContent=g;const l=document.createElement("div");l.className="picsel-discount-tag",l.textContent=`-${S}%`,a.appendChild(i),a.appendChild(l)}if(r.appendChild(c),r.appendChild(a),t.shippingInfo){const i=document.createElement("div");i.className="picsel-shipping",i.textContent=`배송: ${t.shippingInfo}`,r.appendChild(i)}e.appendChild(n),e.appendChild(r),y.appendChild(e);const w=Array.isArray(t.cardBenefits)?t.cardBenefits.slice(0,3):[];if(w.length>0){const i=document.createElement("section");i.className="picsel-section";const l=document.createElement("h4");l.className="picsel-section-title",l.textContent="카드 혜택 TOP",i.appendChild(l);const u=document.createElement("div");u.className="picsel-benefit-list",w.forEach(E=>{const p=document.createElement("div");p.className="picsel-benefit-item";const A=document.createElement("div");if(A.className="picsel-card-name",A.textContent=E.cardName||"제휴 카드",p.appendChild(A),E.benefit){const I=document.createElement("div");I.className="picsel-benefit-desc",I.textContent=E.benefit,p.appendChild(I)}u.appendChild(p)}),i.appendChild(u),y.appendChild(i)}const h=[];if(t.giftCardDiscount?.description&&h.push(`🎁 ${t.giftCardDiscount.description}`),t.cashback?.description&&h.push(`💰 ${t.cashback.description}`),h.length>0){const i=document.createElement("section");i.className="picsel-section";const l=document.createElement("h4");l.className="picsel-section-title",l.textContent="추가 혜택",i.appendChild(l);const u=document.createElement("div");u.className="picsel-extra-list",h.forEach(E=>{const p=document.createElement("div");p.className="picsel-extra-item",p.textContent=E,u.appendChild(p)}),i.appendChild(u),y.appendChild(i)}const N=Array.isArray(t.variants)?t.variants.slice(0,3):[];if(N.length>0){const i=document.createElement("section");i.className="picsel-section";const l=document.createElement("h4");l.className="picsel-section-title",l.textContent="다른 구성",i.appendChild(l);const u=document.createElement("div");u.className="picsel-variants",N.forEach(E=>{const p=document.createElement("div");p.className="picsel-variant-item";const A=document.createElement("div");A.className="picsel-variant-name",A.textContent=E.name||"옵션";const I=document.createElement("div");I.className="picsel-variant-price";const J=z(E.price,t.currency??"KRW");if(I.textContent=J||"-",p.appendChild(A),p.appendChild(I),E.discount){const O=document.createElement("div");O.className="picsel-variant-discount",O.textContent=`-${E.discount}`,p.appendChild(O)}u.appendChild(p)}),i.appendChild(u),y.appendChild(i)}if(d){const i=document.createElement("div");i.className="picsel-panel-footer";const l=document.createElement("button");l.className="picsel-cta-button",l.textContent="결제시 쿠폰 적용",l.onclick=()=>{const u=t.url||window.location.href;u&&window.open(u,"_blank")},i.appendChild(l),d.appendChild(i)}F(t)},G=t=>{T={...t},ge(),j(),$(!1)},H=t=>{if(T={...T??{},...t},!B){G(T);return}j()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function he(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),W.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):K.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):_.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function xe(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new W;case"amazon":return new K;case"ebay":return new _;default:return new V}}function Y(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=he(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:o}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${o}`);const r=xe(n);if(console.log(`[Content] 📝 Using parser: ${r.siteName}`),!r)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;const c=r.parse(document);if(c)console.log("[Content] ✅ Parse successful:",{title:c.title?.substring(0,50),amount:c.amount,hasCardBenefits:!!c.cardBenefits});else return console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),new V().parse(document);return c}function be(t){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},e=>{e?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:e.success,savedAmount:e.savedData?.amount,savedCurrency:e.savedData?.currency}),H(t)):console.error("[ContentScript] ❌ Background error:",{error:e?.error,message:e?.message})})}function U(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=Y();if(!t){console.warn("[ContentScript] Failed to extract");return}console.log("[ContentScript] Extracted data:",t),G(t),console.log("[ContentScript] Sending to background..."),be(t)}function L(){const t=new MutationObserver(e=>{e.some(o=>o.addedNodes.length>0&&Array.from(o.addedNodes).some(r=>r.tagName==="IFRAME"||r instanceof Element&&r.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const o=Y();o&&(console.log("[ContentScript] ✅ Dynamic content re-parsed:",o),H(o),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:o,timestamp:Date.now(),source:"dynamic-iframe"},r=>{r?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")}))},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{U(),L()}):(U(),L());
