module.exports = function compare(obj1, obj2, options = {}) {
    if (obj1 === obj2) return true;
    if (!(typeof obj1 == "object") || !(typeof obj2 == "object")) return false;
    for (let property in obj2) {
        if (options.excludes && options.excludes.includes(property)) continue;
        if (obj1[property] !== obj2[property] && !compare(obj1[property], obj2[property], options)) return false;
    }
    return true;
}