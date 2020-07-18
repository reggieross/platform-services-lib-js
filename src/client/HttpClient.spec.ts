import { HttpClient } from './HttpClient';
import { enableFetchMocks } from 'jest-fetch-mock';

import fetch, { Response } from 'node-fetch';
jest.mock('node-fetch');

describe('Http Client', () => {
  describe('Get', () => {
    beforeEach(() => {
      enableFetchMocks();
    });

    it('should call fetch with the specified url', () => {
      const url = '/some-url';
      HttpClient.get(url);
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      });
    });

    it("Should add cookie to the header if it's provided", () => {
      const url = '/some-url';
      const cookie = 'cookieKey=cookieValue';
      HttpClient.get(url, cookie);
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith(url, {
        headers: { 'Content-Type': 'application/json', Cookie: cookie },
        method: 'GET',
      });
    });
  });

  describe('Post', () => {
    it('should call fetch with the specified url', () => {
      const url = '/some-url';
      const bod = { key: 'val' };
      HttpClient.post(url, bod);
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(bod),
      });
    });

    it("Should add cookie to the header if it's provided", () => {
      const url = '/some-url';
      const bod = { key: 'val' };
      const cookie = 'cookieKey=cookieValue';
      HttpClient.post(url, bod, cookie);
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith(url, {
        headers: { 'Content-Type': 'application/json', Cookie: cookie },
        body: JSON.stringify(bod),
        method: 'POST',
      });
    });
  });
});
