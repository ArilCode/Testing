
// === CONFIG ===
let SNAKES={97:78,95:24,92:84,62:37,48:12,35:6,16:4};
let LADDERS={3:22,8:26,21:42,28:77,52:68,72:90,80:98};
const COLORS=['#00e5ff','#ff4081','#ffde59','#69f0ae'];
let peer=null, conn=[], isHost=false, myId='', roomId='', myName='';
let players=[], turn=0, playing=false, moving=false;
let boardEl=document.getElementById('board');

// === LOBBY ===
function createRoom(){
  myName=document.getElementById('playerName').value||'Host';
  isHost=true;
  roomId=Math.random().toString(36).substring(2,6).toUpperCase();
  peer=new Peer('ular-'+roomId);
  peer.on('open', id=>{
    myId=id;
    document.getElementById('lobby').classList.add('hide');
    document.getElementById('room').classList.remove('hide');
    document.getElementById('myCode').textContent=roomId;
    document.getElementById('startBtn').classList.remove('hide');
    players=[{id:myId,name:myName,pos:0,color:COLORS[0],isHost:true}];
    renderLobby();
  });
  peer.on('connection', c=>{
    conn.push(c);
    c.on('open', ()=>{ c.send({type:'welcome', players, roomId}); });
    c.on('data', handleData);
  });
}

function joinRoom(){
  myName=document.getElementById('playerName').value||'Player';
  let code=document.getElementById('joinCode').value.toUpperCase();
  if(!code) return alert('Masukan kode room!');
  roomId=code;
  peer=new Peer();
  peer.on('open', id=>{
    myId=id;
    let c=peer.connect('ular-'+roomId);
    conn=[c];
    c.on('open', ()=>c.send({type:'join', name:myName, id:myId}));
    c.on('data', handleData);
    document.getElementById('lobby').classList.add('hide');
    document.getElementById('room').classList.remove('hide');
    document.getElementById('myCode').textContent=roomId;
  });
}

function renderLobby(){
  document.getElementById('playerList').innerHTML=players.map(p=>`<div class="p-card" style="border-top:3px solid ${p.color}">${p.name}${p.isHost?' 👑':''}<br>${p.pos}</div>`).join('');
  document.getElementById('roomLog').textContent=`${players.length}/4 Pemain - ${isHost?'Kamu Host':'Menunggu host start'}`;
  if(isHost) broadcast({type:'updatePlayers', players});
}

function handleData(data){
  if(data.type==='welcome'){ players=data.players; renderLobby(); }
  if(data.type==='join'){
    if(isHost){
      players.push({id:data.id,name:data.name,pos:0,color:COLORS[players.length%4],isHost:false});
      renderLobby();
    }
  }
  if(data.type==='updatePlayers'){ players=data.players; renderLobby(); }
  if(data.type==='startGame'){ startGameClient(data); }
  if(data.type==='roll'){ movePlayer(data.id, data.dice); }
  if(data.type==='sync'){ players=data.players; turn=data.turn; renderGame(); }
}

function broadcast(d){ conn.forEach(c=>c.open&&c.send(d)); }

// === GAME LOGIC MABAR ===
function hostStartGame(){
  if(players.length<2) return alert('Minimal 2 pemain!');
  broadcast({type:'startGame', players, turn:0});
  startGameClient({players, turn:0});
}
function startGameClient(data){
  players=data.players; turn=data.turn||0; playing=true;
  document.getElementById('room').classList.add('hide');
  document.getElementById('game').classList.remove('hide');
  createBoard(); renderGame();
}

function createBoard(){
  boardEl.innerHTML='';
  for(let row=0; row<10; row++){
    for(let col=0; col<10; col++){
      let r=row; let base=100-r*10; let n=r%2===0? base-col : base-9+col;
      let d=document.createElement('div'); d.className='cell'; d.id='c'+n;
      if(LADDERS[n]) d.classList.add('ladder');
      if(SNAKES[n]) d.classList.add('snake');
      let lbl=LADDERS[n]?`↑${LADDERS[n]}`:SNAKES[n]?`↓${SNAKES[n]}`:'';
      d.innerHTML=`<b>${n}</b><small>${lbl}</small>`; boardEl.appendChild(d);
    }
  }
}

function renderGame(){
  document.getElementById('gamePlayers').innerHTML=players.map((p,i)=>`<div class="p-card ${i===turn?'turn':''}" style="border-top:3px solid ${p.color}">${p.name}<br>${p.pos===0?'START':p.pos}${i===turn?' ⏳':''}</div>`).join('');
  document.querySelectorAll('.pion').forEach(e=>e.remove());
  players.forEach(p=>{
    if(p.pos===0) return;
    let cell=document.getElementById('c'+p.pos); if(!cell) return;
    let pion=document.createElement('div'); pion.className='pion'; pion.style.background=p.color; pion.textContent=p.name[0]; cell.appendChild(pion);
  });
  let cur=players[turn];
  let isMyTurn=cur&&cur.id===myId;
  document.getElementById('gameLog').innerHTML=isMyTurn?`Giliran Kamu <b style="color:${cur.color}">${cur.name}</b>! Lempar dadu!`:`Giliran <b style="color:${cur.color}">${cur.name}</b>`;
  document.getElementById('diceBtn').disabled=!isMyTurn||moving;
}

function rollDiceMabar(){
  if(moving) return;
  let cur=players[turn]; if(cur.id!==myId) return;
  let d=Math.floor(Math.random()*6)+1;
  document.getElementById('diceResult').textContent=['','⚀','⚁','⚂','⚃','⚄','⚅'][d];
  if(isHost){
    movePlayer(myId,d);
    broadcast({type:'roll', id:myId, dice:d});
  } else {
    conn[0].send({type:'roll', id:myId, dice:d});
    movePlayer(myId,d);
  }
}

function movePlayer(id,dice){
  moving=true;
  let p=players.find(x=>x.id===id);
  let target=p.pos===0?dice:p.pos+dice;
  if(target>100){ moving=false; document.getElementById('gameLog').textContent=`Butuh ${100-p.pos} pas!`; nextTurnMabar(); return; }
  let cur=p.pos===0?0:p.pos;
  let it=setInterval(()=>{
    if(cur<target){ cur++; p.pos=cur; renderGame(); }
    else {
      clearInterval(it);
      if(LADDERS[p.pos]){ document.getElementById('gameLog').textContent=`🪜 TANGGA ${p.name} ${p.pos}→${LADDERS[p.pos]}`; p.pos=LADDERS[p.pos]; }
      if(SNAKES[p.pos]){ document.getElementById('gameLog').textContent=`🐍 ULAR ${p.name} ${p.pos}→${SNAKES[p.pos]}`; p.pos=SNAKES[p.pos]; }
      setTimeout(()=>{ renderGame(); if(p.pos===100){ document.getElementById('gameLog').textContent=`🏆 ${p.name} MENANG!`; playing=false; } else nextTurnMabar(); moving=false; },400);
    }
  },150);
}

function nextTurnMabar(){
  turn=(turn+1)%players.length;
  if(isHost) broadcast({type:'sync', players, turn});
  renderGame();
}
