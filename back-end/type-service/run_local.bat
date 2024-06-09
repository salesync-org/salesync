call mvn clean package -DskipTests
start java -jar ./target/type-service-0.0.1-SNAPSHOT.jar --spring.profiles.active=build
exit