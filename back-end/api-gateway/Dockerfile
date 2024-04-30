# Create a new image for running the application
FROM maven:3.8.3-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the project files into the container
COPY . .

# Build the Maven project
RUN mvn clean package -DskipTests

# Create a new image for running the application
FROM openjdk:17-alpine

# Set the working directory in the container
# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/*.jar app.jar
# Copy the built JAR file from the previous stage
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
