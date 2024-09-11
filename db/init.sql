DROP DATABASE pharma;
CREATE DATABASE pharma;
USE pharma;
-- Table: users
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1, 1),
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    role NVARCHAR(50) NOT NULL DEFAULT 'user',
);
-- Table: medicine_groups
CREATE TABLE medicine_groups (
    id INT PRIMARY KEY IDENTITY(1, 1),
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(255) NULL
);
-- Table: medicines
CREATE TABLE medicines (
    id INT PRIMARY KEY IDENTITY(1, 1),
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(255) NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES medicine_groups(id)
);
-- Table: medicine_batches
CREATE TABLE medicine_batches (
    id INT PRIMARY KEY IDENTITY(1, 1),
    medicine_id INT NOT NULL,
    batch_number NVARCHAR(255) NOT NULL,
    expiration_date DATE,
    quantity INT NOT NULL,
    date_received DATE NOT NULL,
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);
SELECT *
FROM users;
SELECT *
FROM medicine_groups;
SELECT *
FROM medicines;
SELECT *
FROM medicine_batches;
-- Mock data
INSERT INTO users (username, password, email, role)
VALUES ('admin', 'admin', 'admin@example.com', 'admin'),
    ('user1', 'user1', 'user1@example.com', 'user'),
    ('user2', 'user2', 'user2@example.com', 'user');
INSERT INTO medicine_groups (name, description)
VALUES (
        'Antibiotics',
        'Antibiotics are a type of antimicrobial drug used in the treatment and prevention of bacterial infections.'
    ),
    (
        'Pain Relief',
        'Pain relief or painkiller is a medication or drug that is used to prevent or reduce pain.'
    ),
    (
        'Antivirals',
        'Antiviral drugs are a class of medication used for treating viral infections.'
    ),
    (
        'Antifungals',
        'Antifungal drugs are medications used to treat fungal infections.'
    ),
    (
        'Antiparasitics',
        'Antiparasitic drugs are medications used to treat parasitic infections, such as malaria, ringworm, and river blindness.'
    );
INSERT INTO medicines (name, description, group_id)
VALUES (
        'Amoxicillin',
        'Amoxicillin is a semisynthetic antibiotic used to treat a wide range of bacterial infections.',
        1
    ),
    (
        'Paracetamol',
        'Paracetamol is a medication used to treat pain and reduce fever.',
        2
    ),
    (
        'Aciclovir',
        'Aciclovir is an antiviral medication used to treat infections caused by certain viruses.',
        3
    ),
    (
        'Fluconazole',
        'Fluconazole is an antifungal medication used to treat fungal infections.',
        4
    ),
    (
        'Mebendazole',
        'Mebendazole is an antiparasitic medication used to treat parasitic infections.',
        5
    );
INSERT INTO medicine_batches (
        medicine_id,
        batch_number,
        expiration_date,
        quantity,
        date_received
    )
VALUES (1, 'ABC123', '2025-01-01', 100, '2020-01-01'),
    (2, 'XYZ456', '2025-06-01', 50, '2020-06-01'),
    (3, 'QWE789', '2025-12-01', 200, '2020-12-01'),
    (4, 'ASD901', '2025-02-01', 150, '2020-02-01'),
    (5, 'JKL012', '2025-08-01', 250, '2020-08-01');