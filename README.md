# somb

somb is smart light-weight markdown to html 

## [Demo](http://leinov.com/blog)
## Useage
### install 
```
npm install somb -g
```
### create blog project

```
somb init leinov.github.io
cd leinov.github.io
```
### config base info in ```package.json```

```
{
  "author": "leinov",
  "homepage": "https://github.com/leinov/somb",
  "avatar":"https://avatars0.githubusercontent.com/u/6204210?s=460&v=4"
}
```
upper config is necessary, afther config these info ,when you build your project, all the info will render in your index page

### markdown to pages

```

somb build
somb start
```

 