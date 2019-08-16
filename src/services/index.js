import axios from 'axios';

class Request {
  constructor() {
    /**
     * base request for api data
     */
    this.apiRequest = axios.create({
      method: 'post',
      baseURL: '/api/',
    });
    /**
     * get request for external call
     */
    this.getRequest = axios.create({
      method: 'get',
    });
    /**
     * post request for external call
     */
    this.postRequest = axios.create({
      method: 'post',
    });

    this.token = false;
  }

  /**
   * Request data from API server
   *
   * @param {Object} payload
   * @param {String} payload.url
   * @param {Object} payload.data
   */
  api({ url, data = {} }) {
    return new Promise((resolve, rejects) => {
      this.apiRequest({
        url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: this.token,
        },
        data,
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(rejects);
    });
  }

  get(payload) {
    return new Promise((resolve, rejects) => {
      this.getRequest(payload)
        .then(res => {
          resolve(res.data);
        })
        .catch(rejects);
    });
  }

  post(payload) {
    return new Promise((resolve, rejects) => {
      this.postRequest(payload)
        .then(res => {
          resolve(res.data);
        })
        .catch(rejects);
    });
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

export default new Request();
