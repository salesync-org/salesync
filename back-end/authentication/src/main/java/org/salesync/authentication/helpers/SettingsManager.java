package org.salesync.authentication.helpers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class SettingsManager {
    private static final String SETTINGS_FILE_PATH = "default_settings.json";

    public String loadStringSettingsFromFile() {
        try {
            Resource resource = new ClassPathResource("db/" + SETTINGS_FILE_PATH);
            InputStream inputStream = resource.getInputStream();

            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(mapper.readTree(inputStream));
        } catch (IOException e) {
            e.printStackTrace();
            return "{}";
        }
    }

    public JsonNode loadObjectSettingsFromFile() {
        try {
            Resource resource = new ClassPathResource("db/" + SETTINGS_FILE_PATH);

            File file = resource.getFile();
            InputStream inputStream = new FileInputStream(file);

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readTree(inputStream);
        } catch (IOException e) {
            return null;
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

    public String updatedSettingsString(JsonNode settingsNode) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(settingsNode);
        } catch (JsonProcessingException e) {
            throw new IOException("Error converting updated settings to string.", e);
        }
    }
}
