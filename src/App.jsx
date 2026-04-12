import React, { useState, useEffect, useRef } from 'react';

// ─── Artists ───────────────────────────────────────────────────────────────────
const ARTISTS = [
  { id: 'IU',         ko: '아이유',     en: 'IU',           color: '#ff9eb5', artQuery: 'Celebrity IU' },
  { id: 'TWICE',      ko: '트와이스',   en: 'TWICE',         color: '#ff6eb4', artQuery: 'FANCY TWICE' },
  { id: 'IVE',        ko: '아이브',     en: 'IVE',           color: '#a78bfa', artQuery: 'After Like IVE' },
  { id: 'GIDLE',      ko: '여자아이들', en: '(G)I-DLE',      color: '#f59e0b', artQuery: 'Tomboy (G)I-DLE' },
  { id: 'BTS',        ko: 'BTS',        en: 'BTS',           color: '#7c3aed', artQuery: 'Butter BTS' },
  { id: 'ILLIT',      ko: '아일릿',     en: 'ILLIT',         color: '#fb7185', artQuery: "I'm Not Cute Anymore ILLIT" },
  { id: 'H2H',        ko: '하츠2하츠',  en: 'Hearts2Hearts', color: '#34d399', artQuery: 'RUDE Hearts2Hearts' },
  { id: 'SVT',        ko: '세븐틴',     en: 'SEVENTEEN',     color: '#60a5fa', artQuery: 'Left Right SEVENTEEN' },
  { id: 'SKZ',        ko: '스트레이 키즈', en: 'Stray Kids',   color: '#fbbf24', artQuery: 'CASE 143 Stray Kids' },
  { id: 'LESSERAFIM', ko: '르세라핌',   en: 'LE SSERAFIM',   color: '#f97316', artQuery: 'EASY LE SSERAFIM' },
];

// ─── Songs ────────────────────────────────────────────────────────────────────
// lyrics[]  : 표시할 가사 라인 (blankLine 인덱스의 라인에 blankText 포함)
// blankLine : lyrics[] 중 빈칸이 있는 라인 인덱스
// blankText : 숨길 한국어 구절 (정답)
// fullLine  : blankLine의 완성된 전체 텍스트
// choices   : [정답, 오답×3] — 표시 전 셔플됨
const SONGS = {
  // ── 아이유 ─────────────────────────────────────────────────────────────────
  IU: {
    title: '봄 안녕 봄',
    itunesQuery: '봄 안녕 봄 IU',
    artistHint: 'IU',
    lyrics: [
      '낮게부는 바람결이',
    ],
    blankLine: 0,
    blankText: '바람결이',
    fullLine: '낮게부는 바람결이',
    choices: ['바람결이', '빗물결이', '꽃향기가', '햇살이'],
  },

  // ── 트와이스 ───────────────────────────────────────────────────────────────
  TWICE: {
    title: 'What is Love?',
    itunesQuery: 'What is Love TWICE',
    artistHint: 'TWICE',
    lyrics: [
      '사탕처럼 달콤하다는 데',
      '하늘을 나는 것 같다는 데',
      '사랑이 어떤 느낌인지',
    ],
    blankLine: 1,
    blankText: '하늘을 나는 것 같다는 데',
    fullLine: '하늘을 나는 것 같다는 데',
    choices: [
      '하늘을 나는 것 같다는 데',
      '꿈을 꾸는 것 같다는 데',
      '날개가 생긴 것 같다는 데',
      '세상을 얻은 것 같다는 데',
    ],
  },

  // ── 아이브 ────────────────────────────────────────────────────────────────
  IVE: {
    title: 'I AM',
    itunesQuery: 'I AM IVE K-pop',
    artistHint: 'IVE',
    lyrics: [
      '어딘가의 낯선 뷰',
      "I'll be far away,",
      "that's my-",
    ],
    blankLine: 0,
    blankText: '어딘가의',
    fullLine: '어딘가의 낯선 뷰',
    choices: ['어딘가의', '전혀 다른', '완전히 새로운', '낯설고도'],
  },

  // ── 여자아이들 ────────────────────────────────────────────────────────────
  GIDLE: {
    title: '클락션 (Klaxon)',
    itunesQuery: 'Klaxon (G)I-DLE',
    artistHint: 'I-DLE',
    lyrics: [
      '야 나 좀 봐줘 baby',
      '더 hit the klaxon',
      'Hon-hon-hon-hon-hon-honk',
    ],
    blankLine: 0,
    blankText: '야 나 좀 봐줘',
    fullLine: '야 나 좀 봐줘 baby',
    choices: ['야 나 좀 봐줘', '야 다 비켜봐', '야 들어봐줘', '야 멈춰봐'],
  },

  // ── BTS ───────────────────────────────────────────────────────────────────
  BTS: {
    title: '소우주 (Mikrokosmos)',
    itunesQuery: 'Mikrokosmos BTS',
    artistHint: 'BTS',
    lyrics: [
      '반짝이는',
    ],
    blankLine: 0,
    blankText: '반짝이는',
    fullLine: '반짝이는',
    choices: ['반짝이는', '빛나는', '떠오르는', '흔들리는'],
  },

  // ── 아일릿 ────────────────────────────────────────────────────────────────
  ILLIT: {
    title: "I'm Not Cute Anymore",
    itunesQuery: "I'm Not Cute Anymore ILLIT",
    artistHint: 'ILLIT',
    lyrics: [
      '강아지 보다 난',
      '느슨한 해파리가 좋아',
    ],
    blankLine: 1,
    blankText: '느슨한 해파리',
    fullLine: '느슨한 해파리가 좋아',
    choices: ['느슨한 해파리', '작은 강아지', '귀여운 고양이', '게으른 나무늘보'],
  },

  // ── 하츠2하츠 ─────────────────────────────────────────────────────────────
  H2H: {
    title: 'RUDE!',
    itunesQuery: 'RUDE Hearts2Hearts',
    artistHint: 'Hearts2Hearts',
    lyrics: [
      '날 향한 시선에 Hate me?',
      "누가 뭐래도 can't change me",
      '지금 이대로 좋아',
    ],
    blankLine: 2,
    blankText: '지금 이대로 좋아',
    fullLine: '지금 이대로 좋아',
    choices: ['지금 이대로 좋아', '난 변하지 않아', '나답게 살아', '누구도 못 막아'],
  },

  // ── 세븐틴 ────────────────────────────────────────────────────────────────
  SVT: {
    title: '음악의 신 (God of Music)',
    itunesQuery: 'God of Music SEVENTEEN',
    artistHint: 'SEVENTEEN',
    lyrics: [
      '이것 또한 나를 위한 소린가',
      'Kick snare Drum bass Piano Bassline',
      '무엇이 우리의 행복인가',
      '뭐 있나 춤을 춰 노래하자',
    ],
    blankLine: 2,
    blankText: '무엇이 우리의 행복인가',
    fullLine: '무엇이 우리의 행복인가',
    choices: [
      '무엇이 우리의 행복인가',
      '어디서 우리가 만났는가',
      '언제쯤 끝이 나는가',
      '왜 이리도 설레는가',
    ],
  },

  // ── 스트레이 키즈 ─────────────────────────────────────────────────────────
  SKZ: {
    title: 'CASE 143',
    itunesQuery: 'CASE 143 Stray Kids',
    artistHint: 'Stray Kids',
    clipDuration: 12,
    lyrics: [
      'Why do I keep getting attracted',
      '자석 같이 끌려가',
      'I cannot explain this reaction',
      '이것밖에 143',
      'Why do I keep getting attracted',
      '네 모습만 떠올라',
    ],
    blankLine: 5,
    blankText: '네 모습만 떠올라',
    fullLine: '네 모습만 떠올라',
    choices: ['네 모습만 떠올라', '너만 생각나', '네 얼굴이 보여', '너뿐이야'],
  },

  // ── 르세라핌 ──────────────────────────────────────────────────────────────
  LESSERAFIM: {
    title: 'SPAGHETTI',
    itunesQuery: 'SPAGHETTI LE SSERAFIM',
    artistHint: 'LE SSERAFIM',
    clipDuration: 12,
    lyrics: [
      'Eat it up eat it eat it up',
      '머릿속 낀 SSERAFIM',
      'Bad bitch in between your teeth',
      '그냥 포기해 어차피',
      'Eat it up eat it eat it up',
    ],
    blankLine: 3,
    blankText: '그냥 포기해 어차피',
    fullLine: '그냥 포기해 어차피',
    choices: ['그냥 포기해 어차피', '이제 손 들어 이미', '다 내려놔 결국', '잊어버려 어차피'],
  },
};

// ─── iTunes Search API ────────────────────────────────────────────────────────
async function fetchItunesTrack(query, artistHint) {
  const url =
    `https://itunes.apple.com/search?` +
    `term=${encodeURIComponent(query)}&media=music&entity=song&limit=5&country=KR`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes API 오류: ${res.status}`);
  const data = await res.json();
  const results = data.results ?? [];

  // 1순위: previewUrl 있고 artistName에 hint 포함
  let track = artistHint
    ? results.find(
        (r) => r.previewUrl &&
               r.artistName?.toLowerCase().includes(artistHint.toLowerCase())
      )
    : null;

  const anyWithPreview = results.find((r) => r.previewUrl) ?? null;
  const artistMismatch = !track && !!anyWithPreview;
  if (!track) track = anyWithPreview;
  if (!track) return null;

  // iOS Safari blocks http:// audio on https:// pages (mixed content) → force https
  const rawPreview = track.previewUrl ?? null;
  const previewUrl = rawPreview ? rawPreview.replace(/^http:\/\//i, 'https://') : null;

  return {
    previewUrl,
    albumArt:      track.artworkUrl100
                     ? track.artworkUrl100.replace(/\d+x\d+bb/, '400x400bb')
                     : null,
    trackName:     track.trackName,
    artistName:    track.artistName,
    trackViewUrl:  track.trackViewUrl ?? null,
    artistMismatch,
  };
}

// 아티스트 카드 썸네일용 앨범아트
async function fetchArtistArt(artQuery) {
  try {
    const url =
      `https://itunes.apple.com/search?` +
      `term=${encodeURIComponent(artQuery)}&media=music&entity=song&limit=3&country=KR`;
    const res = await fetch(url);
    const data = await res.json();
    const art = data.results?.[0]?.artworkUrl100;
    return art ? art.replace(/\d+x\d+bb/, '600x600bb') : null;
  } catch {
    return null;
  }
}

// 레이트 리밋 방지용: n ms 대기
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Helper ───────────────────────────────────────────────────────────────────
// pointer:coarse = 터치스크린(모바일/태블릿), pointer:fine = 마우스(PC)
function isMobileDevice() {
  return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    background: #0d0d1a; color: #fff;
    min-height: 100vh; overflow-x: hidden;
  }

  .app { max-width: 480px; margin: 0 auto; min-height: 100vh; position: relative; }

  .bg-gradient {
    position: fixed; inset: 0;
    background: radial-gradient(ellipse at top, #1a0533 0%, #0d0d1a 60%);
    z-index: -1;
  }

  .screen { padding: 20px; min-height: 100vh; animation: fadeIn 0.4s ease; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .header { text-align: center; padding: 24px 0 12px; }

  .header h1 {
    font-size: 26px; font-weight: 900;
    background: linear-gradient(135deg, #ff6eb4, #a78bfa);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .header p { font-size: 13px; color: #a0a0c0; margin-top: 4px; }

  .artist-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 16px; }

  .artist-card {
    border-radius: 16px; overflow: hidden; cursor: pointer;
    position: relative; aspect-ratio: 1;
    border: 2px solid transparent;
    transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    background: #1a1a2e;
  }

  .artist-card:hover { transform: scale(1.04); box-shadow: 0 0 20px rgba(255,110,180,0.4); }
  .artist-card img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .artist-card .artist-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 28px 10px 10px;
    background: linear-gradient(transparent, rgba(0,0,0,0.85));
    text-align: center;
  }

  .artist-card .artist-ko { font-size: 16px; font-weight: 700; color: #fff; }
  .artist-card .artist-en { font-size: 11px; color: #ccc; margin-top: 2px; }

  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 8px; padding: 14px 24px; border-radius: 50px;
    font-size: 15px; font-weight: 700; font-family: inherit;
    cursor: pointer; border: none;
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
  }

  .btn:hover  { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
  .btn:active { transform: translateY(0); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .btn-primary   { background: linear-gradient(135deg, #ff6eb4, #a78bfa); color: #fff; width: 100%; }
  .btn-secondary { background: #1a1a2e; color: #fff; border: 1px solid #2a2a4a; }
  .btn-outline   { background: transparent; color: #a78bfa; border: 2px solid #a78bfa; }

  .song-info { text-align: center; padding: 20px 0 8px; }

  .song-info .artist-img {
    width: 100px; height: 100px; border-radius: 50%;
    object-fit: cover; border: 3px solid #ff6eb4; margin-bottom: 12px;
  }

  .song-info .song-title  { font-size: 20px; font-weight: 900; }
  .song-info .song-artist { font-size: 13px; color: #a0a0c0; margin-top: 4px; }
  .song-info .itunes-match { font-size: 11px; color: #555577; margin-top: 4px; }

  .player-area {
    margin: 12px 0; background: #1a1a2e;
    border-radius: 16px; padding: 16px; text-align: center;
  }

  .play-btn-large {
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, #ff6eb4, #a78bfa);
    border: none; cursor: pointer; font-size: 24px; color: #fff;
    display: inline-flex; align-items: center; justify-content: center;
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .play-btn-large:hover { transform: scale(1.08); box-shadow: 0 0 24px rgba(255,110,180,0.5); }

  .progress-bar { margin-top: 14px; height: 4px; background: #2a2a4a; border-radius: 2px; overflow: hidden; }

  .progress-fill {
    height: 100%; background: linear-gradient(90deg, #ff6eb4, #a78bfa);
    transition: width 0.3s linear; border-radius: 2px;
  }

  .time-label { font-size: 12px; color: #a0a0c0; margin-top: 8px; }

  .lyrics-container {
    margin: 12px 0; background: #1a1a2e;
    border-radius: 16px; padding: 20px 16px; min-height: 180px;
  }

  .lyrics-container h3 {
    font-size: 12px; color: #a0a0c0; margin-bottom: 14px;
    letter-spacing: 1px; text-transform: uppercase;
  }

  .lyric-line {
    font-size: 17px; line-height: 2.1; color: #444466;
    transition: color 0.3s, font-size 0.3s;
    text-align: center;
  }

  .lyric-line.active { color: #fff; font-size: 20px; font-weight: 700; }
  .lyric-line.past   { color: #666688; }

  .blank {
    display: inline-block; min-width: 80px;
    border-bottom: 3px solid #ff6eb4; color: #ff6eb4;
    background: rgba(255,110,180,0.1); border-radius: 4px;
    padding: 0 6px; font-weight: 700; font-size: 18px;
  }

  .quiz-lyric {
    background: #1a1a2e; border-radius: 16px;
    padding: 24px 20px; text-align: center; margin-bottom: 20px;
    font-size: 20px; line-height: 1.8; border: 1px solid #2a2a4a;
  }

  .choices { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }

  .choice-btn {
    padding: 16px 12px; border-radius: 14px;
    background: #1a1a2e; border: 2px solid #2a2a4a;
    color: #fff; font-size: 15px; font-weight: 700;
    font-family: inherit; cursor: pointer;
    transition: transform 0.15s, border-color 0.2s, background 0.2s;
    text-align: center; line-height: 1.4;
  }

  .choice-btn:hover   { border-color: #a78bfa; background: #221a3e; transform: scale(1.03); }
  .choice-btn.correct { border-color: #34d399; background: rgba(52,211,153,0.15); }
  .choice-btn.wrong   { border-color: #f87171; background: rgba(248,113,113,0.15); }

  .result-screen {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 80vh; text-align: center; padding: 40px 20px;
  }

  .result-icon {
    font-size: 100px; margin-bottom: 16px;
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes popIn {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .result-msg { font-size: 28px; font-weight: 900; margin-bottom: 24px; }

  .result-lyric {
    background: #1a1a2e; border-radius: 14px;
    padding: 18px 20px; font-size: 18px; line-height: 1.8;
    margin-bottom: 28px; width: 100%; border: 1px solid #2a2a4a;
  }

  .highlight {
    color: #ff6eb4; font-weight: 700;
    background: rgba(255,110,180,0.15); border-radius: 4px; padding: 0 4px;
  }

  .result-btns { display: flex; gap: 12px; width: 100%; }

  .warning-box {
    background: rgba(251,191,36,0.1); border: 1px solid #fbbf24;
    border-radius: 12px; padding: 14px 16px;
    font-size: 14px; color: #fbbf24;
    margin: 12px 0; text-align: center; line-height: 1.5;
  }

  .error-box {
    background: rgba(248,113,113,0.1); border: 1px solid #f87171;
    border-radius: 12px; padding: 14px 16px;
    font-size: 14px; color: #f87171; margin: 12px 0; text-align: center;
  }

  .spinner {
    width: 36px; height: 36px; border: 3px solid #2a2a4a; border-top-color: #ff6eb4;
    border-radius: 50%; animation: spin 0.8s linear infinite; margin: 20px auto;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .apple-attribution {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; padding: 8px 0; font-size: 12px; color: #666688;
  }

  .apple-badge {
    display: inline-flex; align-items: center; gap: 5px;
    background: #000; color: #fff; border-radius: 6px;
    padding: 4px 10px; font-size: 11px; font-weight: 700; text-decoration: none;
  }

  .screen-title {
    font-size: 13px; color: #a0a0c0; text-align: center;
    margin-bottom: 4px; letter-spacing: 2px; text-transform: uppercase;
  }

  .img-placeholder {
    width: 100%; height: 100%; display: flex; align-items: center;
    justify-content: center; font-size: 40px; background: #1a1a2e;
  }

  /* Splash screen */
  .splash {
    position: fixed; inset: 0;
    background: #fff;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    z-index: 200;
    transition: opacity 0.6s ease;
  }

  .splash.fade-out { opacity: 0; pointer-events: none; }

  .splash img {
    width: min(416px, 90vw);
    animation: fadeIn 0.6s ease;
  }

  .splash-skip {
    margin-top: 32px;
    background: none; border: none;
    font-size: 13px; color: #aaa;
    cursor: pointer; font-family: inherit;
    letter-spacing: 1px;
  }

  .splash-skip:hover { color: #555; }
`;

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [fadingOut, setFadingOut] = useState(false);

  const dismiss = () => {
    setFadingOut(true);
    setTimeout(onDone, 600);
  };

  useEffect(() => {
    const t = setTimeout(dismiss, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`splash${fadingOut ? ' fade-out' : ''}`} onClick={dismiss}>
      <img src="/arin-logo.jpg" alt="Arin Korean Lab" />
      <button className="splash-skip">탭하여 시작</button>
    </div>
  );
}

// ─── Apple Music attribution ──────────────────────────────────────────────────
function AppleAttribution({ trackViewUrl }) {
  return (
    <div className="apple-attribution">
      <span>Music preview courtesy of</span>
      <a
        href={trackViewUrl || 'https://music.apple.com'}
        target="_blank"
        rel="noopener noreferrer"
        className="apple-badge"
      >
        <svg width="12" height="14" viewBox="0 0 814 1000" fill="white">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.5-317.3 99.8 0 182.6 66.6 245.1 66.6 59.3 0 152.1-70.8 265.6-70.8 42.8 0 160.7 3.8 230.8 128zm-290-104.5c12.6-48.9 43.8-97.8 82.7-129.6 38.9-31.8 88.8-52.9 138.6-52.9 3.2 0 6.4.3 9.6.3 3.2 50.9-13.4 104.5-45.7 143.5-32.3 39-83.4 68.3-132.5 68.3-2.6 0-5.1 0-7.7-.6z" />
        </svg>
        Apple Music
      </a>
    </div>
  );
}

// ─── Artist Card ──────────────────────────────────────────────────────────────
function ArtistCard({ artist, imageUrl, onClick }) {
  return (
    <div
      className="artist-card"
      onClick={onClick}
      style={{ borderColor: artist.color }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={artist.ko} loading="lazy" />
      ) : (
        <div className="img-placeholder">🎵</div>
      )}
      <div className="artist-label">
        <div className="artist-ko">{artist.ko}</div>
        <div className="artist-en">{artist.en}</div>
      </div>
    </div>
  );
}

// ─── Screen 1: Artist Selection ───────────────────────────────────────────────
function ArtistScreen({ artistImages, onSelectArtist }) {
  return (
    <div className="screen">
      <div className="header">
        <img src="/header-logo.jpg" alt="Logo" style={{ width: 'min(240px, 70vw)', marginBottom: 12 }} />
        <h1>🎤 K-POP 가사 퀴즈</h1>
        <p>아티스트를 선택하고 가사를 맞혀보세요!</p>
      </div>
      <div className="artist-grid">
        {ARTISTS.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            imageUrl={artistImages[artist.id]}
            onClick={() => onSelectArtist(artist)}
          />
        ))}
      </div>
      <AppleAttribution />
      <div style={{ height: 16 }} />
    </div>
  );
}

// ─── Screen 2: Listening Phase ────────────────────────────────────────────────
function ListeningScreen({ artist, trackInfo, songData, noPreview, loading, error, onQuiz, onBack }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const CLIP_DURATION = songData.clipDuration ?? 10;

  // Auto-play when preview is ready (PC only — mobile blocks autoplay)
  useEffect(() => {
    if (!trackInfo?.previewUrl || !audioRef.current) return;
    if (isMobileDevice()) return;
    audioRef.current.volume = 1;
    const t = setTimeout(() => {
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
    }, 600);
    return () => clearTimeout(t);
  }, [trackInfo?.previewUrl]);

  // Progress + auto-pause at CLIP_DURATION
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setCurrentTime(t);
      if (t >= CLIP_DURATION) { audio.pause(); setIsPlaying(false); }
    };
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [trackInfo?.previewUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else {
      if (audio.currentTime >= CLIP_DURATION) { audio.currentTime = 0; setCurrentTime(0); }
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  // Active lyric line: progress through all lines over CLIP_DURATION
  const { lyrics, blankLine, blankText } = songData;
  const activeIdx = Math.min(
    Math.floor((currentTime / CLIP_DURATION) * lyrics.length),
    lyrics.length - 1
  );

  const progress = Math.min((currentTime / CLIP_DURATION) * 100, 100);
  const timeLeft = Math.max(0, CLIP_DURATION - currentTime).toFixed(0);
  const isDone   = currentTime >= CLIP_DURATION;

  const renderLine = (line, idx) => {
    const isBlankLine = idx === blankLine;
    const isActive    = idx === activeIdx;
    const isPast      = idx < activeIdx;

    let content;
    if (isBlankLine) {
      const parts = line.split(blankText);
      content = (
        <>
          {parts[0]}
          <span className="blank">___</span>
          {parts[1] ?? ''}
        </>
      );
    } else {
      content = line;
    }

    return (
      <div
        key={idx}
        className={`lyric-line${isActive ? ' active' : ''}${isPast ? ' past' : ''}`}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="screen">
      <div className="song-info">
        {trackInfo?.albumArt ? (
          <img className="artist-img" src={trackInfo.albumArt} alt={artist.ko} />
        ) : (
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#1a1a2e', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, border: '3px solid #ff6eb4' }}>🎵</div>
        )}
        <div className="song-title">{songData.title}</div>
        <div className="song-artist">{artist.ko} ({artist.en})</div>
        {trackInfo && (
          <div className="itunes-match">
            {trackInfo.trackName} — {trackInfo.artistName}
            {trackInfo.artistMismatch && (
              <span style={{ marginLeft: 6, background: 'rgba(251,191,36,0.12)', border: '1px solid #fbbf24', color: '#fbbf24', borderRadius: 5, padding: '1px 6px', fontSize: 10, fontWeight: 700 }}>
                ⚠️ 다른 버전일 수 있어요
              </span>
            )}
          </div>
        )}
      </div>

      {loading && <div className="spinner" />}
      {error    && <div className="error-box">{error}</div>}
      {noPreview && (
        <div className="warning-box">
          이 곡의 미리듣기를 불러올 수 없어요.<br />다른 곡을 선택해 주세요.
        </div>
      )}

      {trackInfo?.previewUrl && (
        <>
          <audio ref={audioRef} src={trackInfo.previewUrl} preload="auto" />
          <div className="player-area">
            <button className="play-btn-large" onClick={togglePlay} aria-label={isPlaying ? '일시정지' : '재생'}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="time-label">
              {isPlaying ? `${timeLeft}초 남음` : isDone ? '재생 완료' : isMobileDevice() && !isDone ? '▶ 버튼을 눌러 재생하세요' : '일시정지'}
            </div>
          </div>
          {trackInfo.trackViewUrl && <AppleAttribution trackViewUrl={trackInfo.trackViewUrl} />}
        </>
      )}

      {!loading && (
        <div className="lyrics-container">
          <h3>가사</h3>
          {lyrics.map((line, idx) => renderLine(line, idx))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
        {trackInfo?.previewUrl && (
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleReplay}>
            ▶ 다시 듣기
          </button>
        )}
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onQuiz} disabled={loading}>
          퀴즈 풀기 →
        </button>
      </div>
      <button className="btn btn-outline" style={{ width: '100%', marginBottom: 20 }} onClick={onBack}>
        ← 아티스트 선택
      </button>
    </div>
  );
}

// ─── Screen 3: Quiz ───────────────────────────────────────────────────────────
function QuizScreen({ artist, songData, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const shuffledChoices = useRef(shuffle(songData.choices)).current;

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice);
    setTimeout(() => onAnswer(choice === songData.blankText), 900);
  };

  const renderQuizLine = () => {
    const parts = songData.fullLine.split(songData.blankText);
    return (
      <>
        {parts[0]}
        <span className="blank" style={{ fontSize: 20 }}>___</span>
        {parts[1] ?? ''}
      </>
    );
  };

  return (
    <div className="screen">
      <div className="header">
        <div className="screen-title">퀴즈</div>
        <h1 style={{ fontSize: 20 }}>{songData.title}</h1>
        <p style={{ marginTop: 4 }}>{artist.ko} ({artist.en})</p>
      </div>
      <p style={{ textAlign: 'center', color: '#a0a0c0', fontSize: 14, marginBottom: 12 }}>
        빈칸에 들어갈 가사를 고르세요!
      </p>
      <div className="quiz-lyric">{renderQuizLine()}</div>
      <div className="choices">
        {shuffledChoices.map((choice) => {
          let cls = 'choice-btn';
          if (selected) {
            if (choice === songData.blankText) cls += ' correct';
            else if (choice === selected)      cls += ' wrong';
          }
          return (
            <button key={choice} className={cls} onClick={() => handleSelect(choice)}>
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Screen 4: Result ─────────────────────────────────────────────────────────
function ResultScreen({ correct, artist, songData, trackInfo, onHome, onRetry }) {
  const renderFullLine = () => {
    const parts = songData.fullLine.split(songData.blankText);
    return (
      <>
        {parts[0]}
        <span className="highlight">{songData.blankText}</span>
        {parts[1] ?? ''}
      </>
    );
  };

  return (
    <div className="result-screen screen">
      <div className="result-icon" style={{ color: correct ? '#34d399' : '#f87171' }}>
        {correct ? '○' : '✕'}
      </div>
      <div className="result-msg" style={{ color: correct ? '#34d399' : '#f87171' }}>
        {correct ? '정답이에요! 🎉' : '아쉬워요 😢'}
      </div>
      <div className="result-lyric">
        <div style={{ fontSize: 13, color: '#a0a0c0', marginBottom: 10 }}>정답 가사</div>
        {renderFullLine()}
      </div>
      {trackInfo?.trackViewUrl && (
        <div style={{ marginBottom: 20, width: '100%' }}>
          <AppleAttribution trackViewUrl={trackInfo.trackViewUrl} />
        </div>
      )}
      {correct ? (
        <div className="result-btns">
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onHome}>처음으로</button>
        </div>
      ) : (
        <div className="result-btns">
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onRetry}>다시 듣기</button>
          <button className="btn btn-primary"   style={{ flex: 1 }} onClick={onHome}>처음으로</button>
        </div>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [showSplash, setShowSplash]           = useState(true);
  const [artistImages, setArtistImages]       = useState({});
  const [screen, setScreen]                   = useState('artist');
  const [selectedArtist, setSelectedArtist]   = useState(null);
  const [currentSongData, setCurrentSongData] = useState(null);
  const [trackInfo, setTrackInfo]             = useState(null);
  const [loadingTrack, setLoadingTrack]       = useState(false);
  const [trackError, setTrackError]           = useState(null);
  const [noPreview, setNoPreview]             = useState(false);
  const [quizResult, setQuizResult]           = useState(null);

  // Pre-fetch artist card art — sequential with small delay to avoid iTunes rate limit
  useEffect(() => {
    (async () => {
      for (const artist of ARTISTS) {
        const url = await fetchArtistArt(artist.artQuery);
        if (url) setArtistImages((prev) => ({ ...prev, [artist.id]: url }));
        await delay(150); // 150ms 간격으로 iTunes 레이트 리밋 방지
      }
    })();
  }, []);

  const handleSelectArtist = async (artist) => {
    const songData = SONGS[artist.id];
    setSelectedArtist(artist);
    setCurrentSongData(songData);
    setTrackInfo(null);
    setTrackError(null);
    setNoPreview(false);
    setLoadingTrack(true);
    setScreen('listen');

    try {
      const track = await fetchItunesTrack(songData.itunesQuery, songData.artistHint);
      if (!track) {
        setTrackError('곡을 찾을 수 없어요. 잠시 후 다시 시도해주세요.');
      } else if (!track.previewUrl) {
        setNoPreview(true);
        setTrackInfo(track);
      } else {
        setTrackInfo(track);
      }
    } catch (e) {
      setTrackError('곡을 불러오는 데 실패했어요. 네트워크 연결을 확인하고 다시 시도해주세요.');
    } finally {
      setLoadingTrack(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <div className="bg-gradient" />
      <div className="app">
        {screen === 'artist' && (
          <ArtistScreen
            artistImages={artistImages}
            onSelectArtist={handleSelectArtist}
          />
        )}

        {screen === 'listen' && selectedArtist && currentSongData && (
          <ListeningScreen
            artist={selectedArtist}
            trackInfo={trackInfo}
            songData={currentSongData}
            noPreview={noPreview}
            loading={loadingTrack}
            error={trackError}
            onQuiz={() => setScreen('quiz')}
            onBack={() => setScreen('artist')}
          />
        )}

        {screen === 'quiz' && selectedArtist && currentSongData && (
          <QuizScreen
            artist={selectedArtist}
            songData={currentSongData}
            onAnswer={(correct) => { setQuizResult(correct); setScreen('result'); }}
          />
        )}

        {screen === 'result' && selectedArtist && currentSongData && (
          <ResultScreen
            correct={quizResult}
            artist={selectedArtist}
            songData={currentSongData}
            trackInfo={trackInfo}
            onHome={() => setScreen('artist')}
            onRetry={() => setScreen('listen')}
          />
        )}
      </div>
    </>
  );
}
