# somb

somb is smart light-weight markdown to html tool

## [Demo](http://www.leinov.com/blog/)

## 🐭 Useage

### install 

```
npm install somb -g
```

### create blog 

```
somb init myblog
cd leinov.myblog
```

### config 

config some infomation in ```package.json```

```
{
  "author": "leinov",
  "homepage": "https://github.com/leinov/somb",
  "avatar":"https://avatars0.githubusercontent.com/u/6204210?s=460&v=4"
}
```

upper configuration is necessary, afther config these info ,when you build your project, all of the info will render on your index page

### compile markdown to pages

```
somb build
```

### start 
```
somb start
```
Automatically start the blog page in browser

## 🌐 Use in github page
 create a new repository named [name].github.io (leinov.github.io) in your github 
 
 ```
 git clone git@github.com:[name]/[name].github.io.git
 cd [name].github.io
 somb init blog
 somb build
 ```
 push your repository and visit [[name].github.io/blog](http://leinov.github.io/blog)