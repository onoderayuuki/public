<?php
//1.  DB接続します

try {
  $pdo = new PDO('mysql:dbname=docker_db;charset=utf8;host=172.19.0.2','root','root');
} catch (PDOException $e) {
  exit('DbConnectError:'.$e->getMessage());
}

//２．データ登録SQL作成

$stmt = $pdo->prepare("SELECT * FROM ec_table");
$status = $stmt->execute();


//３．データ表示
$view="";
if($status==false) {
 //execute（SQL実行時にエラーがある場合）
 $error = $stmt->errorInfo();
 exit("ErrorQuery:".$error[2]);

} else {
 //Selectデータの数だけ自動でループしてくれる
 while( $result = $stmt->fetch(PDO::FETCH_ASSOC)){
  // $view .= $result["id"]."==".$result["item"];
  $view .= '<li class="cart-list">';
  $view .= '<p class="cart-thumb"><img src="../img/'.$result["fname"].'" alt="#" width="200px" ></p>';
  $view .= '<h2 class="cart-title">'.$result["item"].'</h2>';
  $view .= '<p class="cart-price">1,980円</p>';
  $view .= '<p class="cart-number">1</p>';
  $view .= '<a href="#" class="btn-update">編集</a>';
  $view .= '<a href="#" class="btn-delete">削除</a>';
  $view .= '</li>';

 }
//  echo $view;
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="../css/reset.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/jquery.bxslider.css">
</head>
<body class="cms">
  <!--header-->
  <header class="header">
    <p class="site-title"><a href="#"><img src="../images/common/logo.png" alt="G's Academy Tokyo"></a></p>
  </header>
  <!--end header  -->

  <div class="outer">
    <h1 class="page-title page-title__cms">管理画面</h1>
    <div class="wrapper wrapper-main flex-parent">
      <main class="wrapper-main">
        <ul class="cart-products">
        <?=$view ?>
          
          
        </ul>
      </main>
    </div>
  </div>

  <!--footer-->
  <footer class="footer">
    <div class="wrapper wrapper-footer">

      <div class="footer-widget__long">
        <p><a href="#"><img src="../images/common/logo.png" alt="g's academy tokyo"></a></p>
      </div>

      <div class="footer-widget">
        <ul class="nav-footer">
          <li class="nav-footer__item"><a href="#">Category</a></li>
          <li class="nav-footer__item"><a href="#">Category</a></li>
          <li class="nav-footer__item"><a href="#">Category</a></li>
          <li class="nav-footer__item"><a href="#">Category</a></li>
          <li class="nav-footer__item"><a href="#">Category</a></li>
        </ul>
      </div>

      <div class="footer-widget">
        <ul class="nav-footer">
          <li class="nav-footer__item"><a href="#">G's Academy??</a></li>
          <li class="nav-footer__item"><a href="#">Contact Us</a></li>
          <li class="nav-footer__item"><a href="#">Cart</a></li>
          <li class="nav-footer__item"><a href="#">Member Page</a></li>
        </ul>
      </div>

      <div class="footer-widget">
        <ul class="social-list">
          <li class="social-item"><a href="#"><img src="../images/common/facebook.png" alt=""></a></li>
          <li class="social-item"><a href="#"><img src="../images/common/instagram.png" alt=""></a></li>
          <li class="social-item"><a href="#"><img src="../images/common/twitter.png" alt=""></a></li>
        </ul>
      </div>

    </div>
    <p class="copyrights"><small>Copyrights G’s Academy Tokyo All Rights Reserved.</small></p>
  </footer>
  <!--end footer-->

<script src="http://code.jquery.com/jquery-3.0.0.js"></script>
</body>
</html>
