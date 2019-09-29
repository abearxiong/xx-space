# 一个使用Github搭建的个人站点的单页应用

> 主页面的博客，是通过Jkeyll和Ruby的，使用Github的静态博客搭建，副应用，比如这些比较有用的思考的一些应用网站，不直接集成在Github的静态博客当中，通过其他仓库的集成方式，使得可以通过Github来搭建完整的一个博客应用的体系。

## 介绍

Github的静态博客可以搭建静态页面，issues可以搭建评论系统，其他的仓库集成静态页面，可以实现一些单页面的功能。

本应用的功能特点是： 通过issues来写入某一天随意想到的一些点子，可以对之前想到的点子进行查看和显示。


后期发现，google chrome 可以实现一个功能，把网页当作一个app进行应用查看，就类似于软件来了，去掉了我之前的思考，把应用的显示通过Electronjs来显示在桌面客户端上面。

will to do

- [ ] 登录方面
- [ ] 编辑功能块

- [ ] 记得弄一个图标，ico的

快捷键问题

- [ ] F2 标题， F3 标签， F4 内容， CTRL+ENTER 更新POST。Tab顺序，1. 内容 2. 标题
- [ ] Ctrl + 1 首页, Ctrl + 2 增加Post， Ctrl + 3 登录方面的 

### 0.1.3思考
登录，是如何成立的，通过Api，如果提交评论，通过应用。  
更新内容后，发现跳转到页面的时候，内容是没有修改的。需要重载。不适应history.push("/")的方式，应该用浏览器重载的方式，重新访问获取。

### 0.1.2
- [x] 关于进入当前的一个space的页面，只为显示
- [x] 显示内容,关于评论的颜色的优化和显示，底部效果的优化显示

fixed:
- 修改了子集标题的颜色和大小，修改的样式
- 跳转Github的那一页，进行查看和评论和赞同
- 关于Card相连样式的修改
### 0.1.1
- 增加了导航栏
- 发现了slate关于输入框的bug： 如果是输入中文的话，会出现输入的内容消失，用英文是没有问题的。网上搜索，一个好的名字叫做，光标错位。

- fixed: 发现输入的时候，chrome，如果两个按键一起按下的话，会消失，慢一点按，按键的连贯性慢就没事。如果是英文的输入的话，是没事的。

### 0.1.0版本

- 单纯的可以把内容保存到issues的应用当中。
- 可以查看，和增加
- 使用React + slatejs



