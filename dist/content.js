var Q=Object.defineProperty;var ee=(t,e,n)=>e in t?Q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var S=(t,e,n)=>ee(t,typeof e!="symbol"?e+"":e,n);class M{extractNumber(e){const r=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return r?parseInt(r[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){var o;const r=e.querySelector(n);return((o=r==null?void 0:r.textContent)==null?void 0:o.trim())||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){console.debug(`[${this.siteName}] Selector error: ${r}`,o)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const r=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=r.nextNode();){const a=(o.textContent||"").match(n);if(a)return console.log(`[${this.siteName}] Found price via TreeWalker: "${a[0]}"`),a[0]}return null}extractMetaContent(e,n){const r=e.querySelector(`meta[property="${n}"], meta[name="${n}"]`);return(r==null?void 0:r.getAttribute("content"))||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const A={amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount"],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]'},te=t=>{for(const e of A.title){const n=t.querySelector(e);if(n!=null&&n.textContent)return n.textContent.trim()}return null},ne=t=>{try{const e=t.querySelector(A.mainImage);if(e!=null&&e.src){let r=e.src;return r.startsWith("//")&&(r="https:"+r),r=r.split("?")[0],r}const n=t.querySelector(A.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o="https:"+o),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},oe=t=>{try{const e=[],n=new Set,r=t.querySelector(A.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let c=i.src;if(c&&!n.has(c)&&(c.startsWith("//")&&(c="https:"+c),c.includes("thumbnails/remote/")&&(c=c.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),c=c.split("?")[0],!n.has(c)&&(e.push(c),n.add(c),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},R=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},re=t=>{let e=null,n=null,r=null;const o=t.querySelector(".price-amount.sales-price-amount");o!=null&&o.textContent&&(n=R(o.textContent),e=n);const i=t.querySelector(".price-amount.final-price-amount");return i!=null&&i.textContent&&(r=R(i.textContent),r&&(e=r)),{amount:e,originalPrice:n,discountPrice:r}},ie=t=>{const e=/(\d{1,3}(?:,\d{3})*)\s*원/,n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const i=(r.textContent||"").match(e);if(i)return R(i[1])}return null},ce=t=>{const e={shinhan:"신한카드",woori:"우리카드",bc:"BC카드",lotte:"롯데카드",kb:"KB국민카드",nh:"NH농협카드",samsung:"삼성카드","hana-sk":"하나SK카드"};for(const[n,r]of Object.entries(e))if(t.includes(n))return r;return null},ae=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},se=t=>{var c,m,g,w;const e=[],n=t.querySelector(A.benefitBadge);if(!n)return e;const r=n.querySelectorAll("img.benefit-ico"),o=[];r.forEach(h=>{const d=h.getAttribute("src");if(d){const P=ce(d);P&&o.push(P)}});const i=(m=(c=n.querySelector(".benefit-label"))==null?void 0:c.textContent)==null?void 0:m.trim(),a=(w=(g=n.querySelector(".benefit-label-highlight"))==null?void 0:g.textContent)==null?void 0:w.trim();if(i){const h=ae(i),d=o.length>0?`${o.slice(0,3).join(", ")}${o.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({cardName:d,benefit:`${i}${a?` (${a})`:""}`,rate:h})}return e},le=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const a=i.match(/(\d+)\s*%/);if(a)return{rate:parseInt(a[1],10),description:i.trim()}}}return null},de=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",a=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(a&&i.includes("쿠팡캐시")){const c=R(a[1]);if(c)return{amount:c,description:`쿠팡캐시 ${c.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=R(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},ue=t=>{try{const e=[],n=new Set,r=t.querySelector(A.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const a=i.querySelectorAll("div");if(a.length<2)continue;let c="";for(const h of a){const d=h.textContent||"";if(!d.includes("원")&&d.trim().length>0&&!d.includes("px")){c=d.trim();break}}let m="";for(const h of a){const P=(h.textContent||"").match(/[\d,]+원/);if(P){m=P[0].replace(/[,원]/g,"");break}}if(!m)continue;const g=parseInt(m);if(!g||g<100||!c||c.length<2)continue;const w=`${c}-${g}`;if(n.has(w))continue;if(e.push({name:c,price:g}),n.add(w),e.length>=15)break}catch(a){console.warn("[CoupangParser] Error parsing list item:",a);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},pe=t=>{var n;const e=t.querySelector(A.shipping);return((n=e==null?void 0:e.textContent)==null?void 0:n.trim())||null};class j extends M{constructor(){super(...arguments);S(this,"siteName","Coupang");S(this,"selectors",{amount:A.amount})}static isCheckoutPage(n){return/coupang\.com\/vp\//.test(n)||/coupang\.com\/n\//.test(n)||/coupang\.com\/products\//.test(n)}parse(n){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const r=te(n),o=ne(n),i=oe(n),a=re(n);let c=a.amount;const{originalPrice:m,discountPrice:g}=a;if(c||(c=ie(n)),!c)return console.debug("[CoupangParser] ❌ No price found"),null;const w=se(n).map(z=>({card:z.cardName,benefit:z.benefit,discount:z.rate})),h=le(n),d=de(n),P=pe(n),B=ue(n);return console.log(`[CoupangParser] ✅ Found: ${c} KRW`),{price:c,amount:c,currency:"KRW",title:r||void 0,imageUrl:o||void 0,images:i,variants:B,originalPrice:m||void 0,discountPrice:g||void 0,cardBenefits:w,giftCardDiscount:h||void 0,cashback:d||void 0,shippingInfo:P||void 0,discounts:[]}}catch(r){return console.error("[CoupangParser] ❌ Parse error:",r),null}}}const me={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class V extends M{constructor(){super(...arguments);S(this,"siteName","Amazon");S(this,"selectors",{amount:me.amount})}static isCheckoutPage(n){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(n)}parse(n){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let r=this.getTextBySelectors(n,this.selectors.amount);if(r||(console.log("[AmazonParser] Trying full DOM search..."),r=this.searchPriceInDOM(n,/\$[\d,]+\.?\d*/)),!r)return console.debug("[AmazonParser] ❌ Amount not found"),null;const o=this.extractNumber(r);if(!o||!this.isValidPrice(o))return console.debug("[AmazonParser] ❌ Invalid amount:",o),null;const i=this.extractCurrency(r),{title:a,imageUrl:c}=this.extractCommonInfo(n);return console.log(`[AmazonParser] ✅ Found: ${o} ${i}`),{price:o,amount:o,currency:i,title:a||void 0,imageUrl:c||void 0,discounts:[]}}catch(r){return console.error("[AmazonParser] ❌ Parse error:",r),null}}}const fe={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class H extends M{constructor(){super(...arguments);S(this,"siteName","eBay");S(this,"selectors",{amount:fe.amount})}static isCheckoutPage(n){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(n)}parse(n){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let r=this.getTextBySelectors(n,this.selectors.amount);if(r||(console.log("[EbayParser] Trying full DOM search..."),r=this.searchPriceInDOM(n,/\$[\d,]+\.?\d*/)),!r)return console.debug("[EbayParser] ❌ Amount not found"),null;const o=this.extractNumber(r);if(!o||!this.isValidPrice(o))return console.debug("[EbayParser] ❌ Invalid amount:",o),null;const i=this.extractCurrency(r),{title:a,imageUrl:c}=this.extractCommonInfo(n);return console.log(`[EbayParser] ✅ Found: ${o} ${i}`),{price:o,amount:o,currency:i,title:a||void 0,imageUrl:c||void 0,discounts:[]}}catch(r){return console.error("[EbayParser] ❌ Parse error:",r),null}}}const ge={amount:[]};class he extends M{constructor(){super(...arguments);S(this,"siteName","Fallback");S(this,"selectors",{amount:ge.amount})}parse(n){var r;try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const i=(((r=n.body)==null?void 0:r.textContent)||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!i)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const a=this.extractNumber(i[1]);if(!a||!this.isValidPrice(a))return console.debug("[FallbackParser] ❌ Invalid amount:",a),null;const{title:c,imageUrl:m}=this.extractCommonInfo(n);return console.log(`[FallbackParser] ✅ Found: ${a} KRW (via text heuristic)`),{price:a,amount:a,currency:"KRW",title:c||void 0,imageUrl:m||void 0,discounts:[]}}catch(o){return console.error("[FallbackParser] ❌ Parse error:",o),null}}}const xe=`
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
`,O=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const a=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(a,o).format(i)},be=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),U="picsel-toggle-host",W="picsel-toggle-panel";let b=null,y=null,f=null,N=null,C=null,l=null,k=null,E=null,q=!1,$=null;const ye=()=>{if(q)return;if(document.getElementById(U)){const o=document.getElementById(U);o&&(b=o,y=o.shadowRoot,y&&(f=y.querySelector(".picsel-toggle-button"),N=y.querySelector(".picsel-toggle-label"),C=y.querySelector(".picsel-toggle-badge"),l=y.querySelector(`#${W}`),k=y.querySelector(".picsel-close-button"),E=y.querySelector(".picsel-panel-content"))),q=!0;return}b=document.createElement("div"),b.id=U,b.style.position="fixed",b.style.bottom="24px",b.style.right="24px",b.style.zIndex=String(2147483647),y=b.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=xe,y.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",y.appendChild(e),f=document.createElement("button"),f.className="picsel-toggle-button",f.type="button",f.setAttribute("aria-expanded","false"),N=document.createElement("span"),N.className="picsel-toggle-label",N.textContent="PicSel 혜택 보기",f.appendChild(N),C=document.createElement("span"),C.className="picsel-toggle-badge",f.appendChild(C),e.appendChild(f),l=document.createElement("div"),l.className="picsel-panel",l.id=W,l.setAttribute("role","dialog"),l.setAttribute("aria-hidden","true"),f.setAttribute("aria-controls",W);const n=document.createElement("div");n.className="picsel-panel-header";const r=document.createElement("div");r.className="picsel-panel-title",r.textContent="PicSel 혜택 정보",k=document.createElement("button"),k.type="button",k.className="picsel-close-button",k.setAttribute("aria-label","닫기"),k.textContent="✕",n.appendChild(r),n.appendChild(k),l.appendChild(n),E=document.createElement("div"),E.className="picsel-panel-content",l.appendChild(E),e.appendChild(l),f.addEventListener("click",()=>{const o=!(l!=null&&l.classList.contains("open"));D(o)}),k.addEventListener("click",()=>{D(!1)}),window.addEventListener("keydown",o=>{o.key==="Escape"&&D(!1)}),document.addEventListener("click",o=>{if(!(l!=null&&l.classList.contains("open")))return;const i=o.composedPath();b&&!i.includes(b)&&D(!1)},!0),document.body.appendChild(b),q=!0},D=t=>{!l||!f||!N||(t?(l.classList.add("open"),l.setAttribute("aria-hidden","false"),f.setAttribute("aria-expanded","true"),N.textContent="PicSel 혜택 닫기"):(l.classList.remove("open"),l.setAttribute("aria-hidden","true"),f.setAttribute("aria-expanded","false"),N.textContent="PicSel 혜택 보기"))},L=t=>{var r;if(!C)return;if(!t){C.style.display="none";return}const e=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>typeof(o==null?void 0:o.rate)=="number"?o.rate:0).filter(o=>o>0):[];if(e.length>0){const o=Math.max(...e);C.textContent=`최대 ${o}%`,C.style.display="inline-flex";return}const n=(r=t.cashback)==null?void 0:r.amount;if(typeof n=="number"&&n>0){const o=O(n,t.currency??"KRW");C.textContent=o?`${o} 적립`:"캐시백 혜택",C.style.display="inline-flex";return}C.style.display="none"},Y=()=>{var B,z;if(!E)return;if(E.textContent="",!$){const s=document.createElement("p");s.className="picsel-empty-state",s.textContent="상품 정보를 불러오는 중입니다.",E.appendChild(s),L(null);return}const t=$,e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const s=document.createElement("img");s.src=r,s.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(s)}else{const s=document.createElement("span");s.textContent="No Image",s.style.fontSize="11px",s.style.color="#64748b",n.appendChild(s)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const a=document.createElement("div");a.className="picsel-price";const c=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,m=O(c,t.currency??"KRW");if(m){const s=document.createElement("div");s.className="picsel-final-price",s.textContent=m,a.appendChild(s)}const g=O(t.originalPrice,t.currency??"KRW"),w=be(t.originalPrice,c);if(g&&w){const s=document.createElement("div");s.className="picsel-original-price",s.textContent=g;const u=document.createElement("div");u.className="picsel-discount-tag",u.textContent=`-${w}%`,a.appendChild(s),a.appendChild(u)}if(o.appendChild(i),o.appendChild(a),t.shippingInfo){const s=document.createElement("div");s.className="picsel-shipping",s.textContent=`배송: ${t.shippingInfo}`,o.appendChild(s)}e.appendChild(n),e.appendChild(o),E.appendChild(e);const h=Array.isArray(t.cardBenefits)?t.cardBenefits.slice(0,3):[];if(h.length>0){const s=document.createElement("section");s.className="picsel-section";const u=document.createElement("h4");u.className="picsel-section-title",u.textContent="카드 혜택 TOP",s.appendChild(u);const x=document.createElement("div");x.className="picsel-benefit-list",h.forEach(v=>{const p=document.createElement("div");p.className="picsel-benefit-item";const T=document.createElement("div");if(T.className="picsel-card-name",T.textContent=v.cardName||"제휴 카드",p.appendChild(T),v.benefit){const I=document.createElement("div");I.className="picsel-benefit-desc",I.textContent=v.benefit,p.appendChild(I)}x.appendChild(p)}),s.appendChild(x),E.appendChild(s)}const d=[];if((B=t.giftCardDiscount)!=null&&B.description&&d.push(`🎁 ${t.giftCardDiscount.description}`),(z=t.cashback)!=null&&z.description&&d.push(`💰 ${t.cashback.description}`),d.length>0){const s=document.createElement("section");s.className="picsel-section";const u=document.createElement("h4");u.className="picsel-section-title",u.textContent="추가 혜택",s.appendChild(u);const x=document.createElement("div");x.className="picsel-extra-list",d.forEach(v=>{const p=document.createElement("div");p.className="picsel-extra-item",p.textContent=v,x.appendChild(p)}),s.appendChild(x),E.appendChild(s)}const P=Array.isArray(t.variants)?t.variants.slice(0,3):[];if(P.length>0){const s=document.createElement("section");s.className="picsel-section";const u=document.createElement("h4");u.className="picsel-section-title",u.textContent="다른 구성",s.appendChild(u);const x=document.createElement("div");x.className="picsel-variants",P.forEach(v=>{const p=document.createElement("div");p.className="picsel-variant-item";const T=document.createElement("div");T.className="picsel-variant-name",T.textContent=v.name||"옵션";const I=document.createElement("div");I.className="picsel-variant-price";const Z=O(v.price,t.currency??"KRW");if(I.textContent=Z||"-",p.appendChild(T),p.appendChild(I),v.discount){const F=document.createElement("div");F.className="picsel-variant-discount",F.textContent=v.discount,p.appendChild(F)}x.appendChild(p)}),s.appendChild(x),E.appendChild(s)}L(t)},J=t=>{$={...t},ye(),Y(),D(!1)},G=t=>{if($={...$??{},...t},!q){J($);return}Y()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function Ce(){const t=window.location.href;return j.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:V.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:H.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:{site:"unknown",isCheckout:!1}}function Ee(t){switch(t){case"coupang":return new j;case"amazon":return new V;case"ebay":return new H;default:return null}}function X(){const{site:t,isCheckout:e}=Ce();if(!e)return console.log("[ContentScript] Not a checkout page"),null;console.log(`[ContentScript] Checkout detected: ${t}`);const n=Ee(t);if(n){const o=n.parse(document);if(o)return o}return console.log("[ContentScript] Trying fallback..."),new he().parse(document)}function we(t){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},e=>{var n,r;e!=null&&e.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:e.success,savedAmount:(n=e.savedData)==null?void 0:n.amount,savedCurrency:(r=e.savedData)==null?void 0:r.currency}),G(t)):console.error("[ContentScript] ❌ Background error:",{error:e==null?void 0:e.error,message:e==null?void 0:e.message})})}function K(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=X();if(!t){console.warn("[ContentScript] Failed to extract");return}console.log("[ContentScript] Extracted data:",t),J(t),console.log("[ContentScript] Sending to background..."),we(t)}function _(){const t=new MutationObserver(e=>{e.some(r=>r.addedNodes.length>0&&Array.from(r.addedNodes).some(o=>o.tagName==="IFRAME"||o instanceof Element&&o.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const r=X();r&&(console.log("[ContentScript] ✅ Dynamic content re-parsed:",r),G(r),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:r,timestamp:Date.now(),source:"dynamic-iframe"},o=>{o!=null&&o.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")}))},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{K(),_()}):(K(),_());
