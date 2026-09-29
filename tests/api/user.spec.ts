import { test, expect } from '@playwright/test';

test.describe('Reqres API Automation', () => {

  test('Verify GET users API', async ({ request }) => {
    const response = await request.get(
      'https://reqres.in/api/users?page=2'
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.data).toBeInstanceOf(Array);

    for (const user of responseBody.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
    }
  });

  test('Verify POST create user API', async ({ request }) => {
    const requestBody = {
      name: 'morpheus',
      job: 'leader',
    };

    const response = await request.post(
      'https://reqres.in/api/users',
      {
        data: requestBody,
      }
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe('morpheus');
    expect(responseBody.job).toBe('leader');

    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
  });

});

