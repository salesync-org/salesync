call mvn clean package -DskipTests
start  java -jar ./target/api-gateway-0.0.1-SNAPSHOT.jar --spring.profiles.active=build
exit