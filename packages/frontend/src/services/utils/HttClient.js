import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(patch) {
    const response = await fetch(`${this.baseURL}${patch}`);
    await delay(1000);

    return response.json();
  }
}

export default HttpClient;
