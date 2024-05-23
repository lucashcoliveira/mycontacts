import APIError from '../../errors/APIError';
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

    throw new APIError(response, body);
  }

  async post(patch, body) {
    await delay(1000);

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const response = await fetch(`${this.baseURL}${patch}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
