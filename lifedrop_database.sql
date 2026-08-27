-- ============================================================================
-- LifeDrop MySQL Database Schema DDL
-- Compatible with PHP / Laravel Backend & phpMyAdmin
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `lifedrop_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lifedrop_db`;

-- ----------------------------------------------------------------------------
-- Table: users
-- Stores registered donors, recipients, and system administrators
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `blood_group` VARCHAR(10) NULL,
  `address` VARCHAR(255) NULL,
  `city` VARCHAR(100) NULL DEFAULT 'Abbottabad',
  `role` ENUM('donor', 'recipient', 'admin', 'user') NOT NULL DEFAULT 'donor',
  `is_available` TINYINT(1) NOT NULL DEFAULT 1,
  `is_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `last_donation_date` DATE NULL,
  `latitude` DECIMAL(10, 8) NULL DEFAULT 34.16880000,
  `longitude` DECIMAL(11, 8) NULL DEFAULT 73.22150000,
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: blood_requests
-- Stores public emergency blood requirements posted by patients or hospitals
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blood_requests` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NULL,
  `patient_name` VARCHAR(191) NOT NULL,
  `blood_group` VARCHAR(10) NOT NULL,
  `hospital_name` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL DEFAULT 'Abbottabad',
  `contact_number` VARCHAR(50) NOT NULL,
  `units` INT UNSIGNED NOT NULL DEFAULT 1,
  `urgency` ENUM('critical', 'urgent', 'normal') NOT NULL DEFAULT 'urgent',
  `status` ENUM('pending', 'in_progress', 'fulfilled', 'cancelled') NOT NULL DEFAULT 'pending',
  `latitude` DECIMAL(10, 8) NULL DEFAULT 34.16880000,
  `longitude` DECIMAL(11, 8) NULL DEFAULT 73.22150000,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_blood_requests_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: donation_history
-- Tracks completed blood donations by donors
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `donation_history` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `donor_id` BIGINT UNSIGNED NOT NULL,
  `request_id` BIGINT UNSIGNED NULL,
  `donation_date` DATE NOT NULL,
  `hospital_location` VARCHAR(255) NOT NULL,
  `units_donated` INT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_donations_donor` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: contact_messages
-- Stores contact form submissions from the web application
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Seed Initial Demo Admin & Donors
-- ----------------------------------------------------------------------------
INSERT INTO `users` (`name`, `email`, `password`, `phone`, `blood_group`, `city`, `role`, `is_available`, `is_verified`) 
VALUES 
('System Admin', 'admin@lifedrop.pk', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '03493657462', 'B+', 'Abbottabad', 'admin', 1, 1),
('Ahmed Khan', 'ahmed@lifedrop.pk', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '03001234567', 'B+', 'Abbottabad', 'donor', 1, 1),
('Dr. Usman Ali', 'usman@lifedrop.pk', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '03129876543', 'O-', 'Abbottabad', 'donor', 1, 1);
