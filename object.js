// literal字面量
var stooge = {
  "first-name": "Douglas",
  "last-name": "Crockford",
};

function myCreate(o) {
  var F = function () {};
  F.prototype = o;
  return new F();
}

var another_stooge = myCreate(stooge);

