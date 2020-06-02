import { Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
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
  array: any;

  constructor(private storage: Storage,
              public loadingController: LoadingController,
              private nativeAudio: NativeAudio,
              private geoLocation: Geolocation,

            ) 
            {
  }

  ngOnInit() {
    
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/audios/pop.mp3');

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
        this.array = val;
        console.log(this.array); 
      }else{  
        this.storage.set("listaForm", "").then(() => { 
          this.array = [];
        });
      }
    });

    this.storage.get("historico").then((val: any) => {
      if (val) {
        this.contagem = val;
        this.conta = val;
        
      }else{
        this.storage.set("historico", '');
        this.limparCache();
      }
      
    });  

    /* this.geolocaliza(); */
    
    setInterval(() => { 
      this.setValor();
   }, 2000)
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

  formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  getValor(tipo: any){
    
      
      this.geolocaliza();

      let array = JSON.stringify(this.count);

      let aux = JSON.parse(array);
      
      aux[tipo]++; 

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
      
      aux["date"] = date;
      aux["time"] = time;

     
      this.array = this.array.concat(aux);
  }

  

  setValor(){
  
      this.storage.set("listaForm", this.array).then((data)=>{
          this.setHistorico();
          console.log(data);
      })
   
  }

  setHistorico(){

    this.storage.set("historico", this.conta).then((val: any) => {
        
      });
   
  }

  async contador(tipo: any){
      this.nativeAudio.play('uniqueId1');
      
      this.conta[tipo]++;     

        /* let d = await this.audio(); */
       this.getValor(tipo);
     
  }

  contados(tipo: string){

    return this.conta[tipo];
  }

  limpaCount(){
   
     this.array = [];
      
  }

  limparCache(){
    this.storage.set("listaForm", "").then(() =>{
      this.storage.set("historico", "").then(() =>{
        this.array = [];
            
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
      });
    });    
  }










}


