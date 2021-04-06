import { ENVIRONMENT } from '../../environment';

const HOST = ENVIRONMENT[process.env.NODE_ENV];

export default {
  getHealth: () => ({ method: 'get', url: `${HOST}/api/ping` }),
  postAuth: (data) => ({ method: 'post', url: `${HOST}/api/v1/signin`, data }),
}
