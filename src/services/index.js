import axios from 'axios';

class Request {
  constructor() {
    this.token = this.getToken();
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
      axios({
        method: 'post',
        url: `/api${url}`,
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

  /**
   * Request data from API server
   *
   * @param {Object} payload
   * @param {String} payload.url
   * @param {Object} payload.data
   */
  apiPut({ url, data = {} }) {
    return new Promise((resolve, rejects) => {
      axios({
        method: 'put',
        url: `/api${url}`,
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

  /**
   * Request data from API server
   *
   * @param {Object} payload
   * @param {String} payload.url
   * @param {Object} payload.data
   */
  apiGet({ url, params = {} }) {
    return new Promise((resolve, rejects) => {
      axios({
        method: 'get',
        url: `/api${url}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: this.token,
        },
        params,
      })
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

  resetToken() {
    this.token = null;
    localStorage.removeItem('token');
    return true;
  }
}

export default new Request();
