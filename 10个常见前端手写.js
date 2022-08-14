// 1.debounce
function debouce(fn, delay) {
  let timer;
  return function () {
    const that = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(that, args);
      timer = null;
    }, delay);
  };
}
function task1() {
  console.log("debounce task");
}
window.addEventListener("scroll", debouce(task1, 1000));

// 2.throttle
function throttle(fn, delay) {
  let last = 0;
  return function () {
    const now = new Date();
    if (now - last <= delay) {
      return;
    }
    last = now;
    fn.apply(this, arguments);
  };
}
function task2() {
  console.log("throttle task");
}
window.addEventListener("scroll", throttle(task2, 1000));

// 3.深拷贝
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (cache.has(obj)) return cache.get(obj);
  let cloneObj = new obj.constructor();
  cache.set(obj, cloneObj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache);
    }
  }
  return cloneObj;
}
const obj = { name: "Jack", address: { x: 100, y: 200 } };
obj.a = obj; // 循环引用
const newObj = deepClone(obj);
console.log(newObj.address === obj.address); // false

// 5.异步控制并发
function limitRequest(urls = [], limit = 3) {
  return new Promise((resolve, reject) => {
    const len = urls.length;
    let count = 0;
    const result = new Array(len).fill(null);

    while (limit > 0) {
      start();
      limit--;
    }

    let index = 0;
    function start() {
      const url = urls[index];
      const i = index;
      index++;
      axios
        .get(url)
        .then(
          (res) => {
            // resolve(res);
            result[i] = res;
          },
          (err) => {
            // reject(err);
            result[i] = err;
          }
        )
        .catch((err) => {})
        .finally(() => {
          if (count === len - 1) {
            resolve();
          } else {
            count++;
            start();
          }
        });
    }
  });
}

// 6.继承
function Parent(name) {
  this.name = name;
}
Parent.prototype.eat = function () {
  console.log(this.name + "is eating");
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
let xm = new Child("xiaoming", 12);
xm.eat(); // xiaoming is eating
