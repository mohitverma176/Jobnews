// Centralized API configuration for JobNews
// Reads the base URL from the environment variable REACT_APP_BASE_URL.
// Defaults to http://localhost:8000 in development, or relative path '' in production if not specified.

const rawBaseUrl = process.env.REACT_APP_BASE_URL;

export const BASE_URL = (
  rawBaseUrl !== undefined && rawBaseUrl !== null && rawBaseUrl.trim() !== ''
    ? rawBaseUrl.trim()
    : (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000')
).replace(/\/+$/, '');

export const API_ENDPOINTS = {
  SEARCH_JOBS: BASE_URL ? `${BASE_URL}/search` : '/search',
  NEWS: BASE_URL ? `${BASE_URL}/news` : '/news',
  SEARCH_NEWS: BASE_URL ? `${BASE_URL}/search/news` : '/search/news',
  CHAT: BASE_URL ? `${BASE_URL}/chat` : '/chat',
};

export default BASE_URL;

