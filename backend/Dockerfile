# --- Stage 1: Build the application using Maven + JDK 21 ---
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set working directory for build
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY backend/src ./src

# Package the application
RUN mvn clean package -DskipTests

# --- Stage 2: Run the application using JDK 21 ---
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy the JAR file from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the app port (Render uses dynamic port via $PORT)
EXPOSE 9090

# Run the application
CMD ["java", "-jar", "app.jar"]
