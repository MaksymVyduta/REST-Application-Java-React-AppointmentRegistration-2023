FROM openjdk:17.0.1

COPY build/libs/pablo-med-api-*-SNAPSHOT.jar pablo-med-api.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/pablo-med-api.jar"]