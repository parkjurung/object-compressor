"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compressor_1 = require("../lib/compressor");
var sample_1 = require("../sample");
var original = sample_1.SAMPLE_PLAIN;
var compressResult = compressor_1.compress(original);
var decompressed = compressor_1.decompress(compressResult);
var originalLength = JSON.stringify(original).length;
var compressResultLength = JSON.stringify(compressResult).length;
var decompressedLength = JSON.stringify(decompressed).length;
console.log(' -------- ts test result ---------');
console.log('length of original >>>>>>>>', originalLength);
console.log('length of compressResult >>', compressResultLength);
console.log('length of decompressed >>>>', decompressedLength);
console.log((originalLength === decompressedLength) ? 'may be right' : 'may be wrong');
//# sourceMappingURL=ts-test.js.map