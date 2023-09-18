import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Rol } from './rol';
import { Pregunta } from './pregunta';

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
      this.buscarRol();
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

  bdstate(){
    return this.isBDReady.asObservable();
  }
//rol
  fetchrol():Observable<Rol[]>{
    return this.listaRol.asObservable();
  }
  buscarRol(){
    return this.database.executeSql('SELECT * FROM rol',[]).then(res=>{
      //variable para lmacenar el resultado
      let items:Rol[]=[];
      //verifico la cantidad de registros
      if(res.rows.length > 0 ){
        //agrego registro a registro em mi variable
        for(var i = 0; i< res.rows.length; i++){
          items.push({
            idR:res.rows.item(i).idR,
            nombreR:res.rows.item(i).nombreR

          })
        }
      }
      this.listaRol.next(items as any);

    })
  }

  insertarRol(nombreR:any){
    return this.database.executeSql('INSERT INTO rol(nombreR) VALUES(?)',[nombreR]).then(res=>{
      this.buscarRol();
    })
  }
  actualizarRol(idR:any, nombreR:any){
    return this.database.executeSql('UPDATE rol SET nombreR=? WHERE idR=?',[nombreR, idR]).then(res=>{
      this.buscarRol();
    })
  }
  eliminarRol(idR:any){
    return this.database.executeSql('DELETE FROM rol WHERE idR = ?',[idR]).then(res=>{
      this.buscarRol();
    })
  }
  //fin rol

  //pregunta
  fetchPregunta():Observable<Pregunta[]>{
    return this.listapreguntas.asObservable();
  }
  buscarPregunta(){
    return this.database.executeSql('SELECT * FROM rol',[]).then(res=>{
      //variable para lmacenar el resultado
      let items:Pregunta[]=[];
      //verifico la cantidad de registros
      if(res.rows.length > 0 ){
        //agrego registro a registro em mi variable
        for(var i = 0; i< res.rows.length; i++){
          items.push({
            idP:res.rows.item(i).idP,
            nombreP:res.rows.item(i).nombreP

          })
        }
      }
      this.listapreguntas.next(items as any);

    })
  }

  insertarPregunta(nombreP:any){
    return this.database.executeSql('INSERT INTO pregunta(nombreP) VALUES(?)',[nombreP]).then(res=>{
      this.buscarPregunta();
    })
  }
  actualizarPregunta(idP:any, nombreP:any){
    return this.database.executeSql('UPDATE pregunta SET nombreP=? WHERE idP=?',[nombreP, idP]).then(res=>{
      this.buscarPregunta();
    })
  }
  eliminarPregunta(idP:any){
    return this.database.executeSql('DELETE FROM pregunta WHERE idP = ?',[idP]).then(res=>{
      this.buscarPregunta();
    })
  }
  //fin pregunta






 

}



