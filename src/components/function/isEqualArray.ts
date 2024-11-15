// 配列が等しいか判定
export const isEqualArray = (array1: Array<number>, array2: Array<number>) =>  {
    var i = array1.length;
    if (i !== array2.length) return false;

    while (i--) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
};