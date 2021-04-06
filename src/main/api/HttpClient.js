import axios from 'axios';
import { isEmpty, difference } from 'lodash';

export function executeHttpRequest(request) {
  // validate(request);
  const cancelToken = axios.CancelToken.source();
  const axiosRequest = transformRequestToAxiosFormat(request, cancelToken);

  const promise = axios(axiosRequest)
    .then((response) => response)
    .catch((error) => {
      if (axios.isCancel(error) || error.status === 205) {
        return Promise.reject(error)
      }
      throw error;
    });

  promise.cancel = cancelToken.cancel;
  return promise;
}

export function setCommonHeader(headerName, headerValue) {
  axios.defaults.headers.common[headerName] = headerValue;
}

function validate(request) {
  if (!request) throw Error('executeHttpRequest: missing request argument');
  if (!request.url) throw Error("executeHttpRequest: missing request's url");
  if (request.method && !['get', 'post', 'delete', 'put'].includes(request.method))
    throw Error(`executeHttpRequest: unknown request method ${request.method}`);
  if (request.payload && (request.method === 'get' || request.method === 'delete'))
    throw Error(`executeHttpRequest: payload is not allowed for method ${request.method}`);
  const unknownRequestKeys = difference(Object.keys(request), ['url', 'method', 'params', 'payload', 'headers']);
  if (!isEmpty(unknownRequestKeys))
    throw Error(`executeHttpRequest: unknown request keys: ${unknownRequestKeys.join(', ')}`);
}

function transformRequestToAxiosFormat(request, cancelToken) {
  let params;
  if (request.params) {
    params = request.params;
  }
  if (request.payload) {
    const { payload: data } = request;
    request = { data };
  }
  request = { ...request, cancelToken: cancelToken.token };
  if (params) {
    request = { ...request, params };
  }
  return request;
}
