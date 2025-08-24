-- Insert new sponsorship packages (keeping existing ones for now to avoid foreign key issues)
INSERT INTO public.packages (name, description, price) VALUES
('Bronze 1', 'Sponsorship of beverages, snacks and bottled water at the Registration Tables', 7000.00),
('Bronze 2', 'Golf Goodie Bags Sponsor', 6000.00),
('Bronze 3', 'VIP Table Sponsor', 5000.00),
('Bronze 4', 'Watering Hole Sponsor (Alcoholic and soft drinks for 6 holes, only the rest soft drinks only)', 5000.00),
('Bronze 5', 'Pre-Dinner Drinks', 5000.00),
('Bronze 6', 'Wine Sponsorship', 4500.00),
('Bronze 7', 'Entertainment Sponsorship', 4000.00),
('Silver', 'Halfway House Lunch for All Players', 10000.00),
('Gold', 'Sponsorship of Golfer''s Prizes: 1st Prize @ R5000.00 2nd Prize @ R4000.00 3rd Prize @ R3000.00 Longest Drive @R1000.00 Nearest to the Pin @1000.00 Longest Day @R500.00', 14500.00),
('Diamond', 'Golf Shirts Sponsorship', 20000.00),
('Platinum', 'Sponsorship of Dinner', 30000.00);