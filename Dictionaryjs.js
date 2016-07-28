function Dictionary(){
	this.data = {};
	this._keys = null;
	this._invalidateKeys = false;
	//this._interval = 100;
}

Dictionary.prototype.invalidate = function() {
	this._invalidateKeys = true;
};

Dictionary.prototype.set = function(key, value){
	this.data[key] = value;
	this._invalidateKeys = true;
};
	
Dictionary.prototype.get = function(key) {
	return this.data[key];
};

Dictionary.prototype.getDefault = function(key,_default) {
	if (this.has(key)) {
		return this.data[key];
	} else {
		return _default;
	}
};

Dictionary.prototype.remove = function(key){
	delete this.data[key];
	this._invalidateKeys = true;
};

Dictionary.prototype.empty = function() {
	var self = this;
	this.forEach(function(id,obj) {
		self.remove(id);
	});
};

Dictionary.prototype.asyncEmpty = function(endcb) {
	var self = this;
	this.asyncForEach(function(id,obj,next) {
		self.remove(id);
		next();
	},endcb);
};

Dictionary.prototype.has = function(key) {
	if (this.data.hasOwnProperty(key)) {
		return true;
	} else {
		return false;
	}
}

Dictionary.prototype.size = function(){
	return this.getKeys().length;
};

Dictionary.prototype.forEach = function(cb){
	for (var key in this.data) {
		if (this.data.hasOwnProperty(key)) {
			if (cb(key,this.data[key]) == false) break;
		}
	}
};

Dictionary.prototype.asyncForEach = function (cb,endcb) {
	var keys = this.getKeys();
	var counter = 0;
	var len = keys.length;
	var data = this.data;
	//var interval = this._interval;
	var next = function() {
		if (counter < len && data!=null) {
			//setTimeout(step,interval);
			process.nextTick(step);
		} else {
			if (endcb!=null) endcb();
			return;
		}
	};
	var step = function() {
		if (counter < len && data!=null) {
			var key = keys[counter++];
			if (data.hasOwnProperty(key)) {
				if (cb(key,data[key],next) == false) {
					if (endcb!=null) endcb();
					return;
				}
			} else {
				next();
			}
		} else {
			if (endcb!=null) endcb();
			return;
		}
	};
	step();
};

/*
Dictionary.prototype.setAsyncInterval = function(interval) {
	this._interval = interval;
};
*/

Dictionary.prototype.getKeys = function() {
	if (this._invalidateKeys || this._keys==null) {
		this._keys = Object.keys(this.data);
		this._invalidateKeys = false;
		return this._keys;
	} else {
		return this._keys;
	}
};

module.exports = Dictionary;