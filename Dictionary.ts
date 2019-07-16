/**
 * Author: Henry Price
 * Website: Phanxgames.com
 * ---------------------------------
 * Dictionary
 */
export class Dictionary<TKey,TValue>  {

    private __private__:DictionaryInner;

    constructor(initial:{[s:string]:TValue;}=null,
                options:DictionaryOptions=null)
    {

        if (initial != null) {
            this._copyValues(initial);
        }

        options = options || {cacheKeys:false};

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
     * @internal
     */
    public [Symbol.iterator] = function*() {
        let keys = this.getKeys();//Object.keys(this);
        for (let key of keys) {
            yield this[key];
        }
    };


    /**
     * Use to loop through key, value pairs.
     * <pre>
     *     for (let [key,value] of dict.entries()) {
     *          //...
     *     }
     * </pre>
     * @returns Iterator
     */
    public entries():any {
        let self = this;
        return {"alert":"exposes Symbol.iterator, use with (for ... of) loop",
            [Symbol.iterator]: function*() {
                let keys = self.getKeys();//Object.keys(this);
                for (let key of keys) {
                    yield [key,self[key]];
                }
            }
        };
    }


    /**
     * Checks if collection has this key.
     * @param {TKey} key
     * @returns {boolean}
     */
    public has(key:TKey):boolean {

        if (key==null) return false;
        if (typeof key == "string" && key.indexOf("__private__") >= 0)
            return false;

        return this.hasOwnProperty(key as any);

    }

    /**
     * Checks if the value is within the Dictionary.
     * @param {TValue} value
     * @returns {boolean}
     */
    public contains(value:TValue):boolean {
        if (value==null) return false;
        let values:Array<TValue> = Object.values(this);
        return values.indexOf(value) >= 0;
    }



    /**
     * Returns number of items in collection.
     * @returns {number} c
     */
    public get size():number {
        return this.getKeys().length;
    }

    /**
     * Returns number of items in collection.
     * @returns {number} c
     */
    public get length():number {
        return this.size;
    }

    /**
     * Invalidates keys to recalculate.
     */
    public invalidate():void {
        this.__private__.invalidateKeys = true;
    }

    /**
     * @ignore
     * @alias getKeys()
     */
    public keys():Array<TKey> {
        return this.getKeys();
    }

    /**
     * Return array of keys
     * @returns {Array<any>} array of keys
     */
    public getKeys():Array<any> {
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
    public values():Array<TValue> {
        return Object.values(this);
    }

    /**
     * Remove the key from collection.
     * @param {TKey} key
     */
    public remove(key:TKey):void {
        this.invalidate();
        delete this[(key as any)];
    }

    /**
     * @alias remove
     */
    public delete(key:TKey):void {
        this.remove(key);
    }


    /**
     * Store value at the key.  The key has been tested with strings,
     *   but may support other types.
     * Value may be any data type.
     * @param {TKey} key - key of the key/value pair
     * @param {TValue} value - value of the key/value pair
     */
    public set(key:TKey, value:TValue):void {
        this.invalidate();
        this[(key as any)] = value;
    }

    /**
     * Returns the value
     * @param {TKey} key
     * @returns {TValue} the value
     */
    public get(key:TKey):TValue {
        return this[(key as any)];
    }

    /**
     * Returns the default value if key is not found or is null.
     * @param {TKey} key - key to lookup
     * @param defaultValue - the default value
     * @returns value of key or default value
     */
    public getDefault(key:TKey, defaultValue:TValue):TValue {
        if (this.has(key)) {
            return this[(key as any)];
        } else {
            return defaultValue;
        }
    }

    /**
     * Removes all keys from collection.
     * This is blocking.
     */
    public empty():void {
        this.forEach((key:TKey, value:TValue):void => {
            this.remove(key);
        })
    }

    /**
     * @alias empty()
     */
    public clear():void {
        this.empty();
    }

    /**
     * Non-blocking method to remove all keys from collection.
     * @param {Function} cbComplete - cbComplete()
     */
    public async asyncEmpty(cbComplete:Function=null):Promise<void> {

        await this.asyncForEach(
            (key:any,value:any,next:Function):void =>
            {
                this.remove(key);
                next();
            }
        );
        if (cbComplete!=null)
            cbComplete();

    }

    /**
     * @ignore
     * @alias each
     */
    public forEach(cb:Function):void {
        this.each(cb);
    }

    /**
     * Blocking loop helper method.
     * @param {Function} cbEach - cbEach(key:any,value:any)
     */
    public each(cbEach:Function):void {
        for (let key in this) {
            if (this.has((key as any))) {
                if (cbEach(key,this[key]) === false) break;
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
    public asyncForEach(cbIterator:Function,
                              cbComplete:Function=null):Promise<null>
    {

        return new Promise((resolve) => {

            let keys:Array<any> = this.getKeys();
            let counter:number = 0;
            let len:number = keys.length;

            let next:Function = ():void => {
                if (counter < len) {
                    process.nextTick(step);
                    //setTimeout(step,100);
                } else {
                    if (cbComplete!=null)
                        cbComplete();
                    else
                        resolve();
                    return;
                }
            };

            let step:Function = ():void => {
                if (counter < len ) {
                    let key = keys[counter++];
                    if (cbIterator(key, this[key], next) == false) {
                        if (cbComplete!=null)
                            cbComplete();
                        else
                            resolve();
                        return;
                    }

                } else {
                    if (cbComplete!=null)
                        cbComplete();
                    else
                        resolve();
                    return;
                }
            };
            step();

        });


    }


    private _copyValues(initial: {[s:string]:TValue;}):void {
        for (let prop in initial) {
            if (initial.hasOwnProperty(prop))
                this[prop] = initial[prop];
        }
    }
}

/**
 * @internal
 */
interface DictionaryInner {
    cacheKeys:boolean;
    invalidateKeys:boolean;
    keys:Array<any>
}

export interface DictionaryOptions {
    cacheKeys?:boolean
}