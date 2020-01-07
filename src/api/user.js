import { request } from '@/utils/request';

// 获取权限
export const getAdminAuthority = params => request().get('/api/users/getAdminAuthority', params);

// 登录
export const login = params => request().get('/api/users/login', params);


// 退出登录
export const logout = params => request().get('/api/users/logout', params);