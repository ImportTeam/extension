import{C as J}from"./assets/constants-4DKqSpZt.js";class B{extractNumber(e){const r=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return r?parseInt(r[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){console.debug(`[${this.siteName}] Selector error: ${r}`,o)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const r=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=r.nextNode();){const a=(o.textContent||"").match(n);if(a)return console.log(`[${this.siteName}] Found price via TreeWalker: "${a[0]}"`),a[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const S={amount:[".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount"],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]'},X=t=>{for(const e of S.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Z=t=>{try{const e=t.querySelector(S.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r="https:"+r),r=r.split("?")[0],r}const n=t.querySelector(S.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o="https:"+o),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},Q=t=>{try{const e=[],n=new Set,r=t.querySelector(S.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const c of o){let s=c.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s="https:"+s),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},D=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},ee=t=>{let e=null,n=null,r=null;const o=t.querySelector(".price-amount.sales-price-amount");o?.textContent&&(n=D(o.textContent),e=n);const c=t.querySelector(".price-amount.final-price-amount");return c?.textContent&&(r=D(c.textContent),r&&(e=r)),{amount:e,originalPrice:n,discountPrice:r}},te=t=>{const e=/(\d{1,3}(?:,\d{3})*)\s*원/,n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const c=(r.textContent||"").match(e);if(c)return D(c[1])}return null},ne=t=>{for(const[e,n]of Object.entries(J))if(t.includes(e))return n;return null},re=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},oe=t=>{const e=[],n=t.querySelector(S.benefitBadge);if(!n)return e;const r=n.querySelectorAll("img.benefit-ico"),o=[];r.forEach(s=>{const p=s.getAttribute("src");if(p){const f=ne(p);f&&o.push(f)}});const c=n.querySelector(".benefit-label")?.textContent?.trim(),a=n.querySelector(".benefit-label-highlight")?.textContent?.trim();if(c){const s=re(c),p=o.length>0?`${o.slice(0,3).join(", ")}${o.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({cardName:p,benefit:`${c}${a?` (${a})`:""}`,rate:s})}return e},ie=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const c=o.textContent||"";if(c.includes("기프트카드")&&c.includes("%")){const a=c.match(/(\d+)\s*%/);if(a)return{rate:parseInt(a[1],10),description:c.trim()}}}return null},ce=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const c=o.textContent||"",a=c.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(a&&c.includes("쿠팡캐시")){const s=D(a[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=D(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},ae=t=>{try{const e=[],n=new Set,r=t.querySelector(S.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const c of o)try{const a=c.querySelectorAll("div");if(a.length<2)continue;let s="";for(const P of a){const g=P.textContent||"";if(!g.includes("원")&&g.trim().length>0&&!g.includes("px")){s=g.trim();break}}let p="";for(const P of a){const N=(P.textContent||"").match(/[\d,]+원/);if(N){p=N[0].replace(/[,원]/g,"");break}}if(!p)continue;const f=parseInt(p);if(!f||f<100||!s||s.length<2)continue;const k=`${s}-${f}`;if(n.has(k))continue;if(e.push({name:s,price:f}),n.add(k),e.length>=15)break}catch(a){console.warn("[CoupangParser] Error parsing list item:",a);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},se=t=>t.querySelector(S.shipping)?.textContent?.trim()||null;class L extends B{siteName="Coupang";selectors={amount:S.amount};static isCheckoutPage(e){return/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e)}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=X(e),r=Z(e),o=Q(e),c=ee(e);let a=c.amount;const{originalPrice:s,discountPrice:p}=c;if(a||(a=te(e)),!a)return console.debug("[CoupangParser] ❌ No price found"),null;const f=oe(e).map(i=>({card:i.cardName,benefit:i.benefit,discount:i.rate})),k=ie(e),P=ce(e),g=se(e),N=ae(e);return console.log(`[CoupangParser] ✅ Found: ${a} KRW`),{price:a,amount:a,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:N,originalPrice:s||void 0,discountPrice:p||void 0,cardBenefits:f,giftCardDiscount:k||void 0,cashback:P||void 0,shippingInfo:g||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const le={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class K extends B{siteName="Amazon";selectors={amount:le.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return console.debug("[AmazonParser] ❌ Invalid amount:",r),null;const o=this.extractCurrency(n),{title:c,imageUrl:a}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:c||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const de={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class _ extends B{siteName="eBay";selectors={amount:de.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return console.debug("[EbayParser] ❌ Invalid amount:",r),null;const o=this.extractCurrency(n),{title:c,imageUrl:a}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:c||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const ue={amount:[]};class pe extends B{siteName="Fallback";selectors={amount:ue.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return console.debug("[FallbackParser] ❌ Invalid amount:",o),null;const{title:c,imageUrl:a}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:c||void 0,imageUrl:a||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const me=`
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
`,$=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let c=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,c=Math.round(t));const a=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(a,o).format(c)},fe=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),q="picsel-toggle-host",M="picsel-toggle-panel";let x=null,b=null,m=null,v=null,C=null,l=null,w=null,y=null,R=!1,I=null;const ge=()=>{if(R)return;if(document.getElementById(q)){const o=document.getElementById(q);o&&(x=o,b=o.shadowRoot,b&&(m=b.querySelector(".picsel-toggle-button"),v=b.querySelector(".picsel-toggle-label"),C=b.querySelector(".picsel-toggle-badge"),l=b.querySelector(`#${M}`),w=b.querySelector(".picsel-close-button"),y=b.querySelector(".picsel-panel-content"))),R=!0;return}x=document.createElement("div"),x.id=q,x.style.position="fixed",x.style.bottom="24px",x.style.right="24px",x.style.zIndex=String(2147483647),b=x.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=me,b.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",b.appendChild(e),m=document.createElement("button"),m.className="picsel-toggle-button",m.type="button",m.setAttribute("aria-expanded","false"),v=document.createElement("span"),v.className="picsel-toggle-label",v.textContent="PicSel 혜택 보기",m.appendChild(v),C=document.createElement("span"),C.className="picsel-toggle-badge",m.appendChild(C),e.appendChild(m),l=document.createElement("div"),l.className="picsel-panel",l.id=M,l.setAttribute("role","dialog"),l.setAttribute("aria-hidden","true"),m.setAttribute("aria-controls",M);const n=document.createElement("div");n.className="picsel-panel-header";const r=document.createElement("div");r.className="picsel-panel-title",r.textContent="PicSel 혜택 정보",w=document.createElement("button"),w.type="button",w.className="picsel-close-button",w.setAttribute("aria-label","닫기"),w.textContent="✕",n.appendChild(r),n.appendChild(w),l.appendChild(n),y=document.createElement("div"),y.className="picsel-panel-content",l.appendChild(y),e.appendChild(l),m.addEventListener("click",()=>{const o=!l?.classList.contains("open");z(o)}),w.addEventListener("click",()=>{z(!1)}),window.addEventListener("keydown",o=>{o.key==="Escape"&&z(!1)}),document.addEventListener("click",o=>{if(!l?.classList.contains("open"))return;const c=o.composedPath();x&&!c.includes(x)&&z(!1)},!0),document.body.appendChild(x),R=!0},z=t=>{!l||!m||!v||(t?(l.classList.add("open"),l.setAttribute("aria-hidden","false"),m.setAttribute("aria-expanded","true"),v.textContent="PicSel 혜택 닫기"):(l.classList.remove("open"),l.setAttribute("aria-hidden","true"),m.setAttribute("aria-expanded","false"),v.textContent="PicSel 혜택 보기"))},F=t=>{if(!C)return;if(!t){C.style.display="none";return}const e=Array.isArray(t.cardBenefits)?t.cardBenefits.map(r=>typeof r?.rate=="number"?r.rate:0).filter(r=>r>0):[];if(e.length>0){const r=Math.max(...e);C.textContent=`최대 ${r}%`,C.style.display="inline-flex";return}const n=t.cashback?.amount;if(typeof n=="number"&&n>0){const r=$(n,t.currency??"KRW");C.textContent=r?`${r} 적립`:"캐시백 혜택",C.style.display="inline-flex";return}C.style.display="none"},j=()=>{if(!y)return;if(y.textContent="",!I){const i=document.createElement("p");i.className="picsel-empty-state",i.textContent="상품 정보를 불러오는 중입니다.",y.appendChild(i),F(null);return}const t=I,e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const i=document.createElement("img");i.src=r,i.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(i)}else{const i=document.createElement("span");i.textContent="No Image",i.style.fontSize="11px",i.style.color="#64748b",n.appendChild(i)}const o=document.createElement("div");o.className="picsel-product-info";const c=document.createElement("h3");c.className="picsel-product-title",c.textContent=t.title||"상품 정보를 찾을 수 없어요.";const a=document.createElement("div");a.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,p=$(s,t.currency??"KRW");if(p){const i=document.createElement("div");i.className="picsel-final-price",i.textContent=p,a.appendChild(i)}const f=$(t.originalPrice,t.currency??"KRW"),k=fe(t.originalPrice,s);if(f&&k){const i=document.createElement("div");i.className="picsel-original-price",i.textContent=f;const d=document.createElement("div");d.className="picsel-discount-tag",d.textContent=`-${k}%`,a.appendChild(i),a.appendChild(d)}if(o.appendChild(c),o.appendChild(a),t.shippingInfo){const i=document.createElement("div");i.className="picsel-shipping",i.textContent=`배송: ${t.shippingInfo}`,o.appendChild(i)}e.appendChild(n),e.appendChild(o),y.appendChild(e);const P=Array.isArray(t.cardBenefits)?t.cardBenefits.slice(0,3):[];if(P.length>0){const i=document.createElement("section");i.className="picsel-section";const d=document.createElement("h4");d.className="picsel-section-title",d.textContent="카드 혜택 TOP",i.appendChild(d);const h=document.createElement("div");h.className="picsel-benefit-list",P.forEach(E=>{const u=document.createElement("div");u.className="picsel-benefit-item";const A=document.createElement("div");if(A.className="picsel-card-name",A.textContent=E.cardName||"제휴 카드",u.appendChild(A),E.benefit){const T=document.createElement("div");T.className="picsel-benefit-desc",T.textContent=E.benefit,u.appendChild(T)}h.appendChild(u)}),i.appendChild(h),y.appendChild(i)}const g=[];if(t.giftCardDiscount?.description&&g.push(`🎁 ${t.giftCardDiscount.description}`),t.cashback?.description&&g.push(`💰 ${t.cashback.description}`),g.length>0){const i=document.createElement("section");i.className="picsel-section";const d=document.createElement("h4");d.className="picsel-section-title",d.textContent="추가 혜택",i.appendChild(d);const h=document.createElement("div");h.className="picsel-extra-list",g.forEach(E=>{const u=document.createElement("div");u.className="picsel-extra-item",u.textContent=E,h.appendChild(u)}),i.appendChild(h),y.appendChild(i)}const N=Array.isArray(t.variants)?t.variants.slice(0,3):[];if(N.length>0){const i=document.createElement("section");i.className="picsel-section";const d=document.createElement("h4");d.className="picsel-section-title",d.textContent="다른 구성",i.appendChild(d);const h=document.createElement("div");h.className="picsel-variants",N.forEach(E=>{const u=document.createElement("div");u.className="picsel-variant-item";const A=document.createElement("div");A.className="picsel-variant-name",A.textContent=E.name||"옵션";const T=document.createElement("div");T.className="picsel-variant-price";const G=$(E.price,t.currency??"KRW");if(T.textContent=G||"-",u.appendChild(A),u.appendChild(T),E.discount){const O=document.createElement("div");O.className="picsel-variant-discount",O.textContent=E.discount,u.appendChild(O)}h.appendChild(u)}),i.appendChild(h),y.appendChild(i)}F(t)},V=t=>{I={...t},ge(),j(),z(!1)},H=t=>{if(I={...I??{},...t},!R){V(I);return}j()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function he(){const t=window.location.href;return L.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:K.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:_.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:{site:"unknown",isCheckout:!1}}function xe(t){switch(t){case"coupang":return new L;case"amazon":return new K;case"ebay":return new _;default:return null}}function Y(){const{site:t,isCheckout:e}=he();if(!e)return console.log("[ContentScript] Not a checkout page"),null;console.log(`[ContentScript] Checkout detected: ${t}`);const n=xe(t);if(n){const o=n.parse(document);if(o)return o}return console.log("[ContentScript] Trying fallback..."),new pe().parse(document)}function be(t){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},e=>{e?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:e.success,savedAmount:e.savedData?.amount,savedCurrency:e.savedData?.currency}),H(t)):console.error("[ContentScript] ❌ Background error:",{error:e?.error,message:e?.message})})}function U(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=Y();if(!t){console.warn("[ContentScript] Failed to extract");return}console.log("[ContentScript] Extracted data:",t),V(t),console.log("[ContentScript] Sending to background..."),be(t)}function W(){const t=new MutationObserver(e=>{e.some(r=>r.addedNodes.length>0&&Array.from(r.addedNodes).some(o=>o.tagName==="IFRAME"||o instanceof Element&&o.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const r=Y();r&&(console.log("[ContentScript] ✅ Dynamic content re-parsed:",r),H(r),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:r,timestamp:Date.now(),source:"dynamic-iframe"},o=>{o?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")}))},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{U(),W()}):(U(),W());
