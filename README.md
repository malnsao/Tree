# Tree

安装依赖包
cnpm i react @types/react react-dom @types/react-dom -S
cnpm i webpack webpack-cli webpack-dev-server -D
cnpm i typescript ts-loader source-map-loader style-loader less-loader less file-loader url-loader html-webpack-plugin css-loader -D

1、遍历 data，递归 TreeNode 展示节点
2、递归 key，存到 keyNodeMap
3、打开箭头向下，展示文件打开图标，关闭箭头向右，展示关闭图标
4、新增 input 框类型 checkbox onChange 事件，实现 全选，反选
5、模拟接口获取子节点
