import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbservicioService {
  

  
  constructor(private platform:Platform,public sqlite:SQLite,public toastController: ToastController, private alertController: AlertController) { 
    this.crearBD();

  }

 
  
  //variable de conexion a BD
  public database!: SQLiteObject;

  //variables para la creacion de tablas

  tblUsuario:string="CREATE TABLE IF NO EXISTS usuario(idU INTEGER PRIMARY KEY autoincrement,respuesta VARCHAR(50), nombreU VARCHAR(30) NOT NULL, contrasena VARCHAR(12) NOT NULL,correo VARCHAR(50) NOT NULL, descripcion VARCHAR(100), niveles NUMBER(2), foto FILES NOT NULL, monedas NUMBER(5) NOT NULL, pregunta FOREIGN KEY NOT NULL,  logros FOREIGN KEY , skins FOREIGN KEY, rol FOREIGN KEY);";

  tblPregunta:string="CREATE TABLE IF NO EXISTS pregunta(idP INTEGER PRIMARY KEY autoincrement, nombreP VARCHAR(30));";

  tblRol:string="CREATE TABLE IF NO EXISTS rol(idR INTEGER PRIMARY KEY autoincrement, nombreR VARCHAR(15));";

  tblLogro:string="CREATE TABLE IF NO EXISTS logro(idL INTEGER PRIMARY KEY autoincrement, nombreL VARCHAR(30), descripcion VARCHAR(100), recompensa NUMBER(5));";

  tblSkins:string="CREATE TABLE IF NO EXISTS skins(idS INTEGER PRIMARY KEY autoincrement, nombreS VARCHAR(30), foto FILES, precio NUMBER(5));";

  //variables para los insert iniciales
  registropregunta:string="INSERT OR IGNORE INTO pregunta(id, nombreP) VALUES(1, '¿cual es tu comida favorita?');";
  registrorol:string="INSERT OR IGNORE INTO rol(id, nombreR) VALUES(1, 'usuario');";

  //observables de las tablas
  listapreguntas = new BehaviorSubject([]);

  //observable para la BD
  private isBDReady:BehaviorSubject<boolean> = new BehaviorSubject(false);


 crearBD(){
    this.platform.ready().then(()=> {
      this.sqlite.create({
        name: 'proyecto.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //capturar la coneccion a la BD
        this.database = db;
        this.presentAlert("BD creada");
        //llamo a crear la(s) tabla(s)
        this.crearTablas();
      }).catch((e) => this.presentAlert("error en crear BD: "+e));

    })
  }

 async crearTablas(){
    try{
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.tblPregunta,[]);
      //ejecuto los insert

      await this.database.executeSql(this.registropregunta,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (error){
      this.presentAlert("Error en Crear Tabla:"+error);
    }
  }

async presentAlert( msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  /*
  addPregunta(nombreP){
    let data=[nombreP];
    return this.database.executeSql('INSERT INTO pregunta(nombreP) VALUES(?)',data)
    .then(()=>{
      this.cargarPregunta();
    })
  }

  updatePregunta(idP,nombreP){
    let data=[nombreP,idP];
    return this.database.executeSql('UPDATE pregunta SET nombreP=? WHERE idP=?',data)
    .then(()=>{
      this.cargarPregunta();
    })
  }

  deletePregunta(idP){
    return this.database.executeSql('DELETE FROM pregunta WHERE id=?'.[id])
    .then(()=>{
      this.cargarPregunta();
    })
  }

  cargarPregunta(){
    return this.database.executeSql('SELECT * FROM pregunta',[])
    .then(res=>{
      let items:Pregunta[]=[];
      if(res.rows.length>0){
        for (var i = 0; i< res.rows.length; i++){
          items.push({
            idP:res.rows.item(i).idP,
            nombreP:res.rows.item(i).nombreP
          });
        }
      }
      this.listaPregunta.next(items);
    });
  }

 */

}



