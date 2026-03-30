-- Fix admin password with correct bcrypt hash
UPDATE users 
SET password = '$2y$12$aywx6DwWVwru.fG2V83B.ewdy8DEKRWgxG1QuFKYLzYic73ZDqK0K',
    updated_at = NOW()
WHERE email = 'admin@kaffa.com';

-- Insert admin if not exists
INSERT INTO users (name, email, password, created_at, updated_at)
VALUES (
    'Admin Kaffa',
    'admin@kaffa.com',
    '$2y$12$aywx6DwWVwru.fG2V83B.ewdy8DEKRWgxG1QuFKYLzYic73ZDqK0K',
    NOW(),
    NOW()
)
ON CONFLICT (email) DO NOTHING;
