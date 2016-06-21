## html-insert 文件注入插件

通过特殊注释，在html文件中注入文件或标签

> author：volodymyr
> email: volodymyr@foxmail.com

### 组件注入
```
<!--compontent:**/*.html-->
```
匹配路径，注入匹配到的文件内容到html文件中。

### CSS 注入
```
<!--css:[require]:**/*.css-->
```
匹配路径，注入匹配的文件css内容到html文件中
require: 可选参数，不声明则生成一个 `link` 标签，并添加路径
         声明则生成一个`style` 标签包含css文件内容

### JS注入
```
<!--js:[require]:**/*.js-->
```
匹配路径，注入匹配的文件js内容到html文件中
require: 可选参数，不声明则生成一个 `script` 标签，并添加路径
         声明则生成一个`script` 标签包含js文件内容

 ### 配置 [option]
 ```
 {
   compontent: {                // 组件注入配置
     path:"src/static"          // 组件公共路径 文件将以此路径往后拼接
   },
   css:{                        // css注入配置
       path: 'src/static',      // css公共路径 文件将以此路径往后拼接
       output: '../static',     // 不声明require时，生成的链接替换规则，默认值为[path]
       compress: true,          // 声明require时，注入的css是否开启压缩功能
       version: 'hash'          // 不声明require时，是否开启版本控制，默认：false 特殊值：hash[Length],采用sha1算法计算文件内容生成唯一的hash,[Length]截取shah长度,shah8
   },
   js:{                         // js注入配置
       path: 'src/static',      // js公共路径 文件将以此路径往后拼接
       output: '../static/js',  // 不声明require时，生成的链接替换规则，默认值为[path]
       compress: true,          // 声明require时，注入的js是否开启压缩功能
       uglifyOption:{},         // 压缩配置
       version: 'hash'          // 不声明require时，是否开启版本控制，默认：false 特殊值：hash[Length],采用sha1算法计算文件内容生成唯一的hash,[Length]截取shah长度,shah8
   }
 }
 ```
