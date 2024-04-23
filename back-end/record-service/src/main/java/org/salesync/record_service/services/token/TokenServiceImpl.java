package org.salesync.record_service.services.token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.PublicKey;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPublicKey;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    @Value("${token.public-key}")
    private String publicKey;

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    @Override
    public boolean isExpiredToken(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()) //public key
                .build().parseClaimsJws(token).getBody();
    }

    private RSAPublicKey getSigningKey() {
        try {
            byte[] keyBytes = publicKey.getBytes();
            InputStream inputStream = new ByteArrayInputStream(keyBytes);
            CertificateFactory certificateFactory = CertificateFactory.getInstance("X.509");
            X509Certificate certificate = (X509Certificate) certificateFactory.generateCertificate(inputStream);

            // Extract the public key from the certificate
            PublicKey publicKey = certificate.getPublicKey();

            // Convert the public key to RSAPublicKey
            return (RSAPublicKey) publicKey;
        } catch (CertificateException e) {
            throw new RuntimeException(e);
        }
    }
}
