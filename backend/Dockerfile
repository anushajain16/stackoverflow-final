# --- Stage 1: Build the application using Maven ---
FROM maven:3.8.5-eclipse-temurin-21 AS build

# Set working directory for build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY backend/src ./src

# Package the application
RUN mvn clean package -DskipTests

# --- Stage 2: Run the application ---
FROM eclipse-temurin:21-jdk

# Set working directory for runtime
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (make sure this matches your Spring Boot server.port)
EXPOSE 9090

# Start the Spring Boot application
CMD ["java", "-jar", "app.jar"]
