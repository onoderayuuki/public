//Style
function openCover() {
  const NAV_COVER = document.getElementById("NavCover");
  NAV_COVER.classList.add("open");
  NAV_COVER.classList.remove("close");
}
function closeCover() {
  const NAV_COVER = document.getElementById("NavCover");
  NAV_COVER.classList.remove("open");
  NAV_COVER.classList.add("close");
}
function changeCSSLink(url) {
  const STYLE_LINK = document.getElementById("StyleLink");
  STYLE_LINK.href = url;
}
function fadeChangeStyle(url) {
  openCover();
  setTimeout(()=>{
    changeCSSLink(url);
    closeCover();
  },600)
}

// ローカルストレージAPI
const STORAGE_KEY = "todos-vuejs-demo";
let todoStorage = {
  fetch: function () {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

//Vueインスタンス
new Vue({
  el: "#app",
  components: {
    LinkPrevue: window.LinkPrevue.default,
  },
  data: {
    todos: [],
    titleedit: false,
    title: "#sayoko",
  },
  computed: {
    //URLか普通のメモかで分ける＝＞それぞれ描画される
    url_items: function () {
      return this.todos.filter(function (el) {
        return el.isUrl;
      }, this);
    },
    comment_items: function () {
      return this.todos.filter(function (el) {
        return !el.isUrl;
      }, this);
    },
  },

  //データ監視:ストレージへの自動保存
  watch: {
    todos: {//引数には変更後の値が入る
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true, //ネストしているデータの監視
    },
  },

  //ライフサイクルフック:データの自動取得
  created() {
    //インスタンス作成時に自動的にfetch()する
    this.todos = todoStorage.fetch();
    //edit解除
    this.todos.forEach(function (item) {
      item.state = false;
    });
  },

  methods: {
    submitForm: function (event, value) {
      const EDIT_AREA = this.$refs.EditArea;
      if (!EDIT_AREA.value.length) {
        return; //内容がなければ終了
      }
      //内容の取得
      let textArray = EDIT_AREA.value.split("\n");
      let newComment = textArray.join("<br>");
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = ("0" + date.getHours()).slice(-2); //取得した時刻から1～23の時間を取得する。
      const minutes = ("0" + date.getMinutes()).slice(-2); //取得した時刻から1～59の分を取得する。
      let storage_id = this.$refs.storage_id;
      let this_id = storage_id.value;

      if (this_id == -1) {
        this.todos.push({
          id: todoStorage.uid++,
          name: "sayoko",
          comment: newComment,
          date: `${year}/${month}/${day}`,
          time: `${hours}:${minutes}`,
          state: false,
          fav: false,
          isUrl: this.checkFormat(newComment),
        });
      } else {
        // console.log(this.todos[storage_id.value]);
        this.todos[this_id].comment = newComment;
        this.todos[this_id].state = false;
        this.todos[this_id].isUrl = this.checkFormat(newComment);
      }

      EDIT_AREA.value = ""; //フォーム要素を空にする
    },

    editItem: function (item) {
      this.todos.forEach(function (item) {
        item.state = false; //一旦全てのedit状態を解除して始める
      });
      item.state = true;
      //内容
      let textArray = item.comment.split("<br>");
      this.$refs.EditArea.value = textArray.join("\n");;
      this.$refs.storage_id.value = item.id;
      //枠調整
      this.adjustHeight();
    },

    copyItem: function (item) {
      const NEW_COMMENT = item.comment.split("<br>").join("\n");
      this.$refs.EditArea.value += NEW_COMMENT + "\n";
      this.adjustHeight();
    },
    favItem: function (item) {
      item.fav = !item.fav;
    },
    removeItem: function (item) {
      let index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    },
    adjustHeight() {
      const textarea = this.$refs.EditArea;
      const resetHeight = new Promise(function (resolve) {
        resolve((textarea.style.height = "auto"));
      });
      resetHeight.then(function () {
        textarea.style.height = textarea.scrollHeight + "px";
      });
    },
    
    checkFormat(url) {
      var re = /^http(|s):\/\/.+/;
      return re.test(url);
    },
    onKeypressEnter: function () {
      // console.log('Enterキーが押されました')
      this.doSubmit();
    },
  },
});
