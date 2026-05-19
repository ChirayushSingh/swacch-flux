# Swachh Flux Backend

Enterprise-grade municipal operations platform backend.

## Setup Instructions

1. **Database**: Ensure PostgreSQL is running. You can use the included Docker setup:
   ```bash
   docker-compose up -d
   ```

2. **Environment**: Create a `.env` file in the `server` directory:
   ```env
   DATABASE_URL="postgresql://swachh_user:swachh_password@localhost:5432/swachh_flux"
   JWT_SECRET="your_secret_key"
   PORT=5000
   NODE_ENV=development
   ```

3. **Migrations**:
   ```bash
   npx prisma migrate dev
   ```

4. **Seed Data**:
   ```bash
   npx prisma db seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

## API Documentation
The API follows a modular structure. Main endpoints:
- `/api/v1/auth`: Authentication
- `/api/v1/complaints`: Complaint operations
- `/api/v1/tenants`: Organization management
