let objComp = require('../index');
let sample = require('../sample');

const original = sample.SAMPLE_PLAIN;
const compressResult = objComp.compress(original);
const decompressed = objComp.decompress(compressResult);

const originalLength = JSON.stringify(original).length;
const compressResultLength = JSON.stringify(compressResult).length;
const decompressedLength = JSON.stringify(decompressed).length;

console.log(' -------- js test result ---------');
console.log('length of original >>>>>>>>', originalLength);
console.log('length of compressResult >>', compressResultLength);
console.log('length of decompressed >>>>', decompressedLength);
console.log((originalLength === decompressedLength) ? 'may be right' : 'may be wrong');



