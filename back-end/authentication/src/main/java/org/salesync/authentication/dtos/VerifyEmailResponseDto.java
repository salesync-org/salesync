package org.salesync.authentication.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.keycloak.representations.AccessTokenResponse;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class VerifyEmailResponseDto extends AccessTokenResponse {
    private String firstName = "";
    private String lastName = "";
    private String realmName = "";
    private String email;
    private String userId = "";
    private String userName = "";
    private String avatarUrl = "";
}
