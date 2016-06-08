## gulp_vue
基于gulp+webpack 构建vue开发环境及vue项目通用架构


### 命令
__安装依赖__

`npm install`

__清空开发环境__

`npm run clean`

__清空生产环境__

`npm run clean:dist`

__初始化开发环境__

`npm run dev`

__编译生产环境__

`npm run build`

项目架构说明：
```
>build          // gulp、webpack 构建配置及任务
——>tasks        // gulp 任务模块
——>util         // 工具方法
——>webpack      // webpack配置
>dist           // 生产包
>public         // dev开发包
>src            // 源代码
>gulpfile.js    // gulp配置入口文件
```

开发目录文件夹说明：
```
>src
——>assets         // 动态资源
————>less         
————>css          // 由.vue文件抽取的css暂存。
——>components     // vue组件
——>static         // 静态资源
————>images       // 图片资源
————>css          // 静态CSS资源
——>util           // 工具库
———>views         // 页面视图
```

public、dist 目录文件夹说明
```
>public(dist)
——>static           // 静态资源
————>css
————>js
————>images
——>views            // 页面视图
```
