-- Sample Data for Splitrix Database
-- This file contains sample data to help you test the application

-- Insert sample users
INSERT INTO users (wallet_address, username, email, phone, bio, avatar_url) VALUES
('ALGORAND_ADDRESS_ALICE_1234567890ABCDEF', 'alice_crypto', 'alice@example.com', '+1-555-0101', 'Crypto enthusiast and travel lover', 'https://example.com/avatars/alice.jpg'),
('ALGORAND_ADDRESS_BOB_1234567890ABCDEF', 'bob_trader', 'bob@example.com', '+1-555-0102', 'DeFi trader and group organizer', 'https://example.com/avatars/bob.jpg'),
('ALGORAND_ADDRESS_CHARLIE_1234567890ABCDEF', 'charlie_dev', 'charlie@example.com', '+1-555-0103', 'Blockchain developer and early adopter', 'https://example.com/avatars/charlie.jpg'),
('ALGORAND_ADDRESS_DIANA_1234567890ABCDEF', 'diana_designer', 'diana@example.com', '+1-555-0104', 'UI/UX designer and crypto investor', 'https://example.com/avatars/diana.jpg'),
('ALGORAND_ADDRESS_EVE_1234567890ABCDEF', 'eve_analyst', 'eve@example.com', '+1-555-0105', 'Financial analyst and Web3 researcher', 'https://example.com/avatars/eve.jpg');

-- Create friendships
INSERT INTO friendships (user_id, friend_id, status) VALUES
(1, 2, 'accepted'),
(1, 3, 'accepted'),
(1, 4, 'accepted'),
(2, 3, 'accepted'),
(2, 4, 'accepted'),
(3, 4, 'accepted'),
(4, 5, 'accepted');

-- Create sample groups
INSERT INTO groups (name, description, type, target_amount, current_amount, created_by) VALUES
('Vegas Trip 2024', 'Group fund for our Vegas vacation - hotels, shows, and dining', 'fund', 5000.00, 1200.00, 1),
('Roommates Expenses', 'Shared household expenses for our apartment', 'expense', NULL, 0.00, 2),
('Office Lunch Club', 'Weekly lunch expenses for our team', 'expense', NULL, 0.00, 3),
('Crypto Investment Pool', 'Collective investment fund for DeFi opportunities', 'fund', 10000.00, 2500.00, 4);

-- Add members to groups
INSERT INTO group_members (group_id, user_id, role) VALUES
-- Vegas Trip 2024
(1, 1, 'admin'),
(1, 2, 'member'),
(1, 3, 'member'),
(1, 4, 'member'),
-- Roommates Expenses
(2, 1, 'admin'),
(2, 2, 'member'),
(2, 3, 'member'),
-- Office Lunch Club
(3, 3, 'admin'),
(3, 4, 'member'),
(3, 5, 'member'),
-- Crypto Investment Pool
(4, 4, 'admin'),
(4, 5, 'member');

-- Create sample bills
INSERT INTO bills (title, description, total_amount, category, paid_by, group_id, status, receipt_url) VALUES
('Hotel Booking - The Venetian', '3 nights at The Venetian Resort', 1200.00, 'Accommodation', 1, 1, 'pending', 'https://example.com/receipts/hotel_booking.pdf'),
('Electricity Bill - March', 'Monthly electricity bill for apartment', 85.50, 'Utilities', 2, 2, 'settled', 'https://example.com/receipts/electricity_march.pdf'),
('Team Lunch - Sushi Place', 'Weekly team lunch at local sushi restaurant', 156.75, 'Food & Dining', 3, 3, 'pending', 'https://example.com/receipts/sushi_lunch.pdf'),
('Internet Bill - March', 'Monthly internet service', 65.00, 'Utilities', 1, 2, 'pending', 'https://example.com/receipts/internet_march.pdf'),
('Concert Tickets - Vegas', 'Tickets for Cirque du Soleil show', 320.00, 'Entertainment', 4, 1, 'pending', 'https://example.com/receipts/concert_tickets.pdf');

-- Create bill splits
INSERT INTO bill_splits (bill_id, user_id, amount, percentage, status) VALUES
-- Hotel Booking (split equally among 4 people)
(1, 1, 300.00, 25.00, 'pending'),
(1, 2, 300.00, 25.00, 'pending'),
(1, 3, 300.00, 25.00, 'pending'),
(1, 4, 300.00, 25.00, 'pending'),
-- Electricity Bill (split between roommates)
(2, 1, 42.75, 50.00, 'paid'),
(2, 2, 42.75, 50.00, 'paid'),
-- Team Lunch (split among 3 people)
(3, 3, 52.25, 33.33, 'pending'),
(3, 4, 52.25, 33.33, 'pending'),
(3, 5, 52.25, 33.33, 'pending'),
-- Internet Bill (split between roommates)
(4, 1, 32.50, 50.00, 'pending'),
(4, 2, 32.50, 50.00, 'pending'),
-- Concert Tickets (split among 4 people)
(5, 1, 80.00, 25.00, 'pending'),
(5, 2, 80.00, 25.00, 'pending'),
(5, 3, 80.00, 25.00, 'pending'),
(5, 4, 80.00, 25.00, 'pending');

-- Create dust pools for groups
INSERT INTO dust_pools (group_id, total_dust, investment_mode) VALUES
(1, 0.00015000, 'yield'),
(2, 0.00007500, 'lottery'),
(3, 0.00002500, 'donation'),
(4, 0.00050000, 'yield');

-- Create dust transactions
INSERT INTO dust_transactions (dust_pool_id, bill_id, amount, transaction_type) VALUES
(1, 1, 0.00015000, 'contribution'),
(2, 2, 0.00007500, 'contribution'),
(3, 3, 0.00002500, 'contribution'),
(4, 4, 0.00050000, 'contribution');

-- Create sample votes
INSERT INTO votes (group_id, title, description, vote_type, status, created_by, ends_at) VALUES
(1, 'Approve Alice as Fund Handler', 'Vote to approve Alice as the handler for Vegas Trip fund', 'fund_handler', 'active', 2, NOW() + INTERVAL '7 days'),
(1, 'Increase Fund Target to $6000', 'Proposal to increase the Vegas trip fund target from $5000 to $6000', 'fund_increase', 'active', 3, NOW() + INTERVAL '5 days'),
(4, 'Approve Diana as Investment Manager', 'Vote to approve Diana as the investment manager for Crypto Investment Pool', 'fund_handler', 'closed', 5, NOW() - INTERVAL '1 day'),
(2, 'Withdraw $200 for Emergency', 'Emergency withdrawal from roommates fund for urgent repairs', 'withdrawal', 'active', 1, NOW() + INTERVAL '3 days');

-- Create vote options
INSERT INTO vote_options (vote_id, option_text, wallet_address) VALUES
(1, 'Alice Johnson', 'ALGORAND_ADDRESS_ALICE_1234567890ABCDEF'),
(1, 'Bob Smith', 'ALGORAND_ADDRESS_BOB_1234567890ABCDEF'),
(1, 'Charlie Brown', 'ALGORAND_ADDRESS_CHARLIE_1234567890ABCDEF'),
(2, 'Yes - Increase to $6000', NULL),
(2, 'No - Keep at $5000', NULL),
(3, 'Diana Wilson', 'ALGORAND_ADDRESS_DIANA_1234567890ABCDEF'),
(3, 'Eve Davis', 'ALGORAND_ADDRESS_EVE_1234567890ABCDEF'),
(4, 'Yes - Approve withdrawal', NULL),
(4, 'No - Reject withdrawal', NULL);

-- Create user votes
INSERT INTO user_votes (vote_id, user_id, option_id) VALUES
(1, 1, 1), -- Alice votes for herself
(1, 2, 1), -- Bob votes for Alice
(1, 3, 1), -- Charlie votes for Alice
(2, 1, 4), -- Alice votes Yes for increase
(2, 2, 4), -- Bob votes Yes for increase
(2, 3, 5), -- Charlie votes No for increase
(3, 4, 6), -- Diana votes for herself
(3, 5, 6), -- Eve votes for Diana
(4, 1, 8), -- Alice votes Yes for withdrawal
(4, 2, 9); -- Bob votes No for withdrawal

-- Create sample transactions
INSERT INTO transactions (user_id, group_id, bill_id, transaction_hash, amount, transaction_type, status, from_address, to_address, created_at, confirmed_at) VALUES
(1, 1, 1, 'ALGORAND_TX_HASH_1234567890ABCDEF', 300.00, 'payment', 'confirmed', 'ALGORAND_ADDRESS_ALICE_1234567890ABCDEF', 'ALGORAND_ADDRESS_GROUP_1234567890ABCDEF', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour'),
(2, 2, 2, 'ALGORAND_TX_HASH_2345678901BCDEFG', 42.75, 'settlement', 'confirmed', 'ALGORAND_ADDRESS_BOB_1234567890ABCDEF', 'ALGORAND_ADDRESS_ALICE_1234567890ABCDEF', NOW() - INTERVAL '1 day', NOW() - INTERVAL '23 hours'),
(3, 3, 3, 'ALGORAND_TX_HASH_3456789012CDEFGH', 52.25, 'payment', 'pending', 'ALGORAND_ADDRESS_CHARLIE_1234567890ABCDEF', 'ALGORAND_ADDRESS_GROUP_1234567890ABCDEF', NOW() - INTERVAL '30 minutes', NULL);

-- Create spending limits
INSERT INTO spending_limits (user_id, group_id, limit_amount, period, current_spent, reset_date) VALUES
(1, 1, 1000.00, 'monthly', 300.00, NOW() + INTERVAL '25 days'),
(2, 2, 500.00, 'monthly', 85.50, NOW() + INTERVAL '25 days'),
(3, 3, 200.00, 'weekly', 52.25, NOW() + INTERVAL '5 days'),
(4, 4, 2000.00, 'monthly', 0.00, NOW() + INTERVAL '30 days'),
(5, 4, 1500.00, 'monthly', 0.00, NOW() + INTERVAL '30 days');

-- Create sample notifications
INSERT INTO notifications (user_id, type, title, message, is_read, related_id) VALUES
(1, 'bill_created', 'New Bill Created', 'Alice created a new bill: Hotel Booking - The Venetian', FALSE, 1),
(2, 'payment_received', 'Payment Received', 'You received $42.75 from Alice for Electricity Bill', TRUE, 2),
(3, 'vote_created', 'New Vote Created', 'A new vote has been created: Approve Alice as Fund Handler', FALSE, 1),
(4, 'dust_contribution', 'Dust Pool Updated', '0.00015000 ALGO added to Vegas Trip dust pool', FALSE, 1),
(5, 'fund_target_reached', 'Fund Target Reached', 'Crypto Investment Pool has reached 25% of target amount', FALSE, 4);

-- Update some data to show realistic scenarios
UPDATE groups SET current_amount = 1200.00 WHERE id = 1;
UPDATE groups SET current_amount = 150.50 WHERE id = 2;
UPDATE groups SET current_amount = 156.75 WHERE id = 3;
UPDATE groups SET current_amount = 2500.00 WHERE id = 4;

-- Update dust pool totals
UPDATE dust_pools SET total_dust = 0.00015000 WHERE group_id = 1;
UPDATE dust_pools SET total_dust = 0.00007500 WHERE group_id = 2;
UPDATE dust_pools SET total_dust = 0.00002500 WHERE group_id = 3;
UPDATE dust_pools SET total_dust = 0.00050000 WHERE group_id = 4;

