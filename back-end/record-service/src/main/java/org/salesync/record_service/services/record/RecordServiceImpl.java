package org.salesync.record_service.services.record;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.salesync.record_service.components.RabbitMQProducer;
import org.salesync.record_service.constants.Message;
import org.salesync.record_service.constants.enums.PermissionType;
import org.salesync.record_service.dtos.CreateRecordRequestDto;
import org.salesync.record_service.dtos.ListRecordsRequestDto;
import org.salesync.record_service.dtos.ListRecordsResponseDto;
import org.salesync.record_service.dtos.MessageDto;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.dtos.RecordTypePropertyDto;
import org.salesync.record_service.dtos.RequestRecordDto;
import org.salesync.record_service.dtos.RequestUpdateStageDto;
import org.salesync.record_service.dtos.TypeDto;
import org.salesync.record_service.dtos.record_type_relation_dto.ListRecordTypeRelationsDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RelationItemDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RequestRecordTypeRelationDto;
import org.salesync.record_service.entities.Record;
import org.salesync.record_service.entities.RecordStage;
import org.salesync.record_service.entities.RecordType;
import org.salesync.record_service.entities.RecordTypeProperty;
import org.salesync.record_service.entities.RecordTypeRelation;
import org.salesync.record_service.exceptions.ConcurrentUpdateException;
import org.salesync.record_service.exceptions.ObjectNotFoundException;
import org.salesync.record_service.mappers.RecordMapper;
import org.salesync.record_service.mappers.RecordTypePropertyMapper;
import org.salesync.record_service.mappers.RecordTypeRelationMapper;
import org.salesync.record_service.mappers.RelationItemMapper;
import org.salesync.record_service.repositories.RecordRepository;
import org.salesync.record_service.repositories.RecordStageRepository;
import org.salesync.record_service.repositories.RecordTypePropertyRepository;
import org.salesync.record_service.repositories.RecordTypeRelationRepository;
import org.salesync.record_service.repositories.RecordTypeRepository;
import org.salesync.record_service.services.token.TokenService;
import org.salesync.record_service.utils.SecurityContextHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Throwable.class)
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;
    private final RecordTypeRepository recordTypeRepository;
    private final RecordTypePropertyRepository recordTypePropertyRepository;
    private final RecordTypeRelationRepository recordTypeRelationRepository;
    private final RecordStageRepository recordStageRepository;
    private final RecordMapper recordMapper = RecordMapper.INSTANCE;
    private final RecordTypeRelationMapper recordTypeRelationMapper = RecordTypeRelationMapper.INSTANCE;
    private final RelationItemMapper relationItemMapper = RelationItemMapper.INSTANCE;
    private final RecordTypePropertyMapper recordTypePropertyMapper = RecordTypePropertyMapper.INSTANCE;
    private final RestTemplate restTemplate;
    private final RabbitMQProducer rabbitMQProducer;
    private final TokenService tokenService;
    private final RestTemplateBuilder restTemplateBuilder;

    @Value("${elasticsearch.url}")
    private String elasticsearchUrl;

    @Override
    public ListRecordsResponseDto getFilteredRecords(ListRecordsRequestDto requestDto, String companyName) {

        List<String> roles = SecurityContextHelper.getContextAuthorities();
        System.out.println(roles);

        Pageable pageRequest = PageRequest.of(requestDto.getCurrentPage() - 1, requestDto.getPageSize());
        Page<Record> page;
        if (requestDto.getPropertyName() != null) {
            if (roles.contains("read-all"))
                page = recordRepository.getAllFilteredRecord(
                        UUID.fromString(SecurityContextHelper.getContextUserId()), requestDto.getPropertyName(), requestDto.getTypeId(), requestDto.getSearchTerm(), requestDto.isAsc(), pageRequest, companyName
                );
            else if (roles.contains("read-own"))
                page = recordRepository.getOwnFilteredRecord(
                        UUID.fromString(SecurityContextHelper.getContextUserId()), requestDto.getPropertyName(), requestDto.getTypeId(), requestDto.getSearchTerm(), requestDto.isAsc(), pageRequest, companyName
                );
            else page = null;
        } else {

            if (roles.contains("read-all"))
                page = recordRepository.getAllFilteredRecordsAndOrderByName(
                        UUID.fromString(SecurityContextHelper.getContextUserId()), requestDto.getTypeId(), requestDto.getSearchTerm(), requestDto.isAsc(), pageRequest, companyName
                );
            else if (roles.contains("read-own"))
                page = recordRepository.getOwnFilteredRecordsAndOrderByName(
                        UUID.fromString(SecurityContextHelper.getContextUserId()), requestDto.getTypeId(), requestDto.getSearchTerm(), requestDto.isAsc(), pageRequest, companyName
                );
            else page = null;
        }
        List<RecordDto> recordDtos = page.getContent().stream().map(recordMapper::recordToRecordDto).toList();

        return ListRecordsResponseDto.builder().records(recordDtos).totalSize(page.getTotalElements()).pageSize(page.getSize()).currentPage(page.getNumber() + 1).build();
    }

    @Override
    public List<RecordDto> getAllRecords(String companyName) {
        return recordRepository.findAllByCompanyName(companyName).stream().map(recordMapper::recordToRecordDto).toList();
    }

    @Override
    public ListRecordsResponseDto getAllRecordsWithCondition(ListRecordsRequestDto listRecordsRequestDto) {
        return ListRecordsResponseDto.builder().records(recordRepository.findAll().stream().map(recordMapper::recordToRecordDto).toList()).build();
    }

    @Override
    public RecordDto createRecordByType(String realm, RequestRecordDto requestRecordDto) {
        Record recordEntity = new Record();
        recordEntity.setUserId(UUID.fromString(requestRecordDto.getUserId()));
        recordEntity.setCompanyName(realm);

        return recordMapper.recordToRecordDto(recordRepository.save(recordEntity));
    }

    @Override
    public RecordDto getRecordById(String recordId) {
        return recordMapper.recordToRecordDto(recordRepository.findById(UUID.fromString(recordId)).orElse(null));
    }

    @Override
    public RecordTypeRelationDto createRecordTypeRelation(RequestRecordTypeRelationDto requestRecordTypeRelationDto) {
        UUID sourceRecordId = requestRecordTypeRelationDto.getSourceRecordId();
        Record sourceRecord = recordRepository.findById(sourceRecordId).orElseThrow(
                () -> new ObjectNotFoundException(
                        "Source type", sourceRecordId.toString()
                )
        );

        UUID destinationRecordId = requestRecordTypeRelationDto.getDestinationRecordId();
        Record destinationRecord = recordRepository.findById(destinationRecordId).orElseThrow(
                () -> new ObjectNotFoundException(
                        "Destination type", destinationRecordId.toString()
                )
        );

        RecordTypeRelation recordTypeRelation = RecordTypeRelation.builder().typeRelationId(requestRecordTypeRelationDto.getTypeRelationId()).sourceRecord(sourceRecord).destinationRecord(destinationRecord).build();

        RecordTypeRelation inverseRelation = RecordTypeRelation.builder().typeRelationId(requestRecordTypeRelationDto.getTypeRelationId()).sourceRecord(destinationRecord).destinationRecord(sourceRecord).build();

        recordTypeRelationRepository.save(inverseRelation);

        return recordTypeRelationMapper.recordTypeRelationToRecordTypeRelationDto(
                recordTypeRelationRepository.save(recordTypeRelation)
        );
    }

    @Override
    public RecordTypePropertyDto updateRecordProperty(RecordTypePropertyDto recordTypePropertyDto) {
        RecordTypeProperty recordTypeProperty = recordTypePropertyRepository.findById(recordTypePropertyDto.getId()).orElseThrow(
                () -> new ObjectNotFoundException(
                        "Record type property", recordTypePropertyDto.getId().toString()
                )
        );
        recordTypeProperty.setItemValue(recordTypePropertyDto.getItemValue());
        return recordTypePropertyMapper.entityToDto(recordTypePropertyRepository.save(recordTypeProperty));
    }

    @Override
    public void deleteRecordsById(List<UUID> recordIds) {
        String userContextId = SecurityContextHelper.getContextUserId();
        recordIds.forEach(recordId -> {
            Record record = recordRepository.findById(recordId).orElseThrow(
                    () -> new ConcurrentUpdateException(Message.CONCURRENT_UPDATE)
            );
            if (!userContextId.equals(record.getUserId().toString())) {
                throw new AccessDeniedException("You are not allowed to delete this record");
            }
            record.getRecordProperties().forEach(properties -> {
                properties.setDeleted(true);
            });
            record.setDeleted(true);
            recordRepository.save(record);
        });

    }

    @Override
    public ListRecordTypeRelationsDto getListRecordTypeRelationsById(UUID sourceRecordId, String token, String realm) {

        List<RecordTypeRelation> listRecordTypeRelations = recordTypeRelationRepository.findBySourceRecordId(sourceRecordId);
        RecordDto sourceRecordDto;
        Record sourceRecord;

        if (listRecordTypeRelations.isEmpty()) {

            sourceRecord = recordRepository.findById(sourceRecordId).orElse(null);
            sourceRecordDto = recordMapper.recordToRecordDto(sourceRecord);
            if (sourceRecordDto == null) {
                throw new ObjectNotFoundException("Record type relations", sourceRecordId.toString());
            }
        } else {
            sourceRecordDto = recordMapper.recordToRecordDto(listRecordTypeRelations.get(0).getSourceRecord());
            sourceRecord = listRecordTypeRelations.get(0).getSourceRecord();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make the HTTP GET request
        ResponseEntity<List<TypeDto>> response = restTemplate.exchange(
                "http://type-service/api/v1/" + realm + "/types", HttpMethod.GET, entity, new ParameterizedTypeReference<>() {
                }
        );
        List<TypeDto> allType = response.getBody();

        assert sourceRecord != null;
        assert allType != null;
        sourceRecordDto.setType(findTypeById(sourceRecord.getRecordType().getTypeId(), allType));

        return ListRecordTypeRelationsDto.builder().sourceRecord(sourceRecordDto).relations(
                listRecordTypeRelations.stream().map(recordTypeRelation -> {
                    RecordDto destinationRecordDto = recordMapper.recordToRecordDto(recordTypeRelation.getDestinationRecord());
                    TypeDto typeDto = findTypeById(recordTypeRelation.getDestinationRecord().getRecordType().getTypeId(), allType);
//                            System.out.println(recordTypeRelation.getDestinationRecord().getId());

                    RelationItemDto item = relationItemMapper.recordTypeRelationToRelationItemDto(recordTypeRelation);
                    destinationRecordDto.setType(typeDto);
                    item.setDestinationRecord(destinationRecordDto);

                    return item;
                }).toList()

        ).build();
    }

    @Override
    public RecordDto updateStage(RequestUpdateStageDto requestUpdateStageDto, String token, String realm) {

        /* TODO: validate stageId */
        Record record = recordRepository.findById(requestUpdateStageDto.getRecordId()).orElseThrow(
                () -> new ObjectNotFoundException(
                        Record.class.getSimpleName(), requestUpdateStageDto.getRecordId().toString()
                )
        );
        RecordStage recordStage = record.getRecordStage();
        recordStage.setStageId(requestUpdateStageDto.getStageId());
        record.setRecordStage(recordStage);

        String userId = tokenService.extractClaim(token.split(" ")[1], claims -> claims.get("userId", String.class));
        rabbitMQProducer.sendMessage("record", MessageDto.builder().content("${" + userId + "} Updated " + record.getName() + " stage").title("Stage Updated").createdAt(new Date()).action("update").isRead(false).url("/" + realm + "/record/" + record.getId()).senderId(UUID.fromString(userId)).receiverId(record.getUserId()).build());

        return recordMapper.recordToRecordDto(recordRepository.save(record));
    }

    @Override
    public RecordDto createRecordByTypeId(String companyName, String typeId, String token, CreateRecordRequestDto createRecordRequestDto
    ) {
        String userContextId = SecurityContextHelper.getContextUserId();

        Record recordEntity = Record.builder().userId(UUID.fromString(userContextId)).name(createRecordRequestDto.getRecordName()).build();

        RecordType recordType = RecordType.builder().record(recordEntity).typeId(UUID.fromString(typeId)).build();
        recordEntity.setRecordType(recordType);

        if (createRecordRequestDto.getStageId() != null) {
            RecordStage recordStage = RecordStage.builder().record(recordEntity).stageId(createRecordRequestDto.getStageId()).build();
            recordEntity.setRecordStage(recordStage);
        }

        List<RecordTypeProperty> recordTypeProperties = new ArrayList<>();
        for (RecordTypePropertyDto recordTypePropertyDto : createRecordRequestDto.getProperties()) {
            RecordTypeProperty recordTypeProperty = RecordTypeProperty.builder().itemValue(recordTypePropertyDto.getItemValue()).propertyName(recordTypePropertyDto.getPropertyName()).recordTypePropertyLabel(recordTypePropertyDto.getPropertyLabel()).record(recordEntity).build();

            recordTypeProperties.add(recordTypeProperty);
        }
        recordEntity.setRecordProperties(recordTypeProperties);
        recordEntity.setCompanyName(companyName);

        return recordMapper.recordToRecordDto(recordRepository.save(recordEntity));
    }

    @Override
    public RecordDto updateRecordByRecordId(String recordId, String token, RecordDto updateRecordRequestDto) {
        Record recordEntity = recordRepository.findById(UUID.fromString(recordId)).orElseThrow(
                () -> new ObjectNotFoundException(
                        "Record", recordId
                )
        );
        recordEntity.setName(updateRecordRequestDto.getName());

        if (updateRecordRequestDto.getCurrentStageId() != null) {
            RecordStage recordStage = recordStageRepository.findByRecordId(recordEntity.getId());
            if (recordStage == null) {
                recordStage = new RecordStage();
            }
            recordStage.setStageId(updateRecordRequestDto.getCurrentStageId());
        } else {
            recordEntity.setRecordStage(null);
        }

        for (RecordTypePropertyDto recordTypePropertyDto : updateRecordRequestDto.getRecordProperties()) {
            RecordTypeProperty recordTypeProperty = recordTypePropertyRepository.findById(recordTypePropertyDto.getId()).orElse(null);
            if (recordTypeProperty != null) {
                recordTypeProperty.setItemValue(recordTypePropertyDto.getItemValue());
            }

            recordEntity.getRecordProperties().add(recordTypeProperty);
        }

        String userId = tokenService.extractClaim(token.split(" ")[1], claims -> claims.get("userId", String.class));
        rabbitMQProducer.sendMessage("record", MessageDto.builder().content("${" + userId + "} Updated " + recordEntity.getName()).title("Record Updated").createdAt(new Date()).action("update").isRead(false).url("/record/" + recordEntity.getId()).senderId(UUID.fromString(userId)).receiverId(recordEntity.getUserId()).build());

        return recordMapper.recordToRecordDto(recordRepository.save(recordEntity));
    }

    @Override
    public List<RecordDto> createListRecord(String realm, String token, List<CreateRecordRequestDto> createRecordRequestDtos) {
        return createRecordRequestDtos.stream().map(createRecordRequestDto -> createRecordByTypeId(
                realm, createRecordRequestDto.getTypeId().toString(), token, createRecordRequestDto)).toList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object getRecordInElasticsearch(HttpServletRequest request) throws IOException {
        List<String> permissions = SecurityContextHelper.getContextAuthorities();
        String userId = SecurityContextHelper.getContextUserId();
        if (!"POST".equalsIgnoreCase(request.getMethod())) {
            return null;
        }
        // Read the request body using InputStream
        InputStream inputStream = request.getInputStream();
        byte[] requestBodyBytes = inputStream.readAllBytes();
        String requestBody = new String(requestBodyBytes, StandardCharsets.UTF_8);
        // Create ObjectMapper instance
        ObjectMapper objectMapper = new ObjectMapper();
        // Convert JSON string to Object
        Map requestBodyMap = objectMapper.readValue(requestBody, Map.class);

        // Get the 'query.bool.must' part of the JSON
        List<Object> mustList = (List<Object>) ((Map<String, Object>) ((Map<String, Object>) requestBodyMap.get("query")).get("bool")).get("must");

        // Create the new JSON object to add
        Map<String, Object> deletedMatch = Map.of("match", Map.of("deleted", false));

        mustList.add(deletedMatch);

        if (!permissions.contains(PermissionType.READ_ALL.getPermission())) {



            // Create the new JSON object to add
            Map<String, Object> newUserMatch = Map.of("match", Map.of("user_id", userId));

            // Add the new JSON object to the 'must' list
            mustList.add(newUserMatch);

        }

        return restTemplateBuilder.build().postForObject(elasticsearchUrl, requestBodyMap, Object.class);
    }

    public TypeDto findTypeById(UUID typeId, List<TypeDto> allType) {
        return allType.stream().filter(typeDto -> typeDto.getId().equals(typeId)).findFirst().orElse(null);
    }
}
