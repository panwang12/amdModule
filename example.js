console.log(31242143)
console.log(module)


//AMD    文件名: foo.js
define(['jquery'], function ($) {
    //    方法
    function myFunc(){};
 
    //    暴露公共方法
    return myFunc;
});

define(['jquery', 'underscore'], function ($, _) {
    // 方法
    function a(){}; // 私有方法，因为没有被返回(见下面)
    function b(){}; // 公共方法，因为被返回了
    function c(){}; // 公共方法，因为被返回了
         //    暴露公共方法
        return {
            b: b,
            c: c
        }
    });


    //commonJS    文件名: foo.js
var $ = require('jquery');
var _ = require('underscore');
 
//    methods
function a(){};    //    私有方法，因为它没在module.exports中 (见下面)
function b(){};    //    公共方法，因为它在module.exports中定义了
function c(){};    //    公共方法，因为它在module.exports中定义了
 
//    暴露公共方法
module.exports = {
    b: b,
    c: c
};



//umd
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    方法
    function myFunc(){};
 
    //    暴露公共方法
    return myFunc;
}));



(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('underscore'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery, root._);
    }
}(this, function ($, _) {
    //    方法
    function a(){};    //    私有方法，因为它没被返回 (见下面)
    function b(){};    //    公共方法，因为被返回了
    function c(){};    //    公共方法，因为被返回了
 
    //    暴露公共方法
    return {
        b: b,
        c: c
    }
}));