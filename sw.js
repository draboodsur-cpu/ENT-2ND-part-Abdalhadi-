const CACHE='ent-exams-v2';
const FILES=["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "ballenger-items.html", "brackmann.html", "sba-323.html", "pal-mock-1.html", "pal-mock-2.html", "pal-mock-3.html", "pal-mock-4.html", "pal-mock-5.html", "pal-mock-6.html", "cummings-4.html", "cummings-5.html", "shamsan.html", "cummings-mock-1.html", "cummings-mock-2.html", "cummings-mock-3.html", "cummings-mock-4.html", "cummings-mock-5.html", "bailey-1.html", "bailey-2.html", "bailey-3.html", "bailey-4.html", "bailey-5.html", "abdalhadi-project.html", "abdalhadi-mock-1.html", "abdalhadi-mock-2.html", "abdalhadi-mock-3.html", "abdalhadi-mock-4.html", "abdalhadi-mock-5.html"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(async c=>{for(const f of FILES){try{await c.add(new Request(f,{cache:'reload'}))}catch(err){}}}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll()).then(cs=>cs.forEach(c=>c.postMessage('cached'))))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit||caches.match('index.html'));
    return hit||net;
  }));
});
