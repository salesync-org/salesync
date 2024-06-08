package org.salesync.record_service.services;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.salesync.record_service.components.RabbitMQProducer;
import org.salesync.record_service.constants.enums.PermissionType;
import org.salesync.record_service.dtos.ListRecordsRequestDto;
import org.salesync.record_service.dtos.ListRecordsResponseDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RequestRecordTypeRelationDto;
import org.salesync.record_service.entities.Record;
import org.salesync.record_service.entities.RecordTypeRelation;
import org.salesync.record_service.repositories.RecordRepository;
import org.salesync.record_service.repositories.RecordStageRepository;
import org.salesync.record_service.repositories.RecordTypePropertyRepository;
import org.salesync.record_service.repositories.RecordTypeRelationRepository;
import org.salesync.record_service.services.record.RecordService;
import org.salesync.record_service.services.record.RecordServiceImpl;
import org.salesync.record_service.services.token.TokenService;
import org.salesync.record_service.utils.SecurityContextHelper;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class RecordServiceTest {
    private RecordService recordService;
    private RecordRepository recordRepository;
    private RecordTypeRelationRepository recordTypeRelationRepository;
    private MockedStatic<SecurityContextHelper> securityContextHelperMockedStatic;

    @Before
    public void setUp() {
        recordRepository = Mockito.mock(RecordRepository.class);
        RecordTypePropertyRepository recordTypePropertyRepository = Mockito.mock(RecordTypePropertyRepository.class);
        recordTypeRelationRepository = Mockito.mock(RecordTypeRelationRepository.class);
        RecordStageRepository recordStageRepository = Mockito.mock(RecordStageRepository.class);
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);
        RabbitMQProducer rabbitMQProducer = Mockito.mock(RabbitMQProducer.class);
        TokenService tokenService = Mockito.mock(TokenService.class);
        RestTemplateBuilder restTemplateBuilder = Mockito.mock(RestTemplateBuilder.class);
        securityContextHelperMockedStatic = Mockito.mockStatic(SecurityContextHelper.class);
        recordService = new RecordServiceImpl(
                recordRepository, recordTypePropertyRepository, recordTypeRelationRepository, recordStageRepository, restTemplate, rabbitMQProducer, tokenService, restTemplateBuilder
        );
    }

    @After
    public void tearDown() {
        securityContextHelperMockedStatic.close();
    }

    @Test
    public void testGetFilteredRecords() {
        //given
        UUID typeId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        String companyName = "companyName";

        ListRecordsRequestDto listRecordsRequestDto = ListRecordsRequestDto.builder().searchTerm("").typeId(typeId).propertyName("propertyName").isAsc(true).pageSize(5).currentPage(1).build();

        Pageable pageRequest = PageRequest.of(
                listRecordsRequestDto.getCurrentPage() - 1, listRecordsRequestDto.getPageSize()
        );

        Page<Record> recordPage = new PageImpl<>(List.of(
                createRecord(userId, "name1"), createRecord(userId, "name2")
        ), pageRequest, 2);

        securityContextHelperMockedStatic.when(SecurityContextHelper::getContextAuthorities).thenReturn(Collections.singletonList(PermissionType.READ_ALL.getPermission()));

        Mockito.when(
                recordRepository.getAllFilteredRecord(
                        userId, listRecordsRequestDto.getPropertyName(), listRecordsRequestDto.getTypeId(), listRecordsRequestDto.getSearchTerm(), listRecordsRequestDto.isAsc(), pageRequest, companyName
                )
        ).thenReturn(
                recordPage
        );
        Mockito.when(
                SecurityContextHelper.getContextUserId()
        ).thenReturn(userId.toString());
        // when
        ListRecordsResponseDto listRecordsResponseDto = recordService.getFilteredRecords(listRecordsRequestDto, companyName);
        // then
        Assert.assertNotNull(listRecordsResponseDto);
        Assert.assertEquals(2, listRecordsResponseDto.getRecords().size());
        Assert.assertEquals(2, listRecordsResponseDto.getTotalSize().longValue());
        Assert.assertEquals(5, listRecordsResponseDto.getPageSize().longValue());
        Assert.assertEquals(1, listRecordsResponseDto.getCurrentPage().longValue());
        Assert.assertEquals("name1", listRecordsResponseDto.getRecords().get(0).getName());
        Assert.assertEquals("name2", listRecordsResponseDto.getRecords().get(1).getName());
    }

    @Test
    public void testCreateRecordTypeRelation() {
        // given
        UUID userId = UUID.randomUUID();
        UUID sourceRecordId = UUID.randomUUID();
        UUID destinationRecordId = UUID.randomUUID();
        UUID typeRelationId = UUID.randomUUID();
        Record sourceRecord = createRecord(userId, "sourceRecord");
        Record destinationRecord = createRecord(userId, "destinationRecord");

        sourceRecord.setId(sourceRecordId);
        destinationRecord.setId(destinationRecordId);

        RequestRecordTypeRelationDto requestRecordTypeRelationDto = RequestRecordTypeRelationDto.builder().sourceRecordId(sourceRecordId).destinationRecordId(destinationRecordId).typeRelationId(typeRelationId).build();

        RecordTypeRelation recordTypeRelationTest = RecordTypeRelation.builder().typeRelationId(typeRelationId).sourceRecord(sourceRecord).destinationRecord(destinationRecord).build();

        RecordTypeRelation inverseRelation = RecordTypeRelation.builder().typeRelationId(typeRelationId).sourceRecord(destinationRecord).destinationRecord(sourceRecord).build();

        Mockito.when(
                recordRepository.findById(Mockito.eq(sourceRecordId))
        ).thenReturn(
                Optional.of(sourceRecord)
        );

        Mockito.when(
                recordRepository.findById(Mockito.eq(destinationRecordId))
        ).thenReturn(
                Optional.of(destinationRecord)
        );

        Mockito.when(
                recordTypeRelationRepository.save(Mockito.eq(recordTypeRelationTest))
        ).thenReturn(
                recordTypeRelationTest
        );

        Mockito.when(
                recordTypeRelationRepository.save(Mockito.eq(inverseRelation))
        ).thenReturn(
                inverseRelation
        );
        // When
        RecordTypeRelationDto result = recordService.createRecordTypeRelation(requestRecordTypeRelationDto);
        // Then
        Assert.assertNotNull(result);
        Assert.assertEquals(requestRecordTypeRelationDto.getTypeRelationId(), result.getTypeRelationId());
        Assert.assertNotNull(result.getSourceRecord());
        Assert.assertEquals(sourceRecord.getName(), result.getSourceRecord().getName());
        Assert.assertNotNull(result.getDestinationRecord());
        Assert.assertEquals(destinationRecord.getName(), result.getDestinationRecord().getName());
    }

    private Record createRecord(UUID userId, String name) {
        return Record.builder().userId(userId).name(name).build();
    }
}