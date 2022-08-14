// 1. https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/143

// 2.
var tree = [
  {
    id: 1,
    value: "a",
    children: [
      {
        id: 2,
        value: "22",
      },
      {
        id: 3,
        value: "c",
        children: [
          {
            id: "31",
            value: "dd",
          },
        ],
      },
    ],
  },
  {
    id: 11,
    value: "b",
  },
];
// 实现方法遍历tree;
travrse(tree, (item, index, parent) => {
  console.log(item, index, parent);
});

function travrse(tree, callback, p = null) {
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    callback(item, i, p);
    if (item.children) {
      travrse(item.children, callback, item);
    }
  }
}

// 3.react 题目：https://codepen.io/gaving/pen/GRyEWbx?editors=0010

function flat(arr) {
  return arr.reduce((p, c) => {
    return p.concat(Array.isArray(c) ? flat(c) : c);
  }, []);
}

// debunce
function debunce(fn, delay = 200) {
  let timer;
  return function () {
    const that = this;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn.apply(that, arguments), delay);
  };
}

// throttle
function throttle(fn, delay) {
  let timer;
  return function () {
    if (timer) {
      return;
    }

    fn.apply(this, arguments);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

// 3.爬楼梯
// 我以为的记忆写法：

function clim(n) {
  const res = [0, 1, 2];
  return (function () {
    if (res[n] === undefined) {
      res[n] = clim(n - 1) + clim(n - 2);
    }
    return res[n];
  })();
}
/** 错误分析：
 * 输入：n
 * 输出：值
 * 过程：
 *  1. 声明res
 *  2. 创建匿名函数
 * 每次调用clim都会重新声明res，res并不是共用，没有达到记忆功能
 */

// 实际的记忆写法：
const clim = (function () {
  const res = [0, 1, 2];
  const recur = function (n) {
    if (res[n] === undefined) {
      res[n] = recur(n - 1) + recur(n - 2);
    }
    return res[n];
  };
  return recur;
})();

/** 函数调用
 *
 */
// 函数字面量
const add = function (a, b) {
  return a + b;
};
//  1. 方法调用模式 this可以访问到所属的对象
// 超级延迟绑定very-late-binding
const myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === "number" ? inc : 1;
  },
};
// 2. 函数调用模式
myObject.double = function () {
  const that = this;
  const helper = function () {
    that.value = that.value + that.value;
  };
  helper(); // 以函数形式调用helper，this被绑定到全局对象
};

// 3. 构造器调用模式
var Quo = function (string) {
  this.status = string;
};
Quo.prototype.get_status = function () {
  return this.status;
};
// 改造Quo
var Quo = function (status) {
  return {
    get_status: function () {
      return status;
    },
  };
};
// 4. Apply调用模式
var array = [3, 4];
// es6: add(...array)
add.apply(null, array);

// 扩充类型的功能 Augmenting Types
// 我以为的：
Function.prototype.method = function (name, fn) {
  this[name] = fn; // this的指向关键看怎么调用，这里的目的是给构造函数调用的，方法加在了函数对象上，而不是原型
};
// 实际上：
Function.prototype.method = function (name, fn) {
  this.prototype[name] = fn;
  return this;
};

Number.method("integer", function () {
  return Math[this < 0 ? "ceil" : "floor"](this);
});
// 实现一下Object.create
Object.create = function (o) {
  var F = function () {};
  F.prototype = o;
  return new F();
};

// 递归
var walk_the_DOM = function walk(node, fn) {
  fn(node);
  node = node.firstChild;
  while (node) {
    walk(node, fn);
    node = node.nextSibling;
  }
};

var getElementsByAttribute = function (att, value) {
  var res = [];
  walk_the_DOM(document.body, function (node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (
      typeof actual === "string" &&
      (actual === value || typeof value !== "string")
    ) {
      res.push(node);
    }
  });
  return res;
};

// 深度优先
function dfs(node, fn) {
  fn(node);
  if (node.children) {
    node.children.forEach((item) => dfs(item, fn));
  }
}

// 闭包：函数可以访问创建它的环境上下文
var myObject = (function () {
  var value = 0;
  return {
    increment: function (inc) {
      value += typeof inc === "number" ? inc : 1;
    },
    getValue: function () {
      return value;
    },
  };
})();

// 定义函数：设置一个DOM结点为黄色，渐变为白色
function fade(node) {
  var level = 0;
  var step = function () {
    var hex = level.toString(16);
    // node.style.backgroundColor = "#ffff" + hex + hex;
    console.log(level);
    if (level < 15) {
      level++;
      setTimeout(step, 100);
    }
  };

  step();
}

var fade2 = function (node) {
  var level = 1;
  var step = function () {
    console.log(level);
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

//
for (var i = 0; i < 6; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

for (var i = 0; i < 6; i++) {
  (function (x) {
    setTimeout(() => {
      console.log(x);
    }, 0);
  })(i);
}

// curry
var add1 = add.curry(1);
Function.prototype.curry = function () {
  var args = arguments;
  var that = this;
  var slice = Array.prototype.slice;
  return function () {
    return that.apply(null, slice.call(args).concat(slice.call(arguments)));
  };
};

observer =
  ((value) => {
    console.log(value);
  },
  (error) => {
    console.log("Error: ", error);
  },
  () => {
    console.log("complete");
  });
source.subscribe(observer);
