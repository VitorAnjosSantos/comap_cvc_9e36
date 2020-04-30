import { Component, OnInit} from '@angular/core';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { InserirNoBancoService } from '../services/database/inserir-no-banco.service';
//import { GerarPlanilhaService } from '../services/api/gerar-planilha.service';
import { AlertController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 
  public count: any;
  listaForm: any;
  localdate: any;
  loading: any = null;
  public contagem: any;
  public conta: any;
  pesquisador: any;
  supervisor: any;
  transito: boolean= false;
  sigapare: boolean= false;
  chuva: boolean= false; 
  ocorrencia: any= [{transito: false, sigapare: false, chuva: false}];
  geo = {latitude: 0, longitude: 0};
  array: any[] = [];

  constructor(private navCtrl: NavController, 
              private storage: Storage,
              private inserir: InserirNoBancoService,
              //private gerar: GerarPlanilhaService,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController,
              private nativeAudio: NativeAudio,
              private geoLocation: Geolocation,

            ) 
            {
            
   this.count= {
      date: '',
      time: '',
      transito: 'NÃO', 
      sigapare: 'NÃO', 
      chuva: 'NÃO',
      auto: 0,
      utilitario: 0,
      auto3E: 0,
      auto4E: 0,
      onibus2E: 0,
      onibus3E: 0,
      onibus4E: 0,
      veiculoOficial: 0,
      veiculoEspecial: 0,
      motos: 0,
      cLeve2E: 0,
      c2E: 0,
      c3R: 0,
      c31S: 0,
      c4R: 0,
      c41S: 0,
      c42S: 0,
      c5R: 0,
      c51S: 0,
      c52S: 0,
      c6R: 0,
      c61S: 0,
      c62S: 0,
      c63S: 0,
      c7R: 0,
      c71S: 0,
      c72S: 0,
      c73S: 0,
      c8R: 0,
      c81S: 0,
      c82S: 0,
      c83S: 0,
      c84S: 0,
      c9R: 0,
      c91S: 0,
      c92S: 0,
      c93S: 0,
      c94S: 0
      

    };

    this.contagem = this.count;
    this.conta = this.count;

    this.storage.get("listaForm").then((val: any) => {
      if(val !== null){
        console.log('Lista ja existe');
      }else{
        this.storage.set("listaForm", "").then(() => { 
        });
      }
    });

    this.storage.get("historico").then((val: any) => {
      if (val) {
        this.contagem = val;
        this.conta = val;
        
      }else{
        this.storage.set("historico", '').then((val: any) => {
          this.limparCache();
          
        });
      }
      
    });  

  }

  geolocaliza(){
    
      this.geoLocation.getCurrentPosition().then((resp) => {
  
        this.geo.latitude  = resp.coords.latitude;
        this.geo.longitude  = resp.coords.longitude;
        //alert(JSON.stringify(this.geo));
        let latitude = JSON.stringify(this.geo.latitude);
        let longitude = JSON.stringify(this.geo.longitude);

       
        this.count['latitude'] = latitude;
        this.count['longitude'] = longitude;
          

        }).catch((error: any) => navigator['app'].exitApp());
      //alert(JSON.stringify(this.count));  

  }

  ocorrencias(tipo){
    this.storage.get("listaForm").then((val: any) => {
      
      let array: any[] = [];

      if (val !== "") {
        array = array.concat(JSON.parse(val));
        
      }
      
      console.log(JSON.stringify(this.ocorrencia));
      if(this.ocorrencia[0][tipo] == true){
          this.ocorrencia[0][tipo] = false;
          this.count[tipo] = 'NÃO';
          array.push(val);
          console.log(JSON.stringify(this.ocorrencia));
        }else{
          this.ocorrencia[0][tipo] = true;
          this.count[tipo] = 'SIM';
          array.push(val);
          console.log(JSON.stringify(this.ocorrencia));
        }
        
    });
  }

  ngOnInit() {
    this.geolocaliza();
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/audios/pop.mp3');
    
  }

  formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  contador(tipo: string){
    //this.nativeAudio.play('uniqueId1').then(()=> {
      this.geolocaliza();

      var b = document.getElementById(tipo); 
      /* b.setAttribute("disabled", "true"); */

    this.storage.get("listaForm").then((val: any) => {
        this.count[tipo]++;
        this.conta[tipo]++;

        let array: any[] = [];
        if (val !== "") {
          array = array.concat(JSON.parse(val));
          
        }

        let date: any;
        let time: any;

        let dataCompleta = new Date(),
            horaCompleta = new Date();

        let dia = this.formataZerosEsquerda(dataCompleta.getDate()),
            mes = this.formataZerosEsquerda((dataCompleta.getMonth() + 1)),
            ano = dataCompleta.getFullYear(),
            hora = this.formataZerosEsquerda(horaCompleta.getHours()),   
            minutos = this.formataZerosEsquerda(horaCompleta.getMinutes()),
            segundos = this.formataZerosEsquerda(horaCompleta.getSeconds()),
            milisegundos = this.formataZerosEsquerda(horaCompleta.getMilliseconds());

        date = dia + "/" + mes + "/" + ano;
        time = hora + ":" + minutos + ":" + segundos + ":" + milisegundos;         
        
        this.count["date"] = date;
        this.count["time"] = time;
        
        array.push(this.count);
           
        this.storage.set("listaForm", JSON.stringify(array)).then((data: any) => {
          this.limpaCount();
          this.storage.set("historico", this.conta).then((val: any) => {
            console.log(data);
            
            /* b.setAttribute("disabled", "false"); */
          });

        });
        
    });
    //});
  }

  contados(tipo: string){

    return this.conta[tipo];
  }

  limpaCount(){
    this.count.date= '';
    this.count.time= '';
    this.count.auto= 0;
    this.count.utilitario= 0;
    this.count.auto3E= 0;
    this.count.auto4E= 0;
    this.count.onibus2E= 0;
    this.count.onibus3E= 0;
    this.count.onibus4E= 0;
    this.count.veiculoOficial= 0;
    this.count.veiculoEspecial= 0;
    this.count.motos= 0;
    this.count.cLeve2E= 0;
    this.count.c2E= 0;
    this.count.c3R= 0;
    this.count.c31S= 0;
    this.count.c4R= 0;
    this.count.c41S= 0;
    this.count.c42S= 0;
    this.count.c5R= 0;
    this.count.c51S= 0;
    this.count.c52S= 0;
    this.count.c6R= 0;
    this.count.c61S= 0;
    this.count.c62S= 0;
    this.count.c63S= 0;
    this.count.c7R= 0;
    this.count.c71S= 0;
    this.count.c72S= 0;
    this.count.c73S= 0;
    this.count.c8R= 0;
    this.count.c81S= 0;
    this.count.c82S= 0;
    this.count.c83S= 0;
    this.count.c84S= 0;
    this.count.c9R= 0;
    this.count.c91S= 0;
    this.count.c92S= 0;
    this.count.c93S= 0;
    this.count.c94S= 0;
    
  }

  limparCache(){
    this.storage.set("listaForm", "").then(() =>{
      this.storage.set("historico", "").then(() =>{

            this.contagem= {
              date: '',
              time: '',
              transito: 'NÃO', 
              sigapare: 'NÃO', 
              chuva: 'NÃO',
              auto: 0,
              utilitario: 0,
              auto3E: 0,
              auto4E: 0,
              onibus2E: 0,
              onibus3E: 0,
              onibus4E: 0,
              veiculoOficial: 0,
              veiculoEspecial: 0,
              motos: 0,
              cLeve2E: 0,
              c2E: 0,
              c3R: 0,
              c31S: 0,
              c4R: 0,
              c41S: 0,
              c42S: 0,
              c5R: 0,
              c51S: 0,
              c52S: 0,
              c6R: 0,
              c61S: 0,
              c62S: 0,
              c63S: 0,
              c7R: 0,
              c71S: 0,
              c72S: 0,
              c73S: 0,
              c8R: 0,
              c81S: 0,
              c82S: 0,
              c83S: 0,
              c84S: 0,
              c9R: 0,
              c91S: 0,
              c92S: 0,
              c93S: 0,
              c94S: 0
            };
            this.conta= {
              date: '',
              time: '',
              transito: 'NÃO', 
              sigapare: 'NÃO', 
              chuva: 'NÃO',
              auto: 0,
              utilitario: 0,
              auto3E: 0,
              auto4E: 0,
              onibus2E: 0,
              onibus3E: 0,
              onibus4E: 0,
              veiculoOficial: 0,
              veiculoEspecial: 0,
              motos: 0,
              cLeve2E: 0,
              c2E: 0,
              c3R: 0,
              c31S: 0,
              c4R: 0,
              c41S: 0,
              c42S: 0,
              c5R: 0,
              c51S: 0,
              c52S: 0,
              c6R: 0,
              c61S: 0,
              c62S: 0,
              c63S: 0,
              c7R: 0,
              c71S: 0,
              c72S: 0,
              c73S: 0,
              c8R: 0,
              c81S: 0,
              c82S: 0,
              c83S: 0,
              c84S: 0,
              c9R: 0,
              c91S: 0,
              c92S: 0,
              c93S: 0,
              c94S: 0
            };
            this.count= {
              date: '',
              time: '',
              transito: 'NÃO', 
              sigapare: 'NÃO', 
              chuva: 'NÃO',
              auto: 0,
              utilitario: 0,
              auto3E: 0,
              auto4E: 0,
              onibus2E: 0,
              onibus3E: 0,
              onibus4E: 0,
              veiculoOficial: 0,
              veiculoEspecial: 0,
              motos: 0,
              cLeve2E: 0,
              c2E: 0,
              c3R: 0,
              c31S: 0,
              c4R: 0,
              c41S: 0,
              c42S: 0,
              c5R: 0,
              c51S: 0,
              c52S: 0,
              c6R: 0,
              c61S: 0,
              c62S: 0,
              c63S: 0,
              c7R: 0,
              c71S: 0,
              c72S: 0,
              c73S: 0,
              c8R: 0,
              c81S: 0,
              c82S: 0,
              c83S: 0,
              c84S: 0,
              c9R: 0,
              c91S: 0,
              c92S: 0,
              c93S: 0,
              c94S: 0
            };
           
      });
    });    
  }

}