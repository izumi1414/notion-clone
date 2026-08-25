# Notion Clone

## プロジェクト概要

ReactとTypeScriptで構築した、Notion風のノート管理アプリです。ユーザー認証を行ったあと、ノートの作成、編集、検索、削除を行えます。データの取得・更新は別途起動したAPIサーバーと通信します。

## 使用技術

- React 19
- TypeScript
- Vite
- React Router
- Jotai
- BlockNote
- Axios
- react-icons
- ESLint

## 主な機能

- ユーザー登録、ログイン、ログアウト状態の保持
- ノートの一覧表示と詳細表示
- ノートの新規作成、タイトル・本文の編集、削除
- キーワードによるノート検索
- JWTトークンを利用したAPIリクエストの認証
- BlockNoteエディターによるリッチテキスト編集

## 使い方

1. アプリを起動します。
2. 初回利用時は「登録」からユーザーを作成します。
3. ログイン後、ホーム画面でノートを作成します。
4. サイドバーからノートを開き、タイトルや本文を編集します。
5. サイドバーの検索からキーワードでノートを絞り込みます。

## セットアップ手順

### 前提条件

- Node.js 18以上
- npm
- ノートAPIサーバー 
https://github.com/kurushiba/notion-clone-api

### インストール

```bash
npm install
```

プロジェクト直下に `.env` を作成し、APIサーバーのURLを設定します。

```env
VITE_API_URL=http://localhost:8888
```

APIサーバーを起動したあと、開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで表示されたURL（通常は `http://localhost:5173`）を開いてください。

### その他のコマンド

```bash
npm run build    # 型チェックと本番ビルド
npm run lint     # ESLint
npm run preview  # 本番ビルドのプレビュー
```

## ディレクトリ構成

```text
notion-clone/
├── public/                  # 静的ファイル
├── src/
│   ├── components/          # UIコンポーネント、エディター
│   ├── lib/api/             # Axios設定、認証ヘッダー処理
│   ├── modules/
│   │   ├── auth/            # 認証リポジトリ、ログインユーザー状態
│   │   ├── notes/           # ノートモデル、APIリポジトリ、状態管理
│   │   └── user/            # ユーザーモデル
│   ├── pages/               # ホーム、ノート詳細、認証画面
│   ├── styles/              # 共通・コンポーネント・ページ別CSS
│   ├── App.tsx              # ルーティングと初期ユーザー取得
│   ├── Layout.tsx           # 認証後の共通レイアウト
│   └── main.tsx             # アプリケーションエントリーポイント
├── .env                     # API URL（要作成）
├── package.json
└── vite.config.ts
```
