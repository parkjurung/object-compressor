import {compress, decompress} from "../lib/compressor";
import {SAMPLE_PLAIN} from "../sample";

const original = SAMPLE_PLAIN;
const compressResult = compress(original);
const decompressed = decompress(compressResult);

const originalLength = JSON.stringify(original).length;
const compressResultLength = JSON.stringify(compressResult).length;
const decompressedLength = JSON.stringify(decompressed).length;

console.log(' -------- ts test result ---------');
console.log('length of original >>>>>>>>', originalLength);
console.log('length of compressResult >>', compressResultLength);
console.log('length of decompressed >>>>', decompressedLength);
console.log((originalLength === decompressedLength) ? 'may be right' : 'may be wrong');



