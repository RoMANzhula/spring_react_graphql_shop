# Spring React GraphQL Store

## Description
This project is a **Spring Boot** and **GraphQL** based backend for a grocery store application, integrated with **React** on the frontend. It provides API endpoints for managing products, orders, and user authentication.

## Technologies
The project utilizes the following technologies:
- **Java 22**
- **Spring Boot 3.3.0**
- **Spring Boot Starter GraphQL** (for GraphQL API support)
- **Spring Boot Starter Web** (for RESTful API support)
- **Spring Boot Starter Security** (for authentication and authorization)
- **Spring Boot Starter Data JPA** (for database interactions)
- **Spring Boot Starter Actuator** (for monitoring and management)
- **H2 Database** (for in-memory data storage)
- **Flyway** (for database migrations)
- **JWT (JSON Web Token)** (for secure authentication)
- **Spring WebFlux** (for reactive programming)
- **Spring Boot Starter Test & Spring GraphQL Test** (for testing)

## Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/RoMANzhula/spring-react-graphql-grocery-store.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd spring-react-graphql-grocery-store
   ```
3. **Build and run the application using Maven:**
   ```sh
   mvn spring-boot:run
   ```

## API Documentation
GraphQL API is available at:
```
http://localhost:8080/graphql
```

## Authentication
- The project uses **JWT (JSON Web Token)** for authentication.
- Secure endpoints require a valid **JWT token** in the request header.
