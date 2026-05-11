SPAのホスティング・サイトを格納する予定だったが、dotnetフォルダは削除した。
WebAPIについては[ResourceServerTemplates](https://github.com/OpenTouryoProject/ResourceServerTemplates)を使用して下さい。

### serve（最もシンプル）
```
npm install -g serve
serve dist
```
ブラウザで http://localhost:3000 にアクセス。SPAのルーティング対応も自動。

### http-server
```
npm install -g http-server
http-server dist -p 8080 --spa
```
ブラウザで http://localhost:8080 にアクセス。

### Python
（インストール不要な場合が多い）（WSL2で実行）
```
cd dist
python -m http.server 8080
```
ブラウザで http://localhost:8080 にアクセス。SPAのルーティングへの直接アクセスは404になるので、開発確認程度に。

### VS Code の Live Server 拡張
dist/index.html を右クリック →「Open with Live Server」
