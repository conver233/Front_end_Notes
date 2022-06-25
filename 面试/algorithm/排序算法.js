// 冒泡排序
// 思想：1.冒泡：两两比较，较大的往后移动；2.一次冒泡会得到一个最大的元素，循环n-1次完成排序
function bubble(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let flag; // 优化算法
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = true;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (!flag) {
      break;
    }
  }
}
let arr = [8, 2, 345, 23, 63, 6];
bubble(arr);

// 插入排序
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const value = array[i];
    let j = i - 1;
    for (; j >= 0; j--) {
      if (array[j] > value) {
        array[j + 1] = array[j];
      } else {
        break;
      }
    }
    array[j + 1] = value;
  }
  return array;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

// 归并排序
function mergeSort(arr) {
  const merge = (arr1, arr2) => {
    const temp = [];
    while (arr1.length && arr2.length) {
      if (arr1[0] < arr2[0]) {
        temp.push(arr1.shift());
      } else {
        temp.push(arr2.shift());
      }
    }
    return [...temp, ...arr1, ...arr2];
  };

  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  const m = Math.floor(len / 2);
  const left = arr.slice(0, m);
  const right = arr.slice(m);
  return merge(mergeSort(left), mergeSort(right));
}

// 快速排序
function quickSort(arr) {
  quickSort_c(arr, 0, arr.length - 1);
  return arr;
}
function quickSort_c(arr, lo, hi) {
  if (lo >= hi) {
    return;
  }
  const p = partition(arr, lo, hi);
  quickSort_c(arr, lo, p - 1);
  quickSort_c(arr, p + 1, hi);
}
function partition(arr, lo, hi) {
  pivot = arr[lo];
  let i = lo + 1;
  let j = hi;
  while (i <= j) {
    // [lo,i) <= pivot, (j,hi]>pivot
    while (i < hi && arr[i] <= pivot) {
      i++;
    }
    while (j > lo && arr[j] > pivot) {
      j--;
    }
    if (i >= j) {
      break;
    }
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  [arr[lo], arr[j]] = [arr[j], arr[lo]];
  return j;
}

// 第k小元素
function findK(arr, k) {
  return findK_c(arr, 0, arr.length - 1, k);
}
function findK_c(arr, left, right, k) {
  p = partition(arr, left, right);
  if (left > right) {
    return -1;
  }
  if (p + 1 === k) {
    return arr[p];
  } else if (p + 1 > k) {
    return findK_c(arr, left, p - 1, k);
  } else {
    return findK_c(arr, p + 1, right, k);
  }
}
