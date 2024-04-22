package org.salesync.type_service.services.stage;

import com.salesync.typeservice.dtos.StageDto;
import com.salesync.typeservice.dtos.StageUpdateSeqNumberRequestDto;
import com.salesync.typeservice.entities.Stage;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.repositories.StageRepository;
import com.salesync.typeservice.services.stage.StageService;
import com.salesync.typeservice.services.stage.StageServiceImpl;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class StageServiceTest {
    private StageService stageService;
    private StageRepository stageRepository;

    @Before
    public void setUp() {
        stageRepository = Mockito.mock(StageRepository.class);
        stageService = StageServiceImpl.builder()
                .stageRepository(stageRepository)
                .build();
    }

    @After
    public void tearDown() {
        stageRepository = null;
        stageService = null;
    }

    @Test
    public void testUpdateSequenceNumber() {
        // given
        UUID typeId = UUID.randomUUID();
        UUID stage1Id = UUID.randomUUID();
        UUID stage2Id = UUID.randomUUID();
        Type type = Type.builder()
                .id(typeId)
                .build();
        Stage stage1 = Stage.builder()
                .id(stage1Id)
                .sequenceNumber(1)
                .type(type)
                .build();
        StageUpdateSeqNumberRequestDto stageUpdateSeqNumberRequestDto = StageUpdateSeqNumberRequestDto.builder()
                .stageId(stage1Id)
                .sequenceNumber(2)
                .build();
        Stage stage2 = Stage.builder()
                .id(stage2Id)
                .sequenceNumber(2)
                .type(type)
                .build();
        StageUpdateSeqNumberRequestDto stageUpdateSeqNumberRequestDto2 = StageUpdateSeqNumberRequestDto.builder()
                .stageId(stage2Id)
                .sequenceNumber(1)
                .build();
        Mockito.when(stageRepository.findById(stage1Id)).thenReturn(Optional.of(stage1));
        Mockito.when(stageRepository.findById(stage2Id)).thenReturn(Optional.of(stage2));
        Mockito.when(stageRepository.save(stage1)).thenReturn(stage1);
        Mockito.when(stageRepository.save(stage2)).thenReturn(stage2);
        // when
        List<StageDto> result = stageService.updateSequenceNumber(typeId, List.of(stageUpdateSeqNumberRequestDto, stageUpdateSeqNumberRequestDto2));
        // then
        Assert.assertNotNull(result);
        Assert.assertEquals(2, result.size());
        Assert.assertEquals(stageUpdateSeqNumberRequestDto.getSequenceNumber(), result.get(0).getSequenceNumber());
        Assert.assertEquals(stageUpdateSeqNumberRequestDto2.getSequenceNumber(), result.get(1).getSequenceNumber());
    }
}
