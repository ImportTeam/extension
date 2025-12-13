import{b as Yn,p as se,E as T,a as f,l as k,L as R,n as at,d as te}from"./assets/index-CtnQ7lw9.js";import{u as de}from"./assets/store-SF67hG8t.js";import{S as Vn}from"./assets/chromeStorage-BOBytA-p.js";import{C as Xn}from"./assets/constants-DOucEiR9.js";const Zn=window.self===window.top;function Jn(t){if(!Zn){Yn.debug("Skipping iframe context");return}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}const Vt="picsel-toggle-host",lt="picsel-toggle-panel",Qn={coupang:"쿠팡",amazon:"아마존",ebay:"이베이",gmarket:"G마켓","11st":"11번가",naver:"네이버쇼핑",tmon:"티몬",wemakeprice:"위메프"},er=t=>{if(!t)return"PicSel";const e=String(t).toLowerCase();return Qn[e]||String(t)},m={hostElement:null,shadowRoot:null,toggleButton:null,buttonLabelEl:null,buttonBadgeEl:null,panelEl:null,closeButtonEl:null,contentEl:null,panelTitleEl:null,mounted:!1,cachedData:null,comparison:{status:"idle",query:null,error:null,data:null}},pe=(t,e="KRW")=>{if(typeof t!="number"||!Number.isFinite(t))return null;const n=e||"KRW",r=new Set(["KRW","JPY"]),o={style:"currency",currency:n};let i=t;r.has(n)&&(o.minimumFractionDigits=0,o.maximumFractionDigits=0,i=Math.round(t));const c=n==="KRW"?"ko-KR":"en-US";return new Intl.NumberFormat(c,o).format(i)},tr=(t,e)=>typeof t!="number"||typeof e!="number"||t<=0||e>=t?null:Math.round((t-e)/t*100),nr=t=>{const e=document.createElement("div");e.className="picsel-product";const n=document.createElement("div");n.className="picsel-product-thumb";const r=t.imageUrl||Array.isArray(t.images)&&t.images[0]||null;if(r){const p=document.createElement("img");p.src=r,p.alt=t.title?`${t.title} 이미지`:"상품 이미지",n.appendChild(p)}else{const p=document.createElement("span");p.textContent="No Image",p.style.fontSize="11px",p.style.color="#64748b",n.appendChild(p)}const o=document.createElement("div");o.className="picsel-product-info";const i=document.createElement("h3");i.className="picsel-product-title",i.textContent=t.title||"상품 정보를 찾을 수 없어요.";const c=document.createElement("div");c.className="picsel-price";const s=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,l=pe(s,t.currency??"KRW");if(l){const p=document.createElement("div");p.className="picsel-final-price",p.textContent=l,c.appendChild(p)}const d=pe(t.originalPrice,t.currency??"KRW"),u=tr(t.originalPrice,s);if(d&&u){const p=document.createElement("div");p.className="picsel-original-price",p.textContent=d;const x=document.createElement("div");x.className="picsel-discount-tag",x.textContent=`-${u}%`,c.appendChild(p),c.appendChild(x)}if(o.appendChild(i),o.appendChild(c),t.shippingInfo){const p=document.createElement("div");p.className="picsel-shipping",p.textContent=`배송: ${t.shippingInfo}`,o.appendChild(p)}return e.appendChild(n),e.appendChild(o),e};const{entries:fn,setPrototypeOf:Xt,isFrozen:rr,getPrototypeOf:or,getOwnPropertyDescriptor:ir}=Object;let{freeze:$,seal:j,create:bt}=Object,{apply:Et,construct:yt}=typeof Reflect<"u"&&Reflect;$||($=function(e){return e});j||(j=function(e){return e});Et||(Et=function(e,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return e.apply(n,o)});yt||(yt=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new e(...r)});const ze=W(Array.prototype.forEach),sr=W(Array.prototype.lastIndexOf),Zt=W(Array.prototype.pop),we=W(Array.prototype.push),cr=W(Array.prototype.splice),qe=W(String.prototype.toLowerCase),ut=W(String.prototype.toString),dt=W(String.prototype.match),ve=W(String.prototype.replace),ar=W(String.prototype.indexOf),lr=W(String.prototype.trim),V=W(Object.prototype.hasOwnProperty),q=W(RegExp.prototype.test),Pe=ur(TypeError);function W(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Et(t,e,r)}}function ur(t){return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return yt(t,n)}}function C(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:qe;Xt&&Xt(t,null);let r=e.length;for(;r--;){let o=e[r];if(typeof o=="string"){const i=n(o);i!==o&&(rr(e)||(e[r]=i),o=i)}t[o]=!0}return t}function dr(t){for(let e=0;e<t.length;e++)V(t,e)||(t[e]=null);return t}function Q(t){const e=bt(null);for(const[n,r]of fn(t))V(t,n)&&(Array.isArray(r)?e[n]=dr(r):r&&typeof r=="object"&&r.constructor===Object?e[n]=Q(r):e[n]=r);return e}function Ne(t,e){for(;t!==null;){const r=ir(t,e);if(r){if(r.get)return W(r.get);if(typeof r.value=="function")return W(r.value)}t=or(t)}function n(){return null}return n}const Jt=$(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),pt=$(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ft=$(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pr=$(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mt=$(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fr=$(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Qt=$(["#text"]),en=$(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),gt=$(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),tn=$(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Fe=$(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),mr=j(/\{\{[\w\W]*|[\w\W]*\}\}/gm),gr=j(/<%[\w\W]*|[\w\W]*%>/gm),hr=j(/\$\{[\w\W]*/gm),xr=j(/^data-[\-\w.\u00B7-\uFFFF]+$/),br=j(/^aria-[\-\w]+$/),mn=j(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Er=j(/^(?:\w+script|data):/i),yr=j(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gn=j(/^html$/i),_r=j(/^[a-z][.\w]*(-[.\w]+)+$/i);var nn=Object.freeze({__proto__:null,ARIA_ATTR:br,ATTR_WHITESPACE:yr,CUSTOM_ELEMENT:_r,DATA_ATTR:xr,DOCTYPE_NAME:gn,ERB_EXPR:gr,IS_ALLOWED_URI:mn,IS_SCRIPT_OR_DATA:Er,MUSTACHE_EXPR:mr,TMPLIT_EXPR:hr});const ke={element:1,text:3,progressingInstruction:7,comment:8,document:9},Cr=function(){return typeof window>"u"?null:window},Sr=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const i="dompurify"+(r?"#"+r:"");try{return e.createPolicy(i,{createHTML(c){return c},createScriptURL(c){return c}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},rn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Cr();const e=y=>hn(y);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==ke.document||!t.Element)return e.isSupported=!1,e;let{document:n}=t;const r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:c,Node:s,Element:l,NodeFilter:d,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:x,trustedTypes:E}=t,h=l.prototype,_=Ne(h,"cloneNode"),S=Ne(h,"remove"),v=Ne(h,"nextSibling"),H=Ne(h,"childNodes"),K=Ne(h,"parentNode");if(typeof c=="function"){const y=n.createElement("template");y.content&&y.content.ownerDocument&&(n=y.content.ownerDocument)}let A,ce="";const{implementation:X,createNodeIterator:Ke,createDocumentFragment:_e,getElementsByTagName:Ce}=n,{importNode:Mn}=r;let F=rn();e.isSupported=typeof fn=="function"&&typeof K=="function"&&X&&X.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:je,ERB_EXPR:Ye,TMPLIT_EXPR:Ve,DATA_ATTR:Ln,ARIA_ATTR:Bn,IS_SCRIPT_OR_DATA:Un,ATTR_WHITESPACE:Tt,CUSTOM_ELEMENT:zn}=nn;let{IS_ALLOWED_URI:wt}=nn,O=null;const vt=C({},[...Jt,...pt,...ft,...mt,...Qt]);let L=null;const Pt=C({},[...en,...gt,...tn,...Fe]);let N=Object.seal(bt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Se=null,Xe=null;const fe=Object.seal(bt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Nt=!0,Ze=!0,kt=!1,Rt=!0,me=!1,Ie=!0,ae=!1,Je=!1,Qe=!1,ge=!1,De=!1,Oe=!1,It=!0,Dt=!1;const Fn="user-content-";let et=!0,Ae=!1,he={},Z=null;const tt=C({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ot=null;const Mt=C({},["audio","video","img","source","image","track"]);let nt=null;const Lt=C({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Me="http://www.w3.org/1998/Math/MathML",Le="http://www.w3.org/2000/svg",ne="http://www.w3.org/1999/xhtml";let xe=ne,rt=!1,ot=null;const qn=C({},[Me,Le,ne],ut);let Be=C({},["mi","mo","mn","ms","mtext"]),Ue=C({},["annotation-xml"]);const $n=C({},["title","style","font","a","script"]);let Te=null;const Wn=["application/xhtml+xml","text/html"],Hn="text/html";let D=null,be=null;const Gn=n.createElement("form"),Bt=function(a){return a instanceof RegExp||a instanceof Function},it=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(be&&be===a)){if((!a||typeof a!="object")&&(a={}),a=Q(a),Te=Wn.indexOf(a.PARSER_MEDIA_TYPE)===-1?Hn:a.PARSER_MEDIA_TYPE,D=Te==="application/xhtml+xml"?ut:qe,O=V(a,"ALLOWED_TAGS")?C({},a.ALLOWED_TAGS,D):vt,L=V(a,"ALLOWED_ATTR")?C({},a.ALLOWED_ATTR,D):Pt,ot=V(a,"ALLOWED_NAMESPACES")?C({},a.ALLOWED_NAMESPACES,ut):qn,nt=V(a,"ADD_URI_SAFE_ATTR")?C(Q(Lt),a.ADD_URI_SAFE_ATTR,D):Lt,Ot=V(a,"ADD_DATA_URI_TAGS")?C(Q(Mt),a.ADD_DATA_URI_TAGS,D):Mt,Z=V(a,"FORBID_CONTENTS")?C({},a.FORBID_CONTENTS,D):tt,Se=V(a,"FORBID_TAGS")?C({},a.FORBID_TAGS,D):Q({}),Xe=V(a,"FORBID_ATTR")?C({},a.FORBID_ATTR,D):Q({}),he=V(a,"USE_PROFILES")?a.USE_PROFILES:!1,Nt=a.ALLOW_ARIA_ATTR!==!1,Ze=a.ALLOW_DATA_ATTR!==!1,kt=a.ALLOW_UNKNOWN_PROTOCOLS||!1,Rt=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,me=a.SAFE_FOR_TEMPLATES||!1,Ie=a.SAFE_FOR_XML!==!1,ae=a.WHOLE_DOCUMENT||!1,ge=a.RETURN_DOM||!1,De=a.RETURN_DOM_FRAGMENT||!1,Oe=a.RETURN_TRUSTED_TYPE||!1,Qe=a.FORCE_BODY||!1,It=a.SANITIZE_DOM!==!1,Dt=a.SANITIZE_NAMED_PROPS||!1,et=a.KEEP_CONTENT!==!1,Ae=a.IN_PLACE||!1,wt=a.ALLOWED_URI_REGEXP||mn,xe=a.NAMESPACE||ne,Be=a.MATHML_TEXT_INTEGRATION_POINTS||Be,Ue=a.HTML_INTEGRATION_POINTS||Ue,N=a.CUSTOM_ELEMENT_HANDLING||{},a.CUSTOM_ELEMENT_HANDLING&&Bt(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(N.tagNameCheck=a.CUSTOM_ELEMENT_HANDLING.tagNameCheck),a.CUSTOM_ELEMENT_HANDLING&&Bt(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(N.attributeNameCheck=a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),a.CUSTOM_ELEMENT_HANDLING&&typeof a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(N.allowCustomizedBuiltInElements=a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),me&&(Ze=!1),De&&(ge=!0),he&&(O=C({},Qt),L=[],he.html===!0&&(C(O,Jt),C(L,en)),he.svg===!0&&(C(O,pt),C(L,gt),C(L,Fe)),he.svgFilters===!0&&(C(O,ft),C(L,gt),C(L,Fe)),he.mathMl===!0&&(C(O,mt),C(L,tn),C(L,Fe))),a.ADD_TAGS&&(typeof a.ADD_TAGS=="function"?fe.tagCheck=a.ADD_TAGS:(O===vt&&(O=Q(O)),C(O,a.ADD_TAGS,D))),a.ADD_ATTR&&(typeof a.ADD_ATTR=="function"?fe.attributeCheck=a.ADD_ATTR:(L===Pt&&(L=Q(L)),C(L,a.ADD_ATTR,D))),a.ADD_URI_SAFE_ATTR&&C(nt,a.ADD_URI_SAFE_ATTR,D),a.FORBID_CONTENTS&&(Z===tt&&(Z=Q(Z)),C(Z,a.FORBID_CONTENTS,D)),a.ADD_FORBID_CONTENTS&&(Z===tt&&(Z=Q(Z)),C(Z,a.ADD_FORBID_CONTENTS,D)),et&&(O["#text"]=!0),ae&&C(O,["html","head","body"]),O.table&&(C(O,["tbody"]),delete Se.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw Pe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Pe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=a.TRUSTED_TYPES_POLICY,ce=A.createHTML("")}else A===void 0&&(A=Sr(E,o)),A!==null&&typeof ce=="string"&&(ce=A.createHTML(""));$&&$(a),be=a}},Ut=C({},[...pt,...ft,...pr]),zt=C({},[...mt,...fr]),Kn=function(a){let g=K(a);(!g||!g.tagName)&&(g={namespaceURI:xe,tagName:"template"});const b=qe(a.tagName),P=qe(g.tagName);return ot[a.namespaceURI]?a.namespaceURI===Le?g.namespaceURI===ne?b==="svg":g.namespaceURI===Me?b==="svg"&&(P==="annotation-xml"||Be[P]):!!Ut[b]:a.namespaceURI===Me?g.namespaceURI===ne?b==="math":g.namespaceURI===Le?b==="math"&&Ue[P]:!!zt[b]:a.namespaceURI===ne?g.namespaceURI===Le&&!Ue[P]||g.namespaceURI===Me&&!Be[P]?!1:!zt[b]&&($n[b]||!Ut[b]):!!(Te==="application/xhtml+xml"&&ot[a.namespaceURI]):!1},J=function(a){we(e.removed,{element:a});try{K(a).removeChild(a)}catch{S(a)}},le=function(a,g){try{we(e.removed,{attribute:g.getAttributeNode(a),from:g})}catch{we(e.removed,{attribute:null,from:g})}if(g.removeAttribute(a),a==="is")if(ge||De)try{J(g)}catch{}else try{g.setAttribute(a,"")}catch{}},Ft=function(a){let g=null,b=null;if(Qe)a="<remove></remove>"+a;else{const I=dt(a,/^[\r\n\t ]+/);b=I&&I[0]}Te==="application/xhtml+xml"&&xe===ne&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");const P=A?A.createHTML(a):a;if(xe===ne)try{g=new x().parseFromString(P,Te)}catch{}if(!g||!g.documentElement){g=X.createDocument(xe,"template",null);try{g.documentElement.innerHTML=rt?ce:P}catch{}}const z=g.body||g.documentElement;return a&&b&&z.insertBefore(n.createTextNode(b),z.childNodes[0]||null),xe===ne?Ce.call(g,ae?"html":"body")[0]:ae?g.documentElement:z},qt=function(a){return Ke.call(a.ownerDocument||a,a,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},st=function(a){return a instanceof p&&(typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||!(a.attributes instanceof u)||typeof a.removeAttribute!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function")},$t=function(a){return typeof s=="function"&&a instanceof s};function re(y,a,g){ze(y,b=>{b.call(e,a,g,be)})}const Wt=function(a){let g=null;if(re(F.beforeSanitizeElements,a,null),st(a))return J(a),!0;const b=D(a.nodeName);if(re(F.uponSanitizeElement,a,{tagName:b,allowedTags:O}),Ie&&a.hasChildNodes()&&!$t(a.firstElementChild)&&q(/<[/\w!]/g,a.innerHTML)&&q(/<[/\w!]/g,a.textContent)||a.nodeType===ke.progressingInstruction||Ie&&a.nodeType===ke.comment&&q(/<[/\w]/g,a.data))return J(a),!0;if(!(fe.tagCheck instanceof Function&&fe.tagCheck(b))&&(!O[b]||Se[b])){if(!Se[b]&&Gt(b)&&(N.tagNameCheck instanceof RegExp&&q(N.tagNameCheck,b)||N.tagNameCheck instanceof Function&&N.tagNameCheck(b)))return!1;if(et&&!Z[b]){const P=K(a)||a.parentNode,z=H(a)||a.childNodes;if(z&&P){const I=z.length;for(let G=I-1;G>=0;--G){const oe=_(z[G],!0);oe.__removalCount=(a.__removalCount||0)+1,P.insertBefore(oe,v(a))}}}return J(a),!0}return a instanceof l&&!Kn(a)||(b==="noscript"||b==="noembed"||b==="noframes")&&q(/<\/no(script|embed|frames)/i,a.innerHTML)?(J(a),!0):(me&&a.nodeType===ke.text&&(g=a.textContent,ze([je,Ye,Ve],P=>{g=ve(g,P," ")}),a.textContent!==g&&(we(e.removed,{element:a.cloneNode()}),a.textContent=g)),re(F.afterSanitizeElements,a,null),!1)},Ht=function(a,g,b){if(It&&(g==="id"||g==="name")&&(b in n||b in Gn))return!1;if(!(Ze&&!Xe[g]&&q(Ln,g))){if(!(Nt&&q(Bn,g))){if(!(fe.attributeCheck instanceof Function&&fe.attributeCheck(g,a))){if(!L[g]||Xe[g]){if(!(Gt(a)&&(N.tagNameCheck instanceof RegExp&&q(N.tagNameCheck,a)||N.tagNameCheck instanceof Function&&N.tagNameCheck(a))&&(N.attributeNameCheck instanceof RegExp&&q(N.attributeNameCheck,g)||N.attributeNameCheck instanceof Function&&N.attributeNameCheck(g,a))||g==="is"&&N.allowCustomizedBuiltInElements&&(N.tagNameCheck instanceof RegExp&&q(N.tagNameCheck,b)||N.tagNameCheck instanceof Function&&N.tagNameCheck(b))))return!1}else if(!nt[g]){if(!q(wt,ve(b,Tt,""))){if(!((g==="src"||g==="xlink:href"||g==="href")&&a!=="script"&&ar(b,"data:")===0&&Ot[a])){if(!(kt&&!q(Un,ve(b,Tt,"")))){if(b)return!1}}}}}}}return!0},Gt=function(a){return a!=="annotation-xml"&&dt(a,zn)},Kt=function(a){re(F.beforeSanitizeAttributes,a,null);const{attributes:g}=a;if(!g||st(a))return;const b={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:L,forceKeepAttr:void 0};let P=g.length;for(;P--;){const z=g[P],{name:I,namespaceURI:G,value:oe}=z,Ee=D(I),ct=oe;let B=I==="value"?ct:lr(ct);if(b.attrName=Ee,b.attrValue=B,b.keepAttr=!0,b.forceKeepAttr=void 0,re(F.uponSanitizeAttribute,a,b),B=b.attrValue,Dt&&(Ee==="id"||Ee==="name")&&(le(I,a),B=Fn+B),Ie&&q(/((--!?|])>)|<\/(style|title|textarea)/i,B)){le(I,a);continue}if(Ee==="attributename"&&dt(B,"href")){le(I,a);continue}if(b.forceKeepAttr)continue;if(!b.keepAttr){le(I,a);continue}if(!Rt&&q(/\/>/i,B)){le(I,a);continue}me&&ze([je,Ye,Ve],Yt=>{B=ve(B,Yt," ")});const jt=D(a.nodeName);if(!Ht(jt,Ee,B)){le(I,a);continue}if(A&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!G)switch(E.getAttributeType(jt,Ee)){case"TrustedHTML":{B=A.createHTML(B);break}case"TrustedScriptURL":{B=A.createScriptURL(B);break}}if(B!==ct)try{G?a.setAttributeNS(G,I,B):a.setAttribute(I,B),st(a)?J(a):Zt(e.removed)}catch{le(I,a)}}re(F.afterSanitizeAttributes,a,null)},jn=function y(a){let g=null;const b=qt(a);for(re(F.beforeSanitizeShadowDOM,a,null);g=b.nextNode();)re(F.uponSanitizeShadowNode,g,null),Wt(g),Kt(g),g.content instanceof i&&y(g.content);re(F.afterSanitizeShadowDOM,a,null)};return e.sanitize=function(y){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=null,b=null,P=null,z=null;if(rt=!y,rt&&(y="<!-->"),typeof y!="string"&&!$t(y))if(typeof y.toString=="function"){if(y=y.toString(),typeof y!="string")throw Pe("dirty is not a string, aborting")}else throw Pe("toString is not a function");if(!e.isSupported)return y;if(Je||it(a),e.removed=[],typeof y=="string"&&(Ae=!1),Ae){if(y.nodeName){const oe=D(y.nodeName);if(!O[oe]||Se[oe])throw Pe("root node is forbidden and cannot be sanitized in-place")}}else if(y instanceof s)g=Ft("<!---->"),b=g.ownerDocument.importNode(y,!0),b.nodeType===ke.element&&b.nodeName==="BODY"||b.nodeName==="HTML"?g=b:g.appendChild(b);else{if(!ge&&!me&&!ae&&y.indexOf("<")===-1)return A&&Oe?A.createHTML(y):y;if(g=Ft(y),!g)return ge?null:Oe?ce:""}g&&Qe&&J(g.firstChild);const I=qt(Ae?y:g);for(;P=I.nextNode();)Wt(P),Kt(P),P.content instanceof i&&jn(P.content);if(Ae)return y;if(ge){if(De)for(z=_e.call(g.ownerDocument);g.firstChild;)z.appendChild(g.firstChild);else z=g;return(L.shadowroot||L.shadowrootmode)&&(z=Mn.call(r,z,!0)),z}let G=ae?g.outerHTML:g.innerHTML;return ae&&O["!doctype"]&&g.ownerDocument&&g.ownerDocument.doctype&&g.ownerDocument.doctype.name&&q(gn,g.ownerDocument.doctype.name)&&(G="<!DOCTYPE "+g.ownerDocument.doctype.name+`>
`+G),me&&ze([je,Ye,Ve],oe=>{G=ve(G,oe," ")}),A&&Oe?A.createHTML(G):G},e.setConfig=function(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};it(y),Je=!0},e.clearConfig=function(){be=null,Je=!1},e.isValidAttribute=function(y,a,g){be||it({});const b=D(y),P=D(a);return Ht(b,P,g)},e.addHook=function(y,a){typeof a=="function"&&we(F[y],a)},e.removeHook=function(y,a){if(a!==void 0){const g=sr(F[y],a);return g===-1?void 0:cr(F[y],g,1)[0]}return Zt(F[y])},e.removeHooks=function(y){F[y]=[]},e.removeAllHooks=function(){F=rn()},e}var on=hn();const Ar=(t,e)=>typeof t!="number"||typeof e!="number"?null:Math.round(t*(e/100)),Tr=(t,e)=>typeof t!="number"||e===null?null:t-e,sn=t=>{const e={삼성:"SS",현대:"HD",신한:"SH",국민:"KB",KB:"KB",롯데:"LT",하나:"HN",우리:"WR",농협:"NH",BC:"BC",씨티:"CT"};for(const[n,r]of Object.entries(e))if(t.includes(n))return r;return t.replace("카드","").substring(0,2).toUpperCase()},wr=t=>{const e=t.toUpperCase(),n=[{keywords:["BC","BC카드","비씨"],svg:"bcCard.svg"},{keywords:["KB","국민","KB국민","케이비"],svg:"kbCard.svg"},{keywords:["NH","농협","NH농협"],svg:"nhCard.svg"},{keywords:["삼성","SAMSUNG","삼성카드","SAMSUNG CARD"],svg:"samsungCard.svg"},{keywords:["현대","HYUNDAI","현대카드"],svg:"hyundaiCard.svg"},{keywords:["신한","SHINHAN","신한카드"],svg:"shinhanCard.svg"},{keywords:["롯데","LOTTE","롯데카드"],svg:"lotteCard.svg"},{keywords:["하나","HANA","하나카드","SK"],svg:"hanaCard.svg"},{keywords:["우리","WOORI","우리카드"],svg:"wooriCard.svg"},{keywords:["씨티","CITI","씨티카드","CITIBANK"],svg:"citiCard.svg"},{keywords:["VISA","비자"],svg:"visaCard.svg"},{keywords:["MASTER","마스터","MASTERCARD"],svg:"masterCard.svg"},{keywords:["AMEX","아멕스","AMERICAN EXPRESS"],svg:"amexCard.svg"}];for(const{keywords:r,svg:o}of n)for(const i of r)if(e.includes(i.toUpperCase()))try{return chrome?.runtime?.getURL(`assets/card/${o}`)??null}catch{return null}return null},vr=(t,e,n)=>{const r=" recommended",o=document.createElement("div");o.className=`picsel-card-benefit-item${r}`;const i=t.cardName||t.card||"카드",s=wr(i)||t.imageUrl;if(s){const h=document.createElement("div");h.className="picsel-card-image-wrapper";const _=document.createElement("img");_.src=s,_.alt=i,_.className="picsel-card-image",_.onerror=()=>{const S=sn(i);h.textContent="";const v=document.createElement("div");v.className="picsel-card-initial",v.textContent=on.sanitize(S,{ALLOWED_TAGS:[]}),h.appendChild(v)},h.appendChild(_),o.appendChild(h)}else{const h=sn(i),_=document.createElement("div");_.className="picsel-card-image-wrapper";const S=document.createElement("div");S.className="picsel-card-initial",S.textContent=on.sanitize(h,{ALLOWED_TAGS:[]}),_.appendChild(S),o.appendChild(_)}const l=document.createElement("div");l.className="picsel-card-info";const d=document.createElement("div");if(d.className="picsel-card-header",(t.discountAmount??0)>0){const h=document.createElement("span");h.className="picsel-recommended-badge",h.textContent=`${e+1}위`,d.appendChild(h)}const u=document.createElement("span");u.className="picsel-card-name";const p=i.includes(",")?i.split(",")[0].trim():i;if(u.textContent=p,d.appendChild(u),l.appendChild(d),t.benefit){const h=document.createElement("div");h.className="picsel-card-benefit-desc",h.textContent=t.benefit,l.appendChild(h)}o.appendChild(l);const x=document.createElement("div");if(x.className="picsel-card-amount",t.benefitType==="installment"){const h=document.createElement("div");h.className="picsel-card-installment",h.textContent=t.benefit||"무이자",x.appendChild(h)}else if(typeof t.discountAmount=="number"&&t.discountAmount>0){if(typeof t.finalPrice=="number"){const S=document.createElement("div");S.className="picsel-card-final-price";const v=pe(t.finalPrice,n);S.textContent=v,x.appendChild(S)}const h=document.createElement("div");h.className="picsel-card-discount";const _=pe(t.discountAmount,n);h.textContent=`-${_}`,x.appendChild(h)}else if(typeof t.rate=="number"&&t.rate>0){const h=document.createElement("div");h.className="picsel-card-rate",h.textContent=`${t.rate}%`,x.appendChild(h)}return o.appendChild(x),o},Pr=t=>{const e=Array.isArray(t.cardBenefits)?t.cardBenefits:[];if(e.length===0){const E=document.createElement("section");E.className="picsel-section picsel-card-section picsel-hidden",E.setAttribute("data-empty","true"),E.style.display="none";const h=document.createElement("h4");h.className="picsel-section-title",h.textContent="카드별 혜택",E.appendChild(h);const _=document.createElement("div");return _.className="picsel-empty-benefits",_.textContent="이 상품에는 카드 혜택이 없어요",E.appendChild(_),E}const n=typeof t.discountPrice=="number"&&t.discountPrice>0?t.discountPrice:t.amount,i=e.map(E=>{const h=E;if(h.benefitType==="point"||h.benefitType==="installment")return null;const _=h.rate??h.discount;let S=0,v=0;typeof _=="number"&&_>100||h.benefitType==="discount"?(S=typeof _=="number"&&_>100?_:h.discount??0,v=0):(v=typeof _=="number"&&_<=100?_:0,S=Ar(n,v)??0);const H=Tr(n,S);return{...h,cardName:h.cardName??h.card,rate:v,discountAmount:S??void 0,finalPrice:H??void 0}}).filter(E=>E!==null).sort((E,h)=>{const _=E?.discountAmount??0,S=h?.discountAmount??0;if(_!==S)return S-_;const v=E?.rate??0;return(h?.rate??0)-v})[0];if(!i)return null;const c=document.createElement("section");c.className="picsel-section picsel-card-section";const s=document.createElement("h4");s.className="picsel-section-title",s.textContent="추천 카드 혜택",c.appendChild(s);const l=document.createElement("div");l.className="picsel-card-benefit-list";const d=t.currency??"KRW",u=vr(i,0,d);l.appendChild(u),c.appendChild(l);const p=[],x=t.elevenst?.totalPointAmount??0;if(x>0&&p.push(`최대 적립 포인트 ${x.toLocaleString()}P`),t.giftCardDiscount?.description&&p.push(t.giftCardDiscount.description),t.cashback?.description&&p.push(t.cashback.description),p.length>0){const E=document.createElement("div");E.className="picsel-sub-benefits",p.forEach(h=>{const _=document.createElement("div");_.className="picsel-sub-benefit-item",_.textContent=h,E.appendChild(_)}),c.appendChild(E)}return c},Nr=t=>{const e=document.createElement("footer");e.className="picsel-footer";const n=document.createElement("div");n.className="picsel-footer-buttons";const r=document.createElement("button");return r.className="picsel-footer-confirm",r.textContent="확인했습니다",r.type="button",r.addEventListener("click",()=>{_t(!1)}),n.appendChild(r),e.appendChild(n),e},kr=(t,e)=>pe(t,e??"KRW")??`${t.toLocaleString()}원`,Rr=t=>pe(t,"KRW")??`${t.toLocaleString()}원`,Ir=t=>(Array.isArray(t.results)?t.results:[]).filter(n=>n&&n.success&&Array.isArray(n.products)).flatMap(n=>n.products.map(r=>({provider:n.provider,name:r.name,price:r.price,currency:r.currency,url:r.url}))).filter(n=>typeof n.price=="number"&&n.price>0).sort((n,r)=>n.price-r.price).slice(0,3),cn='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 4L6.667 11.333 3.333 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',Dr=t=>{const{panelIsOpen:e,comparison:n}=t,r=document.createElement("section");if(r.className="picsel-section picsel-lowest-price-section",!e){const u=document.createElement("div");return u.className="picsel-empty-state",u.textContent="패널을 열면 최저가 비교를 시작합니다.",r.appendChild(u),r}if(n.status==="loading"){const u=document.createElement("div");return u.className="picsel-empty-state",u.textContent="가격 비교 중...",r.appendChild(u),r}if(n.status==="error"){const u=document.createElement("div");return u.className="picsel-empty-state",u.textContent=n.error||"가격 비교 중 오류가 발생했습니다.",r.appendChild(u),r}if(n.status!=="success"||!n.data){const u=document.createElement("div");return u.className="picsel-empty-state",u.textContent="상품명을 찾을 수 없어 가격 비교를 실행할 수 없습니다.",r.appendChild(u),r}const o=n.data;if(o.is_cheaper&&typeof o.price_diff=="number"&&o.price_diff>0){const u=document.createElement("div");u.className="picsel-savings-banner";const p=document.createElement("span");p.className="picsel-savings-icon",p.innerHTML=cn;const x=document.createElement("span");x.className="picsel-savings-text",x.textContent=`지금 ${Rr(o.price_diff)} 더 아낄 수 있어요!`,u.appendChild(p),u.appendChild(x),r.appendChild(u)}else if(o.is_cheaper===!1){const u=document.createElement("div");u.className="picsel-no-savings-banner";const p=document.createElement("span");p.className="picsel-savings-icon",p.innerHTML=cn;const x=document.createElement("span");x.className="picsel-savings-text",x.textContent="현재 가격이 가장 저렴합니다.",u.appendChild(p),u.appendChild(x),r.appendChild(u)}const i=Ir(o);if(i.length===0){const u=document.createElement("div");return u.className="picsel-empty-state",u.textContent="검색 결과가 없습니다.",r.appendChild(u),r}const c=document.createElement("div");c.className="picsel-section-header";const s=document.createElement("span");s.className="picsel-section-title",s.textContent="최저가 추천";const l=document.createElement("span");l.className="picsel-section-note",l.textContent="배송비 포함 기준",c.appendChild(s),c.appendChild(l),r.appendChild(c);const d=document.createElement("div");if(d.className="picsel-price-list",i.forEach((u,p)=>{const x=p===0,E=document.createElement("a");E.href=u.url||"#",E.target="_blank",E.rel="noreferrer",E.className=x?"picsel-price-item picsel-price-item-top":"picsel-price-item";const h=document.createElement("div");h.className="picsel-price-item-left";const _=document.createElement("div");_.className="picsel-mall-row";const S=document.createElement("span");if(S.className="picsel-mall-name",S.textContent=(u.name||u.provider||"알 수 없음").trim(),_.appendChild(S),x){const A=document.createElement("span");A.className="picsel-lowest-badge",A.textContent="최저가",_.appendChild(A)}h.appendChild(_);const v=document.createElement("div");v.className="picsel-price-item-right";const H=document.createElement("span");H.className="picsel-price-value",H.textContent=kr(u.price,u.currency);const K=document.createElement("span");K.className="picsel-price-arrow",K.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',v.appendChild(H),v.appendChild(K),E.appendChild(h),E.appendChild(v),d.appendChild(E)}),r.appendChild(d),o.link){const u=document.createElement("a");u.href=o.link,u.target="_blank",u.rel="noreferrer",u.className="picsel-footer-link",u.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2h7m0 0v7m0-7L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> 정확한 정보 확인하기',r.appendChild(u)}return r},ht=t=>{const{buttonBadgeEl:e}=m;if(!e)return;if(!t){e.style.display="none";return}const n=Array.isArray(t.cardBenefits)?t.cardBenefits.map(o=>{const i=o,c=i.rate??i.discount;return typeof c=="number"?c:0}).filter(o=>o>0):[];if(n.length>0){const o=Math.max(...n);e.textContent=`최대 ${o}%`,e.style.display="inline-flex";return}const r=t.cashback?.amount;if(typeof r=="number"&&r>0){const o=pe(r,t.currency??"KRW");e.textContent=o?`${o} 적립`:"캐시백 혜택",e.style.display="inline-flex";return}e.style.display="none"},ee=()=>{const{contentEl:t,cachedData:e}=m;if(!t)return;if(t.textContent="",!e){const c=document.createElement("p");c.className="picsel-empty-state",c.textContent="상품 정보를 불러오는 중입니다.",t.appendChild(c),ht(null);return}const n=e,{displayMode:r}=de.getState();if(t.appendChild(nr(n)),r==="lowest-price"){const c=!!m.panelEl?.classList.contains("open");t.appendChild(Dr({panelIsOpen:c,comparison:m.comparison})),ht(null);return}const o=Pr(n);o&&t.appendChild(o);const i=Nr();i&&t.appendChild(i),ht(n)},Or=async t=>{if(t&&m.comparison.status!=="loading"&&!(m.comparison.query===t&&(m.comparison.status==="success"||m.comparison.status==="error"))){m.comparison={status:"loading",query:t,error:null,data:null};try{if(!chrome?.runtime?.sendMessage){m.comparison={status:"error",query:t,error:"Chrome extension API를 사용할 수 없습니다.",data:null};return}const e=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!e?.success){m.comparison={status:"error",query:t,error:e?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null};return}const n=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:t});if(n?.success){m.comparison={status:"success",query:t,error:null,data:n.data};return}m.comparison={status:"error",query:t,error:n?.error||"가격 비교 검색 실패",data:null}}catch(e){m.comparison={status:"error",query:t,error:e instanceof Error?e.message:"알 수 없는 오류",data:null}}}},Mr=(t,e)=>{t&&m.comparison.status!=="loading"&&(m.comparison.query===t&&(m.comparison.status==="success"||m.comparison.status==="error")||(m.comparison={status:"loading",query:t,error:null,data:null},e(),Or(t).finally(()=>{e()})))},_t=t=>{const{panelEl:e,toggleButton:n,buttonLabelEl:r}=m;if(!(!e||!n||!r)){if(t){e.classList.add("open"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),r.textContent="PicSel 혜택 닫기";const{displayMode:o}=de.getState();if(o==="lowest-price"&&m.cachedData?.title){Mr(m.cachedData.title,ee);return}ee();return}e.classList.remove("open"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),r.textContent="PicSel 혜택 보기"}},Lr=`
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
`,Br=t=>{if(m.mounted)return;const e=document.getElementById(Vt);if(e){m.hostElement=e,m.shadowRoot=e.shadowRoot,e.shadowRoot&&(m.toggleButton=e.shadowRoot.querySelector(".picsel-toggle-button"),m.buttonLabelEl=e.shadowRoot.querySelector(".picsel-toggle-label"),m.buttonBadgeEl=e.shadowRoot.querySelector(".picsel-toggle-badge"),m.panelEl=e.shadowRoot.querySelector(`#${lt}`),m.closeButtonEl=e.shadowRoot.querySelector(".picsel-close-button"),m.contentEl=e.shadowRoot.querySelector(".picsel-panel-content"),m.panelTitleEl=e.shadowRoot.querySelector(".picsel-panel-title")),m.mounted=!0;return}m.hostElement=document.createElement("div"),m.hostElement.id=Vt,m.hostElement.style.position="fixed",m.hostElement.style.bottom="24px",m.hostElement.style.right="24px",m.hostElement.style.zIndex=String(2147483647),m.shadowRoot=m.hostElement.attachShadow({mode:"open"});const n=document.createElement("style");n.textContent=Lr,m.shadowRoot.appendChild(n);const r=document.createElement("div");r.className="picsel-toggle-container",m.shadowRoot.appendChild(r),m.toggleButton=document.createElement("button"),m.toggleButton.className="picsel-toggle-button",m.toggleButton.type="button",m.toggleButton.setAttribute("aria-expanded","false"),m.buttonLabelEl=document.createElement("span"),m.buttonLabelEl.className="picsel-toggle-label",m.buttonLabelEl.textContent="PicSel 혜택 보기",m.toggleButton.appendChild(m.buttonLabelEl),m.buttonBadgeEl=document.createElement("span"),m.buttonBadgeEl.className="picsel-toggle-badge",m.toggleButton.appendChild(m.buttonBadgeEl),r.appendChild(m.toggleButton),m.panelEl=document.createElement("div"),m.panelEl.className="picsel-panel",m.panelEl.id=lt,m.panelEl.setAttribute("role","dialog"),m.panelEl.setAttribute("aria-hidden","true"),m.toggleButton.setAttribute("aria-controls",lt);const o=document.createElement("div");o.className="picsel-panel-header",m.panelTitleEl=document.createElement("div"),m.panelTitleEl.className="picsel-panel-title",m.panelTitleEl.textContent="PicSel 혜택 정보",m.closeButtonEl=document.createElement("button"),m.closeButtonEl.type="button",m.closeButtonEl.className="picsel-close-button",m.closeButtonEl.setAttribute("aria-label","닫기"),m.closeButtonEl.textContent="✕",o.appendChild(m.panelTitleEl),o.appendChild(m.closeButtonEl),m.panelEl.appendChild(o),m.contentEl=document.createElement("div"),m.contentEl.className="picsel-panel-content",m.panelEl.appendChild(m.contentEl),r.appendChild(m.panelEl);const i=m.panelEl,c=m.hostElement;m.toggleButton.addEventListener("click",()=>{const s=!i.classList.contains("open");t.setPanelOpen(s)}),m.closeButtonEl.addEventListener("click",()=>{t.setPanelOpen(!1)}),window.addEventListener("keydown",s=>{s.key==="Escape"&&t.setPanelOpen(!1)}),document.addEventListener("click",s=>{if(!i.classList.contains("open"))return;const l=s.composedPath();c&&!l.includes(c)&&t.setPanelOpen(!1)},!0),document.body.appendChild(m.hostElement),m.mounted=!0},xn=()=>{const{displayMode:t}=de.getState();if(m.panelTitleEl){if(t==="lowest-price"){m.panelTitleEl.textContent="가격 비교 리포트";return}if(m.cachedData?.site){const e=er(m.cachedData.site);m.panelTitleEl.textContent=`${e} 혜택 정보`;return}m.panelTitleEl.textContent="PicSel 혜택 정보"}},bn=t=>{m.cachedData={...t},Br({setPanelOpen:_t}),xn(),ee(),_t(!1)},St=t=>{if(m.cachedData={...m.cachedData??{},...t},!m.mounted){bn(m.cachedData);return}xn(),ee()},w=t=>{if(!t)return null;const n=t.replace(/[,₩$€£\s원]/g,"").trim().match(/(\d+)/);return n?parseInt(n[1],10):null},En=t=>{if(!t)return null;const e=t.match(/(\d+(?:\.\d+)?)\s*%/);return e?parseFloat(e[1]):null},Ur=t=>t.includes("원")||t.includes("KRW")?"KRW":t.includes("$")||t.includes("USD")?"USD":t.includes("€")||t.includes("EUR")?"EUR":t.includes("¥")||t.includes("JPY")?"JPY":"KRW",At=t=>typeof t=="number"&&t>100&&t<1e8,ue=t=>{if(!t)return"";const e=t.trim().replace(/\s+/g,"").replace(/card$/i,"카드");return e.includes("카드")?e:`${e}카드`},Ct=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","BC","NH"];for(const n of e)if(t.includes(n))return n;return t.replace(/카드$/g,"")};class ye{extractNumber(e){return w(e)}extractCurrency(e){return Ur(e)}getTextBySelector(e,n){return e.querySelector(n)?.textContent?.trim()||null}getTextBySelectors(e,n){for(const r of n)try{const o=this.getTextBySelector(e,r);if(o)return o}catch(o){se.error(T.PAR_E004,`Selector error: ${r}`,{data:{siteName:this.siteName,selector:r},error:o instanceof Error?o:void 0})}return null}isValidPrice(e){return At(e)}searchPriceInDOM(e,n){const r=e.querySelectorAll('[class*="price"], [class*="Price"], [class*="cost"], [class*="amount"], [id*="price"], [id*="Price"]');for(const l of r){const u=(l.textContent||"").match(n);if(u)return se.debug("Found price in container",{siteName:this.siteName,price:u[0]}),u[0]}const o=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null);let i,c=0;const s=1e3;for(;(i=o.nextNode())&&c<s;){c++;const d=(i.textContent||"").match(n);if(d)return se.debug("Found price via TreeWalker",{siteName:this.siteName,price:d[0],nodesScanned:c}),d[0]}return c>=s&&se.warn("TreeWalker hit node limit",{siteName:this.siteName,limit:s}),null}extractMetaContent(e,n){return e.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.getAttribute("content")||null}extractCommonInfo(e){const n=this.extractMetaContent(e,"og:title")||this.extractMetaContent(e,"twitter:title")||e.title,r=this.extractMetaContent(e,"og:image")||this.extractMetaContent(e,"twitter:image");return{title:n||void 0,imageUrl:r||void 0}}}const Y={amount:[".prod-sale-price",".prod-coupon-price",".total-price strong",".price-value",'[class*="text-"][class*="font-bold"]',".price-amount.sales-price-amount",".price-amount.final-price-amount",".total-price",'[data-testid="total-price"]',".price-amount","[data-price]",".product-price",".prod-price",".product__price",".prod_price","strong.price","span.price",".deal-price",".special-price",".discount-price strong",'[class*="sale"] strong','[class*="discount"] strong','div[class*="price"] > strong','span[class*="price"] > strong','[class*="price"]'],title:[".product-title","h1.product-name",'h2[class*="title"]','[data-testid="product-title"]',".deal-title",".special-title",'h1[class*="product"]','h1[class*="title"]',"h1"],mainImage:"img.twc-w-full.twc-max-h-\\[546px\\]",thumbnailContainer:"div.twc-w-\\[70px\\]",instantOption:".instant-option",benefitBadge:".ccid-benefit-badge",shipping:'[class*="shipping"]',cardImages:{directClass:'img.w-\\[76px\\], img[class*="w-[76px]"]',container:'[class*="card-benefit"] img, [class*="카드"] img, .benefit-ico'},cardBenefitPopup:{container:"#creditCardBenefitPopup, .card-benefit-popup",content:"#creditCardBenefitContent, .card-benefit-popup__content",iframe:".card-benefit-popup__content-iframe",cardItem:'.card-benefit-item, .benefit-card-item, [class*="card-benefit"]',cardName:'.card-name, .benefit-card-name, [class*="card-name"]',benefitRate:'.benefit-rate, .discount-rate, [class*="rate"]',benefitDesc:'.benefit-desc, .card-benefit-desc, [class*="benefit-desc"]'}},zr=t=>{for(const e of Y.title){const n=t.querySelector(e);if(n?.textContent)return n.textContent.trim()}return null},Fr=t=>{try{const e=t.querySelector(Y.mainImage);if(e?.src){let r=e.src;return r.startsWith("//")&&(r=`https:${r}`),r=r.split("?")[0],r}const n=t.querySelector(Y.thumbnailContainer);if(n){const r=n.querySelector("ul > li:first-child img");if(r){let o=r.src;if(o)return o.startsWith("//")&&(o=`https:${o}`),o.includes("thumbnails/remote/")&&(o=o.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),o=o.split("?")[0],o}}return null}catch(e){return f.error(T.PAR_E001,"Error extracting main image",{error:e instanceof Error?e:new Error(String(e))}),null}},qr=t=>{try{const e=[],n=new Set,r=t.querySelector(Y.thumbnailContainer);if(r){const o=r.querySelectorAll("ul > li img");for(const i of o){let s=i.src;if(s&&!n.has(s)&&(s.startsWith("//")&&(s=`https:${s}`),s.includes("thumbnails/remote/")&&(s=s.replace(/thumbnails\/remote\/\d+x\d+ex/,"thumbnails/remote/800x800ex")),s=s.split("?")[0],!n.has(s)&&(e.push(s),n.add(s),e.length>=10)))break}}return e}catch(e){return f.error(T.PAR_E001,"Error extracting all images",{error:e instanceof Error?e:new Error(String(e))}),[]}},an=t=>t>=100&&t<=1e8,$r=t=>{let e=null,n=null,r=null;for(const o of Y.amount)try{const i=t.querySelector(o);if(!i||!i.textContent)continue;const c=i.textContent.trim();if(!/[\d,]+\s*원?/.test(c)&&!/^\d{1,3}(,\d{3})*$/.test(c.replace(/[^\d,]/g,"")))continue;const s=w(c);if(!s||!an(s))continue;if(f.debug(`Found via selector "${o}"`,{value:s}),/final|discount|final-price|deal|sale|coupon/i.test(o)){r=s,e=s;break}n||(n=s),e||(e=s)}catch(i){f.debug(`Selector ${o} failed`,{error:i})}if(!e){const o=t.querySelectorAll('.prod-sale-price, .total-price, [class*="price"]');for(const i of o){const s=(i.textContent?.trim()||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(s){const l=w(s[1]);if(l&&an(l)){f.debug("Found via regex in element",{value:l}),e=l;break}}}}return{amount:e,originalPrice:n,discountPrice:r}},Wr=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/,/(\d{1,3}(?:,\d{3})*)\s*WON/i,/(\d{1,3}(?:,\d{3})*)/],n=t.createTreeWalker(t.body,NodeFilter.SHOW_TEXT,null);let r;for(;r=n.nextNode();){const o=(r.textContent||"").replace(/\u00A0/g," ");for(const i of e){const c=o.match(i);if(c&&c[1]){const s=w(c[1]);if(s)return f.debug("Found price via text walker",{value:s}),s}}}return null},Hr=t=>{try{const e=Array.from(t.querySelectorAll('[class*="price"], [id*="price"], [data-price]')),n=/(\d{1,3}(?:,\d{3})*)/;for(const r of e){const o=(r.textContent||"").replace(/\u00A0/g," ").trim(),i=(r.getAttribute("data-price")||"").trim(),s=`${o} ${i}`.trim().match(n);if(s&&s[1]){const l=w(s[1]);if(l)return f.debug("Found price by element scan",{value:l}),l}}}catch(e){f.debug("findPriceByElementScan error",{error:e})}return null},Gr={신한:"assets/card/shinhanCard.svg",우리:"assets/card/wooriCard.svg",BC:"assets/card/bcCard.svg",비씨:"assets/card/bcCard.svg",롯데:"assets/card/lotteCard.svg",KB:"assets/card/kbCard.svg",국민:"assets/card/kbCard.svg",NH:"assets/card/nhCard",농협:"assets/card/hanaCard.svg",삼성:"assets/card/samsungCard.svg",하나:"assets/card/hanaCard.svg",현대:"assets/card/hyundaiCard.svg",비자:"assets/card/visaCard.svg",마스터:"assets/card/masterCard.svg"},Kr=t=>{const e=Ct(ue(t)),n=Gr[e];if(!n)return null;try{return chrome.runtime.getURL(n)}catch{return null}},$e=t=>{for(const[e,n]of Object.entries(Xn))if(t.includes(e))return n;return null},jr=t=>{const e=[],n=Y.cardImages;return t.querySelectorAll(n.directClass).forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(!s)return;let d=l.trim();d||(d=$e(s)||""),d&&!d.includes("카드")&&(d=`${d}카드`),s&&d&&(e.some(u=>u.cardName===d)||(e.push({src:s,alt:l,cardName:d}),f.debug("카드 이미지 발견",{cardName:d,src:s.substring(0,80)})))}),e.length===0&&t.querySelectorAll(n.container).forEach(c=>{const s=c,l=s.src,d=s.alt||"";if(!l||(s.width||s.naturalWidth)>100)return;let p=d.trim();p||(p=$e(l)||""),p&&!p.includes("카드")&&(p=`${p}카드`),l&&p&&!e.some(x=>x.cardName===p)&&e.push({src:l,alt:d,cardName:p})}),t.querySelectorAll('img[src*="cardbenefit"], img[alt*="카드"]').forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(!s||(c.width||c.naturalWidth)>100)return;let u=l.trim();u||(u=$e(s)||""),u&&!u.includes("카드")&&(u=`${u}카드`),s&&u&&!e.some(p=>p.cardName===u)&&e.push({src:s,alt:l,cardName:u})}),f.debug("추출된 카드 이미지 총",{count:e.length}),e},Yr=t=>{const e=[],n=Y.cardBenefitPopup,r=t.querySelector(n.container);if(!r)return f.debug("카드 혜택 팝업을 찾을 수 없음"),e;const o=r.querySelector(n.iframe);if(o)try{const c=o.contentDocument||o.contentWindow?.document;if(c)return Vr(c)}catch{f.warn("iframe 접근 불가 (cross-origin)")}const i=r.querySelector(n.content);return i?Xr(i):e},Vr=t=>{const e=[],n=Y.cardBenefitPopup;return t.querySelectorAll(n.cardItem).forEach(o=>{const i=o.querySelector(n.cardName),c=o.querySelector(n.benefitRate),s=o.querySelector(n.benefitDesc),l=i?.textContent?.trim()||"",d=c?.textContent?.trim()||"",u=s?.textContent?.trim()||o.textContent?.trim()||"";if(l){const p=En(d||u)??void 0;e.push({card:l,cardName:l,benefit:u||d||"혜택 제공",discount:p,rate:p})}}),e},Xr=t=>{const e=[],n=t.textContent||"",r=[/([가-힣]+카드)\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g,/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)\s*(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/g];for(const o of r){let i;for(;(i=o.exec(n))!==null;){const c=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);e.some(l=>l.card===c)||e.push({card:c,cardName:c,benefit:`최대 ${s}% 할인/적립`,discount:s,rate:s})}}return e},Zr=t=>{const e=[];return t.querySelectorAll('[class*="card"], [class*="benefit"], [class*="discount"], [id*="card"], [id*="benefit"]').forEach(r=>{const o=r.textContent||"",i=o.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC)(?:카드)?\s*(?:최대\s*)?(\d+(?:\.\d+)?)\s*%/i);if(i){const c=i[1].includes("카드")?i[1]:`${i[1]}카드`,s=parseFloat(i[2]);if(!e.some(l=>l.card===c)){let l=`최대 ${s}% 할인/적립`;const d=o.match(/(?:청구\s*할인|즉시\s*할인|포인트\s*적립|M포인트|포인트리)/i);d&&(l=`최대 ${s}% ${d[0]}`),e.push({card:c,cardName:c,benefit:l,discount:s,rate:s})}}}),e},Jr=t=>{let e=[];const n=jr(t),r=Yr(t);if(r.length>0&&(f.info("팝업에서 카드 혜택 파싱",{count:r.length}),e=r),Zr(t).forEach(i=>{e.some(c=>c.card===i.card)||e.push(i)}),e.length===0){const i=t.querySelector(Y.benefitBadge);if(i){const c=i.querySelectorAll("img.benefit-ico"),s=[],l=[];c.forEach(p=>{const x=p.getAttribute("src");if(x){const E=$e(x);E&&(s.push(E),l.push(x))}});const d=i.querySelector(".benefit-label")?.textContent?.trim(),u=i.querySelector(".benefit-label-highlight")?.textContent?.trim();if(d){const p=En(d),x=s.length>0?`${s.slice(0,3).join(", ")}${s.length>3?" 외":""}`:"쿠팡 파트너 카드",E=p??void 0;e.push({card:x,cardName:x,benefit:`${d}${u?` (${u})`:""}`,discount:E,rate:E,imageUrl:l[0]})}}}return e=e.map((i,c)=>{if(!i.imageUrl){const s=i.cardName||i.card||"",l=Ct(ue(s));let d=n.find(u=>{const p=ue(u.cardName),x=ue(s);return p===x});if(d||(d=n.find(u=>{const p=ue(u.cardName).replace("카드",""),x=ue(s).replace("카드","");return p.includes(x)||x.includes(p)})),d||(d=n.find(u=>Ct(ue(u.cardName))===l)),!d&&c<n.length&&(d=n[c],f.debug("인덱스 기반 매칭",{cardName:s,matchedCardName:d.cardName})),!d){const u=Kr(s);if(u)return f.debug("로컬 아이콘 폴백 사용",{cardName:s,benefitKey:l}),{...i,imageUrl:u}}if(d)return{...i,imageUrl:d.src}}return i}),e.sort((i,c)=>(c.discount??0)-(i.discount??0)),f.debug("최종 카드 혜택",{benefits:e}),e},Qr=t=>{const n=t.body.innerText.match(/기프트카드\s*(\d+)\s*%/);if(n){const o=parseInt(n[1],10);return{rate:o,description:`기프트카드 ${o}% 할인`}}const r=t.querySelectorAll("div, span, p");for(const o of r){const i=o.textContent||"";if(i.includes("기프트카드")&&i.includes("%")){const c=i.match(/(\d+)\s*%/);if(c)return{rate:parseInt(c[1],10),description:i.trim()}}}return null},eo=t=>{const e=t.querySelectorAll('[class*="cashback"], [class*="적립"]');for(const o of e){const i=o.textContent||"",c=i.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(c&&i.includes("쿠팡캐시")){const s=w(c[1]);if(s)return{amount:s,description:`쿠팡캐시 ${s.toLocaleString()} 원 적립`}}}const r=t.body.innerText.match(/(?:최대\s+)?(\d{1,3}(?:,\d{3})*)\s*원\s*.*?쿠팡캐시\s*적립/);if(r){const o=w(r[1]);if(o)return{amount:o,description:`쿠팡캐시 ${o.toLocaleString()} 원 적립`}}return null},to=t=>{try{const e=[],n=new Set,r=t.querySelector(Y.instantOption);if(!r)return e;const o=r.querySelectorAll("section > ul > li");for(const i of o)try{const c=i.querySelectorAll("div");if(c.length<2)continue;let s="";for(const p of c){const x=p.textContent||"";if(!x.includes("원")&&x.trim().length>0&&!x.includes("px")){s=x.trim();break}}let l="";for(const p of c){const E=(p.textContent||"").match(/[\d,]+원/);if(E){l=E[0].replace(/[,원]/g,"");break}}if(!l)continue;const d=parseInt(l);if(!d||d<100||!s||s.length<2)continue;const u=`${s}-${d}`;if(n.has(u))continue;if(e.push({name:s,price:d}),n.add(u),e.length>=15)break}catch(c){f.warn("Error parsing list item",{error:c});continue}return e}catch(e){return f.error(T.PAR_E001,"Error extracting variants",{error:e instanceof Error?e:new Error(String(e))}),[]}},no=t=>t.querySelector(Y.shipping)?.textContent?.trim()||null,ro=(t,e)=>{if(!At(t))return 0;const n=e.rate??e.discount??0;if(n<=0)return 0;let r=Math.round(t*(n/100));return e.maxDiscount&&r>e.maxDiscount&&(r=e.maxDiscount),e.minPurchase&&t<e.minPurchase?0:r},oo=t=>{const e=t.cardName||t.card||"알 수 없는 카드",n=t.rate??t.discount??0;return{card:e,cardName:e,benefit:t.benefit||`${n}% 할인`,discount:n,rate:n,imageUrl:t.imageUrl,maxDiscount:t.maxDiscount,minPurchase:t.minPurchase}},yn=(t,e)=>t.map(r=>{const o=oo(r);return e&&At(e)&&(o.discountAmount=ro(e,o)),o}).sort((r,o)=>r.discountAmount!==void 0&&o.discountAmount!==void 0?o.discountAmount-r.discountAmount:(o.rate??0)-(r.rate??0)),_n=t=>{const e=new Map;for(const n of t){const r=io(n.cardName||n.card),o=e.get(r);if(!o)e.set(r,n);else{const i=o.rate??o.discount??0;(n.rate??n.discount??0)>i&&e.set(r,n)}}return Array.from(e.values())},io=t=>{const e=["삼성","현대","신한","KB","국민","롯데","하나","우리","농협","NH","BC","비씨","스마일"],n=t.toLowerCase();for(const r of e)if(n.includes(r.toLowerCase()))return r;return t};class Cn extends ye{siteName="Coupang";selectors={amount:Y.amount};static isCheckoutPage(e){if(!/coupang\.com/.test(e))return!1;const o=![/coupang\.com\/?$/,/shop\.coupang\.com/,/coupang\.com\/np\/categories/,/coupang\.com\/np\/search/,/coupang\.com\/np\/campaigns/,/coupang\.com\/np\/cart/,/coupang\.com\/np\/checkout/,/coupang\.com\/my\//,/coupang\.com\/np\/login/,/coupang\.com\/np\/register/].some(i=>i.test(e));return f.debug(`isCheckoutPage("${e}") = ${o}`),o}parse(e){try{f.info("🔍 Parsing Coupang page...");const n=zr(e),r=Fr(e),o=qr(e),i=$r(e);let c=i.amount;const{originalPrice:s,discountPrice:l}=i;if(c||(c=Wr(e)),c||(c=Hr(e)),!c)return f.debug("❌ No price found"),null;const d=Jr(e),u=yn(d,c),p=_n(u),x=Qr(e),E=eo(e),h=no(e),_=to(e);return f.info(`✅ Found: ${c} KRW, Cards: ${p.length}`),{price:c,amount:c,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:_,originalPrice:s||void 0,discountPrice:l||void 0,cardBenefits:p,giftCardDiscount:x||void 0,cashback:E||void 0,shippingInfo:h||void 0,discounts:[]}}catch(n){return f.error(T.PAR_E001,"Coupang parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const M={price:{container:".price_block",originalPrice:".price_regular del",salePrice:".price_info .price .value",salePriceAlt:"#finalDscPrcArea .price .value",salePriceAlt2:".c_product_price .price .value",salePriceAlt3:'[class*="price"] .value',discountRate:".price_info .rate .value",maxDiscountPrice:"#maxDiscountResult .price .value",maxDiscountRate:"#maxDiscountResult .rate .value",maxDiscountLayer:"#arMaximumDiscount",maxDiscountItems:"#arMaximumDiscount .discount_prices .field",discountDetail:"#arMaximumDiscount .discount_prices.list_type .price",dealPrice:'.deal_price .value, [class*="deal"] .price',specialPrice:".special_price .value"},product:{title:".c_product_info_title h1.title",titleAlt:".c_product_info_title_coupon h1.title",titleAlt2:'h1[class*="title"]',titleAlt3:"h1.product_name",subtitle:".c_product_info_title .title_sub"},image:{container:".c_product_view_img",main:".img_full img",mainAlt:'.img_full[style*="display: block"] img',expandImage:".expand_img img",thumbnailContainer:"#smallImg .list",thumbnail:"#smallImg .list li img",thumbnailAlt:".c_product_view_img .list li img"},benefits:{container:"#max_saveing_point_layer",pointLayer:"#max_saveing_point_layer",pointAmount:".point",totalPoint:"#max_saveing_point_layer dt + dd .point",totalPointAlt:".max_saveing_point .point",elevenPayPoint:".elevenpay_point .total .value",basicPoint:'.max_saveing_point .point, [class*="point_value"]',pointList:".saving_history .list",pointItems:".saving_history .point",pointItemButton:".c_layer_expand button.c_product_btn",pointItemValue:".c_layer_expand + .value",pointDetailLayer:".c_layer_item",pointDetailTitle:".c_layer_item .cont_title, .c_layer_item .title",pointDetailValue:".c_layer_item .value, .c_layer_item .text_em2"},cardBenefits:{layer:'[id*="arSavePoint"][id*="_layer"], .c_product_more_benefit',cardSection:'[id*="arSavePoint"][id*="_layer"]',benefitButton:'[data-log-body*="카드"], .c_product_btn[data-log-body]',cardButton:'[data-log-body*="카드"]',cardName:".layer_title .title, .cont_title",cardItem:".c-detail-cont__item, .c_layer_item",cardTitle:".c-detail-cont__title, .layer_title .title",cardAmount:".c-detail-cont__discription .value, .text_em2",cardDetail:".c-detail-cont",cardDetailItem:".c-detail-cont__item",cardDetailTitle:".c-detail-cont__title",cardDetailDesc:".c-detail-cont__discription"},installment:{dialogContainer:".dialog_cont .card_benefits",description:".card_description",descriptionTitle:".card_description dt",descriptionValue:".card_description dd strong",cardBox:".card_box",cardName:"dt",conditions:"dd",triggerButton:".additional_benefits button",excludeInfo:".card_benefits .notice li"},cardDiscount:{container:".other_benefits",benefitBlock:".other_benefits .benefit",title:".benefit dt",description:".benefit dd",subTitle:".tit_sub",detailList:".benefit dd ul li"},pointDetail:{container:"#max_saveing_point_layer",totalPoint:"#max_saveing_point_layer .point",savingHistory:".saving_history",elevenPaySection:".elevenpay_point",elevenPayTotal:".elevenpay_point .total .value",pointItems:".saving_history .desc li",pointButton:".c_layer_expand button.c_product_btn",pointValue:".value",pointDetailLayer:".c_layer_item",pointDetailTitle:".layer_title .title",pointDetailInfo:".layer_cont .info",pointDetailCont:".c-detail-cont__item"},coupon:{downloadButton:'.coupon button[onclick*="openCouponDownloadPopup"]',downloadButtonAlt:'.c_product_btn[aria-controls="couponDown"]',badge:'.coupon_badge, [class*="coupon"]',item:".coupon_item, .c_coupon_item",name:".coupon_name, .c_coupon_name",discount:".coupon_discount, .c_coupon_discount",couponDiscount:'#arMaximumDiscount .field:has(button:contains("쿠폰할인")) .price'},shipping:{container:'.c_product_info_delivery, [class*="delivery"], [class*="shipping"]',deliveryType:".delivery_type",deliveryDate:".delivery_date",deliveryFee:".delivery_fee"},variants:{container:'.c_product_option, [class*="option"]',optionGroup:".option_group",optionItem:".option_item"},seller:{name:".c_product_store_info .store_name, .seller_name",rating:".c_product_store_info .store_rating, .seller_rating",storeName:".c_product_store_info .store_name",storeLink:".c_product_store_info a"}},xt={siteName:"11번가",currency:"KRW",baseUrl:"https://www.11st.co.kr",mobileBaseUrl:"https://m.11st.co.kr"},so=t=>{const e=M.product;try{const n=t.querySelector(e.title);if(n?.textContent){const o=n.textContent.trim();return f.debug("제목 추출",{title:o}),o}const r=t.querySelector(e.titleAlt);if(r?.textContent){const o=r.textContent.trim();return f.debug("제목 추출 (alt)",{title:o}),o}}catch(n){f.error(T.PAR_E001,"제목 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},co=t=>{try{const e=t.querySelector(M.product.subtitle);if(e?.textContent){const n=e.textContent.trim();return f.debug("부제목 추출",{subtitle:n}),n}}catch(e){f.error(T.PAR_E001,"부제목 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},ao=t=>{try{const e=[/11st\.co\.kr\/products\/(\d+)/,/11st\.co\.kr\/product\/.*?\/(\d+)/,/prdNo=(\d+)/];for(const n of e){const r=t.match(n);if(r?.[1])return f.debug("상품ID 추출",{productId:r[1]}),r[1]}}catch(e){f.error(T.PAR_E001,"상품ID 추출 오류",{error:e instanceof Error?e:new Error(String(e))})}return null},Sn=t=>{const e=M.image;try{const n=t.querySelector(e.main);if(n?.src){const i=Re(n.src);return f.debug("메인 이미지 추출",{src:i}),i}const r=t.querySelector(e.mainAlt);if(r?.src){const i=Re(r.src);return f.debug("메인 이미지 추출 (alt)",{src:i}),i}const o=t.querySelector(`${e.main}[data-src]`);if(o?.dataset?.src){const i=Re(o.dataset.src);return f.debug("메인 이미지 추출 (lazy)",{src:i}),i}}catch(n){f.error(T.PAR_E001,"이미지 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return null},lo=t=>{const e=[],n=new Set,r=M.image;try{const o=Sn(t);o&&(e.push(o),n.add(o)),t.querySelectorAll(r.thumbnail).forEach(s=>{const l=s,d=l.src||l.dataset?.src;if(d){const u=Re(d),p=ln(u);n.has(p)||(e.push(p),n.add(p))}}),t.querySelectorAll(r.thumbnailAlt).forEach(s=>{const l=s,d=l.src||l.dataset?.src;if(d){const u=Re(d),p=ln(u);n.has(p)||(e.push(p),n.add(p))}}),f.debug("전체 이미지 추출",{count:e.length})}catch(o){f.error(T.PAR_E001,"전체 이미지 추출 오류",{error:o instanceof Error?o:new Error(String(o))})}return e},uo=t=>{const e=M.seller,n={seller:null,rating:null};try{const r=t.querySelector(e.name);r?.textContent&&(n.seller=r.textContent.trim(),f.debug("판매자 추출",{seller:n.seller}));const o=t.querySelector(e.rating);o?.textContent&&(n.rating=o.textContent.trim(),f.debug("판매자 등급 추출",{rating:n.rating}))}catch(r){f.error(T.PAR_E001,"판매자 정보 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return n};function Re(t){return t&&(t.startsWith("//")?`https:${t}`:t)}function ln(t){return t&&t.replace(/\/(?:50|70|100|110|140|160)\//,"/600/").replace(/\/thumb/,"/origin")}const po=t=>{const e={amount:null,originalPrice:null,discountPrice:null,maxDiscountPrice:null,discountRate:null,maxDiscountRate:null},n=M.price;try{const r=t.querySelector(n.originalPrice);r?.textContent&&(e.originalPrice=w(r.textContent),f.debug("정가",{price:e.originalPrice}));const o=t.querySelector(n.salePrice)||t.querySelector(n.salePriceAlt);o?.textContent&&(e.discountPrice=w(o.textContent),e.amount=e.discountPrice,f.debug("판매가",{price:e.discountPrice}));const i=t.querySelector(n.discountRate);i?.textContent&&(e.discountRate=w(i.textContent),f.debug("할인율",{rate:e.discountRate}));const c=t.querySelector(n.maxDiscountPrice);c?.textContent&&(e.maxDiscountPrice=w(c.textContent),f.debug("최대할인가",{price:e.maxDiscountPrice}));const s=t.querySelector(n.maxDiscountRate);s?.textContent&&(e.maxDiscountRate=w(s.textContent),f.debug("최대할인율",{rate:e.maxDiscountRate})),e.amount||(e.amount=e.maxDiscountPrice||e.discountPrice||e.originalPrice)}catch(r){f.error(T.PAR_E002,"가격 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},fo=t=>{const e=[/(\d{1,3}(?:,\d{3})*)\s*원/,/₩\s*(\d{1,3}(?:,\d{3})*)/],n=t.querySelectorAll('.price, [class*="price"]');for(const r of n){const o=r.textContent||"";for(const i of e){const c=o.match(i);if(c?.[1]){const s=w(c[1]);if(s&&s>100&&s<1e8)return f.debug("가격 발견",{value:s}),s}}}return null},mo=t=>{const e=[],n=M.price;try{const r=t.querySelector(n.maxDiscountLayer);if(!r)return e;r.querySelectorAll(".discount_prices.list_type .field").forEach(i=>{const c=i.querySelector(".title"),s=i.querySelector(".price");if(c&&s){const l=c.textContent?.trim()||"",d=s.textContent?.trim()||"",u=w(d.replace("-",""));l&&u&&l!=="판매가"&&(e.push({type:l,amount:u}),f.debug("DiscountDetail",{type:l,amount:u}))}})}catch(r){f.error(T.PAR_E002,"DiscountDetail 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},go=t=>{const e={points:[],cardBenefits:[],installments:[],coupons:[],totalPointAmount:0,totalCardBenefitAmount:0,maxInstallmentMonths:0};try{e.points=ho(t),e.totalPointAmount=e.points.reduce((n,r)=>n+r.amount,0),e.cardBenefits=xo(t),e.totalCardBenefitAmount=e.cardBenefits.reduce((n,r)=>n+r.benefitAmount,0),e.installments=yo(t),e.maxInstallmentMonths=e.installments.reduce((n,r)=>Math.max(n,r.maxMonths),0),e.coupons=So(t),f.debug("혜택 정보",{totalPointAmount:e.totalPointAmount,totalCardBenefitAmount:e.totalCardBenefitAmount,maxInstallmentMonths:e.maxInstallmentMonths})}catch(n){f.error(T.PAR_E003,"혜택 추출 오류",{error:n instanceof Error?n:new Error(String(n))})}return e},ho=t=>{const e=[],n=M.pointDetail;try{const r=t.querySelector(n.container);if(r){const o=r.querySelector(n.totalPoint);if(o?.textContent){const c=w(o.textContent);c&&(e.push({amount:c,type:"최대적립포인트",description:"최대 적립 가능 포인트"}),f.debug("최대 적립 포인트",{amount:c}))}const i=r.querySelector(n.elevenPaySection);if(i){const c=i.querySelector(".total .value");if(c?.textContent){const l=w(c.textContent);l&&!e.find(d=>d.amount===l&&d.type==="최대적립포인트")&&(e.push({amount:l,type:"11pay포인트",description:"11pay 결제 시 적립"}),f.debug("11pay 포인트 총액",{amount:l}))}i.querySelectorAll(".desc li").forEach(l=>{const d=l.querySelector(".c_layer_expand button.c_product_btn"),u=l.querySelector(".value");if(d&&u){const p=d.textContent?.trim()||"",x=w(u.textContent||"");x&&p&&!p.includes("카드")&&(e.push({amount:x,type:p,description:p}),f.debug("포인트 항목",{type:p,amount:x}))}})}}if(e.length===0){const o=t.querySelector('.max_saveing_point .point, [class*="point_value"]');if(o?.textContent){const i=w(o.textContent);i&&(e.push({amount:i,type:"기본적립",description:"기본 적립 포인트"}),f.debug("기본 포인트",{amount:i}))}}}catch(r){f.error(T.PAR_E003,"포인트 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e},xo=t=>{const e=[],n=M.cardDiscount;try{const r=[".dialog_cont .other_benefits","#atf_additionalBenefitPopup .other_benefits",n.container,".other_benefits"];let o=null;for(const c of r)if(o=t.querySelector(c),o){f.debug("카드 혜택 컨테이너 찾음",{selector:c});break}if(f.debug("other_benefits 컨테이너",{found:!!o}),o){const c=["dl > .benefit","dl > div.benefit","dl .benefit",".benefit","div.benefit"];let s=null;for(const l of c)if(s=o.querySelectorAll(l),s.length>0){f.debug("benefit 블록 찾음",{selector:l,count:s.length});break}if(f.debug("benefit 블록 수",{count:s?.length||0}),!s||s.length===0){const l=o.querySelector("dl");if(f.debug("dl 요소",{found:!!l}),l){const d=l.children;f.debug("dl children",{count:d.length})}}s&&s.length>0&&s.forEach(l=>{const u=l.querySelector("dt")?.textContent?.trim()||"";if(f.debug("메인 타이틀",{mainTitle:u}),!u)return;const p=bo(u);p&&p.benefitAmount>0&&(e.push(p),f.debug("메인 혜택 추가",{mainParsed:p}));const x=l.querySelector("dd");if(x){const E=x.querySelectorAll(".tit_sub");f.debug("서브타이틀 수",{count:E.length}),E.forEach(h=>{const _=h.textContent?.trim()||"";if(f.debug("서브타이틀",{subTitle:_}),_.includes("안내사항")||_.includes("적립제외"))return;let S=h.nextElementSibling;for(;S&&S.tagName!=="UL"&&S.tagName!=="SPAN";)S=S.nextElementSibling;if(S&&S.tagName==="UL"){const v=S.querySelectorAll("li");f.debug("리스트 아이템 수",{count:v.length}),v.forEach(H=>{const K=H.textContent?.trim()||"";f.debug("아이템",{itemText:K});const A=Eo(_,K);A&&(e.find(X=>X.cardName===A.cardName&&X.benefitType===A.benefitType&&X.benefitAmount===A.benefitAmount)||(e.push(A),f.debug("서브 혜택 추가",{subBenefit:A})))})}})}})}else f.warn("other_benefits 컨테이너를 찾을 수 없음");const i=t.querySelector("#max_saveing_point_layer");i&&i.querySelectorAll(".c_layer_expand button.c_product_btn").forEach(s=>{const l=s.textContent?.trim()||"";if(l.includes("카드")||l.includes("신한")){const u=s.closest("li")?.querySelector(".value")?.textContent?.trim()||"",p=w(u);if(p){const x=l.replace(" 결제 시","").trim();e.find(E=>E.cardName===x&&E.benefitType==="포인트")||e.push({cardName:x,benefitAmount:p,benefitType:"포인트",condition:"결제 시"})}}}),f.info("추출된 카드 혜택",{count:e.length,benefits:e})}catch(r){f.error(T.PAR_E003,"카드 혜택 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function bo(t){if(!t)return null;const e=[/(11번가\s*신한카드)/,/(신한카드)/,/(KB국민)/,/(국민카드)/,/(현대카드)/,/(삼성카드)/,/(롯데카드)/,/(하나카드)/,/(우리카드)/,/(비씨카드)/,/(농협카드)/];let n="";for(const l of e){const d=t.match(l);if(d){n=d[1];break}}if(!n)return null;let r=0,o="",i="";const c=t.match(/최대\s*(\d+)%\s*적립/);c&&(r=parseInt(c[1],10),o="적립",i="결제 시");const s=t.match(/([\d,]+)원\s*할인/);return s&&(r=w(s[1])||0,o="할인"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),{cardName:n,benefitAmount:r,benefitType:o||(t.includes("할인")?"할인":"적립"),condition:i}}function Eo(t,e){if(!e)return null;let n="",r=0,o="",i="";e.includes("신용카드")?n="신용카드":e.includes("체크카드")&&(n="체크카드"),t.includes("신한카드")&&(n=n?`11번가 신한 ${n}`:"11번가 신한카드");const c=e.match(/([\d,]+)원\s*할인/);c&&(r=w(c[1])||0,o="할인");const s=e.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);return s&&!o&&(r=parseFloat(s[1]),o="적립"),t.includes("첫 결제")?i="첫 결제 시":t.includes("결제 시")&&(i="결제 시"),!n||!r||!o?null:{cardName:n,benefitAmount:r,benefitType:o,condition:i}}const yo=t=>{const e=[],n=M.installment;try{const r=t.querySelector(n.dialogContainer);if(r&&(r.querySelectorAll(".card_box").forEach(i=>{const s=i.querySelector("dt")?.textContent?.trim()||"";if(!s)return;i.querySelectorAll("dd").forEach(d=>{const u=d.textContent?.trim()||"";if(!u)return;const p=_o(s,u);p&&e.push(p)})}),f.debug("card_box에서 할부 추출",{count:e.length})),e.length===0){const o=t.querySelector(n.triggerButton);if(o){const s=(o.textContent?.trim()||"").match(/최대\s*(\d+)개월\s*무이자/);s&&e.push({cardName:"__INSTALLMENT_SUMMARY__",maxMonths:parseInt(s[1],10),minAmount:null,months:`최대 ${s[1]}개월`,condition:"무이자 할부"})}Co(t).forEach(c=>{e.find(s=>s.cardName===c.cardName)||e.push(c)})}f.info("총 무이자 할부 카드",{count:e.length})}catch(r){f.error(T.PAR_E003,"무이자 할부 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function _o(t,e){if(!e)return null;const n=e.match(/([\d,]+)개월/);if(!n)return null;const r=n[1],i=r.split(",").map(u=>parseInt(u.trim(),10)).filter(u=>!isNaN(u)),c=i.length>0?Math.max(...i):0;if(c===0)return null;let s=null;const l=e.match(/(\d+)만원/);l&&(s=parseInt(l[1],10)*1e4);let d="";return e.includes("11pay")?d="11pay 결제 시":e.includes("카카오페이")?d="카카오페이 결제 시":s&&(d=`${s/1e4}만원 이상`),{cardName:t,maxMonths:c,minAmount:s,months:`${r}개월`,condition:d}}function Co(t){const e=[],n=["신한","KB국민","국민","비씨","BC","우리","현대","삼성","하나","롯데","농협","NH"];return t.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]').forEach(o=>{const i=o.textContent||"",c=i.match(/최대\s*(\d+)\s*개월\s*무이자/);c&&e.length===0&&e.push({cardName:"카드",maxMonths:parseInt(c[1],10),minAmount:null,months:`최대 ${c[1]}개월`,condition:"무이자 할부"}),n.forEach(s=>{if(i.includes(s)){const d=i.substring(i.indexOf(s)).match(/([\d,]+)개월/);if(d&&!e.find(p=>p.cardName.includes(s))){const p=d[1],x=p.split(",").map(h=>parseInt(h.trim(),10)),E=Math.max(...x.filter(h=>!isNaN(h)));e.push({cardName:`${s}카드`,maxMonths:E,minAmount:null,months:`${p}개월`,condition:""})}}})}),e}const So=t=>{const e=[],n=M.coupon;try{const r=t.querySelector(n.badge);if(r?.textContent){const i=r.textContent.trim(),c=Ao(i);c&&(e.push(c),f.debug("쿠폰 추출",{coupon:c}))}t.querySelectorAll(n.item).forEach(i=>{const c=i.querySelector(n.name),s=i.querySelector(n.discount);if(c||s){const l=c?.textContent?.trim()||"쿠폰",d=s?.textContent||"",u=d.includes("원")?w(d):null,p=d.includes("%")?w(d):null;e.push({name:l,discountAmount:u,discountRate:p})}})}catch(r){f.error(T.PAR_E003,"쿠폰 추출 오류",{error:r instanceof Error?r:new Error(String(r))})}return e};function Ao(t){if(!t)return null;const e=t.match(/([\d,]+)\s*원\s*(?:할인)?/);if(e)return{name:t,discountAmount:w(e[1]),discountRate:null};const n=t.match(/(\d+)\s*%\s*(?:할인)?/);return n?{name:t,discountAmount:null,discountRate:parseInt(n[1],10)}:{name:t,discountAmount:null,discountRate:null}}function un(t){const e=t.replace(/11번가\s*/g,"").trim(),n=[{keywords:["신한","SHINHAN"],name:"신한카드"},{keywords:["KB","국민","케이비"],name:"KB국민카드"},{keywords:["현대","HYUNDAI"],name:"현대카드"},{keywords:["삼성","SAMSUNG"],name:"삼성카드"},{keywords:["롯데","LOTTE"],name:"롯데카드"},{keywords:["하나","HANA"],name:"하나카드"},{keywords:["우리","WOORI"],name:"우리카드"},{keywords:["농협","NH"],name:"NH농협카드"},{keywords:["BC","비씨"],name:"BC카드"},{keywords:["씨티","CITI"],name:"씨티카드"}];for(const{keywords:r,name:o}of n)for(const i of r)if(e.toUpperCase().includes(i.toUpperCase()))return e.includes("신용카드")?`${o} (신용)`:e.includes("체크카드")?`${o} (체크)`:o;return e||t}function To(t,e){const n=t.map(r=>{const o=un(r.cardName),i=r.benefitType==="할인",c=r.benefitAmount<=100?r.benefitAmount:0;let s="";return i?s=`${r.benefitAmount.toLocaleString()}원 할인`:r.benefitAmount<=100?s=`${r.benefitAmount}% 적립`:s=`${r.benefitAmount.toLocaleString()}P 적립`,{card:o,cardName:o,benefit:s,discount:i?r.benefitAmount:0,rate:c,condition:r.condition,benefitType:i?"discount":"rate",pointAmount:0}});return e.forEach(r=>{if(r.cardName==="__INSTALLMENT_SUMMARY__")return;const o=un(r.cardName);n.push({card:o,cardName:o,benefit:`${r.months} 무이자`,discount:0,rate:0,condition:r.condition,benefitType:"installment",pointAmount:0})}),n}class An extends ye{siteName=xt.siteName;selectors={amount:[M.price.salePrice,M.price.salePriceAlt,M.price.maxDiscountPrice],title:[M.product.title,M.product.titleAlt],image:[M.image.main,M.image.mainAlt]};static isProductPage(e){if(!/11st\.co\.kr/.test(e))return!1;const o=![/11st\.co\.kr\/?$/,/11st\.co\.kr\/category/,/11st\.co\.kr\/search/,/11st\.co\.kr\/browsing/,/11st\.co\.kr\/best/,/11st\.co\.kr\/event$/,/11st\.co\.kr\/cart/,/11st\.co\.kr\/order/,/11st\.co\.kr\/my11st/,/11st\.co\.kr\/login/,/11st\.co\.kr\/member/].some(i=>i.test(e));return f.debug(`isProductPage("${e}") = ${o}`),o}static extractProductId(e){return ao(e)}parse(e){try{f.info("🔍 Parsing 11번가 page...");const n=so(e),r=co(e),o=Sn(e),i=lo(e),c=uo(e),s=po(e);let l=s.amount;const{originalPrice:d,discountPrice:u,maxDiscountPrice:p,discountRate:x,maxDiscountRate:E}=s;if(l||(l=fo(e)),!l)return f.debug("❌ No price found"),null;const h=mo(e),_=go(e),{points:S,cardBenefits:v,installments:H,coupons:K,totalPointAmount:A,totalCardBenefitAmount:ce,maxInstallmentMonths:X}=_,Ke=To(v,H),_e=[];return x&&_e.push({rate:x,type:"SALE_DISCOUNT",description:"할인가"}),h.forEach(Ce=>{_e.push({rate:Ce.amount,type:Ce.type.toUpperCase().replace(/\s+/g,"_"),description:Ce.type})}),f.info(`✅ Found: ${l.toLocaleString()} ${xt.currency}`),f.debug("파싱 결과",{title:n,totalPointAmount:A,cardBenefitsCount:v.length,installmentsCount:H.length,maxInstallmentMonths:X}),{price:l,amount:l,currency:xt.currency,title:n?`${n}${r?` ${r}`:""}`:void 0,imageUrl:o||void 0,images:i,originalPrice:d||void 0,discountPrice:u||p||void 0,discountRate:x||void 0,cardBenefits:Ke,discounts:_e,elevenst:{maxDiscountPrice:p,maxDiscountRate:E,maxInstallmentMonths:X,points:S,installments:H,coupons:K,totalPointAmount:A,totalCardBenefitAmount:ce,seller:c.seller,sellerRating:c.rating,discountDetails:h}}}catch(n){return f.error(T.PAR_E001,"11st parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const U={product:{title:"h1.itemtit",mainImage:".box__item-main-image img"},price:{discountPrice:".box__payment-discount .text__price strong",discountPriceAlt:"#paymentDiscountDetail-title .text__price",salePrice:".price_real",originalPrice:".text__price-original .text__price",discountRate:".text__discount-rate"},cardBenefit:{container:"#tooltip_gmarketcard",discountItem:".box__discount-item .list-item",discountItemTitle:".text__title",discountItemDesc:".text",discountItemPrice:".text__price"},additionalBenefits:{benefitItem:".list-item-point",benefitTitle:".box__information-title .box__information",benefitDetail:".list__reward-detail .list-item",benefitLabel:".text__label",benefitValue:".text__value"},shipping:{starDelivery:'.link__seller[href*="stardelivery"]',shippingInfo:".box__delivery"},seller:{brand:".text__brand .text",official:".text__official",seller:".text__seller"}},wo=t=>{const e=t.querySelector(U.product.title);if(e?.textContent){const n=e.textContent.trim();return f.debug("상품명",{title:n}),n}return f.warn("상품명을 찾을 수 없음"),null},vo=t=>{const e=t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]');for(const r of e){const i=r.src;if(i.includes("/still/600"))return f.debug("메인 이미지 (600px)",{src:i}),i}for(const r of e){const i=r.src;if(i.includes("/still/"))return f.debug("메인 이미지",{src:i}),i}const n=t.querySelector(U.product.mainImage);return n?.src?(f.debug("대체 이미지",{src:n.src}),n.src):(f.warn("상품 이미지를 찾을 수 없음"),null)},Po=t=>{const e=[];return t.querySelectorAll('img[src*="gdimg.gmarket.co.kr"]').forEach(r=>{let i=r.src;i.startsWith("//")&&(i=`https:${i}`),i&&!e.includes(i)&&!i.includes("/50?")&&!i.includes("/30?")&&e.push(i)}),f.debug("총 이미지",{count:e.length}),e},No=t=>{const e={},n=t.querySelector(U.seller.brand);n?.textContent&&(e.brand=n.textContent.trim());const r=t.querySelector(U.seller.official);e.isOfficial=!!r;const o=t.querySelector(U.seller.seller);return o?.textContent&&(e.seller=o.textContent.trim()),e},We=t=>{if(!t)return null;const e=t.replace(/[^0-9,]/g,"");return w(e)},ko=t=>{const e=U.price,n=t.querySelector(e.discountPrice);if(n?.textContent){const o=We(n.textContent);if(o)return f.debug("결제할인가",{price:o}),o}const r=t.querySelector(e.discountPriceAlt);if(r?.textContent){const o=We(r.textContent);if(o)return f.debug("결제할인가 (alt)",{price:o}),o}return null},Ro=t=>{const e=U.price,n=t.querySelector(e.salePrice);if(n?.textContent){const r=We(n.textContent);if(r)return f.debug("판매가",{price:r}),r}return null},Io=t=>{const e=U.price,n=t.querySelector(e.originalPrice);if(n?.textContent){const r=We(n.textContent);if(r)return f.debug("정가",{price:r}),r}return null},Do=t=>{const e=U.price,n=t.querySelector(e.discountRate);if(n?.textContent){const r=n.textContent.match(/(\d+)\s*%/);if(r){const o=parseInt(r[1],10);return f.debug("할인율",{rate:o}),o}}return null},Oo=t=>{f.debug("가격 정보 추출 시작...");const e=Io(t),n=Ro(t),r=ko(t),o=Do(t),i=r||n||e;return f.debug("가격 결과",{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}),{amount:i,originalPrice:e,salePrice:n,discountPrice:r,discountRate:o}},Mo=t=>{const e=t.querySelectorAll('.price, [class*="price"], .total, [class*="amount"]');for(const n of e){const r=n.textContent||"";if(r.includes("원")){const o=r.match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(o){const i=w(o[1]);if(i&&i>=1e3)return f.debug("DOM 스캔 가격",{price:i}),i}}}return null},Lo=t=>{const e=[],n=U.cardBenefit,r=t.querySelector(n.container);return r?(r.querySelectorAll(".gmarketcard_area img").forEach(i=>{const c=i,s=c.src,l=c.alt||"";if(s){let d=l;d||(s.includes("smile")||s.includes("Smile")?d="스마일카드":s.includes("samsung")?d="삼성카드":d="G마켓 제휴카드"),e.push({card:d,cardName:d,benefit:"G마켓 제휴카드 혜택",imageUrl:s}),f.debug("제휴카드",{cardName:d,src:s})}}),e):(f.debug("제휴카드 컨테이너를 찾을 수 없음"),e)},Bo=t=>{const e=[],n=U.cardBenefit;return t.querySelectorAll(n.discountItem).forEach(o=>{const i=o.querySelector(n.discountItemTitle),c=o.querySelector(n.discountItemDesc),s=o.querySelector(n.discountItemPrice),l=i?.textContent?.trim()||"",d=c?.textContent?.trim()||"";let u;if(s?.textContent){const p=s.textContent.match(/(\d{1,3}(?:,\d{3})*)/);p&&(u=parseInt(p[1].replace(/,/g,""),10))}l&&(e.push({title:l,description:d,discountPrice:u}),f.debug("결제 할인",{title:l,description:d}))}),e},Uo=t=>{f.debug("카드 혜택 추출 시작...");const e=[],n=Lo(t);e.push(...n),Bo(t).forEach(i=>{const c=i.title.match(/(삼성|현대|신한|KB|국민|롯데|하나|우리|농협|BC|스마일)(?:카드)?/i);if(c){const s=c[1].includes("카드")?c[1]:`${c[1]}카드`,l=i.title.match(/(\d+(?:\.\d+)?)\s*%/),d=l?parseFloat(l[1]):void 0;e.some(u=>u.cardName===s)||e.push({card:s,cardName:s,benefit:i.title,discount:d,rate:d})}});const o=t.querySelector(".box__payment-discount");if(o){const c=(o.textContent||"").match(/G마켓\s*삼성카드.*?(\d+)\s*%/i);if(c){const s=parseInt(c[1],10);e.some(l=>l.card==="G마켓 삼성카드")||e.push({card:"G마켓 삼성카드",cardName:"G마켓 삼성카드",benefit:`G마켓 삼성카드 결제 시 ${s}% 할인`,discount:s,rate:s})}}return e.sort((i,c)=>(c.discount??0)-(i.discount??0)),f.debug("최종 카드 혜택",{count:e.length,benefits:e}),e},zo=t=>{const e=U.additionalBenefits,r=t.querySelector(e.benefitTitle)?.textContent?.trim()||"";if(!r)return null;let o="etc";r.includes("신세계포인트")?o="shinsegae_point":r.includes("스마일페이")?o="smile_pay":r.includes("스마일캐시")?o="smile_cash":r.includes("OK캐쉬백")&&(o="ok_cashback");const i=[];return t.querySelectorAll(e.benefitDetail).forEach(s=>{const l=s.querySelector(e.benefitLabel),d=s.querySelector(e.benefitValue),u=l?.textContent?.trim()||"",p=d?.textContent?.trim()||"";u&&p&&i.push({label:u,value:p})}),f.debug("추가 혜택",{type:o,title:r}),{type:o,title:r,details:i}},Tn=t=>{f.debug("추가 혜택 추출 시작...");const e=[],n=U.additionalBenefits;return t.querySelectorAll(n.benefitItem).forEach(o=>{const i=zo(o);i&&e.push(i)}),f.debug("총 추가 혜택",{count:e.length}),e},Fo=t=>{const e=Tn(t);for(const n of e)for(const r of n.details){const o=r.value.match(/(\d+(?:,\d+)?)\s*(?:원|포인트)/);if(o)return{amount:parseInt(o[1].replace(/,/g,""),10),description:`${n.title}: ${r.value}`}}return null},qo=t=>{const e=U.shipping,r=!!t.querySelector(e.starDelivery),o=t.querySelector(e.shippingInfo),i=r?"스타배송":"일반배송";let c,s,l=!1;if(o){const d=o.textContent||"",u=d.match(/(\d{1,3}(?:,\d{3})*)\s*원/);u?c=`${u[1]}원`:d.includes("무료")&&(c="무료배송",l=!0);const p=d.match(/(\d+\/\d+|\d+일)/);p&&(s=p[1])}return f.debug("배송 정보",{method:i,isStarDelivery:r,fee:c}),{method:i,isStarDelivery:r,isFree:l,fee:c,estimatedDate:s}};class wn extends ye{siteName="Gmarket";selectors={amount:[U.price.discountPrice,U.price.salePrice,U.price.originalPrice]};static isCheckoutPage(e){if(!/gmarket\.co\.kr/.test(e))return!1;const o=![/gmarket\.co\.kr\/?$/,/gmarket\.co\.kr\/n\/category/,/gmarket\.co\.kr\/n\/search/,/gmarket\.co\.kr\/n\/best$/,/gmarket\.co\.kr\/n\/deals$/,/gmarket\.co\.kr\/n\/event$/,/gmarket\.co\.kr\/cart/,/gmarket\.co\.kr\/order/,/gmarket\.co\.kr\/my/,/gmarket\.co\.kr\/login/,/gmarket\.co\.kr\/join/].some(i=>i.test(e));return se.debug("isCheckoutPage check",{url:e,isCheckout:o}),o}parse(e){try{se.info("Parsing Gmarket page...");const n=wo(e),r=vo(e),o=Po(e),i=No(e),c=Oo(e);let s=c.amount;if(s||(s=Mo(e)),!s)return se.warn("No price found in Gmarket page"),null;const l=Uo(e),d=yn(l,s),u=_n(d),p=Tn(e),x=Fo(e),E=qo(e);return se.info("Parse successful",{amount:s,cardCount:u.length}),{price:s,amount:s,currency:"KRW",title:n||void 0,imageUrl:r||void 0,images:o,variants:[],originalPrice:c.originalPrice||void 0,discountPrice:c.discountPrice||void 0,cardBenefits:u,additionalBenefits:p.length>0?p:void 0,cashback:x||void 0,shippingInfo:E||void 0,sellerInfo:i||void 0,discounts:[]}}catch(n){return se.error(T.PAR_E002,"Gmarket parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const $o={amount:[".a-price-whole",'[data-a-color="price"]',".a-price",'[class*="price"]']};class vn extends ye{siteName="Amazon";selectors={amount:$o.amount};static isCheckoutPage(e){return/amazon\.(com|co\.uk|de|fr|it|es|ca|jp|cn|in|ae|sg|com\.br|com\.mx)/.test(e)}parse(e){try{f.info("🔍 Parsing Amazon page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(f.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return f.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return f.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:c}=this.extractCommonInfo(e);return f.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return f.error(T.PAR_E001,"Amazon parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Wo={amount:[".vi-VR-cvipPrice",'[id*="vi_ird_finalPrice"]',".vi-acc-del-range",'[class*="price"]']};class Pn extends ye{siteName="eBay";selectors={amount:Wo.amount};static isCheckoutPage(e){return/ebay\.(com|co\.uk|de|fr|it|es|ca)/.test(e)}parse(e){try{f.info("🔍 Parsing eBay page...");let n=this.getTextBySelectors(e,this.selectors.amount);if(n||(f.debug("Trying full DOM search..."),n=this.searchPriceInDOM(e,/\$[\d,]+\.?\d*/)),!n)return f.debug("❌ Amount not found"),null;const r=this.extractNumber(n);if(!r||!this.isValidPrice(r))return f.debug("❌ Invalid amount",{amount:r}),null;const o=this.extractCurrency(n),{title:i,imageUrl:c}=this.extractCommonInfo(e);return f.info(`✅ Found: ${r} ${o}`),{price:r,amount:r,currency:o,title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return f.error(T.PAR_E001,"eBay parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}const Ho={amount:[]};class Nn extends ye{siteName="Fallback";selectors={amount:Ho.amount};parse(e){try{f.info("🔍 Fallback parsing (text heuristic)...");const r=(e.body?.textContent||"").match(/(\d{1,3}(?:,\d{3})*)\s*원/);if(!r)return f.debug('❌ No price with "원" found'),null;const o=this.extractNumber(r[1]);if(!o||!this.isValidPrice(o))return f.debug("❌ Invalid amount",{amount:o}),null;const{title:i,imageUrl:c}=this.extractCommonInfo(e);return f.info(`✅ Found: ${o} KRW (via text heuristic)`),{price:o,amount:o,currency:"KRW",title:i||void 0,imageUrl:c||void 0,discounts:[]}}catch(n){return f.error(T.PAR_E001,"Fallback parse error",{error:n instanceof Error?n:new Error(String(n))}),null}}}function Go(t){return Cn.isCheckoutPage(t)?{site:"coupang",isCheckout:!0}:An.isProductPage(t)?{site:"11st",isCheckout:!0}:wn.isCheckoutPage(t)?{site:"gmarket",isCheckout:!0}:vn.isCheckoutPage(t)?{site:"amazon",isCheckout:!0}:Pn.isCheckoutPage(t)?{site:"ebay",isCheckout:!0}:null}function Ko(t){switch(t){case"coupang":return new Cn;case"11st":return new An;case"gmarket":return new wn;case"amazon":return new vn;case"ebay":return new Pn;default:return new Nn}}function jo(){return new Nn}function kn(){const t=window.location.href,e=Go(t);if(!e)return k.debug(R.PARSER,"Not a supported page",{url:t}),null;k.info(R.PARSER,`Site detected: ${e.site}`,{url:t});let r=Ko(e.site).parse(document);return!r&&(k.warn(R.PARSER,"Primary parser failed, trying fallback",{site:e.site}),r=jo().parse(document),!r)?(k.error(R.PARSER,T.PAR_E002,"Fallback parser also failed",{data:{site:e.site,url:t}}),null):(k.info(R.PARSER,"Parse successful",{title:r.title?.substring(0,50),amount:r.amount,cardBenefitsCount:r.cardBenefits?.length??0}),{paymentInfo:r,site:e.site})}function Rn(t,e="initial"){const n=e==="initial"?"SAVE_PRODUCT_DATA":"UPDATE_PRODUCT_DATA";if(!chrome?.runtime?.sendMessage){at.warn("Chrome extension API not available",{messageType:n,source:e});return}chrome.runtime.sendMessage({type:n,data:t,url:window.location.href,timestamp:Date.now(),source:e},r=>{if(chrome.runtime.lastError){at.warn("Failed to send message to background",{error:chrome.runtime.lastError.message,messageType:n,source:e});return}r?.success&&at.debug("Product data saved",{source:e,messageType:n})})}function In(t,e){let n=null;const r=(...o)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...o),n=null},e)};return r.cancel=()=>{n&&(clearTimeout(n),n=null)},r}const Yo=500;function Vo(t){let e=!1,n=null,r=!1;const o=In(s=>{r||(te.info("Dynamic content detected",{reason:s}),t(`dynamic-${s}`)||te.warn("Dynamic reparse produced no result"))},Yo),i=s=>{if(r)return;const l=s.some(E=>Array.from(E.addedNodes).some(h=>h instanceof Element?h.tagName==="IFRAME"||!!h.querySelector("iframe"):!1)),d=!e&&s.some(E=>Array.from(E.addedNodes).some(h=>h instanceof Element?h.classList.contains("benefit")||!!h.querySelector(".benefit")||h.closest(".other_benefits")&&(h.querySelector("dt")||h.querySelector("dd")):!1)),u=document.querySelector(".other_benefits .benefit dt");if(!(d&&u||l))return;d&&(e=!0),o(l?"iframe":"benefit-content"),l&&(c(),te.debug("Observer disconnected after iframe detection"))},c=()=>{r||(r=!0,n&&(n.disconnect(),n=null),te.debug("DynamicContentObserver cleaned up"))};return document.body?(n=new MutationObserver(i),n.observe(document.body,{childList:!0,subtree:!0}),c):(te.warn("document.body not available, observer not started"),c)}const Xo=500,Zo=[".additional_benefits button",'[data-log-actionid*="무이자"]','[onclick*="additionalBenefit"]','.c_product_btn[aria-controls*="Benefit"]','button[class*="benefit"]'],Jo=()=>!!document.querySelector(".other_benefits .benefit dt");function Qo(t){if(!window.location.hostname.includes("11st.co.kr"))return()=>{};te.info("Setting up 11번가 benefit watcher");let e=!1,n=null,r=null;const o=new Map,i=In(d=>{e||Jo()&&(te.info("Benefit content found",{source:d}),t(d))},Xo),c=new WeakSet,s=()=>{e||Zo.forEach(d=>{document.querySelectorAll(d).forEach(p=>{if(c.has(p))return;c.add(p);const x=()=>{te.debug("Benefit button clicked"),setTimeout(()=>i("benefit-click"),800)};o.set(p,x),p.addEventListener("click",x)})})};s(),r=new MutationObserver(()=>{s()}),document.body&&r.observe(document.body,{childList:!0,subtree:!0}),n=setTimeout(()=>{r&&!e&&(r.disconnect(),r=null,te.debug("Benefit button observer disconnected (timeout)"))},5e3);const l=()=>{e||(e=!0,n&&(clearTimeout(n),n=null),r&&(r.disconnect(),r=null),o.forEach((d,u)=>{u.removeEventListener("click",d)}),o.clear(),te.debug("ElevenStreetBenefitWatcher cleaned up"))};return window.addEventListener("beforeunload",l,{once:!0}),l}async function Dn(t){const{productUrl:e,productName:n,currentPrice:r,site:o}=t;try{if(k.info(R.NETWORK,"💰 [LOWEST_PRICE] Initiating price comparison",{url:e,product:n,currentPrice:r,site:o,timestamp:new Date().toISOString()}),m.comparison={status:"loading",query:n,error:null,data:null},ee(),!chrome?.runtime?.sendMessage){k.error(R.NETWORK,T.NET_E002,"Chrome extension API not available",{}),m.comparison={status:"error",query:n,error:"Chrome extension API를 사용할 수 없습니다.",data:null},ee();return}k.debug(R.NETWORK,"[LOWEST_PRICE] Checking server health...");const i=await chrome.runtime.sendMessage({type:"CHECK_COMPARISON_SERVER"});if(!i?.success){k.error(R.NETWORK,T.NET_E002,"[LOWEST_PRICE] Server not available",{error:i?.error||"Server check failed"}),m.comparison={status:"error",query:n,error:i?.error||"가격 비교 서버가 실행 중이 아닙니다.",data:null},ee();return}k.info(R.NETWORK,"[LOWEST_PRICE] Server healthy, sending comparison request");const c=await chrome.runtime.sendMessage({type:"COMPARE_PRICES",query:n,currentPrice:r,currentUrl:e});c?.success?(k.info(R.NETWORK,"✅ [LOWEST_PRICE] Price comparison completed",{resultCount:c.data?.results?.length||0,fromCache:c.data?.fromCache,totalDuration:c.data?.totalDuration}),m.comparison={status:"success",query:n,error:null,data:c.data},ee()):(k.warn(R.NETWORK,"[LOWEST_PRICE] Price comparison failed",{error:c?.error}),m.comparison={status:"error",query:n,error:c?.error||"가격 비교 검색 실패",data:null},ee())}catch(i){k.error(R.NETWORK,T.NET_E002,"[LOWEST_PRICE] Request error",{error:i instanceof Error?i:new Error(String(i))}),m.comparison={status:"error",query:n,error:i instanceof Error?i.message:"알 수 없는 오류",data:null},ee()}}async function On(t,e=1500,n=!1){const r=t.persist;r&&(r.hasHydrated?.()&&!n||await new Promise(o=>{let i=!1;const c=window.setTimeout(()=>{i||(i=!0,o())},e),s=r.onFinishHydration?.(()=>{i||(i=!0,window.clearTimeout(c),s&&s(),o())});try{r.rehydrate?.()}catch{}}))}const ei=window.self===window.top;let dn=!1,ie=null;const He=[];function Ge(t,e){return{...t,site:e}}function pn(t){const e=kn();return e?(ie=e,St(Ge(e.paymentInfo,e.site)),Rn(e.paymentInfo,t),!0):!1}function ti(){const t=kn();if(!t){k.warn(R.BOOTSTRAP,"Failed to extract payment info on init");return}ie=t,bn(Ge(t.paymentInfo,t.site)),Rn(t.paymentInfo,"initial"),(async()=>{await On(de);const e=de.getState();if(St(Ge(t.paymentInfo,t.site)),k.info(R.BOOTSTRAP,"⚙️ Display mode check",{displayMode:e.displayMode,autoFetchLowestPrice:e.autoFetchLowestPrice,hasTitle:!!t.paymentInfo.title}),e.displayMode==="lowest-price"){if(!t.paymentInfo.title){k.warn(R.BOOTSTRAP,"⚠️ [LOWEST_PRICE] Cannot fetch: no product title");return}e.autoFetchLowestPrice?(k.info(R.BOOTSTRAP,"🚀 [LOWEST_PRICE] Auto fetch enabled",{displayMode:e.displayMode,productTitle:t.paymentInfo.title.substring(0,50)}),Dn({productUrl:window.location.href,productName:t.paymentInfo.title,currentPrice:t.paymentInfo.amount,site:t.site})):k.info(R.BOOTSTRAP,"⏸️ [LOWEST_PRICE] Manual mode (will fetch when panel opens)",{displayMode:e.displayMode})}else k.debug(R.BOOTSTRAP,"💳 Card benefits mode selected")})()}function ni(){He.forEach(t=>{try{t()}catch(e){k.warn(R.BOOTSTRAP,"Cleanup error",{error:e})}}),He.length=0}function ri(){if(!ei||dn)return;dn=!0,k.info(R.BOOTSTRAP,"Content script starting"),ti(),chrome?.storage?.onChanged&&chrome.storage.onChanged.addListener((n,r)=>{r==="local"&&(!n||!Object.prototype.hasOwnProperty.call(n,Vn.SETTINGS)||(async()=>{await On(de,1500,!0);const o=de.getState();ie&&St(Ge(ie.paymentInfo,ie.site)),o.displayMode==="lowest-price"&&o.autoFetchLowestPrice&&ie?.paymentInfo?.title&&Dn({productUrl:window.location.href,productName:ie.paymentInfo.title,currentPrice:ie.paymentInfo.amount,site:ie.site})})())});const t=Vo(n=>pn(n));He.push(t);const e=Qo(n=>{pn(n)});He.push(e),window.addEventListener("beforeunload",ni,{once:!0})}Jn(ri);
