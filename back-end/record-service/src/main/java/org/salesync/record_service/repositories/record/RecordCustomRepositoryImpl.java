package org.salesync.record_service.repositories.record;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPAQueryBase;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.sql.JPASQLQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.criteria.JpaSubQuery;
import org.salesync.record_service.constants.enums.OrderEnum;
import org.salesync.record_service.dtos.ListRecordsRequestDto;
import org.salesync.record_service.dtos.ListRecordsResponseDto;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.dtos.SortDto;
import org.salesync.record_service.entities.QRecord;
import org.salesync.record_service.entities.QRecordProperty;
import org.salesync.record_service.mappers.RecordMapper;
import org.springframework.stereotype.Repository;
import org.salesync.record_service.entities.Record;

import java.lang.reflect.Field;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RecordCustomRepositoryImpl implements RecordCustomRepository{
    @PersistenceContext
    private final EntityManager entityManager;
    private final RecordMapper recordMapper = RecordMapper.INSTANCE;

    @Override
    public ListRecordsResponseDto getListRecord(ListRecordsRequestDto listRecordsRequestDto) {
        JPAQuery<Record> query = new JPAQuery<>(entityManager);
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QRecord qRecord = QRecord.record;
        QRecordProperty qRecordProperty = QRecordProperty.recordProperty;
        BooleanExpression searchCondition = qRecord.typeId.eq(listRecordsRequestDto.getTypeId());
        if (listRecordsRequestDto.getSearchCriteria() != null) {
            searchCondition = qRecordProperty.value.containsIgnoreCase(listRecordsRequestDto.getSearchCriteria());
        }


       JPAQuery<Record> countQuery = query.from(qRecord)
                .join(qRecord.recordProperties, qRecordProperty).fetchJoin()
                        .where(searchCondition);

        int page = listRecordsRequestDto.getCurrentPage();
        int size = listRecordsRequestDto.getPageSize();
        JPAQuery<Record> resultQuery = countQuery
                .offset((long) (page - 1) * size)
                .limit(size);
        List<RecordDto> recordDtos = resultQuery.fetch().stream().map(recordMapper::recordToRecordDto).toList();
        return ListRecordsResponseDto.builder()
                .records(resultQuery.fetch().stream().map(recordMapper::recordToRecordDto)
                        .toList())
                .totalSize(countQuery.fetchResults().getTotal())
                .currentPage(page)
                .pageSize(size)
                .build();
    }

    private OrderSpecifier<?> getOrderSpecifier(SortDto sortDto) throws NoSuchFieldException, IllegalAccessException {
        QRecordProperty qRecordProperty = QRecordProperty.recordProperty;
        Field pathField = qRecordProperty.getClass().getField(sortDto.getField());
        ComparableExpressionBase<?> path = (ComparableExpressionBase<?>)
                pathField.get(qRecordProperty);
        if (OrderEnum.asc.equals(sortDto.getOrder())) {
            return path.asc();
        } else {
            return path.desc();
        }
    }
}
