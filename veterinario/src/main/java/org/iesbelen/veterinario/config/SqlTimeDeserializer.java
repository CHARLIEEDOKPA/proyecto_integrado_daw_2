package org.iesbelen.veterinario.config;

import java.io.IOException;
import java.sql.Time;
import java.time.LocalTime;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class SqlTimeDeserializer extends JsonDeserializer<Time> {

    @Override
    public Time deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) 
            throws IOException, JsonProcessingException {
        String timeString = jsonParser.getText();
        return Time.valueOf(LocalTime.parse(timeString));
    }
}