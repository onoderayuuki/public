const STORAGE_KEY = "todos-vuejs-demo";
const todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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

chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.type == "Action") {
    console.log(request.url);
    let todos = todoStorage.fetch();

    //時刻
    const date = new Date(); //現在の（デバイスに）設定されている時刻を取得する。
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = ("0" + date.getHours()).slice(-2); //取得した時刻から1～23の時間を取得する。
    const minutes = ("0" + date.getMinutes()).slice(-2); //取得した時刻から1～59の分を取得する。

    todos.push({
      id: todoStorage.uid++,
      name: "chromeExpand",
      comment: request.url,
      date: `${year}/${month}/${day}`,
      time: `${hours}:${minutes}`,
      state: false,
      isUrl: true,
    });
    // console.log(todos);
    todoStorage.save(todos);
  }
});
