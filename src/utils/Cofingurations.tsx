export const baseUrl = 'http://127.0.0.1:5000';

export const config = {
    headers: {
      'Content-Type': 'application/json'
    }
};

export const authConfig = (token?: string) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
});

  