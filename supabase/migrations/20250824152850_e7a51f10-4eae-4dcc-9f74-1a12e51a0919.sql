-- Update existing registrations to use Bronze 1 package (closest equivalent price)
UPDATE registrations 
SET package_id = 'd66ee3cb-ec7d-4d8c-b09f-9e9f82d7852e'
WHERE package_id IN ('283f606c-5443-4048-b595-d0d9f570cfed', 'd410f491-308e-460a-8ea7-e9de03b87b3d', '0c6cd989-87f2-4369-bce2-70c7a39a97ec');

-- Now delete the old packages
DELETE FROM packages 
WHERE name IN ('Standard Package', 'Premium Package', 'VIP Package');