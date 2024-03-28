import { http, HttpResponse } from 'msw';

import { SAMPLE_ACCESS_TOKEN, TYPE_SERVICE_URL, USER_SERVICE_URL } from '@/constants/api';
import { setupWorker } from 'msw/browser';
import { leads } from '../db/record/leads';
import { stages } from '../db/record/stages';
import { users } from '../db/user';
import { handlers as typeHandlers } from './type-handlers';

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
  }),

  http.get(`${TYPE_SERVICE_URL}/record/:recordId`, async ({ params }) => {
    const recordId = params.recordId;

    const leadsDb = localStorage.getItem('records') ? JSON.parse(localStorage.getItem('records')!) : leads;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let findRecord: any = leadsDb.find((record: any) => record.id === recordId);

    if (findRecord) {
      if (Object.keys(findRecord).includes('currentStage')) {
        findRecord = {
          ...findRecord,
          stage: {
            stages,
            currentStage: findRecord.currentStage
          }
        };

        delete findRecord.currentStage;
      }

      return HttpResponse.json(findRecord, {
        status: 200
      });
    }

    return HttpResponse.error();
  }),

  http.put(`${TYPE_SERVICE_URL}/record/:recordId`, async ({ params, request }) => {
    const recordId = params.recordId;
    const body = (await request.json()) as { stageId: string };

    const leadsDb = localStorage.getItem('records') ? JSON.parse(localStorage.getItem('records')!) : leads;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findIndex = leadsDb.findIndex((record: any) => record.id === recordId);

    if (findIndex >= 0) {
      leadsDb[findIndex] = {
        ...leadsDb[findIndex],
        currentStage: body.stageId
      };

      localStorage.setItem('records', JSON.stringify(leadsDb));

      return HttpResponse.json(leadsDb, {
        status: 200
      });
    }

    return HttpResponse.error();
  })
];

export const server = setupWorker(...handlers);
