# Socket
对 html5 Websocket的简单封装
##功能
* 支持消息订阅
* 支持取消订阅

##使用方法
```js
var ws = new Socket({
	url: "ws://115.28.213.244:8181",//ws-url
	onmessage: function(event) {//接收后台消息回调
		/*
			后台推送消息都会执行此回调
			如果后台希望向特定的频道发送消息则格式为：
			{
				path:"test",//向前台的test频道发消息
				data:"nihao"
			}
			
		*/
	},
	onopen: function(event) {//连接成功回调
		ws.emit({//向后台发消息
			path: "test",//向test频道发消息
			message: "aaa"//消息内容
		});
		ws.on('test', function(data) {//订阅test频道
			log(data)
		});
	},
	onclose:function(event){//连接关闭订阅
	  ws.off('test')//关闭test频道
	},
	onerror:function(event){//连接出错
	
	}
});
```
