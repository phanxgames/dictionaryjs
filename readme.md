dictionaryjs
=================
* Get and Set entries as key/value pairs
* GetDefault method with default value if value is not found
* Remove key from dictionary
* Get length of dictionary
* Built-in forEach looping and asyncForEach looping
* Ability to break forEach and asyncForEach loops
* Configure async looping interval

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

###examples

<pre>
var Dictionary = require('dictionaryjs');

var dict = new Dictionary();

//Setting records examples
dict.set("key1","value1");
dict.set("key2","value2");
dict.set(1,"num1");
dict.set(2,"num2");
dict.set(3,"num3");
dict.set(4,"num4");

//Delete record example
dict.remove(2);
dict.remove("key2");

//Return length of dictionary
console.log("Dictionary size="+dict.size());

//Has record
console.log("Dictionary contains key 5? "+dict.has(5));

//Get records examples
console.log("Get key1="+dict.get("key1"));
console.log("Get 4="+dict.get(4));

//GetDefault example
console.log(dict.getDefault("key3","not found"));

//For each looping example
dict.forEach(function(key,value) {
  console.log(key+"="+value);
});

//Set async interval (default 100 ms)
dict.setAsyncInterval(250);

//Async for each looping example
dict.asyncForEach(function(key,value,next) {
  console.log(key+"="+value);
  next();
});

//To break within the loops
dict.forEach(function(key,value) {
  if (key==3) return false; //breaks if key is 3
  console.log(key+"="+value);
});

</pre>

###to do
* Use some kind of hashing function to store keys

