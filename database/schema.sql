-- Splitrix Database Schema
-- Web3 Expense Management & Group Fund System

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(58) UNIQUE NOT NULL, -- Algorand wallet address
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    bio TEXT,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Friends/Contacts table
CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    friend_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, blocked
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, friend_id)
);

-- Groups table
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL, -- 'expense' or 'fund'
    target_amount DECIMAL(15,2), -- for fund groups
    current_amount DECIMAL(15,2) DEFAULT 0.00,
    created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Group members table
CREATE TABLE group_members (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member', -- member, admin, handler
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, user_id)
);

-- Bills/Expenses table
CREATE TABLE bills (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    total_amount DECIMAL(15,2) NOT NULL,
    category VARCHAR(50),
    paid_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, settled, cancelled
    receipt_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bill splits table
CREATE TABLE bill_splits (
    id SERIAL PRIMARY KEY,
    bill_id INTEGER REFERENCES bills(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    percentage DECIMAL(5,2), -- for percentage-based splits
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, settled
    settled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dust pool table
CREATE TABLE dust_pools (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    total_dust DECIMAL(15,8) DEFAULT 0.00000000,
    investment_mode VARCHAR(20) DEFAULT 'yield', -- yield, lottery, donation
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dust transactions table
CREATE TABLE dust_transactions (
    id SERIAL PRIMARY KEY,
    dust_pool_id INTEGER REFERENCES dust_pools(id) ON DELETE CASCADE,
    bill_id INTEGER REFERENCES bills(id) ON DELETE CASCADE,
    amount DECIMAL(15,8) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- contribution, investment, distribution
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Voting table
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    vote_type VARCHAR(30) NOT NULL, -- fund_handler, fund_increase, withdrawal, etc.
    status VARCHAR(20) DEFAULT 'active', -- active, closed, cancelled
    created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    ends_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vote options table (for multiple choice votes)
CREATE TABLE vote_options (
    id SERIAL PRIMARY KEY,
    vote_id INTEGER REFERENCES votes(id) ON DELETE CASCADE,
    option_text VARCHAR(200) NOT NULL,
    wallet_address VARCHAR(58), -- for fund handler votes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User votes table
CREATE TABLE user_votes (
    id SERIAL PRIMARY KEY,
    vote_id INTEGER REFERENCES votes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    option_id INTEGER REFERENCES vote_options(id) ON DELETE CASCADE,
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(vote_id, user_id)
);

-- Transactions table (for blockchain transactions)
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    bill_id INTEGER REFERENCES bills(id) ON DELETE CASCADE,
    transaction_hash VARCHAR(64) UNIQUE, -- Algorand transaction hash
    amount DECIMAL(15,8) NOT NULL,
    transaction_type VARCHAR(30) NOT NULL, -- payment, settlement, dust_contribution, etc.
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, failed
    from_address VARCHAR(58) NOT NULL,
    to_address VARCHAR(58) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP
);

-- Spending limits table
CREATE TABLE spending_limits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    limit_amount DECIMAL(15,2) NOT NULL,
    period VARCHAR(20) DEFAULT 'monthly', -- daily, weekly, monthly, yearly
    current_spent DECIMAL(15,2) DEFAULT 0.00,
    reset_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL, -- bill_created, payment_received, vote_created, etc.
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_id INTEGER, -- ID of related bill, vote, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_bills_group_id ON bills(group_id);
CREATE INDEX idx_bills_status ON bills(status);
CREATE INDEX idx_bill_splits_user_id ON bill_splits(user_id);
CREATE INDEX idx_bill_splits_bill_id ON bill_splits(bill_id);
CREATE INDEX idx_votes_group_id ON votes(group_id);
CREATE INDEX idx_votes_status ON votes(status);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_hash ON transactions(transaction_hash);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON bills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spending_limits_updated_at BEFORE UPDATE ON spending_limits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

