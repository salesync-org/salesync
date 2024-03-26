import { http, HttpResponse } from 'msw';
import { TYPE_SERVICE_URL } from '@/constants/api';
import { types, relations, typeRelations } from '../db';
import { properties } from '../db/properties';
import { records } from '../db/record/records';

export const handlers = [
  http.get(`${TYPE_SERVICE_URL}`, () => {
    return HttpResponse.json(types);
  }),

  http.get(`${TYPE_SERVICE_URL}/:typeId/link`, async ({ request, params }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') ?? '';
    const page = url.searchParams.get('page') ?? 1;
    const perPage = 6;

    const typeId = params.typeId;
    const filterTypeRelations = typeRelations.filter(
      (typeRelation) =>
        (typeRelation.type1Id === typeId &&
          typeRelation.type1Label.toLowerCase().includes(search.toString().toLowerCase())) ||
        typeRelation.type2Label.toLowerCase().includes(search.toString().toLowerCase())
    );

    const totalPage = Math.ceil(filterTypeRelations.length / perPage);

    const pageTypeRelations = filterTypeRelations.slice((+page - 1) * perPage, +page * perPage);

    const result = pageTypeRelations.map((typeRelation) => {
      const type1 = types.find((type) => type.id === typeRelation.type1Id);
      const type2 = types.find((type) => type.id === typeRelation.type2Id);
      const relation = relations.find((relation) => relation.id === typeRelation.relationId);
      return {
        id: typeRelation.id,
        type1Id: type1?.id,
        type1Name: type1?.name,
        type1Label: typeRelation.type1Label,
        type2Id: type2?.id,
        type2Name: type2?.name,
        type2Label: typeRelation.type2Label,
        relationId: relation?.id,
        relationName: relation?.name
      };
    });

    return HttpResponse.json({ totalPage, result });
  }),

  http.get(`${TYPE_SERVICE_URL}/:typeId/properties`, async ({ params }) => {
    const typeId = params.typeId;

    const typeProperty = properties.find((property) => property.id === typeId) || properties[0];

    return HttpResponse.json(typeProperty, {
      status: 200
    });
  }),
  http.get(`${TYPE_SERVICE_URL}/:typeId/records`, async ({ params }) => {
    const typeId = params.typeId;

    const findRecords = records.find((record) => record.id === typeId);

    return HttpResponse.json(findRecords, {
      status: 200
    });
  })
];
