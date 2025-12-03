import{C as ae}from"./assets/constants-4DKqSpZt.js";class N{extractNumber(e){const o=e.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return o?parseInt(o[1],10):null}extractCurrency(e){return e.includes("원")||e.includes("KRW")?"KRW":e.includes("$")||e.includes("USD")?"USD":e.includes("€")||e.includes("EUR")?"EUR":e.includes("¥")||e.includes("JPY")?"JPY":"KRW"}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const o of n)try{const i=this.getTextBySelector(e,o);if(i)return i}catch(i){console.debug(`[${this.siteName}] Selector error: ${o}`,i)}return null}isValidPrice(e){return e>100&&e<1e8}searchPriceInDOM(e,n){const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i;for(;i=o.nextNode();){const c=(i.textContent||"").match(n);if(c)return console.log(`[${this.siteName}] Found price via TreeWalker: "${c[0]}"`),c[0]}return null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,o=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:o||void 0}}}const P={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",'[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]'],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},le=t=>{for(const e of P.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},de=t=>{try{const e=t.querySelector(P.mainImage);if(e?.src){let o=e.src;return o.startsWith("//")&&(o="https:"+o),o=o.split("?")[0],o}const n=t.querySelector(P.thumbnailContainer);if(n){const o=n.querySelector("ul > li:first-child img");if(o){let i=o.src;if(i)return i.startsWith("//")&&(i="https:"+i),i.includes("thumbnails/remote/")&&(i=i.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),i=i.split("?")[0],i}}return null}catch(e){return console.error("[CoupangParser] Error extracting main image:",e),null}},ue=t=>{try{const e=[],n=new Set,o=t.querySelector(P.thumbnailContainer);if(o){const i=o.querySelectorAll("ul > li img");for(const r of i){let s=r.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s="https:"+s),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return console.error("[CoupangParser] Error extracting all images:",e),[]}},h=t=>{const n=t.replace(/[,₩$€£\s]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},F=t=>t>=100&&t<=1e8,pe=t=>{let e=null,n=null,o=null;for(const i of P.amount)try{const r=t.querySelector(i);if(!r||!r.textContent)continue;const c=r.textContent.trim();if(!/[\d,]+\s*원?/.test(c)&&!/^\d{1,3}(,\d{3})*$/.test(c.replace(/[^\d,]/g,"")))continue;const s=h(c);if(!s||!F(s))continue;if(console.log(`[CoupangParser][Price] Found via selector "${i}": ${s}`),/final|discount|final-price|deal|sale|coupon/i.test(i)){o=s,e=s;break}n||(n=s),e||(e=s)}catch(r){console.debug(`[CoupangParser][Price] Selector ${i} failed`,r)}if(!e){const i=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const r of i){const s=(r.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s){const l=h(s[1]);if(l&&F(l)){console.log(`[CoupangParser][Price] Found via regex in element: ${l}`),e=l;break}}}}return{amount:e,originalPrice:n,discountPrice:o}},me=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let o;for(;o=n.nextNode();){const i=(o.textContent||"").replace(/\u00A0/g," ");for(const r of e){const c=i.match(r);if(c&&c[1]){const s=h(c[1]);if(s)return console.log(`[CoupangParser][findPriceInDOM] Found price via text walker: ${s}`),s}}}return null},fe=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const o of e){const i=(o.textContent||"").replace(/\u00A0/g," ").trim(),r=(o.getAttribute("data-price")||"").trim(),s=`${i} ${r}`.trim().match(n);if(s&&s[1]){const l=h(s[1]);if(l)return console.log(`[CoupangParser][findPriceByElementScan] Found price by element scan: ${l}`),l}}}catch(e){console.debug("[CoupangParser][findPriceByElementScan] error",e)}return null},I=t=>{for(const[e,n]of Object.entries(ae))if(t.includes(e))return n;return null},Y=t=>{const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):void 0},ge=t=>{const e=[],n=P.cardImages;return t.querySelectorAll(n.directClass).forEach(r=>{const c=r,s=c.src,l=c.alt||"";if(!s)return;let d=l.trim();d||(d=I(s)||""),d&&!d.includes("카드")&&(d=`${d}카드`),s&&d&&(e.some(u=>u.cardName===d)||(e.push({src:s,alt:l,cardName:d}),console.log("[CoupangParser] 카드 이미지 발견:",{cardName:d,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(c=>{const s=c,l=s.src,d=s.alt||"";if(!l||(s.width||s.naturalWidth)>100)return;let a=d.trim();a||(a=I(l)||""),a&&!a.includes("카드")&&(a=`${a}카드`),l&&a&&!e.some(m=>m.cardName===a)&&e.push({src:l,alt:d,cardName:a})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(r=>{const c=r,s=c.src,l=c.alt||"";if(!s||(c.width||c.naturalWidth)>100)return;let u=l.trim();u||(u=I(s)||""),u&&!u.includes("카드")&&(u=`${u}카드`),s&&u&&!e.some(a=>a.cardName===u)&&e.push({src:s,alt:l,cardName:u})}),console.log("[CoupangParser] 추출된 카드 이미지 총:",e.length),e},xe=t=>{const e=[],n=P.cardBenefitPopup,o=t.querySelector(n.container);if(!o)return console.log("[CoupangParser] 카드 혜택 팝업을 찾을 수 없음"),e;const i=o.querySelector(n.iframe);if(i)try{const c=i.contentDocument||i.contentWindow?.document;if(c)return he(c)}catch{console.log("[CoupangParser] iframe 접근 불가 (cross-origin)")}const r=o.querySelector(n.content);return r?be(r):e},he=t=>{const e=[],n=P.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(i=>{const r=i.querySelector(n.cardName),c=i.querySelector(n.benefitRate),s=i.querySelector(n.benefitDesc),l=r?.textContent?.trim()||"",d=c?.textContent?.trim()||"",u=s?.textContent?.trim()||i.textContent?.trim()||"";if(l){const a=Y(d||u);e.push({card:l,cardName:l,benefit:u||d||"혜택 제공",discount:a,rate:a})}}),e},be=t=>{const e=[],n=t.textContent||"",o=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const i of o){let r;for(;(r=i.exec(n))!==null;){const c=r[1].includes("카드")?r[1]:`${r[1]}카드`,s=parseFloat(r[2]);e.some(l=>l.card===c)||e.push({card:c,cardName:c,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},ye=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(o=>{const i=o.textContent||"",r=i.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(r){const c=r[1].includes("카드")?r[1]:`${r[1]}카드`,s=parseFloat(r[2]);if(!e.some(l=>l.card===c)){let l=`최대 ${s}% 할인/적립`;const d=i.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);d&&(l=`최대 ${s}% ${d[0]}`),e.push({card:c,cardName:c,benefit:l,discount:s,rate:s})}}}),e},Ce=t=>{let e=[];const n=ge(t),o=xe(t);if(o.length>0&&(console.log("[CoupangParser] ✅ 팝업에서 카드 혜택 파싱:",o.length),e=o),ye(t).forEach(r=>{e.some(c=>c.card===r.card)||e.push(r)}),e.length===0){const r=t.querySelector(P.benefitBadge);if(r){const c=r.querySelectorAll("img.benefit-ico"),s=[],l=[];c.forEach(a=>{const m=a.getAttribute("src");if(m){const x=I(m);x&&(s.push(x),l.push(m))}});const d=r.querySelector(".benefit-label")?.textContent?.trim(),u=r.querySelector(".benefit-label-highlight")?.textContent?.trim();if(d){const a=Y(d),m=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드";e.push({card:m,cardName:m,benefit:`${d}${u?` (${u})`:""}`,discount:a,rate:a,imageUrl:l[0]})}}}return e=e.map(r=>{if(!r.imageUrl){const c=r.cardName||r.card||"",s=n.find(l=>{const d=l.cardName.toLowerCase(),u=c.toLowerCase();return d.includes(u.replace("카드",""))||u.includes(d.replace("카드",""))});if(s)return{...r,imageUrl:s.src}}return r}),e.sort((r,c)=>(c.discount??0)-(r.discount??0)),console.log("[CoupangParser] 최종 카드 혜택:",e),e},Pe=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const i=parseInt(n[1],10);return{rate:i,description:`기프트카드 ${i}% 할인`}}const o=t.querySelectorAll("div, span, p");for(const i of o){const r=i.textContent||"";if(r.includes("기프트카드")&&r.includes("%")){const c=r.match(/(\d+)\s*%/);if(c)return{rate:parseInt(c[1],10),description:r.trim()}}}return null},Ee=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const i of e){const r=i.textContent||"",c=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c&&r.includes("쿠팡캐시")){const s=h(c[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const o=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(o){const i=h(o[1]);if(i)return{amount:i,description:`쿠팡캐시 ${i.toLocaleString()} 원 적립`}}return null},Se=t=>{try{const e=[],n=new Set,o=t.querySelector(P.instantOption);if(!o)return e;const i=o.querySelectorAll("section > ul > li");for(const r of i)try{const c=r.querySelectorAll("div");if(c.length<2)continue;let s="";for(const a of c){const m=a.textContent||"";if(!m.includes("원")&&m.trim().length>0&&!m.includes("px")){s=m.trim();break}}let l="";for(const a of c){const x=(a.textContent||"").match(/[\d,]+원/);if(x){l=x[0].replace(/[,원]/g,"");break}}if(!l)continue;const d=parseInt(l);if(!d||d<100||!s||s.length<2)continue;const u=`${s}-${d}`;if(n.has(u))continue;if(e.push({name:s,price:d}),n.add(u),e.length>=15)break}catch(c){console.warn("[CoupangParser] Error parsing list item:",c);continue}return e}catch(e){return console.error("[CoupangParser] Error extracting variants:",e),[]}},ve=t=>t.querySelector(P.shipping)?.textContent?.trim()||null;class G extends N{siteName="Coupang";selectors={amount:P.amount};static isCheckoutPage(e){const n=/coupang\.com\/vp\//.test(e)||/coupang\.com\/n\//.test(e)||/coupang\.com\/products\//.test(e);return console.log(`[CoupangParser] isCheckoutPage("${e}") = ${n}`),n}parse(e){try{console.log("[CoupangParser] 🔍 Parsing Coupang page...");const n=le(e),o=de(e),i=ue(e),r=pe(e);let c=r.amount;const{originalPrice:s,discountPrice:l}=r;if(c||(c=me(e)),c||(c=fe(e)),!c)return console.debug("[CoupangParser] ❌ No price found"),null;const d=Ce(e).map(f=>{const g=f.rate??f.discount,C=f.cardName||f.card;return{card:C,cardName:C,benefit:f.benefit,discount:g,rate:g}}),u=Pe(e),a=Ee(e),m=ve(e),x=Se(e);return console.log(`[CoupangParser] ✅ Found: ${c} KRW`),{price:c,amount:c,currency:"KRW",title:n||void 0,imageUrl:o||void 0,images:i,variants:x,originalPrice:s||void 0,discountPrice:l||void 0,cardBenefits:d,giftCardDiscount:u||void 0,cashback:a||void 0,shippingInfo:m||void 0,discounts:[]}}catch(n){return console.error("[CoupangParser] ❌ Parse error:",n),null}}}const y={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},_e=[/11st\.co\.kr\/products\/(\d+)/,/m\.11st\.co\.kr\/products\/(\d+)/],T={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},we=t=>{const e=y.product;try{const n=t.querySelector(e.title);if(n?.textContent){const i=n.textContent.trim();return console.log("[11stParser][Product] 제목:",i),i}const o=t.querySelector(e.titleAlt);if(o?.textContent){const i=o.textContent.trim();return console.log("[11stParser][Product] 제목 (alt):",i),i}}catch(n){console.error("[11stParser][Product] 제목 추출 오류:",n)}return null},ke=t=>{try{const e=t.querySelector(y.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return console.log("[11stParser][Product] 부제목:",n),n}}catch(e){console.error("[11stParser][Product] 부제목 추출 오류:",e)}return null},Ne=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const o=t.match(n);if(o?.[1])return console.log("[11stParser][Product] 상품ID:",o[1]),o[1]}}catch(e){console.error("[11stParser][Product] 상품ID 추출 오류:",e)}return null},X=t=>{const e=y.image;try{const n=t.querySelector(e.main);if(n?.src){const r=w(n.src);return console.log("[11stParser][Image] 메인 이미지:",r),r}const o=t.querySelector(e.mainAlt);if(o?.src){const r=w(o.src);return console.log("[11stParser][Image] 메인 이미지 (alt):",r),r}const i=t.querySelector(`${e.main}[data-src]`);if(i?.dataset?.src){const r=w(i.dataset.src);return console.log("[11stParser][Image] 메인 이미지 (lazy):",r),r}}catch(n){console.error("[11stParser][Image] 이미지 추출 오류:",n)}return null},Ae=t=>{const e=[],n=new Set,o=y.image;try{const i=X(t);i&&(e.push(i),n.add(i)),t.querySelectorAll(o.thumbnail).forEach(s=>{const l=s,d=l.src||l.dataset?.src;if(d){const u=w(d),a=O(u);n.has(a)||(e.push(a),n.add(a))}}),t.querySelectorAll(o.thumbnailAlt).forEach(s=>{const l=s,d=l.src||l.dataset?.src;if(d){const u=w(d),a=O(u);n.has(a)||(e.push(a),n.add(a))}}),console.log("[11stParser][Image] 전체 이미지 수:",e.length)}catch(i){console.error("[11stParser][Image] 전체 이미지 추출 오류:",i)}return e},Ie=t=>{const e=y.seller,n={seller:null,rating:null};try{const o=t.querySelector(e.name);o?.textContent&&(n.seller=o.textContent.trim(),console.log("[11stParser][Seller] 판매자:",n.seller));const i=t.querySelector(e.rating);i?.textContent&&(n.rating=i.textContent.trim(),console.log("[11stParser][Seller] 등급:",n.rating))}catch(o){console.error("[11stParser][Seller] 판매자 정보 추출 오류:",o)}return n};function w(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function O(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const Be=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=y.price;try{const o=t.querySelector(n.originalPrice);o?.textContent&&(e.originalPrice=h(o.textContent),console.log("[11stParser][Price] 정가:",e.originalPrice));const i=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);i?.textContent&&(e.discountPrice=h(i.textContent),e.amount=e.discountPrice,console.log("[11stParser][Price] 판매가:",e.discountPrice));const r=t.querySelector(n.discountRate);r?.textContent&&(e.discountRate=h(r.textContent),console.log("[11stParser][Price] 할인율:",e.discountRate));const c=t.querySelector(n.maxDiscountPrice);c?.textContent&&(e.maxDiscountPrice=h(c.textContent),console.log("[11stParser][Price] 최대할인가:",e.maxDiscountPrice));const s=t.querySelector(n.maxDiscountRate);s?.textContent&&(e.maxDiscountRate=h(s.textContent),console.log("[11stParser][Price] 최대할인율:",e.maxDiscountRate)),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(o){console.error("[11stParser][Price] 가격 추출 오류:",o)}return e},De=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const o of n){const i=o.textContent||"";for(const r of e){const c=i.match(r);if(c?.[1]){const s=h(c[1]);if(s&&s>100&&s<1e8)return console.log("[11stParser][findPriceInDOM] 가격 발견:",s),s}}}return null},Te=t=>{const e=[],n=y.price;try{const o=t.querySelector(n.maxDiscountLayer);if(!o)return e;o.querySelectorAll(".discount_prices.list_type .field").forEach(r=>{const c=r.querySelector(".title"),s=r.querySelector(".price");if(c&&s){const l=c.textContent?.trim()||"",d=s.textContent?.trim()||"",u=h(d.replace("-",""));l&&u&&l!=="판매가"&&(e.push({type:l,amount:u}),console.log("[11stParser][DiscountDetail]",l,u))}})}catch(o){console.error("[11stParser][DiscountDetail] 오류:",o)}return e},$e=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=Re(t),e.totalPointAmount=e.points.reduce((n,o)=>n+o.amount,0),e.cardBenefits=qe(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,o)=>n+o.benefitAmount,0),e.installments=ze(t),e.maxInstallmentMonths=e.installments.reduce((n,o)=>Math.max(n,o.maxMonths),0),e.coupons=Fe(t),console.log("[11stParser][Benefits] 총 포인트:",e.totalPointAmount),console.log("[11stParser][Benefits] 총 카드혜택:",e.totalCardBenefitAmount),console.log("[11stParser][Benefits] 최대 무이자:",e.maxInstallmentMonths,"개월")}catch(n){console.error("[11stParser][Benefits] 혜택 추출 오류:",n)}return e},Re=t=>{const e=[],n=y.pointDetail;try{const o=t.querySelector(n.container);if(o){const i=o.querySelector(n.totalPoint);if(i?.textContent){const c=h(i.textContent);c&&(e.push({amount:c,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),console.log("[11stParser][Points] 최대 적립 포인트:",c))}const r=o.querySelector(n.elevenPaySection);if(r){const c=r.querySelector(".total .value");if(c?.textContent){const l=h(c.textContent);l&&!e.find(d=>d.amount===l&&d.type==="최대적립포인트")&&(e.push({amount:l,type:"11pay포인트",description:"11pay 결제 시 적립"}),console.log("[11stParser][Points] 11pay 포인트 총액:",l))}r.querySelectorAll(".desc li").forEach(l=>{const d=l.querySelector(".c_layer_expand button.c_product_btn"),u=l.querySelector(".value");if(d&&u){const a=d.textContent?.trim()||"",m=h(u.textContent||"");m&&a&&!a.includes("카드")&&(e.push({amount:m,type:a,description:a}),console.log("[11stParser][Points]",a,":",m))}})}}if(e.length===0){const i=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(i?.textContent){const r=h(i.textContent);r&&(e.push({amount:r,type:"기본적립",description:"기본 적립 포인트"}),console.log("[11stParser][Points] 기본 포인트:",r))}}}catch(o){console.error("[11stParser][Points] 포인트 추출 오류:",o)}return e},qe=t=>{const e=[],n=y.cardDiscount;try{const o=t.querySelector(n.container);o&&o.querySelectorAll(".benefit").forEach(c=>{const l=c.querySelector("dt")?.textContent?.trim()||"";if(!l)return;const d=W(l),u=c.querySelector("dd");u&&u.querySelectorAll(".tit_sub").forEach(m=>{const x=m.textContent?.trim()||"";if(x.includes("안내사항")||x.includes("적립제외"))return;let f=m.nextElementSibling;for(;f&&f.tagName!=="UL"&&f.tagName!=="SPAN";)f=f.nextElementSibling;if(f&&f.tagName==="UL"&&f.querySelectorAll("li").forEach(C=>{const E=C.textContent?.trim()||"",S=Me(x,E);S&&(e.find(v=>v.cardName===S.cardName&&v.benefitType===S.benefitType&&v.benefitAmount===S.benefitAmount)||e.push(S))}),x.includes("할인")||x.includes("적립")){const g=W(x);g&&g.benefitAmount>0&&(e.find(E=>E.cardName===g.cardName&&E.benefitType===g.benefitType)||e.push(g))}})});const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(c=>{const s=c.textContent?.trim()||"";if(s.includes("카드")||s.includes("신한")){const d=c.closest("li")?.querySelector(".value")?.textContent?.trim()||"",u=h(d);if(u){const a=s.replace(" 결제 시","").trim();e.find(m=>m.cardName===a&&m.benefitType==="포인트")||e.push({cardName:a,benefitAmount:u,benefitType:"포인트",condition:"결제 시"})}}}),console.log("[11stParser][CardBenefit] 추출된 카드 혜택:",e.length),e.forEach((r,c)=>{console.log(`  [${c+1}] ${r.cardName}: ${r.benefitAmount}${r.benefitType==="적립"?"%":r.benefitType==="할인"?"원":""} ${r.benefitType}`)})}catch(o){console.error("[11stParser][CardBenefit] 카드 혜택 추출 오류:",o)}return e};function W(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const l of e){const d=t.match(l);if(d){n=d[1];break}}if(!n)return null;let o=0,i="",r="";const c=t.match(/최대\s*(\d+)%\s*적립/);c&&(o=parseInt(c[1],10),i="적립",r="결제 시");const s=t.match(/([\d,]+)원\s*할인/);return s&&(o=h(s[1])||0,i="할인"),t.includes("첫 결제")?r="첫 결제 시":t.includes("결제 시")&&(r="결제 시"),{cardName:n,benefitAmount:o,benefitType:i||(t.includes("할인")?"할인":"적립"),condition:r}}function Me(t,e){if(!e)return null;let n="",o=0,i="",r="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const c=e.match(/([\d,]+)원\s*할인/);c&&(o=h(c[1])||0,i="할인");const s=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return s&&!i&&(o=parseFloat(s[1]),i="적립"),t.includes("첫 결제")?r="첫 결제 시":t.includes("결제 시")&&(r="결제 시"),!n||!o||!i?null:{cardName:n,benefitAmount:o,benefitType:i,condition:r}}const ze=t=>{const e=[],n=y.installment;try{const o=t.querySelector(n.dialogContainer);if(o&&(o.querySelectorAll(".card_box").forEach(r=>{const s=r.querySelector("dt")?.textContent?.trim()||"";if(!s)return;r.querySelectorAll("dd").forEach(d=>{const u=d.textContent?.trim()||"";if(!u)return;const a=Le(s,u);a&&e.push(a)})}),console.log("[11stParser][Installment] card_box에서 추출:",e.length)),e.length===0){const i=t.querySelector(n.triggerButton);if(i){const s=(i.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);s&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"})}Ue(t).forEach(c=>{e.find(s=>s.cardName===c.cardName)||e.push(c)})}console.log("[11stParser][Installment] 총 무이자 할부 카드 수:",e.length)}catch(o){console.error("[11stParser][Installment] 무이자 할부 추출 오류:",o)}return e};function Le(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const o=n[1],r=o.split(",").map(u=>parseInt(u.trim(),10)).filter(u=>!isNaN(u)),c=r.length>0?Math.max(...r):0;if(c===0)return null;let s=null;const l=e.match(/(\d+)만원/);l&&(s=parseInt(l[1],10)*1e4);let d="";return e.includes("11pay")?d="11pay 결제 시":e.includes("카카오페이")?d="카카오페이 결제 시":s&&(d=`${s/1e4}만원 이상`),{cardName:t,maxMonths:c,minAmount:s,months:o+"개월",condition:d}}function Ue(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(i=>{const r=i.textContent||"",c=r.match(/최대\s*(\d+)\s*개월\s*무이자/);c&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"}),n.forEach(s=>{if(r.includes(s)){const d=r.substring(r.indexOf(s)).match(/([\d,]+)개월/);if(d&&!e.find(a=>a.cardName.includes(s))){const a=d[1],m=a.split(",").map(f=>parseInt(f.trim(),10)),x=Math.max(...m.filter(f=>!isNaN(f)));e.push({cardName:s+"카드",maxMonths:x,minAmount:null,months:a+"개월",condition:""})}}})}),e}const Fe=t=>{const e=[],n=y.coupon;try{const o=t.querySelector(n.badge);if(o?.textContent){const r=o.textContent.trim(),c=Oe(r);c&&(e.push(c),console.log("[11stParser][Coupon]",c))}t.querySelectorAll(n.item).forEach(r=>{const c=r.querySelector(n.name),s=r.querySelector(n.discount);if(c||s){const l=c?.textContent?.trim()||"쿠폰",d=s?.textContent||"",u=d.includes("원")?h(d):null,a=d.includes("%")?h(d):null;e.push({name:l,discountAmount:u,discountRate:a})}})}catch(o){console.error("[11stParser][Coupon] 쿠폰 추출 오류:",o)}return e};function Oe(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:h(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function $(t){let e=t.replace(/11번가\s*/g,"").trim();e=e.replace(/\s*신용카드/g,"카드").replace(/\s*체크카드/g,"카드");const n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:o,name:i}of n)for(const r of o)if(e.toUpperCase().includes(r.toUpperCase()))return i;return e||t}class J extends N{siteName=T.siteName;selectors={amount:[y.price.salePrice,y.price.salePriceAlt,y.price.maxDiscountPrice],title:[y.product.title,y.product.titleAlt],image:[y.image.main,y.image.mainAlt]};static isProductPage(e){const n=_e.some(o=>o.test(e));return console.log(`[ElevenStreetParser] isProductPage("${e}") = ${n}`),n}static extractProductId(e){return Ne(e)}parse(e){try{console.log("[ElevenStreetParser] 🔍 Parsing 11번가 page...");const n=we(e),o=ke(e),i=X(e),r=Ae(e),c=Ie(e),s=Be(e);let l=s.amount;const{originalPrice:d,discountPrice:u,maxDiscountPrice:a,discountRate:m,maxDiscountRate:x}=s;if(l||(l=De(e)),!l)return console.debug("[ElevenStreetParser] ❌ No price found"),null;const f=Te(e),g=$e(e),{points:C,cardBenefits:E,installments:S,coupons:M,totalPointAmount:v,totalCardBenefitAmount:ce,maxInstallmentMonths:z}=g,L=E.map(b=>{const U=$(b.cardName),D=b.benefitType==="할인",se=b.benefitAmount<=100?b.benefitAmount:0;let A="";return D?A=`${b.benefitAmount.toLocaleString()}원 할인`:b.benefitAmount<=100?A=`${b.benefitAmount}% 적립`:A=`${b.benefitAmount.toLocaleString()}P 적립`,{card:U,cardName:U,benefit:A,discount:D?b.benefitAmount:0,rate:se,condition:b.condition,benefitType:D?"discount":"rate",pointAmount:0}});S.forEach(b=>{b.cardName!=="__INSTALLMENT_SUMMARY__"&&L.push({card:$(b.cardName),cardName:$(b.cardName),benefit:`${b.months} 무이자`,discount:0,rate:0,condition:b.condition,benefitType:"installment",pointAmount:0})});const B=[];return m&&B.push({rate:m,type:"SALE_DISCOUNT",description:"할인가"}),f.forEach(b=>{B.push({rate:b.amount,type:b.type.toUpperCase().replace(/\s+/g,"_"),description:b.type})}),console.log(`[ElevenStreetParser] ✅ Found: ${l.toLocaleString()} ${T.currency}`),console.log(`[ElevenStreetParser] 📌 Title: ${n}`),console.log(`[ElevenStreetParser] 🎁 총 포인트: ${v.toLocaleString()}P`),console.log(`[ElevenStreetParser] 💳 카드 혜택 수: ${E.length}`),console.log(`[ElevenStreetParser] 🏦 무이자 할부 카드 수: ${S.length}, 최대 ${z}개월`),{price:l,amount:l,currency:T.currency,title:n?`${n}${o?` ${o}`:""}`:void 0,imageUrl:i||void 0,images:r,originalPrice:d||void 0,discountPrice:u||a||void 0,discountRate:m||void 0,cardBenefits:L,discounts:B,elevenst:{maxDiscountPrice:a,maxDiscountRate:x,maxInstallmentMonths:z,points:C,installments:S,coupons:M,totalPointAmount:v,totalCardBenefitAmount:ce,seller:c.seller,sellerRating:c.rating,discountDetails:f}}}catch(n){return console.error("[ElevenStreetParser] ❌ Parse error:",n),null}}}const We={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class Z extends N{siteName="Amazon";selectors={amount:We.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{console.log("[AmazonParser] 🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[AmazonParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[AmazonParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[AmazonParser] ❌ Invalid amount:",o),null;const i=this.extractCurrency(n),{title:r,imageUrl:c}=this.extractCommonInfo(e);return console.log(`[AmazonParser] ✅ Found: ${o} ${i}`),{price:o,amount:o,currency:i,title:r||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return console.error("[AmazonParser] ❌ Parse error:",n),null}}}const Ke={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class Q extends N{siteName="eBay";selectors={amount:Ke.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{console.log("[EbayParser] 🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(console.log("[EbayParser] Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return console.debug("[EbayParser] ❌ Amount not found"),null;const o=this.extractNumber(n);if(!o||!this.isValidPrice(o))return console.debug("[EbayParser] ❌ Invalid amount:",o),null;const i=this.extractCurrency(n),{title:r,imageUrl:c}=this.extractCommonInfo(e);return console.log(`[EbayParser] ✅ Found: ${o} ${i}`),{price:o,amount:o,currency:i,title:r||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return console.error("[EbayParser] ❌ Parse error:",n),null}}}const He={amount:[]};class ee extends N{siteName="Fallback";selectors={amount:He.amount};parse(e){try{console.log("[FallbackParser] 🔍 Fallback parsing (text heuristic)...");const o=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!o)return console.debug('[FallbackParser] ❌ No price with "원" found'),null;const i=this.extractNumber(o[1]);if(!i||!this.isValidPrice(i))return console.debug("[FallbackParser] ❌ Invalid amount:",i),null;const{title:r,imageUrl:c}=this.extractCommonInfo(e);return console.log(`[FallbackParser] ✅ Found: ${i} KRW (via text heuristic)`),{price:i,amount:i,currency:"KRW",title:r||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return console.error("[FallbackParser] ❌ Parse error:",n),null}}}const je=`
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
`,k=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",o=new Set(["KRW","JPY"]),i={style:"currency",currency:n};let r=t;o.has(n)&&(i.minimumFractionDigits=0,i.maximumFractionDigits=0,r=Math.round(t));const c=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(c,i).format(r)},Ve=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),R="picsel-toggle-host",q="picsel-toggle-panel",Ye={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},Ge=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return Ye[e]||String(t)},p={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null},Xe=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const o=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(o){const a=document.createElement("img");a.src=o,a.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(a)}else{const a=document.createElement("span");a.textContent="No Image",a.style.fontSize="11px",a.style.color="#64748b",n.appendChild(a)}const i=document.createElement("div");i.className="picsel-product-info";const r=document.createElement("h3");r.className="picsel-product-title",r.textContent=t.title||"상품 정보를 찾을 수 없어요.";const c=document.createElement("div");c.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=k(s,t.currency??"KRW");if(l){const a=document.createElement("div");a.className="picsel-final-price",a.textContent=l,c.appendChild(a)}const d=k(t.originalPrice,t.currency??"KRW"),u=Ve(t.originalPrice,s);if(d&&u){const a=document.createElement("div");a.className="picsel-original-price",a.textContent=d;const m=document.createElement("div");m.className="picsel-discount-tag",m.textContent=`-${u}%`,c.appendChild(a),c.appendChild(m)}if(i.appendChild(r),i.appendChild(c),t.shippingInfo){const a=document.createElement("div");a.className="picsel-shipping",a.textContent=`배송: ${t.shippingInfo}`,i.appendChild(a)}return e.appendChild(n),e.appendChild(i),e},Je=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),Ze=(t,e)=>typeof t!="number"||e===null?null:t-e,K=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,o]of Object.entries(e))if(t.includes(n))return o;return t.replace("카드","").substring(0,2).toUpperCase()},Qe=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:o,svg:i}of n)for(const r of o)if(e.includes(r.toUpperCase()))return chrome.runtime.getURL(`assets/card/${i}`);return null},et=(t,e,n)=>{const o=e===0?" recommended":e===1?" rank-2":e===2?" rank-3":"",i=document.createElement("div");i.className=`picsel-card-benefit-item${o}`;const r=t.cardName||t.card||"카드",s=Qe(r)||t.imageUrl;if(s){const f=document.createElement("div");f.className="picsel-card-image-wrapper";const g=document.createElement("img");g.src=s,g.alt=r,g.className="picsel-card-image",g.onerror=()=>{const C=K(r);f.innerHTML=`
				<div class="picsel-card-initial">${C}</div>
			`},f.appendChild(g),i.appendChild(f)}else{const f=K(r),g=document.createElement("div");g.className="picsel-card-image-wrapper",g.innerHTML=`<div class="picsel-card-initial">${f}</div>`,i.appendChild(g)}const l=document.createElement("div");l.className="picsel-card-info";const d=document.createElement("div");if(d.className="picsel-card-header",e<3&&(t.discountAmount??0)>0){const f=document.createElement("span");f.className="picsel-recommended-badge",f.textContent=`${e+1}위`,d.appendChild(f)}const u=document.createElement("span");u.className="picsel-card-name";const a=r.includes(",")?r.split(",")[0].trim():r;if(u.textContent=a,d.appendChild(u),l.appendChild(d),t.benefit){const f=document.createElement("div");f.className="picsel-card-benefit-desc",f.textContent=t.benefit,l.appendChild(f)}i.appendChild(l);const m=document.createElement("div");if(m.className="picsel-card-amount",t.benefitType==="installment"){const f=document.createElement("div");f.className="picsel-card-installment",f.textContent=t.benefit||"무이자",m.appendChild(f)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const C=document.createElement("div");C.className="picsel-card-final-price";const E=k(t.finalPrice,n);C.textContent=E,m.appendChild(C)}const f=document.createElement("div");f.className="picsel-card-discount";const g=k(t.discountAmount,n);f.textContent=`-${g}`,m.appendChild(f)}else if(typeof t.rate=="number"&&t.rate>0){const f=document.createElement("div");f.className="picsel-card-rate",f.textContent=`${t.rate}%`,m.appendChild(f)}return i.appendChild(m),i},tt=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const u=document.createElement("section");u.className="picsel-section picsel-card-section";const a=document.createElement("h4");a.className="picsel-section-title",a.textContent="카드별 혜택",u.appendChild(a);const m=document.createElement("div");return m.className="picsel-empty-benefits",m.textContent="카드 혜택 정보를 불러오는 중...",u.appendChild(m),u}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,o=e.map(u=>{const a=u;if(a.benefitType==="point")return null;if(a.benefitType==="installment")return{...a,cardName:a.cardName??a.card,rate:0,discountAmount:0,finalPrice:n};const m=a.rate??a.discount,x=typeof m=="number"&&m<=100?m:0,f=Je(n,x),g=Ze(n,f);return{...a,cardName:a.cardName??a.card,rate:x,discountAmount:f??void 0,finalPrice:g??void 0}}).filter(u=>u!==null).sort((u,a)=>{const m=u?.discountAmount??0;return(a?.discountAmount??0)-m}),i=document.createElement("section");i.className="picsel-section picsel-card-section";const r=document.createElement("h4");r.className="picsel-section-title",r.textContent="카드별 혜택 비교",i.appendChild(r);const c=document.createElement("div");c.className="picsel-card-benefit-list";const s=t.currency??"KRW";o.forEach((u,a)=>{const m=et(u,a,s);c.appendChild(m)}),i.appendChild(c);const l=[],d=t.elevenst?.totalPointAmount??0;if(d>0&&l.push(`최대 적립 포인트 ${d.toLocaleString()}P`),t.giftCardDiscount?.description&&l.push(t.giftCardDiscount.description),t.cashback?.description&&l.push(t.cashback.description),l.length>0){const u=document.createElement("div");u.className="picsel-sub-benefits",l.forEach(a=>{const m=document.createElement("div");m.className="picsel-sub-benefit-item",m.textContent=a,u.appendChild(m)}),i.appendChild(u)}return i},nt=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const o=document.createElement("button");return o.className="picsel-footer-confirm",o.textContent="확인했습니다",o.type="button",o.addEventListener("click",()=>{_(!1)}),n.appendChild(o),e.appendChild(n),e},H=t=>{const{buttonBadgeEl:e}=p;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(i=>{const r=i,c=r.rate??r.discount;return typeof c=="number"?c:0}).filter(i=>i>0):[];if(n.length>0){const i=Math.max(...n);e.textContent=`최대 ${i}%`,e.style.display="inline-flex";return}const o=t.cashback?.amount;if(typeof o=="number"&&o>0){const i=k(o,t.currency??"KRW");e.textContent=i?`${i} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},te=()=>{const{contentEl:t,cachedData:e}=p;if(!t)return;if(t.textContent="",!e){const c=document.createElement("p");c.className="picsel-empty-state",c.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(c),H(null);return}const n=e,o=Xe(n);t.appendChild(o);const i=tt(n);i&&t.appendChild(i);const r=nt();r&&t.appendChild(r),H(n)},_=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:o}=p;!e||!n||!o||(t?(e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),o.textContent="PicSel 혜택 닫기"):(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),o.textContent="PicSel 혜택 보기"))},ot=()=>{if(p.mounted)return;if(document.getElementById(R)){const r=document.getElementById(R);r&&(p.hostElement=r,p.shadowRoot=r.shadowRoot,r.shadowRoot&&(p.toggleButton=r.shadowRoot.querySelector(".picsel-toggle-button"),p.buttonLabelEl=r.shadowRoot.querySelector(".picsel-toggle-label"),p.buttonBadgeEl=r.shadowRoot.querySelector(".picsel-toggle-badge"),p.panelEl=r.shadowRoot.querySelector(`#${q}`),p.closeButtonEl=r.shadowRoot.querySelector(".picsel-close-button"),p.contentEl=r.shadowRoot.querySelector(".picsel-panel-content"),p.panelTitleEl=r.shadowRoot.querySelector(".picsel-panel-title"))),p.mounted=!0;return}p.hostElement=document.createElement("div"),p.hostElement.id=R,p.hostElement.style.position="fixed",p.hostElement.style.bottom="24px",p.hostElement.style.right="24px",p.hostElement.style.zIndex=String(2147483647),p.shadowRoot=p.hostElement.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=je,p.shadowRoot.appendChild(t);const e=document.createElement("div");e.className="picsel-toggle-container",p.shadowRoot.appendChild(e),p.toggleButton=document.createElement("button"),p.toggleButton.className="picsel-toggle-button",p.toggleButton.type="button",p.toggleButton.setAttribute("aria-expanded","false"),p.buttonLabelEl=document.createElement("span"),p.buttonLabelEl.className="picsel-toggle-label",p.buttonLabelEl.textContent="PicSel 혜택 보기",p.toggleButton.appendChild(p.buttonLabelEl),p.buttonBadgeEl=document.createElement("span"),p.buttonBadgeEl.className="picsel-toggle-badge",p.toggleButton.appendChild(p.buttonBadgeEl),e.appendChild(p.toggleButton),p.panelEl=document.createElement("div"),p.panelEl.className="picsel-panel",p.panelEl.id=q,p.panelEl.setAttribute("role","dialog"),p.panelEl.setAttribute("aria-hidden","true"),p.toggleButton.setAttribute("aria-controls",q);const n=document.createElement("div");n.className="picsel-panel-header",p.panelTitleEl=document.createElement("div"),p.panelTitleEl.className="picsel-panel-title",p.panelTitleEl.textContent="PicSel 혜택 정보",p.closeButtonEl=document.createElement("button"),p.closeButtonEl.type="button",p.closeButtonEl.className="picsel-close-button",p.closeButtonEl.setAttribute("aria-label","닫기"),p.closeButtonEl.textContent="✕",n.appendChild(p.panelTitleEl),n.appendChild(p.closeButtonEl),p.panelEl.appendChild(n),p.contentEl=document.createElement("div"),p.contentEl.className="picsel-panel-content",p.panelEl.appendChild(p.contentEl),e.appendChild(p.panelEl);const o=p.panelEl,i=p.hostElement;p.toggleButton.addEventListener("click",()=>{const r=!o.classList.contains("open");_(r)}),p.closeButtonEl.addEventListener("click",()=>{_(!1)}),window.addEventListener("keydown",r=>{r.key==="Escape"&&_(!1)}),document.addEventListener("click",r=>{if(!o.classList.contains("open"))return;const c=r.composedPath();i&&!c.includes(i)&&_(!1)},!0),document.body.appendChild(p.hostElement),p.mounted=!0},ne=()=>{if(p.panelTitleEl&&p.cachedData?.site){const t=Ge(p.cachedData.site);p.panelTitleEl.textContent=`${t} 혜택 정보`}},oe=t=>{p.cachedData={...t},ot(),ne(),te(),_(!1)},re=t=>{if(p.cachedData={...p.cachedData??{},...t},!p.mounted){oe(p.cachedData);return}ne(),te()};if(window.self!==window.top)throw new Error("[ContentScript] Skipping iframe context");console.log("[ContentScript] ✅ Content script initialized in main frame");function rt(t){return console.log("[Content] 🔍 Detecting checkout page for URL:",t),G.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Coupang checkout page"),{site:"coupang",isCheckout:!0}):J.isProductPage(t)?(console.log("[Content] ✅ Detected 11번가 product page"),{site:"11st",isCheckout:!0}):Z.isCheckoutPage(t)?(console.log("[Content] ✅ Detected Amazon checkout page"),{site:"amazon",isCheckout:!0}):Q.isCheckoutPage(t)?(console.log("[Content] ✅ Detected eBay checkout page"),{site:"ebay",isCheckout:!0}):(console.log("[Content] ❌ No checkout page detected"),null)}function it(t){switch(console.log(`[Content] 📦 Creating parser for site: ${t}`),t){case"coupang":return new G;case"11st":return new J;case"amazon":return new Z;case"ebay":return new Q;default:return new ee}}function ie(){const t=window.location.href;console.log("[Content] 🚀 Starting payment info extraction for URL:",t);const e=rt(t);if(!e)return console.log("[Content] ❌ Not a checkout page, skipping extraction"),null;const{site:n,isCheckout:o}=e;console.log(`[Content] ✅ Checkout detected: ${n}, isCheckout: ${o}`);const i=it(n);if(console.log(`[Content] 📝 Using parser: ${i.siteName}`),!i)return console.error(`[Content] ❌ No parser found for site: ${n}`),null;let r=i.parse(document);if(r)console.log("[Content] ✅ Parse successful:",{title:r.title?.substring(0,50),amount:r.amount,hasCardBenefits:!!r.cardBenefits});else if(console.warn("[Content] ⚠️ Parse returned null, trying fallback..."),r=new ee().parse(document),!r)return null;return{paymentInfo:r,site:n}}function ct(t,e){chrome.runtime.sendMessage({type:"SAVE_PRODUCT_DATA",data:t,url:window.location.href,timestamp:Date.now()},n=>{n?.success?(console.log("[ContentScript] ✅ Data saved",{responseSuccess:n.success,savedAmount:n.savedData?.amount,savedCurrency:n.savedData?.currency}),re({...t,site:e})):console.error("[ContentScript] ❌ Background error:",{error:n?.error,message:n?.message})})}function j(){if(console.log("[ContentScript] Initializing..."),window.self!==window.top){console.debug("[ContentScript] Skipping - running in iframe context");return}const t=ie();if(!t){console.warn("[ContentScript] Failed to extract");return}const{paymentInfo:e,site:n}=t;console.log("[ContentScript] Extracted data:",e),oe({...e,site:n}),console.log("[ContentScript] Sending to background..."),ct(e,n)}function V(){const t=new MutationObserver(e=>{e.some(o=>o.addedNodes.length>0&&Array.from(o.addedNodes).some(i=>i.tagName==="IFRAME"||i instanceof Element&&i.querySelector("iframe")))&&(console.log("[ContentScript] 🔄 New iframe detected, re-parsing dynamic content..."),setTimeout(()=>{const o=ie();if(o){const{paymentInfo:i,site:r}=o;console.log("[ContentScript] ✅ Dynamic content re-parsed:",i),re({...i,site:r}),chrome.runtime.sendMessage({type:"UPDATE_PRODUCT_DATA",data:i,timestamp:Date.now(),source:"dynamic-iframe"},c=>{c?.success&&console.log("[ContentScript] ✅ Dynamic data updated in storage")})}},500),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0,attributes:!1}),console.log("[ContentScript] 📡 Dynamic content observer started")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{j(),V()}):(j(),V());
