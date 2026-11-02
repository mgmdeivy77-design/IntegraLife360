const V="integral-life-v4",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
const keep=(r,x)=>{if(x.ok){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x};
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>fetch(new Request(u,{cache:"reload"})).then(r=>r.ok?c.put(u,r):0)))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin)return;
const html=r.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html");
e.respondWith(html
?fetch(u.href,{cache:"no-cache"}).then(x=>keep(r,x)).catch(()=>caches.match(r).then(h=>h||caches.match("index.html")).then(h=>h||caches.match("./")))
:caches.match(r).then(h=>{const n=fetch(r,{cache:"no-cache"}).then(x=>keep(r,x)).catch(()=>h);return h||n}))});
