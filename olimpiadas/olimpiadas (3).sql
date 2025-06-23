-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2025 a las 20:48:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `olimpiadas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auto`
--

CREATE TABLE `auto` (
  `id` int(11) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `auto`
--

INSERT INTO `auto` (`id`, `marca`, `modelo`, `precio`) VALUES
(2, 'fiat', '500', 100),
(3, 'ford', 'fiestae', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auto_renta`
--

CREATE TABLE `auto_renta` (
  `id_renta` int(11) NOT NULL,
  `id_auto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id`, `id_usuario`, `fecha_creacion`) VALUES
(1, 2, '2025-06-16'),
(2, 4, '2025-06-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_auto`
--

CREATE TABLE `carrito_auto` (
  `id_detalle` int(11) NOT NULL,
  `id_auto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito_auto`
--

INSERT INTO `carrito_auto` (`id_detalle`, `id_auto`) VALUES
(12, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_detalle`
--

CREATE TABLE `carrito_detalle` (
  `id` int(11) NOT NULL,
  `id_carrito` int(11) DEFAULT NULL,
  `id_paquete` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `cantidad_personas` int(11) NOT NULL,
  `cantidad_dias` int(11) NOT NULL,
  `id_hotel` int(11) NOT NULL,
  `id_vuelo` int(11) NOT NULL,
  `precio_unitario` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito_detalle`
--

INSERT INTO `carrito_detalle` (`id`, `id_carrito`, `id_paquete`, `cantidad`, `cantidad_personas`, `cantidad_dias`, `id_hotel`, `id_vuelo`, `precio_unitario`) VALUES
(10, 1, 1, 2, 1, 3, 2, 3, 600000),
(11, 1, 1, 6, 1, 3, 2, 3, 1800000),
(12, 2, 1, 1, 1, 1, 2, 3, 50000),
(13, 2, 1, 1, 1, 1, 2, 3, 50000),
(14, 2, 1, 1, 1, 1, 2, 3, 50000),
(15, 2, 1, 1, 1, 1, 2, 3, 100000),
(16, 2, 1, 1, 1, 1, 2, 3, 100000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_excursion`
--

CREATE TABLE `carrito_excursion` (
  `id_detalle` int(11) NOT NULL,
  `id_excursion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destino`
--

CREATE TABLE `destino` (
  `id` int(11) NOT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `id_zona` varchar(6) NOT NULL,
  `provincia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destino`
--

INSERT INTO `destino` (`id`, `ciudad`, `pais`, `id_zona`, `provincia`) VALUES
(2, 'Bs As', 'Argentina', 'ARG1', 'Bs As'),
(3, 'CABA', 'Argentina', 'ARG1', 'Buenos Aires');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `excursion`
--

CREATE TABLE `excursion` (
  `id` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `excursion`
--

INSERT INTO `excursion` (`id`, `descripcion`, `nombre`, `precio`) VALUES
(2, 'g', 'jjbjh', 1),
(3, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `tipo_habitacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`id`, `direccion`, `nombre`, `tipo_habitacion`) VALUES
(2, 'Av calle 123', 'Hotel Super', 'Junior suite');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete`
--

CREATE TABLE `paquete` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_base` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`id`, `nombre`, `descripcion`, `precio_base`) VALUES
(1, 'bariloche + neuquen', 'viaja al sur con nuestra super oferta', 100000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_destino`
--

CREATE TABLE `paquete_destino` (
  `id_paquete` int(11) DEFAULT NULL,
  `id_destino` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_hotel`
--

CREATE TABLE `paquete_hotel` (
  `id_paquete` int(11) NOT NULL,
  `id_hotel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_reserva`
--

CREATE TABLE `paquete_reserva` (
  `id` int(11) NOT NULL,
  `id_paquete` int(11) DEFAULT NULL,
  `id_reserva` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_vuelo`
--

CREATE TABLE `paquete_vuelo` (
  `id_paquete` int(11) DEFAULT NULL,
  `id_vuelo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `renta`
--

CREATE TABLE `renta` (
  `id` int(11) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `punto_retiro` varchar(50) NOT NULL,
  `punto_devolucion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_paquete` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` varchar(50) NOT NULL,
  `precio_total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id`, `id_usuario`, `id_paquete`, `fecha_inicio`, `fecha_fin`, `estado`, `precio_total`) VALUES
(4, 2, 1, '2025-06-25', '2025-06-25', 'pendiente', 0),
(5, 2, 1, '2025-06-25', '2025-06-25', 'pendiente', 0),
(6, 2, 1, '2025-06-25', '2025-06-25', 'pendiente', 0),
(7, 2, 1, '2025-06-25', '2025-06-25', 'pendiente', 0),
(8, 2, 1, '2025-06-25', '2025-06-25', 'pendiente', 0),
(9, 2, 1, '2025-06-25', '2025-06-25', 'pendiente', 0),
(10, 2, 1, '2025-06-25', '2025-06-28', 'aprobado', 0),
(11, 4, 1, '2025-06-23', '2025-06-24', 'aprobado', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva_destino`
--

CREATE TABLE `reserva_destino` (
  `id_reserva` int(11) NOT NULL,
  `id_destino` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `descripcion`) VALUES
(1, 'cliente'),
(2, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `clave` varchar(255) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `id_zona` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `clave`, `telefono`, `email`, `direccion`, `id_rol`, `id_zona`) VALUES
(1, 'sofia', 'belo', '1234pepe', '12345678', 'sofibelossi@gmail.com', 'av rivadavia 12321', 1, 'ARG1'),
(2, 'sofi', 'gongora bai', '$2b$08$iP4VbixXBB/bq5xJq6Hb7el232SNpmM8w0WTjs7Ule3bM5.5Iy0xm', '1234', 'sofiabelossi123@gmail.com', 'calle 123', 1, 'ARG1'),
(4, 'so', 'belossi', '$2b$08$WqbrgXSYjthOEjm.LeoOHOmjjcZx/MXM8fwlJsc0dYvF8ahjwIh6e', '12345678', 'sofilamasmejor@gmail.com', 'calle 123', 1, 'ARG1'),
(5, 'Monica', 'Robles', '$2b$08$XEgnM4JDx.uJZd9zQQ3EMe4QKFoItT/L40tXL0mLvvo6hXbW845WO', '1123434148', 'monica@gmail.com', 'calle 123', 2, 'ARG1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vuelo`
--

CREATE TABLE `vuelo` (
  `id` int(11) NOT NULL,
  `id_origen` int(11) DEFAULT NULL,
  `id_destino` int(11) DEFAULT NULL,
  `fecha_salida` date DEFAULT NULL,
  `fecha_regreso` date DEFAULT NULL,
  `aerolinea` varchar(100) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `activo` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vuelo`
--

INSERT INTO `vuelo` (`id`, `id_origen`, `id_destino`, `fecha_salida`, `fecha_regreso`, `aerolinea`, `precio`, `activo`) VALUES
(3, 2, 3, '2025-06-24', '2025-06-25', 'AA', 100000, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zona`
--

CREATE TABLE `zona` (
  `id` varchar(6) NOT NULL,
  `nombre_zona` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `zona`
--

INSERT INTO `zona` (`id`, `nombre_zona`) VALUES
('ARG1', 'Buenos Aires');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `auto_renta`
--
ALTER TABLE `auto_renta`
  ADD PRIMARY KEY (`id_renta`,`id_auto`),
  ADD KEY `id_auto` (`id_auto`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `carrito_auto`
--
ALTER TABLE `carrito_auto`
  ADD PRIMARY KEY (`id_detalle`,`id_auto`),
  ADD KEY `id_auto` (`id_auto`);

--
-- Indices de la tabla `carrito_detalle`
--
ALTER TABLE `carrito_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_carrito` (`id_carrito`),
  ADD KEY `id_paquete` (`id_paquete`),
  ADD KEY `fk_id_hotel` (`id_hotel`),
  ADD KEY `fk_id_vuelo` (`id_vuelo`);

--
-- Indices de la tabla `carrito_excursion`
--
ALTER TABLE `carrito_excursion`
  ADD PRIMARY KEY (`id_detalle`,`id_excursion`),
  ADD KEY `id_excursion` (`id_excursion`);

--
-- Indices de la tabla `destino`
--
ALTER TABLE `destino`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_zona` (`id_zona`);

--
-- Indices de la tabla `excursion`
--
ALTER TABLE `excursion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paquete_destino`
--
ALTER TABLE `paquete_destino`
  ADD KEY `id_paquete` (`id_paquete`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `paquete_hotel`
--
ALTER TABLE `paquete_hotel`
  ADD PRIMARY KEY (`id_paquete`,`id_hotel`),
  ADD KEY `id_hotel` (`id_hotel`);

--
-- Indices de la tabla `paquete_reserva`
--
ALTER TABLE `paquete_reserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paquete` (`id_paquete`),
  ADD KEY `id_reserva` (`id_reserva`);

--
-- Indices de la tabla `paquete_vuelo`
--
ALTER TABLE `paquete_vuelo`
  ADD KEY `id_paquete` (`id_paquete`),
  ADD KEY `id_vuelo` (`id_vuelo`);

--
-- Indices de la tabla `renta`
--
ALTER TABLE `renta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_paquete` (`id_paquete`);

--
-- Indices de la tabla `reserva_destino`
--
ALTER TABLE `reserva_destino`
  ADD PRIMARY KEY (`id_reserva`,`id_destino`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `fk_id_z` (`id_zona`);

--
-- Indices de la tabla `vuelo`
--
ALTER TABLE `vuelo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_origen` (`id_origen`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auto`
--
ALTER TABLE `auto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `carrito_detalle`
--
ALTER TABLE `carrito_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `destino`
--
ALTER TABLE `destino`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `excursion`
--
ALTER TABLE `excursion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `paquete_reserva`
--
ALTER TABLE `paquete_reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `renta`
--
ALTER TABLE `renta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `vuelo`
--
ALTER TABLE `vuelo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auto_renta`
--
ALTER TABLE `auto_renta`
  ADD CONSTRAINT `auto_renta_ibfk_1` FOREIGN KEY (`id_renta`) REFERENCES `renta` (`id`),
  ADD CONSTRAINT `auto_renta_ibfk_2` FOREIGN KEY (`id_auto`) REFERENCES `auto` (`id`);

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `carrito_auto`
--
ALTER TABLE `carrito_auto`
  ADD CONSTRAINT `carrito_auto_ibfk_1` FOREIGN KEY (`id_detalle`) REFERENCES `carrito_detalle` (`id`),
  ADD CONSTRAINT `carrito_auto_ibfk_2` FOREIGN KEY (`id_auto`) REFERENCES `auto` (`id`);

--
-- Filtros para la tabla `carrito_detalle`
--
ALTER TABLE `carrito_detalle`
  ADD CONSTRAINT `carrito_detalle_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id`),
  ADD CONSTRAINT `carrito_detalle_ibfk_2` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id`),
  ADD CONSTRAINT `fk_id_hotel` FOREIGN KEY (`id_hotel`) REFERENCES `hotel` (`id`),
  ADD CONSTRAINT `fk_id_vuelo` FOREIGN KEY (`id_vuelo`) REFERENCES `vuelo` (`id`);

--
-- Filtros para la tabla `carrito_excursion`
--
ALTER TABLE `carrito_excursion`
  ADD CONSTRAINT `carrito_excursion_ibfk_1` FOREIGN KEY (`id_detalle`) REFERENCES `carrito_detalle` (`id`),
  ADD CONSTRAINT `carrito_excursion_ibfk_2` FOREIGN KEY (`id_excursion`) REFERENCES `excursion` (`id`);

--
-- Filtros para la tabla `destino`
--
ALTER TABLE `destino`
  ADD CONSTRAINT `fk_id_zona` FOREIGN KEY (`id_zona`) REFERENCES `zona` (`id`);

--
-- Filtros para la tabla `paquete_destino`
--
ALTER TABLE `paquete_destino`
  ADD CONSTRAINT `paquete_destino_ibfk_1` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id`),
  ADD CONSTRAINT `paquete_destino_ibfk_2` FOREIGN KEY (`id_destino`) REFERENCES `destino` (`id`);

--
-- Filtros para la tabla `paquete_hotel`
--
ALTER TABLE `paquete_hotel`
  ADD CONSTRAINT `paquete_hotel_ibfk_1` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id`),
  ADD CONSTRAINT `paquete_hotel_ibfk_2` FOREIGN KEY (`id_hotel`) REFERENCES `hotel` (`id`);

--
-- Filtros para la tabla `paquete_reserva`
--
ALTER TABLE `paquete_reserva`
  ADD CONSTRAINT `paquete_reserva_ibfk_1` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id`),
  ADD CONSTRAINT `paquete_reserva_ibfk_2` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id`);

--
-- Filtros para la tabla `paquete_vuelo`
--
ALTER TABLE `paquete_vuelo`
  ADD CONSTRAINT `paquete_vuelo_ibfk_1` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id`),
  ADD CONSTRAINT `paquete_vuelo_ibfk_2` FOREIGN KEY (`id_vuelo`) REFERENCES `vuelo` (`id`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id`);

--
-- Filtros para la tabla `reserva_destino`
--
ALTER TABLE `reserva_destino`
  ADD CONSTRAINT `reserva_destino_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id`),
  ADD CONSTRAINT `reserva_destino_ibfk_2` FOREIGN KEY (`id_destino`) REFERENCES `destino` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_id_z` FOREIGN KEY (`id_zona`) REFERENCES `zona` (`id`),
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);

--
-- Filtros para la tabla `vuelo`
--
ALTER TABLE `vuelo`
  ADD CONSTRAINT `vuelo_ibfk_1` FOREIGN KEY (`id_origen`) REFERENCES `destino` (`id`),
  ADD CONSTRAINT `vuelo_ibfk_2` FOREIGN KEY (`id_destino`) REFERENCES `destino` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
