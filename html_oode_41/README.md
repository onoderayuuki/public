# 00-HTMLCSS課題
![120218568-e772fe00-c274-11eb-8266-c64718fac06c](https://user-images.githubusercontent.com/38471145/120218783-3456d480-c275-11eb-8a47-6e98c4242092.png)
   - https://onoderayuuki.github.io/public/html_oode_41/
## 概要・操作方法
 - チーズアカデミー選抜試験（笑）をイメージしてネズミがチーズを食べるブロック崩しゲームをクリアしてからサイトに入るようにしてみました。
 - ゲームはスペースキーで開始、左右キーで操作できます。
 - ゲームオーバーもしくはクリア時にRestartかクリア＝サイトに飛ぶか選択する画面が出ます。
 - 通常のチーズアカデミーサイトにgameタブを設けていますので、そこからゲームに戻ることができます。
## 工夫した点
 - index.htmlから自動リダイレクトするようにしたので以下のアドレスで開始できる（game.htmlとmain.htmlとファイル名をつけてしまったので苦し紛れ）
 - game部分は以下のサイトを参考にしつつ、ブロックやボールを画像に変更したり、ボールが微妙に回転するギミックを加えたり、ブロック（＝チーズ）の表示がランダムになるようにするなどオリジナリティを加えてみた。
   - 特に元のコードのボール描画を画像に差し替えたため打ち返し判定の起点が中心→右上になったロジックを
   - https://developer.mozilla.org/ja/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
 - mainのサイト部分はCSSフレームワークを使ってみようということでUIKitを使用。独自のstyleを加えずにスライドなどを実装することができた。
## 残課題
 - ゲームの操作についてスマホタッチ対応できていない。
 - ボールを打ち返す判定にバグがあり、バーや側面をボールが滑ってしまうことがある。
 - 以下にあるボタンエフェクトで似合う物があったので使いたかった。入れ込むとボタンスタイルが崩れてしまい調整できなかったのが残念
    - https://jajaaan.co.jp/css/button/
 - サイトのUIの細かい数値指定を無視してフレームワーク仕様に則ってしまっている
 -  UIKitはless.jsを使って変数を使うなどカスタマイズ？できるようなのだがやり方が分からず素のまま。色なども置換で無理やり揃えてしまっている。
## 感想
  -  チーズアカデミーというお題に寄せながらゲームの見た目をカスタマイズできた点は満足。可愛いので気に入っています。
  - サイト側でのCSSフレームワークはその効果を十分に使いこなせなかったので心残りです。SCSSやless.cssは再挑戦したいです。
## 参考
- CSSフレームワーク　UIkitを使う
 - https://getuikit.com/docs/navbar
 - https://ai-create.net/magazine/2017/09/19/uikit3%E3%81%AE%E3%83%AA%E3%83%83%E3%83%8[…]3%83%88%E3%82%92%E8%A9%A6%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F/
https://getuikit.com/v2/docs/layouts_contact.html
javascriptでゲーム
- https://developer.mozilla.org/ja/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
- https://blog.katsubemakito.net/html5/canvas-image
  - canvas画像の取り扱い
- https://qiita.com/chihiro/items/b105a901bbfd6c5b483c
- https://torisky.com/javascript%EF%BC%9Acanvas%E3%81%A7%E7%94%BB%E5%83%8F%E3%81%AE%E3%81%BF%E5%9B%9E%E8%BB%A2%E3%81%95%E3%81%9B%E3%82%8B/ 
  - 画像の回転
  - ゲームオーバーの余韻
- キーカラーからの配色
   - https://ironodata.info/
- 素材
    - https://www.ac-illust.com/main/detail.php?id=1709609&word=2020%E5%B9%B4%E5%B9%B4%E8%B[…]99+%E9%BB%84+%E6%96%87%E5%AD%97%E9%BB%92&searchId=3048975771
