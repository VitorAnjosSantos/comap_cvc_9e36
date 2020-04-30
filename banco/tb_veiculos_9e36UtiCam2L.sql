CREATE TABLE IF NOT EXISTS `comap_cvc_usuario`.`tb_veiculos_9e36UtiCam2L` (
	`id_veiculo_9e36UtiCam2L` INT NOT NULL AUTO_INCREMENT,
	`auto` INT NULL,
	`utilitario` INT NULL,
	`auto3E` INT NULL,
	`auto4E` INT NULL,
	`onibus2E` INT NULL,
	`onibus3E` INT NULL,
	`onibus4E` INT NULL,
	`veiculoOficial` INT NULL,
	`veiculoEspecial` INT NULL,
	`motos` INT NULL,
	`cLeve2E` INT NULL,
	`c2E` INT NULL,
	`c3R` INT NULL,
	`c31S` INT NULL,
	`c4R` INT NULL,
	`c41S` INT NULL,
	`c42S` INT NULL,
	`c5R` INT NULL,
	`c51S` INT NULL,
	`c52S` INT NULL,
	`c6R` INT NULL,
	`c61S` INT NULL,
	`c62S` INT NULL,
	`c63S` INT NULL,
	`c7R` INT NULL,
	`c71S` INT NULL,
	`c72S` INT NULL,
	`c73S` INT NULL,
	`c8R` INT NULL,
	`c81S` INT NULL,
	`c82S` INT NULL,
	`c83S` INT NULL,
	`c84S` INT NULL,
	`c9R` INT NULL,
	`c91S` INT NULL,
	`c92S` INT NULL,
	`c93S` INT NULL,
	`c94S` INT NULL,
	`date` VARCHAR(25) NULL,
	`time` VARCHAR(25) NULL,
	`transito` VARCHAR(25) NULL,
	`sigapare` VARCHAR(25) NULL,
	`chuva` VARCHAR(25) NULL,
	`latitude` VARCHAR(25) NULL,
	`longitude` VARCHAR(25) NULL,
	`tb_usuarios_id_usuario_9e36UtiCam2L` INT NOT NULL,
  PRIMARY KEY (`id_veiculo_9e36UtiCam2L`),
  CONSTRAINT `fk_tb_veiculos_tb_usuarios_9e36UtiCam2L`
    FOREIGN KEY (`tb_usuarios_id_usuario_9e36UtiCam2L`)
    REFERENCES `comap_cvc_usuario`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SELECT * FROM tb_veiculos_9e36UtiCam2L;

truncate tb_veiculos_9e36uticam2L;

SELECT * FROM tb_veiculos_9e36UtiCam2L v 
			JOIN tb_usuarios u
			ON v.tb_usuarios_id_usuario_9e36UtiCam2L = u.id_usuario
			WHERE u.id_usuario = 7;



