FROM quay.io/keycloak/keycloak:latest as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_FEATURES=token-exchange,admin-fine-grained-authz

WORKDIR /opt/keycloak

FROM quay.io/keycloak/keycloak:24.0.1

// from here
# Copy certificates from local machine into the image
COPY server.p12 conf/server.keystore
COPY /home/ec2-user/theme:/opt/keycloak/themes

# Specify your actual database connection values here
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://authentication-db.cngok4ms0n0a.ap-southeast-2.rds.amazonaws.com:5432/postgres
ENV KC_DB_USERNAME=postgres
ENV KC_DB_PASSWORD=authentication

# Must be a valid HTTPS URL if you expect secure connections
ENV KC_HOSTNAME=authentication-service.salesync.org
ENV KC_HOSTNAME_ADMIN_URL=https://authentication-service.salesync.org
// to here

ENV KC_HTTPS_PROTOCOLS=TLSv1.3,TLSv1.2
ENV KC_HTTP_PORT=8380

ENV KC_HOSTNAME_STRICT_HTTPS=true
ENV KC_HTTP_ENABLED=false
ENV KC_PROXY=edge

ENV KC_FEATURES=token-exchange,admin-fine-grained-authz
ENV PROXY_ADDRESS_FORWARDING=true
ENV KC_HOSTNAME_STRICT_BACKCHANNEL=true

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
/etc/letsencrypt/live/gateway.salesync.org/fullchain.pem