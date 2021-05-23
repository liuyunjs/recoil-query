# recoil-query

recoil 的 selector 默认只会初始化一次，但是我们在使用时经常会需要对数据进行刷新的；
本插件是对于 [**recoil**](https://github.com/facebookexperimental/Recoil/) 的 [**selector**](https://recoiljs.org/docs/guides/asynchronous-data-queries#query-refresh) api 的封装，增加刷新的功能；

## Install

```javascript
  // yarn
  yarn add recoil recoil-query

  // npm
  npm install recoil recoil-query --save
```

## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { useRecoilValue, RecoilRoot } from 'recoil';
import { query, useQueryRefresh } from 'recoil-query';

const example = query({
  key: 'example',
  get() {
    return fetch('https://cnodejs.org/api/v1/topics').then((res) => res.json());
  },
});

function App() {
  const refreshExampleValue = useQueryRefresh(example);
  const exampleValue = useRecoilValue(example);

  console.log('exampleValue', exampleValue);

  return (
    <div
      style={{ fontSize: 20 }}
      onClick={() => {
        refreshExampleValue();
      }}>
      Refresh Example Value
    </div>
  );
}

ReactDOM.render(
  <RecoilRoot>
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  </RecoilRoot>,
  document.getElementById('root'),
);
```

## Api

| 名称                                                                            | 描述            | 参数                                                                              | 返回值                                                                            |
| ------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [**query**](https://recoiljs.org/docs/api-reference/core/selector)              | 选择器          | 同[**query**](https://recoiljs.org/docs/api-reference/core/selector)              | 同[**query**](https://recoiljs.org/docs/api-reference/core/selector)              |
| [**queryFamily**](https://recoiljs.org/docs/api-reference/utils/selectorFamily) | 选择器组        | 同[**queryFamily**](https://recoiljs.org/docs/api-reference/utils/selectorFamily) | 同[**queryFamily**](https://recoiljs.org/docs/api-reference/utils/selectorFamily) |
| **useQueryRefresh**                                                             | 刷新数据的 hook | void                                                                              | () => void                                                                        |
