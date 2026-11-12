const C='op-v17', IMG='op-img-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png'])));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==IMG).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.method!=='GET')return;
 if(u.hostname.endsWith('.supabase.co')&&u.pathname.includes('/storage/v1/object/sign/')){
  const key=u.origin+u.pathname;
  e.respondWith(caches.open(IMG).then(c=>c.match(key).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok)c.put(key,r.clone());return r;}))));
  return;}
 if(u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));});
