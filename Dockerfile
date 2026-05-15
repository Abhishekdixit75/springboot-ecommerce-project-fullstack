# Use a lightweight JRE base image
FROM eclipse-temurin:17-jre-focal

# Add a volume for Spring Boot's embedded Tomcat temporary files
VOLUME /tmp

# Set the working directory
WORKDIR /app

# Add a non-root user for security purposes
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring

# Copy the generated JAR file (using wildcard to avoid version-lock)
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]