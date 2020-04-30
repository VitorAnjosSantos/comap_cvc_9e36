<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: application/json; charset=utf-8');
    include("./conexao_usuario.php");

    $idDevice = $_POST["idDevice"];
    $pesquisador = $_POST["pesquisador"];
    $supervisor = $_POST["supervisor"];
    $json = $_POST["contagem"];

    $contagem = json_decode($json);

    $dados= false;
    $id = "";


    if($conexao){

        $dados= true;
            
        $query= "INSERT INTO tb_usuarios (pesquisador,supervisor,idDevice) VALUES ('{$pesquisador}','{$supervisor}','{$idDevice}')";        
        $result= mysqli_query($conexao,$query);

        if($result){
            $id = mysqli_insert_id($conexao); 
        }

    }
        foreach ($contagem as $value) {

            $date = $value->{"date"};
            $time = $value->{"time"};
            $transito = $value->{'transito'};
            $sigapare = $value->{'sigapare'};
            $chuva = $value->{'chuva'};
            $auto = $value->{'auto'};
            $utilitario = $value->{'utilitario'};
            $auto3E = $value->{'auto3E'};
            $auto4E = $value->{'auto4E'};
            $onibus2E = $value->{'onibus2E'};
            $onibus3E = $value->{'onibus3E'};
            $onibus4E = $value->{'onibus4E'};
            $veiculoOficial = $value->{'veiculoOficial'};
            $veiculoEspecial = $value->{'veiculoEspecial'};
            $motos = $value->{'motos'};
            $cLeve2E = $value->{'cLeve2E'};
            $c2E  = $value->{'c2E'};
            $c3R  = $value->{'c3R'};
            $c31S = $value->{'c31S'};
            $c4R  = $value->{'c4R'};
            $c41S = $value->{'c41S'};
            $c42S = $value->{'c42S'};
            $c5R  = $value->{'c5R'};
            $c51S = $value->{'c51S'};
            $c52S = $value->{'c52S'};
            $c6R  = $value->{'c6R'};
            $c61S = $value->{'c61S'};
            $c62S = $value->{'c62S'};
            $c63S = $value->{'c63S'};
            $c7R  = $value->{'c7R'};
            $c71S = $value->{'c71S'};
            $c72S = $value->{'c72S'};
            $c73S = $value->{'c73S'};
            $c8R  = $value->{'c8R'};
            $c81S = $value->{'c81S'};
            $c82S = $value->{'c82S'};
            $c83S = $value->{'c83S'};
            $c84S = $value->{'c84S'};
            $c9R  = $value->{'c9R'};
            $c91S = $value->{'c91S'};
            $c92S = $value->{'c92S'};
            $c93S = $value->{'c93S'};
            $c94S = $value->{'c94S'};

            if(isset($value->{'latitude'}) && isset($value->{'longitude'})){
                $latitude = $value->{'latitude'};
                $longitude = $value->{'longitude'};
            }else{
                $latitude = "";
                $longitude = "";
            }
            
            $sql = "INSERT INTO tb_veiculos_9e36UtiCam2L (
                    auto,
                    utilitario,
                    auto3E,
                    auto4E,
                    onibus2E,
                    onibus3E,
                    onibus4E,
                    veiculoOficial,
                    veiculoEspecial,
                    motos,
                    cLeve2E,
                    c2E,
                    c3R,
                    c31S,
                    c4R,
                    c41S,
                    c42S,
                    c5R,
                    c51S,
                    c52S,
                    c6R,
                    c61S,
                    c62S,
                    c63S,
                    c7R,
                    c71S,
                    c72S,
                    c73S,
                    c8R,
                    c81S,
                    c82S,
                    c83S,
                    c84S,
                    c9R,
                    c91S,
                    c92S,
                    c93S,
                    c94S,
                    date, 
                    time, 
                    transito, 
                    sigapare, 
                    chuva,
                    latitude,
                    longitude,
                    tb_usuarios_id_usuario_9e36UtiCam2L) 

                    VALUES ('{$auto}',
                            '{$utilitario}',
                            '{$auto3E}',
                            '{$auto4E}',
                            '{$onibus2E}',
                            '{$onibus3E}',
                            '{$onibus4E}',
                            '{$veiculoOficial}',
                            '{$veiculoEspecial}',
                            '{$motos}',
                            '{$cLeve2E}',
                            '{$c2E}',
                            '{$c3R}',
                            '{$c31S}',
                            '{$c4R}',
                            '{$c41S}',
                            '{$c42S}',
                            '{$c5R}',
                            '{$c51S}',
                            '{$c52S}',
                            '{$c6R}',
                            '{$c61S}',
                            '{$c62S}',
                            '{$c63S}',
                            '{$c7R}',
                            '{$c71S}',
                            '{$c72S}',
                            '{$c73S}',
                            '{$c8R}',
                            '{$c81S}',
                            '{$c82S}',
                            '{$c83S}',
                            '{$c84S}',
                            '{$c9R}',
                            '{$c91S}',
                            '{$c92S}',
                            '{$c93S}',
                            '{$c94S}',
                            '{$date}', 
                            '{$time}', 
                            '{$transito}', 
                            '{$sigapare}', 
                            '{$chuva}', 
                            '{$latitude}', 
                            '{$longitude}', 
                            '{$id}')";
            $resultado = mysqli_query($conexao,$sql);
    
        }

        if($resultado){
            $dados = array("id"=>$id);
            //URL para onde vai ser enviado nosso POST
            $url = "http://ec2-18-211-204-199.compute-1.amazonaws.com/cvc_php/excel_9e36UtiCam2L.php";
            
            // Aqui inicio a função CURL
            $curl = curl_init();
            //aqu eu pego a URL para onde será enviado o POST
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_HEADER, 0);
            curl_setopt($curl, CURLOPT_POST, 1);
            //aqui eu pego os dados para enviar via POST
            curl_setopt($curl, CURLOPT_POSTFIELDS, $dados);
            curl_exec($curl);
            curl_close($curl);
    
            echo '{sucesso: true}';
            //print_r($contagem);
    
        }
        else{
            echo'{"sucesso": false}';
        }

        
    
    

?>