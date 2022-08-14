// 1.重写console.log

// 2.链式调用
function add(n) {
  let count = n;
  const fn = (x) => {
    if (x !== undefined) {
      count += x;
      return fn;
    } else {
      return count;
    }
  };
  return fn;
}
// 3. 数组转树结构
const list = [
  { id: 0, parentId: null, name: "根节点" },
  { id: 1, parentId: 0, name: "子节点1" },
  { id: 2, parentId: 0, name: "子节点2" },
  { id: 3, parentId: 0, name: "子节点3" },
  { id: 4, parentId: 1, name: "孙结点" },
];
// 复杂度较高
// function toTree(list) {
//   const findChildren = function (id) {
//     const children = list.filter((item) => item.parentId === id);
//     children.forEach((child) => {
//       const { id } = child;
//       child.children = findChildren(id);
//     });
//     return children;
//   };

//   let tree;
//   list.forEach((item) => {
//     const { id, parentId, name } = item;
//     if (parentId === null) {
//       tree = item;
//       tree.children = findChildren(id);
//     }
//   });
//   return tree;
// }
let data = [
  { id: 0, parentId: null, name: "生物" },
  { id: 1, parentId: 0, name: "动物" },
  { id: 2, parentId: 0, name: "植物" },
  { id: 3, parentId: 0, name: "微生物" },
  { id: 4, parentId: 1, name: "哺乳动物" },
  { id: 5, parentId: 1, name: "卵生动物" },
  { id: 6, parentId: 2, name: "种子植物" },
  { id: 7, parentId: 2, name: "蕨类植物" },
  { id: 8, parentId: 4, name: "大象" },
  { id: 9, parentId: 4, name: "海豚" },
  { id: 10, parentId: 4, name: "猩猩" },
  { id: 11, parentId: 5, name: "蟒蛇" },
  { id: 12, parentId: 5, name: "麻雀" },
];
function toTree(list) {
  const map = {};
  list.forEach((item) => (map[item.id] = item));

  let tree;
  list.forEach((item) => {
    const pNode = map[item.parentId];
    if (pNode) {
      pNode.children ? pNode.children.push(item) : (pNode.children = [item]);
    } else {
      tree = item;
    }
  });
  return JSON.parse(JSON.stringify(tree));
}

// let data = [
//   { id: 0, parentId: null, name: "生物" },
//   { id: 1, parentId: 0, name: "动物" },
//   { id: 2, parentId: 0, name: "植物" },
//   { id: 3, parentId: 0, name: "微生物" },
//   { id: 4, parentId: 1, name: "哺乳动物" },
//   { id: 5, parentId: 1, name: "卵生动物" },
//   { id: 6, parentId: 2, name: "种子植物" },
//   { id: 7, parentId: 2, name: "蕨类植物" },
//   { id: 8, parentId: 4, name: "大象" },
//   { id: 9, parentId: 4, name: "海豚" },
//   { id: 10, parentId: 4, name: "猩猩" },
//   { id: 11, parentId: 5, name: "蟒蛇" },
//   { id: 12, parentId: 5, name: "麻雀" },
// ];
// function transTree(data) {
//   let result = [];
//   let map = {};
//   if (!Array.isArray(data)) {
//     //验证data是不是数组类型
//     return [];
//   }
//   data.forEach((item) => {
//     //建立每个数组元素id和该对象的关系
//     map[item.id] = item; //这里可以理解为浅拷贝，共享引用
//   });
//   data.forEach((item) => {
//     let parent = map[item.parentId]; //找到data中每一项item的爸爸
//     if (parent) {
//       //说明元素有爸爸，把元素放在爸爸的children下面
//       (parent.children || (parent.children = [])).push(item);
//     } else {
//       //说明元素没有爸爸，是根节点，把节点push到最终结果中
//       result.push(item); //item是对象的引用
//     }
//   });
//   return result; //数组里的对象和data是共享的
// }
// transTree(data);

// 4. format 时间
function formatNow(date, str) {
  const template = {
    "y+": date.getFullYear(),
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let key in template) {
    str = str.replace(new RegExp(key), (match) => {
      const n = match.length;
      let r = String(template[key]).slice(-n);
      while (r.length < n) {
        r = "0" + r;
      }
      return r;
    });
  }
  return str;
}
