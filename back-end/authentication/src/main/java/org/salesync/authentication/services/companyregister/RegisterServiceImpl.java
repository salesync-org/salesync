package org.salesync.authentication.services.companyregister;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.salesync.authentication.components.KeyCloakConfigComponent;
import org.salesync.authentication.dtos.CompanyRegisterDTO;
import org.salesync.authentication.dtos.NewUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements IRegisterService {
    Environment env;
    KeyCloakConfigComponent keycloakConfigComponent;
    @Autowired
    public RegisterServiceImpl(Environment env) {
        this.env = env;
        keycloakConfigComponent = new KeyCloakConfigComponent(env);
    }

    @Override
    public Response registerCompany(CompanyRegisterDTO companyRegisterDTO) {
        System.out.println("Starting registerCompany");
        Keycloak keycloak = null;
        Response adminRegisterResponse = null;
        try {
            keycloak = keycloakConfigComponent.getKeycloakInstance();
            RealmRepresentation realm = new RealmRepresentation();
            String realmName = companyRegisterDTO.getCompanyName().replaceAll("\\s+", "").toLowerCase();
            realm.setRealm(realmName);
            realm.setEnabled(true);
            keycloak.realms().create(realm);
            System.out.println("Created Realm with name: " + realmName);
            adminRegisterResponse = registerUser(companyRegisterDTO.getAdminInfo(), realmName);
            System.out.println("We have registered the admin user" + adminRegisterResponse.toString());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                System.out.println("Closing Keycloak");
                keycloak.close();
            }
        }
        return adminRegisterResponse;
    }

    @Override
    public Response registerUser(NewUserDTO newUserDTO, String realmName) {
        Keycloak keycloak = null;
        Response response = null;
        try {
            keycloak = keycloakConfigComponent.getKeycloakInstance();
            UserRepresentation user = new UserRepresentation();
            user.setEmail(newUserDTO.getEmail());
            user.setUsername(newUserDTO.getEmail());
            user.setFirstName(newUserDTO.getFirstName());
            user.setLastName(newUserDTO.getLastName());
            user.singleAttribute("jobTitle", newUserDTO.getJobTitle());

            response = keycloak.realm(realmName).users().create(user);
            UserRepresentation newUser = keycloak.realm(realmName).users().search(newUserDTO.getEmail()).get(0);
            UserResource userResource = keycloak.realm(realmName).users().get(newUser.getId());
            // The below line of code is not yet performable due to the lack of an email server
//            keycloak.realm(realmName).users().get(newUser.getId()).executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue("admin"); // Bad practice, I know
            credential.setTemporary(true);
            userResource.resetPassword(credential);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                System.out.println("Closing Keycloak");
                keycloak.close();
            }
        }
        return response;
    }
}
