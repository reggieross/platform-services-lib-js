import fetch, { Response, Headers } from 'node-fetch';

export interface ResponseEntity {
  responseObj: any;
  statusCode: number;
  headers: Headers;
  message?: string;
}

export class HttpClient {
  public static async get(
    url: string,
    cookie?: string
  ): Promise<ResponseEntity> {
    const headers = {
      'Content-Type': 'application/json',
    };

    return fetch(url, {
      method: 'GET',
      headers: HttpClient.addCookiesToHeader(headers, cookie),
    }).then(
      async (response: Response) => await HttpClient.handleResponse(response)
    );
  }

  public static async post(
    url: string,
    body: any,
    cookie?: string,
  ): Promise<ResponseEntity> {
    const headers = {
      'Content-Type': 'application/json',
    };

    return fetch(url, {
      method: 'POST',
      headers: HttpClient.addCookiesToHeader(headers, cookie),
      body: JSON.stringify(body),
    }).then(
      async (response: Response) => await HttpClient.handleResponse(response)
    );
  }

  private static addCookiesToHeader(
    headers: Record<string, string>,
    cookie?: string
  ) {
    if (cookie) {
      return {
        Cookie: cookie,
        ...headers,
      };
    }

    return headers;
  }

  private static async handleResponse(
    response: Response
  ): Promise<ResponseEntity> {
    try {
      let responseObj = await response.text();

      return {
        responseObj: responseObj ? JSON.parse(responseObj) : {},
        headers: response.headers,
        statusCode: response.status,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
