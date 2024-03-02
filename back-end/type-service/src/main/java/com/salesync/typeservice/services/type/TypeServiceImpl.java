package com.salesync.typeservice.services.type;


import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.dtos.TypeRelationResponseDTO;
import com.salesync.typeservice.entities.Relation;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.entities.TypeRelation;
import com.salesync.typeservice.mapper.IRelationMapper;
import com.salesync.typeservice.mapper.ITypeMapper;
import com.salesync.typeservice.mapper.ITypeRelationMapper;
import com.salesync.typeservice.repositories.IRelationRepository;
import com.salesync.typeservice.repositories.ITypeRelationRepository;
import com.salesync.typeservice.repositories.ITypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(rollbackFor = Throwable.class)
@Service
@RequiredArgsConstructor
public class TypeServiceImpl implements ITypeService {
    private final ITypeRepository typeRepository;

    private final ITypeRelationMapper typeRelationMapper = ITypeRelationMapper.INSTANCE;

    private final ITypeRelationRepository typeRelationRepository;

    private final IRelationRepository relationRepository;

    private final IRelationMapper relationMapper = IRelationMapper.INSTANCE;

    private final ITypeMapper typeMapper = ITypeMapper.INSTANCE;

    @Override
    public TypeDTO createType(TypeDTO typeDTO) {
        Type savedType = typeRepository.save(typeMapper.typeDTOToType(typeDTO));
        return typeMapper.typeToTypeDTO(savedType);

    }

    @Override
    public List<TypeDTO> getAllType() {
        return typeRepository.findAll().stream().map(
                type -> typeMapper.typeToTypeDTO(type)
        ).collect(Collectors.toList());
    }

    @Override
    public TypeDTO getTypeById(String id) {
        return null;
    }

    @Override
    public TypeRelationResponseDTO createLink(TypeRelationDTO typeRelationDTO) {

        Type sourceType = typeRepository.findById(typeRelationDTO.getSourceType().getId()).get();
        Type destinationType = typeRepository.findById(typeRelationDTO.getDestinationType().getId()).get();
        Relation relation = relationRepository.findById(typeRelationDTO.getRelation().getId()).get();
        Relation inverseRelation = relation.getInverseRelation();
        String sourceLabel = typeRelationDTO.getSourceTypeLabel();
        String destinationLabel = typeRelationDTO.getDestinationTypeLabel();

        //constructor without id
        TypeRelation typeRelation = TypeRelation.builder()
                .sourceType(sourceType)
                .sourceTypeLabel(sourceLabel)
                .destinationType(destinationType)
                .destinationLabel(destinationLabel)
                .relation(relation)
                .build();

        TypeRelation inverseTypeRelation = TypeRelation.builder()
                .sourceType(destinationType)
                .sourceTypeLabel(destinationLabel)
                .destinationType(sourceType)
                .destinationLabel(sourceLabel)
                .relation(inverseRelation)
                .build();


        if (!typeRelationRepository.findBySourceTypeIdAndDestinationTypeId(sourceType.getId(), destinationType.getId()).isEmpty()) {
            throw new RuntimeException("Link already exists");
        }


        TypeRelationDTO savedSource = typeRelationMapper.typeRelationToTypeRelationDTO(typeRelationRepository.save(typeRelation));
        TypeRelationDTO savedDestination = typeRelationMapper.typeRelationToTypeRelationDTO(typeRelationRepository.save(inverseTypeRelation));

        return TypeRelationResponseDTO.builder()
                .sourceTypeRelation(savedSource)
                .destinationTypeRelation(savedDestination)
                .build();
    }

    @Override
    public TypeRelationResponseDTO updateTypeRelation(TypeRelationDTO typeRelationDTO) {
        TypeRelation typeRelation = typeRelationRepository.findById(typeRelationDTO.getId()).get();
        TypeRelation inverseTypeRelation = typeRelationRepository
                .findBySourceTypeIdAndDestinationTypeId(typeRelation.getDestinationType().getId(),
                        typeRelation.getSourceType().getId())
                .stream()
                .filter((element) -> typeRelation.getRelation().getInverseRelation().getId().equals(element.getRelation().getId())).findFirst().get();


        typeRelation.setDestinationLabel(typeRelationDTO.getDestinationTypeLabel());
        typeRelation.setSourceTypeLabel(typeRelationDTO.getSourceTypeLabel());

        inverseTypeRelation.setDestinationLabel(typeRelationDTO.getSourceTypeLabel());
        inverseTypeRelation.setSourceTypeLabel(typeRelationDTO.getDestinationTypeLabel());

        TypeRelationDTO savedTypeRelation = typeRelationMapper.typeRelationToTypeRelationDTO(typeRelationRepository.save(typeRelation));
        TypeRelationDTO savedInverseTypeRelation = typeRelationMapper.typeRelationToTypeRelationDTO(typeRelationRepository.save(inverseTypeRelation));
        return TypeRelationResponseDTO.builder()
                .sourceTypeRelation(savedTypeRelation)
                .destinationTypeRelation(savedInverseTypeRelation)
                .build();

    }
}