"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: Henry Price
 * Website: Phanxgames.com
 * ---------------------------------
 * Dictionary
 */
class Dictionary {
    constructor(initial = null, options = null) {
        /**
         * @internal
         */
        this[Symbol.iterator] = function* () {
            let keys = this.getKeys(); //Object.keys(this);
            for (let key of keys) {
                yield this[key];
            }
        };
        if (initial != null) {
            this._copyValues(initial);
        }
        options = options || { cacheKeys: false };
        //Make the internal data non enumerable.
        Object.defineProperty(this, "__private__", {
            value: {},
            enumerable: false
        });
        this.__private__.cacheKeys = options.cacheKeys;
        this.__private__.invalidateKeys = true;
        this.__private__.keys = null;
    }
    /**
     * Use to loop through key, value pairs.
     * <pre>
     *     for (let [key,value] of dict.entries()) {
     *          //...
     *     }
     * </pre>
     * @returns Iterator
     */
    entries() {
        let self = this;
        return { "alert": "exposes Symbol.iterator, use with (for ... of) loop",
            [Symbol.iterator]: function* () {
                let keys = self.getKeys(); //Object.keys(this);
                for (let key of keys) {
                    yield [key, self[key]];
                }
            }
        };
    }
    /**
     * Checks if collection has this key.
     * @param {TKey} key
     * @returns {boolean}
     */
    has(key) {
        if (key == null)
            return false;
        if (typeof key == "string" && key.indexOf("__private__") >= 0)
            return false;
        return this.hasOwnProperty(key);
    }
    /**
     * Checks if the value is within the Dictionary.
     * @param {TValue} value
     * @returns {boolean}
     */
    contains(value) {
        if (value == null)
            return false;
        let values = Object.values(this);
        return values.indexOf(value) >= 0;
    }
    /**
     * Returns number of items in collection.
     * @returns {number} c
     */
    size() {
        return this.getKeys().length;
    }
    /**
     * Returns number of items in collection.
     * @returns {number} c
     */
    get length() {
        return this.size();
    }
    /**
     * Invalidates keys to recalculate.
     */
    invalidate() {
        this.__private__.invalidateKeys = true;
    }
    /**
     * @ignore
     * @alias getKeys()
     */
    keys() {
        return this.getKeys();
    }
    /**
     * Return array of keys
     * @returns {Array<any>} array of keys
     */
    getKeys() {
        if (!this.__private__.cacheKeys)
            return Object.keys(this);
        if (this.__private__.invalidateKeys ||
            this.__private__.keys == null) {
            this.__private__.invalidateKeys = false;
            this.__private__.keys = Object.keys(this);
        }
        return this.__private__.keys;
    }
    /**
     * Returns values within collection
     * @returns {Array<TValue>}
     */
    values() {
        return Object.values(this);
    }
    /**
     * Remove the key from collection.
     * @param {TKey} key
     */
    remove(key) {
        this.invalidate();
        delete this[key];
    }
    /**
     * Store value at the key.  The key has been tested with strings,
     *   but may support other types.
     * Value may be any data type.
     * @param {TKey} key - key of the key/value pair
     * @param {TValue} value - value of the key/value pair
     */
    set(key, value) {
        this.invalidate();
        this[key] = value;
    }
    /**
     * Returns the value
     * @param {TKey} key
     * @returns {TValue} the value
     */
    get(key) {
        return this[key];
    }
    /**
     * Returns the default value if key is not found or is null.
     * @param {TKey} key - key to lookup
     * @param defaultValue - the default value
     * @returns value of key or default value
     */
    getDefault(key, defaultValue) {
        if (this.has(key)) {
            return this[key];
        }
        else {
            return defaultValue;
        }
    }
    /**
     * Removes all keys from collection.
     * This is blocking.
     */
    empty() {
        this.forEach((key, value) => {
            this.remove(key);
        });
    }
    /**
     * @alias empty()
     */
    clear() {
        this.empty();
    }
    /**
     * Non-blocking method to remove all keys from collection.
     * @param {Function} cbComplete - cbComplete()
     */
    async asyncEmpty(cbComplete = null) {
        await this.asyncForEach((key, value, next) => {
            this.remove(key);
            next();
        });
        if (cbComplete != null)
            cbComplete();
    }
    /**
     * @ignore
     * @alias each
     */
    forEach(cb) {
        this.each(cb);
    }
    /**
     * Blocking loop helper method.
     * @param {Function} cbEach - cbEach(key:any,value:any)
     */
    each(cbEach) {
        for (let key in this) {
            if (this.has(key)) {
                if (cbEach(key, this[key]) === false)
                    break;
            }
        }
    }
    /**
     * Non-blocking loop helper method.
     * Must call cbNext within cbIterator to move to the next item in the collection.
     * Example:
     * <pre>
     *     await collection.asyncForEach(
     *        (key:any,value:any,cbNext:Function) => {
     *          console.log(key,value);
     * 	       	cbNext();
     *        });
     * </pre>
     * @param {Function} cbIterator - cbIterator(key:any,value:any,cbNext:Function)
     * @param {Function} cbComplete - Optional - cbComplete()
     * @returns {Promise<null>}
     */
    asyncForEach(cbIterator, cbComplete = null) {
        return new Promise((resolve) => {
            let keys = this.getKeys();
            let counter = 0;
            let len = keys.length;
            let next = () => {
                if (counter < len) {
                    process.nextTick(step);
                    //setTimeout(step,100);
                }
                else {
                    if (cbComplete != null)
                        cbComplete();
                    else
                        resolve();
                    return;
                }
            };
            let step = () => {
                if (counter < len) {
                    let key = keys[counter++];
                    if (cbIterator(key, this[key], next) == false) {
                        if (cbComplete != null)
                            cbComplete();
                        else
                            resolve();
                        return;
                    }
                }
                else {
                    if (cbComplete != null)
                        cbComplete();
                    else
                        resolve();
                    return;
                }
            };
            step();
        });
    }
    _copyValues(initial) {
        for (let prop in initial) {
            if (initial.hasOwnProperty(prop))
                this[prop] = initial[prop];
        }
    }
}
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map