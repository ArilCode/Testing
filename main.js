const SUPABASE_URL="https://yrycrxdceukuiqtyielu.supabase.co";

const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeWNyeGRjZXVrdWlxdHlpZWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1OTM2NDIsImV4cCI6MjEwNjE2OTY0Mn0.UheqY6RVyeNB8A7OThpEwwWYYqzUPgt7SuMRhQJy7ak";

const supa=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const $=id=>document.getElementById(id);
const toast=m=>{$("toast").textContent=m;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2500)}
const openL=()=>{$("loginModal").classList.add("show")},closeL=()=>$("loginModal").classList.remove("show");
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));

let all=[];

function setAuthUI(isLogin){
  const dashData=$("dashData");
  const btnLogin=$("btnLogin");
  const btnLogout=$("btnLogout");
  if(dashData){ dashData.classList.toggle('hidden',!isLogin); dashData.style.display = isLogin? 'block' : 'none'; }
  if(btnLogin) btnLogin.classList.toggle('hidden', isLogin);
  if(btnLogout) btnLogout.classList.toggle('hidden',!isLogin);
}

async function login(){
  const emailEl=$("email"), passEl=$("pass"), errBox=$("eLogin");
  const e=emailEl.value.trim(), p=passEl.value.trim();

  const showWarn = (msg)=>{
    errBox.textContent=msg;
    errBox.style.display="block";
    clearTimeout(window._warnTimer);
    window._warnTimer=setTimeout(()=>{ errBox.style.display="none"; }, 3000);
  };

  if(!e &&!p){ showWarn("⚠️ Email dan password tidak boleh kosong!"); return; }
  if(!e){ showWarn("⚠️ Email tidak boleh kosong!"); emailEl.focus(); return; }
  if(!p){ showWarn("⚠️ Password tidak boleh kosong!"); passEl.focus(); return; }

  errBox.textContent="⏳ Memeriksa..."; errBox.style.display="block";
  const {error}=await supa.auth.signInWithPassword({email:e,password:p});
  if(error){ showWarn("❌ Email atau password salah!"); return; }

  errBox.style.display="none"; closeL();
  emailEl.value=""; passEl.value="";
  setAuthUI(true); load();
}

async function logout(){
  await supa.auth.signOut();
  setAuthUI(false);
  all=[]; prev(false);
}

async function load(){
  const {data}=await supa.from("absensi").select("*").order("created_at",{ascending:false});
  all=data||[];
  render(); prev(true);
}

function prev(isLogin=false){
  if(!isLogin){
    $("cHadir").textContent="0"; $("cIzin").textContent="0"; $("cSakit").textContent="0"; $("cAlfa").textContent="0";
    $("preview").innerHTML="<span style='color:#6b5b8a'>Login untuk lihat data live</span>"; return;
  }
  $("cHadir").textContent=all.filter(d=>d.status==="Hadir").length;
  $("cIzin").textContent=all.filter(d=>d.status==="Izin").length;
  $("cSakit").textContent=all.filter(d=>d.status==="Sakit").length;
  $("cAlfa").textContent=all.filter(d=>d.status==="Alfa").length;
  $("preview").innerHTML="";
}

function getFiltered(){
 let d=[...all];
 if($("fNama").value) d=d.filter(x=>x.nama.toLowerCase().includes($("fNama").value.toLowerCase()));
 if($("fStatus").value) d=d.filter(x=>x.status===$("fStatus").value);
 if($("fTanggal").value){
   const picked=$("fTanggal").value;
   d=d.filter(x=>{
     const dbDate=new Date(x.created_at);
     const iso=dbDate.toISOString().slice(0,10);
     const local=dbDate.getFullYear()+"-"+String(dbDate.getMonth()+1).padStart(2,'0')+"-"+String(dbDate.getDate()).padStart(2,'0');
     return iso===picked || local===picked;
   });
 }
 return d;
}

function onDateChange(){
 const el=$("fTanggal"), wrap=$("dateWrap");
 if(el.value) wrap.classList.add("has-value"); else wrap.classList.remove("has-value");
 render();
}

function render(){
 const d=getFiltered();
 const tglText=$("fTanggal").value? new Date($("fTanggal").value).toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'}) : "Semua Tanggal";
 $("infoFilter").textContent=`Menampilkan ${d.length} dari ${all.length} | ${tglText}`;
 $("tbody").innerHTML=d.map(x=>`<tr><td><b>${escapeHtml(x.nama)}</b></td><td><span class="badge ${escapeHtml(x.status)}">${escapeHtml(x.status)}</span></td><td>${escapeHtml(x.tanggal)}</td><td>${escapeHtml(x.jam)}</td><td><button onclick="hapusSatu('${x.id}')" style="border:2px solid #2d1b4e;border-radius:8px;background:#fff;padding:6px">🗑️</button></td></tr>`).join("")||`<tr><td colspan=5 style="text-align:center;border:0;color:#6b5b8a">Tidak ada data di tanggal ini</td></tr>`;
}

function resetFilter(){$("fTanggal").value="";$("dateWrap").classList.remove("has-value");$("fNama").value="";$("fStatus").value="";render()}
async function hapusSatu(id){if(!confirm("Hapus?"))return;await supa.from("absensi").delete().eq("id",id);toast("Terhapus");load()}
async function hapusSemua(){if(!confirm("Hapus terfilter?"))return;const d=getFiltered();for(let x of d)await supa.from("absensi").delete().eq("id",x.id);toast("Terhapus");load()}
function downloadExcel(){const d=getFiltered();if(!d.length){toast("Tidak ada data");return}let html=`<table><tr><th>NAMA</th><th>STATUS</th><th>TANGGAL</th><th>JAM</th></tr>${d.map(r=>`<tr><td>${escapeHtml(r.nama)}</td><td>${escapeHtml(r.status)}</td><td>${escapeHtml(r.tanggal)}</td><td>${escapeHtml(r.jam)}</td></tr>`).join("")}</table>`;const blob=new Blob([html],{type:"application/vnd.ms-excel"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`absensi-${$("fTanggal").value||new Date().toISOString().slice(0,10)}.xls`;a.click();toast("Excel didownload");}

(async () => {
  const { data } = await supa.auth.getSession();
  if (data.session) { setAuthUI(true); load(); }
  else { setAuthUI(false); all=[]; prev(false); }
})();