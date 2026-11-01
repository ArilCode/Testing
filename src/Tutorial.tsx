import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type {CalculateMetadataFunction} from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';

const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const MONO = 'ui-monospace, Menlo, Consolas, "DejaVu Sans Mono", monospace';
const C = {
  bg1: '#0b1020',
  violet: '#6d5dfc',
  cyan: '#22d3ee',
  text: '#f4f7ff',
  soft: '#a9b6d6',
};
const URL_TEXT = 'ace-converter.vercel.app';

type Box = [number, number, number, number]; // x, y, w, h (persen dari gambar)
type Sub = {text: string; boxes?: Box[]; typed?: string};
type Step = {title: string; img: string; subs: Sub[]};

const STEPS: Step[] = [
  {
    title: 'Buka browser',
    img: 'shots/1-browser.jpg',
    subs: [{text: 'Buka browser di HP kamu, lalu ketuk kolom pencarian.', boxes: [[4.5, 21.7, 91, 9]]}],
  },
  {
    title: 'Ketuk kolom pencarian',
    img: 'shots/2-cari.jpg',
    subs: [{text: 'Kolom alamat terbuka dan keyboard muncul.', boxes: [[2.2, 4.7, 95.5, 5.9]]}],
  },
  {
    title: 'Ketik alamat web',
    img: 'shots/3-ketik.jpg',
    subs: [
      {text: 'Ketik alamat ini di kolom pencarian:', typed: URL_TEXT, boxes: [[2.2, 4.7, 95.5, 5.9]]},
      {text: 'Ketuk saran ACE Converter atau tombol panah biru.', boxes: [[2.2, 11.2, 95.5, 6.9]]},
    ],
  },
  {
    title: 'Pilih jenis konversi',
    img: 'shots/4-konversi.jpg',
    subs: [
      {text: 'Pilih jenis konversi sesuai kebutuhan. Contoh ini: Gambar ke PDF.', boxes: [[4.6, 39.5, 90.8, 8.1]]},
      {text: 'Ketuk "Pilih File".', boxes: [[38.9, 76.9, 22.2, 4.9]]},
    ],
  },
  {
    title: 'Pilih foto',
    img: 'shots/5-pilih-foto.jpg',
    subs: [
      {text: 'Pilih 1 atau 2 foto (atau lebih) sesuai kebutuhan.', boxes: [[0, 23.5, 33.3, 15], [33.3, 23.5, 33.3, 15]]},
      {text: 'Setelah itu ketuk "Done".', boxes: [[70.4, 88, 22.4, 5]]},
    ],
  },
  {
    title: 'Atur pengaturan PDF',
    img: 'shots/6-pengaturan.jpg',
    subs: [
      {text: 'Orientasi: Potret, Lanskap, atau Otomatis.', boxes: [[9.2, 24.6, 81.7, 8.4]]},
      {text: 'Ukuran kertas: pilih A4 atau ukuran lain.', boxes: [[9.2, 38.8, 81.7, 5.7]]},
      {text: 'Ukuran margin: Tanpa, Kecil, Sedang, atau Besar.', boxes: [[9.2, 50.3, 81.7, 14.9]]},
      {text: 'Penempatan gambar: Muat utuh atau Penuhi area.', boxes: [[9.2, 74.3, 81.7, 7.8]]},
      {text: 'Kualitas dan ukuran file: pilih Seimbang (disarankan).', boxes: [[9.2, 87.8, 81.7, 5.7]]},
    ],
  },
  {
    title: 'Unduh atau lihat hasil',
    img: 'shots/7-hasil.jpg',
    subs: [
      {text: 'Watermark logo ACE: nyalakan atau matikan.', boxes: [[9.2, 22.9, 81.7, 9.3]]},
      {text: 'Pratinjau tata letak menunjukkan susunan halaman.', boxes: [[9.2, 37.9, 81.7, 29.6]]},
      {text: 'Isi nama file hasil.', boxes: [[9.2, 76.6, 81.7, 5.9]]},
      {text: 'Ketuk "Konversi & Download" untuk mengunduh PDF.', boxes: [[9.2, 84.8, 81.7, 5.9]]},
      {text: 'Atau ketuk "Preview" untuk melihat contoh hasil.', boxes: [[9.2, 92.1, 81.7, 5.8]]},
    ],
  },
];

/* ---------- Waktu (mengikuti panjang suara) ---------- */
export type Props = {hasAudio: boolean; intro: number; outro: number; subs: number[][]};

export const defaultProps: Props = {
  hasAudio: false,
  intro: 110,
  outro: 140,
  subs: STEPS.map((s) => s.subs.map(() => 130)),
};

const FPS = 30;
const PAD = 22;

const totalOf = (p: Props) => p.intro + p.outro + p.subs.reduce((a, r) => a + r.reduce((x, y) => x + y, 0), 0);

export const calcMetadata: CalculateMetadataFunction<Props> = async ({props}) => {
  try {
    const dur = async (name: string) => Math.ceil((await getAudioDurationInSeconds(staticFile(`audio/${name}.mp3`))) * FPS);
    const intro = (await dur('intro')) + PAD + 10;
    const outro = (await dur('outro')) + PAD + 30;
    const subs: number[][] = [];
    for (let i = 0; i < STEPS.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < STEPS[i].subs.length; j++) {
        row.push(Math.max(70, (await dur(`s${i + 1}-${j + 1}`)) + PAD));
      }
      subs.push(row);
    }
    const next: Props = {hasAudio: true, intro, outro, subs};
    return {durationInFrames: totalOf(next), props: next};
  } catch (e) {
    return {durationInFrames: totalOf(props), props};
  }
};

const buildTimeline = (p: Props) => {
  let t = p.intro;
  const steps = STEPS.map((s, i) => {
    let local = 0;
    const subs = s.subs.map((_, j) => {
      const d = p.subs[i][j];
      const o = {from: local, dur: d, audio: `audio/s${i + 1}-${j + 1}.mp3`};
      local += d;
      return o;
    });
    const o = {from: t, dur: local, subs};
    t += local;
    return o;
  });
  return {steps, outroFrom: t, total: t + p.outro};
};

/* ---------- Komponen kecil ---------- */
const Words: React.FC<{text: string; start?: number; stagger?: number; style?: React.CSSProperties}> = ({
  text,
  start = 0,
  stagger = 2.5,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={style}>
      {text.split(' ').map((w, i) => {
        const p = spring({frame: frame - start - i * stagger, fps, config: {damping: 15, stiffness: 140}});
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: p,
              transform: `translateY(${(1 - p) * 30}px) scale(${0.9 + 0.1 * p})`,
              marginRight: '0.28em',
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

const Background: React.FC<{total: number}> = ({total}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const orb = (cx: number, cy: number, r: number, color: string, ph: number, sp: number) => {
    const x = cx * W + Math.sin(frame / sp + ph) * W * 0.08;
    const y = cy * H + Math.cos(frame / (sp * 1.3) + ph) * H * 0.06;
    return (
      <div
        style={{
          position: 'absolute',
          left: x - r,
          top: y - r,
          width: r * 2,
          height: r * 2,
          borderRadius: '50%',
          background: color,
          filter: 'blur(120px)',
          opacity: 0.55,
        }}
      />
    );
  };
  const progress = interpolate(frame, [0, total], [0, 100], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: C.bg1}}>
      {orb(0.85, 0.1, Math.max(W, H) * 0.28, '#0e5a70', 0, 60)}
      {orb(0.1, 0.9, Math.max(W, H) * 0.3, '#3b1a7a', 2, 75)}
      {orb(0.55, 0.5, Math.max(W, H) * 0.18, '#1a2d8a', 4, 90)}
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 10, width: `${progress}%`, background: `linear-gradient(90deg, ${C.violet}, ${C.cyan})`}} />
    </AbsoluteFill>
  );
};

const Highlight: React.FC<{box: Box; local: number; imgW: number; imgH: number}> = ({box, local, imgW, imgH}) => {
  const {fps} = useVideoConfig();
  const f = local - 8;
  const pop = spring({frame: f, fps, config: {damping: 13}});
  const pulse = 1 + 0.02 * Math.sin(local / 4);
  const [x, y, w, h] = box;
  const showTap = w < 95 && h < 16;
  const cx = ((x + w / 2) / 100) * imgW;
  const cy = ((y + h / 2) / 100) * imgH;
  const ring = (off: number) => {
    const p = ((Math.max(0, f) + off) % 42) / 42;
    return (
      <div
        style={{
          position: 'absolute',
          left: cx - 90 * p - 20,
          top: cy - 90 * p - 20,
          width: 40 + 180 * p,
          height: 40 + 180 * p,
          borderRadius: '50%',
          border: `4px solid ${C.cyan}`,
          opacity: (1 - p) * pop,
        }}
      />
    );
  };
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: `${w}%`,
          height: `${h}%`,
          border: `5px solid ${C.cyan}`,
          borderRadius: 20,
          boxShadow: `0 0 0 6px rgba(34,211,238,0.22), 0 0 ${30 + 14 * Math.sin(local / 5)}px ${C.cyan}`,
          transform: `scale(${pop * pulse})`,
          opacity: pop,
          boxSizing: 'border-box',
        }}
      />
      {showTap ? (
        <>
          {ring(0)}
          {ring(21)}
          <div
            style={{
              position: 'absolute',
              left: cx - 14,
              top: cy - 14,
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: C.cyan,
              boxShadow: `0 0 24px ${C.cyan}`,
              transform: `scale(${pop * (1 + 0.15 * Math.sin(local / 3))})`,
            }}
          />
        </>
      ) : null}
    </>
  );
};

const cam = (sub: Sub | undefined, imgW: number, imgH: number) => {
  if (!sub || !sub.boxes || !sub.boxes.length) return {s: 1, tx: 0, ty: 0};
  const x0 = Math.min(...sub.boxes.map((b) => b[0]));
  const x1 = Math.max(...sub.boxes.map((b) => b[0] + b[2]));
  const y0 = Math.min(...sub.boxes.map((b) => b[1]));
  const y1 = Math.max(...sub.boxes.map((b) => b[1] + b[3]));
  const s = Math.max(1, Math.min(1.45, 90 / (x1 - x0), 60 / (y1 - y0)));
  const cx = (((x0 + x1) / 2) / 100) * imgW;
  const cy = (((y0 + y1) / 2) / 100) * imgH;
  return {s, tx: cx * (1 - s), ty: cy * (1 - s)};
};

/* ---------- Fokus ke link yang diketik ---------- */
const UrlFocus: React.FC<{local: number; dur: number}> = ({local, dur}) => {
  const {fps, width: W, height: H} = useVideoConfig();
  const isV = H > W;
  const cardW = isV ? 1000 : 1400;
  const fontSize = Math.floor((cardW - 190) / (URL_TEXT.length * 0.62));
  const enter = spring({frame: local, fps, config: {damping: 14}});
  const out = interpolate(local, [dur - 14, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const typeStart = 20;
  const perChar = 3.4;
  const typedCount = Math.min(URL_TEXT.length, Math.max(0, Math.floor((local - typeStart) / perChar)));
  const doneAt = typeStart + URL_TEXT.length * perChar;
  const done = local > doneAt;
  const glow = 30 + 20 * Math.sin(local / 5);
  const sweepX = interpolate((local - doneAt) % 60, [0, 60], [-30, 130]);
  return (
    <AbsoluteFill style={{opacity: out, alignItems: 'center', justifyContent: 'center'}}>
      <AbsoluteFill style={{background: 'rgba(3,6,18,0.72)', opacity: enter}} />
      <div style={{transform: `scale(${0.8 + 0.2 * enter}) translateY(${(1 - enter) * 40}px)`, opacity: enter, textAlign: 'center'}}>
        <div style={{color: C.soft, fontSize: isV ? 44 : 40, fontWeight: 700, marginBottom: 28}}>Ketik alamat ini di kolom pencarian</div>
        <div
          style={{
            width: cardW,
            boxSizing: 'border-box',
            padding: '38px 50px',
            borderRadius: 999,
            background: '#0c1330',
            border: `5px solid ${C.cyan}`,
            boxShadow: `0 0 ${glow}px ${C.cyan}, 0 0 ${glow * 3}px rgba(34,211,238,0.35)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            transform: done ? `scale(${1 + 0.012 * Math.sin(local / 5)})` : 'none',
          }}
        >
          <svg width={fontSize * 0.9} height={fontSize * 0.9} viewBox="0 0 24 24" fill="none" stroke={C.cyan} strokeWidth="2" style={{marginRight: 24, flexShrink: 0}}>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          </svg>
          <div style={{fontFamily: MONO, fontWeight: 800, fontSize, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center'}}>
            {URL_TEXT.split('').map((ch, i) => {
              const p = spring({frame: local - (typeStart + i * perChar), fps, config: {damping: 9, stiffness: 220}});
              const shown = i < typedCount;
              const isDomain = i < 13; // "ace-converter"
              const flash = interpolate(p, [0, 0.5, 1], [0, 1, 0], {extrapolateRight: 'clamp'});
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: shown ? 1 : 0,
                    transform: `translateY(${(1 - Math.min(1, p)) * -26}px) scale(${1 + 0.35 * flash})`,
                    color: shown && flash > 0.4 ? C.cyan : isDomain ? '#ffffff' : C.soft,
                    textShadow: isDomain && done ? `0 0 18px ${C.cyan}` : 'none',
                  }}
                >
                  {ch}
                </span>
              );
            })}
            <span style={{display: 'inline-block', width: 6, height: fontSize * 0.95, marginLeft: 6, background: C.cyan, opacity: Math.floor(local / 8) % 2 === 0 ? 1 : 0}} />
          </div>
          {done ? (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sweepX}%`,
                width: '16%',
                background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.22), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Scene langkah ---------- */
const StepScene: React.FC<{index: number; step: Step; tl: {dur: number; subs: {from: number; dur: number; audio: string}[]}; hasAudio: boolean}> = ({
  index,
  step,
  tl,
  hasAudio,
}) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const isV = H > W;
  const d = tl.dur;

  const fadeIn = interpolate(frame, [0, 14], [0, 1], {extrapolateRight: 'clamp'});
  const fadeOut = interpolate(frame, [d - 12, d], [1, 0], {extrapolateLeft: 'clamp'});
  const fade = Math.min(fadeIn, fadeOut);
  const phoneIn = spring({frame, fps, config: {damping: 15, stiffness: 90}});
  const float = Math.sin(frame / 22) * 7;

  let activeIdx = 0;
  tl.subs.forEach((s, i) => {
    if (frame >= s.from) activeIdx = i;
  });
  const sub = step.subs[activeIdx];
  const subT = tl.subs[activeIdx];
  const subLocal = frame - subT.from;

  const imgH = isV ? 1244 : 930;
  const imgW = imgH * (720 / 1600);

  // kamera zoom halus
  const cur = cam(sub, imgW, imgH);
  const prev = activeIdx > 0 ? cam(step.subs[activeIdx - 1], imgW, imgH) : {s: 1, tx: 0, ty: 0};
  const t = interpolate(subLocal, [0, 32], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const camS = prev.s + (cur.s - prev.s) * t;
  const camX = prev.tx + (cur.tx - prev.tx) * t;
  const camY = prev.ty + (cur.ty - prev.ty) * t;

  const phone = (
    <div
      style={{
        position: 'absolute',
        ...(isV
          ? {top: 330, left: (W - imgW) / 2 - 14, transform: `translateY(${(1 - phoneIn) * 120 + float}px)`}
          : {top: (H - imgH - 28) / 2, left: 1130 + (780 - imgW) / 2 - 14, transform: `translateX(${(1 - phoneIn) * 260}px) translateY(${float}px)`}),
        padding: 14,
        borderRadius: 64,
        background: '#05070f',
        border: '3px solid #2b3556',
        boxShadow: '0 40px 90px rgba(0,0,0,0.55)',
        opacity: phoneIn,
      }}
    >
      <div style={{position: 'relative', width: imgW, height: imgH, borderRadius: 48, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${camX}px, ${camY}px) scale(${camS})`}}>
          <Img src={staticFile(step.img)} style={{width: imgW, height: imgH, display: 'block'}} />
          {(sub.boxes || []).map((b, i) => (
            <Highlight key={`${activeIdx}-${i}`} box={b} local={subLocal} imgW={imgW} imgH={imgH} />
          ))}
        </div>
      </div>
    </div>
  );

  const dots = (
    <div style={{display: 'flex', gap: 14, alignItems: 'center', justifyContent: isV ? 'center' : 'flex-start'}}>
      {STEPS.map((_, i) => {
        const cur2 = i === index;
        const wdt = spring({frame: cur2 ? frame : 40, fps, config: {damping: 14}});
        return (
          <div
            key={i}
            style={{
              height: 16,
              width: cur2 ? 16 + 40 * wdt : 16,
              borderRadius: 8,
              background: cur2 ? `linear-gradient(90deg, ${C.violet}, ${C.cyan})` : i < index ? C.cyan : 'rgba(255,255,255,0.22)',
            }}
          />
        );
      })}
    </div>
  );

  const badge = (
    <div
      style={{
        display: 'inline-block',
        padding: '10px 34px',
        borderRadius: 999,
        background: `linear-gradient(90deg, ${C.violet}, ${C.cyan})`,
        color: '#fff',
        fontSize: isV ? 38 : 40,
        fontWeight: 800,
        transform: `scale(${spring({frame: frame - 2, fps, config: {damping: 11}})})`,
      }}
    >
      Langkah {index + 1} dari {STEPS.length}
    </div>
  );

  const caption = (
    <div
      style={{
        borderRadius: 36,
        background: 'rgba(8,12,28,0.88)',
        border: '2px solid rgba(34,211,238,0.45)',
        padding: '28px 40px',
        minHeight: isV ? 150 : 190,
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
      }}
    >
      <Words
        key={activeIdx}
        text={sub.text}
        start={subT.from + 4}
        style={{color: C.text, fontSize: isV ? 44 : 56, fontWeight: 700, lineHeight: 1.25}}
      />
    </div>
  );

  return (
    <AbsoluteFill style={{opacity: fade, fontFamily: FONT}}>
      {isV ? (
        <>
          <div style={{position: 'absolute', top: 36, left: 0, right: 0}}>{dots}</div>
          <div style={{position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center'}}>
            {badge}
            <Words text={step.title} start={6} style={{color: C.text, fontSize: 76, fontWeight: 800, marginTop: 24, letterSpacing: -1}} />
          </div>
          {phone}
          <div style={{position: 'absolute', left: 60, right: 60, bottom: 50}}>{caption}</div>
        </>
      ) : (
        <>
          <div style={{position: 'absolute', left: 110, top: 0, bottom: 0, width: 960, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36}}>
            {dots}
            <div>{badge}</div>
            <Words text={step.title} start={6} style={{color: C.text, fontSize: 98, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2}} />
            {caption}
          </div>
          {phone}
        </>
      )}

      {sub.typed ? <UrlFocus local={subLocal} dur={subT.dur} /> : null}

      {hasAudio
        ? tl.subs.map((s, i) => (
            <Sequence key={i} from={s.from + 8} durationInFrames={s.dur}>
              <Audio src={staticFile(s.audio)} />
            </Sequence>
          ))
        : null}
    </AbsoluteFill>
  );
};

/* ---------- Intro & Outro ---------- */
const Rings: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  return (
    <>
      {[0, 1, 2].map((i) => {
        const p = ((frame + i * 40) % 120) / 120;
        const s = 300 + p * Math.max(W, H) * 0.7;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: W / 2 - s / 2,
              top: H / 2 - s / 2,
              width: s,
              height: s,
              borderRadius: '50%',
              border: `3px solid ${C.cyan}`,
              opacity: (1 - p) * 0.35,
            }}
          />
        );
      })}
    </>
  );
};

const Intro: React.FC<{dur: number}> = ({dur}) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const isV = H > W;
  const s = spring({frame, fps, config: {damping: 10}});
  const fade = interpolate(frame, [dur - 12, dur], [1, 0], {extrapolateLeft: 'clamp'});
  const sub = spring({frame: frame - 40, fps, config: {damping: 16}});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fade}}>
      <Rings />
      <div
        style={{
          width: isV ? 260 : 230,
          height: isV ? 260 : 230,
          borderRadius: 70,
          background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})`,
          color: '#fff',
          fontSize: isV ? 110 : 96,
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${s}) rotate(${(1 - s) * -200}deg)`,
          boxShadow: '0 30px 80px rgba(109,93,252,0.5)',
        }}
      >
        ACE
      </div>
      <Words
        text="Cara pakai ACE Converter"
        start={22}
        stagger={4}
        style={{marginTop: 60, color: C.text, fontSize: isV ? 96 : 110, fontWeight: 800, textAlign: 'center', lineHeight: 1.1, padding: '0 70px'}}
      />
      <div style={{marginTop: 26, color: C.soft, fontSize: isV ? 48 : 52, opacity: sub, textAlign: 'center', padding: '0 90px', transform: `translateY(${(1 - sub) * 24}px)`}}>
        Ubah gambar jadi PDF langsung di HP
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, height: H, width: W} = useVideoConfig();
  const isV = H > W;
  const fade = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  const btn = spring({frame: frame - 24, fps, config: {damping: 11}});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fade}}>
      <Rings />
      <Words text="Selesai!" stagger={5} style={{color: C.text, fontSize: isV ? 120 : 150, fontWeight: 900}} />
      <Words text="File PDF kamu sudah siap dipakai." start={14} style={{color: C.soft, fontSize: isV ? 52 : 56, marginTop: 24, textAlign: 'center', padding: '0 80px'}} />
      <div
        style={{
          marginTop: 60,
          padding: '22px 50px',
          borderRadius: 999,
          background: `linear-gradient(90deg, ${C.violet}, ${C.cyan})`,
          color: '#fff',
          fontSize: isV ? 54 : 62,
          fontWeight: 800,
          fontFamily: MONO,
          transform: `scale(${btn * (1 + 0.025 * Math.sin(frame / 6))})`,
          boxShadow: `0 0 ${30 + 15 * Math.sin(frame / 6)}px rgba(34,211,238,0.6)`,
        }}
      >
        {URL_TEXT}
      </div>
      <div style={{color: C.soft, fontSize: 40, marginTop: 36, opacity: btn}}>by ArilCode Engineer</div>
    </AbsoluteFill>
  );
};

/* ---------- Utama ---------- */
export const Tutorial: React.FC<Props> = (props) => {
  const tl = buildTimeline(props);
  return (
    <AbsoluteFill>
      <Background total={tl.total} />
      <Sequence from={0} durationInFrames={props.intro}>
        <Intro dur={props.intro} />
        {props.hasAudio ? (
          <Sequence from={10}>
            <Audio src={staticFile('audio/intro.mp3')} />
          </Sequence>
        ) : null}
      </Sequence>
      {STEPS.map((step, i) => (
        <Sequence key={i} from={tl.steps[i].from} durationInFrames={tl.steps[i].dur}>
          <StepScene index={i} step={step} tl={tl.steps[i]} hasAudio={props.hasAudio} />
        </Sequence>
      ))}
      <Sequence from={tl.outroFrom} durationInFrames={props.outro}>
        <Outro />
        {props.hasAudio ? (
          <Sequence from={10}>
            <Audio src={staticFile('audio/outro.mp3')} />
          </Sequence>
        ) : null}
      </Sequence>
    </AbsoluteFill>
  );
};
