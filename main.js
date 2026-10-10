const SUPABASE_URL = "https://wwiovsfkmymwkvxaehkh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aW92c2ZrbXltd2t2eGFlaGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNTE0MjEsImV4cCI6MjEwNjkyNzQyMX0.gEo2azUF1x3gwVG7h8NCDop_ZdjUl41viisIWcK8eI4";

const PAI = "PENDIDIKAN AGAMA ISLAM (PAI)";
const PAK = "PENDIDIKAN AGAMA KRISTEN (PAK)";

function injectPAK(list){
  let baru = [];
  list.forEach(m=>{
    baru.push(m);
    if(m===PAI &&!list.includes(PAK)){
      baru.push(PAK);
    }
  });
  return baru;
}

const KONFIG_KELAS = {
"X E": {
  mapel: {
    "PENDIDIKAN AGAMA KRISTEN (PAK)": "GURU PAK",
    "KIMIA": "PUJI SUSANTI, S.Pd",
    "BAHASA INGGRIS": "YUNI PUSPITASARI, S.Pd",
    "SENI BUDAYA": "ACI WINARTI, S.Pd.I",
    "SOSIOLOGI": "DESWA YODI EKA PUTRA, S.Pd",
    "BAHASA INDONESIA": "SUNARNI, S.Pd",
    "GEOGRAFI": "DESWA YODI EKA PUTRA, S.Pd",
    "BUDAYA MELAYU RIAU (BMR)": "IRZA LIANA PITRI, S.Sos",
    "MATEMATIKA": "MERI ANDAYANI, S.Pd",
    "BIOLOGI": "FAUZUL AZMI, S.Sos",
    "SEJARAH": "ROSELA, S.H",
    "PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)": "BONIKA, S.Pd",
    "FISIKA": "PUJI SUSANTI, S.Pd",
    "PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)": "ROSELA, S.H",
    "TEKNIK INFORMASI dan KOMUNIKASI (TIK)": "FAUZUL AZMI, S.Sos",
    "PENDIDIKAN AGAMA ISLAM (PAI)": "ACI WINARTI, S.Pd.I",
    "EKONOMI": "ANITA SAPUTRI, S.E"
  },
  jadwal: {
    "Senin": ["KIMIA","BAHASA INGGRIS","SENI BUDAYA","SOSIOLOGI"],
    "Selasa": ["BAHASA INDONESIA","GEOGRAFI","BUDAYA MELAYU RIAU (BMR)","MATEMATIKA","BIOLOGI"],
    "Rabu": ["BAHASA INDONESIA","BUDAYA MELAYU RIAU (BMR)","SEJARAH","PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)"],
    "Kamis": ["FISIKA","PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)","SENI BUDAYA","MATEMATIKA","TEKNIK INFORMASI dan KOMUNIKASI (TIK)"],
    "Jumat": ["PENDIDIKAN AGAMA ISLAM (PAI)","EKONOMI"],
    "Sabtu": [], "Minggu": []
  }
},
"XI F": {
  mapel: {
    "PENDIDIKAN AGAMA KRISTEN (PAK)": "GURU PAK",
    "SEJARAH": "ROSELA, S.H",
    "EKONOMI": "ANITA SAPUTRI, S.E",
    "SENI BUDAYA": "SUNARNI, S.Pd",
    "MATEMATIKA TINGKAT LANJUT (MTL)": "MERI ANDAYANI, S.Pd",
    "PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)": "BONIKA, S.Pd",
    "PENDIDIKAN AGAMA ISLAM (PAI)": "ACI WINARTI, S.Pd.I",
    "MATEMATIKA WAJIB": "MERI ANDAYANI, S.Pd",
    "PRAKARYA": "SUNARNI, S.Pd",
    "BAHASA INDONESIA": "ANITA SAPUTRI, S.E",
    "PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)": "ROSELA, S.H",
    "BAHASA INGGRIS": "YUNI PUSPITASARI, S.Pd",
    "BIOLOGI": "FAUZUL AZMI, S.Sos",
    "SOSIOLOGI": "DESWA YODI EKA PUTRA, S.Pd",
    "BUDAYA MELAYU RIAU (BMR)": "IRZA LIANA PITRI, S.Sos"
  },
  jadwal: {
    "Senin": ["SEJARAH","EKONOMI","SENI BUDAYA","MATEMATIKA TINGKAT LANJUT (MTL)","PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)"],
    "Selasa": ["PENDIDIKAN AGAMA ISLAM (PAI)","MATEMATIKA WAJIB","PRAKARYA","BAHASA INDONESIA","PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)"],
    "Rabu": ["MATEMATIKA WAJIB","BAHASA INGGRIS","SENI BUDAYA","BAHASA INDONESIA"],
    "Kamis": ["EKONOMI","BIOLOGI","SOSIOLOGI","BUDAYA MELAYU RIAU (BMR)"],
    "Jumat": ["SOSIOLOGI","MATEMATIKA WAJIB","BIOLOGI"],
    "Sabtu": [], "Minggu": []
  }
},
"XII MIPA": {
  mapel: {
    "PENDIDIKAN AGAMA KRISTEN (PAK)": "GURU PAK",
    "SEJARAH INDONESIA": "FAUZUL AZMI, S.Sos",
    "MATEMATIKA PEMINATAN (MTK PM)": "MERI ANDAYANI, S.Pd",
    "PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)": "ROSELA, S.H",
    "BAHASA INDONESIA": "ANITA SAPUTRI, S.E",
    "BIOLOGI": "IRZA LIANA PITRI, S.Sos",
    "FISIKA": "PUJI SUSANTI, S.Pd",
    "SENI BUDAYA": "SUNARNI, S.Pd",
    "KIMIA": "PUJI SUSANTI, S.Pd",
    "SOSIOLOGI": "DESWA YODI EKA PUTRA, S.Pd",
    "PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)": "BONIKA, S.Pd",
    "PENDIDIKAN AGAMA ISLAM (PAI)": "ACI WINARTI, S.Pd.I",
    "BAHASA INGGRIS": "YUNI PUSPITASARI, S.Pd",
    "MATEMATIKA WAJIB": "MERI ANDAYANI, S.Pd",
    "PRAKARYA": "SUNARNI, S.Pd",
    "BUDAYA MELAYU RIAU (BMR)": "IRZA LIANA PITRI, S.Sos"
  },
  jadwal: {
    "Senin": ["SEJARAH INDONESIA","MATEMATIKA PEMINATAN (MTK PM)","PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)","BAHASA INDONESIA","BIOLOGI"],
    "Selasa": ["FISIKA","SENI BUDAYA","KIMIA","SOSIOLOGI","PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)"],
    "Rabu": ["PENDIDIKAN AGAMA ISLAM (PAI)","MATEMATIKA PEMINATAN (MTK PM)","FISIKA","SOSIOLOGI"],
    "Kamis": ["MATEMATIKA WAJIB","BIOLOGI","BAHASA INGGRIS","KIMIA","BAHASA INDONESIA"],
    "Jumat": ["MATEMATIKA WAJIB","PRAKARYA","BUDAYA MELAYU RIAU (BMR)"],
    "Sabtu": [], "Minggu": []
  }
}
};

const $ = id => document.getElementById(id);
const TZ = "Asia/Jakarta";
const HDR = {"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`};
const JSONH = {...HDR,"Content-Type":"application/json"};
const sleep = ms => new Promise(r=>setTimeout(r,ms));

/* ID unik HP ini. 1 HP = 1 QR dicek di server. */
function getDeviceId(){
  let id=localStorage.getItem("ace_device_id");
  if(!id){
    id=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():(Date.now().toString(36)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2));
    localStorage.setItem("ace_device_id",id);
  }
  return id;
}
const DEVICE_ID=getDeviceId();

function maskId(k){
  k=String(k||"");
  if(k.length<=4)return k;
  return k.slice(0,3)+"*".repeat(k.length-4)+k.slice(-1);
}

function dateLabel(d=new Date()){return new Intl.DateTimeFormat("id-ID",{timeZone:TZ,weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(d);}
function timeLabel(d=new Date()){return d.toLocaleTimeString('en-GB',{timeZone:TZ,hour12:false});}
function hariIni(){return new Intl.DateTimeFormat("id-ID",{timeZone:TZ,weekday:"long"}).format(new Date());}
function tanggalISO(d=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).format(d);}
function clock(){ const n=new Date(); $("time").textContent=timeLabel(n); $("date").textContent=dateLabel(n); }
clock();setInterval(clock,1000);
function toast(msg,ms=3000){$("toast").textContent=msg;$("toast").classList.add("show");clearTimeout(toast._t);toast._t=setTimeout(()=>$("toast").classList.remove("show"),ms);}

let cacheLibur=null;
function getLiburFixTahun(thn){return [{d:`${thn}-01-01`,n:"Tahun Baru"},{d:`${thn}-08-17`,n:"Hari Kemerdekaan RI"},{d:`${thn}-12-25`,n:"Hari Natal"}].map(x=>({holiday_date:x.d,holiday_name:x.n}));}
async function getHariLiburNasional(){const thn=new Date().getFullYear();if(cacheLibur)return cacheLibur;cacheLibur=getLiburFixTahun(thn);return cacheLibur;}
async function cekLibur(){const hari=hariIni();const iso=tanggalISO();if(hari==="Sabtu"||hari==="Minggu")return{libur:true,alasan:`Hari ${hari} - Libur Akhir Pekan`,emoji:"😴"};const list=await getHariLiburNasional();const found=list.find(x=>x.holiday_date===iso);if(found)return{libur:true,alasan:found.holiday_name,emoji:"🎉"};return{libur:false};}

let jadwalAktif=[],dataAbsenHariIni=[],GURU_KE_MAPEL={};
let kelasAktif="",namaAktif="",kodeAktif="",agamaAktif="Islam";

/* mapel yang tidak boleh dipilih: PAK, dan PAI untuk siswa Nonis */
function dilarang(m){return m===PAK || (m===PAI && agamaAktif==="Nonis");}

function opsiMapel(m,sudahMapel){
  const o=document.createElement("option");o.value=m;o.textContent=m;
  if(m===PAK){o.disabled=true;}
  else if(m===PAI&&agamaAktif==="Nonis"){o.disabled=true;o.textContent=m+" 🔒 Khusus Islam";}
  else if(sudahMapel.includes(m)){o.textContent=m+" ✅ Sudah absen";o.disabled=true;}
  return o;
}

/* ================= KUNCI / BUKA FORM ================= */
function kunciForm(kunci,pesan){
  $("form").classList.toggle("locked",kunci);
  $("lockHint").style.display=kunci?"block":"none";
  if(kunci)$("lockHint").textContent=pesan||"🔒 Scan QR dulu untuk membuka form";
  ["mapel","guru","send","keterangan"].forEach(id=>{$(id).disabled=kunci;});
  document.querySelectorAll('input[name="status"]').forEach(r=>{r.disabled=kunci;if(kunci)r.checked=false;});
  if(kunci){$("send").textContent="Kirim Absensi";}
  toggleKet();
}

function buildGuruMap(kelas) {
  GURU_KE_MAPEL = {};
  const mapelData = KONFIG_KELAS[kelas]?.mapel || {};
  Object.entries(mapelData).forEach(([m, g]) => {
    if (m === PAK) return;
    if (!GURU_KE_MAPEL[g]) GURU_KE_MAPEL[g] = [];
    GURU_KE_MAPEL[g].push(m);
  });
}

function daftarMapelHariIni(){
  const konfig=KONFIG_KELAS[kelasAktif];
  let list=konfig.jadwal[hariIni()]||[];
  if(list.length===0) list=Object.keys(konfig.mapel).filter(m=>m!==PAK);
  return injectPAK(list);
}

function isiMapel(){
  const sudahMapel=dataAbsenHariIni.filter(d=>d.nama===namaAktif && d.kelas===kelasAktif).map(d=>d.mapel);
  $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
  daftarMapelHariIni().forEach(m=>$("mapel").appendChild(opsiMapel(m,sudahMapel)));
  $("hintNama").style.display="block";
  $("hintNama").textContent=sudahMapel.length>0
    ? `Sudah absen hari ini: ${sudahMapel.join(", ")}`
    : `Belum absen hari ini`;
}

async function renderMapelHari(){
  const libur=await cekLibur();
  if(libur.libur){renderLibur(libur);return;}
  $("jadwalInfo").classList.remove("liburBox");
  kunciForm(false);

  const konfig=KONFIG_KELAS[kelasAktif];
  const hari=hariIni();
  const list=daftarMapelHariIni();
  jadwalAktif=list;
  buildGuruMap(kelasAktif);
  isiMapel();

  const guruHariIni=[...new Set(list.filter(m=>m!==PAK).map(m=>konfig.mapel[m]).filter(Boolean))];
  $("guru").innerHTML='<option value="">-- Pilih Guru --</option>';
  guruHariIni.forEach(g=>{
    let o=document.createElement("option");o.value=g;o.textContent=g;$("guru").appendChild(o);
  });
  $("hintMapel").style.display="none";$("hintGuru").style.display="none";

  const jadwalHTML = list.map(m=> dilarang(m) ? `<s>${m}</s>` : m).join(" • ");
  $("jadwalInfo").innerHTML=`📅 Hari ${hari}<br>Mapel: ${jadwalHTML}`;
}

function renderLibur(info){
  $("jadwalInfo").classList.add("liburBox");
  $("jadwalInfo").innerHTML=`${info.emoji} <b>HARI LIBUR</b><br>📢 ${info.alasan}<br>Absensi ditutup`;
  kunciForm(true,`${info.emoji} Hari libur, absensi ditutup`);
  $("mapel").innerHTML='<option value="">-- Libur --</option>';
  $("guru").innerHTML='<option value="">-- Libur --</option>';
  $("send").textContent="Libur 🔒";
}

async function loadAbsenHariIni(){
  try{
    const res=await fetch(`${SUPABASE_URL}/rest/v1/absensi_v2?tgl=eq.${tanggalISO()}&select=nama,mapel,kelas`,{headers:HDR});
    const j=await res.json();
    dataAbsenHariIni=Array.isArray(j)?j:[];
  }catch(e){dataAbsenHariIni=[];}
}

let isAuto=false;
$("mapel").addEventListener("change",()=>{
  if(isAuto)return;
  const mapelVal=$("mapel").value;
  if(!mapelVal)return;
  if(mapelVal===PAK){toast(`❌ ${PAK} tidak bisa dipilih`);$("mapel").value="";return;}
  if(mapelVal===PAI&&agamaAktif==="Nonis"){toast("🔒 PAI khusus siswa Islam");$("mapel").value="";return;}
  const sudah=dataAbsenHariIni.find(d=>d.nama===namaAktif && d.mapel===mapelVal && d.kelas===kelasAktif);
  if(sudah){toast(`❌ ${namaAktif} sudah absen ${mapelVal} hari ini!`);$("mapel").value="";$("guru").value="";return;}
  const guruAuto=KONFIG_KELAS[kelasAktif]?.mapel[mapelVal];
  if(guruAuto){isAuto=true;$("guru").value=guruAuto;$("hintGuru").style.display="block";$("hintGuru").textContent=`✨ Auto: ${guruAuto}`;isAuto=false;}
});

$("guru").addEventListener("change",()=>{
  if(isAuto)return;
  const guruVal=$("guru").value;
  if(!guruVal){isiMapel();return;}
  const listMapelGuru=GURU_KE_MAPEL[guruVal]||[];
  const sudahMapel=dataAbsenHariIni.filter(d=>d.nama===namaAktif && d.kelas===kelasAktif).map(d=>d.mapel);
  const mapelHariIni=jadwalAktif.filter(m=>!dilarang(m) && listMapelGuru.includes(m) &&!sudahMapel.includes(m));
  const mapelHariIniAll=jadwalAktif.filter(m=>m!==PAK && listMapelGuru.includes(m));
  if(mapelHariIni.length>0){
    isAuto=true;
    const listTampil=injectPAK(mapelHariIniAll);
    $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
    listTampil.forEach(m=>$("mapel").appendChild(opsiMapel(m,sudahMapel)));
    $("mapel").value=mapelHariIni[0];
    $("hintMapel").style.display="block";$("hintMapel").textContent=`✨ ${guruVal} hari ini mengajar: ${mapelHariIni.join(" & ")}`;
    isAuto=false;
  }
});

/* ================= KETERANGAN IZIN ================= */
function toggleKet(){
  const st=document.querySelector('input[name="status"]:checked')?.value;
  if(st==="Izin"){
    $("ketBox").style.display="block";
  }else{
    $("ketBox").style.display="none";
    $("keterangan").value="";
    $("ketCount").textContent="0";
  }
}
document.querySelectorAll('input[name="status"]').forEach(r=>r.addEventListener("change",toggleKet));
$("keterangan").addEventListener("input",()=>{$("ketCount").textContent=$("keterangan").value.length;});

/* ================= PREVIEW QR + IDENTITAS ================= */
let urlPreview=null;

function setPreview(src,state,teks){
  $("qrPreview").style.display="block";
  if(src)$("qrImg").src=src;
  const fr=$("qrFrame");
  fr.classList.remove("scanning","ok","bad");
  if(state)fr.classList.add(state);
  $("scanBadge").textContent=teks||"";
}

function isiIdentitas(o){
  $("outNama").textContent=o.nama||"-";
  $("outKelas").textContent=o.kelas||"-";
  $("outPanggilan").textContent=o.panggilan||"-";
  $("outId").textContent=maskId(o.kode);
  $("identitas").classList.add("ok");
}

function resetIdentitas(){
  kelasAktif="";namaAktif="";kodeAktif="";agamaAktif="Islam";
  ["outNama","outKelas","outPanggilan","outId"].forEach(id=>$(id).textContent="-");
  $("identitas").classList.remove("ok");
  $("hintNama").style.display="none";
}

/* ================= SCAN QR ================= */
let scanner=null;

function ambilFrame(){
  const v=document.querySelector("#reader video");
  if(!v||!v.videoWidth)return null;
  try{
    const sz=Math.min(v.videoWidth,v.videoHeight);
    const c=document.createElement("canvas");c.width=c.height=400;
    c.getContext("2d").drawImage(v,(v.videoWidth-sz)/2,(v.videoHeight-sz)/2,sz,sz,0,0,400,400);
    return c.toDataURL("image/jpeg",.85);
  }catch(e){return null;}
}

async function bukaScan(){
  if(typeof Html5Qrcode==="undefined"){toast("Library scanner belum termuat, cek internet");return;}
  if(scanner)return;
  $("readerBox").style.display="block";
  const sc=new Html5Qrcode("reader");
  scanner=sc;
  try{
    await sc.start({facingMode:"environment"},{fps:10,qrbox:{width:230,height:230}},
      t=>{ if(sedangProses)return; onScanOK(t,ambilFrame()); },()=>{});
  }catch(e){
    scanner=null;
    $("reader").innerHTML='<div class="camErr">Kamera tidak aktif.<br>Izinkan akses kamera, atau pilih foto QR dari galeri (ikon gambar).</div>';
  }
}

async function tutupScan(){
  const sc=scanner;scanner=null;
  if(sc){try{await sc.stop();sc.clear();}catch(e){}}
  $("readerBox").style.display="none";
}

let sedangProses=false;
async function onScanOK(teks,src){
  if(sedangProses)return;
  sedangProses=true;
  const mulai=Date.now();
  await tutupScan();
  resetIdentitas();
  kunciForm(true,"🔍 Memverifikasi QR...");
  setPreview(src,"scanning","🔍 Memindai QR...");
  $("success").style.display="none";
  try{
    const kode=String(teks).trim();

    // QR guru: hanya tampilan, tidak ke database
    if(kode.toUpperCase().startsWith("ACE-GURU")){
      await sleep(Math.max(0,1600-(Date.now()-mulai)));
      setPreview(null,"ok","✅ QR Guru");
      isiIdentitas({nama:"kamu seorang guru😁🙏🏻",kelas:"-",panggilan:"Guru",kode});
      $("btnScan").textContent="📷 Scan Ulang";
      kunciForm(true,"👨‍🏫 QR guru hanya tampilan, tidak mengisi absen");
      toast("kamu seorang guru😁🙏🏻",4000);
      return;
    }

    const [res]=await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/rpc/cek_qr`,{method:"POST",headers:JSONH,body:JSON.stringify({p_kode:kode,p_device:DEVICE_ID})}),
      sleep(1600)
    ]);
    const data=await res.json();
    if(!res.ok){
      setPreview(null,"bad","❌ Ditolak");
      kunciForm(true,"🔒 Scan QR yang valid untuk membuka form");
      toast("❌ "+(data&&data.message?data.message:"QR tidak dikenali"),5000);
      return;
    }
    if(!Array.isArray(data)||data.length===0){
      setPreview(null,"bad","❌ Tidak dikenali");
      kunciForm(true,"🔒 Scan QR yang valid untuk membuka form");
      toast("❌ QR tidak dikenali");return;
    }
    const {kelas,nama,panggilan,agama}=data[0];
    if(!KONFIG_KELAS[kelas]){
      setPreview(null,"bad","❌ Kelas belum diatur");
      kunciForm(true,"🔒 Kelas belum diatur");
      toast(`❌ Kelas ${kelas} belum diatur`);return;
    }
    kelasAktif=kelas;namaAktif=nama;kodeAktif=kode.toUpperCase();agamaAktif=agama||"Islam";
    isiIdentitas({nama,kelas,panggilan,kode:kodeAktif});
    setPreview(null,"ok","✅ Terverifikasi");
    $("btnScan").textContent="📷 Scan Ulang";
    await loadAbsenHariIni();
    await renderMapelHari();
    toast(`Halo ${panggilan||nama}! Pilih mapel & status`);
  }catch(e){
    setPreview(null,"bad","❌ Gagal");
    kunciForm(true,"🔒 Scan QR dulu untuk membuka form");
    toast("Gagal cek QR: "+e.message,4000);
  }finally{
    sedangProses=false;
  }
}

$("btnScan").addEventListener("click",bukaScan);
$("btnTutupScan").addEventListener("click",tutupScan);

/* scan dari galeri */
$("btnGaleri").addEventListener("click",()=>$("fileQR").click());
$("fileQR").addEventListener("change",async e=>{
  const f=e.target.files&&e.target.files[0];
  e.target.value="";
  if(!f)return;
  await tutupScan();
  if(urlPreview)URL.revokeObjectURL(urlPreview);
  urlPreview=URL.createObjectURL(f);
  try{
    const h=new Html5Qrcode("reader");
    const teks=await h.scanFile(f,false);
    try{h.clear();}catch(_){}
    onScanOK(teks,urlPreview);
  }catch(err){
    resetIdentitas();
    kunciForm(true,"🔒 Scan QR yang valid untuk membuka form");
    setPreview(urlPreview,"bad","❌ QR tidak terbaca");
    toast("❌ QR tidak terbaca dari foto itu",4000);
  }
});

/* ================= KIRIM ================= */
$("form").addEventListener("submit",async e=>{
  e.preventDefault();
  const mapel=$("mapel").value,guru=$("guru").value;
  const status=document.querySelector('input[name="status"]:checked')?.value;
  const ket=$("keterangan").value.trim();

  if(!kodeAktif||!namaAktif){toast("📷 Scan QR kertas dulu!");return;}
  if(!mapel||!guru||!status){toast("Lengkapi mapel, guru & status!");return;}
  if(mapel===PAK){toast(`❌ ${PAK} tidak bisa diabsen`);return;}
  if(mapel===PAI&&agamaAktif==="Nonis"){toast("🔒 PAI khusus siswa Islam");return;}
  if(status==="Izin" && ket.length<5){
    toast("✍️ Tulis keterangan izin (minimal 5 huruf)",4000);
    $("keterangan").focus();
    return;
  }

  const btn=$("send");btn.disabled=true;btn.textContent="Menyimpan...";
  let berhasil=false;
  try{
    const res=await fetch(`${SUPABASE_URL}/rest/v1/rpc/kirim_absen`,{
      method:"POST",
      headers:JSONH,
      body:JSON.stringify({
        p_kode:kodeAktif,
        p_device:DEVICE_ID,
        p_mapel:mapel,
        p_status:status,
        p_keterangan:status==="Izin"?ket:null
      })
    });
    if(!res.ok){
      const j=await res.json().catch(()=>({}));
      throw new Error(j.message||"Server menolak");
    }
    berhasil=true;
    $("success").style.display="block";
    $("success").textContent=`✅ ${kelasAktif} - ${namaAktif} - ${mapel} - ${status} berhasil!`;
    toast("Absensi berhasil!");
    setTimeout(()=>location.reload(),2500);
  }catch(err){
    toast("❌ "+err.message,5000);
  }finally{
    if(!berhasil){btn.disabled=false;btn.textContent="Kirim Absensi";}
  }
});

/* ================= AWAL ================= */
kunciForm(true);
window.addEventListener("load",()=>{bukaScan();});