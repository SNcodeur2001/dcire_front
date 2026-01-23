# Architecture Proposal: Service Layer Refactoring

## Current Issues Identified

### SOLID Principle Violations
- **Single Responsibility**: `api.ts` (304 lines) handles 6+ domains
- **Open/Closed**: Services not easily extensible without modification
- **Interface Segregation**: Monolithic interfaces
- **Dependency Inversion**: Concrete dependencies instead of abstractions

### Code Duplication
- CRUD operations repeated across all services
- Similar filtering patterns (`getAll`, `getById`, etc.)
- Singleton pattern boilerplate

## Proposed Architecture

### 1. Layered Architecture

```
┌─────────────────┐
│   Components    │  ← React components
├─────────────────┤
│ Service Layer   │  ← Business logic services
├─────────────────┤
│ Repository      │  ← Data access abstraction
├─────────────────┤
│   HttpClient    │  ← HTTP communication
└─────────────────┘
```

### 2. Base Service Pattern

```typescript
// src/services/base/BaseService.ts
export abstract class BaseService<T extends { id: string }> {
  protected abstract endpoint: string;

  async getAll(filters?: Record<string, any>): Promise<ApiResponse<T[]>> {
    return this.httpClient.get<T[]>(this.endpoint, filters);
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    return this.httpClient.get<T>(`${this.endpoint}/${id}`);
  }

  async create(data: Omit<T, 'id' | 'createdAt'>): Promise<ApiResponse<T>> {
    return this.httpClient.post<T>(this.endpoint, data);
  }

  async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.httpClient.put<T>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`${this.endpoint}/${id}`);
  }
}
```

### 3. Domain-Specific Services

```typescript
// src/services/courriers/CourrierService.ts
export class CourrierService extends BaseService<Courrier> {
  protected endpoint = '/courriers';

  // Business-specific methods
  async getPending(): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ workflowStatus: 'pending' });
  }

  async assignToDepartment(courrierId: string, departmentId: string): Promise<ApiResponse<Courrier>> {
    return this.update(courrierId, {
      workflowStatus: 'assigned',
      assignedDepartmentId: departmentId,
      updatedAt: new Date().toISOString()
    });
  }
}
```

### 4. Repository Pattern

```typescript
// src/repositories/interfaces/IRepository.ts
export interface IRepository<T extends { id: string }> {
  getAll(filters?: Record<string, any>): Promise<ApiResponse<T[]>>;
  getById(id: string): Promise<ApiResponse<T>>;
  create(data: Omit<T, 'id' | 'createdAt'>): Promise<ApiResponse<T>>;
  update(id: string, data: Partial<T>): Promise<ApiResponse<T>>;
  delete(id: string): Promise<ApiResponse<void>>;
}

// src/repositories/CourrierRepository.ts
export class CourrierRepository implements IRepository<Courrier> {
  constructor(private httpClient: IHttpClient) {}

  async getAll(filters?: Record<string, any>): Promise<ApiResponse<Courrier[]>> {
    return this.httpClient.get<Courrier[]>('/courriers', filters);
  }
  // ... implementation
}
```

### 5. Service Registry / DI Container

```typescript
// src/services/ServiceRegistry.ts
export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services = new Map<string, any>();

  static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  register<T>(key: string, service: T): void {
    this.services.set(key, service);
  }

  get<T>(key: string): T {
    return this.services.get(key);
  }
}

// Usage
const registry = ServiceRegistry.getInstance();
registry.register('courrierService', new CourrierService());
```

## Implementation Plan

### Phase 1: Infrastructure
1. Create `BaseService` abstract class
2. Create repository interfaces
3. Enhance `HttpClient` with better error handling
4. Create service registry

### Phase 2: Domain Services
1. Split `api.ts` into domain services:
   - `CourrierService`
   - `UserService`
   - `DepartmentService`
   - `StatsService`
   - `NotificationService`

### Phase 3: Repository Layer
1. Implement repositories for each domain
2. Add caching capabilities
3. Implement data transformation

### Phase 4: Integration
1. Update component imports
2. Add service interfaces
3. Implement proper dependency injection

## Benefits

### Maintainability
- **Single Responsibility**: Each service handles one domain
- **DRY Principle**: Common operations in base classes
- **Testability**: Interfaces enable mocking

### Scalability
- **Open/Closed**: Easy to add new services without modifying existing code
- **Dependency Injection**: Loose coupling between components

### Developer Experience
- **Type Safety**: Strong typing throughout
- **IntelliSense**: Better IDE support
- **Consistency**: Standardized patterns

## Migration Strategy

1. **Parallel Implementation**: Build new architecture alongside existing code
2. **Gradual Migration**: Migrate services one by one
3. **Backward Compatibility**: Maintain existing API during transition
4. **Testing**: Comprehensive tests for each phase

## Additional Improvements

### Error Handling
```typescript
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
  }
}
```

### Caching Layer
```typescript
export class CacheService {
  private cache = new Map<string, { data: any; expiry: number }>();

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (item && Date.now() < item.expiry) {
      return item.data;
    }
    this.cache.delete(key);
    return null;
  }

  set<T>(key: string, data: T, ttlMs: number = 300000): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs
    });
  }
}
```

### Configuration Management
```typescript
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    timeout: 10000,
    retries: 3
  },
  cache: {
    defaultTtl: 300000 // 5 minutes
  }
};
```

This architecture will significantly improve code maintainability, testability, and scalability while adhering to SOLID principles.