!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${i}--\x3e`,n=new RegExp(`${i}|${r}`),o="$lit$";class s{constructor(e,t){this.parts=[],this.element=t;const r=[],s=[],l=document.createTreeWalker(t.content,133,null,!1);let h=0,p=-1,u=0;const{strings:m,values:{length:f}}=e;for(;u<f;){const e=l.nextNode();if(null!==e){if(p++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let r=0;for(let e=0;e<i;e++)a(t[e].name,o)&&r++;for(;r-- >0;){const t=m[u],i=c.exec(t)[2],r=i.toLowerCase()+o,s=e.getAttribute(r);e.removeAttribute(r);const a=s.split(n);this.parts.push({type:"attribute",index:p,name:i,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,s=t.split(n),l=s.length-1;for(let t=0;t<l;t++){let r,n=s[t];if(""===n)r=d();else{const e=c.exec(n);null!==e&&a(e[2],o)&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-o.length)+e[3]),r=document.createTextNode(n)}i.insertBefore(r,e),this.parts.push({type:"node",index:++p})}""===s[l]?(i.insertBefore(d(),e),r.push(e)):e.data=s[l],u+=l}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&p!==h||(p++,t.insertBefore(d(),e)),h=p,this.parts.push({type:"node",index:p}),null===e.nextSibling?e.data="":(r.push(e),p--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=s.pop()}for(const e of r)e.parentNode.removeChild(e)}}const a=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:i},parts:r}=e,n=document.createTreeWalker(i,133,null,!1);let o=u(r),s=r[o],a=-1,l=0;const d=[];let c=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==s&&s.index===a;)s.index=null!==c?-1:s.index-l,o=u(r,o),s=r[o]}d.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},u=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1};const m=new WeakMap,f=e=>"function"==typeof e&&m.has(e),g={},_={};class b{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],r=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let o,s=0,a=0,d=n.nextNode();for(;s<r.length;)if(o=r[s],l(o)){for(;a<o.index;)a++,"TEMPLATE"===d.nodeName&&(i.push(d),n.currentNode=d.content),null===(d=n.nextNode())&&(n.currentNode=i.pop(),d=n.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,o.name,o.strings,this.options));s++}else this.__parts.push(void 0),s++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),v=` ${i} `;class w{constructor(e,t,i,r){this.strings=e,this.values=t,this.type=i,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let s=0;s<e;s++){const e=this.strings[s],a=e.lastIndexOf("\x3c!--");n=(a>-1||n)&&-1===e.indexOf("--\x3e",a+1);const l=c.exec(e);t+=null===l?e+(n?v:r):e.substr(0,l.index)+l[1]+l[2]+o+l[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==y&&(t=y.createHTML(t)),e.innerHTML=t,e}}const A=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class C{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let r="";for(let n=0;n<t;n++){r+=e[n];const t=i[n];if(void 0!==t){const e=t.value;if(A(e)||!x(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||A(e)&&e===this.value||(this.value=e,f(e)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class E{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(A(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===_?(this.value=_,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===t)this.value.update(e.values);else{const i=new b(t,e.processor,this.options),r=i._clone();i.update(e.values),this.__commitNode(r),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,r=0;for(const n of e)i=t[r],void 0===i&&(i=new E(this.options),t.push(i),0===r?i.appendIntoPart(this):i.insertAfterPart(t[r-1])),i.setValue(n),i.commit(),r++;r<t.length&&(t.length=r,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class T{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class P extends C{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new I(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class I extends S{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class O{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=R(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const R=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function N(e){let t=z.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},z.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const n=e.strings.join(i);return r=t.keyString.get(n),void 0===r&&(r=new s(e,e.getTemplateElement()),t.keyString.set(n,r)),t.stringsArray.set(e.strings,r),r}const z=new Map,D=new WeakMap;const M=new class{handleAttributeExpressions(e,t,i,r){const n=t[0];if("."===n){return new P(e,t.slice(1),i).parts}if("@"===n)return[new O(e,t.slice(1),r.eventContext)];if("?"===n)return[new T(e,t.slice(1),i)];return new C(e,t,i).parts}handleTextExpression(e){return new E(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const L=(e,...t)=>new w(e,t,"html",M),F=(e,t)=>`${e}--${t}`;let H=!0;void 0===window.ShadyCSS?H=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),H=!1);const $=e=>t=>{const r=F(t.type,e);let n=z.get(r);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},z.set(r,n));let o=n.stringsArray.get(t.strings);if(void 0!==o)return o;const a=t.strings.join(i);if(o=n.keyString.get(a),void 0===o){const i=t.getTemplateElement();H&&window.ShadyCSS.prepareTemplateDom(i,e),o=new s(t,i),n.keyString.set(a,o)}return n.stringsArray.set(t.strings,o),o},B=["html","svg"],U=new Set,V=(e,t,i)=>{U.add(e);const r=i?i.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(r,e);const s=document.createElement("style");for(let e=0;e<o;e++){const t=n[e];t.parentNode.removeChild(t),s.textContent+=t.textContent}(e=>{B.forEach((t=>{const i=z.get(F(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),h(e,i)}))}))})(e);const a=r.content;i?function(e,t,i=null){const{element:{content:r},parts:n}=e;if(null==i)return void r.appendChild(t);const o=document.createTreeWalker(r,133,null,!1);let s=u(n),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=p(t),i.parentNode.insertBefore(t,i));-1!==s&&n[s].index===l;){if(a>0){for(;-1!==s;)n[s].index+=a,s=u(n,s);return}s=u(n,s)}}(i,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(r,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(s,a.firstChild);const e=new Set;e.add(s),h(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const G={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},q=(e,t)=>t!==e&&(t==t||e==e),j={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:q},W="finalized";class Y extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const r=this._attributeNameForProperty(i,t);void 0!==r&&(this._attributeToPropertyMap.set(r,i),e.push(r))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=j){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const n=this[e];this[t]=r,this.requestUpdateInternal(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||j}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(W)||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=q){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,r=t.converter||G,n="function"==typeof r?r:r.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,r=t.converter;return(r&&r.toAttribute||G.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=j){const r=this.constructor,n=r._attributeNameForProperty(e,i);if(void 0!==n){const e=r._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,r=i._attributeToPropertyMap.get(e);if(void 0!==r){const e=i.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let r=!0;if(void 0!==e){const n=this.constructor;i=i||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Y.finalized=!0;const J=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class X{constructor(e,t){if(t!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(J?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Z=(e,...t)=>{const i=t.reduce(((t,i,r)=>t+(e=>{if(e instanceof X)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[r+1]),e[0]);return new X(i,K)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Q={};class ee extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),r=[];i.forEach((e=>r.unshift(e))),this._styles=r}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!J){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new X(String(t),K)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?J?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Q&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Q}}var te;ee.finalized=!0,ee.render=(e,i,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const n=r.scopeName,o=D.has(i),s=H&&11===i.nodeType&&!!i.host,a=s&&!U.has(n),l=a?document.createDocumentFragment():i;if(((e,i,r)=>{let n=D.get(i);void 0===n&&(t(i,i.firstChild),D.set(i,n=new E(Object.assign({templateFactory:N},r))),n.appendInto(i)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:$(n)},r)),a){const e=D.get(l);D.delete(l);const r=e.value instanceof b?e.value.template:void 0;V(n,l,r),t(i,i.firstChild),i.appendChild(l),D.set(i,e)}!o&&s&&window.ShadyCSS.styleElement(i.host)},ee.shadowRootOptions={mode:"open"};const ie=globalThis.trustedTypes,re=ie?ie.createPolicy("lit-html",{createHTML:e=>e}):void 0,ne=`lit$${(Math.random()+"").slice(9)}$`,oe="?"+ne,se=`<${oe}>`,ae=document,le=(e="")=>ae.createComment(e),de=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ce=Array.isArray,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,ue=/>/g,me=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,fe=/'/g,ge=/"/g,_e=/^(?:script|style|textarea)$/i,be=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),ye=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),we=new WeakMap,Ae=(e,t,i)=>{var r,n;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let s=o._$litPart$;if(void 0===s){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=s=new Pe(t.insertBefore(le(),e),e,void 0,null!=i?i:{})}return s._$AI(e),s},xe=ae.createTreeWalker(ae,129,null,!1),Ce=(e,t)=>{const i=e.length-1,r=[];let n,o=2===t?"<svg>":"",s=he;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,l=s.exec(i),null!==l);)c=s.lastIndex,s===he?"!--"===l[1]?s=pe:void 0!==l[1]?s=ue:void 0!==l[2]?(_e.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=me):void 0!==l[3]&&(s=me):s===me?">"===l[0]?(s=null!=n?n:he,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?me:'"'===l[3]?ge:fe):s===ge||s===fe?s=me:s===pe||s===ue?s=he:(s=me,n=void 0);const h=s===me&&e[t+1].startsWith("/>")?" ":"";o+=s===he?i+se:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+ne+h):i+ne+(-2===d?(r.push(void 0),t):h)}const a=o+(e[i]||"<?>")+(2===t?"</svg>":"");return[void 0!==re?re.createHTML(a):a,r]};class Se{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,o=0;const s=e.length-1,a=this.parts,[l,d]=Ce(e,t);if(this.el=Se.createElement(l,i),xe.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=xe.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(ne)){const i=d[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+"$lit$").split(ne),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?ke:"?"===t[1]?Re:"@"===t[1]?Ne:Ie})}else a.push({type:6,index:n})}for(const t of e)r.removeAttribute(t)}if(_e.test(r.tagName)){const e=r.textContent.split(ne),t=e.length-1;if(t>0){r.textContent=ie?ie.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],le()),xe.nextNode(),a.push({type:2,index:++n});r.append(e[t],le())}}}else if(8===r.nodeType)if(r.data===oe)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=r.data.indexOf(ne,e+1));)a.push({type:7,index:n}),e+=ne.length-1}n++}}static createElement(e,t){const i=ae.createElement("template");return i.innerHTML=e,i}}function Ee(e,t,i=e,r){var n,o,s,a;if(t===ye)return t;let l=void 0!==r?null===(n=i._$Cl)||void 0===n?void 0:n[r]:i._$Cu;const d=de(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(s=(a=i)._$Cl)&&void 0!==s?s:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(t=Ee(e,l._$AS(e,t.values),l,r)),t}class Te{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:ae).importNode(i,!0);xe.currentNode=n;let o=xe.nextNode(),s=0,a=0,l=r[0];for(;void 0!==l;){if(s===l.index){let t;2===l.type?t=new Pe(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new ze(o,this,e)),this.v.push(t),l=r[++a]}s!==(null==l?void 0:l.index)&&(o=xe.nextNode(),s++)}return n}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Pe{constructor(e,t,i,r){var n;this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=null===(n=null==r?void 0:r.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ee(this,e,t),de(e)?e===ve||null==e||""===e?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==ye&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.S(e):(e=>{var t;return ce(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==ve&&de(this._$AH)?this._$AA.nextSibling.data=e:this.S(ae.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,n="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=Se.createElement(r.h,this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.m(i);else{const e=new Te(n,this),t=e.p(this.options);e.m(i),this.S(t),this._$AH=e}}_$AC(e){let t=we.get(e.strings);return void 0===t&&we.set(e.strings,t=new Se(e)),t}M(e){ce(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new Pe(this.A(le()),this.A(le()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Ie{constructor(e,t,i,r,n){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ve}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const n=this.strings;let o=!1;if(void 0===n)e=Ee(this,e,t,0),o=!de(e)||e!==this._$AH&&e!==ye,o&&(this._$AH=e);else{const r=e;let s,a;for(e=n[0],s=0;s<n.length-1;s++)a=Ee(this,r[i+s],t,s),a===ye&&(a=this._$AH[s]),o||(o=!de(a)||a!==this._$AH[s]),a===ve?e=ve:e!==ve&&(e+=(null!=a?a:"")+n[s+1]),this._$AH[s]=a}o&&!r&&this.k(e)}k(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ke extends Ie{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===ve?void 0:e}}const Oe=ie?ie.emptyScript:"";class Re extends Ie{constructor(){super(...arguments),this.type=4}k(e){e&&e!==ve?this.element.setAttribute(this.name,Oe):this.element.removeAttribute(this.name)}}class Ne extends Ie{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Ee(this,e,t,0))&&void 0!==i?i:ve)===ye)return;const r=this._$AH,n=e===ve&&r!==ve||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==ve&&(r===ve||n);n&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ze{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ee(this,e)}}const De=window.litHtmlPolyfillSupport;null==De||De(Se,Pe),(null!==(te=globalThis.litHtmlVersions)&&void 0!==te?te:globalThis.litHtmlVersions=[]).push("2.0.2");class Me{static prepareOutgoingData(e){return JSON.stringify(e)}constructor(e){if(!e)throw new Error("Source must be spcified");if(!this.constructor.type)throw new Error("Type not defined");if(this.constructor.name||console.warn("No name provided"),this.constructor.description||console.warn("No description provided"),!this.sendMessage)throw new Error("A new target requires a sendMessage method")}}const Le={},Fe={};class He{static registerPlugin(e,t){return e.init(He,t),He}static registerTargetType(e,t){if(e in Fe)throw new Error("Target type has already been registered");if(!(t.prototype instanceof Me))throw new Error("Target constructors must inherit from the Target base class");return Fe[e]=t,He}static registerEpmlMessageType(e,t){return Le[e]=t,He}registerPlugin(e){return e.init(this),this}static handleMessage(e,t){const i=He.prepareIncomingData(e);"EpmlMessageType"in i&&Le[i.EpmlMessageType](i,t,this)}static prepareIncomingData(e){return"string"!=typeof e?e:JSON.parse(e)}static createTargets(e){Array.isArray(e)||(e=[e]);const t=[];for(const i of e)void 0===i.allowObjects&&(i.allowObjects=!1),t.push(...He.createTarget(i));return t}static createTarget(e){if(!Fe[e.type])throw new Error(`Target type '${e.type}' not registered`);let t=new Fe[e.type](e.source);Array.isArray(t)||(t=[t]);for(const i of t)i.allowObjects=e.allowObjects;return t}constructor(e){this.targets=this.constructor.createTargets(e)}}var $e=(e,t)=>{for(t=e="";e++<36;t+=51*e&52?(15^e?8^Math.random()*(20^e?16:4):4).toString(16):"-");return t};const Be="EPML_READY_STATE_CHECK",Ue="EPML_READY_STATE_CHECK_RESPONSE",Ve={},Ge={init:(e,t)=>{if(e.prototype.ready)throw new Error("Epml.prototype.ready is already defined");if(e.prototype.imReady)throw new Error("Epml.prototype.imReady is already defined");e.prototype.ready=We,e.prototype.resetReadyCheck=Ye,e.prototype.imReady=je,e.registerEpmlMessageType(Be,qe),e.registerEpmlMessageType(Ue,Ke)}};function qe(e,t){t._i_am_ready&&t.sendMessage({EpmlMessageType:Ue,requestID:e.requestID})}function je(){for(const e of this.targets)e._i_am_ready=!0}function We(){return this._ready_plugin=this._ready_plugin||{},this._ready_plugin.pendingReadyResolves=this._ready_plugin.pendingReadyResolves?this._ready_plugin.pendingReadyResolves:[],this._pending_ready_checking||(this._pending_ready_checking=!0,Je.call(this,this.targets).then((()=>{this._ready_plugin.pendingReadyResolves.forEach((e=>e()))}))),new Promise((e=>{this._ready_plugin.isReady?e():this._ready_plugin.pendingReadyResolves.push(e)}))}function Ye(){this._ready_plugin=this._ready_plugin||{},this._ready_plugin.isReady=!1}function Je(e){return this._ready_plugin=this._ready_plugin||{},this._ready_plugin.pendingReadyResolves=[],Promise.all(e.map((e=>new Promise(((t,i)=>{const r=$e(),n=setInterval((()=>{e.sendMessage({EpmlMessageType:Be,requestID:r})}),15);Ve[r]=()=>{clearInterval(n),t()}}))))).then((()=>{this._ready_plugin.isReady=!0}))}function Ke(e,t){t._ready_plugin=t._ready_plugin||{},t._ready_plugin._is_ready=!0,Ve[e.requestID]()}const Xe=new Map;class Ze extends Me{static get sources(){return Array.from(Xe.keys())}static get targets(){return Array.from(Xe.values())}static getTargetFromSource(e){return Xe.get(e)}static hasTarget(e){return Xe.has(e)}static get type(){return"WINDOW"}static get name(){return"Content window plugin"}static get description(){return"Allows Epml to communicate with iframes and popup windows."}static test(e){return"object"==typeof e&&e===e.self}isFrom(e){}constructor(e){if(super(e),Xe.has(e))return Xe.get(e);if(!this.constructor.test(e))throw new Error("Source can not be used with target");this._source=e,this._sourceOrigin="*",Xe.set(e,this)}get source(){return this._source}sendMessage(e){e=Me.prepareOutgoingData(e),this._source.postMessage(e,this._sourceOrigin)}}var Qe={init:function(e){!function(e,t,i){if(e.addEventListener)e.addEventListener(t,i,!1);else{if(!e.attachEvent)throw new Error("Could not bind event.");e.attachEvent("on"+t,i)}}(window,"message",(t=>{Ze.hasTarget(t.source)&&e.handleMessage(t.data,Ze.getTargetFromSource(t.source))})),e.registerTargetType(Ze.type,Ze)}};const et="REQUEST",tt="REQUEST_RESPONSE",it=new Map,rt={},nt={init:(e,t)=>{if(e.prototype.request)throw new Error("Epml.prototype.request is already defined");if(e.prototype.route)throw new Error("Empl.prototype.route is already defined");e.prototype.request=ot,e.prototype.route=lt,e.registerEpmlMessageType(et,at),e.registerEpmlMessageType(tt,st)}},ot=function(e,t,i){return Promise.all(this.targets.map((r=>{const n=$e(),o={EpmlMessageType:et,requestOrResponse:"request",requestID:n,requestType:e,data:t};return r.sendMessage(o),new Promise(((e,t)=>{let r;i&&(r=setTimeout((()=>{delete rt[n],t(new Error("Request timed out"))}),i)),rt[n]=(...t)=>{r&&clearTimeout(r),e(...t)}}))}))).then((e=>{if(1===this.targets.length)return e[0]}))};function st(e,t,i){if(e.requestID in rt){const t=e.data;rt[e.requestID](t)}else console.warn("requestID not found in pendingRequests")}function at(e,t){if(!it.has(t))return void console.warn("Route does not exist - missing target");const i=it.get(t)[e.requestType];i?i(e,t):console.warn("Route does not exist")}function lt(e,t){if(this.routes||(this.routes={}),!this.routes[e])for(const i of this.targets){it.has(i)||it.set(i,{});it.get(i)[e]=(e,i)=>{Promise.resolve(t(e)).catch((e=>e instanceof Error?e.message:e)).then((t=>{i.sendMessage({data:t,EpmlMessageType:tt,requestOrResponse:"request",requestID:e.requestID})}))}}}const dt="PROXY_MESSAGE",ct=new class{constructor(e){this._map=e||new Map,this._revMap=new Map,this._map.forEach(((e,t)=>{this._revMap.set(t,e)}))}values(){return this._map.values()}entries(){return this._map.entries()}push(e,t){this._map.set(e,t),this._revMap.set(t,e)}getByKey(e){return this._map.get(e)}getByValue(e){return this._revMap.get(e)}hasKey(e){return this._map.has(e)}hasValue(e){return this._revMap.has(e)}deleteByKey(e){const t=this._map.get(e);this._map.delete(e),this._revMap.delete(t)}deleteByValue(e){const t=this._revMap.get(e);this._map.delete(t),this._revMap.delete(e)}};class ht extends Me{static get proxySources(){return ct}static get sources(){for(const[e,t]of ct)for(const[e]of t);Array.from(ct.entries()).map(((e,t)=>({proxy:e,target:Array.from(t.keys())[0]})))}static get targets(){return Array.from(ct.values())}static getTargetFromSource(e){return ct.getByValue(e)}static hasTarget(e){return ct.hasValue(e)}static get type(){return"PROXY"}static get name(){return"Proxy target"}static get description(){return"Uses other target, and proxies requests, allowing things like iframes to communicate through their host"}static test(e){return"object"==typeof e&&e.proxy instanceof this.Epml}isFrom(e){}constructor(e){if(super(e),this.constructor.proxySources.push(e.id,this),!this.constructor.test(e))throw new Error("Source can not be used with target");this._source=e}get source(){return this._source}sendMessage(e){const t=$e();e=Me.prepareOutgoingData(e),e={EpmlMessageType:dt,state:"TRANSIT",requestID:t,target:this._source.target,message:e,id:this._source.id},this._source.proxy.targets[0].sendMessage(e)}}const pt=ht.proxySources;let ut;var mt={init:function(e){Object.defineProperty(ht,"Epml",{get:()=>e}),ut=e,e.registerTargetType(ht.type,ht),e.registerProxyInstance=gt,e.registerEpmlMessageType(dt,ft)}};function ft(e,t){if("TRANSIT"===e.state){const t=pt.getByKey(e.target);if(!t)return void console.warn(`Target ${e.target} not registered.`);e.state="DELIVERY",t.targets.forEach((t=>t.sendMessage(e)))}else if("DELIVERY"===e.state){if(!pt.getByKey(e.target))return void console.warn(`Target ${e.target} not registered.`);const t=pt.getByKey(e.target);ut.handleMessage(e.message,t)}}function gt(e,t){pt.hasKey(e)&&console.warn(`${e} is already defined. Overwriting...`),pt.push(e,t)}const _t="STREAM_UPDATE",bt={};class yt{static get streams(){return bt}constructor(e,t=(()=>{})){if(this._name=e,this.targets=[],this._subscriptionFn=t,e in bt)return console.warn(`Stream with name ${e} already exists! Returning it instead`),bt[e];bt[e]=this}async subscribe(e){e in this.targets&&console.info("Target is already subscribed to this stream");const t=await this._subscriptionFn();this._sendMessage(t,e),this.targets.push(e)}_sendMessage(e,t){t.sendMessage({data:Me.prepareOutgoingData(e),EpmlMessageType:_t,streamName:this._name})}emit(e){this.targets.forEach((t=>this._sendMessage(e,t)))}}const vt="JOIN_STREAM",wt={},At={init:(e,t)=>{if(e.prototype.subscribe)throw new Error("Epml.prototype.subscribe is already defined");if(e.prototype.createStream)throw new Error("Empl.prototype.createStream is already defined");e.prototype.subscribe=Ct,e.registerEpmlMessageType(vt,xt),e.registerEpmlMessageType(_t,St)}},xt=function(e,t){const i=e.data.name,r=yt.streams[i];r?r.subscribe(t):console.warn(`No stream with name ${i}`,this)},Ct=function(e,t){this.targets.forEach((t=>{t.sendMessage({EpmlMessageType:vt,data:{name:e}})})),wt[e]=wt[e]||[],wt[e].push(t)},St=function(e,t){wt[e.streamName].forEach((t=>t(e.data)))};He.registerPlugin(nt),He.registerPlugin(Ge),He.registerPlugin(Qe),He.registerPlugin(At),He.registerPlugin(mt),He.allowProxying=!0;var Et=function(e,t){return Et=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])},Et(e,t)};function Tt(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function i(){this.constructor=e}Et(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}var Pt=function(){return Pt=Object.assign||function(e){for(var t,i=1,r=arguments.length;i<r;i++)for(var n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},Pt.apply(this,arguments)};function It(e,t,i,r){var n,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(o<3?n(s):o>3?n(t,i,s):n(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s}function kt(e){var t="function"==typeof Symbol&&Symbol.iterator,i=t&&e[t],r=0;if(i)return i.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}const Ot=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(t){window.customElements.define(e,t)}}})(e,t),Rt=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function Nt(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):Rt(e,t)}function zt(e){return Nt({...e,state:!0})}const Dt=({finisher:e,descriptor:t})=>(i,r)=>{var n;if(void 0===r){const r=null!==(n=i.originalKey)&&void 0!==n?n:i.key,o=null!=t?{kind:"method",placement:"prototype",key:r,descriptor:t(i.key)}:{...i,key:r};return null!=e&&(o.finisher=function(t){e(t,r)}),o}{const n=i.constructor;void 0!==t&&Object.defineProperty(i,r,t(r)),null==e||e(n,r)}};function Mt(e){return Dt({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}function Lt(e,t){return Dt({descriptor:i=>{const r={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;r.get=function(){var i,r;return void 0===this[t]&&(this[t]=null!==(r=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==r?r:null),this[t]}}return r}})}function Ft(e){return Dt({descriptor:t=>({async get(){var t;return await this.updateComplete,null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0})})}function Ht(e,t){return(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,t)}const $t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bt=Symbol(),Ut=new Map;class Vt{constructor(e,t){if(this._$cssResult$=!0,t!==Bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Ut.get(this.cssText);return $t&&void 0===e&&(Ut.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const Gt=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new Vt(i,Bt)},qt=$t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new Vt("string"==typeof e?e:e+"",Bt))(t)})(e):e;var jt;const Wt=window.trustedTypes,Yt=Wt?Wt.emptyScript:"",Jt=window.reactiveElementPolyfillSupport,Kt={toAttribute(e,t){switch(t){case Boolean:e=e?Yt:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},Xt=(e,t)=>t!==e&&(t==t||e==e),Zt={attribute:!0,type:String,converter:Kt,reflect:!1,hasChanged:Xt};class Qt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Eh(i,t);void 0!==r&&(this._$Eu.set(r,i),e.push(r))})),e}static createProperty(e,t=Zt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const n=this[e];this[t]=r,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Zt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(qt(e))}else void 0!==e&&t.push(qt(e));return t}static _$Eh(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$Eg)&&void 0!==t?t:this._$Eg=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$Eg)||void 0===t||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{$t?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),r=window.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=t.cssText,e.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Zt){var r,n;const o=this.constructor._$Eh(e,i);if(void 0!==o&&!0===i.reflect){const s=(null!==(n=null===(r=i.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==n?n:Kt.toAttribute)(t,i.type);this._$Ei=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Ei=null}}_$AK(e,t){var i,r,n;const o=this.constructor,s=o._$Eu.get(e);if(void 0!==s&&this._$Ei!==s){const e=o.getPropertyOptions(s),a=e.converter,l=null!==(n=null!==(r=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==r?r:"function"==typeof a?a:null)&&void 0!==n?n:Kt.fromAttribute;this._$Ei=s,this[s]=l(t,e.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Xt)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Ei!==e&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((e,t)=>this[t]=e)),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Eg)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){void 0!==this._$E_&&(this._$E_.forEach(((e,t)=>this._$ES(t,this[t],e))),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}}var ei,ti;Qt.finalized=!0,Qt.elementProperties=new Map,Qt.elementStyles=[],Qt.shadowRootOptions={mode:"open"},null==Jt||Jt({ReactiveElement:Qt}),(null!==(jt=globalThis.reactiveElementVersions)&&void 0!==jt?jt:globalThis.reactiveElementVersions=[]).push("1.0.2");class ii extends Qt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return ye}}ii.finalized=!0,ii._$litElement$=!0,null===(ei=globalThis.litElementHydrateSupport)||void 0===ei||ei.call(globalThis,{LitElement:ii});const ri=globalThis.litElementPolyfillSupport;null==ri||ri({LitElement:ii}),(null!==(ti=globalThis.litElementVersions)&&void 0!==ti?ti:globalThis.litElementVersions=[]).push("3.0.2");const ni=()=>{},oi={get passive(){return!1}};document.addEventListener("x",ni,oi),document.removeEventListener("x",ni);class si extends ii{click(){if(this.mdcRoot)return this.mdcRoot.focus(),void this.mdcRoot.click();super.click()}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundationClass&&(this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init())}firstUpdated(){this.createFoundation()}}var ai=function(){function e(e){void 0===e&&(e={}),this.adapter=e}return Object.defineProperty(e,"cssClasses",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{}},enumerable:!1,configurable:!0}),e.prototype.init=function(){},e.prototype.destroy=function(){},e}(),li={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},di={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},ci={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300};var hi=["touchstart","pointerdown","mousedown","keydown"],pi=["touchend","pointerup","mouseup","contextmenu"],ui=[],mi=function(e){function t(i){var r=e.call(this,Pt(Pt({},t.defaultAdapter),i))||this;return r.activationAnimationHasEnded=!1,r.activationTimer=0,r.fgDeactivationRemovalTimer=0,r.fgScale="0",r.frame={width:0,height:0},r.initialSize=0,r.layoutFrame=0,r.maxRadius=0,r.unboundedCoords={left:0,top:0},r.activationState=r.defaultActivationState(),r.activationTimerCallback=function(){r.activationAnimationHasEnded=!0,r.runDeactivationUXLogicIfReady()},r.activateHandler=function(e){r.activateImpl(e)},r.deactivateHandler=function(){r.deactivateImpl()},r.focusHandler=function(){r.handleFocus()},r.blurHandler=function(){r.handleBlur()},r.resizeHandler=function(){r.layout()},r}return Tt(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return li},enumerable:!1,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return di},enumerable:!1,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return ci},enumerable:!1,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!1,configurable:!0}),t.prototype.init=function(){var e=this,i=this.supportsPressRipple();if(this.registerRootHandlers(i),i){var r=t.cssClasses,n=r.ROOT,o=r.UNBOUNDED;requestAnimationFrame((function(){e.adapter.addClass(n),e.adapter.isUnbounded()&&(e.adapter.addClass(o),e.layoutInternal())}))}},t.prototype.destroy=function(){var e=this;if(this.supportsPressRipple()){this.activationTimer&&(clearTimeout(this.activationTimer),this.activationTimer=0,this.adapter.removeClass(t.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer&&(clearTimeout(this.fgDeactivationRemovalTimer),this.fgDeactivationRemovalTimer=0,this.adapter.removeClass(t.cssClasses.FG_DEACTIVATION));var i=t.cssClasses,r=i.ROOT,n=i.UNBOUNDED;requestAnimationFrame((function(){e.adapter.removeClass(r),e.adapter.removeClass(n),e.removeCssVars()}))}this.deregisterRootHandlers(),this.deregisterDeactivationHandlers()},t.prototype.activate=function(e){this.activateImpl(e)},t.prototype.deactivate=function(){this.deactivateImpl()},t.prototype.layout=function(){var e=this;this.layoutFrame&&cancelAnimationFrame(this.layoutFrame),this.layoutFrame=requestAnimationFrame((function(){e.layoutInternal(),e.layoutFrame=0}))},t.prototype.setUnbounded=function(e){var i=t.cssClasses.UNBOUNDED;e?this.adapter.addClass(i):this.adapter.removeClass(i)},t.prototype.handleFocus=function(){var e=this;requestAnimationFrame((function(){return e.adapter.addClass(t.cssClasses.BG_FOCUSED)}))},t.prototype.handleBlur=function(){var e=this;requestAnimationFrame((function(){return e.adapter.removeClass(t.cssClasses.BG_FOCUSED)}))},t.prototype.supportsPressRipple=function(){return this.adapter.browserSupportsCssVars()},t.prototype.defaultActivationState=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},t.prototype.registerRootHandlers=function(e){var t,i;if(e){try{for(var r=kt(hi),n=r.next();!n.done;n=r.next()){var o=n.value;this.adapter.registerInteractionHandler(o,this.activateHandler)}}catch(e){t={error:e}}finally{try{n&&!n.done&&(i=r.return)&&i.call(r)}finally{if(t)throw t.error}}this.adapter.isUnbounded()&&this.adapter.registerResizeHandler(this.resizeHandler)}this.adapter.registerInteractionHandler("focus",this.focusHandler),this.adapter.registerInteractionHandler("blur",this.blurHandler)},t.prototype.registerDeactivationHandlers=function(e){var t,i;if("keydown"===e.type)this.adapter.registerInteractionHandler("keyup",this.deactivateHandler);else try{for(var r=kt(pi),n=r.next();!n.done;n=r.next()){var o=n.value;this.adapter.registerDocumentInteractionHandler(o,this.deactivateHandler)}}catch(e){t={error:e}}finally{try{n&&!n.done&&(i=r.return)&&i.call(r)}finally{if(t)throw t.error}}},t.prototype.deregisterRootHandlers=function(){var e,t;try{for(var i=kt(hi),r=i.next();!r.done;r=i.next()){var n=r.value;this.adapter.deregisterInteractionHandler(n,this.activateHandler)}}catch(t){e={error:t}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}this.adapter.deregisterInteractionHandler("focus",this.focusHandler),this.adapter.deregisterInteractionHandler("blur",this.blurHandler),this.adapter.isUnbounded()&&this.adapter.deregisterResizeHandler(this.resizeHandler)},t.prototype.deregisterDeactivationHandlers=function(){var e,t;this.adapter.deregisterInteractionHandler("keyup",this.deactivateHandler);try{for(var i=kt(pi),r=i.next();!r.done;r=i.next()){var n=r.value;this.adapter.deregisterDocumentInteractionHandler(n,this.deactivateHandler)}}catch(t){e={error:t}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}},t.prototype.removeCssVars=function(){var e=this,i=t.strings;Object.keys(i).forEach((function(t){0===t.indexOf("VAR_")&&e.adapter.updateCssVariable(i[t],null)}))},t.prototype.activateImpl=function(e){var t=this;if(!this.adapter.isSurfaceDisabled()){var i=this.activationState;if(!i.isActivated){var r=this.previousActivationEvent;if(!(r&&void 0!==e&&r.type!==e.type))i.isActivated=!0,i.isProgrammatic=void 0===e,i.activationEvent=e,i.wasActivatedByPointer=!i.isProgrammatic&&(void 0!==e&&("mousedown"===e.type||"touchstart"===e.type||"pointerdown"===e.type)),void 0!==e&&ui.length>0&&ui.some((function(e){return t.adapter.containsEventTarget(e)}))?this.resetActivationState():(void 0!==e&&(ui.push(e.target),this.registerDeactivationHandlers(e)),i.wasElementMadeActive=this.checkElementMadeActive(e),i.wasElementMadeActive&&this.animateActivation(),requestAnimationFrame((function(){ui=[],i.wasElementMadeActive||void 0===e||" "!==e.key&&32!==e.keyCode||(i.wasElementMadeActive=t.checkElementMadeActive(e),i.wasElementMadeActive&&t.animateActivation()),i.wasElementMadeActive||(t.activationState=t.defaultActivationState())})))}}},t.prototype.checkElementMadeActive=function(e){return void 0===e||"keydown"!==e.type||this.adapter.isSurfaceActive()},t.prototype.animateActivation=function(){var e=this,i=t.strings,r=i.VAR_FG_TRANSLATE_START,n=i.VAR_FG_TRANSLATE_END,o=t.cssClasses,s=o.FG_DEACTIVATION,a=o.FG_ACTIVATION,l=t.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal();var d="",c="";if(!this.adapter.isUnbounded()){var h=this.getFgTranslationCoordinates(),p=h.startPoint,u=h.endPoint;d=p.x+"px, "+p.y+"px",c=u.x+"px, "+u.y+"px"}this.adapter.updateCssVariable(r,d),this.adapter.updateCssVariable(n,c),clearTimeout(this.activationTimer),clearTimeout(this.fgDeactivationRemovalTimer),this.rmBoundedActivationClasses(),this.adapter.removeClass(s),this.adapter.computeBoundingRect(),this.adapter.addClass(a),this.activationTimer=setTimeout((function(){e.activationTimerCallback()}),l)},t.prototype.getFgTranslationCoordinates=function(){var e,t=this.activationState,i=t.activationEvent;return e=t.wasActivatedByPointer?function(e,t,i){if(!e)return{x:0,y:0};var r,n,o=t.x,s=t.y,a=o+i.left,l=s+i.top;if("touchstart"===e.type){var d=e;r=d.changedTouches[0].pageX-a,n=d.changedTouches[0].pageY-l}else{var c=e;r=c.pageX-a,n=c.pageY-l}return{x:r,y:n}}(i,this.adapter.getWindowPageOffset(),this.adapter.computeBoundingRect()):{x:this.frame.width/2,y:this.frame.height/2},{startPoint:e={x:e.x-this.initialSize/2,y:e.y-this.initialSize/2},endPoint:{x:this.frame.width/2-this.initialSize/2,y:this.frame.height/2-this.initialSize/2}}},t.prototype.runDeactivationUXLogicIfReady=function(){var e=this,i=t.cssClasses.FG_DEACTIVATION,r=this.activationState,n=r.hasDeactivationUXRun,o=r.isActivated;(n||!o)&&this.activationAnimationHasEnded&&(this.rmBoundedActivationClasses(),this.adapter.addClass(i),this.fgDeactivationRemovalTimer=setTimeout((function(){e.adapter.removeClass(i)}),ci.FG_DEACTIVATION_MS))},t.prototype.rmBoundedActivationClasses=function(){var e=t.cssClasses.FG_ACTIVATION;this.adapter.removeClass(e),this.activationAnimationHasEnded=!1,this.adapter.computeBoundingRect()},t.prototype.resetActivationState=function(){var e=this;this.previousActivationEvent=this.activationState.activationEvent,this.activationState=this.defaultActivationState(),setTimeout((function(){return e.previousActivationEvent=void 0}),t.numbers.TAP_DELAY_MS)},t.prototype.deactivateImpl=function(){var e=this,t=this.activationState;if(t.isActivated){var i=Pt({},t);t.isProgrammatic?(requestAnimationFrame((function(){e.animateDeactivation(i)})),this.resetActivationState()):(this.deregisterDeactivationHandlers(),requestAnimationFrame((function(){e.activationState.hasDeactivationUXRun=!0,e.animateDeactivation(i),e.resetActivationState()})))}},t.prototype.animateDeactivation=function(e){var t=e.wasActivatedByPointer,i=e.wasElementMadeActive;(t||i)&&this.runDeactivationUXLogicIfReady()},t.prototype.layoutInternal=function(){var e=this;this.frame=this.adapter.computeBoundingRect();var i=Math.max(this.frame.height,this.frame.width);this.maxRadius=this.adapter.isUnbounded()?i:Math.sqrt(Math.pow(e.frame.width,2)+Math.pow(e.frame.height,2))+t.numbers.PADDING;var r=Math.floor(i*t.numbers.INITIAL_ORIGIN_SCALE);this.adapter.isUnbounded()&&r%2!=0?this.initialSize=r-1:this.initialSize=r,this.fgScale=""+this.maxRadius/this.initialSize,this.updateLayoutCssVars()},t.prototype.updateLayoutCssVars=function(){var e=t.strings,i=e.VAR_FG_SIZE,r=e.VAR_LEFT,n=e.VAR_TOP,o=e.VAR_FG_SCALE;this.adapter.updateCssVariable(i,this.initialSize+"px"),this.adapter.updateCssVariable(o,this.fgScale),this.adapter.isUnbounded()&&(this.unboundedCoords={left:Math.round(this.frame.width/2-this.initialSize/2),top:Math.round(this.frame.height/2-this.initialSize/2)},this.adapter.updateCssVariable(r,this.unboundedCoords.left+"px"),this.adapter.updateCssVariable(n,this.unboundedCoords.top+"px"))},t}(ai),fi=mi;const gi=1,_i=e=>(...t)=>({_$litDirective$:e,values:t});class bi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const yi=_i(class extends bi{constructor(e){var t;if(super(e),e.type!==gi||"class"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){var i,r;if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.et=new Set(e.strings.join(" ").split(/\s/).filter((e=>""!==e))));for(const e in t)t[e]&&!(null===(i=this.et)||void 0===i?void 0:i.has(e))&&this.st.add(e);return this.render(t)}const n=e.element.classList;this.st.forEach((e=>{e in t||(n.remove(e),this.st.delete(e))}));for(const e in t){const i=!!t[e];i===this.st.has(e)||(null===(r=this.et)||void 0===r?void 0:r.has(e))||(i?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return ye}}),vi=_i(class extends bi{constructor(e){var t;if(super(e),e.type!==gi||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const r=e[i];return null==r?t:t+`${i=i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ut){this.ut=new Set;for(const e in t)this.ut.add(e);return this.render(t)}this.ut.forEach((e=>{null==t[e]&&(this.ut.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")}));for(const e in t){const r=t[e];null!=r&&(this.ut.add(e),e.includes("-")?i.setProperty(e,r):i[e]=r)}return ye}});class wi extends si{constructor(){super(...arguments),this.primary=!1,this.accent=!1,this.unbounded=!1,this.disabled=!1,this.activated=!1,this.selected=!1,this.internalUseStateLayerCustomProperties=!1,this.hovering=!1,this.bgFocused=!1,this.fgActivation=!1,this.fgDeactivation=!1,this.fgScale="",this.fgSize="",this.translateStart="",this.translateEnd="",this.leftPos="",this.topPos="",this.mdcFoundationClass=fi}get isActive(){return Ht(this.parentElement||this,":active")}createAdapter(){return{browserSupportsCssVars:()=>!0,isUnbounded:()=>this.unbounded,isSurfaceActive:()=>this.isActive,isSurfaceDisabled:()=>this.disabled,addClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!0;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!0;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!0}},removeClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!1;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!1;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!1}},containsEventTarget:()=>!0,registerInteractionHandler:()=>{},deregisterInteractionHandler:()=>{},registerDocumentInteractionHandler:()=>{},deregisterDocumentInteractionHandler:()=>{},registerResizeHandler:()=>{},deregisterResizeHandler:()=>{},updateCssVariable:(e,t)=>{switch(e){case"--mdc-ripple-fg-scale":this.fgScale=t;break;case"--mdc-ripple-fg-size":this.fgSize=t;break;case"--mdc-ripple-fg-translate-end":this.translateEnd=t;break;case"--mdc-ripple-fg-translate-start":this.translateStart=t;break;case"--mdc-ripple-left":this.leftPos=t;break;case"--mdc-ripple-top":this.topPos=t}},computeBoundingRect:()=>(this.parentElement||this).getBoundingClientRect(),getWindowPageOffset:()=>({x:window.pageXOffset,y:window.pageYOffset})}}startPress(e){this.waitForFoundation((()=>{this.mdcFoundation.activate(e)}))}endPress(){this.waitForFoundation((()=>{this.mdcFoundation.deactivate()}))}startFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleFocus()}))}endFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleBlur()}))}startHover(){this.hovering=!0}endHover(){this.hovering=!1}waitForFoundation(e){this.mdcFoundation?e():this.updateComplete.then(e)}update(e){e.has("disabled")&&this.disabled&&this.endHover(),super.update(e)}render(){const e=this.activated&&(this.primary||!this.accent),t=this.selected&&(this.primary||!this.accent),i={"mdc-ripple-surface--accent":this.accent,"mdc-ripple-surface--primary--activated":e,"mdc-ripple-surface--accent--activated":this.accent&&this.activated,"mdc-ripple-surface--primary--selected":t,"mdc-ripple-surface--accent--selected":this.accent&&this.selected,"mdc-ripple-surface--disabled":this.disabled,"mdc-ripple-surface--hover":this.hovering,"mdc-ripple-surface--primary":this.primary,"mdc-ripple-surface--selected":this.selected,"mdc-ripple-upgraded--background-focused":this.bgFocused,"mdc-ripple-upgraded--foreground-activation":this.fgActivation,"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation,"mdc-ripple-upgraded--unbounded":this.unbounded,"mdc-ripple-surface--internal-use-state-layer-custom-properties":this.internalUseStateLayerCustomProperties};return be`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${yi(i)}"
          style="${vi({"--mdc-ripple-fg-scale":this.fgScale,"--mdc-ripple-fg-size":this.fgSize,"--mdc-ripple-fg-translate-end":this.translateEnd,"--mdc-ripple-fg-translate-start":this.translateStart,"--mdc-ripple-left":this.leftPos,"--mdc-ripple-top":this.topPos})}"></div>`}}It([Lt(".mdc-ripple-surface")],wi.prototype,"mdcRoot",void 0),It([Nt({type:Boolean})],wi.prototype,"primary",void 0),It([Nt({type:Boolean})],wi.prototype,"accent",void 0),It([Nt({type:Boolean})],wi.prototype,"unbounded",void 0),It([Nt({type:Boolean})],wi.prototype,"disabled",void 0),It([Nt({type:Boolean})],wi.prototype,"activated",void 0),It([Nt({type:Boolean})],wi.prototype,"selected",void 0),It([Nt({type:Boolean})],wi.prototype,"internalUseStateLayerCustomProperties",void 0),It([zt()],wi.prototype,"hovering",void 0),It([zt()],wi.prototype,"bgFocused",void 0),It([zt()],wi.prototype,"fgActivation",void 0),It([zt()],wi.prototype,"fgDeactivation",void 0),It([zt()],wi.prototype,"fgScale",void 0),It([zt()],wi.prototype,"fgSize",void 0),It([zt()],wi.prototype,"translateStart",void 0),It([zt()],wi.prototype,"translateEnd",void 0),It([zt()],wi.prototype,"leftPos",void 0),It([zt()],wi.prototype,"topPos",void 0);const Ai=Gt`.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}.mdc-ripple-surface--internal-use-state-layer-custom-properties::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties::after{background-color:#000;background-color:var(--mdc-ripple-hover-state-layer-color, #000)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-state-layer-opacity, 0.04)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}`;let xi=class extends wi{};function Ci(e,t,i){if(void 0!==t)return function(e,t,i){const r=e.constructor;if(!i){const e=`__${t}`;if(!(i=r.getPropertyDescriptor(t,e)))throw new Error("@ariaProperty must be used after a @property decorator")}const n=i;let o="";if(!n.set)throw new Error(`@ariaProperty requires a setter for ${t}`);if(e.dispatchWizEvent)return i;const s={configurable:!0,enumerable:!0,set(e){if(""===o){const e=r.getPropertyOptions(t);o="string"==typeof e.attribute?e.attribute:t}this.hasAttribute(o)&&this.removeAttribute(o),n.set.call(this,e)}};return n.get&&(s.get=function(){return n.get.call(this)}),s}(e,t,i);throw new Error("@ariaProperty only supports TypeScript Decorators")}xi.styles=[Ai],xi=It([Ot("mwc-ripple")],xi);class Si{constructor(e){this.startPress=t=>{e().then((e=>{e&&e.startPress(t)}))},this.endPress=()=>{e().then((e=>{e&&e.endPress()}))},this.startFocus=()=>{e().then((e=>{e&&e.startFocus()}))},this.endFocus=()=>{e().then((e=>{e&&e.endFocus()}))},this.startHover=()=>{e().then((e=>{e&&e.startHover()}))},this.endHover=()=>{e().then((e=>{e&&e.endHover()}))}}}const Ei=e=>null!=e?e:ve;class Ti extends ii{constructor(){super(...arguments),this.disabled=!1,this.icon="",this.shouldRenderRipple=!1,this.rippleHandlers=new Si((()=>(this.shouldRenderRipple=!0,this.ripple)))}renderRipple(){return this.shouldRenderRipple?be`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>`:""}focus(){const e=this.buttonElement;e&&(this.rippleHandlers.startFocus(),e.focus())}blur(){const e=this.buttonElement;e&&(this.rippleHandlers.endFocus(),e.blur())}render(){return be`<button
        class="mdc-icon-button mdc-icon-button--display-flex"
        aria-label="${this.ariaLabel||this.icon}"
        aria-haspopup="${Ei(this.ariaHasPopup)}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
    >${this.renderRipple()}
    <i class="material-icons">${this.icon}</i>
    <span
      ><slot></slot
    ></span>
  </button>`}handleRippleMouseDown(e){const t=()=>{window.removeEventListener("mouseup",t),this.handleRippleDeactivate()};window.addEventListener("mouseup",t),this.rippleHandlers.startPress(e)}handleRippleTouchStart(e){this.rippleHandlers.startPress(e)}handleRippleDeactivate(){this.rippleHandlers.endPress()}handleRippleMouseEnter(){this.rippleHandlers.startHover()}handleRippleMouseLeave(){this.rippleHandlers.endHover()}handleRippleFocus(){this.rippleHandlers.startFocus()}handleRippleBlur(){this.rippleHandlers.endFocus()}}It([Nt({type:Boolean,reflect:!0})],Ti.prototype,"disabled",void 0),It([Nt({type:String})],Ti.prototype,"icon",void 0),It([Ci,Nt({type:String,attribute:"aria-label"})],Ti.prototype,"ariaLabel",void 0),It([Ci,Nt({type:String,attribute:"aria-haspopup"})],Ti.prototype,"ariaHasPopup",void 0),It([Lt("button")],Ti.prototype,"buttonElement",void 0),It([Ft("mwc-ripple")],Ti.prototype,"ripple",void 0),It([zt()],Ti.prototype,"shouldRenderRipple",void 0),It([Mt({passive:!0})],Ti.prototype,"handleRippleMouseDown",null),It([Mt({passive:!0})],Ti.prototype,"handleRippleTouchStart",null);const Pi=Gt`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:40px;height:40px;margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}:host{display:inline-block;outline:none}:host([disabled]){pointer-events:none}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block}:host{--mdc-ripple-color: currentcolor;-webkit-tap-highlight-color:transparent}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc( (var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2 )}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`;let Ii=class extends Ti{};Ii.styles=[Pi],Ii=It([Ot("mwc-icon-button")],Ii);const ki=new He({type:"WINDOW",source:window.parent});window.customElements.define("button-icon-copy",class extends ee{static get properties(){return{textToCopy:{type:String},title:{type:String},onSuccessMessage:{type:String},onErrorMessage:{type:String},buttonSize:{type:String},iconSize:{type:String},color:{type:String},offsetLeft:{type:String},offsetRight:{type:String}}}constructor(){super(),this.textToCopy="",this.title="Copy to clipboard",this.onSuccessMessage="Copied to clipboard",this.onErrorMessage="Unable to copy",this.buttonSize="48px",this.iconSize="24px",this.color="inherit",this.offsetLeft="0",this.offsetRight="0"}connectedCallback(){super.connectedCallback(),this.style.setProperty("--mdc-icon-button-size",this.buttonSize),this.style.setProperty("--mdc-icon-size",this.iconSize),this.style.setProperty("color",this.color),this.style.setProperty("margin-left",this.offsetLeft),this.style.setProperty("margin-right",this.offsetRight)}render(){return L`
            <mwc-icon-button 
                title=${this.title}
                label=${this.title}
                icon="content_copy" 
                @click=${()=>this.saveToClipboard(this.textToCopy)}
            >
            </mwc-icon-button>
        `}async saveToClipboard(e){try{await navigator.clipboard.writeText(e),ki.request("showSnackBar",this.onSuccessMessage)}catch(e){ki.request("showSnackBar",this.onErrorMessage),console.error("Copy to clipboard error:",e)}}});const Oi=Gt`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;let Ri=class extends ii{render(){return be`<span><slot></slot></span>`}};Ri.styles=[Oi],Ri=It([Ot("mwc-icon")],Ri);class Ni extends ii{constructor(){super(...arguments),this.raised=!1,this.unelevated=!1,this.outlined=!1,this.dense=!1,this.disabled=!1,this.trailingIcon=!1,this.fullwidth=!1,this.icon="",this.label="",this.expandContent=!1,this.shouldRenderRipple=!1,this.rippleHandlers=new Si((()=>(this.shouldRenderRipple=!0,this.ripple)))}renderOverlay(){return be``}renderRipple(){const e=this.raised||this.unelevated;return this.shouldRenderRipple?be`<mwc-ripple class="ripple" .primary="${!e}" .disabled="${this.disabled}"></mwc-ripple>`:""}focus(){const e=this.buttonElement;e&&(this.rippleHandlers.startFocus(),e.focus())}blur(){const e=this.buttonElement;e&&(this.rippleHandlers.endFocus(),e.blur())}getRenderClasses(){return{"mdc-button--raised":this.raised,"mdc-button--unelevated":this.unelevated,"mdc-button--outlined":this.outlined,"mdc-button--dense":this.dense}}render(){return be`
      <button
          id="button"
          class="mdc-button ${yi(this.getRenderClasses())}"
          ?disabled="${this.disabled}"
          aria-label="${this.label||this.icon}"
          aria-haspopup="${Ei(this.ariaHasPopup)}"
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleActivate}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleActivate}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}">
        ${this.renderOverlay()}
        ${this.renderRipple()}
        <span class="leading-icon">
          <slot name="icon">
            ${this.icon&&!this.trailingIcon?this.renderIcon():""}
          </slot>
        </span>
        <span class="mdc-button__label">${this.label}</span>
        <span class="slot-container ${yi({flex:this.expandContent})}">
          <slot></slot>
        </span>
        <span class="trailing-icon">
          <slot name="trailingIcon">
            ${this.icon&&this.trailingIcon?this.renderIcon():""}
          </slot>
        </span>
      </button>`}renderIcon(){return be`
    <mwc-icon class="mdc-button__icon">
      ${this.icon}
    </mwc-icon>`}handleRippleActivate(e){const t=()=>{window.removeEventListener("mouseup",t),this.handleRippleDeactivate()};window.addEventListener("mouseup",t),this.rippleHandlers.startPress(e)}handleRippleDeactivate(){this.rippleHandlers.endPress()}handleRippleMouseEnter(){this.rippleHandlers.startHover()}handleRippleMouseLeave(){this.rippleHandlers.endHover()}handleRippleFocus(){this.rippleHandlers.startFocus()}handleRippleBlur(){this.rippleHandlers.endFocus()}}Ni.shadowRootOptions={mode:"open",delegatesFocus:!0},It([Ci,Nt({type:String,attribute:"aria-haspopup"})],Ni.prototype,"ariaHasPopup",void 0),It([Nt({type:Boolean,reflect:!0})],Ni.prototype,"raised",void 0),It([Nt({type:Boolean,reflect:!0})],Ni.prototype,"unelevated",void 0),It([Nt({type:Boolean,reflect:!0})],Ni.prototype,"outlined",void 0),It([Nt({type:Boolean})],Ni.prototype,"dense",void 0),It([Nt({type:Boolean,reflect:!0})],Ni.prototype,"disabled",void 0),It([Nt({type:Boolean,attribute:"trailingicon"})],Ni.prototype,"trailingIcon",void 0),It([Nt({type:Boolean,reflect:!0})],Ni.prototype,"fullwidth",void 0),It([Nt({type:String})],Ni.prototype,"icon",void 0),It([Nt({type:String})],Ni.prototype,"label",void 0),It([Nt({type:Boolean})],Ni.prototype,"expandContent",void 0),It([Lt("#button")],Ni.prototype,"buttonElement",void 0),It([Ft("mwc-ripple")],Ni.prototype,"ripple",void 0),It([zt()],Ni.prototype,"shouldRenderRipple",void 0),It([Mt({passive:!0})],Ni.prototype,"handleRippleActivate",null);const zi=Gt`.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase)}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:transparent}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:transparent}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised,.mdc-button--unelevated{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--raised .mdc-button__ripple,.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button--outlined:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--outlined .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined:disabled{border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined.mdc-button--icon-trailing{padding:0 11px 0 15px}.mdc-button--outlined.mdc-button--icon-leading{padding:0 15px 0 11px}.mdc-button--outlined .mdc-button__ripple{top:calc(-1 * 1px);left:calc(-1 * 1px);border-width:1px}.mdc-button--outlined .mdc-button__touch{left:calc(-1 * 1px);width:calc(100% + 2 * 1px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent;vertical-align:top}:host([fullwidth]){width:100%}:host([raised]),:host([unelevated]){--mdc-ripple-color:#fff;--mdc-ripple-focus-opacity:0.24;--mdc-ripple-hover-opacity:0.08;--mdc-ripple-press-opacity:0.24}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,[dir=rtl] .leading-icon ::slotted(*),[dir=rtl] .leading-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl],.leading-icon ::slotted(*[dir=rtl]),.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.slot-container{display:inline-flex;align-items:center;justify-content:center}.slot-container.flex{flex:auto}.mdc-button{flex:auto;overflow:hidden;padding-left:8px;padding-left:var(--mdc-button-horizontal-padding, 8px);padding-right:8px;padding-right:var(--mdc-button-horizontal-padding, 8px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-focus, var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)))}.mdc-button--raised:hover{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised,.mdc-button--unelevated{padding-left:16px;padding-left:var(--mdc-button-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mdc-button-horizontal-padding, 16px)}.mdc-button--outlined{border-width:1px;border-width:var(--mdc-button-outline-width, 1px);padding-left:calc(16px - 1px);padding-left:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));padding-right:calc(16px - 1px);padding-right:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px))}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12))}.mdc-button--outlined .ripple{top:calc(-1 * 1px);top:calc(-1 * var(--mdc-button-outline-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mdc-button-outline-width, 1px));right:initial;right:initial;border-width:1px;border-width:var(--mdc-button-outline-width, 1px);border-style:solid;border-color:transparent}[dir=rtl] .mdc-button--outlined .ripple,.mdc-button--outlined .ripple[dir=rtl]{left:initial;left:initial;right:calc(-1 * 1px);right:calc(-1 * var(--mdc-button-outline-width, 1px))}.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button--dense .mdc-button__touch{height:100%}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-button{color:rgba(0, 0, 0, 0.38);color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button--raised,:host([disabled]) .mdc-button--unelevated{background-color:rgba(0, 0, 0, 0.12);background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12))}:host([disabled]) .mdc-button--outlined{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}`;let Di=class extends Ni{};Di.styles=[zi],Di=It([Ot("mwc-button")],Di),(()=>{var e,t,i;const r=Symbol(),n=Symbol(),o=Symbol(),s=Symbol(),a=Symbol(),l=Symbol(),d=Symbol(),c=Symbol(),h=Symbol(),p=Symbol(),u=Symbol(),m=Symbol(),f=Symbol();class g{constructor(){this[e]=[],this[t]=[],this[i]=new Set}destructor(){this[h](this[o]);const e=this;e[r]=null,e[o]=null,e[n]=null}get top(){const e=this[r];return e[e.length-1]||null}push(e){e&&e!==this.top&&(this.remove(e),this[l](e),this[r].push(e))}remove(e){const t=this[r].indexOf(e);return-1!==t&&(this[r].splice(t,1),t===this[r].length&&this[l](this.top),!0)}pop(){const e=this.top;return e&&this.remove(e),e}has(e){return-1!==this[r].indexOf(e)}[(e=r,t=o,i=n,l)](e){const t=this[n],i=this[o];if(!e)return this[h](i),t.clear(),void(this[o]=[]);const r=this[p](e);if(r[r.length-1].parentNode!==document.body)throw Error("Non-connected element cannot be a blocking element");this[o]=r;const s=this[u](e);if(!i.length)return void this[c](r,s,t);let a=i.length-1,l=r.length-1;for(;a>0&&l>0&&i[a]===r[l];)a--,l--;i[a]!==r[l]&&this[d](i[a],r[l]),a>0&&this[h](i.slice(0,a)),l>0&&this[c](r.slice(0,l),s,null)}[d](e,t){const i=e[s];this[m](e)&&!e.inert&&(e.inert=!0,i.add(e)),i.has(t)&&(t.inert=!1,i.delete(t)),t[a]=e[a],t[s]=i,e[a]=void 0,e[s]=void 0}[h](e){for(const t of e){t[a].disconnect(),t[a]=void 0;const e=t[s];for(const t of e)t.inert=!1;t[s]=void 0}}[c](e,t,i){for(const r of e){const e=r.parentNode,n=e.children,o=new Set;for(let e=0;e<n.length;e++){const s=n[e];s===r||!this[m](s)||t&&t.has(s)||(i&&s.inert?i.add(s):(s.inert=!0,o.add(s)))}r[s]=o;const l=new MutationObserver(this[f].bind(this));r[a]=l;let d=e;const c=d;c.__shady&&c.host&&(d=c.host),l.observe(d,{childList:!0})}}[f](e){const t=this[o],i=this[n];for(const r of e){const e=r.target.host||r.target,n=e===document.body?t.length:t.indexOf(e),o=t[n-1],a=o[s];for(let e=0;e<r.removedNodes.length;e++){const t=r.removedNodes[e];if(t===o)return console.info("Detected removal of the top Blocking Element."),void this.pop();a.has(t)&&(t.inert=!1,a.delete(t))}for(let e=0;e<r.addedNodes.length;e++){const t=r.addedNodes[e];this[m](t)&&(i&&t.inert?i.add(t):(t.inert=!0,a.add(t)))}}}[m](e){return!1===/^(style|template|script)$/.test(e.localName)}[p](e){const t=[];let i=e;for(;i&&i!==document.body;)if(i.nodeType===Node.ELEMENT_NODE&&t.push(i),i.assignedSlot){for(;i=i.assignedSlot;)t.push(i);i=t.pop()}else i=i.parentNode||i.host;return t}[u](e){const t=e.shadowRoot;if(!t)return null;const i=new Set;let r,n,o;const s=t.querySelectorAll("slot");if(s.length&&s[0].assignedNodes)for(r=0;r<s.length;r++)for(o=s[r].assignedNodes({flatten:!0}),n=0;n<o.length;n++)o[n].nodeType===Node.ELEMENT_NODE&&i.add(o[n]);return i}}document.$blockingElements=new g})();var Mi=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}();function Li(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}!function(){if("undefined"!=typeof window){var e=Array.prototype.slice,t=Element.prototype.matches||Element.prototype.msMatchesSelector,i=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","details","summary","iframe","object","embed","[contenteditable]"].join(","),r=function(){function r(e,t){Li(this,r),this._inertManager=t,this._rootElement=e,this._managedNodes=new Set,this._rootElement.hasAttribute("aria-hidden")?this._savedAriaHidden=this._rootElement.getAttribute("aria-hidden"):this._savedAriaHidden=null,this._rootElement.setAttribute("aria-hidden","true"),this._makeSubtreeUnfocusable(this._rootElement),this._observer=new MutationObserver(this._onMutation.bind(this)),this._observer.observe(this._rootElement,{attributes:!0,childList:!0,subtree:!0})}return Mi(r,[{key:"destructor",value:function(){this._observer.disconnect(),this._rootElement&&(null!==this._savedAriaHidden?this._rootElement.setAttribute("aria-hidden",this._savedAriaHidden):this._rootElement.removeAttribute("aria-hidden")),this._managedNodes.forEach((function(e){this._unmanageNode(e.node)}),this),this._observer=null,this._rootElement=null,this._managedNodes=null,this._inertManager=null}},{key:"_makeSubtreeUnfocusable",value:function(e){var t=this;a(e,(function(e){return t._visitNode(e)}));var i=document.activeElement;if(!document.body.contains(e)){for(var r=e,n=void 0;r;){if(r.nodeType===Node.DOCUMENT_FRAGMENT_NODE){n=r;break}r=r.parentNode}n&&(i=n.activeElement)}e.contains(i)&&(i.blur(),i===document.activeElement&&document.body.focus())}},{key:"_visitNode",value:function(e){if(e.nodeType===Node.ELEMENT_NODE){var r=e;r!==this._rootElement&&r.hasAttribute("inert")&&this._adoptInertRoot(r),(t.call(r,i)||r.hasAttribute("tabindex"))&&this._manageNode(r)}}},{key:"_manageNode",value:function(e){var t=this._inertManager.register(e,this);this._managedNodes.add(t)}},{key:"_unmanageNode",value:function(e){var t=this._inertManager.deregister(e,this);t&&this._managedNodes.delete(t)}},{key:"_unmanageSubtree",value:function(e){var t=this;a(e,(function(e){return t._unmanageNode(e)}))}},{key:"_adoptInertRoot",value:function(e){var t=this._inertManager.getInertRoot(e);t||(this._inertManager.setInert(e,!0),t=this._inertManager.getInertRoot(e)),t.managedNodes.forEach((function(e){this._manageNode(e.node)}),this)}},{key:"_onMutation",value:function(t,i){t.forEach((function(t){var i=t.target;if("childList"===t.type)e.call(t.addedNodes).forEach((function(e){this._makeSubtreeUnfocusable(e)}),this),e.call(t.removedNodes).forEach((function(e){this._unmanageSubtree(e)}),this);else if("attributes"===t.type)if("tabindex"===t.attributeName)this._manageNode(i);else if(i!==this._rootElement&&"inert"===t.attributeName&&i.hasAttribute("inert")){this._adoptInertRoot(i);var r=this._inertManager.getInertRoot(i);this._managedNodes.forEach((function(e){i.contains(e.node)&&r._manageNode(e.node)}))}}),this)}},{key:"managedNodes",get:function(){return new Set(this._managedNodes)}},{key:"hasSavedAriaHidden",get:function(){return null!==this._savedAriaHidden}},{key:"savedAriaHidden",set:function(e){this._savedAriaHidden=e},get:function(){return this._savedAriaHidden}}]),r}(),n=function(){function e(t,i){Li(this,e),this._node=t,this._overrodeFocusMethod=!1,this._inertRoots=new Set([i]),this._savedTabIndex=null,this._destroyed=!1,this.ensureUntabbable()}return Mi(e,[{key:"destructor",value:function(){if(this._throwIfDestroyed(),this._node&&this._node.nodeType===Node.ELEMENT_NODE){var e=this._node;null!==this._savedTabIndex?e.setAttribute("tabindex",this._savedTabIndex):e.removeAttribute("tabindex"),this._overrodeFocusMethod&&delete e.focus}this._node=null,this._inertRoots=null,this._destroyed=!0}},{key:"_throwIfDestroyed",value:function(){if(this.destroyed)throw new Error("Trying to access destroyed InertNode")}},{key:"ensureUntabbable",value:function(){if(this.node.nodeType===Node.ELEMENT_NODE){var e=this.node;if(t.call(e,i)){if(-1===e.tabIndex&&this.hasSavedTabIndex)return;e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex),e.setAttribute("tabindex","-1"),e.nodeType===Node.ELEMENT_NODE&&(e.focus=function(){},this._overrodeFocusMethod=!0)}else e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex,e.removeAttribute("tabindex"))}}},{key:"addInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.add(e)}},{key:"removeInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.delete(e),0===this._inertRoots.size&&this.destructor()}},{key:"destroyed",get:function(){return this._destroyed}},{key:"hasSavedTabIndex",get:function(){return null!==this._savedTabIndex}},{key:"node",get:function(){return this._throwIfDestroyed(),this._node}},{key:"savedTabIndex",set:function(e){this._throwIfDestroyed(),this._savedTabIndex=e},get:function(){return this._throwIfDestroyed(),this._savedTabIndex}}]),e}(),o=function(){function i(e){if(Li(this,i),!e)throw new Error("Missing required argument; InertManager needs to wrap a document.");this._document=e,this._managedNodes=new Map,this._inertRoots=new Map,this._observer=new MutationObserver(this._watchForInert.bind(this)),l(e.head||e.body||e.documentElement),"loading"===e.readyState?e.addEventListener("DOMContentLoaded",this._onDocumentLoaded.bind(this)):this._onDocumentLoaded()}return Mi(i,[{key:"setInert",value:function(e,t){if(t){if(this._inertRoots.has(e))return;var i=new r(e,this);if(e.setAttribute("inert",""),this._inertRoots.set(e,i),!this._document.body.contains(e))for(var n=e.parentNode;n;)11===n.nodeType&&l(n),n=n.parentNode}else{if(!this._inertRoots.has(e))return;this._inertRoots.get(e).destructor(),this._inertRoots.delete(e),e.removeAttribute("inert")}}},{key:"getInertRoot",value:function(e){return this._inertRoots.get(e)}},{key:"register",value:function(e,t){var i=this._managedNodes.get(e);return void 0!==i?i.addInertRoot(t):i=new n(e,t),this._managedNodes.set(e,i),i}},{key:"deregister",value:function(e,t){var i=this._managedNodes.get(e);return i?(i.removeInertRoot(t),i.destroyed&&this._managedNodes.delete(e),i):null}},{key:"_onDocumentLoaded",value:function(){e.call(this._document.querySelectorAll("[inert]")).forEach((function(e){this.setInert(e,!0)}),this),this._observer.observe(this._document.body||this._document.documentElement,{attributes:!0,subtree:!0,childList:!0})}},{key:"_watchForInert",value:function(i,r){var n=this;i.forEach((function(i){switch(i.type){case"childList":e.call(i.addedNodes).forEach((function(i){if(i.nodeType===Node.ELEMENT_NODE){var r=e.call(i.querySelectorAll("[inert]"));t.call(i,"[inert]")&&r.unshift(i),r.forEach((function(e){this.setInert(e,!0)}),n)}}),n);break;case"attributes":if("inert"!==i.attributeName)return;var r=i.target,o=r.hasAttribute("inert");n.setInert(r,o)}}),this)}}]),i}();if(!Element.prototype.hasOwnProperty("inert")){var s=new o(document);Object.defineProperty(Element.prototype,"inert",{enumerable:!0,get:function(){return this.hasAttribute("inert")},set:function(e){s.setInert(this,e)}})}}function a(e,t,i){if(e.nodeType==Node.ELEMENT_NODE){var r=e;t&&t(r);var n=r.shadowRoot;if(n)return void a(n,t);if("content"==r.localName){for(var o=r,s=o.getDistributedNodes?o.getDistributedNodes():[],l=0;l<s.length;l++)a(s[l],t);return}if("slot"==r.localName){for(var d=r,c=d.assignedNodes?d.assignedNodes({flatten:!0}):[],h=0;h<c.length;h++)a(c[h],t);return}}for(var p=e.firstChild;null!=p;)a(p,t),p=p.nextSibling}function l(e){if(!e.querySelector("style#inert-style, link#inert-style")){var t=document.createElement("style");t.setAttribute("id","inert-style"),t.textContent="\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n",e.appendChild(t)}}}();var Fi,Hi={CLOSING:"mdc-dialog--closing",OPEN:"mdc-dialog--open",OPENING:"mdc-dialog--opening",SCROLLABLE:"mdc-dialog--scrollable",SCROLL_LOCK:"mdc-dialog-scroll-lock",STACKED:"mdc-dialog--stacked",FULLSCREEN:"mdc-dialog--fullscreen",SCROLL_DIVIDER_HEADER:"mdc-dialog-scroll-divider-header",SCROLL_DIVIDER_FOOTER:"mdc-dialog-scroll-divider-footer",SURFACE_SCRIM_SHOWN:"mdc-dialog__surface-scrim--shown",SURFACE_SCRIM_SHOWING:"mdc-dialog__surface-scrim--showing",SURFACE_SCRIM_HIDING:"mdc-dialog__surface-scrim--hiding",SCRIM_HIDDEN:"mdc-dialog__scrim--hidden"},$i={ACTION_ATTRIBUTE:"data-mdc-dialog-action",BUTTON_DEFAULT_ATTRIBUTE:"data-mdc-dialog-button-default",BUTTON_SELECTOR:".mdc-dialog__button",CLOSED_EVENT:"MDCDialog:closed",CLOSE_ACTION:"close",CLOSING_EVENT:"MDCDialog:closing",CONTAINER_SELECTOR:".mdc-dialog__container",CONTENT_SELECTOR:".mdc-dialog__content",DESTROY_ACTION:"destroy",INITIAL_FOCUS_ATTRIBUTE:"data-mdc-dialog-initial-focus",OPENED_EVENT:"MDCDialog:opened",OPENING_EVENT:"MDCDialog:opening",SCRIM_SELECTOR:".mdc-dialog__scrim",SUPPRESS_DEFAULT_PRESS_SELECTOR:["textarea",".mdc-menu .mdc-list-item",".mdc-menu .mdc-deprecated-list-item"].join(", "),SURFACE_SELECTOR:".mdc-dialog__surface"},Bi={DIALOG_ANIMATION_CLOSE_TIME_MS:75,DIALOG_ANIMATION_OPEN_TIME_MS:150},Ui=function(){function e(){this.rafIDs=new Map}return e.prototype.request=function(e,t){var i=this;this.cancel(e);var r=requestAnimationFrame((function(r){i.rafIDs.delete(e),t(r)}));this.rafIDs.set(e,r)},e.prototype.cancel=function(e){var t=this.rafIDs.get(e);t&&(cancelAnimationFrame(t),this.rafIDs.delete(e))},e.prototype.cancelAll=function(){var e=this;this.rafIDs.forEach((function(t,i){e.cancel(i)}))},e.prototype.getQueue=function(){var e=[];return this.rafIDs.forEach((function(t,i){e.push(i)})),e},e}();!function(e){e.POLL_SCROLL_POS="poll_scroll_position",e.POLL_LAYOUT_CHANGE="poll_layout_change"}(Fi||(Fi={}));var Vi=function(e){function t(i){var r=e.call(this,Pt(Pt({},t.defaultAdapter),i))||this;return r.dialogOpen=!1,r.isFullscreen=!1,r.animationFrame=0,r.animationTimer=0,r.escapeKeyAction=$i.CLOSE_ACTION,r.scrimClickAction=$i.CLOSE_ACTION,r.autoStackButtons=!0,r.areButtonsStacked=!1,r.suppressDefaultPressSelector=$i.SUPPRESS_DEFAULT_PRESS_SELECTOR,r.animFrame=new Ui,r.contentScrollHandler=function(){r.handleScrollEvent()},r.windowResizeHandler=function(){r.layout()},r.windowOrientationChangeHandler=function(){r.layout()},r}return Tt(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return Hi},enumerable:!1,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return $i},enumerable:!1,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return Bi},enumerable:!1,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{addBodyClass:function(){},addClass:function(){},areButtonsStacked:function(){return!1},clickDefaultButton:function(){},eventTargetMatches:function(){return!1},getActionFromEvent:function(){return""},getInitialFocusEl:function(){return null},hasClass:function(){return!1},isContentScrollable:function(){return!1},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},releaseFocus:function(){},removeBodyClass:function(){},removeClass:function(){},reverseButtons:function(){},trapFocus:function(){},registerContentEventHandler:function(){},deregisterContentEventHandler:function(){},isScrollableContentAtTop:function(){return!1},isScrollableContentAtBottom:function(){return!1},registerWindowEventHandler:function(){},deregisterWindowEventHandler:function(){}}},enumerable:!1,configurable:!0}),t.prototype.init=function(){this.adapter.hasClass(Hi.STACKED)&&this.setAutoStackButtons(!1),this.isFullscreen=this.adapter.hasClass(Hi.FULLSCREEN)},t.prototype.destroy=function(){this.animationTimer&&(clearTimeout(this.animationTimer),this.handleAnimationTimerEnd()),this.isFullscreen&&this.adapter.deregisterContentEventHandler("scroll",this.contentScrollHandler),this.animFrame.cancelAll(),this.adapter.deregisterWindowEventHandler("resize",this.windowResizeHandler),this.adapter.deregisterWindowEventHandler("orientationchange",this.windowOrientationChangeHandler)},t.prototype.open=function(e){var t=this;this.dialogOpen=!0,this.adapter.notifyOpening(),this.adapter.addClass(Hi.OPENING),this.isFullscreen&&this.adapter.registerContentEventHandler("scroll",this.contentScrollHandler),e&&e.isAboveFullscreenDialog&&this.adapter.addClass(Hi.SCRIM_HIDDEN),this.adapter.registerWindowEventHandler("resize",this.windowResizeHandler),this.adapter.registerWindowEventHandler("orientationchange",this.windowOrientationChangeHandler),this.runNextAnimationFrame((function(){t.adapter.addClass(Hi.OPEN),t.adapter.addBodyClass(Hi.SCROLL_LOCK),t.layout(),t.animationTimer=setTimeout((function(){t.handleAnimationTimerEnd(),t.adapter.trapFocus(t.adapter.getInitialFocusEl()),t.adapter.notifyOpened()}),Bi.DIALOG_ANIMATION_OPEN_TIME_MS)}))},t.prototype.close=function(e){var t=this;void 0===e&&(e=""),this.dialogOpen&&(this.dialogOpen=!1,this.adapter.notifyClosing(e),this.adapter.addClass(Hi.CLOSING),this.adapter.removeClass(Hi.OPEN),this.adapter.removeBodyClass(Hi.SCROLL_LOCK),this.isFullscreen&&this.adapter.deregisterContentEventHandler("scroll",this.contentScrollHandler),this.adapter.deregisterWindowEventHandler("resize",this.windowResizeHandler),this.adapter.deregisterWindowEventHandler("orientationchange",this.windowOrientationChangeHandler),cancelAnimationFrame(this.animationFrame),this.animationFrame=0,clearTimeout(this.animationTimer),this.animationTimer=setTimeout((function(){t.adapter.releaseFocus(),t.handleAnimationTimerEnd(),t.adapter.notifyClosed(e)}),Bi.DIALOG_ANIMATION_CLOSE_TIME_MS))},t.prototype.showSurfaceScrim=function(){var e=this;this.adapter.addClass(Hi.SURFACE_SCRIM_SHOWING),this.runNextAnimationFrame((function(){e.adapter.addClass(Hi.SURFACE_SCRIM_SHOWN)}))},t.prototype.hideSurfaceScrim=function(){this.adapter.removeClass(Hi.SURFACE_SCRIM_SHOWN),this.adapter.addClass(Hi.SURFACE_SCRIM_HIDING)},t.prototype.handleSurfaceScrimTransitionEnd=function(){this.adapter.removeClass(Hi.SURFACE_SCRIM_HIDING),this.adapter.removeClass(Hi.SURFACE_SCRIM_SHOWING)},t.prototype.isOpen=function(){return this.dialogOpen},t.prototype.getEscapeKeyAction=function(){return this.escapeKeyAction},t.prototype.setEscapeKeyAction=function(e){this.escapeKeyAction=e},t.prototype.getScrimClickAction=function(){return this.scrimClickAction},t.prototype.setScrimClickAction=function(e){this.scrimClickAction=e},t.prototype.getAutoStackButtons=function(){return this.autoStackButtons},t.prototype.setAutoStackButtons=function(e){this.autoStackButtons=e},t.prototype.getSuppressDefaultPressSelector=function(){return this.suppressDefaultPressSelector},t.prototype.setSuppressDefaultPressSelector=function(e){this.suppressDefaultPressSelector=e},t.prototype.layout=function(){var e=this;this.animFrame.request(Fi.POLL_LAYOUT_CHANGE,(function(){e.layoutInternal()}))},t.prototype.handleClick=function(e){if(this.adapter.eventTargetMatches(e.target,$i.SCRIM_SELECTOR)&&""!==this.scrimClickAction)this.close(this.scrimClickAction);else{var t=this.adapter.getActionFromEvent(e);t&&this.close(t)}},t.prototype.handleKeydown=function(e){var t="Enter"===e.key||13===e.keyCode;if(t&&!this.adapter.getActionFromEvent(e)){var i=e.composedPath?e.composedPath()[0]:e.target,r=!this.suppressDefaultPressSelector||!this.adapter.eventTargetMatches(i,this.suppressDefaultPressSelector);t&&r&&this.adapter.clickDefaultButton()}},t.prototype.handleDocumentKeydown=function(e){("Escape"===e.key||27===e.keyCode)&&""!==this.escapeKeyAction&&this.close(this.escapeKeyAction)},t.prototype.handleScrollEvent=function(){var e=this;this.animFrame.request(Fi.POLL_SCROLL_POS,(function(){e.toggleScrollDividerHeader(),e.toggleScrollDividerFooter()}))},t.prototype.layoutInternal=function(){this.autoStackButtons&&this.detectStackedButtons(),this.toggleScrollableClasses()},t.prototype.handleAnimationTimerEnd=function(){this.animationTimer=0,this.adapter.removeClass(Hi.OPENING),this.adapter.removeClass(Hi.CLOSING)},t.prototype.runNextAnimationFrame=function(e){var t=this;cancelAnimationFrame(this.animationFrame),this.animationFrame=requestAnimationFrame((function(){t.animationFrame=0,clearTimeout(t.animationTimer),t.animationTimer=setTimeout(e,0)}))},t.prototype.detectStackedButtons=function(){this.adapter.removeClass(Hi.STACKED);var e=this.adapter.areButtonsStacked();e&&this.adapter.addClass(Hi.STACKED),e!==this.areButtonsStacked&&(this.adapter.reverseButtons(),this.areButtonsStacked=e)},t.prototype.toggleScrollableClasses=function(){this.adapter.removeClass(Hi.SCROLLABLE),this.adapter.isContentScrollable()&&(this.adapter.addClass(Hi.SCROLLABLE),this.isFullscreen&&(this.toggleScrollDividerHeader(),this.toggleScrollDividerFooter()))},t.prototype.toggleScrollDividerHeader=function(){this.adapter.isScrollableContentAtTop()?this.adapter.hasClass(Hi.SCROLL_DIVIDER_HEADER)&&this.adapter.removeClass(Hi.SCROLL_DIVIDER_HEADER):this.adapter.addClass(Hi.SCROLL_DIVIDER_HEADER)},t.prototype.toggleScrollDividerFooter=function(){this.adapter.isScrollableContentAtBottom()?this.adapter.hasClass(Hi.SCROLL_DIVIDER_FOOTER)&&this.adapter.removeClass(Hi.SCROLL_DIVIDER_FOOTER):this.adapter.addClass(Hi.SCROLL_DIVIDER_FOOTER)},t}(ai);function Gi(e){return void 0===e&&(e=window),!!function(e){void 0===e&&(e=window);var t=!1;try{var i={get passive(){return t=!0,!1}},r=function(){};e.document.addEventListener("test",r,i),e.document.removeEventListener("test",r,i)}catch(e){t=!1}return t}(e)&&{passive:!0}}const qi=e=>(t,i)=>{if(t.constructor._observers){if(!t.constructor.hasOwnProperty("_observers")){const e=t.constructor._observers;t.constructor._observers=new Map,e.forEach(((e,i)=>t.constructor._observers.set(i,e)))}}else{t.constructor._observers=new Map;const e=t.updated;t.updated=function(t){e.call(this,t),t.forEach(((e,t)=>{const i=this.constructor._observers.get(t);void 0!==i&&i.call(this,this[t],e)}))}}t.constructor._observers.set(i,e)},ji=document.$blockingElements;class Wi extends si{constructor(){super(...arguments),this.hideActions=!1,this.stacked=!1,this.heading="",this.scrimClickAction="close",this.escapeKeyAction="close",this.open=!1,this.defaultAction="close",this.actionAttribute="dialogAction",this.initialFocusAttribute="dialogInitialFocus",this.initialSupressDefaultPressSelector="",this.mdcFoundationClass=Vi,this.boundHandleClick=null,this.boundHandleKeydown=null,this.boundHandleDocumentKeydown=null}set suppressDefaultPressSelector(e){this.mdcFoundation?this.mdcFoundation.setSuppressDefaultPressSelector(e):this.initialSupressDefaultPressSelector=e}get suppressDefaultPressSelector(){return this.mdcFoundation?this.mdcFoundation.getSuppressDefaultPressSelector():this.initialSupressDefaultPressSelector}get primaryButton(){let e=this.primarySlot.assignedNodes();e=e.filter((e=>e instanceof HTMLElement));const t=e[0];return t||null}emitNotification(e,t){const i=new CustomEvent(e,{detail:t?{action:t}:{}});this.dispatchEvent(i)}getInitialFocusEl(){const e=`[${this.initialFocusAttribute}]`,t=this.querySelector(e);if(t)return t;const i=this.primarySlot.assignedNodes({flatten:!0}),r=this.searchNodeTreesForAttribute(i,this.initialFocusAttribute);if(r)return r;const n=this.secondarySlot.assignedNodes({flatten:!0}),o=this.searchNodeTreesForAttribute(n,this.initialFocusAttribute);if(o)return o;const s=this.contentSlot.assignedNodes({flatten:!0});return this.searchNodeTreesForAttribute(s,this.initialFocusAttribute)}searchNodeTreesForAttribute(e,t){for(const i of e)if(i instanceof HTMLElement){if(i.hasAttribute(t))return i;{const e=i.querySelector(`[${t}]`);if(e)return e}}return null}createAdapter(){return Object.assign(Object.assign({},(e=this.mdcRoot,{addClass:t=>{e.classList.add(t)},removeClass:t=>{e.classList.remove(t)},hasClass:t=>e.classList.contains(t)})),{addBodyClass:()=>document.body.style.overflow="hidden",removeBodyClass:()=>document.body.style.overflow="",areButtonsStacked:()=>this.stacked,clickDefaultButton:()=>{const e=this.primaryButton;e&&e.click()},eventTargetMatches:(e,t)=>!!e&&Ht(e,t),getActionFromEvent:e=>{if(!e.target)return"";const t=function(e,t){if(e.closest)return e.closest(t);for(var i=e;i;){if(Ht(i,t))return i;i=i.parentElement}return null}(e.target,`[${this.actionAttribute}]`);return t&&t.getAttribute(this.actionAttribute)},getInitialFocusEl:()=>this.getInitialFocusEl(),isContentScrollable:()=>{const e=this.contentElement;return!!e&&e.scrollHeight>e.offsetHeight},notifyClosed:e=>this.emitNotification("closed",e),notifyClosing:e=>{this.closingDueToDisconnect||(this.open=!1),this.emitNotification("closing",e)},notifyOpened:()=>this.emitNotification("opened"),notifyOpening:()=>{this.open=!0,this.emitNotification("opening")},reverseButtons:()=>{},releaseFocus:()=>{ji.remove(this)},trapFocus:e=>{this.isConnected&&(ji.push(this),e&&e.focus())},registerContentEventHandler:(e,t)=>{this.contentElement.addEventListener(e,t)},deregisterContentEventHandler:(e,t)=>{this.contentElement.removeEventListener(e,t)},isScrollableContentAtTop:()=>{const e=this.contentElement;return!!e&&0===e.scrollTop},isScrollableContentAtBottom:()=>{const e=this.contentElement;return!!e&&Math.ceil(e.scrollHeight-e.scrollTop)===e.clientHeight},registerWindowEventHandler:(e,t)=>{window.addEventListener(e,t,Gi())},deregisterWindowEventHandler:(e,t)=>{window.removeEventListener(e,t,Gi())}});var e}render(){const e={[Hi.STACKED]:this.stacked};let t=be``;this.heading&&(t=this.renderHeading());const i={"mdc-dialog__actions":!this.hideActions};return be`
    <div class="mdc-dialog ${yi(e)}"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="title"
        aria-describedby="content">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          ${t}
          <div id="content" class="mdc-dialog__content">
            <slot id="contentSlot"></slot>
          </div>
          <footer
              id="actions"
              class="${yi(i)}">
            <span>
              <slot name="secondaryAction"></slot>
            </span>
            <span>
             <slot name="primaryAction"></slot>
            </span>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>`}renderHeading(){return be`
      <h2 id="title" class="mdc-dialog__title">${this.heading}</h2>`}firstUpdated(){super.firstUpdated(),this.mdcFoundation.setAutoStackButtons(!0),this.initialSupressDefaultPressSelector?this.suppressDefaultPressSelector=this.initialSupressDefaultPressSelector:this.suppressDefaultPressSelector=[this.suppressDefaultPressSelector,"mwc-textarea","mwc-menu mwc-list-item","mwc-select mwc-list-item"].join(", "),this.boundHandleClick=this.mdcFoundation.handleClick.bind(this.mdcFoundation),this.boundHandleKeydown=this.mdcFoundation.handleKeydown.bind(this.mdcFoundation),this.boundHandleDocumentKeydown=this.mdcFoundation.handleDocumentKeydown.bind(this.mdcFoundation)}connectedCallback(){super.connectedCallback(),this.open&&this.mdcFoundation&&!this.mdcFoundation.isOpen()&&(this.setEventListeners(),this.mdcFoundation.open())}disconnectedCallback(){super.disconnectedCallback(),this.open&&this.mdcFoundation&&(this.removeEventListeners(),this.closingDueToDisconnect=!0,this.mdcFoundation.close(this.currentAction||this.defaultAction),this.closingDueToDisconnect=!1,this.currentAction=void 0,ji.remove(this))}forceLayout(){this.mdcFoundation.layout()}focus(){const e=this.getInitialFocusEl();e&&e.focus()}blur(){if(!this.shadowRoot)return;const e=this.shadowRoot.activeElement;if(e)e instanceof HTMLElement&&e.blur();else{const e=this.getRootNode(),t=e instanceof Document?e.activeElement:null;t instanceof HTMLElement&&t.blur()}}setEventListeners(){this.boundHandleClick&&this.mdcRoot.addEventListener("click",this.boundHandleClick),this.boundHandleKeydown&&this.mdcRoot.addEventListener("keydown",this.boundHandleKeydown,Gi()),this.boundHandleDocumentKeydown&&document.addEventListener("keydown",this.boundHandleDocumentKeydown,Gi())}removeEventListeners(){this.boundHandleClick&&this.mdcRoot.removeEventListener("click",this.boundHandleClick),this.boundHandleKeydown&&this.mdcRoot.removeEventListener("keydown",this.boundHandleKeydown),this.boundHandleDocumentKeydown&&document.removeEventListener("keydown",this.boundHandleDocumentKeydown)}close(){this.open=!1}show(){this.open=!0}}It([Lt(".mdc-dialog")],Wi.prototype,"mdcRoot",void 0),It([Lt('slot[name="primaryAction"]')],Wi.prototype,"primarySlot",void 0),It([Lt('slot[name="secondaryAction"]')],Wi.prototype,"secondarySlot",void 0),It([Lt("#contentSlot")],Wi.prototype,"contentSlot",void 0),It([Lt(".mdc-dialog__content")],Wi.prototype,"contentElement",void 0),It([Lt(".mdc-container")],Wi.prototype,"conatinerElement",void 0),It([Nt({type:Boolean})],Wi.prototype,"hideActions",void 0),It([Nt({type:Boolean}),qi((function(){this.forceLayout()}))],Wi.prototype,"stacked",void 0),It([Nt({type:String})],Wi.prototype,"heading",void 0),It([Nt({type:String}),qi((function(e){this.mdcFoundation.setScrimClickAction(e)}))],Wi.prototype,"scrimClickAction",void 0),It([Nt({type:String}),qi((function(e){this.mdcFoundation.setEscapeKeyAction(e)}))],Wi.prototype,"escapeKeyAction",void 0),It([Nt({type:Boolean,reflect:!0}),qi((function(e){this.mdcFoundation&&this.isConnected&&(e?(this.setEventListeners(),this.mdcFoundation.open()):(this.removeEventListeners(),this.mdcFoundation.close(this.currentAction||this.defaultAction),this.currentAction=void 0))}))],Wi.prototype,"open",void 0),It([Nt()],Wi.prototype,"defaultAction",void 0),It([Nt()],Wi.prototype,"actionAttribute",void 0),It([Nt()],Wi.prototype,"initialFocusAttribute",void 0);const Yi=Gt`.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__surface-scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog .mdc-dialog__close{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-dialog .mdc-dialog__close .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close .mdc-icon-button__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-dialog .mdc-dialog__close:hover .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close.mdc-ripple-surface--hover .mdc-icon-button__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded--background-focused .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):focus .mdc-icon-button__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded) .mdc-icon-button__ripple::after{transition:opacity 150ms linear}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):active .mdc-icon-button__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions,.mdc-dialog.mdc-dialog--scrollable.mdc-dialog-scroll-divider-footer .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:1px solid rgba(0,0,0,.12);margin-bottom:0}.mdc-dialog.mdc-dialog-scroll-divider-header.mdc-dialog--fullscreen .mdc-dialog__header{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-dialog__surface{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12)}.mdc-dialog__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit)}.mdc-dialog__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit)}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(max-width: 600px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid transparent;border-radius:inherit;content:"";pointer-events:none}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid transparent;display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid transparent}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1;z-index:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}#actions:not(.mdc-dialog__actions){display:none}.mdc-dialog__surface{box-shadow:var(--mdc-dialog-box-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}@media(min-width: 560px){.mdc-dialog .mdc-dialog__surface{max-width:560px;max-width:var(--mdc-dialog-max-width, 560px)}}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0, 0, 0, 0.32);background-color:var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32))}.mdc-dialog .mdc-dialog__title{color:rgba(0, 0, 0, 0.87);color:var(--mdc-dialog-heading-ink-color, rgba(0, 0, 0, 0.87))}.mdc-dialog .mdc-dialog__content{color:rgba(0, 0, 0, 0.6);color:var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6))}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12))}.mdc-dialog .mdc-dialog__surface{min-width:280px;min-width:var(--mdc-dialog-min-width, 280px)}.mdc-dialog .mdc-dialog__surface{max-height:var(--mdc-dialog-max-height, calc(100% - 32px))}#actions ::slotted(*){margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*[dir=rtl]){margin-left:0;margin-right:8px}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*[dir=rtl]){text-align:left}.mdc-dialog--stacked #actions{flex-direction:column-reverse}.mdc-dialog--stacked #actions *:not(:last-child) ::slotted(*){flex-basis:.000000001px;margin-top:12px}`;let Ji=class extends Wi{};Ji.styles=[Yi],Ji=It([Ot("mwc-dialog")],Ji);const Ki=!(window.ShadyDOM&&window.ShadyDOM.inUse);let Xi,Zi;function Qi(e){Xi=(!e||!e.shimcssproperties)&&(Ki||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(Zi=window.ShadyCSS.cssBuild);const er=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?Xi=window.ShadyCSS.nativeCss:window.ShadyCSS?(Qi(window.ShadyCSS),window.ShadyCSS=void 0):Qi(window.WebComponents&&window.WebComponents.flags);const tr=Xi;class ir{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function rr(e){return nr(function(e){let t=new ir;t.start=0,t.end=e.length;let i=t;for(let r=0,n=e.length;r<n;r++)if(e[r]===ar){i.rules||(i.rules=[]);let e=i,t=e.rules[e.rules.length-1]||null;i=new ir,i.start=r+1,i.parent=e,i.previous=t,e.rules.push(i)}else e[r]===lr&&(i.end=r+1,i=i.parent||t);return t}(e=e.replace(dr.comments,"").replace(dr.port,"")),e)}function nr(e,t){let i=t.substring(e.start,e.end-1);if(e.parsedCssText=e.cssText=i.trim(),e.parent){let r=e.previous?e.previous.end:e.parent.start;i=t.substring(r,e.start-1),i=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e}))}(i),i=i.replace(dr.multipleSpaces," "),i=i.substring(i.lastIndexOf(";")+1);let n=e.parsedSelector=e.selector=i.trim();e.atRule=0===n.indexOf(pr),e.atRule?0===n.indexOf(hr)?e.type=sr.MEDIA_RULE:n.match(dr.keyframesRule)&&(e.type=sr.KEYFRAMES_RULE,e.keyframesName=e.selector.split(dr.multipleSpaces).pop()):0===n.indexOf(cr)?e.type=sr.MIXIN_RULE:e.type=sr.STYLE_RULE}let r=e.rules;if(r)for(let e,i=0,n=r.length;i<n&&(e=r[i]);i++)nr(e,t);return e}function or(e,t,i=""){let r="";if(e.cssText||e.rules){let i=e.rules;if(i&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(cr)}(i))for(let e,n=0,o=i.length;n<o&&(e=i[n]);n++)r=or(e,t,r);else r=t?e.cssText:function(e){return function(e){return e.replace(dr.mixinApply,"").replace(dr.varApply,"")}(e=function(e){return e.replace(dr.customProp,"").replace(dr.mixinProp,"")}(e))}(e.cssText),r=r.trim(),r&&(r="  "+r+"\n")}return r&&(e.selector&&(i+=e.selector+" "+ar+"\n"),i+=r,e.selector&&(i+=lr+"\n\n")),i}const sr={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},ar="{",lr="}",dr={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},cr="--",hr="@media",pr="@",ur=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,mr=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,fr=/@media\s(.*)/,gr=new Set;function _r(e){const t=e.textContent;if(!gr.has(t)){gr.add(t);const e=document.createElement("style");e.setAttribute("shady-unscoped",""),e.textContent=t,document.head.appendChild(e)}}function br(e){return e.hasAttribute("shady-unscoped")}function yr(e,t){return e?("string"==typeof e&&(e=rr(e)),t&&wr(e,t),or(e,tr)):""}function vr(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=rr(e.textContent)),e.__cssRules||null}function wr(e,t,i,r){if(!e)return;let n=!1,o=e.type;if(r&&o===sr.MEDIA_RULE){let t=e.selector.match(fr);t&&(window.matchMedia(t[1]).matches||(n=!0))}o===sr.STYLE_RULE?t(e):i&&o===sr.KEYFRAMES_RULE?i(e):o===sr.MIXIN_RULE&&(n=!0);let s=e.rules;if(s&&!n)for(let e,n=0,o=s.length;n<o&&(e=s[n]);n++)wr(e,t,i,r)}function Ar(e,t){let i=e.indexOf("var(");if(-1===i)return t(e,"","","");let r=function(e,t){let i=0;for(let r=t,n=e.length;r<n;r++)if("("===e[r])i++;else if(")"===e[r]&&0==--i)return r;return-1}(e,i+3),n=e.substring(i+4,r),o=e.substring(0,i),s=Ar(e.substring(r+1),t),a=n.indexOf(",");return-1===a?t(o,n.trim(),"",s):t(o,n.substring(0,a).trim(),n.substring(a+1).trim(),s)}window.ShadyDOM&&window.ShadyDOM.wrap;const xr="css-build";function Cr(e){if(void 0!==Zi)return Zi;if(void 0===e.__cssBuild){const t=e.getAttribute(xr);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===xr)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}(e),e.__cssBuild=t}}return e.__cssBuild||""}function Sr(e){return""!==Cr(e)}function Er(e,t){for(let i in t)null===i?e.style.removeProperty(i):e.style.setProperty(i,t[i])}function Tr(e,t){const i=window.getComputedStyle(e).getPropertyValue(t);return i?i.trim():""}const Pr=/;\s*/m,Ir=/^\s*(initial)|(inherit)\s*$/,kr=/\s*!important/,Or="_-_";class Rr{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let Nr=null;class zr{constructor(){this._currentElement=null,this._measureElement=null,this._map=new Rr}detectMixin(e){return function(e){const t=mr.test(e)||ur.test(e);return mr.lastIndex=0,ur.lastIndex=0,t}(e)}gatherStyles(e){const t=function(e){const t=[],i=e.querySelectorAll("style");for(let e=0;e<i.length;e++){const r=i[e];br(r)?Ki||(_r(r),r.parentNode.removeChild(r)):(t.push(r.textContent),r.parentNode.removeChild(r))}return t.join("").trim()}(e.content);if(t){const i=document.createElement("style");return i.textContent=t,e.content.insertBefore(i,e.content.firstChild),i}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const i=e._gatheredStyle;return i?this.transformStyle(i,t):null}transformStyle(e,t=""){let i=vr(e);return this.transformRules(i,t),e.textContent=yr(i),i}transformCustomStyle(e){let t=vr(e);return wr(t,(e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)})),e.textContent=yr(t),t}transformRules(e,t){this._currentElement=t,wr(e,(e=>{this.transformRule(e)})),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(ur,((e,i,r,n)=>this._produceCssProperties(e,i,r,n,t))),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const i={};let r=!1;return wr(t,(t=>{r=r||t===e,r||t.selector===e.selector&&Object.assign(i,this._cssTextToMap(t.parsedCssText))})),i}_consumeCssProperties(e,t){let i=null;for(;i=mr.exec(e);){let r=i[0],n=i[1],o=i.index,s=o+r.indexOf("@apply"),a=o+r.length,l=e.slice(0,s),d=e.slice(a),c=t?this._fallbacksFromPreviousRules(t):{};Object.assign(c,this._cssTextToMap(l));let h=this._atApplyToCssProperties(n,c);e=`${l}${h}${d}`,mr.lastIndex=o+h.length}return e}_atApplyToCssProperties(e,t){e=e.replace(Pr,"");let i=[],r=this._map.get(e);if(r||(this._map.set(e,{}),r=this._map.get(e)),r){let n,o,s;this._currentElement&&(r.dependants[this._currentElement]=!0);const a=r.properties;for(n in a)s=t&&t[n],o=[n,": var(",e,Or,n],s&&o.push(",",s.replace(kr,"")),o.push(")"),kr.test(a[n])&&o.push(" !important"),i.push(o.join(""))}return i.join("; ")}_replaceInitialOrInherit(e,t){let i=Ir.exec(t);return i&&(t=i[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let i,r,n=e.split(";"),o={};for(let e,s,a=0;a<n.length;a++)e=n[a],e&&(s=e.split(":"),s.length>1&&(i=s[0].trim(),r=s.slice(1).join(":"),t&&(r=this._replaceInitialOrInherit(i,r)),o[i]=r));return o}_invalidateMixinEntry(e){if(Nr)for(let t in e.dependants)t!==this._currentElement&&Nr(t)}_produceCssProperties(e,t,i,r,n){if(i&&Ar(i,((e,t)=>{t&&this._map.get(t)&&(r=`@apply ${t};`)})),!r)return e;let o=this._consumeCssProperties(""+r,n),s=e.slice(0,e.indexOf("--")),a=this._cssTextToMap(o,!0),l=a,d=this._map.get(t),c=d&&d.properties;c?l=Object.assign(Object.create(c),a):this._map.set(t,l);let h,p,u=[],m=!1;for(h in l)p=a[h],void 0===p&&(p="initial"),c&&!(h in c)&&(m=!0),u.push(`${t}_-_${h}: ${p}`);return m&&this._invalidateMixinEntry(d),d&&(d.properties=l),i&&(s=`${e};${s}`),`${s}${u.join("; ")};`}}zr.prototype.detectMixin=zr.prototype.detectMixin,zr.prototype.transformStyle=zr.prototype.transformStyle,zr.prototype.transformCustomStyle=zr.prototype.transformCustomStyle,zr.prototype.transformRules=zr.prototype.transformRules,zr.prototype.transformRule=zr.prototype.transformRule,zr.prototype.transformTemplate=zr.prototype.transformTemplate,zr.prototype._separator=Or,Object.defineProperty(zr.prototype,"invalidCallback",{get:()=>Nr,set(e){Nr=e}});const Dr={},Mr="_applyShimCurrentVersion",Lr="_applyShimNextVersion",Fr="_applyShimValidatingVersion",Hr=Promise.resolve();function $r(e){let t=Dr[e];t&&function(e){e[Mr]=e[Mr]||0,e[Fr]=e[Fr]||0,e[Lr]=(e[Lr]||0)+1}(t)}function Br(e){return e[Mr]===e[Lr]}let Ur,Vr=null,Gr=window.HTMLImports&&window.HTMLImports.whenReady||null;function qr(e){requestAnimationFrame((function(){Gr?Gr(e):(Vr||(Vr=new Promise((e=>{Ur=e})),"complete"===document.readyState?Ur():document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&Ur()}))),Vr.then((function(){e&&e()})))}))}const jr="__seenByShadyCSS",Wr="__shadyCSSCachedStyle";let Yr=null,Jr=null;class Kr{constructor(){this.customStyles=[],this.enqueued=!1,qr((()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()}))}enqueueDocumentValidation(){!this.enqueued&&Jr&&(this.enqueued=!0,qr(Jr))}addCustomStyle(e){e[jr]||(e[jr]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[Wr])return e[Wr];let t;return t=e.getStyle?e.getStyle():e,t}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const i=e[t];if(i[Wr])continue;const r=this.getStyleForCustomStyle(i);if(r){const e=r.__appliedElement||r;Yr&&Yr(e),i[Wr]=e}}return e}}Kr.prototype.addCustomStyle=Kr.prototype.addCustomStyle,Kr.prototype.getStyleForCustomStyle=Kr.prototype.getStyleForCustomStyle,Kr.prototype.processStyles=Kr.prototype.processStyles,Object.defineProperties(Kr.prototype,{transformCallback:{get:()=>Yr,set(e){Yr=e}},validateCallback:{get:()=>Jr,set(e){let t=!1;Jr||(t=!0),Jr=e,t&&this.enqueueDocumentValidation()}}});const Xr=new zr;class Zr{constructor(){this.customStyleInterface=null,Xr.invalidCallback=$r}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=e=>{Xr.transformCustomStyle(e)},this.customStyleInterface.validateCallback=()=>{requestAnimationFrame((()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()}))})}prepareTemplate(e,t){if(this.ensure(),Sr(e))return;Dr[t]=e;let i=Xr.transformTemplate(e,t);e._styleAst=i}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let i=e[t],r=this.customStyleInterface.getStyleForCustomStyle(i);r&&Xr.transformCustomStyle(r)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&Er(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,i="",r="";return t?t.indexOf("-")>-1?i=t:(r=t,i=e.getAttribute&&e.getAttribute("is")||""):(i=e.is,r=e.extends),{is:i,typeExtension:r}}(e),i=Dr[t];if((!i||!Sr(i))&&i&&!Br(i)){(function(e){return!Br(e)&&e[Fr]===e[Lr]})(i)||(this.prepareTemplate(i,t),function(e){e[Fr]=e[Lr],e._validating||(e._validating=!0,Hr.then((function(){e[Mr]=e[Lr],e._validating=!1})))}(i));let r=e.shadowRoot;if(r){let e=r.querySelector("style");e&&(e.__cssRules=i._styleAst,e.textContent=yr(i._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new Zr;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,i,r){e.flushCustomStyles(),e.prepareTemplate(t,i)},prepareTemplateStyles(e,t,i){window.ShadyCSS.prepareTemplate(e,t,i)},prepareTemplateDom(e,t){},styleSubtree(t,i){e.flushCustomStyles(),e.styleSubtree(t,i)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>Tr(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:tr,nativeShadow:Ki,cssBuild:Zi,disableRuntime:er},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=Xr,window.JSCompiler_renameProperty=function(e,t){return e};let Qr,en,tn=/(url\()([^)]*)(\))/g,rn=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function nn(e,t){if(e&&rn.test(e))return e;if("//"===e)return e;if(void 0===Qr){Qr=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",Qr="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),Qr)try{return new URL(e,t).href}catch(t){return e}return en||(en=document.implementation.createHTMLDocument("temp"),en.base=en.createElement("base"),en.head.appendChild(en.base),en.anchor=en.createElement("a"),en.body.appendChild(en.anchor)),en.base.href=t,en.anchor.href=e,en.anchor.href||e}function on(e,t){return e.replace(tn,(function(e,i,r,n){return i+"'"+nn(r.replace(/["']/g,""),t)+"'"+n}))}function sn(e){return e.substring(0,e.lastIndexOf("/")+1)}const an=!window.ShadyDOM||!window.ShadyDOM.inUse;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss);const ln=an&&"adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype&&(()=>{try{const e=new CSSStyleSheet;e.replaceSync("");const t=document.createElement("div");return t.attachShadow({mode:"open"}),t.shadowRoot.adoptedStyleSheets=[e],t.shadowRoot.adoptedStyleSheets[0]===e}catch(e){return!1}})();let dn=window.Polymer&&window.Polymer.rootPath||sn(document.baseURI||window.location.href),cn=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0,hn=window.Polymer&&window.Polymer.setPassiveTouchGestures||!1,pn=window.Polymer&&window.Polymer.strictTemplatePolicy||!1,un=window.Polymer&&window.Polymer.allowTemplateFromDomModule||!1,mn=window.Polymer&&window.Polymer.legacyOptimizations||!1,fn=window.Polymer&&window.Polymer.legacyWarnings||!1,gn=window.Polymer&&window.Polymer.syncInitialRender||!1,_n=window.Polymer&&window.Polymer.legacyUndefined||!1,bn=window.Polymer&&window.Polymer.orderedComputed||!1,yn=window.Polymer&&window.Polymer.removeNestedTemplates||!1,vn=window.Polymer&&window.Polymer.fastDomIf||!1,wn=window.Polymer&&window.Polymer.suppressTemplateNotifications||!1,An=window.Polymer&&window.Polymer.legacyNoObservedAttributes||!1,xn=window.Polymer&&window.Polymer.useAdoptedStyleSheetsWithBuiltCSS||!1,Cn=0;const Sn=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let i=Cn++;return function(r){let n=r.__mixinSet;if(n&&n[i])return r;let o=t,s=o.get(r);if(!s){s=e(r),o.set(r,s);let t=Object.create(s.__mixinSet||n||null);t[i]=!0,s.__mixinSet=t}return s}};let En={},Tn={};function Pn(e,t){En[e]=Tn[e.toLowerCase()]=t}function In(e){return En[e]||Tn[e.toLowerCase()]}class kn extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let i=In(e);return i&&t?i.querySelector(t):i}return null}attributeChangedCallback(e,t,i,r){t!==i&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=nn(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=sn(t)}return this.__assetpath}register(e){if(e=e||this.id){if(pn&&void 0!==In(e))throw Pn(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,Pn(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}kn.prototype.modules=En,customElements.define("dom-module",kn);const On="shady-unscoped";function Rn(e){return kn.import(e)}function Nn(e){const t=on((e.body?e.body:e).textContent,e.baseURI),i=document.createElement("style");return i.textContent=t,i}function zn(e){const t=e.trim().split(/\s+/),i=[];for(let e=0;e<t.length;e++)i.push(...Dn(t[e]));return i}function Dn(e){const t=Rn(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...Ln(t));const i=t.querySelector("template");i&&e.push(...Mn(i,t.assetpath)),t._styles=e}return t._styles}function Mn(e,t){if(!e._styles){const i=[],r=e.content.querySelectorAll("style");for(let e=0;e<r.length;e++){let n=r[e],o=n.getAttribute("include");o&&i.push(...zn(o).filter((function(e,t,i){return i.indexOf(e)===t}))),t&&(n.textContent=on(n.textContent,t)),i.push(n)}e._styles=i}return e._styles}function Ln(e){const t=[],i=e.querySelectorAll("link[rel=import][type~=css]");for(let e=0;e<i.length;e++){let r=i[e];if(r.import){const e=r.import,i=r.hasAttribute(On);if(i&&!e._unscopedStyle){const t=Nn(e);t.setAttribute(On,""),e._unscopedStyle=t}else e._style||(e._style=Nn(e));t.push(i?e._unscopedStyle:e._style)}}return t}function Fn(e){let t=Rn(e);if(t&&void 0===t._cssText){let e=function(e){let t="",i=Ln(e);for(let e=0;e<i.length;e++)t+=i[e].textContent;return t}(t),i=t.querySelector("template");i&&(e+=function(e,t){let i="";const r=Mn(e,t);for(let e=0;e<r.length;e++){let t=r[e];t.parentNode&&t.parentNode.removeChild(t),i+=t.textContent}return i}(i,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}const Hn=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e;function $n(e){return e.indexOf(".")>=0}function Bn(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function Un(e,t){return 0===e.indexOf(t+".")}function Vn(e,t){return 0===t.indexOf(e+".")}function Gn(e,t,i){return t+i.slice(e.length)}function qn(e){if(Array.isArray(e)){let t=[];for(let i=0;i<e.length;i++){let r=e[i].toString().split(".");for(let e=0;e<r.length;e++)t.push(r[e])}return t.join(".")}return e}function jn(e){return Array.isArray(e)?qn(e).split("."):e.toString().split(".")}function Wn(e,t,i){let r=e,n=jn(t);for(let e=0;e<n.length;e++){if(!r)return;r=r[n[e]]}return i&&(i.path=n.join(".")),r}function Yn(e,t,i){let r=e,n=jn(t),o=n[n.length-1];if(n.length>1){for(let e=0;e<n.length-1;e++){if(r=r[n[e]],!r)return}r[o]=i}else r[t]=i;return n.join(".")}const Jn={},Kn=/-[a-z]/g,Xn=/([A-Z])/g;function Zn(e){return Jn[e]||(Jn[e]=e.indexOf("-")<0?e:e.replace(Kn,(e=>e[1].toUpperCase())))}function Qn(e){return Jn[e]||(Jn[e]=e.replace(Xn,"-$1").toLowerCase())}let eo=0,to=0,io=[],ro=0,no=!1,oo=document.createTextNode("");new window.MutationObserver((function(){no=!1;const e=io.length;for(let t=0;t<e;t++){let e=io[t];if(e)try{e()}catch(e){setTimeout((()=>{throw e}))}}io.splice(0,e),to+=e})).observe(oo,{characterData:!0});const so={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},ao={run:e=>window.requestAnimationFrame(e),cancel(e){window.cancelAnimationFrame(e)}},lo={run:e=>window.requestIdleCallback?window.requestIdleCallback(e):window.setTimeout(e,16),cancel(e){window.cancelIdleCallback?window.cancelIdleCallback(e):window.clearTimeout(e)}},co={run:e=>(no||(no=!0,oo.textContent=ro++),io.push(e),eo++),cancel(e){const t=e-to;if(t>=0){if(!io[t])throw new Error("invalid async handle: "+e);io[t]=null}}},ho=co,po=Sn((e=>class extends e{static createProperties(e){const t=this.prototype;for(let i in e)i in t||t._createPropertyAccessor(i)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor",this))||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes",this))||(this.__dataAttributes=Object.assign({},this.__dataAttributes));let t=this.__dataAttributes[e];return t||(t=this.constructor.attributeNameForProperty(e),this.__dataAttributes[t]=e),t}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this.__data[e]},set:t?function(){}:function(t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__dataCounter=0,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,i){let r=this.__data[e],n=this._shouldPropertyChange(e,t,r);return n&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),this.__dataOld&&!(e in this.__dataOld)&&(this.__dataOld[e]=r),this.__data[e]=t,this.__dataPending[e]=t),n}_isPropertyPending(e){return!(!this.__dataPending||!this.__dataPending.hasOwnProperty(e))}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,ho.run((()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())})))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){this.__dataCounter++;const e=this.__data,t=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(e,t,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,i)),this.__dataCounter--}_shouldPropertiesChange(e,t,i){return Boolean(t)}_propertiesChanged(e,t,i){}_shouldPropertyChange(e,t,i){return i!==t&&(i==i||t==t)}attributeChangedCallback(e,t,i,r){t!==i&&this._attributeToProperty(e,i),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,i,r)}_attributeToProperty(e,t,i){if(!this.__serializing){const r=this.__dataAttributes,n=r&&r[e]||e;this[n]=this._deserializeValue(t,i||this.constructor.typeForProperty(n))}}_propertyToAttribute(e,t,i){this.__serializing=!0,i=arguments.length<3?this[e]:i,this._valueToNodeAttribute(this,i,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,i){const r=this._serializeValue(t);"class"!==i&&"name"!==i&&"slot"!==i||(e=Hn(e)),void 0===r?e.removeAttribute(i):e.setAttribute(i,r)}_serializeValue(e){return"boolean"==typeof e?e?"":void 0:null!=e?e.toString():void 0}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}})),uo={};let mo=HTMLElement.prototype;for(;mo;){let e=Object.getOwnPropertyNames(mo);for(let t=0;t<e.length;t++)uo[e[t]]=!0;mo=Object.getPrototypeOf(mo)}const fo=Sn((e=>{const t=po(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(Zn(e[t]))}static attributeNameForProperty(e){return Qn(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const i=this;i.hasAttribute(e)||this._valueToNodeAttribute(i,t,e)}_serializeValue(e){if("object"==typeof e){if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}}return super._serializeValue(e)}_deserializeValue(e,t){let i;switch(t){case Object:try{i=JSON.parse(e)}catch(t){i=e}break;case Array:try{i=JSON.parse(e)}catch(t){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:i=isNaN(e)?String(e):Number(e),i=new Date(i);break;default:i=super._deserializeValue(e,t)}return i}_definePropertyAccessor(e,t){!function(e,t){if(!uo[t]){let i=e[t];void 0!==i&&(e.__data?e._setPendingProperty(t,i):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=i))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}})),go={"dom-if":!0,"dom-repeat":!0};let _o=!1,bo=!1;function yo(e){(function(){if(!_o){_o=!0;const e=document.createElement("textarea");e.placeholder="a",bo=e.placeholder===e.textContent}return bo})()&&"textarea"===e.localName&&e.placeholder&&e.placeholder===e.textContent&&(e.textContent=null)}function vo(e){let t=e.getAttribute("is");if(t&&go[t]){let i=e;for(i.removeAttribute("is"),e=i.ownerDocument.createElement(t),i.parentNode.replaceChild(e,i),e.appendChild(i);i.attributes.length;)e.setAttribute(i.attributes[0].name,i.attributes[0].value),i.removeAttribute(i.attributes[0].name)}return e}function wo(e,t){let i=t.parentInfo&&wo(e,t.parentInfo);if(!i)return e;for(let e=i.firstChild,r=0;e;e=e.nextSibling)if(t.parentIndex===r++)return e}function Ao(e,t,i,r){r.id&&(t[r.id]=i)}function xo(e,t,i){if(i.events&&i.events.length)for(let r,n=0,o=i.events;n<o.length&&(r=o[n]);n++)e._addMethodEventListenerToNode(t,r.name,r.value,e)}function Co(e,t,i,r){i.templateInfo&&(t._templateInfo=i.templateInfo,t._parentTemplateInfo=r)}const So=Sn((e=>class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let i=e._templateInfo={};i.nodeInfoList=[],i.nestedTemplate=Boolean(t),i.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,i,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,i){return this._parseTemplateNode(e.content,t,i)}static _parseTemplateNode(e,t,i){let r=!1,n=e;return"template"!=n.localName||n.hasAttribute("preserve-content")?"slot"===n.localName&&(t.hasInsertionPoint=!0):r=this._parseTemplateNestedTemplate(n,t,i)||r,yo(n),n.firstChild&&this._parseTemplateChildNodes(n,t,i),n.hasAttributes&&n.hasAttributes()&&(r=this._parseTemplateNodeAttributes(n,t,i)||r),r||i.noted}static _parseTemplateChildNodes(e,t,i){if("script"!==e.localName&&"style"!==e.localName)for(let r,n=e.firstChild,o=0;n;n=r){if("template"==n.localName&&(n=vo(n)),r=n.nextSibling,n.nodeType===Node.TEXT_NODE){let i=r;for(;i&&i.nodeType===Node.TEXT_NODE;)n.textContent+=i.textContent,r=i.nextSibling,e.removeChild(i),i=r;if(t.stripWhiteSpace&&!n.textContent.trim()){e.removeChild(n);continue}}let s={parentIndex:o,parentInfo:i};this._parseTemplateNode(n,t,s)&&(s.infoIndex=t.nodeInfoList.push(s)-1),n.parentNode&&o++}}static _parseTemplateNestedTemplate(e,t,i){let r=e,n=this._parseTemplate(r,t);return(n.content=r.content.ownerDocument.createDocumentFragment()).appendChild(r.content),i.templateInfo=n,!0}static _parseTemplateNodeAttributes(e,t,i){let r=!1,n=Array.from(e.attributes);for(let o,s=n.length-1;o=n[s];s--)r=this._parseTemplateNodeAttribute(e,t,i,o.name,o.value)||r;return r}static _parseTemplateNodeAttribute(e,t,i,r,n){return"on-"===r.slice(0,3)?(e.removeAttribute(r),i.events=i.events||[],i.events.push({name:r.slice(3),value:n}),!0):"id"===r&&(i.id=n,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e,t){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let i=(t=t||this.constructor._parseTemplate(e)).nodeInfoList,r=t.content||e.content,n=document.importNode(r,!0);n.__noInsertionPoint=!t.hasInsertionPoint;let o=n.nodeList=new Array(i.length);n.$={};for(let e,r=0,s=i.length;r<s&&(e=i[r]);r++){let i=o[r]=wo(n,e);Ao(0,n.$,i,e),Co(0,i,e,t),xo(this,i,e)}return n=n,n}_addMethodEventListenerToNode(e,t,i,r){let n=function(e,t,i){return e=e._methodHost||e,function(t){e[i]?e[i](t,t.detail):console.warn("listener method `"+i+"` not defined")}}(r=r||e,0,i);return this._addEventListenerToNode(e,t,n),n}_addEventListenerToNode(e,t,i){e.addEventListener(t,i)}_removeEventListenerFromNode(e,t,i){e.removeEventListener(t,i)}}));let Eo=0;const To=[],Po={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},Io="__computeInfo",ko=/[A-Z]/;function Oo(e,t,i){let r=e[t];if(r){if(!e.hasOwnProperty(t)&&(r=e[t]=Object.create(e[t]),i))for(let e in r){let t=r[e],i=r[e]=Array(t.length);for(let e=0;e<t.length;e++)i[e]=t[e]}}else r=e[t]={};return r}function Ro(e,t,i,r,n,o){if(t){let s=!1;const a=Eo++;for(let l in i){let d=t[n?Bn(l):l];if(d)for(let t,c=0,h=d.length;c<h&&(t=d[c]);c++)t.info&&t.info.lastRun===a||n&&!zo(l,t.trigger)||(t.info&&(t.info.lastRun=a),t.fn(e,l,i,r,t.info,n,o),s=!0)}return s}return!1}function No(e,t,i,r,n,o,s,a){let l=!1,d=t[s?Bn(r):r];if(d)for(let t,c=0,h=d.length;c<h&&(t=d[c]);c++)t.info&&t.info.lastRun===i||s&&!zo(r,t.trigger)||(t.info&&(t.info.lastRun=i),t.fn(e,r,n,o,t.info,s,a),l=!0);return l}function zo(e,t){if(t){let i=t.name;return i==e||!(!t.structured||!Un(i,e))||!(!t.wildcard||!Vn(i,e))}return!0}function Do(e,t,i,r,n){let o="string"==typeof n.method?e[n.method]:n.method,s=n.property;o?o.call(e,e.__data[s],r[s]):n.dynamicFn||console.warn("observer method `"+n.method+"` not defined")}function Mo(e,t,i){let r=Bn(t);if(r!==t){return Lo(e,Qn(r)+"-changed",i[t],t),!0}return!1}function Lo(e,t,i,r){let n={value:i,queueProperty:!0};r&&(n.path=r),Hn(e).dispatchEvent(new CustomEvent(t,{detail:n}))}function Fo(e,t,i,r,n,o){let s=(o?Bn(t):t)!=t?t:null,a=s?Wn(e,s):e.__data[t];s&&void 0===a&&(a=i[t]),Lo(e,n.eventName,a,s)}function Ho(e,t,i,r,n){let o=e.__data[t];cn&&(o=cn(o,n.attrName,"attribute",e)),e._propertyToAttribute(t,n.attrName,o)}function $o(e,t,i,r){let n=e[Po.COMPUTE];if(n)if(bn){Eo++;const o=function(e){let t=e.constructor.__orderedComputedDeps;if(!t){t=new Map;const i=e[Po.COMPUTE];let r,{counts:n,ready:o,total:s}=function(e){const t=e.__computeInfo,i={},r=e[Po.COMPUTE],n=[];let o=0;for(let e in t){const r=t[e];o+=i[e]=r.args.filter((e=>!e.literal)).length+(r.dynamicFn?1:0)}for(let e in r)t[e]||n.push(e);return{counts:i,ready:n,total:o}}(e);for(;r=o.shift();){t.set(r,t.size);const e=i[r];e&&e.forEach((e=>{const t=e.info.methodInfo;--s,0==--n[t]&&o.push(t)}))}if(0!==s){const t=e;console.warn(`Computed graph for ${t.localName} incomplete; circular?`)}e.constructor.__orderedComputedDeps=t}return t}(e),s=[];for(let e in t)Uo(e,n,s,o,r);let a;for(;a=s.shift();)Vo(e,"",t,i,a)&&Uo(a.methodInfo,n,s,o,r);Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),e.__dataPending=null}else{let o=t;for(;Ro(e,n,o,i,r);)Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),o=e.__dataPending,e.__dataPending=null}}const Bo=(e,t,i)=>{let r=0,n=t.length-1,o=-1;for(;r<=n;){const s=r+n>>1,a=i.get(t[s].methodInfo)-i.get(e.methodInfo);if(a<0)r=s+1;else{if(!(a>0)){o=s;break}n=s-1}}o<0&&(o=n+1),t.splice(o,0,e)},Uo=(e,t,i,r,n)=>{const o=t[n?Bn(e):e];if(o)for(let t=0;t<o.length;t++){const s=o[t];s.info.lastRun===Eo||n&&!zo(e,s.trigger)||(s.info.lastRun=Eo,Bo(s.info,i,r))}};function Vo(e,t,i,r,n){let o=Ko(e,t,i,r,n);if(o===To)return!1;let s=n.methodInfo;return e.__dataHasAccessor&&e.__dataHasAccessor[s]?e._setPendingProperty(s,o,!0):(e[s]=o,!1)}function Go(e,t,i,r,n,o,s){i.bindings=i.bindings||[];let a={kind:r,target:n,parts:o,literal:s,isCompound:1!==o.length};if(i.bindings.push(a),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(a)){let{event:e,negate:t}=a.parts[0];a.listenerEvent=e||Qn(n)+"-changed",a.listenerNegate=t}let l=t.nodeInfoList.length;for(let i=0;i<a.parts.length;i++){let r=a.parts[i];r.compoundIndex=i,qo(e,t,a,r,l)}}function qo(e,t,i,r,n){if(!r.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let o=r.dependencies,s={index:n,binding:i,part:r,evaluator:e};for(let i=0;i<o.length;i++){let r=o[i];"string"==typeof r&&(r=ts(r),r.wildcard=!0),e._addTemplatePropertyEffect(t,r.rootProperty,{fn:jo,info:s,trigger:r})}}}function jo(e,t,i,r,n,o,s){let a=s[n.index],l=n.binding,d=n.part;if(o&&d.source&&t.length>d.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let r=i[t];t=Gn(d.source,l.target,t),a._setPendingPropertyOrPath(t,r,!1,!0)&&e._enqueueClient(a)}else{let s=n.evaluator._evaluateBinding(e,d,t,i,r,o);s!==To&&function(e,t,i,r,n){n=function(e,t,i,r){if(i.isCompound){let n=e.__dataCompoundStorage[i.target];n[r.compoundIndex]=t,t=n.join("")}"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t));return t}(t,n,i,r),cn&&(n=cn(n,i.target,i.kind,t));if("attribute"==i.kind)e._valueToNodeAttribute(t,n,i.target);else{let r=i.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[r]?t[Po.READ_ONLY]&&t[Po.READ_ONLY][r]||t._setPendingProperty(r,n)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,r,n)}}(e,a,l,d,s)}}function Wo(e,t){if(t.isCompound){let i=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),r=t.parts,n=new Array(r.length);for(let e=0;e<r.length;e++)n[e]=r[e].literal;let o=t.target;i[o]=n,t.literal&&"property"==t.kind&&("className"===o&&(e=Hn(e)),e[o]=t.literal)}}function Yo(e,t,i){if(i.listenerEvent){let r=i.parts[0];e.addEventListener(i.listenerEvent,(function(e){!function(e,t,i,r,n){let o,s=e.detail,a=s&&s.path;a?(r=Gn(i,r,a),o=s&&s.value):o=e.currentTarget[i],o=n?!o:o,t[Po.READ_ONLY]&&t[Po.READ_ONLY][r]||!t._setPendingPropertyOrPath(r,o,!0,Boolean(a))||s&&s.queueProperty||t._invalidateProperties()}(e,t,i.target,r.source,r.negate)}))}}function Jo(e,t,i,r,n,o){o=t.static||o&&("object"!=typeof o||o[t.methodName]);let s={methodName:t.methodName,args:t.args,methodInfo:n,dynamicFn:o};for(let n,o=0;o<t.args.length&&(n=t.args[o]);o++)n.literal||e._addPropertyEffect(n.rootProperty,i,{fn:r,info:s,trigger:n});return o&&e._addPropertyEffect(t.methodName,i,{fn:r,info:s}),s}function Ko(e,t,i,r,n){let o=e._methodHost||e,s=o[n.methodName];if(s){let r=e._marshalArgs(n.args,t,i);return r===To?To:s.apply(o,r)}n.dynamicFn||console.warn("method `"+n.methodName+"` not defined")}const Xo=[],Zo=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function Qo(e){let t="";for(let i=0;i<e.length;i++){t+=e[i].literal||""}return t}function es(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:Xo};if(t[2].trim()){return function(e,t){return t.args=e.map((function(e){let i=ts(e);return i.literal||(t.static=!1),i}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function ts(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:t,value:"",literal:!1},r=t[0];switch("-"===r&&(r=t[1]),r>="0"&&r<="9"&&(r="#"),r){case"'":case'"':i.value=t.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(t),i.literal=!0}return i.literal||(i.rootProperty=Bn(t),i.structured=$n(t),i.structured&&(i.wildcard=".*"==t.slice(-2),i.wildcard&&(i.name=t.slice(0,-2)))),i}function is(e,t,i){let r=Wn(e,i);return void 0===r&&(r=t[i]),r}function rs(e,t,i,r){const n={indexSplices:r};_n&&!e._overrideLegacyUndefined&&(t.splices=n),e.notifyPath(i+".splices",n),e.notifyPath(i+".length",t.length),_n&&!e._overrideLegacyUndefined&&(n.indexSplices=[])}function ns(e,t,i,r,n,o){rs(e,t,i,[{index:r,addedCount:n,removed:o,object:t,type:"splice"}])}const os=Sn((e=>{const t=So(fo(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__computeInfo,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo,this._overrideLegacyUndefined}get PROPERTY_EFFECT_TYPES(){return Po}_initializeProperties(){super._initializeProperties(),this._registerHost(),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_registerHost(){if(ss.length){let e=ss[ss.length-1];e._enqueueClient(this),this.__dataHost=e}}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[Po.READ_ONLY];for(let i in e)t&&t[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=e[i])}_addPropertyEffect(e,t,i){this._createPropertyAccessor(e,t==Po.READ_ONLY);let r=Oo(this,t,!0)[e];r||(r=this[t][e]=[]),r.push(i)}_removePropertyEffect(e,t,i){let r=Oo(this,t,!0)[e],n=r.indexOf(i);n>=0&&r.splice(n,1)}_hasPropertyEffect(e,t){let i=this[t];return Boolean(i&&i[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,Po.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,Po.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,Po.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,Po.COMPUTE)}_setPendingPropertyOrPath(e,t,i,r){if(r||Bn(Array.isArray(e)?e[0]:e)!==e){if(!r){let i=Wn(this,e);if(!(e=Yn(this,e,t))||!super._shouldPropertyChange(e,t,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,i))return function(e,t,i){let r=e.__dataLinkedPaths;if(r){let n;for(let o in r){let s=r[o];Vn(o,t)?(n=Gn(o,s,t),e._setPendingPropertyOrPath(n,i,!0,!0)):Vn(s,t)&&(n=Gn(s,o,t),e._setPendingPropertyOrPath(n,i,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,i);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,i){i===e[t]&&"object"!=typeof i||("className"===t&&(e=Hn(e)),e[t]=i)}_setPendingProperty(e,t,i){let r=this.__dataHasPaths&&$n(e),n=r?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,n[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),r?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(r||this[Po.NOTIFY]&&this[Po.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=i),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let i=e[t];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let i in e)!t&&this[Po.READ_ONLY]&&this[Po.READ_ONLY][i]||this._setPendingPropertyOrPath(i,e[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,i){let r,n=this.__dataHasPaths;this.__dataHasPaths=!1,$o(this,t,i,n),r=this.__dataToNotify,this.__dataToNotify=null,this._propagatePropertyChanges(t,i,n),this._flushClients(),Ro(this,this[Po.REFLECT],t,i,n),Ro(this,this[Po.OBSERVE],t,i,n),r&&function(e,t,i,r,n){let o,s,a=e[Po.NOTIFY],l=Eo++;for(let s in t)t[s]&&(a&&No(e,a,l,s,i,r,n)||n&&Mo(e,s,i))&&(o=!0);o&&(s=e.__dataHost)&&s._invalidateProperties&&s._invalidateProperties()}(this,r,t,i,n),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,i){this[Po.PROPAGATE]&&Ro(this,this[Po.PROPAGATE],e,t,i),this.__templateInfo&&this._runEffectsForTemplate(this.__templateInfo,e,t,i)}_runEffectsForTemplate(e,t,i,r){const n=(t,r)=>{Ro(this,e.propertyEffects,t,i,r,e.nodeList);for(let n=e.firstChild;n;n=n.nextSibling)this._runEffectsForTemplate(n,t,i,r)};e.runEffects?e.runEffects(n,t,r):n(t,r)}linkPaths(e,t){e=qn(e),t=qn(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=qn(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let i={path:""};rs(this,Wn(this,e,i),i.path,t)}get(e,t){return Wn(t||this,e)}set(e,t,i){i?Yn(i,e,t):this[Po.READ_ONLY]&&this[Po.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let i={path:""},r=Wn(this,e,i),n=r.length,o=r.push(...t);return t.length&&ns(this,r,i.path,n,t.length,[]),o}pop(e){let t={path:""},i=Wn(this,e,t),r=Boolean(i.length),n=i.pop();return r&&ns(this,i,t.path,i.length,0,[n]),n}splice(e,t,i,...r){let n,o={path:""},s=Wn(this,e,o);return t<0?t=s.length-Math.floor(-t):t&&(t=Math.floor(t)),n=2===arguments.length?s.splice(t):s.splice(t,i,...r),(r.length||n.length)&&ns(this,s,o.path,t,r.length,n),n}shift(e){let t={path:""},i=Wn(this,e,t),r=Boolean(i.length),n=i.shift();return r&&ns(this,i,t.path,0,0,[n]),n}unshift(e,...t){let i={path:""},r=Wn(this,e,i),n=r.unshift(...t);return t.length&&ns(this,r,i.path,0,t.length,[]),n}notifyPath(e,t){let i;if(1==arguments.length){let r={path:""};t=Wn(this,e,r),i=r.path}else i=Array.isArray(e)?qn(e):e;this._setPendingPropertyOrPath(i,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var i;this._addPropertyEffect(e,Po.READ_ONLY),t&&(this["_set"+(i=e,i[0].toUpperCase()+i.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,i){let r={property:e,method:t,dynamicFn:Boolean(i)};this._addPropertyEffect(e,Po.OBSERVE,{fn:Do,info:r,trigger:{name:e}}),i&&this._addPropertyEffect(t,Po.OBSERVE,{fn:Do,info:r,trigger:{name:t}})}_createMethodObserver(e,t){let i=es(e);if(!i)throw new Error("Malformed observer expression '"+e+"'");Jo(this,i,Po.OBSERVE,Ko,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,Po.NOTIFY,{fn:Fo,info:{eventName:Qn(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,Po.REFLECT,{fn:Ho,info:{attrName:t}})}_createComputedProperty(e,t,i){let r=es(t);if(!r)throw new Error("Malformed computed expression '"+t+"'");const n=Jo(this,r,Po.COMPUTE,Vo,e,i);Oo(this,Io)[e]=n}_marshalArgs(e,t,i){const r=this.__data,n=[];for(let o=0,s=e.length;o<s;o++){let{name:s,structured:a,wildcard:l,value:d,literal:c}=e[o];if(!c)if(l){const e=Vn(s,t),n=is(r,i,e?t:s);d={path:e?t:s,value:n,base:e?Wn(r,s):n}}else d=a?is(r,i,s):r[s];if(_n&&!this._overrideLegacyUndefined&&void 0===d&&e.length>1)return To;n[o]=d}return n}static addPropertyEffect(e,t,i){this.prototype._addPropertyEffect(e,t,i)}static createPropertyObserver(e,t,i){this.prototype._createPropertyObserver(e,t,i)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,i){this.prototype._createComputedProperty(e,t,i)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let i=this.constructor._parseTemplate(e),r=this.__preBoundTemplateInfo==i;if(!r)for(let e in i.propertyEffects)this._createPropertyAccessor(e);if(t)if(i=Object.create(i),i.wasPreBound=r,this.__templateInfo){const t=e._parentTemplateInfo||this.__templateInfo,r=t.lastChild;i.parent=t,t.lastChild=i,i.previousSibling=r,r?r.nextSibling=i:t.firstChild=i}else this.__templateInfo=i;else this.__preBoundTemplateInfo=i;return i}static _addTemplatePropertyEffect(e,t,i){(e.hostProps=e.hostProps||{})[t]=!0;let r=e.propertyEffects=e.propertyEffects||{};(r[t]=r[t]||[]).push(i)}_stampTemplate(e,t){t=t||this._bindTemplate(e,!0),ss.push(this);let i=super._stampTemplate(e,t);if(ss.pop(),t.nodeList=i.nodeList,!t.wasPreBound){let e=t.childNodes=[];for(let t=i.firstChild;t;t=t.nextSibling)e.push(t)}return i.templateInfo=t,function(e,t){let{nodeList:i,nodeInfoList:r}=t;if(r.length)for(let t=0;t<r.length;t++){let n=r[t],o=i[t],s=n.bindings;if(s)for(let t=0;t<s.length;t++){let i=s[t];Wo(o,i),Yo(o,e,i)}o.__dataHost=e}}(this,t),this.__dataClientsReady&&(this._runEffectsForTemplate(t,this.__data,null,!1),this._flushClients()),i}_removeBoundDom(e){const t=e.templateInfo,{previousSibling:i,nextSibling:r,parent:n}=t;i?i.nextSibling=r:n&&(n.firstChild=r),r?r.previousSibling=i:n&&(n.lastChild=i),t.nextSibling=t.previousSibling=null;let o=t.childNodes;for(let e=0;e<o.length;e++){let t=o[e];Hn(Hn(t).parentNode).removeChild(t)}}static _parseTemplateNode(e,i,r){let n=t._parseTemplateNode.call(this,e,i,r);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,i);t&&(e.textContent=Qo(t)||" ",Go(this,i,r,"text","textContent",t),n=!0)}return n}static _parseTemplateNodeAttribute(e,i,r,n,o){let s=this._parseBindings(o,i);if(s){let t=n,o="property";ko.test(n)?o="attribute":"$"==n[n.length-1]&&(n=n.slice(0,-1),o="attribute");let a=Qo(s);return a&&"attribute"==o&&("class"==n&&e.hasAttribute("class")&&(a+=" "+e.getAttribute(n)),e.setAttribute(n,a)),"attribute"==o&&"disable-upgrade$"==t&&e.setAttribute(n,""),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===o&&(n=Zn(n)),Go(this,i,r,o,n,s,a),!0}return t._parseTemplateNodeAttribute.call(this,e,i,r,n,o)}static _parseTemplateNestedTemplate(e,i,r){let n=t._parseTemplateNestedTemplate.call(this,e,i,r);const o=e.parentNode,s=r.templateInfo,a="dom-if"===o.localName,l="dom-repeat"===o.localName;yn&&(a||l)&&(o.removeChild(e),(r=r.parentInfo).templateInfo=s,r.noted=!0,n=!1);let d=s.hostProps;if(vn&&a)d&&(i.hostProps=Object.assign(i.hostProps||{},d),yn||(r.parentInfo.noted=!0));else{let e="{";for(let t in d){Go(this,i,r,"property","_host_"+t,[{mode:e,source:t,dependencies:[t],hostProp:!0}])}}return n}static _parseBindings(e,t){let i,r=[],n=0;for(;null!==(i=Zo.exec(e));){i.index>n&&r.push({literal:e.slice(n,i.index)});let o=i[1][0],s=Boolean(i[2]),a=i[3].trim(),l=!1,d="",c=-1;"{"==o&&(c=a.indexOf("::"))>0&&(d=a.substring(c+2),a=a.substring(0,c),l=!0);let h=es(a),p=[];if(h){let{args:e,methodName:i}=h;for(let t=0;t<e.length;t++){let i=e[t];i.literal||p.push(i)}let r=t.dynamicFns;(r&&r[i]||h.static)&&(p.push(i),h.dynamicFn=!0)}else p.push(a);r.push({source:a,mode:o,negate:s,customEvent:l,signature:h,dependencies:p,event:d}),n=Zo.lastIndex}if(n&&n<e.length){let t=e.substring(n);t&&r.push({literal:t})}return r.length?r:null}static _evaluateBinding(e,t,i,r,n,o){let s;return s=t.signature?Ko(e,i,r,0,t.signature):i!=t.source?Wn(e,t.source):o&&$n(i)?Wn(e,i):e.__data[i],t.negate&&(s=!s),s}}})),ss=[];const as=Sn((e=>{const t=po(e);function i(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof n?t:null}function r(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const i=e.properties;i&&(t=function(e){const t={};for(let i in e){const r=e[i];t[i]="function"==typeof r?{type:r}:r}return t}(i))}e.__ownProperties=t}return e.__ownProperties}class n extends t{static get observedAttributes(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))){this.prototype;const e=this._properties;this.__observedAttributes=e?Object.keys(e).map((e=>this.prototype._addPropertyToAttributeMap(e))):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=i(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=r(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=i(this);this.__properties=Object.assign({},e&&e._properties,r(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return n})),ls=window.ShadyCSS&&window.ShadyCSS.cssBuild,ds=Sn((e=>{const t=as(os(e));function i(e,t,i,r){i.computed&&(i.readOnly=!0),i.computed&&(e._hasReadOnlyEffect(t)?console.warn(`Cannot redefine computed property '${t}'.`):e._createComputedProperty(t,i.computed,r)),i.readOnly&&!e._hasReadOnlyEffect(t)?e._createReadOnlyProperty(t,!i.computed):!1===i.readOnly&&e._hasReadOnlyEffect(t)&&console.warn(`Cannot make readOnly property '${t}' non-readOnly.`),i.reflectToAttribute&&!e._hasReflectEffect(t)?e._createReflectedProperty(t):!1===i.reflectToAttribute&&e._hasReflectEffect(t)&&console.warn(`Cannot make reflected property '${t}' non-reflected.`),i.notify&&!e._hasNotifyEffect(t)?e._createNotifyingProperty(t):!1===i.notify&&e._hasNotifyEffect(t)&&console.warn(`Cannot make notify property '${t}' non-notify.`),i.observer&&e._createPropertyObserver(t,i.observer,r[i.observer]),e._addPropertyToAttributeMap(t)}function r(e,t,i,r){if(!ls){const n=t.content.querySelectorAll("style"),o=Mn(t),s=function(e){let t=Rn(e);return t?Ln(t):[]}(i),a=t.content.firstElementChild;for(let i=0;i<s.length;i++){let n=s[i];n.textContent=e._processStyleText(n.textContent,r),t.content.insertBefore(n,a)}let l=0;for(let t=0;t<o.length;t++){let i=o[t],s=n[l];s!==i?(i=i.cloneNode(!0),s.parentNode.insertBefore(i,s)):l++,i.textContent=e._processStyleText(i.textContent,r)}}if(window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,i),xn&&ls&&ln){const i=t.content.querySelectorAll("style");if(i){let t="";Array.from(i).forEach((e=>{t+=e.textContent,e.parentNode.removeChild(e)})),e._styleSheet=new CSSStyleSheet,e._styleSheet.replaceSync(t)}}}return class extends t{static get polymerElementVersion(){return"3.4.1"}static _finalizeClass(){t._finalizeClass.call(this);const e=((i=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",i))||(i.__ownObservers=i.hasOwnProperty(JSCompiler_renameProperty("observers",i))?i.observers:null),i.__ownObservers);var i;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):mn||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let t in e)i(this.prototype,t,e[t],e)}static createObservers(e,t){const i=this.prototype;for(let r=0;r<e.length;r++)i._createMethodObserver(e[r],t)}static get template(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_template",this))){const e=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:void 0;this._template=void 0!==e?e:this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&function(e){let t=null;if(e&&(!pn||un)&&(t=kn.import(e,"template"),pn&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template}return this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=sn(e.url);else{const e=kn.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=dn,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let i in t){let r=t[i];"value"in r&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[i]=r)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let i=e[t];if(this._canApplyPropertyDefault(t)){let e="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}_canApplyPropertyDefault(e){return!this.hasOwnProperty(e)}static _processStyleText(e,t){return on(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const i=this.importPath;r(this,t,e,i?nn(i):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=Hn(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e),this.constructor._styleSheet&&(t.shadowRoot.adoptedStyleSheets=[this.constructor._styleSheet])),gn&&window.ShadyDOM&&window.ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=nn(this.importPath)),nn(e,t)}static _parseTemplateContent(e,i,r){return i.dynamicFns=i.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,i,r)}static _addTemplatePropertyEffect(e,i,r){return!fn||i in this._properties||r.info.part.signature&&r.info.part.signature.static||r.info.part.hostProp||e.nestedTemplate||console.warn(`Property '${i}' used in template but not declared in 'properties'; attribute will not be observed.`),t._addTemplatePropertyEffect.call(this,e,i,r)}}}));class cs{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run((()=>{this._timer=null,hs.delete(this),this._callback()}))}cancel(){this.isActive()&&(this._cancelAsync(),hs.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,i){return e instanceof cs?e._cancelAsync():e=new cs,e.setConfig(t,i),e}}let hs=new Set;const ps=function(e){hs.add(e)},us=function(){const e=Boolean(hs.size);return hs.forEach((e=>{try{e.flush()}catch(e){setTimeout((()=>{throw e}))}})),e};let ms="string"==typeof document.head.style.touchAction,fs="__polymerGestures",gs="__polymerGesturesHandled",_s="__polymerGesturesTouchAction",bs=["mousedown","mousemove","mouseup","click"],ys=[0,1,4,2],vs=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function ws(e){return bs.indexOf(e)>-1}let As=!1;function xs(e){if(!ws(e)&&"touchend"!==e)return ms&&As&&hn?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){As=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let Cs=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const Ss=[],Es={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},Ts={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Ps(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];let i=e.getRootNode();if(e.id){let r=i.querySelectorAll(`label[for = ${e.id}]`);for(let e=0;e<r.length;e++)t.push(r[e])}}return t}let Is=function(e){let t=e.sourceCapabilities;var i;if((!t||t.firesTouchEvents)&&(e[gs]={skip:!0},"click"===e.type)){let t=!1,r=Ds(e);for(let e=0;e<r.length;e++){if(r[e].nodeType===Node.ELEMENT_NODE)if("label"===r[e].localName)Ss.push(r[e]);else if(i=r[e],Es[i.localName]){let i=Ps(r[e]);for(let e=0;e<i.length;e++)t=t||Ss.indexOf(i[e])>-1}if(r[e]===Rs.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function ks(e){let t=Cs?["click"]:bs;for(let i,r=0;r<t.length;r++)i=t[r],e?(Ss.length=0,document.addEventListener(i,Is,!0)):document.removeEventListener(i,Is,!0)}function Os(e){let t=e.type;if(!ws(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!vs&&(t=ys[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let Rs={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Ns(e,t,i){e.movefn=t,e.upfn=i,document.addEventListener("mousemove",t),document.addEventListener("mouseup",i)}function zs(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}document.addEventListener("touchend",(function(e){Rs.mouse.mouseIgnoreJob||ks(!0),Rs.mouse.target=Ds(e)[0],Rs.mouse.mouseIgnoreJob=cs.debounce(Rs.mouse.mouseIgnoreJob,so.after(2500),(function(){ks(),Rs.mouse.target=null,Rs.mouse.mouseIgnoreJob=null}))}),!!As&&{passive:!0});const Ds=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],Ms={},Ls=[];function Fs(e){const t=Ds(e);return t.length>0?t[0]:e.target}function Hs(e){let t,i=e.type,r=e.currentTarget[fs];if(!r)return;let n=r[i];if(n){if(!e[gs]&&(e[gs]={},"touch"===i.slice(0,5))){let t=(e=e).changedTouches[0];if("touchstart"===i&&1===e.touches.length&&(Rs.touch.id=t.identifier),Rs.touch.id!==t.identifier)return;ms||"touchstart"!==i&&"touchmove"!==i||function(e){let t=e.changedTouches[0],i=e.type;if("touchstart"===i)Rs.touch.x=t.clientX,Rs.touch.y=t.clientY,Rs.touch.scrollDecided=!1;else if("touchmove"===i){if(Rs.touch.scrollDecided)return;Rs.touch.scrollDecided=!0;let i=function(e){let t="auto",i=Ds(e);for(let e,r=0;r<i.length;r++)if(e=i[r],e[_s]){t=e[_s];break}return t}(e),r=!1,n=Math.abs(Rs.touch.x-t.clientX),o=Math.abs(Rs.touch.y-t.clientY);e.cancelable&&("none"===i?r=!0:"pan-x"===i?r=o>n:"pan-y"===i&&(r=n>o)),r?e.preventDefault():qs("track")}}(e)}if(t=e[gs],!t.skip){for(let i,r=0;r<Ls.length;r++)i=Ls[r],n[i.name]&&!t[i.name]&&i.flow&&i.flow.start.indexOf(e.type)>-1&&i.reset&&i.reset();for(let r,o=0;o<Ls.length;o++)r=Ls[o],n[r.name]&&!t[r.name]&&(t[r.name]=!0,r[i](e))}}}function $s(e,t,i){return!!Ms[t]&&(function(e,t,i){let r=Ms[t],n=r.deps,o=r.name,s=e[fs];s||(e[fs]=s={});for(let t,i,r=0;r<n.length;r++)t=n[r],Cs&&ws(t)&&"click"!==t||(i=s[t],i||(s[t]=i={_count:0}),0===i._count&&e.addEventListener(t,Hs,xs(t)),i[o]=(i[o]||0)+1,i._count=(i._count||0)+1);e.addEventListener(t,i),r.touchAction&&Vs(e,r.touchAction)}(e,t,i),!0)}function Bs(e,t,i){return!!Ms[t]&&(function(e,t,i){let r=Ms[t],n=r.deps,o=r.name,s=e[fs];if(s)for(let t,i,r=0;r<n.length;r++)t=n[r],i=s[t],i&&i[o]&&(i[o]=(i[o]||1)-1,i._count=(i._count||1)-1,0===i._count&&e.removeEventListener(t,Hs,xs(t)));e.removeEventListener(t,i)}(e,t,i),!0)}function Us(e){Ls.push(e);for(let t=0;t<e.emits.length;t++)Ms[e.emits[t]]=e}function Vs(e,t){ms&&e instanceof HTMLElement&&co.run((()=>{e.style.touchAction=t})),e[_s]=t}function Gs(e,t,i){let r=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(r.detail=i,Hn(e).dispatchEvent(r),r.defaultPrevented){let e=i.preventer||i.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function qs(e){let t=function(e){for(let t,i=0;i<Ls.length;i++){t=Ls[i];for(let i,r=0;r<t.emits.length;r++)if(i=t.emits[r],i===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function js(e,t,i,r){t&&Gs(t,e,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:r,prevent:function(e){return qs(e)}})}function Ws(e,t,i){if(e.prevent)return!1;if(e.started)return!0;let r=Math.abs(e.x-t),n=Math.abs(e.y-i);return r>=5||n>=5}function Ys(e,t,i){if(!t)return;let r,n=e.moves[e.moves.length-2],o=e.moves[e.moves.length-1],s=o.x-e.x,a=o.y-e.y,l=0;n&&(r=o.x-n.x,l=o.y-n.y),Gs(t,"track",{state:e.state,x:i.clientX,y:i.clientY,dx:s,dy:a,ddx:r,ddy:l,sourceEvent:i,hover:function(){return function(e,t){let i=document.elementFromPoint(e,t),r=i;for(;r&&r.shadowRoot&&!window.ShadyDOM;){let n=r;if(r=r.shadowRoot.elementFromPoint(e,t),n===r)break;r&&(i=r)}return i}(i.clientX,i.clientY)}})}function Js(e,t,i){let r=Math.abs(t.clientX-e.x),n=Math.abs(t.clientY-e.y),o=Fs(i||t);!o||Ts[o.localName]&&o.hasAttribute("disabled")||(isNaN(r)||isNaN(n)||r<=25&&n<=25||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=Fs(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let i=t.getBoundingClientRect(),r=e.pageX,n=e.pageY;return!(r>=i.left&&r<=i.right&&n>=i.top&&n<=i.bottom)}return!1}(t))&&(e.prevent||Gs(o,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:i}))}Us({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){zs(this.info)},mousedown:function(e){if(!Os(e))return;let t=Fs(e),i=this;Ns(this.info,(function(e){Os(e)||(js("up",t,e),zs(i.info))}),(function(e){Os(e)&&js("up",t,e),zs(i.info)})),js("down",t,e)},touchstart:function(e){js("down",Fs(e),e.changedTouches[0],e)},touchend:function(e){js("up",Fs(e),e.changedTouches[0],e)}}),Us({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,zs(this.info)},mousedown:function(e){if(!Os(e))return;let t=Fs(e),i=this,r=function(e){let r=e.clientX,n=e.clientY;Ws(i.info,r,n)&&(i.info.state=i.info.started?"mouseup"===e.type?"end":"track":"start","start"===i.info.state&&qs("tap"),i.info.addMove({x:r,y:n}),Os(e)||(i.info.state="end",zs(i.info)),t&&Ys(i.info,t,e),i.info.started=!0)};Ns(this.info,r,(function(e){i.info.started&&r(e),zs(i.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=Fs(e),i=e.changedTouches[0],r=i.clientX,n=i.clientY;Ws(this.info,r,n)&&("start"===this.info.state&&qs("tap"),this.info.addMove({x:r,y:n}),Ys(this.info,t,i),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=Fs(e),i=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),Ys(this.info,t,i))}}),Us({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){Os(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){Os(e)&&Js(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){Js(this.info,e.changedTouches[0],e)}});const Ks=Sn((e=>class extends e{_addEventListenerToNode(e,t,i){$s(e,t,i)||super._addEventListenerToNode(e,t,i)}_removeEventListenerFromNode(e,t,i){Bs(e,t,i)||super._removeEventListenerFromNode(e,t,i)}})),Xs=/:host\(:dir\((ltr|rtl)\)\)/g,Zs=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,Qs=/:dir\((?:ltr|rtl)\)/,ea=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),ta=[];let ia=null,ra="";function na(){ra=document.documentElement.getAttribute("dir")}function oa(e){if(!e.__autoDirOptOut){e.setAttribute("dir",ra)}}function sa(){na(),ra=document.documentElement.getAttribute("dir");for(let e=0;e<ta.length;e++)oa(ta[e])}const aa=Sn((e=>{ea||ia||(na(),ia=new MutationObserver(sa),ia.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=fo(e);class i extends t{static _processStyleText(e,i){return e=t._processStyleText.call(this,e,i),!ea&&Qs.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=t.replace(Xs,':host([dir="$1"])'),t=t.replace(Zs,':host([dir="$2"]) $1'),t}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(ia&&ia.takeRecords().length&&sa(),ta.push(this),oa(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=ta.indexOf(this);e>-1&&ta.splice(e,1)}}}return i.__activateDir=!1,i}));let la=!1,da=[],ca=[];function ha(){la=!0,requestAnimationFrame((function(){la=!1,function(e){for(;e.length;)pa(e.shift())}(da),setTimeout((function(){!function(e){for(let t=0,i=e.length;t<i;t++)pa(e.shift())}(ca)}))}))}function pa(e){const t=e[0],i=e[1],r=e[2];try{i.apply(t,r)}catch(e){setTimeout((()=>{throw e}))}}function ua(){document.body.removeAttribute("unresolved")}function ma(e,t,i){return{index:e,removed:t,addedCount:i}}"interactive"===document.readyState||"complete"===document.readyState?ua():window.addEventListener("DOMContentLoaded",ua);function fa(e,t,i,r,n,o){let s,a=0,l=0,d=Math.min(i-t,o-n);if(0==t&&0==n&&(a=function(e,t,i){for(let r=0;r<i;r++)if(!_a(e[r],t[r]))return r;return i}(e,r,d)),i==e.length&&o==r.length&&(l=function(e,t,i){let r=e.length,n=t.length,o=0;for(;o<i&&_a(e[--r],t[--n]);)o++;return o}(e,r,d-a)),n+=a,o-=l,(i-=l)-(t+=a)==0&&o-n==0)return[];if(t==i){for(s=ma(t,[],0);n<o;)s.removed.push(r[n++]);return[s]}if(n==o)return[ma(t,[],i-t)];let c=function(e){let t=e.length-1,i=e[0].length-1,r=e[t][i],n=[];for(;t>0||i>0;){if(0==t){n.push(2),i--;continue}if(0==i){n.push(3),t--;continue}let o,s=e[t-1][i-1],a=e[t-1][i],l=e[t][i-1];o=a<l?a<s?a:s:l<s?l:s,o==s?(s==r?n.push(0):(n.push(1),r=s),t--,i--):o==a?(n.push(3),t--,r=a):(n.push(2),i--,r=l)}return n.reverse(),n}(function(e,t,i,r,n,o){let s=o-n+1,a=i-t+1,l=new Array(s);for(let e=0;e<s;e++)l[e]=new Array(a),l[e][0]=e;for(let e=0;e<a;e++)l[0][e]=e;for(let i=1;i<s;i++)for(let o=1;o<a;o++)if(_a(e[t+o-1],r[n+i-1]))l[i][o]=l[i-1][o-1];else{let e=l[i-1][o]+1,t=l[i][o-1]+1;l[i][o]=e<t?e:t}return l}(e,t,i,r,n,o));s=void 0;let h=[],p=t,u=n;for(let e=0;e<c.length;e++)switch(c[e]){case 0:s&&(h.push(s),s=void 0),p++,u++;break;case 1:s||(s=ma(p,[],0)),s.addedCount++,p++,s.removed.push(r[u]),u++;break;case 2:s||(s=ma(p,[],0)),s.addedCount++,p++;break;case 3:s||(s=ma(p,[],0)),s.removed.push(r[u]),u++}return s&&h.push(s),h}function ga(e,t){return fa(e,0,e.length,t,0,t.length)}function _a(e,t){return e===t}function ba(e){return"slot"===e.localName}let ya=class{static getFlattenedNodes(e){const t=Hn(e);return ba(e)?(e=e,t.assignedNodes({flatten:!0})):Array.from(t.childNodes).map((e=>ba(e)?Hn(e=e).assignedNodes({flatten:!0}):[e])).reduce(((e,t)=>e.concat(t)),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){ba(this._target)?this._listenSlots([this._target]):Hn(this._target).children&&(this._listenSlots(Hn(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=window.ShadyDOM.observeChildren(this._target,(e=>{this._processMutations(e)})):(this._nativeChildrenObserver=new MutationObserver((e=>{this._processMutations(e)})),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){ba(this._target)?this._unlistenSlots([this._target]):Hn(this._target).children&&(this._unlistenSlots(Hn(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,co.run((()=>this.flush())))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let i=e[t];i.addedNodes&&this._listenSlots(i.addedNodes),i.removedNodes&&this._unlistenSlots(i.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),i=ga(t,this._effectiveNodes);for(let t,r=0;r<i.length&&(t=i[r]);r++)for(let i,r=0;r<t.removed.length&&(i=t.removed[r]);r++)e.removedNodes.push(i);for(let r,n=0;n<i.length&&(r=i[n]);n++)for(let i=r.index;i<r.index+r.addedCount;i++)e.addedNodes.push(t[i]);this._effectiveNodes=t;let r=!1;return(e.addedNodes.length||e.removedNodes.length)&&(r=!0,this.callback.call(this._target,e)),r}_listenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];ba(i)&&i.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];ba(i)&&i.removeEventListener("slotchange",this._boundSchedule)}}};const va=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=us()}while(e||t)},wa=Element.prototype,Aa=wa.matches||wa.matchesSelector||wa.mozMatchesSelector||wa.msMatchesSelector||wa.oMatchesSelector||wa.webkitMatchesSelector,xa=function(e,t){return Aa.call(e,t)};class Ca{constructor(e){window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.patch(e),this.node=e}observeNodes(e){return new ya(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if(Hn(this.node).contains(e))return!0;let t=e,i=e.ownerDocument;for(;t&&t!==i&&t!==this.node;)t=Hn(t).parentNode||Hn(t).host;return t===this.node}getOwnerRoot(){return Hn(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?Hn(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=Hn(this.node).assignedSlot;for(;t;)e.push(t),t=Hn(t).assignedSlot;return e}importNode(e,t){let i=this.node instanceof Document?this.node:this.node.ownerDocument;return Hn(i).importNode(e,t)}getEffectiveChildNodes(){return ya.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),i=[];for(let r,n=0,o=t.length;n<o&&(r=t[n]);n++)r.nodeType===Node.ELEMENT_NODE&&xa(r,e)&&i.push(r);return i}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function Sa(e,t){for(let i=0;i<t.length;i++){let r=t[i];Object.defineProperty(e,r,{get:function(){return this.node[r]},configurable:!0})}}class Ea{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}Ca.prototype.cloneNode,Ca.prototype.appendChild,Ca.prototype.insertBefore,Ca.prototype.removeChild,Ca.prototype.replaceChild,Ca.prototype.setAttribute,Ca.prototype.removeAttribute,Ca.prototype.querySelector,Ca.prototype.querySelectorAll,Ca.prototype.parentNode,Ca.prototype.firstChild,Ca.prototype.lastChild,Ca.prototype.nextSibling,Ca.prototype.previousSibling,Ca.prototype.firstElementChild,Ca.prototype.lastElementChild,Ca.prototype.nextElementSibling,Ca.prototype.previousElementSibling,Ca.prototype.childNodes,Ca.prototype.children,Ca.prototype.classList,Ca.prototype.textContent,Ca.prototype.innerHTML;let Ta=Ca;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(Ca.prototype).forEach((t=>{"activeElement"!=t&&(e.prototype[t]=Ca.prototype[t])})),Sa(e.prototype,["classList"]),Ta=e,Object.defineProperties(Ea.prototype,{localTarget:{get(){const e=this.event.currentTarget,t=e&&Pa(e).getOwnerRoot(),i=this.path;for(let e=0;e<i.length;e++){const r=i[e];if(Pa(r).getOwnerRoot()===t)return r}},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let i=0;i<t.length;i++){let r=t[i];e[r]=function(){return this.node[r].apply(this.node,arguments)}}}(Ca.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),Sa(Ca.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(e,t){for(let i=0;i<t.length;i++){let r=t[i];Object.defineProperty(e,r,{get:function(){return this.node[r]},set:function(e){this.node[r]=e},configurable:!0})}}(Ca.prototype,["textContent","innerHTML","className"]);const Pa=function(e){if((e=e||document)instanceof Ta)return e;if(e instanceof Ea)return e;let t=e.__domApi;return t||(t=e instanceof Event?new Ea(e):new Ta(e),e.__domApi=t),t},Ia=window.ShadyDOM,ka=window.ShadyCSS;function Oa(e,t){return Hn(e).getRootNode()===t}const Ra="disable-upgrade",Na=e=>{for(;e;){const t=Object.getOwnPropertyDescriptor(e,"observedAttributes");if(t)return t.get;e=Object.getPrototypeOf(e.prototype).constructor}return()=>[]};Sn((e=>{const t=ds(e);let i=Na(t);return class extends t{constructor(){super(),this.__isUpgradeDisabled}static get observedAttributes(){return i.call(this).concat(Ra)}_initializeProperties(){this.hasAttribute(Ra)?this.__isUpgradeDisabled=!0:super._initializeProperties()}_enableProperties(){this.__isUpgradeDisabled||super._enableProperties()}_canApplyPropertyDefault(e){return super._canApplyPropertyDefault(e)&&!(this.__isUpgradeDisabled&&this._isPropertyPending(e))}attributeChangedCallback(e,t,i,r){e==Ra?this.__isUpgradeDisabled&&null==i&&(super._initializeProperties(),this.__isUpgradeDisabled=!1,Hn(this).isConnected&&super.connectedCallback()):super.attributeChangedCallback(e,t,i,r)}connectedCallback(){this.__isUpgradeDisabled||super.connectedCallback()}disconnectedCallback(){this.__isUpgradeDisabled||super.disconnectedCallback()}}}));const za="disable-upgrade";let Da=window.ShadyCSS;const Ma=Sn((e=>{const t=Ks(ds(e)),i=ls?t:aa(t),r=Na(i),n={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class o extends i{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers,this.__isUpgradeDisabled,this.__needsAttributesAtConnected,this._legacyForceObservedAttributes}static get importMeta(){return this.prototype.importMeta}created(){}__attributeReaction(e,t,i){(this.__dataAttributes&&this.__dataAttributes[e]||e===za)&&this.attributeChangedCallback(e,t,i,null)}setAttribute(e,t){if(An&&!this._legacyForceObservedAttributes){const i=this.getAttribute(e);super.setAttribute(e,t),this.__attributeReaction(e,i,String(t))}else super.setAttribute(e,t)}removeAttribute(e){if(An&&!this._legacyForceObservedAttributes){const t=this.getAttribute(e);super.removeAttribute(e),this.__attributeReaction(e,t,null)}else super.removeAttribute(e)}static get observedAttributes(){return An&&!this.prototype._legacyForceObservedAttributes?(this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))||(this.__observedAttributes=[],this.prototype),this.__observedAttributes):r.call(this).concat(za)}_enableProperties(){this.__isUpgradeDisabled||super._enableProperties()}_canApplyPropertyDefault(e){return super._canApplyPropertyDefault(e)&&!(this.__isUpgradeDisabled&&this._isPropertyPending(e))}connectedCallback(){this.__needsAttributesAtConnected&&this._takeAttributes(),this.__isUpgradeDisabled||(super.connectedCallback(),this.isAttached=!0,this.attached())}attached(){}disconnectedCallback(){this.__isUpgradeDisabled||(super.disconnectedCallback(),this.isAttached=!1,this.detached())}detached(){}attributeChangedCallback(e,t,i,r){t!==i&&(e==za?this.__isUpgradeDisabled&&null==i&&(this._initializeProperties(),this.__isUpgradeDisabled=!1,Hn(this).isConnected&&this.connectedCallback()):(super.attributeChangedCallback(e,t,i,r),this.attributeChanged(e,t,i)))}attributeChanged(e,t,i){}_initializeProperties(){if(mn&&this.hasAttribute(za))this.__isUpgradeDisabled=!0;else{let e=Object.getPrototypeOf(this);e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",e))||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),An&&!this._legacyForceObservedAttributes&&(this.hasAttributes()?this._takeAttributes():this.parentNode||(this.__needsAttributesAtConnected=!0)),this._applyListeners()}}_takeAttributes(){const e=this.attributes;for(let t=0,i=e.length;t<i;t++){const i=e[t];this.__attributeReaction(i.name,null,i.value)}}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,i){this._propertyToAttribute(e,t,i)}serializeValueToAttribute(e,t,i){this._valueToNodeAttribute(i||this,e,t)}extend(e,t){if(!e||!t)return e||t;let i=Object.getOwnPropertyNames(t);for(let r,n=0;n<i.length&&(r=i[n]);n++){let i=Object.getOwnPropertyDescriptor(t,r);i&&Object.defineProperty(e,r,i)}return e}mixin(e,t){for(let i in t)e[i]=t[i];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,i){i=i||{},t=null==t?{}:t;let r=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});r.detail=t;let n=i.node||this;return Hn(n).dispatchEvent(r),r}listen(e,t,i){e=e||this;let r=this.__boundListeners||(this.__boundListeners=new WeakMap),n=r.get(e);n||(n={},r.set(e,n));let o=t+i;n[o]||(n[o]=this._addMethodEventListenerToNode(e,t,i,this))}unlisten(e,t,i){e=e||this;let r=this.__boundListeners&&this.__boundListeners.get(e),n=t+i,o=r&&r[n];o&&(this._removeEventListenerFromNode(e,t,o),r[n]=null)}setScrollDirection(e,t){Vs(t||this,n[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=Hn(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=Pa(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return Pa(this).getEffectiveChildNodes()}queryDistributedElements(e){return Pa(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let i,r=0;i=e[r];r++)i.nodeType!==Node.COMMENT_NODE&&t.push(i.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?Pa(t).getDistributedNodes():[]}getContentChildren(e){let t=this.getContentChildNodes(e).filter((function(e){return e.nodeType===Node.ELEMENT_NODE}));return t}isLightDescendant(e){const t=this;return t!==e&&Hn(t).contains(e)&&Hn(t).getRootNode()===Hn(e).getRootNode()}isLocalDescendant(e){return this.root===Hn(e).getRootNode()}scopeSubtree(e,t=!1){return function(e,t=!1){if(!Ia||!ka)return null;if(!Ia.handlesDynamicScoping)return null;const i=ka.ScopingShim;if(!i)return null;const r=i.scopeForNode(e),n=Hn(e).getRootNode(),o=e=>{if(!Oa(e,n))return;const t=Array.from(Ia.nativeMethods.querySelectorAll.call(e,"*"));t.push(e);for(let e=0;e<t.length;e++){const o=t[e];if(!Oa(o,n))continue;const s=i.currentScopeForNode(o);s!==r&&(""!==s&&i.unscopeNode(o,s),i.scopeNode(o,r))}};if(o(e),t){const t=new MutationObserver((e=>{for(let t=0;t<e.length;t++){const i=e[t];for(let e=0;e<i.addedNodes.length;e++){const t=i.addedNodes[e];t.nodeType===Node.ELEMENT_NODE&&o(t)}}}));return t.observe(e,{childList:!0,subtree:!0}),t}return null}(e,t)}getComputedStyleValue(e){return Da.getComputedStyleValue(this,e)}debounce(e,t,i){return this._debouncers=this._debouncers||{},this._debouncers[e]=cs.debounce(this._debouncers[e],i>0?so.after(i):co,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?so.run(e.bind(this),t):~co.run(e.bind(this))}cancelAsync(e){e<0?co.cancel(~e):so.cancel(e)}create(e,t){let i=document.createElement(e);if(t)if(i.setProperties)i.setProperties(t);else for(let e in t)i[e]=t[e];return i}elementMatches(e,t){return xa(t||this,e)}toggleAttribute(e,t){let i=this;return 3===arguments.length&&(i=arguments[2]),1==arguments.length&&(t=!i.hasAttribute(e)),t?(Hn(i).setAttribute(e,""),!0):(Hn(i).removeAttribute(e),!1)}toggleClass(e,t,i){i=i||this,1==arguments.length&&(t=!i.classList.contains(e)),t?i.classList.add(e):i.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,i,r){r=r||this,this.transform("translate3d("+e+","+t+","+i+")",r)}arrayDelete(e,t){let i;if(Array.isArray(e)){if(i=e.indexOf(t),i>=0)return e.splice(i,1)}else{if(i=Wn(this,e).indexOf(t),i>=0)return this.splice(e,i,1)}return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return o.prototype.is="",o})),La={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},Fa={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},Ha=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},Fa);function $a(e,t,i,r){!function(e,t,i){const r=e._noAccessors,n=Object.getOwnPropertyNames(e);for(let o=0;o<n.length;o++){let s=n[o];if(!(s in i))if(r)t[s]=e[s];else{let i=Object.getOwnPropertyDescriptor(e,s);i&&(i.configurable=!0,Object.defineProperty(t,s,i))}}}(t,e,r);for(let e in La)t[e]&&(i[e]=i[e]||[],i[e].push(t[e]))}function Ba(e,t,i){t=t||[];for(let r=e.length-1;r>=0;r--){let n=e[r];n?Array.isArray(n)?Ba(n,t):t.indexOf(n)<0&&(!i||i.indexOf(n)<0)&&t.unshift(n):console.warn("behavior is null, check for missing or 404 import")}return t}function Ua(e,t){for(const i in t){const r=e[i],n=t[i];e[i]=!("value"in n)&&r&&"value"in r?Object.assign({value:r.value},n):n}}const Va=Ma(HTMLElement);function Ga(e,t,i){let r;const n={};class o extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(r)for(let e,t=0;t<r.length;t++)e=r[t],e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else t._finalizeClass.call(this)}static get properties(){const t={};if(r)for(let e=0;e<r.length;e++)Ua(t,r[e].properties);return Ua(t,e.properties),t}static get observers(){let t=[];if(r)for(let e,i=0;i<r.length;i++)e=r[i],e.observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=n.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=o.prototype;if(!e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",e))){e.__hasRegisterFinished=!0,super._registered(),mn&&s(e);const t=Object.getPrototypeOf(this);let i=n.beforeRegister;if(i)for(let e=0;e<i.length;e++)i[e].call(t);if(i=n.registered,i)for(let e=0;e<i.length;e++)i[e].call(t)}}_applyListeners(){super._applyListeners();const e=n.listeners;if(e)for(let t=0;t<e.length;t++){const i=e[t];if(i)for(let e in i)this._addMethodEventListenerToNode(this,e,i[e])}}_ensureAttributes(){const e=n.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const i=e[t];for(let e in i)this._ensureAttribute(e,i[e])}super._ensureAttributes()}ready(){super.ready();let e=n.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=n.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=n.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,i){super.attributeChanged();let r=n.attributeChanged;if(r)for(let n=0;n<r.length;n++)r[n].call(this,e,t,i)}}if(i){Array.isArray(i)||(i=[i]);let e=t.prototype.behaviors;r=Ba(i,null,e),o.prototype.behaviors=e?e.concat(i):r}const s=t=>{r&&function(e,t,i){for(let r=0;r<t.length;r++)$a(e,t[r],i,Ha)}(t,r,n),$a(t,e,n,Fa)};return mn||s(o.prototype),o.generatedFrom=e,o}const qa=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let i=t?t(Va):Va;return i=Ga(e,i,e.behaviors),i.is=i.prototype.is=e.is,i},ja=function(e){let t;return t="function"==typeof e?e:ja.Class(e),e._legacyForceObservedAttributes&&(t.prototype._legacyForceObservedAttributes=e._legacyForceObservedAttributes),customElements.define(t.is,t),t};function Wa(e,t,i,r,n){let o;n&&(o="object"==typeof i&&null!==i,o&&(r=e.__dataTemp[t]));let s=r!==i&&(r==r||i==i);return o&&s&&(e.__dataTemp[t]=i),s}ja.Class=qa;const Ya=Sn((e=>class extends e{_shouldPropertyChange(e,t,i){return Wa(this,e,t,i,!0)}})),Ja=Sn((e=>class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,i){return Wa(this,e,t,i,this.mutableData)}}));Ya._mutablePropertyChange=Wa;let Ka=null;function Xa(){return Ka}Xa.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:Xa,writable:!0}});const Za=os(Xa),Qa=Ya(Za);const el=os(class{});function tl(e,t){for(let i=0;i<t.length;i++){let r=t[i];if(Boolean(e)!=Boolean(r.__hideTemplateChildren__))if(r.nodeType===Node.TEXT_NODE)e?(r.__polymerTextContent__=r.textContent,r.textContent=""):r.textContent=r.__polymerTextContent__;else if("slot"===r.localName)if(e)r.__polymerReplaced__=document.createComment("hidden-slot"),Hn(Hn(r).parentNode).replaceChild(r.__polymerReplaced__,r);else{const e=r.__polymerReplaced__;e&&Hn(Hn(e).parentNode).replaceChild(r,e)}else r.style&&(e?(r.__polymerDisplay__=r.style.display,r.style.display="none"):r.style.display=r.__polymerDisplay__);r.__hideTemplateChildren__=e,r._showHideChildren&&r._showHideChildren(e)}}class il extends el{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=[];this.children=t;for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let i=this.__templatizeOptions;(e&&i.instanceProps||!i.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,i){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,(e=>{e.model=this,i(e)}));else{let r=this.__dataHost.__dataHost;r&&r._addEventListenerToNode(e,t,i)}}_showHideChildren(e){tl(e,this.children)}_setUnmanagedPropertyToNode(e,t,i){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=i:super._setUnmanagedPropertyToNode(e,t,i)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}il.prototype.__dataHost,il.prototype.__templatizeOptions,il.prototype._methodHost,il.prototype.__templatizeOwner,il.prototype.__hostProps;const rl=Ya(il);function nl(e){let t=e.__dataHost;return t&&t._methodHost||t}function ol(e,t,i){let r=i.mutableData?rl:il;dl.mixin&&(r=dl.mixin(r));let n=class extends r{};return n.prototype.__templatizeOptions=i,n.prototype._bindTemplate(e),function(e,t,i,r){let n=i.hostProps||{};for(let t in r.instanceProps){delete n[t];let i=r.notifyInstanceProp;i&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:ll(t,i)})}if(r.forwardHostProp&&t.__dataHost)for(let t in n)i.hasHostProps||(i.hasHostProps=!0),e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,i){e.__dataHost._setPendingPropertyOrPath("_host_"+t,i[t],!0,!0)}})}(n,e,t,i),n}function sl(e,t,i,r){let n=i.forwardHostProp;if(n&&t.hasHostProps){const o="template"==e.localName;let s=t.templatizeTemplateClass;if(!s){if(o){let e=i.mutableData?Qa:Za;class r extends e{}s=t.templatizeTemplateClass=r}else{const i=e.constructor;class r extends i{}s=t.templatizeTemplateClass=r}let a=t.hostProps;for(let e in a)s.prototype._addPropertyEffect("_host_"+e,s.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:al(e,n)}),s.prototype._createNotifyingProperty("_host_"+e);fn&&r&&function(e,t,i){const r=i.constructor._properties,{propertyEffects:n}=e,{instanceProps:o}=t;for(let e in n)if(!(r[e]||o&&o[e])){const t=n[e];for(let i=0;i<t.length;i++){const{part:r}=t[i].info;if(!r.signature||!r.signature.static){console.warn(`Property '${e}' used in template but not declared in 'properties'; attribute will not be observed.`);break}}}}(t,i,r)}if(e.__dataProto&&Object.assign(e.__data,e.__dataProto),o)!function(e,t){Ka=e,Object.setPrototypeOf(e,t.prototype),new t,Ka=null}(e,s),e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties();else{Object.setPrototypeOf(e,s.prototype);const i=t.hostProps;for(let t in i)if(t="_host_"+t,t in e){const i=e[t];delete e[t],e.__data[t]=i}}}}function al(e,t){return function(e,i,r){t.call(e.__templatizeOwner,i.substring("_host_".length),r[i])}}function ll(e,t){return function(e,i,r){t.call(e.__templatizeOwner,e,i,r[i])}}function dl(e,t,i){if(pn&&!nl(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(i=i||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let r=(t?t.constructor:il)._parseTemplate(e),n=r.templatizeInstanceClass;n||(n=ol(e,r,i),r.templatizeInstanceClass=n);const o=nl(e);sl(e,r,i,o);let s=class extends n{};return s.prototype._methodHost=o,s.prototype.__dataHost=e,s.prototype.__templatizeOwner=t,s.prototype.__hostProps=r.hostProps,s=s,s}let cl=!1;function hl(){if(mn&&!an){if(!cl){cl=!0;const e=document.createElement("style");e.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(e)}return!0}return!1}const pl=Ks(Ja(os(HTMLElement)));customElements.define("dom-bind",class extends pl{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),pn)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(e,t,i,r){this.mutableData=!0}connectedCallback(){hl()||(this.style.display="none"),this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){Hn(Hn(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(e=e||this.querySelector("template"),!e){let t=new MutationObserver((()=>{if(e=this.querySelector("template"),!e)throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()}));return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});class ul{constructor(e){this.value=e.toString()}toString(){return this.value}}function ml(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof ul)return function(e){if(e instanceof ul)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}const fl=function(e,...t){const i=document.createElement("template");return i.innerHTML=t.reduce(((t,i,r)=>t+ml(i)+e[r+1]),e[0]),i},gl=ds(HTMLElement),_l=Ja(gl);class bl extends _l{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!wn,readOnly:!0},initialCount:{type:Number},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"},notifyDomChange:{type:Boolean},reuseChunkedInstances:{type:Boolean}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__renderStartTime=null,this.__itemsArrayChanged=!1,this.__shouldMeasureChunk=!1,this.__shouldContinueChunking=!1,this.__chunkingId=0,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null,this._templateInfo}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e)}connectedCallback(){if(super.connectedCallback(),hl()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let e=Hn(Hn(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e)}}__ensureTemplatized(){if(!this.__ctor){const e=this;let t=this.template=e._templateInfo?e:this.querySelector("template");if(!t){let e=new MutationObserver((()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()}));return e.observe(this,{childList:!0}),!1}let i={};i[this.as]=!0,i[this.indexAs]=!0,i[this.itemsIndexAs]=!0,this.__ctor=dl(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:i,forwardHostProp:function(e,t){let i=this.__instances;for(let r,n=0;n<i.length&&(r=i[n]);n++)r.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,i){if((r=this.as)===(n=t)||Un(r,n)||Vn(r,n)){let r=e[this.itemsIndexAs];t==this.as&&(this.items[r]=i);let n=Gn(this.as,`${JSCompiler_renameProperty("items",this)}.${r}`,t);this.notifyPath(n,i)}var r,n}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,i=this.__getMethodHost();return function(){return i[t].apply(i,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let i=0;i<t.length;i++)0===e.indexOf(t[i])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||("items"===e.path&&(this.__itemsArrayChanged=!0),this.__debounceRender(this.__render))}__debounceRender(e,t=0){this.__renderDebouncer=cs.debounce(this.__renderDebouncer,t>0?so.after(t):co,e.bind(this)),ps(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),va()}__render(){if(!this.__ensureTemplatized())return;let e=this.items||[];const t=this.__sortAndFilterItems(e),i=this.__calculateLimit(t.length);this.__updateInstances(e,i,t),this.initialCount&&(this.__shouldMeasureChunk||this.__shouldContinueChunking)&&(cancelAnimationFrame(this.__chunkingId),this.__chunkingId=requestAnimationFrame((()=>this.__continueChunking()))),this._setRenderedItemCount(this.__instances.length),wn&&!this.notifyDomChange||this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}__sortAndFilterItems(e){let t=new Array(e.length);for(let i=0;i<e.length;i++)t[i]=i;return this.__filterFn&&(t=t.filter(((t,i,r)=>this.__filterFn(e[t],i,r)))),this.__sortFn&&t.sort(((t,i)=>this.__sortFn(e[t],e[i]))),t}__calculateLimit(e){let t=e;const i=this.__instances.length;if(this.initialCount){let r;!this.__chunkCount||this.__itemsArrayChanged&&!this.reuseChunkedInstances?(t=Math.min(e,this.initialCount),r=Math.max(t-i,0),this.__chunkCount=r||1):(r=Math.min(Math.max(e-i,0),this.__chunkCount),t=Math.min(i+r,e)),this.__shouldMeasureChunk=r===this.__chunkCount,this.__shouldContinueChunking=t<e,this.__renderStartTime=performance.now()}return this.__itemsArrayChanged=!1,t}__continueChunking(){if(this.__shouldMeasureChunk){const e=performance.now()-this.__renderStartTime,t=this._targetFrameTime/e;this.__chunkCount=Math.round(this.__chunkCount*t)||1}this.__shouldContinueChunking&&this.__debounceRender(this.__render)}__updateInstances(e,t,i){const r=this.__itemsIdxToInstIdx={};let n;for(n=0;n<t;n++){let t=this.__instances[n],o=i[n],s=e[o];r[o]=n,t?(t._setPendingProperty(this.as,s),t._setPendingProperty(this.indexAs,n),t._setPendingProperty(this.itemsIndexAs,o),t._flushProperties()):this.__insertInstance(s,n,o)}for(let e=this.__instances.length-1;e>=n;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const i=Hn(t.root);for(let e=0;e<t.children.length;e++){let r=t.children[e];i.appendChild(r)}return t}__attachInstance(e,t){let i=this.__instances[e];t.insertBefore(i.root,this)}__detachAndRemoveInstance(e){this.__detachInstance(e),this.__instances.splice(e,1)}__stampInstance(e,t,i){let r={};return r[this.as]=e,r[this.indexAs]=t,r[this.itemsIndexAs]=i,new this.__ctor(r)}__insertInstance(e,t,i){const r=this.__stampInstance(e,t,i);let n=this.__instances[t+1],o=n?n.children[0]:this;return Hn(Hn(this).parentNode).insertBefore(r.root,o),this.__instances[t]=r,r}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let i=e.slice(6),r=i.indexOf("."),n=r<0?i:i.substring(0,r);if(n==parseInt(n,10)){let e=r<0?"":i.substring(r+1);this.__handleObservedPaths(e);let o=this.__itemsIdxToInstIdx[n],s=this.__instances[o];if(s){let i=this.as+(e?"."+e:"");s._setPendingPropertyOrPath(i,t,!1,!0),s._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return function(e,t){let i;for(;t;)if(i=t.__dataHost?t:t.__templatizeInstance){if(i.__dataHost==e)return i;t=i.__dataHost}else t=Hn(t).parentNode;return null}(this.template,e)}}customElements.define(bl.is,bl);class yl extends gl{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"},notifyDomChange:{type:Boolean}}}constructor(){super(),this.__renderDebouncer=null,this._lastIf=!1,this.__hideTemplateChildren__=!1,this.__template,this._templateInfo}__debounceRender(){this.__renderDebouncer=cs.debounce(this.__renderDebouncer,co,(()=>this.__render())),ps(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=Hn(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||Hn(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),hl()||(this.style.display="none"),this.if&&this.__debounceRender()}__ensureTemplate(){if(!this.__template){const e=this;let t=e._templateInfo?e:Hn(e).querySelector("template");if(!t){let e=new MutationObserver((()=>{if(!Hn(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()}));return e.observe(this,{childList:!0}),!1}this.__template=t}return!0}__ensureInstance(){let e=Hn(this).parentNode;if(this.__hasInstance()){let t=this.__getInstanceNodes();if(t&&t.length){if(Hn(this).previousSibling!==t[t.length-1])for(let i,r=0;r<t.length&&(i=t[r]);r++)Hn(e).insertBefore(i,this)}}else{if(!e)return!1;if(!this.__ensureTemplate())return!1;this.__createAndInsertInstance(e)}return!0}render(){va()}__render(){if(this.if){if(!this.__ensureInstance())return}else this.restamp&&this.__teardownInstance();this._showHideChildren(),wn&&!this.notifyDomChange||this.if==this._lastIf||(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__hasInstance(){}__getInstanceNodes(){}__createAndInsertInstance(e){}__teardownInstance(){}_showHideChildren(){}}const vl=vn?class extends yl{constructor(){super(),this.__instance=null,this.__syncInfo=null}__hasInstance(){return Boolean(this.__instance)}__getInstanceNodes(){return this.__instance.templateInfo.childNodes}__createAndInsertInstance(e){const t=this.__dataHost||this;if(pn&&!this.__dataHost)throw new Error("strictTemplatePolicy: template owner not trusted");const i=t._bindTemplate(this.__template,!0);i.runEffects=(e,t,i)=>{let r=this.__syncInfo;if(this.if)r&&(this.__syncInfo=null,this._showHideChildren(),t=Object.assign(r.changedProps,t)),e(t,i);else if(this.__instance)if(r||(r=this.__syncInfo={runEffects:e,changedProps:{}}),i)for(const e in t){const t=Bn(e);r.changedProps[t]=this.__dataHost[t]}else Object.assign(r.changedProps,t)},this.__instance=t._stampTemplate(this.__template,i),Hn(e).insertBefore(this.__instance,this)}__syncHostProperties(){const e=this.__syncInfo;e&&(this.__syncInfo=null,e.runEffects(e.changedProps,!1))}__teardownInstance(){const e=this.__dataHost||this;this.__instance&&(e._removeBoundDom(this.__instance),this.__instance=null,this.__syncInfo=null)}_showHideChildren(){const e=this.__hideTemplateChildren__||!this.if;this.__instance&&Boolean(this.__instance.__hidden)!==e&&(this.__instance.__hidden=e,tl(e,this.__instance.templateInfo.childNodes)),e||this.__syncHostProperties()}}:class extends yl{constructor(){super(),this.__ctor=null,this.__instance=null,this.__invalidProps=null}__hasInstance(){return Boolean(this.__instance)}__getInstanceNodes(){return this.__instance.children}__createAndInsertInstance(e){this.__ctor||(this.__ctor=dl(this.__template,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Bn(e)]=!0))}})),this.__instance=new this.__ctor,Hn(e).insertBefore(this.__instance.root,this)}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=Hn(e[0]).parentNode;if(t){t=Hn(t);for(let i,r=0;r<e.length&&(i=e[r]);r++)t.removeChild(i)}}this.__invalidProps=null,this.__instance=null}}__syncHostProperties(){let e=this.__invalidProps;if(e){this.__invalidProps=null;for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__instance._flushProperties()}}_showHideChildren(){const e=this.__hideTemplateChildren__||!this.if;this.__instance&&Boolean(this.__instance.__hidden)!==e&&(this.__instance.__hidden=e,this.__instance._showHideChildren(e)),e||this.__syncHostProperties()}};customElements.define(vl.is,vl);let wl=Sn((e=>{let t=ds(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let i=t.path;if(i==JSCompiler_renameProperty("items",this)){let i=t.base||[],r=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),r){let e=ga(i,r);this.__applySplices(e)}this.__lastItems=i,this.__lastMulti=e}else if(t.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(t.value.indexSplices);else{let e=i.slice(`${JSCompiler_renameProperty("items",this)}.`.length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let i=0;i<e.length;i++){let r=e[i];t.forEach(((e,i)=>{e<r.index||(e>=r.index+r.removed.length?t.set(i,e+r.addedCount-r.removed.length):t.set(i,-1))}));for(let e=0;e<r.addedCount;e++){let i=r.index+e;t.has(this.items[i])&&t.set(this.items[i],i)}}this.__updateLinks();let i=0;t.forEach(((e,r)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null,t.delete(r)):i++}))}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach((t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)}))}else this.__selectedMap.forEach((e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)}))}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach(((i,r)=>{t==e++&&this.deselect(r)}))}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let i;this.__selectedMap.delete(e),this.multi&&(i=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}})),Al=wl(gl);class xl extends Al{static get is(){return"array-selector"}static get template(){return null}}customElements.define(xl.is,xl);const Cl=new Kr;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,i){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,i){},styleSubtree(e,t){Cl.processStyles(),Er(e,t)},styleElement(e){Cl.processStyles()},styleDocument(e){Cl.processStyles(),Er(document.body,e)},getComputedStyleValue:(e,t)=>Tr(e,t),flushCustomStyles(){},nativeCss:tr,nativeShadow:Ki,cssBuild:Zi,disableRuntime:er}),window.ShadyCSS.CustomStyleInterface=Cl;const Sl="include",El=window.ShadyCSS.CustomStyleInterface;class Tl extends HTMLElement{constructor(){super(),this._style=null,El.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(Sl);return t&&(e.removeAttribute(Sl),e.textContent=function(e){let t=e.trim().split(/\s+/),i="";for(let e=0;e<t.length;e++)i+=Fn(t[e]);return i}(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}window.customElements.define("custom-style",Tl);const Pl=Ma(HTMLElement).prototype,Il=fl`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;Il.setAttribute("style","display: none;"),document.head.appendChild(Il.content);const kl=document.createElement("template");kl.setAttribute("style","display: none;"),kl.innerHTML="<dom-module id=\"paper-spinner-styles\">\n  <template>\n    <style>\n      /*\n      /**************************/\n      /* STYLES FOR THE SPINNER */\n      /**************************/\n\n      /*\n       * Constants:\n       *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)\n       *      ARCTIME     = 1333ms (time it takes to expand and contract arc)\n       *      ARCSTARTROT = 216 degrees (how much the start location of the arc\n       *                                should rotate each time, 216 gives us a\n       *                                5 pointed star shape (it's 360/5 * 3).\n       *                                For a 7 pointed star, we might do\n       *                                360/7 * 3 = 154.286)\n       *      SHRINK_TIME = 400ms\n       */\n\n      :host {\n        display: inline-block;\n        position: relative;\n        width: 28px;\n        height: 28px;\n\n        /* 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */\n        --paper-spinner-container-rotation-duration: 1568ms;\n\n        /* ARCTIME */\n        --paper-spinner-expand-contract-duration: 1333ms;\n\n        /* 4 * ARCTIME */\n        --paper-spinner-full-cycle-duration: 5332ms;\n\n        /* SHRINK_TIME */\n        --paper-spinner-cooldown-duration: 400ms;\n      }\n\n      #spinnerContainer {\n        width: 100%;\n        height: 100%;\n\n        /* The spinner does not have any contents that would have to be\n         * flipped if the direction changes. Always use ltr so that the\n         * style works out correctly in both cases. */\n        direction: ltr;\n      }\n\n      #spinnerContainer.active {\n        -webkit-animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;\n        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;\n      }\n\n      @-webkit-keyframes container-rotate {\n        to { -webkit-transform: rotate(360deg) }\n      }\n\n      @keyframes container-rotate {\n        to { transform: rotate(360deg) }\n      }\n\n      .spinner-layer {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        white-space: nowrap;\n        color: var(--paper-spinner-color, var(--google-blue-500));\n      }\n\n      .layer-1 {\n        color: var(--paper-spinner-layer-1-color, var(--google-blue-500));\n      }\n\n      .layer-2 {\n        color: var(--paper-spinner-layer-2-color, var(--google-red-500));\n      }\n\n      .layer-3 {\n        color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));\n      }\n\n      .layer-4 {\n        color: var(--paper-spinner-layer-4-color, var(--google-green-500));\n      }\n\n      /**\n       * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):\n       *\n       * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't\n       * guarantee that the animation will start _exactly_ after that value. So we avoid using\n       * animation-delay and instead set custom keyframes for each color (as layer-2undant as it\n       * seems).\n       */\n      .active .spinner-layer {\n        -webkit-animation-name: fill-unfill-rotate;\n        -webkit-animation-duration: var(--paper-spinner-full-cycle-duration);\n        -webkit-animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        -webkit-animation-iteration-count: infinite;\n        animation-name: fill-unfill-rotate;\n        animation-duration: var(--paper-spinner-full-cycle-duration);\n        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation-iteration-count: infinite;\n        opacity: 1;\n      }\n\n      .active .spinner-layer.layer-1 {\n        -webkit-animation-name: fill-unfill-rotate, layer-1-fade-in-out;\n        animation-name: fill-unfill-rotate, layer-1-fade-in-out;\n      }\n\n      .active .spinner-layer.layer-2 {\n        -webkit-animation-name: fill-unfill-rotate, layer-2-fade-in-out;\n        animation-name: fill-unfill-rotate, layer-2-fade-in-out;\n      }\n\n      .active .spinner-layer.layer-3 {\n        -webkit-animation-name: fill-unfill-rotate, layer-3-fade-in-out;\n        animation-name: fill-unfill-rotate, layer-3-fade-in-out;\n      }\n\n      .active .spinner-layer.layer-4 {\n        -webkit-animation-name: fill-unfill-rotate, layer-4-fade-in-out;\n        animation-name: fill-unfill-rotate, layer-4-fade-in-out;\n      }\n\n      @-webkit-keyframes fill-unfill-rotate {\n        12.5% { -webkit-transform: rotate(135deg) } /* 0.5 * ARCSIZE */\n        25%   { -webkit-transform: rotate(270deg) } /* 1   * ARCSIZE */\n        37.5% { -webkit-transform: rotate(405deg) } /* 1.5 * ARCSIZE */\n        50%   { -webkit-transform: rotate(540deg) } /* 2   * ARCSIZE */\n        62.5% { -webkit-transform: rotate(675deg) } /* 2.5 * ARCSIZE */\n        75%   { -webkit-transform: rotate(810deg) } /* 3   * ARCSIZE */\n        87.5% { -webkit-transform: rotate(945deg) } /* 3.5 * ARCSIZE */\n        to    { -webkit-transform: rotate(1080deg) } /* 4   * ARCSIZE */\n      }\n\n      @keyframes fill-unfill-rotate {\n        12.5% { transform: rotate(135deg) } /* 0.5 * ARCSIZE */\n        25%   { transform: rotate(270deg) } /* 1   * ARCSIZE */\n        37.5% { transform: rotate(405deg) } /* 1.5 * ARCSIZE */\n        50%   { transform: rotate(540deg) } /* 2   * ARCSIZE */\n        62.5% { transform: rotate(675deg) } /* 2.5 * ARCSIZE */\n        75%   { transform: rotate(810deg) } /* 3   * ARCSIZE */\n        87.5% { transform: rotate(945deg) } /* 3.5 * ARCSIZE */\n        to    { transform: rotate(1080deg) } /* 4   * ARCSIZE */\n      }\n\n      @-webkit-keyframes layer-1-fade-in-out {\n        0% { opacity: 1 }\n        25% { opacity: 1 }\n        26% { opacity: 0 }\n        89% { opacity: 0 }\n        90% { opacity: 1 }\n        to { opacity: 1 }\n      }\n\n      @keyframes layer-1-fade-in-out {\n        0% { opacity: 1 }\n        25% { opacity: 1 }\n        26% { opacity: 0 }\n        89% { opacity: 0 }\n        90% { opacity: 1 }\n        to { opacity: 1 }\n      }\n\n      @-webkit-keyframes layer-2-fade-in-out {\n        0% { opacity: 0 }\n        15% { opacity: 0 }\n        25% { opacity: 1 }\n        50% { opacity: 1 }\n        51% { opacity: 0 }\n        to { opacity: 0 }\n      }\n\n      @keyframes layer-2-fade-in-out {\n        0% { opacity: 0 }\n        15% { opacity: 0 }\n        25% { opacity: 1 }\n        50% { opacity: 1 }\n        51% { opacity: 0 }\n        to { opacity: 0 }\n      }\n\n      @-webkit-keyframes layer-3-fade-in-out {\n        0% { opacity: 0 }\n        40% { opacity: 0 }\n        50% { opacity: 1 }\n        75% { opacity: 1 }\n        76% { opacity: 0 }\n        to { opacity: 0 }\n      }\n\n      @keyframes layer-3-fade-in-out {\n        0% { opacity: 0 }\n        40% { opacity: 0 }\n        50% { opacity: 1 }\n        75% { opacity: 1 }\n        76% { opacity: 0 }\n        to { opacity: 0 }\n      }\n\n      @-webkit-keyframes layer-4-fade-in-out {\n        0% { opacity: 0 }\n        65% { opacity: 0 }\n        75% { opacity: 1 }\n        90% { opacity: 1 }\n        to { opacity: 0 }\n      }\n\n      @keyframes layer-4-fade-in-out {\n        0% { opacity: 0 }\n        65% { opacity: 0 }\n        75% { opacity: 1 }\n        90% { opacity: 1 }\n        to { opacity: 0 }\n      }\n\n      .circle-clipper {\n        display: inline-block;\n        position: relative;\n        width: 50%;\n        height: 100%;\n        overflow: hidden;\n      }\n\n      /**\n       * Patch the gap that appear between the two adjacent div.circle-clipper while the\n       * spinner is rotating (appears on Chrome 50, Safari 9.1.1, and Edge).\n       */\n      .spinner-layer::after {\n        content: '';\n        left: 45%;\n        width: 10%;\n        border-top-style: solid;\n      }\n\n      .spinner-layer::after,\n      .circle-clipper .circle {\n        box-sizing: border-box;\n        position: absolute;\n        top: 0;\n        border-width: var(--paper-spinner-stroke-width, 3px);\n        border-radius: 50%;\n      }\n\n      .circle-clipper .circle {\n        bottom: 0;\n        width: 200%;\n        border-style: solid;\n        border-bottom-color: transparent !important;\n      }\n\n      .circle-clipper.left .circle {\n        left: 0;\n        border-right-color: transparent !important;\n        -webkit-transform: rotate(129deg);\n        transform: rotate(129deg);\n      }\n\n      .circle-clipper.right .circle {\n        left: -100%;\n        border-left-color: transparent !important;\n        -webkit-transform: rotate(-129deg);\n        transform: rotate(-129deg);\n      }\n\n      .active .gap-patch::after,\n      .active .circle-clipper .circle {\n        -webkit-animation-duration: var(--paper-spinner-expand-contract-duration);\n        -webkit-animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        -webkit-animation-iteration-count: infinite;\n        animation-duration: var(--paper-spinner-expand-contract-duration);\n        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation-iteration-count: infinite;\n      }\n\n      .active .circle-clipper.left .circle {\n        -webkit-animation-name: left-spin;\n        animation-name: left-spin;\n      }\n\n      .active .circle-clipper.right .circle {\n        -webkit-animation-name: right-spin;\n        animation-name: right-spin;\n      }\n\n      @-webkit-keyframes left-spin {\n        0% { -webkit-transform: rotate(130deg) }\n        50% { -webkit-transform: rotate(-5deg) }\n        to { -webkit-transform: rotate(130deg) }\n      }\n\n      @keyframes left-spin {\n        0% { transform: rotate(130deg) }\n        50% { transform: rotate(-5deg) }\n        to { transform: rotate(130deg) }\n      }\n\n      @-webkit-keyframes right-spin {\n        0% { -webkit-transform: rotate(-130deg) }\n        50% { -webkit-transform: rotate(5deg) }\n        to { -webkit-transform: rotate(-130deg) }\n      }\n\n      @keyframes right-spin {\n        0% { transform: rotate(-130deg) }\n        50% { transform: rotate(5deg) }\n        to { transform: rotate(-130deg) }\n      }\n\n      #spinnerContainer.cooldown {\n        -webkit-animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);\n      }\n\n      @-webkit-keyframes fade-out {\n        0% { opacity: 1 }\n        to { opacity: 0 }\n      }\n\n      @keyframes fade-out {\n        0% { opacity: 1 }\n        to { opacity: 0 }\n      }\n    </style>\n  </template>\n</dom-module>",document.head.appendChild(kl.content);const Ol={properties:{active:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"__activeChanged"},alt:{type:String,value:"loading",observer:"__altChanged"},__coolingDown:{type:Boolean,value:!1}},__computeContainerClasses:function(e,t){return[e||t?"active":"",t?"cooldown":""].join(" ")},__activeChanged:function(e,t){this.__setAriaHidden(!e),this.__coolingDown=!e&&t},__altChanged:function(e){"loading"===e?this.alt=this.getAttribute("aria-label")||e:(this.__setAriaHidden(""===e),this.setAttribute("aria-label",e))},__setAriaHidden:function(e){var t="aria-hidden";e?this.setAttribute(t,"true"):this.removeAttribute(t)},__reset:function(){this.active=!1,this.__coolingDown=!1}},Rl=fl`
  <style include="paper-spinner-styles"></style>

  <div id="spinnerContainer" class-name="[[__computeContainerClasses(active, __coolingDown)]]" on-animationend="__reset" on-webkit-animation-end="__reset">
    <div class="spinner-layer">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
`;Rl.setAttribute("strip-whitespace",""),ja({_template:Rl,is:"paper-spinner-lite",behaviors:[Ol]});class Nl extends HTMLElement{static get version(){return"1.6.1"}}customElements.define("vaadin-lumo-styles",Nl);const zl=document.createElement("template");zl.innerHTML='<custom-style>\n  <style>\n    html {\n      /* Base (background) */\n      --lumo-base-color: #FFF;\n\n      /* Tint */\n      --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);\n      --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);\n      --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);\n      --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);\n      --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);\n      --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);\n      --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);\n      --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);\n      --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);\n      --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);\n      --lumo-tint: #FFF;\n\n      /* Shade */\n      --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);\n      --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);\n      --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);\n      --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);\n      --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);\n      --lumo-shade-50pct: hsla(214, 45%, 20%, 0.5);\n      --lumo-shade-60pct: hsla(214, 43%, 19%, 0.61);\n      --lumo-shade-70pct: hsla(214, 42%, 18%, 0.72);\n      --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);\n      --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);\n      --lumo-shade: hsl(214, 35%, 15%);\n\n      /* Contrast */\n      --lumo-contrast-5pct: var(--lumo-shade-5pct);\n      --lumo-contrast-10pct: var(--lumo-shade-10pct);\n      --lumo-contrast-20pct: var(--lumo-shade-20pct);\n      --lumo-contrast-30pct: var(--lumo-shade-30pct);\n      --lumo-contrast-40pct: var(--lumo-shade-40pct);\n      --lumo-contrast-50pct: var(--lumo-shade-50pct);\n      --lumo-contrast-60pct: var(--lumo-shade-60pct);\n      --lumo-contrast-70pct: var(--lumo-shade-70pct);\n      --lumo-contrast-80pct: var(--lumo-shade-80pct);\n      --lumo-contrast-90pct: var(--lumo-shade-90pct);\n      --lumo-contrast: var(--lumo-shade);\n\n      /* Text */\n      --lumo-header-text-color: var(--lumo-contrast);\n      --lumo-body-text-color: var(--lumo-contrast-90pct);\n      --lumo-secondary-text-color: var(--lumo-contrast-70pct);\n      --lumo-tertiary-text-color: var(--lumo-contrast-50pct);\n      --lumo-disabled-text-color: var(--lumo-contrast-30pct);\n\n      /* Primary */\n      --lumo-primary-color: hsl(214, 90%, 52%);\n      --lumo-primary-color-50pct: hsla(214, 90%, 52%, 0.5);\n      --lumo-primary-color-10pct: hsla(214, 90%, 52%, 0.1);\n      --lumo-primary-text-color: var(--lumo-primary-color);\n      --lumo-primary-contrast-color: #FFF;\n\n      /* Error */\n      --lumo-error-color: hsl(3, 100%, 61%);\n      --lumo-error-color-50pct: hsla(3, 100%, 60%, 0.5);\n      --lumo-error-color-10pct: hsla(3, 100%, 60%, 0.1);\n      --lumo-error-text-color: hsl(3, 92%, 53%);\n      --lumo-error-contrast-color: #FFF;\n\n      /* Success */\n      --lumo-success-color: hsl(145, 80%, 42%); /* hsl(144,82%,37%); */\n      --lumo-success-color-50pct: hsla(145, 76%, 44%, 0.55);\n      --lumo-success-color-10pct: hsla(145, 76%, 44%, 0.12);\n      --lumo-success-text-color: hsl(145, 100%, 32%);\n      --lumo-success-contrast-color: #FFF;\n    }\n  </style>\n</custom-style><dom-module id="lumo-color">\n  <template>\n    <style>\n      [theme~="dark"] {\n        /* Base (background) */\n        --lumo-base-color: hsl(214, 35%, 21%);\n\n        /* Tint */\n        --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);\n        --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);\n        --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);\n        --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);\n        --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);\n        --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);\n        --lumo-tint-60pct: hsla(214, 82%, 90%, 0.6);\n        --lumo-tint-70pct: hsla(214, 87%, 92%, 0.7);\n        --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);\n        --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);\n        --lumo-tint: hsl(214, 100%, 98%);\n\n        /* Shade */\n        --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);\n        --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);\n        --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);\n        --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);\n        --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);\n        --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);\n        --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);\n        --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);\n        --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);\n        --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);\n        --lumo-shade: hsl(214, 33%, 13%);\n\n        /* Contrast */\n        --lumo-contrast-5pct: var(--lumo-tint-5pct);\n        --lumo-contrast-10pct: var(--lumo-tint-10pct);\n        --lumo-contrast-20pct: var(--lumo-tint-20pct);\n        --lumo-contrast-30pct: var(--lumo-tint-30pct);\n        --lumo-contrast-40pct: var(--lumo-tint-40pct);\n        --lumo-contrast-50pct: var(--lumo-tint-50pct);\n        --lumo-contrast-60pct: var(--lumo-tint-60pct);\n        --lumo-contrast-70pct: var(--lumo-tint-70pct);\n        --lumo-contrast-80pct: var(--lumo-tint-80pct);\n        --lumo-contrast-90pct: var(--lumo-tint-90pct);\n        --lumo-contrast: var(--lumo-tint);\n\n        /* Text */\n        --lumo-header-text-color: var(--lumo-contrast);\n        --lumo-body-text-color: var(--lumo-contrast-90pct);\n        --lumo-secondary-text-color: var(--lumo-contrast-70pct);\n        --lumo-tertiary-text-color: var(--lumo-contrast-50pct);\n        --lumo-disabled-text-color: var(--lumo-contrast-30pct);\n\n        /* Primary */\n        --lumo-primary-color: hsl(214, 86%, 55%);\n        --lumo-primary-color-50pct: hsla(214, 86%, 55%, 0.5);\n        --lumo-primary-color-10pct: hsla(214, 90%, 63%, 0.1);\n        --lumo-primary-text-color: hsl(214, 100%, 70%);\n        --lumo-primary-contrast-color: #FFF;\n\n        /* Error */\n        --lumo-error-color: hsl(3, 90%, 63%);\n        --lumo-error-color-50pct: hsla(3, 90%, 63%, 0.5);\n        --lumo-error-color-10pct: hsla(3, 90%, 63%, 0.1);\n        --lumo-error-text-color: hsl(3, 100%, 67%);\n\n        /* Success */\n        --lumo-success-color: hsl(145, 65%, 42%);\n        --lumo-success-color-50pct: hsla(145, 65%, 42%, 0.5);\n        --lumo-success-color-10pct: hsla(145, 65%, 42%, 0.1);\n        --lumo-success-text-color: hsl(145, 85%, 47%);\n      }\n\n      html {\n        color: var(--lumo-body-text-color);\n        background-color: var(--lumo-base-color);\n      }\n\n      [theme~="dark"] {\n        color: var(--lumo-body-text-color);\n        background-color: var(--lumo-base-color);\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        color: var(--lumo-header-text-color);\n      }\n\n      a {\n        color: var(--lumo-primary-text-color);\n      }\n\n      blockquote {\n        color: var(--lumo-secondary-text-color);\n      }\n\n      code,\n      pre {\n        background-color: var(--lumo-contrast-10pct);\n        border-radius: var(--lumo-border-radius-m);\n      }\n    </style>\n  </template>\n</dom-module><dom-module id="lumo-color-legacy">\n  <template>\n    <style include="lumo-color">\n      :host {\n        color: var(--lumo-body-text-color) !important;\n        background-color: var(--lumo-base-color) !important;\n      }\n    </style>\n  </template>\n</dom-module>',document.head.appendChild(zl.content);const Dl=document.createElement("template");Dl.innerHTML='<custom-style>\n  <style>\n    @font-face {\n      font-family: \'lumo-icons\';\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABEcAAsAAAAAIiwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAQwAAAFZAIUuKY21hcAAAAYgAAAD4AAADrsCU8d5nbHlmAAACgAAAC2MAABd4h9To2WhlYWQAAA3kAAAAMAAAADZa/6SsaGhlYQAADhQAAAAdAAAAJAbpA35obXR4AAAONAAAABAAAACspBAAAGxvY2EAAA5EAAAAWAAAAFh55IAsbWF4cAAADpwAAAAfAAAAIAFKAXBuYW1lAAAOvAAAATEAAAIuUUJZCHBvc3QAAA/wAAABKwAAAelm8SzVeJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGS+yDiBgZWBgamKaQ8DA0MPhGZ8wGDIyAQUZWBlZsAKAtJcUxgcXjG+0mIO+p/FEMUcxDANKMwIkgMABn8MLQB4nO3SWW6DMABF0UtwCEnIPM/zhLK8LqhfXRybSP14XUYtHV9hGYQwQBNIo3cUIPkhQeM7rib1ekqnXg981XuC1qvy84lzojleh3puxL0hPjGjRU473teloEefAUNGjJkwZcacBUtWrNmwZceeA0dOnLlw5cadB09elPGhGf+j0NTI/65KfXerT6JhqKnpRKtgOpuqaTrtKjPUlqHmhto21I7pL6i6hlqY3q7qGWrfUAeGOjTUkaGODXViqFNDnRnq3FAXhro01JWhrg11Y6hbQ90Z6t5QD4Z6NNSToZ4N9WKoV0O9GerdUB+G+jTUl6GWRvkL24BkEXictVh9bFvVFb/nxvbz+7Rf/N6zHcd2bCfP+Wgc1Z9N0jpNnEL6kbRVS6HA2hQYGh9TGR1CbCqa2rXrWOkQE/sHNJgmtZvoVNZqE1B1DNHxzTQxCehUTYiJTQyENui0qSLezr3PduyQfgmRWOfde8+9551z7rnn/O4jLoJ/bRP0UaKQMLFJjpBAvphLZC3Dk0ok7WBzR2/upJs7Ryw/nfFbln/uuN/apCvwrKLrSvUqRufbm5pn0fs0w4gYxnGVP6qHnO4bWiDQGQgwtS6lm3lB3QoX1M2vwEmuzirF39y+Es2+DJ8d1pkyqBIqoze3D1+Zz4DrFoazxI8dWwMrDlZ2DMqQAR9AROsJU+2cmlTPazTco52F1xTa2a2+K8vvq92dVHmtLoPeQX/AZPRYGthDYOeZjBjKoFsVGulR3lWU95WeCK44qHU7MhWUGUKZDT3oKUcG2GWuh+EDDfUYA/jhAhl0TOsJNYSEu7mQmi3UzfXwZKA4BsVsHLXQYGgRW95uEtpJ1Vfn9XiLriRBlFEqxsDjA09yCNUoQxxwd7KWSTt2y3GTKiflqHRSoWZc3m11Wa/fJdFgXD4sSYfleJBKd8GMz7J8dZn/cGRCcKGDnA2Ge3fKzcvlnTDNthGWLXzX/WaXtUAmRgeLlHSr30r0G9UTXMb0AtmwzOoy73fkSlHZkduw/TYuU9cAD4YutPoxTTsA3797wVr4Z/1NC5zARHr4vtxJjxIfiZMhMkbWk+14BnJZKwqGZwDfswLyxWDSg11rFLJF7Nopxjd1h1/QOT+oezgfu3Yq+Hk+duf5x+40o1GTkaIgikK/IEnC6aYxCUBaZJSN4XTYFjU/YMNIKqJwhDGOCCI8FDXnXmXjtGhGJyShqjAOnBOkW2JG9S7GgYeMWAU5JzhnWmBOaOM+CKEPoqSfFDC2Unq+DLlUgUVUFFLZGJg6jtlojsdsa8kPObPuJdi5dnBdBsLJMGTWDa4t2JvtwuPo9s+Y86suv/W33QG1rAaOAUV+vx4K6f2D04PVKlC7WLSrZzAi45ZV6lIC7WoXqmRyvUqoVwrzUoVsIjeTXWQv+RH5GTlBXiB/In8ln0IbBCAFOajAJrgZYyOHWqOfUe/aHjI12R6OQo1jCgt215l+4f6XPb+0MNou0V+43n2F77tSfRb24d7zitgnKmvYHs69zugaPvBwv6ioXkb2LdL65Atw51uLkXlu1bhMMRcXSPcYoqKIRlh34lQP8/5JbuUFye4vxD6/6MxFF11C0uVLr9Ulgw44tS3pMViNLUExbycFgLIct+QDMibRimx1ydUz8FXZiuOIDBOMVX2nUZc+huNE5XUJ81uiJoiabwqaVF0uacKbau/pl4R2VW0XXlJra6boVrYG646TF5NYzwy4vjENVrDlcNpZPl8DH6XX8XWCx0mvWVZY6KFLrvsY66/zPict5FnxaNUR/juvZCM3TvD60E2W1tZizbXTPDuabcm0nbbzpWKpmA1ayBQ8giedLUM+A0kNjBjQjmuYz7YrgIXYvmF63ZLBwSXrpn9Tb9wwdd/U1H0PMQK3XcO8ul3WT7PyPPdpy0TemKxNRcJNauiXJnnUDpUppQWs4SnUIy0EESGYqJYQLGHxzaGWwVIaS6Y7mQFM8ZjYDQ3axjf61SWjU33JwOZA1pwaG1L9mzf71aHRdX1JHw6Fp0aXhNwbqyeGNg4NbdzGCBxoz4ZXjy4Nu69Zr6sDY6vMrLU5nA1P8JkbdWXJ6ERfMryvNh1JfQ9+T4dIhGvK9w3dxjBBzatsQ/MlOHVIDnYpDz6odAXlQ01t2Pa5Iafd8MMpxAeDKP0C6CjgVLT5osB6icUx01lWjXxzT/GyRF2welEM5Z/7jG3VjQ1SrNn5IbyzOG5dobB3/QHxyZvsXcoz8IoEwS7plCg+zxHQk424q9BfEpkESJbFHQusDBSWFkuBkoPO0kLKwRVYjxGXlHTcTDQMJ/H6TX9afkO7mnraTO1feTnZAXLu4cp7HAXMmNG1yeFk9TgS/NHhZR/4QoBTr/ZB+6hCgyl15Nq1UbN6nE1/ZnP1U2cizCBpvs8cJQZJ4LkYx5N/yZPAUZNQQ0V4f3BQllWrK3YRzl30dOT6RVn2upNur6woSa8CqpdT/aKnBM4o3jNur9d9xqtUT6veBEt9Ca9at+ERzEEhUkR8sa5mQ4aVvJoVeEA8zI4ei5mULXFGyU7z/6TAeYLVcpzSWZY8PYYF5yrTV60sT0+XV141vX++Wf16V2bFeGVPZXxFpkvyeKTWLlzfW0mnKxsY6Y3294/0998SCfX1blm5pbcvFGlq/r07MRAMhYIDiW5JFKWW3vdrEpCsZSJG+om7Zu/PSScZJhNkLbmW5Wsr12pWqW5zKtlwRS4bFOxUw17mCzy6lskCDl1WYOGWDYrADrMA7BDDweWWNd5koiJnR1dz+ytLP2q0SqPB1lnK2ccB7RYe4FSoPks3iB3t4txTSHctb2sy1ivk0pvHuCNm6w1f6wxv3+OCgN78LqdQnUVh7R0oTAp0zOf2rbW770Vu5C2dIyGdTnHo8zSji7dppj0USoVCz+lhRMTh53Teq9VbGfbjuSbAooSdXayY4PYHg374C6f7gl1B/DXuJ4/QXxOBdJFJspFsI3egpoWUUCjlTIFnNYNl+ZyZKmBeYKGHkD1QyDlhaKbKwKcIJqJ4TLJ2OmdY/JWXae4DdGBw8HZ7eXcgFF2zr2SoalDry5iKqoa0Puhe3hPQ2s3elTYM+MI+n3rK0KgL7/La3GeMLt6m7u912vGnvtORiIa0qBmhqVi+XW9XNBmqb8eVgKzIHfGI5bNoG7X0UCzeISmqIcO/nY8FH7U8avX9fx/ST+hx0sezPw9Qy8Mum3GWf2N4Uy/yIYGVBXbJHWIZp7dfTcptdMTr9Qmq7DaiK/ukqCL4kt4RUfS5XPnMtmT22/mQFqF7emSqtrlu8SVElxDRJrZODkpuwe0VfTfjdEp1f7A7v+fozNBXUJ/6WTuK2TtFlpFVZAZ3LcFvUi1Z2p2YT+EMAkGJVStOzLTAPg4IqWIAlzRSjOBkl2zxj3TKycpzT/MnvX3uaSMWM+gU0rkXjohhefVRMaps3/kLMSKv23lT23uxQrkQjyOJleMDsdhAnD6ZGElWZ5MjCXzCE/hkWX+WF4knzGhVOyK2eQZekV3eyo0zL8kuYWCnDCvjjhAkcTPOBDXVdoav3HVcFnQjLvtV9S2p0zA6JegPwMQxt+yFb3ll9zGlq/5dRKb3cEyQYoaNYpharJ7xCB7AWxsLY3jjZXY0XsZj0Wjwc9I6PP/dKABnCZaqHpaZEACxk4ZeLZSKNgZABl+lYQX1sJQOSX3n6r410evcoud5JeAGUXVP9H1tZOKejTq4Ono0z0erro1FrnOpohva1d/hTdtVsQdKN5W9RlT3NjD0nznyKNTgKAMfWNWcyodV0IGLPIHOF0o4JyqufaK4z6WIIzuGh3d8c8cwQg8ER+OVxyrjdm8vNuhts4LoOihGxIMuUdgzwiYN7xhh1+oZnJNuTG7gQZvu4XWZ9GAZZjGEubwePqYhtKDTH+9VQkl17/iGybsnJ+8+sKtyPrcll9ty65Zsdst/9iqpEKh7M5VdBxh3csOdNc6tW3I1uyM1PzOXegSOrLFsFNI2O27M+TF2ApnN9MUv5ud6LjxIvEQnHRzxIu4IsA9MLFkJn2tcZoZ7ON7dXe7ujrc8HrusPKamlqXwd77lQUuLpilau4PUMapueBb7irU4RoUXEYXuVuIGlRGmOp+2lNkaRPVziOqmlaZvaqG4dFgSj0jxEJWrv12IUWntmw+rfQarRE0Aph4ocI6nlUlGqs+u3/+T/ethW62PpHp2eHbZstnh/wOO95yDAHicY2BkYGAA4pmJ6QHx/DZfGbiZXwBFGGpUNzQi6P+vmacy3QJyORiYQKIANoULVXicY2BkYGAO+p8FJF8wAAHzVAZGBlSgDQBW9gNvAAAAeJxjYGBgYH4xNDAAzwQmjwAAAAAATgCaAOgBCgEsAU4BcAGaAcQB7gIaApwC6ASaBLwE1gTyBQ4FKgV6BdAF/gZEBmYGtgcYB5AIGAhSCGoI/glGCb4J2goECjwKggq4CvALUAuWC7x4nGNgZGBg0GZMYRBlAAEmIOYCQgaG/2A+AwAYlAG8AHicbZE9TsMwGIbf9A/RSggEYmHxAgtq+jN2ZGj3Dt3T1GlTOXHkuBW9AyfgEByCgTNwCA7BW/NJlVBtyd/jx+8XKwmAa3whwnFE6Ib1OBq44O6Pm6Qb4Rb5QbiNHh6FO/RD4S6eMRHu4RaaT4halzR3eBVu4Apvwk36d+EW+UO4jXt8Cnfov4W7WOBHuIen6MXsCtvPU1vWc73emcSdxIkW2tW5LdUoHp7kTJfaJV6v1PKg6v167H2mMmcLNbWl18ZYVTm71amPN95Xk8EgEx+ntoDBDgUs+siRspaoMef7rukNEriziXNuwS7Hmoe9wggxv+e55IzJMqQTeNYV00scuNbY8+YxrUfGfcaMZb/CNPQe04bT0lThbEuT0sfYhK6K/23Amf3Lx+H24hcj4GScAAAAeJxtjtlugzAQRbkJUEJIuu/7vqR8lGNPAcWx0YAb5e/LklR96EgenSufGY038PqKvf9rhgGG8BEgxA4ijBBjjAQTTLGLPezjAIc4wjFOcIoznOMCl7jCNW5wizvc4wGPeMIzXvCKN7zjAzN8eonQRWZSSaYmjvug6ase98hFltexMJmmVNmV2WBvdNgZUc+ujAWzXW3UDnu1w43asStHc8GpzAXX/py0jqTQZJTgkcxJLpaCF0lD32xNt+43tAsn29Dft02uDKS2cjGUNgsk26qK2lFthYoU27INPqmiDqg5goe0pqR5qSoqMdek/CUZFywL46rEsiImleqiqoMyt4baXlu/1GLdNFf5zbcNmdr1YUWCZe47o+zUmb/DoStbw3cVsef9ALjjiPQA) format(\'woff\');\n      font-weight: normal;\n      font-style: normal;\n    }\n\n    html {\n      --lumo-icons-align-center: "\\ea01";\n      --lumo-icons-align-left: "\\ea02";\n      --lumo-icons-align-right: "\\ea03";\n      --lumo-icons-angle-down: "\\ea04";\n      --lumo-icons-angle-left: "\\ea05";\n      --lumo-icons-angle-right: "\\ea06";\n      --lumo-icons-angle-up: "\\ea07";\n      --lumo-icons-arrow-down: "\\ea08";\n      --lumo-icons-arrow-left: "\\ea09";\n      --lumo-icons-arrow-right: "\\ea0a";\n      --lumo-icons-arrow-up: "\\ea0b";\n      --lumo-icons-bar-chart: "\\ea0c";\n      --lumo-icons-bell: "\\ea0d";\n      --lumo-icons-calendar: "\\ea0e";\n      --lumo-icons-checkmark: "\\ea0f";\n      --lumo-icons-chevron-down: "\\ea10";\n      --lumo-icons-chevron-left: "\\ea11";\n      --lumo-icons-chevron-right: "\\ea12";\n      --lumo-icons-chevron-up: "\\ea13";\n      --lumo-icons-clock: "\\ea14";\n      --lumo-icons-cog: "\\ea15";\n      --lumo-icons-cross: "\\ea16";\n      --lumo-icons-download: "\\ea17";\n      --lumo-icons-dropdown: "\\ea18";\n      --lumo-icons-edit: "\\ea19";\n      --lumo-icons-error: "\\ea1a";\n      --lumo-icons-eye: "\\ea1b";\n      --lumo-icons-eye-disabled: "\\ea1c";\n      --lumo-icons-menu: "\\ea1d";\n      --lumo-icons-minus: "\\ea1e";\n      --lumo-icons-ordered-list: "\\ea1f";\n      --lumo-icons-phone: "\\ea20";\n      --lumo-icons-photo: "\\ea21";\n      --lumo-icons-play: "\\ea22";\n      --lumo-icons-plus: "\\ea23";\n      --lumo-icons-redo: "\\ea24";\n      --lumo-icons-reload: "\\ea25";\n      --lumo-icons-search: "\\ea26";\n      --lumo-icons-undo: "\\ea27";\n      --lumo-icons-unordered-list: "\\ea28";\n      --lumo-icons-upload: "\\ea29";\n      --lumo-icons-user: "\\ea2a";\n    }\n  </style>\n</custom-style>',document.head.appendChild(Dl.content);const Ml=document.createElement("template");Ml.innerHTML="<custom-style>\n  <style>\n    html {\n      --lumo-size-xs: 1.625rem;\n      --lumo-size-s: 1.875rem;\n      --lumo-size-m: 2.25rem;\n      --lumo-size-l: 2.75rem;\n      --lumo-size-xl: 3.5rem;\n\n      /* Icons */\n      --lumo-icon-size-s: 1.25em;\n      --lumo-icon-size-m: 1.5em;\n      --lumo-icon-size-l: 2.25em;\n      /* For backwards compatibility */\n      --lumo-icon-size: var(--lumo-icon-size-m);\n    }\n  </style>\n</custom-style>",document.head.appendChild(Ml.content);const Ll=document.createElement("template");Ll.innerHTML="<custom-style>\n  <style>\n    html {\n      /* Square */\n      --lumo-space-xs: 0.25rem;\n      --lumo-space-s: 0.5rem;\n      --lumo-space-m: 1rem;\n      --lumo-space-l: 1.5rem;\n      --lumo-space-xl: 2.5rem;\n\n      /* Wide */\n      --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);\n      --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);\n      --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);\n      --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);\n      --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);\n\n      /* Tall */\n      --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);\n      --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);\n      --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);\n      --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);\n      --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);\n    }\n  </style>\n</custom-style>",document.head.appendChild(Ll.content);const Fl=document.createElement("template");Fl.innerHTML="<custom-style>\n  <style>\n    html {\n      /* Border radius */\n      --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */\n      --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */\n      --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */\n      --lumo-border-radius: 0.25em; /* Deprecated */\n\n      /* Shadow */\n      --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);\n      --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);\n      --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);\n      --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);\n      --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);\n\n      /* Clickable element cursor */\n      --lumo-clickable-cursor: default;\n    }\n  </style>\n</custom-style>",document.head.appendChild(Fl.content);const Hl=document.createElement("template");Hl.innerHTML='<custom-style>\n  <style>\n    html {\n      /* Font families */\n      --lumo-font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n\n      /* Font sizes */\n      --lumo-font-size-xxs: .75rem;\n      --lumo-font-size-xs: .8125rem;\n      --lumo-font-size-s: .875rem;\n      --lumo-font-size-m: 1rem;\n      --lumo-font-size-l: 1.125rem;\n      --lumo-font-size-xl: 1.375rem;\n      --lumo-font-size-xxl: 1.75rem;\n      --lumo-font-size-xxxl: 2.5rem;\n\n      /* Line heights */\n      --lumo-line-height-xs: 1.25;\n      --lumo-line-height-s: 1.375;\n      --lumo-line-height-m: 1.625;\n    }\n\n  </style>\n</custom-style><dom-module id="lumo-typography">\n  <template>\n    <style>\n      html {\n        font-family: var(--lumo-font-family);\n        font-size: var(--lumo-font-size, var(--lumo-font-size-m));\n        line-height: var(--lumo-line-height-m);\n        -webkit-text-size-adjust: 100%;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      /* Can’t combine with the above selector because that doesn’t work in browsers without native shadow dom */\n      :host {\n        font-family: var(--lumo-font-family);\n        font-size: var(--lumo-font-size, var(--lumo-font-size-m));\n        line-height: var(--lumo-line-height-m);\n        -webkit-text-size-adjust: 100%;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      small,\n      [theme~="font-size-s"] {\n        font-size: var(--lumo-font-size-s);\n        line-height: var(--lumo-line-height-s);\n      }\n\n      [theme~="font-size-xs"] {\n        font-size: var(--lumo-font-size-xs);\n        line-height: var(--lumo-line-height-xs);\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-weight: 600;\n        line-height: var(--lumo-line-height-xs);\n        margin-top: 1.25em;\n      }\n\n      h1 {\n        font-size: var(--lumo-font-size-xxxl);\n        margin-bottom: 0.75em;\n      }\n\n      h2 {\n        font-size: var(--lumo-font-size-xxl);\n        margin-bottom: 0.5em;\n      }\n\n      h3 {\n        font-size: var(--lumo-font-size-xl);\n        margin-bottom: 0.5em;\n      }\n\n      h4 {\n        font-size: var(--lumo-font-size-l);\n        margin-bottom: 0.5em;\n      }\n\n      h5 {\n        font-size: var(--lumo-font-size-m);\n        margin-bottom: 0.25em;\n      }\n\n      h6 {\n        font-size: var(--lumo-font-size-xs);\n        margin-bottom: 0;\n        text-transform: uppercase;\n        letter-spacing: 0.03em;\n      }\n\n      p,\n      blockquote {\n        margin-top: 0.5em;\n        margin-bottom: 0.75em;\n      }\n\n      a {\n        text-decoration: none;\n      }\n\n      a:hover {\n        text-decoration: underline;\n      }\n\n      hr {\n        display: block;\n        align-self: stretch;\n        height: 1px;\n        border: 0;\n        padding: 0;\n        margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);\n        background-color: var(--lumo-contrast-10pct);\n      }\n\n      blockquote {\n        border-left: 2px solid var(--lumo-contrast-30pct);\n      }\n\n      b,\n      strong {\n        font-weight: 600;\n      }\n\n      /* RTL specific styles */\n\n      blockquote[dir="rtl"] {\n        border-left: none;\n        border-right: 2px solid var(--lumo-contrast-30pct);\n      }\n\n    </style>\n  </template>\n</dom-module>',document.head.appendChild(Hl.content);const $l=fl`<dom-module id="lumo-checkbox" theme-for="vaadin-checkbox">
  <template>
    <style include="lumo-checkbox-style lumo-checkbox-effects">
      /* IE11 only */
      ::-ms-backdrop,
      [part="checkbox"] {
        line-height: 1;
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-checkbox-style">
  <template>
    <style>
      :host {
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        outline: none;
      }

      [part="label"]:not([empty]) {
        margin: 0.1875em 0.875em 0.1875em 0.375em;
      }

      [part="checkbox"] {
        width: calc(1em + 2px);
        height: calc(1em + 2px);
        margin: 0.1875em;
        position: relative;
        border-radius: var(--lumo-border-radius-s);
        background-color: var(--lumo-contrast-20pct);
        transition: transform 0.2s cubic-bezier(.12, .32, .54, 2), background-color 0.15s;
        pointer-events: none;
        line-height: 1.2;
      }

      :host([indeterminate]) [part="checkbox"],
      :host([checked]) [part="checkbox"] {
        background-color: var(--lumo-primary-color);
      }

      /* Needed to align the checkbox nicely on the baseline */
      [part="checkbox"]::before {
        content: "\\2003";
      }

      /* Checkmark */
      [part="checkbox"]::after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border: 0 solid var(--lumo-primary-contrast-color);
        border-width: 0.1875em 0 0 0.1875em;
        box-sizing: border-box;
        transform-origin: 0 0;
        position: absolute;
        top: 0.8125em;
        left: 0.5em;
        transform: scale(0.55) rotate(-135deg);
        opacity: 0;
      }

      :host([checked]) [part="checkbox"]::after {
        opacity: 1;
        width: 0.625em;
        height: 1.0625em;
      }

      /* Indeterminate checkmark */

      :host([indeterminate]) [part="checkbox"]::after {
        transform: none;
        opacity: 1;
        top: 45%;
        height: 10%;
        left: 22%;
        right: 22%;
        width: auto;
        border: 0;
        background-color: var(--lumo-primary-contrast-color);
        transition: opacity 0.25s;
      }

      /* Focus ring */

      :host([focus-ring]) [part="checkbox"] {
        box-shadow: 0 0 0 3px var(--lumo-primary-color-50pct);
      }

      /* Disabled */

      :host([disabled]) {
        pointer-events: none;
        color: var(--lumo-disabled-text-color);
      }

      :host([disabled]) [part="label"] ::slotted(*) {
        color: inherit;
      }

      :host([disabled]) [part="checkbox"] {
        background-color: var(--lumo-contrast-10pct);
      }

      :host([disabled]) [part="checkbox"]::after {
        border-color: var(--lumo-contrast-30pct);
      }

      :host([indeterminate][disabled]) [part="checkbox"]::after {
        background-color: var(--lumo-contrast-30pct);
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="label"]:not([empty]) {
        margin: 0.1875em 0.375em 0.1875em 0.875em;
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-checkbox-effects">
  <template>
    <style>
      /* Transition the checkmark if activated with the mouse (disabled for grid select-all this way) */
      :host(:hover) [part="checkbox"]::after {
        transition: width 0.1s, height 0.25s;
      }

      /* Used for activation "halo" */
      [part="checkbox"]::before {
        color: transparent;
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: inherit;
        transform: scale(1.4);
        opacity: 0;
        transition: transform 0.1s, opacity 0.8s;
      }

      /* Hover */

      :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part="checkbox"] {
        background-color: var(--lumo-contrast-30pct);
      }

      /* Disable hover for touch devices */
      @media (pointer: coarse) {
        :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part="checkbox"] {
          background-color: var(--lumo-contrast-20pct);
        }
      }

      /* Active */

      :host([active]) [part="checkbox"] {
        transform: scale(0.9);
        transition-duration: 0.05s;
      }

      :host([active][checked]) [part="checkbox"] {
        transform: scale(1.1);
      }

      :host([active]:not([checked])) [part="checkbox"]::before {
        transition-duration: 0.01s, 0.01s;
        transform: scale(0);
        opacity: 0.4;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($l.content);const Bl=e=>class extends e{static get properties(){return{theme:{type:String,readOnly:!0}}}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"theme"===e&&this._setTheme(i)}},Ul=e=>class extends(Bl(e)){static finalize(){super.finalize();const e=this.prototype._template,t=this.template&&this.template.parentElement&&this.template.parentElement.id===this.is,i=Object.getPrototypeOf(this.prototype)._template;i&&!t&&Array.from(i.content.querySelectorAll("style[include]")).forEach((t=>{this._includeStyle(t.getAttribute("include"),e)})),this._includeMatchingThemes(e)}static _includeMatchingThemes(e){const t=kn.prototype.modules;let i=!1;const r=this.is+"-default-theme";Object.keys(t).sort(((e,t)=>{const i=0===e.indexOf("vaadin-"),r=0===t.indexOf("vaadin-"),n=["lumo-","material-"],o=n.filter((t=>0===e.indexOf(t))).length>0,s=n.filter((e=>0===t.indexOf(e))).length>0;return i!==r?i?-1:1:o!==s?o?-1:1:0})).forEach((n=>{if(n!==r){const r=t[n].getAttribute("theme-for");r&&r.split(" ").forEach((t=>{new RegExp("^"+t.split("*").join(".*")+"$").test(this.is)&&(i=!0,this._includeStyle(n,e))}))}})),!i&&t[r]&&this._includeStyle(r,e)}static _includeStyle(e,t){if(t&&!t.content.querySelector(`style[include="${e}"]`)){const i=document.createElement("style");i.setAttribute("include",e),t.content.appendChild(i)}}};let Vl=!1;window.addEventListener("keydown",(()=>{Vl=!0}),{capture:!0}),window.addEventListener("mousedown",(()=>{Vl=!1}),{capture:!0});const Gl=e=>class extends((e=>class extends e{static get properties(){var e={tabindex:{type:Number,value:0,reflectToAttribute:!0,observer:"_tabindexChanged"}};return window.ShadyDOM&&(e.tabIndex=e.tabindex),e}})(e)){static get properties(){return{autofocus:{type:Boolean},_previousTabIndex:{type:Number},disabled:{type:Boolean,observer:"_disabledChanged",reflectToAttribute:!0},_isShiftTabbing:{type:Boolean}}}ready(){this.addEventListener("focusin",(e=>{e.composedPath()[0]===this?this.contains(e.relatedTarget)||this._focus():-1===e.composedPath().indexOf(this.focusElement)||this.disabled||this._setFocused(!0)})),this.addEventListener("focusout",(e=>this._setFocused(!1))),super.ready();const e=e=>{e.composed||e.target.dispatchEvent(new CustomEvent(e.type,{bubbles:!0,composed:!0,cancelable:!1}))};this.shadowRoot.addEventListener("focusin",e),this.shadowRoot.addEventListener("focusout",e),this.addEventListener("keydown",(e=>{if(!e.defaultPrevented&&9===e.keyCode)if(e.shiftKey)this._isShiftTabbing=!0,HTMLElement.prototype.focus.apply(this),this._setFocused(!1),setTimeout((()=>this._isShiftTabbing=!1),0);else{const e=window.navigator.userAgent.match(/Firefox\/(\d\d\.\d)/);if(e&&parseFloat(e[1])>=63&&parseFloat(e[1])<66&&this.parentNode&&this.nextSibling){const e=document.createElement("input");e.style.position="absolute",e.style.opacity="0",e.tabIndex=this.tabIndex,this.parentNode.insertBefore(e,this.nextSibling),e.focus(),e.addEventListener("focusout",(()=>this.parentNode.removeChild(e)))}}})),this.autofocus&&!this.disabled&&window.requestAnimationFrame((()=>{this._focus(),this._setFocused(!0),this.setAttribute("focus-ring","")}))}disconnectedCallback(){super.disconnectedCallback(),this.hasAttribute("focused")&&this._setFocused(!1)}_setFocused(e){e?this.setAttribute("focused",""):this.removeAttribute("focused"),e&&Vl?this.setAttribute("focus-ring",""):this.removeAttribute("focus-ring")}get focusElement(){return window.console.warn(`Please implement the 'focusElement' property in <${this.localName}>`),this}_focus(){this.focusElement&&!this._isShiftTabbing&&(this.focusElement.focus(),this._setFocused(!0))}focus(){this.focusElement&&!this.disabled&&(this.focusElement.focus(),this._setFocused(!0))}blur(){this.focusElement&&(this.focusElement.blur(),this._setFocused(!1))}_disabledChanged(e){this.focusElement.disabled=e,e?(this.blur(),this._previousTabIndex=this.tabindex,this.tabindex=-1,this.setAttribute("aria-disabled","true")):(void 0!==this._previousTabIndex&&(this.tabindex=this._previousTabIndex),this.removeAttribute("aria-disabled"))}_tabindexChanged(e){void 0!==e&&(this.focusElement.tabIndex=e),this.disabled&&this.tabindex&&(-1!==this.tabindex&&(this._previousTabIndex=this.tabindex),this.tabindex=e=void 0),window.ShadyDOM&&this.setProperties({tabIndex:e,tabindex:e})}click(){this.disabled||super.click()}};class ql{static detectScrollType(){const e=document.createElement("div");e.textContent="ABCD",e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e);let t="reverse";return e.scrollLeft>0?t="default":(e.scrollLeft=2,e.scrollLeft<2&&(t="negative")),document.body.removeChild(e),t}static getNormalizedScrollLeft(e,t,i){const{scrollLeft:r}=i;if("rtl"!==t||!e)return r;switch(e){case"negative":return i.scrollWidth-i.clientWidth+r;case"reverse":return i.scrollWidth-i.clientWidth-r}return r}static setNormalizedScrollLeft(e,t,i,r){if("rtl"===t&&e)switch(e){case"negative":i.scrollLeft=i.clientWidth-i.scrollWidth+r;break;case"reverse":i.scrollLeft=i.scrollWidth-i.clientWidth-r;break;default:i.scrollLeft=r}else i.scrollLeft=r}}const jl=[];let Wl;const Yl=new MutationObserver((function(){const e=Kl();jl.forEach((t=>{Jl(t,e)}))}));Yl.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});const Jl=function(e,t){t?e.setAttribute("dir",t):e.removeAttribute("dir")},Kl=function(){return document.documentElement.getAttribute("dir")},Xl=e=>class extends e{static get properties(){return{dir:{type:String,readOnly:!0}}}static finalize(){super.finalize(),Wl||(Wl=ql.detectScrollType())}connectedCallback(){super.connectedCallback(),this.hasAttribute("dir")||(this.__subscribe(),Jl(this,Kl()))}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),"dir"!==e)return;const r=i===Kl()&&-1===jl.indexOf(this),n=!i&&t&&-1===jl.indexOf(this),o=i!==Kl()&&t===Kl();r||n?(this.__subscribe(),Jl(this,Kl())):o&&this.__subscribe(!1)}disconnectedCallback(){super.disconnectedCallback(),this.__subscribe(!1),this.removeAttribute("dir")}__subscribe(e=!0){e?-1===jl.indexOf(this)&&jl.push(this):jl.indexOf(this)>-1&&jl.splice(jl.indexOf(this),1)}__getNormalizedScrollLeft(e){return ql.getNormalizedScrollLeft(Wl,this.getAttribute("dir")||"ltr",e)}__setNormalizedScrollLeft(e,t){return ql.setNormalizedScrollLeft(Wl,this.getAttribute("dir")||"ltr",e,t)}},Zl=/\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,Ql=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function ed(e,t){if("function"!=typeof e)return;const i=Zl.exec(e.toString());if(i)try{e=new Function(i[1])}catch(e){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",e)}return e(t)}window.Vaadin=window.Vaadin||{};const td=function(e,t){if(window.Vaadin.developmentMode)return ed(e,t)};function id(){}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(Ql?!(Ql&&Object.keys(Ql).map((e=>Ql[e])).filter((e=>e.productionMode)).length>0):!ed((function(){return!0})))}catch(e){return!1}}());const rd=function(){return td(id)};let nd;window.Vaadin||(window.Vaadin={}),window.Vaadin.registrations=window.Vaadin.registrations||[],window.Vaadin.developmentModeCallback=window.Vaadin.developmentModeCallback||{},window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){rd&&rd()};const od=new Set,sd=e=>class extends(Xl(e)){static finalize(){super.finalize();const{is:e}=this;e&&!od.has(e)&&(window.Vaadin.registrations.push(this),od.add(e),window.Vaadin.developmentModeCallback&&(nd=cs.debounce(nd,lo,(()=>{window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]()})),ps(nd)))}constructor(){super(),null===document.doctype&&console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.')}};class ad extends(sd(Gl(Ul(Ks(gl))))){static get template(){return fl`
    <style>
      :host {
        display: inline-block;
      }

      :host([hidden]) {
        display: none !important;
      }

      label {
        display: inline-flex;
        align-items: baseline;
        outline: none;
      }

      [part="checkbox"] {
        position: relative;
        display: inline-block;
        flex: none;
      }

      input[type="checkbox"] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: inherit;
        margin: 0;
      }

      :host([disabled]) {
        -webkit-tap-highlight-color: transparent;
      }
    </style>

    <label>
      <span part="checkbox">
        <input type="checkbox" checked="{{checked::change}}" disabled\$="[[disabled]]" indeterminate="{{indeterminate::change}}" role="presentation" tabindex="-1">
      </span>

      <span part="label">
        <slot></slot>
      </span>
    </label>
`}static get is(){return"vaadin-checkbox"}static get version(){return"2.5.0"}static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,observer:"_checkedChanged",reflectToAttribute:!0},indeterminate:{type:Boolean,notify:!0,observer:"_indeterminateChanged",reflectToAttribute:!0,value:!1},value:{type:String,value:"on"},_nativeCheckbox:{type:Object}}}constructor(){super(),this.name}get name(){return this.checked?this._storedName:""}set name(e){this._storedName=e}ready(){super.ready(),this.setAttribute("role","checkbox"),this._nativeCheckbox=this.shadowRoot.querySelector('input[type="checkbox"]'),this.addEventListener("click",this._handleClick.bind(this)),this._addActiveListeners();const e=this.getAttribute("name");e&&(this.name=e),this.shadowRoot.querySelector('[part~="label"]').querySelector("slot").addEventListener("slotchange",this._updateLabelAttribute.bind(this)),this._updateLabelAttribute()}_updateLabelAttribute(){const e=this.shadowRoot.querySelector('[part~="label"]'),t=e.firstElementChild.assignedNodes();this._isAssignedNodesEmpty(t)?e.setAttribute("empty",""):e.removeAttribute("empty")}_isAssignedNodesEmpty(e){return 0===e.length||1==e.length&&e[0].nodeType==Node.TEXT_NODE&&""===e[0].textContent.trim()}_checkedChanged(e){this.indeterminate?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",Boolean(e))}_indeterminateChanged(e){e?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",this.checked)}_addActiveListeners(){this._addEventListenerToNode(this,"down",(e=>{this.__interactionsAllowed(e)&&this.setAttribute("active","")})),this._addEventListenerToNode(this,"up",(()=>this.removeAttribute("active"))),this.addEventListener("keydown",(e=>{this.__interactionsAllowed(e)&&32===e.keyCode&&(e.preventDefault(),this.setAttribute("active",""))})),this.addEventListener("keyup",(e=>{this.__interactionsAllowed(e)&&32===e.keyCode&&(e.preventDefault(),this._toggleChecked(),this.removeAttribute("active"),this.indeterminate&&(this.indeterminate=!1))}))}get focusElement(){return this.shadowRoot.querySelector("input")}__interactionsAllowed(e){return!this.disabled&&"a"!==e.target.localName}_handleClick(e){this.__interactionsAllowed(e)&&(this.indeterminate?(this.indeterminate=!1,e.preventDefault(),this._toggleChecked()):e.composedPath()[0]!==this._nativeCheckbox&&(e.preventDefault(),this._toggleChecked()))}_toggleChecked(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{composed:!1,bubbles:!0}))}}customElements.define(ad.is,ad);const ld=fl`<dom-module id="lumo-grid" theme-for="vaadin-grid">
  <template>
    <style>
      :host {
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-m);
        line-height: var(--lumo-line-height-s);
        color: var(--lumo-body-text-color);
        background-color: var(--lumo-base-color);
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        /* For internal use only */
        --_lumo-grid-border-color: var(--lumo-contrast-20pct);
        --_lumo-grid-secondary-border-color: var(--lumo-contrast-10pct);
        --_lumo-grid-border-width: 1px;
        --_lumo-grid-selected-row-color: var(--lumo-primary-color-10pct);
      }

      /* No (outer) border */

      :host(:not([theme~="no-border"])) {
        border: var(--_lumo-grid-border-width) solid var(--_lumo-grid-border-color);
      }

      /* Cell styles */

      [part~="cell"] {
        min-height: var(--lumo-size-m);
        background-color: var(--lumo-base-color);
      }

      [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        cursor: default;
        padding: var(--lumo-space-xs) var(--lumo-space-m);
      }

      /* Apply row borders by default and introduce the "no-row-borders" variant */
      :host(:not([theme~="no-row-borders"])) [part~="cell"]:not([part~="details-cell"]) {
        border-top: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
      }

      /* Hide first body row top border */
      :host(:not([theme~="no-row-borders"])) [part="row"][first] [part~="cell"]:not([part~="details-cell"]) {
        border-top: 0;
        min-height: calc(var(--lumo-size-m) - var(--_lumo-grid-border-width));
      }

      /* Focus-ring */

      [part~="cell"]:focus {
        outline: none;
      }

      :host([navigating]) [part~="cell"]:focus::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        box-shadow: inset 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      /* Drag and Drop styles */
      :host([dragover])::after {
        content: "";
        position: absolute;
        z-index: 100;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        box-shadow: inset 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      [part~="row"][dragover] {
        z-index: 100 !important;
      }

      [part~="row"][dragover] [part~="cell"] {
        overflow: visible;
      }

      [part~="row"][dragover] [part~="cell"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: calc(var(--_lumo-grid-border-width) + 2px);
        pointer-events: none;
        background: var(--lumo-primary-color-50pct);
      }

      :host([theme~="no-row-borders"]) [dragover] [part~="cell"]::after {
        height: 2px;
      }

      [part~="row"][dragover="below"] [part~="cell"]::after {
        top: 100%;
        bottom: auto;
        margin-top: -1px;
      }

      [part~="row"][dragover="above"] [part~="cell"]::after {
        top: auto;
        bottom: 100%;
        margin-bottom: -1px;
      }

      [part~="row"][details-opened][dragover="below"] [part~="cell"]:not([part~="details-cell"])::after,
      [part~="row"][details-opened][dragover="above"] [part~="details-cell"]::after {
        display: none;
      }

      [part~="row"][dragover][dragover="on-top"] [part~="cell"]::after {
        height: 100%;
      }

      [part~="row"][dragstart] {
        /* Add bottom-space to the row so the drag number doesn't get clipped. Needed for IE/Edge */
        border-bottom: 100px solid transparent;
        z-index: 100 !important;
        opacity: 0.9;
      }

      [part~="row"][dragstart] [part~="cell"] {
        border: none !important;
        box-shadow: none !important;
      }

      [part~="row"][dragstart] [part~="cell"][last-column] {
        border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
      }

      [part~="row"][dragstart] [part~="cell"][first-column] {
        border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
      }

      [ios] [part~="row"][dragstart] [part~="cell"] {
        background: var(--lumo-primary-color-50pct);
      }

      #scroller:not([ios]) [part~="row"][dragstart]:not([dragstart=""])::after {
        display: block;
        position: absolute;
        left: var(--_grid-drag-start-x);
        top: var(--_grid-drag-start-y);
        z-index: 100;
        content: attr(dragstart);
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: calc(var(--lumo-space-xs) * 0.8);
        color: var(--lumo-error-contrast-color);
        background-color: var(--lumo-error-color);
        border-radius: var(--lumo-border-radius-m);
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-xxs);
        line-height: 1;
        font-weight: 500;
        text-transform: initial;
        letter-spacing: initial;
        min-width: calc(var(--lumo-size-s) * 0.7);
        text-align: center;
      }

      /* Headers and footers */

      [part~="header-cell"] ::slotted(vaadin-grid-cell-content),
      [part~="footer-cell"] ::slotted(vaadin-grid-cell-content),
      [part~="reorder-ghost"] {
        font-size: var(--lumo-font-size-s);
        font-weight: 500;
      }

      [part~="footer-cell"] ::slotted(vaadin-grid-cell-content) {
        font-weight: 400;
      }

      [part="row"]:only-child [part~="header-cell"] {
        min-height: var(--lumo-size-xl);
      }

      /* Header borders */

      /* Hide first header row top border */
      :host(:not([theme~="no-row-borders"])) [part="row"]:first-child [part~="header-cell"] {
        border-top: 0;
      }

      [part="row"]:last-child [part~="header-cell"] {
        border-bottom: var(--_lumo-grid-border-width) solid transparent;
      }

      :host(:not([theme~="no-row-borders"])) [part="row"]:last-child [part~="header-cell"] {
        border-bottom-color: var(--_lumo-grid-secondary-border-color);
      }

      /* Overflow uses a stronger border color */
      :host([overflow~="top"]) [part="row"]:last-child [part~="header-cell"] {
        border-bottom-color: var(--_lumo-grid-border-color);
      }

      /* Footer borders */

      [part="row"]:first-child [part~="footer-cell"] {
        border-top: var(--_lumo-grid-border-width) solid transparent;
      }

      :host(:not([theme~="no-row-borders"])) [part="row"]:first-child [part~="footer-cell"] {
        border-top-color: var(--_lumo-grid-secondary-border-color);
      }

      /* Overflow uses a stronger border color */
      :host([overflow~="bottom"]) [part="row"]:first-child [part~="footer-cell"] {
        border-top-color: var(--_lumo-grid-border-color);
      }

      /* Column reordering */

      :host([reordering]) [part~="cell"] {
        background: linear-gradient(var(--lumo-shade-20pct), var(--lumo-shade-20pct)) var(--lumo-base-color);
      }

      :host([reordering]) [part~="cell"][reorder-status="allowed"] {
        background: var(--lumo-base-color);
      }

      :host([reordering]) [part~="cell"][reorder-status="dragging"] {
        background: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct)) var(--lumo-base-color);
      }

      [part~="reorder-ghost"] {
        opacity: 0.85;
        box-shadow: var(--lumo-box-shadow-s);
        /* TODO Use the same styles as for the cell element (reorder-ghost copies styles from the cell element) */
        padding: var(--lumo-space-s) var(--lumo-space-m) !important;
      }

      /* Column resizing */

      [part="resize-handle"] {
        width: 3px;
        background-color: var(--lumo-primary-color-50pct);
        opacity: 0;
        transition: opacity 0.2s;
      }

      :host(:not([reordering])) *:not([column-resizing]) [part~="cell"]:hover [part="resize-handle"],
      [part="resize-handle"]:active {
        opacity: 1;
        transition-delay: 0.15s;
      }

      /* Column borders */

      :host([theme~="column-borders"]) [part~="cell"]:not([last-column]):not([part~="details-cell"]) {
        border-right: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
      }

      /* Frozen columns */

      [last-frozen] {
        border-right: var(--_lumo-grid-border-width) solid transparent;
        overflow: hidden;
      }

      :host([overflow~="left"]) [part~="cell"][last-frozen]:not([part~="details-cell"]) {
        border-right-color: var(--_lumo-grid-border-color);
      }

      /* Row stripes */

      :host([theme~="row-stripes"]) [part~="row"]:not([odd]) [part~="body-cell"],
      :host([theme~="row-stripes"]) [part~="row"]:not([odd]) [part~="details-cell"] {
        background-image: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
        background-repeat: repeat-x;
      }

      /* Selected row */

      /* Raise the selected rows above unselected rows (so that box-shadow can cover unselected rows) */
      :host(:not([reordering])) [part~="row"][selected] {
        z-index: 1;
      }

      :host(:not([reordering])) [part~="row"][selected] [part~="body-cell"]:not([part~="details-cell"]) {
        background-image: linear-gradient(var(--_lumo-grid-selected-row-color), var(--_lumo-grid-selected-row-color));
        background-repeat: repeat;
      }

      /* Cover the border of an unselected row */
      :host(:not([theme~="no-row-borders"])) [part~="row"][selected] [part~="cell"]:not([part~="details-cell"]) {
        box-shadow: 0 var(--_lumo-grid-border-width) 0 0 var(--_lumo-grid-selected-row-color);
      }

      /* Compact */

      :host([theme~="compact"]) [part="row"]:only-child [part~="header-cell"] {
        min-height: var(--lumo-size-m);
      }

      :host([theme~="compact"]) [part~="cell"] {
        min-height: var(--lumo-size-s);
      }

      :host([theme~="compact"]) [part="row"][first] [part~="cell"]:not([part~="details-cell"]) {
        min-height: calc(var(--lumo-size-s) - var(--_lumo-grid-border-width));
      }

      :host([theme~="compact"]) [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        padding: var(--lumo-space-xs) var(--lumo-space-s);
      }

      /* Wrap cell contents */

      :host([theme~="wrap-cell-content"]) [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        white-space: normal;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part~="row"][dragstart] [part~="cell"][last-column] {
        border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
      }

      :host([dir="rtl"]) [part~="row"][dragstart] [part~="cell"][first-column] {
        border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
      }

      :host([dir="rtl"][theme~="column-borders"]) [part~="cell"]:not([last-column]):not([part~="details-cell"]) {
        border-right: none;
        border-left: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
      }

      :host([dir="rtl"]) [last-frozen] {
        border-right: none;
        border-left: var(--_lumo-grid-border-width) solid transparent;
      }

      :host([dir="rtl"][overflow~="right"]) [part~="cell"][last-frozen]:not([part~="details-cell"]) {
        border-left-color: var(--_lumo-grid-border-color);
      }
    </style>
  </template>
</dom-module><dom-module theme-for="vaadin-checkbox" id="vaadin-grid-select-all-checkbox-lumo">
  <template>
    <style>
      :host(.vaadin-grid-select-all-checkbox) {
        font-size: var(--lumo-font-size-m);
      }
   </style>
  </template>
</dom-module>`;document.head.appendChild(ld.content);var dd=new Set;const cd={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(dd.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach((function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)}),this),this._fireResize())},assignParentResizable:function(e){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=e,e&&-1===e._interestedResizables.indexOf(this)&&(e._interestedResizables.push(this),e._subscribeIronResize(this))},stopResizeNotificationsFor:function(e){var t=this._interestedResizables.indexOf(e);t>-1&&(this._interestedResizables.splice(t,1),this._unsubscribeIronResize(e))},_subscribeIronResize:function(e){e.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(e){e.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(e){return!0},_onDescendantIronResize:function(e){this._notifyingDescendant?e.stopPropagation():an||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(e){var t=Pa(e).rootTarget;t!==this&&(t.assignParentResizable(this),this._notifyDescendant(t),e.stopPropagation())},_parentResizableChanged:function(e){e&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(e){this.isAttached&&(this._notifyingDescendant=!0,e.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var e=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function t(){document.removeEventListener("readystatechange",t),e()}))}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach((function(e){e!==this&&e._findParent()}),this):(dd.forEach((function(e){e!==this&&e._findParent()}),this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?dd.delete(this):dd.add(this)}},hd={properties:{scrollTarget:{type:HTMLElement,value:function(){return this._defaultScrollTarget}}},observers:["_scrollTargetChanged(scrollTarget, isAttached)"],_shouldHaveListener:!0,_scrollTargetChanged:function(e,t){if(this._oldScrollTarget&&(this._toggleScrollListener(!1,this._oldScrollTarget),this._oldScrollTarget=null),t)if("document"===e)this.scrollTarget=this._doc;else if("string"==typeof e){var i=this.domHost;this.scrollTarget=i&&i.$?i.$[e]:Pa(this.ownerDocument).querySelector("#"+e)}else this._isValidScrollTarget()&&(this._oldScrollTarget=e,this._toggleScrollListener(this._shouldHaveListener,e))},_scrollHandler:function(){},get _defaultScrollTarget(){return this._doc},get _doc(){return this.ownerDocument.documentElement},get _scrollTop(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop:0},get _scrollLeft(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft:0},set _scrollTop(e){this.scrollTarget===this._doc?window.scrollTo(window.pageXOffset,e):this._isValidScrollTarget()&&(this.scrollTarget.scrollTop=e)},set _scrollLeft(e){this.scrollTarget===this._doc?window.scrollTo(e,window.pageYOffset):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=e)},scroll:function(e,t){var i;"object"==typeof e?(i=e.left,t=e.top):i=e,i=i||0,t=t||0,this.scrollTarget===this._doc?window.scrollTo(i,t):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=i,this.scrollTarget.scrollTop=t)},get _scrollTargetWidth(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth:0},get _scrollTargetHeight(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight:0},_isValidScrollTarget:function(){return this.scrollTarget instanceof HTMLElement},_toggleScrollListener:function(e,t){var i=t===this._doc?window:t;e?this._boundScrollHandler||(this._boundScrollHandler=this._scrollHandler.bind(this),i.addEventListener("scroll",this._boundScrollHandler)):this._boundScrollHandler&&(i.removeEventListener("scroll",this._boundScrollHandler),this._boundScrollHandler=null)},toggleScrollListener:function(e){this._shouldHaveListener=e,this._toggleScrollListener(e,this.scrollTarget)}};var pd=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/),ud=pd&&pd[1]>=8,md=ao,fd=lo,gd=co;const _d=qa({behaviors:[cd,hd],_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_collection:null,_lastVisibleIndexVal:null,_maxPages:2,_focusedVirtualIndex:-1,_itemsPerRow:1,_rowHeight:0,_templateCost:0,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){return(this.grid?this._physicalRows*this._rowHeight:this._physicalSize)-this._viewportHeight},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){var e=this._convertIndexToCompleteRow(this._virtualCount);return Math.max(0,e-this._physicalCount)},set _virtualStart(e){e=this._clamp(e,0,this._maxVirtualStart),this.grid&&(e-=e%this._itemsPerRow),this._virtualStartVal=e},get _virtualStart(){return this._virtualStartVal||0},set _physicalStart(e){(e%=this._physicalCount)<0&&(e=this._physicalCount+e),this.grid&&(e-=e%this._itemsPerRow),this._physicalStartVal=e},get _physicalStart(){return this._physicalStartVal||0},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},set _physicalCount(e){this._physicalCountVal=e},get _physicalCount(){return this._physicalCountVal||0},get _optPhysicalSize(){return 0===this._viewportHeight?1/0:this._viewportHeight*this._maxPages},get _isVisible(){return Boolean(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){var e=this._firstVisibleIndexVal;if(null==e){var t=this._physicalTop+this._scrollOffset;e=this._iterateItems((function(e,i){return(t+=this._getPhysicalSizeIncrement(e))>this._scrollPosition?this.grid?i-i%this._itemsPerRow:i:this.grid&&this._virtualCount-1===i?i-i%this._itemsPerRow:void 0}))||0,this._firstVisibleIndexVal=e}return e},get lastVisibleIndex(){var e=this._lastVisibleIndexVal;if(null==e){if(this.grid)e=Math.min(this._virtualCount,this.firstVisibleIndex+this._estRowsInView*this._itemsPerRow-1);else{var t=this._physicalTop+this._scrollOffset;this._iterateItems((function(i,r){t<this._scrollBottom&&(e=r),t+=this._getPhysicalSizeIncrement(i)}))}this._lastVisibleIndexVal=e}return e},get _scrollOffset(){return this._scrollerPaddingTop},attached:function(){this._debounce("_render",this._render,md),this.listen(this,"iron-resize","_resizeHandler")},detached:function(){this.unlisten(this,"iron-resize","_resizeHandler")},updateViewportBoundaries:function(){var e=window.getComputedStyle(this);this._scrollerPaddingTop=this.scrollTarget===this?0:parseInt(e["padding-top"],10),this._isRTL=Boolean("rtl"===e.direction),this._viewportWidth=this.$.items.offsetWidth,this._viewportHeight=this._scrollTargetHeight,this.grid&&this._updateGridMetrics()},_scrollHandler:function(){var e=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop)),t=e-this._scrollPosition,i=t>=0;if(this._scrollPosition=e,this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,Math.abs(t)>this._physicalSize&&this._physicalSize>0){t-=this._scrollOffset;var r=Math.round(t/this._physicalAverage)*this._itemsPerRow;this._virtualStart=this._virtualStart+r,this._physicalStart=this._physicalStart+r,this._physicalTop=Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage,this._update()}else if(this._physicalCount>0){var n=this._getReusables(i);i?(this._physicalTop=n.physicalTop,this._virtualStart=this._virtualStart+n.indexes.length,this._physicalStart=this._physicalStart+n.indexes.length):(this._virtualStart=this._virtualStart-n.indexes.length,this._physicalStart=this._physicalStart-n.indexes.length),this._update(n.indexes,i?null:n.indexes),this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),gd)}},_getReusables:function(e){var t,i,r,n=[],o=this._hiddenContentSize*this._ratio,s=this._virtualStart,a=this._virtualEnd,l=this._physicalCount,d=this._physicalTop+this._scrollOffset,c=this._physicalBottom+this._scrollOffset,h=this._scrollTop,p=this._scrollBottom;for(e?(t=this._physicalStart,i=h-d):(t=this._physicalEnd,i=c-p);i-=r=this._getPhysicalSizeIncrement(t),!(n.length>=l||i<=o);)if(e){if(a+n.length+1>=this._virtualCount)break;if(d+r>=h-this._scrollOffset)break;n.push(t),d+=r,t=(t+1)%l}else{if(s-n.length<=0)break;if(d+this._physicalSize-r<=p)break;n.push(t),d-=r,t=0===t?l-1:t-1}return{indexes:n,physicalTop:d-this._scrollOffset}},_update:function(e,t){if(!(e&&0===e.length||0===this._physicalCount)){if(this._manageFocus(),this._assignModels(e),this._updateMetrics(e),t)for(;t.length;){var i=t.pop();this._physicalTop-=this._getPhysicalSizeIncrement(i)}this._positionItems(),this._updateScrollerSize()}},_isClientFull:function(){return 0!=this._scrollBottom&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded:function(e){var t=this._clamp(this._physicalCount+e,3,this._virtualCount-this._virtualStart),i=(t=this._convertIndexToCompleteRow(t))-this._physicalCount,r=Math.round(.5*this._physicalCount);if(!(i<0)){if(i>0){var n=window.performance.now();[].push.apply(this._physicalItems,this._createPool(i));for(var o=0;o<i;o++)this._physicalSizes.push(0);this._physicalCount=this._physicalCount+i,this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd&&(this._physicalStart=this._physicalStart+i),this._update(),this._templateCost=(window.performance.now()-n)/i,r=Math.round(.5*this._physicalCount)}this._virtualEnd>=this._virtualCount-1||0===r||(this._isClientFull()?this._physicalSize<this._optPhysicalSize&&this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,r)),fd):this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,r),gd))}},_render:function(){if(this.isAttached&&this._isVisible)if(0!==this._physicalCount){var e=this._getReusables(!0);this._physicalTop=e.physicalTop,this._virtualStart=this._virtualStart+e.indexes.length,this._physicalStart=this._physicalStart+e.indexes.length,this._update(e.indexes),this._update(),this._increasePoolIfNeeded(0)}else this._virtualCount>0&&(this.updateViewportBoundaries(),this._increasePoolIfNeeded(3))},_itemsChanged:function(e){"items"===e.path&&(this._virtualStart=0,this._physicalTop=0,this._virtualCount=this.items?this.items.length:0,this._collection=(this.items,null),this._physicalIndexForKey={},this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._physicalCount=this._physicalCount||0,this._physicalItems=this._physicalItems||[],this._physicalSizes=this._physicalSizes||[],this._physicalStart=0,this._scrollTop>this._scrollOffset&&this._resetScrollPosition(0),this._removeFocusedItem(),this._debounce("_render",this._render,md))},_iterateItems:function(e,t){var i,r,n,o;if(2===arguments.length&&t){for(o=0;o<t.length;o++)if(i=t[o],r=this._computeVidx(i),null!=(n=e.call(this,i,r)))return n}else{for(i=this._physicalStart,r=this._virtualStart;i<this._physicalCount;i++,r++)if(null!=(n=e.call(this,i,r)))return n;for(i=0;i<this._physicalStart;i++,r++)if(null!=(n=e.call(this,i,r)))return n}},_computeVidx:function(e){return e>=this._physicalStart?this._virtualStart+(e-this._physicalStart):this._virtualStart+(this._physicalCount-this._physicalStart)+e},_updateMetrics:function(e){if(this._isVisible){va();var t=0,i=0,r=this._physicalAverageCount,n=this._physicalAverage;this._iterateItems((function(e,r){i+=this._physicalSizes[e],this._physicalSizes[e]=this._physicalItems[e].offsetHeight,t+=this._physicalSizes[e],this._physicalAverageCount+=this._physicalSizes[e]?1:0}),e),this.grid?(this._updateGridMetrics(),this._physicalSize=Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight):(i=1===this._itemsPerRow?i:Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight,this._physicalSize=this._physicalSize+t-i,this._itemsPerRow=1),this._physicalAverageCount!==r&&(this._physicalAverage=Math.round((n*r+t)/this._physicalAverageCount))}},_positionItems:function(){this._adjustScrollPosition();var e=this._physicalTop;this._iterateItems((function(t,i){this.translate3d(0,e+"px",0,this._physicalItems[t]),e+=this._physicalSizes[t]}))},_getPhysicalSizeIncrement:function(e){return this.grid?this._computeVidx(e)%this._itemsPerRow!=this._itemsPerRow-1?0:this._rowHeight:this._physicalSizes[e]},_adjustScrollPosition:function(){var e=0===this._virtualStart?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(0!==e){this._physicalTop=this._physicalTop-e;var t=this._scrollTop;!ud&&t>0&&this._resetScrollPosition(t-e)}},_resetScrollPosition:function(e){this.scrollTarget&&e>=0&&(this._scrollTop=e,this._scrollPosition=this._scrollTop)},_updateScrollerSize:function(e){this.grid?this._estScrollHeight=this._virtualRowCount*this._rowHeight:this._estScrollHeight=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage,((e=(e=(e=e||0===this._scrollHeight)||this._scrollPosition>=this._estScrollHeight-this._physicalSize)||this.grid&&this.$.items.style.height<this._estScrollHeight)||Math.abs(this._estScrollHeight-this._scrollHeight)>=this._viewportHeight)&&(this.$.items.style.height=this._estScrollHeight+"px",this._scrollHeight=this._estScrollHeight)},scrollToIndex:function(e){if(!("number"!=typeof e||e<0||e>this.items.length-1)&&(va(),0!==this._physicalCount)){e=this._clamp(e,0,this._virtualCount-1),(!this._isIndexRendered(e)||e>=this._maxVirtualStart)&&(this._virtualStart=this.grid?e-2*this._itemsPerRow:e-1),this._manageFocus(),this._assignModels(),this._updateMetrics(),this._physicalTop=Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage;for(var t=this._physicalStart,i=this._virtualStart,r=0,n=this._hiddenContentSize;i<e&&r<=n;)r+=this._getPhysicalSizeIncrement(t),t=(t+1)%this._physicalCount,i++;this._updateScrollerSize(!0),this._positionItems(),this._resetScrollPosition(this._physicalTop+this._scrollOffset+r),this._increasePoolIfNeeded(0),this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null}},_resetAverage:function(){this._physicalAverage=0,this._physicalAverageCount=0},_resizeHandler:function(){this._debounce("_render",(function(){this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this.updateViewportBoundaries(),this._isVisible?(this.toggleScrollListener(!0),this._resetAverage(),this._render()):this.toggleScrollListener(!1)}),md)},_convertIndexToCompleteRow:function(e){return this._itemsPerRow=this._itemsPerRow||1,this.grid?Math.ceil(e/this._itemsPerRow)*this._itemsPerRow:e},_isIndexRendered:function(e){return e>=this._virtualStart&&e<=this._virtualEnd},_getPhysicalIndex:function(e){return(this._physicalStart+(e-this._virtualStart))%this._physicalCount},_clamp:function(e,t,i){return Math.min(i,Math.max(t,e))},_debounce:function(e,t,i){this._debouncers=this._debouncers||{},this._debouncers[e]=cs.debounce(this._debouncers[e],i,t.bind(this)),ps(this._debouncers[e])}});class bd extends _d{static get is(){return"vaadin-grid-scroller"}static get properties(){return{size:{type:Number,notify:!0},_vidxOffset:{value:0}}}static get observers(){return["_effectiveSizeChanged(_effectiveSize)"]}connectedCallback(){super.connectedCallback(),this._scrollHandler()}_updateScrollerItem(e,t){}_afterScroll(){}_getRowTarget(){}_createScrollerRows(){}_canPopulate(){}scrollToIndex(e){this._warnPrivateAPIAccess("scrollToIndex"),this._scrollingToIndex=!0,e=Math.min(Math.max(e,0),this._effectiveSize-1),this.$.table.scrollTop=e/this._effectiveSize*(this.$.table.scrollHeight-this.$.table.offsetHeight),this._scrollHandler(),this._accessIronListAPI((()=>this._maxScrollTop))&&this._virtualCount<this._effectiveSize&&this._adjustVirtualIndexOffset(1e6),this._accessIronListAPI((()=>super.scrollToIndex(e-this._vidxOffset))),this._scrollHandler();const t=Array.from(this.$.items.children).filter((t=>t.index===e))[0];if(t){const e=t.getBoundingClientRect().top-this.$.header.getBoundingClientRect().bottom;Math.abs(e)>1&&(this.$.table.scrollTop+=e,this._scrollHandler())}this._scrollingToIndex=!1}_effectiveSizeChanged(e){let t,i=0;if(this._iterateItems(((e,r)=>{if(r===this._firstVisibleIndex){const r=this._physicalItems[e];t=r.index,i=r.getBoundingClientRect().top}})),this.items&&e<this.items.length&&(this._scrollTop=0),!Array.isArray(this.items)){const t=this._edge||this._ie?3e4:1e5;this.items={length:Math.min(e,t)}}this._accessIronListAPI((()=>super._itemsChanged({path:"items"}))),this._virtualCount=Math.min(this.items.length,e)||0,0===this._scrollTop&&(this._accessIronListAPI((()=>this._scrollToIndex(Math.min(e-1,t)))),this._iterateItems(((e,r)=>{const n=this._physicalItems[e];if(n.index===t&&(this.$.table.scrollTop+=Math.round(n.getBoundingClientRect().top-i)),n.index===this._focusedItemIndex&&this._itemsFocusable&&this.$.items.contains(this.shadowRoot.activeElement)){const e=Array.from(this._itemsFocusable.parentElement.children).indexOf(this._itemsFocusable);n.children[e].focus()}}))),this._assignModels(),requestAnimationFrame((()=>this._update())),this.__updateFooterPositioning(),this._ie&&(this.$.table.style.display="block",setTimeout((()=>{this.$.table.style.display="flex",this._translateStationaryElements()})))}_positionItems(){let e;this._adjustScrollPosition(),isNaN(this._physicalTop)&&(e=!0,this._physicalTop=0);let t=this._physicalTop;this._iterateItems(((e,i)=>{this._physicalItems[e].style.transform=`translateY(${t}px)`,t+=this._physicalSizes[e]})),e&&this._scrollToIndex(0)}_increasePoolIfNeeded(e){0===e&&this._scrollingToIndex||!this._canPopulate()||!this._effectiveSize||(this._initialPoolCreated?this._optPhysicalSize!==1/0&&(this._debounceIncreasePool=cs.debounce(this._debounceIncreasePool,ao,(()=>{this._updateMetrics();const e=this._optPhysicalSize-this._physicalSize;let t=Math.ceil(e/this._physicalAverage);this._physicalCount+t>this._effectiveSize&&(t=Math.max(0,this._effectiveSize-this._physicalCount)),this._physicalSize&&t>0&&this._optPhysicalSize!==1/0&&(super._increasePoolIfNeeded(t),this.__reorderChildNodes()),this.__flushPendingRecalculateColumnWidths()}))):(this._initialPoolCreated=!0,super._increasePoolIfNeeded(25)))}__reorderChildNodes(){const e=Array.from(this.$.items.childNodes);!!e.reduce(((e,t,i,r)=>{if(0===i||r[i-1].index===t.index-1)return e}),!0)||e.sort(((e,t)=>e.index-t.index)).forEach((e=>this.$.items.appendChild(e)))}_createPool(e){const t=document.createDocumentFragment(),i=this._createScrollerRows(e);i.forEach((e=>t.appendChild(e))),this._getRowTarget().appendChild(t);const r=this.querySelector("[slot]");if(r){const e=r.getAttribute("slot");r.setAttribute("slot","foo-bar"),r.setAttribute("slot",e)}var n,o,s;return n=this,o=()=>this.notifyResize(),la||ha(),ca.push([n,o,s]),i}_assignModels(e){this._iterateItems(((e,t)=>{const i=this._physicalItems[e];this._toggleAttribute("hidden",t>=this._effectiveSize,i),this._updateScrollerItem(i,t+(this._vidxOffset||0))}),e)}_scrollHandler(){const e=this.$.table.scrollTop-this._scrollPosition;this._accessIronListAPI(super._scrollHandler);const t=this._vidxOffset;this._accessIronListAPI((()=>this._maxScrollTop))&&this._virtualCount<this._effectiveSize?this._adjustVirtualIndexOffset(e):this._vidxOffset=0,this._vidxOffset!==t&&this._update(),this._afterScroll()}_adjustVirtualIndexOffset(e){if(Math.abs(e)>1e4){if(this._noScale)return void(this._noScale=!1);const e=this.$.table.scrollTop/(this.$.table.scrollHeight-this.$.table.offsetHeight),t=e*this._effectiveSize;this._vidxOffset=Math.round(t-e*this._virtualCount)}else{const e=this._vidxOffset||0,t=1e3,i=100;0===this._scrollTop?(this._vidxOffset=0,e!==this._vidxOffset&&super.scrollToIndex(0)):this.firstVisibleIndex<t&&this._vidxOffset>0&&(this._vidxOffset-=Math.min(this._vidxOffset,i),e!==this._vidxOffset&&super.scrollToIndex(this.firstVisibleIndex+(e-this._vidxOffset)),this._noScale=!0);const r=this._effectiveSize-this._virtualCount;this._scrollTop>=this._maxScrollTop&&this._maxScrollTop>0?(this._vidxOffset=r,e!==this._vidxOffset&&super.scrollToIndex(this._virtualCount)):this.firstVisibleIndex>this._virtualCount-t&&this._vidxOffset<r&&(this._vidxOffset+=Math.min(r-this._vidxOffset,i),e!==this._vidxOffset&&super.scrollToIndex(this.firstVisibleIndex-(this._vidxOffset-e)),this._noScale=!0)}}_accessIronListAPI(e){this._warnPrivateAPIAccessAsyncEnabled=!1;const t=e.apply(this);return this._debouncerWarnPrivateAPIAccess=cs.debounce(this._debouncerWarnPrivateAPIAccess,ao,(()=>this._warnPrivateAPIAccessAsyncEnabled=!0)),t}_debounceRender(e,t){super._debounceRender((()=>this._accessIronListAPI(e)),t)}_warnPrivateAPIAccess(e){this._warnPrivateAPIAccessAsyncEnabled&&console.warn(`Accessing private API (${e})!`)}_render(){this._accessIronListAPI(super._render)}_createFocusBackfillItem(){}_multiSelectionChanged(){}clearSelection(){}_itemsChanged(){}_manageFocus(){}_removeFocusedItem(){}get _firstVisibleIndex(){return this._accessIronListAPI((()=>super.firstVisibleIndex))}get _lastVisibleIndex(){return this._accessIronListAPI((()=>super.lastVisibleIndex))}_scrollToIndex(e){this._accessIronListAPI((()=>this.scrollToIndex(e)))}get firstVisibleIndex(){return this._warnPrivateAPIAccess("firstVisibleIndex"),super.firstVisibleIndex}set firstVisibleIndex(e){this._warnPrivateAPIAccess("firstVisibleIndex"),super.firstVisibleIndex=e}get lastVisibleIndex(){return this._warnPrivateAPIAccess("lastVisibleIndex"),super.lastVisibleIndex}set lastVisibleIndex(e){this._warnPrivateAPIAccess("lastVisibleIndex"),super.lastVisibleIndex=e}updateViewportBoundaries(){this._warnPrivateAPIAccess("updateViewportBoundaries"),super.updateViewportBoundaries.apply(this,arguments)}_resizeHandler(){super._resizeHandler(),va()}__isCreatingRows(){const e=this._debouncers&&this._debouncers._increasePoolIfNeeded&&this._debouncers._increasePoolIfNeeded.isActive(),t=this._debounceIncreasePool&&this._debounceIncreasePool.isActive();return e||t}}customElements.define(bd.is,bd);const yd=e=>class extends e{static get observers(){return["_a11yUpdateGridSize(size, _columnTree, _columnTree.*)"]}_a11yGetHeaderRowCount(e){return e.filter((e=>e.some((e=>e._headerTemplate||e.headerRenderer||e.path||e.header)))).length}_a11yGetFooterRowCount(e){return e.filter((e=>e.some((e=>e._headerTemplate||e.headerRenderer)))).length}_a11yUpdateGridSize(e,t){if(void 0===e||void 0===t)return;const i=t[t.length-1];this.$.table.setAttribute("aria-rowcount",e+this._a11yGetHeaderRowCount(t)+this._a11yGetFooterRowCount(t)),this.$.table.setAttribute("aria-colcount",i&&i.length||0),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows()}_a11yUpdateHeaderRows(){Array.from(this.$.header.children).forEach(((e,t)=>e.setAttribute("aria-rowindex",t+1)))}_a11yUpdateFooterRows(){Array.from(this.$.footer.children).forEach(((e,t)=>e.setAttribute("aria-rowindex",this._a11yGetHeaderRowCount(this._columnTree)+this.size+t+1)))}_a11yUpdateRowRowindex(e,t){e.setAttribute("aria-rowindex",t+this._a11yGetHeaderRowCount(this._columnTree)+1)}_a11yUpdateRowSelected(e,t){e.setAttribute("aria-selected",Boolean(t)),Array.from(e.children).forEach((e=>e.setAttribute("aria-selected",Boolean(t))))}_a11yUpdateRowLevel(e,t){e.setAttribute("aria-level",t+1)}_a11yUpdateRowDetailsOpened(e,t){Array.from(e.children).forEach((e=>{"boolean"==typeof t?e.setAttribute("aria-expanded",t):e.hasAttribute("aria-expanded")&&e.removeAttribute("aria-expanded")}))}_a11ySetRowDetailsCell(e,t){Array.from(e.children).forEach((e=>{e!==t&&e.setAttribute("aria-controls",t.id)}))}_a11yUpdateCellColspan(e,t){e.setAttribute("aria-colspan",Number(t))}_a11yUpdateSorters(){Array.from(this.querySelectorAll("vaadin-grid-sorter")).forEach((e=>{let t=e.parentNode;for(;t&&"vaadin-grid-cell-content"!==t.localName;)t=t.parentNode;if(t&&t.assignedSlot){t.assignedSlot.parentNode.setAttribute("aria-sort",{asc:"ascending",desc:"descending"}[String(e.direction)]||"none")}}))}},vd=e=>class extends e{static get properties(){return{activeItem:{type:Object,notify:!0,value:null}}}ready(){super.ready(),this.$.scroller.addEventListener("click",this._onClick.bind(this)),this.addEventListener("cell-activate",this._activateItem.bind(this))}_activateItem(e){const t=e.detail.model,i=t?t.item:null;i&&(this.activeItem=this._itemsEqual(this.activeItem,i)?null:i)}_onClick(e){if(e.defaultPrevented)return;const t=e.composedPath(),i=t[t.indexOf(this.$.table)-3];if(!i||i.getAttribute("part").indexOf("details-cell")>-1)return;const r=i._content,n=this.getRootNode().activeElement;r.contains(n)&&(!this._ie||this._isFocusable(n))||this._isFocusable(e.target)||this.dispatchEvent(new CustomEvent("cell-activate",{detail:{model:this.__getRowModel(i.parentElement)}}))}_isFocusable(e){return wd(e)}},wd=e=>{if(!e.parentNode)return!1;const t=-1!==Array.from(e.parentNode.querySelectorAll("[tabindex], button, input, select, textarea, object, iframe, label, a[href], area[href]")).filter((e=>"cell body-cell"!==e.getAttribute("part"))).indexOf(e);return!e.disabled&&t},Ad=e=>class extends e{static get properties(){return{items:Array}}static get observers(){return["_itemsChanged(items, items.*, isAttached)"]}_itemsChanged(e,t,i){if(i){if(!Array.isArray(e))return null==e&&(this.size=0),void(this.dataProvider===this._arrayDataProvider&&(this.dataProvider=void 0));this.size=e.length,this.dataProvider=this.dataProvider||this._arrayDataProvider,this.clearCache(),this._ensureFirstPageLoaded()}}_arrayDataProvider(e,t){let i=(Array.isArray(this.items)?this.items:[]).slice(0);this._filters&&this._checkPaths(this._filters,"filtering",i)&&(i=this._filter(i)),this.size=i.length,e.sortOrders.length&&this._checkPaths(this._sorters,"sorting",i)&&(i=i.sort(this._multiSort.bind(this)));const r=e.page*e.pageSize,n=r+e.pageSize;t(i.slice(r,n),i.length)}_checkPaths(e,t,i){if(!i.length)return!1;let r=!0;for(var n in e){const o=e[n].path;if(!o||-1===o.indexOf("."))continue;const s=o.replace(/\.[^\.]*$/,"");void 0===Pl.get(s,i[0])&&(console.warn(`Path "${o}" used for ${t} does not exist in all of the items, ${t} is disabled.`),r=!1)}return r}_multiSort(e,t){return this._sorters.map((i=>"asc"===i.direction?this._compare(Pl.get(i.path,e),Pl.get(i.path,t)):"desc"===i.direction?this._compare(Pl.get(i.path,t),Pl.get(i.path,e)):0)).reduce(((e,t)=>e||t),0)}_normalizeEmptyValue(e){return[void 0,null].indexOf(e)>=0?"":isNaN(e)?e.toString():e}_compare(e,t){return(e=this._normalizeEmptyValue(e))<(t=this._normalizeEmptyValue(t))?-1:e>t?1:0}_filter(e){return e.filter(((e,t)=>0===this._filters.filter((t=>{const i=this._normalizeEmptyValue(Pl.get(t.path,e)),r=this._normalizeEmptyValue(t.value).toString().toLowerCase();return-1===i.toString().toLowerCase().indexOf(r)})).length))}},xd=e=>class extends(Ks(e)){ready(){super.ready();const e=this.$.scroller;$s(e,"track",this._onHeaderTrack.bind(this)),e.addEventListener("touchmove",(t=>e.hasAttribute("column-resizing")&&t.preventDefault())),e.addEventListener("contextmenu",(e=>"resize-handle"==e.target.getAttribute("part")&&e.preventDefault())),e.addEventListener("mousedown",(e=>"resize-handle"===e.target.getAttribute("part")&&e.preventDefault()))}_onHeaderTrack(e){const t=e.target;if("resize-handle"===t.getAttribute("part")){let o=t.parentElement._column;for(this._toggleAttribute("column-resizing",!0,this.$.scroller);"vaadin-grid-column-group"===o.localName;)o=Array.prototype.slice.call(o._childColumns,0).sort((function(e,t){return e._order-t._order})).filter((function(e){return!e.hidden})).pop();const s=Array.from(this.$.header.querySelectorAll('[part~="row"]:last-child [part~="cell"]'));var i=s.filter((e=>e._column===o))[0];if(i.offsetWidth){var r=window.getComputedStyle(i),n=10+parseInt(r.paddingLeft)+parseInt(r.paddingRight)+parseInt(r.borderLeftWidth)+parseInt(r.borderRightWidth)+parseInt(r.marginLeft)+parseInt(r.marginRight);const t=i.offsetWidth+(this.__isRTL?i.getBoundingClientRect().left-e.detail.x:e.detail.x-i.getBoundingClientRect().right);o.width=Math.max(n,t)+"px",o.flexGrow=0}s.sort((function(e,t){return e._column._order-t._column._order})).forEach((function(e,t,r){t<r.indexOf(i)&&(e._column.width=e.offsetWidth+"px",e._column.flexGrow=0)})),"end"===e.detail.state&&(this._toggleAttribute("column-resizing",!1,this.$.scroller),this.dispatchEvent(new CustomEvent("column-resize",{detail:{resizedColumn:o}}))),this._resizeHandler()}}},Cd=class e{constructor(e,t,i){this.grid=e,this.parentCache=t,this.parentItem=i,this.itemCaches={},this.items={},this.effectiveSize=0,this.size=0,this.pendingRequests={}}isLoading(){return Boolean(Object.keys(this.pendingRequests).length||Object.keys(this.itemCaches).filter((e=>this.itemCaches[e].isLoading()))[0])}getItemForIndex(e){const{cache:t,scaledIndex:i}=this.getCacheAndIndex(e);return t.items[i]}updateSize(){this.effectiveSize=!this.parentItem||this.grid._isExpanded(this.parentItem)?this.size+Object.keys(this.itemCaches).reduce(((e,t)=>{const i=this.itemCaches[t];return i.updateSize(),e+i.effectiveSize}),0):0}ensureSubCacheForScaledIndex(t){if(!this.itemCaches[t]){const i=new e(this.grid,this,this.items[t]);this.itemCaches[t]=i,this.grid._loadPage(0,i)}}getCacheAndIndex(e){let t=e;const i=Object.keys(this.itemCaches);for(var r=0;r<i.length;r++){const e=Number(i[r]),n=this.itemCaches[e];if(t<=e)return{cache:this,scaledIndex:t};if(t<=e+n.effectiveSize)return n.getCacheAndIndex(t-e-1);t-=n.effectiveSize}return{cache:this,scaledIndex:t}}},Sd=e=>class extends e{static get properties(){return{pageSize:{type:Number,value:50,observer:"_pageSizeChanged"},dataProvider:{type:Object,notify:!0,observer:"_dataProviderChanged"},loading:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0},_cache:{type:Object,value:function(){return new Cd(this)}},itemIdPath:{type:String,value:null},expandedItems:{type:Object,notify:!0,value:()=>[]}}}static get observers(){return["_sizeChanged(size)","_itemIdPathChanged(itemIdPath)","_expandedItemsChanged(expandedItems.*)"]}_sizeChanged(e){const t=e-this._cache.size;this._cache.size+=t,this._cache.effectiveSize+=t,this._effectiveSize=this._cache.effectiveSize,this._increasePoolIfNeeded(0),this._debounceIncreasePool&&this._debounceIncreasePool.flush()}_getItem(e,t){if(e>=this._effectiveSize)return;t.index=e;const{cache:i,scaledIndex:r}=this._cache.getCacheAndIndex(e),n=i.items[r];n?(this._toggleAttribute("loading",!1,t),this._updateItem(t,n),this._isExpanded(n)&&i.ensureSubCacheForScaledIndex(r)):(this._toggleAttribute("loading",!0,t),this._loadPage(this._getPageForIndex(r),i))}_expandedInstanceChangedCallback(e,t){void 0!==e.item&&(t?this.expandItem(e.item):this.collapseItem(e.item))}getItemId(e){return this.itemIdPath?this.get(this.itemIdPath,e):e}_isExpanded(e){return this.__expandedKeys.has(this.getItemId(e))}_expandedItemsChanged(e){this.__cacheExpandedKeys(),this._cache.updateSize(),this._effectiveSize=this._cache.effectiveSize,this._assignModels()}_itemIdPathChanged(e){this.__cacheExpandedKeys()}__cacheExpandedKeys(){this.expandedItems&&(this.__expandedKeys=new Set,this.expandedItems.forEach((e=>{this.__expandedKeys.add(this.getItemId(e))})))}expandItem(e){this._isExpanded(e)||this.push("expandedItems",e)}collapseItem(e){this._isExpanded(e)&&this.splice("expandedItems",this._getItemIndexInArray(e,this.expandedItems),1)}_getIndexLevel(e){let{cache:t}=this._cache.getCacheAndIndex(e),i=0;for(;t.parentCache;)t=t.parentCache,i++;return i}_canPopulate(){return Boolean(this._hasData&&this._columnTree)}_loadPage(e,t){if(!t.pendingRequests[e]&&this.dataProvider){this._setLoading(!0),t.pendingRequests[e]=!0;const i={page:e,pageSize:this.pageSize,sortOrders:this._mapSorters(),filters:this._mapFilters(),parentItem:t.parentItem};this._debounceIncreasePool&&this._debounceIncreasePool.flush(),this.dataProvider(i,((r,n)=>{void 0!==n?t.size=n:i.parentItem&&(t.size=r.length);const o=Array.from(this.$.items.children).map((e=>e._item));r.forEach(((i,r)=>{const n=e*this.pageSize+r;t.items[n]=i,this._isExpanded(i)&&o.indexOf(i)>-1&&t.ensureSubCacheForScaledIndex(n)})),this._hasData=!0,delete t.pendingRequests[e],this._debouncerApplyCachedData=cs.debounce(this._debouncerApplyCachedData,so.after(0),(()=>{this._setLoading(!1),this._cache.updateSize(),this._effectiveSize=this._cache.effectiveSize,Array.from(this.$.items.children).filter((e=>!e.hidden)).forEach((e=>{this._cache.getItemForIndex(e.index)&&this._getItem(e.index,e)})),this._increasePoolIfNeeded(0),this.__scrollToPendingIndex()})),this._cache.isLoading()||this._debouncerApplyCachedData.flush(),this.__flushPendingRecalculateColumnWidths()}))}}_getPageForIndex(e){return Math.floor(e/this.pageSize)}clearCache(){this._cache=new Cd(this),Array.from(this.$.items.children).forEach((e=>{Array.from(e.children).forEach((e=>{e._instance&&e._instance._setPendingProperty("item",{},!1)}))})),this._cache.size=this.size||0,this._cache.updateSize(),this._hasData=!1,this._assignModels(),this._effectiveSize&&this._initialPoolCreated||this._loadPage(0,this._cache)}_pageSizeChanged(e,t){void 0!==t&&e!==t&&this.clearCache()}_checkSize(){void 0===this.size&&0===this._effectiveSize&&console.warn("The <vaadin-grid> needs the total number of items in order to display rows. Set the total number of items to the `size` property, or provide the total number of items in the second argument of the `dataProvider`’s `callback` call.")}_dataProviderChanged(e,t){void 0!==t&&this.clearCache(),e&&this.items&&this.items.length&&this._scrollToIndex(this._firstVisibleIndex),this._ensureFirstPageLoaded(),this._debouncerCheckSize=cs.debounce(this._debouncerCheckSize,so.after(2e3),this._checkSize.bind(this)),this._scrollHandler()}_ensureFirstPageLoaded(){this._hasData||this._loadPage(0,this._cache)}_itemsEqual(e,t){return this.getItemId(e)===this.getItemId(t)}_getItemIndexInArray(e,t){let i=-1;return t.forEach(((t,r)=>{this._itemsEqual(t,e)&&(i=r)})),i}scrollToIndex(e){super.scrollToIndex(e),isNaN(e)||!this._cache.isLoading()&&this.clientHeight||(this.__pendingScrollToIndex=e)}__scrollToPendingIndex(){if(this.__pendingScrollToIndex&&this.$.items.children.length){const e=this.__pendingScrollToIndex;delete this.__pendingScrollToIndex,this._debounceIncreasePool&&this._debounceIncreasePool.flush(),this.scrollToIndex(e)}}},Ed=e=>class extends e{ready(){super.ready(),this._addNodeObserver()}_hasColumnGroups(e){for(let t=0;t<e.length;t++)if("vaadin-grid-column-group"===e[t].localName)return!0;return!1}_getChildColumns(e){return ya.getFlattenedNodes(e).filter(this._isColumnElement)}_flattenColumnGroups(e){return e.map((e=>"vaadin-grid-column-group"===e.localName?this._getChildColumns(e):[e])).reduce(((e,t)=>e.concat(t)),[])}_getColumnTree(){for(var e=[],t=ya.getFlattenedNodes(this).filter(this._isColumnElement);e.push(t),this._hasColumnGroups(t);)t=this._flattenColumnGroups(t);return e}_updateColumnTree(){var e=this._getColumnTree();this._arrayEquals(e,this._columnTree)||(this._columnTree=e)}_addNodeObserver(){this._observer=new ya(this,(e=>{const t=e.addedNodes.filter((e=>"template"===e.localName&&e.classList.contains("row-details")))[0];t&&this._rowDetailsTemplate!==t&&(this._rowDetailsTemplate=t);const i=e=>e.filter(this._isColumnElement).length>0;if(i(e.addedNodes)||i(e.removedNodes)){const t=e.removedNodes.reduce(((e,t)=>e.concat(t._allCells)),[]),i=e=>t.filter((t=>t._content.contains(e))).length;this.__removeSorters(this._sorters.filter(i)),this.__removeFilters(this._filters.filter(i)),this._updateColumnTree()}this._debouncerCheckImports=cs.debounce(this._debouncerCheckImports,so.after(2e3),this._checkImports.bind(this)),this._ensureFirstPageLoaded()}))}_arrayEquals(e,t){if(!e||!t||e.length!=t.length)return!1;for(var i=0,r=e.length;i<r;i++)if(e[i]instanceof Array&&t[i]instanceof Array){if(!this._arrayEquals(e[i],t[i]))return!1}else if(e[i]!=t[i])return!1;return!0}_checkImports(){["vaadin-grid-column-group","vaadin-grid-filter","vaadin-grid-filter-column","vaadin-grid-tree-toggle","vaadin-grid-selection-column","vaadin-grid-sort-column","vaadin-grid-sorter"].forEach((e=>{var t=this.querySelector(e);!t||t instanceof gl||console.warn(`Make sure you have imported the required module for <${e}> element.`)}))}_updateFirstAndLastColumn(){Array.from(this.shadowRoot.querySelectorAll("tr")).forEach((e=>this._updateFirstAndLastColumnForRow(e)))}_updateFirstAndLastColumnForRow(e){Array.from(e.querySelectorAll('[part~="cell"]:not([part~="details-cell"])')).sort(((e,t)=>e._column._order-t._column._order)).forEach(((e,t,i)=>{this._toggleAttribute("first-column",0===t,e),this._toggleAttribute("last-column",t===i.length-1,e)}))}_isColumnElement(e){return e.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/.test(e.localName)}},Td=e=>class extends e{getEventContext(e){const t={},i=e.composedPath(),r=i[i.indexOf(this.$.table)-3];return r?(t.section=["body","header","footer","details"].filter((e=>r.getAttribute("part").indexOf(e)>-1))[0],r._column&&(t.column=r._column),"body"!==t.section&&"details"!==t.section||Object.assign(t,this.__getRowModel(r.parentElement)),t):t}},Pd=e=>class extends e{static get properties(){return{_filters:{type:Array,value:function(){return[]}}}}ready(){super.ready(),this.addEventListener("filter-changed",this._filterChanged.bind(this))}_filterChanged(e){e.stopPropagation(),this.__addFilter(e.target),this.__applyFilters()}__removeFilters(e){0!=e.length&&(this._filters=this._filters.filter((t=>e.indexOf(t)<0)),this.__applyFilters())}__addFilter(e){-1===this._filters.indexOf(e)&&this._filters.push(e)}__applyFilters(){this.dataProvider&&this.isAttached&&this.clearCache()}_mapFilters(){return this._filters.map((e=>({path:e.path,value:e.value})))}};class Id extends class extends gl{}{static get is(){return"vaadin-grid-templatizer"}static get properties(){return{dataHost:Object,template:Object,_templateInstances:{type:Array,value:function(){return[]}},_parentPathValues:{value:function(){return{}}},_grid:Object}}static get observers(){return["_templateInstancesChanged(_templateInstances.*, _parentPathValues.*)"]}constructor(){super(),this._instanceProps={detailsOpened:!0,index:!0,item:!0,selected:!0,expanded:!0,level:!0}}createInstance(){this._ensureTemplatized();const e=new this._TemplateClass({});return this.addInstance(e),e}addInstance(e){-1===this._templateInstances.indexOf(e)&&(this._templateInstances.push(e),requestAnimationFrame((()=>this.notifyPath("_templateInstances.*",this._templateInstances))))}removeInstance(e){const t=this._templateInstances.indexOf(e);this.splice("_templateInstances",t,1)}_ensureTemplatized(){this._TemplateClass||(this._TemplateClass=dl(this.template,this,{instanceProps:this._instanceProps,parentModel:!0,forwardHostProp:function(e,t){this._forwardParentProp(e,t),this._templateInstances&&this._templateInstances.forEach((i=>i.notifyPath(e,t)))},notifyInstanceProp:function(e,t,i){if("index"===t||"item"===t)return;const r=`__${t}__`;if(e[r]===i)return;e[r]=i;const n=Array.from(this._grid.$.items.children).filter((t=>this._grid._itemsEqual(t._item,e.item)))[0];n&&Array.from(n.children).forEach((e=>{e._instance&&(e._instance[r]=i,e._instance.notifyPath(t,i))}));const o="item.";if(Array.isArray(this._grid.items)&&0===t.indexOf(o)){const r=this._grid.items.indexOf(e.item),n=t.slice(o.length);this._grid.notifyPath(`items.${r}.${n}`,i)}const s=`_${t}InstanceChangedCallback`;this._grid&&this._grid[s]&&this._grid[s](e,i)}}))}_forwardParentProp(e,t){this._parentPathValues[e]=t,this._templateInstances.forEach((i=>i.notifyPath(e,t)))}_templateInstancesChanged(e,t){let i,r;if("_templateInstances"===e.path)i=0,r=this._templateInstances.length;else{if("_templateInstances.splices"!==e.path)return;i=e.value.index,r=e.value.addedCount}Object.keys(this._parentPathValues||{}).forEach((e=>{for(var t=i;t<i+r;t++)this._templateInstances[t].set(e,this._parentPathValues[e])}))}}customElements.define(Id.is,Id);const kd=e=>class extends e{static get properties(){return{detailsOpenedItems:{type:Array,value:function(){return[]}},_rowDetailsTemplate:Object,rowDetailsRenderer:Function,_detailsCells:{type:Array}}}static get observers(){return["_detailsOpenedItemsChanged(detailsOpenedItems.*, _rowDetailsTemplate, rowDetailsRenderer)","_rowDetailsTemplateOrRendererChanged(_rowDetailsTemplate, rowDetailsRenderer)"]}_rowDetailsTemplateOrRendererChanged(e,t){if(e&&t)throw new Error("You should only use either a renderer or a template for row details");if(e||t){if(e&&!e.templatizer){var i=new Id;i._grid=this,i.dataHost=this.dataHost,i.template=e,e.templatizer=i}this._columnTree&&Array.from(this.$.items.children).forEach((e=>{e.querySelector("[part~=details-cell]")||(this._updateRow(e,this._columnTree[this._columnTree.length-1]),this._a11yUpdateRowDetailsOpened(e,!1)),delete e.querySelector("[part~=details-cell]")._instance})),this.detailsOpenedItems.length&&(Array.from(this.$.items.children).forEach(this._toggleDetailsCell,this),this._update())}}_detailsOpenedItemsChanged(e,t,i){"detailsOpenedItems.length"!==e.path&&e.value&&Array.from(this.$.items.children).forEach((e=>{this._toggleDetailsCell(e,e._item),this._a11yUpdateRowDetailsOpened(e,this._isDetailsOpened(e._item)),this._toggleAttribute("details-opened",this._isDetailsOpened(e._item),e)}))}_configureDetailsCell(e){e.setAttribute("part","cell details-cell"),this._toggleAttribute("frozen",!0,e)}_toggleDetailsCell(e,t){const i=e.querySelector('[part~="details-cell"]');if(!i)return;const r=!this._isDetailsOpened(t),n=!!i.hidden!==r;(i._instance||i._renderer)&&i.hidden===r||(i.hidden=r,r?e.style.removeProperty("padding-bottom"):(this.rowDetailsRenderer?(i._renderer=this.rowDetailsRenderer,i._renderer.call(this,i._content,this,{index:e.index,item:t})):this._rowDetailsTemplate&&!i._instance&&(i._instance=this._rowDetailsTemplate.templatizer.createInstance(),i._content.innerHTML="",i._content.appendChild(i._instance.root),this._updateItem(e,t)),va(),e.style.setProperty("padding-bottom",`${i.offsetHeight}px`),requestAnimationFrame((()=>this.notifyResize())))),n&&(this._updateMetrics(),this._positionItems())}_updateDetailsCellHeights(){Array.from(this.$.items.querySelectorAll('[part~="details-cell"]:not([hidden])')).forEach((e=>{e.parentElement.style.setProperty("padding-bottom",`${e.offsetHeight}px`)}))}_isDetailsOpened(e){return this.detailsOpenedItems&&-1!==this._getItemIndexInArray(e,this.detailsOpenedItems)}openItemDetails(e){this._isDetailsOpened(e)||this.push("detailsOpenedItems",e)}closeItemDetails(e){this._isDetailsOpened(e)&&this.splice("detailsOpenedItems",this._getItemIndexInArray(e,this.detailsOpenedItems),1)}_detailsOpenedInstanceChangedCallback(e,t){super._detailsOpenedInstanceChangedCallback&&super._detailsOpenedInstanceChangedCallback(e,t),t?this.openItemDetails(e.item):this.closeItemDetails(e.item)}},Od=e=>class extends e{get _timeouts(){return{SCROLLING:500,IGNORE_WHEEL:500}}static get properties(){return{_frozenCells:{type:Array,value:()=>[]},_rowWithFocusedElement:Element,_deltaYAcc:{type:Number,value:0},_useSticky:{type:Boolean,value:window.CSS&&window.CSS.supports&&(window.CSS.supports("position","sticky")||window.CSS.supports("position","-webkit-sticky"))}}}static get observers(){return["_scrollViewportHeightUpdated(_viewportHeight)"]}set _scrollTop(e){this.$.table.scrollTop=e}get _scrollTop(){return this.$.table.scrollTop}constructor(){super(),this._scrollLineHeight=this._getScrollLineHeight()}_getScrollLineHeight(){const e=document.createElement("div");e.style.fontSize="initial",e.style.display="none",document.body.appendChild(e);const t=window.getComputedStyle(e).fontSize;return document.body.removeChild(e),t?window.parseInt(t):void 0}_scrollViewportHeightUpdated(e){this._scrollPageHeight=e-this.$.header.clientHeight-this.$.footer.clientHeight-this._scrollLineHeight}ready(){super.ready(),this.$.outerscroller=document.createElement("div"),this.scrollTarget=this.$.table,this.addEventListener("wheel",this._onWheel),this.$.items.addEventListener("focusin",(e=>{const t=e.composedPath().indexOf(this.$.items);this._rowWithFocusedElement=e.composedPath()[t-1]})),this.$.items.addEventListener("focusout",(()=>this._rowWithFocusedElement=void 0)),this.scrollTarget.addEventListener("mousedown",(()=>this.__mouseDown=!0)),this.scrollTarget.addEventListener("mouseup",(()=>{this.__mouseDown=!1,this.__pendingReorder&&(this.__pendingReorder=!1,setTimeout((()=>this._reorderRows()),this._timeouts.SCROLLING))}))}scrollToIndex(e){this._accessIronListAPI((()=>super.scrollToIndex(e)))}_onWheel(e){if(e.ctrlKey||this._hasScrolledAncestor(e.target,e.deltaX,e.deltaY))return;const t=this.$.table;let i=e.deltaY;if(e.deltaMode===WheelEvent.DOM_DELTA_LINE?i*=this._scrollLineHeight:e.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(i*=this._scrollPageHeight),this._wheelAnimationFrame)return this._deltaYAcc+=i,void e.preventDefault();i+=this._deltaYAcc,this._deltaYAcc=0,this._wheelAnimationFrame=!0,this._debouncerWheelAnimationFrame=cs.debounce(this._debouncerWheelAnimationFrame,ao,(()=>this._wheelAnimationFrame=!1));var r=Math.abs(e.deltaX)+Math.abs(i);this._canScroll(t,e.deltaX,i)?(e.preventDefault(),t.scrollTop+=i,t.scrollLeft+=e.deltaX,this._scrollHandler(),this._hasResidualMomentum=!0,this._ignoreNewWheel=!0,this._debouncerIgnoreNewWheel=cs.debounce(this._debouncerIgnoreNewWheel,so.after(this._timeouts.IGNORE_WHEEL),(()=>this._ignoreNewWheel=!1))):this._hasResidualMomentum&&r<=this._previousMomentum||this._ignoreNewWheel?e.preventDefault():r>this._previousMomentum&&(this._hasResidualMomentum=!1),this._previousMomentum=r}_hasScrolledAncestor(e,t,i){return"vaadin-grid-cell-content"!==e.localName&&(!(!this._canScroll(e,t,i)||-1===["auto","scroll"].indexOf(getComputedStyle(e).overflow))||(e!==this&&e.parentElement?this._hasScrolledAncestor(e.parentElement,t,i):void 0))}_canScroll(e,t,i){return i>0&&e.scrollTop<e.scrollHeight-e.offsetHeight||i<0&&e.scrollTop>0||t>0&&e.scrollLeft<e.scrollWidth-e.offsetWidth||t<0&&e.scrollLeft>0}_scheduleScrolling(){this._scrollingFrame||(this._scrollingFrame=requestAnimationFrame((()=>this._toggleAttribute("scrolling",!0,this.$.scroller)))),this._debounceScrolling=cs.debounce(this._debounceScrolling,so.after(this._timeouts.SCROLLING),(()=>{cancelAnimationFrame(this._scrollingFrame),delete this._scrollingFrame,this._toggleAttribute("scrolling",!1,this.$.scroller),this._reorderRows()}))}_afterScroll(){this._translateStationaryElements(),this.hasAttribute("reordering")||this._scheduleScrolling(),this._updateOverflow()}_updateOverflow(){let e="";const t=this.$.table;t.scrollTop<t.scrollHeight-t.clientHeight&&(e+=" bottom"),t.scrollTop>0&&(e+=" top"),t.scrollLeft<t.scrollWidth-t.clientWidth&&(e+=" right"),t.scrollLeft>0&&(e+=" left"),this._debounceOverflow=cs.debounce(this._debounceOverflow,ao,(()=>{const t=e.trim();t.length>0&&this.getAttribute("overflow")!==t?this.setAttribute("overflow",t):0==t.length&&this.hasAttribute("overflow")&&this.removeAttribute("overflow")}))}_reorderRows(){if(this.__mouseDown)return void(this.__pendingReorder=!0);const e=this.$.items,t=e.querySelectorAll("tr");if(!t.length)return;const i=this._virtualStart+this._vidxOffset,r=this._rowWithFocusedElement||Array.from(t).filter((e=>!e.hidden))[0];if(!r)return;const n=r.index-i,o=Array.from(t).indexOf(r)-n;if(o>0)for(let i=0;i<o;i++)e.appendChild(t[i]);else if(o<0)for(let i=t.length+o;i<t.length;i++)e.insertBefore(t[i],t[0]);if(this._safari){const{transform:e}=this.$.header.style;this.$.header.style.transform="",setTimeout((()=>this.$.header.style.transform=e))}}_frozenCellsChanged(){this._debouncerCacheElements=cs.debounce(this._debouncerCacheElements,co,(()=>{Array.from(this.shadowRoot.querySelectorAll('[part~="cell"]')).forEach((function(e){e.style.transform=""})),this._frozenCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen]")),this._updateScrollerMeasurements(),this._translateStationaryElements()})),this._updateLastFrozen()}_updateScrollerMeasurements(){this._frozenCells.length>0&&this.__isRTL&&(this.__scrollerMetrics={scrollWidth:this.$.table.scrollWidth,clientWidth:this.$.table.clientWidth})}_updateLastFrozen(){if(!this._columnTree)return;const e=this._columnTree[this._columnTree.length-1].slice(0);e.sort(((e,t)=>e._order-t._order));const t=e.reduce(((e,t,i)=>(t._lastFrozen=!1,t.frozen&&!t.hidden?i:e)),void 0);void 0!==t&&(e[t]._lastFrozen=!0)}_translateStationaryElements(){const e=Math.max(0,this._scrollLeft),t=Math.max(0,this._scrollTop);let i=0,r=0,n=0;if(this._useSticky||(i=e,r=t,n=this.$.table.clientHeight-this.$.footer.offsetHeight-this.$.footer.offsetTop),this.$.header.style.transform=this._getTranslate(-e+i,r),this.$.footer.style.transform=this._getTranslate(-e+i,r+n),this.$.items.style.transform=this._getTranslate(-e+i,0),this._frozenCells.length>0){const e=this.__isRTL?this.__getNormalizedScrollLeft(this.$.table)+this.__scrollerMetrics.clientWidth-this.__scrollerMetrics.scrollWidth:this._scrollLeft;for(var o=this._getTranslate(e,0),s=0;s<this._frozenCells.length;s++)this._frozenCells[s].style.transform=o}}_getTranslate(e,t){return`translate(${e}px, ${t}px)`}},Rd=e=>class extends e{static get properties(){return{selectedItems:{type:Object,notify:!0,value:()=>[]}}}static get observers(){return["_selectedItemsChanged(selectedItems.*)"]}_isSelected(e){return this.selectedItems&&this._getItemIndexInArray(e,this.selectedItems)>-1}selectItem(e){this._isSelected(e)||this.push("selectedItems",e)}deselectItem(e){const t=this._getItemIndexInArray(e,this.selectedItems);t>-1&&this.splice("selectedItems",t,1)}_toggleItem(e){-1===this._getItemIndexInArray(e,this.selectedItems)?this.selectItem(e):this.deselectItem(e)}_selectedItemsChanged(e){!this.$.items.children.length||"selectedItems"!==e.path&&"selectedItems.splices"!==e.path||Array.from(this.$.items.children).forEach((e=>{this._updateItem(e,e._item)}))}_selectedInstanceChangedCallback(e,t){super._selectedInstanceChangedCallback&&super._selectedInstanceChangedCallback(e,t),t?this.selectItem(e.item):this.deselectItem(e.item)}},Nd=e=>class extends e{static get properties(){return{multiSort:{type:Boolean,value:!1},_sorters:{type:Array,value:function(){return[]}},_previousSorters:{type:Array,value:function(){return[]}}}}ready(){super.ready(),this.addEventListener("sorter-changed",this._onSorterChanged),window.ShadyDOM&&co.run((()=>{const e=this.querySelectorAll("vaadin-grid-sorter");Array.from(e).forEach((e=>{e instanceof gl&&e.dispatchEvent(new CustomEvent("sorter-changed",{bubbles:!0,composed:!0}))}))}))}_onSorterChanged(e){const t=e.target;e.stopPropagation(),this.__updateSorter(t),this.__applySorters()}__removeSorters(e){0!=e.length&&(this._sorters=this._sorters.filter((t=>e.indexOf(t)<0)),this.multiSort&&this.__updateSortOrders(),this.__applySorters())}__updateSortOrders(){this._sorters.forEach(((e,t)=>e._order=this._sorters.length>1?t:null),this)}__updateSorter(e){if(e.direction||-1!==this._sorters.indexOf(e))if(e._order=null,this.multiSort)this._removeArrayItem(this._sorters,e),e.direction&&this._sorters.unshift(e),this.__updateSortOrders(),this._sorters.forEach(((e,t)=>e._order=this._sorters.length>1?t:null),this);else if(e.direction){const t=this._sorters.filter((t=>t!=e));this._sorters=[e],t.forEach((e=>{e._order=null,e.direction=null}))}}__applySorters(){this.dataProvider&&this.isAttached&&JSON.stringify(this._previousSorters)!==JSON.stringify(this._mapSorters())&&this.clearCache(),this._a11yUpdateSorters(),this._previousSorters=this._mapSorters()}_mapSorters(){return this._sorters.map((e=>({path:e.path,direction:e.direction})))}_removeArrayItem(e,t){const i=e.indexOf(t);i>-1&&e.splice(i,1)}},zd=e=>class extends e{static get properties(){return{cellClassNameGenerator:Function}}static get observers(){return["__cellClassNameGeneratorChanged(cellClassNameGenerator)"]}__cellClassNameGeneratorChanged(e){this.generateCellClassNames()}generateCellClassNames(){Array.from(this.$.items.children).filter((e=>!e.hidden)).forEach((e=>this._generateCellClassNames(e,this.__getRowModel(e))))}_generateCellClassNames(e,t){Array.from(e.children).forEach((e=>{if(e.__generatedClasses&&e.__generatedClasses.forEach((t=>e.classList.remove(t))),this.cellClassNameGenerator){const i=this.cellClassNameGenerator(e._column,t);e.__generatedClasses=i&&i.split(" ").filter((e=>e.length>0)),e.__generatedClasses&&e.__generatedClasses.forEach((t=>e.classList.add(t)))}}))}},Dd="between",Md="on-top-or-between",Ld="on-grid",Fd="on-top",Hd="above",$d="below",Bd="empty",Ud=e=>class extends e{static get properties(){return{dropMode:String,rowsDraggable:Boolean,dragFilter:Function,dropFilter:Function,__dndAutoScrollThreshold:{value:50}}}static get observers(){return["_dragDropAccessChanged(rowsDraggable, dropMode, dragFilter, dropFilter)"]}ready(){super.ready(),this.$.table.addEventListener("dragstart",this._onDragStart.bind(this)),this.$.table.addEventListener("dragend",this._onDragEnd.bind(this)),this.$.table.addEventListener("dragover",this._onDragOver.bind(this)),this.$.table.addEventListener("dragleave",this._onDragLeave.bind(this)),this.$.table.addEventListener("drop",this._onDrop.bind(this)),this.$.table.addEventListener("dragenter",(e=>{this.dropMode&&(e.preventDefault(),e.stopPropagation())}))}_onDragStart(e){if(this.rowsDraggable){let t=e.target;if("vaadin-grid-cell-content"===t.localName&&(t=t.assignedSlot.parentNode.parentNode),t.parentNode!==this.$.items)return;if(e.stopPropagation(),this._toggleAttribute("dragging-rows",!0,this),this._safari){const e=t.style.transform;t.style.top=/translateY\((.*)\)/.exec(e)[1],t.style.transform="none",requestAnimationFrame((()=>{t.style.top="",t.style.transform=e}))}const i=t.getBoundingClientRect();window.ShadyDOM||(this._ios?e.dataTransfer.setDragImage(t):e.dataTransfer.setDragImage(t,e.clientX-i.left,e.clientY-i.top));let r=[t];this._isSelected(t._item)&&(r=this.__getViewportRows().filter((e=>this._isSelected(e._item))).filter((e=>!this.dragFilter||this.dragFilter(this.__getRowModel(e))))),e.dataTransfer.setData("text",this.__formatDefaultTransferData(r)),t.setAttribute("dragstart",r.length>1?r.length:""),this.updateStyles({"--_grid-drag-start-x":e.clientX-i.left+20+"px","--_grid-drag-start-y":e.clientY-i.top+10+"px"}),requestAnimationFrame((()=>{t.removeAttribute("dragstart"),this.updateStyles({"--_grid-drag-start-x":"","--_grid-drag-start-y":""})}));const n=new CustomEvent("grid-dragstart",{detail:{draggedItems:r.map((e=>e._item)),setDragData:(t,i)=>e.dataTransfer.setData(t,i),setDraggedItemsCount:e=>t.setAttribute("dragstart",e)}});n.originalEvent=e,this.dispatchEvent(n)}}_onDragEnd(e){this._toggleAttribute("dragging-rows",!1,this),e.stopPropagation();const t=new CustomEvent("grid-dragend");t.originalEvent=e,this.dispatchEvent(t)}_onDragLeave(e){e.stopPropagation(),this._clearDragStyles()}_onDragOver(e){if(this.dropMode){if(this._dropLocation=void 0,this._dragOverItem=void 0,this.__dndAutoScroll(e.clientY))return void this._clearDragStyles();let t=e.composedPath().filter((e=>"tr"===e.localName))[0];if(this._effectiveSize&&this.dropMode!==Ld)if(t&&t.parentNode===this.$.items){const i=t.getBoundingClientRect();if(this._dropLocation=Fd,this.dropMode===Dd){const t=e.clientY-i.top<i.bottom-e.clientY;this._dropLocation=t?Hd:$d}else this.dropMode===Md&&(e.clientY-i.top<i.height/3?this._dropLocation=Hd:e.clientY-i.top>i.height/3*2&&(this._dropLocation=$d))}else{if(t)return;if(this.dropMode!==Dd&&this.dropMode!==Md)return;t=Array.from(this.$.items.children).filter((e=>!e.hidden)).pop(),this._dropLocation=$d}else this._dropLocation=Bd;if(t&&t.hasAttribute("drop-disabled"))return void(this._dropLocation=void 0);e.stopPropagation(),e.preventDefault(),this._dropLocation===Bd?this._toggleAttribute("dragover",!0,this):t?(this._dragOverItem=t._item,t.getAttribute("dragover")!==this._dropLocation&&t.setAttribute("dragover",this._dropLocation)):this._clearDragStyles()}}__dndAutoScroll(e){if(this.__dndAutoScrolling)return!0;const t=this.$.header.getBoundingClientRect().bottom,i=this.$.footer.getBoundingClientRect().top,r=t-e+this.__dndAutoScrollThreshold,n=e-i+this.__dndAutoScrollThreshold;let o=0;if(n>0?o=2*n:r>0&&(o=2*-r),o){const e=this.$.table.scrollTop;this.$.table.scrollTop+=o;if(e!==this.$.table.scrollTop)return this.__dndAutoScrolling=!0,setTimeout((()=>this.__dndAutoScrolling=!1),20),this._scrollHandler(),!0}}__getViewportRows(){const e=this.$.header.getBoundingClientRect().bottom,t=this.$.footer.getBoundingClientRect().top;return Array.from(this.$.items.children).filter((i=>{const r=i.getBoundingClientRect();return r.bottom>e&&r.top<t}))}_clearDragStyles(){this.removeAttribute("dragover"),Array.from(this.$.items.children).forEach((e=>e.removeAttribute("dragover")))}_onDrop(e){if(this.dropMode){e.stopPropagation(),e.preventDefault();const t=e.dataTransfer.types&&Array.from(e.dataTransfer.types).map((t=>({type:t,data:e.dataTransfer.getData(t)})));this._clearDragStyles();const i=new CustomEvent("grid-drop",{bubbles:e.bubbles,cancelable:e.cancelable,detail:{dropTargetItem:this._dragOverItem,dropLocation:this._dropLocation,dragData:t}});i.originalEvent=e,this.dispatchEvent(i)}}__formatDefaultTransferData(e){return e.map((e=>Array.from(e.children).filter((e=>!e.hidden&&-1===e.getAttribute("part").indexOf("details-cell"))).sort(((e,t)=>e._column._order>t._column._order?1:-1)).map((e=>e._content.textContent.trim())).filter((e=>e)).join("\t"))).join("\n")}_dragDropAccessChanged(e,t,i,r){this.filterDragAndDrop()}filterDragAndDrop(){Array.from(this.$.items.children).filter((e=>!e.hidden)).forEach((e=>{this._filterDragAndDrop(e,this.__getRowModel(e))}))}_filterDragAndDrop(e,t){const i=!this.rowsDraggable||this.dragFilter&&!this.dragFilter(t),r=!this.dropMode||this.dropFilter&&!this.dropFilter(t);(window.ShadyDOM?[e]:Array.from(e.children).map((e=>e._content))).forEach((e=>{i?e.removeAttribute("draggable"):e.setAttribute("draggable",!0)})),this._toggleAttribute("drag-disabled",i,e),this._toggleAttribute("drop-disabled",r,e)}},Vd=e=>class extends e{static get properties(){return{_headerFocusable:{type:Object,observer:"_focusableChanged"},_itemsFocusable:{type:Object,observer:"_focusableChanged"},_footerFocusable:{type:Object,observer:"_focusableChanged"},_navigatingIsHidden:Boolean,_focusedItemIndex:{type:Number,value:0},_focusedColumnOrder:Number,interacting:{type:Boolean,value:!1,reflectToAttribute:!0,readOnly:!0,observer:"_interactingChanged"}}}ready(){super.ready(),this._ios||this._android||(this.addEventListener("keydown",this._onKeyDown),this.addEventListener("keyup",this._onKeyUp),this.addEventListener("focusin",this._onFocusIn),this.addEventListener("focusout",this._onFocusOut),this.$.table.addEventListener("focusin",this._onCellFocusIn.bind(this)),this.$.table.addEventListener("focusout",this._onCellFocusOut.bind(this)),this.addEventListener("mousedown",(()=>{this._toggleAttribute("navigating",!1,this),this._isMousedown=!0})),this.addEventListener("mouseup",(()=>this._isMousedown=!1)))}_focusableChanged(e,t){t&&t.setAttribute("tabindex","-1"),e&&this._updateGridSectionFocusTarget(e)}_interactingChanged(){this._updateGridSectionFocusTarget(this._headerFocusable),this._updateGridSectionFocusTarget(this._itemsFocusable),this._updateGridSectionFocusTarget(this._footerFocusable)}_onKeyDown(e){let t,i=e.key;switch("Up"!==i&&"Down"!==i&&"Left"!==i&&"Right"!==i||(i="Arrow"+i),"Esc"===i&&(i="Escape"),"Spacebar"===i&&(i=" "),i){case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"PageUp":case"PageDown":case"Home":case"End":t="Navigation";break;case"Enter":case"Escape":case"F2":t="Interaction";break;case"Tab":t="Tab";break;case" ":t="Space"}this._detectInteracting(e),this.interacting&&"Interaction"!==t&&(t=void 0),t&&this[`_on${t}KeyDown`](e,i)}_ensureScrolledToIndex(e){Array.from(this.$.items.children).filter((t=>t.index===e))[0]||this._scrollToIndex(e)}_onNavigationKeyDown(e,t){function i(e){return Array.prototype.indexOf.call(e.parentNode.children,e)}this._scrollHandler(),e.preventDefault();const r=this._lastVisibleIndex-this._firstVisibleIndex-1;let n=0,o=0;switch(t){case"ArrowRight":n=this.__isRTL?-1:1;break;case"ArrowLeft":n=this.__isRTL?1:-1;break;case"Home":n=-1/0,e.ctrlKey&&(o=-1/0);break;case"End":n=1/0,e.ctrlKey&&(o=1/0);break;case"ArrowDown":o=1;break;case"ArrowUp":o=-1;break;case"PageDown":o=r;break;case"PageUp":o=-r}const s=e.composedPath()[0],a=i(s),l=this._elementMatches(s,'[part~="details-cell"]'),d=s.parentNode,c=d.parentNode,h=(c===this.$.items?this._effectiveSize:c.children.length)-1,p=c===this.$.items?void 0!==this._focusedItemIndex?this._focusedItemIndex:d.index:i(d);let u=Math.max(0,Math.min(p+o,h)),m=!1;if(c===this.$.items){const e=d._item,t=this._cache.getItemForIndex(u);m=l?0===o:1===o&&this._isDetailsOpened(e)||-1===o&&u!==p&&this._isDetailsOpened(t),m!==l&&(1===o&&m||-1===o&&!m)&&(u=p)}if(c!==this.$.items)if(u>p)for(;u<h&&c.children[u].hidden;)u++;else if(u<p)for(;u>0&&c.children[u].hidden;)u--;void 0===this._focusedColumnOrder&&(this._focusedColumnOrder=l?0:this._getColumns(c,p).filter((e=>!e.hidden))[a]._order);const f=this._getColumns(c,u).filter((e=>!e.hidden)),g=f.map((e=>e._order)).sort(((e,t)=>e-t)),_=g.length-1,b=g.indexOf(g.slice(0).sort(((e,t)=>Math.abs(e-this._focusedColumnOrder)-Math.abs(t-this._focusedColumnOrder)))[0]),y=0===o&&l?b:Math.max(0,Math.min(b+n,_));y!==b&&(this._focusedColumnOrder=void 0),c===this.$.items&&this._ensureScrolledToIndex(u),this._toggleAttribute("navigating",!0,this);const v=f.reduce(((e,t,i)=>(e[t._order]=i,e)),{}),w=v[g[y]],A=c===this.$.items?Array.from(c.children).filter((e=>e.index===u))[0]:c.children[u];if(!A)return;const x=m?Array.from(A.children).filter((e=>this._elementMatches(e,'[part~="details-cell"]')))[0]:A.children[w];if(this._scrollHorizontallyToCell(x),c===this.$.items&&(this._focusedItemIndex=u),c===this.$.items){const e=x.getBoundingClientRect(),t=this.$.footer.getBoundingClientRect().top,i=this.$.header.getBoundingClientRect().bottom;e.bottom>t?(this.$.table.scrollTop+=e.bottom-t,this._scrollHandler()):e.top<i&&(this.$.table.scrollTop-=i-e.top,this._scrollHandler())}x.focus()}_onInteractionKeyDown(e,t){const i=e.composedPath()[0],r="input"===i.localName&&!/^(button|checkbox|color|file|image|radio|range|reset|submit)$/i.test(i.type);let n;switch(t){case"Enter":n=!this.interacting||!r;break;case"Escape":n=!1;break;case"F2":n=!this.interacting}const{cell:o}=this._getGridEventLocation(e);if(this.interacting!==n&&null!==o)if(n){const t=o._content.querySelector("[focus-target]")||o._content.firstElementChild;t&&(e.preventDefault(),t.focus(),this._setInteracting(!0),this._toggleAttribute("navigating",!1,this))}else e.preventDefault(),this._focusedColumnOrder=void 0,o.focus(),this._setInteracting(!1),this._toggleAttribute("navigating",!0,this)}_predictFocusStepTarget(e,t){const i=[this.$.table,this._headerFocusable,this._itemsFocusable,this._footerFocusable,this.$.focusexit];let r=i.indexOf(e);for(r+=t;r>=0&&r<=i.length-1&&(!i[r]||i[r].parentNode.hidden);)r+=t;return i[r]}_onTabKeyDown(e){const t=this._predictFocusStepTarget(e.composedPath()[0],e.shiftKey?-1:1);if(t===this.$.table)this.$.table.focus();else if(t===this.$.focusexit)this.$.focusexit.focus();else if(t===this._itemsFocusable){let i=t;const r=this._itemsFocusable.parentNode;if(this._ensureScrolledToIndex(this._focusedItemIndex),r.index!==this._focusedItemIndex){const e=Array.from(r.children).indexOf(this._itemsFocusable),t=Array.from(this.$.items.children).filter((e=>e.index===this._focusedItemIndex))[0];t&&(i=t.children[e])}e.preventDefault(),i.focus()}else e.preventDefault(),t.focus();this._toggleAttribute("navigating",!0,this)}_onSpaceKeyDown(e){e.preventDefault();const t=e.composedPath()[0];t._content&&t._content.firstElementChild||this.dispatchEvent(new CustomEvent("cell-activate",{detail:{model:this.__getRowModel(t.parentElement)}}))}_onKeyUp(e){if(!/^( |SpaceBar)$/.test(e.key))return;e.preventDefault();const t=e.composedPath()[0];if(t._content&&t._content.firstElementChild){const e=this.hasAttribute("navigating");t._content.firstElementChild.click(),this._toggleAttribute("navigating",e,this)}}_onFocusIn(e){this._isMousedown||this._toggleAttribute("navigating",!0,this);const t=e.composedPath()[0];t===this.$.table||t===this.$.focusexit?(this._predictFocusStepTarget(t,t===this.$.table?1:-1).focus(),this._setInteracting(!1)):this._detectInteracting(e)}_onFocusOut(e){this._toggleAttribute("navigating",!1,this),this._detectInteracting(e)}_onCellFocusIn(e){const{section:t,cell:i}=this._getGridEventLocation(e);if(this._detectInteracting(e),t&&i){this._activeRowGroup=t,this.$.header===t?this._headerFocusable=i:this.$.items===t?this._itemsFocusable=i:this.$.footer===t&&(this._footerFocusable=i),i._content.dispatchEvent(new CustomEvent("cell-focusin",{bubbles:!1}));const r=this.getEventContext(e);i.dispatchEvent(new CustomEvent("cell-focus",{bubbles:!0,composed:!0,detail:{context:r}}))}this._detectFocusedItemIndex(e)}_onCellFocusOut(e){if(3===e.composedPath().indexOf(this.$.table)){e.composedPath()[0]._content.dispatchEvent(new CustomEvent("cell-focusout",{bubbles:!1}))}}_detectInteracting(e){const t=e.composedPath().some((e=>"vaadin-grid-cell-content"===e.localName));this._setInteracting(t)}_detectFocusedItemIndex(e){const{section:t,row:i}=this._getGridEventLocation(e);t===this.$.items&&(this._focusedItemIndex=i.index)}_updateGridSectionFocusTarget(e){if(!e)return;const t=this._getGridSectionFromFocusTarget(e),i=this.interacting&&t===this._activeRowGroup;e.tabIndex=i?-1:0}_preventScrollerRotatingCellFocus(e,t){e.index===this._focusedItemIndex&&this.hasAttribute("navigating")&&this._activeRowGroup===this.$.items&&(this._navigatingIsHidden=!0,this._toggleAttribute("navigating",!1,this)),t===this._focusedItemIndex&&this._navigatingIsHidden&&(this._navigatingIsHidden=!1,this._toggleAttribute("navigating",!0,this))}_getColumns(e,t){let i=this._columnTree.length-1;return e===this.$.header?i=t:e===this.$.footer&&(i=this._columnTree.length-1-t),this._columnTree[i]}_resetKeyboardNavigation(){if(this.$.header.firstElementChild&&(this._headerFocusable=Array.from(this.$.header.firstElementChild.children).filter((e=>!e.hidden))[0]),this.$.items.firstElementChild){const e=this._iterateItems(((e,t)=>{if(this._firstVisibleIndex===t)return this.$.items.children[e]}));e&&(this._itemsFocusable=Array.from(e.children).filter((e=>!e.hidden))[0])}this.$.footer.firstElementChild&&(this._footerFocusable=Array.from(this.$.footer.firstElementChild.children).filter((e=>!e.hidden))[0])}_scrollHorizontallyToCell(e){if(e.hasAttribute("frozen")||this._elementMatches(e,'[part~="details-cell"]'))return;const t=e.getBoundingClientRect(),i=e.parentNode,r=Array.from(i.children).indexOf(e),n=this.$.table.getBoundingClientRect();let o=n.left,s=n.right;for(let e=r-1;e>=0;e--){const t=i.children[e];if(!t.hasAttribute("hidden")&&!this._elementMatches(t,'[part~="details-cell"]')&&t.hasAttribute("frozen")){o=t.getBoundingClientRect().right;break}}for(let e=r+1;e<i.children.length;e++){const t=i.children[e];if(!t.hasAttribute("hidden")&&!this._elementMatches(t,'[part~="details-cell"]')&&t.hasAttribute("frozen")){s=t.getBoundingClientRect().left;break}}t.left<o&&(this.$.table.scrollLeft+=Math.round(t.left-o)),t.right>s&&(this.$.table.scrollLeft+=Math.round(t.right-s))}_elementMatches(e,t){return e.matches?e.matches(t):-1!==Array.from(e.parentNode.querySelectorAll(t)).indexOf(e)}_getGridEventLocation(e){const t=e.composedPath(),i=t.indexOf(this.$.table);return{section:i>=1?t[i-1]:null,row:i>=2?t[i-2]:null,cell:i>=3?t[i-3]:null}}_getGridSectionFromFocusTarget(e){return e===this._headerFocusable?this.$.header:e===this._itemsFocusable?this.$.items:e===this._footerFocusable?this.$.footer:null}},Gd=class{static _updateColumnOrders(e,t,i){let r=1;e.forEach((e=>{r%10==0&&r++,e._order=i+r*t,r++}))}},qd=e=>class extends(Ks(e)){static get properties(){return{columnReorderingAllowed:{type:Boolean,value:!1},_orderBaseScope:{type:Number,value:1e7}}}static get observers(){return["_updateOrders(_columnTree, _columnTree.*)"]}ready(){super.ready(),$s(this,"track",this._onTrackEvent),this._reorderGhost=this.shadowRoot.querySelector('[part="reorder-ghost"]'),this.addEventListener("touchstart",this._onTouchStart.bind(this)),this.addEventListener("touchmove",this._onTouchMove.bind(this)),this.addEventListener("touchend",this._onTouchEnd.bind(this)),this.addEventListener("contextmenu",this._onContextMenu.bind(this))}_onContextMenu(e){this.hasAttribute("reordering")&&e.preventDefault()}_onTouchStart(e){this._startTouchReorderTimeout=setTimeout((()=>{this._onTrackStart({detail:{x:e.touches[0].clientX,y:e.touches[0].clientY}})}),100)}_onTouchMove(e){this._draggedColumn&&e.preventDefault(),clearTimeout(this._startTouchReorderTimeout)}_onTouchEnd(){clearTimeout(this._startTouchReorderTimeout),this._onTrackEnd()}_onTrackEvent(e){if("start"===e.detail.state){const t=e.composedPath(),i=t[t.indexOf(this.$.header)-2];if(!i||!i._content)return;const r=this.getRootNode().activeElement;if(i._content.contains(this.getRootNode().activeElement)&&(!this._ie||!this._isFocusable(r)))return;if(this.$.scroller.hasAttribute("column-resizing"))return;this._touchDevice||this._onTrackStart(e)}else"track"===e.detail.state?this._onTrack(e):"end"===e.detail.state&&this._onTrackEnd(e)}_onTrackStart(e){if(!this.columnReorderingAllowed)return;const t=e.path||Pa(e).path;if(t&&t.filter((e=>e.hasAttribute&&e.hasAttribute("draggable")))[0])return;const i=this._cellFromPoint(e.detail.x,e.detail.y);if(i&&-1!==i.getAttribute("part").indexOf("header-cell")){for(this._toggleAttribute("reordering",!0,this),this._draggedColumn=i._column;1===this._draggedColumn.parentElement.childElementCount;)this._draggedColumn=this._draggedColumn.parentElement;this._setSiblingsReorderStatus(this._draggedColumn,"allowed"),this._draggedColumn._reorderStatus="dragging",this._updateGhost(i),this._reorderGhost.style.visibility="visible",this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._autoScroller()}}_onTrack(e){if(!this._draggedColumn)return;const t=this._cellFromPoint(e.detail.x,e.detail.y);if(!t)return;const i=this._getTargetColumn(t,this._draggedColumn);this._isSwapAllowed(this._draggedColumn,i)&&this._isSwappableByPosition(i,e.detail.x)&&this._swapColumnOrders(this._draggedColumn,i),this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._lastDragClientX=e.detail.x}_onTrackEnd(){this._draggedColumn&&(this._toggleAttribute("reordering",!1,this),this._draggedColumn._reorderStatus="",this._setSiblingsReorderStatus(this._draggedColumn,""),this._draggedColumn=null,this._lastDragClientX=null,this._reorderGhost.style.visibility="hidden",this.dispatchEvent(new CustomEvent("column-reorder",{detail:{columns:this._getColumnsInOrder()}})))}_getColumnsInOrder(){return this._columnTree.slice(0).pop().filter((e=>!e.hidden)).sort(((e,t)=>e._order-t._order))}_cellFromPoint(e,t){let i;if(e=e||0,t=t||0,this._draggedColumn||this._toggleAttribute("no-content-pointer-events",!0,this.$.scroller),an?i=this.shadowRoot.elementFromPoint(e,t):(i=document.elementFromPoint(e,t),"vaadin-grid-cell-content"===i.localName&&(i=i.assignedSlot.parentNode)),this._toggleAttribute("no-content-pointer-events",!1,this.$.scroller),i&&i._column)return i}_updateGhostPosition(e,t){const i=this._reorderGhost.getBoundingClientRect(),r=e-i.width/2,n=t-i.height/2,o=parseInt(this._reorderGhost._left||0),s=parseInt(this._reorderGhost._top||0);this._reorderGhost._left=o-(i.left-r),this._reorderGhost._top=s-(i.top-n),this._reorderGhost.style.transform=`translate(${this._reorderGhost._left}px, ${this._reorderGhost._top}px)`}_getInnerText(e){return e.localName?"none"===getComputedStyle(e).display?"":Array.from(e.childNodes).map((e=>this._getInnerText(e))).join(""):e.textContent}_updateGhost(e){const t=this._reorderGhost;t.textContent=this._getInnerText(e._content);const i=window.getComputedStyle(e);return["boxSizing","display","width","height","background","alignItems","padding","border","flex-direction","overflow"].forEach((e=>t.style[e]=i[e])),t}_updateOrders(e,t){void 0!==e&&void 0!==t&&(e[0].forEach(((e,t)=>e._order=0)),Gd._updateColumnOrders(e[0],this._orderBaseScope,0))}_setSiblingsReorderStatus(e,t){Array.from(e.parentNode.children).filter((t=>/column/.test(t.localName)&&this._isSwapAllowed(t,e))).forEach((e=>e._reorderStatus=t))}_autoScroller(){if(this._lastDragClientX){const e=this._lastDragClientX-this.getBoundingClientRect().right+50,t=this.getBoundingClientRect().left-this._lastDragClientX+50;e>0?this.$.table.scrollLeft+=e/10:t>0&&(this.$.table.scrollLeft-=t/10),this._scrollHandler()}this._draggedColumn&&this.async(this._autoScroller,10)}_isSwapAllowed(e,t){if(e&&t){const i=e!==t,r=e.parentElement===t.parentElement,n=e.frozen===t.frozen;return i&&r&&n}}_isSwappableByPosition(e,t){const i=Array.from(this.$.header.querySelectorAll('tr:not([hidden]) [part~="cell"]')).filter((t=>e.contains(t._column)))[0],r=this.$.header.querySelector("tr:not([hidden]) [reorder-status=dragging]").getBoundingClientRect(),n=i.getBoundingClientRect();return n.left>r.left?t>n.right-r.width:t<n.left+r.width}_swapColumnOrders(e,t){const i=e._order;e._order=t._order,t._order=i,this._updateLastFrozen(),this._updateFirstAndLastColumn()}_getTargetColumn(e,t){if(e&&t){let i=e._column;for(;i.parentElement!==t.parentElement&&i!==this;)i=i.parentElement;return i.parentElement===t.parentElement?i:e._column}}},jd=e=>class extends e{static get properties(){return{resizable:{type:Boolean,value:function(){if("vaadin-grid-column-group"===this.localName)return;const e=this.parentNode;return e&&"vaadin-grid-column-group"===e.localName&&e.resizable||!1}},_headerTemplate:{type:Object},_footerTemplate:{type:Object},frozen:{type:Boolean,value:!1},hidden:{type:Boolean},header:{type:String},textAlign:{type:String},_lastFrozen:{type:Boolean,value:!1},_order:Number,_reorderStatus:Boolean,_emptyCells:Array,_headerCell:Object,_footerCell:Object,_grid:Object,headerRenderer:Function,footerRenderer:Function}}static get observers(){return["_widthChanged(width, _headerCell, _footerCell, _cells.*)","_frozenChanged(frozen, _headerCell, _footerCell, _cells.*)","_flexGrowChanged(flexGrow, _headerCell, _footerCell, _cells.*)","_pathOrHeaderChanged(path, header, _headerCell, _footerCell, _cells.*, renderer, headerRenderer, _bodyTemplate, _headerTemplate)","_textAlignChanged(textAlign, _cells.*, _headerCell, _footerCell)","_orderChanged(_order, _headerCell, _footerCell, _cells.*)","_lastFrozenChanged(_lastFrozen)","_setBodyTemplateOrRenderer(_bodyTemplate, renderer, _cells, _cells.*)","_setHeaderTemplateOrRenderer(_headerTemplate, headerRenderer, _headerCell)","_setFooterTemplateOrRenderer(_footerTemplate, footerRenderer, _footerCell)","_resizableChanged(resizable, _headerCell)","_reorderStatusChanged(_reorderStatus, _headerCell, _footerCell, _cells.*)","_hiddenChanged(hidden, _headerCell, _footerCell, _cells.*)"]}connectedCallback(){super.connectedCallback(),this._bodyTemplate&&(this._bodyTemplate.templatizer._grid=this._grid),this._headerTemplate&&(this._headerTemplate.templatizer._grid=this._grid),this._footerTemplate&&(this._footerTemplate.templatizer._grid=this._grid),this._templateObserver.flush(),this._bodyTemplate||this._templateObserver.callback(),requestAnimationFrame((()=>{this._allCells.forEach((e=>{e._content.parentNode||this._grid&&this._grid.appendChild(e._content)}))}))}disconnectedCallback(){super.disconnectedCallback(),requestAnimationFrame((()=>{this._findHostGrid()||this._allCells.forEach((e=>{e._content.parentNode&&e._content.parentNode.removeChild(e._content)}))})),this._gridValue=void 0}_findHostGrid(){let e=this;for(;e&&!/^vaadin.*grid(-pro)?$/.test(e.localName);)e=e.assignedSlot?e.assignedSlot.parentNode:e.parentNode;return e||void 0}get _grid(){return this._gridValue||(this._gridValue=this._findHostGrid()),this._gridValue}get _allCells(){return[].concat(this._cells||[]).concat(this._emptyCells||[]).concat(this._headerCell).concat(this._footerCell).filter((e=>e))}constructor(){super(),this._templateObserver=new ya(this,(e=>{this._headerTemplate=this._prepareHeaderTemplate(),this._footerTemplate=this._prepareFooterTemplate(),this._bodyTemplate=this._prepareBodyTemplate()}))}_prepareHeaderTemplate(){return this._prepareTemplatizer(this._findTemplate(!0)||null,{})}_prepareFooterTemplate(){return this._prepareTemplatizer(this._findTemplate(!1,!0)||null,{})}_prepareBodyTemplate(){return this._prepareTemplatizer(this._findTemplate()||null)}_prepareTemplatizer(e,t){if(e&&!e.templatizer){const i=new Id;i._grid=this._grid,i.dataHost=this.dataHost,i._instanceProps=t||i._instanceProps,i.template=e,e.templatizer=i}return e}_renderHeaderAndFooter(){this.headerRenderer&&this._headerCell&&this.__runRenderer(this.headerRenderer,this._headerCell),this.footerRenderer&&this._footerCell&&this.__runRenderer(this.footerRenderer,this._footerCell)}__runRenderer(e,t,i){const r=[t._content,this];i&&i.item&&r.push(i),e.apply(this,r)}__setColumnTemplateOrRenderer(e,t,i){if(!this.hidden){if(e&&t)throw new Error("You should only use either a renderer or a template");i.forEach((i=>{const r=this._grid.__getRowModel(i.parentElement);if(t)i._renderer=t,(r.item||t===this.headerRenderer||t===this.footerRenderer)&&this.__runRenderer(t,i,r);else if(i._template!==e){i._template=e,i._content.innerHTML="",e.templatizer._grid=e.templatizer._grid||this._grid;const t=e.templatizer.createInstance();i._content.appendChild(t.root),i._instance=t,r.item&&i._instance.setProperties(r)}}))}}_setBodyTemplateOrRenderer(e,t,i,r){(e||t)&&i&&this.__setColumnTemplateOrRenderer(e,t,i)}_setHeaderTemplateOrRenderer(e,t,i){(e||t)&&i&&this.__setColumnTemplateOrRenderer(e,t,[i])}_setFooterTemplateOrRenderer(e,t,i){(e||t)&&i&&(this.__setColumnTemplateOrRenderer(e,t,[i]),this._grid.__updateHeaderFooterRowVisibility(i.parentElement))}_selectFirstTemplate(e=!1,t=!1){return ya.getFlattenedNodes(this).filter((i=>"template"===i.localName&&i.classList.contains("header")===e&&i.classList.contains("footer")===t))[0]}_findTemplate(e,t){const i=this._selectFirstTemplate(e,t);return i&&this.dataHost&&(i._rootDataHost=this.dataHost._rootDataHost||this.dataHost),i}_flexGrowChanged(e,t,i,r){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("flexGrow"),this._allCells.forEach((t=>t.style.flexGrow=e))}_orderChanged(e,t,i,r){this._allCells.forEach((t=>t.style.order=e))}_widthChanged(e,t,i,r){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("width"),this._allCells.forEach((t=>t.style.width=e)),this._grid&&this._grid.__forceReflow&&this._grid.__forceReflow()}_frozenChanged(e,t,i,r){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozen",e),this._allCells.forEach((t=>this._toggleAttribute("frozen",e,t))),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_lastFrozenChanged(e){this._allCells.forEach((t=>this._toggleAttribute("last-frozen",e,t))),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._lastFrozen=e)}_pathOrHeaderChanged(e,t,i,r,n,o,s,a,l){const d=void 0!==t;if(!s&&!l&&d&&i&&this.__setTextContent(i._content,t),e&&n.value){if(!o&&!a){const t=(t,i,{item:r})=>this.__setTextContent(t,this.get(e,r));this.__setColumnTemplateOrRenderer(void 0,t,n.value)}s||l||d||!i||null===t||this.__setTextContent(i._content,this._generateHeader(e))}i&&this._grid.__updateHeaderFooterRowVisibility(i.parentElement)}__setTextContent(e,t){e.textContent!==t&&(e.textContent=t)}_generateHeader(e){return e.substr(e.lastIndexOf(".")+1).replace(/([A-Z])/g,"-$1").toLowerCase().replace(/-/g," ").replace(/^./,(e=>e.toUpperCase()))}_toggleAttribute(e,t,i){i.hasAttribute(e)===!t&&(t?i.setAttribute(e,""):i.removeAttribute(e))}_reorderStatusChanged(e,t,i,r){this._allCells.forEach((t=>t.setAttribute("reorder-status",e)))}_resizableChanged(e,t){void 0!==e&&void 0!==t&&t&&[t].concat(this._emptyCells).forEach((t=>{if(t){const i=t.querySelector('[part~="resize-handle"]');if(i&&t.removeChild(i),e){const e=document.createElement("div");e.setAttribute("part","resize-handle"),t.appendChild(e)}}}))}_textAlignChanged(e,t,i,r){if(void 0===e)return;if(-1===["start","end","center"].indexOf(e))return void console.warn('textAlign can only be set as "start", "end" or "center"');let n;"ltr"===getComputedStyle(this._grid).direction?"start"===e?n="left":"end"===e&&(n="right"):"start"===e?n="right":"end"===e&&(n="left"),this._allCells.forEach((t=>{t._content.style.textAlign=e,getComputedStyle(t._content).textAlign!==e&&(t._content.style.textAlign=n)}))}_hiddenChanged(e,t,i,r){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("hidden",e),!!e!=!!this._previousHidden&&this._grid&&(!0===e&&this._allCells.forEach((e=>{e._content.parentNode&&e._content.parentNode.removeChild(e._content)})),this._grid._debouncerHiddenChanged=cs.debounce(this._grid._debouncerHiddenChanged,ao,(()=>{this._grid&&this._grid._renderColumnTree&&this._grid._renderColumnTree(this._grid._columnTree)})),this._grid._updateLastFrozen&&this._grid._updateLastFrozen(),this._grid.notifyResize&&this._grid.notifyResize(),this._grid._resetKeyboardNavigation&&this._grid._resetKeyboardNavigation()),this._previousHidden=e}};class Wd extends(jd(Xl(gl))){static get is(){return"vaadin-grid-column"}static get properties(){return{width:{type:String,value:"100px"},flexGrow:{type:Number,value:1},renderer:Function,path:{type:String},autoWidth:{type:Boolean,value:!1},_bodyTemplate:{type:Object},_cells:Array}}}customElements.define(Wd.is,Wd);const Yd=document.createElement("dom-module");Yd.appendChild(fl`
  <style>
    @keyframes vaadin-grid-appear {
      to {
        opacity: 1;
      }
    }

    :host {
      display: block;
      animation: 1ms vaadin-grid-appear;
      height: 400px;
      flex: 1 1 auto;
      align-self: stretch;
      position: relative;
    }

    :host([hidden]) {
      display: none !important;
    }

    #scroller {
      display: block;
      transform: translateY(0);
      width: auto;
      height: auto;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    :host([height-by-rows]),
    :host([all-rows-visible]) {
      height: auto;
      align-self: flex-start;
      flex-grow: 0;
      width: 100%;
    }

    :host([height-by-rows]) #scroller,
    :host([all-rows-visible]) #scroller {
      width: 100%;
      height: 100%;
      position: relative;
    }

    #table {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: auto;
      position: relative;
      outline: none;
      /* Workaround for a Desktop Safari bug: new stacking context here prevents the scrollbar from getting hidden */
      z-index: 0;
    }

    #header,
    #footer {
      display: block;
      position: -webkit-sticky;
      position: sticky;
      left: 0;
      overflow: visible;
      width: 100%;
      z-index: 1;
    }

    #header {
      top: 0;
    }

    th {
      text-align: inherit;
    }

    /* Safari doesn't work with "inherit" */
    [safari] th {
      text-align: initial;
    }

    #footer {
      bottom: 0;
    }

    #items {
      flex-grow: 1;
      flex-shrink: 0;
      display: block;
      position: -webkit-sticky;
      position: sticky;
      width: 100%;
      left: 0;
      overflow: visible;
    }

    [part~="row"] {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }

    [part~="row"][loading] [part~="body-cell"] ::slotted(vaadin-grid-cell-content) {
      opacity: 0;
    }

    #items [part~="row"] {
      position: absolute;
    }

    #items [part~="row"]:empty {
      height: 1em;
    }

    [part~="cell"]:not([part~="details-cell"]) {
      flex-shrink: 0;
      flex-grow: 1;
      box-sizing: border-box;
      display: flex;
      width: 100%;
      position: relative;
      align-items: center;
      padding: 0;
      white-space: nowrap;
    }

    [part~="details-cell"] {
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0;
    }

    [part~="cell"] ::slotted(vaadin-grid-cell-content) {
      display: block;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [hidden] {
      display: none !important;
    }

    [frozen] {
      z-index: 2;
      will-change: transform;
    }

    [no-scrollbars][safari] #table,
    [no-scrollbars][firefox] #table {
      overflow: hidden;
    }

    /* Reordering styles */
    :host([reordering]) [part~="cell"] ::slotted(vaadin-grid-cell-content),
    :host([reordering]) [part~="resize-handle"],
    #scroller[no-content-pointer-events] [part~="cell"] ::slotted(vaadin-grid-cell-content) {
      pointer-events: none;
    }

    [part~="reorder-ghost"] {
      visibility: hidden;
      position: fixed;
      pointer-events: none;
      opacity: 0.5;

      /* Prevent overflowing the grid in Firefox */
      top: 0;
      left: 0;
    }

    :host([reordering]) {
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }

    #scroller[ie][column-reordering-allowed] [part~="header-cell"] {
      -ms-user-select: none;
    }

    /* Resizing styles */
    [part~="resize-handle"] {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      cursor: col-resize;
      z-index: 1;
    }

    [part~="resize-handle"]::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 35px;
      transform: translateX(-50%);
    }

    [last-column] [part~="resize-handle"]::before,
    [last-frozen] [part~="resize-handle"]::before {
      width: 18px;
      transform: none;
      right: 0;
    }

    #scroller[column-resizing] {
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }

    /* Sizer styles */
    #sizer {
      display: flex;
      position: absolute;
      visibility: hidden;
    }

    #sizer [part~="details-cell"] {
      display: none !important;
    }

    #sizer [part~="cell"][hidden] {
      display: none !important;
    }

    #sizer [part~="cell"] {
      display: block;
      flex-shrink: 0;
      line-height: 0;
      height: 0 !important;
      min-height: 0 !important;
      max-height: 0 !important;
      padding: 0 !important;
      border: none !important;
    }

    #sizer [part~="cell"]::before {
      content: "-";
    }

    #sizer [part~="cell"] ::slotted(vaadin-grid-cell-content) {
      display: none !important;
    }

    /* RTL specific styles */

    :host([dir="rtl"]) #items,
    :host([dir="rtl"]) #header,
    :host([dir="rtl"]) #footer {
      left: auto;
    }

    :host([dir="rtl"]) [part~="reorder-ghost"] {
      left: auto;
      right: 0;
    }

    :host([dir="rtl"]) [part~="resize-handle"] {
      left: 0;
      right: auto;
    }

    :host([dir="rtl"]) [part~="resize-handle"]::before {
      transform: translateX(50%);
    }

    :host([dir="rtl"]) [last-column] [part~="resize-handle"]::before,
    :host([dir="rtl"]) [last-frozen] [part~="resize-handle"]::before {
      left: 0;
      right: auto;
    }
  </style>
`),Yd.register("vaadin-grid-styles");const Jd=(()=>{try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}})();class Kd extends(sd(Ul(Sd(Ad(Ed(vd(Od(Rd(Nd(kd(Vd(yd(Pd(qd(xd(Td(Ud(zd(bd))))))))))))))))))){static get template(){return fl`
    <style include="vaadin-grid-styles"></style>

    <div id="scroller" safari\$="[[_safari]]" ios\$="[[_ios]]" ie\$="[[_ie]]" loading\$="[[loading]]" column-reordering-allowed\$="[[columnReorderingAllowed]]">

      <table id="table" role="grid" aria-multiselectable="true" tabindex="0">
        <caption id="sizer" part="row"></caption>
        <thead id="header" role="rowgroup"></thead>
        <tbody id="items" role="rowgroup"></tbody>
        <tfoot id="footer" role="rowgroup"></tfoot>
      </table>

      <div part="reorder-ghost"></div>
    </div>

    <!-- The template needs at least one slot or else shady doesn't distribute -->
    <slot name="nodistribute"></slot>

    <div id="focusexit" tabindex="0"></div>
`}static get is(){return"vaadin-grid"}static get version(){return"5.9.0"}static get observers(){return["_columnTreeChanged(_columnTree, _columnTree.*)"]}static get properties(){return{_safari:{type:Boolean,value:/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},_ios:{type:Boolean,value:/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1},_edge:{type:Boolean,value:"undefined"!=typeof CSS&&CSS.supports("(-ms-ime-align:auto)")},_ie:{type:Boolean,value:!(!navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/MSIE/))},_firefox:{type:Boolean,value:navigator.userAgent.toLowerCase().indexOf("firefox")>-1},_android:{type:Boolean,value:/android/i.test(navigator.userAgent)},_touchDevice:{type:Boolean,value:Jd},heightByRows:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_allRowsVisibleChanged"},allRowsVisible:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_allRowsVisibleChanged"},_recalculateColumnWidthOnceLoadingFinished:{type:Boolean,value:!0}}}constructor(){super(),this.addEventListener("animationend",this._onAnimationEnd)}connectedCallback(){super.connectedCallback(),this.recalculateColumnWidths()}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"dir"===e&&(this.__isRTL="rtl"===i,this._updateScrollerMeasurements())}__hasRowsWithClientHeight(){return!!Array.from(this.$.items.children).filter((e=>e.clientHeight)).length}__flushPendingRecalculateColumnWidths(){this._recalculateColumnWidthOnceLoadingFinished&&!this._cache.isLoading()&&this.__hasRowsWithClientHeight()&&!this.__isCreatingRows()&&(this._recalculateColumnWidthOnceLoadingFinished=!1,this.recalculateColumnWidths())}_recalculateColumnWidths(e){e.forEach((e=>{e.width="auto",e._origFlexGrow=e.flexGrow,e.flexGrow=0})),e.forEach((e=>{e._currentWidth=0,e._allCells.forEach((t=>{const i=t.offsetWidth+1;e._currentWidth=Math.max(e._currentWidth,i)}))})),e.forEach((e=>{e.width=`${e._currentWidth}px`,e.flexGrow=e._origFlexGrow,e._currentWidth=void 0,e._origFlexGrow=void 0}))}recalculateColumnWidths(){if(this._columnTree)if(this._cache.isLoading()||this.__isCreatingRows())this._recalculateColumnWidthOnceLoadingFinished=!0;else{const e=this._getColumns().filter((e=>!e.hidden&&e.autoWidth));this._recalculateColumnWidths(e)}}_createScrollerRows(e){const t=[];for(var i=0;i<e;i++){const e=document.createElement("tr");e.setAttribute("part","row"),e.setAttribute("role","row"),this._columnTree&&this._updateRow(e,this._columnTree[this._columnTree.length-1],"body",!1,!0),t.push(e)}var r,n,o;return this._columnTree&&this._columnTree[this._columnTree.length-1].forEach((e=>e.isConnected&&e.notifyPath&&e.notifyPath("_cells.*",e._cells))),r=this,n=()=>{this._updateFirstAndLastColumn(),this._resetKeyboardNavigation()},la||ha(),da.push([r,n,o]),t}_getRowTarget(){return this.$.items}_createCell(e){const t="vaadin-grid-cell-content-"+(this._contentIndex=this._contentIndex+1||0),i=document.createElement("vaadin-grid-cell-content");i.setAttribute("slot",t);const r=document.createElement(e);r.id=t.replace("-content-","-"),r.setAttribute("tabindex","-1"),r.setAttribute("role","td"===e?"gridcell":"columnheader");const n=document.createElement("slot");return n.setAttribute("name",t),r.appendChild(n),r._content=i,i.addEventListener("mousedown",(()=>{if(window.chrome){const e=()=>{i.contains(this.getRootNode().activeElement)||r.focus(),document.removeEventListener("mouseup",e,!0)};document.addEventListener("mouseup",e,!0)}else setTimeout((()=>{i.contains(this.getRootNode().activeElement)||r.focus()}))})),r}_updateRow(e,t,i,r,n){i=i||"body";const o=document.createDocumentFragment();Array.from(e.children).forEach((e=>e._vacant=!0)),e.innerHTML="","sizer"!==e.id&&(e.hidden=!0),t.filter((e=>!e.hidden)).forEach(((t,s,a)=>{let l;if("body"===i){if(t._cells=t._cells||[],l=t._cells.filter((e=>e._vacant))[0],l||(l=this._createCell("td"),t._cells.push(l)),l.setAttribute("part","cell body-cell"),e.appendChild(l),s===a.length-1&&(this._rowDetailsTemplate||this.rowDetailsRenderer)){this._detailsCells=this._detailsCells||[];const t=this._detailsCells.filter((e=>e._vacant))[0]||this._createCell("td");-1===this._detailsCells.indexOf(t)&&this._detailsCells.push(t),t._content.parentElement||o.appendChild(t._content),this._configureDetailsCell(t),e.appendChild(t),this._a11ySetRowDetailsCell(e,t),t._vacant=!1}t.notifyPath&&!n&&t.notifyPath("_cells.*",t._cells)}else{const n="header"===i?"th":"td";r||"vaadin-grid-column-group"===t.localName?(l=t[`_${i}Cell`]||this._createCell(n),l._column=t,e.appendChild(l),t[`_${i}Cell`]=l):(t._emptyCells=t._emptyCells||[],l=t._emptyCells.filter((e=>e._vacant))[0]||this._createCell(n),l._column=t,e.appendChild(l),-1===t._emptyCells.indexOf(l)&&t._emptyCells.push(l)),l.setAttribute("part",`cell ${i}-cell`),this.__updateHeaderFooterRowVisibility(e)}l._content.parentElement||o.appendChild(l._content),l._vacant=!1,l._column=t})),this.appendChild(o),this._frozenCellsChanged(),this._updateFirstAndLastColumnForRow(e)}__updateHeaderFooterRowVisibility(e){if(!e)return;const t=Array.from(e.children).filter((t=>{const i=t._column;if(i._emptyCells&&i._emptyCells.indexOf(t)>-1)return!1;if(e.parentElement===this.$.header){if(i.headerRenderer||i._headerTemplate)return!0;if(null===i.header)return!1;if(i.path||void 0!==i.header)return!0}else if(i.footerRenderer||i._footerTemplate)return!0}));e.hidden!==!t.length&&(e.hidden=!t.length,this.notifyResize())}_updateScrollerItem(e,t){this._preventScrollerRotatingCellFocus(e,t),this._columnTree&&(this._toggleAttribute("first",0===t,e),this._toggleAttribute("odd",t%2,e),this._a11yUpdateRowRowindex(e,t),this._getItem(t,e))}_columnTreeChanged(e,t){this._renderColumnTree(e),this.recalculateColumnWidths()}_renderColumnTree(e){for(Array.from(this.$.items.children).forEach((t=>this._updateRow(t,e[e.length-1],null,!1,!0)));this.$.header.children.length<e.length;){const e=document.createElement("tr");e.setAttribute("part","row"),e.setAttribute("role","row"),this.$.header.appendChild(e);const t=document.createElement("tr");t.setAttribute("part","row"),t.setAttribute("role","row"),this.$.footer.appendChild(t)}for(;this.$.header.children.length>e.length;)this.$.header.removeChild(this.$.header.firstElementChild),this.$.footer.removeChild(this.$.footer.firstElementChild);Array.from(this.$.header.children).forEach(((t,i)=>this._updateRow(t,e[i],"header",i===e.length-1))),Array.from(this.$.footer.children).forEach(((t,i)=>this._updateRow(t,e[e.length-1-i],"footer",0===i))),this._updateRow(this.$.sizer,e[e.length-1]),this._resizeHandler(),this._frozenCellsChanged(),this._updateFirstAndLastColumn(),this._resetKeyboardNavigation(),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows(),this.__updateFooterPositioning()}__updateFooterPositioning(){if(this._firefox&&(this.$.items.style.paddingBottom=0,this.heightByRows||this.allRowsVisible||(this.$.items.style.paddingBottom=`${this.$.footer.offsetHeight}px`)),this._ios){!window.CSS.supports("position","sticky")&&(this.$.table.style.height="",this.$.table.style.minHeight="100%",this.$.table.style.maxHeight="100%",setTimeout((()=>this.$.table.style.height=`${this.$.scroller.offsetHeight}px`)))}}_updateItem(e,t){e._item=t;const i=this.__getRowModel(e);this._toggleAttribute("selected",i.selected,e),this._a11yUpdateRowSelected(e,i.selected),this._a11yUpdateRowLevel(e,i.level),this._toggleAttribute("expanded",i.expanded,e),this._toggleAttribute("details-opened",this._isDetailsOpened(t),e),(this._rowDetailsTemplate||this.rowDetailsRenderer)&&this._toggleDetailsCell(e,t),this._generateCellClassNames(e,i),this._filterDragAndDrop(e,i),Array.from(e.children).forEach((e=>{if(e._renderer){const t=e._column||this;e._renderer.call(t,e._content,t,i)}else e._instance&&(e._instance.__detailsOpened__=i.detailsOpened,e._instance.__selected__=i.selected,e._instance.__level__=i.level,e._instance.__expanded__=i.expanded,e._instance.setProperties(i))})),this._debouncerUpdateHeights=cs.debounce(this._debouncerUpdateHeights,so.after(1),(()=>{this._updateMetrics(),this._positionItems(),this._updateScrollerSize()}))}_resizeHandler(){this._updateDetailsCellHeights(),this._accessIronListAPI(super._resizeHandler,!0),this._updateScrollerMeasurements(),this.__updateFooterPositioning()}_onAnimationEnd(e){0===e.animationName.indexOf("vaadin-grid-appear")&&(this._render(),e.stopPropagation(),this.notifyResize(),this.__flushPendingRecalculateColumnWidths(),requestAnimationFrame((()=>{this.__scrollToPendingIndex(),this.$.table.style.webkitOverflowScrolling="touch"})))}_toggleAttribute(e,t,i){i.hasAttribute(e)===!t&&(t?i.setAttribute(e,""):i.removeAttribute(e))}__getRowModel(e){return{index:e.index,item:e._item,level:this._getIndexLevel(e.index),expanded:this._isExpanded(e._item),selected:this._isSelected(e._item),detailsOpened:!(!this._rowDetailsTemplate&&!this.rowDetailsRenderer)&&this._isDetailsOpened(e._item)}}render(){this._columnTree&&(this._columnTree.forEach((e=>{e.forEach((e=>e._renderHeaderAndFooter()))})),this._update())}notifyResize(){super.notifyResize()}_allRowsVisibleChanged(e,t){(e||t)&&this.notifyResize()}__forceReflow(){this._debouncerForceReflow=cs.debounce(this._debouncerForceReflow,ao,(()=>{this.$.scroller.style.overflow="hidden",setTimeout((()=>this.$.scroller.style.overflow=""))}))}}customElements.define(Kd.is,Kd);class Xd extends(jd(gl)){static get is(){return"vaadin-grid-column-group"}static get properties(){return{_childColumns:{value:function(){return this._getChildColumns(this)}},flexGrow:{type:Number,readOnly:!0},width:{type:String,readOnly:!0},_visibleChildColumns:Array,_colSpan:Number,_rootColumns:Array}}static get observers(){return["_updateVisibleChildColumns(_childColumns)","_childColumnsChanged(_childColumns)","_groupFrozenChanged(frozen, _rootColumns)","_groupHiddenChanged(hidden, _rootColumns)","_visibleChildColumnsChanged(_visibleChildColumns)","_colSpanChanged(_colSpan, _headerCell, _footerCell)","_groupOrderChanged(_order, _rootColumns)","_groupReorderStatusChanged(_reorderStatus, _rootColumns)","_groupResizableChanged(resizable, _rootColumns)"]}connectedCallback(){super.connectedCallback(),this._addNodeObserver(),this._updateFlexAndWidth()}disconnectedCallback(){super.disconnectedCallback(),this._observer&&this._observer.disconnect()}_columnPropChanged(e,t){"hidden"===e&&(this._preventHiddenCascade=!0,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenCascade=!1),/flexGrow|width|hidden|_childColumns/.test(e)&&this._updateFlexAndWidth(),"frozen"===e&&(this.frozen=this.frozen||t),"lastFrozen"===e&&(this._lastFrozen=this._lastFrozen||t)}_groupOrderChanged(e,t){if(t){const i=t.slice(0);if(!e)return void i.forEach((e=>e._order=0));const r=/(0+)$/.exec(e).pop().length,n=1+~~(Math.log(t.length)/Math.LN10),o=Math.pow(10,r-n);i[0]&&i[0]._order&&i.sort(((e,t)=>e._order-t._order)),Gd._updateColumnOrders(i,o,e)}}_groupReorderStatusChanged(e,t){void 0!==e&&void 0!==t&&t.forEach((t=>t._reorderStatus=e))}_groupResizableChanged(e,t){void 0!==e&&void 0!==t&&t.forEach((t=>t.resizable=e))}_updateVisibleChildColumns(e){this._visibleChildColumns=Array.prototype.filter.call(e,(e=>!e.hidden))}_childColumnsChanged(e){!this._autoHidden&&this.hidden&&(Array.prototype.forEach.call(e,(e=>e.hidden=!0)),this._updateVisibleChildColumns(e))}_updateFlexAndWidth(){this._visibleChildColumns&&(this._visibleChildColumns.length?this._setWidth("calc("+Array.prototype.reduce.call(this._visibleChildColumns,((e,t)=>e+" + "+(t.width||"0px").replace("calc","")),"").substring(3)+")"):this._setWidth("0px"),this._setFlexGrow(Array.prototype.reduce.call(this._visibleChildColumns,((e,t)=>e+t.flexGrow),0)))}_groupFrozenChanged(e,t){void 0!==t&&void 0!==e&&!1!==e&&Array.from(t).forEach((t=>t.frozen=e))}_groupHiddenChanged(e,t){t&&!this._preventHiddenCascade&&(this._ignoreVisibleChildColumns=!0,t.forEach((t=>t.hidden=e)),this._ignoreVisibleChildColumns=!1),this._columnPropChanged("hidden")}_visibleChildColumnsChanged(e){this._colSpan=e.length,this._ignoreVisibleChildColumns||(0===e.length?this._autoHidden=this.hidden=!0:this.hidden&&this._autoHidden&&(this._autoHidden=this.hidden=!1))}_colSpanChanged(e,t,i){t&&(t.setAttribute("colspan",e),this._grid&&this._grid._a11yUpdateCellColspan(t,e)),i&&(i.setAttribute("colspan",e),this._grid&&this._grid._a11yUpdateCellColspan(i,e))}_getChildColumns(e){return ya.getFlattenedNodes(e).filter(this._isColumnElement)}_addNodeObserver(){this._observer=new ya(this,(e=>{(e.addedNodes.filter(this._isColumnElement).length>0||e.removedNodes.filter(this._isColumnElement).length>0)&&(this._preventHiddenCascade=!0,this._rootColumns=this._getChildColumns(this),this._childColumns=this._rootColumns,this._preventHiddenCascade=!1,co.run((()=>{this._grid&&this._grid._updateColumnTree&&this._grid._updateColumnTree()})))})),this._observer.flush()}_isColumnElement(e){return e.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/.test(e.localName)}}customElements.define(Xd.is,Xd);class Zd extends HTMLElement{static get version(){return"1.3.2"}}customElements.define("vaadin-material-styles",Zd);const Qd=document.createElement("template");Qd.innerHTML='<dom-module id="material-color-light">\n  <template>\n    <style>\n      :host,\n      #host-fix {\n        /* Text colors */\n        --material-body-text-color: var(--light-theme-text-color, rgba(0, 0, 0, 0.87));\n        --material-secondary-text-color: var(--light-theme-secondary-color, rgba(0, 0, 0, 0.54));\n        --material-disabled-text-color: var(--light-theme-disabled-color, rgba(0, 0, 0, 0.38));\n\n        /* Primary colors */\n        --material-primary-color: var(--primary-color, #6200ee);\n        --material-primary-contrast-color: var(--dark-theme-base-color, #fff);\n        --material-primary-text-color: var(--material-primary-color);\n\n        /* Error colors */\n        --material-error-color: var(--error-color, #b00020);\n        --material-error-text-color: var(--material-error-color);\n\n        /* Background colors */\n        --material-background-color: var(--light-theme-background-color, #fff);\n        --material-secondary-background-color: var(--light-theme-secondary-background-color, #f5f5f5);\n        --material-disabled-color: rgba(0, 0, 0, 0.26);\n\n        /* Divider colors */\n        --material-divider-color: rgba(0, 0, 0, 0.12);\n\n        /* Undocumented internal properties (prefixed with three dashes) */\n\n        /* Text field tweaks */\n        --_material-text-field-input-line-background-color: initial;\n        --_material-text-field-input-line-opacity: initial;\n        --_material-text-field-input-line-hover-opacity: initial;\n        --_material-text-field-focused-label-opacity: initial;\n\n        /* Button tweaks */\n        --_material-button-raised-background-color: initial;\n        --_material-button-outline-color: initial;\n\n        /* Grid tweaks */\n        --_material-grid-row-hover-background-color: initial;\n\n        /* Split layout tweaks */\n        --_material-split-layout-splitter-background-color: initial;\n\n        background-color: var(--material-background-color);\n        color: var(--material-body-text-color);\n      }\n\n      [theme~="dark"] {\n        /* Text colors */\n        --material-body-text-color: var(--dark-theme-text-color, rgba(255, 255, 255, 1));\n        --material-secondary-text-color: var(--dark-theme-secondary-color, rgba(255, 255, 255, 0.7));\n        --material-disabled-text-color: var(--dark-theme-disabled-color, rgba(255, 255, 255, 0.5));\n\n        /* Primary colors */\n        --material-primary-color: var(--light-primary-color, #7e3ff2);\n        --material-primary-text-color: #b794f6;\n\n        /* Error colors */\n        --material-error-color: var(--error-color, #de2839);\n        --material-error-text-color: var(--material-error-color);\n\n        /* Background colors */\n        --material-background-color: var(--dark-theme-background-color, #303030);\n        --material-secondary-background-color: var(--dark-theme-secondary-background-color, #3b3b3b);\n        --material-disabled-color: rgba(255, 255, 255, 0.3);\n\n        /* Divider colors */\n        --material-divider-color: rgba(255, 255, 255, 0.12);\n\n        /* Undocumented internal properties (prefixed with three dashes) */\n\n        /* Text field tweaks */\n        --_material-text-field-input-line-background-color: #fff;\n        --_material-text-field-input-line-opacity: 0.7;\n        --_material-text-field-input-line-hover-opacity: 1;\n        --_material-text-field-focused-label-opacity: 1;\n\n        /* Button tweaks */\n        --_material-button-raised-background-color: rgba(255, 255, 255, 0.08);\n        --_material-button-outline-color: rgba(255, 255, 255, 0.2);\n\n        /* Grid tweaks */\n        --_material-grid-row-hover-background-color: rgba(255, 255, 255, 0.08);\n        --_material-grid-row-selected-overlay-opacity: 0.16;\n\n        /* Split layout tweaks */\n        --_material-split-layout-splitter-background-color: rgba(255, 255, 255, 0.8);\n\n        background-color: var(--material-background-color);\n        color: var(--material-body-text-color);\n      }\n\n      a {\n        color: inherit;\n      }\n    </style>\n  </template>\n</dom-module><dom-module id="material-color-dark">\n  <template>\n    <style>\n      :host,\n      #host-fix {\n        /* Text colors */\n        --material-body-text-color: var(--dark-theme-text-color, rgba(255, 255, 255, 1));\n        --material-secondary-text-color: var(--dark-theme-secondary-color, rgba(255, 255, 255, 0.7));\n        --material-disabled-text-color: var(--dark-theme-disabled-color, rgba(255, 255, 255, 0.5));\n\n        /* Primary colors */\n        --material-primary-color: var(--light-primary-color, #7e3ff2);\n        --material-primary-text-color: #b794f6;\n\n        /* Error colors */\n        --material-error-color: var(--error-color, #de2839);\n        --material-error-text-color: var(--material-error-color);\n\n        /* Background colors */\n        --material-background-color: var(--dark-theme-background-color, #303030);\n        --material-secondary-background-color: var(--dark-theme-secondary-background-color, #3b3b3b);\n        --material-disabled-color: rgba(255, 255, 255, 0.3);\n\n        /* Divider colors */\n        --material-divider-color: rgba(255, 255, 255, 0.12);\n\n        /* Undocumented internal properties (prefixed with three dashes) */\n\n        /* Text field tweaks */\n        --_material-text-field-input-line-background-color: #fff;\n        --_material-text-field-input-line-opacity: 0.7;\n        --_material-text-field-input-line-hover-opacity: 1;\n        --_material-text-field-focused-label-opacity: 1;\n\n        /* Button tweaks */\n        --_material-button-raised-background-color: rgba(255, 255, 255, 0.08);\n        --_material-button-outline-color: rgba(255, 255, 255, 0.2);\n\n        /* Grid tweaks */\n        --_material-grid-row-hover-background-color: rgba(255, 255, 255, 0.08);\n        --_material-grid-row-selected-overlay-opacity: 0.16;\n\n        /* Split layout tweaks */\n        --_material-split-layout-splitter-background-color: rgba(255, 255, 255, 0.8);\n\n        background-color: var(--material-background-color);\n        color: var(--material-body-text-color);\n      }\n    </style>\n  </template>\n</dom-module><custom-style>\n  <style>\n    :root {\n      /* Text colors */\n      --material-body-text-color: var(--light-theme-text-color, rgba(0, 0, 0, 0.87));\n      --material-secondary-text-color: var(--light-theme-secondary-color, rgba(0, 0, 0, 0.54));\n      --material-disabled-text-color: var(--light-theme-disabled-color, rgba(0, 0, 0, 0.38));\n\n      /* Primary colors */\n      --material-primary-color: var(--primary-color, #6200ee);\n      --material-primary-contrast-color: var(--dark-theme-base-color, #fff);\n      --material-primary-text-color: var(--material-primary-color);\n\n      /* Error colors */\n      --material-error-color: var(--error-color, #b00020);\n      --material-error-text-color: var(--material-error-color);\n\n      /* Background colors */\n      --material-background-color: var(--light-theme-background-color, #fff);\n      --material-secondary-background-color: var(--light-theme-secondary-background-color, #f5f5f5);\n      --material-disabled-color: rgba(0, 0, 0, 0.26);\n\n      /* Divider colors */\n      --material-divider-color: rgba(0, 0, 0, 0.12);\n    }\n  </style>\n</custom-style>',document.head.appendChild(Qd.content);const ec=document.createElement("template");if(ec.innerHTML="<custom-style>\n  <style>\n    html {\n      /* Font family */\n      --material-font-family: 'Roboto', sans-serif;\n\n      /* Font sizes */\n      --material-h1-font-size: 6rem;\n      --material-h2-font-size: 3.75rem;\n      --material-h3-font-size: 3rem;\n      --material-h4-font-size: 2.125rem;\n      --material-h5-font-size: 1.5rem;\n      --material-h6-font-size: 1.25rem;\n      --material-body-font-size: 1rem;\n      --material-small-font-size: 0.875rem;\n      --material-button-font-size: 0.875rem;\n      --material-caption-font-size: 0.75rem;\n\n      /* Icon size */\n      --material-icon-font-size: 20px;\n    }\n  </style>\n</custom-style><dom-module id=\"material-typography\">\n  <template>\n    <style>\n      body {\n        font-family: var(--material-font-family);\n        font-size: var(--material-body-font-size);\n        line-height: 1.4;\n        -webkit-text-size-adjust: 100%;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        color: inherit;\n        line-height: 1.1;\n        margin-top: 1.5em;\n      }\n\n      h1 {\n        font-size: var(--material-h3-font-size);\n        font-weight: 300;\n        letter-spacing: -0.015em;\n        margin-bottom: 1em;\n        text-indent: -0.07em;\n      }\n\n      h2 {\n        font-size: var(--material-h4-font-size);\n        font-weight: 300;\n        letter-spacing: -0.01em;\n        margin-bottom: 0.75em;\n        text-indent: -0.07em;\n      }\n\n      h3 {\n        font-size: var(--material-h5-font-size);\n        font-weight: 400;\n        margin-bottom: 0.75em;\n        text-indent: -0.05em;\n      }\n\n      h4 {\n        font-size: var(--material-h6-font-size);\n        font-weight: 400;\n        letter-spacing: 0.01em;\n        margin-bottom: 0.75em;\n        text-indent: -0.05em;\n      }\n\n      h5 {\n        font-size: var(--material-body-font-size);\n        font-weight: 500;\n        margin-bottom: 0.5em;\n        text-indent: -0.025em;\n      }\n\n      h6 {\n        font-size: var(--material-small-font-size);\n        font-weight: 500;\n        letter-spacing: 0.01em;\n        margin-bottom: 0.25em;\n        text-indent: -0.025em;\n      }\n\n      a,\n      b,\n      strong {\n        font-weight: 500;\n      }\n    </style>\n  </template>\n</dom-module>",document.head.appendChild(ec.content),!window.polymerSkipLoadingFontRoboto){const e="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic",t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.crossOrigin="anonymous",t.href=e,document.head.appendChild(t)}const tc=document.createElement("template");tc.innerHTML='<dom-module id="material-required-field">\n  <template>\n    <style>\n      [part="label"] {\n        display: block;\n        position: absolute;\n        top: 8px;\n        font-size: 1em;\n        line-height: 1;\n        height: 20px;\n        margin-bottom: -4px;\n        white-space: nowrap;\n        overflow-x: hidden;\n        text-overflow: ellipsis;\n        color: var(--material-secondary-text-color);\n        transform-origin: 0 75%;\n        transform: scale(0.75);\n      }\n\n      :host([required]) [part="label"]::after {\n        content: " *";\n        color: inherit;\n      }\n\n      :host([invalid]) [part="label"] {\n        color: var(--material-error-text-color);\n      }\n\n      [part="error-message"] {\n        font-size: .75em;\n        line-height: 1;\n        color: var(--material-error-text-color);\n      }\n\n      /* Margin that doesn’t reserve space when there’s no error message */\n      [part="error-message"]:not(:empty)::before {\n        content: "";\n        display: block;\n        height: 6px;\n      }\n\n      :host(:not([invalid])) [part="error-message"] {\n        margin-top: 0;\n        max-height: 0;\n        overflow: hidden;\n      }\n\n      :host([invalid]) [part="error-message"] {\n        animation: reveal 0.2s;\n      }\n\n      @keyframes reveal {\n        0% {\n          opacity: 0;\n        }\n      }\n\n      /* RTL specific styles */\n\n      :host([dir="rtl"]) [part="label"] {\n        transform-origin: 100% 75%;\n      }\n    </style>\n  </template>\n</dom-module>',document.head.appendChild(tc.content);const ic=document.createElement("template");ic.innerHTML='<custom-style>\n  <style>\n    @font-face {\n      font-family: \'material-icons\';\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAjAAAsAAAAADZQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAARAAAAFZSk09oY21hcAAAAYgAAACNAAACNOuCXH5nbHlmAAACGAAABDwAAAXsdK8UGGhlYWQAAAZUAAAAMAAAADYX9T2IaGhlYQAABoQAAAAgAAAAJBGyCLpobXR4AAAGpAAAABQAAABAjXoAAGxvY2EAAAa4AAAAIgAAACIKMgjUbWF4cAAABtwAAAAfAAAAIAEeAFRuYW1lAAAG/AAAATQAAAJe3l764XBvc3QAAAgwAAAAjwAAAMqJEjDWeJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYOS4wTiBgZWBgYGfbQIDA2MAhGZpYChlymZgYGJgZWbACgLSXFMYHF4xvuJnv/CvgOEG+wXG6UBhRpAcAMyUDJN4nO2R2Q0DIQxEHwt7HzSSGlJQvlJkqqGJjYdJGbH0PPJgELKBEcjBIyiQ3iQUr3BT9zNb9wvP3lPkt3rfkZNy1KXnIXpLvDgxs7DGvZ2Dk4saxxP/OHr+/KqqCZo+08EgzUa7acVoym002lubDNLZIF0M0tUg3Yz22XaD9DD6XTsN0ssgrYb6BZEQJiUAAAB4nH1UbUhbVxg+77259yZMJbfko7DhbnJtrjYuWfNxsx9qBFu32ljHWqWO6VD6MW1G4uYPsfSDdQOHXOuPrtYfKytKJziYEJkQZLQ/BqHCpsUfghZX1jHBjBUWWqfes51zE1dloyfJyXvOed5znvO+z3sQINKEeb4WmRECBURZBAGEeU1fyOgPhliJlTT9geneVpTxD23/jPbinSAGRYgADGuMP8P4CILgGd9W1HRPXyDeiEEIL5pvCnH0MnqVeMhh2e4iP9ldAnbRVgpBV6AGwmLIB6xLdAnzpzPb+zOn1fdU8uVr8/9/3eVr+fEMacZg1+LGBmfLczKHuNuIQ8gCggUU9lP8/hDjN01pcBluk8sQK4/jOa6P4kCxEOI8p+kTzCkNq6Z1YukTGswVcLUFHNnOCeyaBvexqjGnuD4Nh3GYWIVYxLkV9FJ+PwqluwpxcqK+QGJidIyfDLkm0hnW8wXiziL09xskPma0Hx1CEbKPW+CRwFudDuR0SBEVRVSr4kGKh3UrPlA81kgNRFTJWQpOh1UoAYFnZZoC07dz6RRejx0/HgN7Kg0j6RTYY01NMbyeSs+NXR9+WB2NVj8cvg71z+2eG0zxMVwjmAksO53G3elpnKVOYJtOw430NNhiTRsb//HDacPmbPoE/uEC0OsbMRtn12jGLQwzCznIsWu4CHJ77vgKkl50RzkcDMti0DQ1939M8izPUSG8mPJmWSZDEkSaieivy7IqzKMSdABVoTcROsDLEj1N3RehuQLebjOiGQxEFF52Kx7FEw5FLKCGQ0bEZbegqEGJkuUZMh0MOB1Oh93G/7b4GOdy63i0veruJSwMmlcGN1vLvQdHOs8kzndOFxW3xhoqK8HUiX9SvRV09mLy91+eQdGfWTjXHv1R/xJfktwGqL2x+yx8/McoWD6AjcFnZYPc153nE2c6Ryq85Sl4zdsQay0u1jNwKHmRzh70qtl3u85i7clXOAsfwVW+0tvQ2Ooy9ERqYZsvQfuQQu5biPW/gS4oyUOFpFIdOaiMeKIiN+1tdBygKyGKMU09XV3CMy0tcHRpFbKrS3C0pQXPLK0+HejtqTt8uK6nF6w71sA79XXlFRXldfXjOwZf0tGGJ5eX8WRbR0cbNC8vQ3Nbx1bpXkf8hFqstMfVMNCuGiO6AhFYyRTjVjYHmFm06y3ykQGhKxn1YN3JJkmwTCfkfOWEjMqhyQOXyP+auJaXcVU0WkUkPTYzdutR5XzFRLL3Sn8ifsfn9/vuxBO5RPcJ/D0zyzUn9mqfCE78pve7QKgAox6v+05SLKXF0M7SQbiVIW+enaEkyod+djTnMoIdNqINInkByStyzd3dNXorNXT18v3oFxf6j7xlHNHP2YygR6u74noXTuJFo8QeTw5+3vh2MDDTZz154spnN/PcjXx8kvyw7gh+hJMwDDlc9A+3XcsFeJxjYGRgYADi5PtWjvH8Nl8ZuDkTgCIM16srKhH0v0zO++wXgFwOBiaQKAA6hAuJeJxjYGRgYL/wr4CBgcuKgeH/f877DEARFCAAAIewBYJ4nGNgYGDgTCAOc1lhigEAvMIGAwAAAAAAGAAwAGIAdgCKAJ4AwAEkATIBcAHoAlACXgKsAvYAAHicY2BkYGAQYPBgYGEAASYg5gJCBob/YD4DABFeAXMAeJx9kL1uwjAUhU8gUJVIVaWqnRgsVepSEX5G1BkkRgb2EBwIcuLIMUi8QR+kT9CH6NgH6VP0xHiBAVtyvvvdc50oAB7xgwDNCvDgzma1cMfqzG3Ss+eQ/Oq5gwhjz136D889vGPhOcITDrwhCO9p+vj03GL+y3Ob/ttzSP713MEL/jx30Q/guYdV0Pcc4S0wRWKlyRM1yFNd1ku5PajkSl5WK2nqXJdiHI8uG3NZSkOzEeuTqI/bibWZyIwuxEyXViqlRWX0XqY23llbTYfDzPs41QUKJLCQMMhJCgM+U2iUqLGk3/JfKHbMzeSt3sr5mqapBf9/jNHNiTl96XrnzIZTa5x41jjyiya0FhnrjBnNuwRmbrZJK25NU7nenialj7FzUxWmGHJnV/nYvb34BzHZcLZ4nG2MQQ6CMBREO0ARtSjuvASHqu1XCD+0+YKE20tD3DmLmbxk8lSm9tzV/zTIkKOARokDKhxxwhkGNS64osFNXaxIWFoflnGx4s2Oc0xQOcs0eivadeQGs/VHwtgyPaf6B9K/ukk7pnTj4IbKS4jJp2lziaGVWt+/7YPJ5xsUke1aCnGwvpxjGqW+tN8xfgA=) format(\'woff\');\n      font-weight: normal;\n      font-style: normal;\n    }\n\n    html {\n      --material-icons-arrow-downward: "\\ea01";\n      --material-icons-arrow-upward: "\\ea02";\n      --material-icons-calendar: "\\ea03";\n      --material-icons-check: "\\ea04";\n      --material-icons-chevron-left: "\\ea05";\n      --material-icons-chevron-right: "\\ea06";\n      --material-icons-clear: "\\ea07";\n      --material-icons-clock: "\\ea08";\n      --material-icons-dropdown: "\\ea09";\n      --material-icons-error: "\\ea0a";\n      --material-icons-eye-disabled: "\\ea0b";\n      --material-icons-eye: "\\ea0c";\n      --material-icons-play: "\\ea0d";\n      --material-icons-reload: "\\ea0e";\n      --material-icons-upload: "\\ea0f";\n    }\n  </style>\n</custom-style>',document.head.appendChild(ic.content);const rc=document.createElement("template");rc.innerHTML='<dom-module id="material-field-button">\n  <template>\n    <style>\n      /* TODO(platosha): align icon sizes with other elements */\n      [part$="button"] {\n        flex: none;\n        width: 24px;\n        height: 24px;\n        padding: 4px;\n        color: var(--material-secondary-text-color);\n        font-size: var(--material-icon-font-size);\n        line-height: 24px;\n        text-align: center;\n      }\n\n      :host(:not([readonly])) [part$="button"] {\n        cursor: pointer;\n      }\n\n      :host(:not([readonly])) [part$="button"]:hover {\n        color: var(--material-text-color);\n      }\n\n      :host([disabled]) [part$="button"],\n      :host([readonly]) [part$="button"] {\n        color: var(--material-disabled-text-color);\n      }\n\n      :host([disabled]) [part="clear-button"] {\n        display: none;\n      }\n\n      [part$="button"]::before {\n        font-family: "material-icons";\n      }\n    </style>\n  </template>\n</dom-module>',document.head.appendChild(rc.content);const nc=fl`<dom-module id="material-text-field" theme-for="vaadin-text-field">
  <template>
    <style include="material-required-field material-field-button">
      :host {
        display: inline-flex;
        position: relative;
        padding-top: 8px;
        margin-bottom: 8px;
        outline: none;
        color: var(--material-body-text-color);
        font-size: var(--material-body-font-size);
        line-height: 24px;
        font-family: var(--material-font-family);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      :host::before {
        line-height: 32px;
      }

      /* Strange gymnastics to make fields vertically align nicely in most cases
         (no label, with label, without prefix, with prefix, etc.) */

      :host([has-label]) {
        padding-top: 24px;
      }

      [part="label"]:empty {
        display: none;
      }

      [part="label"]:empty::before {
        content: " ";
        position: absolute;
      }

      [part="input-field"] {
        position: relative;
        top: -0.2px; /* NOTE(platosha): Adjusts for wrong flex baseline in Chrome & Safari */
        height: 32px;
        padding-left: 0;
        padding-right: 0;
        background-color: transparent;
        margin: 0;
      }

      [part="input-field"]::before,
      [part="input-field"]::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        transform-origin: 50% 0%;
        background-color: var(--_material-text-field-input-line-background-color, #000);
        opacity: var(--_material-text-field-input-line-opacity, 0.42);
      }

      [part="input-field"]::after {
        background-color: var(--material-primary-color);
        opacity: 0;
        height: 2px;
        bottom: 0;
        transform: scaleX(0);
        transition: opacity 0.175s;
      }

      :host([disabled]) [part="label"],
      :host([disabled]) [part="value"],
      :host([disabled]) [part="input-field"] ::slotted(input),
      :host([disabled]) [part="input-field"] ::slotted(textarea),
      :host([disabled]) [part="input-field"] ::slotted([part="value"]) {
        color: var(--material-disabled-text-color);
        -webkit-text-fill-color: var(--material-disabled-text-color);
      }

      [part="value"],
      :host([disabled]) [part="input-field"] ::slotted(input),
      :host([disabled]) [part="input-field"] ::slotted(textarea),
      /* Slotted by vaadin-select-text-field */
      [part="input-field"] ::slotted([part="value"]) {
        outline: none;
        margin: 0;
        border: 0;
        border-radius: 0;
        padding: 8px 0;
        width: 100%;
        height: 100%;
        font-family: inherit;
        font-size: 1em;
        line-height: inherit;
        color: inherit;
        background-color: transparent;
        /* Disable default invalid style in Firefox */
        box-shadow: none;
      }

      /* TODO: the text opacity should be 42%, but the disabled style is 38%.
      Would need to introduce another property for it if we want to be 100% accurate. */
      [part="value"]::-webkit-input-placeholder {
        color: var(--material-disabled-text-color);
        transition: opacity 0.175s 0.05s;
        opacity: 1;
      }

      [part="value"]:-ms-input-placeholder {
        color: var(--material-disabled-text-color);
      }

      [part="value"]::-moz-placeholder {
        color: var(--material-disabled-text-color);
        transition: opacity 0.175s 0.05s;
        opacity: 1;
      }

      [part="value"]::placeholder {
        color: var(--material-disabled-text-color);
        transition: opacity 0.175s 0.1s;
        opacity: 1;
      }

      :host([has-label]:not([focused]):not([invalid]):not([theme="always-float-label"])) [part="value"]::-webkit-input-placeholder {
        opacity: 0;
        transition-delay: 0;
      }

      :host([has-label]:not([focused]):not([invalid]):not([theme="always-float-label"])) [part="value"]::-moz-placeholder {
        opacity: 0;
        transition-delay: 0;
      }

      :host([has-label]:not([focused]):not([invalid]):not([theme="always-float-label"])) [part="value"]::placeholder {
        opacity: 0;
        transition-delay: 0;
      }

      /* IE11 doesn’t show the placeholder when the input is focused, so it’s basically useless for this theme */
      :host([has-label]) [part="value"]:-ms-input-placeholder {
        opacity: 0;
      }

      /* According to material theme guidelines, helper text should be hidden when error message is set and input is invalid */
      :host([has-helper][invalid][has-error-message]) [part="helper-text"] {
        display: none;
      }

      [part="label"] {
        width: 133%;
        transition: transform 0.175s, color 0.175s, width 0.175s;
        transition-timing-function: ease, ease, step-end;
      }

      :host([has-helper]) [part="helper-text"]::before {
        content: "";
        display: block;
        height: 6px;
      }

      [part="helper-text"],
      [part="helper-text"] ::slotted(*) {
        font-size: .75rem;
        line-height: 1;
        color: var(--material-secondary-text-color);
      }

      /* TODO: using unsupported selector to fix IE11 (even thought the label element is scaled down,
         the 133% width still takes the same space as an unscaled element */
      ::-ms-backdrop,
      .vaadin-text-field-container {
        overflow: hidden;
      }

      /* Same fix for MS Edge ^^   */
      @supports (-ms-ime-align:auto) {
        .vaadin-text-field-container {
          overflow: hidden;
        }
      }

      :host(:hover:not([readonly]):not([invalid])) [part="input-field"]::before {
        opacity: var(--_material-text-field-input-line-hover-opacity, 0.87);
      }

      :host([focused]:not([invalid])) [part="label"] {
        color: var(--material-primary-text-color);
      }

      :host([focused]) [part="input-field"]::after,
      :host([invalid]) [part="input-field"]::after {
        opacity: 1;
        transform: none;
        transition: transform 0.175s, opacity 0.175s;
      }

      :host([invalid]) [part="input-field"]::after {
        background-color: var(--material-error-color);
      }

      :host([input-prevented]) [part="input-field"] {
        color: var(--material-error-text-color);
      }

      :host([disabled]) {
        pointer-events: none;
      }

      :host([disabled]) [part="input-field"] {
        color: var(--material-disabled-text-color);
      }

      :host([disabled]) [part="input-field"]::before {
        background-color: transparent;
        background-image: linear-gradient(90deg, var(--_material-text-field-input-line-background-color, #000) 0, var(--_material-text-field-input-line-background-color, #000) 2px, transparent 2px);
        background-size: 4px 1px;
        background-repeat: repeat-x;
      }

      /* Only target the visible floating label */
      :host([has-label]:not([has-value]):not([focused]):not([invalid]):not([theme~="always-float-label"])) [part="label"] {
        width: 100%;
        /* IE11 doesn’t work with calc inside the translate function, so we need to have a fixed pixel value instead of 50% + 16px */
        transform: scale(1) translateY(24px);
        transition-timing-function: ease, ease, step-start;
        pointer-events: none;
        left: auto;
        right: auto;
        transition-delay: 0.1s;
      }

      /* Slotted content */

      [part="input-field"] ::slotted(*:not([part="value"]):not([part\$="-button"]):not(input):not(textarea)) {
        color: var(--material-secondary-text-color);
      }

      [part="clear-button"]::before {
        content: var(--material-icons-clear);
      }

      /* RTL specific styles */

      :host([disabled][dir="rtl"]) [part="input-field"]::before {
        background-image: linear-gradient(-90deg, var(--_material-text-field-input-line-background-color, #000) 0, var(--_material-text-field-input-line-background-color, #000) 2px, transparent 2px);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(nc.content);const oc=fl`<dom-module id="vaadin-text-field-shared-styles">
  <template>
    <style>
      :host {
        display: inline-flex;
        outline: none;
      }

      :host::before {
        content: "\\2003";
        width: 0;
        display: inline-block;
        /* Size and position this element on the same vertical position as the input-field element
           to make vertical align for the host element work as expected */
      }

      :host([hidden]) {
        display: none !important;
      }

      .vaadin-text-field-container,
      .vaadin-text-area-container {
        display: flex;
        flex-direction: column;
        min-width: 100%;
        max-width: 100%;
        width: var(--vaadin-text-field-default-width, 12em);
      }

      [part="label"]:empty {
        display: none;
      }

      [part="input-field"] {
        display: flex;
        align-items: center;
        flex: auto;
      }

      .vaadin-text-field-container [part="input-field"] {
        flex-grow: 0;
      }

      /* Reset the native input styles */
      [part="value"],
      [part="input-field"] ::slotted(input),
      [part="input-field"] ::slotted(textarea) {
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        min-width: 0;
        font: inherit;
        font-size: 1em;
        line-height: normal;
        color: inherit;
        background-color: transparent;
        /* Disable default invalid style in Firefox */
        box-shadow: none;
      }

      [part="input-field"] ::slotted(*) {
        flex: none;
      }

      [part="value"],
      [part="input-field"] ::slotted(input),
      [part="input-field"] ::slotted(textarea),
      /* Slotted by vaadin-select-text-field */
      [part="input-field"] ::slotted([part="value"]) {
        flex: auto;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }

      [part="input-field"] ::slotted(textarea) {
        resize: none;
      }

      [part="value"]::-ms-clear,
      [part="input-field"] ::slotted(input)::-ms-clear {
        display: none;
      }

      [part="clear-button"] {
        cursor: default;
      }

      [part="clear-button"]::before {
        content: "✕";
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(oc.content);const sc={default:["list","autofocus","pattern","autocapitalize","autocorrect","maxlength","minlength","name","placeholder","autocomplete","title","disabled","readonly","required"],accessible:["invalid"]},ac={DEFAULT:"default",ACCESSIBLE:"accessible"},lc=e=>class extends e{static get properties(){return{autocomplete:{type:String},autocorrect:{type:String},autocapitalize:{type:String},autoselect:{type:Boolean,value:!1},clearButtonVisible:{type:Boolean,value:!1},errorMessage:{type:String,value:"",observer:"_errorMessageChanged"},i18n:{type:Object,value:()=>({clear:"Clear"})},label:{type:String,value:"",observer:"_labelChanged"},helperText:{type:String,value:"",observer:"_helperTextChanged"},maxlength:{type:Number},minlength:{type:Number},name:{type:String},placeholder:{type:String},readonly:{type:Boolean,reflectToAttribute:!0},required:{type:Boolean,reflectToAttribute:!0},value:{type:String,value:"",observer:"_valueChanged",notify:!0},invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1},hasValue:{type:Boolean,reflectToAttribute:!0},preventInvalidInput:{type:Boolean},_enabledCharPattern:String,_labelId:String,_helperTextId:String,_errorId:String,_inputId:String,_hasSlottedHelper:Boolean}}static get observers(){return["_stateChanged(disabled, readonly, clearButtonVisible, hasValue)","_hostPropsChanged("+sc.default.join(", ")+")","_hostAccessiblePropsChanged("+sc.accessible.join(", ")+")","_getActiveErrorId(invalid, errorMessage, _errorId, helperText, _helperTextId, _hasSlottedHelper)","_getActiveLabelId(label, _labelId, _inputId)","__observeOffsetHeight(errorMessage, invalid, label, helperText)","__enabledCharPatternChanged(_enabledCharPattern)"]}get focusElement(){if(!this.shadowRoot)return;const e=this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`);return e||this.shadowRoot.querySelector('[part="value"]')}get inputElement(){return this.focusElement}get _slottedTagName(){return"input"}_createConstraintsObserver(){this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern)")}_onInput(e){if(this.__preventInput)return e.stopImmediatePropagation(),void(this.__preventInput=!1);if(this.preventInvalidInput){const e=this.inputElement;if(e.value.length>0&&!this.checkValidity())return e.value=this.value||"",this.setAttribute("input-prevented",""),void(this._inputDebouncer=cs.debounce(this._inputDebouncer,so.after(200),(()=>{this.removeAttribute("input-prevented")})))}e.__fromClearButton||(this.__userInput=!0),this.value=e.target.value,this.__userInput=!1}_stateChanged(e,t,i,r){!e&&!t&&i&&r?this.$.clearButton.removeAttribute("hidden"):this.$.clearButton.setAttribute("hidden",!0)}_onChange(e){if(this._valueClearing)return;const t=new CustomEvent("change",{detail:{sourceEvent:e},bubbles:e.bubbles,cancelable:e.cancelable});this.dispatchEvent(t)}_valueChanged(e,t){""===e&&void 0===t||(this.hasValue=""!==e&&null!=e,this.__userInput||(void 0!==e?this.inputElement.value=e:this.value=this.inputElement.value="",this.invalid&&this.validate()))}_labelChanged(e){this._setOrToggleAttribute("has-label",!!e,this)}_helperTextChanged(e){this._setOrToggleAttribute("has-helper",!!e,this)}_errorMessageChanged(e){this._setOrToggleAttribute("has-error-message",!!e,this)}_onHelperSlotChange(){const e=this.shadowRoot.querySelector('[name="helper"]').assignedNodes({flatten:!0});this._hasSlottedHelper=e.filter((e=>3!==e.nodeType)).length,this._hasSlottedHelper?this.setAttribute("has-helper","slotted"):""!==this.helperText&&null!==this.helperText||this.removeAttribute("has-helper")}_onSlotChange(){const e=this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`);this.value&&(this.inputElement.value=this.value,this.validate()),e&&!this._slottedInput?(this._validateSlottedValue(e),this._addInputListeners(e),this._addIEListeners(e),this._slottedInput=e):!e&&this._slottedInput&&(this._removeInputListeners(this._slottedInput),this._removeIEListeners(this._slottedInput),this._slottedInput=void 0),Object.keys(ac).map((e=>ac[e])).forEach((e=>this._propagateHostAttributes(sc[e].map((e=>this[e])),e)))}_hostPropsChanged(...e){this._propagateHostAttributes(e,ac.DEFAULT)}_hostAccessiblePropsChanged(...e){this._propagateHostAttributes(e,ac.ACCESSIBLE)}_validateSlottedValue(e){e.value!==this.value&&(console.warn("Please define value on the vaadin-text-field component!"),e.value="")}_propagateHostAttributes(e,t){const i=this.inputElement,r=sc[t];t===ac.ACCESSIBLE?r.forEach(((t,r)=>{this._setOrToggleAttribute(t,e[r],i),this._setOrToggleAttribute(`aria-${t}`,!!e[r]&&"true",i)})):r.forEach(((t,r)=>{this._setOrToggleAttribute(t,e[r],i)}))}_setOrToggleAttribute(e,t,i){e&&i&&(t?i.setAttribute(e,"boolean"==typeof t?"":t):i.removeAttribute(e))}_constraintsChanged(e,t,i,r){this.invalid&&(e||t||i||r?this.validate():this.invalid=!1)}checkValidity(){return this.required||this.pattern||this.maxlength||this.minlength||this.__forceCheckValidity?this.inputElement.checkValidity():!this.invalid}_addInputListeners(e){e.addEventListener("input",this._boundOnInput),e.addEventListener("change",this._boundOnChange),e.addEventListener("blur",this._boundOnBlur),e.addEventListener("focus",this._boundOnFocus),e.addEventListener("paste",this._boundOnPaste),e.addEventListener("drop",this._boundOnDrop),e.addEventListener("beforeinput",this._boundOnBeforeInput)}_removeInputListeners(e){e.removeEventListener("input",this._boundOnInput),e.removeEventListener("change",this._boundOnChange),e.removeEventListener("blur",this._boundOnBlur),e.removeEventListener("focus",this._boundOnFocus),e.removeEventListener("paste",this._boundOnPaste),e.removeEventListener("drop",this._boundOnDrop),e.removeEventListener("beforeinput",this._boundOnBeforeInput)}ready(){super.ready(),this._createConstraintsObserver(),this._boundOnInput=this._onInput.bind(this),this._boundOnChange=this._onChange.bind(this),this._boundOnBlur=this._onBlur.bind(this),this._boundOnFocus=this._onFocus.bind(this),this._boundOnPaste=this._onPaste.bind(this),this._boundOnDrop=this._onDrop.bind(this),this._boundOnBeforeInput=this._onBeforeInput.bind(this);const e=this.shadowRoot.querySelector('[part="value"]');this._slottedInput=this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`),this._addInputListeners(e),this._addIEListeners(e),this._slottedInput&&(this._addIEListeners(this._slottedInput),this._addInputListeners(this._slottedInput)),this.shadowRoot.querySelector('[name="input"], [name="textarea"]').addEventListener("slotchange",this._onSlotChange.bind(this)),this._onHelperSlotChange(),this.shadowRoot.querySelector('[name="helper"]').addEventListener("slotchange",this._onHelperSlotChange.bind(this)),window.ShadyCSS&&window.ShadyCSS.nativeCss||this.updateStyles(),this.$.clearButton.addEventListener("mousedown",(()=>this._valueClearing=!0)),this.$.clearButton.addEventListener("mouseleave",(()=>this._valueClearing=!1)),this.$.clearButton.addEventListener("click",this._onClearButtonClick.bind(this)),this.addEventListener("keydown",this._onKeyDown.bind(this));var t=lc._uniqueId=1+lc._uniqueId||0;this._errorId=`${this.constructor.is}-error-${t}`,this._labelId=`${this.constructor.is}-label-${t}`,this._helperTextId=`${this.constructor.is}-helper-${t}`,this._inputId=`${this.constructor.is}-input-${t}`,this.shadowRoot.querySelector('[part="error-message"]').addEventListener("transitionend",(()=>{this.__observeOffsetHeight()}))}validate(){return!(this.invalid=!this.checkValidity())}clear(){this.value=""}_onBlur(){this.validate()}_onFocus(){this.autoselect&&(this.inputElement.select(),setTimeout((()=>{try{this.inputElement.setSelectionRange(0,9999)}catch(e){}})))}_onClearButtonClick(e){e.preventDefault(),this.inputElement.focus(),this.clear(),this._valueClearing=!1,navigator.userAgent.match(/Trident/)&&(this.__preventInput=!1);const t=new Event("input",{bubbles:!0,composed:!0});t.__fromClearButton=!0;const i=new Event("change",{bubbles:!this._slottedInput});i.__fromClearButton=!0,this.inputElement.dispatchEvent(t),this.inputElement.dispatchEvent(i)}_onKeyDown(e){if(27===e.keyCode&&this.clearButtonVisible){const e=!!this.value;this.clear(),e&&this.inputElement.dispatchEvent(new Event("change",{bubbles:!this._slottedInput}))}this._enabledCharPattern&&!this.__shouldAcceptKey(e)&&e.preventDefault()}__shouldAcceptKey(e){return e.metaKey||e.ctrlKey||!e.key||1!==e.key.length||this.__enabledCharRegExp.test(e.key)}_onPaste(e){if(this._enabledCharPattern){const t=(e.clipboardData||window.clipboardData).getData("text");this.__enabledTextRegExp.test(t)||e.preventDefault()}}_onDrop(e){if(this._enabledCharPattern){const t=e.dataTransfer.getData("text");this.__enabledTextRegExp.test(t)||e.preventDefault()}}_onBeforeInput(e){this._enabledCharPattern&&e.data&&!this.__enabledTextRegExp.test(e.data)&&e.preventDefault()}__enabledCharPatternChanged(e){this.__enabledCharRegExp=e&&new RegExp("^"+e+"$"),this.__enabledTextRegExp=e&&new RegExp("^"+e+"*$")}_addIEListeners(e){navigator.userAgent.match(/Trident/)&&(this._shouldPreventInput=()=>{this.__preventInput=!0,requestAnimationFrame((()=>{this.__preventInput=!1}))},e.addEventListener("focusin",this._shouldPreventInput),e.addEventListener("focusout",this._shouldPreventInput),this._createPropertyObserver("placeholder",this._shouldPreventInput))}_removeIEListeners(e){navigator.userAgent.match(/Trident/)&&(e.removeEventListener("focusin",this._shouldPreventInput),e.removeEventListener("focusout",this._shouldPreventInput))}_getActiveErrorId(e,t,i,r,n,o){const s=[];(r||o)&&s.push(n),t&&e&&s.push(i),this._setOrToggleAttribute("aria-describedby",s.join(" "),this.focusElement)}_getActiveLabelId(e,t,i){let r=i;e&&(r=`${t} ${i}`),this.focusElement.setAttribute("aria-labelledby",r)}_getErrorMessageAriaHidden(e,t,i){return(!(t&&e?i:void 0)).toString()}_dispatchIronResizeEventIfNeeded(e,t){const i="__previous"+e;void 0!==this[i]&&this[i]!==t&&this.dispatchEvent(new CustomEvent("iron-resize",{bubbles:!0,composed:!0})),this[i]=t}__observeOffsetHeight(){this.__observeOffsetHeightDebouncer=cs.debounce(this.__observeOffsetHeightDebouncer,ao,(()=>{this._dispatchIronResizeEventIfNeeded("Height",this.offsetHeight)}))}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),window.ShadyCSS&&window.ShadyCSS.nativeCss||!/^(focused|focus-ring|invalid|disabled|placeholder|has-value)$/.test(e)||this.updateStyles();if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&this.root){const e="-webkit-backface-visibility";this.root.querySelectorAll("*").forEach((t=>{t.style[e]="visible",t.style[e]=""}))}}get __data(){return this.__dataValue||{}}set __data(e){this.__dataValue=e}};class dc extends(sd(lc(Gl(Ul(gl))))){static get template(){return fl`
    <style include="vaadin-text-field-shared-styles">
      /* polymer-cli linter breaks with empty line */
    </style>

    <div class="vaadin-text-field-container">

      <label part="label" on-click="focus" id="[[_labelId]]">[[label]]</label>

      <div part="input-field" id="[[_inputId]]">

        <slot name="prefix"></slot>

        <slot name="input">
          <input part="value">
        </slot>

        <div part="clear-button" id="clearButton" role="button" aria-label\$="[[i18n.clear]]"></div>
        <slot name="suffix"></slot>

      </div>

      <div part="helper-text" id="[[_helperTextId]]">
        <slot name="helper">[[helperText]]</slot>
      </div>

      <div part="error-message" id="[[_errorId]]" aria-live="assertive" aria-hidden\$="[[_getErrorMessageAriaHidden(invalid, errorMessage, _errorId)]]">[[errorMessage]]</div>

    </div>
`}static get is(){return"vaadin-text-field"}static get version(){return"2.9.0"}static get properties(){return{list:{type:String},pattern:{type:String},title:{type:String}}}}customElements.define(dc.is,dc);class cc extends gl{static get template(){return fl`
    <style>
      :host {
        display: inline-flex;
        max-width: 100%;
      }

      #filter {
        width: 100%;
        box-sizing: border-box;
      }
    </style>
    <slot name="filter">
      <vaadin-text-field id="filter" value="{{value}}"></vaadin-text-field>
    </slot>
`}static get is(){return"vaadin-grid-filter"}static get properties(){return{path:String,value:{type:String,notify:!0},_connected:Boolean}}connectedCallback(){super.connectedCallback(),this._connected=!0}static get observers(){return["_filterChanged(path, value, _connected)"]}ready(){super.ready();const e=this.firstElementChild;e&&"filter"!==e.getAttribute("slot")&&(console.warn('Make sure you have assigned slot="filter" to the child elements of <vaadin-grid-filter>'),e.setAttribute("slot","filter"))}_filterChanged(e,t,i){void 0!==e&&void 0!==t&&i&&(void 0===this._previousValue&&""===t||(this._previousValue=t,this._debouncerFilterChanged=cs.debounce(this._debouncerFilterChanged,so.after(200),(()=>{this.dispatchEvent(new CustomEvent("filter-changed",{bubbles:!0}))}))))}focus(){this.$.filter.focus()}}customElements.define(cc.is,cc);class hc extends Wd{static get template(){return fl`
    <template class="header" id="headerTemplate">
      <vaadin-grid-filter path="[[path]]" value="[[_filterValue]]">
        <vaadin-text-field theme="small" focus-target="" style="max-width: 100%;" slot="filter" value="{{_filterValue}}" label="[[_getHeader(header, path)]]"></vaadin-text-field>
      </vaadin-grid-filter>
    </template>
`}static get is(){return"vaadin-grid-filter-column"}static get properties(){return{path:String,header:String}}_prepareHeaderTemplate(){const e=this._prepareTemplatizer(this.$.headerTemplate);return e.templatizer.dataHost=this,e}_getHeader(e,t){return e||this._generateHeader(t)}}customElements.define(hc.is,hc);const pc=fl`<dom-module id="material-checkbox" theme-for="vaadin-checkbox">
  <template>
    <style>
      :host {
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      [part="label"]:not([empty]) {
        margin: 3px 12px 3px 6px;
      }

      [part="native-checkbox"] {
        opacity: 0;
        position: absolute;
      }

      [part="checkbox"] {
        display: inline-block;
        width: 16px;
        height: 16px;
        flex: none;
        margin: 4px;
        position: relative;
        border-radius: 2px;
        box-shadow: inset 0 0 0 2px var(--material-secondary-text-color);
        pointer-events: none;
        line-height: 1.275;
        background-color: transparent;
      }

      /* IE11 only */
      ::-ms-backdrop,
      [part="checkbox"] {
        line-height: 1;
      }

      /* Used for the ripple */
      [part="checkbox"]::before {
        /* Needed to align the checkbox nicely on the baseline */
        content: "\\2003";
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--material-disabled-text-color);
        transform: scale(0);
        opacity: 0;
        transition: transform 0s 0.8s, opacity 0.8s;
        will-change: transform, opacity;
      }

      /* Used for the checkmark */
      [part="checkbox"]::after {
        content: "";
        display: inline-block;
        width: 10px;
        height: 19px;
        border: 0 solid var(--material-background-color);
        border-width: 3px 0 0 3px;
        box-sizing: border-box;
        transform-origin: 0 0;
        position: absolute;
        top: 12px;
        left: 6px;
        transform: scale(0) rotate(-135deg);
        transition: transform 0.2s;
      }

      :host([indeterminate]) [part="checkbox"],
      :host([checked]) [part="checkbox"] {
        background-color: var(--material-primary-color);
        box-shadow: none;
      }

      :host([checked]) [part="checkbox"]::after {
        transform: scale(0.55) rotate(-135deg);
      }

      :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part="checkbox"] {
        background-color: transparent;
      }

      :host([focus-ring]) [part="checkbox"]::before,
      :host([active]) [part="checkbox"]::before {
        transition-duration: 0.08s, 0.01s;
        transition-delay: 0s, 0s;
        transform: scale(2.5);
        opacity: 0.15;
      }

      :host([checked]) [part="checkbox"]::before {
        background-color: var(--material-primary-color);
      }

      :host([indeterminate]) [part="checkbox"]::after {
        transform: none;
        opacity: 1;
        top: 45%;
        height: 10%;
        left: 22%;
        right: 22%;
        width: auto;
        border: 0;
        background-color: var(--material-background-color);
        transition: opacity 0.4s;
      }

      :host([disabled]) {
        pointer-events: none;
        color: var(--material-disabled-text-color);
      }

      :host([disabled]) ::slotted(*) {
        color: inherit;
      }

      :host([disabled]:not([checked]):not([indeterminate])) [part="checkbox"] {
        box-shadow: inset 0 0 0 2px var(--material-disabled-color);
      }

      :host([disabled][checked]) [part="checkbox"],
      :host([disabled][indeterminate]) [part="checkbox"] {
        background-color: var(--material-disabled-color);
      }

      /* Workaround for vaadin-checkbox issue: https://github.com/vaadin/vaadin-checkbox/issues/16 */
      [part="native-checkbox"]:checked ~ [part="checkbox"] {
        opacity: 1;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="label"]:not([empty]) {
        margin: 3px 6px 3px 12px;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(pc.content);class uc extends Wd{static get template(){return fl`
    <template class="header" id="defaultHeaderTemplate">
      <vaadin-checkbox class="vaadin-grid-select-all-checkbox" aria-label="Select All" hidden\$="[[_selectAllHidden]]" on-checked-changed="_onSelectAllCheckedChanged" checked="[[_isChecked(selectAll, _indeterminate)]]" indeterminate="[[_indeterminate]]"></vaadin-checkbox>
    </template>
    <template id="defaultBodyTemplate">
      <vaadin-checkbox aria-label="Select Row" checked="{{selected}}"></vaadin-checkbox>
    </template>
`}static get is(){return"vaadin-grid-selection-column"}static get properties(){return{width:{type:String,value:"58px"},flexGrow:{type:Number,value:0},selectAll:{type:Boolean,value:!1,notify:!0},autoSelect:{type:Boolean,value:!1},_indeterminate:Boolean,_previousActiveItem:Object,_selectAllHidden:Boolean}}static get observers(){return["_onSelectAllChanged(selectAll)"]}_pathOrHeaderChanged(e,t,i,r,n,o,s,a,l){!n.value||void 0===e&&void 0===o||(this._bodyTemplate=a=void 0,this.__cleanCellsOfTemplateProperties(n.value)),!i||void 0===t&&void 0===s||(this._headerTemplate=l=void 0,this.__cleanCellsOfTemplateProperties([i])),super._pathOrHeaderChanged(e,t,i,r,n,o,s,a,l)}__cleanCellsOfTemplateProperties(e){e.forEach((e=>{e._content.innerHTML="",delete e._instance,delete e._template}))}_prepareHeaderTemplate(){const e=this._prepareTemplatizer(this._findTemplate(!0)||this.$.defaultHeaderTemplate);return e.templatizer.dataHost=e===this.$.defaultHeaderTemplate?this:this.dataHost,e}_prepareBodyTemplate(){const e=this._prepareTemplatizer(this._findTemplate()||this.$.defaultBodyTemplate);return e.templatizer.dataHost=e===this.$.defaultBodyTemplate?this:this.dataHost,e}constructor(){super(),this._boundOnActiveItemChanged=this._onActiveItemChanged.bind(this),this._boundOnDataProviderChanged=this._onDataProviderChanged.bind(this),this._boundOnSelectedItemsChanged=this._onSelectedItemsChanged.bind(this)}disconnectedCallback(){this._grid.removeEventListener("active-item-changed",this._boundOnActiveItemChanged),this._grid.removeEventListener("data-provider-changed",this._boundOnDataProviderChanged),this._grid.removeEventListener("filter-changed",this._boundOnSelectedItemsChanged),this._grid.removeEventListener("selected-items-changed",this._boundOnSelectedItemsChanged);if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&window.ShadyDOM&&this.parentElement){const e=this.parentElement,t=this.nextElementSibling;e.removeChild(this),t?e.insertBefore(this,t):e.appendChild(this)}super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this._grid&&(this._grid.addEventListener("active-item-changed",this._boundOnActiveItemChanged),this._grid.addEventListener("data-provider-changed",this._boundOnDataProviderChanged),this._grid.addEventListener("filter-changed",this._boundOnSelectedItemsChanged),this._grid.addEventListener("selected-items-changed",this._boundOnSelectedItemsChanged))}_onSelectAllChanged(e){void 0!==e&&this._grid&&(this._selectAllChangeLock||(this._grid.selectedItems=e&&Array.isArray(this._grid.items)?this._grid._filter(this._grid.items):[]))}_arrayContains(e,t){for(var i=0;e&&t&&t[i]&&e.indexOf(t[i])>=0;i++);return i==t.length}_onSelectAllCheckedChanged(e){this.selectAll=this._indeterminate||e.target.checked}_isChecked(e,t){return t||e}_onActiveItemChanged(e){const t=e.detail.value;if(this.autoSelect){const e=t||this._previousActiveItem;e&&this._grid._toggleItem(e)}this._previousActiveItem=t}_onSelectedItemsChanged(e){this._selectAllChangeLock=!0,Array.isArray(this._grid.items)&&(this._grid.selectedItems.length?this._arrayContains(this._grid.selectedItems,this._grid._filter(this._grid.items))?(this.selectAll=!0,this._indeterminate=!1):(this.selectAll=!1,this._indeterminate=!0):(this.selectAll=!1,this._indeterminate=!1)),this._selectAllChangeLock=!1}_onDataProviderChanged(e){this._selectAllHidden=!Array.isArray(this._grid.items)}}customElements.define(uc.is,uc);const mc=fl`<dom-module id="material-grid-sorter" theme-for="vaadin-grid-sorter">
  <template>
    <style>
      :host {
        justify-content: flex-start;
        height: 100%;
        align-items: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      :host([direction]) {
        color: var(--material-body-text-color);
      }

      [part="indicators"] {
        order: -1;
      }

      [part="indicators"]::before {
        display: inline-block;
        width: 24px;
        font-family: "material-icons";
        font-size: 18px;
        line-height: 18px;
        transition: .1s opacity cubic-bezier(.4, 0, .2, .1), .1s width cubic-bezier(.4, 0, .2, .1);
        opacity: .5;
      }

      :host(:not([direction])) [part="indicators"]::before {
        content: var(--material-icons-arrow-upward);
        width: 0;
        opacity: 0;
      }

      :host([direction]) [part="indicators"]::before {
        opacity: 1;
      }

      :host([direction="asc"]) [part="indicators"]::before {
        content: var(--material-icons-arrow-upward);
      }

      :host([direction="desc"]) [part="indicators"]::before {
        content: var(--material-icons-arrow-downward);
      }

      :host(:hover) [part="indicators"]::before {
        width: 24px;
        opacity: 1;
      }

      [part="order"] {
        right: 4px;
        top: -8px;
        font-size: 10px;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="order"] {
        left: 4px;
        right: auto;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(mc.content);const fc=document.createElement("template");fc.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: 'vaadin-grid-sorter-icons';\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(fc.content);class gc extends(Ul(Xl(gl))){static get template(){return fl`
    <style>
      :host {
        display: inline-flex;
        cursor: pointer;
        max-width: 100%;
      }

      [part="content"] {
        flex: 1 1 auto;
      }

      [part="indicators"] {
        position: relative;
        align-self: center;
        flex: none;
      }

      [part="order"] {
        display: inline;
        vertical-align: super;
      }

      [part="indicators"]::before {
        font-family: 'vaadin-grid-sorter-icons';
        display: inline-block;
      }

      :host(:not([direction])) [part="indicators"]::before {
        content: "\\e901";
      }

      :host([direction=asc]) [part="indicators"]::before {
        content: "\\e900";
      }

      :host([direction=desc]) [part="indicators"]::before {
        content: "\\e902";
      }
    </style>

    <div part="content">
      <slot></slot>
    </div>
    <div part="indicators">
      <span part="order">[[_getDisplayOrder(_order)]]</span>
    </div>
`}static get is(){return"vaadin-grid-sorter"}static get properties(){return{path:String,direction:{type:String,reflectToAttribute:!0,notify:!0,value:null},_order:{type:Number,value:null},_isConnected:{type:Boolean,observer:"__isConnectedChanged"}}}static get observers(){return["_pathOrDirectionChanged(path, direction)","_directionOrOrderChanged(direction, _order)"]}ready(){super.ready(),this.addEventListener("click",this._onClick.bind(this))}connectedCallback(){super.connectedCallback(),this._isConnected=!0}disconnectedCallback(){super.disconnectedCallback(),this._isConnected=!1}_pathOrDirectionChanged(){this.__dispatchSorterChangedEvenIfPossible()}__isConnectedChanged(e,t){!1!==t&&this.__dispatchSorterChangedEvenIfPossible()}__dispatchSorterChangedEvenIfPossible(){void 0!==this.path&&void 0!==this.direction&&this._isConnected&&this.dispatchEvent(new CustomEvent("sorter-changed",{bubbles:!0,composed:!0}))}_getDisplayOrder(e){return null===e?"":e+1}_onClick(e){const t=this.getRootNode().activeElement;this!==t&&this.contains(t)||(e.preventDefault(),"asc"===this.direction?this.direction="desc":"desc"===this.direction?this.direction=null:this.direction="asc")}_directionOrOrderChanged(e,t){void 0!==e&&void 0!==t&&(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&this.root&&this.root.querySelectorAll("*").forEach((function(e){e.style["-webkit-backface-visibility"]="visible",e.style["-webkit-backface-visibility"]=""})))}}customElements.define(gc.is,gc);class _c extends Wd{static get template(){return fl`
    <template class="header" id="headerTemplate">
      <vaadin-grid-sorter path="[[path]]" direction="{{direction}}">[[_getHeader(header, path)]]</vaadin-grid-sorter>
    </template>
`}static get is(){return"vaadin-grid-sort-column"}static get properties(){return{path:String,direction:{type:String,notify:!0}}}_prepareHeaderTemplate(){const e=this._prepareTemplatizer(this.$.headerTemplate);return e.templatizer.dataHost=this,e}_getHeader(e,t){return e||this._generateHeader(t)}}customElements.define(_c.is,_c);const bc=fl`<dom-module id="material-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
  <template>
    <style>
      :host {
        --_material-grid-tree-toggle-collapsed-icon-transform: rotate(0);
      }

      :host([dir="rtl"]) {
        --_material-grid-tree-toggle-collapsed-icon-transform: rotate(180deg);
      }

      [part="toggle"] {
        width: calc(var(--material-icon-font-size) + 8px);
        position: relative;
        align-self: stretch; /* NOTE(platosha): helps to maintain baseline */
      }

      [part="toggle"]::before {
        font-family: "material-icons";
        font-size: var(--material-icon-font-size);
        width: var(--material-icon-font-size);
        position: absolute; /* NOTE(platosha): helps to maintain baseline */
        transform: var(--_material-grid-tree-toggle-collapsed-icon-transform);
        transition: transform 0.1s cubic-bezier(.4, 0, .2, .1);
      }

      :host(:not([expanded])) [part="toggle"]::before,
      :host([expanded]) [part="toggle"]::before {
        content: var(--material-icons-chevron-right);
      }

      :host([expanded]) [part="toggle"]::before {
        transform: rotate(90deg);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(bc.content);const yc=document.createElement("template");yc.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(yc.content);class vc extends(Ul(Xl(gl))){static get template(){return fl`
    <style>
      :host {
        display: inline-flex;
        align-items: baseline;

        /* CSS API for :host */
        --vaadin-grid-tree-toggle-level-offset: 1em;

        /*
          ShadyCSS seems to polyfill :dir(rtl) only for :host, thus using
          a host custom CSS property for ltr/rtl toggle icon choice.
         */
        ---collapsed-icon: "\\e7be\\00a0";
      }

      :host(:dir(rtl)) {
        ---collapsed-icon: "\\e7bd\\00a0";
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:not([leaf])) {
        cursor: pointer;
      }

      #level-spacer,
      [part="toggle"] {
        flex: none;
      }

      #level-spacer {
        display: inline-block;
        width: calc(var(---level, '0') * var(--vaadin-grid-tree-toggle-level-offset));
      }

      [part="toggle"]::before {
        font-family: "vaadin-grid-tree-icons";
        line-height: 1em; /* make icon font metrics not affect baseline */
      }

      :host(:not([expanded])) [part="toggle"]::before {
        content: var(---collapsed-icon);
      }

      :host([expanded]) [part="toggle"]::before {
        content: "\\e7bc\\00a0"; /* icon glyph + single non-breaking space */
      }

      :host([leaf]) [part="toggle"] {
        visibility: hidden;
      }
    </style>

    <span id="level-spacer"></span>
    <span part="toggle"></span>
    <slot></slot>
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",(e=>this._onClick(e)))}_onClick(e){this.leaf||wd(e.target)||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.updateStyles({"---level":t}),this._debouncerUpdateLevel=cs.debounce(this._debouncerUpdateLevel,co,(()=>this.updateStyles({"---level":t})))}}customElements.define(vc.is,vc);class wc extends Wd{static get template(){return fl`
    <template id="template">
      <vaadin-grid-tree-toggle leaf="[[__isLeafItem(item, itemHasChildrenPath)]]" expanded="{{expanded}}" level="[[level]]">
        [[__getToggleContent(path, item)]]
      </vaadin-grid-tree-toggle>
    </template>
`}static get is(){return"vaadin-grid-tree-column"}static get properties(){return{path:String,itemHasChildrenPath:{type:String,value:"children"}}}_prepareBodyTemplate(){const e=this._prepareTemplatizer(this.$.template);return e.templatizer.dataHost=this,e}__isLeafItem(e,t){return!(e&&e[t])}__getToggleContent(e,t){return e&&this.get(e,t)}}customElements.define(wc.is,wc);const Ac=fl`<dom-module id="material-grid" theme-for="vaadin-grid">
  <template>
    <style>
      :host {
        background-color: var(--material-background-color);
        font-family: var(--material-font-family);
        font-size: var(--material-small-font-size);
        line-height: 20px;
        color: var(--material-body-text-color);
      }

      [part~="cell"] {
        min-height: 48px;
        -webkit-tap-highlight-color: transparent;
      }

      [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        padding: 8px 16px;
      }

      [part~="details-cell"] ::slotted(vaadin-grid-cell-content) {
        padding: 14px 16px;
      }

      [part~="header-cell"],
      [part~="footer-cell"] {
        background-color: var(--material-background-color);
        color: var(--material-secondary-text-color);
        font-size: var(--material-caption-font-size);
        font-weight: 500;
      }

      /* Header and footer divider between body rows */

      [part~="body-cell"],
      [part~="details-cell"],
      [part~="row"]:last-child > [part~="header-cell"] {
        border-bottom: 1px solid var(--material-divider-color);
      }

      [part~="row"]:first-child > [part~="footer-cell"] {
        border-top: 1px solid var(--material-divider-color);
      }

      /* Body rows/cells */

      [part~="body-cell"] {
        background-color: var(--material-background-color);
      }

      [part~="row"]:hover > [part~="body-cell"] {
        background: linear-gradient(var(--_material-grid-row-hover-background-color, rgba(0, 0, 0, 0.04)), var(--_material-grid-row-hover-background-color, rgba(0, 0, 0, 0.04))) var(--material-background-color);
      }

      @media (hover: none) {
        [part~="row"]:hover > [part~="body-cell"] {
          background: var(--material-background-color);
        }
      }

      /* Selected row */

      [part~="body-cell"]::before {
        content: "";
        pointer-events: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--material-primary-color);
        opacity: 0;
        transition: opacity .1s cubic-bezier(.4, 0, .2, .1);
      }

      :host(:not([reordering])) [part~="row"][selected] > [part~="body-cell"]::before {
        opacity: var(--_material-grid-row-selected-overlay-opacity, .08);
      }

      [part~="body-cell"] ::slotted(vaadin-grid-cell-content) {
        /* NOTE(platosha): Raise cell content above background cell pseudo elements */
        position: relative;
      }

      /* Column reordering */

      :host([reordering]) [part~="cell"] {
        background: var(--material-secondary-background-color);
      }

      :host([reordering]) [part~="cell"][reorder-status="allowed"] {
        background: var(--material-background-color);
      }

      :host([reordering]) [part~="cell"][reorder-status="dragging"] {
        background: var(--material-background-color);
      }

      /* Frozen columns */

      [part~="cell"][last-frozen] {
        border-right: 1px solid var(--material-divider-color);
      }

      /* Column resizing */

      [part~="cell"]:not([last-frozen]) [part="resize-handle"] {
        border-right: 1px solid var(--material-divider-color);
      }

      /* Keyboard navigation */

      [part~="cell"]:focus {
        outline: none;
      }

      :host([navigating]) [part~="cell"]:focus {
        box-shadow: inset 0 0 0 2px var(--material-primary-color);
      }

      /* Drag and Drop styles */
      :host([dragover])::after {
        content: "";
        position: absolute;
        z-index: 100;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        box-shadow: inset 0 0 0 2px var(--material-primary-color);
      }

      [part~="row"][dragover] {
        z-index: 100 !important;
      }

      [part~="row"][dragover] [part~="cell"] {
        overflow: visible;
      }

      [part~="row"][dragover] [part~="cell"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 3px;
        pointer-events: none;
        background: var(--material-primary-color);
      }

      [part~="row"][dragover="below"] [part~="cell"]::after {
        top: 100%;
        bottom: auto;
        margin-top: -1px;
      }

      [part~="row"][dragover="above"] [part~="cell"]::after {
        top: auto;
        bottom: 100%;
        margin-bottom: -1px;
      }

      [part~="row"][details-opened][dragover="below"] [part~="cell"]:not([part~="details-cell"])::after,
      [part~="row"][details-opened][dragover="above"] [part~="details-cell"]::after {
        display: none;
      }

      [part~="row"][dragover][dragover="on-top"] [part~="cell"]::after {
        height: 100%;
        opacity: 0.5;
      }

      [part~="row"][dragstart] {
        /* Add bottom-space to the row so the drag number doesn't get clipped. Needed for IE/Edge */
        border-bottom: 100px solid transparent;
        z-index: 100 !important;
        opacity: 0.9;
      }

      [part~="row"][dragstart] [part~="cell"] {
        border: none !important;
        box-shadow: none !important;
      }

      [ios] [part~="row"][dragstart] [part~="cell"] {
        background: var(--material-primary-color);
      }

      #scroller:not([ios]) [part~="row"][dragstart]:not([dragstart=""])::after {
        display: block;
        position: absolute;
        left: var(--_grid-drag-start-x);
        top: var(--_grid-drag-start-y);
        z-index: 100;
        content: attr(dragstart);
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 4px;
        color: var(--material-primary-contrast-color);
        background-color: var(--material-error-color);
        min-width: 24px;
        border-radius: 2px;
        font-size: var(--material-caption-font-size);
        text-align: center;
        line-height: 1;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part~="cell"][last-frozen] {
        border-right: none;
        border-left: 1px solid var(--material-divider-color);
      }

      :host([dir="rtl"]) [part~="cell"]:not([last-frozen]) [part="resize-handle"] {
        border-right: none;
        border-left: 1px solid var(--material-divider-color);
      }

      :host([dir="rtl"]) #scroller:not([ios]) [part~="row"][dragstart]:not([dragstart=""])::after {
        left: auto;
        right: var(--_grid-drag-start-x);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(Ac.content);const xc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Cc=["January","February","March","April","May","June","July","August","September","October","November","December"];function Sc(e){return`0${e}`.slice(-2)}function Ec(e,t){const i=e.getDay(),r=e.getDate(),n=e.getMonth(),o=e.getFullYear(),s=e.getHours(),a=e.getMinutes(),l=e.getSeconds();return t.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g,(function(t){let d;switch(t[1]){case"%":return"%";case"a":return xc[i].slice(0,3);case"A":return xc[i];case"b":return Cc[n].slice(0,3);case"B":return Cc[n];case"c":return e.toString();case"d":return Sc(r);case"e":return String(r);case"H":return Sc(s);case"I":return Sc(Ec(e,"%l"));case"l":return String(0===s||12===s?12:(s+12)%12);case"m":return Sc(n+1);case"M":return Sc(a);case"p":return s>11?"PM":"AM";case"P":return s>11?"pm":"am";case"S":return Sc(l);case"w":return String(i);case"y":return Sc(o%100);case"Y":return String(o);case"Z":return d=e.toString().match(/\((\w+)\)$/),d?d[1]:"";case"z":return d=e.toString().match(/\w([+-]\d\d\d\d) /),d?d[1]:""}return""}))}function Tc(e){let t;return function(){if(t)return t;if("Intl"in window)try{return t=new Intl.DateTimeFormat(void 0,e),t}catch(e){if(!(e instanceof RangeError))throw e}}}let Pc=null;const Ic=Tc({day:"numeric",month:"short"});function kc(){if(null!==Pc)return Pc;const e=Ic();if(e){const t=e.format(new Date(0));return Pc=!!t.match(/^\d/),Pc}return!1}let Oc=null;const Rc=Tc({day:"numeric",month:"short",year:"numeric"});function Nc(e){const t=e.closest("[lang]");return t instanceof HTMLElement&&t.lang?t.lang:"default"}const zc=new WeakMap;class Dc extends HTMLElement{static get observedAttributes(){return["datetime","day","format","lang","hour","minute","month","second","title","weekday","year","time-zone-name"]}connectedCallback(){const e=this.getFormattedTitle();e&&!this.hasAttribute("title")&&this.setAttribute("title",e);const t=this.getFormattedDate();t&&(this.textContent=t)}attributeChangedCallback(e,t,i){const r=this.getFormattedTitle();if("datetime"===e){const e=Date.parse(i);isNaN(e)?zc.delete(this):zc.set(this,new Date(e))}const n=this.getFormattedTitle(),o=this.getAttribute("title");"title"===e||!n||o&&o!==r||this.setAttribute("title",n);const s=this.getFormattedDate();s&&(this.textContent=s)}get date(){return zc.get(this)}getFormattedTitle(){const e=this.date;if(!e)return;const t=Mc();if(t)return t.format(e);try{return e.toLocaleString()}catch(t){if(t instanceof RangeError)return e.toString();throw t}}getFormattedDate(){}}const Mc=Tc({day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"}),Lc=new WeakMap;class Fc extends Dc{attributeChangedCallback(e,t,i){"hour"!==e&&"minute"!==e&&"second"!==e&&"time-zone-name"!==e||Lc.delete(this),super.attributeChangedCallback(e,t,i)}getFormattedDate(){const e=this.date;if(!e)return;const t=function(e,t){const i={weekday:{short:"%a",long:"%A"},day:{numeric:"%e","2-digit":"%d"},month:{short:"%b",long:"%B"},year:{numeric:"%Y","2-digit":"%y"}};let r=kc()?"weekday day month year":"weekday month day, year";for(const t in i){const n=i[t][e.getAttribute(t)||""];r=r.replace(t,n||"")}return r=r.replace(/(\s,)|(,\s$)/,""),Ec(t,r).replace(/\s+/," ").trim()}(this,e)||"",i=function(e,t){const i={},r=e.getAttribute("hour");"numeric"!==r&&"2-digit"!==r||(i.hour=r);const n=e.getAttribute("minute");"numeric"!==n&&"2-digit"!==n||(i.minute=n);const o=e.getAttribute("second");"numeric"!==o&&"2-digit"!==o||(i.second=o);const s=e.getAttribute("time-zone-name");"short"!==s&&"long"!==s||(i.timeZoneName=s);if(0===Object.keys(i).length)return;let a=Lc.get(e);a||(a=Tc(i),Lc.set(e,a));const l=a();if(l)return l.format(t);return Ec(t,i.second?"%H:%M:%S":"%H:%M")}(this,e)||"";return`${t} ${i}`.trim()}}window.customElements.get("local-time")||(window.LocalTimeElement=Fc,window.customElements.define("local-time",Fc));class Hc{constructor(e,t){this.date=e,this.locale=t}toString(){const e=this.timeElapsed();if(e)return e;{const e=this.timeAhead();return e||`on ${this.formatDate()}`}}timeElapsed(){const e=(new Date).getTime()-this.date.getTime(),t=Math.round(e/1e3),i=Math.round(t/60),r=Math.round(i/60),n=Math.round(r/24);return e>=0&&n<30?this.timeAgoFromMs(e):null}timeAhead(){const e=this.date.getTime()-(new Date).getTime(),t=Math.round(e/1e3),i=Math.round(t/60),r=Math.round(i/60),n=Math.round(r/24);return e>=0&&n<30?this.timeUntil():null}timeAgo(){const e=(new Date).getTime()-this.date.getTime();return this.timeAgoFromMs(e)}timeAgoFromMs(e){const t=Math.round(e/1e3),i=Math.round(t/60),r=Math.round(i/60),n=Math.round(r/24),o=Math.round(n/30),s=Math.round(o/12);return e<0||t<10?$c(this.locale,0,"second"):t<45?$c(this.locale,-t,"second"):t<90||i<45?$c(this.locale,-i,"minute"):i<90||r<24?$c(this.locale,-r,"hour"):r<36||n<30?$c(this.locale,-n,"day"):o<18?$c(this.locale,-o,"month"):$c(this.locale,-s,"year")}microTimeAgo(){const e=(new Date).getTime()-this.date.getTime(),t=Math.round(e/1e3),i=Math.round(t/60),r=Math.round(i/60),n=Math.round(r/24),o=Math.round(n/30),s=Math.round(o/12);return i<1?"1m":i<60?`${i}m`:r<24?`${r}h`:n<365?`${n}d`:`${s}y`}timeUntil(){const e=this.date.getTime()-(new Date).getTime();return this.timeUntilFromMs(e)}timeUntilFromMs(e){const t=Math.round(e/1e3),i=Math.round(t/60),r=Math.round(i/60),n=Math.round(r/24),o=Math.round(n/30),s=Math.round(o/12);return o>=18||o>=12?$c(this.locale,s,"year"):n>=45||n>=30?$c(this.locale,o,"month"):r>=36||r>=24?$c(this.locale,n,"day"):i>=90||i>=45?$c(this.locale,r,"hour"):t>=90||t>=45?$c(this.locale,i,"minute"):$c(this.locale,t>=10?t:0,"second")}microTimeUntil(){const e=this.date.getTime()-(new Date).getTime(),t=Math.round(e/1e3),i=Math.round(t/60),r=Math.round(i/60),n=Math.round(r/24),o=Math.round(n/30),s=Math.round(o/12);return n>=365?`${s}y`:r>=24?`${n}d`:i>=60?`${r}h`:i>1?`${i}m`:"1m"}formatDate(){let e=kc()?"%e %b":"%b %e";var t;return t=this.date,(new Date).getUTCFullYear()!==t.getUTCFullYear()&&(e+=function(){if(null!==Oc)return Oc;const e=Rc();if(e){const t=e.format(new Date(0));return Oc=!!t.match(/\d,/),Oc}return!0}()?", %Y":" %Y"),Ec(this.date,e)}formatTime(){const e=Bc();return e?e.format(this.date):Ec(this.date,"%l:%M%P")}}function $c(e,t,i){const r=function(e,t){if("Intl"in window&&"RelativeTimeFormat"in window.Intl)try{return new Intl.RelativeTimeFormat(e,t)}catch(e){if(!(e instanceof RangeError))throw e}}(e,{numeric:"auto"});return r?r.format(t,i):function(e,t){if(0===e)switch(t){case"year":case"quarter":case"month":case"week":return`this ${t}`;case"day":return"today";case"hour":case"minute":return`in 0 ${t}s`;case"second":return"now"}else if(1===e)switch(t){case"year":case"quarter":case"month":case"week":return`next ${t}`;case"day":return"tomorrow";case"hour":case"minute":case"second":return`in 1 ${t}`}else if(-1===e)switch(t){case"year":case"quarter":case"month":case"week":return`last ${t}`;case"day":return"yesterday";case"hour":case"minute":case"second":return`1 ${t} ago`}else if(e>1)switch(t){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":return`in ${e} ${t}s`}else if(e<-1)switch(t){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":return`${-e} ${t}s ago`}throw new RangeError(`Invalid unit argument for format() '${t}'`)}(t,i)}const Bc=Tc({hour:"numeric",minute:"2-digit"});class Uc extends Dc{getFormattedDate(){const e=this.date;if(e)return new Hc(e,Nc(this)).toString()}connectedCallback(){Vc.push(this),Gc||(qc(),Gc=window.setInterval(qc,6e4)),super.connectedCallback()}disconnectedCallback(){const e=Vc.indexOf(this);-1!==e&&Vc.splice(e,1),Vc.length||Gc&&(clearInterval(Gc),Gc=null)}}const Vc=[];let Gc;function qc(){let e,t,i;for(t=0,i=Vc.length;t<i;t++)e=Vc[t],e.textContent=e.getFormattedDate()||""}window.customElements.get("relative-time")||(window.RelativeTimeElement=Uc,window.customElements.define("relative-time",Uc));class jc extends Uc{getFormattedDate(){const e=this.getAttribute("format"),t=this.date;if(t)return"micro"===e?new Hc(t,Nc(this)).microTimeAgo():new Hc(t,Nc(this)).timeAgo()}}window.customElements.get("time-ago")||(window.TimeAgoElement=jc,window.customElements.define("time-ago",jc));class Wc extends Uc{getFormattedDate(){const e=this.getAttribute("format"),t=this.date;if(t)return"micro"===e?new Hc(t,Nc(this)).microTimeUntil():new Hc(t,Nc(this)).timeUntil()}}window.customElements.get("time-until")||(window.TimeUntilElement=Wc,window.customElements.define("time-until",Wc));const Yc=new He({type:"WINDOW",source:window.parent}),Jc=["qort","btc","ltc","doge"];window.customElements.define("multi-wallet",class extends ee{static get properties(){return{loading:{type:Boolean},transactions:{type:Object},lastBlock:{type:Object},selectedTransaction:{type:Object},isTextMenuOpen:{type:Boolean},wallets:{type:Map},_selectedWallet:"qort",balanceString:"Fetching balance ..."}}static get styles(){return[Z`
				#pages {
					display: flex;
					flex-wrap: wrap;
					/* margin: 20px; */
					padding: 10px 5px 5px 5px;
					margin: 0px 20px 20px 20px;
				}

				#pages > button {
					user-select: none;
					padding: 5px;
					margin: 0 5px;
					border-radius: 10%;
					border: 0;
					background: transparent;
					font: inherit;
					outline: none;
					cursor: pointer;
				}

				#pages > button:not([disabled]):hover,
				#pages > button:focus {
					color: #ccc;
					background-color: #eee;
				}

				#pages > button[selected] {
					font-weight: bold;
					color: white;
					background-color: #ccc;
				}

				#pages > button[disabled] {
					opacity: 0.5;
					cursor: default;
				}
				.red {
					color: var(--paper-red-500);
				}
				.green {
					color: var(--paper-green-500);
				}
				paper-spinner-lite {
					height: 75px;
					width: 75px;
					--paper-spinner-color: var(--primary-color);
					--paper-spinner-stroke-width: 2px;
				}
				.unconfirmed {
					font-style: italic;
				}
				.roboto {
					font-family: 'Roboto', sans-serif;
				}
				.mono {
					font-family: 'Roboto Mono', monospace;
				}
				.weight-100 {
					font-weight: 100;
				}

				.text-white-primary {
					color: var(--white-primary);
				}
				.text-white-secondary {
					color: var(--white-secondary);
				}
				.text-white-disabled {
					color: var(--white-disabled);
				}
				.text-white-hint {
					color: var(--white-divider);
				}

				table {
					border: none;
				}
				table td,
				th {
					white-space: nowrap;
					/* padding:10px; */
					text-align: left;
					font-size: 14px;
					padding: 0 12px;
					font-family: 'Roboto', sans-serif;
				}
				table tr {
					height: 48px;
				}
				table tr:hover td {
					background: #eee;
				}
				table tr th {
					color: #666;
					font-size: 12px;
				}
				table tr td {
					margin: 0;
				}
				.white-bg {
					height: 100vh;
					background: #fff;
				}
				span {
					font-size: 18px;
					word-break: break-all;
				}
				.title {
					font-weight: 600;
					font-size: 12px;
					line-height: 32px;
					opacity: 0.66;
				}
				#transactionList {
					padding: 0;
				}
				#transactionList > * {
					/* padding-left:24px;
                padding-right:24px; */
				}
				.color-in {
					color: #02977e;
					background-color: rgba(0, 201, 167, 0.2);
					font-weight: 700;
					font-size: 0.60938rem;
					border-radius: 0.25rem !important;
					padding: 0.2rem 0.5rem;
					margin-left: 4px;
				}
				.color-out {
					color: #b47d00;
					background-color: rgba(219, 154, 4, 0.2);
					font-weight: 700;
					font-size: 0.60938rem;
					border-radius: 0.25rem !important;
					padding: 0.2rem 0.5rem;
					margin-left: 4px;
				}
				* {
					box-sizing: border-box;
				}

				body {
					margin: 0;
					padding: 0;
					background: white;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				h2 {
					margin: 0;
					font-weight: 400;
					color: #707584;
					font: 24px/24px 'Open Sans', sans-serif;
				}

				h3 {
					margin: 0 0 5px;
					font-weight: 600;
					font-size: 18px;
					line-height: 18px;
				}

				/* Styles for Larger Screen Sizes */
				@media (min-width: 765px) {
					.wrapper {
						display: grid;
						grid-template-columns: 0.5fr 3.5fr;
					}
				}

				.wrapper {
					margin: 0 auto;
					height: 100%;
					overflow: hidden;
					border-radius: 8px;
					background-color: #fff;
				}

				.wallet {
					width: 170px;
					height: 100vh;
					border-top-left-radius: inherit;
					border-bottom-left-radius: inherit;
    				border-right: 1px solid #eee;
				}

				.transactions-wrapper {
					width: 100%;
					padding: 50px 0 0 0;
					height: 100%;
				}

				.wallet-header {
					margin: 0 20px;
				}

				.wallet-address {
					display: flex;
					align-items: center;
					font-size: 18px; 
					color: var(--mdc-theme-primary, #444750); 
					margin: 4px 0 20px;
				}

				.wallet-balance {
					display: inline-block;
					font-weight: 600;
					font-size: 32px;
					color: var(--mdc-theme-primary, #444750); 
				}

				#transactions {
					margin-top: 60px;
					margin-left: 20px;
					margin-right: 20px;
					border-top: 1px solid #e5e5e5;
					padding-top: 0px;
					height: 100%;
					/* overflow: auto; */
				}

				.show {
					animation: fade-in 0.3s 1;
				}

				.transaction-item {
					display: flex;
					justify-content: space-between;
					position: relative;
					padding-left: 40px;
					margin-bottom: 45px;
					margin-right: 50px;
				}
				.transaction-item::before {
					position: absolute;
					content: '';
					border: 2px solid #e1e1e1;
					border-radius: 50%;
					height: 25px;
					width: 25px;
					left: 0;
					top: 10px;
					box-sizing: border-box;
					vertical-align: middle;
					color: #666666;
				}

				.credit::before {
					content: '+';
					font-size: 25px;
					line-height: 19px;
					padding: 0 4px 0;
				}

				.debit::before {
					content: '-';
					font-size: 20px;
					line-height: 21px;
					padding: 0 5px;
				}

				.transaction-item .details {
					font-size: 14px;
					line-height: 14px;
					color: #999;
				}

				.transaction-item_details {
					width: 270px;
				}

				.transaction-item_amount .amount {
					font-weight: 600;
					font-size: 18px;
					line-height: 45px;
					position: relative;
					margin: 0;
					display: inline-block;
				}

				.currency-box {
				  display: flex;
					background-color: #fff;
					text-align: center;
					padding: 12px;
					cursor: pointer;
					transition: 0.1s ease-in-out;
				}
				.currency-box:not(:last-child) {
				  border-bottom: 1px solid #eee;
				}

				.active {
				  background: #ddd;
				}

				.currency-image {
					display: inline-block;
					height: 42px;
					width: 42px;
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 3px;
    			filter: grayscale(100%);
				}
				.currency-box.active .currency-image,
				.currency-box:hover .currency-image {
				  filter: none;
				}
				.currency-box:hover {
				  background: #bbb;
				}
				.currency-box.active,
				.currency-box:hover .currency-text {
				  font-weight: 500;
				}				
				
				.currency-text {
				  margin: auto 0;
				  margin-left: 8px;
					font-size: 20px;
					color: #777;
				}

				.qort .currency-image {
					background-image: url('/img/qort.png');
				}

				.btc .currency-image {
					background-image: url('/img/btc.png');
				}

				.ltc .currency-image {
					background-image: url('/img/ltc.png');
				}

				.doge .currency-image {
					background-image: url('/img/doge.png');
				}

				.card-list {
					margin-top: 20px;
				}

				.card-list .currency-image {
					cursor: pointer;
					margin-right: 15px;
					transition: 0.1s;
				}

				.card-list .currency-image:hover {
					transform: scale(1.1);
				}

				/* animations */
				@keyframes fade-in {
					0% {
						opacity: 0;
					}
					100% {
						opacity: 1;
					}
				}

				/* media queries */
				@media (max-width: 863px) {
					.wallet {
						width: 100%;
						height: max-content;
						border-top-right-radius: inherit;
						padding-bottom: 25px;
					}
					.cards {
						margin-top: 25px;
					}
					.currency-box:nth-of-type(2) {
						margin-right: 0;
					}
				}

				@media (max-width: 764px) {
					.wallet {
						width: 100%;
						height: max-content;
						border-top-right-radius: inherit;
						padding-bottom: 25px;
					}
					.cards {
						margin-top: 25px;
					}
					.currency-box {
						width: calc(50% - 25px);
						max-width: 260px;
						display: inline-block;
						margin-right: 25px;
						margin-bottom: 25px;
					}
					.currency-box:nth-of-type(2) {
						margin-right: 0;
					}
				}

				@media (max-width: 530px) {
					h3 {
						line-height: 24px;
					}
					.cards {
						text-align: center;
					}
					.currency-box {
						width: calc(100% - 25px);
						max-width: 260px;
					}
					.currency-box:nth-of-type(2) {
						margin-right: 25px;
					}
					.currency-box:last-of-type {
						margin-bottom: 0;
					}
					.wallet-balance {
						font-size: 22px;
					}
				}

				@media (max-width: 390px) {
					.wallet {
						height: max-content;
						padding: 50px 25px;
					}
					.transactions-wrapper {
						padding: 50px 25px;
					}
					h2 {
						font: 18px/24px 'Open Sans', sans-serif;
					}
				}
			`]}constructor(){super(),this.lastBlock={height:0},this.selectedTransaction={},this.isTextMenuOpen=!1,this.loading=!0,this.selectWallet=this.selectWallet.bind(this),this.wallets=new Map;let e={balance:0,wallet:null,transactions:[],fetchingWalletBalance:!1,fetchingWalletTransactions:!1};Jc.forEach(((t,i)=>{this.wallets.set(t,{...e})}),this),this.wallets.get("qort").wallet=window.parent.reduxStore.getState().app.selectedAddress,this.wallets.get("btc").wallet=window.parent.reduxStore.getState().app.selectedAddress.btcWallet,this.wallets.get("ltc").wallet=window.parent.reduxStore.getState().app.selectedAddress.ltcWallet,this.wallets.get("doge").wallet=window.parent.reduxStore.getState().app.selectedAddress.dogeWallet,this._selectedWallet="qort",Yc.ready().then((()=>{Yc.subscribe("selected_address",(async e=>{(e=JSON.parse(e))&&0!==Object.entries(e).length&&(this.wallets.get("qort").wallet=e,this.wallets.get("btc").wallet=window.parent.reduxStore.getState().app.selectedAddress.btcWallet,this.wallets.get("ltc").wallet=window.parent.reduxStore.getState().app.selectedAddress.ltcWallet,this.wallets.get("doge").wallet=window.parent.reduxStore.getState().app.selectedAddress.dogeWallet)})),Yc.subscribe("copy_menu_switch",(async e=>{"false"===e&&!0===this.isTextMenuOpen&&(this.clearSelection(),this.isTextMenuOpen=!1)}))}))}render(){return L`
			<div class="wrapper">
				<div class="wallet">
					<div style="font-size: 20px; color: #777; padding: 16px; border-bottom: 1px solid #eee;">Wallets</div>
					<div class="cards">
						<div coin="qort" class="currency-box qort active">
							<div class="currency-image"></div>
							<div class="currency-text">Qort</div>
						</div>
						<div coin="btc" class="currency-box btc">
							<div class="currency-image"></div>
							<div class="currency-text">Bitcoin</div>
						</div>
						<div coin="ltc" class="currency-box ltc">
							<div class="currency-image"></div>
							<div class="currency-text">Litecoin</div>
						</div>
						<div coin="doge" class="currency-box doge">
							<div class="currency-image"></div>
							<div class="currency-text">Dogecoin</div>
						</div>
					</div>
				</div>

				<div class="transactions-wrapper">
					<h2 class="wallet-header">
						Current Wallet
						<div class="wallet-address">
							<span>${this.getSelectedWalletAddress()}</span>
							<button-icon-copy 
								title="Copy wallet address to clipboard"
								onSuccessMessage="Address copied to clipboard"
								onErrorMessage="Unable to copy address"
								textToCopy=${this.getSelectedWalletAddress()}
								buttonSize="28px"
								iconSize="16px"
								color="#707584"
								offsetLeft="4px"
							>
							</button-icon-copy> 
						</div>
						<span class="wallet-balance">${this.balanceString}</span>
					</h2>
					<div id="transactions">
						${this.loading?L`<paper-spinner-lite style="display: block; margin: 0 auto;" active></paper-spinner-lite>`:""}
						<div id="transactionsDOM"></div>
					</div>
				</div>

				<div>
					<mwc-dialog id="showTransactionDetailsDialog" scrimClickAction="${this.showTransactionDetailsLoading?"":"close"}">
						<div style="text-align:center">
							<h1>Transaction Details</h1>
							<hr />
						</div>
						<div id="transactionList">
							<span class="title"> Transaction Type </span>
							<br />
							<div>
								<span class="">${this.selectedTransaction.type}</span>
								${"OUT"===this.selectedTransaction.txnFlow?L`<span class="color-out">OUT</span>`:L`<span class="color-in">IN</span>`}
							</div>
							<span class="title">Sender</span>
							<br />
							<div><span class="">${this.selectedTransaction.creatorAddress}</span></div>
							<span class="title">Receiver</span>
							<br />
							<div><span class="">${this.selectedTransaction.recipient}</span></div>
							${this.selectedTransaction.amount?L`
										<span class="title">Amount</span>
										<br />
										<div><span class="">${this.selectedTransaction.amount} QORT</span></div>
								  `:""}
							<span class="title"> Transaction Fee </span>
							<br />
							<div><span class="">${this.selectedTransaction.fee}</span></div>

							<span class="title">Block</span>
							<br />
							<div><span class="">${this.selectedTransaction.blockHeight}</span></div>

							<span class="title">Time</span>
							<br />
							<div><span class="">${new Date(this.selectedTransaction.timestamp).toString()}</span></div>

							<span class="title"> Transaction Signature </span>
							<br />
							<div><span class="">${this.selectedTransaction.signature}</span></div>
						</div>
					</mwc-dialog>
				</div>
			</div>
		`}getSelectedWalletAddress(){return this._selectedWallet,this.wallets.get(this._selectedWallet).wallet.address}async getTransactionGrid(e){this.transactionsGrid=this.shadowRoot.querySelector(`#${e}TransactionsGrid`),"qort"===e&&this.transactionsGrid.addEventListener("click",(e=>{let t=this.transactionsGrid.getEventContext(e).item;this.showTransactionDetails(t,this.wallets.get(this._selectedWallet).transactions)}),{passive:!0}),this.pagesControl=this.shadowRoot.querySelector("#pages"),this.pages=void 0}async renderTransactions(){"qort"===this._selectedWallet?Ae(this.renderQortTransactions(this.wallets.get(this._selectedWallet).transactions,this._selectedWallet),this.transactionsDOM):Ae(this.renderBTCLikeTransactions(this.wallets.get(this._selectedWallet).transactions,this._selectedWallet),this.transactionsDOM)}renderQortTransactions(e,t){const i=window.parent.reduxStore.getState().app.blockInfo.height;return Array.isArray(e)&&(e=e.map((e=>(e.confirmations=i-(e.blockHeight-1)||"",e)))),L`
			<dom-module id="vaadin-grid-qort-theme" theme-for="vaadin-grid">
				<template>
					<style>
						:host([theme~="qort"]) table thead tr > th:first-of-type,
						:host([theme~="qort"]) table tbody tr > td:first-of-type {
							min-width: 56px;
							max-width: 56px;
							padding: 4px 0;
						}
					</style>
				</template>
			</dom-module>
			<div style="padding-left:12px;" ?hidden="${!this.isEmptyArray(e)}">Address has no transactions yet.</div>
			<vaadin-grid theme="${t}" id="${t}TransactionsGrid" ?hidden="${this.isEmptyArray(this.wallets.get(this._selectedWallet).transactions)}" page-size="20" height-by-rows>
				<vaadin-grid-column
					auto-width
					.renderer=${(e,t,r)=>{if(!i)return Ae(L``,e);const n=r.item.confirmations>=3;Ae(n?L`<mwc-icon title="${r.item.confirmations} Confirmations" style="color: #00C851">check</mwc-icon>`:L`<mwc-icon title="${r.item.confirmations||0}/${3} Confirmations" style="color: #777">schedule</mwc-icon>`,e)}}
				>
				</vaadin-grid-column>
				<vaadin-grid-column
					auto-width
					resizable
					header="Type"
					.renderer=${(e,t,i)=>{Ae(L` ${i.item.type} ${i.item.creatorAddress===this.wallets.get("qort").wallet.address?L`<span class="color-out">OUT</span>`:L`<span class="color-in">IN</span>`} `,e)}}
				>
				</vaadin-grid-column>
				<vaadin-grid-column auto-width resizable header="Sender" path="creatorAddress"></vaadin-grid-column>
				<vaadin-grid-column auto-width resizable header="Receiver" path="recipient"></vaadin-grid-column>
				<vaadin-grid-column auto-width resizable path="fee"></vaadin-grid-column>
				<vaadin-grid-column auto-width resizable path="amount"></vaadin-grid-column>
				<vaadin-grid-column
					auto-width
					resizable
					header="Time"
					.renderer=${(e,t,i)=>{const r=new Date(i.item.timestamp);Ae(L` <time-ago datetime=${r.toISOString()}> </time-ago> `,e)}}
				>
				</vaadin-grid-column>
			</vaadin-grid>
			<div id="pages"></div>
		`}renderBTCLikeTransactions(e,t){return L`
			<div style="padding-left:12px;" ?hidden="${!this.isEmptyArray(e)}">Address has no transactions yet.</div>
			<vaadin-grid id="${t}TransactionsGrid" ?hidden="${this.isEmptyArray(this.wallets.get(this._selectedWallet).transactions)}" page-size="20" height-by-rows>
				<vaadin-grid-column auto-width resizable header="Transaction Hash" path="txHash"></vaadin-grid-column>
				<vaadin-grid-column
					auto-width
					resizable
					header="Total Amount"
					.renderer=${(e,t,i)=>{const r=(Number(i.item.totalAmount)/1e8).toFixed(8);Ae(L`${r}`,e)}}
				>
				</vaadin-grid-column>
				<vaadin-grid-column
					auto-width
					resizable
					header="Time"
					.renderer=${(e,t,i)=>{const r=new Date(1e3*i.item.timestamp);Ae(L` <time-ago datetime=${r.toISOString()}> </time-ago> `,e)}}
				>
				</vaadin-grid-column>
			</vaadin-grid>
			<div id="pages"></div>
		`}async updateItemsFromPage(e,t=!1){if(void 0===e)return;if(!0===t&&(this.pagesControl.innerHTML=""),!this.pages){this.pages=Array.apply(null,{length:Math.ceil(this.wallets.get(this._selectedWallet).transactions.length/this.transactionsGrid.pageSize)}).map(((e,t)=>t+1));const t=document.createElement("button");t.textContent="<",t.addEventListener("click",(()=>{const e=parseInt(this.pagesControl.querySelector("[selected]").textContent);this.updateItemsFromPage(e-1)})),this.pagesControl.appendChild(t),this.pages.forEach((t=>{const i=document.createElement("button");i.textContent=t,i.addEventListener("click",(e=>{this.updateItemsFromPage(parseInt(e.target.textContent))})),t===e&&i.setAttribute("selected",!0),this.pagesControl.appendChild(i)}));const i=window.document.createElement("button");i.textContent=">",i.addEventListener("click",(()=>{const e=parseInt(this.pagesControl.querySelector("[selected]").textContent);this.updateItemsFromPage(e+1)})),this.pagesControl.appendChild(i)}const i=Array.from(this.pagesControl.children);i.forEach(((t,r)=>{parseInt(t.textContent)===e?t.setAttribute("selected",!0):t.removeAttribute("selected"),0===r&&(1===e?t.setAttribute("disabled",""):t.removeAttribute("disabled")),r===i.length-1&&(e===this.pages.length?t.setAttribute("disabled",""):t.removeAttribute("disabled"))}));let r=(e-1)*this.transactionsGrid.pageSize,n=e*this.transactionsGrid.pageSize;this.transactionsGrid.items=this.wallets.get(this._selectedWallet).transactions.slice(r,n)}_textMenu(e){const t=()=>{var e="";return void 0!==window.getSelection?e=window.getSelection().toString():void 0!==this.shadowRoot.selection&&"Text"==this.shadowRoot.selection.type&&(e=this.shadowRoot.selection.createRange().text),e};(()=>{let i=t();if(i&&"string"==typeof i){let t={selectedText:i,eventObject:{pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY},isFrame:!0};Yc.request("openCopyTextMenu",t)}})()}clearSelection(){window.getSelection().removeAllRanges(),window.parent.getSelection().removeAllRanges()}transactionItem(e){return`\n            <div class='transaction-item ${e.type}'>\n                <div class='transaction-item_details'>\n                    <h3>${e.name}</h3>\n                    <span class='details'>${e.category} ${e.ID} - ${e.date}</span>\n                </div>\n                <div class='transaction-item_amount'>\n                    <p class='amount'>${e.amount}</p>\n                </div>\n            </div>\n        `}firstUpdated(){this.currencyBoxes=this.shadowRoot.querySelectorAll(".currency-box"),this.transactionsDOM=this.shadowRoot.getElementById("transactionsDOM"),this.currencyBoxes.forEach((e=>{e.addEventListener("click",this.selectWallet)})),this.showWallet(),window.addEventListener("contextmenu",(e=>{e.preventDefault(),this.isTextMenuOpen=!0,this._textMenu(e)})),window.addEventListener("click",(()=>{this.isTextMenuOpen&&Yc.request("closeCopyTextMenu",null)})),window.onkeyup=e=>{27===e.keyCode&&Yc.request("closeCopyTextMenu",null)}}selectWallet(e){e.preventDefault();const t=e.currentTarget;t.classList.contains("active")||(this.currencyBoxes.forEach((e=>{e.classList.contains("active")&&e.classList.remove("active")})),t.classList.add("active"),this._selectedWallet=t.attributes.coin.value,this.showWallet())}async showWallet(){this.transactionsDOM.hidden=!0,this.loading=!0,"qort"==this._selectedWallet&&(window.parent.reduxStore.getState().app.blockInfo.height||await Yc.request("apiCall",{url:"/blocks/height",type:"api"}).then((e=>Yc.request("updateBlockInfo",{height:e}))));const e=this._selectedWallet;await this.fetchWalletDetails(this._selectedWallet),this._selectedWallet==e&&(await this.renderTransactions(),await this.getTransactionGrid(this._selectedWallet),await this.updateItemsFromPage(1,!0),this.loading=!1,this.transactionsDOM.hidden=!1)}async fetchWalletDetails(e){switch(this.balanceString="Fetching balance ...",e){case"qort":Yc.request("apiCall",{url:`/addresses/balance/${this.wallets.get("qort").wallet.address}`}).then((t=>{isNaN(Number(t))?Yc.request("showSnackBar","Failed to Fetch QORT Balance. Try again!"):this._selectedWallet==e&&(this.wallets.get(e).balance=t,this.balanceString=this.wallets.get(this._selectedWallet).balance+" "+this._selectedWallet.toLocaleUpperCase())}));const t=await Yc.request("apiCall",{url:`/transactions/search?address=${this.wallets.get("qort").wallet.address}&confirmationStatus=BOTH&reverse=true`});this._selectedWallet==e&&(this.wallets.get(e).transactions=t);break;case"btc":case"ltc":case"doge":const i=`${e}Wallet`;Yc.request("apiCall",{url:`/crosschain/${e}/walletbalance`,method:"POST",body:`${window.parent.reduxStore.getState().app.selectedAddress[i].derivedMasterPublicKey}`}).then((t=>{isNaN(Number(t))?Yc.request("showSnackBar",`Failed to Fetch ${e.toLocaleUpperCase()} Balance. Try again!`):this._selectedWallet==e&&(this.wallets.get(this._selectedWallet).balance=(Number(t)/1e8).toFixed(8),this.balanceString=this.wallets.get(this._selectedWallet).balance+" "+this._selectedWallet.toLocaleUpperCase())}));const r=(e,t)=>t.timestamp-e.timestamp,n=(await Yc.request("apiCall",{url:`/crosschain/${e}/wallettransactions`,method:"POST",body:`${window.parent.reduxStore.getState().app.selectedAddress[i].derivedMasterPublicKey}`})).sort(r);this._selectedWallet==e&&(this.wallets.get(this._selectedWallet).transactions=n)}}showTransactionDetails(e,t){t.forEach((t=>{if(e.signature===t.signature){let i=e.creatorAddress===this.wallets.get("qort").wallet.address?"OUT":"IN";this.selectedTransaction={...t,txnFlow:i},0!=this.selectedTransaction.signature.length&&this.shadowRoot.querySelector("#showTransactionDetailsDialog").show()}}))}isEmptyArray(e){return!e||0===e.length}floor(e){return e=parseFloat(e),isNaN(e)?0:this._format(Math.floor(e))}decimals(e){return(e=parseFloat(e))%1>0?(e+"").split(".")[1]:"0"}subtract(e,t){return e-t}getConfirmations(e,t){return t-e+1}_format(e){return e.toLocaleString()}textColor(e){return"light"===e?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.87)"}_unconfirmedClass(e){return e?"unconfirmed":""}})}));
