import { request } from '@/utils/request';

// 获取权限
// export const getAdminAuthority = params => request().get('/api/users/getAdminAuthority', params);
export const getAdminAuthority = params => {
    //模拟接口
    return {
        'code': 200,
        "data": [{
            path: '/test/index',
            name: 'test',
            filePath: "/test/test"
        }],
        "msg": "操作成功"
    };
}

// 登录
export const login = params => request().get('/api/users/login', params);


// 退出登录
export const logout = params => request().get('/api/users/logout', params);