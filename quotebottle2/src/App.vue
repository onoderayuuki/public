<template>
  <div id="quotebottle">
    <h1 class="page-title">Quote Bottle</h1>
    <p class="page-alert">! alphabet only</p>
    <!-- 入力フォーム -->
    <section class="get-in-touch form-container">
      <form
        action=""
        @submit.prevent="doSend"
        class="contact-form row add-form"
        autocomplete="off"
      >
        <div class="form-field col x-70">
          <input v-model="inputtitle" id="title" class="input-text js-input" />
          <label class="label smallstick" for="title">Title</label>
        </div>
        <div class="form-field col x-100">
          <input
            v-model="inputtext"
            @keydown.enter.exact.prevent="doSend"
            id="quotetext"
            class="input-text js-input not-empty"
            pattern="^[0-9a-zA-Z ]+$"
          />
          <label class="label" for="quotetext">Quote</label>
        </div>
        <div class="form-field col x-50 right">
          <input
            v-model="inputauthor"
            id="author"
            class="input-text js-input"
          />
          <label class="label smallstick" for="author">Author</label>
        </div>
        <div class="form-field col x-100 align-center">
          <input id="send" class="submit-btn" type="submit" value="Put in" />
        </div>
      </form>
    </section>
    <!-- 確認用表示 -->
    <!-- <section
      v-for="{ key, quoteid, title, quotetext, author, datetime } in chat"
      :key="key"
      class="item"
    >
      {{ key }}：{{ quoteid }}:{{ title }}:{{ quotetext }}:{{ author }}:{{
        datetime
      }}
    </section> -->
    <quotecanvas ref="child"></quotecanvas>
    <!-- <p> 落下した物体のIDは {{ showID }} です</p> -->
    <transition name="fade">  
    <section v-if="showID >= 0"  class="get-in-touch show-container align-center">
      <p class="showarea before">{{ chat[showID].quotetext }}</p>
      <p class="showarea before right"> -- {{ chat[showID].quoteauthor }}</p>
    </section>
</transition>
  </div>
</template>

<script>
import firebase from "firebase";
import quotecanvas from "./components/quotecanvas.vue";
import 'normalize.css'

export default {
  name: "quoteform",
  components: {
    quotecanvas,
  },
  data() {
    return {
      user: {}, // ユーザー情報
      chat: [], // 取得したメッセージを入れる配列

      // 入力したメッセージ
      inputtitle: "",
      inputtext: "",
      inputauthor: "",

      quoteid: 0,
    
      //状態管理
      isnotEmpty: false,
      showID: -1,

      splitquotetext: [],
      message:'parent'
    };
  },
  created() {
    const ref_message = firebase.database().ref();
    this.chat = [];
    // message に変更があったときのハンドラを登録
    ref_message.limitToLast(10).on("child_added", this.childAdded);
  },
  methods: {
    // 受け取ったメッセージをchatに追加
    // データベースに新しい要素が追加されると随時呼び出される
    childAdded(snap) {
      const v = snap.val();
      this.chat.push({
        key: snap.key,
        quoteid: this.quoteid,
        quotetitle: v.title,
        quotetext: v.quotetext,
        quoteauthor: v.quoteauthor,
        quotedatetime: v.datetime,
      });
      // butotnClick([...v.text], id);
      // this.$refs.child.test();
      // this.$refs.child.createQuote(["A", "B", "C", "D", "E"], this.quoteid);
      // console.log('added');

      let Uppertext = v.quotetext.toUpperCase() ; //大文字に置き換え
      Uppertext = Uppertext.replace(' ','_'); //半角スペース置き換え
      this.splitquotetext=[...Uppertext];
      // console.log(this.message);
      this.$refs.child.createQuote(this.splitquotetext, this.quoteid);
      this.quoteid += 1;
    },
    doSend() {
      const day = new Date();
      if (this.inputtext.length) {
        // firebase にメッセージを追加
        firebase
          .database()
          .ref()
          .push(
            {
              quotetitle: this.inputtitle,
              quotetext: this.inputtext,
              quoteauthor: this.inputauthor,
              quotedatetime: day,
            },
            () => {
              this.inputtitle = ""; // フォームを空にする
              this.inputtext = ""; 
              this.inputauthor = ""; 

            }
          );
      }
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Raleway:300);
@import url(https://fonts.googleapis.com/css?family=Lusitana:400,700);

.align-center {
  text-align: center;
}

.align-right {
  text-align: right;
}

.right {
  margin-left: 50%;
}

.font-small {
  font-size: small;
}

html {
  height: 100%;
}

body {
  height: 100%;
  position: relative;
}

.row {
  margin: -20px 0;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.row .col {
  padding: 0 20px;
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.row .col.x-50 > input,
.row .col.x-50 > label,
.row .col.x-70 > input,
.row .col.x-70 > label {
  font-size: 15px;
  height: 24px;
}

.row .col.x-50 > .label.smallstick,
.row .col.x-70 > .label.smallstick {
  -webkit-transform: translateY(-12px);
  transform: translateY(-12px);
}

.row .col.x-50 {
  width: 50%;
}

.row .col.x-70 {
  width: 70%;
}

.row .col.x-100 {
  width: 100%;
}

.content-wrapper {
  min-height: 100%;
  position: relative;
}

.get-in-touch {
  max-width: 650px;
  margin: 0 auto;
  position: relative;
}

.page-title {
  text-align: center;
  font-family: Raleway, sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 36px;
  line-height: 48px;
  padding-top: 8px;
}
.page-alert{
  text-align: center;
  font-family: sans-serif;
  letter-spacing: 1px;
  font-size: 15px;
  padding-bottom: 8px;
  color:red;

}
.show-container {
  font-family: Lusitana, serif;
  font-size: 20px;
  line-height: 26px;
  font-weight: 400;
  padding-top: 16px;
}

.show-container .showarea {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  -webkit-transition: all 1000ms 0s ease;
  transition: all 1000ms 0s ease;
}

.show-container .showarea.before {
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
}

.contact-form .form-field {
  position: relative;
  margin-top: 25px;
  /* margin-bottom: 16px; */
}

.contact-form .input-text {
  display: block;
  width: 100%;
  height: 36px;
  border-width: 0 0 2px 0;
  border-color: #000;
  font-family: Lusitana, serif;
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;
}

.contact-form .input-text:focus {
  outline: none;
}

.contact-form .input-text:focus + .label,
.contact-form .input-text.not-empty + .label {
  -webkit-transform: translateY(-24px);
  transform: translateY(-24px);
}

.contact-form .label {
  position: absolute;
  left: 20px;
  bottom: 11px;
  font-family: Lusitana, serif;
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;
  color: #888;
  cursor: text;
  -webkit-transition: -webkit-transform 0.2s ease-in-out;
  transition: -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
}

.contact-form .submit-btn {
  display: inline-block;
  background-color: #000;
  color: #fff;
  font-family: Raleway, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.note {
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-family: Lusitana, serif;
  font-size: 16px;
  line-height: 21px;
}

.note .link {
  color: #888;
  text-decoration: none;
}

.note .link:hover {
  text-decoration: underline;
}

.fade-enter-active {
  transition: opacity 1s ;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*# sourceMappingURL=style.css.map */
</style>
