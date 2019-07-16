A simple dictionary wrapper for JavaScript providing hashmap functionality with the added benefit of accessing keys using box and dot operators!

### Features

* Typescript source-code.
* Stores key/value pairs within a Associative Array like collections.
* Use dot operator and brackets to access keys.
* Remove key using the DELETE operator.
* Iterator to support for..of looping.
* Async/await support with Promises.
* Set and Get methods for accessing keys.
* GetDefault method with default value if value is not found.
* Remove method to remove key from collection.
* Size property to get total key count within collection.
* Built-in forEach and asyncForEach methods for looping.
* Empty and asyncEmpty to remove all entries from collection.
* Has method checking if key is within collection.


### install

<pre>
npm install dictionaryjs
</pre>

### Requirements

* ECMAScript 2017 (ES2017)
* Node.JS 8.x or later (tested on 8.1.3)

See branch "classic" for earlier versions of Node.JS.


## API

### Setup

To use simply include at the top of your script:

<pre>
const Dictionary = require('dictionaryjs');

let dict = new Dictionary();
</pre>

TypeScript example:

<pre>
import {Dictionary} from "dictionaryjs";

let dict:Dictionary&lt;string,string&gt; = new Dictionary&lt;string,string&gt;();

</pre>


### Set

Store values to a key:

<pre>
dict.set("key",value);
//--or--
dict["key"] = value;
//--or--
dict.key = value;
</pre>

### Get

Get a value from a key:

<pre>
dict.get("key");
//--or--
dict["key"];
//--or---
dict.key;
</pre>

### Get Default

Get the value of a key or return the default value.

<pre>
dict.getDefault("key",default);
</pre>

If key is not contained within dictionary then the default value will be returned.


### Remove

Remove an entry by key:

<pre>
dict.remove("key");
//--or--
delete dict["key"];
</pre>


### Size

Determine how many entries are in the dictionary, returns an integer.

<pre>
dict.size;
//--or--
dict.length;
</pre>

### Has

Check if key is in the dictionary, returns boolean.

<pre>
dict.has("key");
</pre>


### Contains

Check if value is in the dictionary, returns boolean.

<pre>
dict.contains(obj);
</pre>


### Empty

Removes all dictionary entries. This method is blocking.

<pre>
dict.empty();
//--or--
dict.clear();
</pre>

### Async Empty

Removes all dictionary entries. This method is non-blocking.

<pre>
dict.asyncEmpty(() => {
  //called after dictionary has been emptied
});
</pre>

Or as a promise:

<pre>
await dict.asyncEmpty();
//after dictionary has been emptied
</pre>

### For Each

To loop over each entry in the dictionary use:
This method is blocking.

<pre>
dict.forEach((key,value) => {
  //returns key and value of each
});
</pre>

To break and end looping:

<pre>
dict.forEach(function(key,value) {
  if (..logic..) return false;
});
</pre>

### Async For Each

To loop over each entry in a non-blocking manner:

<pre>
dict.asyncForEach((key,value,next) => {
  //returns key and value of each
  next();
});
</pre>

To break and end looping:

<pre>
dict.asyncForEach((key,value,next) => {
  if (..logic..) return false;
  next();
});
</pre>

(Optional) You may also call a function once the asyncForEach loop is complete:

<pre>
dict.asyncForEach((key,value,next) => {
  next();
}, () => {
  //called once loop is complete
});
</pre>

Or as a promise:

<pre>
await dict.asyncForEach((key,value,next) => {
  next();
});
//once loop is complete
</pre>


### Using the (for ... of) loop:

Loop through all entries. This is blocking.

<pre>
for (let value of dict) {
    console.log(value);
}
</pre>

To loop through each key within the collection you may use the for...in loop.
This is blocking.

<pre>
for (let key in dict) {
    console.log(key + "=" + dict[key]);
}
</pre>



### Entries Iterator

Loop through all key and value pairs at once:

<pre>
for (let [key,value] of dict.entries()) {
    console.log(key,value);
}
</pre>


### Get Keys

Returns an array of keys:

<pre>
dict.keys();
</pre>

### Get Values

Returns an array of values:

<pre>
dict.values();
</pre>

### Initial Key/Values

Declare the Dictionary to have initial key/values with the constructor:

<pre>
let dict = new Dictionary({"key":"value"});
</pre>


### Caching Keys

An option in the constructor (defaults to false) allows you to have the keys cached so they are not recalculated each time you begin to iterate through the collection.

First enable caching by passing true in the constructor:

<pre>
let dict = new Dictionary(null,{cacheKeys:true});
</pre>

Then as you interact with the collection the cache will invalidate on its own as long as you use the methods built into the class.  In other words using the dot or box operators to set or delete keys will not invalidate the key cache.

<pre>
//will invalidate cache on its own:
dict.set("key",value);

//will NOT invalidate cache on its own:
dict["key"] = value;
</pre>

In the event you wish to still use the dot or box operators you can manually invalidate the cache yourself...

<pre>
dict["key"] = value;
dict.invalidate();
</pre>




