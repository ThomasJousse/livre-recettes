/* Couche Android : minuteurs en notification, bouton retour, liens externes, mise à jour depuis GitHub */
(function(){
  const CFG=window.APP_CONFIG||{};
  const Cap=window.Capacitor;
  const isNative=!!(Cap&&Cap.isNativePlatform&&Cap.isNativePlatform());
  const P=(Cap&&Cap.Plugins)||{};
  const LN=P.LocalNotifications, App=P.App, Browser=P.Browser;
  const hooks=()=>window.AppHooks||{};

  /* ---------- Liens externes : navigateur du téléphone ---------- */
  function openExternal(url){
    if(isNative&&Browser){ Browser.open({url}).catch(()=>{ location.href=url; }); }
    else window.open(url,"_blank","noopener");
  }
  document.addEventListener("click",e=>{
    const a=e.target.closest&&e.target.closest("a[href]"); if(!a) return;
    const href=a.getAttribute("href")||"";
    if(/^https?:\/\//i.test(href)&&!href.startsWith(location.origin)){ e.preventDefault(); openExternal(href); }
  },true);

  /* ---------- Minuteurs : notification même écran éteint ---------- */
  const idOf=s=>{ let h=0; for(const c of String(s)) h=(h*31+c.charCodeAt(0))|0; return Math.abs(h)%2000000000+1; };
  let lnReady=null;
  function ensureLN(){
    if(!isNative||!LN) return Promise.resolve(false);
    if(!lnReady) lnReady=(async()=>{
      try{
        let p=await LN.checkPermissions();
        if(p.display!=="granted") p=await LN.requestPermissions();
        if(p.display!=="granted") return false;
        try{ await LN.createChannel({id:"minuteurs",name:"Minuteurs",description:"Fin des minuteurs de cuisson",importance:5,visibility:1,vibration:true}); }catch(e){}
        return true;
      }catch(e){ return false; }
    })();
    return lnReady;
  }
  window.Native={
    async scheduleTimer(t){
      if(!(await ensureLN())) return;
      try{ await LN.schedule({notifications:[{id:idOf(t.id),title:"⏰ C'est prêt",body:t.label,channelId:"minuteurs",schedule:{at:new Date(t.end),allowWhileIdle:true}}]}); }catch(e){}
    },
    async cancelTimer(id){
      if(!isNative||!LN) return;
      try{ await LN.cancel({notifications:[{id:idOf(id)}]}); }catch(e){}
    }
  };

  /* ---------- Bouton retour Android ---------- */
  if(isNative&&App){
    App.addListener("backButton",()=>{
      const h=hooks();
      if(h.isCookOpen&&h.isCookOpen()){ h.closeCook(); return; }
      if(location.hash&&location.hash!=="#"){ history.back(); return; }
      App.exitApp();
    });
    App.addListener("resume",()=>checkUpdate(false));
  }

  /* ---------- Mise à jour depuis les Releases GitHub ---------- */
  const UP_LS="livre-recettes-update";
  const cmp=(a,b)=>{ const pa=String(a).replace(/^v/,"").split(".").map(Number), pb=String(b).replace(/^v/,"").split(".").map(Number);
    for(let i=0;i<3;i++){ const d=(pa[i]||0)-(pb[i]||0); if(d) return d>0?1:-1; } return 0; };
  const box=document.getElementById("update");
  function showUpdate(v,url,notes){
    if(!box) return;
    box.innerHTML=`<div class="upd"><div><b>Nouvelle version ${v.replace(/^v/,"")}</b>${notes?`<span>${notes.replace(/[<>&]/g,"")}</span>`:""}</div>
      <button type="button" class="btn pri" data-up="go">Installer</button><button type="button" class="x" data-up="later" aria-label="Plus tard">✕</button></div>`;
    box.hidden=false;
    box.onclick=e=>{ const b=e.target.closest("[data-up]"); if(!b) return;
      if(b.dataset.up==="go"){ openExternal(url); hooks().toast&&hooks().toast("Téléchargement lancé : ouvre le fichier pour installer"); }
      else { try{ localStorage.setItem(UP_LS,JSON.stringify({skip:v,at:Date.now()})); }catch(e){} }
      box.hidden=true; };
  }
  async function checkUpdate(force){
    if(!CFG.repo||!CFG.version) return;
    let memo={}; try{ memo=JSON.parse(localStorage.getItem(UP_LS)||"{}"); }catch(e){}
    if(!force&&memo.checked&&Date.now()-memo.checked<3*3600000&&!memo.pending) return;
    try{
      const r=await fetch("https://api.github.com/repos/"+CFG.repo+"/releases/latest",{headers:{Accept:"application/vnd.github+json"},cache:"no-store"});
      if(!r.ok) return;
      const rel=await r.json();
      const asset=(rel.assets||[]).find(a=>/\.apk$/i.test(a.name));
      memo.checked=Date.now();
      if(asset&&cmp(rel.tag_name,CFG.version)>0){
        memo.pending=rel.tag_name;
        const snoozed=memo.skip===rel.tag_name&&Date.now()-(memo.at||0)<24*3600000;
        if(!snoozed||force) showUpdate(rel.tag_name,asset.browser_download_url,(rel.body||"").split("\n")[0].slice(0,140));
      } else memo.pending=null;
      try{ localStorage.setItem(UP_LS,JSON.stringify(memo)); }catch(e){}
    }catch(e){}
  }
  window.Native.checkUpdate=()=>checkUpdate(true);
  setTimeout(()=>checkUpdate(false),2500);
})();
