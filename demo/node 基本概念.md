## 1.Node.js是什么

### 1.1 简介
- Node.js不是一种独立的语言，与PHP、JSP、Python、Perl、Ruby的“既是语言，也是平台”不同，Node.js的使用JavaScript进行编程，运行在JavaScript引擎上（V8）。
- 与PHP、JSP等相比（PHP、JSP、.net都需要运行在服务器程序上，Apache、Naginx、Tomcat、IIS。
），Node.js跳过了Apache、Naginx、IIS等HTTP服务器，它自己不用建设在任何服务器软件之上。Node.js的许多设计理念与经典架构（LAMP = Linux + Apache + MySQL + PHP）有着很大的不同，可以提供强大的伸缩能力。**Node.js没有web容器**

Node.js自身哲学，是花最小的硬件成本，追求更高的并发，更高的处理性能。

### 1.2 特点
#### 1.2.1 单线程
  在Java、PHP或者.net等服务器端语言中，会为每一个客户端连接创建一个新的线程。而每个线程需要耗费大约2MB内存。也就是说，理论上，一个8GB内存的服务器可以同时连接的最大用户数为4000个左右。要让Web应用程序支持更多的用户，就需要增加服务器的数量，而Web应用程序的硬件成本当然就上升了。

  Node.js不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞I/O、事件驱动机制，让Node.js程序宏观上也是并行的。使用Node.js，一个8GB内存的服务器，可以同时处理超过4万用户的连接。

  优缺点：
  - 优点, 还有操作系统完全不再有线程创建、销毁的时间开销。
  - 缺点, 就是一个用户造成了线程的崩溃，整个服务都崩溃了，其他人也崩溃了。

#### 1.2.2 非阻塞I/O
  例如，当在访问数据库取得数据的时候，需要一段时间。在传统的单线程处理机制中，在执行了访问数据库代码之后，整个线程都将暂停下来，等待数据库返回结果，才能执行后面的代码。也就是说，I/O阻塞了代码的执行，极大地降低了程序的执行效率。

  由于Node.js中采用了非阻塞型I/O机制，因此在执行了访问数据库的代码之后，将立即转而执行其后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序的执行效率。

  当某个I/O执行完毕时，将以事件的形式通知执行I/O操作的线程，线程执行这个事件的回调函数。为了处理异步I/O，线程必须有事件循环，不断的检查有没有未处理的事件，依次予以处理。

#### 1.2.3 事件驱动
  在Node中，客户端请求建立连接，提交数据等行为，会触发相应的事件。在Node中，在一个时刻，只能执行一个事件回调函数，但是在执行一个事件回调函数的中途，可以转而处理其他事件（比如，又有新用户连接了），然后返回继续执行原事件的回调函数，这种处理机制，称为“事件环”机制。

#### 1.2.4 总结
  首先，Node不为每个用户开辟一个线程，所以非常极端的选择了单线程。单线程，要照顾所有的用户，那么就必须有非阻塞I/O，否则一个人的I/O就把别人、自己都阻塞了。一旦有非阻塞I/O，一个人如果I/O去了，就会放弃CPU的使用权，换成另一个人使用CPU（或者执行此人后面的语句）。所以CPU的利用率100%。第一个人I/O结束了，就要用事件来通知线程，执行回调函数。此时必须有事件环，就有一个排队调度机制。Node中有超过半数的C++代码，在搭建事件环。

### 1.3 Node适合做什么
  当应用程序需要处理大量并发的I/O，而在向客户端发出响应之前，应用程序内部并不需要进行非常复杂的处理的时候，Node.js非常适合。Node.js也非常适合与web socket配合，开发长连接的实时交互应用程序。

  比如：
  - 用户表单收集
  - 考试系统
  - 聊天室
  - 图文直播

### 1.4 Node生态非常好
  - npm
  - Jade
  - Express
  - Mongodb

## 2. Node安装
### 1. 下载地址
  官网： https://nodejs.org/en/

### 2. 测试安装
  在cmd中，输入node -v就能够查看nodejs的版本。

### 3. REPL (交互式解释器)
  Node.js REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。

  Node 自带了交互式解释器，可以执行以下任务：
  - 读取 - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
  - 执行 - 执行输入的数据结构
  - 打印 - 输出结果
  - 循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出。

  命令与特殊键:
  - break - 在输入多行表达式的过程中，输入.break 命令（或按下 <ctrl>-C 组合键）将终止表达式的继续输入。
  - clear - 复位 REPL context，使之成为空的对象并清除所有当前输入的多行表达式。
  - exit - 关闭输入输出界面，导致 REPL 退出。
  - help - 显示特定命令的帮助列表。
  - save - 保存当前 REPL 会话到一个文件： > .save ./file/to/save.js
  - load - 读取一个文件到当前 REPL 会话。 > .load ./file/to/load.js
  - editor 进入编辑模式（<ctrl>-D 完成，<ctrl>-C 取消）
### 4. 调试
  node --inspect index.js

### 5. supervisor
  在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：`npm install -g supervisor`

  运行 `supervisor --harmony index` 启动程序

## 3. 模块
  Node.js中，将很多的功能，划分为了一个个module。
  如：
  - Http
  - repl
  - url
  - querystring
  - fs (文件)
  - crypto (加密)
  - 第三方的模块

### 1. HTTP模块
  request中的属性有4个：
  - url：发送请求的网站
  - method：请求的方式
  - headers: http请求的所有的http头部信息

### 2. url 模块
以下详情描述了一个解析后的 URL 的每个组成部分。 例子，`http://user:pass@host.com:8080/p/a/t/h?query=string#hash`：

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                    href                                     │
├──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┤
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          ││           │          │      │          │ │              │       │
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘
```
  方法：
  - url.parse() 方法会解析一个 URL 字符串并返回一个 URL 对象。
  - url.resolve() 方法会以一种 Web 浏览器解析超链接的方式把一个目标 URL 解析成相对于一个基础 URL。

### 3. querystring 模块
  querystring 模块提供了一些实用工具，用于解析与格式化 URL 查询字符串

  方法：
  - querystring.parse('foo=bar&abc=xyz&abc=123')
  或者 querystring.parse('foo,bar|abc,xyz|abc,123','|',',' )
  - querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })

### 4. fs


### 5. exports和module.exports的区别
  参考： https://cnodejs.org/topic/5231a630101e574521e45ef8

  概括为：
  1. module.exports 初始值为一个空对象 {};
  2. exports 是指向的 module.exports 的引用;
  3. require() 返回的是 module.exports 而不是 exports;

## 4. npm

### 4.1 NPM是随同NodeJS一起安装的包管理工具
  npm -v
  可以用`npm install npm -g`升级npm的版本

### 4.2 安装模块
  npm 官网： https://www.npmjs.com/

  帮助: `npm -l`, `npm install -h`

  用法：`npm install <Module Name>`

  例如：
  1. npm i express --save/npm i express -S (安装 express，同时将 "express": "^4.14.0" 写入 dependencies )
  2. npm i express --save-dev/npm i express -D (安装 express，同时将 "express": "^4.14.0" 写入 devDependencies )
  3. npm i express --save --save-exact (安装 express，同时将 "express": "4.14.0" 写入 dependencies )

  第三种方式将固定版本号写入 dependencies，建议线上的 Node.js 应用都采取这种锁定版本号的方式，因为你不可能保证第三方模块下个小版本是没有验证 bug 的，即使是很流行的模块。

  使用nrm: `npm i nrm -g` --> 切换到 cnpm `nrm use cnpm`
  nrm 是一个管理 npm 源的工具。用过 ruby 和 gem 的同学会比较熟悉，通常我们会把 gem 源切到国内的淘宝镜像，这样在安装和更新一些包的时候比较快。nrm 同理，用来切换官方 npm 源和国内的 npm 源（如: cnpm），当然也可以用来切换官方 npm 源和公司私有 npm 源。

## 5. 模板引擎
  EJS

## 6. Express框架

### 6.1 为什么使用express
  - 原生Node开发，会发现有很多问题。比如：
  - 呈递静态页面很不方便，需要处理每个HTTP请求，还要考虑304问题
  - 路由处理代码不直观清晰，需要写很多正则表达式和字符串函数
  - 不能集中精力写业务，要考虑很多其他的东西

### 6.2 路由

### 6.3 中间件
  如果我的的get、post回调函数中，没有next参数，那么就匹配上第一个路由，就不会往下匹配了。如果想往下匹配的话，那么需要写next()

  ```
  app.get("/",function(req,res,next){
      console.log("1");
      next();
  });

  app.get("/",function(req,res){
    console.log("2");
  });
  ```

## 7. MongoDB
