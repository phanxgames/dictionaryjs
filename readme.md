A simple dictionary wrapper for JavaScript objects providing associative array functionality and helpful methods. Methods include: get, set, getDefault, remove, has, size, empty, asyncEmpty, forEach, and asyncForEach.

### Features

* Get and Set entries as key/value pairs
* GetDefault method with default value if value is not found
* Remove key from dictionary
* Get length of dictionary
* Built-in forEach and asyncForEach loops
* Ability to break forEach and asyncForEach loops
* asyncForEach now has a end callback which will be called once the loop is complete
* Empty and asyncEmpty to clear all entries from dictionary

### Change Log

#### 0.0.8

* Improved the forEach loop to not use a seperate array for keys.
* Added Empty and asyncEmpty to quickly remove all entries from the dictionary.

#### 0.0.9 & 0.0.10

* Updated README preparing for new ES6 version.

### install

<pre>
npm install dictionaryjs@classic
</pre>


### New ES6 Version

A newer version that supports (and requires) ES6 is now the latest version.
Which may be installed using:

<pre>
npm install dictionaryjs
</pre>

See the the latest version readme for more information.

## API

### Setup

To use simply include at the top of your script:

<pre>
var Dictionary = require('dictionaryjs');

var dict = new Dictionary();
</pre>

### Set

To store a key provide the key as a string and the value can be any data type.

<pre>
dict.set("key",value);
</pre>

### Get

Get the value of a key.

<pre>
dict.get("key");
</pre>

### Get Default

Get the value of a key or return the default value.

<pre>
dict.getDefault("key",default);
</pre>

If key is not contained within dictionary then the default value will be returned.
Remove

### Remove a key.

<pre>
dict.remove("key");
</pre>

### Size

Determine how many keys are in the dictionary, returns an integer.

<pre>
dict.size();
</pre>

### Has

Check if key is in the dictionary, returns boolean.

<pre>
dict.has("key");
</pre>

### Empty

Removes all dictionary entries. This method is blocking.

<pre>
dict.empty();
</pre>

### Async Empty

Removes all dictionary entries. This method is non-blocking.

<pre>
dict.asyncEmpty(function() {
  //called after dictionary has been emptied
});
</pre>

### For Each

To loop over each entry in the dictionary use:

<pre>
dict.forEach(function(key,value) {
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
dict.asyncForEach(function(key,value,next) {
  //returns key and value of each
  next();
});
</pre>

To break and end looping:

<pre>
dict.asyncForEach(function(key,value,next) {
  if (..logic..) return false;
  next();
});
</pre>

(Optional) You may also call a function once the asyncForEach loop is complete:

<pre>
dict.asyncForEach(function(key,value,next) {
  next();
}, function() {
  //called once loop is complete
});
</pre>

### Get Keys

Returns an array of keys:

<pre>
dict.getKeys();
</pre>

### Full Example

<pre>
var Dictionary = require('dictionaryjs');

var dict = new Dictionary();

//Setting keys examples
dict.set("key1","value1");
dict.set("key2","value2");
dict.set("1","num1");
dict.set("2","num2");
dict.set("3","num3");
dict.set("4","num4");
dict.set("obj",{test:"object"});
dict.set("arr",[0,1,2,3]);

//Delete key example
dict.remove("2");
dict.remove("key2");

//Return length of dictionary
console.log("Dictionary size="+dict.size());

//Has key
console.log("Dictionary contains key 5? "+dict.has(5));

//Get key examples
console.log("Get key1="+dict.get("key1"));

//GetDefault example
console.log(dict.getDefault("key3","default value, not found"));

//For each looping example
dict.forEach(function(key,value) {
  console.log(key+"="+value);
});

//To break within the loops
dict.forEach(function(key,value) {
  if (key==3) return false; //breaks if key is 3
  console.log(key+"="+value);
});

//Async for each looping example
dict.asyncForEach(function(key,value,next) {
  console.log(key+"="+value);
  next();
},function() {
  console.log("Async loop is complete!");
});

//Async Empty
dict.asyncEmpty(function() {
  //dictionary should be empty
  console.log("emptied, size:" + dict.size());
});
</pre>

## To Do

* Use some kind of hashing function to store keys so non-strings may be supported.



