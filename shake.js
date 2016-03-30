/**
 * LBS shake  
 * Date: 2015-3-15
 * ==================================
 * el 震动的元素对象或者元素ID('shake-id') el需设置相对或者绝对定位
 * opts.margin 震动幅度(上/左切换偏移距离) 默认 2(px)
 * opts.rate 震动切换间隔时间 (上/左切换) 默认 20(ms) 间隔时间*2不能大于重复时间
 * opts.delay 震动重复时间 频率(重复上/左切换)  默认 60(ms)
 * ====================================================
 * this.start() 开始震动
 * this.stop() 停止震动  
 * ==================================
 **/
var Shake = function(el, opts) {
	this.el = typeof el === 'string' ? document.getElementById(el) : el;
	if (!this.el) return;
	opts = opts || {};
	this.margin = opts.margin || 2;
	this.rate = opts.rate || 20;
	this.delay = opts.delay || 60;
	this.elStyle = this.el.cssText;
	if (this._css('position') === 'static') this.el.style.position = 'relative';
	this.eL = parseInt(this._css('left')) || 0;
	this.eT = parseInt(this._css('top')) || 0;
};
Shake.prototype = {
	start: function() {
		var _this = this;
		! function shake() {
			this.toggle = !this.toggle;
			if (this.toggle) {
				_this.el.style.top = _this.eT + _this.margin + 'px';
				setTimeout(function() {
					_this.el.style.left = _this.eL + _this.margin + 'px';
				}, _this.rate);
			} else {
				_this.el.style.top = _this.eT - _this.margin + 'px';
				setTimeout(function() {
					_this.el.style.left = _this.eL - _this.margin + 'px';
				}, _this.rate);
			}
			_this.timer = setTimeout(shake, _this.delay);
		}();
	},
	stop: function() {
		this.timer && clearTimeout(this.timer);
		this.timer = null;
		this.el.style.cssText = this.elStyle;
	},
	_css: function(n) {
		return this.el.currentStyle ? this.el.currentStyle[n] : getComputedStyle(this.el, null)[n];
	}
};

// css3 3d变换支持检测
Shake.support3d = function() {
	var el = document.createElement('p'),
		has3d,
		transforms = {
			'webkitTransform': '-webkit-transform',
			'OTransform': '-o-transform',
			'msTransform': '-ms-transform',
			'MozTransform': '-moz-transform',
			'transform': 'transform'
		};
	document.body.appendChild(el);
	for (var t in transforms) {
		if (el.style[t] !== undefined) {
			el.style[t] = 'translate3d(1px,1px,1px)';
			has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		}
	}
	document.body.removeChild(el);
	return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
};