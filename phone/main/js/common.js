/**
* common.js
* 2013.05.17
* kongge@office.weiphone.com
*/

//ds.base
;(function(global, document, undefined){
	var 
	ds = global.ds = {
		noop: function(){},
		//Object
		mix: function(target, source, cover){
			if(typeof source !== 'object'){
				cover = source;
				source = target;
				target = this;
			}
			for(var k in source){
				if(cover || target[k] === undefined){
					target[k] = source[k];
				}
			}
			return target;
		},
		//String
		trim: function(str){
			return String(str).replace(/^\s*/, '').replace(/\s*$/, '');
		},
		//BOM
		scrollTo: (function(){
			var 
			duration = 480,
			view = $(global),
			setTop = function(top){ global.scrollTo(0, top);},
			fxEase = function(t){return (t*=2)<1?.5*t*t:.5*(1-(--t)*(t-2));};
			return function(top, callback){
				top = Math.max(0, ~~top);
				var 
				tMark = new Date(),
				currTop = view.scrollTop(),
				height = top - currTop,
				fx = function(){
					var tMap = new Date() - tMark;
					if(tMap >= duration){
						setTop(top);
						return (callback || ds.noop).call(ds, top);
					}
					setTop(currTop + height * fxEase(tMap/duration));
					setTimeout(fx, 16);
				};
				fx();
			};
		})(),
		//DOM
		requestAnimationFrame: (function(){
			var handler = global.requestAnimationFrame || global.webkitRequestAnimationFrame || 
				global.mozRequestAnimationFrame || global.msRequestAnimationFrame || 
				global.oRequestAnimationFrame || function(callback){
					return global.setTimeout(callback, 1000 / 60);
				};
			return function(callback){
				return handler(callback);
			};
		})(),
		animate: (function(){
			var 
			easeOut = function(pos){ return (Math.pow((pos - 1), 3) + 1);};
			getCurrCSS = global.getComputedStyle ? function(elem, name){
				return global.getComputedStyle(elem, null)[name];
			} : function(elem, name){
				return elem.currentStyle[name];
			};
			return function(elem, name, to, duration, callback, easing){
				var 
				from = parseFloat(getCurrCSS(elem, name)) || 0,
				style = elem.style,
				tMark = new Date(),
				size = 0;
				function fx(){
					var elapsed = +new Date() - tMark;
					if(elapsed >= duration){
						style[name] = to + 'px';
						return (callback || ds.noop).call(elem);
					}
					style[name] = (from + size * easing(elapsed/duration)) + 'px';
					ds.requestAnimationFrame(fx);
				};
				to = parseFloat(to) || 0;
				duration = ~~duration || 200;
				easing = easing || easeOut;
				size = to - from;
				fx();
				return this;
			};
		})(),
		//Cookies
		getCookie: function(name){
			var ret = new RegExp('(?:^|[^;])' + name + '=([^;]+)').exec(document.cookie);
			return ret ? decodeURIComponent(ret[1]) : '';
		},
		setCookie: function(name, value, expir){
			var cookie = name + '=' + encodeURIComponent(value);
			if(expir !== void 0){
				var now = new Date();
				now.setDate(now.getDate() + ~~expir);
				cookie += '; expires=' + now.toGMTString();
			}
			document.cookie = cookie;
		},
		//Hacker
		isIE6: !-[1,] && !global.XMLHttpRequest
	};
	//CSS3 Hacker
	ds.mix((function(){
		var 
		j, name,
		hack = {},
		props = ['transform', 'transition'],
		prefixs = ['o', 'ms', 'moz', 'webkit', ''],
		docStyle = (document.documentElement || document.body).style;
		for(var i=props.length-1; i>=0; i--){
			for(j=prefixs.length-1; j>=0; j--){
				name = prefixs[j] + (prefixs[j] ? props[i].slice(0, 1).toUpperCase()+props[i].slice(1) : props[i]);
				if((name in docStyle)){
					hack[props[i] + 'Support'] = {
						prefix: prefixs[j],
						propName: name
					};
					break;
				}
			}
		}
		return hack;
	})());
})(this, document);

//CSS3 Support
(function(){
	var 
	root = document.documentElement,
	className = root.className,
	classList = [];
	if(className){
		classList.push(className);
	}
	if(ds.transitionSupport){
		classList.push('transition');
	}
	if(ds.transformSupport){
		classList.push('transform');
	}
	root.className = classList.join(' ');
})();

//globar_topbar
jQuery(function($){
	var 
	linkTimer,
	linkPanel = $('#globar_topbar_links'),
	linkFocusStyle = linkPanel.find('.focus').prop('style');
	if(linkFocusStyle){
		linkPanel.delegate('li a', 'mouseenter', function(){
			var self = $(this);
			clearTimeout(linkTimer);
			
			linkFocusStyle.left = self.position().left + 'px';
			linkFocusStyle.width = self.innerWidth() + 'px';
		})
		.bind('mouseleave', function(){
			clearTimeout(linkTimer);
			linkTimer = setTimeout(function(){
				linkFocusStyle.left = '';
			}, 240);
		});
	}
});

/**
* ds.buildSlider
*/
;(function(global, document, $){
	var sliderList = [];
	//buildSlider
	ds.buildSlider = function(shell, ops, buildHandler){
		if(!(shell = $(shell)).length){ return; }

		ops = ops || {};
		var 
		triggers = shell.find('.triggers a'),
		_ops = {
			duration: 400,
			unitSize: 880,
			imgLoadFlag: null,
			imgLoadHandler: ds.noop,
			onplay: function(inx, prevInx){
				if(ops.imgLoadFlag && !ops.imgLoadFlag[inx]){
					ops.imgLoadHandler.call(this, inx, prevInx);
					ops.imgLoadFlag[inx] = true;
				}

				prevInx > -1 && triggers.eq(prevInx).removeClass('current');
				triggers.eq(inx).addClass('current');
			}
		};
		for(var k in _ops){
			if(typeof ops[k] === 'undefined'){
				ops[k] = _ops[k];
			}
		}
		if(!ops.shell){
			ops.shell = shell.find('ul').eq(0);
			if(typeof ops.length !== 'number'){
				ops.length = ops.shell.find('li').length;
			}
		}

		var timer, slider = new (buildHandler || Slider)(ops);
		shell.delegate('a.prev,a.next', 'click', function(e){
			e.preventDefault();

			clearTimeout(timer);
			slider[this.className.indexOf('next')>-1 ? 'next' : 'prev']();
		})
		.hover(function(){
			slider.mouseEnter = true;
			slider.stopAuto();
		}, function(){
			slider.mouseEnter = false;
			slider.autoPlay();
		});
		triggers.bind('click', function(e){
			e.preventDefault();
		})
		.hover(function(){
			clearTimeout(timer);
			var self = this;
			timer = setTimeout(function(){
				slider.play(triggers.index(self));
			}, 160);
		}, function(){
			clearTimeout(timer);
		});

		sliderList.push(slider);
		slider.shellWrap = shell;
		
		//Fix IE6 hover
		if(ds.isIE6){
			var prevAndNext = shell.find('a.prev,a.next');
			shell.hover(function(){
				prevAndNext.show();
			}, function(){
				prevAndNext.hide();
			});
		}
		return slider;
	};

	//scroll
	var 
	scrollTimer,
	view = $(global),
	checkScroll = function(){
		var 
		viewHeight = view.height(),
		scrollTop = view.scrollTop();
		//checkSlider in viewport
		$.each(sliderList, function(){
			var 
			offsetTop = this.shellWrap.offset().top,
			height = this.shellWrap.height();
			if( !this.mouseEnter && ( (offsetTop >= scrollTop && offsetTop <= scrollTop+viewHeight)
				|| (offsetTop+height >= scrollTop && offsetTop+height <= scrollTop+viewHeight) )
			){
				this.autoPlay();
			}
			else{
				this.stopAuto();
			}
		});
	},
	scrollHandler = function(){
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(checkScroll, 128);
	};
	view.bind('scroll resize', scrollHandler);
	scrollHandler();
})(window, document, jQuery);

/**
* ds.initAptUpload
*/
;(function(global, document, $){
	var inited, baseUrl = (global.STATIC_URL || './') + 'js/';
	
	var 
	dialog, uploadBar, currFile, uploadOptions, uploadShell, uploadWidget, appletUploadShell, appletUploadWidget, preAddedFile,
	loadingText = '玩命加载中，请稍候...', loadingHTML = '<div class="loading"><span><i></i>'+ loadingText +'</span></div>';

	function showDialog(){
		if(!dialog){
			dialog = ds.aptUploadDialog = ds.dialog({
				title: '上传到“我的源”',
				className: 'cydia_dialog upload_dialog',
				content: '<div class="upload_inner"><div class="upload_panel">'+ loadingHTML +'</div></div>',
				onhide: function(){
					if(currFile){
						uploadBar.show();
					}
					this.blur().unlock();
					this.lastPosition = this.position();
					this.shell.css('left', -9999);
					return false;
				}
			});
			uploadShell = dialog.contentShell.find('.upload_panel');
			
			initUploader();
		}

		dialog.show();
		if(dialog.lastPosition){
			dialog.shell.css('left', dialog.lastPosition.left);
			dialog.lock().focus();
		}
	}

	function getUploadBar(){
		if(!uploadBar){
			uploadBar = document.createElement('div');
			uploadBar.className = 'upload_bar';
			uploadBar.innerHTML = '<div class="ds_uploader"><div class="ds_uploader_list"><ul></ul></div></div>';
			uploadBar = $(uploadBar).hide().appendTo('body');
			
			uploadBar.panel = uploadBar.find('ul');
			uploadBar.bind('click', function(){
				uploadBar.hide();
				showDialog();
			})
			.delegate('a.abort', 'click', function(e){
				e.stopPropagation();
				e.preventDefault();
				
				ds.aptUploader.abort(currFile);
			});
		}
		return uploadBar;
	}

	function buildUploadWidget(ops){
		var widget = new ds.UploadWidget($.extend({
			loadingText: loadingText,
			swfOptions: {
				url: baseUrl + 'uploader/swfuploader.swf'
			}
		}, ops));

		var uploader = widget.uploader;

		function updateUploadBar(){
			return getUploadBar().panel.html(ds.aptUploader.filePanel.html());
		}

		//Events
		uploader.addListener('ready', function(){
			var 
			isApplet = this !== uploadWidget.uploader,
			btnText = isApplet ? '点击切换到普通上传' : '点击切换到大文件上传';
			this.form.append('<div class="ds_uploader_drager"><span class="pipe" style="color:red;margin-top:20px;font-size:16px">严禁上传违法资源(例:红包,赌博辅助软件),一经发现,永久封禁</span></div><div class="upload_toggle"><a href="javascript:;" class="btn">'+ btnText +'</a></div>');
			this.form.delegate('.upload_toggle a', 'click', function(e){
				e.preventDefault();
				
				if(!ds.aptUploader.disabled){
					isApplet ? initUploader() : initAppletUploader();
				}
			});

			this.shell.addClass('upload_ready');
			dialog.position('50%', '38.2%');
			
			if(preAddedFile){
				this.add(preAddedFile);
			}
		})
		.addListener('add', function(e){
			currFile = e.file;
			updateUploadBar();
		})
		.addListener('progress', updateUploadBar)
		.addListener('upload', updateUploadBar)
		.addListener('error', updateUploadBar)
		.addListener('abort', function(e){
			getUploadBar().hide();
			this.remove(e.file);

			currFile = null;
			preAddedFile = null;
		});

		return widget;
	}
	
	function initUploader(){
		if(uploadWidget){
			if(appletUploadShell){
				appletUploadShell.hide();
			}
			ds.aptUploader = uploadWidget.uploader;
			return uploadShell.show();
		}

		$.getScript(baseUrl + 'uploader/jquery.uploader.js', function(){
			uploadWidget = buildUploadWidget($.extend(uploadOptions, {
				shell: uploadShell,
				oninit: function(){
					this.shell = uploadShell;
					this.shell.find('.ds_uploader_loading, .ds_uploader_note:eq(0)').addClass('loading');
				}
			}));
			ds.aptUploader = uploadWidget.uploader;
		});
	}
	
	function initAppletUploader(){
		uploadShell.hide();
		if(appletUploadShell){
			ds.aptUploader = appletUploadWidget.uploader;
			return appletUploadShell.show();
		}

		appletUploadShell = $(document.createElement('div'));
		appletUploadShell.addClass('upload_panel').html(loadingHTML);
		uploadShell.after(appletUploadShell);

		$.getScript(baseUrl + 'uploader/jquery.uploader.applet.js', function(){
			appletUploadWidget = buildUploadWidget($.extend(uploadOptions, {
				shell: appletUploadShell,
				typeOrder: ['applet'],
				oninit: function(){
					this.shell = appletUploadShell.addClass('applet_uploader');
					this.shell.find('.ds_uploader_loading, .ds_uploader_note:eq(0)').addClass('loading');

					this.addListener('error', function(e, ex){
						if(ex && ex.type === 'support'){
							var 
							errPanel = this.shell.find('.ds_uploader_note').eq(0),
							appletUrl = 'http://www.java.com/zh_CN/download/manual.jsp',
							noAppletHTML = '<div class="upload_noapplet"><a href="'+ appletUrl +'" target="_blank" class="link"><span>下载Java</span></a><div class="note"><span>未安装Java虚拟机或控件加载失败<a href="'+ appletUrl +'" target="_blank">下载</a><a href="javascript:;" class="reload">重新加载</a></span></div><div class="tips">使用Java虚拟机上传，支持Windows，MAC，Linux操作系统，支持绝大部分浏览器</div><div class="upload_toggle"><a href="javascript:;" class="btn">点击切换到普通上传</a></div></div>';

							errPanel.hide().after(noAppletHTML);
							this.shell.delegate('.upload_noapplet a.reload', 'click', function(e){
								e.preventDefault();

								location.reload();
							})
							.delegate('.upload_toggle a', 'click', function(e){
								e.preventDefault();
								
								initUploader();
								ds.aptUploader.form.find('.upload_toggle').hide();
							});
						}
					});
				}
			}, uploadOptions && uploadOptions.appletOptions ? {
				maxFileSize: uploadOptions.appletOptions.maxFileSize
			} : void 0));
			ds.aptUploader = appletUploadWidget.uploader;
		});
	}
	
	function checkFileExt(fileName, exts){
		var 
		extName = fileName.slice(fileName.lastIndexOf('.')+1),
		allowExts = exts.replace(/[\.\*]/g, '').replace(/,/g, '|'),
		rallowExts = allowExts !== '' ? new RegExp('^(?:'+ allowExts +')$', 'i') : '';
		if(allowExts !== '' && !rallowExts.test(extName)){
			return false;
		}
		return true;
	}
	
	var maskElem;
	function showUploadMask(){
		if(!maskElem){
			maskElem = document.createElement('div');
			maskElem.className = 'global_upload_mask';
			document.body.appendChild(maskElem);
		}
		maskElem.style.display = 'block';
	}
	function hideUploadMask(){
		if(maskElem){
			maskElem.style.display = 'none';
		}
	}
	function stopEvent(e){
		if(!!e){
			e.preventDefault();
			e.stopPropagation();
		}
	}

	ds.initAptUpload = function(ops){
		if(inited){ return; }
		uploadOptions = ops;
		inited = true;
		
		ds.mix({
			showAptUploader: showDialog
		});
		
		var 
		ajaxUpload = global.XMLHttpRequest && new XMLHttpRequest().upload, //XHR Level 2
		formData = global.FormData,
		doc = $(document);
		if(ajaxUpload && formData){
			//Drop File
			var hasDropFile;
			doc.bind('dragover.ds_uploader', function(e){
				showUploadMask();
				stopEvent(e);
			})
			.bind('dragleave.ds_uploader', function(e){
				hideUploadMask();
				stopEvent(e);
			})
			.bind('drop.ds_uploader', function(e){
				hideUploadMask();
				stopEvent(e);

				e = e.originalEvent;
				var files = e.dataTransfer.files;
				if(preAddedFile || files.length <= 0){
					preAddedFile && ds.dialog.alert('已有文件上传中，请等待上传完成！');
					return;
				}

				if(checkFileExt(files[0].name, ops ? ops.allowExts||'' : '')){
					preAddedFile = files[0];

					ds.showAptUploader();
					if(ds.aptUploader){
						if(ds.aptUploader.type !== 'ajax'){
							return ds.dialog.alert('当前上传方式不支持拖拽上传！');
						}

						ds.aptUploader.add(files[0]);
						preAddedFile = null;
					}
				}
				else{
					ds.dialog.alert('请选择正确的文件格式上传！');
				}
			});
		}
	};
})(window, document, jQuery);


/**
* ds.tmpl.js
* create: 2013.01.10
* update: 2013.09.26
* admin@laoshu133.com
**/
;(function(global){var ds=global.ds||(global.ds={});var rarg1=/\$1/g,rgquote=/\\"/g,rbr=/([\r\n])/g,rchars=/(["\\])/g,rdbgstrich=/\\\\/g,rfuns=/<%\s*(\w+|.)([\s\S]*?)\s*%>/g,rbrhash={'10':'n','13':'r'},helpers={'=':{render:'__.push($1);'}};ds.tmpl=function(tmpl,data){var render=new Function('_data','var __=[];__.data=_data;'+'with(_data){__.push("'+tmpl.replace(rchars,'\\$1').replace(rfuns,function(a,key,body){body=body.replace(rbr,';').replace(rgquote,'"').replace(rdbgstrich,'\\');var helper=helpers[key],tmp=!helper?key+body:typeof helper.render==='function'?helper.render.call(ds,body,data):helper.render.replace(rarg1,body);return'");'+tmp+'__.push("';}).replace(rbr,function(a,b){return'\\'+(rbrhash[b.charCodeAt(0)]||b);})+'");}return __.join("");');return data?render.call(data,data):render;};ds.tmpl.helper=helpers;})(this);

/**
* jquery.tabs.base.js
* create: 2011.12.13
* update: 2013.12.16
* admin@laoshu133.com
*/
;(function(global,document,$){var noop=function(){},fakePanel=$(),_ops={index:0,delay:160,shellTag:'a',preventDefault:true,event:'mouseenter',focusClass:'current',onbeforeselect:noop,onselect:noop};$.fn.tabs=function(ops){ops=ops||{};for(var k in _ops){if(typeof ops[k]==='undefined'){ops[k]=_ops[k];}}var timer,prevTrigger,self=this;function getPanel(trigger){var id=trigger.data('targetId');if(!id){id=trigger.attr('href');id=id.slice(id.lastIndexOf('#')+1);trigger.data('targetId',id);}return id?$('#'+id):fakePanel;}function selectHandler(trigger){if(!prevTrigger||trigger[0]!==prevTrigger[0]){var panel=trigger.data('@panel'),prevPanel=prevTrigger?prevTrigger.data('@panel'):null;if(!panel){panel=getPanel(trigger);trigger.data('@panel',panel);}if(ops.onbeforeselect.call(self,panel,trigger,prevPanel,prevTrigger)!==false){if(prevTrigger){prevTrigger.removeClass(ops.focusClass);prevPanel.hide();}panel.show();trigger.addClass(ops.focusClass);ops.onselect.call(self,panel,trigger,prevPanel,prevTrigger);prevTrigger=trigger;}}};if(ops.preventDefault){this.delegate(ops.shellTag,'click.tabs',function(e){e.preventDefault();});}this.delegate(ops.shellTag,ops.event+'.tabs',function(){var trigger=$(this);if(ops.event!=='mouseenter'||ops.delay<=0){selectHandler(trigger);}else{clearTimeout(timer);timer=setTimeout(function(){selectHandler(trigger);},ops.delay);trigger.one('mouseleave.tabs',function(){clearTimeout(timer);});}});var defaultTrigger=this.find(ops.shellTag+'.'+ops.focusClass);this.find(ops.shellTag).each(function(i){var panel,trigger=$(this);if(!defaultTrigger[0]&&(i===0||i===ops.index)){defaultTrigger=trigger;}if(!defaultTrigger[0]||defaultTrigger[0]!==trigger[0]){trigger.removeClass(ops.focusClass);panel=getPanel(trigger).hide();}});!!defaultTrigger.length&&selectHandler(defaultTrigger);return this;};})(this,this.document,jQuery);

/**
* jquery.slider.base.js
* create: 2011.12.13
* update: 2012.03.28
* admin@laoshu133.com
*/
;(function(global,document,$,undefined){var noop=function(){},slider=global.Slider=function(ops){this.init(ops||{});};slider.prototype={constructor:slider,_ops:{length:3,shell:null,auto:true,cName:'left',duration:200,unitSize:500,delay:5000,easing:'swing',onbeforeplay:noop,onplay:noop},init:function(ops){var self=this,_ops=this._ops;for(var k in _ops){if(typeof ops[k]==='undefined'){ops[k]=_ops[k];}}this.shell=$(ops.shell);this.ops=ops;this.index=-1;this.play(0);if(ops.auto){this.shell.bind('mouseenter.slider',function(){self.stopAuto();}).bind('mouseleave.slider',function(){self.autoPlay();});}},play:function(inx){var self=this,ops=this.ops;inx=~~(inx===void 0?this.index+1:inx)%ops.length;inx=inx<0?ops.length+inx:inx;if(inx===this.index||ops.onbeforeplay.call(this,inx,this.index)===false){return this;}var aniOps={};aniOps[ops.cName]=-inx*ops.unitSize;this.shell.stop().animate(aniOps,ops.duration,ops.easing,function(){ops.onplay.call(self,inx,self.index);self.index=inx;if(ops.auto){self.autoPlay();}});clearTimeout(this.timer);return this;},next:function(){return this.play();},prev:function(){return this.play(this.index-1);},autoPlay:function(){var self=this;this.ops.auto=true;clearTimeout(this.timer);this.timer=setTimeout(function(){self.play();},this.ops.delay);},stopAuto:function(){clearTimeout(this.timer);this.ops.auto=false;}};})(window,document,jQuery);

/**
* jquery.mask.js
* create: 2012.12.04
* update: 2012.12.13
* admin@laoshu133.com
*/
;(function(global,document,$,undefined){var DOC=$(document),_noop=function(){},ds=global.ds||(global.ds={});var _uuid=0,_ops={id:null,anim:true,animDuration:320,zIndex:999,opacity:0.8,background:'#000',onshow:_noop,onhide:_noop,onclick:_noop},Mask=ds.Mask=function(ops){return this.init(ops);};Mask._cache={};Mask.prototype={constructor:Mask,init:function(ops){this.ops=ops=ops||{};$.each(_ops,function(k,val){typeof ops[k]==='undefined'&&(ops[k]=val);});var id=ops.id;if(typeof id!=='string'){id='ds_mask_'+(++_uuid);}this.id=id;if(Mask._cache[id]){var _mask=Mask._cache[id];_mask.ops=ops;return _mask;}Mask._cache[id]=this;return this;},_getElem:function(){var elem=this.elem,self=this;if(!elem){var ops=this.ops,css='border:0;margin:0;padding:0;height:100%;width:100%;left:0;top:0;opacity:0;';elem=this.elem=$(document.createElement('div'));elem.bind('click.jquery_mask',function(){self.ops.onclick.call(self);});elem[0].style.cssText=css+'display:none;position:fixed;background:'+ops.background+';z-index:'+ops.zIndex;if(!Mask.fixedPositionSupport()){elem[0].style.position='absolute';css+='position:absolute;filter:Alpha(opacity=0);';elem[0].innerHTML='<iframe src="javascript:false" frameborder="0" height="100%" width="100%" style="'+css+'z-index:1;"></iframe><div style="'+css+'background:#fff;z-index:9;"></div>';}elem[0].id=this.id;elem.appendTo('body');}return elem;},show:function(opacity){var self=this,ops=this.ops,elem=this._getElem();opacity=typeof opacity==='number'?opacity:ops.opacity;if(!Mask.fixedPositionSupport()){elem.css('height',DOC.height());}this.elem.css('background',ops.background).show();if(ops.anim){elem.stop().animate({opacity:opacity},ops.animDuration,function(){ops.onshow.call(self,opacity);});}else{elem.stop().css('opacity',opacity);ops.onshow.call(this,opacity);}return this;},hide:function(){var self=this,ops=this.ops,elem=this._getElem();if(ops.onhide.call(this)!==false){if(ops.anim){elem.stop().animate({opacity:0},ops.animDuration,function(){this.style.display='none';});}else{elem[0].style.display='none';}}return this;},destory:function(){if(this.elem){this.elem.remove();this.elem=null;}delete Mask._cache[this.id];}};Mask.fixedPositionSupport=function(){if(typeof $.support.fixedPosition==='boolean'){return $.support.fixedPosition;}var div,ret=false,body=document.body,css='border:0;margin:0;padding:0;position:fixed;left:0;top:20px;';if(body){div=document.createElement('div');div.style.cssText=css+'position:absolute;top:0;';div.innerHTML='<div style="'+css+'"></div>';body.insertBefore(div,body.firstChild);ret=$.support.fixedPosition=div.firstChild.offsetTop===20;body.removeChild(div);}return ret;};ds.mask=$.mask=function(opacity,background){var ops=typeof opacity==='object'?opacity:{opacity:opacity,background:background};ops.id='ds_global_mask';return new Mask(ops).show();};})(this,this.document,jQuery);

/**
* ds.dialog.js
* create: 2012.12.05
* update: 2012.12.14
* admin@laoshu133.com
*/
;(function(global,document,$,undefined){var view=$(global),DOC=$(document),ds=global.ds||(global.ds={});var _guid=0,_noop=function(){},_tmpl='<div class="ds_dialog_outer"><table class="ds_dialog_border"><tr><td class="ds_dialog_tl"></td><td class="ds_dialog_tc"></td><td class="ds_dialog_tr"></td></tr><tr><td class="ds_dialog_ml"></td><td class="ds_dialog_mc"><div class="ds_dialog_inner"><table class="ds_dialog_panel"><tr><td colspan="2" class="ds_dialog_header"><div class="ds_dialog_title"><h3></h3></div><div class="ds_dialog_close"><a href="javascript:;">\u00d7</a></div></td></tr><tr><td class="ds_dialog_icon" style="display:none"><div class="ds_dialog_icon_bg"></div></td><td class="ds_dialog_main"><div id="{id}_content" class="ds_dialog_content"></div></td></tr><tr><td colspan="2" class="ds_dialog_footer"><div class="ds_dialog_buttons"></div></td></tr></table></div></td><td class="ds_dialog_mr"></td></tr><tr><td class="ds_dialog_bl"></td><td class="ds_dialog_bc"></td><td class="ds_dialog_br"></td></tr></table></div>',_ops={id:null,title:null,content:'',className:null,padding:'20px 25px',height:'auto',width:'auto',left:'50%',top:'40%',zIndex:1990,icon:null,iconBasePath:global.iconBasePath||'images/',buttons:null,follow:null,followOffset:null,autoOpen:true,esc:true,lock:true,lockOpacity:0.6,lockColor:'#000',showCloseButton:true,drag:true,fixed:true,anim:true,animDuration:320,timeout:0,oninit:_noop,onopen:_noop,onfocus:_noop,onmaskclick:_noop,onhide:_noop,onclose:_noop,yesText:'确定',noText:'取消',onyes:null,onno:null},Dialog=ds.Dialog=function(ops){return this.init(ops||{});};$.extend(Dialog,{items:{},defaults:_ops,currIndex:1990,defaultTmpl:_tmpl,activeDialog:null,dialogQueue:[],addDialog:function(dialog){var queue=this.dialogQueue;this.removeDialog(dialog);queue.push(dialog);dialog.inQueue=true;dialog.queueIndex=queue.length-1;},removeDialog:function(dialog){var i=dialog.queueIndex,queue=this.dialogQueue;if(dialog.inQueue){queue.splice(i,1);for(var len=queue.length;i<len;i++){queue[i].queueIndex--;}}dialog.inQueue=false;dialog.queueIndex=-1;},maskQueue:[],addMask:function(dialog){this.removeMask(dialog);this.maskQueue.push(dialog);dialog.maskIndex=this.maskQueue.length-1;},removeMask:function(dialog){var i=dialog.maskIndex,maskQueue=this.maskQueue;if(dialog.locked){maskQueue.splice(i,1);for(var len=maskQueue.length;i<len;i++){maskQueue[i].maskIndex--;}}dialog.maskIndex=-1;}});Dialog.items={};Dialog.defaults=_ops;Dialog.currZIndex=1990;Dialog.defaultTmpl=_tmpl;Dialog.prototype={version:'2.0',constructor:Dialog,init:function(ops){var id=typeof ops.id==='string'?ops.id:('ds_dialog_'+(++_guid));if(Dialog.items[id]){var dialog=Dialog.items[id],rOps=dialog.ops;var opsChangeMaps={left:1,top:1,follow:1,onopen:1,onfocus:1,onhide:1,onclose:1,onyes:1,onno:1,esc:2,lock:2,anim:2,drag:2,fixed:2,autoOpen:2,icon:3,content:3};$.each(ops,function(k,val){if(k in opsChangeMaps&&val!==void 0){var type=opsChangeMaps[k];if(type===2){val=!!val;}if(val!==rOps[k]){rOps[k]=val;type===3&&dialog[k](val);}}});dialog[rOps.drag?'initDrag':'releaseDrag']();dialog[rOps.fixed?'initFixed':'releaseFixed']();rOps.autoOpen&&dialog.show();return dialog;}$.each(_ops,function(k,val){typeof ops[k]==='undefined'&&(ops[k]=val);});if(!$.isArray(ops.followOffset)){ops.followOffset=[0,0];}this.id=id;this.ops=ops;this._getElem(ops);Dialog.items[id]=this;this._initEvent();this.padding(ops.padding).size(ops.width,ops.height).title(ops.title).button(ops.buttons).icon(ops.icon).content(ops.content).timeout(ops.timeout);typeof ops.oninit==='function'&&ops.oninit.call(this);ops.fixed&&this.initFixed&&this.initFixed();ops.drag&&this.initDrag&&this.initDrag();ops.autoOpen&&this.show();},_getElem:function(ops){var shell=document.createElement('div');shell.id=this.id;shell.tabIndex=-1;shell.style.position='absolute';shell.className='ds_dialog'+(ops.className?' '+ops.className:'');shell.innerHTML=Dialog.defaultTmpl.replace(/\{id\}/g,this.id);shell=this.shell=$(shell);this.contentShell=shell.find('.ds_dialog_content').eq(0);this.buttonShell=shell.find('.ds_dialog_buttons').eq(0);this.titleShell=shell.find('.ds_dialog_title').eq(0);this.closeShell=shell.find('.ds_dialog_close').eq(0);this.iconShell=shell.find('.ds_dialog_icon').eq(0);this.closeShell[ops.showCloseButton?'show':'hide']();var buttons=ops.buttons;if(!$.isArray(buttons)){buttons=ops.buttons=[];}if(ops.onyes===true||typeof ops.onyes==='function'){buttons.push({autoFocus:true,text:ops.yesText,className:'ds_dialog_yes',onclick:function(){return $.type(ops.onyes)==='function'&&ops.onyes.call(this)===false||!ops.onyes?false:this.hide();}});}if(ops.onno===true||typeof ops.onno==='function'){buttons.push({text:ops.noText,className:'ds_dialog_no',onclick:function(){return $.type(ops.onno)==='function'&&ops.onno.call(this)===false||!ops.onno?false:this.hide();}});}return shell;},_initEvent:function(){var self=this;this.closeShell.bind('click',function(e){e.stopPropagation();e.preventDefault();self.hide();});this.shell.bind('mousedown',function(){self.focus();});},isOpen:false,show:function(left,top){var ops=this.ops,shell=this.shell;if(!this._inDOM){this._inDOM=true;shell.appendTo('body');}if(!this.isOpen){ops.lock&&this.lock();!ops.follow||arguments.length>=1?this.position(left||ops.left,top||ops.top):this.follow(ops.follow,ops.followOffset[0],ops.followOffset[1]);ops.anim?shell.stop().animate({opacity:1},ops.animDuration):shell.stop().css('opacity',1);shell.css('display','block');this.isOpen=true;ops.onopen.call(this);}return this.focus();},hide:function(){var ops=this.ops;if(this.isOpen){this.isOpen=false;if(ops.onhide.call(this)!==false){this.blur().unlock();ops.anim?this.shell.stop().animate({opacity:0},ops.animDuration,function(){this.style.display='none';}):this.shell.stop().hide();Dialog.removeDialog(this);}else{this.isOpen=true;}}return this;},focus:function(){var ops=this.ops;if(this.isOpen&&!this.hasFocus&&ops.onfocus.call(this)!==false){Dialog.activeDialog&&Dialog.activeDialog._blur();Dialog.addDialog(this);var shell=this.shell;this.zIndex=Dialog.currZIndex=Math.max(++Dialog.currZIndex,this.ops.zIndex);shell.addClass('ds_dialog_active').css('zIndex',this.zIndex);if('focus'in shell[0]){shell[0].focus();this.focusButton&&this.focusButton.focus();}Dialog.activeDialog=this;this.hasFocus=true;}return this;},_blur:function(){this.hasFocus=false;this.shell.removeClass('ds_dialog_active');},blur:function(){if(this.hasFocus){this._blur();var queue=Dialog.dialogQueue,len=queue.length;if(len>1){queue[len-2].focus();}else{Dialog.activeDialog=null;}}return this;},close:function(){var self=this,ops=this.ops;if(this.shell&&ops.onclose.call(this)!==false){if(ops.anim){this.hide();setTimeout(function(){self.destory();},ops.animDuration);}else{this.hide().destory();}}},timeout:function(delay){var self=this;clearTimeout(this.timer);if(~~delay>0){this.timer=setTimeout(function(){self.close();},~~delay*1000);}return this;},destory:function(){delete Dialog.items[this.id];if(this.shell){this.shell.hide().remove();}this.shell=this.contentShell=this.buttonShell=this.titleShell=this.closeShell=this.iconShell=this.focusButton=null;},_getPositionLimit:function(){var ops=this.ops,shell=this.shell,offset=shell.offset(),viewScrollLeft=view.scrollLeft(),viewScrollTop=view.scrollTop(),shellWidth=shell.outerWidth(),shellHeight=shell.outerHeight(),viewWidth=view.width(),viewHeight=view.height(),minTop=ops.fixed?0:viewScrollTop,minLeft=ops.fixed?0:viewScrollLeft,maxTop=minTop+viewHeight-shellHeight,maxLeft=minLeft+viewWidth-shellWidth;return{minTop:minTop,minLeft:minLeft,maxTop:maxTop,maxLeft:maxLeft,viewHeight:viewHeight,viewWidth:viewWidth,height:shellHeight,width:shellWidth,top:offset.top,left:offset.left,viewScrollTop:viewScrollTop,viewScrollLeft:viewScrollLeft};},_position:function(left,top){var ops=this.ops,style=this.shell[0].style;style.left=left+'px';style.top=top+'px';},position:function(left,top){if(arguments.length<1){return this.shell.offset();}var ops=this.ops,rper=/(\d+\.?\d+)%/,limit=this._getPositionLimit();if(rper.test(left)){left=(limit.viewWidth-limit.width)*parseFloat(RegExp.$1)/100;left+=ops.fixed?0:limit.viewScrollLeft;}if(rper.test(top)){top=(limit.viewHeight-limit.height)*parseFloat(RegExp.$1)/100;top+=ops.fixed?0:limit.viewScrollTop;}left=Math.max(limit.minLeft,Math.min(limit.maxLeft,left));top=Math.max(limit.minTop,Math.min(limit.maxTop,top));this._position(left,top);return this;},size:function(width,height){this.contentShell.css('width',width).css('height',height);return this;},padding:function(padding){this.contentShell.css('padding',padding);return this;},follow:(function(){var _offsetMaps={left:function(){return 0;},right:function(shell,target){return target.outerWidth()-shell.outerWidth();},top:function(shell,target){return-shell.outerHeight();},bottom:function(shell,target){return target.outerHeight();}},_getOffset=function(shell,target,_offset){if(_offsetMaps[_offset[0]]){_offset[0]=_offsetMaps[_offset[0]](shell,target);}if(_offsetMaps[_offset[1]]){_offset[1]=_offsetMaps[_offset[1]](shell,target);}return[~~_offset[0],~~_offset[1]];};return function(target,left,top){target=$(target);var pos=$(target).offset(),offset=_getOffset(this.shell,target,[left,top]);if(this.ops.fixed){pos.left-=view.scrollLeft();pos.top-=view.scrollTop();}return this.position(pos.left+offset[0],pos.top+offset[1]);};})(),title:function(title){if(!title){this.titleShell.hide();}else{this.titleShell.html('<h3>'+title+'</h3>');this.titleShell.show();}return this;},content:function(content){this.contentShell.html(content);return this.position(this.ops.left,this.ops.top);},button:function(buttons){var self=this,ops=this.ops,shell=this.buttonShell.hide();if($.isArray(buttons)&&buttons.length>0){$.each(buttons,function(i){var btn=document.createElement('button');btn.disabled=this.disabled;btn.innerHTML='<span>'+this.text+'</span>';btn.className=this.className+(this.disabled?' disabled':'');btn=$(btn);var onclick=this.onclick;btn.bind('click',function(e){e.stopPropagation();typeof onclick==='function'&&onclick.call(self,this,e);});if(this.autoFocus){self.focusButton=btn;}shell.append(btn);});shell.show();}return this;},icon:function(iconUrl){var shell=this.iconShell;if(!!iconUrl){shell.find('div')[0].style.backgroundImage='url('+this.ops.iconBasePath+iconUrl+')';shell.show();}else{shell.hide();}return this;},lock:function(opacity,lockColor){var ops=this.ops,mask=Dialog.mask;if(!mask){mask=Dialog.mask=new ds.Mask({opacity:_ops.lockOpacity,background:_ops.lockColor,onclick:function(){var dialog=Dialog.activeDialog;dialog&&dialog.ops.onmaskclick.call(dialog);}});}Dialog.addMask(this);lockColor=lockColor||ops.lockColor;if(mask._lastBackground!==lockColor){mask._lastBackground=lockColor;mask._getElem().css('background',lockColor);}mask.show(opacity||ops.opacity);this.locked=true;return this;},unlock:function(){if(this.locked){Dialog.removeMask(this);var maskQueue=Dialog.maskQueue;if(maskQueue.length>0){maskQueue[maskQueue.length-1].lock();}else{Dialog.mask.hide();}this.locked=false;}return this;}};(function(){var rinput=/INPUT|TEXTAREA/i;DOC.bind('keydown',function(e){var dialog=Dialog.activeDialog;if(dialog&&dialog.ops.esc&&e.keyCode===27&&!rinput.test(e.target.nodeName)){dialog.hide();}});})();$.extend(Dialog.prototype,(function(){var supportFixed;return{initFixed:function(){if(typeof supportFixed!=='boolean'){supportFixed=ds.Mask.fixedPositionSupport();}if(!this._initFixed){var shell=this.shell;shell[0].style.position=supportFixed?'fixed':'absolute';this.ops.fixed=true;if(!supportFixed){this.ops.fixed=false;}this._initFixed=true;}return this;},releaseFixed:function(){if(this._initFixed){var pos=this.position(),scrollLeft=view.scrollLeft(),scrollTop=view.scrollTop();this.position(pos.left+scrollLeft,pos.top+scrollTop);this.shell[0].style.position='absolute';this.ops.fixed=false;}return this;}};})());$.extend(Dialog.prototype,(function(){var html=document.documentElement,hasCapture='setCapture'in html,hasCaptureEvt='onlosecapture'in html,clearRanges='getSelection'in global?function(){global.getSelection().removeAllRanges();}:function(){document.selection&&document.selection.empty();},isNotDragArea=function(dialog,target){var content=dialog.contentShell[0],close=dialog.closeShell[0];if(target==content||$.contains(content,target)||target===close||$.contains(close,target)||$.contains(dialog.buttonShell[0],target)){return true;}return false;};return{initDrag:function(){if(!this._dragHandler){var self=this;this._dragHandler=function(e){if(e.button!==0&&e.button!==1||isNotDragArea(self,e.target)){return;}var ops=self.ops,shell=self.shell,limit=self._getPositionLimit(),currDrag=Dialog._currDrag={limit:limit,dialog:self,offsetTop:e.pageY-limit.top,offsetLeft:e.pageX-limit.left,onmousemove:function(e){var top=e.pageY-currDrag.offsetTop,left=e.pageX-currDrag.offsetLeft;top-=ops.fixed?limit.viewScrollTop:0;left-=ops.fixed?limit.viewScrollLeft:0;top=Math.min(limit.maxTop,top);left=Math.min(limit.maxLeft,left);ops.top=Math.max(limit.minTop,top);ops.left=Math.max(limit.minLeft,left);self._position(ops.left,ops.top);clearRanges();},onmouseup:function(){hasCapture&&shell[0].releaseCapture();hasCaptureEvt?shell.unbind('losecapture',currDrag.onmouseup):view.unbind('blur',currDrag.onmouseup);DOC.unbind('mousemove',currDrag.onmousemove).unbind('mouseup',currDrag.onmouseup);shell.removeClass('ds_dialog_drag');Dialog._currDrag=null;}};hasCaptureEvt?shell.bind('losecapture',currDrag.onmouseup):view.bind('blur',currDrag.onmouseup);hasCapture&&shell[0].setCapture();DOC.bind('mousemove',currDrag.onmousemove).bind('mouseup',currDrag.onmouseup);shell.addClass('ds_dialog_drag');return false;};this.shell.bind('mousedown',this._dragHandler);}return this;},releaseDrag:function(){if(this._dragHandler){this.shell.unbind('mousedown',this._dragHandler);this._dragHandler=null;}return this;}};})());ds.dialog=function(ops,onyes,onno){if(typeof ops==='string'){ops={content:ops,title:arguments[1]||'消息提示',onyes:onyes,onno:onno};}return new Dialog(ops||{});};$.extend(ds.dialog,{items:Dialog.items,alert:function(content,onhide,icon){if(typeof onhide==='string'){icon=onhide;}return new Dialog({id:'ds_dialog_alert',fixed:true,left:'50%',top:'40%',icon:icon?icon:'info.png',title:'消息提示',content:content,buttons:[{text:'确定',autoFocus:true,className:'ds_dialog_yes',onclick:function(){this.close();}}],onhide:typeof onhide==='function'?onhide:function(){}});},confirm:function(content,onyes,onno,onhide){return new Dialog({id:'ds_dialog_confirm',fixed:true,left:'50%',top:'40%',icon:'confirm.png',title:'消息确认',content:content,onyes:onyes||true,onhide:onhide,onno:onno||true});},prompt:function(content,onyes,defaultValue){return new Dialog({id:'ds_dialog_prompt',fixed:true,left:'50%',top:'40%',icon:'confirm.png',title:'消息确认',content:'<p style="margin:0;padding:0 0 5px;">'+content+'</p><div><input type="text" style="color:#333;font-size:12px;padding:.42em .33em;width:18em;" /></div>',onopen:function(){var self=this,input=this._input;if(!input){input=this._input=this.contentShell.find('input');input.bind('keydown',function(e){if(e.keyCode===13&&self.focusButton){self.focusButton.trigger('click');return false;}});}input.val(defaultValue||'');},onfocus:function(){var input=this._input[0];setTimeout(function(){input.select();input.focus();},32);},onclose:function(){this._input=null;},onyes:function(){var input=this._input[0];return typeof onyes==='function'?onyes.call(this,input.value,input):void 0;},onno:true});},tips:function(content,timeout,follow,lock){if(typeof follow==='boolean'){lock=follow;follow=null;}return new Dialog({id:'ds_dialog_tips',fixed:true,esc:false,lock:!!lock,follow:follow,followOffset:[0,'bottom'],drag:false,content:content,padding:'12px 50px',showCloseButton:false,timeout:timeout||0});}});})(this,this.document,jQuery);

/**
* jquery.select.js
* create: 2012.11.12
* update: 2013.11.14
* admin@laoshu133.com
*/
;(function(global,$,undefined){var DOC=$(document),noop=function(){},picTmpl='<span class="pic"><img src="{src}" height="{height}" width="{width}" alt="{title}" /></span>',itemTmpl='<a href="javascript:;" id="{selectId}_{selectItemInx}">{picHTML}<span class="tit">{title}</span></a>',selectTmpl='<div class="select_label"><span>{label}</span><em class="select_arrow"><i></i></em></div><div class="select_data"><div class="select_data_inner">{itemHTML}</div></div>',_ops={index:0,className:'',imgWidth:40,imgHeight:40,disabled:false,items:[],ondropopen:noop,onchange:noop},_uuid=0,guid=function(){return++_uuid;},Select=global.Select=function(ops){this.init(ops);};Select.prototype={constructor:Select,init:function(ops){this.ops=ops=ops||{};$.each(_ops,function(k,val){typeof ops[k]==='undefined'&&(ops[k]=val);});var shell=DOC[0].createElement('div');shell.className='ds_select'+(ops.className?' '+ops.className:'');shell.id=this.id='ds_select_'+guid();this.shell=$(shell);this.selectedIndex=ops.index||0;this.shell.html(this.buildHTML(ops));this.label=this.shell.find('.select_label span').eq(0);this.setDisabled(!!ops.disabled);this.displayed=false;this.bindHandler();},buildHTML:function(ops){var tmp,html='',items=ops.items,i=0,len=items.length;for(;i<len;i++){tmp=items[i].imgSrc?picTmpl.replace('{src}',items[i].imgSrc).replace('{title}',items[i].text).replace('{width}',items[i].imgWidth||ops.imgWidth).replace('{height}',items[i].imgHeight||ops.imgHeight):'';html+=itemTmpl.replace('{selectId}',this.id).replace('{selectItemInx}',i).replace('{picHTML}',tmp).replace('{title}',items[i].text);}return selectTmpl.replace('{itemHTML}',html).replace('{label}',items[this.selectedIndex]?items[this.selectedIndex].text:'');},bindHandler:function(){var self=this,shell=this.shell;shell.delegate('.select_label','click',function(e){e.preventDefault();if(self.displayed){self.inactive();}else if(!self.disabled){self.active();}}).delegate('.select_data a','click',function(e){e.preventDefault();self.setChange(parseInt(this.id.replace(self.id+'_',''),10)||0);});},active:function(){var self=this;if(!this.disabled&&this.ops.ondropopen.call(this)!==false){setTimeout(function(){DOC.one('click.'+self.id+'_inactive',function(){self.inactive();});},0);this.shell.addClass('ds_select_active');this.displayed=true;}return this;},inactive:function(){this.displayed&&this.shell.removeClass('ds_select_active');this.displayed=false;return this;},setDisabled:function(disabled){if(this.disabled!==disabled){this.shell[!!disabled?'addClass':'removeClass']('ds_select_disabled');this.disabled=!!disabled;}return this;},setChange:function(inx){var items=this.ops.items;if(inx!==this.selectedIndex&&items[inx]&&this.ops.onchange.call(this,items[inx],items[inx].value,inx)!==false){this.selectedIndex=inx;this.label.html(items[inx].text);}return this;},appendTo:function(){this.shell.appendTo.apply(this.shell,arguments);return this;},destory:function(){this.shell.remove();this.shell=this.label=null;DOC.unbind('click.'+this.id+'_inactive');}};$.fn.renderSelect=function(){return this.each(function(i){if(this.nodeType===1&&this.nodeName.toUpperCase()==='SELECT'){var select,self=$(this),ops={},items=[];ops.items=items;ops.disabled=this.disabled;ops.index=this.selectedIndex;ops.imgWidth=this.getAttribute('data-imgwidth');ops.imgHeight=this.getAttribute('data-imgheight');$.each(this.options,function(i,item){items[i]={text:item.text,value:item.value,imgSrc:item.getAttribute('data-imgsrc'),imgWidth:item.getAttribute('data-imgwidth'),imgHeight:item.getAttribute('data-imgheight')};});ops.onchange=function(item,val,inx){self[0].selectedIndex=inx;self.trigger('change');};ops.ondropopen=function(){self.trigger('dropopen');};select=new Select(ops);var _setDisabled=select.setDisabled;select.setDisabled=function(){_setDisabled.apply(select,arguments);self[0].disabled=select.disabled;};if(self.data('ds_select')){self.data('ds_select').shell.remove();}self.data('ds_select',select);self.after(select.shell).hide();}});};})(this,jQuery);
