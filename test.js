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