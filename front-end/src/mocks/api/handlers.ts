import { http, HttpResponse } from 'msw';

import { setupWorker } from 'msw/browser';
import { USER_SERVICE_URL, SAMPLE_ACCESS_TOKEN, TYPE_SERVICE_URL } from '@/constants/api';
import { handlers as typeHandlers } from './type-handlers';
import { users } from '../db/user';

export const handlers = [
  ...typeHandlers,
  http.post(`${USER_SERVICE_URL}/login`, async ({ request }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { email, password } = await (<any>request).json();

    const findUser = users.find((user) => user.email === email && user.password === password);

    if (findUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = findUser;
      return HttpResponse.json(
        {
          access_token: SAMPLE_ACCESS_TOKEN,
          expires_in: 300,
          token_type: 'Bearer',
          user
        },
        {
          status: 200
        }
      );
    }
    // return HttpResponse.json(
    //   {
    //     message: 'Invalid email or password',
    //     type: 'password'
    //   },
    //   {
    //     status: 401
    //   }
    // );
  }),

  http.get(`${USER_SERVICE_URL}/me`, ({ request }) => {
    const accessToken = request.headers.get('Authorization');
    if (accessToken === `Bearer ${SAMPLE_ACCESS_TOKEN}`) {
      return HttpResponse.json(
        {
          name: 'Admin_User',
          email: 'admin@salesync.org',
          avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Quang'
        },
        {
          status: 200
        }
      );
    }

    return HttpResponse.error();
  }),

  http.post(`${TYPE_SERVICE_URL}/create`, async ({ request }) => {
    const accessToken = request.headers.get('Authorization');
    const body = await request.json();

    //get requesy body

    if (accessToken === `Bearer ${SAMPLE_ACCESS_TOKEN}`) {
      return HttpResponse.json(
        {
          type: body
        },
        {
          status: 201
        }
      );
    }

    return HttpResponse.error();
  })
];

export const server = setupWorker(...handlers);
