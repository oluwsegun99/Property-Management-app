# Homecrescent Backend

A comprehensive property management and real estate platform built with NestJS, GraphQL, Prisma, and PostgreSQL. This backend service powers the Homecrescent application, enabling property listings, mortgage management, investment opportunities, inspections, and financial transactions.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [GraphQL API](#graphql-api)
- [Typesense Integration](#typesense-integration)
- [Available Scripts](#available-scripts)

## Features

- **User Management**: Registration, authentication with JWT, role-based access control, and two-factor authentication
- **Property Management**: Create, update, and manage property listings with detailed information
- **Developer Companies**: Company profiles, team management, and project oversight
- **Projects & Prototypes**: Manage real estate development projects with reusable property prototypes
- **Location Services**: Country, state, city, and neighborhood management
- **Property Search**: Advanced search capabilities powered by Typesense
- **Inspection Scheduling**: Schedule and manage property inspections
- **Mortgage System**: Comprehensive mortgage application and payment tracking
- **Investment Management**: Investment opportunities with scheduled payments
- **Financial Transactions**: User wallets, payment tracking, and transaction history
- **Finance Companies**: Financier management and mortgage financing
- **Property Purchase Requests**: Handle property purchase workflows with installment options

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v9
- **Language**: TypeScript
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL
- **ORM**: Prisma v4.14.0
- **Search Engine**: Typesense
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator & class-transformer
- **Container**: Docker & Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16 or higher
- **Yarn**: v1.22 or higher
- **Docker**: For running PostgreSQL database
- **Docker Compose**: For orchestrating containers

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://homecrescent:password@localhost:5433/homecrescentDb"

# JWT Configuration
JWT_ACCESS_SECRET="your-access-token-secret"
JWT_REFRESH_SECRET="your-refresh-token-secret"

# Typesense Configuration
TYPESENSE_HOST="localhost"
TYPESENSE_PORT="8108"
TYPESENSE_PROTOCOL="http"
TYPESENSE_API_KEY="your-typesense-api-key"

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Installation

Install all project dependencies:

```bash
$ yarn install
```

This will install all required packages defined in `package.json`, including NestJS core modules, Prisma client, GraphQL dependencies, and other utilities.

## Database Setup

### 1. Start the PostgreSQL Database

Use Docker Compose to start the PostgreSQL database:

```bash
$ docker-compose up -d
```

This will start a PostgreSQL 13 instance on port `5433` with the following credentials:
- **User**: `homecrescent`
- **Password**: `password`
- **Database**: `homecrescentDb`

### 2. Run Database Migrations

Apply all existing migrations to set up the database schema:

```bash
$ npx prisma migrate deploy
```

This command will create all necessary tables, relationships, and constraints defined in the Prisma migrations.

### 3. Generate Prisma Client

Generate the Prisma client based on your schema:

```bash
$ npx prisma generate
```

This creates type-safe database client code for TypeScript.

### 4. Seed the Database (Optional)

Populate the database with initial data:

```bash
$ ts-node src/seeds.ts
```

This will create default roles, property statuses, and other enumeration values required by the application.

## Running the Application

### Development Mode

Start the application in development mode with auto-reload:

```bash
$ yarn run start:dev
```

The server will start on `http://localhost:3000` and automatically restart when you make changes to the code.

### Production Mode

Build and run the application in production mode:

```bash
# Build the application
$ yarn run build

# Start production server
$ yarn run start:prod
```

Note: The build script automatically runs migrations, generates Prisma client, seeds the database, and compiles TypeScript.

### Standard Mode

Start the application without auto-reload:

```bash
$ yarn run start
```

### Debug Mode

Start the application in debug mode:

```bash
$ yarn run start:debug
```

This enables Node.js debugging for use with Chrome DevTools or your IDE's debugger.

## Development Workflow

### Generating GraphQL Types

After modifying your GraphQL schema, regenerate TypeScript types:

```bash
$ yarn gen:graphql
```

This command uses `ts-morph` to generate TypeScript interfaces from your `schema.graphql` file.

### Database Schema Changes

When modifying the Prisma schema:

1. Update `prisma/schema.prisma`
2. Create a new migration:
   ```bash
   $ npx prisma migrate dev --name description_of_changes
   ```
3. Generate the updated Prisma client:
   ```bash
   $ npx prisma generate
   ```

### Typesense Schema Setup

Initialize or update Typesense search indices:

```bash
$ yarn gen:typesense
```

This creates search collections for properties and property categories in Typesense.

## Testing

### Unit Tests

Run unit tests:

```bash
$ yarn test
```

### Watch Mode

Run tests in watch mode for continuous testing during development:

```bash
$ yarn test:watch
```

### Test Coverage

Generate a test coverage report:

```bash
$ yarn test:cov
```

Coverage reports will be available in the `coverage/` directory.

### End-to-End Tests

Run E2E tests:

```bash
$ yarn test:e2e
```

### Debug Tests

Run tests in debug mode:

```bash
$ yarn test:debug
```

## Project Structure

```
src/
├── admin/              # Admin user management
├── auth/               # Authentication & authorization
├── common/             # Shared utilities
│   ├── decorators/     # Custom decorators (roles, user extraction)
│   ├── enums/          # TypeScript enums
│   ├── guards/         # Auth guards (JWT, roles)
│   ├── strategies/     # Passport strategies
│   ├── typesenseSchema/ # Typesense collection schemas
│   ├── validationFunctions/ # Custom validation logic
│   └── validators/     # Custom class validators
├── company/            # Developer company management
├── inspection/         # Property inspection scheduling
├── investment/         # Investment management
├── location/           # Location services (countries, states, cities)
├── mortgage/           # Mortgage application & payment system
├── prisma/             # Prisma service & module
├── property/           # Property listing management
├── role/               # Role management
├── typesense/          # Typesense search service
├── user/               # User management
├── app.module.ts       # Root application module
├── main.ts             # Application entry point
├── schema.graphql      # GraphQL schema definition
└── seeds.ts            # Database seeding script
```

## GraphQL API

The application exposes a GraphQL API endpoint at `/graphql`. 

### GraphQL Playground

Access the GraphQL Playground in development mode:

```
http://localhost:3000/graphql
```

### Key Features

- **Authentication Mutations**: Login, register, token refresh
- **Property Queries**: Search and filter properties
- **Property Mutations**: Create, update, and manage listings
- **User Queries**: Retrieve user profiles and wishlists
- **Mortgage Mutations**: Apply for mortgages and manage payments
- **Investment Mutations**: Create investments and track payments
- **Inspection Mutations**: Schedule property inspections

### Example Query

```graphql
query GetProperties {
  properties(take: 10) {
    id
    name
    description
    price
    propertyStatus {
      propertyStatus
    }
    category {
      categoryName
    }
  }
}
```

## Typesense Integration

The application uses Typesense for fast and typo-tolerant property search. Key features:

- Full-text search across property listings
- Faceted filtering by category, location, price range
- Geo-search capabilities
- Auto-complete suggestions

Import data to Typesense after seeding the database:

```bash
$ yarn gen:typesense
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn build` | Build the application for production |
| `yarn start` | Start the application |
| `yarn start:dev` | Start in development mode with auto-reload |
| `yarn start:prod` | Start the built application in production mode |
| `yarn start:debug` | Start in debug mode |
| `yarn gen:graphql` | Generate TypeScript types from GraphQL schema |
| `yarn gen:typesense` | Initialize Typesense search indices |
| `yarn format` | Format code with Prettier |
| `yarn lint` | Lint and fix code with ESLint |
| `yarn test` | Run unit tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:cov` | Generate test coverage report |
| `yarn test:e2e` | Run end-to-end tests |
| `yarn test:debug` | Run tests in debug mode |

## License

UNLICENSED - This project is private and proprietary.
