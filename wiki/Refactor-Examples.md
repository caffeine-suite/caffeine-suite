[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

CaffeineScript is designed to make refactoring easier. Here are some random examples where it does just that.



### Destructuring with `extract` Streamlines Refactoring (vs using `{}=`)

This is a real world example of a refactor I had to do which tripped me up because I was using `{}=`-style destructuring instead of `extract`. I started with:

```coffeescript
{increment:{event, hour}} = details
```

I was refactoring, and I already had `increment` available, so I just wanted to extract `event, hour` in less steps. After some struggle, my code now looked like:

```coffeescript
{event, hour} = increment
```

I had to:
* remove the first bracket, find its matching bracket, and remove the second one
* move `increment` from the middle of the statement to the end
* delete 'details'

In other words:
* One bracket-matching-remove (ug)
* One token ('increment') precisely removed from the middle (without the ':') and replacing the token at the end ('details')

That's a surprisingly involved operation for what should be trivial.

##### Now, what if we used extract?

Start with:
```coffeescript
details extract increment extract event, hour
```

Becomes:
```coffeescript
increment extract event, hour
```

Just delete the first two tokens. Easy, and also in line with the mental complexity of the task. In my mind I describe the task as: "I don't need to extract from details anymore." So, in my mind, I think: "so I just need to remove the extract-from-details code." Which becomes, "delete 'details' and 'extract'." 

This nicely exemplifies my overall goal with CaffeineScript: Streamline the language to the point where the complexity of the code, and most importantly, refactoring that code, is on parity with the human-language ways we describe our code and refactoring it.

### Optional Commas help refactoring

Say you start with this JavaScript, and you want to clean it up. How many edits does this take in your editor?

```javascript
# BEFORE
[
  {userId:  "0", message: "hi", id: "0"},
  {message: "hi", userId: "0", id: "1"},
  {message: "hi", userId: "1", id: "2"}
]

# AFTER
[
  {id: "0", userId: "0",  message: "hi"},
  {id: "1", userId: "0",  message: "hi"},
  {id: "2", userId: "1",  message: "hi"}
]
```

Now, same transformation in CaffeineScript. With optional, having the {} at the start and no commas, there is very little patch-up or room for mistakes. All it takes is 2 column edits: swap message and userIds for the last two lines, then move "ids" to the front of all lines.

NOTE: Since sometimes you DO need commas, CaffeineScript isn't always *this* slick with refactoring column data, but just to be able to do it sometimes is a blessing.
```coffeescript
# BEFORE
[]
  {} id: :0   userId: :0  message: :hi
  {} id: :1   userId: :0  message: :hi
  {} id: :2   userId: :1  message: :hi

# AFTER
[]
  {} userId:  :0   message: :hi id: :0   
  {} message: :hi  userId:  :0  id: :1
  {} message: :hi  userId:  :1  id: :2
```



### `each` <=> `find`

I discovered this cool pattern for testing code. If the actual code needs to process a big list, but you want to just test to make sure processing one item works, you can switch back and forth easily by using `find`. 

```coffeescript
# process whole list
each item from list
  process item

# process just first item
# NOTE: process needs to return a true-ish value
find item from list
  process item
```

This is particularly useful if list is an object, not an array. There is no way in javascript to select "the first" property from an object.

You might want to unit-test `process`, but in my case, I was doing integration tests with real data, but I didn't want to have to do a big run for every test. A simple swap to 'find' while developing worked great.
