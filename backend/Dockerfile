# Use Eclipse Temurin base image with Java 21
FROM eclipse-temurin:21-jdk

# Set working directory inside the container
WORKDIR /app

# Copy the JAR file built from Maven into the container
COPY backend/target/stackoverflow-0.0.1-SNAPSHOT.jar app.jar

# Expose port for local testing (Railway uses $PORT)
EXPOSE 9090

# Start the Spring Boot application
CMD ["java", "-jar", "app.jar"]
