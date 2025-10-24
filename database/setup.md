# Splitrix Database Setup Guide

## Overview
This guide explains how to set up the database for the Splitrix Web3 expense management application. The database is designed to support both traditional expense splitting and Web3 features like dust pool management and blockchain transactions.

## Database Options

### Option 1: PostgreSQL (Recommended)
PostgreSQL is recommended for production use due to its robust features and excellent support for complex queries.

#### Installation
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (with Homebrew)
brew install postgresql
brew services start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

#### Setup
```bash
# Create database
sudo -u postgres createdb splitrix_db

# Create user
sudo -u postgres createuser splitrix_user

# Set password
sudo -u postgres psql
ALTER USER splitrix_user PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE splitrix_db TO splitrix_user;
\q

# Run schema
psql -U splitrix_user -d splitrix_db -f database/schema.sql
```

### Option 2: SQLite (Development)
SQLite is perfect for development and testing due to its simplicity.

#### Setup
```bash
# Install SQLite (usually pre-installed)
sqlite3 splitrix.db < database/schema.sql
```

### Option 3: MySQL
MySQL is also supported for those preferring it.

#### Setup
```bash
# Install MySQL
sudo apt install mysql-server  # Ubuntu/Debian
brew install mysql             # macOS

# Create database
mysql -u root -p
CREATE DATABASE splitrix_db;
CREATE USER 'splitrix_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON splitrix_db.* TO 'splitrix_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Run schema
mysql -u splitrix_user -p splitrix_db < database/schema.sql
```

## Environment Configuration

Create a `.env.local` file in your project root:

```env
# Database Configuration
DATABASE_URL=postgresql://splitrix_user:your_secure_password@localhost:5432/splitrix_db
# or for SQLite: DATABASE_URL=sqlite:./splitrix.db

# Algorand Configuration
ALGORAND_NETWORK=testnet  # or mainnet for production
ALGORAND_NODE_URL=https://testnet-api.algonode.cloud
ALGORAND_INDEXER_URL=https://testnet-idx.algonode.cloud

# Wallet Configuration
WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

## Database Schema Overview

### Core Tables

1. **users** - User profiles with Algorand wallet addresses
2. **groups** - Expense groups and fund pools
3. **bills** - Individual expenses and bills
4. **bill_splits** - How bills are divided among users
5. **dust_pools** - Accumulated crypto dust management
6. **votes** - Democratic voting for group decisions
7. **transactions** - Blockchain transaction records

### Key Features

- **Web3 Integration**: Wallet addresses stored for Algorand integration
- **Dust Pool Management**: Automatic handling of crypto dust from splits
- **Voting System**: Democratic decision-making for group funds
- **Spending Limits**: User and group-level spending controls
- **Notifications**: Real-time updates for all activities

## Sample Data

Here's some sample data to get you started:

```sql
-- Insert sample users
INSERT INTO users (wallet_address, username, email, phone, bio) VALUES
('ALGORAND_ADDRESS_USER1_1234567890ABCDEF', 'alice_crypto', 'alice@example.com', '+1-555-0101', 'Crypto enthusiast and travel lover'),
('ALGORAND_ADDRESS_USER2_1234567890ABCDEF', 'bob_trader', 'bob@example.com', '+1-555-0102', 'DeFi trader and group organizer'),
('ALGORAND_ADDRESS_USER3_1234567890ABCDEF', 'charlie_dev', 'charlie@example.com', '+1-555-0103', 'Blockchain developer and early adopter');

-- Insert sample group
INSERT INTO groups (name, description, type, target_amount, created_by) VALUES
('Vegas Trip 2024', 'Group fund for our Vegas vacation', 'fund', 5000.00, 1);

-- Add members to group
INSERT INTO group_members (group_id, user_id, role) VALUES
(1, 1, 'admin'),
(1, 2, 'member'),
(1, 3, 'member');

-- Insert sample bill
INSERT INTO bills (title, description, total_amount, category, paid_by, group_id, status) VALUES
('Hotel Booking', '3 nights at The Venetian', 1200.00, 'Accommodation', 1, 1, 'pending');

-- Split the bill
INSERT INTO bill_splits (bill_id, user_id, amount) VALUES
(1, 1, 400.00),
(1, 2, 400.00),
(1, 3, 400.00);
```

## API Integration

### Prisma ORM (Recommended)
```bash
npm install prisma @prisma/client
npx prisma init
```

Update `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            Int      @id @default(autoincrement())
  walletAddress String   @unique @map("wallet_address")
  username      String   @unique
  email         String   @unique
  phone         String?
  bio           String?
  avatarUrl     String?  @map("avatar_url")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
  isActive      Boolean  @default(true) @map("is_active")
  
  @@map("users")
}
```

### TypeORM Alternative
```bash
npm install typeorm pg @types/pg
```

## Production Considerations

1. **Backup Strategy**: Set up regular database backups
2. **Connection Pooling**: Use connection pooling for better performance
3. **Indexing**: Monitor and optimize database indexes
4. **Security**: Use environment variables for sensitive data
5. **Monitoring**: Set up database monitoring and alerting

## Troubleshooting

### Common Issues

1. **Connection Refused**: Check if database service is running
2. **Permission Denied**: Verify user permissions
3. **Schema Errors**: Ensure all required tables are created
4. **Migration Issues**: Check for conflicting schema changes

### Useful Commands

```bash
# Check database connection
psql -U splitrix_user -d splitrix_db -c "SELECT version();"

# View all tables
psql -U splitrix_user -d splitrix_db -c "\dt"

# Check table structure
psql -U splitrix_user -d splitrix_db -c "\d users"

# Backup database
pg_dump -U splitrix_user splitrix_db > backup.sql

# Restore database
psql -U splitrix_user -d splitrix_db < backup.sql
```

## Next Steps

1. Set up your chosen database
2. Run the schema creation script
3. Configure your environment variables
4. Test the database connection
5. Start implementing the API endpoints
6. Integrate with Algorand blockchain

For more detailed information, refer to the individual database documentation and the Splitrix API documentation.

