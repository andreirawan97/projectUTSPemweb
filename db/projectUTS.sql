-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 15, 2019 at 08:23 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectUTS`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `fullname` varchar(128) NOT NULL,
  `gender` varchar(8) NOT NULL,
  `bio` varchar(128) NOT NULL,
  `dateofbirth` date NOT NULL,
  `registerDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `profilePicURL` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `email`, `fullname`, `gender`, `bio`, `dateofbirth`, `registerDate`, `profilePicURL`) VALUES
('admin', 'admin@mail.com', 'admin admin', 'Female', '', '1945-07-23', '2019-03-15 07:14:59', 'images/noImage.png'),
('andreirawan97', 'andreirawan97@gmail.com', 'Andre Irawan', 'Male', '', '1997-07-23', '2019-03-15 07:09:08', 'https://i.imgur.com/rJBBTOz.jpg'),
('Habib', 'hala@gmail.com', 'Rifky Nur', 'Male', '', '1999-08-09', '2019-03-15 07:14:59', 'images/noImage.png'),
('stany', 'apahayo@gmail.com', 'stany lius', 'Male', '', '0000-00-00', '2019-03-15 07:16:01', 'https://i.imgur.com/hp4gqKu.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` varchar(128) NOT NULL,
  `postID` bigint(20) NOT NULL,
  `commentID` bigint(20) NOT NULL,
  `message` varchar(128) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `postID`, `commentID`, `message`, `timestamp`) VALUES
('andreirawan97', 8, 8, 'sombong tai', '2019-03-04 07:26:06'),
('admin', 8, 11, 'dih paan', '2019-03-04 08:39:52'),
('stany', 10, 12, 'noob', '2019-03-05 03:14:10'),
('andreirawan97', 12, 13, 'oo gitu kwkwk', '2019-03-07 14:42:13'),
('andreirawan97', 14, 23, 'ga juga kok', '2019-03-10 13:38:32');

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE `feeds` (
  `id` varchar(128) NOT NULL,
  `message` varchar(128) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `postID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`id`, `message`, `timestamp`, `postID`) VALUES
('andreirawan97', 'this is great!', '2019-03-03 14:37:20', 5),
('admin', 'I am the admin!', '2019-03-03 14:59:54', 8),
('andreirawan97', 'WOI', '2019-03-04 03:32:29', 9),
('andreirawan97', 'i created this post on 4 March 2019 11:28:00', '2019-03-04 04:28:08', 10),
('stany', 'today is quiz jarkom', '2019-03-05 03:13:48', 12),
('andreirawan97', 'Dear diary, hari ini saya gabut', '2019-03-09 06:07:45', 14);

-- --------------------------------------------------------

--
-- Table structure for table `secret`
--

CREATE TABLE `secret` (
  `id` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `salt` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `secret`
--

INSERT INTO `secret` (`id`, `password`, `salt`) VALUES
('admin', '0a7754b6adc7e0b8b448a5cfdce6da87', 191),
('andreirawan97', '0192023a7bbd73250516f069df18b500', 123),
('Habib', 'bacbea480197d9b847780a9adc7d6718', 229),
('stany', '7d4ce407cd81a62d431e806d7d50831a', 538);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `comments_ibfk_1` (`id`),
  ADD KEY `comments_ibfk_2` (`postID`);

--
-- Indexes for table `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `feeds_ibfk_1` (`id`);

--
-- Indexes for table `secret`
--
ALTER TABLE `secret`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `feeds`
--
ALTER TABLE `feeds`
  MODIFY `postID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postID`) REFERENCES `feeds` (`postID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feeds`
--
ALTER TABLE `feeds`
  ADD CONSTRAINT `feeds_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `secret`
--
ALTER TABLE `secret`
  ADD CONSTRAINT `secret_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
