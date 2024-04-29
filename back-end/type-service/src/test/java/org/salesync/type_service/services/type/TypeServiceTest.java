package org.salesync.type_service.services.type;

import com.salesync.typeservice.dtos.TemplateDto;
import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.entities.Template;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.repositories.TemplateRepository;
import com.salesync.typeservice.repositories.TypeRepository;
import com.salesync.typeservice.services.type.TypeService;
import com.salesync.typeservice.services.type.TypeServiceImpl;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.Optional;
import java.util.UUID;

public class TypeServiceTest {
    private TemplateRepository templateRepository;
    private TypeRepository typeRepository;
    private TypeService typeService;

    @Before
    public void setUp() {
        templateRepository = Mockito.mock(TemplateRepository.class);
        typeRepository = Mockito.mock(TypeRepository.class);
        typeService = TypeServiceImpl.builder().templateRepository(templateRepository).typeRepository(typeRepository).build();
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
        TypeDTO typeDTO = TypeDTO.builder().name(templateId.toString()).template(
                TemplateDto.builder().id(templateId).build()
        ).build();
        Template template = Template.builder().id(templateId).build();
        Type type = Type.builder().name(typeDTO.getName()).template(template).build();
        Type savedType = Type.builder().id(UUID.randomUUID()).name(typeDTO.getName()).template(template).build();
        Mockito.when(templateRepository.findById(templateId)).thenReturn(Optional.of(template));
        Mockito.when(typeRepository.save(type)).thenReturn(savedType);

//        TypeDTO result = typeService.createType("totnghiep", typeDTO);
        // Check this function later
//        // when
//        // then
//        Assert.assertNotNull(result);
//        Assert.assertEquals(savedType.getId(), result.getId());
//        Assert.assertEquals(savedType.getName(), result.getName());
//        Assert.assertEquals(savedType.getTemplate().getId(), result.getTemplate().getId());
    }

}
