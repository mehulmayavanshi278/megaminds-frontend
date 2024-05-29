class tokenHelper {
  constructor() {
    this.key = "token";
  }
  get = () => {
    return window.localStorage.getItem(this.key);
  };
  create = (token, value) => {
    window.localStorage.setItem(token, value);
  };
  delete = (token)=>{
    window.localStorage.removeItem(token);
  }
}
export default tokenHelper = new tokenHelper();
