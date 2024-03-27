package org.salesync.authentication.helpers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class SettingsManager {
    private static final String SETTINGS_FILE_PATH = "default_settings.json";

    public String loadSettingsFromFile() throws IOException {
        Resource resource = new ClassPathResource("db/" + SETTINGS_FILE_PATH);

        File file = resource.getFile();
        InputStream inputStream = new FileInputStream(file);

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(mapper.readTree(inputStream));
        } catch (JsonProcessingException e) {
            throw new IOException("Error parsing settings file.", e);
        }
    }


    public JsonNode parseSettings(String settingsString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readTree(settingsString);
        } catch (JsonProcessingException e) {
            throw new IOException("Error parsing settings string.", e);
        }
    }

    public JsonNode modifyLayoutOrder(JsonNode settingsNode, String layoutName, JsonNode newLayoutItems) {
        JsonNode layoutOrder = settingsNode.path("layout_order");

        if (layoutOrder.isMissingNode()) {
            return settingsNode;
        }

        ((ObjectNode) layoutOrder).replace(layoutName, newLayoutItems);

        return settingsNode;
    }

    public String updatedSettingsString(JsonNode settingsNode) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(settingsNode);
        } catch (JsonProcessingException e) {
            throw new IOException("Error converting updated settings to string.", e);
        }
    }
}
