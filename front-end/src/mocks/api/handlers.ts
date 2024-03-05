import { http, HttpResponse } from 'msw';

import { setupWorker } from 'msw/browser';
import { USER_SERVICE_URL, SAMPLE_ACCESS_TOKEN, TYPE_SERVICE_URL } from '@/constants/api';
import { typeData } from '@/constants/constant';
import { handlers as typeHandlers } from './type-handlers';

export const handlers = [
  ...typeHandlers,
  http.post(`${USER_SERVICE_URL}/login`, async ({ request }) => {
    const { email, password } = await (<any>request).json();

    if (email === 'admin' && password === 'admin') {
      return HttpResponse.json(
        {
          access_token: SAMPLE_ACCESS_TOKEN,
          expires_in: 300,
          token_type: 'Bearer',
          user: {
            name: 'Admin_User',
            email: 'admin@salesync.org',
            avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Quang'
          }
        },
        {
          status: 200
        }
      );
    }
    return HttpResponse.error();
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
  }),

  http.get(`${TYPE_SERVICE_URL}/all`, async ({ request }) => {
    const accessToken = request.headers.get('Authorization');
    const data = typeData;
    if (accessToken === `Bearer ${SAMPLE_ACCESS_TOKEN}`) {
      return HttpResponse.json(
        {
          count: data.length,
          types: typeData
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
