call mvn clean install -DskipTests
start java -jar ./target/authentication-0.0.1-SNAPSHOT.jar --spring.profiles.active=build
exit