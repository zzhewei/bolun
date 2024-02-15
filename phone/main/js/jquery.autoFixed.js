/**
* jquery.autoFixed.js
* 基于jQuery扩展插件 autoFixed
* 仅支持垂直方向 fixed
* create: 2013.05.23
* update: 2013.06.05
* admin@laoshu133.com

-- 参数说明 --
	- autoFixed {Function}
	- @Param options {Object} --总体配置{
			container: {Selector|Element|jQuery} 外层容器，当top超出容器时停止 fixed 定位，默认 null
			offset: {Number} 距离窗口顶部的偏移值
			onSetFixedOverflow: noop,
			onSetFixedOverflow: noop,
			onReleaseFixed: noop
		}
	- @return {jQuery}
-- 参数说明 end --
*/
;(function(global, document, $){
	var 
	view = $(global),
	noop = function(){},
	_ops = {
		onSetFixedOverflow: noop,
		onReleaseFixed: noop,
		onSetFixed: noop,
		container: null,
		offset: 0
	},
	scrollTimer,
	resizeTimer,
	checkList = [],
	scrollBound = false,
	checkScroll = function(){
		var scrollTop = view.scrollTop();
		$.each(checkList, function(i){
			var 
			self = this,
			ops = this.ops,
			panel = this.container,
			offsetTop = this.offsetTop;
			if(!this.isFixed && !this.isFixedOverflow){
				offsetTop = this.offsetTop = this.offset().top;
			}
			if(scrollTop > offsetTop + ops.offset){
				var _setFixed = function(){
					setFixed.call(self, scrollTop);
					self.removeClass('fixed_overflow').addClass('has_fixed');
					self.isFixedOverflow = false;
					self.isFixed = true;

					ops.onSetFixed.call(self, scrollTop);
				};
				if(panel && panel.length){
					var 
					height = this.outerHeight(),
					panelHeight = panel.outerHeight(),
					panelOffsetTop = panel.offset().top,
					tBottom = panelOffsetTop + panelHeight,
					rBottom = scrollTop + ops.offset + height;
					//overflow
					if(!this.isFixedOverflow && rBottom >= tBottom){
						setFixedOverflow.call(this, scrollTop, height, panelHeight, panelOffsetTop);
						self.removeClass('has_fixed').addClass('fixed_overflow');
						this.isFixedOverflow = true;
						this.isFixed = false;

						ops.onSetFixedOverflow.call(this, scrollTop);
					}
					//set
					else if(!this.isFixed && rBottom < tBottom){
						_setFixed();
					}
				}
				//set, with no panel
				else if(!this.isFixed){
					_setFixed();
				}
			}
			//release
			else if(this.isFixed || this.isFixedOverflow){
				releaseFixed.call(this, scrollTop);
				self.removeClass('has_fixed fixed_overflow');
				this.isFixedOverflow = false;
				this.isFixed = false;

				ops.onReleaseFixed.call(self, scrollTop);
			}
		});
	},
	checkScrollHandler = function(){
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(checkScroll, 16);
	},
	checkResize = function(){
		$.each(checkList, function(i){
			var fixedCSS = this.fixedCSS;
			if(this.isFixed || this.isFixedOverflow){
				releaseFixed.call(this, 0);
				this.isFixedOverflow = false;
				this.isFixed = false;
			}
			fixedCSS.height = this.height();
			fixedCSS.width = this.width();
		});
		checkScrollHandler();
	},
	checkResizeHandler = function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkResize, 16);
	},
	setFixed = function(){
		this.css(this.fixedCSS);
	},
	setFixedOverflow = function(scrollTop, height, panelHeight, panelOffsetTop){
		if(!this.isFixed){
			this.css(this.fixedCSS);
		}
		this.css({
			position: 'absolute',
			top: panelOffsetTop + panelHeight - height
		});
	},
	releaseFixed = function(){
		this.css(this.defaultCSS);
	},
	hasFixedBg = false,
	setFixedBg = function(elem){
		if(hasFixedBg || !elem){ return; }
		if((elem = $(elem)).css('backgroundAttachment') !== 'fixed'){
			elem.css('backgroundAttachment', 'fixed');
			if(elem.css('backgroundImage') === 'none'){
				elem.css('backgroundImage', 'url(about:blank)');
			}
		}
		hasFixedBg = true;
	};
	$.fn.autoFixed = function(ops){
		ops = ops || {};
		for(var k in _ops){
			if(typeof ops[k] === 'undefined'){
				ops[k] = _ops[k];
			}
		}
		if(!scrollBound && this.length > 0){
			//Not support fixed position, but css expression supported
			var 
			docElem,
			body = document.body,
			root = document.documentElement,
			hasExpression = !!((docElem = body || root) && docElem.style.setExpression);
			if(hasExpression && !fixedPositionSupported()){
				setFixed = function(scrollTop){
					setFixedBg(docElem);
					
					var 
					offsetTop = this.offsetTop,
					offsetParent = this[0].offsetParent;
					if(!offsetParent || offsetParent === body || offsetParent === root){
						offsetTop = 0;
					}
					else{
						var parent = $(offsetParent);
						if(parent.css('position') !== 'static'){
							offsetTop -= (offsetTop - parent.offset().top);
						}
						else{
							offsetTop -= parent.offset().top;	
						}
					}

					if(!this.resetFixedCSS){
						this.fixedCSS.position = 'absolute';
						delete this.fixedCSS.top;

						this.resetFixedCSS = true;
					}
					this.css(this.fixedCSS);

					var 
					docStr = '(document.documentElement || document.body)',
					evalExprArr = ['eval( ', docStr, '.scrollTop + ', this.ops.offset - offsetTop, ' ) + "px"'];
					this[0].style.setExpression('top', evalExprArr.join(''));
				};
				var _setFixedOverflow = setFixedOverflow;
				setFixedOverflow = function(){
					this[0].style.removeExpression('top');
					_setFixedOverflow.apply(this, arguments);
				};
				releaseFixed = function(){
					this.css(this.defaultCSS);
					this[0].style.removeExpression('top');
				};
			}

			view.bind('scroll.autoFixed', checkScrollHandler);
			view.bind('resize.autoFixed', checkResizeHandler);
			checkScrollHandler();
			scrollBound = true;
		}
		return this.each(function(){
			var shell = $(this), style = this.style;
			if(shell.data('@setFixedInited')){ return; }
			shell.defaultCSS = {
				position: style.position,
				height: style.height,
				width: style.width,
				top: style.top
			};
			shell.fixedCSS = {
				height: shell.height(),
				width: shell.width(),
				position: 'fixed',
				top: ops.offset
			};
			shell.container = ops.container ? $(ops.container) : null;
			shell.offsetTop = shell.offset().top;
			shell.isFixedOverflow = false;
			shell.isFixed = false;
			shell.ops = ops;
			checkList.push(shell);
			shell.data('@setFixedInited', true);
		});
	};
	//Extend Funs
	function fixedPositionSupported(){
		if(typeof $.support.fixedPosition === 'boolean'){
			return $.support.fixedPosition;
		}
		var div, ret = false, body = document.body, css = 'border:0;margin:0;padding:0;position:fixed;left:0;top:20px;';
		if(body){
			div = document.createElement('div');
			div.style.cssText = css + 'position:absolute;top:0;';
			div.innerHTML = '<div style="' + css + '"></div>';
			body.insertBefore(div, body.firstChild);
			ret = $.support.fixedPosition = div.firstChild.offsetTop === 20;
			body.removeChild(div);
		}
		return ret;
	}
})(this, this.document, jQuery);