;(function($){
	/*解析 ConextPath*/
	window.getContextPath=function() {
		if(window.Global){
			return window.Global.contextPath;
		}
	    var pathName = document.location.pathname;
	    var index = pathName.substr(1).indexOf("/");
	    var result = pathName.substr(0,index+1);
	    
	    var protocol = window.location.protocol ;
	    if( protocol == "file:" ){
	    	result = pathName.split("bingo-css-framework")[0]+"bingo-css-framework" ;//直接浏览器查看文件路径
	    	return window.location.protocol+"//"+result;
	    }
	    return result ;
	};

	window.Config = window.Config || {
		contextPath:getContextPath(),
		serverPath:window.location.protocol+"//"+window.location.host+getContextPath()
	} ;
	window.Global = window.Global || window.Config ;


	/*******************************************
	 @description 打开窗口
	 @example
	    打开窗口            ： jQuery.open( url , width , height , params ,callback ) ;
	    在打开窗口中获取参数 ： var args        = jQuery.dialogAraguments() ;
	    获取打开窗口中返回值 ： var returnValue = jQuery.dialogReturnValue() ;
	 ******************************************/
	if( !jQuery.fn.dialogClose ){
		jQuery.fn.dialogClose = function(){
			window.close() ;
		}
	}

	jQuery.open = function(url,width,height,params,callback,fixParams){
		url = jQuery.utils.parseUrl(url||"") ;
		jQuery.dialogReturnValue("__init__");
		params = params||{} ;
		fixParams = fixParams||{} ;
		if( $.dialog  && (params.showType == 'dialog' || !params.showType ) ){
			var opts = {
				width:width,
				height:height,
				title:params.title||params.Title||fixParams.title||'',
				url:url,
				data:params,
				onload:function(){
					var me = this ;
					if(params.iframe===false || params.iframe === "false"){
						setTimeout(function(){
							//控件初始化
							me.frwDom.uiwidget() ;
							//浏览器兼容
							me.frwDom.browserFix() ;
						},5 ) ;
					}
				},close:function(){
					callback && callback.call(this) ;
				}
			}
			
			opts = $.extend({},opts,params,fixParams) ;
			var _dialog = jQuery.dialog(opts) ;
			return _dialog ;
			
		}else if(!$.browser.msie || params.showType == 'open'){
			
			var win = openCenterWindow(url, width, height);
			window._dialogArguments = params ;
			
			var _callbak = function(){
				if( $.unblock ){$.unblock() ; }
				callback(window);
			}
			try{
				if( jQuery.browser.msie ){
					win.attachEvent("onunload", _callbak );
				}else{
					win.onbeforeunload = _callbak ;
				}
			}catch(e){
				
			}
			return win ;
		} else if( $.browser.msie ){
			_returnValue = showCenterModalDialog(url , width ,height ,params) ;
			jQuery.dialogReturnValue(_returnValue||"") ;
			callback() ;
		}
		
		
	};

	jQuery.dialogAraguments = function(){
		//showmodeldialog
		var args = window.dialogArguments||window.$_dialogArguments ;
		if( args ) return args ;
		var target =  window.opener || window.parent ;
		try{
			return target._dialogArguments||target.$_dialogArguments ;
		}catch(ex){
			return {};
		}
	};

	jQuery.dialogReturnValue = function(returnValue){
		if(typeof returnValue != 'undefined'){
			if( returnValue == "__init__" ){
				window.returnValue = null ;
				return false;
			}
			//window.winReturnValue = returnValue ;
			window.returnValue = returnValue ;//showModelDialog
			if(window.opener){ //open
				try{
					window.opener.returnValue = returnValue ;
				}catch(ex){
				
				}
			}
			
			//dialog iframe
			//$(document.body).dialogReturnValue && $(document.body).dialogReturnValue(returnValue) ;
			//dialog iframe
			if( $(".ui-dialog-wrapper:last")[0]){
				$(".ui-dialog-wrapper:last").find("div:first").dialogReturnValue(returnValue) ;
			}
		}else{
			return window.returnValue ;
		}
	};

	window.showCenterModalDialog=function(URL,dlgWidth,dlgHeight,arg){
	    var dlgLeft = (window.screen.width-dlgWidth)/2;
	    var dlgTop  = (window.screen.height-dlgHeight)/2;
	    var widthTmp = dlgWidth ;
	    var form    = "scroll:no;status:no;dialogHeight:" + dlgHeight + "px;dialogWidth:" + widthTmp + "px;dialogLeft:" + dlgLeft + ";dialogTop:" + dlgTop;
	    return window.showModalDialog(URL,arg,form);
	};

	window.openCenterWindow=function(URL,wndWidth,wndHeight){
		var wndLeft = (window.screen.width-wndWidth)/2;
		var wndTop  = (window.screen.height-wndHeight)/2;
		var form    = "width=" + wndWidth + ",height=" + wndHeight + ",left=" + wndLeft + ",top=" + wndTop + ",resizable=yes";
		 return window.open(URL,'',form);        
	};

	/*******************************************
	 @description 转化form表单元素为JSON对象（也可以为div）
	 @example
	    var json = $(formSelector).toJson() ;
	 ******************************************/
	jQuery.fn.toJson = function(beforeExtend,afterExtend,params) {
		var me = jQuery(this) ;
		beforeExtend = beforeExtend||{} ;
		afterExtend = afterExtend||{} ;
		params = params||{} ;
		var a = {};
		
		/*var json = {};
		jQuery.map(me.find(":input").serializeArray(), function(n, i) {
			json[n['name']] = n['value'];
		});
		return json;*/
		
		//text hidden password
		me.find("input[type=text],input[type=hidden],input[type=password]").each( function(){
			_add(this.name||this.id,this.value) ;
		} ) ;
		me.find("textarea").each( function(){
			_add(this.name||this.id,this.value) ;
		} ) ;
		
		//radio
		me.find("input[type=radio]").filter(":checked").each( function(){
			if(this.value==='on'){
				_add(this.name||this.id,true) ;
			}else{
				_add(this.name||this.id,this.value) ;
			}
		} ) ;
		
		//checkbox
		var temp_cb = "" ;
		me.find("input[type=checkbox]").filter(":checked").each( function(){
			if (temp_cb.indexOf(this.name ) == -1) {
				temp_cb += (this.name) + ",";
			}
		} ) ;
		jQuery( temp_cb.split(",") ).each( function(){
			var tempValue = [] ;
			var isBoolean=false;
			jQuery("input[name='" + this + "']:checked",me).each(function(i) {
				if(this.value=="on"||this.value=="true"){
					isBoolean=true;
					return false;
				}else{
					tempValue.push( this.value ) ;
				}
			});
			if(isBoolean){
				_add(this,true);
			}else{
				_add(this ,tempValue.join(",")) ;
			}
		} ) ;
		
		//select
		me.find('select').each( function(){
			var multi = $(this).attr('multiple')  ;
			var val = [] ;
			jQuery(this).find('option:selected').each(function(){
				if(this.value)val.push( this.value ) ;
			});
			
			if( val.length == 0 ){
				val.push(this.value||"") ;
			}
			
			if(multi && params.mulSelectSplit ){
				_add(this.name||this.id,"'"+val.join("','")+"'") ;
			}else{
				_add(this.name||this.id,val.join(',')) ;
			}
		} ) ;
		
		return $.extend(beforeExtend , a , afterExtend) ;
		
		function _add(key,value){
			if(key == "__ValidatorRules") return ;
			
			if(!key || !jQuery.trim(key)) return ;
			
			value = value||'' ;
			a[key] = value ;
		}
	};


	/********************************
	 *************jQuery.utils*******
	 *********************************/
	jQuery.utils = {
		//解析URL
		parseUrl : function(url){
			url = jQuery.trim(url) ;
			if( url.startWith("~") ){
				url = url.substring(1) ;
				url = Config.contextPath+url ;
			}

			//url = url.replace("~",Config.contextPath) ;
			url = url.replace("{host}",getHost()) ;
			url = url.replace("{port}",getPort()) ;

			return url ;
			
			function getHost(){
				var host = window.location.host ;
				return host.split(":")[0] ;
			}
			
			function getPort(){
				return window.location.port ;
			}
		},
		scrollContent:function(header,content,footer){
			$(document.body).attr("scroll","no").css("overflow","hidden");
			
			var header 	= content||".header" ;
			var footbtn = footbtn||".footbtn" ;
			var content = content||".content" ;
			
			var h = header===false?0:$(header).outerHeight() ;
			var f = footer===false?0:$(footbtn).outerHeight() ;
			
			var contentHeight =  $(document.body).height() -  h - f - 5;
			
			if($.browser.msie){
				$(content).width($(document.body).width()-5) ;
			}
			
			$(content).height(contentHeight).css({'overflow-x':'hidden','overflow-y':'auto'}) ;
		},scriptPath:function(scriptName){
			if(scriptName == "plugin"||scriptName == "plugins") return jQuery.utils.parseUrl("~/statics/scripts/plugins/") ;
			if(scriptName == "upload") return jQuery.utils.parseUrl("~/statics/scripts/plugins/") ;
			if( scriptName == 'jqueryui.css' ) return  jQuery.utils.parseUrl("skins/default/jquery-ui.css") ;
			var path = "" ;
			$("script,link").each(function(){
				if(path) return ;
				var src = this.src||this.href ;
				if(src &&  src.toLowerCase().indexOf(scriptName.toLowerCase())!=-1 ){
					path = src.substring(0, src.toLowerCase().indexOf(scriptName.toLowerCase()));
					var A = path.lastIndexOf("/");
					if (A > 0)
						path = path.substring(0, A + 1);
					return ;
				}
			}) ;
			return path ;
		}
	};


	/**
	 * 统一获取数据入口
	 * 参数格式：
	 * 	1、 params
	 *       type: 'post',
	         url: 'demo-data.html' ,
	         data: req.term ,
	         async: true ,
	         dataType:'json'
	         
	         返回数据格式
	         returnCode:       --  int
	         returnDesc:        -- string
	         error:                  --  string
	         returnValue:      --  json object
	 * 
	 */
	jQuery.support.cors = true ;
	jQuery.request = function(params){
		var _url     = null ;
		var _data    = null ;
		var _success = null ;
		var _error   = null ;
		var target   = params.target||window.document.body ;

		 if( jQuery.block && !params.noblock ) jQuery(target).block() ;
		 
	 	 var dataType 	= params.dataType||'text' ;
	 	 var async 		= typeof params.async == 'undefined' ? true : params.async ;
	 	 var type 		= params.type||'post' ;
	 	 var error 		= params.error||_error|| jQuery.request.defaultErrorHandler;
	 	 var success 	= params.success||_success ;
	 	 var url 		= params.url ||_url ;
	 	 var data 		= params.data || _data ;

		 if(jQuery.utils) url = jQuery.utils.parseUrl(url) ;
		 if (url.indexOf("?") > 0) {
	        url = url + "&sb=" + Math.random();
	    } else {
	        url = url + "?sb=" + Math.random();
	    }
	 	 $.ajax({
	        type: type,
	        url: url ,
	        data: data ,
	        async: async ,
	        dataType:dataType ,
	        success: function(response){
	        	if( jQuery.unblock && !params.noblock ) jQuery(target).unblock() ;
	        	var json = response ;
	        	if(typeof(response) == 'string'){
	        		try{
	        			eval("response = "+ response ) ;
	        		}catch(e){
	        			success(response,params.custom||{}) ;
	        			return ;
	        		}
	        	}

	        	if( typeof response.returnCode != 'undefined' && response.returnCode != 200 ){
	        		error(null , response.returnCode , response.error,url) ;
	        	}else{
	        		if( !response.returnValue ||  typeof  response.returnValue == 'string')
	        			success(response.returnValue===false?false:(response.returnValue||response),params.custom||{}) ;
	        		else{
	        			if( response.returnValue.Rows ){
	        				var items = [] ;
	        				var columnNames = response.returnValue.ColumnNames ;
	        				$(response.returnValue.Rows).each(function(){
	        					var item = this ;
	        					var temp = {} ;
	        					$(item).each(function(index,record){
	        						var colName = columnNames[index] ;
	        						temp[colName] = this ;
	        					}) ;
	        					items.push(temp) ;
	        				}) ;
	        				success(items) ;
	        			}else{
	        				success( response.returnValue || response,params.custom||{}) ;
	        			}
	        		}	
	        	}
	        } ,
	        error: function(xhr, textStatus, errorThrown){
	        	;
	        	if( jQuery.unblock && !params.noblock ) jQuery(target).unblock() ;
	        	params._error && params._error(xhr, textStatus, errorThrown,url) ;
	        	//error(xhr, textStatus, errorThrown,url,dataType);
	        	var options=this;
	        	error(xhr, textStatus, errorThrown,options);
	        }
	     });
	 };
	 
	jQuery.request.defaultErrorHandler = function(xhr, textStatus, errorThrown,url,dataType){
				if(xhr.status=="404"){
					$.messageBox.error({message:"Specified url address not available:"+url});
					return;
				}
				if(dataType=="json"){
					var jsonExceptionResp=$.parseJSON(xhr.responseText);
					$.messageBox.error({
					title:jsonExceptionResp.message,
					message:"url:"+url+"<br/>"+jsonExceptionResp.stackTrace.replace(/\n/g, '<br />'),
					width:"800px"});
					return;
				}
				$.messageBox.show({message:xhr.responseText,width:"800px"});
			
				// $.open(Global.contextPath+"/common/error",570,410,errorThrown ,null , {title:"提示信息"} ) ;
	};


	/**
	 * 数据服务统一调用接口
	 * @param {} commandName
	 * @param {} params
	 * @param {} callback   {success:function(){},error:function(){}} or function(){}//success
	 */
	jQuery.dataservice = function(commandName , params , callback , reqParams ){
		callback 			= callback||{} ;
		params  			= params||{} ;

		for(var o in params){
			if( typeof params[o]  == 'object'){
				params[o] =  $.json.encode(params[o])  ;
			}
		}
		
		params.CommandName 	= commandName ;
		
		reqParams 			= reqParams||{} ;
		reqParams.data 		= params ;
		reqParams.type		= 'post' ;
		reqParams.noblock 	= reqParams.noblock === false?false:true ;
		reqParams.url 		= commandName? (window.dataServiceUrl||"~/dataservice") :reqParams.url ;
		reqParams.dataType 	= commandName?'json':"text" ;
		//alert(reqParams.url);
		//process callback
		if( callback.success ){
			reqParams.success = callback.success ;
		}
		
		if( callback.error ){
			reqParams.error = callback.error ;
		}
		
		if( jQuery.isFunction(callback) ){
			reqParams.success = callback ;
		}
		jQuery.request(reqParams) ;
	};


	/*********************
	 * common 
	 * */
	String.prototype.startWith=function(str){     
	      var reg=new RegExp("^"+str);     
	      return reg.test(this);        
	} ; 
	String.prototype.endWith=function(str){     
	      var reg=new RegExp(str+"$");     
	      return reg.test(this);        
	} ;
	String.prototype.getQueryString = function(name){ //name 是URL的参数名字 
		var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)"), r; 
		if (r=this.match(reg)) return (unescape(r[2])||"").split("#")[0]; return null; 
	}; 

	/* fix 表单点击回车提交问题 */
	$(function(){
	   $(document).find("form").keydown(function(e){
		  var kc = e.keyCode ;
		  if(kc == 13){
			 var $tgt = $(e.target);
			 
			 if (!$tgt.is('input'))return true ;
				 
		 		 if (e && e.preventDefault) {
		 			e.preventDefault();
		 		 } else {
					window.event.returnValue = false;
				 }
				 return false;
			  }
			  return true ;
	      }) ;
	  }) ;
	  

	 
	/* widget-common */

	/**
	 * 控件初始化
	 */
	$.uiwidget = {
		mark:"data-widget",
		options:"data-options",
		validator:"data-validator",
		defaultValue:"defaultValue",
		map:{},
		dependMap:{},
		/**
		 * eg: $.widget.register("combotree",function(){})
		 */
		register:function(){//type ,depend , func
			var type = arguments[0] ;
			var func = null ;
			var depend = null ;
			if( arguments.length == 2 ){
				func = arguments[1] ;
			}else if( arguments.length == 3 ){
				func = arguments[2] ;
				depend = arguments[1] ;
			}
			
			$.uiwidget.map[type] = func ;
			$.uiwidget.dependMap[type] = depend ;
		},
		init:function(options,target){
			var widgetTrack = [] ;
			var pushed = {};
			//format dependMap
			for(var o in $.uiwidget.map){
				_addTypeTrack(o) ;
			}
			
			options = options||{} ;
			options.before && options.before(target) ;
			var cacheType = {} ;
			
			$(widgetTrack).each(function(index,type){
				var bindKey=type+"Binded";//data key to indicate dom aleady a widget of 'type'
				if( $.uiwidget.map[type] ){
					var selectorString="["+$.uiwidget.mark+"='"+type+"'],"+"["+$.uiwidget.mark+"^='"+type+",'],"+"["+$.uiwidget.mark+"*=',"+type+",']"+",["+$.uiwidget.mark+"$=',"+type+"']";
					var selector = $(selectorString,target);
					selector.each(function(i,s){
						var $s=$(s);
						if(!$s.data(bindKey)){
							$.uiwidget.map[type]($s,target)  ;
							$(s).data("widgetOverTag",true);
							$(s).data(bindKey,true);
							$(s).trigger("widgetOver");
						}
					});
				}
			});

			options.after && options.after(target) ;
			
			function _addTypeTrack(o){
				var depend = $.uiwidget.dependMap[o] ;
				if( depend ){//存在依赖
					$(depend).each(function(index,type){
						_addTypeTrack(type) ;
					}) ;
				}
				(!pushed[o]) && widgetTrack.push(o) ;
				pushed[o] = true ;
			}
			
			pushed = null ;
			widgetTrack = null ;
			
		}
	};

	$.fn.uiwidget = function(options){
		options=options||{};
		$.uiwidget.init(options,this) ;
		$("[data-expression]",$(this)).each(function(){
			$(this).caculate();
		});
	};

	/**
	 * 浏览器兼容
	 */
	window.browserFix_map = {} ;
	$.browserFix = function(el){
		if ($.browser.msie){
			var bowser = "ie" ;
			var version = parseInt($.browser.version, 10) ;
			for(var type in browserFix_map[bowser+"_"+version]||{} ){
				(browserFix_map[bowser+"_"+version]||{})[type]( el ) ;
			}
		}
	};

	/**
	 * eg: $.browserFix.register("ie","6","base",function( target ){} ) ;
	 * 
	 */
	$.browserFix.register = function(bowser, version,type,func ){
		if( typeof version == "string" ){
			browserFix_map[bowser+"_"+version] = browserFix_map[bowser+"_"+version]||{} ;
			browserFix_map[bowser+"_"+version][type] = func ;
		}else{
			$(version).each(function(index,item){
				browserFix_map[bowser+"_"+item] = browserFix_map[bowser+"_"+item]||{} ;
				browserFix_map[bowser+"_"+item][type] = func ;
			}) ;
		}
	}

	$.fn.browserFix = function(){
		var me = this ;
		setTimeout(function(){
			$.browserFix(me) ;
		},1) ;
	};

	$.pageLoad = {before:[],after:[]} ;
	$.pageLoad.register = function(type , func){
		$.pageLoad[type].push(func) ;
	} ;

	$(function(){
		$( $.pageLoad.before ).each(function(index,func){
			func() ;
		}) ;
		
		//控件初始化
		$(document.body).uiwidget() ;
		//浏览器兼容
		$(document.body).browserFix() ;
		
		$( $.pageLoad.after ).each(function(index,func){
			func() ;
		}) ;
	});


	//register dialog
	$.uiwidget.register("dialog",function(selector){
		selector.live("click",function(){
			var options = $(this).attr( $.uiwidget.options )||"{}";
			eval(" var jsonOptions = "+options) ;
			var url 	= jsonOptions.url||$(this).attr("href") ;
			var width 	= jsonOptions.width ;
			var height 	= jsonOptions.height ;
			
			var fixOPtions = {} ;
			if($(this)[0].tagName == "A"){
				fixOPtions.requestType = "GET" ;
			}
			fixOPtions.target = this ;

			var id     = $(this).attr("id")||$(this).attr("name");
			var callback = jsonOptions.callback||(window[id+"Callback"]||function(){}) ;
			
			$.open(url , width , height ,jsonOptions,callback,fixOPtions ) ;
			return false ;
		}) ;
	}) ;
	//register btn-toggle
	$.uiwidget.register("btn-toggle",function(selector){
		selector.live("click",function(){
			var options = $(this).attr( $.uiwidget.options )||"{}";
		    eval(" var jsonOptions = "+options);
			var target = jsonOptions.rel;
			
			if( $(this).find('.icon-plus').hasClass('icon-minus')){
				$(target ).hide();	
				$(this).find('.icon-plus').removeClass('icon-minus');
			}else if($(this).find('.icon-plus').length){
				$( target ).show();
			    $(this).find('.icon-plus').addClass('icon-minus');
			}
			
			if( $(this).find('.icon-plus2').hasClass('icon-minus2')){
				$(target ).hide();		
				$(this).find('.icon-plus2').removeClass('icon-minus2');
			}else if($(this).find('.icon-plus2').length){
				$( target ).show();
			    $(this).find('.icon-plus2').addClass('icon-minus2');
			}
			return false ;
		}) ;
		//init
		selector.each(function(){
			var options = $(this).attr( $.uiwidget.options )||"{}";
		    eval(" var jsonOptions = "+options);
			var target = jsonOptions.rel;
			
			if( $(this).find('.icon-plus').hasClass('icon-minus')){
				$(target ).show();
			}else{
				$( target ).hide();
			}
			if( $(this).find('.icon-plus2').hasClass('icon-minus2')){
				$(target ).show();
			}else{
				$( target ).hide();
			}
		}) ;
	}) ;
	//register ajaxForm

	/**
	 * data-widget="ajaxlink" data-options="{action:'',before:function(req){return true;},success:function(resp){}}"
	 */
	$.uiwidget.register("ajaxlink",function(selector){
		selector.live("click",function(){
			var options = $(this).attr( $.uiwidget.options )||"{}";
			eval(" var jsonOptions = "+options) ;
			
			var action = jsonOptions.action||$(this).attr("href") ;
			var type   = jsonOptions.type||"GET" ;
			
			jsonOptions.before = jsonOptions.before||function(){return true ;} ;
			jsonOptions.success = jsonOptions.success||function(){return true ;} ;
			var data = {} ;
			if( jsonOptions.before( data ) ){//doSubmit
	        	$.request({
	        		type:type ,
	        		url:action ,
	        		data:data,
	        		success: jsonOptions.success
	        	}) ;
	        }
			
			return false ;
		}) ;
	}) ;

	jQuery(function($){
		bui.panel();
		//bui.toggle();
	})

	window.bui = {
		panel : function(){
			/**
			 * Slide toggle for panel down
			 * */
			 $('.panel-head .tabs').parent().find('.toggle').remove(); 
			 $('.panel-head .toggle').each(function(){
			 	$(this).click(function(){
					 $(this).toggleClass('toggle-hide').parents(".panel:first").find('.panel-content').slideToggle(300);
					 return false; 
				 });
			 }) ;
			/**
			 * Slide toggle for panel left
			 * */
			var panelNextClass;
			 $('.panel-head .toggle-left').toggle(function(){
				var $parentSpan = $(this).parent().parent().parent(),
					$panel = $(this).parents('.panel'),
					$panelNextClass = $parentSpan.next().attr('class');
					panelNextClass = $panelNextClass;
					
					$(this).addClass('toggle-hide');
					$parentSpan.addClass('span1')
							.next().removeClass()
								.addClass('span11');
					$panel.addClass('panel-collapsed').find('.panel-content').hide();
					return false; 
			 },function(){
				var $parentSpan = $(this).parent().parent().parent(), 
					$panel = $(this).parents('.panel');				
					
					$(this).removeClass('toggle-hide')
					$parentSpan.removeClass('span1')
							.next().removeClass()
								.addClass(panelNextClass);
								
					$panel.removeClass('panel-collapsed').find('.panel-content').show();
					return false; 
			 });
			 /**
			 * Slide toggle for panel right
			 * */
			var panelNextClass;
			 $('.panel-head .toggle-right').toggle(function(){
				var $parentSpan = $(this).parent().parent().parent(),
					$panel = $(this).parents('.panel'),
					$panelNextClass = $parentSpan.prev().attr('class');
					panelNextClass = $panelNextClass;
					
					$(this).addClass('toggle-hide');
					$parentSpan.addClass('span1')
							.prev().removeClass()
								.addClass('span11');
					$panel.addClass('panel-collapsed').find('.panel-content').hide();
					return false; 
			 },function(){
				var $parentSpan = $(this).parent().parent().parent(), 
					$panel = $(this).parents('.panel');				
					
					$(this).removeClass('toggle-hide')
					$parentSpan.removeClass('span1')
							.prev().removeClass()
								.addClass(panelNextClass);
								
					$panel.removeClass('panel-collapsed').find('.panel-content').show();
					return false; 
			 });
		}
	};

	/*IE6下浏览器执行resize时死掉问题*/
	$.execResize = function(flag , func ){//执行resize
		var version = parseInt( $.browser.version, 10 );  
		if(version < 7 ){
			window[flag] = window[flag]||0 ;
	        var now = new Date().getTime();
			if (now - window[flag] > 300) { 
				window[flag] = now;  
				func() ;
			}
		}else{
			func() ;
		}
	};
}(jQuery));
