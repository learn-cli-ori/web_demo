import  request  from '@/utils/request';

// 登录
export const login = params => request.get('/api/users/login', params);


// 退出登录
export const logout = params => request.get('/api/users/logout', params);