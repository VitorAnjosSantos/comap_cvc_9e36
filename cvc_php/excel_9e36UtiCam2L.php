<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: application/json');
	include("./Classes/PHPExcel/IOFactory.php");   


    include("./conexao_usuario.php");

	$id = $_POST['id'];
	//$pesquisador = $_POST["pesquisador"];

	$sql = "SELECT * FROM tb_veiculos_9e36UtiCam2L v 
			JOIN tb_usuarios u
			ON v.tb_usuarios_id_usuario_9e36UtiCam2L = u.id_usuario
			WHERE u.id_usuario = {$id}";	

	$idDevice = '';

	$result = mysqli_query($conexao,$sql); 
	$resultadoDaConsulta = $result; 

	if ($resultadoDaConsulta) {
			
			// Gera arquivo CSV
		$fp = fopen("planilha.csv", "w +"); // o "a" indica que o arquivo será sobrescrito sempre que esta função for executada.
		$escreve = fwrite($fp, "Pesquisador,Supervisor,Latitude,Longitude,Data,Hora,AUTO,UTILITARIO,AUTO 3,AUTO 4 EIXOS,ÔNIBUS 2 EIXOS,ÔNIBUS 3 EIXOS,ÔNIBUS 4 EIXOS,VEÍCULO OFICIAL,VEÍCULO ESPECIAL,MOTOS,CAM / 2 LEVE,CAM / 2,CAM / 3 0S,CAM / 3 1S,CAM / 4 0S,CAM / 4 1S,CAM / 4 2S,CAM / 5 0S,CAM / 5 1S,CAM / 5 2S,CAM / 6 0S,CAM / 6 1S,CAM / 6 2S,CAM / 6 3S,CAM / 7 0S,CAM / 7 1S,CAM / 7 2S,CAM / 7 3S,CAM / 8 0S,CAM / 8 1S,CAM / 8 2S,CAM / 8 3S,CAM / 8 4S,CAM / 9 0S,CAM / 9 1S,CAM / 9 2S,CAM / 9 3S,CAM / 9 4S,Total,Transito,Siga e Pare,Chuva ");
		$data = "";
		$hora = "";
		$date = '';
		$time = '';
		$array = [];
		$aux = [];
		$count = 0;
		$count2 = 0;
		$total = [];

		foreach($resultadoDaConsulta as $registro) 
			{ 
				$aux = [$registro['auto'],$registro['utilitario'],$registro['auto3E'],$registro['auto4E'],$registro['onibus2E'],$registro['onibus3E'],$registro['onibus4E'],$registro['veiculoOficial'],$registro['veiculoEspecial'],$registro['motos'],$registro['cLeve2E'],$registro['c2E'],$registro['c3R'],$registro['c31S'],$registro['c4R'],$registro['c41S'],$registro['c42S'],$registro['c5R'],$registro['c51S'],$registro['c52S'],$registro['c6R'],$registro['c61S'],$registro['c62S'],$registro['c63S'],$registro['c7R'],$registro['c71S'],$registro['c72S'],$registro['c73S'],$registro['c8R'],$registro['c81S'],$registro['c82S'],$registro['c83S'],$registro['c84S'],$registro['c9R'],$registro['c91S'],$registro['c92S'],$registro['c93S'],$registro['c94S']];
				
				foreach($aux as $k => $v){
					$array[$count2][$k] = $v;
					if($count2 >= 1 ){
						$total[0][$k] += $v;
					}else{
					$total[0][$k] = $array[$count2][$k];
					}
					
				}
				
				$escreve = fwrite($fp, "\n $registro[pesquisador],$registro[supervisor],$registro[latitude],$registro[longitude],$registro[date],$registro[time],$registro[auto],$registro[utilitario],$registro[auto3E],$registro[auto4E],$registro[onibus2E],$registro[onibus3E],$registro[onibus4E],$registro[veiculoOficial],$registro[veiculoEspecial],$registro[motos],$registro[cLeve2E],$registro[c2E],$registro[c3R],$registro[c31S],$registro[c4R],$registro[c41S],$registro[c42S],$registro[c5R],$registro[c51S],$registro[c52S],$registro[c6R],$registro[c61S],$registro[c62S],$registro[c63S],$registro[c7R],$registro[c71S],$registro[c72S],$registro[c73S],$registro[c8R],$registro[c81S],$registro[c82S],$registro[c83S],$registro[c84S],$registro[c9R],$registro[c91S],$registro[c92S],$registro[c93S],$registro[c94S],".array_sum($array[$count2]).",$registro[transito],$registro[sigapare],$registro[chuva]");			  
				$count2++;

				$date = $registro["date"];
				$time = $registro["time"];
				
				$dateCorrigida = str_replace("/","-", $date );
				$timeCorrigido = str_replace(":","-", $time );
				
				$data= $dateCorrigida;
				$hora = $timeCorrigido;

				$idDevice = $registro["idDevice"];
			}
		
			

			$soma ="SELECT SUM(auto) AS Auto,SUM(utilitario) AS Utilitario FROM tb_veiculos_9e36UtiCam2L v 
			JOIN tb_usuarios u
			ON v.tb_usuarios_id_usuario_9e36UtiCam2L = u.id_usuario
			WHERE u.id_usuario = {$id}";

			$resultSoma = mysqli_query($conexao,$soma); 
			$row = mysqli_fetch_assoc($resultSoma);
			$totalHorizontal = "\n,,,,,Total,";
			for($i = 0; $i < count($total[0]); $i++){
				$totalHorizontal .= $total[0][$i].",";
			}
			$escreve = fwrite($fp, $totalHorizontal);	
		
		// Exibe o vettor JSON
		
		fclose($fp);

		// $date = substr($StringJson, 2 , 10);
		 $dia= "D:".DIRECTORY_SEPARATOR;
		// $horas= substr($StringJson, 16 , 8);
		  $dia .= $data. '_'.$hora.'_'.$idDevice.".xls";
		  

    
    //salva csv
    // Envia o conteúdo do arquivo   
		
		$objReader = new PHPExcel_Reader_CSV();
		$objPHPExcel = $objReader->load('planilha.csv'); //indica qual o arquivo CSV que será convertido
		$objReader->setDelimiter(";"); // define que a separação dos dados é feita por ponto e vírgula
		$objReader->setInputEncoding('UTF-8'); // habilita os caracteres latinos.
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		
		$objWriter->save($dia); // Resultado da conversão; um arquivo do EXCEL 
		
	}

?>