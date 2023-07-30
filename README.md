<p align="center">
  <a href="https://www.leibo.group/l-admin-angular/">
    <img width="100" src="https://github.com/lb1129/l-admin-angular/blob/master/src/assets/image/logo.svg">
  </a>
</p>

<h1 align="center">L-ADMIN-ANGULAR</h1>

<p align="center">一个基于 Antd 中后台前端解决方案，提供通用性封装及规范，让开发者更加专注于业务</p>

<p align="center">
  <a href="https://github.com/angular/angular">
    <img src="https://img.shields.io/badge/angular-16.1.0-brightgreen.svg" alt="angular">
  </a>
  <a href="https://github.com/NG-ZORRO/ng-zorro-antd">
    <img src="https://img.shields.io/badge/zorro-16.0.0-brightgreen.svg" alt="ng-zorro-antd">
  </a>
  <a href="https://github.com/lb1129/l-admin-angular/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

## 介绍

`l-admin-angular` 是 `l-admin` 基于 [angular16](https://github.com/angular/angular) 和 [ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd) 的实现

## 特性

- 代码校验
- git 提交校验
- git commit message 校验
- standalone 模式
- 在线主题色切换（@ngx-translate/core）
- 在线多语言切换
- 懒加载
- 基础路由
- 动态路由（用户有多少菜单，则挂多少路由）
- 登录跳转控制
- 操作权限控制
- ~~路由动画~~
- 路由 keep-alive
- http 拦截器封装
- 按模块拆分 serve
- store（@ngrx/store）
- localforage
- LESS
- Typescript

关于路由动画（根据前进后退自动切换动画），由于浏览器的限制，popstate | hashchange 事件仅能知悉历史记录有变化，无法知悉用户到底点击了浏览器的前进还是后退按钮；已处理过的方案：url 上携带 query 唯一标识（支持 hisotry 模式或 hash 模式），在内存中维护一份路由历史，在路由跳转时（结合路由库 vue-router@4.2.0的 beforeEach, react-router@6.11.2的 subscribe, @angular/router@16.1.0的 RouteReuseStrategy），去路由历史中查找是否存在该 url，如果有为后退操作，如果没有为前进操作并加入路由历史并在 sessionStorage 中存一份，在浏览器刷新时还原路由历史；该方案缺点：url 上会携带额外 query

## 在线预览

[预览](https://www.leibo.group/l-admin-angular/)

## 开始使用

```sh
# 克隆项目
git clone https://github.com/lb1129/l-admin-angular.git

# 进入项目目录
cd l-admin-angular

# 安装依赖
npm i

# 启动服务
npm run start | ng serve
```

浏览器访问 http://localhost:4200

## 发布

```sh
# 构建生产环境
npm run build | ng build
```

## 权限控制流程

[详细文档](./PermissionFlow.md)

## 样式校验

基于[stylelint](https://stylelint.io/)进行样式校验，支持校验 `.css` `.less` `.html`，结合[vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)插件在[vscode](https://code.visualstudio.com/)中实时对样式错误或警告进行提示

下述命令行可对所有样式文件（忽略的排除在外）进行校验并对错误及警告尝试修复

```sh
npm run lint:style
```

## 脚本校验

基于[eslint](https://eslint.org/)进行代码校验，结合[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)插件在[vscode](https://code.visualstudio.com/)中实时对脚本错误或警告进行提示

下述命令行可对所有脚本（忽略的排除在外）进行校验并对错误及警告尝试修复

```sh
npm run lint
```

## 代码美化

基于[prettier](https://prettier.io/)进行代码美化，结合[prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)插件在[vscode](https://code.visualstudio.com/)中对文件进行保存时自动美化代码

下述命令行可对所有文件（忽略的排除在外）进行代码美化

```sh
npm run format
```

## TodoTree

基于[vscode](https://code.visualstudio.com/)插件[todo-tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

```sh
// BUG ...
// FIXME ...
// TODO ...
// HACK ...
// XXX ...
// TAG ...
// DONE ...
// NOTE ...
// INFO ...
```

## Git Commit Message 规范

Commit Message 包括 `type`、`scope`、`subject` 三部分，其中 `type`、`subject` 是必须的，而 `scope` 是可选的。

```sh
<type>(<scope>): <subject>
```

**type** 用于说明 commit 的类型，只允许使用下面几个标识：

- **feat** 新功能
- **fix** 修复 bug
- **docs** 仅包含文档的修改
- **style** 格式化变动，不影响代码逻辑。比如删除多余的空白，删除分号等
- **refactor** 重构，既不是新增功能，也不是修改 bug 的代码变动
- **perf** 性能优化
- **test** 增加测试
- **build** 构建工具或外部依赖包的修改，比如更新依赖包的版本等
- **ci** 持续集成的配置文件或脚本的修改
- **chore** 杂项，其他不修改源代码与测试代码的修改
- **revert** 撤销某次提交

## License

[MIT](https://github.com/lb1129/l-admin-angular/blob/master/LICENSE)
