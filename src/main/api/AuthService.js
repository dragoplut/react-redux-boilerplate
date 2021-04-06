import { executeHttpRequest } from './HttpClient';
import AuthApi from './AuthApi';

export function getHealth() {
  return executeHttpRequest(AuthApi.getHealth());
}

export async function postAuth(data) {
  return await executeHttpRequest(AuthApi.postAuth(data));
}
