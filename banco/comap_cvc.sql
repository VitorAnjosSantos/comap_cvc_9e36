-- MySQL Script generated by MySQL Workbench
-- Wed Feb 26 14:38:11 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `comap_cvc_usuario` DEFAULT CHARACTER SET utf8 ;
USE `comap_cvc_usuario` ;

-- -----------------------------------------------------
-- Table `mydb`.`tb_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comap_cvc_usuario`.`tb_login` (
  `id_login` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(50) NULL,
  `senha` VARCHAR(32) NULL,
  PRIMARY KEY (`id_login`))
ENGINE = InnoDB;
INSERT INTO tb_login(usuario,senha) VALUES ("administrador", md5("comapcvc"));

CREATE TABLE IF NOT EXISTS `comap_cvc_usuario`.`tb_projetos` (
  `id_projeto` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  PRIMARY KEY (`id_projeto`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `comap_cvc_usuario`.`tb_config_projeto` (
  `id_config_projeto` INT NOT NULL AUTO_INCREMENT,
  `rodovia` VARCHAR(100) NULL,
  `km` VARCHAR(100) NULL,
  `posto` VARCHAR(100) NULL,
  `sentido` VARCHAR(100) NULL,
  `dataInicio` VARCHAR(100) NULL,
  `dataFim` VARCHAR(100) NULL,
  `tb_projetos_id_projeto` INT NOT NULL,
  PRIMARY KEY (`id_config_projeto`),
   CONSTRAINT `fk_tb_config_projeto_tb_projetos`
    FOREIGN KEY (`tb_projetos_id_projeto`)
    REFERENCES `comap_cvc_usuario`.`tb_projetos` (`id_projeto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `comap_cvc_usuario`.`tb_usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `pesquisador` VARCHAR(50) NULL,
  `supervisor` VARCHAR(50) NULL,
  `posto` VARCHAR(5) NULL,
  `sentido` VARCHAR(5) NULL,
  `idDevice` VARCHAR(50) NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`tb_veiculos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comap_cvc_usuario`.`tb_veiculos` (
  `id_veiculo` INT NOT NULL AUTO_INCREMENT,
  `auto` INT NULL,
  `motos` INT NULL,
  `onibus` INT NULL,
  `caminhao` INT NULL,
  `date` VARCHAR(25) NULL,
  `time` VARCHAR(25) NULL,
  `transito` VARCHAR(25) NULL,
  `sigapare` VARCHAR(25) NULL,
  `chuva` VARCHAR(25) NULL,
  `latitude` VARCHAR(25) NULL,
  `longitude` VARCHAR(25) NULL,
  `tb_usuarios_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_veiculo`),
  CONSTRAINT `fk_tb_veiculos_tb_usuarios`
    FOREIGN KEY (`tb_usuarios_id_usuario`)
    REFERENCES `comap_cvc_usuario`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

select * from tb_veiculos;
select * from tb_usuarios;
select * from tb_projetos;
select * from tb_config_projeto;
select * from tb_login;

SELECT * FROM tb_config_projeto v 
			JOIN tb_projetos u
			ON v.tb_projetos_id_projeto = u.id_projeto
			WHERE u.id_projeto = 1;

SELECT idDevice FROM tb_usuarios WHERE id_usuario = 1;

truncate tb_usuarios;
truncate tb_veiculos;
truncate tb_projetos;
truncate tb_config_projeto;

SET foreign_key_checks = 0;
SET foreign_key_checks = 1;