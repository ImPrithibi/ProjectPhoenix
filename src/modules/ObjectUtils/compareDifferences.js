// code stolen from https://gomakethings.com/getting-the-differences-between-two-objects-with-vanilla-js/

function diff (obj1, obj2) {

    if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
        return obj1;
    }

    let diffs = {};
    let key;


    function arraysMatch(arr1, arr2) {

        if (arr1.length !== arr2.length) return false;

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;

    }

    compare();

    function compare(item1, item2, key) {

        let type1 = Object.prototype.toString.call(item1);
        let type2 = Object.prototype.toString.call(item2);

        if (type2 === '[object Undefined]') {
            diffs[key] = null;
            return;
        }
        if (type1 !== type2) {
            diffs[key] = item2;
            return;
        }

        if (type1 === '[object Object]') {
            var objDiff = diff(item1, item2);
            if (Object.keys(objDiff).length > 0) {
                diffs[key] = objDiff;
            }
            return;
        }

        if (type1 === '[object Array]') {
            if (!arraysMatch(item1, item2)) {
                diffs[key] = item2;
            }
            return;
        }

        if (type1 === '[object Function]') {
            if (item1.toString() !== item2.toString()) {
                diffs[key] = item2;
            }
        } else {
            if (item1 !== item2) {
                diffs[key] = item2;
            }
        }

    }
}

module.exports = diff;