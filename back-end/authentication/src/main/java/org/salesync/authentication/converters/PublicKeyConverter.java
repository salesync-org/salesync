package org.salesync.authentication.converters;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class PublicKeyConverter {
    public static PublicKey convertStringToPublicKey(String pemEncodedKey) throws Exception {
        // Remove the header, footer and whitespace
        String normalizedKey = pemEncodedKey.replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s", "");

        // Decode the Base64 key data
        byte[] keyBytes = Base64.getDecoder().decode(normalizedKey);

        // Create the key specification
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);

        // Generate the key object
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePublic(keySpec);
    }
}
