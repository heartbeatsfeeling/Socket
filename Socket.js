(function(){
	var Socket=function(option){
		console.log(option,1111)
		this.url=option.url;
		this.connect();
	};
	Socket.prototype={
		connect:function(){
			this.ws=new WebSocket(this.url);
		},
	};
	window.Socket=Socket;
})();