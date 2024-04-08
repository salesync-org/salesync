# Use a lightweight Java base image - adjust the version as needed
FROM openjdk:17-alpine 

# Create a working directory for your app
WORKDIR /app

# Copy the JAR file from the 'artifacts' directory (created by your build step)
COPY artifacts/*.jar authentication.jar

# Define the command to execute when the container starts
ENTRYPOINT ["java", "-jar", "authentication.jar"]
