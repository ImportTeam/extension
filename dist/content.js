import{b as ir,p as ae,E as T,a as d,l as k,L as N,n as gt,d as re}from"./assets/index-CtnQ7lw9.js";import{u as oe}from"./assets/store-BzCosYRB.js";import{S as sr}from"./assets/chromeStorage-Dg3q2KGi.js";import{C as cr}from"./assets/constants-DOucEiR9.js";const ar=window.self===window.top;function lr(t){if(!ar){ir.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const ur="modulepreload",dr=function(t,e){return new URL(t,e).href},tn={},_n=function(e,n,r){let o=Promise.resolve();if(n&&n.length>0){let u=function(f){return Promise.all(f.map(p=>Promise.resolve(p).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};const c=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),l=s?.nonce||s?.getAttribute("nonce");o=u(n.map(f=>{if(f=dr(f,r),f in tn)return;tn[f]=!0;const p=f.endsWith(".css"),x=p?'[rel="stylesheet"]':"";if(r)for(let h=c.length-1;h>=0;h--){const y=c[h];if(y.href===f&&(!p||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${x}`))return;const g=document.createElement("link");if(g.rel=p?"stylesheet":ur,p||(g.as="script"),g.crossOrigin="",g.href=f,l&&g.setAttribute("nonce",l),document.head.appendChild(g),p)return new Promise((h,y)=>{g.addEventListener("load",h),g.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(c){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=c,window.dispatchEvent(s),!s.defaultPrevented)throw c}return o.then(c=>{for(const s of c||[])s.status==="rejected"&&i(s.reason);return e().catch(i)})},nn="picsel-toggle-host",ht="picsel-toggle-panel",pr={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},fr=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return pr[e]||String(t)},m={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null,comparison:{status:"idle",query:null,error:null,data:null}},le=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const c=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(c,o).format(i)},mr=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),gr=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const p=document.createElement("img");p.src=r,p.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(p)}else{const p=document.createElement("span");p.textContent="No Image",p.style.fontSize="11px",p.style.color="#64748b",n.appendChild(p)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const c=document.createElement("div");c.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=le(s,t.currency??"KRW");if(l){const p=document.createElement("div");p.className="picsel-final-price",p.textContent=l,c.appendChild(p)}const u=le(t.originalPrice,t.currency??"KRW"),f=mr(t.originalPrice,s);if(u&&f){const p=document.createElement("div");p.className="picsel-original-price",p.textContent=u;const x=document.createElement("div");x.className="picsel-discount-tag",x.textContent=`-${f}%`,c.appendChild(p),c.appendChild(x)}if(o.appendChild(i),o.appendChild(c),t.shippingInfo){const p=document.createElement("div");p.className="picsel-shipping",p.textContent=`배송: ${t.shippingInfo}`,o.appendChild(p)}return e.appendChild(n),e.appendChild(o),e};const{entries:Cn,setPrototypeOf:rn,isFrozen:hr,getPrototypeOf:br,getOwnPropertyDescriptor:xr}=Object;let{freeze:H,seal:Z,create:At}=Object,{apply:Tt,construct:vt}=typeof Reflect<"u"&&Reflect;H||(H=function(e){return e});Z||(Z=function(e){return e});Tt||(Tt=function(e,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return e.apply(n,o)});vt||(vt=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new e(...r)});const je=G(Array.prototype.forEach),Er=G(Array.prototype.lastIndexOf),on=G(Array.prototype.pop),Re=G(Array.prototype.push),yr=G(Array.prototype.splice),Ye=G(String.prototype.toLowerCase),bt=G(String.prototype.toString),xt=G(String.prototype.match),De=G(String.prototype.replace),_r=G(String.prototype.indexOf),Cr=G(String.prototype.trim),Q=G(Object.prototype.hasOwnProperty),W=G(RegExp.prototype.test),Oe=Sr(TypeError);function G(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Tt(t,e,r)}}function Sr(t){return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return vt(t,n)}}function S(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ye;rn&&rn(t,null);let r=e.length;for(;r--;){let o=e[r];if(typeof o=="string"){const i=n(o);i!==o&&(hr(e)||(e[r]=i),o=i)}t[o]=!0}return t}function Ar(t){for(let e=0;e<t.length;e++)Q(t,e)||(t[e]=null);return t}function ne(t){const e=At(null);for(const[n,r]of Cn(t))Q(t,n)&&(Array.isArray(r)?e[n]=Ar(r):r&&typeof r=="object"&&r.constructor===Object?e[n]=ne(r):e[n]=r);return e}function Me(t,e){for(;t!==null;){const r=xr(t,e);if(r){if(r.get)return G(r.get);if(typeof r.value=="function")return G(r.value)}t=br(t)}function n(){return null}return n}const sn=H(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Et=H(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),yt=H(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Tr=H(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),_t=H(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),vr=H(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),cn=H(["#text"]),an=H(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ct=H(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ln=H(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ve=H(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),wr=Z(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Pr=Z(/<%[\w\W]*|[\w\W]*%>/gm),kr=Z(/\$\{[\w\W]*/gm),Nr=Z(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ir=Z(/^aria-[\-\w]+$/),Sn=Z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Rr=Z(/^(?:\w+script|data):/i),Dr=Z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),An=Z(/^html$/i),Or=Z(/^[a-z][.\w]*(-[.\w]+)+$/i);var un=Object.freeze({__proto__:null,ARIA_ATTR:Ir,ATTR_WHITESPACE:Dr,CUSTOM_ELEMENT:Or,DATA_ATTR:Nr,DOCTYPE_NAME:An,ERB_EXPR:Pr,IS_ALLOWED_URI:Sn,IS_SCRIPT_OR_DATA:Rr,MUSTACHE_EXPR:wr,TMPLIT_EXPR:kr});const Le={element:1,text:3,progressingInstruction:7,comment:8,document:9},Mr=function(){return typeof window>"u"?null:window},Lr=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const i="dompurify"+(r?"#"+r:"");try{return e.createPolicy(i,{createHTML(c){return c},createScriptURL(c){return c}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},dn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Tn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Mr();const e=_=>Tn(_);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==Le.document||!t.Element)return e.isSupported=!1,e;let{document:n}=t;const r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:c,Node:s,Element:l,NodeFilter:u,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:x,trustedTypes:g}=t,h=l.prototype,y=Me(h,"cloneNode"),C=Me(h,"remove"),v=Me(h,"nextSibling"),O=Me(h,"childNodes"),q=Me(h,"parentNode");if(typeof c=="function"){const _=n.createElement("template");_.content&&_.content.ownerDocument&&(n=_.content.ownerDocument)}let A,X="";const{implementation:K,createNodeIterator:ue,createDocumentFragment:ve,getElementsByTagName:we}=n,{importNode:Pe}=r;let F=dn();e.isSupported=typeof Cn=="function"&&typeof q=="function"&&K&&K.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:et,ERB_EXPR:tt,TMPLIT_EXPR:nt,DATA_ATTR:jn,ARIA_ATTR:Vn,IS_SCRIPT_OR_DATA:Yn,ATTR_WHITESPACE:It,CUSTOM_ELEMENT:Xn}=un;let{IS_ALLOWED_URI:Rt}=un,M=null;const Dt=S({},[...sn,...Et,...yt,..._t,...cn]);let B=null;const Ot=S({},[...an,...Ct,...ln,...Ve]);let I=Object.seal(At(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,rt=null;const me=Object.seal(At(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Mt=!0,ot=!0,Lt=!1,Bt=!0,ge=!1,$e=!0,de=!1,it=!1,st=!1,he=!1,qe=!1,Fe=!1,Ut=!0,zt=!1;const Zn="user-content-";let ct=!0,Ne=!1,be={},ee=null;const at=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let $t=null;const qt=S({},["audio","video","img","source","image","track"]);let lt=null;const Ft=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),We="http://www.w3.org/1998/Math/MathML",He="http://www.w3.org/2000/svg",ie="http://www.w3.org/1999/xhtml";let xe=ie,ut=!1,dt=null;const Jn=S({},[We,He,ie],bt);let Ge=S({},["mi","mo","mn","ms","mtext"]),Ke=S({},["annotation-xml"]);const Qn=S({},["title","style","font","a","script"]);let Ie=null;const er=["application/xhtml+xml","text/html"],tr="text/html";let D=null,Ee=null;const nr=n.createElement("form"),Wt=function(a){return a instanceof RegExp||a instanceof Function},pt=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ee&&Ee===a)){if((!a||typeof a!="object")&&(a={}),a=ne(a),Ie=er.indexOf(a.PARSER_MEDIA_TYPE)===-1?tr:a.PARSER_MEDIA_TYPE,D=Ie==="application/xhtml+xml"?bt:Ye,M=Q(a,"ALLOWED_TAGS")?S({},a.ALLOWED_TAGS,D):Dt,B=Q(a,"ALLOWED_ATTR")?S({},a.ALLOWED_ATTR,D):Ot,dt=Q(a,"ALLOWED_NAMESPACES")?S({},a.ALLOWED_NAMESPACES,bt):Jn,lt=Q(a,"ADD_URI_SAFE_ATTR")?S(ne(Ft),a.ADD_URI_SAFE_ATTR,D):Ft,$t=Q(a,"ADD_DATA_URI_TAGS")?S(ne(qt),a.ADD_DATA_URI_TAGS,D):qt,ee=Q(a,"FORBID_CONTENTS")?S({},a.FORBID_CONTENTS,D):at,ke=Q(a,"FORBID_TAGS")?S({},a.FORBID_TAGS,D):ne({}),rt=Q(a,"FORBID_ATTR")?S({},a.FORBID_ATTR,D):ne({}),be=Q(a,"USE_PROFILES")?a.USE_PROFILES:!1,Mt=a.ALLOW_ARIA_ATTR!==!1,ot=a.ALLOW_DATA_ATTR!==!1,Lt=a.ALLOW_UNKNOWN_PROTOCOLS||!1,Bt=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ge=a.SAFE_FOR_TEMPLATES||!1,$e=a.SAFE_FOR_XML!==!1,de=a.WHOLE_DOCUMENT||!1,he=a.RETURN_DOM||!1,qe=a.RETURN_DOM_FRAGMENT||!1,Fe=a.RETURN_TRUSTED_TYPE||!1,st=a.FORCE_BODY||!1,Ut=a.SANITIZE_DOM!==!1,zt=a.SANITIZE_NAMED_PROPS||!1,ct=a.KEEP_CONTENT!==!1,Ne=a.IN_PLACE||!1,Rt=a.ALLOWED_URI_REGEXP||Sn,xe=a.NAMESPACE||ie,Ge=a.MATHML_TEXT_INTEGRATION_POINTS||Ge,Ke=a.HTML_INTEGRATION_POINTS||Ke,I=a.CUSTOM_ELEMENT_HANDLING||{},a.CUSTOM_ELEMENT_HANDLING&&Wt(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(I.tagNameCheck=a.CUSTOM_ELEMENT_HANDLING.tagNameCheck),a.CUSTOM_ELEMENT_HANDLING&&Wt(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(I.attributeNameCheck=a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),a.CUSTOM_ELEMENT_HANDLING&&typeof a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(I.allowCustomizedBuiltInElements=a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ge&&(ot=!1),qe&&(he=!0),be&&(M=S({},cn),B=[],be.html===!0&&(S(M,sn),S(B,an)),be.svg===!0&&(S(M,Et),S(B,Ct),S(B,Ve)),be.svgFilters===!0&&(S(M,yt),S(B,Ct),S(B,Ve)),be.mathMl===!0&&(S(M,_t),S(B,ln),S(B,Ve))),a.ADD_TAGS&&(typeof a.ADD_TAGS=="function"?me.tagCheck=a.ADD_TAGS:(M===Dt&&(M=ne(M)),S(M,a.ADD_TAGS,D))),a.ADD_ATTR&&(typeof a.ADD_ATTR=="function"?me.attributeCheck=a.ADD_ATTR:(B===Ot&&(B=ne(B)),S(B,a.ADD_ATTR,D))),a.ADD_URI_SAFE_ATTR&&S(lt,a.ADD_URI_SAFE_ATTR,D),a.FORBID_CONTENTS&&(ee===at&&(ee=ne(ee)),S(ee,a.FORBID_CONTENTS,D)),a.ADD_FORBID_CONTENTS&&(ee===at&&(ee=ne(ee)),S(ee,a.ADD_FORBID_CONTENTS,D)),ct&&(M["#text"]=!0),de&&S(M,["html","head","body"]),M.table&&(S(M,["tbody"]),delete ke.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw Oe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Oe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=a.TRUSTED_TYPES_POLICY,X=A.createHTML("")}else A===void 0&&(A=Lr(g,o)),A!==null&&typeof X=="string"&&(X=A.createHTML(""));H&&H(a),Ee=a}},Ht=S({},[...Et,...yt,...Tr]),Gt=S({},[..._t,...vr]),rr=function(a){let b=q(a);(!b||!b.tagName)&&(b={namespaceURI:xe,tagName:"template"});const E=Ye(a.tagName),P=Ye(b.tagName);return dt[a.namespaceURI]?a.namespaceURI===He?b.namespaceURI===ie?E==="svg":b.namespaceURI===We?E==="svg"&&(P==="annotation-xml"||Ge[P]):!!Ht[E]:a.namespaceURI===We?b.namespaceURI===ie?E==="math":b.namespaceURI===He?E==="math"&&Ke[P]:!!Gt[E]:a.namespaceURI===ie?b.namespaceURI===He&&!Ke[P]||b.namespaceURI===We&&!Ge[P]?!1:!Gt[E]&&(Qn[E]||!Ht[E]):!!(Ie==="application/xhtml+xml"&&dt[a.namespaceURI]):!1},te=function(a){Re(e.removed,{element:a});try{q(a).removeChild(a)}catch{C(a)}},pe=function(a,b){try{Re(e.removed,{attribute:b.getAttributeNode(a),from:b})}catch{Re(e.removed,{attribute:null,from:b})}if(b.removeAttribute(a),a==="is")if(he||qe)try{te(b)}catch{}else try{b.setAttribute(a,"")}catch{}},Kt=function(a){let b=null,E=null;if(st)a="<remove></remove>"+a;else{const R=xt(a,/^[\r\n\t ]+/);E=R&&R[0]}Ie==="application/xhtml+xml"&&xe===ie&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");const P=A?A.createHTML(a):a;if(xe===ie)try{b=new x().parseFromString(P,Ie)}catch{}if(!b||!b.documentElement){b=K.createDocument(xe,"template",null);try{b.documentElement.innerHTML=ut?X:P}catch{}}const $=b.body||b.documentElement;return a&&E&&$.insertBefore(n.createTextNode(E),$.childNodes[0]||null),xe===ie?we.call(b,de?"html":"body")[0]:de?b.documentElement:$},jt=function(a){return ue.call(a.ownerDocument||a,a,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},ft=function(a){return a instanceof p&&(typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||!(a.attributes instanceof f)||typeof a.removeAttribute!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function")},Vt=function(a){return typeof s=="function"&&a instanceof s};function se(_,a,b){je(_,E=>{E.call(e,a,b,Ee)})}const Yt=function(a){let b=null;if(se(F.beforeSanitizeElements,a,null),ft(a))return te(a),!0;const E=D(a.nodeName);if(se(F.uponSanitizeElement,a,{tagName:E,allowedTags:M}),$e&&a.hasChildNodes()&&!Vt(a.firstElementChild)&&W(/<[/\w!]/g,a.innerHTML)&&W(/<[/\w!]/g,a.textContent)||a.nodeType===Le.progressingInstruction||$e&&a.nodeType===Le.comment&&W(/<[/\w]/g,a.data))return te(a),!0;if(!(me.tagCheck instanceof Function&&me.tagCheck(E))&&(!M[E]||ke[E])){if(!ke[E]&&Zt(E)&&(I.tagNameCheck instanceof RegExp&&W(I.tagNameCheck,E)||I.tagNameCheck instanceof Function&&I.tagNameCheck(E)))return!1;if(ct&&!ee[E]){const P=q(a)||a.parentNode,$=O(a)||a.childNodes;if($&&P){const R=$.length;for(let j=R-1;j>=0;--j){const ce=y($[j],!0);ce.__removalCount=(a.__removalCount||0)+1,P.insertBefore(ce,v(a))}}}return te(a),!0}return a instanceof l&&!rr(a)||(E==="noscript"||E==="noembed"||E==="noframes")&&W(/<\/no(script|embed|frames)/i,a.innerHTML)?(te(a),!0):(ge&&a.nodeType===Le.text&&(b=a.textContent,je([et,tt,nt],P=>{b=De(b,P," ")}),a.textContent!==b&&(Re(e.removed,{element:a.cloneNode()}),a.textContent=b)),se(F.afterSanitizeElements,a,null),!1)},Xt=function(a,b,E){if(Ut&&(b==="id"||b==="name")&&(E in n||E in nr))return!1;if(!(ot&&!rt[b]&&W(jn,b))){if(!(Mt&&W(Vn,b))){if(!(me.attributeCheck instanceof Function&&me.attributeCheck(b,a))){if(!B[b]||rt[b]){if(!(Zt(a)&&(I.tagNameCheck instanceof RegExp&&W(I.tagNameCheck,a)||I.tagNameCheck instanceof Function&&I.tagNameCheck(a))&&(I.attributeNameCheck instanceof RegExp&&W(I.attributeNameCheck,b)||I.attributeNameCheck instanceof Function&&I.attributeNameCheck(b,a))||b==="is"&&I.allowCustomizedBuiltInElements&&(I.tagNameCheck instanceof RegExp&&W(I.tagNameCheck,E)||I.tagNameCheck instanceof Function&&I.tagNameCheck(E))))return!1}else if(!lt[b]){if(!W(Rt,De(E,It,""))){if(!((b==="src"||b==="xlink:href"||b==="href")&&a!=="script"&&_r(E,"data:")===0&&$t[a])){if(!(Lt&&!W(Yn,De(E,It,"")))){if(E)return!1}}}}}}}return!0},Zt=function(a){return a!=="annotation-xml"&&xt(a,Xn)},Jt=function(a){se(F.beforeSanitizeAttributes,a,null);const{attributes:b}=a;if(!b||ft(a))return;const E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:B,forceKeepAttr:void 0};let P=b.length;for(;P--;){const $=b[P],{name:R,namespaceURI:j,value:ce}=$,ye=D(R),mt=ce;let U=R==="value"?mt:Cr(mt);if(E.attrName=ye,E.attrValue=U,E.keepAttr=!0,E.forceKeepAttr=void 0,se(F.uponSanitizeAttribute,a,E),U=E.attrValue,zt&&(ye==="id"||ye==="name")&&(pe(R,a),U=Zn+U),$e&&W(/((--!?|])>)|<\/(style|title|textarea)/i,U)){pe(R,a);continue}if(ye==="attributename"&&xt(U,"href")){pe(R,a);continue}if(E.forceKeepAttr)continue;if(!E.keepAttr){pe(R,a);continue}if(!Bt&&W(/\/>/i,U)){pe(R,a);continue}ge&&je([et,tt,nt],en=>{U=De(U,en," ")});const Qt=D(a.nodeName);if(!Xt(Qt,ye,U)){pe(R,a);continue}if(A&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!j)switch(g.getAttributeType(Qt,ye)){case"TrustedHTML":{U=A.createHTML(U);break}case"TrustedScriptURL":{U=A.createScriptURL(U);break}}if(U!==mt)try{j?a.setAttributeNS(j,R,U):a.setAttribute(R,U),ft(a)?te(a):on(e.removed)}catch{pe(R,a)}}se(F.afterSanitizeAttributes,a,null)},or=function _(a){let b=null;const E=jt(a);for(se(F.beforeSanitizeShadowDOM,a,null);b=E.nextNode();)se(F.uponSanitizeShadowNode,b,null),Yt(b),Jt(b),b.content instanceof i&&_(b.content);se(F.afterSanitizeShadowDOM,a,null)};return e.sanitize=function(_){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},b=null,E=null,P=null,$=null;if(ut=!_,ut&&(_="<!-->"),typeof _!="string"&&!Vt(_))if(typeof _.toString=="function"){if(_=_.toString(),typeof _!="string")throw Oe("dirty is not a string, aborting")}else throw Oe("toString is not a function");if(!e.isSupported)return _;if(it||pt(a),e.removed=[],typeof _=="string"&&(Ne=!1),Ne){if(_.nodeName){const ce=D(_.nodeName);if(!M[ce]||ke[ce])throw Oe("root node is forbidden and cannot be sanitized in-place")}}else if(_ instanceof s)b=Kt("<!---->"),E=b.ownerDocument.importNode(_,!0),E.nodeType===Le.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?b=E:b.appendChild(E);else{if(!he&&!ge&&!de&&_.indexOf("<")===-1)return A&&Fe?A.createHTML(_):_;if(b=Kt(_),!b)return he?null:Fe?X:""}b&&st&&te(b.firstChild);const R=jt(Ne?_:b);for(;P=R.nextNode();)Yt(P),Jt(P),P.content instanceof i&&or(P.content);if(Ne)return _;if(he){if(qe)for($=ve.call(b.ownerDocument);b.firstChild;)$.appendChild(b.firstChild);else $=b;return(B.shadowroot||B.shadowrootmode)&&($=Pe.call(r,$,!0)),$}let j=de?b.outerHTML:b.innerHTML;return de&&M["!doctype"]&&b.ownerDocument&&b.ownerDocument.doctype&&b.ownerDocument.doctype.name&&W(An,b.ownerDocument.doctype.name)&&(j="<!DOCTYPE "+b.ownerDocument.doctype.name+`>
`+j),ge&&je([et,tt,nt],ce=>{j=De(j,ce," ")}),A&&Fe?A.createHTML(j):j},e.setConfig=function(){let _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};pt(_),it=!0},e.clearConfig=function(){Ee=null,it=!1},e.isValidAttribute=function(_,a,b){Ee||pt({});const E=D(_),P=D(a);return Xt(E,P,b)},e.addHook=function(_,a){typeof a=="function"&&Re(F[_],a)},e.removeHook=function(_,a){if(a!==void 0){const b=Er(F[_],a);return b===-1?void 0:yr(F[_],b,1)[0]}return on(F[_])},e.removeHooks=function(_){F[_]=[]},e.removeAllHooks=function(){F=dn()},e}var wt=Tn();const Br=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),Ur=(t,e)=>typeof t!="number"||e===null?null:t-e,pn=t=>{const e=t.toUpperCase(),n={KB:"KB",NH:"NH",BC:"BC"};for(const[o,i]of Object.entries(n))if(e.includes(o))return i;const r={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",비씨:"BC",씨티:"CT"};for(const[o,i]of Object.entries(r))if(t.includes(o))return i;return t.replace("카드","").substring(0,2).toUpperCase()},zr=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드","SAMSUNG CARD"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:r,svg:o}of n)for(const i of r)if(e.includes(i.toUpperCase()))try{return chrome?.runtime?.getURL(`assets/card/${o}`)??null}catch{return null}return null},$r=(t,e,n)=>{const r=" recommended",o=document.createElement("div");o.className=`picsel-card-benefit-item${r}`;const i=t.cardName||t.card||"카드",s=zr(i)||t.imageUrl;if(s){const h=document.createElement("div");h.className="picsel-card-image-wrapper";const y=document.createElement("img");y.src=s,y.alt=i,y.className="picsel-card-image",y.onerror=()=>{const C=pn(i);h.textContent="";const v=document.createElement("div");v.className="picsel-card-initial",v.textContent=wt.sanitize(C,{ALLOWED_TAGS:[]}),h.appendChild(v)},h.appendChild(y),o.appendChild(h)}else{const h=pn(i),y=document.createElement("div");y.className="picsel-card-image-wrapper";const C=document.createElement("div");C.className="picsel-card-initial",C.textContent=wt.sanitize(h,{ALLOWED_TAGS:[]}),y.appendChild(C),o.appendChild(y)}const l=document.createElement("div");l.className="picsel-card-info";const u=document.createElement("div");if(u.className="picsel-card-header",(t.discountAmount??0)>0){const h=document.createElement("span");h.className="picsel-recommended-badge",h.textContent=`${e+1}위`,u.appendChild(h)}const f=document.createElement("span");f.className="picsel-card-name";const p=i.includes(",")?i.split(",")[0].trim():i;if(f.textContent=p,u.appendChild(f),l.appendChild(u),t.benefit){const h=document.createElement("div");h.className="picsel-card-benefit-desc",h.textContent=t.benefit,l.appendChild(h)}o.appendChild(l);const x=document.createElement("div");if(x.className="picsel-card-amount",t.benefitType==="installment"){const h=document.createElement("div");h.className="picsel-card-installment",h.textContent=t.benefit||"무이자",x.appendChild(h)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const C=document.createElement("div");C.className="picsel-card-final-price";const v=le(t.finalPrice,n);C.textContent=v,x.appendChild(C)}const h=document.createElement("div");h.className="picsel-card-discount";const y=le(t.discountAmount,n);h.textContent=`-${y}`,x.appendChild(h)}else if(typeof t.rate=="number"&&t.rate>0){const h=document.createElement("div");h.className="picsel-card-rate",h.textContent=`${t.rate}%`,x.appendChild(h)}return o.appendChild(x),o},qr=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const g=document.createElement("section");g.className="picsel-section picsel-card-section picsel-hidden",g.setAttribute("data-empty","true"),g.style.display="none";const h=document.createElement("h4");h.className="picsel-section-title",h.textContent="카드별 혜택",g.appendChild(h);const y=document.createElement("div");return y.className="picsel-empty-benefits",y.textContent="이 상품에는 카드 혜택이 없어요",g.appendChild(y),g}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(g=>{const h=g;if(h.benefitType==="point"||h.benefitType==="installment")return null;const y=h.rate??h.discount;let C=0,v=0;typeof y=="number"&&y>100||h.benefitType==="discount"?(C=typeof y=="number"&&y>100?y:h.discount??0,v=0):(v=typeof y=="number"&&y<=100?y:0,C=Br(n,v)??0);const O=Ur(n,C);return{...h,cardName:h.cardName??h.card,rate:v,discountAmount:C??void 0,finalPrice:O??void 0}}).filter(g=>g!==null).sort((g,h)=>{const y=g?.discountAmount??0,C=h?.discountAmount??0;if(y!==C)return C-y;const v=g?.rate??0;return(h?.rate??0)-v})[0];if(!i)return null;const c=document.createElement("section");c.className="picsel-section picsel-card-section";const s=document.createElement("h4");s.className="picsel-section-title",s.textContent="추천 카드 혜택",c.appendChild(s);const l=document.createElement("div");l.className="picsel-card-benefit-list";const u=t.currency??"KRW",f=$r(i,0,u);l.appendChild(f),c.appendChild(l);const p=[],x=t.elevenst?.totalPointAmount??0;if(x>0&&p.push(`최대 적립 포인트 ${x.toLocaleString()}P`),t.giftCardDiscount?.description&&p.push(t.giftCardDiscount.description),t.cashback?.description&&p.push(t.cashback.description),p.length>0){const g=document.createElement("div");g.className="picsel-sub-benefits",p.forEach(h=>{const y=document.createElement("div");y.className="picsel-sub-benefit-item";const C=h.match(/(\d{1,3}(,\d{3})*)/);if(C){const v=h.substring(0,C.index),O=C[0],q=h.substring((C.index??0)+O.length);y.innerHTML=wt.sanitize(`${v}<strong style="color: #1d4ed8; font-weight: 700;">${O}</strong>${q}`,{ALLOWED_TAGS:["strong"],ALLOWED_ATTR:["style"]})}else y.textContent=h;g.appendChild(y)}),c.appendChild(g)}return c},Fr=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{Se(!1)}),n.appendChild(r),e.appendChild(n),e},fn=(t,e)=>le(t,e??"KRW")??`${t.toLocaleString()}원`,Wr=t=>le(t,"KRW")??`${t.toLocaleString()}원`,Hr=t=>Array.isArray(t.top_prices)&&t.top_prices.length>0?t.top_prices.map(n=>({provider:n.mall||"Unknown",name:n.mall||"Unknown",price:n.price,currency:"KRW",url:n.link,free_shipping:n.free_shipping,delivery:n.delivery})).filter(n=>typeof n.price=="number"&&n.price>0).slice(0,3):(Array.isArray(t.results)?t.results:[]).filter(n=>n&&n.success&&Array.isArray(n.products)).flatMap(n=>n.products.map(r=>({provider:n.provider,name:r.name,price:r.price,currency:r.currency,url:r.url}))).filter(n=>typeof n.price=="number"&&n.price>0).sort((n,r)=>n.price-r.price).slice(0,3),mn='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 4L6.667 11.333 3.333 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',Gr=t=>{const{panelIsOpen:e,comparison:n}=t,r=document.createElement("section");if(r.className="picsel-section picsel-lowest-price-section",!e){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent="패널을 열면 최저가 비교를 시작합니다.",r.appendChild(g),r}if(n.status==="loading"){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent="가격 비교 중...",r.appendChild(g),r}if(n.status==="error"){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent=n.error||"가격 비교 중 오류가 발생했습니다.",r.appendChild(g),r}if(n.status!=="success"||!n.data){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent="상품명을 찾을 수 없어 가격 비교를 실행할 수 없습니다.",r.appendChild(g),r}const o=n.data,i=Hr(o),c=i.length>0?i[0].price:null,s=typeof o.current_price=="number"?o.current_price:null,l=c&&s&&s>c?s-c:null;if(l&&l>0){const g=document.createElement("div");g.className="picsel-savings-banner";const h=document.createElement("span");h.className="picsel-savings-icon picsel-savings-icon-green",h.innerHTML=mn;const y=document.createElement("span");y.className="picsel-savings-text",y.textContent=`지금 ${Wr(l)} 더 아낄 수 있어요!`,g.appendChild(h),g.appendChild(y),r.appendChild(g)}else if(c&&s&&s<=c){const g=document.createElement("div");g.className="picsel-no-savings-banner picsel-no-savings-banner-green";const h=document.createElement("span");h.className="picsel-savings-icon picsel-savings-icon-green",h.innerHTML=mn;const y=document.createElement("span");y.className="picsel-savings-text",y.textContent=`${fn(s,"KRW")}이 최저가입니다.`,g.appendChild(h),g.appendChild(y),r.appendChild(g)}if(i.length===0){const g=document.createElement("div");return g.className="picsel-empty-state",g.textContent="검색 결과가 없습니다.",r.appendChild(g),r}const u=document.createElement("div");u.className="picsel-section-header";const f=document.createElement("span");f.className="picsel-section-title",f.textContent="최저가 추천";const p=document.createElement("span");p.className="picsel-section-note",p.textContent="배송비 포함 기준",u.appendChild(f),u.appendChild(p),r.appendChild(u);const x=document.createElement("div");if(x.className="picsel-price-list",i.forEach((g,h)=>{const y=h===0,C=document.createElement("a");C.href=g.url||"#",C.target="_blank",C.rel="noreferrer",C.className=y?"picsel-price-item picsel-price-item-top":"picsel-price-item";const v=document.createElement("div");v.className="picsel-price-item-left";const O=document.createElement("div");O.className="picsel-mall-row";const q=document.createElement("span");if(q.className="picsel-mall-name",q.textContent=(g.name||g.provider||"알 수 없음").trim(),O.appendChild(q),y){const ue=document.createElement("span");ue.className="picsel-lowest-badge",ue.textContent="최저가",O.appendChild(ue)}v.appendChild(O);const A=document.createElement("div");A.className="picsel-price-item-right";const X=document.createElement("span");X.className="picsel-price-value",X.textContent=fn(g.price,g.currency);const K=document.createElement("span");K.className="picsel-price-arrow",K.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',A.appendChild(X),A.appendChild(K),C.appendChild(v),C.appendChild(A),x.appendChild(C)}),r.appendChild(x),o.link){const g=document.createElement("a");g.href=o.link,g.target="_blank",g.rel="noreferrer",g.className="picsel-footer-link",g.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2h7m0 0v7m0-7L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 정확한 정보 확인하기',r.appendChild(g)}return r},_e=t=>{const{buttonBadgeEl:e}=m;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const i=o,c=i.rate??i.discount;return typeof c=="number"?c:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n),i=t.cardBenefits?.[0];i?.benefit&&i.card==="최저가"?e.textContent=`${i.benefit} 이 최저가입니다`:e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=le(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},Y=()=>{const{contentEl:t,cachedData:e,panelEl:n,buttonLabelEl:r}=m;if(!t)return;if(t.textContent="",!e){const u=document.createElement("p");u.className="picsel-empty-state",u.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(u),_e(null);return}const o=e,{displayMode:i}=oe.getState(),c=!!n?.classList.contains("open");if(t.appendChild(gr(o)),i==="lowest-price"){if(t.appendChild(Gr({panelIsOpen:c,comparison:m.comparison})),m.comparison.status==="loading")_e(null);else if(m.comparison.status==="success"&&m.comparison.data){const u=m.comparison.data.top_prices,f=Array.isArray(u)&&u.length>0?u[0]:null;if(f&&typeof f.price=="number"&&f.price>0){const p=f.mall||"최저가",x=`${le(f.price,"KRW")} (${p})`;_e({price:o.amount||0,amount:o.amount,currency:o.currency,title:o.title,cardBenefits:[{card:"최저가",benefit:x,discount:0}]})}else _e(null)}else _e(null);return}r&&!c&&(r.textContent="PicSel 혜택 보기");const s=qr(o);s&&t.appendChild(s);const l=Fr();l&&t.appendChild(l),_e(o)},Kr=async(t,e,n)=>{if(t&&m.comparison.status!=="loading"&&!(m.comparison.query===t&&(m.comparison.status==="success"||m.comparison.status==="error"))){m.comparison={status:"loading",query:t,error:null,data:null};try{if(!chrome?.runtime?.sendMessage){m.comparison={status:"error",query:t,error:"Chrome extension API를 사용할 수 없습니다.",data:null},e?.();return}const r=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!r?.success){m.comparison={status:"error",query:t,error:r?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null},e?.();return}const o=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:t,selectedOptions:n&&n.length>0?n:void 0});if(o?.success){m.comparison={status:"success",query:t,error:null,data:{...o.data,current_price:m.cachedData?.amount}},e?.();return}m.comparison={status:"error",query:t,error:o?.error||"가격 비교 검색 실패",data:null},e?.()}catch(r){m.comparison={status:"error",query:t,error:r instanceof Error?r.message:"알 수 없는 오류",data:null},e?.()}}},vn=(t,e,n,r)=>{if(t&&m.comparison.status!=="loading"){if(m.comparison.query===t&&(m.comparison.status==="success"||m.comparison.status==="error")){n?.();return}m.comparison={status:"loading",query:t,error:null,data:null},e(),Kr(t,n,r).finally(()=>{e()})}},gn=["잠깐만요, 확인 중","지금 찾고 있어요","곧 보여드릴게요","조금만 기다려요","계산 중이에요","정리하고 있어요","비교하는 중이에요","거의 다 됐어요","지금 처리 중","금방 끝나요","찾는 중이에요","잠시만요"];let Xe=0;const wn=()=>{const t=gn[Xe];return Xe=(Xe+1)%gn.length,t},jr=()=>{Xe=0};let Ce=null;const Ue=()=>{const{toggleButton:t,buttonLabelEl:e,panelEl:n}=m;if(!t||!e||!n)return;const{displayMode:r}=oe.getState();if(r!=="lowest-price")return;if(n.classList.contains("open"))kt(),e.innerHTML="",e.textContent="PicSel 혜택 닫기";else{if(e.querySelector('[data-loading-message="true"]'))return;e.innerHTML="";const c=document.createElement("div");c.className="picsel-loading-message",c.setAttribute("data-loading-message","true"),c.style.display="flex",c.style.alignItems="center",c.style.gap="8px";const s=document.createElement("div");s.className="picsel-loading-spinner";const l=document.createElement("span");l.className="picsel-loading-text",l.textContent=wn(),c.appendChild(s),c.appendChild(l),e.appendChild(c),Vr(l)}},Vr=t=>{Ce&&clearInterval(Ce),Ce=setInterval(()=>{t.textContent=wn()},2e3)},kt=()=>{Ce&&(clearInterval(Ce),Ce=null),jr()},Pn=Object.freeze(Object.defineProperty({__proto__:null,stopMessageRotation:kt,updateIdleLoadingIndicator:Ue},Symbol.toStringTag,{value:"Module"})),Se=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=m;if(!e||!n||!r)return;const{displayMode:o}=oe.getState(),i=o==="lowest-price";if(t){e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),i&&m.cachedData?.title?vn(m.cachedData.title,Y,void 0,m.cachedData.selectedOptions):Y(),i&&Ue();return}e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),i?Ue():Y()},Yr=`
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
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 200px;
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
		/* 은은한 중립 톤으로 정리 (과한 색상 제거) */
		.picsel-card-section {
			margin-top: 8px;
			padding: 12px;
			background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
			border-radius: 12px;
			border: 1px solid #e5e7eb;
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
			padding: 14px;
			border-radius: 10px;
			background: #ffffff;
			border: 1px solid #e5e7eb;
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
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

		/* 1위 스타일 - 가장 진한 강조 (과한 대비 제거) */
		.picsel-card-benefit-item.recommended {
			border-left: 4px solid #4f46e5;
			background: #f5f7ff;
			box-shadow: 0 2px 4px 0 rgba(79, 70, 229, 0.12);
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

		/* 혜택 설명 - 최대 2줄, 길면 말줄임 */
		.picsel-card-benefit-desc {
			font-size: 12px;
			color: #6b7280;
			margin-top: 2px;
			line-height: 1.4;
			word-break: keep-all;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.picsel-card-discount {
			font-size: 13px;
			font-weight: 600;
			color: #dc2626;
			line-height: 1.2;
		}

		/* 모든 순위에서 할인 금액은 빨간색 유지 (할인 = 빨강 직관적) */
		.picsel-card-benefit-item.recommended .picsel-card-discount,
		.picsel-card-benefit-item.rank-2 .picsel-card-discount,
		.picsel-card-benefit-item.rank-3 .picsel-card-discount {
			color: #dc2626;
		}

		/* 최종 가격 (위에 크게 표시) - 위계 강화 */
		.picsel-card-final-price {
			font-size: 17px;
			font-weight: 700;
			color: #0f172a;
			letter-spacing: -0.4px;
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

		/* Sub Benefits - 중립 톤, 과한 색상 제거 */
		.picsel-sub-benefit-item {
			font-size: 13px;
			color: #1f2937;
			padding: 4px 0;
			font-weight: 600;
			display: flex;
			align-items: center;
			gap: 6px;
			line-height: 1.4;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.picsel-sub-benefit-item::before {
			content: '•';
			color: #4f46e5;
			font-weight: 700;
			flex-shrink: 0;
		}
			line-height: 1.5;
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

		/* 최저가 배너 - 초록색 */
		.picsel-no-savings-banner-green {
			background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
		}

		.picsel-no-savings-banner-green .picsel-savings-icon-green {
			background: #4caf50;
		}

		.picsel-no-savings-banner-green .picsel-savings-text {
			color: #2e7d32;
			font-weight: 600;
		}

		/* 절약 아이콘 초록색 */
		.picsel-savings-icon-green {
			background: #4caf50;
		}

		.picsel-savings-icon-green svg {
			color: white;
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
`,Xr=t=>{if(m.mounted)return;const e=document.getElementById(nn);if(e){m.hostElement=e,m.shadowRoot=e.shadowRoot,e.shadowRoot&&(m.toggleButton=e.shadowRoot.querySelector(".picsel-toggle-button"),m.buttonLabelEl=e.shadowRoot.querySelector(".picsel-toggle-label"),m.buttonBadgeEl=e.shadowRoot.querySelector(".picsel-toggle-badge"),m.panelEl=e.shadowRoot.querySelector(`#${ht}`),m.closeButtonEl=e.shadowRoot.querySelector(".picsel-close-button"),m.contentEl=e.shadowRoot.querySelector(".picsel-panel-content"),m.panelTitleEl=e.shadowRoot.querySelector(".picsel-panel-title")),m.mounted=!0;return}m.hostElement=document.createElement("div"),m.hostElement.id=nn,m.hostElement.style.position="fixed",m.hostElement.style.bottom="24px",m.hostElement.style.right="24px",m.hostElement.style.zIndex=String(2147483647),m.shadowRoot=m.hostElement.attachShadow({mode:"open"});const n=document.createElement("style");n.textContent=Yr,m.shadowRoot.appendChild(n);const r=document.createElement("div");r.className="picsel-toggle-container",m.shadowRoot.appendChild(r),m.toggleButton=document.createElement("button"),m.toggleButton.className="picsel-toggle-button",m.toggleButton.type="button",m.toggleButton.setAttribute("aria-expanded","false"),m.buttonLabelEl=document.createElement("span"),m.buttonLabelEl.className="picsel-toggle-label",m.toggleButton.appendChild(m.buttonLabelEl),m.buttonBadgeEl=document.createElement("span"),m.buttonBadgeEl.className="picsel-toggle-badge",m.toggleButton.appendChild(m.buttonBadgeEl),r.appendChild(m.toggleButton),Ue(),m.panelEl=document.createElement("div"),m.panelEl.className="picsel-panel",m.panelEl.id=ht,m.panelEl.setAttribute("role","dialog"),m.panelEl.setAttribute("aria-hidden","true"),m.toggleButton.setAttribute("aria-controls",ht);const o=document.createElement("div");o.className="picsel-panel-header",m.panelTitleEl=document.createElement("div"),m.panelTitleEl.className="picsel-panel-title",m.panelTitleEl.textContent="PicSel 혜택 정보",m.closeButtonEl=document.createElement("button"),m.closeButtonEl.type="button",m.closeButtonEl.className="picsel-close-button",m.closeButtonEl.setAttribute("aria-label","닫기"),m.closeButtonEl.textContent="✕",o.appendChild(m.panelTitleEl),o.appendChild(m.closeButtonEl),m.panelEl.appendChild(o),m.contentEl=document.createElement("div"),m.contentEl.className="picsel-panel-content",m.panelEl.appendChild(m.contentEl),r.appendChild(m.panelEl);const i=m.panelEl,c=m.hostElement;m.toggleButton.addEventListener("click",()=>{const s=i.classList.contains("open"),{displayMode:l}=oe.getState();if(!s&&l==="lowest-price"&&t.startLowestPriceComparisonNoPanel){kt(),t.startLowestPriceComparisonNoPanel();return}const u=!s;t.setPanelOpen(u)}),m.closeButtonEl.addEventListener("click",()=>{t.setPanelOpen(!1)}),window.addEventListener("keydown",s=>{s.key==="Escape"&&t.setPanelOpen(!1)}),document.addEventListener("click",s=>{if(!i.classList.contains("open"))return;const l=s.composedPath();c&&!l.includes(c)&&t.setPanelOpen(!1)},!0),document.body.appendChild(m.hostElement),m.mounted=!0},kn=()=>{const{displayMode:t}=oe.getState();if(m.panelTitleEl){if(t==="lowest-price"){m.panelTitleEl.textContent="가격 비교 리포트";return}if(m.cachedData?.site){const e=fr(m.cachedData.site);m.panelTitleEl.textContent=`${e} 혜택 정보`;return}m.panelTitleEl.textContent="PicSel 혜택 정보"}},Nn=t=>{m.cachedData={...t},Xr({setPanelOpen:Se,startLowestPriceComparisonNoPanel:()=>{m.cachedData?.title&&vn(m.cachedData.title,Y,()=>{Se(!0),Y()},m.cachedData.selectedOptions)}}),kn(),Y(),Se(!1);const{displayMode:n}=oe.getState();n==="lowest-price"&&Ue()},ze=t=>{if(m.cachedData={...m.cachedData??{},...t},!m.mounted){Nn(m.cachedData);return}kn(),Y()},w=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},In=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},Zr=t=>t.includes("원")||t.includes("KRW")?"KRW":t.includes("$")||t.includes("USD")?"USD":t.includes("€")||t.includes("EUR")?"EUR":t.includes("¥")||t.includes("JPY")?"JPY":"KRW",Nt=t=>typeof t=="number"&&t>100&&t<1e8,fe=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},Pt=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","BC","NH"];for(const n of e)if(t.includes(n))return n;return t.replace(/카드$/g,"")};class Te{extractNumber(e){return w(e)}extractCurrency(e){return Zr(e)}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){ae.error(T.PAR_E004,`Selector error: ${r}`,{data:{siteName:this.siteName,selector:r},error:o instanceof Error?o:void 0})}return null}isValidPrice(e){return Nt(e)}searchPriceInDOM(e,n){const r=e.querySelectorAll('[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]');for(const l of r){const f=(l.textContent||"").match(n);if(f)return ae.debug("Found price in container",{siteName:this.siteName,price:f[0]}),f[0]}const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i,c=0;const s=1e3;for(;(i=o.nextNode())&&c<s;){c++;const u=(i.textContent||"").match(n);if(u)return ae.debug("Found price via TreeWalker",{siteName:this.siteName,price:u[0],nodesScanned:c}),u[0]}return c>=s&&ae.warn("TreeWalker hit node limit",{siteName:this.siteName,limit:s}),null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const J={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",".deal-price",".special-price",".discount-price strong",'[class*="sale"] strong','[class*="discount"] strong','div[class*="price"] > strong','span[class*="price"] > strong','[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]',".deal-title",".special-title",'h1[class*="product"]','h1[class*="title"]',"h1"],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},Jr=t=>{for(const e of J.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Qr=t=>{try{const e=t.querySelector(J.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r=`https:${r}`),r=r.split("?")[0],r}const n=t.querySelector(J.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o=`https:${o}`),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return d.error(T.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},eo=t=>{try{const e=[],n=new Set,r=t.querySelector(J.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let s=i.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s=`https:${s}`),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return d.error(T.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},hn=t=>t>=100&&t<=1e8,to=t=>{let e=null,n=null,r=null;for(const o of J.amount)try{const i=t.querySelector(o);if(!i||!i.textContent)continue;const c=i.textContent.trim();if(!/[\d,]+\s*원?/.test(c)&&!/^\d{1,3}(,\d{3})*$/.test(c.replace(/[^\d,]/g,"")))continue;const s=w(c);if(!s||!hn(s))continue;if(d.debug(`Found via selector "${o}"`,{value:s}),/final|discount|final-price|deal|sale|coupon/i.test(o)){r=s,e=s;break}n||(n=s),e||(e=s)}catch(i){d.debug(`Selector ${o} failed`,{error:i})}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of o){const s=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s){const l=w(s[1]);if(l&&hn(l)){d.debug("Found via regex in element",{value:l}),e=l;break}}}}return{amount:e,originalPrice:n,discountPrice:r}},no=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const i of e){const c=o.match(i);if(c&&c[1]){const s=w(c[1]);if(s)return d.debug("Found price via text walker",{value:s}),s}}}return null},ro=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),i=(r.getAttribute("data-price")||"").trim(),s=`${o} ${i}`.trim().match(n);if(s&&s[1]){const l=w(s[1]);if(l)return d.debug("Found price by element scan",{value:l}),l}}}catch(e){d.debug("findPriceByElementScan error",{error:e})}return null},oo={신한:"assets/card/shinhanCard.svg",우리:"assets/card/wooriCard.svg",BC:"assets/card/bcCard.svg",비씨:"assets/card/bcCard.svg",롯데:"assets/card/lotteCard.svg",KB:"assets/card/kbCard.svg",국민:"assets/card/kbCard.svg",NH:"assets/card/nhCard",농협:"assets/card/hanaCard.svg",삼성:"assets/card/samsungCard.svg",하나:"assets/card/hanaCard.svg",현대:"assets/card/hyundaiCard.svg",비자:"assets/card/visaCard.svg",마스터:"assets/card/masterCard.svg"},io=t=>{const e=Pt(fe(t)),n=oo[e];if(!n)return null;try{return chrome.runtime.getURL(n)}catch{return null}},Ze=t=>{for(const[e,n]of Object.entries(cr))if(t.includes(e))return n;return null},so=t=>{const e=[],n=J.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(!s)return;let u=l.trim();u||(u=Ze(s)||""),u&&!u.includes("카드")&&(u=`${u}카드`),s&&u&&(e.some(f=>f.cardName===u)||(e.push({src:s,alt:l,cardName:u}),d.debug("카드 이미지 발견",{cardName:u,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(c=>{const s=c,l=s.src,u=s.alt||"";if(!l||(s.width||s.naturalWidth)>100)return;let p=u.trim();p||(p=Ze(l)||""),p&&!p.includes("카드")&&(p=`${p}카드`),l&&p&&!e.some(x=>x.cardName===p)&&e.push({src:l,alt:u,cardName:p})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(!s||(c.width||c.naturalWidth)>100)return;let f=l.trim();f||(f=Ze(s)||""),f&&!f.includes("카드")&&(f=`${f}카드`),s&&f&&!e.some(p=>p.cardName===f)&&e.push({src:s,alt:l,cardName:f})}),d.debug("추출된 카드 이미지 총",{count:e.length}),e},co=t=>{const e=[],n=J.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return d.debug("카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const c=o.contentDocument||o.contentWindow?.document;if(c)return ao(c)}catch{d.warn("iframe 접근 불가 (cross-origin)")}const i=r.querySelector(n.content);return i?lo(i):e},ao=t=>{const e=[],n=J.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const i=o.querySelector(n.cardName),c=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),l=i?.textContent?.trim()||"",u=c?.textContent?.trim()||"",f=s?.textContent?.trim()||o.textContent?.trim()||"";if(l){const p=In(u||f)??void 0;e.push({card:l,cardName:l,benefit:f||u||"혜택 제공",discount:p,rate:p})}}),e},lo=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let i;for(;(i=o.exec(n))!==null;){const c=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);e.some(l=>l.card===c)||e.push({card:c,cardName:c,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},uo=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",i=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const c=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);if(!e.some(l=>l.card===c)){let l=`최대 ${s}% 할인/적립`;const u=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);u&&(l=`최대 ${s}% ${u[0]}`),e.push({card:c,cardName:c,benefit:l,discount:s,rate:s})}}}),e},po=t=>{let e=[];const n=so(t),r=co(t);if(r.length>0&&(d.info("팝업에서 카드 혜택 파싱",{count:r.length}),e=r),uo(t).forEach(i=>{e.some(c=>c.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(J.benefitBadge);if(i){const c=i.querySelectorAll("img.benefit-ico"),s=[],l=[];c.forEach(p=>{const x=p.getAttribute("src");if(x){const g=Ze(x);g&&(s.push(g),l.push(x))}});const u=i.querySelector(".benefit-label")?.textContent?.trim(),f=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(u){const p=In(u),x=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드",g=p??void 0;e.push({card:x,cardName:x,benefit:`${u}${f?` (${f})`:""}`,discount:g,rate:g,imageUrl:l[0]})}}}return e=e.map((i,c)=>{if(!i.imageUrl){const s=i.cardName||i.card||"",l=Pt(fe(s));let u=n.find(f=>{const p=fe(f.cardName),x=fe(s);return p===x});if(u||(u=n.find(f=>{const p=fe(f.cardName).replace("카드",""),x=fe(s).replace("카드","");return p.includes(x)||x.includes(p)})),u||(u=n.find(f=>Pt(fe(f.cardName))===l)),!u&&c<n.length&&(u=n[c],d.debug("인덱스 기반 매칭",{cardName:s,matchedCardName:u.cardName})),!u){const f=io(s);if(f)return d.debug("로컬 아이콘 폴백 사용",{cardName:s,benefitKey:l}),{...i,imageUrl:f}}if(u)return{...i,imageUrl:u.src}}return i}),e.sort((i,c)=>(c.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{benefits:e}),e},fo=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const c=i.match(/(\d+)\s*%/);if(c)return{rate:parseInt(c[1],10),description:i.trim()}}}return null},mo=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",c=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c&&i.includes("쿠팡캐시")){const s=w(c[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=w(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},go=t=>{try{const e=[],n=new Set,r=t.querySelector(J.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const c=i.querySelectorAll("div");if(c.length<2)continue;let s="";for(const p of c){const x=p.textContent||"";if(!x.includes("원")&&x.trim().length>0&&!x.includes("px")){s=x.trim();break}}let l="";for(const p of c){const g=(p.textContent||"").match(/[\d,]+원/);if(g){l=g[0].replace(/[,원]/g,"");break}}if(!l)continue;const u=parseInt(l);if(!u||u<100||!s||s.length<2)continue;const f=`${s}-${u}`;if(n.has(f))continue;if(e.push({name:s,price:u}),n.add(f),e.length>=15)break}catch(c){d.warn("Error parsing list item",{error:c});continue}return e}catch(e){return d.error(T.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},ho=t=>t.querySelector(J.shipping)?.textContent?.trim()||null,bo=t=>{try{const e=[],n=t.querySelectorAll(".option-picker-select");for(const r of n)try{const o=r.querySelector(":scope > div:first-child");if(!o)continue;const i=o.querySelector('[class*="twc-text-[12px]"]:not([class*="twc-font-bold"])'),c=o.querySelector('[class*="twc-font-bold"]'),s=i?.textContent?.trim(),l=c?.textContent?.trim();s&&l&&(e.push({name:s.replace(/\s+/g," ").trim(),value:l.replace(/\s+/g," ").trim()}),d.debug("✅ [Coupang] Found option from picker",{name:s,value:l}))}catch(o){d.debug("[Coupang] Error parsing picker",{error:o})}if(e.length===0){const r=t.querySelectorAll('.c_product_option .option_selected .option,[class*="option_selected"] dl.option,.option_selected .option,dl.option');for(const o of r)try{const i=o.querySelector("dt"),c=o.querySelector("dd");if(!i||!c)continue;const s=i.textContent?.trim(),l=c.textContent?.trim();if(!s||!l)continue;e.push({name:s.replace(/\s+/g," ").trim(),value:l.replace(/\s+/g," ").trim()}),d.debug("✅ [Coupang] Found option from dt/dd",{name:s,value:l})}catch(i){d.debug("[Coupang] Error parsing dt/dd option",{error:i})}}if(e.length===0)try{const r=t.querySelector('[class*="product_title"], h2, h1')?.textContent?.trim()||"";if(r){d.debug("[Coupang] Attempting to extract options from title",{title:r.substring(0,80)});const o=r.match(/DDR[45]?\s+(\d+GB)/i);o&&e.push({name:"RAM",value:o[1].trim()});const i=r.match(/인텔\s+([A-Z0-9]+)(?:\s|$)/i);i&&e.push({name:"CPU",value:i[1].trim()});const c=r.match(/(\d+(?:\.\d+)?인치)/);c&&e.push({name:"화면크기",value:c[1].trim()});const s=r.match(/([가-힣]+색상?|화이트|실버|검정|회색)\s*$/i);s&&e.push({name:"색상",value:s[1].trim()})}}catch(r){d.debug("[Coupang] Error extracting options from title",{error:r})}return d.info("✅ [Coupang] Extracted selected options",{count:e.length,options:e.map(r=>`${r.name}: ${r.value}`).join(", "),isEmpty:e.length===0?"⚠️ NO OPTIONS FOUND":"OK"}),e}catch(e){return d.error(T.PAR_E001,"Error extracting selected options",{error:e instanceof Error?e:new Error(String(e))}),[]}},xo=(t,e)=>{if(!Nt(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let r=Math.round(t*(n/100));return e.maxDiscount&&r>e.maxDiscount&&(r=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:r},Eo=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},Rn=(t,e)=>t.map(r=>{const o=Eo(r);return e&&Nt(e)&&(o.discountAmount=xo(e,o)),o}).sort((r,o)=>r.discountAmount!==void 0&&o.discountAmount!==void 0?o.discountAmount-r.discountAmount:(o.rate??0)-(r.rate??0)),Dn=t=>{const e=new Map;for(const n of t){const r=yo(n.cardName||n.card),o=e.get(r);if(!o)e.set(r,n);else{const i=o.rate??o.discount??0;(n.rate??n.discount??0)>i&&e.set(r,n)}}return Array.from(e.values())},yo=t=>{const e=t.toUpperCase(),n=["KB","NH","BC"];for(const o of n)if(e.includes(o))return o;const r=["삼성","현대","신한","국민","롯데","하나","우리","농협","비씨","씨티","스마일"];for(const o of r)if(t.includes(o))return o;return t};class On extends Te{siteName="Coupang";selectors={amount:J.amount};static isCheckoutPage(e){if(!/coupang\.com/.test(e))return!1;const o=![/coupang\.com\/?$/,/shop\.coupang\.com/,/coupang\.com\/np\/categories/,/coupang\.com\/np\/search/,/coupang\.com\/np\/campaigns/,/coupang\.com\/np\/cart/,/coupang\.com\/np\/checkout/,/coupang\.com\/my\//,/coupang\.com\/np\/login/,/coupang\.com\/np\/register/].some(i=>i.test(e));return d.debug(`isCheckoutPage("${e}") = ${o}`),o}parse(e){try{d.info("🔍 Parsing Coupang page...");const n=Jr(e),r=Qr(e),o=eo(e),i=to(e);let c=i.amount;const{originalPrice:s,discountPrice:l}=i;if(c||(c=no(e)),c||(c=ro(e)),!c)return d.debug("❌ No price found"),null;const u=po(e),f=Rn(u,c),p=Dn(f),x=fo(e),g=mo(e),h=ho(e),y=go(e),C=bo(e);return d.info(`✅ Found: ${c} KRW, Cards: ${p.length}, SelectedOptions: ${C.length}`),{price:c,amount:c,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:y,originalPrice:s||void 0,discountPrice:l||void 0,cardBenefits:p,giftCardDiscount:x||void 0,cashback:g||void 0,shippingInfo:h||void 0,selectedOptions:C.length>0?C:void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const L={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",salePriceAlt2:".c_product_price .price .value",salePriceAlt3:'[class*="price"] .value',discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price",dealPrice:'.deal_price .value, [class*="deal"] .price',specialPrice:".special_price .value"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",titleAlt2:'h1[class*="title"]',titleAlt3:"h1.product_name",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},St={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},_o=t=>{const e=L.product;try{const n=t.querySelector(e.title);if(n?.textContent){const o=n.textContent.trim();return d.debug("제목 추출",{title:o}),o}const r=t.querySelector(e.titleAlt);if(r?.textContent){const o=r.textContent.trim();return d.debug("제목 추출 (alt)",{title:o}),o}}catch(n){d.error(T.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},Co=t=>{try{const e=t.querySelector(L.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return d.debug("부제목 추출",{subtitle:n}),n}}catch(e){d.error(T.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},So=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const r=t.match(n);if(r?.[1])return d.debug("상품ID 추출",{productId:r[1]}),r[1]}}catch(e){d.error(T.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},Mn=t=>{const e=L.image;try{const n=t.querySelector(e.main);if(n?.src){const i=Be(n.src);return d.debug("메인 이미지 추출",{src:i}),i}const r=t.querySelector(e.mainAlt);if(r?.src){const i=Be(r.src);return d.debug("메인 이미지 추출 (alt)",{src:i}),i}const o=t.querySelector(`${e.main}[data-src]`);if(o?.dataset?.src){const i=Be(o.dataset.src);return d.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){d.error(T.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},Ao=t=>{const e=[],n=new Set,r=L.image;try{const o=Mn(t);o&&(e.push(o),n.add(o)),t.querySelectorAll(r.thumbnail).forEach(s=>{const l=s,u=l.src||l.dataset?.src;if(u){const f=Be(u),p=bn(f);n.has(p)||(e.push(p),n.add(p))}}),t.querySelectorAll(r.thumbnailAlt).forEach(s=>{const l=s,u=l.src||l.dataset?.src;if(u){const f=Be(u),p=bn(f);n.has(p)||(e.push(p),n.add(p))}}),d.debug("전체 이미지 추출",{count:e.length})}catch(o){d.error(T.PAR_E001,"전체 이미지 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},To=t=>{const e=L.seller,n={seller:null,rating:null};try{const r=t.querySelector(e.name);r?.textContent&&(n.seller=r.textContent.trim(),d.debug("판매자 추출",{seller:n.seller}));const o=t.querySelector(e.rating);o?.textContent&&(n.rating=o.textContent.trim(),d.debug("판매자 등급 추출",{rating:n.rating}))}catch(r){d.error(T.PAR_E001,"판매자 정보 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return n};function Be(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function bn(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const vo=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=L.price;try{const r=t.querySelector(n.originalPrice);r?.textContent&&(e.originalPrice=w(r.textContent),d.debug("정가",{price:e.originalPrice}));const o=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);o?.textContent&&(e.discountPrice=w(o.textContent),e.amount=e.discountPrice,d.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=w(i.textContent),d.debug("할인율",{rate:e.discountRate}));const c=t.querySelector(n.maxDiscountPrice);c?.textContent&&(e.maxDiscountPrice=w(c.textContent),d.debug("최대할인가",{price:e.maxDiscountPrice}));const s=t.querySelector(n.maxDiscountRate);s?.textContent&&(e.maxDiscountRate=w(s.textContent),d.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(r){d.error(T.PAR_E002,"가격 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},wo=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const r of n){const o=r.textContent||"";for(const i of e){const c=o.match(i);if(c?.[1]){const s=w(c[1]);if(s&&s>100&&s<1e8)return d.debug("가격 발견",{value:s}),s}}}return null},Po=t=>{const e=[],n=L.price;try{const r=t.querySelector(n.maxDiscountLayer);if(!r)return e;r.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const c=i.querySelector(".title"),s=i.querySelector(".price");if(c&&s){const l=c.textContent?.trim()||"",u=s.textContent?.trim()||"",f=w(u.replace("-",""));l&&f&&l!=="판매가"&&(e.push({type:l,amount:f}),d.debug("DiscountDetail",{type:l,amount:f}))}})}catch(r){d.error(T.PAR_E002,"DiscountDetail 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},ko=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=No(t),e.totalPointAmount=e.points.reduce((n,r)=>n+r.amount,0),e.cardBenefits=Io(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,r)=>n+r.benefitAmount,0),e.installments=Oo(t),e.maxInstallmentMonths=e.installments.reduce((n,r)=>Math.max(n,r.maxMonths),0),e.coupons=Bo(t),d.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){d.error(T.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},No=t=>{const e=[],n=L.pointDetail;try{const r=t.querySelector(n.container);if(r){const o=r.querySelector(n.totalPoint);if(o?.textContent){const c=w(o.textContent);c&&(e.push({amount:c,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),d.debug("최대 적립 포인트",{amount:c}))}const i=r.querySelector(n.elevenPaySection);if(i){const c=i.querySelector(".total .value");if(c?.textContent){const l=w(c.textContent);l&&!e.find(u=>u.amount===l&&u.type==="최대적립포인트")&&(e.push({amount:l,type:"11pay포인트",description:"11pay 결제 시 적립"}),d.debug("11pay 포인트 총액",{amount:l}))}i.querySelectorAll(".desc li").forEach(l=>{const u=l.querySelector(".c_layer_expand button.c_product_btn"),f=l.querySelector(".value");if(u&&f){const p=u.textContent?.trim()||"",x=w(f.textContent||"");x&&p&&!p.includes("카드")&&(e.push({amount:x,type:p,description:p}),d.debug("포인트 항목",{type:p,amount:x}))}})}}if(e.length===0){const o=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(o?.textContent){const i=w(o.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),d.debug("기본 포인트",{amount:i}))}}}catch(r){d.error(T.PAR_E003,"포인트 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},Io=t=>{const e=[],n=L.cardDiscount;try{const r=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let o=null;for(const c of r)if(o=t.querySelector(c),o){d.debug("카드 혜택 컨테이너 찾음",{selector:c});break}if(d.debug("other_benefits 컨테이너",{found:!!o}),o){const c=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let s=null;for(const l of c)if(s=o.querySelectorAll(l),s.length>0){d.debug("benefit 블록 찾음",{selector:l,count:s.length});break}if(d.debug("benefit 블록 수",{count:s?.length||0}),!s||s.length===0){const l=o.querySelector("dl");if(d.debug("dl 요소",{found:!!l}),l){const u=l.children;d.debug("dl children",{count:u.length})}}s&&s.length>0&&s.forEach(l=>{const f=l.querySelector("dt")?.textContent?.trim()||"";if(d.debug("메인 타이틀",{mainTitle:f}),!f)return;const p=Ro(f);p&&p.benefitAmount>0&&(e.push(p),d.debug("메인 혜택 추가",{mainParsed:p}));const x=l.querySelector("dd");if(x){const g=x.querySelectorAll(".tit_sub");d.debug("서브타이틀 수",{count:g.length}),g.forEach(h=>{const y=h.textContent?.trim()||"";if(d.debug("서브타이틀",{subTitle:y}),y.includes("안내사항")||y.includes("적립제외"))return;let C=h.nextElementSibling;for(;C&&C.tagName!=="UL"&&C.tagName!=="SPAN";)C=C.nextElementSibling;if(C&&C.tagName==="UL"){const v=C.querySelectorAll("li");d.debug("리스트 아이템 수",{count:v.length}),v.forEach(O=>{const q=O.textContent?.trim()||"";d.debug("아이템",{itemText:q});const A=Do(y,q);A&&(e.find(K=>K.cardName===A.cardName&&K.benefitType===A.benefitType&&K.benefitAmount===A.benefitAmount)||(e.push(A),d.debug("서브 혜택 추가",{subBenefit:A})))})}})}})}else d.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(s=>{const l=s.textContent?.trim()||"";if(l.includes("카드")||l.includes("신한")){const f=s.closest("li")?.querySelector(".value")?.textContent?.trim()||"",p=w(f);if(p){const x=l.replace(" 결제 시","").trim();e.find(g=>g.cardName===x&&g.benefitType==="포인트")||e.push({cardName:x,benefitAmount:p,benefitType:"포인트",condition:"결제 시"})}}}),d.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(r){d.error(T.PAR_E003,"카드 혜택 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function Ro(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const l of e){const u=t.match(l);if(u){n=u[1];break}}if(!n)return null;let r=0,o="",i="";const c=t.match(/최대\s*(\d+)%\s*적립/);c&&(r=parseInt(c[1],10),o="적립",i="결제 시");const s=t.match(/([\d,]+)원\s*할인/);return s&&(r=w(s[1])||0,o="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:r,benefitType:o||(t.includes("할인")?"할인":"적립"),condition:i}}function Do(t,e){if(!e)return null;let n="",r=0,o="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const c=e.match(/([\d,]+)원\s*할인/);c&&(r=w(c[1])||0,o="할인");const s=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return s&&!o&&(r=parseFloat(s[1]),o="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!r||!o?null:{cardName:n,benefitAmount:r,benefitType:o,condition:i}}const Oo=t=>{const e=[],n=L.installment;try{const r=t.querySelector(n.dialogContainer);if(r&&(r.querySelectorAll(".card_box").forEach(i=>{const s=i.querySelector("dt")?.textContent?.trim()||"";if(!s)return;i.querySelectorAll("dd").forEach(u=>{const f=u.textContent?.trim()||"";if(!f)return;const p=Mo(s,f);p&&e.push(p)})}),d.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const o=t.querySelector(n.triggerButton);if(o){const s=(o.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);s&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"})}Lo(t).forEach(c=>{e.find(s=>s.cardName===c.cardName)||e.push(c)})}d.info("총 무이자 할부 카드",{count:e.length})}catch(r){d.error(T.PAR_E003,"무이자 할부 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function Mo(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const r=n[1],i=r.split(",").map(f=>parseInt(f.trim(),10)).filter(f=>!isNaN(f)),c=i.length>0?Math.max(...i):0;if(c===0)return null;let s=null;const l=e.match(/(\d+)만원/);l&&(s=parseInt(l[1],10)*1e4);let u="";return e.includes("11pay")?u="11pay 결제 시":e.includes("카카오페이")?u="카카오페이 결제 시":s&&(u=`${s/1e4}만원 이상`),{cardName:t,maxMonths:c,minAmount:s,months:`${r}개월`,condition:u}}function Lo(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(o=>{const i=o.textContent||"",c=i.match(/최대\s*(\d+)\s*개월\s*무이자/);c&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"}),n.forEach(s=>{if(i.includes(s)){const u=i.substring(i.indexOf(s)).match(/([\d,]+)개월/);if(u&&!e.find(p=>p.cardName.includes(s))){const p=u[1],x=p.split(",").map(h=>parseInt(h.trim(),10)),g=Math.max(...x.filter(h=>!isNaN(h)));e.push({cardName:`${s}카드`,maxMonths:g,minAmount:null,months:`${p}개월`,condition:""})}}})}),e}const Bo=t=>{const e=[],n=L.coupon;try{const r=t.querySelector(n.badge);if(r?.textContent){const i=r.textContent.trim(),c=Uo(i);c&&(e.push(c),d.debug("쿠폰 추출",{coupon:c}))}t.querySelectorAll(n.item).forEach(i=>{const c=i.querySelector(n.name),s=i.querySelector(n.discount);if(c||s){const l=c?.textContent?.trim()||"쿠폰",u=s?.textContent||"",f=u.includes("원")?w(u):null,p=u.includes("%")?w(u):null;e.push({name:l,discountAmount:f,discountRate:p})}})}catch(r){d.error(T.PAR_E003,"쿠폰 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function Uo(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:w(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}const zo=t=>{try{const e=[],n=t.querySelectorAll(".c_product_option .option_selected");if(n.length===0)return d.debug("[11st] No .option_selected divs found"),[];for(const r of n)try{const o=r.querySelector("dl.option");if(!o)continue;const i=o.querySelector("dt"),c=o.querySelector("dd");if(!i||!c)continue;const s=i.textContent?.trim(),l=c.textContent?.trim();if(!s||!l)continue;const u=s.replace(/\s+/g," ").trim(),f=l.replace(/\s+/g," ").trim();e.push({name:u,value:f}),d.debug("✅ [11st] Found option",{name:u,value:f})}catch(o){d.debug("[11st] Error parsing option element",{error:o});continue}return d.info("✅ [11st] Extracted selected options",{count:e.length,options:e.map(r=>`${r.name}: ${r.value}`).join(", "),isEmpty:e.length===0?"⚠️ NO OPTIONS FOUND":"OK"}),e}catch(e){return d.error(T.PAR_E001,"Error extracting selected options",{error:e instanceof Error?e:new Error(String(e))}),[]}};function xn(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:r,name:o}of n)for(const i of r)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${o} (신용)`:e.includes("체크카드")?`${o} (체크)`:o;return e||t}function $o(t,e){const n=t.map(r=>{const o=xn(r.cardName),i=r.benefitType==="할인",c=r.benefitAmount<=100?r.benefitAmount:0;let s="";return i?s=`${r.benefitAmount.toLocaleString()}원 할인`:r.benefitAmount<=100?s=`${r.benefitAmount}% 적립`:s=`${r.benefitAmount.toLocaleString()}P 적립`,{card:o,cardName:o,benefit:s,discount:i?r.benefitAmount:0,rate:c,condition:r.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(r=>{if(r.cardName==="__INSTALLMENT_SUMMARY__")return;const o=xn(r.cardName);n.push({card:o,cardName:o,benefit:`${r.months} 무이자`,discount:0,rate:0,condition:r.condition,benefitType:"installment",pointAmount:0})}),n}class Ln extends Te{siteName=St.siteName;selectors={amount:[L.price.salePrice,L.price.salePriceAlt,L.price.maxDiscountPrice],title:[L.product.title,L.product.titleAlt],image:[L.image.main,L.image.mainAlt]};static isProductPage(e){if(!/11st\.co\.kr/.test(e))return!1;const o=![/11st\.co\.kr\/?$/,/11st\.co\.kr\/category/,/11st\.co\.kr\/search/,/11st\.co\.kr\/browsing/,/11st\.co\.kr\/best/,/11st\.co\.kr\/event$/,/11st\.co\.kr\/cart/,/11st\.co\.kr\/order/,/11st\.co\.kr\/my11st/,/11st\.co\.kr\/login/,/11st\.co\.kr\/member/].some(i=>i.test(e));return d.debug(`isProductPage("${e}") = ${o}`),o}static extractProductId(e){return So(e)}parse(e){try{d.info("🔍 Parsing 11번가 page...");const n=_o(e),r=Co(e),o=Mn(e),i=Ao(e),c=To(e),s=vo(e);let l=s.amount;const{originalPrice:u,discountPrice:f,maxDiscountPrice:p,discountRate:x,maxDiscountRate:g}=s;if(l||(l=wo(e)),!l)return d.debug("❌ No price found"),null;const h=Po(e),y=ko(e),{points:C,cardBenefits:v,installments:O,coupons:q,totalPointAmount:A,totalCardBenefitAmount:X,maxInstallmentMonths:K}=y,ue=$o(v,O),ve=zo(e),we=[];return x&&we.push({rate:x,type:"SALE_DISCOUNT",description:"할인가"}),h.forEach(Pe=>{we.push({rate:Pe.amount,type:Pe.type.toUpperCase().replace(/\s+/g,"_"),description:Pe.type})}),d.info(`✅ Found: ${l.toLocaleString()} ${St.currency}`),d.debug("파싱 결과",{title:n,totalPointAmount:A,cardBenefitsCount:v.length,installmentsCount:O.length,maxInstallmentMonths:K,selectedOptionsCount:ve.length}),{price:l,amount:l,currency:St.currency,title:n?`${n}${r?` ${r}`:""}`:void 0,imageUrl:o||void 0,images:i,originalPrice:u||void 0,discountPrice:f||p||void 0,discountRate:x||void 0,cardBenefits:ue,selectedOptions:ve.length>0?ve:void 0,discounts:we,elevenst:{maxDiscountPrice:p,maxDiscountRate:g,maxInstallmentMonths:K,points:C,installments:O,coupons:q,totalPointAmount:A,totalCardBenefitAmount:X,seller:c.seller,sellerRating:c.rating,discountDetails:h}}}catch(n){return d.error(T.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const z={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},qo=t=>{const e=t.querySelector(z.product.title);if(e?.textContent){const n=e.textContent.trim();return d.debug("상품명",{title:n}),n}return d.warn("상품명을 찾을 수 없음"),null},Fo=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const r of e){const i=r.src;if(i.includes("/still/600"))return d.debug("메인 이미지 (600px)",{src:i}),i}for(const r of e){const i=r.src;if(i.includes("/still/"))return d.debug("메인 이미지",{src:i}),i}const n=t.querySelector(z.product.mainImage);return n?.src?(d.debug("대체 이미지",{src:n.src}),n.src):(d.warn("상품 이미지를 찾을 수 없음"),null)},Wo=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(r=>{let i=r.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),d.debug("총 이미지",{count:e.length}),e},Ho=t=>{const e={},n=t.querySelector(z.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const r=t.querySelector(z.seller.official);e.isOfficial=!!r;const o=t.querySelector(z.seller.seller);return o?.textContent&&(e.seller=o.textContent.trim()),e},Je=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return w(e)},Go=t=>{const e=z.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const o=Je(n.textContent);if(o)return d.debug("결제할인가",{price:o}),o}const r=t.querySelector(e.discountPriceAlt);if(r?.textContent){const o=Je(r.textContent);if(o)return d.debug("결제할인가 (alt)",{price:o}),o}return null},Ko=t=>{const e=z.price,n=t.querySelector(e.salePrice);if(n?.textContent){const r=Je(n.textContent);if(r)return d.debug("판매가",{price:r}),r}return null},jo=t=>{const e=z.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const r=Je(n.textContent);if(r)return d.debug("정가",{price:r}),r}return null},Vo=t=>{const e=z.price,n=t.querySelector(e.discountRate);if(n?.textContent){const r=n.textContent.match(/(\d+)\s*%/);if(r){const o=parseInt(r[1],10);return d.debug("할인율",{rate:o}),o}}return null},Yo=t=>{d.debug("가격 정보 추출 시작...");const e=jo(t),n=Ko(t),r=Go(t),o=Vo(t),i=r||n||e;return d.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}),{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}},Xo=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const r=n.textContent||"";if(r.includes("원")){const o=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(o){const i=w(o[1]);if(i&&i>=1e3)return d.debug("DOM 스캔 가격",{price:i}),i}}}return null},Zo=t=>{const e=[],n=z.cardBenefit,r=t.querySelector(n.container);return r?(r.querySelectorAll(".gmarketcard_area img").forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(s){let u=l;u||(s.includes("smile")||s.includes("Smile")?u="스마일카드":s.includes("samsung")?u="삼성카드":u="G마켓 제휴카드"),e.push({card:u,cardName:u,benefit:"G마켓 제휴카드 혜택",imageUrl:s}),d.debug("제휴카드",{cardName:u,src:s})}}),e):(d.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},Jo=t=>{const e=[],n=z.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(o=>{const i=o.querySelector(n.discountItemTitle),c=o.querySelector(n.discountItemDesc),s=o.querySelector(n.discountItemPrice),l=i?.textContent?.trim()||"",u=c?.textContent?.trim()||"";let f;if(s?.textContent){const p=s.textContent.match(/(\d{1,3}(?:,\d{3})*)/);p&&(f=parseInt(p[1].replace(/,/g,""),10))}l&&(e.push({title:l,description:u,discountPrice:f}),d.debug("결제 할인",{title:l,description:u}))}),e},Qo=t=>{d.debug("카드 혜택 추출 시작...");const e=[],n=Zo(t);e.push(...n),Jo(t).forEach(i=>{const c=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(c){const s=c[1].includes("카드")?c[1]:`${c[1]}카드`,l=i.title.match(/(\d+(?:\.\d+)?)\s*%/),u=l?parseFloat(l[1]):void 0;e.some(f=>f.cardName===s)||e.push({card:s,cardName:s,benefit:i.title,discount:u,rate:u})}});const o=t.querySelector(".box__payment-discount");if(o){const c=(o.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(c){const s=parseInt(c[1],10);e.some(l=>l.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${s}% 할인`,discount:s,rate:s})}}return e.sort((i,c)=>(c.discount??0)-(i.discount??0)),d.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},ei=t=>{const e=z.additionalBenefits,r=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!r)return null;let o="etc";r.includes("신세계포인트")?o="shinsegae_point":r.includes("스마일페이")?o="smile_pay":r.includes("스마일캐시")?o="smile_cash":r.includes("OK캐쉬백")&&(o="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(s=>{const l=s.querySelector(e.benefitLabel),u=s.querySelector(e.benefitValue),f=l?.textContent?.trim()||"",p=u?.textContent?.trim()||"";f&&p&&i.push({label:f,value:p})}),d.debug("추가 혜택",{type:o,title:r}),{type:o,title:r,details:i}},Bn=t=>{d.debug("추가 혜택 추출 시작...");const e=[],n=z.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(o=>{const i=ei(o);i&&e.push(i)}),d.debug("총 추가 혜택",{count:e.length}),e},ti=t=>{const e=Bn(t);for(const n of e)for(const r of n.details){const o=r.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(o)return{amount:parseInt(o[1].replace(/,/g,""),10),description:`${n.title}: ${r.value}`}}return null},ni=t=>{const e=z.shipping,r=!!t.querySelector(e.starDelivery),o=t.querySelector(e.shippingInfo),i=r?"스타배송":"일반배송";let c,s,l=!1;if(o){const u=o.textContent||"",f=u.match(/(\d{1,3}(?:,\d{3})*)\s*원/);f?c=`${f[1]}원`:u.includes("무료")&&(c="무료배송",l=!0);const p=u.match(/(\d+\/\d+|\d+일)/);p&&(s=p[1])}return d.debug("배송 정보",{method:i,isStarDelivery:r,fee:c}),{method:i,isStarDelivery:r,isFree:l,fee:c,estimatedDate:s}},ri=t=>{try{const e=[],n=t.querySelector(".select-item_option .item_tit");if(!n)return d.debug("[Gmarket] No selected item title found"),[];const r=n.textContent?.trim()||"";if(!r)return[];d.debug("[Gmarket] Product title",{title:r.substring(0,100)});const o=r.match(/\(([^)]+)\)/);if(o){const u=o[1].trim();e.push({name:"CPU / GPU",value:u}),d.debug("[Gmarket] Found CPU/GPU",{value:u})}const i=r.match(/RAM\s+(\d+GB)/i);if(i){const u=i[1].trim();e.push({name:"RAM",value:u}),d.debug("[Gmarket] Found RAM",{value:u})}const c=r.match(/SSD\s+(\d+(?:GB|TB))/i);if(c){const u=c[1].trim();e.push({name:"SSD",value:u}),d.debug("[Gmarket] Found SSD",{value:u})}const l=(r.split(/SSD\s+\d+(?:GB|TB)/i)[1]||"").split(/\s+/).filter(u=>{const f=/^[가-힣]+$/.test(u),p=u.length>=2;return f&&p});if(l.length>0){const u=l[0];e.push({name:"색상",value:u}),d.debug("[Gmarket] Found color",{value:u})}return d.info("✅ [Gmarket] Extracted selected options",{count:e.length,options:e.map(u=>`${u.name}: ${u.value}`).join(", "),isEmpty:e.length===0?"⚠️ NO OPTIONS FOUND":"OK"}),e}catch(e){return d.error(T.PAR_E001,"Error extracting selected options",{error:e instanceof Error?e:new Error(String(e))}),[]}};class Un extends Te{siteName="Gmarket";selectors={amount:[z.price.discountPrice,z.price.salePrice,z.price.originalPrice]};static isCheckoutPage(e){if(!/gmarket\.co\.kr/.test(e))return!1;const o=![/gmarket\.co\.kr\/?$/,/gmarket\.co\.kr\/n\/category/,/gmarket\.co\.kr\/n\/search/,/gmarket\.co\.kr\/n\/best$/,/gmarket\.co\.kr\/n\/deals$/,/gmarket\.co\.kr\/n\/event$/,/gmarket\.co\.kr\/cart/,/gmarket\.co\.kr\/order/,/gmarket\.co\.kr\/my/,/gmarket\.co\.kr\/login/,/gmarket\.co\.kr\/join/].some(i=>i.test(e));return ae.debug("isCheckoutPage check",{url:e,isCheckout:o}),o}parse(e){try{ae.info("Parsing Gmarket page...");const n=qo(e),r=Fo(e),o=Wo(e),i=Ho(e),c=Yo(e);let s=c.amount;if(s||(s=Xo(e)),!s)return ae.warn("No price found in Gmarket page"),null;const l=Qo(e),u=Rn(l,s),f=Dn(u),p=Bn(e),x=ti(e),g=ni(e),h=ri(e);return ae.info("Parse successful",{amount:s,cardCount:f.length,selectedOptionsCount:h.length}),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:[],originalPrice:c.originalPrice||void 0,discountPrice:c.discountPrice||void 0,cardBenefits:f,additionalBenefits:p.length>0?p:void 0,cashback:x||void 0,shippingInfo:g||void 0,sellerInfo:i||void 0,selectedOptions:h.length>0?h:void 0,discounts:[]}}catch(n){return ae.error(T.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const oi={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class zn extends Te{siteName="Amazon";selectors={amount:oi.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{d.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const ii={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class $n extends Te{siteName="eBay";selectors={amount:ii.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{d.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(d.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return d.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return d.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const si={amount:[]};class qn extends Te{siteName="Fallback";selectors={amount:si.amount};parse(e){try{d.info("🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return d.debug('❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return d.debug("❌ Invalid amount",{amount:o}),null;const{title:i,imageUrl:c}=this.extractCommonInfo(e);return d.info(`✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return d.error(T.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function ci(t){return On.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:Ln.isProductPage(t)?{site:"11st",isCheckout:!0}:Un.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:zn.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:$n.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function ai(t){switch(t){case"coupang":return new On;case"11st":return new Ln;case"gmarket":return new Un;case"amazon":return new zn;case"ebay":return new $n;default:return new qn}}function li(){return new qn}function Fn(){const t=window.location.href,e=ci(t);if(!e)return k.debug(N.PARSER,"Not a supported page",{url:t}),null;k.info(N.PARSER,`Site detected: ${e.site}`,{url:t});let r=ai(e.site).parse(document);return!r&&(k.warn(N.PARSER,"Primary parser failed, trying fallback",{site:e.site}),r=li().parse(document),!r)?(k.error(N.PARSER,T.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(k.info(N.PARSER,"Parse successful",{title:r.title?.substring(0,50),amount:r.amount,cardBenefitsCount:r.cardBenefits?.length??0}),{paymentInfo:r,site:e.site})}function Wn(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";if(!chrome?.runtime?.sendMessage){gt.warn("Chrome extension API not available",{messageType:n,source:e});return}chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},r=>{if(chrome.runtime.lastError){gt.warn("Failed to send message to background",{error:chrome.runtime.lastError.message,messageType:n,source:e});return}r?.success&&gt.debug("Product data saved",{source:e,messageType:n})})}function Hn(t,e){let n=null;const r=(...o)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...o),n=null},e)};return r.cancel=()=>{n&&(clearTimeout(n),n=null)},r}const ui=500;function di(t){let e=!1,n=null,r=!1;const o=Hn(s=>{r||(re.info("Dynamic content detected",{reason:s}),t(`dynamic-${s}`)||re.warn("Dynamic reparse produced no result"))},ui),i=s=>{if(r)return;const l=s.some(g=>Array.from(g.addedNodes).some(h=>h instanceof Element?h.tagName==="IFRAME"||!!h.querySelector("iframe"):!1)),u=!e&&s.some(g=>Array.from(g.addedNodes).some(h=>h instanceof Element?h.classList.contains("benefit")||!!h.querySelector(".benefit")||h.closest(".other_benefits")&&(h.querySelector("dt")||h.querySelector("dd")):!1)),f=document.querySelector(".other_benefits .benefit dt");if(!(u&&f||l))return;u&&(e=!0),o(l?"iframe":"benefit-content"),l&&(c(),re.debug("Observer disconnected after iframe detection"))},c=()=>{r||(r=!0,n&&(n.disconnect(),n=null),re.debug("DynamicContentObserver cleaned up"))};return document.body?(n=new MutationObserver(i),n.observe(document.body,{childList:!0,subtree:!0}),c):(re.warn("document.body not available, observer not started"),c)}const pi=500,fi=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],mi=()=>!!document.querySelector(".other_benefits .benefit dt");function gi(t){if(!window.location.hostname.includes("11st.co.kr"))return()=>{};re.info("Setting up 11번가 benefit watcher");let e=!1,n=null,r=null;const o=new Map,i=Hn(u=>{e||mi()&&(re.info("Benefit content found",{source:u}),t(u))},pi),c=new WeakSet,s=()=>{e||fi.forEach(u=>{document.querySelectorAll(u).forEach(p=>{if(c.has(p))return;c.add(p);const x=()=>{re.debug("Benefit button clicked"),setTimeout(()=>i("benefit-click"),800)};o.set(p,x),p.addEventListener("click",x)})})};s(),r=new MutationObserver(()=>{s()}),document.body&&r.observe(document.body,{childList:!0,subtree:!0}),n=setTimeout(()=>{r&&!e&&(r.disconnect(),r=null,re.debug("Benefit button observer disconnected (timeout)"))},5e3);const l=()=>{e||(e=!0,n&&(clearTimeout(n),n=null),r&&(r.disconnect(),r=null),o.forEach((u,f)=>{f.removeEventListener("click",u)}),o.clear(),re.debug("ElevenStreetBenefitWatcher cleaned up"))};return window.addEventListener("beforeunload",l,{once:!0}),l}async function Gn(t){const{productUrl:e,productName:n,currentPrice:r,site:o,selectedOptions:i,onComplete:c}=t;try{if(k.info(N.NETWORK,"💰 [LOWEST_PRICE] Initiating price comparison",{url:e,product:n,currentPrice:r,site:o,selectedOptionsCount:i?.length??0,timestamp:new Date().toISOString()}),m.comparison={status:"loading",query:n,error:null,data:null},Y(),!chrome?.runtime?.sendMessage){k.error(N.NETWORK,T.NET_E002,"Chrome extension API not available",{}),m.comparison={status:"error",query:n,error:"Chrome extension API를 사용할 수 없습니다.",data:null},Y();return}k.debug(N.NETWORK,"[LOWEST_PRICE] Checking server health...");const s=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!s?.success){k.error(N.NETWORK,T.NET_E002,"[LOWEST_PRICE] Server not available",{error:s?.error||"Server check failed"}),m.comparison={status:"error",query:n,error:s?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null},Y();return}k.info(N.NETWORK,"[LOWEST_PRICE] Server healthy, sending comparison request");const l=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:n,currentPrice:r,currentUrl:e,selectedOptions:i});l?.success?(k.info(N.NETWORK,"✅ [LOWEST_PRICE] Price comparison completed",{resultCount:l.data?.results?.length||0,fromCache:l.data?.fromCache,totalDuration:l.data?.totalDuration}),m.comparison={status:"success",query:n,error:null,data:{...l.data,current_price:r}},Y(),c?.()):(k.warn(N.NETWORK,"[LOWEST_PRICE] Price comparison failed",{error:l?.error}),m.comparison={status:"error",query:n,error:l?.error||"가격 비교 검색 실패",data:null},Y(),c?.())}catch(s){k.error(N.NETWORK,T.NET_E002,"[LOWEST_PRICE] Request error",{error:s instanceof Error?s:new Error(String(s))}),m.comparison={status:"error",query:n,error:s instanceof Error?s.message:"알 수 없는 오류",data:null},Y()}}async function Kn(t,e=1500,n=!1){const r=t.persist;r&&(r.hasHydrated?.()&&!n||await new Promise(o=>{let i=!1;const c=window.setTimeout(()=>{i||(i=!0,o())},e),s=r.onFinishHydration?.(()=>{i||(i=!0,window.clearTimeout(c),s&&s(),o())});try{r.rehydrate?.()}catch{}}))}const hi=window.self===window.top;let En=!1,V=null;const Qe=[];function Ae(t,e){return{...t,site:e}}function yn(t){const e=Fn();return e?(V=e,ze(Ae(e.paymentInfo,e.site)),Wn(e.paymentInfo,t),!0):!1}function bi(){if(window.location.hostname==="picsel.kr"||window.location.hostname==="www.picsel.kr"){k.debug(N.BOOTSTRAP,"Skipping PicSel own domain");return}const t=Fn();if(!t){k.debug(N.BOOTSTRAP,"No product found on this page");return}V=t,Nn(Ae(t.paymentInfo,t.site)),Wn(t.paymentInfo,"initial"),(async()=>{await Kn(oe);const e=oe.getState();if(ze(Ae(t.paymentInfo,t.site)),k.info(N.BOOTSTRAP,"⚙️ Display mode check",{displayMode:e.displayMode,autoFetchLowestPrice:e.autoFetchLowestPrice,hasTitle:!!t.paymentInfo.title}),e.displayMode==="lowest-price"){if(!t.paymentInfo.title){k.warn(N.BOOTSTRAP,"⚠️ [LOWEST_PRICE] Cannot fetch: no product title");return}if(e.autoFetchLowestPrice){k.info(N.BOOTSTRAP,"🚀 [LOWEST_PRICE] Auto fetch enabled",{displayMode:e.displayMode,productTitle:t.paymentInfo.title.substring(0,50)});const{updateIdleLoadingIndicator:n}=await _n(async()=>{const{updateIdleLoadingIndicator:r}=await Promise.resolve().then(()=>Pn);return{updateIdleLoadingIndicator:r}},void 0,import.meta.url);n(),Gn({productUrl:window.location.href,productName:t.paymentInfo.title,currentPrice:t.paymentInfo.amount,site:t.site,selectedOptions:t.paymentInfo.selectedOptions,onComplete:()=>{Se(!0),ze(Ae(t.paymentInfo,t.site))}})}else k.info(N.BOOTSTRAP,"⏸️ [LOWEST_PRICE] Manual mode (will fetch when panel opens)",{displayMode:e.displayMode})}else k.debug(N.BOOTSTRAP,"💳 Card benefits mode selected")})()}function xi(){Qe.forEach(t=>{try{t()}catch(e){k.warn(N.BOOTSTRAP,"Cleanup error",{error:e})}}),Qe.length=0}function Ei(){if(!hi||En)return;En=!0,k.info(N.BOOTSTRAP,"Content script starting"),bi(),chrome?.storage?.onChanged&&chrome.storage.onChanged.addListener((n,r)=>{r==="local"&&(!n||!Object.prototype.hasOwnProperty.call(n,sr.SETTINGS)||(async()=>{await Kn(oe,1500,!0);const o=oe.getState();if(V&&ze(Ae(V.paymentInfo,V.site)),o.displayMode==="lowest-price"&&o.autoFetchLowestPrice&&V?.paymentInfo?.title){const{updateIdleLoadingIndicator:i}=await _n(async()=>{const{updateIdleLoadingIndicator:c}=await Promise.resolve().then(()=>Pn);return{updateIdleLoadingIndicator:c}},void 0,import.meta.url);i(),Gn({productUrl:window.location.href,productName:V.paymentInfo.title,currentPrice:V.paymentInfo.amount,site:V.site,selectedOptions:V.paymentInfo.selectedOptions,onComplete:()=>{Se(!0),V&&ze(Ae(V.paymentInfo,V.site))}})}})())});const t=di(n=>yn(n));Qe.push(t);const e=gi(n=>{yn(n)});Qe.push(e),window.addEventListener("beforeunload",xi,{once:!0})}const yi=()=>{window.addEventListener("message",t=>{if(["https://picsel.kr","https://www.picsel.kr","http://localhost:3000"].includes(t.origin)&&t.data?.type==="EXTENSION_AUTH_TOKEN"){const{accessToken:n,refreshToken:r,expiresIn:o}=t.data;chrome.runtime.sendMessage({type:"EXTENSION_AUTH_TOKEN",accessToken:n,refreshToken:r,expiresIn:o},i=>{chrome.runtime.lastError?console.warn("[Content] Failed to send auth token:",chrome.runtime.lastError):i?.success&&(console.warn("[Content] Auth token sent successfully"),t.source?.postMessage({type:"EXTENSION_AUTH_SAVED",success:!0},t.origin))})}})};lr(Ei);yi();
