# Pablo-Med Backend 

## Pre-requisites

* JDK 17
* Docker

## Commands

### `gradle bootRun`

Builds source code if necessary and starts spring boot server on `8080` port

### `gradle bootRun --args='--spring.profiles.active=local'`

- Builds source code if necessary, sets the active profile and starts spring boot server on `8080` port
- Active profile local is for local development
### `gradle clean build`

Cleans all build files and executes all build, lint, test tasks

### `gradle test`

Executes project tests

## API Specification

- After application startup REST API specification ( Swagger OpenAPI ) is available at:
#### `http://localhost:8080/swagger-ui/index.html`


## IntelliJ IDEA

## Enterprise edition
### Set the active profiles:
- Go to "Run" - "Edit Configurations..." - Select "Spring Boot" and expand the arrow - Select "PablomedApplication" - find field "Active profiles:" and set it to "local" (for local development)

## Community edition
### Set the active profiles:
- Go to "Run" - "Edit Configurations..." - Dropdown "Modify options" and check "Add VM options". In new textfield that appeared,
paste:`-Dspring.profiles.active=local`
### Run
- To run the application go to PablomedApplication.java and click green arrow, or use  the one at the top menu instead

## Database

### Launching PostgreSQL database with Docker container:

- ###  launch and init db
  `docker compose up -d`

- ###  recreate db / cleanup
  `docker compose down -v && docker compose up -d`