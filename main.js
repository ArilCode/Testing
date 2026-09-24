const SIZE = 8;
const COLORS = ['#00e5ff','#ff4081','#ffea00','#69f0ae','#b388ff','#ff6e40'];
const SHAPES = [[[1]], [[1,1]], [[1],[1]], [[1,1],[1,1]], [[1,1,1]], [[1],[1],[1]], [[1,1,1],[0,1,0]], [[0,1,0],[1,1,1]], [[1,0],[1,1],[1,0]], [[0,1],[1,1], [0,1]], [[1,0],[1,1]], [[0,1],[1,1]], [[1,1],[0,1]], [[1,1],[1,0]], [[1,0],[1,1],[0,1]], [[0,1],[1,1],[1,0]], [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]], [[1,1,1,1]], [[1,1,1],[1,0,0]], [[1,0,0],[1,1,1]], [[1,1],[1,0],[1,0]], [[1,1],[0,1],[0,1]], [[1,1,1],[1,1,1]], [[1,1],[1,1],[1,1]], [[1,1,1],[1,1,1],[1,1,1]], [[1,0],[0,1]], [[0,1],[1,0]], [[1,0,0],[0,1,0],[0,0,1]],[[0,0,1],[0,1,0],[1,0,0]]];

let board = [], score = 0,combo = 0, best = localStorage.getItem('blastBest') || 0, pieces = [], selected = null, audio, lastTap = 0, isPaused = false;
document.getElementById('best').textContent=best;

function initAudio() {
  if (!audio) audio = new(window.AudioContext || window.webkitAudioContext)();
  if (audio.state==='suspended')audio.resume();
}

function tone (freq, type, vol, dur, delay = 0, slide = 0) {
 initAudio();
 const t = audio.currentTime + delay;
 const o = audio.createOscillator(), g = audio.createGain();
 o.connect(g);
 g.connect(audio.destination);
 o.type=type;
 o.frequency.setValueAtTime(freq, t);
 if(slide) o.frequency.linearRampToValueAtTime(freq + slide, t + dur);
 g.gain.setValueAtTime(vol, t);
 g.gain.exponentialRampToValueAtTime(0.001, t + dur);
 o.start(t);
 o.stop(t + dur);
}

function snd(t){
 initAudio();
 if (t == 'tap') {
   tone(800, 'sine', 0.7, 0.12);
 } else if (t == 'place') { tone(200, 'triangle', 1.0, 0.18);
 tone(400, 'sine', 0.6, 0.18, 0.04);
 } else if(t == 'clear') { tone(500, 'sine', 0.8, 0.15, 0);
 tone(700, 'sine', 0.8, 0.15, 0.06);
 tone(900, 'sine', 0.7,0.20,0.12); }
 else if (t == 'combo') { tone(400, 'square', 0.7, 0.12, 0);
 tone(500, 'square', 0.7, 0.12, 0.08);
 tone(650, 'square', 0.9, 0.25, 0.16);
 } else if(t == 'great') { tone(261, 'triangle', 0.9, 0.35, 0);
 tone(329, 'triangle', 0.9, 0.35, 0.05);
 tone(392, 'triangle', 0.9, 0.35, 0.10);
 tone(523, 'sine', 1.0, 0.45, 0.15);
 } else if(t=='mega') { tone(392, 'sawtooth', 1.0, 0.15, 0);
 tone(493, 'sawtooth', 1.0, 0.15, 0.12);
 tone(659, 'sawtooth', 1.0, 0.15, 0.24);
 tone(784, 'square', 1.2, 0.5, 0.36);
 setTimeout( () => { tone(784, 'sine', 1.0, 0.15, 0);
 tone(1046, 'sine', 1.2, 0.6, 0.1);
 }, 380);
 if (navigator.vibrate) navigator.vibrate([60, 30, 60, 30, 100]);
 } else if (t == 'super') { tone(523, 'sawtooth', 1.0, 0.15, 0);
 tone(659, 'sawtooth', 1.0, 0.15, 0.10);
 tone(783, 'sawtooth', 1.0, 0.15, 0.20);
 tone(1046, 'square', 1.2, 0.6, 0.30);
 if (navigator.vibrate) navigator.vibrate([80, 30, 80, 30, 120]);
 } else if (t == 'legendary') { tone(392, 'square', 1.0, 0.12, 0);
 tone(523, 'square', 1.0, 0.12, 0.10);
 tone(659, 'square', 1.0, 0.12, 0.20);
 tone(783, 'sawtooth', 1.0, 0.15, 0.30);
 tone(1046, 'sawtooth', 1.2, 0.7, 0.45);
 setTimeout( () => { tone(1318, 'sine', 1.2, 0.8, 0);
 }, 500);
 if (navigator.vibrate) navigator.vibrate([100, 40, 100, 40, 100, 40, 200]);
 } else if (t == 'over') { tone(300, 'sawtooth', 0.8, 0.4, 0,-150);
 tone(150, 'triangle', 0.9, 0.6, 0.2, -50);
 }
}

const boardEl = document.getElementById('board'), piecesEl = document.getElementById('pieces');

function createBoard() {
  boardEl.innerHTML = '';
  board = Array(SIZE).fill().map( () => Array(SIZE).fill(0));
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const c = document.createElement('div');
    c.className = 'cell';
    c.dataset.x = x;
    c.dataset.y = y;
  c.addEventListener ('pointerdown', (e) => {
    e.preventDefault();
    if (isPaused) return;
    let now = Date.now();
    if (now - lastTap < 120) return;
    lastTap = now;
    if (selected !== null) placeAt(x,y);
    else hoverAt(x, y);
  });
  c.addEventListener ('pointerenter', () => {if (isPaused) return;
  if (selected !== null) hoverAt(x, y);
  });
  boardEl.appendChild(c);
 }
}

function canPlace (shape, sx, sy) { for (let y = 0; y < shape.length; y++) for (let x = 0; x < shape[y].length; x++) if(shape[y][x]){
  let bx = sx + x, by = sy + y; if(bx < 0 || bx >= SIZE || by < 0 || by >= SIZE) return false;
  if (board[by][bx]) return false;
} return true;
}

function getCell (x, y) {
  if(x < 0 || x >= SIZE || y < 0 || y >= SIZE) return null;
  return boardEl.children[y * SIZE + x];
}

function getPotentialClear (shape, sx, sy) {
  let temp = board.map(r => [...r]);
  for (let dy = 0; dy < shape.length; dy++) for (let dx = 0; dx < shape[dy].length; dx++)
  if (shape[dy][dx]) {
    temp[sy + dy][sx + dx] = 1;
  }
  
  let rows = [], cols =[];
  for (let y = 0; y < SIZE; y++) if(temp[y].every(v => v)) rows.push(y);
  for (let x = 0; x < SIZE; x++) if(temp.every(r => r[x])) cols.push(x);
  return {rows, cols};
}

function hoverAt(x, y){
 if(isPaused) return;
 let sh = null;
 if (selected !== null) sh = pieces[selected].shape;
 else if (window._dragShape) sh = window._dragShape;
 if(!sh) { clearPreview();
 return;
 }

 clearPreview();
 if (!canPlace(sh, x, y)) {
   for (let dy = 0; dy < sh.length; dy++) for (let dx = 0; dx < sh[dy].length; dx++) if(sh[dy][dx]){
   let el = getCell(x + dx, y + dy);
   if(el) el.classList.add('invalid');
  } return;
 }
 for (let dy = 0; dy < sh.length; dy++) for (let dx = 0; dx < sh[dy].length; dx++) if(sh[dy][dx]) {
  let el = getCell(x + dx, y + dy);
  if (el) el.classList.add('preview');
 }
 let pot = getPotentialClear(sh,x,y);
 if(pot.rows.length > 0 || pot.cols.length > 0) {
   pot.rows.forEach(ry => {
     for (let cx = 0; cx < SIZE; cx++) {
       let el = getCell(cx, ry);
       if (el) el.classList.add('will-clear');
     }
   });
   pot.cols.forEach(cx => {
     for (let ry = 0; ry < SIZE; ry++) {
       let el = getCell(cx, ry);
       if (el) el.classList.add('will-clear');
     }
   });
 }
}

function clearPreview() {
  boardEl.querySelectorAll('.cell').forEach(c => c.classList.remove('preview', 'invalid', 'will-clear'));
}

function isBoardEmpty() {
  return board.every(row => row.every(v => v === 0));
}

function checkClear() {
  let toClear = [];
  let rowsClear = 0, colsClear = 0;
 for(let y = 0; y < SIZE; y++) if(board[y].every(v => v)) {
   rowsClear++;
   for(let x = 0; x < SIZE; x++) toClear.push([y,x]);
 }
 
 for (let x = 0; x < SIZE; x++) if(board.every(r => r[x])) {
   colsClear++;
   for (let y = 0; y < SIZE; y++) if (!toClear.some(([yy, xx]) => yy == y && xx == x)) toClear.push([y, x]);
 }
 if (toClear.length) {
   let totalShapes = rowsClear + colsClear;
  let bonusScore = 0;
  let tierText = '';
  combo++;
  document.getElementById('comboCount').textContent = combo;
  if (totalShapes >= 5) { tierText= 'LEGENDARY!';
  bonusScore = 50;
  snd('legendary');
  } else if (totalShapes == 4){ tierText = 'SUPER!';
  bonusScore = 20; 
  snd('super');
  } else if (totalShapes == 3) {
    tierText = 'MEGA!';
    bonusScore = 10; snd('mega');
  } else if (totalShapes == 2) {
    tierText = 'COMBO!';
    bonusScore=  5;
    snd('combo');
  } else if (totalShapes == 1) {
    tierText = 'GREAT!';
    bonusScore=2;
    snd('great');
  }
  score += (toClear.length * 10 * combo) + bonusScore;
  if(combo >= 5) { score += 4;
  tierText = tierText + ' x5 STREAK!';
  }
  document.getElementById('score').textContent = score;
  if (score > best) {
    best = score;
    localStorage.setItem('blastBest', best);
    document.getElementById('best').textContent = best;
  }
  let c = document.getElementById('combo');
  if(tierText) { c.textContent = tierText + ' +' + bonusScore + (combo >= 5 ? ' +4' : '');
  c.classList.remove('show');
  void c.offsetWidth;
  c.classList.add('show');
  }
  toClear.forEach(([y, x]) => {getCell(x, y).classList.add('clear');
  });
  toClear.forEach(([y, x]) => {
    board[y][x] = 0;
  });
  setTimeout( () => {
    toClear.forEach(([y, x]) => { let el = getCell(x, y);
    if (el) { el.className = 'cell';
    el.style.background = '';
    }
    });
    if (isBoardEmpty()) {
      let emptyBonus = 100; score += emptyBonus;
      document.getElementById('score').textContent = score;
      if (score > best) {best = score;
      localStorage.setItem('blastBest', best);
      document.getElementById('best').textContent = best;
      }
      let cc = document.getElementById('combo');
      cc.textContent = 'LEGENDARY+ CLEAR! +' + emptyBonus;
      cc.classList.remove('show'); void cc.offsetWidth; cc.classList.add('show');
      snd('legendary');
    }
    refreshFadedState();
  }, 330);
  return true;
 } else { combo = 0;
 document.getElementById('comboCount').textContent = 0; return false;
 }
}

function canPlaceAny() {
  for (let p of pieces) {
    if (p.used)continue;
    for(let y = 0;
    y < SIZE; y++) for(let x = 0; x < SIZE; x++) if(canPlace(p.shape,x,y)) return true;
  } return false;
}

function placeAt(x, y){
 if (selected === null || isPaused) return;
 let p = pieces[selected];
 if (!p || p.used) return;
 if (!canPlace(p.shape, x, y))
 {
   let el = getCell(x, y);
   if (el) {
     el.classList.add('invalid');
     setTimeout( () => el.classList.remove('invalid'), 180);
   }
  if (navigator.vibrate) navigator.vibrate(30);
  return;
 }
 snd('place');
 for (let dy = 0; dy < p.shape.length; dy++) for(let dx = 0; dx < p.shape[dy].length; dx++) if (p.shape[dy][dx]) {
   board[y + dy][x + dx] = 1;
   let cell = getCell(x + dx, y + dy);
   cell.classList.add('filled'); cell.style.background = p.color;
 }
pieces[selected].used = true;
let usedEl = document.querySelectorAll('.piece')[selected];
usedEl.classList.add('used');
usedEl.style.opacity = '0.25';
usedEl.style.pointerEvents = 'none';
 selected = null; document.querySelectorAll('.piece').forEach(e => e.classList.remove('selected')); clearPreview();
 let isCleared = checkClear();
 setTimeout( () => {
   if (pieces.every(q => q.used)) {
     genPieces();
   }
   else {
     refreshFadedState();
     if (!canPlaceAny()) gameOver();
   }
 }, isCleared ? 360 : 50);
}

function countShapeBlocks (shape) {
  let c = 0;
  shape.forEach(r => r.forEach(v => {
    if (v) c++;
  }));
  return c;
}

function canPlaceShapeAnywhere (shape) {
  for(let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (canPlace(shape, x, y))
  return true;
  return false;
}

function getEmptyCellsCount() {
  let c = 0; for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (!board[y][x]) c++;
  return c;
}

function genPieces() {
  piecesEl.innerHTML = '';
  pieces = [];
 const emptyCount = getEmptyCellsCount();
 const isAlmostFull = emptyCount < 20;
 const isEmpty = isBoardEmpty();
 let sortedShapes = [...SHAPES].sort((a, b) => countShapeBlocks(a) - countShapeBlocks(b));
 for (let i = 0; i < 3; i++) {
   let shape, color;
   let attempts = 0;
   let maxAttempts = 100;
   do {
     if (isEmpty) {
      shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
     } else if (isAlmostFull) {
      if (Math.random() < 0.7) {
        let smallPool = sortedShapes.filter(s => countShapeBlocks(s) <= 3);
        shape = smallPool[Math.floor(Math.random() * smallPool.length)];
      } else {
        let mediumPool = sortedShapes.filter(s => countShapeBlocks(s) <= 4);
        shape = mediumPool[Math.floor(Math.random() * mediumPool.length)];
      }
     } else {
      shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    }
    attempts++;
    if (attempts > maxAttempts - 10) {
      let tinyPool = sortedShapes.filter(s => countShapeBlocks(s) <= 2);
      for (let ts of tinyPool) {
        if (canPlaceShapeAnywhere(ts)) {
          shape = ts;
          break;
        }
      }
    }
  } while (!canPlaceShapeAnywhere(shape) && attempts < maxAttempts);
  if (!canPlaceShapeAnywhere(shape)) {
    shape = [[1]];
  }
  color = COLORS[Math.floor(Math.random() * COLORS.length)];
  pieces.push({shape, color, used: false});
  const el = document.createElement('div');
  el.className = 'piece';
  el.dataset.i = i;
  el.style.gridTemplateColumns = `repeat(${shape[0].length},22px)`;
  el.style.touchAction = 'none';
  el.addEventListener('pointerdown',(e) => {e.preventDefault();
  if (isPaused) return; selectPiece(i, el);
  }
  );
  shape.forEach(row => row.forEach(v => {
   const d=document.createElement('div');d.className='p-cell';d.style.background=v?color:'transparent';d.style.visibility=v?'visible':'hidden';el.appendChild(d);
  }));
  piecesEl.appendChild(el);
  makeDraggable(el,i);
 }
 refreshFadedState();
 if(!canPlaceAny()) setTimeout(gameOver,400);
}
function selectPiece(i,el){
 if(pieces[i].used||isPaused) return;
 if(el.classList.contains('no-place')){
   if(navigator.vibrate) navigator.vibrate(30);
 }
 snd('tap');
 if(selected===i){selected=null;document.querySelectorAll('.piece').forEach(p=>p.classList.remove('selected'));clearPreview();return;}
 selected=i;document.querySelectorAll('.piece').forEach(p=>p.classList.remove('selected'));el.classList.add('selected');
}
function refreshFadedState(){
  const pieceEls = document.querySelectorAll('.piece');
  pieceEls.forEach((el, idx)=>{
    if(!pieces[idx] || pieces[idx].used) return;
    let canPlace = canPlaceShapeAnywhere(pieces[idx].shape);
    if(!canPlace){
      el.classList.add('no-place');
      el.style.opacity = '0.35';
      el.style.filter = 'grayscale(0.4) brightness(0.9)';
      el.style.transition = 'opacity 0.25s, filter 0.25s';
    } else {
      el.classList.remove('no-place');
      el.style.opacity = '1';
      el.style.filter = 'none';
      el.style.transition = 'opacity 0.25s, filter 0.25s';
    }
  });
}

// ========== DRAG ==========
let _dragGhost=null;
function makeDraggable(pieceEl, idx){
 let startX=0, startY=0, isDragging=false, moved=false;
 let ghostW=0, ghostH=0;
 pieceEl.addEventListener('pointerdown', (e)=>{
  if(pieces[idx].used || isPaused) return;
  startX = e.clientX; startY = e.clientY;
  moved=false; isDragging=false;
  pieceEl._dragInfo = { idx: idx };
 });
 pieceEl.addEventListener('pointermove', (e)=>{
  if(pieceEl._dragInfo===undefined) return;
  let dx = e.clientX - startX, dy = e.clientY - startY;
  if(!moved && Math.hypot(dx,dy) < 10) return;
  moved=true;
  if(!isDragging){
    isDragging=true;
    window._dragShape = pieces[idx].shape;
    selected = null;
    document.querySelectorAll('.piece').forEach(p=>p.classList.remove('selected'));
    _dragGhost=document.createElement('div');
    _dragGhost.style.position='fixed';
    _dragGhost.style.zIndex='9999';
    _dragGhost.style.pointerEvents='none';
    _dragGhost.style.display='grid';
    _dragGhost.style.gridTemplateColumns=`repeat(${pieces[idx].shape[0].length},22px)`;
    _dragGhost.style.opacity='0.95';
    pieces[idx].shape.forEach(row=>row.forEach(v=>{
      let d=document.createElement('div');
      d.style.width='22px'; d.style.height='22px'; d.style.borderRadius='4px';
      d.style.background=v?pieces[idx].color:'transparent';
      _dragGhost.appendChild(d);
    }));
    document.body.appendChild(_dragGhost);
    ghostW = _dragGhost.offsetWidth;
    ghostH = _dragGhost.offsetHeight;
    pieceEl.style.opacity='0.15';
  }
  let isTouch = e.pointerType === 'touch';
  let visualOffset = isTouch? 40 : 0;
  if(_dragGhost){
    _dragGhost.style.left = (e.clientX - ghostW/2) + 'px';
    _dragGhost.style.top = (e.clientY - ghostH/2 - visualOffset) + 'px';
  }
  let rect = boardEl.getBoundingClientRect();
  let cellW = rect.width/SIZE;
  let cellH = rect.height/SIZE;
  let extendedBottom = rect.bottom + 40;
  if(e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= extendedBottom){
    let cx = Math.floor((e.clientX - rect.left) / cellW);
    let cy = Math.floor((e.clientY - rect.top) / cellH);
    cx -= Math.floor(pieces[idx].shape[0].length/2);
    cy -= Math.floor(pieces[idx].shape.length/2);
    cx = Math.max(0, Math.min(SIZE - pieces[idx].shape[0].length, cx));
    cy = Math.max(0, Math.min(SIZE - pieces[idx].shape.length, cy));
    hoverAt(cx,cy);
    pieceEl._lastPos = {x:cx,y:cy};
  }else{
    clearPreview();
    pieceEl._lastPos = null;
  }
 });
 const end = (e)=>{
  if(pieceEl._dragInfo===undefined) return;
  let wasDrag = isDragging;
  let lastPos = pieceEl._lastPos;
  if(_dragGhost){ _dragGhost.remove(); _dragGhost=null; }
  if(pieceEl.classList.contains('no-place')){
    pieceEl.style.opacity='0.35';
  } else {
    pieceEl.style.opacity='1';
  }
  clearPreview();
  window._dragShape=null;
  if(wasDrag && lastPos){
    if(canPlace(pieces[idx].shape, lastPos.x, lastPos.y)){
      snd('place');
      for(let dy=0;dy<pieces[idx].shape.length;dy++) for(let dx=0;dx<pieces[idx].shape[dy].length;dx++) if(pieces[idx].shape[dy][dx]){
        board[lastPos.y+dy][lastPos.x+dx]=1;
        let cell=getCell(lastPos.x+dx,lastPos.y+dy);
        cell.classList.add('filled'); cell.style.background=pieces[idx].color;
      }
      pieces[idx].used = true;
      pieceEl.classList.add('used');
      pieceEl.style.opacity = '0.25';
      pieceEl.style.pointerEvents = 'none';
      let isCleared=checkClear();
      setTimeout(()=>{ if(pieces.every(q=>q.used)){ genPieces(); } else { refreshFadedState(); if(!canPlaceAny()) gameOver(); } }, isCleared? 360 : 50);
    }
  }
  pieceEl._dragInfo=undefined;
 };
 pieceEl.addEventListener('pointerup', end);
 pieceEl.addEventListener('pointercancel', ()=>{
   if(_dragGhost) _dragGhost.remove(); _dragGhost=null;
   if(pieceEl.classList.contains('no-place')) pieceEl.style.opacity='0.35';
   else pieceEl.style.opacity='1';
   clearPreview(); window._dragShape=null; pieceEl._dragInfo=undefined;
 });
}

function toggleMenu(){ initAudio(); const m=document.getElementById('menu'); if(m.classList.contains('show')){ snd('tap'); m.classList.remove('show'); isPaused=false; } else { snd('tap'); isPaused=true; m.classList.add('show'); } }
function resumeGame(){ snd('place'); document.getElementById('menu').classList.remove('show'); isPaused=false; }
function restartFromMenu(){ snd('clear'); document.getElementById('menu').classList.remove('show'); setTimeout(()=>restart(),150); }
function openCredit(){ snd('tap'); document.getElementById('credit').classList.add('show'); }
function closeCredit(){ snd('tap'); document.getElementById('credit').classList.remove('show'); }
function exitGame(){ snd('over'); if(confirm('Keluar dari game? Skor Best tetap kesimpan.')){ try{ window.close(); }catch(e){} setTimeout(()=>{ location.href='about:blank'; },300); } }
function gameOver(){ snd('over'); document.getElementById('final').textContent=score; document.getElementById('over').classList.add('show');}
function restart(){score=0; combo=0; selected=null; isPaused=false; document.getElementById('score').textContent=0; document.getElementById('comboCount').textContent=0; document.getElementById('over').classList.remove('show'); document.getElementById('menu').classList.remove('show'); createBoard(); genPieces();}
createBoard(); genPieces();