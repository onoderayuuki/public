# 02-JAVASCRIPT課題
https://onoderayuuki.github.io/public/js02/SLGKmemo.html
## 概要・操作方法
 - Slack風にメモや参考サイトのURLを書き残せる
   - URLの概要を勝手に表示してくれる
<img width="250" alt="スクリーンショット 2021-06-03 13 39 14" src="https://user-images.githubusercontent.com/38471145/120588086-86fce000-c471-11eb-90e7-6aaa5cde3862.png">
<img width="250" alt="スクリーンショット 2021-06-03 13 38 52" src="https://user-images.githubusercontent.com/38471145/120587963-48672580-c471-11eb-8316-bb29f23e9e56.png">

 - 右上のボタンでGoogleKeep風のレイアウトに早変わり

![js02](https://user-images.githubusercontent.com/38471145/119167925-572a0180-ba9b-11eb-9cf9-0d7af1d6d847.gif)
 - Google拡張機能を入れて、このWEBサイトを立ち上げておくと、拡張機能ボタンを押下したらURLが勝手に連携されるよ
<img width="862" alt="スクリーンショット 2021-05-22 1 23 39" src="https://user-images.githubusercontent.com/38471145/119168989-7a08e580-ba9c-11eb-9b35-8ac4a0e2ea1e.png"> 

## 工夫した点
 - Vue.jsに挑戦。CLIはこの時挫折したので次の回で。
 - Google拡張機能に挑戦。別タブのlocalStrageと連携できた。  
 - ライブラリのリンクプレビュー機能を組み込んだ。
 - 内容はそのままにCSSのみで見た目を切り替えられるようにした。
 - 前週のレビューを受けて命名を中心にリファクタリング（ただしasync/awaitはうまく使えなかった） 
## 残課題
 - 拡張機能からの連携時にlocalStrageにデータが追加されたことをVueで監視して欲しかったができなかった。VUeの外で追加したデータだからなのか自動的にはfetchしてくれない
 - 日付の区切りをSlack風に表示させたかった。Vue-forを使って繰り返し要素を表示されている途中でどのように日付要素を追加させればよいのか皆目わからなかった。 
 - Keep画面が下に長くなった時、サイドバー表示が途中で切れている
 - 毎回URLの内容を撮りに行くので重くなる（ライブラリの仕様なので仕方ない）
 - keep風メモボックスの順番を入れ替えられる機能
 - 重複したURLのときは表示しない機能
 - 一度クリップしたサイトのときは拡張機能のアイコンが判定で変わる機能
 - チェックボックス付タスクリスト作れる機能
## 感想
 - あんまり可愛くないですが便利なのでそこそこ気に入っています。
 - 仕事で使ったツールのなかでSlackとKeepの使用感が好きだったので選びました。
 - Gsのプログラミングに際して参考にしたサイトは全部記録しよう、でも毎回URLコピペは面倒、というところから生まれました。 
 - 挑戦もしましたが残課題も多いです。レビュー会参加できないことが分かって最後の追い込みをやりませんでした反省。 
## 参考
 - 未認可の拡張機能を追加する方法（自己責任でお願いします）
   - http://degitekunote.com/blog/2016/11/02/chrome-extension/
   - https://future-architect.github.io/articles/20200625/
 - 後日書きます
## レビューで参考になった点
