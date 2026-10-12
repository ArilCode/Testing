/* khusus.js : mode QR Wewenang (absen orang lain). Dimuat SETELAH main.js */
let khususKode="",khususSiswa=[],tokenNamaK=0;

async function rpcK(fn,body){
  const res=await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`,{method:"POST",headers:JSONH,body:JSON.stringify(body)});
  const j=await res.json().catch(()=>null);
  if(!res.ok)throw new Error((j&&j.message)||"Server menolak");
  return j;
}

function tutupKhusus(){
  khususKode="";khususSiswa=[];
  const f=$("formKhusus");
  if(f)f.style.display="none";
  $("form").style.display="";
  $("kSuccess").style.display="none";
}

function resetStatusK(){
  document.querySelectorAll('input[name="statusK"]').forEach(r=>r.checked=false);
  $("ketBoxK").style.display="none";
  $("ketK").value="";
  $("ketCountK").textContent="0";
}

async function mulaiKhusus(kode,mulai){
  let data;
  try{
    data=await rpcK("cek_khusus",{p_kode:kode,p_device:DEVICE_ID});
  }catch(e){
    await sleep(Math.max(0,1600-(Date.now()-mulai)));
    setPreview(null,"bad","❌ Ditolak");
    kunciForm(true,"🔒 Scan QR yang valid untuk membuka form");
    toast("❌ "+e.message,5000);
    return;
  }
  await sleep(Math.max(0,1600-(Date.now()-mulai)));

  const label=(data&&data[0]&&data[0].label)||"Wewenang";
  khususKode=kode.toUpperCase();
  setPreview(null,"ok","✅ QR Wewenang");
  isiIdentitas({nama:label,kelas:"Semua kelas",panggilan:"Wewenang",kode:khususKode.split(".")[0]});
  $("btnScan").textContent="📷 Scan Ulang";

  const libur=await cekLibur();
  if(libur.libur){renderLibur(libur);return;}

  $("form").style.display="none";
  $("lockHint").style.display="none";
  $("jadwalInfo").classList.remove("liburBox");
  $("jadwalInfo").innerHTML=`🛡️ Mode Wewenang aktif<br>📅 Hari ${hariIni()} • absen untuk orang lain`;
  $("kLabel").textContent=label;
  $("kKelas").value="SEMUA";
  resetStatusK();
  $("kSuccess").style.display="none";
  $("formKhusus").style.display="block";
  await muatNamaK();
  toast(`Mode wewenang: ${label}`);
}

/* ===== pilihan kelas -> nama -> mapel ===== */
async function muatNamaK(){
  const kelas=$("kKelas").value;
  const tok=++tokenNamaK;
  $("kNama").innerHTML='<option value="SEMUA">Semua siswa</option>';
  khususSiswa=[];
  if(kelas==="SEMUA"){renderMapelK();return;}   // semua kelas: hanya "Semua siswa"

  $("kNama").classList.add("sk");
  try{
    const j=await rpcK("siswa_khusus",{p_kode:khususKode,p_device:DEVICE_ID,p_kelas:kelas});
    if(tok!==tokenNamaK)return;
    khususSiswa=Array.isArray(j)?j:[];
    khususSiswa.forEach(s=>{
      const o=document.createElement("option");o.value=s.nama;o.textContent=s.nama;
      $("kNama").appendChild(o);
    });
  }catch(e){
    toast("❌ "+e.message,4000);
  }finally{
    if(tok===tokenNamaK)$("kNama").classList.remove("sk");
  }
  renderMapelK();
}

function renderMapelK(){
  const kelas=$("kKelas").value,nama=$("kNama").value;
  $("kMapel").innerHTML='<option value="SEMUA">Semua mapel</option>';

  if(kelas==="SEMUA"){
    $("kInfo").style.display="block";
    $("kInfo").textContent="Semua kelas: semua mapel hari ini untuk semua siswa.";
    return;
  }
  const konfig=KONFIG_KELAS[kelas];
  if(!konfig){$("kInfo").style.display="none";return;}

  const list=(konfig.jadwal[hariIni()]||[]).filter(m=>m!==PAK);
  const sis=khususSiswa.find(s=>s.nama===nama);
  list.forEach(m=>{
    const o=document.createElement("option");o.value=m;o.textContent=m;
    if(m===PAI&&sis&&sis.agama==="Nonis"){o.disabled=true;o.textContent=m+" 🔒 Khusus Islam";}
    $("kMapel").appendChild(o);
  });
  $("kInfo").style.display="block";
  $("kInfo").textContent=list.length
    ? `${list.length} mapel hari ${hariIni()}. Pilih "Semua mapel" untuk mencatat semuanya.`
    : `Tidak ada mapel terjadwal hari ${hariIni()} untuk kelas ini.`;
}

$("kKelas").addEventListener("change",muatNamaK);
$("kNama").addEventListener("change",renderMapelK);

/* ===== keterangan izin ===== */
function toggleKetK(){
  const st=document.querySelector('input[name="statusK"]:checked')?.value;
  if(st==="Izin"){$("ketBoxK").style.display="block";}
  else{$("ketBoxK").style.display="none";$("ketK").value="";$("ketCountK").textContent="0";}
}
document.querySelectorAll('input[name="statusK"]').forEach(r=>r.addEventListener("change",toggleKetK));
$("ketK").addEventListener("input",()=>{$("ketCountK").textContent=$("ketK").value.length;});

/* ===== kirim ===== */
$("formKhusus").addEventListener("submit",async e=>{
  e.preventDefault();
  if(!khususKode){toast("📷 Scan QR wewenang dulu!");return;}
  const kelas=$("kKelas").value,nama=$("kNama").value,mapel=$("kMapel").value;
  const status=document.querySelector('input[name="statusK"]:checked')?.value;
  const ket=$("ketK").value.trim();

  if(!status){toast("Pilih status kehadiran!");return;}
  if(status==="Izin"&&ket.length<5){
    toast("✍️ Tulis keterangan izin (minimal 5 huruf)",4000);
    $("ketK").focus();return;
  }

  if(kelas==="SEMUA"||nama==="SEMUA"||mapel==="SEMUA"){
    const kelasTxt=kelas==="SEMUA"?"SEMUA KELAS":kelas;
    const namaTxt=nama==="SEMUA"?(kelas==="SEMUA"?"semua siswa":"semua siswa "+kelas):nama;
    const mapelTxt=mapel==="SEMUA"?"semua mapel hari ini":mapel;
    if(!confirm(`Catat "${status}" untuk:\n• ${kelasTxt} / ${namaTxt}\n• ${mapelTxt}\n\nLanjutkan?`))return;
  }

  const btn=$("kSend");btn.disabled=true;btn.textContent="Menyimpan...";
  try{
    const j=await rpcK("kirim_absen_khusus",{
      p_kode:khususKode,p_device:DEVICE_ID,
      p_kelas:kelas,p_nama:nama,p_mapel:mapel,
      p_status:status,p_keterangan:status==="Izin"?ket:null
    });
    const n=Number(j)||0;
    $("kSuccess").style.display="block";
    if(n>0){
      $("kSuccess").textContent=`✅ ${n} data absen (${status}) tersimpan`;
      toast(`${n} data tersimpan`);
    }else{
      $("kSuccess").textContent="ℹ️ Tidak ada data baru. Mungkin sudah absen, tidak ada di jadwal hari ini, atau PAI untuk siswa Nonis.";
      toast("Tidak ada data baru",4000);
    }
    resetStatusK();
  }catch(err){
    toast("❌ "+err.message,5000);
  }finally{
    btn.disabled=false;btn.textContent="Kirim Absensi (Wewenang)";
  }
});