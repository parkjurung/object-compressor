export declare function compress(object: any): {
    o: any;
    d: {
        [min: string]: string;
    };
};
export declare function decompress(compressResult: {
    o: any;
    d: {
        [min: string]: string;
    };
}): any;
