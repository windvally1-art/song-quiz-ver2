import React, { useState, useEffect, useRef } from 'react';

// ─── Artists ───────────────────────────────────────────────────────────────────
const ARTISTS = [
  { id: 'IU',         ko: '아이유',       en: 'IU',            color: '#ff9eb5', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/35/9f/83/359f83b3-1423-3153-1641-98e948b7fc65/cover_-_EDAM_5_LILAC.jpg/400x400bb.jpg' },
  { id: 'TWICE',      ko: '트와이스',     en: 'TWICE',          color: '#ff6eb4', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e9/2e/21/e92e214d-5a7a-5d38-76f8-f41cdb8600d0/dj.myigyoai.jpg/400x400bb.jpg' },
  { id: 'IVE',        ko: '아이브',       en: 'IVE',            color: '#a78bfa', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d3/63/4a/d3634a37-8dd2-8fc6-d138-895b3d237611/IVE_OnlineCover_fix.jpg/400x400bb.jpg' },
  { id: 'GIDLE',      ko: '여자아이들',   en: '(G)I-DLE',       color: '#f59e0b', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/30/c0/56/30c056d6-35e7-19a6-6252-4f44ba2ef3ab/cover_KM0020047_1.jpg/400x400bb.jpg' },
  { id: 'BTS',        ko: 'BTS',          en: 'BTS',            color: '#7c3aed', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/27/80/dc/2780dce3-3cdd-d8aa-ec8c-05bf8ad90f9d/196006771362_Cover.jpg/400x400bb.jpg' },
  { id: 'ILLIT',      ko: '아일릿',       en: 'ILLIT',          color: '#fb7185', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/3e/49/1e/3e491e43-4961-21ab-2abe-37fb1c0feb40/196922879227_Cover.jpg/400x400bb.jpg' },
  { id: 'H2H',        ko: '하츠2하츠',    en: 'Hearts2Hearts',  color: '#34d399', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/78/b9/fb/78b9fb30-169a-eab0-38e9-8df725f8f2d6/888735954603.png/400x400bb.jpg' },
  { id: 'SVT',        ko: '세븐틴',       en: 'SEVENTEEN',      color: '#60a5fa', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e3/76/df/e376df28-c05b-00fd-72de-9d42377a306b/196922628580_Cover.jpg/400x400bb.jpg' },
  { id: 'SKZ',        ko: '스트레이 키즈', en: 'Stray Kids',    color: '#fbbf24', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/0e/12/79/0e1279ed-d25b-400c-b426-730da021f804/SKZ-MAXIDENT-OnlineCover_Final.jpg/400x400bb.jpg' },
  { id: 'LESSERAFIM', ko: '르세라핌',     en: 'LE SSERAFIM',    color: '#f97316', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/0c/3b/01/0c3b0191-6170-765d-23a6-1b1c9c25cb77/198704776991_Cover.jpg/400x400bb.jpg' },
  { id: 'NMIXX',      ko: 'NMIXX',        en: 'NMIXX',          color: '#e879f9', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fe/cd/64/fecd6408-3ace-12b5-7ad7-c5d2ac891168/8809928958262.jpg/400x400bb.jpg' },
  { id: 'RESCENE',    ko: '리센느',       en: 'RESCENE',        color: '#2dd4bf', img: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/43/0b/4c/430b4c8e-3cb8-da27-648f-435ec3b391a6/8804775334160.jpg/400x400bb.jpg' },
];

// ─── Songs ────────────────────────────────────────────────────────────────────
// lyrics[]  : 표시할 가사 라인 (blankLine 인덱스의 라인에 blankText 포함)
// blankLine : lyrics[] 중 빈칸이 있는 라인 인덱스
// blankText : 숨길 한국어 구절 (정답)
// fullLine  : blankLine의 완성된 전체 텍스트
// choices   : [정답, 오답×3] — 표시 전 셔플됨
const SONGS = {
  // ── 아이유 ─────────────────────────────────────────────────────────────────
  IU: [
    {
      title: '봄 안녕 봄',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/f5/ca/00/f5ca004f-8f6b-96ad-84e3-30ccb9761e1a/mzaf_171429657157864019.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/%EB%B4%84-%EC%95%88%EB%85%95-%EB%B4%84/1560113132?i=1560113347',
      lyrics: ['낮게부는 바람결이'],
      blankLine: 0,
      blankText: '바람결이',
      fullLine: '낮게부는 바람결이',
      choices: ['바람결이', '빗물결이', '꽃향기가', '햇살이'],
    },
    {
      title: '금요일에 만나요',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/7c/b6/df/7cb6df7b-ca30-bd0b-bed8-9471f34b1675/mzaf_4255039572410898691.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/%EA%B8%88%EC%9A%94%EC%9D%BC%EC%97%90-%EB%A7%8C%EB%82%98%EC%9A%94-feat-%EC%9E%A5%EC%9D%B4%EC%A0%95/786862990?i=786863008',
      lyrics: [
        '금요일에 시간 어때요?',
        '주말까지 기다리긴 힘들어',
        '시간아 달려라',
        '시계를 더 보채고 싶지만',
      ],
      lineDurations: [2.5, 3, 2.5, 2],
      blankLine: 2,
      blankText: '시간아 달려라',
      fullLine: '시간아 달려라',
      choices: ['시간아 달려라', '시간아 멈춰라', '강물아 달려라', '바람아 달려라'],
    },
  ],

  // ── 트와이스 ───────────────────────────────────────────────────────────────
  TWICE: [
    {
      title: 'What is Love?',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/26/5f/90/265f908b-af2d-1bc0-b0ef-5dda7a48297b/mzaf_17995815526668184452.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/what-is-love/1369699737?i=1369699742',
      lyrics: [
        '사탕처럼 달콤하다는 데',
        'I wanna know',
        '하늘을 나는 것 같다는 데',
        'I wanna know know know know',
        '사랑이 어떤 느낌인지',
      ],
      lineDurations: [2, 1.5, 2, 2, 2.5],
      blankLine: 2,
      blankText: '하늘을 나는 것 같다는 데',
      fullLine: '하늘을 나는 것 같다는 데',
      choices: [
        '하늘을 나는 것 같다는 데',
        '꿈을 꾸는 것 같다는 데',
        '날개가 생긴 것 같다는 데',
        '세상을 얻은 것 같다는 데',
      ],
    },
  ],

  // ── 아이브 ────────────────────────────────────────────────────────────────
  IVE: [
    {
      title: 'I AM',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3d/57/20/3d5720b3-f6b4-a2fd-8d8f-96515cda91a3/mzaf_17422220011601403216.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/i-am/1680865390?i=1680865730',
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
    {
      title: 'BANG BANG',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/7e/5f/e07e5f06-19a1-1a6d-95d9-5615b56fd125/mzaf_16023007514594622097.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/bang-bang/1873909537?i=1873909539',
      lyrics: [
        'Shaking my head',
        'This is my way',
        'Ayayaya I be going out with a bang',
        'This is my day',
        '밤이 올 때 Ayayaya',
      ],
      lineDurations: [1.5, 1, 3.5, 2, 2],
      blankLine: 4,
      blankText: '밤이 올 때',
      fullLine: '밤이 올 때 Ayayaya',
      choices: ['밤이 올 때', '낮이 올 때', '범이 올 때', '범이 울 때'],
    },
  ],

  // ── 여자아이들 ────────────────────────────────────────────────────────────
  GIDLE: [
    {
      title: '클락션 (Klaxon)',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/56/95/78/569578cc-dc52-a724-54da-c63c8d4faf55/mzaf_6411805859235468367.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/%ED%81%B4%EB%9D%BD%EC%85%98/1753829503?i=1753829505',
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
  ],

  // ── BTS ───────────────────────────────────────────────────────────────────
  BTS: [
    {
      title: '소우주 (Mikrokosmos)',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f4/73/db/f473db8a-b8d9-622b-7828-e40f63af00f7/mzaf_8890385023586453692.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/%EC%86%8C%EC%9A%B0%EC%A3%BC-mikrokosmos/1599171924?i=1599172213',
      clipStart: 7,
      lyrics: [
        '반짝이는 별빛들',
        '깜박이는 불켜진 건물',
      ],
      blankLine: 0,
      blankText: '반짝이는 별빛들',
      fullLine: '반짝이는 별빛들',
      choices: ['반짝이는 별빛들', '반짝이는 반딧불', '깜박이는 별빛들', '껌벅이는 별빛들'],
    },
    {
      title: '봄날',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/18/d7/18/18d718e6-efb8-2241-47b8-44f8951b7afb/mzaf_9900867605041120176.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/%EB%B4%84%EB%82%A0/1596528839?i=1596529381',
      clipStart: 17,
      lyrics: [
        '보고싶다',
        '이렇게 말하니까 더 보고 싶다',
        '너의 사진을 보고 있어도 보고싶다',
      ],
      lineDurations: [2, 4, 4],
      blankLine: 2,
      blankText: '너의 사진을 보고 있어도',
      fullLine: '너의 사진을 보고 있어도 보고싶다',
      choices: ['너의 사진을 보고 있어도', '나의 사진을 보고 있어도', '너는 사진을 보고 있어도', '너의 얼굴을 보고 있어도'],
    },
  ],

  // ── 아일릿 ────────────────────────────────────────────────────────────────
  ILLIT: [
    {
      title: "I'm Not Cute Anymore",
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4e/b0/ee/4eb0eed2-18ab-cd66-fc29-340b9d3713e2/mzaf_6242017905047502425.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/not-cute-anymore/1849105513?i=1849105517',
      lyrics: [
        '강아지 보다 난',
        '느슨한 해파리가 좋아',
      ],
      blankLine: 1,
      blankText: '느슨한 해파리',
      fullLine: '느슨한 해파리가 좋아',
      choices: ['느슨한 해파리', '작은 강아지', '귀여운 고양이', '게으른 나무늘보'],
    },
  ],

  // ── 하츠2하츠 ─────────────────────────────────────────────────────────────
  H2H: [
    {
      title: 'RUDE!',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/01/3c/36/013c3684-7121-8f9f-6eb5-00b610ac055c/mzaf_16203782190977593201.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/rude/1875146814?i=1875146815',
      lyrics: [
        '날 향한 시선에 Hate me?',
        "누가 뭐래도 can't change me",
        '지금 이대로 좋아',
      ],
      blankLine: 2,
      blankText: '지금 이대로 좋아',
      fullLine: '지금 이대로 좋아',
      choices: ['지금 이대로 좋아', '지금 그대로 좋아', '좋아 지금 이대로', '이대로 좋아 지금'],
    },
    {
      title: 'STYLE',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7d/a5/22/7da52235-4936-089b-cca7-57b39bd57901/mzaf_16582803519496058674.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/style/1819694545?i=1819694546',
      clipStart: 10,
      lyrics: [
        '흰 도화지위 쓱쓱 그린 green',
        '갇힐 것 하나 없지',
        'Get up on this Hey!',
        '손과 손 사이 미묘해졌지',
      ],
      lineDurations: [2.5, 2.5, 2, 3],
      blankLine: 3,
      blankText: '미묘해졌지',
      fullLine: '손과 손 사이 미묘해졌지',
      choices: ['미묘해졌지', '이모해줬지', '미싱해줬지', '이미해졌지'],
    },
  ],

  // ── 세븐틴 ────────────────────────────────────────────────────────────────
  SVT: [
    {
      title: '음악의 신 (God of Music)',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cc/cf/f5/cccff5c0-802b-41df-b86d-7ebd703908a0/mzaf_7523547242635277538.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/%EC%9D%8C%EC%95%85%EC%9D%98-%EC%8B%A0/1711288571?i=1711288969',
      lyrics: [
        '이것 또한 나를 위한 소린가',
        'Kick snare Drum bass Piano Bassline',
        '무엇이 우리의 행복인가',
        '뭐 있나 춤을 춰 노래하자',
        '이것이 우리의 행복이다',
      ],
      blankLine: 2,
      blankText: '무엇이 우리의 행복인가',
      fullLine: '무엇이 우리의 행복인가',
      choices: [
        '무엇이 우리의 행복인가',
        '이것이 우리의 행복인가',
        '무엇이 너희의 행복인가',
        '저것이 우리의 행복인가',
      ],
    },
    {
      title: '예쁘다',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a5/2c/6b/a52c6b82-7053-98fa-f3d2-764392015ae2/mzaf_970035000298558973.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/%EC%98%88%EC%81%98%EB%8B%A4/1130828885?i=1130828903',
      clipStart: 1,
      lyrics: [
        '우리 서로를 선택했고',
        '나노 단위로 집중해',
        '널 볼때 가슴이 체할 것 같아',
      ],
      blankLine: 2,
      blankText: '체할 것 같아',
      fullLine: '널 볼때 가슴이 체할 것 같아',
      choices: ['체할 것 같아', '토할 것 같아', '욱할 것 같아', '혹할 것 같아'],
    },
  ],

  // ── 스트레이 키즈 ─────────────────────────────────────────────────────────
  SKZ: [
    {
      title: 'CASE 143',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ec/79/ef/ec79ef3f-acc5-fb98-db5f-a981b390cb56/mzaf_14059686955484905815.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/case-143/1645273318?i=1645273319',
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
      choices: ['네 모습만 떠올라', '네 얼굴만 떠올라', '네 모습만 생각나', '네 모습은 떠났어'],
    },
  ],

  // ── 르세라핌 ──────────────────────────────────────────────────────────────
  LESSERAFIM: [
    {
      title: 'SPAGHETTI',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c9/bd/2c/c9bd2ccd-1a28-34d2-b1ae-14da2404f8b3/mzaf_17126970940455785926.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/spaghetti/1846119152?i=1846119582',
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
  ],

  // ── NMIXX ─────────────────────────────────────────────────────────────────
  NMIXX: [
    {
      title: 'Heavy Serenade',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/65/c6/d5/65c6d5d6-d7dd-1f17-fdc7-95bd19ae5dd6/mzaf_7764163084838025682.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/heavy-serenade/1892954835?i=1892954841',
      lyrics: [
        '커진 심장 소릴 들어봐',
        '영원히 기억될 이 순간',
        '가사가 된 꽃잎들을 봐',
      ],
      blankLine: 2,
      blankText: '꽃잎들을 봐',
      fullLine: '가사가 된 꽃잎들을 봐',
      choices: ['꽃잎들을 봐', '꽃향기를 봐', '별빛들을 봐', '추억들을 봐'],
    },
  ],

  // ── RESCENE ───────────────────────────────────────────────────────────────
  RESCENE: [
    {
      title: 'LOVE ATTACK',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6a/c5/ec/6ac5ecf5-6e26-e551-0b1d-d9f2fcb253a2/mzaf_18228858557779313654.plus.aac.p.m4a',
      trackViewUrl: 'https://music.apple.com/kr/album/love-attack/1764485168?i=1764485170',
      lyrics: [
        '한 번도 빛난 적 없었던',
        '미지의 향으로',
        '온 세상을 물들여',
      ],
      blankLine: 2,
      blankText: '온 세상을 물들여',
      fullLine: '온 세상을 물들여',
      choices: ['온 세상을 물들여', '온 세상을 뒤덮어', '온 세계를 물들여', '이 세계를 물들여'],
    },
  ],
};

// ─── Translations ────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  ko: {
    title:           '🎤 K-POP 가사 퀴즈',
    subtitle:        '아티스트를 선택하고 가사를 맞혀보세요!',
    lyricsLabel:     '가사',
    replay:          '▶ 다시 듣기',
    goQuiz:          '퀴즈 풀기 →',
    backArtist:      '← 아티스트 선택',
    timeLeft:        (n) => `${n}초 남음`,
    playDone:        '재생 완료',
    paused:          '일시정지',
    pressPlay:       '▶ 버튼을 눌러 재생하세요',
    mismatch:        '⚠️ 다른 버전일 수 있어요',
    noPreview:       '이 곡의 미리듣기를 불러올 수 없어요.\n다른 곡을 선택해 주세요.',
    errNotFound:     '곡을 찾을 수 없어요. 잠시 후 다시 시도해주세요.',
    errLoad:         '곡을 불러오는 데 실패했어요. 네트워크 연결을 확인하고 다시 시도해주세요.',
    quizLabel:       '퀴즈',
    quizInstruction: '빈칸에 들어갈 가사를 고르세요!',
    correct:         '정답이에요! 🎉',
    wrong:           '아쉬워요 😢',
    answerLyric:     '정답 가사',
    retryListen:     '다시 듣기',
    home:            '처음으로',
    splashSkip:      '탭하여 시작',
  },
  ja: {
    title:           '🎤 K-POP 歌詞クイズ',
    subtitle:        'アーティストを選んで歌詞を当てよう！',
    lyricsLabel:     '歌詞',
    replay:          '▶ もう一度聴く',
    goQuiz:          'クイズを解く →',
    backArtist:      '← アーティスト選択',
    timeLeft:        (n) => `残り${n}秒`,
    playDone:        '再生完了',
    paused:          '一時停止',
    pressPlay:       '▶ ボタンを押して再生',
    mismatch:        '⚠️ 別バージョンの可能性あり',
    noPreview:       'このプレビューは読み込めません。\n別の曲を選んでください。',
    errNotFound:     '曲が見つかりません。しばらくしてから再試行してください。',
    errLoad:         '曲の読み込みに失敗しました。ネットワーク接続を確認してください。',
    quizLabel:       'クイズ',
    quizInstruction: '空欄に入る歌詞を選んでください！',
    correct:         '正解です！🎉',
    wrong:           '残念！😢',
    answerLyric:     '正解の歌詞',
    retryListen:     'もう一度聴く',
    home:            '最初から',
    splashSkip:      'タップして開始',
  },
};



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

  /* Language toggle */
  .lang-toggle {
    position: fixed; top: 12px; right: 16px; z-index: 100;
    display: flex; gap: 4px;
  }

  .lang-btn {
    padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;
    font-family: inherit; cursor: pointer; border: 1px solid #3a3a5a;
    background: #1a1a2e; color: #a0a0c0;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .lang-btn.active {
    background: linear-gradient(135deg, #ff6eb4, #a78bfa);
    color: #fff; border-color: transparent;
  }
`;

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onDone, t }) {
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
      <button className="splash-skip">{t('splashSkip')}</button>
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
function ArtistCard({ artist, onClick }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div
      className="artist-card"
      onClick={onClick}
      style={{ borderColor: artist.color }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {!imgFailed ? (
        <img src={artist.img} alt={artist.ko} onError={() => setImgFailed(true)} />
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
function ArtistScreen({ onSelectArtist, t }) {
  return (
    <div className="screen">
      <div className="header">
        <img src="/header-logo.jpg" alt="Logo" style={{ width: 'min(240px, 70vw)', marginBottom: 12 }} />
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </div>
      <div className="artist-grid">
        {ARTISTS.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
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
function ListeningScreen({ artist, trackInfo, songData, noPreview, onQuiz, onBack, t }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying]         = useState(false);
  const [currentTime, setCurrentTime]     = useState(0);
  const [audioLoadError, setAudioLoadError] = useState(false);
  const CLIP_START    = songData.clipStart ?? 0;
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

  // loadedmetadata 시 clipStart 위치로 이동 + progress/auto-pause/error
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoadedMetadata = () => {
      if (CLIP_START > 0) audio.currentTime = CLIP_START;
    };
    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setCurrentTime(t - CLIP_START);
      if (t >= CLIP_START + CLIP_DURATION) { audio.pause(); setIsPlaying(false); }
    };
    const onEnded = () => setIsPlaying(false);
    const onAudioError = () => setAudioLoadError(true);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onAudioError);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onAudioError);
    };
  }, [trackInfo?.previewUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else {
      if (audio.currentTime - CLIP_START >= CLIP_DURATION) {
        audio.currentTime = CLIP_START;
        setCurrentTime(0);
      }
      audio.play().then(() => setIsPlaying(true)).catch(() => setAudioLoadError(true));
    }
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = CLIP_START;
    setCurrentTime(0);
    audio.play().then(() => setIsPlaying(true)).catch(() => setAudioLoadError(true));
  };

  // Active lyric line: progress through all lines over CLIP_DURATION
  const { lyrics, blankLine, blankText, lineDurations } = songData;
  const activeIdx = (() => {
    if (lineDurations) {
      let cum = 0;
      for (let i = 0; i < lineDurations.length; i++) {
        cum += lineDurations[i];
        if (currentTime < cum) return i;
      }
      return lyrics.length - 1;
    }
    return Math.min(Math.floor((currentTime / CLIP_DURATION) * lyrics.length), lyrics.length - 1);
  })();

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
        <img className="artist-img" src={artist.img} alt={artist.ko}
          onError={(e) => { e.target.style.display = 'none'; }} />
        <div className="song-title">{songData.title}</div>
        <div className="song-artist">{artist.ko} ({artist.en})</div>
      </div>

      {noPreview && (
        <div className="warning-box">
          {t('noPreview').split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
          ))}
        </div>
      )}

      {trackInfo?.previewUrl && (
        <>
          <audio ref={audioRef} src={trackInfo.previewUrl} preload="auto" />
          {audioLoadError && (
            <div className="error-box" style={{ marginTop: 8 }}>
              오디오를 불러올 수 없어요. 네트워크를 확인하거나 다른 아티스트를 선택해주세요.
            </div>
          )}
          <div className="player-area">
            <button className="play-btn-large" onClick={togglePlay} aria-label={isPlaying ? '일시정지' : '재생'}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="time-label">
              {isPlaying ? t('timeLeft')(timeLeft) : isDone ? t('playDone') : isMobileDevice() && !isDone ? t('pressPlay') : t('paused')}
            </div>
          </div>
          {trackInfo.trackViewUrl && <AppleAttribution trackViewUrl={trackInfo.trackViewUrl} />}
        </>
      )}

      <div className="lyrics-container">
        <h3>{t('lyricsLabel')}</h3>
        {lyrics.map((line, idx) => renderLine(line, idx))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
        {trackInfo?.previewUrl && (
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleReplay}>
            {t('replay')}
          </button>
        )}
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onQuiz} disabled={false}>
          {t('goQuiz')}
        </button>
      </div>
      <button className="btn btn-outline" style={{ width: '100%', marginBottom: 20 }} onClick={onBack}>
        {t('backArtist')}
      </button>
    </div>
  );
}

// ─── Screen 3: Quiz ───────────────────────────────────────────────────────────
function QuizScreen({ artist, songData, onAnswer, t }) {
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
        <div className="screen-title">{t('quizLabel')}</div>
        <h1 style={{ fontSize: 20 }}>{songData.title}</h1>
        <p style={{ marginTop: 4 }}>{artist.ko} ({artist.en})</p>
      </div>
      <p style={{ textAlign: 'center', color: '#a0a0c0', fontSize: 14, marginBottom: 12 }}>
        {t('quizInstruction')}
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
function ResultScreen({ correct, artist, songData, trackInfo, onHome, onRetry, t }) {
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
        {correct ? t('correct') : t('wrong')}
      </div>
      <div className="result-lyric">
        <div style={{ fontSize: 13, color: '#a0a0c0', marginBottom: 10 }}>{t('answerLyric')}</div>
        {renderFullLine()}
      </div>
      {trackInfo?.trackViewUrl && (
        <div style={{ marginBottom: 20, width: '100%' }}>
          <AppleAttribution trackViewUrl={trackInfo.trackViewUrl} />
        </div>
      )}
      {correct ? (
        <div className="result-btns">
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onHome}>{t('home')}</button>
        </div>
      ) : (
        <div className="result-btns">
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onRetry}>{t('retryListen')}</button>
          <button className="btn btn-primary"   style={{ flex: 1 }} onClick={onHome}>{t('home')}</button>
        </div>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]                       = useState('ko');
  const t = (key) => TRANSLATIONS[lang][key];

  const [showSplash, setShowSplash]           = useState(true);
  const [screen, setScreen]                   = useState('artist');
  const [selectedArtist, setSelectedArtist]   = useState(null);
  const [currentSongData, setCurrentSongData] = useState(null);
  const [trackInfo, setTrackInfo]             = useState(null);
  const [noPreview, setNoPreview]             = useState(false);
  const [quizResult, setQuizResult]           = useState(null);

  const handleSelectArtist = (artist) => {
    const songs = SONGS[artist.id];
    const songData = songs[Math.floor(Math.random() * songs.length)];
    setSelectedArtist(artist);
    setCurrentSongData(songData);
    setNoPreview(!songData.previewUrl);
    setTrackInfo({ previewUrl: songData.previewUrl ?? null, trackViewUrl: songData.trackViewUrl ?? null });
    setScreen('listen');
  };

  return (
    <>
      <style>{styles}</style>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} t={t} />}
      <div className="lang-toggle">
        <button className={`lang-btn${lang === 'ko' ? ' active' : ''}`} onClick={() => setLang('ko')}>KO</button>
        <button className={`lang-btn${lang === 'ja' ? ' active' : ''}`} onClick={() => setLang('ja')}>JA</button>
      </div>
      <div className="bg-gradient" />
      <div className="app">
        {screen === 'artist' && (
          <ArtistScreen
            onSelectArtist={handleSelectArtist}
            t={t}
          />
        )}

        {screen === 'listen' && selectedArtist && currentSongData && (
          <ListeningScreen
            artist={selectedArtist}
            trackInfo={trackInfo}
            songData={currentSongData}
            noPreview={noPreview}
            onQuiz={() => setScreen('quiz')}
            onBack={() => setScreen('artist')}
            t={t}
          />
        )}

        {screen === 'quiz' && selectedArtist && currentSongData && (
          <QuizScreen
            artist={selectedArtist}
            songData={currentSongData}
            onAnswer={(correct) => { setQuizResult(correct); setScreen('result'); }}
            t={t}
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
            t={t}
          />
        )}
      </div>
    </>
  );
}
