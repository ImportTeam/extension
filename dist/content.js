import{C as ee}from"./assets/constants-4DKqSpZt.js";class F{extractNumber(e){const o=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return o?parseInt(o[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const o of n)try{const r=this.getTextBySelector(e,o);if(r)return r}catch(r){console.debug(`[${this.siteName}] Selector error: ${o}`,r)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=o.nextNode();){const i=(r.textContent||"").match(n);if(i)return console.log(`[${this.siteName}] Found price via TreeWalker: "${i[0]}"`),i[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,o=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:o||void 0}}}const N={amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",'[class*="price"]',".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price"],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]'},te=t=>{for(const e of N.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},ne=t=>{try{const e=t.querySelector(N.mainImage);if(e?.src){let o=e.src;return o.startsWith("//")&&(o="https:"+o),o=o.split("?")[0],o}const n=t.querySelector(N.thumbnailContainer);if(n){const o=n.querySelector("ul > li:first-child img");if(o){let r=o.src;if(r)return r.startsWith("//")&&(r="https:"+r),r.includes("thumbnails/remote/")&&(r=r.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),r=r.split("?")[0],r}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},oe=t=>{try{const e=[],n=new Set,o=t.querySelector(N.thumbnailContainer);if(o){const r=o.querySelectorAll("ul > li img");for(const c of r){let s=c.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s="https:"+s),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},O=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},re=t=>{let e=null,n=null,o=null;for(const r of N.amount)try{const c=t.querySelector(r);if(!c||!c.textContent)continue;const i=O(c.textContent);if(!i)continue;if(/final|discount|final-price|deal|sale/i.test(r)){o=i,e=i;break}n||(n=i),e||(e=i)}catch(c){console.debug(`[CoupangParser][Price] Selector ${r} failed`,c)}return{amount:e,originalPrice:n,discountPrice:o}},ie=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=n.nextNode();){const r=(o.textContent||"").replace(/\u00A0/g," ");for(const c of e){const i=r.match(c);if(i&&i[1]){const s=O(i[1]);if(s)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${s}`),s}}}return null},ce=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const o of e){const r=(o.textContent||"").replace(/\u00A0/g," ").trim(),c=(o.getAttribute("data-price")||"").trim(),s=`${r} ${c}`.trim().match(n);if(s&&s[1]){const l=O(s[1]);if(l)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${l}`),l}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},ae=t=>{for(const[e,n]of Object.entries(ee))if(t.includes(e))return n;return null},se=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},le=t=>{const e=[],n=t.querySelector(N.benefitBadge);if(!n)return e;const o=n.querySelectorAll("img.benefit-ico"),r=[];o.forEach(s=>{const l=s.getAttribute("src");if(l){const f=ae(l);f&&r.push(f)}});const c=n.querySelector(".benefit-label")?.textContent?.trim(),i=n.querySelector(".benefit-label-highlight")?.textContent?.trim();if(c){const s=se(c),l=r.length>0?`${r.slice(0,3).join(", ")}${r.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({cardName:l,benefit:`${c}${i?` (${i})`:""}`,rate:s})}return e},de=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const r=parseInt(n[1],10);return{rate:r,description:`기프트카드 ${r}% 할인`}}const o=t.querySelectorAll("div, span, p");for(const r of o){const c=r.textContent||"";if(c.includes("기프트카드")&&c.includes("%")){const i=c.match(/(\d+)\s*%/);if(i)return{rate:parseInt(i[1],10),description:c.trim()}}}return null},pe=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const r of e){const c=r.textContent||"",i=c.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(i&&c.includes("쿠팡캐시")){const s=O(i[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const o=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(o){const r=O(o[1]);if(r)return{amount:r,description:`쿠팡캐시 ${r.toLocaleString()} 원 적립`}}return null},ue=t=>{try{const e=[],n=new Set,o=t.querySelector(N.instantOption);if(!o)return e;const r=o.querySelectorAll("section > ul > li");for(const c of r)try{const i=c.querySelectorAll("div");if(i.length<2)continue;let s="";for(const k of i){const g=k.textContent||"";if(!g.includes("원")&&g.trim().length>0&&!g.includes("px")){s=g.trim();break}}let l="";for(const k of i){const z=(k.textContent||"").match(/[\d,]+원/);if(z){l=z[0].replace(/[,원]/g,"");break}}if(!l)continue;const f=parseInt(l);if(!f||f<100||!s||s.length<2)continue;const T=`${s}-${f}`;if(n.has(T))continue;if(e.push({name:s,price:f}),n.add(T),e.length>=15)break}catch(i){console.warn("[CoupangParser] Error parsing list item:",i);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},me=t=>t.querySelector(N.shipping)?.textContent?.trim()||null;class j extends F{siteName="Coupang";selectors={amount:N.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=te(e),o=ne(e),r=oe(e),c=re(e);let i=c.amount;const{originalPrice:s,discountPrice:l}=c;if(i||(i=ie(e)),i||(i=ce(e)),!i)return console.debug("[CoupangParser] ❌ No price found"),null;const f=le(e).map(a=>({card:a.cardName,benefit:a.benefit,discount:a.rate})),T=de(e),k=pe(e),g=me(e),z=ue(e);return console.log(`[CoupangParser] ✅ Found: ${i} KRW`),{price:i,amount:i,currency:"KRW",title:n||void 0,imageUrl:o||void 0,images:r,variants:z,originalPrice:s||void 0,discountPrice:l||void 0,cardBenefits:f,giftCardDiscount:T||void 0,cashback:k||void 0,shippingInfo:g||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const fe={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class G extends F{siteName="Amazon";selectors={amount:fe.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[AmazonParser] ❌ Invalid amount:",o),null;const r=this.extractCurrency(n),{title:c,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:c||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const ge={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class H extends F{siteName="eBay";selectors={amount:ge.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[EbayParser] ❌ Invalid amount:",o),null;const r=this.extractCurrency(n),{title:c,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:c||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const he={amount:[]};class Y extends F{siteName="Fallback";selectors={amount:he.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const o=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!o)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const r=this.extractNumber(o[1]);if(!r||!this.isValidPrice(r))return console.debug("[FallbackParser] ❌ Invalid amount:",r),null;const{title:c,imageUrl:i}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${r} KRW (via text heuristic)`),{price:r,amount:r,currency:"KRW",title:c||void 0,imageUrl:i||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const xe=`
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
`,M=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",o=new Set(["KRW","JPY"]),r={style:"currency",currency:n};let c=t;o.has(n)&&(r.minimumFractionDigits=0,r.maximumFractionDigits=0,c=Math.round(t));const i=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(i,r).format(c)},be=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),L="picsel-toggle-host",U="picsel-toggle-panel";let y=null,E=null,m=null,I=null,P=null,d=null,A=null,w=null,$=null,q=!1,x=null;const Ce=()=>{if(q)return;if(document.getElementById(L)){const o=document.getElementById(L);o&&(y=o,E=o.shadowRoot,E&&(m=E.querySelector(".picsel-toggle-button"),I=E.querySelector(".picsel-toggle-label"),P=E.querySelector(".picsel-toggle-badge"),d=E.querySelector(`#${U}`),A=E.querySelector(".picsel-close-button"),w=E.querySelector(".picsel-panel-content"))),q=!0;return}y=document.createElement("div"),y.id=L,y.style.position="fixed",y.style.bottom="24px",y.style.right="24px",y.style.zIndex=String(2147483647),E=y.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=xe,E.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",E.appendChild(e),m=document.createElement("button"),m.className="picsel-toggle-button",m.type="button",m.setAttribute("aria-expanded","false"),I=document.createElement("span"),I.className="picsel-toggle-label",I.textContent="PicSel 혜택 보기",m.appendChild(I),P=document.createElement("span"),P.className="picsel-toggle-badge",m.appendChild(P),e.appendChild(m),d=document.createElement("div"),d.className="picsel-panel",d.id=U,d.setAttribute("role","dialog"),d.setAttribute("aria-hidden","true"),m.setAttribute("aria-controls",U);const n=document.createElement("div");n.className="picsel-panel-header",$=document.createElement("div"),$.className="picsel-panel-title",$.textContent="PicSel 혜택 정보",A=document.createElement("button"),A.type="button",A.className="picsel-close-button",A.setAttribute("aria-label","닫기"),A.textContent="✕",n.appendChild($),n.appendChild(A),d.appendChild(n),w=document.createElement("div"),w.className="picsel-panel-content",d.appendChild(w),e.appendChild(d),m.addEventListener("click",()=>{const o=!d?.classList.contains("open");R(o)}),A.addEventListener("click",()=>{R(!1)}),window.addEventListener("keydown",o=>{o.key==="Escape"&&R(!1)}),document.addEventListener("click",o=>{if(!d?.classList.contains("open"))return;const r=o.composedPath();y&&!r.includes(y)&&R(!1)},!0),document.body.appendChild(y),q=!0},R=t=>{!d||!m||!I||(t?(d.classList.add("open"),d.setAttribute("aria-hidden","false"),m.setAttribute("aria-expanded","true"),I.textContent="PicSel 혜택 닫기"):(d.classList.remove("open"),d.setAttribute("aria-hidden","true"),m.setAttribute("aria-expanded","false"),I.textContent="PicSel 혜택 보기"))},K=t=>{if(!P)return;if(!t){P.style.display="none";return}const e=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>typeof o?.rate=="number"?o.rate:0).filter(o=>o>0):[];if(e.length>0){const o=Math.max(...e);P.textContent=`최대 ${o}%`,P.style.display="inline-flex";return}const n=t.cashback?.amount;if(typeof n=="number"&&n>0){const o=M(n,t.currency??"KRW");P.textContent=o?`${o} 적립`:"캐시백 혜택",P.style.display="inline-flex";return}P.style.display="none"},J=()=>{if(!w)return;if(w.textContent="",!x){const a=document.createElement("p");a.className="picsel-empty-state",a.textContent="상품 정보를 불러오는 중입니다.",w.appendChild(a),K(null);return}const t=x,e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const o=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(o){const a=document.createElement("img");a.src=o,a.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(a)}else{const a=document.createElement("span");a.textContent="No Image",a.style.fontSize="11px",a.style.color="#64748b",n.appendChild(a)}const r=document.createElement("div");r.className="picsel-product-info";const c=document.createElement("h3");c.className="picsel-product-title",c.textContent=t.title||"상품 정보를 찾을 수 없어요.";const i=document.createElement("div");i.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=M(s,t.currency??"KRW");if(l){const a=document.createElement("div");a.className="picsel-final-price",a.textContent=l,i.appendChild(a)}const f=M(t.originalPrice,t.currency??"KRW"),T=be(t.originalPrice,s);if(f&&T){const a=document.createElement("div");a.className="picsel-original-price",a.textContent=f;const p=document.createElement("div");p.className="picsel-discount-tag",p.textContent=`-${T}%`,i.appendChild(a),i.appendChild(p)}if(r.appendChild(c),r.appendChild(i),t.shippingInfo){const a=document.createElement("div");a.className="picsel-shipping",a.textContent=`배송: ${t.shippingInfo}`,r.appendChild(a)}e.appendChild(n),e.appendChild(r),w.appendChild(e);const k=Array.isArray(t.cardBenefits)?t.cardBenefits.slice(0,3):[];if(k.length>0){const a=document.createElement("section");a.className="picsel-section";const p=document.createElement("h4");p.className="picsel-section-title",p.textContent="카드 혜택 TOP",a.appendChild(p);const b=document.createElement("div");b.className="picsel-benefit-list";let v=-1,h=-1/0;k.forEach((S,D)=>{const C=S?.rate;typeof C=="number"&&C>h&&(h=C,v=D)}),k.forEach((S,D)=>{const C=document.createElement("div");C.className="picsel-benefit-item";const B=document.createElement("div");if(B.className="picsel-card-name",B.textContent=S.cardName||"제휴 카드",C.appendChild(B),S.benefit){const u=document.createElement("div");u.className="picsel-benefit-desc",u.textContent=S.benefit,C.appendChild(u)}if(D===v){const u=document.createElement("span");u.textContent="추천",u.style.marginLeft="6px",u.style.fontSize="11px",u.style.fontWeight="700",u.style.background="#393E44",u.style.color="#fff",u.style.padding="2px 6px",u.style.borderRadius="8px";const W=C.querySelector(".picsel-card-name");W&&W.appendChild(u)}b.appendChild(C)}),a.appendChild(b),w.appendChild(a)}const g=[];if(t.giftCardDiscount?.description&&g.push(`🎁 ${t.giftCardDiscount.description}`),t.cashback?.description&&g.push(`💰 ${t.cashback.description}`),g.length>0){const a=document.createElement("section");a.className="picsel-section";const p=document.createElement("h4");p.className="picsel-section-title",p.textContent="추가 혜택",a.appendChild(p);const b=document.createElement("div");b.className="picsel-extra-list",g.forEach(v=>{const h=document.createElement("div");h.className="picsel-extra-item",h.textContent=v,b.appendChild(h)}),a.appendChild(b),w.appendChild(a)}const z=Array.isArray(t.variants)?t.variants.slice(0,3):[];if(z.length>0){const a=document.createElement("section");a.className="picsel-section";const p=document.createElement("h4");p.className="picsel-section-title",p.textContent="다른 구성",a.appendChild(p);const b=document.createElement("div");b.className="picsel-variants",z.forEach(v=>{const h=document.createElement("div");h.className="picsel-variant-item";const S=document.createElement("div");S.className="picsel-variant-name",S.textContent=v.name||"옵션";const D=document.createElement("div");D.className="picsel-variant-price";const C=M(v.price,t.currency??"KRW");if(D.textContent=C||"-",h.appendChild(S),h.appendChild(D),v.discount){const B=document.createElement("div");B.className="picsel-variant-discount",B.textContent=`-${v.discount}`,h.appendChild(B)}b.appendChild(h)}),a.appendChild(b),w.appendChild(a)}K(t)},X=t=>{if(x={...t},Ce(),$&&x?.site){const e={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},n=String(x.site).toLowerCase(),o=e[n]||String(x.site);$.textContent=`${o} 혜택 정보`}J(),R(!1)},Z=t=>{if(x={...x??{},...t},!q){X(x);return}if($&&x?.site){const e={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},n=String(x.site).toLowerCase(),o=e[n]||String(x.site);$.textContent=`${o} 혜택 정보`}J()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function ye(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),j.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):G.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):H.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function Ee(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new j;case"amazon":return new G;case"ebay":return new H;default:return new Y}}function Q(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=ye(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:o}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${o}`);const r=Ee(n);if(console.log(`[Content] 📝 Using parser: ${r.siteName}`),!r)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;const c=r.parse(document);if(c)console.log("[Content] ✅ Parse successful:",{title:c.title?.substring(0,50),amount:c.amount,hasCardBenefits:!!c.cardBenefits});else return console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),new Y().parse(document);return c}function Pe(t){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},e=>{e?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:e.success,savedAmount:e.savedData?.amount,savedCurrency:e.savedData?.currency}),Z(t)):console.error("[ContentScript] ❌ Background error:",{error:e?.error,message:e?.message})})}function _(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=Q();if(!t){console.warn("[ContentScript] Failed to extract");return}console.log("[ContentScript] Extracted data:",t),X({...t,site}),console.log("[ContentScript] Sending to background..."),Pe(t)}function V(){const t=new MutationObserver(e=>{e.some(o=>o.addedNodes.length>0&&Array.from(o.addedNodes).some(r=>r.tagName==="IFRAME"||r instanceof Element&&r.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const o=Q();o&&(console.log("[ContentScript] ✅ Dynamic content re-parsed:",o),Z({...o,site}),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:o,timestamp:Date.now(),source:"dynamic-iframe"},r=>{r?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")}))},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{_(),V()}):(_(),V());
