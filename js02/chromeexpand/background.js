chrome.browserAction.onClicked.addListener(function(activetab) {
	const message = { type: "Action" ,url:activetab.url};
	
	chrome.tabs.sendMessage(activetab.id, message);

	chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT},(tabs) => {
		tabs.forEach((tab,i) => {
		//   if(i!=0) txt += delimiter;  //最初は区切り文字不要
		if(tab.title == 'SLGKmemo'){
			chrome.browserAction.setIcon({ path:"icon_32 yellow.png"}); //クリップできたらアイコンの色変更
			setTimeout(() => {
				chrome.browserAction.setIcon({ path:"icon_32.png"}); //戻す
			}, 2000);

			chrome.tabs.sendMessage(tab.id, message);
		}
		});
	
	
	  });


});