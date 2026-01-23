# Architecture Diagram

```mermaid
graph TB
    %% Components Layer
    subgraph "Presentation Layer"
        C1[React Components]
        C2[Pages]
        C3[Hooks]
    end

    %% Service Layer
    subgraph "Service Layer"
        S1[CourrierService]
        S2[UserService]
        S3[DepartmentService]
        S4[StatsService]
        S5[NotificationService]
        BS[BaseService]
    end

    %% Repository Layer
    subgraph "Repository Layer"
        R1[CourrierRepository]
        R2[UserRepository]
        R3[DepartmentRepository]
        R4[StatsRepository]
        R5[NotificationRepository]
        IR[IRepository Interface]
    end

    %% Infrastructure Layer
    subgraph "Infrastructure Layer"
        HC[HttpClient]
        CA[CacheService]
        ER[ErrorHandler]
        CO[ConfigService]
    end

    %% External Systems
    subgraph "External"
        API[REST API]
        DB[(Database)]
    end

    %% Relationships
    C1 --> S1
    C1 --> S2
    C1 --> S3

    S1 --> BS
    S2 --> BS
    S3 --> BS
    S4 --> BS
    S5 --> BS

    S1 --> R1
    S2 --> R2
    S3 --> R3
    S4 --> R4
    S5 --> R5

    R1 --> IR
    R2 --> IR
    R3 --> IR
    R4 --> IR
    R5 --> IR

    R1 --> HC
    R2 --> HC
    R3 --> HC
    R4 --> HC
    R5 --> HC

    HC --> API
    API --> DB

    R1 --> CA
    CA --> HC

    HC --> ER
    ER --> CO

    %% Styling
    classDef serviceClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef repositoryClass fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef infraClass fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef externalClass fill:#fff3e0,stroke:#e65100,stroke-width:2px

    class S1,S2,S3,S4,S5,BS serviceClass
    class R1,R2,R3,R4,R5,IR repositoryClass
    class HC,CA,ER,CO infraClass
    class API,DB externalClass
```

## Class Diagram

```mermaid
classDiagram
    class BaseService {
        +getAll(filters?): ApiResponse<T[]>
        +getById(id): ApiResponse<T>
        +create(data): ApiResponse<T>
        +update(id, data): ApiResponse<T>
        +delete(id): ApiResponse<void>
    }

    class IRepository {
        +getAll(filters?): ApiResponse<T[]>
        +getById(id): ApiResponse<T>
        +create(data): ApiResponse<T>
        +update(id, data): ApiResponse<T>
        +delete(id): ApiResponse<void>
    }

    class CourrierService {
        -endpoint: string
        +getPending(): ApiResponse<Courrier[]>
        +assignToDepartment(id, deptId): ApiResponse<Courrier>
        +getByPorteur(porteurId): ApiResponse<Courrier[]>
    }

    class CourrierRepository {
        -httpClient: IHttpClient
        +getAll(filters?): ApiResponse<Courrier[]>
        +getById(id): ApiResponse<Courrier>
    }

    class HttpClient {
        -baseURL: string
        +get<T>(endpoint, params?): ApiResponse<T>
        +post<T>(endpoint, data?): ApiResponse<T>
        +put<T>(endpoint, data?): ApiResponse<T>
        +delete<T>(endpoint): ApiResponse<T>
    }

    BaseService <|-- CourrierService
    IRepository <|.. CourrierRepository
    CourrierRepository --> HttpClient
    CourrierService --> CourrierRepository
```

## Sequence Diagram - Service Call Flow

```mermaid
sequenceDiagram
    participant Component
    participant Service
    participant Repository
    participant HttpClient
    participant API

    Component->>Service: getPending()
    Service->>Repository: getAll({status: 'pending'})
    Repository->>HttpClient: get('/courriers?status=pending')
    HttpClient->>API: GET /courriers?status=pending
    API-->>HttpClient: Response
    HttpClient-->>Repository: ApiResponse<Courrier[]>
    Repository-->>Service: ApiResponse<Courrier[]>
    Service-->>Component: ApiResponse<Courrier[]>
```

## Directory Structure

```
src/
├── services/
│   ├── base/
│   │   ├── BaseService.ts
│   │   └── interfaces.ts
│   ├── courriers/
│   │   ├── CourrierService.ts
│   │   └── CourrierRepository.ts
│   ├── users/
│   │   ├── UserService.ts
│   │   └── UserRepository.ts
│   ├── departments/
│   │   ├── DepartmentService.ts
│   │   └── DepartmentRepository.ts
│   ├── stats/
│   │   ├── StatsService.ts
│   │   └── StatsRepository.ts
│   ├── notifications/
│   │   ├── NotificationService.ts
│   │   └── NotificationRepository.ts
│   ├── infrastructure/
│   │   ├── HttpClient.ts
│   │   ├── CacheService.ts
│   │   ├── ErrorHandler.ts
│   │   └── ConfigService.ts
│   ├── ServiceRegistry.ts
│   └── index.ts
├── repositories/
│   └── interfaces/
│       └── IRepository.ts
└── types/
    └── api.ts