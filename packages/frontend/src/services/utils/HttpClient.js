import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(patch, options) {
    return this.makeResquest(patch, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(patch, options) {
    return this.makeResquest(patch, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(patch, options) {
    return this.makeResquest(patch, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(patch, options) {
    return this.makeResquest(patch, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  async makeResquest(patch, options) {
    await delay(500);

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${patch}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
