import(chrome.runtime.getURL("content.js")).then(()=>{console.warn("[PicSel] content.js loaded via dynamic import")}).catch(o=>{console.error("[PicSel] Failed to load content.js",o)});
