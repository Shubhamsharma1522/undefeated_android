export class Interceptor {
  static headers = {
    Accept: 'application/json',
    'content-type': 'application/json',
  };
  static token = null;

  static getHeaders() {
    console.log('showing token', this.token);
    if (this.token != null) {
      this.headers.Authorization = this.token;
    }
    return this.headers;
  }
  static getHeadersWithExplicitToken(token) {
    temp = this.headers;
    temp.Authorization = token;
    return temp;
  }

  static getFileUploadHeaders() {
    var custom = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };
    if (this.token != null) {
      custom.Authorization = this.token;
    }

    return custom;
  }

  static setToken(token) {
    this.token = token;
    console.log('showing saved token', token);
  }
}
