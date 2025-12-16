import{b as er,p as ce,E as T,a as d,l as k,L as I,n as dt,d as ne}from"./assets/index-CtnQ7lw9.js";import{u as ae}from"./assets/store-SF67hG8t.js";import{S as tr}from"./assets/chromeStorage-BOBytA-p.js";import{C as nr}from"./assets/constants-DOucEiR9.js";const rr=window.self===window.top;function or(t){if(!rr){er.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const Zt="picsel-toggle-host",pt="picsel-toggle-panel",ir={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},sr=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return ir[e]||String(t)},f={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null,comparison:{status:"idle",query:null,error:null,data:null}},fe=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const c=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(c,o).format(i)},cr=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),ar=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const p=document.createElement("img");p.src=r,p.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(p)}else{const p=document.createElement("span");p.textContent="No Image",p.style.fontSize="11px",p.style.color="#64748b",n.appendChild(p)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const c=document.createElement("div");c.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=fe(s,t.currency??"KRW");if(l){const p=document.createElement("div");p.className="picsel-final-price",p.textContent=l,c.appendChild(p)}const u=fe(t.originalPrice,t.currency??"KRW"),m=cr(t.originalPrice,s);if(u&&m){const p=document.createElement("div");p.className="picsel-original-price",p.textContent=u;const b=document.createElement("div");b.className="picsel-discount-tag",b.textContent=`-${m}%`,c.appendChild(p),c.appendChild(b)}if(o.appendChild(i),o.appendChild(c),t.shippingInfo){const p=document.createElement("div");p.className="picsel-shipping",p.textContent=`배송: ${t.shippingInfo}`,o.appendChild(p)}return e.appendChild(n),e.appendChild(o),e};const{entries:hn,setPrototypeOf:Jt,isFrozen:lr,getPrototypeOf:ur,getOwnPropertyDescriptor:dr}=Object;let{freeze:W,seal:V,create:_t}=Object,{apply:Ct,construct:St}=typeof Reflect<"u"&&Reflect;W||(W=function(e){return e});V||(V=function(e){return e});Ct||(Ct=function(e,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return e.apply(n,o)});St||(St=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new e(...r)});const $e=H(Array.prototype.forEach),pr=H(Array.prototype.lastIndexOf),Qt=H(Array.prototype.pop),Ne=H(Array.prototype.push),fr=H(Array.prototype.splice),He=H(String.prototype.toLowerCase),ft=H(String.prototype.toString),mt=H(String.prototype.match),ke=H(String.prototype.replace),mr=H(String.prototype.indexOf),gr=H(String.prototype.trim),Z=H(Object.prototype.hasOwnProperty),$=H(RegExp.prototype.test),Ie=hr(TypeError);function H(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Ct(t,e,r)}}function hr(t){return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return St(t,n)}}function S(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:He;Jt&&Jt(t,null);let r=e.length;for(;r--;){let o=e[r];if(typeof o=="string"){const i=n(o);i!==o&&(lr(e)||(e[r]=i),o=i)}t[o]=!0}return t}function xr(t){for(let e=0;e<t.length;e++)Z(t,e)||(t[e]=null);return t}function te(t){const e=_t(null);for(const[n,r]of hn(t))Z(t,n)&&(Array.isArray(r)?e[n]=xr(r):r&&typeof r=="object"&&r.constructor===Object?e[n]=te(r):e[n]=r);return e}function Re(t,e){for(;t!==null;){const r=dr(t,e);if(r){if(r.get)return H(r.get);if(typeof r.value=="function")return H(r.value)}t=ur(t)}function n(){return null}return n}const en=W(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),gt=W(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ht=W(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),br=W(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),xt=W(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Er=W(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),tn=W(["#text"]),nn=W(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),bt=W(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),rn=W(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),We=W(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),yr=V(/\{\{[\w\W]*|[\w\W]*\}\}/gm),_r=V(/<%[\w\W]*|[\w\W]*%>/gm),Cr=V(/\$\{[\w\W]*/gm),Sr=V(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ar=V(/^aria-[\-\w]+$/),xn=V(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Tr=V(/^(?:\w+script|data):/i),wr=V(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),bn=V(/^html$/i),vr=V(/^[a-z][.\w]*(-[.\w]+)+$/i);var on=Object.freeze({__proto__:null,ARIA_ATTR:Ar,ATTR_WHITESPACE:wr,CUSTOM_ELEMENT:vr,DATA_ATTR:Sr,DOCTYPE_NAME:bn,ERB_EXPR:_r,IS_ALLOWED_URI:xn,IS_SCRIPT_OR_DATA:Tr,MUSTACHE_EXPR:yr,TMPLIT_EXPR:Cr});const De={element:1,text:3,progressingInstruction:7,comment:8,document:9},Pr=function(){return typeof window>"u"?null:window},Nr=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const i="dompurify"+(r?"#"+r:"");try{return e.createPolicy(i,{createHTML(c){return c},createScriptURL(c){return c}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},sn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function En(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Pr();const e=y=>En(y);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==De.document||!t.Element)return e.isSupported=!1,e;let{document:n}=t;const r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:c,Node:s,Element:l,NodeFilter:u,NamedNodeMap:m=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:b,trustedTypes:g}=t,x=l.prototype,_=Re(x,"cloneNode"),C=Re(x,"remove"),v=Re(x,"nextSibling"),F=Re(x,"childNodes"),j=Re(x,"parentNode");if(typeof c=="function"){const y=n.createElement("template");y.content&&y.content.ownerDocument&&(n=y.content.ownerDocument)}let A,Y="";const{implementation:G,createNodeIterator:le,createDocumentFragment:Ae,getElementsByTagName:Te}=n,{importNode:qn}=r;let q=sn();e.isSupported=typeof hn=="function"&&typeof j=="function"&&G&&G.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Xe,ERB_EXPR:Ze,TMPLIT_EXPR:Je,DATA_ATTR:$n,ARIA_ATTR:Wn,IS_SCRIPT_OR_DATA:Hn,ATTR_WHITESPACE:vt,CUSTOM_ELEMENT:Gn}=on;let{IS_ALLOWED_URI:Pt}=on,L=null;const Nt=S({},[...en,...gt,...ht,...xt,...tn]);let O=null;const kt=S({},[...nn,...bt,...rn,...We]);let N=Object.seal(_t(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,Qe=null;const me=Object.seal(_t(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let It=!0,et=!0,Rt=!1,Dt=!0,ge=!1,Me=!0,ue=!1,tt=!1,nt=!1,he=!1,Oe=!1,Be=!1,Lt=!0,Mt=!1;const Kn="user-content-";let rt=!0,ve=!1,xe={},Q=null;const ot=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ot=null;const Bt=S({},["audio","video","img","source","image","track"]);let it=null;const Ut=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ue="http://www.w3.org/1998/Math/MathML",ze="http://www.w3.org/2000/svg",re="http://www.w3.org/1999/xhtml";let be=re,st=!1,ct=null;const jn=S({},[Ue,ze,re],ft);let Fe=S({},["mi","mo","mn","ms","mtext"]),qe=S({},["annotation-xml"]);const Yn=S({},["title","style","font","a","script"]);let Pe=null;const Vn=["application/xhtml+xml","text/html"],Xn="text/html";let D=null,Ee=null;const Zn=n.createElement("form"),zt=function(a){return a instanceof RegExp||a instanceof Function},at=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ee&&Ee===a)){if((!a||typeof a!="object")&&(a={}),a=te(a),Pe=Vn.indexOf(a.PARSER_MEDIA_TYPE)===-1?Xn:a.PARSER_MEDIA_TYPE,D=Pe==="application/xhtml+xml"?ft:He,L=Z(a,"ALLOWED_TAGS")?S({},a.ALLOWED_TAGS,D):Nt,O=Z(a,"ALLOWED_ATTR")?S({},a.ALLOWED_ATTR,D):kt,ct=Z(a,"ALLOWED_NAMESPACES")?S({},a.ALLOWED_NAMESPACES,ft):jn,it=Z(a,"ADD_URI_SAFE_ATTR")?S(te(Ut),a.ADD_URI_SAFE_ATTR,D):Ut,Ot=Z(a,"ADD_DATA_URI_TAGS")?S(te(Bt),a.ADD_DATA_URI_TAGS,D):Bt,Q=Z(a,"FORBID_CONTENTS")?S({},a.FORBID_CONTENTS,D):ot,we=Z(a,"FORBID_TAGS")?S({},a.FORBID_TAGS,D):te({}),Qe=Z(a,"FORBID_ATTR")?S({},a.FORBID_ATTR,D):te({}),xe=Z(a,"USE_PROFILES")?a.USE_PROFILES:!1,It=a.ALLOW_ARIA_ATTR!==!1,et=a.ALLOW_DATA_ATTR!==!1,Rt=a.ALLOW_UNKNOWN_PROTOCOLS||!1,Dt=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ge=a.SAFE_FOR_TEMPLATES||!1,Me=a.SAFE_FOR_XML!==!1,ue=a.WHOLE_DOCUMENT||!1,he=a.RETURN_DOM||!1,Oe=a.RETURN_DOM_FRAGMENT||!1,Be=a.RETURN_TRUSTED_TYPE||!1,nt=a.FORCE_BODY||!1,Lt=a.SANITIZE_DOM!==!1,Mt=a.SANITIZE_NAMED_PROPS||!1,rt=a.KEEP_CONTENT!==!1,ve=a.IN_PLACE||!1,Pt=a.ALLOWED_URI_REGEXP||xn,be=a.NAMESPACE||re,Fe=a.MATHML_TEXT_INTEGRATION_POINTS||Fe,qe=a.HTML_INTEGRATION_POINTS||qe,N=a.CUSTOM_ELEMENT_HANDLING||{},a.CUSTOM_ELEMENT_HANDLING&&zt(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(N.tagNameCheck=a.CUSTOM_ELEMENT_HANDLING.tagNameCheck),a.CUSTOM_ELEMENT_HANDLING&&zt(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(N.attributeNameCheck=a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),a.CUSTOM_ELEMENT_HANDLING&&typeof a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(N.allowCustomizedBuiltInElements=a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ge&&(et=!1),Oe&&(he=!0),xe&&(L=S({},tn),O=[],xe.html===!0&&(S(L,en),S(O,nn)),xe.svg===!0&&(S(L,gt),S(O,bt),S(O,We)),xe.svgFilters===!0&&(S(L,ht),S(O,bt),S(O,We)),xe.mathMl===!0&&(S(L,xt),S(O,rn),S(O,We))),a.ADD_TAGS&&(typeof a.ADD_TAGS=="function"?me.tagCheck=a.ADD_TAGS:(L===Nt&&(L=te(L)),S(L,a.ADD_TAGS,D))),a.ADD_ATTR&&(typeof a.ADD_ATTR=="function"?me.attributeCheck=a.ADD_ATTR:(O===kt&&(O=te(O)),S(O,a.ADD_ATTR,D))),a.ADD_URI_SAFE_ATTR&&S(it,a.ADD_URI_SAFE_ATTR,D),a.FORBID_CONTENTS&&(Q===ot&&(Q=te(Q)),S(Q,a.FORBID_CONTENTS,D)),a.ADD_FORBID_CONTENTS&&(Q===ot&&(Q=te(Q)),S(Q,a.ADD_FORBID_CONTENTS,D)),rt&&(L["#text"]=!0),ue&&S(L,["html","head","body"]),L.table&&(S(L,["tbody"]),delete we.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ie('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ie('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=a.TRUSTED_TYPES_POLICY,Y=A.createHTML("")}else A===void 0&&(A=Nr(g,o)),A!==null&&typeof Y=="string"&&(Y=A.createHTML(""));W&&W(a),Ee=a}},Ft=S({},[...gt,...ht,...br]),qt=S({},[...xt,...Er]),Jn=function(a){let h=j(a);(!h||!h.tagName)&&(h={namespaceURI:be,tagName:"template"});const E=He(a.tagName),P=He(h.tagName);return ct[a.namespaceURI]?a.namespaceURI===ze?h.namespaceURI===re?E==="svg":h.namespaceURI===Ue?E==="svg"&&(P==="annotation-xml"||Fe[P]):!!Ft[E]:a.namespaceURI===Ue?h.namespaceURI===re?E==="math":h.namespaceURI===ze?E==="math"&&qe[P]:!!qt[E]:a.namespaceURI===re?h.namespaceURI===ze&&!qe[P]||h.namespaceURI===Ue&&!Fe[P]?!1:!qt[E]&&(Yn[E]||!Ft[E]):!!(Pe==="application/xhtml+xml"&&ct[a.namespaceURI]):!1},ee=function(a){Ne(e.removed,{element:a});try{j(a).removeChild(a)}catch{C(a)}},de=function(a,h){try{Ne(e.removed,{attribute:h.getAttributeNode(a),from:h})}catch{Ne(e.removed,{attribute:null,from:h})}if(h.removeAttribute(a),a==="is")if(he||Oe)try{ee(h)}catch{}else try{h.setAttribute(a,"")}catch{}},$t=function(a){let h=null,E=null;if(nt)a="<remove></remove>"+a;else{const R=mt(a,/^[\r\n\t ]+/);E=R&&R[0]}Pe==="application/xhtml+xml"&&be===re&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");const P=A?A.createHTML(a):a;if(be===re)try{h=new b().parseFromString(P,Pe)}catch{}if(!h||!h.documentElement){h=G.createDocument(be,"template",null);try{h.documentElement.innerHTML=st?Y:P}catch{}}const z=h.body||h.documentElement;return a&&E&&z.insertBefore(n.createTextNode(E),z.childNodes[0]||null),be===re?Te.call(h,ue?"html":"body")[0]:ue?h.documentElement:z},Wt=function(a){return le.call(a.ownerDocument||a,a,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},lt=function(a){return a instanceof p&&(typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||!(a.attributes instanceof m)||typeof a.removeAttribute!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function")},Ht=function(a){return typeof s=="function"&&a instanceof s};function oe(y,a,h){$e(y,E=>{E.call(e,a,h,Ee)})}const Gt=function(a){let h=null;if(oe(q.beforeSanitizeElements,a,null),lt(a))return ee(a),!0;const E=D(a.nodeName);if(oe(q.uponSanitizeElement,a,{tagName:E,allowedTags:L}),Me&&a.hasChildNodes()&&!Ht(a.firstElementChild)&&$(/<[/\w!]/g,a.innerHTML)&&$(/<[/\w!]/g,a.textContent)||a.nodeType===De.progressingInstruction||Me&&a.nodeType===De.comment&&$(/<[/\w]/g,a.data))return ee(a),!0;if(!(me.tagCheck instanceof Function&&me.tagCheck(E))&&(!L[E]||we[E])){if(!we[E]&&jt(E)&&(N.tagNameCheck instanceof RegExp&&$(N.tagNameCheck,E)||N.tagNameCheck instanceof Function&&N.tagNameCheck(E)))return!1;if(rt&&!Q[E]){const P=j(a)||a.parentNode,z=F(a)||a.childNodes;if(z&&P){const R=z.length;for(let K=R-1;K>=0;--K){const ie=_(z[K],!0);ie.__removalCount=(a.__removalCount||0)+1,P.insertBefore(ie,v(a))}}}return ee(a),!0}return a instanceof l&&!Jn(a)||(E==="noscript"||E==="noembed"||E==="noframes")&&$(/<\/no(script|embed|frames)/i,a.innerHTML)?(ee(a),!0):(ge&&a.nodeType===De.text&&(h=a.textContent,$e([Xe,Ze,Je],P=>{h=ke(h,P," ")}),a.textContent!==h&&(Ne(e.removed,{element:a.cloneNode()}),a.textContent=h)),oe(q.afterSanitizeElements,a,null),!1)},Kt=function(a,h,E){if(Lt&&(h==="id"||h==="name")&&(E in n||E in Zn))return!1;if(!(et&&!Qe[h]&&$($n,h))){if(!(It&&$(Wn,h))){if(!(me.attributeCheck instanceof Function&&me.attributeCheck(h,a))){if(!O[h]||Qe[h]){if(!(jt(a)&&(N.tagNameCheck instanceof RegExp&&$(N.tagNameCheck,a)||N.tagNameCheck instanceof Function&&N.tagNameCheck(a))&&(N.attributeNameCheck instanceof RegExp&&$(N.attributeNameCheck,h)||N.attributeNameCheck instanceof Function&&N.attributeNameCheck(h,a))||h==="is"&&N.allowCustomizedBuiltInElements&&(N.tagNameCheck instanceof RegExp&&$(N.tagNameCheck,E)||N.tagNameCheck instanceof Function&&N.tagNameCheck(E))))return!1}else if(!it[h]){if(!$(Pt,ke(E,vt,""))){if(!((h==="src"||h==="xlink:href"||h==="href")&&a!=="script"&&mr(E,"data:")===0&&Ot[a])){if(!(Rt&&!$(Hn,ke(E,vt,"")))){if(E)return!1}}}}}}}return!0},jt=function(a){return a!=="annotation-xml"&&mt(a,Gn)},Yt=function(a){oe(q.beforeSanitizeAttributes,a,null);const{attributes:h}=a;if(!h||lt(a))return;const E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:O,forceKeepAttr:void 0};let P=h.length;for(;P--;){const z=h[P],{name:R,namespaceURI:K,value:ie}=z,ye=D(R),ut=ie;let B=R==="value"?ut:gr(ut);if(E.attrName=ye,E.attrValue=B,E.keepAttr=!0,E.forceKeepAttr=void 0,oe(q.uponSanitizeAttribute,a,E),B=E.attrValue,Mt&&(ye==="id"||ye==="name")&&(de(R,a),B=Kn+B),Me&&$(/((--!?|])>)|<\/(style|title|textarea)/i,B)){de(R,a);continue}if(ye==="attributename"&&mt(B,"href")){de(R,a);continue}if(E.forceKeepAttr)continue;if(!E.keepAttr){de(R,a);continue}if(!Dt&&$(/\/>/i,B)){de(R,a);continue}ge&&$e([Xe,Ze,Je],Xt=>{B=ke(B,Xt," ")});const Vt=D(a.nodeName);if(!Kt(Vt,ye,B)){de(R,a);continue}if(A&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!K)switch(g.getAttributeType(Vt,ye)){case"TrustedHTML":{B=A.createHTML(B);break}case"TrustedScriptURL":{B=A.createScriptURL(B);break}}if(B!==ut)try{K?a.setAttributeNS(K,R,B):a.setAttribute(R,B),lt(a)?ee(a):Qt(e.removed)}catch{de(R,a)}}oe(q.afterSanitizeAttributes,a,null)},Qn=function y(a){let h=null;const E=Wt(a);for(oe(q.beforeSanitizeShadowDOM,a,null);h=E.nextNode();)oe(q.uponSanitizeShadowNode,h,null),Gt(h),Yt(h),h.content instanceof i&&y(h.content);oe(q.afterSanitizeShadowDOM,a,null)};return e.sanitize=function(y){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},h=null,E=null,P=null,z=null;if(st=!y,st&&(y="<!-->"),typeof y!="string"&&!Ht(y))if(typeof y.toString=="function"){if(y=y.toString(),typeof y!="string")throw Ie("dirty is not a string, aborting")}else throw Ie("toString is not a function");if(!e.isSupported)return y;if(tt||at(a),e.removed=[],typeof y=="string"&&(ve=!1),ve){if(y.nodeName){const ie=D(y.nodeName);if(!L[ie]||we[ie])throw Ie("root node is forbidden and cannot be sanitized in-place")}}else if(y instanceof s)h=$t("<!---->"),E=h.ownerDocument.importNode(y,!0),E.nodeType===De.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?h=E:h.appendChild(E);else{if(!he&&!ge&&!ue&&y.indexOf("<")===-1)return A&&Be?A.createHTML(y):y;if(h=$t(y),!h)return he?null:Be?Y:""}h&&nt&&ee(h.firstChild);const R=Wt(ve?y:h);for(;P=R.nextNode();)Gt(P),Yt(P),P.content instanceof i&&Qn(P.content);if(ve)return y;if(he){if(Oe)for(z=Ae.call(h.ownerDocument);h.firstChild;)z.appendChild(h.firstChild);else z=h;return(O.shadowroot||O.shadowrootmode)&&(z=qn.call(r,z,!0)),z}let K=ue?h.outerHTML:h.innerHTML;return ue&&L["!doctype"]&&h.ownerDocument&&h.ownerDocument.doctype&&h.ownerDocument.doctype.name&&$(bn,h.ownerDocument.doctype.name)&&(K="<!DOCTYPE "+h.ownerDocument.doctype.name+`>
`+K),ge&&$e([Xe,Ze,Je],ie=>{K=ke(K,ie," ")}),A&&Be?A.createHTML(K):K},e.setConfig=function(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};at(y),tt=!0},e.clearConfig=function(){Ee=null,tt=!1},e.isValidAttribute=function(y,a,h){Ee||at({});const E=D(y),P=D(a);return Kt(E,P,h)},e.addHook=function(y,a){typeof a=="function"&&Ne(q[y],a)},e.removeHook=function(y,a){if(a!==void 0){const h=pr(q[y],a);return h===-1?void 0:fr(q[y],h,1)[0]}return Qt(q[y])},e.removeHooks=function(y){q[y]=[]},e.removeAllHooks=function(){q=sn()},e}var cn=En();const kr=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),Ir=(t,e)=>typeof t!="number"||e===null?null:t-e,an=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,r]of Object.entries(e))if(t.includes(n))return r;return t.replace("카드","").substring(0,2).toUpperCase()},Rr=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드","SAMSUNG CARD"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:r,svg:o}of n)for(const i of r)if(e.includes(i.toUpperCase()))try{return chrome?.runtime?.getURL(`assets/card/${o}`)??null}catch{return null}return null},Dr=(t,e,n)=>{const r=" recommended",o=document.createElement("div");o.className=`picsel-card-benefit-item${r}`;const i=t.cardName||t.card||"카드",s=Rr(i)||t.imageUrl;if(s){const x=document.createElement("div");x.className="picsel-card-image-wrapper";const _=document.createElement("img");_.src=s,_.alt=i,_.className="picsel-card-image",_.onerror=()=>{const C=an(i);x.textContent="";const v=document.createElement("div");v.className="picsel-card-initial",v.textContent=cn.sanitize(C,{ALLOWED_TAGS:[]}),x.appendChild(v)},x.appendChild(_),o.appendChild(x)}else{const x=an(i),_=document.createElement("div");_.className="picsel-card-image-wrapper";const C=document.createElement("div");C.className="picsel-card-initial",C.textContent=cn.sanitize(x,{ALLOWED_TAGS:[]}),_.appendChild(C),o.appendChild(_)}const l=document.createElement("div");l.className="picsel-card-info";const u=document.createElement("div");if(u.className="picsel-card-header",(t.discountAmount??0)>0){const x=document.createElement("span");x.className="picsel-recommended-badge",x.textContent=`${e+1}위`,u.appendChild(x)}const m=document.createElement("span");m.className="picsel-card-name";const p=i.includes(",")?i.split(",")[0].trim():i;if(m.textContent=p,u.appendChild(m),l.appendChild(u),t.benefit){const x=document.createElement("div");x.className="picsel-card-benefit-desc",x.textContent=t.benefit,l.appendChild(x)}o.appendChild(l);const b=document.createElement("div");if(b.className="picsel-card-amount",t.benefitType==="installment"){const x=document.createElement("div");x.className="picsel-card-installment",x.textContent=t.benefit||"무이자",b.appendChild(x)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const C=document.createElement("div");C.className="picsel-card-final-price";const v=fe(t.finalPrice,n);C.textContent=v,b.appendChild(C)}const x=document.createElement("div");x.className="picsel-card-discount";const _=fe(t.discountAmount,n);x.textContent=`-${_}`,b.appendChild(x)}else if(typeof t.rate=="number"&&t.rate>0){const x=document.createElement("div");x.className="picsel-card-rate",x.textContent=`${t.rate}%`,b.appendChild(x)}return o.appendChild(b),o},Lr=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const g=document.createElement("section");g.className="picsel-section picsel-card-section picsel-hidden",g.setAttribute("data-empty","true"),g.style.display="none";const x=document.createElement("h4");x.className="picsel-section-title",x.textContent="카드별 혜택",g.appendChild(x);const _=document.createElement("div");return _.className="picsel-empty-benefits",_.textContent="이 상품에는 카드 혜택이 없어요",g.appendChild(_),g}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(g=>{const x=g;if(x.benefitType==="point"||x.benefitType==="installment")return null;const _=x.rate??x.discount;let C=0,v=0;typeof _=="number"&&_>100||x.benefitType==="discount"?(C=typeof _=="number"&&_>100?_:x.discount??0,v=0):(v=typeof _=="number"&&_<=100?_:0,C=kr(n,v)??0);const F=Ir(n,C);return{...x,cardName:x.cardName??x.card,rate:v,discountAmount:C??void 0,finalPrice:F??void 0}}).filter(g=>g!==null).sort((g,x)=>{const _=g?.discountAmount??0,C=x?.discountAmount??0;if(_!==C)return C-_;const v=g?.rate??0;return(x?.rate??0)-v})[0];if(!i)return null;const c=document.createElement("section");c.className="picsel-section picsel-card-section";const s=document.createElement("h4");s.className="picsel-section-title",s.textContent="추천 카드 혜택",c.appendChild(s);const l=document.createElement("div");l.className="picsel-card-benefit-list";const u=t.currency??"KRW",m=Dr(i,0,u);l.appendChild(m),c.appendChild(l);const p=[],b=t.elevenst?.totalPointAmount??0;if(b>0&&p.push(`최대 적립 포인트 ${b.toLocaleString()}P`),t.giftCardDiscount?.description&&p.push(t.giftCardDiscount.description),t.cashback?.description&&p.push(t.cashback.description),p.length>0){const g=document.createElement("div");g.className="picsel-sub-benefits",p.forEach(x=>{const _=document.createElement("div");_.className="picsel-sub-benefit-item",_.textContent=x,g.appendChild(_)}),c.appendChild(g)}return c},Mr=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{Ce(!1)}),n.appendChild(r),e.appendChild(n),e},Or=(t,e)=>fe(t,e??"KRW")??`${t.toLocaleString()}원`,Br=t=>fe(t,"KRW")??`${t.toLocaleString()}원`,Ur=t=>Array.isArray(t.top_prices)&&t.top_prices.length>0?t.top_prices.map(n=>({provider:n.mall||"Unknown",name:n.mall||"Unknown",price:n.price,currency:"KRW",url:n.link,free_shipping:n.free_shipping,delivery:n.delivery})).filter(n=>typeof n.price=="number"&&n.price>0).slice(0,3):(Array.isArray(t.results)?t.results:[]).filter(n=>n&&n.success&&Array.isArray(n.products)).flatMap(n=>n.products.map(r=>({provider:n.provider,name:r.name,price:r.price,currency:r.currency,url:r.url}))).filter(n=>typeof n.price=="number"&&n.price>0).sort((n,r)=>n.price-r.price).slice(0,3),ln='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 4L6.667 11.333 3.333 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',zr=t=>{const{panelIsOpen:e,comparison:n}=t,r=document.createElement("section");if(r.className="picsel-section picsel-lowest-price-section",!e){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent="패널을 열면 최저가 비교를 시작합니다.",r.appendChild(g),r}if(n.status==="loading"){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent="가격 비교 중...",r.appendChild(g),r}if(n.status==="error"){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent=n.error||"가격 비교 중 오류가 발생했습니다.",r.appendChild(g),r}if(n.status!=="success"||!n.data){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent="상품명을 찾을 수 없어 가격 비교를 실행할 수 없습니다.",r.appendChild(g),r}const o=n.data,i=Ur(o),c=i.length>0?i[0].price:null,s=typeof o.current_price=="number"?o.current_price:null,l=c&&s&&s>c?s-c:null;if(l&&l>0){const g=document.createElement("div");g.className="picsel-savings-banner";const x=document.createElement("span");x.className="picsel-savings-icon",x.innerHTML=ln;const _=document.createElement("span");_.className="picsel-savings-text",_.textContent=`지금 ${Br(l)} 더 아낄 수 있어요!`,g.appendChild(x),g.appendChild(_),r.appendChild(g)}else if(c&&s&&s<=c){const g=document.createElement("div");g.className="picsel-no-savings-banner";const x=document.createElement("span");x.className="picsel-savings-icon",x.innerHTML=ln;const _=document.createElement("span");_.className="picsel-savings-text",_.textContent="현재 가격이 가장 저렴합니다.",g.appendChild(x),g.appendChild(_),r.appendChild(g)}if(i.length===0){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent="검색 결과가 없습니다.",r.appendChild(g),r}const u=document.createElement("div");u.className="picsel-section-header";const m=document.createElement("span");m.className="picsel-section-title",m.textContent="최저가 추천";const p=document.createElement("span");p.className="picsel-section-note",p.textContent="배송비 포함 기준",u.appendChild(m),u.appendChild(p),r.appendChild(u);const b=document.createElement("div");if(b.className="picsel-price-list",i.forEach((g,x)=>{const _=x===0,C=document.createElement("a");C.href=g.url||"#",C.target="_blank",C.rel="noreferrer",C.className=_?"picsel-price-item picsel-price-item-top":"picsel-price-item";const v=document.createElement("div");v.className="picsel-price-item-left";const F=document.createElement("div");F.className="picsel-mall-row";const j=document.createElement("span");if(j.className="picsel-mall-name",j.textContent=(g.name||g.provider||"알 수 없음").trim(),F.appendChild(j),_){const le=document.createElement("span");le.className="picsel-lowest-badge",le.textContent="최저가",F.appendChild(le)}v.appendChild(F);const A=document.createElement("div");A.className="picsel-price-item-right";const Y=document.createElement("span");Y.className="picsel-price-value",Y.textContent=Or(g.price,g.currency);const G=document.createElement("span");G.className="picsel-price-arrow",G.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',A.appendChild(Y),A.appendChild(G),C.appendChild(v),C.appendChild(A),b.appendChild(C)}),r.appendChild(b),o.link){const g=document.createElement("a");g.href=o.link,g.target="_blank",g.rel="noreferrer",g.className="picsel-footer-link",g.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2h7m0 0v7m0-7L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 정확한 정보 확인하기',r.appendChild(g)}return r},Et=t=>{const{buttonBadgeEl:e}=f;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const i=o,c=i.rate??i.discount;return typeof c=="number"?c:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=fe(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},J=()=>{const{contentEl:t,cachedData:e}=f;if(!t)return;if(t.textContent="",!e){const c=document.createElement("p");c.className="picsel-empty-state",c.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(c),Et(null);return}const n=e,{displayMode:r}=ae.getState();if(t.appendChild(ar(n)),r==="lowest-price"){const c=!!f.panelEl?.classList.contains("open");t.appendChild(zr({panelIsOpen:c,comparison:f.comparison})),Et(null);return}const o=Lr(n);o&&t.appendChild(o);const i=Mr();i&&t.appendChild(i),Et(n)},Fr=async(t,e)=>{if(t&&f.comparison.status!=="loading"&&!(f.comparison.query===t&&(f.comparison.status==="success"||f.comparison.status==="error"))){f.comparison={status:"loading",query:t,error:null,data:null};try{if(!chrome?.runtime?.sendMessage){f.comparison={status:"error",query:t,error:"Chrome extension API를 사용할 수 없습니다.",data:null},e?.();return}const n=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!n?.success){f.comparison={status:"error",query:t,error:n?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null},e?.();return}const r=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:t});if(r?.success){f.comparison={status:"success",query:t,error:null,data:{...r.data,current_price:f.cachedData?.amount}},e?.();return}f.comparison={status:"error",query:t,error:r?.error||"가격 비교 검색 실패",data:null},e?.()}catch(n){f.comparison={status:"error",query:t,error:n instanceof Error?n.message:"알 수 없는 오류",data:null},e?.()}}},yn=(t,e,n)=>{if(t&&f.comparison.status!=="loading"){if(f.comparison.query===t&&(f.comparison.status==="success"||f.comparison.status==="error")){n?.();return}f.comparison={status:"loading",query:t,error:null,data:null},e(),Fr(t,n).finally(()=>{e()})}},un=["잠깐만요, 확인 중","지금 찾고 있어요","곧 보여드릴게요","조금만 기다려요","계산 중이에요","정리하고 있어요","비교하는 중이에요","거의 다 됐어요","지금 처리 중","금방 끝나요","찾는 중이에요","잠시만요"];let Ge=0;const _n=()=>{const t=un[Ge];return Ge=(Ge+1)%un.length,t},qr=()=>{Ge=0};let _e=null;const Cn=()=>{const{toggleButton:t,buttonLabelEl:e}=f;if(!(!t||!e)&&e.textContent==="PicSel 혜택 보기"){e.innerHTML="";const n=document.createElement("div");n.className="picsel-loading-message",n.setAttribute("data-loading-message","true"),n.style.display="flex",n.style.alignItems="center",n.style.gap="8px";const r=document.createElement("div");r.className="picsel-loading-spinner";const o=document.createElement("span");o.className="picsel-loading-text",o.textContent=_n(),n.appendChild(r),n.appendChild(o),e.appendChild(n),$r(o)}},$r=t=>{_e&&clearInterval(_e),_e=setInterval(()=>{t.textContent=_n()},2e3)},Wr=()=>{_e&&(clearInterval(_e),_e=null),qr()},Ce=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=f;if(!(!e||!n||!r)){if(t){e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),r.textContent="PicSel 혜택 닫기";const{displayMode:o}=ae.getState();o==="lowest-price"&&f.cachedData?.title?yn(f.cachedData.title,J):J();return}e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),r.textContent="PicSel 혜택 보기",Cn()}},Hr=`
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

		/* ========== 새 최저가 비교 UI 스타일 ========== */
		
		/* 절약 배너 */
		.picsel-savings-banner {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 12px 16px;
			background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
			border-radius: 8px;
			margin: 0 0 16px 0;
		}

		.picsel-savings-icon {
			width: 20px;
			height: 20px;
			background: #4caf50;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}

		.picsel-savings-icon svg {
			width: 12px;
			height: 12px;
			color: white;
		}

		.picsel-savings-text {
			font-size: 14px;
			font-weight: 600;
			color: #2e7d32;
			margin: 0;
		}

		.picsel-no-savings-banner {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 12px 16px;
			background: #f5f5f5;
			border-radius: 8px;
			margin: 0 0 16px 0;
		}

		.picsel-no-savings-banner .picsel-savings-icon {
			background: #9e9e9e;
		}

		.picsel-no-savings-banner .picsel-savings-text {
			color: #616161;
			font-weight: 500;
		}

		/* 섹션 헤더 */
		.picsel-section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;
		}

		.picsel-section-title {
			font-size: 14px;
			font-weight: 600;
			color: #333;
			margin: 0;
		}

		.picsel-section-note {
			font-size: 11px;
			color: #888;
			margin: 0;
		}

		/* 가격 리스트 */
		.picsel-price-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
			margin-bottom: 16px;
		}

		.picsel-price-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 12px 14px;
			background: #fafafa;
			border-radius: 8px;
			border: 1px solid #eee;
			transition: all 0.15s ease;
			cursor: pointer;
			text-decoration: none;
		}

		.picsel-price-item:hover {
			background: #f5f5f5;
			border-color: #ddd;
		}

		.picsel-price-item-top {
			background: #f8fbff;
			border: 2px solid #2196f3;
		}

		.picsel-price-item-top:hover {
			background: #f0f7ff;
			border-color: #1976d2;
		}

		.picsel-price-item-left {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.picsel-price-item-right {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.picsel-mall-row {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.picsel-mall-name {
			font-size: 14px;
			font-weight: 600;
			color: #333;
			margin: 0;
		}

		.picsel-lowest-badge {
			display: inline-flex;
			align-items: center;
			padding: 2px 8px;
			background: #2196f3;
			color: white;
			font-size: 10px;
			font-weight: 600;
			border-radius: 4px;
		}

		.picsel-price-subtext {
			font-size: 11px;
			color: #999;
			margin: 0;
		}

		.picsel-price-value {
			font-size: 16px;
			font-weight: 700;
			color: #333;
			margin: 0;
		}

		.picsel-price-item-top .picsel-price-value {
			color: #1976d2;
		}

		.picsel-price-arrow {
			width: 16px;
			height: 16px;
			color: #bbb;
			flex-shrink: 0;
		}

		.picsel-price-item:hover .picsel-price-arrow {
			color: #888;
		}

		/* 하단 링크 */
		.picsel-footer-link {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 4px;
			padding: 10px;
			font-size: 12px;
			color: #666;
			text-decoration: none;
			border-top: 1px solid #eee;
			margin: 0 -16px -16px -16px;
			transition: all 0.15s ease;
		}

		.picsel-footer-link:hover {
			background: #f5f5f5;
			color: #333;
		}

		.picsel-footer-link svg {
			width: 14px;
			height: 14px;
		}

		/* 히어로 섹션 (현재 사이트 가격) */
		.picsel-hero-section {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 12px 16px;
			background: #fff;
			border: 1px solid #eee;
			border-radius: 8px;
			margin-bottom: 16px;
		}

		.picsel-hero-left {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.picsel-hero-label {
			font-size: 11px;
			color: #888;
			margin: 0;
		}

		.picsel-hero-price {
			font-size: 20px;
			font-weight: 700;
			color: #333;
			margin: 0;
		}

		.picsel-hero-tag {
			display: inline-flex;
			align-items: center;
			padding: 4px 10px;
			background: #f5f5f5;
			color: #666;
			font-size: 12px;
			font-weight: 500;
			border-radius: 6px;
			align-self: flex-start;
		}

		/* Loading Spinner */
		@keyframes spin {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}

		.picsel-loading-spinner {
			display: inline-block;
			width: 16px;
			height: 16px;
			border: 2px solid #e5e7eb;
			border-top-color: #4f46e5;
			border-radius: 50%;
			animation: spin 0.6s linear infinite;
		}

		/* Loading State Message */
		.picsel-loading-message {
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 14px;
			font-weight: 500;
			color: #ffffff;
		}
`,Gr=t=>{if(f.mounted)return;const e=document.getElementById(Zt);if(e){f.hostElement=e,f.shadowRoot=e.shadowRoot,e.shadowRoot&&(f.toggleButton=e.shadowRoot.querySelector(".picsel-toggle-button"),f.buttonLabelEl=e.shadowRoot.querySelector(".picsel-toggle-label"),f.buttonBadgeEl=e.shadowRoot.querySelector(".picsel-toggle-badge"),f.panelEl=e.shadowRoot.querySelector(`#${pt}`),f.closeButtonEl=e.shadowRoot.querySelector(".picsel-close-button"),f.contentEl=e.shadowRoot.querySelector(".picsel-panel-content"),f.panelTitleEl=e.shadowRoot.querySelector(".picsel-panel-title")),f.mounted=!0;return}f.hostElement=document.createElement("div"),f.hostElement.id=Zt,f.hostElement.style.position="fixed",f.hostElement.style.bottom="24px",f.hostElement.style.right="24px",f.hostElement.style.zIndex=String(2147483647),f.shadowRoot=f.hostElement.attachShadow({mode:"open"});const n=document.createElement("style");n.textContent=Hr,f.shadowRoot.appendChild(n);const r=document.createElement("div");r.className="picsel-toggle-container",f.shadowRoot.appendChild(r),f.toggleButton=document.createElement("button"),f.toggleButton.className="picsel-toggle-button",f.toggleButton.type="button",f.toggleButton.setAttribute("aria-expanded","false"),f.buttonLabelEl=document.createElement("span"),f.buttonLabelEl.className="picsel-toggle-label",f.toggleButton.appendChild(f.buttonLabelEl),f.buttonBadgeEl=document.createElement("span"),f.buttonBadgeEl.className="picsel-toggle-badge",f.toggleButton.appendChild(f.buttonBadgeEl),r.appendChild(f.toggleButton),Cn(),f.panelEl=document.createElement("div"),f.panelEl.className="picsel-panel",f.panelEl.id=pt,f.panelEl.setAttribute("role","dialog"),f.panelEl.setAttribute("aria-hidden","true"),f.toggleButton.setAttribute("aria-controls",pt);const o=document.createElement("div");o.className="picsel-panel-header",f.panelTitleEl=document.createElement("div"),f.panelTitleEl.className="picsel-panel-title",f.panelTitleEl.textContent="PicSel 혜택 정보",f.closeButtonEl=document.createElement("button"),f.closeButtonEl.type="button",f.closeButtonEl.className="picsel-close-button",f.closeButtonEl.setAttribute("aria-label","닫기"),f.closeButtonEl.textContent="✕",o.appendChild(f.panelTitleEl),o.appendChild(f.closeButtonEl),f.panelEl.appendChild(o),f.contentEl=document.createElement("div"),f.contentEl.className="picsel-panel-content",f.panelEl.appendChild(f.contentEl),r.appendChild(f.panelEl);const i=f.panelEl,c=f.hostElement;f.toggleButton.addEventListener("click",()=>{const s=i.classList.contains("open"),{displayMode:l}=ae.getState();if(!s&&l==="lowest-price"&&t.startLowestPriceComparisonNoPanel){Wr(),t.startLowestPriceComparisonNoPanel();return}const u=!s;t.setPanelOpen(u)}),f.closeButtonEl.addEventListener("click",()=>{t.setPanelOpen(!1)}),window.addEventListener("keydown",s=>{s.key==="Escape"&&t.setPanelOpen(!1)}),document.addEventListener("click",s=>{if(!i.classList.contains("open"))return;const l=s.composedPath();c&&!l.includes(c)&&t.setPanelOpen(!1)},!0),document.body.appendChild(f.hostElement),f.mounted=!0},Sn=()=>{const{displayMode:t}=ae.getState();if(f.panelTitleEl){if(t==="lowest-price"){f.panelTitleEl.textContent="가격 비교 리포트";return}if(f.cachedData?.site){const e=sr(f.cachedData.site);f.panelTitleEl.textContent=`${e} 혜택 정보`;return}f.panelTitleEl.textContent="PicSel 혜택 정보"}},An=t=>{f.cachedData={...t},Gr({setPanelOpen:Ce,startLowestPriceComparisonNoPanel:()=>{f.cachedData?.title&&yn(f.cachedData.title,J,()=>{Ce(!0)})}}),Sn(),J(),Ce(!1)},Tt=t=>{if(f.cachedData={...f.cachedData??{},...t},!f.mounted){An(f.cachedData);return}Sn(),J()},w=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},Tn=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},Kr=t=>t.includes("원")||t.includes("KRW")?"KRW":t.includes("$")||t.includes("USD")?"USD":t.includes("€")||t.includes("EUR")?"EUR":t.includes("¥")||t.includes("JPY")?"JPY":"KRW",wt=t=>typeof t=="number"&&t>100&&t<1e8,pe=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},At=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","BC","NH"];for(const n of e)if(t.includes(n))return n;return t.replace(/카드$/g,"")};class Se{extractNumber(e){return w(e)}extractCurrency(e){return Kr(e)}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){ce.error(T.PAR_E004,`Selector error: ${r}`,{data:{siteName:this.siteName,selector:r},error:o instanceof Error?o:void 0})}return null}isValidPrice(e){return wt(e)}searchPriceInDOM(e,n){const r=e.querySelectorAll('[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]');for(const l of r){const m=(l.textContent||"").match(n);if(m)return ce.debug("Found price in container",{siteName:this.siteName,price:m[0]}),m[0]}const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i,c=0;const s=1e3;for(;(i=o.nextNode())&&c<s;){c++;const u=(i.textContent||"").match(n);if(u)return ce.debug("Found price via TreeWalker",{siteName:this.siteName,price:u[0],nodesScanned:c}),u[0]}return c>=s&&ce.warn("TreeWalker hit node limit",{siteName:this.siteName,limit:s}),null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const X={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",".deal-price",".special-price",".discount-price strong",'[class*="sale"] strong','[class*="discount"] strong','div[class*="price"] > strong','span[class*="price"] > strong','[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]',".deal-title",".special-title",'h1[class*="product"]','h1[class*="title"]',"h1"],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},jr=t=>{for(const e of X.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Yr=t=>{try{const e=t.querySelector(X.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r=`https:${r}`),r=r.split("?")[0],r}const n=t.querySelector(X.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o=`https:${o}`),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return d.error(T.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},Vr=t=>{try{const e=[],n=new Set,r=t.querySelector(X.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let s=i.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s=`https:${s}`),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return d.error(T.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},dn=t=>t>=100&&t<=1e8,Xr=t=>{let e=null,n=null,r=null;for(const o of X.amount)try{const i=t.querySelector(o);if(!i||!i.textContent)continue;const c=i.textContent.trim();if(!/[\d,]+\s*원?/.test(c)&&!/^\d{1,3}(,\d{3})*$/.test(c.replace(/[^\d,]/g,"")))continue;const s=w(c);if(!s||!dn(s))continue;if(d.debug(`Found via selector "${o}"`,{value:s}),/final|discount|final-price|deal|sale|coupon/i.test(o)){r=s,e=s;break}n||(n=s),e||(e=s)}catch(i){d.debug(`Selector ${o} failed`,{error:i})}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of o){const s=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s){const l=w(s[1]);if(l&&dn(l)){d.debug("Found via regex in element",{value:l}),e=l;break}}}}return{amount:e,originalPrice:n,discountPrice:r}},Zr=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const i of e){const c=o.match(i);if(c&&c[1]){const s=w(c[1]);if(s)return d.debug("Found price via text walker",{value:s}),s}}}return null},Jr=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),i=(r.getAttribute("data-price")||"").trim(),s=`${o} ${i}`.trim().match(n);if(s&&s[1]){const l=w(s[1]);if(l)return d.debug("Found price by element scan",{value:l}),l}}}catch(e){d.debug("findPriceByElementScan error",{error:e})}return null},Qr={신한:"assets/card/shinhanCard.svg",우리:"assets/card/wooriCard.svg",BC:"assets/card/bcCard.svg",비씨:"assets/card/bcCard.svg",롯데:"assets/card/lotteCard.svg",KB:"assets/card/kbCard.svg",국민:"assets/card/kbCard.svg",NH:"assets/card/nhCard",농협:"assets/card/hanaCard.svg",삼성:"assets/card/samsungCard.svg",하나:"assets/card/hanaCard.svg",현대:"assets/card/hyundaiCard.svg",비자:"assets/card/visaCard.svg",마스터:"assets/card/masterCard.svg"},eo=t=>{const e=At(pe(t)),n=Qr[e];if(!n)return null;try{return chrome.runtime.getURL(n)}catch{return null}},Ke=t=>{for(const[e,n]of Object.entries(nr))if(t.includes(e))return n;return null},to=t=>{const e=[],n=X.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(!s)return;let u=l.trim();u||(u=Ke(s)||""),u&&!u.includes("카드")&&(u=`${u}카드`),s&&u&&(e.some(m=>m.cardName===u)||(e.push({src:s,alt:l,cardName:u}),d.debug("카드 이미지 발견",{cardName:u,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(c=>{const s=c,l=s.src,u=s.alt||"";if(!l||(s.width||s.naturalWidth)>100)return;let p=u.trim();p||(p=Ke(l)||""),p&&!p.includes("카드")&&(p=`${p}카드`),l&&p&&!e.some(b=>b.cardName===p)&&e.push({src:l,alt:u,cardName:p})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(!s||(c.width||c.naturalWidth)>100)return;let m=l.trim();m||(m=Ke(s)||""),m&&!m.includes("카드")&&(m=`${m}카드`),s&&m&&!e.some(p=>p.cardName===m)&&e.push({src:s,alt:l,cardName:m})}),d.debug("추출된 카드 이미지 총",{count:e.length}),e},no=t=>{const e=[],n=X.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return d.debug("카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const c=o.contentDocument||o.contentWindow?.document;if(c)return ro(c)}catch{d.warn("iframe 접근 불가 (cross-origin)")}const i=r.querySelector(n.content);return i?oo(i):e},ro=t=>{const e=[],n=X.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const i=o.querySelector(n.cardName),c=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),l=i?.textContent?.trim()||"",u=c?.textContent?.trim()||"",m=s?.textContent?.trim()||o.textContent?.trim()||"";if(l){const p=Tn(u||m)??void 0;e.push({card:l,cardName:l,benefit:m||u||"혜택 제공",discount:p,rate:p})}}),e},oo=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let i;for(;(i=o.exec(n))!==null;){const c=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);e.some(l=>l.card===c)||e.push({card:c,cardName:c,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},io=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",i=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const c=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);if(!e.some(l=>l.card===c)){let l=`최대 ${s}% 할인/적립`;const u=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);u&&(l=`최대 ${s}% ${u[0]}`),e.push({card:c,cardName:c,benefit:l,discount:s,rate:s})}}}),e},so=t=>{let e=[];const n=to(t),r=no(t);if(r.length>0&&(d.info("팝업에서 카드 혜택 파싱",{count:r.length}),e=r),io(t).forEach(i=>{e.some(c=>c.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(X.benefitBadge);if(i){const c=i.querySelectorAll("img.benefit-ico"),s=[],l=[];c.forEach(p=>{const b=p.getAttribute("src");if(b){const g=Ke(b);g&&(s.push(g),l.push(b))}});const u=i.querySelector(".benefit-label")?.textContent?.trim(),m=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(u){const p=Tn(u),b=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드",g=p??void 0;e.push({card:b,cardName:b,benefit:`${u}${m?` (${m})`:""}`,discount:g,rate:g,imageUrl:l[0]})}}}return e=e.map((i,c)=>{if(!i.imageUrl){const s=i.cardName||i.card||"",l=At(pe(s));let u=n.find(m=>{const p=pe(m.cardName),b=pe(s);return p===b});if(u||(u=n.find(m=>{const p=pe(m.cardName).replace("카드",""),b=pe(s).replace("카드","");return p.includes(b)||b.includes(p)})),u||(u=n.find(m=>At(pe(m.cardName))===l)),!u&&c<n.length&&(u=n[c],d.debug("인덱스 기반 매칭",{cardName:s,matchedCardName:u.cardName})),!u){const m=eo(s);if(m)return d.debug("로컬 아이콘 폴백 사용",{cardName:s,benefitKey:l}),{...i,imageUrl:m}}if(u)return{...i,imageUrl:u.src}}return i}),e.sort((i,c)=>(c.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{benefits:e}),e},co=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const c=i.match(/(\d+)\s*%/);if(c)return{rate:parseInt(c[1],10),description:i.trim()}}}return null},ao=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",c=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c&&i.includes("쿠팡캐시")){const s=w(c[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=w(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},lo=t=>{try{const e=[],n=new Set,r=t.querySelector(X.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const c=i.querySelectorAll("div");if(c.length<2)continue;let s="";for(const p of c){const b=p.textContent||"";if(!b.includes("원")&&b.trim().length>0&&!b.includes("px")){s=b.trim();break}}let l="";for(const p of c){const g=(p.textContent||"").match(/[\d,]+원/);if(g){l=g[0].replace(/[,원]/g,"");break}}if(!l)continue;const u=parseInt(l);if(!u||u<100||!s||s.length<2)continue;const m=`${s}-${u}`;if(n.has(m))continue;if(e.push({name:s,price:u}),n.add(m),e.length>=15)break}catch(c){d.warn("Error parsing list item",{error:c});continue}return e}catch(e){return d.error(T.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},uo=t=>t.querySelector(X.shipping)?.textContent?.trim()||null,po=(t,e)=>{if(!wt(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let r=Math.round(t*(n/100));return e.maxDiscount&&r>e.maxDiscount&&(r=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:r},fo=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},wn=(t,e)=>t.map(r=>{const o=fo(r);return e&&wt(e)&&(o.discountAmount=po(e,o)),o}).sort((r,o)=>r.discountAmount!==void 0&&o.discountAmount!==void 0?o.discountAmount-r.discountAmount:(o.rate??0)-(r.rate??0)),vn=t=>{const e=new Map;for(const n of t){const r=mo(n.cardName||n.card),o=e.get(r);if(!o)e.set(r,n);else{const i=o.rate??o.discount??0;(n.rate??n.discount??0)>i&&e.set(r,n)}}return Array.from(e.values())},mo=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","NH","BC","비씨","스마일"],n=t.toLowerCase();for(const r of e)if(n.includes(r.toLowerCase()))return r;return t};class Pn extends Se{siteName="Coupang";selectors={amount:X.amount};static isCheckoutPage(e){if(!/coupang\.com/.test(e))return!1;const o=![/coupang\.com\/?$/,/shop\.coupang\.com/,/coupang\.com\/np\/categories/,/coupang\.com\/np\/search/,/coupang\.com\/np\/campaigns/,/coupang\.com\/np\/cart/,/coupang\.com\/np\/checkout/,/coupang\.com\/my\//,/coupang\.com\/np\/login/,/coupang\.com\/np\/register/].some(i=>i.test(e));return d.debug(`isCheckoutPage("${e}") = ${o}`),o}parse(e){try{d.info("🔍 Parsing Coupang page...");const n=jr(e),r=Yr(e),o=Vr(e),i=Xr(e);let c=i.amount;const{originalPrice:s,discountPrice:l}=i;if(c||(c=Zr(e)),c||(c=Jr(e)),!c)return d.debug("❌ No price found"),null;const u=so(e),m=wn(u,c),p=vn(m),b=co(e),g=ao(e),x=uo(e),_=lo(e);return d.info(`✅ Found: ${c} KRW, Cards: ${p.length}`),{price:c,amount:c,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:_,originalPrice:s||void 0,discountPrice:l||void 0,cardBenefits:p,giftCardDiscount:b||void 0,cashback:g||void 0,shippingInfo:x||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const M={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",salePriceAlt2:".c_product_price .price .value",salePriceAlt3:'[class*="price"] .value',discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price",dealPrice:'.deal_price .value, [class*="deal"] .price',specialPrice:".special_price .value"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",titleAlt2:'h1[class*="title"]',titleAlt3:"h1.product_name",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},yt={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},go=t=>{const e=M.product;try{const n=t.querySelector(e.title);if(n?.textContent){const o=n.textContent.trim();return d.debug("제목 추출",{title:o}),o}const r=t.querySelector(e.titleAlt);if(r?.textContent){const o=r.textContent.trim();return d.debug("제목 추출 (alt)",{title:o}),o}}catch(n){d.error(T.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},ho=t=>{try{const e=t.querySelector(M.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return d.debug("부제목 추출",{subtitle:n}),n}}catch(e){d.error(T.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},xo=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const r=t.match(n);if(r?.[1])return d.debug("상품ID 추출",{productId:r[1]}),r[1]}}catch(e){d.error(T.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},Nn=t=>{const e=M.image;try{const n=t.querySelector(e.main);if(n?.src){const i=Le(n.src);return d.debug("메인 이미지 추출",{src:i}),i}const r=t.querySelector(e.mainAlt);if(r?.src){const i=Le(r.src);return d.debug("메인 이미지 추출 (alt)",{src:i}),i}const o=t.querySelector(`${e.main}[data-src]`);if(o?.dataset?.src){const i=Le(o.dataset.src);return d.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){d.error(T.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},bo=t=>{const e=[],n=new Set,r=M.image;try{const o=Nn(t);o&&(e.push(o),n.add(o)),t.querySelectorAll(r.thumbnail).forEach(s=>{const l=s,u=l.src||l.dataset?.src;if(u){const m=Le(u),p=pn(m);n.has(p)||(e.push(p),n.add(p))}}),t.querySelectorAll(r.thumbnailAlt).forEach(s=>{const l=s,u=l.src||l.dataset?.src;if(u){const m=Le(u),p=pn(m);n.has(p)||(e.push(p),n.add(p))}}),d.debug("전체 이미지 추출",{count:e.length})}catch(o){d.error(T.PAR_E001,"전체 이미지 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},Eo=t=>{const e=M.seller,n={seller:null,rating:null};try{const r=t.querySelector(e.name);r?.textContent&&(n.seller=r.textContent.trim(),d.debug("판매자 추출",{seller:n.seller}));const o=t.querySelector(e.rating);o?.textContent&&(n.rating=o.textContent.trim(),d.debug("판매자 등급 추출",{rating:n.rating}))}catch(r){d.error(T.PAR_E001,"판매자 정보 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return n};function Le(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function pn(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const yo=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=M.price;try{const r=t.querySelector(n.originalPrice);r?.textContent&&(e.originalPrice=w(r.textContent),d.debug("정가",{price:e.originalPrice}));const o=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);o?.textContent&&(e.discountPrice=w(o.textContent),e.amount=e.discountPrice,d.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=w(i.textContent),d.debug("할인율",{rate:e.discountRate}));const c=t.querySelector(n.maxDiscountPrice);c?.textContent&&(e.maxDiscountPrice=w(c.textContent),d.debug("최대할인가",{price:e.maxDiscountPrice}));const s=t.querySelector(n.maxDiscountRate);s?.textContent&&(e.maxDiscountRate=w(s.textContent),d.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(r){d.error(T.PAR_E002,"가격 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},_o=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const r of n){const o=r.textContent||"";for(const i of e){const c=o.match(i);if(c?.[1]){const s=w(c[1]);if(s&&s>100&&s<1e8)return d.debug("가격 발견",{value:s}),s}}}return null},Co=t=>{const e=[],n=M.price;try{const r=t.querySelector(n.maxDiscountLayer);if(!r)return e;r.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const c=i.querySelector(".title"),s=i.querySelector(".price");if(c&&s){const l=c.textContent?.trim()||"",u=s.textContent?.trim()||"",m=w(u.replace("-",""));l&&m&&l!=="판매가"&&(e.push({type:l,amount:m}),d.debug("DiscountDetail",{type:l,amount:m}))}})}catch(r){d.error(T.PAR_E002,"DiscountDetail 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},So=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=Ao(t),e.totalPointAmount=e.points.reduce((n,r)=>n+r.amount,0),e.cardBenefits=To(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,r)=>n+r.benefitAmount,0),e.installments=Po(t),e.maxInstallmentMonths=e.installments.reduce((n,r)=>Math.max(n,r.maxMonths),0),e.coupons=Io(t),d.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){d.error(T.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},Ao=t=>{const e=[],n=M.pointDetail;try{const r=t.querySelector(n.container);if(r){const o=r.querySelector(n.totalPoint);if(o?.textContent){const c=w(o.textContent);c&&(e.push({amount:c,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),d.debug("최대 적립 포인트",{amount:c}))}const i=r.querySelector(n.elevenPaySection);if(i){const c=i.querySelector(".total .value");if(c?.textContent){const l=w(c.textContent);l&&!e.find(u=>u.amount===l&&u.type==="최대적립포인트")&&(e.push({amount:l,type:"11pay포인트",description:"11pay 결제 시 적립"}),d.debug("11pay 포인트 총액",{amount:l}))}i.querySelectorAll(".desc li").forEach(l=>{const u=l.querySelector(".c_layer_expand button.c_product_btn"),m=l.querySelector(".value");if(u&&m){const p=u.textContent?.trim()||"",b=w(m.textContent||"");b&&p&&!p.includes("카드")&&(e.push({amount:b,type:p,description:p}),d.debug("포인트 항목",{type:p,amount:b}))}})}}if(e.length===0){const o=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(o?.textContent){const i=w(o.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),d.debug("기본 포인트",{amount:i}))}}}catch(r){d.error(T.PAR_E003,"포인트 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},To=t=>{const e=[],n=M.cardDiscount;try{const r=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let o=null;for(const c of r)if(o=t.querySelector(c),o){d.debug("카드 혜택 컨테이너 찾음",{selector:c});break}if(d.debug("other_benefits 컨테이너",{found:!!o}),o){const c=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let s=null;for(const l of c)if(s=o.querySelectorAll(l),s.length>0){d.debug("benefit 블록 찾음",{selector:l,count:s.length});break}if(d.debug("benefit 블록 수",{count:s?.length||0}),!s||s.length===0){const l=o.querySelector("dl");if(d.debug("dl 요소",{found:!!l}),l){const u=l.children;d.debug("dl children",{count:u.length})}}s&&s.length>0&&s.forEach(l=>{const m=l.querySelector("dt")?.textContent?.trim()||"";if(d.debug("메인 타이틀",{mainTitle:m}),!m)return;const p=wo(m);p&&p.benefitAmount>0&&(e.push(p),d.debug("메인 혜택 추가",{mainParsed:p}));const b=l.querySelector("dd");if(b){const g=b.querySelectorAll(".tit_sub");d.debug("서브타이틀 수",{count:g.length}),g.forEach(x=>{const _=x.textContent?.trim()||"";if(d.debug("서브타이틀",{subTitle:_}),_.includes("안내사항")||_.includes("적립제외"))return;let C=x.nextElementSibling;for(;C&&C.tagName!=="UL"&&C.tagName!=="SPAN";)C=C.nextElementSibling;if(C&&C.tagName==="UL"){const v=C.querySelectorAll("li");d.debug("리스트 아이템 수",{count:v.length}),v.forEach(F=>{const j=F.textContent?.trim()||"";d.debug("아이템",{itemText:j});const A=vo(_,j);A&&(e.find(G=>G.cardName===A.cardName&&G.benefitType===A.benefitType&&G.benefitAmount===A.benefitAmount)||(e.push(A),d.debug("서브 혜택 추가",{subBenefit:A})))})}})}})}else d.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(s=>{const l=s.textContent?.trim()||"";if(l.includes("카드")||l.includes("신한")){const m=s.closest("li")?.querySelector(".value")?.textContent?.trim()||"",p=w(m);if(p){const b=l.replace(" 결제 시","").trim();e.find(g=>g.cardName===b&&g.benefitType==="포인트")||e.push({cardName:b,benefitAmount:p,benefitType:"포인트",condition:"결제 시"})}}}),d.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(r){d.error(T.PAR_E003,"카드 혜택 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function wo(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const l of e){const u=t.match(l);if(u){n=u[1];break}}if(!n)return null;let r=0,o="",i="";const c=t.match(/최대\s*(\d+)%\s*적립/);c&&(r=parseInt(c[1],10),o="적립",i="결제 시");const s=t.match(/([\d,]+)원\s*할인/);return s&&(r=w(s[1])||0,o="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:r,benefitType:o||(t.includes("할인")?"할인":"적립"),condition:i}}function vo(t,e){if(!e)return null;let n="",r=0,o="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const c=e.match(/([\d,]+)원\s*할인/);c&&(r=w(c[1])||0,o="할인");const s=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return s&&!o&&(r=parseFloat(s[1]),o="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!r||!o?null:{cardName:n,benefitAmount:r,benefitType:o,condition:i}}const Po=t=>{const e=[],n=M.installment;try{const r=t.querySelector(n.dialogContainer);if(r&&(r.querySelectorAll(".card_box").forEach(i=>{const s=i.querySelector("dt")?.textContent?.trim()||"";if(!s)return;i.querySelectorAll("dd").forEach(u=>{const m=u.textContent?.trim()||"";if(!m)return;const p=No(s,m);p&&e.push(p)})}),d.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const o=t.querySelector(n.triggerButton);if(o){const s=(o.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);s&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"})}ko(t).forEach(c=>{e.find(s=>s.cardName===c.cardName)||e.push(c)})}d.info("총 무이자 할부 카드",{count:e.length})}catch(r){d.error(T.PAR_E003,"무이자 할부 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function No(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const r=n[1],i=r.split(",").map(m=>parseInt(m.trim(),10)).filter(m=>!isNaN(m)),c=i.length>0?Math.max(...i):0;if(c===0)return null;let s=null;const l=e.match(/(\d+)만원/);l&&(s=parseInt(l[1],10)*1e4);let u="";return e.includes("11pay")?u="11pay 결제 시":e.includes("카카오페이")?u="카카오페이 결제 시":s&&(u=`${s/1e4}만원 이상`),{cardName:t,maxMonths:c,minAmount:s,months:`${r}개월`,condition:u}}function ko(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(o=>{const i=o.textContent||"",c=i.match(/최대\s*(\d+)\s*개월\s*무이자/);c&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"}),n.forEach(s=>{if(i.includes(s)){const u=i.substring(i.indexOf(s)).match(/([\d,]+)개월/);if(u&&!e.find(p=>p.cardName.includes(s))){const p=u[1],b=p.split(",").map(x=>parseInt(x.trim(),10)),g=Math.max(...b.filter(x=>!isNaN(x)));e.push({cardName:`${s}카드`,maxMonths:g,minAmount:null,months:`${p}개월`,condition:""})}}})}),e}const Io=t=>{const e=[],n=M.coupon;try{const r=t.querySelector(n.badge);if(r?.textContent){const i=r.textContent.trim(),c=Ro(i);c&&(e.push(c),d.debug("쿠폰 추출",{coupon:c}))}t.querySelectorAll(n.item).forEach(i=>{const c=i.querySelector(n.name),s=i.querySelector(n.discount);if(c||s){const l=c?.textContent?.trim()||"쿠폰",u=s?.textContent||"",m=u.includes("원")?w(u):null,p=u.includes("%")?w(u):null;e.push({name:l,discountAmount:m,discountRate:p})}})}catch(r){d.error(T.PAR_E003,"쿠폰 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function Ro(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:w(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function fn(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:r,name:o}of n)for(const i of r)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${o} (신용)`:e.includes("체크카드")?`${o} (체크)`:o;return e||t}function Do(t,e){const n=t.map(r=>{const o=fn(r.cardName),i=r.benefitType==="할인",c=r.benefitAmount<=100?r.benefitAmount:0;let s="";return i?s=`${r.benefitAmount.toLocaleString()}원 할인`:r.benefitAmount<=100?s=`${r.benefitAmount}% 적립`:s=`${r.benefitAmount.toLocaleString()}P 적립`,{card:o,cardName:o,benefit:s,discount:i?r.benefitAmount:0,rate:c,condition:r.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(r=>{if(r.cardName==="__INSTALLMENT_SUMMARY__")return;const o=fn(r.cardName);n.push({card:o,cardName:o,benefit:`${r.months} 무이자`,discount:0,rate:0,condition:r.condition,benefitType:"installment",pointAmount:0})}),n}class kn extends Se{siteName=yt.siteName;selectors={amount:[M.price.salePrice,M.price.salePriceAlt,M.price.maxDiscountPrice],title:[M.product.title,M.product.titleAlt],image:[M.image.main,M.image.mainAlt]};static isProductPage(e){if(!/11st\.co\.kr/.test(e))return!1;const o=![/11st\.co\.kr\/?$/,/11st\.co\.kr\/category/,/11st\.co\.kr\/search/,/11st\.co\.kr\/browsing/,/11st\.co\.kr\/best/,/11st\.co\.kr\/event$/,/11st\.co\.kr\/cart/,/11st\.co\.kr\/order/,/11st\.co\.kr\/my11st/,/11st\.co\.kr\/login/,/11st\.co\.kr\/member/].some(i=>i.test(e));return d.debug(`isProductPage("${e}") = ${o}`),o}static extractProductId(e){return xo(e)}parse(e){try{d.info("🔍 Parsing 11번가 page...");const n=go(e),r=ho(e),o=Nn(e),i=bo(e),c=Eo(e),s=yo(e);let l=s.amount;const{originalPrice:u,discountPrice:m,maxDiscountPrice:p,discountRate:b,maxDiscountRate:g}=s;if(l||(l=_o(e)),!l)return d.debug("❌ No price found"),null;const x=Co(e),_=So(e),{points:C,cardBenefits:v,installments:F,coupons:j,totalPointAmount:A,totalCardBenefitAmount:Y,maxInstallmentMonths:G}=_,le=Do(v,F),Ae=[];return b&&Ae.push({rate:b,type:"SALE_DISCOUNT",description:"할인가"}),x.forEach(Te=>{Ae.push({rate:Te.amount,type:Te.type.toUpperCase().replace(/\s+/g,"_"),description:Te.type})}),d.info(`✅ Found: ${l.toLocaleString()} ${yt.currency}`),d.debug("파싱 결과",{title:n,totalPointAmount:A,cardBenefitsCount:v.length,installmentsCount:F.length,maxInstallmentMonths:G}),{price:l,amount:l,currency:yt.currency,title:n?`${n}${r?` ${r}`:""}`:void 0,imageUrl:o||void 0,images:i,originalPrice:u||void 0,discountPrice:m||p||void 0,discountRate:b||void 0,cardBenefits:le,discounts:Ae,elevenst:{maxDiscountPrice:p,maxDiscountRate:g,maxInstallmentMonths:G,points:C,installments:F,coupons:j,totalPointAmount:A,totalCardBenefitAmount:Y,seller:c.seller,sellerRating:c.rating,discountDetails:x}}}catch(n){return d.error(T.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const U={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},Lo=t=>{const e=t.querySelector(U.product.title);if(e?.textContent){const n=e.textContent.trim();return d.debug("상품명",{title:n}),n}return d.warn("상품명을 찾을 수 없음"),null},Mo=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const r of e){const i=r.src;if(i.includes("/still/600"))return d.debug("메인 이미지 (600px)",{src:i}),i}for(const r of e){const i=r.src;if(i.includes("/still/"))return d.debug("메인 이미지",{src:i}),i}const n=t.querySelector(U.product.mainImage);return n?.src?(d.debug("대체 이미지",{src:n.src}),n.src):(d.warn("상품 이미지를 찾을 수 없음"),null)},Oo=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(r=>{let i=r.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),d.debug("총 이미지",{count:e.length}),e},Bo=t=>{const e={},n=t.querySelector(U.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const r=t.querySelector(U.seller.official);e.isOfficial=!!r;const o=t.querySelector(U.seller.seller);return o?.textContent&&(e.seller=o.textContent.trim()),e},je=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return w(e)},Uo=t=>{const e=U.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const o=je(n.textContent);if(o)return d.debug("결제할인가",{price:o}),o}const r=t.querySelector(e.discountPriceAlt);if(r?.textContent){const o=je(r.textContent);if(o)return d.debug("결제할인가 (alt)",{price:o}),o}return null},zo=t=>{const e=U.price,n=t.querySelector(e.salePrice);if(n?.textContent){const r=je(n.textContent);if(r)return d.debug("판매가",{price:r}),r}return null},Fo=t=>{const e=U.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const r=je(n.textContent);if(r)return d.debug("정가",{price:r}),r}return null},qo=t=>{const e=U.price,n=t.querySelector(e.discountRate);if(n?.textContent){const r=n.textContent.match(/(\d+)\s*%/);if(r){const o=parseInt(r[1],10);return d.debug("할인율",{rate:o}),o}}return null},$o=t=>{d.debug("가격 정보 추출 시작...");const e=Fo(t),n=zo(t),r=Uo(t),o=qo(t),i=r||n||e;return d.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}),{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}},Wo=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const r=n.textContent||"";if(r.includes("원")){const o=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(o){const i=w(o[1]);if(i&&i>=1e3)return d.debug("DOM 스캔 가격",{price:i}),i}}}return null},Ho=t=>{const e=[],n=U.cardBenefit,r=t.querySelector(n.container);return r?(r.querySelectorAll(".gmarketcard_area img").forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(s){let u=l;u||(s.includes("smile")||s.includes("Smile")?u="스마일카드":s.includes("samsung")?u="삼성카드":u="G마켓 제휴카드"),e.push({card:u,cardName:u,benefit:"G마켓 제휴카드 혜택",imageUrl:s}),d.debug("제휴카드",{cardName:u,src:s})}}),e):(d.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},Go=t=>{const e=[],n=U.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(o=>{const i=o.querySelector(n.discountItemTitle),c=o.querySelector(n.discountItemDesc),s=o.querySelector(n.discountItemPrice),l=i?.textContent?.trim()||"",u=c?.textContent?.trim()||"";let m;if(s?.textContent){const p=s.textContent.match(/(\d{1,3}(?:,\d{3})*)/);p&&(m=parseInt(p[1].replace(/,/g,""),10))}l&&(e.push({title:l,description:u,discountPrice:m}),d.debug("결제 할인",{title:l,description:u}))}),e},Ko=t=>{d.debug("카드 혜택 추출 시작...");const e=[],n=Ho(t);e.push(...n),Go(t).forEach(i=>{const c=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(c){const s=c[1].includes("카드")?c[1]:`${c[1]}카드`,l=i.title.match(/(\d+(?:\.\d+)?)\s*%/),u=l?parseFloat(l[1]):void 0;e.some(m=>m.cardName===s)||e.push({card:s,cardName:s,benefit:i.title,discount:u,rate:u})}});const o=t.querySelector(".box__payment-discount");if(o){const c=(o.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(c){const s=parseInt(c[1],10);e.some(l=>l.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${s}% 할인`,discount:s,rate:s})}}return e.sort((i,c)=>(c.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},jo=t=>{const e=U.additionalBenefits,r=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!r)return null;let o="etc";r.includes("신세계포인트")?o="shinsegae_point":r.includes("스마일페이")?o="smile_pay":r.includes("스마일캐시")?o="smile_cash":r.includes("OK캐쉬백")&&(o="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(s=>{const l=s.querySelector(e.benefitLabel),u=s.querySelector(e.benefitValue),m=l?.textContent?.trim()||"",p=u?.textContent?.trim()||"";m&&p&&i.push({label:m,value:p})}),d.debug("추가 혜택",{type:o,title:r}),{type:o,title:r,details:i}},In=t=>{d.debug("추가 혜택 추출 시작...");const e=[],n=U.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(o=>{const i=jo(o);i&&e.push(i)}),d.debug("총 추가 혜택",{count:e.length}),e},Yo=t=>{const e=In(t);for(const n of e)for(const r of n.details){const o=r.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(o)return{amount:parseInt(o[1].replace(/,/g,""),10),description:`${n.title}: ${r.value}`}}return null},Vo=t=>{const e=U.shipping,r=!!t.querySelector(e.starDelivery),o=t.querySelector(e.shippingInfo),i=r?"스타배송":"일반배송";let c,s,l=!1;if(o){const u=o.textContent||"",m=u.match(/(\d{1,3}(?:,\d{3})*)\s*원/);m?c=`${m[1]}원`:u.includes("무료")&&(c="무료배송",l=!0);const p=u.match(/(\d+\/\d+|\d+일)/);p&&(s=p[1])}return d.debug("배송 정보",{method:i,isStarDelivery:r,fee:c}),{method:i,isStarDelivery:r,isFree:l,fee:c,estimatedDate:s}};class Rn extends Se{siteName="Gmarket";selectors={amount:[U.price.discountPrice,U.price.salePrice,U.price.originalPrice]};static isCheckoutPage(e){if(!/gmarket\.co\.kr/.test(e))return!1;const o=![/gmarket\.co\.kr\/?$/,/gmarket\.co\.kr\/n\/category/,/gmarket\.co\.kr\/n\/search/,/gmarket\.co\.kr\/n\/best$/,/gmarket\.co\.kr\/n\/deals$/,/gmarket\.co\.kr\/n\/event$/,/gmarket\.co\.kr\/cart/,/gmarket\.co\.kr\/order/,/gmarket\.co\.kr\/my/,/gmarket\.co\.kr\/login/,/gmarket\.co\.kr\/join/].some(i=>i.test(e));return ce.debug("isCheckoutPage check",{url:e,isCheckout:o}),o}parse(e){try{ce.info("Parsing Gmarket page...");const n=Lo(e),r=Mo(e),o=Oo(e),i=Bo(e),c=$o(e);let s=c.amount;if(s||(s=Wo(e)),!s)return ce.warn("No price found in Gmarket page"),null;const l=Ko(e),u=wn(l,s),m=vn(u),p=In(e),b=Yo(e),g=Vo(e);return ce.info("Parse successful",{amount:s,cardCount:m.length}),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:[],originalPrice:c.originalPrice||void 0,discountPrice:c.discountPrice||void 0,cardBenefits:m,additionalBenefits:p.length>0?p:void 0,cashback:b||void 0,shippingInfo:g||void 0,sellerInfo:i||void 0,discounts:[]}}catch(n){return ce.error(T.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Xo={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class Dn extends Se{siteName="Amazon";selectors={amount:Xo.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{d.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Zo={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class Ln extends Se{siteName="eBay";selectors={amount:Zo.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{d.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Jo={amount:[]};class Mn extends Se{siteName="Fallback";selectors={amount:Jo.amount};parse(e){try{d.info("🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return d.debug('❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return d.debug("❌ Invalid amount",{amount:o}),null;const{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function Qo(t){return Pn.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:kn.isProductPage(t)?{site:"11st",isCheckout:!0}:Rn.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:Dn.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:Ln.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function ei(t){switch(t){case"coupang":return new Pn;case"11st":return new kn;case"gmarket":return new Rn;case"amazon":return new Dn;case"ebay":return new Ln;default:return new Mn}}function ti(){return new Mn}function On(){const t=window.location.href,e=Qo(t);if(!e)return k.debug(I.PARSER,"Not a supported page",{url:t}),null;k.info(I.PARSER,`Site detected: ${e.site}`,{url:t});let r=ei(e.site).parse(document);return!r&&(k.warn(I.PARSER,"Primary parser failed, trying fallback",{site:e.site}),r=ti().parse(document),!r)?(k.error(I.PARSER,T.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(k.info(I.PARSER,"Parse successful",{title:r.title?.substring(0,50),amount:r.amount,cardBenefitsCount:r.cardBenefits?.length??0}),{paymentInfo:r,site:e.site})}function Bn(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";if(!chrome?.runtime?.sendMessage){dt.warn("Chrome extension API not available",{messageType:n,source:e});return}chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},r=>{if(chrome.runtime.lastError){dt.warn("Failed to send message to background",{error:chrome.runtime.lastError.message,messageType:n,source:e});return}r?.success&&dt.debug("Product data saved",{source:e,messageType:n})})}function Un(t,e){let n=null;const r=(...o)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...o),n=null},e)};return r.cancel=()=>{n&&(clearTimeout(n),n=null)},r}const ni=500;function ri(t){let e=!1,n=null,r=!1;const o=Un(s=>{r||(ne.info("Dynamic content detected",{reason:s}),t(`dynamic-${s}`)||ne.warn("Dynamic reparse produced no result"))},ni),i=s=>{if(r)return;const l=s.some(g=>Array.from(g.addedNodes).some(x=>x instanceof Element?x.tagName==="IFRAME"||!!x.querySelector("iframe"):!1)),u=!e&&s.some(g=>Array.from(g.addedNodes).some(x=>x instanceof Element?x.classList.contains("benefit")||!!x.querySelector(".benefit")||x.closest(".other_benefits")&&(x.querySelector("dt")||x.querySelector("dd")):!1)),m=document.querySelector(".other_benefits .benefit dt");if(!(u&&m||l))return;u&&(e=!0),o(l?"iframe":"benefit-content"),l&&(c(),ne.debug("Observer disconnected after iframe detection"))},c=()=>{r||(r=!0,n&&(n.disconnect(),n=null),ne.debug("DynamicContentObserver cleaned up"))};return document.body?(n=new MutationObserver(i),n.observe(document.body,{childList:!0,subtree:!0}),c):(ne.warn("document.body not available, observer not started"),c)}const oi=500,ii=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],si=()=>!!document.querySelector(".other_benefits .benefit dt");function ci(t){if(!window.location.hostname.includes("11st.co.kr"))return()=>{};ne.info("Setting up 11번가 benefit watcher");let e=!1,n=null,r=null;const o=new Map,i=Un(u=>{e||si()&&(ne.info("Benefit content found",{source:u}),t(u))},oi),c=new WeakSet,s=()=>{e||ii.forEach(u=>{document.querySelectorAll(u).forEach(p=>{if(c.has(p))return;c.add(p);const b=()=>{ne.debug("Benefit button clicked"),setTimeout(()=>i("benefit-click"),800)};o.set(p,b),p.addEventListener("click",b)})})};s(),r=new MutationObserver(()=>{s()}),document.body&&r.observe(document.body,{childList:!0,subtree:!0}),n=setTimeout(()=>{r&&!e&&(r.disconnect(),r=null,ne.debug("Benefit button observer disconnected (timeout)"))},5e3);const l=()=>{e||(e=!0,n&&(clearTimeout(n),n=null),r&&(r.disconnect(),r=null),o.forEach((u,m)=>{m.removeEventListener("click",u)}),o.clear(),ne.debug("ElevenStreetBenefitWatcher cleaned up"))};return window.addEventListener("beforeunload",l,{once:!0}),l}async function zn(t){const{productUrl:e,productName:n,currentPrice:r,site:o,onComplete:i}=t;try{if(k.info(I.NETWORK,"💰 [LOWEST_PRICE] Initiating price comparison",{url:e,product:n,currentPrice:r,site:o,timestamp:new Date().toISOString()}),f.comparison={status:"loading",query:n,error:null,data:null},J(),!chrome?.runtime?.sendMessage){k.error(I.NETWORK,T.NET_E002,"Chrome extension API not available",{}),f.comparison={status:"error",query:n,error:"Chrome extension API를 사용할 수 없습니다.",data:null},J();return}k.debug(I.NETWORK,"[LOWEST_PRICE] Checking server health...");const c=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!c?.success){k.error(I.NETWORK,T.NET_E002,"[LOWEST_PRICE] Server not available",{error:c?.error||"Server check failed"}),f.comparison={status:"error",query:n,error:c?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null},J();return}k.info(I.NETWORK,"[LOWEST_PRICE] Server healthy, sending comparison request");const s=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:n,currentPrice:r,currentUrl:e});s?.success?(k.info(I.NETWORK,"✅ [LOWEST_PRICE] Price comparison completed",{resultCount:s.data?.results?.length||0,fromCache:s.data?.fromCache,totalDuration:s.data?.totalDuration}),f.comparison={status:"success",query:n,error:null,data:{...s.data,current_price:r}},J(),i?.()):(k.warn(I.NETWORK,"[LOWEST_PRICE] Price comparison failed",{error:s?.error}),f.comparison={status:"error",query:n,error:s?.error||"가격 비교 검색 실패",data:null},J(),i?.())}catch(c){k.error(I.NETWORK,T.NET_E002,"[LOWEST_PRICE] Request error",{error:c instanceof Error?c:new Error(String(c))}),f.comparison={status:"error",query:n,error:c instanceof Error?c.message:"알 수 없는 오류",data:null},J()}}async function Fn(t,e=1500,n=!1){const r=t.persist;r&&(r.hasHydrated?.()&&!n||await new Promise(o=>{let i=!1;const c=window.setTimeout(()=>{i||(i=!0,o())},e),s=r.onFinishHydration?.(()=>{i||(i=!0,window.clearTimeout(c),s&&s(),o())});try{r.rehydrate?.()}catch{}}))}const ai=window.self===window.top;let mn=!1,se=null;const Ye=[];function Ve(t,e){return{...t,site:e}}function gn(t){const e=On();return e?(se=e,Tt(Ve(e.paymentInfo,e.site)),Bn(e.paymentInfo,t),!0):!1}function li(){const t=On();if(!t){k.warn(I.BOOTSTRAP,"Failed to extract payment info on init");return}se=t,An(Ve(t.paymentInfo,t.site)),Bn(t.paymentInfo,"initial"),(async()=>{await Fn(ae);const e=ae.getState();if(Tt(Ve(t.paymentInfo,t.site)),k.info(I.BOOTSTRAP,"⚙️ Display mode check",{displayMode:e.displayMode,autoFetchLowestPrice:e.autoFetchLowestPrice,hasTitle:!!t.paymentInfo.title}),e.displayMode==="lowest-price"){if(!t.paymentInfo.title){k.warn(I.BOOTSTRAP,"⚠️ [LOWEST_PRICE] Cannot fetch: no product title");return}e.autoFetchLowestPrice?(k.info(I.BOOTSTRAP,"🚀 [LOWEST_PRICE] Auto fetch enabled",{displayMode:e.displayMode,productTitle:t.paymentInfo.title.substring(0,50)}),zn({productUrl:window.location.href,productName:t.paymentInfo.title,currentPrice:t.paymentInfo.amount,site:t.site,onComplete:()=>{Ce(!0)}})):k.info(I.BOOTSTRAP,"⏸️ [LOWEST_PRICE] Manual mode (will fetch when panel opens)",{displayMode:e.displayMode})}else k.debug(I.BOOTSTRAP,"💳 Card benefits mode selected")})()}function ui(){Ye.forEach(t=>{try{t()}catch(e){k.warn(I.BOOTSTRAP,"Cleanup error",{error:e})}}),Ye.length=0}function di(){if(!ai||mn)return;mn=!0,k.info(I.BOOTSTRAP,"Content script starting"),li(),chrome?.storage?.onChanged&&chrome.storage.onChanged.addListener((n,r)=>{r==="local"&&(!n||!Object.prototype.hasOwnProperty.call(n,tr.SETTINGS)||(async()=>{await Fn(ae,1500,!0);const o=ae.getState();se&&Tt(Ve(se.paymentInfo,se.site)),o.displayMode==="lowest-price"&&o.autoFetchLowestPrice&&se?.paymentInfo?.title&&zn({productUrl:window.location.href,productName:se.paymentInfo.title,currentPrice:se.paymentInfo.amount,site:se.site,onComplete:()=>{Ce(!0)}})})())});const t=ri(n=>gn(n));Ye.push(t);const e=ci(n=>{gn(n)});Ye.push(e),window.addEventListener("beforeunload",ui,{once:!0})}or(di);
