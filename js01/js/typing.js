//宣言
let waitFLG = false; //改行中等による待ち状態かどうか
let arrayString = []; //入力する文字の待ち行列
let countString = 0; //現在の行の入力文字数
let paper_height = 100;
let paper_top = 260;
let defaultHTML = "";

//関数
function init() {
  document.body.innerHTML = defaultHTML;
  waitFLG = false;
  arrayString = [];
  countString = 0;
  paper_height = 100;
  paper_top = 260;
}

function judgKey(e) {
  if (!waitFLG && e.key == "Escape") {
    stretchPaper();
    tearPaper();
  } else if (!waitFLG && e.key == "Enter") {
    lineFeed();
  } else if (
    waitFLG || //textareaが改行処理中の場合
    countString > 23 || //1行の行数を超えている場合
    e.key.length > 1 || //印字関連でないキーを押下した場合=キー１つで複数文字を意味する場合
    arrayString.length > 2 //打つ文字が溜まっている場合
  ) {
    missType();
  } else {
    hitType(e.key);
  }
}

function stretchPaper() {
  let paper = document.getElementById("paper");
  paper_height += 50;
  paper_top -= 50;
  paper.style.height = paper_height + "px";
  paper.style.top = paper_top + "px";
}

function tearPaper() {
  setTimeout(function () {
    document.getElementById("tear_audio").play();
  }, 300);
  setTimeout(init, 800);
}

function missType() {
  document.getElementById("miss_audio").play();
}

function hitType(key) {
  document.getElementById("type_audio").play(); //音が鳴る

  arrayString.push(key); //入力待ち配列に入れる

  if (countString == 23) {
    //１行の文字数の上限かを判定
    document.getElementById("chime_audio").play();
  }
  countString++;

  //配列の１文字目なら印字開始：２文字目以降なら起動して動いている途中のため不要
  if (arrayString.length == 1) {
    printArrayString();
  }
}

function printArrayString() {
  const highlight = document.getElementById("highlight");
  setTimeout(function () {
    highlight.classList.remove("highlight-on");
  }, 15);
  setTimeout(function () {
    printChar();
    highlight.classList.add("highlight-on");
    if (arrayString.length > 0) {
      printArrayString(); //再帰
    } else {
      return;
    }
  }, 160);
}

function printChar() {
  const str = arrayString.shift();
  const log = document.getElementById("log");
  log.textContent += str;
}

function lineFeed() {
  setTimeout(function () {
    countString = 0;
    //紙を増やすこと
    stretchPaper();
    createNextP();
    //ハイライトの移動
    document.getElementById("down_audio").play();
    const log = document.getElementById("log");

    clearHighlight(log.textContent);
    downHighlight(log.textContent);
    moveleftHighlight(log.textContent);
  }, 500);
}
function createNextP() {
  let nextP = document.createElement("p");
  nextP.classList.add("text");
  const textareaDiv = document.getElementById("textarea");
  textareaDiv.append(nextP);
}

function clearHighlight(logText) {
  const nowP = log.parentElement;
  nowP.textContent = logText;
}

function downHighlight(logText) {
  const nextP = document.getElementById("textarea").lastChild;
  // Spanタグを次のpへ移動：ハイライトを動かす
  nextP.classList.add("wait"); //文字が透明に変わる
  nextP.innerHTML =
    logText +
    "<span id='log'></span><span id='highlight' class='highlight-on'>_</span>";
}

function moveleftHighlight() {
  const highlight = document.getElementById("highlight");
  const nextP = document.getElementById("textarea").lastChild;

  setTimeout(function () {
    highlight.classList.remove("highlight-on");
  }, 500);

  let waittime = 0;
  if (log.textContent.length == 0) {
    waittime = 100;
  } else if (log.textContent.length <= 6) {
    document.getElementById("moveleft_short_audio").play();
    waittime = 600;
  } else if (log.textContent.length <= 15) {
    document.getElementById("moveleft_middle_audio").play();
    waittime = 1200;
  } else {
    document.getElementById("moveleft_long_audio").play();
    waittime = 1800;
  }

  setTimeout(function () {
    nextP.innerHTML =
      "<span id='log'></span><span id='highlight' class='highlight-on'>_</span>";
    highlight.classList.add("highlight-on");
    nextP.classList.toggle("wait"); //文字色が戻る
    waitFLG = false;
  }, waittime);
}

window.onload = function () {
  defaultHTML = document.body.innerHTML; // 初期HTML記述をセット
  init();
  document.addEventListener("keydown", judgKey);
};