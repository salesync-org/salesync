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
public class NewUserDto {
    @JsonProperty("first_name")
    private String firstName = "";

    @JsonProperty("last_name")
    private String lastName = "User";

    @JsonProperty("job_title")
    private String jobTitle = "";

    @JsonProperty("phone")
    private String phone = "";

    @JsonProperty("email")
    private String email;
}
