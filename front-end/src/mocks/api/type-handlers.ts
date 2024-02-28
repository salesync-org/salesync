import { http, HttpResponse } from 'msw';
import { TYPE_SERVICE_URL } from '@/constants/api';
import { types, inputs, relations } from '../db';

export const handlers = [
  http.get(`${TYPE_SERVICE_URL}`, () => {
    return HttpResponse.json(types);
  }),

  http.get(`${TYPE_SERVICE_URL}/:typeId/link`, async ({ params }) => {
    const typeId = params.typeId;

    return HttpResponse.json(relations.filter((relation) => relation.typeId === typeId));
  })
];
