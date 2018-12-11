# wnow

wnow is a lightweight markdown blog compiler

## [Demo](http://www.leinov.com/blog/)

## 🐭 Useage

### install 

```
npm install wnow -g
```

### create blog 

```
wnow init myblog
cd myblog
```

### config 

config some infomation in ```package.json```

```
{
  "author": "leinov",
  "homepage": "https://github.com/leinov/wnow",
  "avatar":"https://avatars0.githubusercontent.com/u/6204210?s=460&v=4"
}
```

upper configuration is necessary, afther config these info ,when you build your project, all of the info will render on your index page

### add a new markdown page

```
wnow new '这是一个新页面'
```

### compile markdown to pages
```
wnow build
```

### start 

```
wnow start
```

Automatically start the blog page in browser

## 🌐 Use in github page

 create a new repository named [name].github.io (leinov.github.io) in your github 
 
 ```
 git clone git@github.com:[name]/[name].github.io.git
 cd [name].github.io
 wnow init blog
 wnow build
 ```
 push your repository and visit [[name].github.io/blog](http://leinov.github.io/blog)