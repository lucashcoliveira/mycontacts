import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(patch) {
    await delay(1000);

    const response = await fetch(`${this.baseURL}${patch}`);

    let body = null;
    const contentType = response.headers.get('content-type');

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }
}

export default HttpClient;
