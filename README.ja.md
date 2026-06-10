# 🎤 K-POP 歌詞クイズ

[한국어](README.md) | [日本語]

K-POPアーティストの音楽を聴いて、空欄の歌詞を当てるWebクイズアプリです。

## 技術スタック

- **Frontend**: React 19 + Vite 8 (SPA)
- **デプロイ**: Vercel
- **AI**: Claude API (`claude-sonnet-4-6`) — 不正解選択肢の自動生成

## 主な機能

### クイズの流れ
1. アーティストを選択
2. Apple Music プレビュー再生（10秒クリップ）
3. 歌詞の空欄を4択で回答
4. 正解・不正解の結果確認

### AI による不正解選択肢の自動生成
アーティストを選択した瞬間、バックグラウンドで Claude API を呼び出し、クイズの不正解選択肢を3つ自動生成します。

- **エンドポイント**: `POST /api/generate-choices` (Vercel Serverless Function)
- **入力**: 曲タイトル、アーティスト名、歌詞、正解(blankText)、完成ライン
- **出力**: 正解と混同しやすい不正解3つ（発音・文字数・意味が類似）
- **フォールバック**: API 失敗時はデータに手動登録した不正解選択肢に自動切替

APIキーはサーバー環境変数（`ANTHROPIC_API_KEY`）にのみ保存し、フロントエンドから Anthropic API を直接呼び出しません。

## ローカル開発

```bash
# 依存関係のインストール
npm install

# .env ファイルの作成
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env

# 開発サーバーの起動（AI機能あり）
vercel dev

# Vite 単体起動（AI機能なし）
npm run dev
```

> `vercel dev` を使用すると `/api/*` サーバーレス関数もローカルで動作します。

## Vercel デプロイ設定

Vercel ダッシュボード → **Project Settings → Environment Variables** に `ANTHROPIC_API_KEY` の追加が必要です。

## 収録アーティスト

IU · TWICE · IVE · (G)I-DLE · BTS · ILLIT · Hearts2Hearts · SEVENTEEN · Stray Kids · LE SSERAFIM · NMIXX · RESCENE
