import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbservicioService {
  
  //variable de conexion a BD
  public database!: SQLiteObject;

  //variables para la creacion de tablas

  tblUsuario:string="CREATE TABLE IF NO EXISTS usuario(idU INTEGER PRIMARY KEY autoincrement,respuesta VARCHAR(50), nombreU VARCHAR(30) NOT NULL, contrasena VARCHAR(12) NOT NULL,correo VARCHAR(50) NOT NULL, descripcion VARCHAR(100), foto FILES NOT NULL, monedas NUMBER(5) NOT NULL, pregunta FOREIGN KEY NOT NULL,  logros FOREIGN KEY , skins FOREIGN KEY, rol FOREIGN KEY);";

  tblPregunta:string="CREATE TABLE IF NO EXISTS pregunta(idP INTEGER PRIMARY KEY autoincrement, nombreP VARCHAR(30));";

  tblRol:string="CREATE TABLE IF NO EXISTS rol(idR INTEGER PRIMARY KEY autoincrement, nombreR VARCHAR(15));";

  tblLogro:string="CREATE TABLE IF NO EXISTS logro(idL INTEGER PRIMARY KEY autoincrement, nombreL VARCHAR(30), descripcion VARCHAR(100), recompensa NUMBER(5));";

  tblSkins:string="CREATE TABLE IF NO EXISTS skins(idS INTEGER PRIMARY KEY autoincrement, nombreS VARCHAR(30), foto FILES, precio NUMBER(5));";

  tblNiveles:string="CREATE TABLE IF NO EXISTS niveles(idN INTEGER PRIMARY KEY autoincrement, recompensaN NUMBER(6), tiempo NUMBER(10));";

  //variables para los insert iniciales
  registroUsuario:string="INSERT OR IGNORE INTO usuario(idU, respuesta, nombreU, contrasena, correo, descripcion, foto, monedas) VALUES(1, 'Lasaña', Dani123, J@ny12, dani123@gmail.com, '', 30);";

  registroPregunta:string="INSERT OR IGNORE INTO pregunta(idP, nombreP) VALUES(1, '¿cual es tu comida favorita?');";

  registroRol:string="INSERT OR IGNORE INTO rol(idR, nombreR) VALUES(1, 'usuario');";

  registroLogro:string="INSERT OR IGNORE INTO logro(idL, nombreL, descripcion, recompensa) VALUES(1, 'Tutorial Completado', 'Completaste el tutorial felicidades', 15);";

  registroSkins:string="INSERT OR IGNORE INTO skins(idS, nombreS, foto, precio) VALUES(1, 'Boley', '', 55);";

  registroNiveles:string="INSERT OR IGNORE INTO niveles(idN, recompensaN, tiempo) VALUES(1, 30, 300);";

  //observables de las tablas
  listaUsuario = new BehaviorSubject([]);

  listapreguntas = new BehaviorSubject([]);

  listaRol = new BehaviorSubject([]);

  listaLogro = new BehaviorSubject([]);

  listaSkins = new BehaviorSubject([]);

  listaNiveles = new BehaviorSubject([]);

  //observable para la BD
  private isBDReady:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform:Platform,public sqlite:SQLite,public toastController: ToastController, private alertController: AlertController) { 
    this.crearBD();

  }

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
      await this.database.executeSql(this.tblUsuario,[]);
      //ejecuto los insert
      await this.database.executeSql(this.registroUsuario,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (errorU){
      this.presentAlert("Error en Crear Tabla:"+errorU);
    }

    try{
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.tblPregunta,[]);
      //ejecuto los insert
      await this.database.executeSql(this.registroPregunta,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (errorP){
      this.presentAlert("Error en Crear Tabla:"+errorP);
    }

    try{
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.tblRol,[]);
      //ejecuto los insert
      await this.database.executeSql(this.registroRol,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (errorR){
      this.presentAlert("Error en Crear Tabla:"+errorR);
    }

    try{
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.tblLogro,[]);
      //ejecuto los insert
      await this.database.executeSql(this.registroLogro,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (errorL){
      this.presentAlert("Error en Crear Tabla:"+errorL);
    }

    try{
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.tblSkins,[]);
      //ejecuto los insert
      await this.database.executeSql(this.registroSkins,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (errorS){
      this.presentAlert("Error en Crear Tabla:"+errorS);
    }

    try{
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.tblNiveles,[]);
      //ejecuto los insert
      await this.database.executeSql(this.registroNiveles,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (errorN){
      this.presentAlert("Error en Crear Tabla:"+errorN);
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


