# 01-JAVASCRIPT課題
![image (1)](https://user-images.githubusercontent.com/38471145/118314472-25f78180-b52f-11eb-8e1f-d8a11eff39e8.png)

## 概要・操作方法
 - タイプライターのような操作感で文字入力ができます。
 - PCのみ対応。できれば音の鳴る環境で試してみてください。 
   - https://onoderayuuki.github.io/public/js01/
 - 使い方
   - タイプライターなので変換やバックスペースは利きません。
   - 鐘が鳴ったらその行は文字数オーバーです。Enterを押して次の行に移動してください。
   - escで紙を破り取って最初からできます。   
## 工夫した点
 - ひたすら不便を追求し、役に立たないギミック（音とか）にこだわったこと。
   - 銃声やレンジの音など予想外の効果音でそれっぽく
   - 打鍵や改行の物理的な使用感のためにsetTimeoutを駆使 
## 残課題
 - タイピングゲーム要素（≒ジャンケンアプリ）を足す
 - 入力した物がPDFで出せると良い
 - 背景やタイプライターの種類、フォントなどを選べるように  
## 感想
  -  可愛いので気に入っていますその２。
  -  物理的な相互作用の感覚を追求できた点が満足  
  - タイピングゲーム要素の実装を放棄したのでジャンケンアプリのお題からは離れ過ぎてしまったかな。
## 参考
- タイピングゲーム
http://www.programmingtheworld.com/index.php/2020/03/22/javascript-typing-game/
   - 入力表示のあるタイピングゲーム  https://www.sejuku.net/blog/92667
   - 音が出るタイピングゲーム  https://novicengineering.com/javascript_typinggame/
- 配列処理
https://maku77.github.io/js/array/loop.html
- 再起関数
https://www.javadrive.jp/javascript/function/index15.html
- 素材
https://www.pakutaso.com/20200630170post-28026.html
https://www.ac-illust.com/main/detail.php?id=1726987&word=%E3%82%BF%E3%82%A4%E3%83%97%E3%83%A9%E3%82%A4%E3%82%BF%E3%83%BC&searchId=2186886034
https://tools4music.info/audio-editor/audio-speed-changer

## レビュー会で参考になった点

なるべくconstを使おう
https://qiita.com/cheez921/items/7b57835cb76e70dd0fc4

単一責任の原則;
https://note.com/erukiti/n/n67b323d1f7c5

命名規則(html,css,jsでの使い分け)
https://qiita.com/itagakishintaro/items/168667d5ee4c56b30d52

INIT() 初期化関数を定義する
https://www.it-swarm-ja.com/ja/javascript/javascript%E3%81%A7%E3%81%AEinit%EF%BC%88%EF%BC%89%E3%81%AE%E4%BD%BF%E7%94%A8%E6%B3%95%E3%81%AF%E4%BD%95%E3%81%A7%E3%81%99%E3%81%8B%EF%BC%9F/941539261/

array オブジェクトを使えば配列に対して色々メソッドが使える
https://techacademy.jp/magazine/5600#sec3

debugger;  を入れるとブレイクポイントが設定できる
https://qiita.com/kjirou/items/c6522a2aff9ffb7e8235

Object.assign(); 
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
https://reffect.co.jp/html/javascript-object-assign

バイオのタイプライター？
https://nlab.itmedia.co.jp/nl/articles/1808/12/news025.html