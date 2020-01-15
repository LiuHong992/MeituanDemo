import service from './index'
// 所有接口的封装
export default {

    // 登录注册页
    // 登录
    login({
        username,
        password
    }) {
        return service.req('/users/login', {
            username,
            password
        })
    },
    // 注册
    register({
        username,
        password,
        email
    }) {
        return service.req('/users/register', {
            username,
            password,
            email
        })
    },

    // 切换城市页面
    // 获取定位
    getPositions() {
        return service.req('/position')
    },
    // 获取所有省份
    getProvince() {
        return service.req('/province')
    },
    // 获取省份所有城市
    // id为通过获取省份后省份的id值
    // id也可以为省市关联接口返回的id值
    getCitys(id) {
        return service.req(`/citys/${id}`)
    },
    // 获取城市具体信息
    getCitymain(cityName) {
        return service.req(`/crumbs?city=${cityName}`)
    },
    // 省市关联(包含省会城市)
    getAllcity() {
        return service.req(`/city`)
    },
    // 获取热门城市
    getHotcity() {
        return service.req(`/hotCity`)
    },

    //首页接口
    // 获取全部分类
    getAllclassfy() {
        return service.req(`/menu`)
    },
    
    // 热门搜索
    // 搜索框内的热门搜索内容
    Hotsearch(cityName) {
        return service.req(`/hotPlace?city=${cityName}`)
    },

    // 搜索建议
    // 搜索框搜索后显示的内容
    Searchsuggest(cityName, keyword) {
        return service.req(`/searchTop?city=${cityName}&input=${keyword}`)
    },

    // 商铺详情
    //搜索返回的数据
    Products(shopname, cityName) {
        return service.req(`/products?keyword=${shopname}&city=${cityName}`)
    },
    // 根据关键词搜索
    Result(cityName,keyword) {
        return service.req(`/results?city=${cityName}&keyword=${keyword}`)
    }
}