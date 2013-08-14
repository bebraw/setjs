var set = require('./dist/setjs');

tests();
console.log('all ok!');

function tests() {
    var a = set(1, 2, 3);
    var b = set(2, 3, 4);
    var c = set(10, 12, 13);
    var d = set(5, 5, 5); // {5, }
    var e = set(d, 1); // {5, 1}

    assert(set.count(a) == 3, 'should be able to count');

    assert(set.contains(e, 5), 'should contain other set');
    assert(set.contains(e, 1), 'should contain added number');
    assert(set.contains(e, d), 'should contain another set');
    assert(set.contains(a, a), 'should contain itself');
    assert(!set.contains(a, b), 'should not contain another set');

    assert(set.equals(set(), set()), 'should equal with empty sets');
    assert(set.equals(set.union(a, b, d), set(1, 2, 3, 4, 5)), 'should union');
    assert(set.equals(set.intersection(a, b), set(2, 3)), 'should intersect');
    assert(set.equals(set.intersection(a, b, set(2)), set(2)), 'should intersect with many');
    assert(set.equals(set.difference(b, a), set(4)), 'should differ');
    assert(set.equals(set.difference(b, a, set(4)), set()), 'should differ with many');
    assert(set.equals(set.symmetricDifference(b, a), set(1, 4)), 'should differ symmetrically');

    a[4] = true;
    assert(set.count(a) == 4, 'should be larger after adding');

    delete a[4];
    assert(set.count(a) == 4, 'true immutability, cannot delete');
}

function assert(s, msg) {
    if(!s) throw new Error('Assertion failed! ' + msg);
}
