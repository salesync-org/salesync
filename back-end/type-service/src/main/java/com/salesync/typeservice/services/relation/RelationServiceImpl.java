package com.salesync.typeservice.services.relation;

import com.salesync.typeservice.dtos.RelationDTO;
import com.salesync.typeservice.mapper.RelationMapper;
import com.salesync.typeservice.repositories.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(rollbackFor = Throwable.class)
@Service
@RequiredArgsConstructor
public class RelationServiceImpl implements IRelationService {
    private final RelationRepository relationRepository;
    private final RelationMapper relationMapper = RelationMapper.INSTANCE;

    @Override
    public List<RelationDTO> getAllRelation() {
        return relationRepository.findAll().stream().map(
                relationMapper::relationToRelationDTO
        ).collect(Collectors.toList());
    }
}
