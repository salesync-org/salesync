package org.salesync.record_service.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.*;
import org.salesync.record_service.constants.Route;
import org.salesync.record_service.dtos.record_type_relation_dto.ListRecordTypeRelationsDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RequestRecordTypeRelationDto;
import org.salesync.record_service.entities.RecordTypeRelation;
import org.salesync.record_service.services.record.RecordService;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/{realm}" + Route.RECORD_ROUTE)
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;
    private final Environment environment;

    @PostMapping(Route.LIST_RECORD)
    public ResponseEntity<ListRecordsResponseDto> getFilteredRecords(@Valid @RequestBody ListRecordsRequestDto listRecordsRequestDto) {
        return ResponseEntity.ok(recordService.getFilteredRecords(listRecordsRequestDto));
    }

    @GetMapping(Route.RECORD_ID)
    public RecordDto getRecordById(@PathVariable String recordId) {
        return recordService.getRecordById(recordId);
    }

    @GetMapping
    public List<RecordDto> getAllRecords() {
        return recordService.getAllRecords();
    }

    @PostMapping
    public RecordDto createRecordByType(@RequestBody RequestRecordDto requestRecordDto) {
        return recordService.createRecordByType(requestRecordDto);
    }

    @PostMapping(Route.RECORD_TYPE_RELATION)
    public RecordTypeRelationDto createRecordTypeRelation(@RequestBody RequestRecordTypeRelationDto requestRecordTypeRelationDto) {

        RestTemplate restTemplate = new RestTemplate();
        String apiGatewayUrl = environment.getProperty("API_GATEWAY_URL");
        System.out.println(apiGatewayUrl);
        return recordService.createRecordTypeRelation(requestRecordTypeRelationDto);
    }

    @GetMapping(Route.LIST_RECORD_TYPE_RELATION)
    public ListRecordTypeRelationsDto getListRecordTypeRelationsById(@PathVariable String sourceRecordId, @PathVariable String realm) {
        RestTemplate restTemplate = new RestTemplate();
        String apiGatewayUrl = environment.getProperty("API_GATEWAY_URL");
        System.out.println(apiGatewayUrl);
        String url = String.format("%s/%s/types/%s", apiGatewayUrl, realm, );
        restTemplate.postForObject(apiGatewayUrl + "/" " realms", recordTypePropertyDto, RecordTypePropertyDto.class);
        return recordService.getListRecordTypeRelationsById(UUID.fromString(sourceRecordId));
    }

    @PutMapping(Route.PROPERTY)
    public ResponseEntity<RecordTypePropertyDto> updateRecordProperty(@RequestBody RecordTypePropertyDto recordTypePropertyDto) {
        return ResponseEntity.ok(recordService.updateRecordProperty(recordTypePropertyDto));
    }

    @DeleteMapping
    public ResponseEntity deleteRecordsById(@RequestBody List<UUID> recordIds) {
        recordService.deleteRecordsById(recordIds);
        return ResponseEntity.noContent().build();
    }
}
