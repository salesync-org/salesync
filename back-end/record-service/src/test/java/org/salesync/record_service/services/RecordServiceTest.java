package org.salesync.record_service.services;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.salesync.record_service.dtos.ListRecordsRequestDto;
import org.salesync.record_service.dtos.ListRecordsResponseDto;
import org.salesync.record_service.entities.Record;
import org.salesync.record_service.repositories.RecordRepository;
import org.salesync.record_service.services.record.RecordService;
import org.salesync.record_service.services.record.RecordServiceImpl;
import org.salesync.record_service.utils.SecurityContextHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public class RecordServiceTest {
    private RecordService recordService;
    private RecordRepository recordRepository;
    private MockedStatic<SecurityContextHelper> securityContextHelperMockedStatic;

    @Before
    public void setUp() {
        recordRepository = Mockito.mock(RecordRepository.class);
        securityContextHelperMockedStatic = Mockito.mockStatic(SecurityContextHelper.class);
        recordService = RecordServiceImpl.builder()
                .recordRepository(recordRepository)
                .build();
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
        ListRecordsRequestDto listRecordsRequestDto = ListRecordsRequestDto.builder()
                .searchTerm("")
                .typeId(typeId)
                .propertyName("propertyName")
                .isAsc(true)
                .pageSize(5)
                .currentPage(1)
                .build();

        Pageable pageRequest = PageRequest.of(
                listRecordsRequestDto.getCurrentPage() - 1,
                listRecordsRequestDto.getPageSize()
        );

        Page<Record> recordPage = new PageImpl<>(List.of(
                createRecord(userId, "name1"),
                createRecord(userId, "name2")
        ), pageRequest, 2);

        Mockito.when(
                recordRepository.getFilteredRecord(
                        userId,
                        listRecordsRequestDto.getPropertyName(),
                        listRecordsRequestDto.getTypeId(),
                        listRecordsRequestDto.getSearchTerm(),
                        listRecordsRequestDto.isAsc(),
                        pageRequest
                )
        ).thenReturn(
                recordPage
        );
        Mockito.when(
                SecurityContextHelper.getContextUserId()
        ).thenReturn(userId.toString());
        // when
        ListRecordsResponseDto listRecordsResponseDto = recordService.getFilteredRecords(listRecordsRequestDto);
        // then
        Assert.assertNotNull(listRecordsResponseDto);
        Assert.assertEquals(2, listRecordsResponseDto.getRecords().size());
        Assert.assertEquals(2, listRecordsResponseDto.getTotalSize().longValue());
        Assert.assertEquals(5, listRecordsResponseDto.getPageSize().longValue());
        Assert.assertEquals(1, listRecordsResponseDto.getCurrentPage().longValue());
        Assert.assertEquals("name1", listRecordsResponseDto.getRecords().get(0).getName());
        Assert.assertEquals("name2", listRecordsResponseDto.getRecords().get(1).getName());
    }

    private Record createRecord(UUID userId, String name) {
        return Record.builder()
                .userId(userId)
                .name(name)
                .build();
    }
}