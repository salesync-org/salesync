import { http, HttpResponse } from 'msw';
import { TYPE_SERVICE_URL } from '@/constants/api';
import { types, relations, typeRelations } from '../db';

export const handlers = [
  http.get(`${TYPE_SERVICE_URL}`, () => {
    return HttpResponse.json(types);
  }),

  http.get(`${TYPE_SERVICE_URL}/:typeId/link`, async ({ params }) => {
    const search = params.search ?? '';
    const page = params.page ?? '1';
    const perPage = 6;

    const typeId = params.typeId;
    const filterTypeRelations = typeRelations.filter(
      (typeRelation) =>
        typeRelation.type1Id === typeId &&
        typeRelation.type1Label.toLowerCase().includes(search.toString().toLowerCase())
    );

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

    return HttpResponse.json(result);
  })
];
