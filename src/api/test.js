import { request } from '@/utils/request';

export const test = params => request().get('/api/users/test', params);

export const test_post = params => request('', { 'Content-Type': 'application/json', loading: true }).post('/api/users/test/post', params);