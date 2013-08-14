// inspired by http://docs.python.org/2/library/sets.html
function set() {
    function Set() {}
    var ret = new Set();
    var arg, i, len;

    for(i = 0, len = arguments.length; i < len; i++) {
        arg = arguments[i];

        if(arg.constructor.name == 'Set') Object.keys(arg).filter(
            not(prop.bind(undefined, ret))
        ).forEach(addElem.bind(undefined, ret));
        else if(!(arg in ret)) addElem(ret, arg);
    }

    return Object.preventExtensions(ret);
}

function addElem(set, key) {
    Object.defineProperty(set, key, {
        get: id.bind(undefined, true),
        enumerable: true
    });
}

function prop(o, v) {
    return o[v];
}

function id(a) {
    return a;
}

function count(a) {
    return Object.keys(a).length;
}
set.count = count;

function equals(a, b) {
    return contains(a, b) && contains(b, a);
}
set.equals = equals;

function contains(a, b) {
    if(b.constructor.name == 'Set') {
        var bKeys = Object.keys(b);

        return bKeys.filter(contains.bind(null, a)).length == bKeys.length;
    }

    // needed because "in" takes prototype in count
    // ("watch" gives false positive on gecko)
    return b in a && a.hasOwnProperty(b);
}
set.contains = contains;

function union() {
    var keys = [];
    var i, len;

    for(i = 0, len = arguments.length; i < len; i++) {
        keys.push.apply(keys, Object.keys(arguments[i]));
    }

    return set.apply(null, keys);
}
set.union = union;

function intersection() {
    return setKernel(not(contains)).apply(null, arguments);
}
set.intersection = intersection;

function not(fn) {
    return function() {
        return !fn.apply(null, arguments);
    };
}

function difference() {
    return setKernel(contains).apply(null, arguments);
}
set.difference = difference;

function setKernel(check) {
    return function() {
        var ret = {};
        var args = arguments;
        var a = args[0];

        Object.keys(a).forEach(function(v) {
            var match = true;
            var i, len;

            for(i = 1, len = args.length; i < len; i++) {
                if(check(args[i], v)) {
                    match = false;
                    break;
                }
            }

            if(match) ret[v] = true;
        });

        return set.apply(null, Object.keys(ret));
    };
}

function symmetricDifference(a, b) {
    return union(difference(a, b), difference(b, a));
}
set.symmetricDifference = symmetricDifference;
