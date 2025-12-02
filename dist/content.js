import{C as ce}from"./assets/constants-4DKqSpZt.js";class k{extractNumber(e){const o=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return o?parseInt(o[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const o of n)try{const r=this.getTextBySelector(e,o);if(r)return r}catch(r){console.debug(`[${this.siteName}] Selector error: ${o}`,r)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=o.nextNode();){const s=(r.textContent||"").match(n);if(s)return console.log(`[${this.siteName}] Found price via TreeWalker: "${s[0]}"`),s[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,o=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:o||void 0}}}const C={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",'[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},ie=t=>{for(const e of C.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},se=t=>{try{const e=t.querySelector(C.mainImage);if(e?.src){let o=e.src;return o.startsWith("//")&&(o="https:"+o),o=o.split("?")[0],o}const n=t.querySelector(C.thumbnailContainer);if(n){const o=n.querySelector("ul > li:first-child img");if(o){let r=o.src;if(r)return r.startsWith("//")&&(r="https:"+r),r.includes("thumbnails/remote/")&&(r=r.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),r=r.split("?")[0],r}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},ae=t=>{try{const e=[],n=new Set,o=t.querySelector(C.thumbnailContainer);if(o){const r=o.querySelectorAll("ul > li img");for(const c of r){let i=c.src;if(i&&!n.has(i)&&(i.startsWith("//")&&(i="https:"+i),i.includes("thumbnails/remote/")&&(i=i.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),i=i.split("?")[0],!n.has(i)&&(e.push(i),n.add(i),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},x=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},q=t=>t>=100&&t<=1e8,le=t=>{let e=null,n=null,o=null;for(const r of C.amount)try{const c=t.querySelector(r);if(!c||!c.textContent)continue;const s=c.textContent.trim();if(!/[\d,]+\s*원?/.test(s)&&!/^\d{1,3}(,\d{3})*$/.test(s.replace(/[^\d,]/g,"")))continue;const i=x(s);if(!i||!q(i))continue;if(console.log(`[CoupangParser][Price] Found via selector "${r}": ${i}`),/final|discount|final-price|deal|sale|coupon/i.test(r)){o=i,e=i;break}n||(n=i),e||(e=i)}catch(c){console.debug(`[CoupangParser][Price] Selector ${r} failed`,c)}if(!e){const r=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const c of r){const i=(c.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(i){const a=x(i[1]);if(a&&q(a)){console.log(`[CoupangParser][Price] Found via regex in element: ${a}`),e=a;break}}}}return{amount:e,originalPrice:n,discountPrice:o}},pe=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=n.nextNode();){const r=(o.textContent||"").replace(/\u00A0/g," ");for(const c of e){const s=r.match(c);if(s&&s[1]){const i=x(s[1]);if(i)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${i}`),i}}}return null},de=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const o of e){const r=(o.textContent||"").replace(/\u00A0/g," ").trim(),c=(o.getAttribute("data-price")||"").trim(),i=`${r} ${c}`.trim().match(n);if(i&&i[1]){const a=x(i[1]);if(a)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${a}`),a}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},_=t=>{for(const[e,n]of Object.entries(ce))if(t.includes(e))return n;return null},K=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},ue=t=>{const e=[],n=C.cardImages;return t.querySelectorAll(n.directClass).forEach(c=>{const s=c,i=s.src,a=s.alt||"";if(!i)return;let l=a.trim();l||(l=_(i)||""),l&&!l.includes("카드")&&(l=`${l}카드`),i&&l&&(e.some(u=>u.cardName===l)||(e.push({src:i,alt:a,cardName:l}),console.log("[CoupangParser] 카드 이미지 발견:",{cardName:l,src:i.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(s=>{const i=s,a=i.src,l=i.alt||"";if(!a||(i.width||i.naturalWidth)>100)return;let p=l.trim();p||(p=_(a)||""),p&&!p.includes("카드")&&(p=`${p}카드`),a&&p&&!e.some(m=>m.cardName===p)&&e.push({src:a,alt:l,cardName:p})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(c=>{const s=c,i=s.src,a=s.alt||"";if(!i||(s.width||s.naturalWidth)>100)return;let u=a.trim();u||(u=_(i)||""),u&&!u.includes("카드")&&(u=`${u}카드`),i&&u&&!e.some(p=>p.cardName===u)&&e.push({src:i,alt:a,cardName:u})}),console.log("[CoupangParser] 추출된 카드 이미지 총:",e.length),e},me=t=>{const e=[],n=C.cardBenefitPopup,o=t.querySelector(n.container);if(!o)return console.log("[CoupangParser] 카드 혜택 팝업을 찾을 수 없음"),e;const r=o.querySelector(n.iframe);if(r)try{const s=r.contentDocument||r.contentWindow?.document;if(s)return fe(s)}catch{console.log("[CoupangParser] iframe 접근 불가 (cross-origin)")}const c=o.querySelector(n.content);return c?ge(c):e},fe=t=>{const e=[],n=C.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(r=>{const c=r.querySelector(n.cardName),s=r.querySelector(n.benefitRate),i=r.querySelector(n.benefitDesc),a=c?.textContent?.trim()||"",l=s?.textContent?.trim()||"",u=i?.textContent?.trim()||r.textContent?.trim()||"";if(a){const p=K(l||u);e.push({card:a,cardName:a,benefit:u||l||"혜택 제공",discount:p,rate:p})}}),e},ge=t=>{const e=[],n=t.textContent||"",o=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const r of o){let c;for(;(c=r.exec(n))!==null;){const s=c[1].includes("카드")?c[1]:`${c[1]}카드`,i=parseFloat(c[2]);e.some(a=>a.card===s)||e.push({card:s,cardName:s,benefit:`최대 ${i}% 할인/적립`,discount:i,rate:i})}}return e},xe=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(o=>{const r=o.textContent||"",c=r.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(c){const s=c[1].includes("카드")?c[1]:`${c[1]}카드`,i=parseFloat(c[2]);if(!e.some(a=>a.card===s)){let a=`최대 ${i}% 할인/적립`;const l=r.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);l&&(a=`최대 ${i}% ${l[0]}`),e.push({card:s,cardName:s,benefit:a,discount:i,rate:i})}}}),e},he=t=>{let e=[];const n=ue(t),o=me(t);if(o.length>0&&(console.log("[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:",o.length),e=o),xe(t).forEach(c=>{e.some(s=>s.card===c.card)||e.push(c)}),e.length===0){const c=t.querySelector(C.benefitBadge);if(c){const s=c.querySelectorAll("img.benefit-ico"),i=[],a=[];s.forEach(p=>{const m=p.getAttribute("src");if(m){const f=_(m);f&&(i.push(f),a.push(m))}});const l=c.querySelector(".benefit-label")?.textContent?.trim(),u=c.querySelector(".benefit-label-highlight")?.textContent?.trim();if(l){const p=K(l),m=i.length>0?`${i.slice(0,3).join(", ")}${i.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({card:m,cardName:m,benefit:`${l}${u?` (${u})`:""}`,discount:p,rate:p,imageUrl:a[0]})}}}return e=e.map(c=>{if(!c.imageUrl){const s=c.cardName||c.card||"",i=n.find(a=>{const l=a.cardName.toLowerCase(),u=s.toLowerCase();return l.includes(u.replace("카드",""))||u.includes(l.replace("카드",""))});if(i)return{...c,imageUrl:i.src}}return c}),e.sort((c,s)=>(s.discount??0)-(c.discount??0)),console.log("[CoupangParser] 최종 카드 혜택:",e),e},be=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const r=parseInt(n[1],10);return{rate:r,description:`기프트카드 ${r}% 할인`}}const o=t.querySelectorAll("div, span, p");for(const r of o){const c=r.textContent||"";if(c.includes("기프트카드")&&c.includes("%")){const s=c.match(/(\d+)\s*%/);if(s)return{rate:parseInt(s[1],10),description:c.trim()}}}return null},ye=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const r of e){const c=r.textContent||"",s=c.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s&&c.includes("쿠팡캐시")){const i=x(s[1]);if(i)return{amount:i,description:`쿠팡캐시 ${i.toLocaleString()} 원 적립`}}}const o=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(o){const r=x(o[1]);if(r)return{amount:r,description:`쿠팡캐시 ${r.toLocaleString()} 원 적립`}}return null},Ce=t=>{try{const e=[],n=new Set,o=t.querySelector(C.instantOption);if(!o)return e;const r=o.querySelectorAll("section > ul > li");for(const c of r)try{const s=c.querySelectorAll("div");if(s.length<2)continue;let i="";for(const p of s){const m=p.textContent||"";if(!m.includes("원")&&m.trim().length>0&&!m.includes("px")){i=m.trim();break}}let a="";for(const p of s){const f=(p.textContent||"").match(/[\d,]+원/);if(f){a=f[0].replace(/[,원]/g,"");break}}if(!a)continue;const l=parseInt(a);if(!l||l<100||!i||i.length<2)continue;const u=`${i}-${l}`;if(n.has(u))continue;if(e.push({name:i,price:l}),n.add(u),e.length>=15)break}catch(s){console.warn("[CoupangParser] Error parsing list item:",s);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},Pe=t=>t.querySelector(C.shipping)?.textContent?.trim()||null;class H extends k{siteName="Coupang";selectors={amount:C.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=ie(e),o=se(e),r=ae(e),c=le(e);let s=c.amount;const{originalPrice:i,discountPrice:a}=c;if(s||(s=pe(e)),s||(s=de(e)),!s)return console.debug("[CoupangParser] ❌ No price found"),null;const l=he(e).map(g=>{const b=g.rate??g.discount,E=g.cardName||g.card;return{card:E,cardName:E,benefit:g.benefit,discount:b,rate:b}}),u=be(e),p=ye(e),m=Pe(e),f=Ce(e);return console.log(`[CoupangParser] ✅ Found: ${s} KRW`),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:o||void 0,images:r,variants:f,originalPrice:i||void 0,discountPrice:a||void 0,cardBenefits:l,giftCardDiscount:u||void 0,cashback:p||void 0,shippingInfo:m||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const y={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},Ee=[/11st\.co\.kr\/products\/(\d+)/,/m\.11st\.co\.kr\/products\/(\d+)/],B={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},ve=t=>{const e=y.product;try{const n=t.querySelector(e.title);if(n?.textContent){const r=n.textContent.trim();return console.log("[11stParser][Product] 제목:",r),r}const o=t.querySelector(e.titleAlt);if(o?.textContent){const r=o.textContent.trim();return console.log("[11stParser][Product] 제목 (alt):",r),r}}catch(n){console.error("[11stParser][Product] 제목 추출 오류:",n)}return null},we=t=>{try{const e=t.querySelector(y.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return console.log("[11stParser][Product] 부제목:",n),n}}catch(e){console.error("[11stParser][Product] 부제목 추출 오류:",e)}return null},Se=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const o=t.match(n);if(o?.[1])return console.log("[11stParser][Product] 상품ID:",o[1]),o[1]}}catch(e){console.error("[11stParser][Product] 상품ID 추출 오류:",e)}return null},j=t=>{const e=y.image;try{const n=t.querySelector(e.main);if(n?.src){const c=w(n.src);return console.log("[11stParser][Image] 메인 이미지:",c),c}const o=t.querySelector(e.mainAlt);if(o?.src){const c=w(o.src);return console.log("[11stParser][Image] 메인 이미지 (alt):",c),c}const r=t.querySelector(`${e.main}[data-src]`);if(r?.dataset?.src){const c=w(r.dataset.src);return console.log("[11stParser][Image] 메인 이미지 (lazy):",c),c}}catch(n){console.error("[11stParser][Image] 이미지 추출 오류:",n)}return null},ke=t=>{const e=[],n=new Set,o=y.image;try{const r=j(t);r&&(e.push(r),n.add(r)),t.querySelectorAll(o.thumbnail).forEach(i=>{const a=i,l=a.src||a.dataset?.src;if(l){const u=w(l),p=z(u);n.has(p)||(e.push(p),n.add(p))}}),t.querySelectorAll(o.thumbnailAlt).forEach(i=>{const a=i,l=a.src||a.dataset?.src;if(l){const u=w(l),p=z(u);n.has(p)||(e.push(p),n.add(p))}}),console.log("[11stParser][Image] 전체 이미지 수:",e.length)}catch(r){console.error("[11stParser][Image] 전체 이미지 추출 오류:",r)}return e},_e=t=>{const e=y.seller,n={seller:null,rating:null};try{const o=t.querySelector(e.name);o?.textContent&&(n.seller=o.textContent.trim(),console.log("[11stParser][Seller] 판매자:",n.seller));const r=t.querySelector(e.rating);r?.textContent&&(n.rating=r.textContent.trim(),console.log("[11stParser][Seller] 등급:",n.rating))}catch(o){console.error("[11stParser][Seller] 판매자 정보 추출 오류:",o)}return n};function w(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function z(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const Ne=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=y.price;try{const o=t.querySelector(n.originalPrice);o?.textContent&&(e.originalPrice=x(o.textContent),console.log("[11stParser][Price] 정가:",e.originalPrice));const r=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);r?.textContent&&(e.discountPrice=x(r.textContent),e.amount=e.discountPrice,console.log("[11stParser][Price] 판매가:",e.discountPrice));const c=t.querySelector(n.discountRate);c?.textContent&&(e.discountRate=x(c.textContent),console.log("[11stParser][Price] 할인율:",e.discountRate));const s=t.querySelector(n.maxDiscountPrice);s?.textContent&&(e.maxDiscountPrice=x(s.textContent),console.log("[11stParser][Price] 최대할인가:",e.maxDiscountPrice));const i=t.querySelector(n.maxDiscountRate);i?.textContent&&(e.maxDiscountRate=x(i.textContent),console.log("[11stParser][Price] 최대할인율:",e.maxDiscountRate)),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(o){console.error("[11stParser][Price] 가격 추출 오류:",o)}return e},Ae=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const o of n){const r=o.textContent||"";for(const c of e){const s=r.match(c);if(s?.[1]){const i=x(s[1]);if(i&&i>100&&i<1e8)return console.log("[11stParser][findPriceInDOM] 가격 발견:",i),i}}}return null},Be=t=>{const e=[],n=y.price;try{const o=t.querySelector(n.maxDiscountLayer);if(!o)return e;o.querySelectorAll(".discount_prices.list_type .field").forEach(c=>{const s=c.querySelector(".title"),i=c.querySelector(".price");if(s&&i){const a=s.textContent?.trim()||"",l=i.textContent?.trim()||"",u=x(l.replace("-",""));a&&u&&a!=="판매가"&&(e.push({type:a,amount:u}),console.log("[11stParser][DiscountDetail]",a,u))}})}catch(o){console.error("[11stParser][DiscountDetail] 오류:",o)}return e},Ie=t=>{const e={points:[],cardBenefits:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0};try{e.points=De(t),e.totalPointAmount=e.points.reduce((n,o)=>n+o.amount,0),e.cardBenefits=$e(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,o)=>n+o.benefitAmount,0),e.coupons=Re(t),console.log("[11stParser][Benefits] 총 포인트:",e.totalPointAmount),console.log("[11stParser][Benefits] 총 카드혜택:",e.totalCardBenefitAmount)}catch(n){console.error("[11stParser][Benefits] 혜택 추출 오류:",n)}return e},De=t=>{const e=[],n=y.benefits;try{const o=t.querySelector(n.pointLayer);if(o){const c=o.querySelector(n.pointAmount);if(c?.textContent){const i=x(c.textContent);i&&(e.push({amount:i,type:"적립포인트",description:"최대 적립 가능 포인트"}),console.log("[11stParser][Points] 최대 적립 포인트:",i))}const s=o.querySelector(n.elevenPayPoint);if(s?.textContent){const i=x(s.textContent);i&&(e.push({amount:i,type:"11pay포인트",description:"11pay 결제 시 적립"}),console.log("[11stParser][Points] 11pay 포인트:",i))}}const r=t.querySelector(n.basicPoint);if(r?.textContent&&e.length===0){const c=x(r.textContent);c&&(e.push({amount:c,type:"기본적립",description:"기본 적립 포인트"}),console.log("[11stParser][Points] 기본 포인트:",c))}}catch(o){console.error("[11stParser][Points] 포인트 추출 오류:",o)}return e},$e=t=>{const e=[],n=y.cardBenefits;try{const o=t.querySelector(n.layer);o&&o.querySelectorAll(n.benefitButton).forEach(i=>{const a=i.textContent?.trim()||"",l=L(a);l&&e.push(l)}),t.querySelectorAll(n.cardItem).forEach(s=>{const i=s.querySelector(n.cardTitle),a=s.querySelector(n.cardAmount);if(i&&a){const l=i.textContent?.trim()||"",u=x(a.textContent||"");l&&u&&(e.push({cardName:l,benefitAmount:u,benefitType:"포인트",condition:"결제 시"}),console.log("[11stParser][CardBenefit]",l,u))}}),t.querySelectorAll('.card_benefit, [class*="card_benefit"]').forEach(s=>{const i=s.textContent?.trim()||"",a=L(i);a&&!e.find(l=>l.cardName===a.cardName)&&e.push(a)})}catch(o){console.error("[11stParser][CardBenefit] 카드 혜택 추출 오류:",o)}return e};function L(t){if(!t)return null;const e=[/(.+?(?:카드|페이))\s*결제\s*시\s*([\d,]+)\s*[P포인트]/i,/(.+?(?:카드|페이)).*?([\d,]+)\s*[P포인트]/i,/(.+?(?:카드|페이))\s*최대\s*([\d,]+)\s*[P포인트]/i];for(const n of e){const o=t.match(n);if(o){const r=o[1].trim(),c=x(o[2]);if(r&&c)return{cardName:r,benefitAmount:c,benefitType:t.includes("할인")?"할인":"포인트",condition:t.includes("결제 시")?"결제 시":""}}}return null}const Re=t=>{const e=[],n=y.coupon;try{const o=t.querySelector(n.badge);if(o?.textContent){const c=o.textContent.trim(),s=Te(c);s&&(e.push(s),console.log("[11stParser][Coupon]",s))}t.querySelectorAll(n.item).forEach(c=>{const s=c.querySelector(n.name),i=c.querySelector(n.discount);if(s||i){const a=s?.textContent?.trim()||"쿠폰",l=i?.textContent||"",u=l.includes("원")?x(l):null,p=l.includes("%")?x(l):null;e.push({name:a,discountAmount:u,discountRate:p})}})}catch(o){console.error("[11stParser][Coupon] 쿠폰 추출 오류:",o)}return e};function Te(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:x(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}class V extends k{siteName=B.siteName;selectors={amount:[y.price.salePrice,y.price.salePriceAlt,y.price.maxDiscountPrice],title:[y.product.title,y.product.titleAlt],image:[y.image.main,y.image.mainAlt]};static isProductPage(e){const n=Ee.some(o=>o.test(e));return console.log(`[ElevenStreetParser] isProductPage("${e}") = ${n}`),n}static extractProductId(e){return Se(e)}parse(e){try{console.log("[ElevenStreetParser] 🔍 Parsing 11번가 page...");const n=ve(e),o=we(e),r=j(e),c=ke(e),s=_e(e),i=Ne(e);let a=i.amount;const{originalPrice:l,discountPrice:u,maxDiscountPrice:p,discountRate:m,maxDiscountRate:f}=i;if(a||(a=Ae(e)),!a)return console.debug("[ElevenStreetParser] ❌ No price found"),null;const g=Be(e),b=Ie(e),{points:E,cardBenefits:R,coupons:ne,totalPointAmount:T,totalCardBenefitAmount:oe}=b,re=R.map(P=>({card:P.cardName,cardName:P.cardName,benefit:`${P.benefitAmount.toLocaleString()}P ${P.condition}`,discount:P.benefitAmount,rate:P.benefitAmount})),A=[];return m&&A.push({rate:m,type:"SALE_DISCOUNT",description:"할인가"}),g.forEach(P=>{A.push({rate:P.amount,type:P.type.toUpperCase().replace(/\s+/g,"_"),description:P.type})}),console.log(`[ElevenStreetParser] ✅ Found: ${a.toLocaleString()} ${B.currency}`),console.log(`[ElevenStreetParser] 📌 Title: ${n}`),console.log(`[ElevenStreetParser] 🎁 총 포인트: ${T.toLocaleString()}P`),console.log(`[ElevenStreetParser] 💳 카드 혜택 수: ${R.length}`),{price:a,amount:a,currency:B.currency,title:n?`${n}${o?` ${o}`:""}`:void 0,imageUrl:r||void 0,images:c,originalPrice:l||void 0,discountPrice:u||p||void 0,discountRate:m||void 0,cardBenefits:re,discounts:A,elevenst:{maxDiscountPrice:p,maxDiscountRate:f,points:E,coupons:ne,totalPointAmount:T,totalCardBenefitAmount:oe,seller:s.seller,sellerRating:s.rating,discountDetails:g}}}catch(n){return console.error("[ElevenStreetParser] ❌ Parse error:",n),null}}}const qe={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class G extends k{siteName="Amazon";selectors={amount:qe.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[AmazonParser] ❌ Invalid amount:",o),null;const r=this.extractCurrency(n),{title:c,imageUrl:s}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:c||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const ze={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class Y extends k{siteName="eBay";selectors={amount:ze.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[EbayParser] ❌ Invalid amount:",o),null;const r=this.extractCurrency(n),{title:c,imageUrl:s}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${o} ${r}`),{price:o,amount:o,currency:r,title:c||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const Le={amount:[]};class X extends k{siteName="Fallback";selectors={amount:Le.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const o=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!o)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const r=this.extractNumber(o[1]);if(!r||!this.isValidPrice(r))return console.debug("[FallbackParser] ❌ Invalid amount:",r),null;const{title:c,imageUrl:s}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${r} KRW (via text heuristic)`),{price:r,amount:r,currency:"KRW",title:c||void 0,imageUrl:s||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const Me=`
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
`,S=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",o=new Set(["KRW","JPY"]),r={style:"currency",currency:n};let c=t;o.has(n)&&(r.minimumFractionDigits=0,r.maximumFractionDigits=0,c=Math.round(t));const s=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(s,r).format(c)},Ue=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),I="picsel-toggle-host",D="picsel-toggle-panel",Fe={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},Oe=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return Fe[e]||String(t)},d={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},We=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const o=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(o){const p=document.createElement("img");p.src=o,p.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(p)}else{const p=document.createElement("span");p.textContent="No Image",p.style.fontSize="11px",p.style.color="#64748b",n.appendChild(p)}const r=document.createElement("div");r.className="picsel-product-info";const c=document.createElement("h3");c.className="picsel-product-title",c.textContent=t.title||"상품 정보를 찾을 수 없어요.";const s=document.createElement("div");s.className="picsel-price";const i=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,a=S(i,t.currency??"KRW");if(a){const p=document.createElement("div");p.className="picsel-final-price",p.textContent=a,s.appendChild(p)}const l=S(t.originalPrice,t.currency??"KRW"),u=Ue(t.originalPrice,i);if(l&&u){const p=document.createElement("div");p.className="picsel-original-price",p.textContent=l;const m=document.createElement("div");m.className="picsel-discount-tag",m.textContent=`-${u}%`,s.appendChild(p),s.appendChild(m)}if(r.appendChild(c),r.appendChild(s),t.shippingInfo){const p=document.createElement("div");p.className="picsel-shipping",p.textContent=`배송: ${t.shippingInfo}`,r.appendChild(p)}return e.appendChild(n),e.appendChild(r),e},Ke=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),He=(t,e)=>typeof t!="number"||e===null?null:t-e,M=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,o]of Object.entries(e))if(t.includes(n))return o;return t.replace("카드","").substring(0,2).toUpperCase()},je=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:o,svg:r}of n)for(const c of o)if(e.includes(c.toUpperCase()))return chrome.runtime.getURL(`assets/card/${r}`);return null},Ve=(t,e,n)=>{const o=e===0?" recommended":e===1?" rank-2":e===2?" rank-3":"",r=document.createElement("div");r.className=`picsel-card-benefit-item${o}`;const c=t.cardName||t.card||"카드",i=je(c)||t.imageUrl;if(i){const f=document.createElement("div");f.className="picsel-card-image-wrapper";const g=document.createElement("img");g.src=i,g.alt=c,g.className="picsel-card-image",g.onerror=()=>{const b=M(c);f.innerHTML=`
				<div class="picsel-card-initial">${b}</div>
			`},f.appendChild(g),r.appendChild(f)}else{const f=M(c),g=document.createElement("div");g.className="picsel-card-image-wrapper",g.innerHTML=`<div class="picsel-card-initial">${f}</div>`,r.appendChild(g)}const a=document.createElement("div");a.className="picsel-card-info";const l=document.createElement("div");if(l.className="picsel-card-header",e<3&&(t.discountAmount??0)>0){const f=document.createElement("span");f.className="picsel-recommended-badge",f.textContent=`${e+1}위`,l.appendChild(f)}const u=document.createElement("span");u.className="picsel-card-name";const p=c.includes(",")?c.split(",")[0].trim():c;if(u.textContent=p,l.appendChild(u),a.appendChild(l),t.benefit){const f=document.createElement("div");f.className="picsel-card-benefit-desc",f.textContent=t.benefit,a.appendChild(f)}r.appendChild(a);const m=document.createElement("div");if(m.className="picsel-card-amount",typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const b=document.createElement("div");b.className="picsel-card-final-price";const E=S(t.finalPrice,n);b.textContent=E,m.appendChild(b)}const f=document.createElement("div");f.className="picsel-card-discount";const g=S(t.discountAmount,n);f.textContent=`-${g}`,m.appendChild(f)}else if(typeof t.rate=="number"){const f=document.createElement("div");f.className="picsel-card-rate",f.textContent=`${t.rate}%`,m.appendChild(f)}return r.appendChild(m),r},Ge=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const l=document.createElement("section");l.className="picsel-section picsel-card-section";const u=document.createElement("h4");u.className="picsel-section-title",u.textContent="카드별 혜택",l.appendChild(u);const p=document.createElement("div");return p.className="picsel-empty-benefits",p.textContent="카드 혜택 정보를 불러오는 중...",l.appendChild(p),l}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,o=e.map(l=>{const u=l,p=u.rate??u.discount,m=Ke(n,p),f=He(n,m);return{...u,cardName:u.cardName??u.card,rate:p,discountAmount:m??void 0,finalPrice:f??void 0}}).sort((l,u)=>{const p=l.discountAmount??0;return(u.discountAmount??0)-p}),r=document.createElement("section");r.className="picsel-section picsel-card-section";const c=document.createElement("h4");c.className="picsel-section-title",c.textContent="카드별 혜택 비교",r.appendChild(c);const s=document.createElement("div");s.className="picsel-card-benefit-list";const i=t.currency??"KRW";o.forEach((l,u)=>{const p=Ve(l,u,i);s.appendChild(p)}),r.appendChild(s);const a=[];if(t.giftCardDiscount?.description&&a.push(t.giftCardDiscount.description),t.cashback?.description&&a.push(t.cashback.description),a.length>0){const l=document.createElement("div");l.className="picsel-sub-benefits",a.forEach(u=>{const p=document.createElement("div");p.className="picsel-sub-benefit-item",p.textContent=u,l.appendChild(p)}),r.appendChild(l)}return r};let N=!1,h=null;const Ye=t=>{if(N||!d.shadowRoot)return;h=document.createElement("div"),h.className="picsel-comparison-panel",h.innerHTML=`
		<div class="picsel-comparison-header">
			<h3>💰 가격 비교</h3>
			<button class="picsel-comparison-close" type="button">✕</button>
		</div>
		<div class="picsel-comparison-loading">
			<div class="picsel-spinner"></div>
			<p>다나와, 네이버쇼핑, 쿠팡에서 검색 중...</p>
		</div>
	`,h.querySelector(".picsel-comparison-close")?.addEventListener("click",$),d.shadowRoot.appendChild(h),N=!0,Xe(t)},$=()=>{h&&d.shadowRoot&&(d.shadowRoot.removeChild(h),h=null,N=!1)},Xe=async t=>{if(!h)return;const e=t.title||"",n=t.amount||0;try{const o=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:e});if(!h)return;o.success&&o.data?Je(o.data,n):U(o.error||"가격 비교 서버에 연결할 수 없습니다")}catch(o){if(!h)return;U(o instanceof Error?o.message:"오류 발생")}},Je=(t,e)=>{if(!h)return;const n=h.querySelector(".picsel-comparison-loading");n&&n.remove();const o=document.createElement("div");o.className="picsel-comparison-current",o.innerHTML=`
		<span>현재 페이지 가격:</span>
		<strong>${e.toLocaleString("ko-KR")}원</strong>
	`,h.appendChild(o);const r=document.createElement("div");r.className="picsel-comparison-results";const c={danawa:"다나와",naver:"네이버쇼핑",coupang:"쿠팡"},s={danawa:"#0066cc",naver:"#03cf5d",coupang:"#f73c00"};for(const a of t.results){const l=document.createElement("div");l.className="picsel-comparison-provider";const u=document.createElement("div");if(u.className="picsel-comparison-provider-header",u.innerHTML=`
			<span style="color: ${s[a.provider]||"#333"}; font-weight: 600;">
				${c[a.provider]||a.provider}
			</span>
			${a.success?`<span class="picsel-comparison-count">${a.products.length}개</span>`:'<span class="picsel-comparison-error-badge">실패</span>'}
		`,l.appendChild(u),a.success&&a.products.length>0){const p=document.createElement("div");p.className="picsel-comparison-product-list";for(const m of a.products.slice(0,3)){const f=m.price<e,g=e-m.price,b=document.createElement("a");b.className="picsel-comparison-product",b.href=m.url,b.target="_blank",b.rel="noopener noreferrer",b.innerHTML=`
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
				`,p.appendChild(b)}l.appendChild(p)}else if(a.error){const p=document.createElement("p");p.className="picsel-comparison-provider-error",p.textContent=a.error,l.appendChild(p)}else{const p=document.createElement("p");p.className="picsel-comparison-empty",p.textContent="검색 결과 없음",l.appendChild(p)}r.appendChild(l)}h.appendChild(r);const i=document.createElement("div");i.className="picsel-comparison-meta-info",i.innerHTML=`
		${t.fromCache?'<span class="picsel-comparison-cache">캐시</span>':""}
		<span>${(t.totalDuration/1e3).toFixed(1)}초</span>
	`,h.appendChild(i)},U=t=>{if(!h)return;const e=h.querySelector(".picsel-comparison-loading");e&&(e.innerHTML=`
			<div class="picsel-comparison-error">
				<p>⚠️ ${t}</p>
				<code>pnpm run server</code>
				<p class="picsel-comparison-help">터미널에서 위 명령어를 실행 후 다시 시도해주세요.</p>
			</div>
		`)},Ze=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const o=document.createElement("button");o.className="picsel-footer-compare",o.textContent="💰 가격 비교",o.type="button",o.addEventListener("click",()=>{N?$():Ye(t)}),n.appendChild(o);const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{$(),v(!1)}),n.appendChild(r),e.appendChild(n),e},F=t=>{const{buttonBadgeEl:e}=d;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(r=>{const c=r,s=c.rate??c.discount;return typeof s=="number"?s:0}).filter(r=>r>0):[];if(n.length>0){const r=Math.max(...n);e.textContent=`최대 ${r}%`,e.style.display="inline-flex";return}const o=t.cashback?.amount;if(typeof o=="number"&&o>0){const r=S(o,t.currency??"KRW");e.textContent=r?`${r} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},J=()=>{const{contentEl:t,cachedData:e}=d;if(!t)return;if(t.textContent="",!e){const s=document.createElement("p");s.className="picsel-empty-state",s.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(s),F(null);return}const n=e,o=We(n);t.appendChild(o);const r=Ge(n);r&&t.appendChild(r);const c=Ze(n);c&&t.appendChild(c),F(n)},v=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:o}=d;!e||!n||!o||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),o.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),o.textContent="PicSel 혜택 보기"))},Qe=()=>{if(d.mounted)return;if(document.getElementById(I)){const c=document.getElementById(I);c&&(d.hostElement=c,d.shadowRoot=c.shadowRoot,c.shadowRoot&&(d.toggleButton=c.shadowRoot.querySelector(".picsel-toggle-button"),d.buttonLabelEl=c.shadowRoot.querySelector(".picsel-toggle-label"),d.buttonBadgeEl=c.shadowRoot.querySelector(".picsel-toggle-badge"),d.panelEl=c.shadowRoot.querySelector(`#${D}`),d.closeButtonEl=c.shadowRoot.querySelector(".picsel-close-button"),d.contentEl=c.shadowRoot.querySelector(".picsel-panel-content"),d.panelTitleEl=c.shadowRoot.querySelector(".picsel-panel-title"))),d.mounted=!0;return}d.hostElement=document.createElement("div"),d.hostElement.id=I,d.hostElement.style.position="fixed",d.hostElement.style.bottom="24px",d.hostElement.style.right="24px",d.hostElement.style.zIndex=String(2147483647),d.shadowRoot=d.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=Me,d.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",d.shadowRoot.appendChild(e),d.toggleButton=document.createElement("button"),d.toggleButton.className="picsel-toggle-button",d.toggleButton.type="button",d.toggleButton.setAttribute("aria-expanded","false"),d.buttonLabelEl=document.createElement("span"),d.buttonLabelEl.className="picsel-toggle-label",d.buttonLabelEl.textContent="PicSel 혜택 보기",d.toggleButton.appendChild(d.buttonLabelEl),d.buttonBadgeEl=document.createElement("span"),d.buttonBadgeEl.className="picsel-toggle-badge",d.toggleButton.appendChild(d.buttonBadgeEl),e.appendChild(d.toggleButton),d.panelEl=document.createElement("div"),d.panelEl.className="picsel-panel",d.panelEl.id=D,d.panelEl.setAttribute("role","dialog"),d.panelEl.setAttribute("aria-hidden","true"),d.toggleButton.setAttribute("aria-controls",D);const n=document.createElement("div");n.className="picsel-panel-header",d.panelTitleEl=document.createElement("div"),d.panelTitleEl.className="picsel-panel-title",d.panelTitleEl.textContent="PicSel 혜택 정보",d.closeButtonEl=document.createElement("button"),d.closeButtonEl.type="button",d.closeButtonEl.className="picsel-close-button",d.closeButtonEl.setAttribute("aria-label","닫기"),d.closeButtonEl.textContent="✕",n.appendChild(d.panelTitleEl),n.appendChild(d.closeButtonEl),d.panelEl.appendChild(n),d.contentEl=document.createElement("div"),d.contentEl.className="picsel-panel-content",d.panelEl.appendChild(d.contentEl),e.appendChild(d.panelEl);const o=d.panelEl,r=d.hostElement;d.toggleButton.addEventListener("click",()=>{const c=!o.classList.contains("open");v(c)}),d.closeButtonEl.addEventListener("click",()=>{v(!1)}),window.addEventListener("keydown",c=>{c.key==="Escape"&&v(!1)}),document.addEventListener("click",c=>{if(!o.classList.contains("open"))return;const s=c.composedPath();r&&!s.includes(r)&&v(!1)},!0),document.body.appendChild(d.hostElement),d.mounted=!0},Z=()=>{if(d.panelTitleEl&&d.cachedData?.site){const t=Oe(d.cachedData.site);d.panelTitleEl.textContent=`${t} 혜택 정보`}},Q=t=>{d.cachedData={...t},Qe(),Z(),J(),v(!1)},ee=t=>{if(d.cachedData={...d.cachedData??{},...t},!d.mounted){Q(d.cachedData);return}Z(),J()};if(window.self!==window.top){const t=window.location.href,e=window.location.hostname,n=window.location.pathname;console.debug("[ContentScript:iframe] 📍 Iframe detected",{context:"iframe",url:t,host:e,pathname:n,selfIsTop:window.self===window.top})}console.log("[ContentScript] ✅ Content script initialized in main frame");function et(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),H.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):V.isProductPage(t)?(console.log("[Content] ✅ Detected 11번가 product page"),{site:"11st",isCheckout:!0}):G.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):Y.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function tt(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new H;case"11st":return new V;case"amazon":return new G;case"ebay":return new Y;default:return new X}}function te(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=et(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:o}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${o}`);const r=tt(n);if(console.log(`[Content] 📝 Using parser: ${r.siteName}`),!r)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;let c=r.parse(document);if(c)console.log("[Content] ✅ Parse successful:",{title:c.title?.substring(0,50),amount:c.amount,hasCardBenefits:!!c.cardBenefits});else if(console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),c=new X().parse(document),!c)return null;return{paymentInfo:c,site:n}}function nt(t,e){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},n=>{n?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:n.success,savedAmount:n.savedData?.amount,savedCurrency:n.savedData?.currency}),ee({...t,site:e})):console.error("[ContentScript] ❌ Background error:",{error:n?.error,message:n?.message})})}function O(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=te();if(!t){console.warn("[ContentScript] Failed to extract");return}const{paymentInfo:e,site:n}=t;console.log("[ContentScript] Extracted data:",e),Q({...e,site:n}),console.log("[ContentScript] Sending to background..."),nt(e,n)}function W(){const t=new MutationObserver(e=>{e.some(o=>o.addedNodes.length>0&&Array.from(o.addedNodes).some(r=>r.tagName==="IFRAME"||r instanceof Element&&r.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const o=te();if(o){const{paymentInfo:r,site:c}=o;console.log("[ContentScript] ✅ Dynamic content re-parsed:",r),ee({...r,site:c}),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:r,timestamp:Date.now(),source:"dynamic-iframe"},s=>{s?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")})}},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{O(),W()}):(O(),W());
