

2  Swith語句的替代方案

```js
// Switch
let createType = null;
switch (contentType) {
  case "post":
    createType = () => console.log("creating a post...");
    break;
  case "video":
    createType = () => console.log("creating a video...");
    break;
  default:
    createType = () => console.log('unrecognized content type');
}

createType();

// Object literal
const contentTypes = {
  post: () => console.log("creating a post..."),
  video: () => console.log("creatinga  video..."),
  default: () => console.log('unrecognized content type')
};

const createType = contentTypes[contentType] || contentTypes['default'];
createType();
```