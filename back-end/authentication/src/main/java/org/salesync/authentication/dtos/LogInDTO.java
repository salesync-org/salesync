package org.salesync.authentication.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LogInDTO {
    @JsonProperty("realm")
    String realm;
    @JsonProperty("username")
    String username;
    @JsonProperty("password")
    String password;
}
