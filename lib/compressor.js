"use strict";
exports.__esModule = true;
function numToStr(num) {
    if (num < 0) {
        return 'invalid';
    }
    else {
        var str = '';
        var i = void 0;
        var remain = void 0;
        for (i = num; i > 25; i = (i - remain) / 26) {
            remain = i % 26;
            str = String.fromCharCode(remain + 97) + str;
        }
        str = String.fromCharCode(i + 97) + str;
        return str;
    }
}
function compress(object) {
    var plainToMin = {};
    var minToPlain = {};
    var mapCnt = { cnt: 0 };
    var compressedObject;
    compressedObject = innerCompress(object, plainToMin, minToPlain, mapCnt);
    return { o: compressedObject, d: minToPlain };
}
exports.compress = compress;
function innerCompress(object, plainToMin, minToPlain, mapCnt) {
    if (object instanceof Array) {
        var compressedObjects_1 = [];
        object.forEach(function (item) {
            compressedObjects_1.push(innerCompress(item, plainToMin, minToPlain, mapCnt));
        });
        return compressedObjects_1;
    }
    else if (object && (typeof object === 'object')) {
        var newObj_1 = {};
        Object.keys(object).forEach(function (key) {
            var minKey;
            if (plainToMin[key]) {
                minKey = plainToMin[key];
            }
            else {
                minKey = numToStr(mapCnt.cnt++);
                plainToMin[key] = minKey;
                minToPlain[minKey] = key;
            }
            newObj_1[minKey] = innerCompress(object[key], plainToMin, minToPlain, mapCnt);
        });
        return newObj_1;
    }
    else if (typeof object === 'string') {
        if (plainToMin[object]) {
            return plainToMin[object];
        }
        else {
            var newMin = numToStr(mapCnt.cnt++);
            plainToMin[object] = newMin;
            minToPlain[newMin] = object;
            return newMin;
        }
    }
    else {
        return object;
    }
}
function decompress(compressResult) {
    var object = compressResult.o;
    var dictionary = compressResult.d;
    var decompressedObject;
    decompressedObject = innerDecompress(object, dictionary);
    return decompressedObject;
}
exports.decompress = decompress;
function innerDecompress(object, dictionary) {
    if (object instanceof Array) {
        var decompressedObjects_1 = [];
        object.forEach(function (item) {
            decompressedObjects_1.push(innerDecompress(item, dictionary));
        });
        return decompressedObjects_1;
    }
    else if (object && (typeof object === 'object')) {
        var newObj_2 = {};
        Object.keys(object).forEach(function (key) {
            var originalKey = dictionary[key];
            newObj_2[originalKey] = innerDecompress(object[key], dictionary);
        });
        return newObj_2;
    }
    else if (typeof object === 'string') {
        return dictionary[object];
    }
    else {
        return object;
    }
}
