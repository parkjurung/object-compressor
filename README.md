# object-compressor
this module provide two functions `compress` and `decompress`.
The function `compress` is good for compressing object that contains repeated keys and string values.

## Good case for compressing
```javascript
[
  {
    type : '[ADD] Ball',
    payload : {
      targetId : 'longTargetIdOfBall1',
      maker : 'longUserIdOfMaker1',
      value : {x : 123.12, y : 11.23}
    }
  },
  {
    type : '[ADD] Ball',
    payload : {
      targetId : 'longTargetIdOfBall1',
      maker : 'longUserIdOfMaker1',
      value : {x : 23.82, y : 18.23}
    }
  },
  {
    type : '[ADD] Ball',
    payload : {
      targetId : 'longTargetIdOfBall1',
      maker : 'longUserIdOfMaker1',
      value : {x : 823.12, y : 21.83}
    }
  },
  // ...
]
```
## Result of above example
```javascript
{
  "o" : // compressed object
  [
    {
      "a" : "b",
      "c" : {
        "d" : "e",
        "f" : "g",
        "h" : {"i" : 123.12, "j" : 11.23}

      }
    },
    {
      "a" : "b",
      "c" : {
        "d" : "e",
        "f" : "g",
        "h" : {"i" : 23.82, "j" : 18.23}
      }
    },
    {
      "a" : "b",
      "c" : {
        "d" : "e",
        "f" : "g",
        "h" : {"i" : 823.12, "j" : 21.83}
      }
    }
    // ...
  ],
  "d" : // dictionary for decompressing
  { "a" : "type",
    "b" : "[ADD] Ball",
    "c" : "payload",
    "d" : "targetId",
    "e" : "longTargetIdOfBall1",
    "f" : "maker",
    "g" : "longUserIdOfMaker1",
    "h" : "value",
    "i" : "x",
    "j" : "y"
  }
}
```
## Install
```
$ npm install --save object-compressor
```

## Usage
### TypeScript
```typescript
import {compress, decompress} from 'object-compressor';

const rawObj // raw, verbose object

let compressedResult = compress(rawObj);
// store compressed data into DB or send the data via network...

let originalObj = decompress(compressedResult);
```
### JavaScript
```javascript
const ObjComp = require('object-compressor');

const rawObj // raw, verbose object

let compressedResult = ObjComp.compress(rawObj);
// store compressed data into DB or send the data via network...

let originalObj = ObjComp.decompress(compressedResult);
```

## Feedback Please
> I'm looking forward to your pull-request, issue, email or any kind of feedback.

## Thank you!^^