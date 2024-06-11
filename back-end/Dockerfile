FROM openjdk:17-jdk-slim
VOLUME /temp/upload/board_images
ENV SPRING_PROFILES_ACTIVE=docker
ARG JAR_FILE=build/libs/back-end-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 3300
ENTRYPOINT ["java", "-jar", "app.jar"]