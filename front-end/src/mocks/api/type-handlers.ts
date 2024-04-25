import { TYPE_SERVICE_URL } from '@/constants/api';
import { stages, type, type1, types } from '../db';
import { properties } from '../db/properties';
import { records } from '../db/record/records';
import { http, HttpResponse } from 'msw';

const BASE_URL = `${import.meta.env.VITE_GATEWAY_HOST}`;

export const handlers = [
  http.get(`${TYPE_SERVICE_URL}`, () => {
    return HttpResponse.json(types);
  }),

  http.get(`${BASE_URL}/totnghiep/types`, async () => {
    const typeExample = types;
    return HttpResponse.json(typeExample);
  }),

  http.get(`${BASE_URL}/totnghiep/types/details/11111111-1111-1111-1111-111111111111`, async () => {
    const typeExample = type;
    return HttpResponse.json(typeExample);
  }),
  http.get(`${BASE_URL}/totnghiep/stages/11111111-1111-1111-1111-111111111111`, async () => {
    const stageList = stages;
    return HttpResponse.json(stageList);
  }),

  http.get(`${BASE_URL}/totnghiep/types/details/22222222-2222-2222-2222-222222222222`, async () => {
    const typeExample = type1;
    return HttpResponse.json(typeExample);
  }),

  http.get(`${BASE_URL}/abc/types/properties`, async () => {
    const propertyExamples = properties;
    return HttpResponse.json(propertyExamples);
  }),
  http.get(`${TYPE_SERVICE_URL}/:typeId/records`, async ({ params }) => {
    const typeId = params.typeId;

    const findRecords = records.find((record) => record.id === typeId);

    return HttpResponse.json(findRecords, {
      status: 200
    });
  })
];
