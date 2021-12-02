!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e=new Epml({type:"WINDOW",source:window.parent});let t,o;new Epml({type:"PROXY",source:{proxy:e,target:"visible-plugin",id:"core-plugin"}});let n,a,s,r=0,d=!1,i=!1,l=!1,c=!0,p=!1,u=0,m=!1,g=!1,w=!1;e.subscribe("logged_in",(e=>{w="true"===e}));const S=async()=>{const t=await e.request("apiCall",{url:"/admin/info"});e.request("updateNodeInfo",t)};let C,h=0;const T=()=>{t.close(),d=!0,n.close(),p=!0},O=t=>{e.request("updateBlockInfo",t)},f=async t=>{e.request("updateNodeStatus",t)},N=e=>{0==e.node||1==e.node?x():void 0!==n&&(n.close(),p=!0)},b=()=>{let n,a=window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node],i=a.domain+":"+a.port;n="https:"===window.parent.location.protocol?`wss://${i}/websockets/blocks`:`ws://${i}/websockets/blocks`;const p=new WebSocket(n);p.onopen=e=>{console.log("[SOCKET-BLOCKS]: Connected."),d=!1,t=p,r+=1},p.onmessage=t=>{O(JSON.parse(t.data)),w&&(async t=>{let o={names:await e.request("apiCall",{url:`/names/address/${t}`}),addressInfo:await e.request("apiCall",{url:`/addresses/${t}`})};!0!==window.parent._.isEqual(s,o)&&(e.request("setAccountInfo",o),s=o)})(window.parent.reduxStore.getState().app.selectedAddress.address)},p.onclose=()=>{console.log("[SOCKET-BLOCKS]: CLOSED"),O({}),c=!0,clearInterval(o),!1===d&&r<=52&&(r<=52?(l=!0,setTimeout(k,1e4),r+=1):l=!1)},p.onerror=e=>{console.log(`[SOCKET-BLOCKS]: ${e.type}`),c=!0,O({})},c&&e.request("apiCall",{url:"/blocks/last"}).then((e=>{O(e),c=!1}))},k=()=>{i?(i=!1,b(),o=setTimeout(k,295e3)):l?(l=!1,clearTimeout(o),b(),i=!0,o=setTimeout(k,295e3)):(t.send("non-integer ping"),o=setTimeout(k,295e3))},q=()=>{let e,t=window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node],o=t.domain+":"+t.port;e="https:"===window.parent.location.protocol?`wss://${o}/websockets/admin/status`:`ws://${o}/websockets/admin/status`;const s=new WebSocket(e);s.onopen=e=>{console.log("[SOCKET-NODE-STATUS]: Connected."),p=!1,n=s,u+=1},s.onmessage=e=>{f(JSON.parse(e.data))},s.onclose=()=>{console.log("[SOCKET-NODE-STATUS]: CLOSED"),f({}),clearInterval(a),!1===p&&u<=52&&(u<=52?(m=!0,setTimeout(x,1e4),u+=1):m=!1)},s.onerror=e=>{console.log(`[SOCKET-NODE-STATUS]: ${e.type}`),f({})}},x=()=>{g?(clearTimeout(a),q(),g=!1,a=setTimeout(x,295e3)):m?(m=!1,clearTimeout(a),q(),a=setTimeout(x,295e3)):(n.send("non-integer ping"),a=setTimeout(x,295e3))},E=e=>[...e.groups.map((e=>0===e.groupId?{groupId:e.groupId,url:`group/${e.groupId}`,groupName:"Qortal General Chat",sender:e.sender,senderName:e.senderName,timestamp:void 0===e.timestamp?1:e.timestamp}:{...e,url:`group/${e.groupId}`})),...e.direct.map((e=>({...e,url:`direct/${e.address}`})))];let y=0;const $=t=>{let o=`${window.parent.reduxStore.getState().app.selectedAddress.address.substr(0,10)}_chat-heads`;try{let n=localStorage.getItem(o);null===n?e.request("setLocalStorage",{key:o,dataObj:t}).then((o=>{e.request("setChatHeads",t).then((e=>{}))})):(e.request("setLocalStorage",{key:o,dataObj:t}).then((o=>{e.request("setChatHeads",t).then((e=>{}))})),y>=1?((t,o)=>{let n=JSON.parse(o);if(!0!==window.parent._.isEqual(n,t)){let o=E(n);E(t).filter((e=>!o.some((t=>e.timestamp===t.timestamp)))).forEach((t=>{t.sender!==window.parent.reduxStore.getState().app.selectedAddress.address&&void 0!==t.sender&&e.request("showNotification",t)}))}})(t,n):y+=1)}catch(e){console.error(e)}};let I,v,K=0,A=!1,_=!1,L=!1,D=!1;e.subscribe("logged_in",(async t=>{const o=()=>{let t,o=window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node],a=o.domain+":"+o.port;t="https:"===window.parent.location.protocol?`wss://${a}/websockets/chat/active/${window.parent.reduxStore.getState().app.selectedAddress.address}`:`ws://${a}/websockets/chat/active/${window.parent.reduxStore.getState().app.selectedAddress.address}`;const s=new WebSocket(t);s.onopen=()=>{console.log("[SOCKET]: Connected."),I=s,K+=1,D=!0},s.onmessage=e=>{$(JSON.parse(e.data))},s.onclose=()=>{console.log("[SOCKET]: CLOSED"),clearInterval(v),!1===A&&K<=52&&(K<=52?(e.request("showSnackBar","Connection to the Qortal Core was lost, is your Core running ?"),L=!0,setTimeout(n,1e4),K+=1):e.request("showSnackBar","Cannot connect to the Qortal Core, restart UI and Core!"))},s.onerror=e=>{console.log(`[SOCKET]: ${e.type}`)}},n=()=>{!0===window.parent.reduxStore.getState().app.loggedIn?_?L?(L=!1,clearTimeout(v),o(),_=!0,v=setTimeout(n,295e3)):D&&(I.send("ping"),v=setTimeout(n,295e3)):(o(),_=!0,v=setTimeout(n,295e3)):_&&!A&&(A=!0,I.close(),clearTimeout(v),_=!1,D=!1)};"true"===t?((async t=>{let o={names:await e.request("apiCall",{url:`/names/address/${t}`}),addressInfo:await e.request("apiCall",{url:`/addresses/${t}`})};e.request("setAccountInfo",o)})(window.parent.reduxStore.getState().app.selectedAddress.address),n()):(_&&(A=!0,I.close(),clearTimeout(v),_=!1,D=!1),y=0)})),e.ready().then((()=>{e.subscribe("node_config",(e=>{if(0===h){let o=JSON.parse(e);C={node:o.node,knownNodes:o.knownNodes},h+=1,g=!0,i=!0,void 0!==t&&T(),void 0!==n&&T(),N(C),k(),S()}let o=JSON.parse(e),a={node:o.node,knownNodes:o.knownNodes};!0!==window.parent._.isEqual(C,a)&&(C=a,g=!0,i=!0,void 0!==t&&T(),void 0!==n&&T(),N(a),k(),S())}))})),e.imReady();let J={},B=!1;e.ready().then((()=>{let t=[{url:"wallet",domain:"core",page:"wallet/index.html",title:"Wallet",icon:"account_balance_wallet",menus:[],parent:!1},{url:"send-coin",domain:"core",page:"send-coin/index.html",title:"Send Coin",icon:"send",menus:[],parent:!1},{url:"trade-portal",domain:"core",page:"trade-portal/index.html",title:"Trade Portal",icon:"toc",menus:[],parent:!1},{url:"reward-share",domain:"core",page:"reward-share/index.html",title:"Reward Share",icon:"call_split",menus:[],parent:!1},{url:"name-registration",domain:"core",page:"name-registration/index.html",title:"Name Registration",icon:"assignment_ind",menus:[],parent:!1},{url:"q-chat",domain:"core",page:"messaging/q-chat/index.html",title:"Q-Chat",icon:"message",menus:[],parent:!1},{url:"group-management",domain:"core",page:"group-management/index.html",title:"Group Management",icon:"group",menus:[],parent:!1}];const o=t=>{e.request("registerUrl",t)};e.subscribe("config",(e=>{if(J=JSON.parse(e),!B&&J.user.knownNodes[J.user.node].enableManagement){B=!0;let e={url:"node-management",domain:"core",page:"node-management/index.html",title:"Node Management",icon:"cloud",menus:[],parent:!1},n=[...t,e];o(n)}else o(t)}))}))}));
