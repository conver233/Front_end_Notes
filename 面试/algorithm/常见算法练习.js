// 防抖
function debounce1(fn, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    const that = this;
    timer = setTimeout(function () {
      fn.apply(that, arguments);
    }, delay || 200);
  };
}

// 节流
function throttle1(fn, delay) {
  let timer;
  return function () {
    if (timer) {
      return;
    }
    const that = this;
    fn.apply(that, arguments);
    timer = setTimeout(() => {
      timer = null;
    }, delay || 200);
  };
}

// bind

// promise

// 爬楼梯 https://leetcode-cn.com/problems/climbing-stairs/
function climbStairs(n) {
  if (!n) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  // 每一步可以选择爬1阶，2阶
  return climbStairs(n - 1) + climbStairs(n - 2);
}

function dayOfYear(year, month, day) {
  if (month < 1 || month > 12 || day < 1) {
    return -1;
  }
  const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeap =
    (year % 4 === 0 && year % 100 !== 0) ||
    (year % 400 === 0 && year % 3200 !== 0) ||
    year % 172800 === 0;
  if (isLeap) {
    monthDay[1] = 29;
  }
  if (day > monthDay[month - 1]) {
    return -1;
  }
  let res = 0;
  for (let i = 0; i < month - 1; i++) {
    res += monthDay[i];
  }
  return res + day;
}

// 1.快排
// 非原地
function myQuickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const m = Math.floor(arr.length / 2);
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === m) {
      continue;
    }
    if (arr[i] <= arr[m]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return myQuickSort(left).concat(arr[m], myQuickSort(right));
}

// 2.深拷贝
function deepClone(obj) {
  const res = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (typeof element === "object") {
        res[key] = deepClone(element);
      } else {
        res[key] = element;
      }
    }
  }
  return res;
}

// 3.节流
function throttle(fn, delay) {
  let timer;
  return function () {
    //   const self = this;
    if (timer) {
      return;
    }
    fn.apply(this, arguments);
    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

// 4.防抖
function debounce(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    const self = this;
    timer = setTimeout(function () {
      fn.apply(self, arguments);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

// 矩阵
function setZero(arr) {
  const rows = {};
  const cols = {};
  const rowLength = arr.length;
  const colLength = arr[0].length;
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (arr[i][j] === 0) {
        rows[i] = true;
        cols[j] = true;
        break;
      }
    }
  }
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (rows[i] || cols[j]) {
        arr[i][j] = 0;
      }
    }
  }
}

function setZero2(arr) {
  const rows = arr.length;
  const cols = arr[0].length;
  let colFlag = false;
  for (let i = 0; i < rows; i++) {
    if (arr[i][0] === 0) {
      colFlag = true;
    }
    for (let j = 1; j < cols; j++) {
      if (arr[i][j] === 0) {
        arr[i][0] = arr[0][j] = 0;
      }
    }
  }

  for (let i = rows; i > 0; i--) {
    for (let j = 1; j < cols; j++) {
      if (arr[i][0] || arr[0][j]) {
        arr[i][j] = 0;
      }
    }
    if (colFlag) {
      arr[i][0] = 0;
    }
  }
}

// 异或运算
function xor(arr) {
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    res ^= arr[i];
  }
  return res;
}

// 迷宫
function outMaze(maze, entrance) {
  const [i, j] = entrance;
}

function dfsMaze(maze, entrance, res) {
  const [i, j] = entrance;
  if (maze[i][j] === "+") {
    return -1;
  }
  if (maze[i - 1][j] === ".") {
  }
  if (maze[i][j - 1] === ".") {
  }
  if (maze[i + 1][j] === ".") {
  }
  if (maze[i][j + 1] === ".") {
  }
}

// 3回文
function countStr(str) {
  let count = 0;
  for (let i = 0; i < 26; i++) {
    const code = 97 + i;
    let left = -1,
      right = -1;
    for (let j = 0; j < str.length; j++) {
      if (str[j].codePointAt() === code) {
        if (left === -1) {
          left = j;
        } else {
          right = j;
        }
      }
    }
    const hash = {};
    if (right - left >= 2) {
      for (let m = left + 1; m < right; m++) {
        if (!hash[str[m]]) {
          count++;
          hash[str[m]] = true;
        }
      }
    }
  }
  return count;
}

// myPow
function myPow(m, n) {
  return n < 0 ? 1 / myPowChild(m, n) : myPowChild(m, n);
}
function myPowChild(m, n) {
  let res = 1;
  let pows = m;
  while (n > 0) {
    if (n % 2) {
      res *= pows;
    }
    pows *= pows;
    n = Math.floor(n / 2);
  }
  return res;
}

// 已知如下数组：
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
function bfsArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i];
  }
}

// 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
function mergeArr(arr1, arr2) {
  const res = [];
  let j = 0;
  let i = 0;
  while (j < arr2.length) {
    while (i < arr1.length) {
      if (arr1[i][0] === arr2[j]) {
        res.push(arr1[i]);
        i++;
      } else {
        res.push(arr2[j]);
        j++;
      }
    }
    res.push(arr2[j]);
    j++;
  }
  return res;
}

// 第 31 题：改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。
// for (var i = 0; i< 10; i++){
// 	setTimeout(() => {
// 		console.log(i);
//     }, 1000)
// }
for (var i = 0; i < 10; i++) {
  (function (x) {
    setTimeout(() => {
      console.log(x);
    }, 1000);
  })(i);
}

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// 手写flat
// 1.迭代方式
function flatArr(list) {
  while (list.some((item) => Array.isArray(item))) {
    list = [].concat(...list);
  }
  return list;
}
function flatArr(list) {
  const res = [];
  while (list.length) {
    const val = list.shift();
    if (Array.isArray(val)) {
      list.unshift(...val);
    } else {
      res.push(val);
    }
  }
  return res;
}
// 2. 递归方式
function flatArr(arr, res = []) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatArr(arr[i], res);
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

// 冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let flag = true;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (flag) {
      // 优化：没有数据交换，提前退出
      break;
    }
  }
}

// 某公司 1 到 12 月份的销售额存在一个对象里面
// 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
function getList(obj) {
  return Array.from({ length: 12 }).map((_, index) => {
    return obj[index + 1] || null;
  });
}

/**
 * 按要求设计LazyMan
 * LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
 */

// function LazyMan(name) {
//   console.log("Hi I am " + name);
// }
// LazyMan.prototype.eat = function (str) {
//   console.log("I am eating " + str);
//   return this;
// };
// LazyMan.prototype.sleepFirst = function () {

// };
// LazyMan.prototype.sleep = function (delay) {

// };
class LazyManClass {
  constructor(name) {
    this.taskList = [];
    console.log("Hi I am " + name);
    setTimeout(this.next.bind(this));
  }

  next() {
    const fn = this.taskList.shift();
    fn && fn();
  }

  eat(str) {
    // const fn = (function (str) {
    this.taskList.push(() => {
      console.log("I am eating " + str);
      this.next();
    });
    // })(name);
    return this;
  }

  sleepFirst(sec) {
    this.taskList.unshift(() => {
      setTimeout(() => {
        console.log(`等待了${sec}秒...`);
        this.next();
      }, sec * 1000);
    });
    return this;
  }

  sleep(sec) {
    this.taskList.push(() => {
      setTimeout(() => {
        console.log(`等待了${sec}秒...`);
        this.next();
      }, sec * 1000);
    });
    return this;
  }
}
function LazyMan(name) {
  return new LazyManClass(name);
}

// 模拟实现Promise.finally
Promise.prototype.finally = function (callback) {
  const P = this.constructor; // 获取构造函数引用
  this.then(
    (res) => P.resolve(callback()).then((_) => res),
    (err) =>
      P.resolve(callback()).then((_) => {
        throw err;
      })
  );
};
