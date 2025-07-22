# --- Stage 1: Build the application using Maven + JDK 21 ---
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set working directory inside the container
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# --- Stage 2: Run the app using built JAR ---
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the built JAR from stage 1
COPY --from=build /app/target/*.jar app.jar

EXPOSE 9090

CMD ["java", "-jar", "app.jar"]
