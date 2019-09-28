let token = localStorage.getItem('token');

const set = t => {
  localStorage.setItem('token', t);
  token = t;
};

const get = () => {
  return token;
};

const reset = () => {
  token = null;
  localStorage.removeItem('token');
  return true;
};

export default {
  get,
  reset,
  set,
};
