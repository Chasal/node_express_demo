
### 项目运行

```
git clone git@git.augmentum.com.cn:Thomas.Li/node-express-demo.git

cd node-express-demo

npm install

```

### 编译环境
```
npm start

访问 http://localhost:3000
```

### 使用express-generator 快速搭建框架

```
使用帮助： express -h

安装： npm install express-generator -g

初始化：express --view=ejs
```

### 目录结构
```
├─bin
├─public
│  ├─images
│  ├─javascripts
│  └─stylesheets
├─routes
└─views
```

### 使用bower

自定义包的安装目录：
新建 `.bowerrc`
```
{
  "directory" : "public/javascripts"
}
```
初始化：
```
bower init
```
包的安装：
```
bower install jquery --save
```

### 开发热部署
supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。

```
安装
npm install -g supervisor
启动
supervisor --harmony index
```


### node调试

> node --inspect=9222 index.js


### 模块
1. body-parser
