# Sử dụng Maven image để build ứng dụng
FROM maven:3.8.5-openjdk-17 AS build

# Thiết lập thư mục làm việc cho từng service và build chúng
WORKDIR /type
COPY type-service /type
RUN mvn clean package -DskipTests

# Sử dụng OpenJDK image để chạy các ứng dụng
FROM openjdk:17-jdk-slim

# Thiết lập thư mục làm việc cho container runtime
WORKDIR /app

# Copy các jar file từ bước build vào container hiện tại
COPY --from=build /type/target/*.jar type.jar


# Copy file cấu hình vào container
COPY type-service/src/main/resources/application-local.properties /app/type-application-local.properties

# Copy file auth-publickey.pem vào container
COPY auth-publickey.pem /app/auth-publickey.pem

# set environment variables
ENV TOKEN_KEY_LOCATION=/app/auth-publickey.pem

# Script để chạy tất cả các services
COPY run-services.sh /app/run-services.sh
RUN chmod +x /app/run-services.sh

# Command để chạy script khởi động các ứng dụng
ENTRYPOINT ["/app/run-services.sh"]
