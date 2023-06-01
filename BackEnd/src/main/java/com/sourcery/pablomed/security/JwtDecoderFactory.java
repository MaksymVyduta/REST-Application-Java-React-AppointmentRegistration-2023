package com.sourcery.pablomed.security;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import io.micrometer.core.instrument.util.IOUtils;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.interfaces.RSAPublicKey;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class JwtDecoderFactory {
    public static NimbusJwtDecoder createDecoder(String jwkSetUri) throws Exception {
        //Pobierami z naszego URl klucze
        URL jwkSetUrl = new URL(jwkSetUri);
        String jwkSetJson = IOUtils.toString(jwkSetUrl.openStream(), StandardCharsets.UTF_8);

        JWKSet jwkSet = JWKSet.parse(jwkSetJson);
        Map<String, JWK> jwkMap = jwkSet
                .getKeys()
                .stream()
                .collect(Collectors.toMap(JWK::getKeyID, Function.identity()));

        // Szukamy JWK z algotytmem (RS256)
        JWK rsaJwk = jwkMap
                .values()
                .stream()
                .filter(jwk -> jwk instanceof RSAKey
                        && jwk
                        .getAlgorithm()
                        .getName()
                        .equals("RS256"))
                .findFirst()
                .orElse(null);
        if (rsaJwk == null) {
            throw new IllegalArgumentException("No RSA JWK with RS256 algorithm found in JWK set at " + jwkSetUri);
        }

        // Konwertacja RSA JWK w RSAPublicKey
        RSAKey rsaKey = (RSAKey) rsaJwk;
        RSAPublicKey publicKey = (RSAPublicKey) rsaKey.toPublicKey();

        // Nasz dekodaer
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withPublicKey(publicKey).build();

        return jwtDecoder;
    }

}