package org.salesync.type_service.services.type;

import com.salesync.typeservice.dtos.RelationTypeRequestDto;
import com.salesync.typeservice.dtos.RelationTypeResponseDto;
import com.salesync.typeservice.dtos.TemplateDto;
import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.entities.Relation;
import com.salesync.typeservice.entities.Template;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.repositories.RelationRepository;
import com.salesync.typeservice.repositories.TemplateRepository;
import com.salesync.typeservice.repositories.TypeRelationRepository;
import com.salesync.typeservice.repositories.TypeRepository;
import com.salesync.typeservice.services.type.TypeService;
import com.salesync.typeservice.services.type.TypeServiceImpl;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.Optional;
import java.util.UUID;

public class TypeServiceTest {
	private TemplateRepository templateRepository;
	private TypeRepository typeRepository;
	private RelationRepository relationRepository;
	private TypeService typeService;

	@Before
	public void setUp() {
		templateRepository = Mockito.mock(TemplateRepository.class);
		typeRepository = Mockito.mock(TypeRepository.class);
		relationRepository = Mockito.mock(RelationRepository.class);
		TypeRelationRepository typeRelationRepository = Mockito.mock(TypeRelationRepository.class);
		typeService = TypeServiceImpl.builder()
				.templateRepository(templateRepository)
				.typeRepository(typeRepository)
				.relationRepository(relationRepository)
				.typeRelationRepository(typeRelationRepository)
				.build();
	}

	@After
	public void tearDown() {
		templateRepository = null;
		typeRepository = null;
		typeService = null;
	}

	@Test
	public void testCreateType() {
		// given
		UUID templateId = UUID.randomUUID();
		String companyName = "totnghiep";
		Template template = Template.builder().id(templateId).build();
		TypeDTO typeDTO = TypeDTO.builder().name("Type").template(
				TemplateDto.builder().id(templateId).build()
		).build();
		Type type = Type.builder().name("Type").template(template).companyName(companyName).build();
		Mockito.when(templateRepository.findById(Mockito.eq(templateId))).thenReturn(Optional.of(template));
		Mockito.when(typeRepository.saveAndFlush(Mockito.eq(type))).thenReturn(type);
		// when
		TypeDTO result = typeService.createType(companyName, typeDTO);
		// then
		Assert.assertNotNull(result);
		;
		Assert.assertEquals(type.getName(), result.getName());
		Assert.assertEquals(type.getTemplate().getId(), result.getTemplate().getId());
	}

	@Test
	public void testCreateRelationType() {
		UUID relationId = UUID.randomUUID();
		UUID sourceTypeId = UUID.randomUUID();
		UUID targetTypeId = UUID.randomUUID();
		UUID templateId = UUID.randomUUID();
		String sourceTypeLabel = "sourceType";
		String targetTypeLabel = "targetType";
		Type sourceType = createType(sourceTypeId, "SourceType", templateId);
		Type targetType = createType(targetTypeId, "DestinationType", templateId);
		RelationTypeRequestDto relationTypeRequestDto = RelationTypeRequestDto.builder()
				.sourceTypeId(sourceTypeId)
				.destinationTypeId(targetTypeId)
				.relationId(relationId)
				.sourceTypeLabel(sourceTypeLabel)
				.destinationTypeLabel(targetTypeLabel)
				.build();
		Relation inverseRelation = Relation.builder()
				.name("OneToMany")
				.build();
		Relation relation = Relation.builder()
				.id(relationId)
				.name("ManyToOne")
				.inverseRelation(inverseRelation)
				.build();
		Mockito.when(relationRepository.findById(Mockito.eq(relationId))).thenReturn(Optional.of(relation));
		Mockito.when(typeRepository.findById(Mockito.eq(sourceTypeId))).thenReturn(Optional.of(sourceType));
		Mockito.when(typeRepository.findById(Mockito.eq(targetTypeId))).thenReturn(Optional.of(targetType));
		// when
		RelationTypeResponseDto result = typeService.createRelationType(relationTypeRequestDto);
		// then
		Assert.assertNotNull(result);
		Assert.assertEquals(sourceTypeLabel, result.getSourceTypeLabel());
		Assert.assertEquals(targetTypeLabel, result.getDestinationTypeLabel());
		Assert.assertEquals(relationId, result.getRelation().getId());
		Assert.assertEquals(relation.getName(), result.getRelation().getName());
		Assert.assertEquals(relation.getInverseRelation().getName(), result.getInverseRelation().getName());
		Assert.assertEquals(sourceTypeLabel, result.getSourceTypeLabel());
		Assert.assertEquals(targetTypeLabel, result.getDestinationTypeLabel());

	}

	private Type createType(UUID id, String name, UUID templateId) {
		return Type.builder().id(id).name(name).template(Template.builder().id(templateId).build()).build();
	}

}
