import {SAMPLE_PLAIN} from "../sample";

function numToStr(num: number): string {
  if (num < 0) {
    return 'invalid';
  } else {
    let str = '';
    let i;
    let remain;
    for (i = num; i > 25; i = (i - remain) / 26) {
      remain = i % 26;
      str = String.fromCharCode(remain + 97) + str;
    }
    str = String.fromCharCode(i + 97) + str;
    return str;
  }
}

export function compress(object): { o: any, d: { [min: string]: string } } {
  let plainToMin = {};
  let minToPlain = {};
  let mapCnt = {cnt: 0};
  let compressedObject: any;
  compressedObject = innerCompress(object, plainToMin, minToPlain, mapCnt);
  return {o: compressedObject, d: minToPlain};
}

function innerCompress(object: any, plainToMin: { [plain: string]: string }, minToPlain: { [min: string]: string }, mapCnt: { cnt: number }) {
  if (object instanceof Array) { // array
    let compressedObjects = [];
    object.forEach(item => {
      compressedObjects.push(innerCompress(item, plainToMin, minToPlain, mapCnt));
    });
    return compressedObjects;
  } else if (object && (typeof object === 'object')) { // object
    let newObj = {};
    Object.keys(object).forEach(key => {
      let minKey;
      if (plainToMin[key]) {
        minKey = plainToMin[key];
      } else {
        minKey = numToStr(mapCnt.cnt++);
        plainToMin[key] = minKey;
        minToPlain[minKey] = key;
      }
      newObj[minKey] = innerCompress(object[key], plainToMin, minToPlain, mapCnt);
    });
    return newObj;
  } else if (typeof object === 'string') { // string
    if (plainToMin[object]) {
      return plainToMin[object];
    } else {
      let newMin = numToStr(mapCnt.cnt++);
      plainToMin[object] = newMin;
      minToPlain[newMin] = object;
      return newMin;
    }
  } else { // number, boolean etc...
    return object;
  }
}

export function decompress(compressResult: { o: any, d: { [min: string]: string } }): any {
  let object = compressResult.o;
  let dictionary = compressResult.d;
  let decompressedObject: any;
  decompressedObject = innerDecompress(object, dictionary);
  return decompressedObject;
}

function innerDecompress(object: any, dictionary: { [min: string]: string }) {
  if (object instanceof Array) { // array
    let decompressedObjects = [];
    object.forEach(item => {
      decompressedObjects.push(innerDecompress(item, dictionary));
    });
    return decompressedObjects;
  } else if (object && (typeof object === 'object')) { // object
    let newObj = {};
    Object.keys(object).forEach(key => {
      let originalKey = dictionary[key];
      newObj[originalKey] = innerDecompress(object[key], dictionary);
    });
    return newObj;
  } else if (typeof object === 'string') { // string
    return dictionary[object];
  } else { // number, boolean etc...
    return object;
  }
}

