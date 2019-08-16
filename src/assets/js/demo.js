"use strict";
exports.__esModule = true;
var Whut;
(function (Whut) {
    var name = 'name';
    function getName() {
        return name;
    }
    Whut.getName = getName;
    function setName(str) {
        name = str;
    }
    Whut.setName = setName;
})(Whut || (Whut = {}));
var globalVal = 'globalValue';
function getGlobal() {
    return globalVal;
}
exports.getGlobal = getGlobal;
exports["default"] = Whut;
