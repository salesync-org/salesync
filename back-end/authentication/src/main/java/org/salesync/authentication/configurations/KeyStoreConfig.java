package org.salesync.authentication.configurations;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.Certificate;
import java.util.Objects;

@Configuration
@RequiredArgsConstructor
public class KeyStoreConfig {
    private final Environment env;
    Logger logger = LoggerFactory.getLogger(KeyStoreConfig.class);

    public PrivateKey loadPrivateKey() {
        try {
            String keystoreLocation = env.getProperty("keystore.location");
            String keystorePassword = env.getProperty("keystore.password");
            String keyAlias = env.getProperty("keystore.alias");
            KeyStore keystore = KeyStore.getInstance("JKS");
            FileInputStream inputKeyStore = null;
            if (keystoreLocation != null) {
                inputKeyStore = new FileInputStream(keystoreLocation);
            }
            keystore.load(inputKeyStore, Objects.requireNonNull(keystorePassword).toCharArray());
            return (PrivateKey) keystore.getKey(keyAlias, keystorePassword.toCharArray());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public PublicKey loadPublicKey() {
        try {
            String keystoreLocation = env.getProperty("keystore.location");
            String keystorePassword = env.getProperty("keystore.password");
            String keyAlias = env.getProperty("keystore.alias");
            KeyStore keystore = KeyStore.getInstance("JKS");
            logger.info(String.format("Loading keystore from: %s", keystoreLocation));
            assert keystoreLocation != null;
            FileInputStream inputKeyStore = new FileInputStream(keystoreLocation);
            assert keystorePassword != null;
            keystore.load(inputKeyStore, keystorePassword.toCharArray());
            Certificate certificate = keystore.getCertificate(keyAlias);
            logger.info(String.format("PublicKey loaded from keystore: %s", certificate.getPublicKey().getFormat()));
            return certificate.getPublicKey();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
