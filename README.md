# 🎤 K-POP 가사 퀴즈

K-POP 아티스트의 음악을 듣고 빈칸 가사를 맞히는 웹 퀴즈 앱입니다.

## 기술 스택

- **Frontend**: React 19 + Vite 8 (SPA)
- **배포**: Vercel
- **AI**: Claude API (`claude-sonnet-4-6`) — 오답 자동생성

## 주요 기능

### 퀴즈 플로우
1. 아티스트 선택
2. Apple Music 미리듣기 재생 (10초 클립)
3. 가사 빈칸 4지선다 퀴즈
4. 정답/오답 결과 확인

### AI 오답 자동생성
아티스트를 선택하는 순간 백그라운드에서 Claude API를 호출해 퀴즈 오답 3개를 자동 생성합니다.

- **엔드포인트**: `POST /api/generate-choices` (Vercel Serverless Function)
- **입력**: 곡 제목, 아티스트명, 가사, 정답(blankText), 완성 라인
- **출력**: 정답과 헷갈리기 쉬운 오답 3개 (발음·글자수·의미 유사)
- **폴백**: API 실패 시 데이터에 수동 등록된 오답으로 자동 전환

API 키는 서버 환경변수(`ANTHROPIC_API_KEY`)에만 저장하며, 프론트엔드에서 Anthropic API를 직접 호출하지 않습니다.

## 로컬 개발

```bash
# 의존성 설치
npm install

# .env 파일 생성
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env

# 개발 서버 실행 (AI 기능 포함)
vercel dev

# Vite 단독 실행 (AI 기능 미포함)
npm run dev
```

> `vercel dev` 사용 시 `/api/*` 서버리스 함수까지 로컬에서 동작합니다.

## Vercel 배포 설정

Vercel 대시보드 → **Project Settings → Environment Variables** 에 `ANTHROPIC_API_KEY` 추가 필요.

## 수록 아티스트

아이유 · 트와이스 · 아이브 · 여자아이들 · BTS · 아일릿 · 하츠2하츠 · 세븐틴 · 스트레이 키즈 · 르세라핌 · NMIXX · 리센느
