/**
 * 导航列表
 * @title: 一级目录
 * @icon: 图标
 * @path: 导航组件唯一标识；一级目录无跳转目标使用模块名作为path，子类目录使用路由访问路径作为path
 * @children: 二级目录数组 path 为跳转路径, 如需三级目录，二级应设置 type 为 'select', 再增加一个children 数组，三级目录数组设置同二级目录
 */
export default [{
    title: '测试',
    path: '/test',
    icon: 'el-icon-user-solid',
    name:"test",
    children: [
        { title: '测试接口',  name:"testIndex", path: '/test/index' },
    ]
}];