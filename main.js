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
let kelasAktif="",namaAktif="",kodeAktif="";

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
  daftarMapelHariIni().forEach(m=>{
    let o=document.createElement("option");o.value=m;o.textContent=m;
    if(m===PAK){o.disabled=true;}
    else if(sudahMapel.includes(m)){o.textContent=m+" ✅ Sudah absen";o.disabled=true;}
    $("mapel").appendChild(o);
  });
  $("hintNama").style.display="block";
  $("hintNama").textContent=sudahMapel.length>0
    ? `Sudah absen hari ini: ${sudahMapel.join(", ")}`
    : `Belum absen hari ini`;
}

async function renderMapelHari(){
  const libur=await cekLibur();
  if(libur.libur){renderLibur(libur);return;}
  $("jadwalInfo").classList.remove("liburBox");
  document.querySelectorAll('input[name="status"]').forEach(r=>{r.disabled=false;r.parentElement.style.opacity="";r.parentElement.style.pointerEvents="";});
  $("mapel").disabled=false;$("guru").disabled=false;$("send").disabled=false;$("send").textContent="Kirim Absensi";

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

  const jadwalHTML = list.map(m=> m===PAK ? `<s>${PAK}</s>` : m).join(" • ");
  $("jadwalInfo").innerHTML=`📅 Hari ${hari}<br>Mapel: ${jadwalHTML}`;
}

function renderLibur(info){
  $("jadwalInfo").classList.add("liburBox");
  $("jadwalInfo").innerHTML=`${info.emoji} <b>HARI LIBUR</b><br>📢 ${info.alasan}<br>Absensi ditutup`;
  $("mapel").innerHTML='<option value="">-- Libur --</option>';$("mapel").disabled=true;
  $("guru").innerHTML='<option value="">-- Libur --</option>';$("guru").disabled=true;
  $("send").disabled=true;$("send").textContent="Libur 🔒";
  document.querySelectorAll('input[name="status"]').forEach(r=>{r.disabled=true;r.checked=false;r.parentElement.style.opacity="0.4";r.parentElement.style.pointerEvents="none";
    toggleKet();
  });
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
  const mapelHariIni=jadwalAktif.filter(m=>m!==PAK && listMapelGuru.includes(m) &&!sudahMapel.includes(m));
  const mapelHariIniAll=jadwalAktif.filter(m=>m!==PAK && listMapelGuru.includes(m));
  if(mapelHariIni.length>0){
    isAuto=true;
    let listTampil=injectPAK(mapelHariIniAll);
    $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
    listTampil.forEach(m=>{
      let o=document.createElement("option");o.value=m;o.textContent=m;
      if(m===PAK){o.disabled=true;}
      else if(sudahMapel.includes(m)){o.textContent=m+" ✅ Sudah absen";o.disabled=true;}
      $("mapel").appendChild(o);
    });
    $("mapel").value=mapelHariIni[0];
    $("hintMapel").style.display="block";$("hintMapel").textContent=`✨ ${guruVal} hari ini mengajar: ${mapelHariIni.join(" & ")}`;
    isAuto=false;
  }
});

/* ================= KETERANGAN IZIN ================= */
function toggleKet() {
  const st = document.querySelector('input[name="status"]:checked')?.value;
  if (st === "Izin") {
    $("ketBox").style.display = "block";
  } else {
    $("ketBox").style.display = "none";
    $("keterangan").value = "";
    $("ketCount").textContent = "0";
  }
}
document.querySelectorAll('input[name="status"]').forEach(r => r.addEventListener("change", toggleKet));
$("keterangan").addEventListener("input", () => { $("ketCount").textContent = $("keterangan").value.length; });

/* ================= SCAN QR ================= */
let scanner=null;

async function bukaScan(){
  if(typeof Html5Qrcode==="undefined"){toast("Library scanner belum termuat, cek internet");return;}
  if(scanner)return;
  $("readerBox").style.display="block";
  const sc=new Html5Qrcode("reader");
  scanner=sc;
  try{
    await sc.start({facingMode:"environment"},{fps:10,qrbox:{width:230,height:230}},onScanOK,()=>{
    });
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

function resetIdentitas(){
  kelasAktif="";namaAktif="";kodeAktif="";
  $("outNama").textContent="-";$("outKelas").textContent="-";
  $("identitas").classList.remove("ok");
}

let sedangProses=false;
async function onScanOK(teks){
  if(sedangProses)return;
  sedangProses=true;
  await tutupScan();
  try{
    const kode=String(teks).trim();
    const res=await fetch(`${SUPABASE_URL}/rest/v1/rpc/cek_qr`,{method:"POST",headers:JSONH,body:JSON.stringify({p_kode:kode,p_device:DEVICE_ID})});
    const data=await res.json();
    if(!res.ok){
      toast("❌ "+(data&&data.message?data.message:"QR tidak dikenali"),5000);
      resetIdentitas();return;
    }
    if(!Array.isArray(data)||data.length===0){toast("❌ QR tidak dikenali");resetIdentitas();return;}
    const {kelas,nama}=data[0];
    if(!KONFIG_KELAS[kelas]){toast(`❌ Kelas ${kelas} belum diatur`);resetIdentitas();return;}
    kelasAktif=kelas;namaAktif=nama;kodeAktif=kode.toUpperCase();
    $("outNama").textContent=nama;$("outKelas").textContent=kelas;
    $("identitas").classList.add("ok");
    $("btnScan").textContent="📷 Scan Ulang";
    $("success").style.display="none";
    document.querySelectorAll('input[name="status"]').forEach(r=>r.checked=false);
    toggleKet();
    await loadAbsenHariIni();
    await renderMapelHari();
    toast(`Halo ${nama}! Pilih mapel & status`);
  }catch(e){
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
  try{
    const h=new Html5Qrcode("reader");
    const teks=await h.scanFile(f,false);
    try{h.clear();}catch(_){}
    onScanOK(teks);
  }catch(err){
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
$("mapel").disabled=true;$("guru").disabled=true;$("send").disabled=true;
window.addEventListener("load",()=>{bukaScan();});