const validation = function (item, min, max, regEx = /.*/) {
    if (
        item == undefined ||
        item.length < min ||
        item.length > max ||
        !regEx.test(item)
    ) return false;
    else return true;
};


export { validation };