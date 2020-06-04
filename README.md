### 预设与插件

### polyfill
 polyfill：对于一些es6的新特性，低版本的浏览器是不支持的，polyfill就是为了可以让低版本的浏览器使用这些新的特性。用于补平各个浏览器之间的差异
 polyfill可以全局引用,在项目入口处(需要npm i -S @babel/polyfill)需要在其他模块引入前引入
 或者在webpack的入口处配置
  ```javascript
    import '@babel/polyfill';
    // 或者
      // entry: ["babel-polyfill", "./app/js"]

  ```
  这种全局的polyfill引用会导致构建时的包体过大，所以可以采用第二种方式按需加在，babel的预设提供了一种按需加在的方式需要配置.babelrc（此时也需要安装@babel/polyfill）
  ```javascript
      "presets": [
    [
      "@babel/preset-env",
      {
      "useBuiltIns": "usage" ,
      "corejs":3
      }
    ]
  ]
  ```
  设置useBuiltIns值为usage，同时需要设置corjs，默认corjs的版本为2，但corjs@2不再添加新特性，所以一些新方法不能使用（如数组的includes），所以使用corjs@3，npm install --save core-js@3


###   @babel/runtime 与 @babel/plugin-transform-runtime 
对于一些新的特性如class，每个使用了新特性的地方都会注入一份_classCallCheck、_defineProperties、_createClass这些方法,随着文件的增多这些方法会被重复注入多次，@babel/plugin-transform-runtime 就是未解决这个问题而生

index.js
```javascript

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


```
test1.js
```javascript

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


```
@babel/plugin-transform-runtime是一个可以重复使用babel注入的程序。@babel/plugin-transform-runtime 需要和 @babel/runtime 配合使用。

使用@babel/plugin-transform-runtime构建出来的代码对于一些新特性如：promise，include会污染原型，如果需要不污染原型可以可以使用@babel/runtime-corejs3，@babel/runtime-corejs3默认会按需引入polyfill。此时预设需要去掉useBuiltIns
```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
      // "useBuiltIns": "usage" ,
      // "corejs":3
      }
    ]
  ],
  "plugins":[
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs":3
      }
    ]
  ]
}
```