/**
 * Author: Henry Price
 * Website: Phanxgames.com
 * ---------------------------------
 * Dictionary
 */
export declare class Dictionary<TKey, TValue> {
    private __private__;
    constructor(initial?: {
        [s: string]: TValue;
    }, options?: DictionaryOptions);
    /**
     * @internal
     */
    [Symbol.iterator]: () => IterableIterator<any>;
    /**
     * Use to loop through key, value pairs.
     * <pre>
     *     for (let [key,value] of dict.entries()) {
     *          //...
     *     }
     * </pre>
     * @returns Iterator
     */
    entries(): any;
    /**
     * Checks if collection has this key.
     * @param {TKey} key
     * @returns {boolean}
     */
    has(key: TKey): boolean;
    /**
     * Checks if the value is within the Dictionary.
     * @param {TValue} value
     * @returns {boolean}
     */
    contains(value: TValue): boolean;
    /**
     * Returns number of items in collection.
     * @returns {number} c
     */
    size(): number;
    /**
     * Returns number of items in collection.
     * @returns {number} c
     */
    readonly length: number;
    /**
     * Invalidates keys to recalculate.
     */
    invalidate(): void;
    /**
     * @ignore
     * @alias getKeys()
     */
    keys(): Array<TKey>;
    /**
     * Return array of keys
     * @returns {Array<any>} array of keys
     */
    getKeys(): Array<any>;
    /**
     * Returns values within collection
     * @returns {Array<TValue>}
     */
    values(): Array<TValue>;
    /**
     * Remove the key from collection.
     * @param {TKey} key
     */
    remove(key: TKey): void;
    /**
     * Store value at the key.  The key has been tested with strings,
     *   but may support other types.
     * Value may be any data type.
     * @param {TKey} key - key of the key/value pair
     * @param {TValue} value - value of the key/value pair
     */
    set(key: TKey, value: TValue): void;
    /**
     * Returns the value
     * @param {TKey} key
     * @returns {TValue} the value
     */
    get(key: TKey): TValue;
    /**
     * Returns the default value if key is not found or is null.
     * @param {TKey} key - key to lookup
     * @param defaultValue - the default value
     * @returns value of key or default value
     */
    getDefault(key: TKey, defaultValue: TValue): TValue;
    /**
     * Removes all keys from collection.
     * This is blocking.
     */
    empty(): void;
    /**
     * @alias empty()
     */
    clear(): void;
    /**
     * Non-blocking method to remove all keys from collection.
     * @param {Function} cbComplete - cbComplete()
     */
    asyncEmpty(cbComplete?: Function): Promise<void>;
    /**
     * @ignore
     * @alias each
     */
    forEach(cb: Function): void;
    /**
     * Blocking loop helper method.
     * @param {Function} cbEach - cbEach(key:any,value:any)
     */
    each(cbEach: Function): void;
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
    asyncForEach(cbIterator: Function, cbComplete?: Function): Promise<null>;
    private _copyValues(initial);
}
export interface DictionaryOptions {
    cacheKeys?: boolean;
}
