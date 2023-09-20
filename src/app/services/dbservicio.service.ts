import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Rol } from './rol';
import { Pregunta } from './pregunta';
import { Usuario } from './usuario';
import { Logro } from './logro';
import { Intento } from './intento';
import { Niveles } from './niveles';

@Injectable({
  providedIn: 'root'
})
export class DbservicioService {
  
  //variable de conexion a BD
  public database!: SQLiteObject;

  //variables para la creacion de tablas

  tblUsuario:string="CREATE TABLE IF NOT EXISTS usuario(idU INTEGER PRIMARY KEY autoincrement,respuesta VARCHAR(50), nombreU VARCHAR(30) NOT NULL, contrasena VARCHAR(12) NOT NULL,correo VARCHAR(50) NOT NULL, descripcion VARCHAR(100), foto FILES NOT NULL, monedas NUMBER(5) NOT NULL, pregunta FOREIGN KEY NOT NULL,  logros FOREIGN KEY , rol FOREIGN KEY);";

  tblPregunta:string="CREATE TABLE IF NOT EXISTS pregunta(idP INTEGER PRIMARY KEY autoincrement, nombreP VARCHAR(30));";

  tblRol:string="CREATE TABLE IF NOT EXISTS rol(idR INTEGER PRIMARY KEY autoincrement, nombreR VARCHAR(15));";

  tblLogro:string="CREATE TABLE IF NOT EXISTS logro(idL INTEGER PRIMARY KEY autoincrement, nombreL VARCHAR(30), descripcion VARCHAR(100), recompensa NUMBER(5));";

  tblIntento:string="CREATE TABLE IF NOT EXISTS intento(idI INTEGER PRIMARY KEY autoincrement, estrellas NUMBER(6), tiempo NUMBER(10), completado BOOLEAN);";

  tblNiveles:string="CREATE TABLE IF NOT EXISTS niveles(idN INTEGER PRIMARY KEY autoincrement, recompensaN NUMBER(6), tiempo NUMBER(10));";

  //variables para los insert iniciales
  registroUsuario:string="INSERT or IGNORE INTO usuario(idU, respuesta, nombreU, contrasena, correo, descripcion, foto, monedas) VALUES(1, 'Lasaña', Dani123, J@ny12, dani123@gmail.com, '', 30);";

  registroPregunta:string="INSERT or IGNORE INTO pregunta(idP, nombreP) VALUES(1, '¿cual es tu comida favorita?');";

  registroRol:string="INSERT or IGNORE INTO rol(idR, nombreR) VALUES(1, 'usuario');";

  registroLogro:string="INSERT or IGNORE INTO logro(idL, nombreL, descripcion, recompensa) VALUES(1, 'Tutorial Completado', 'Completaste el tutorial felicidades', 15);";

  registroIntento:string="INSERT or IGNORE INTO niveles(idI, estrellas, tiempo, completado) VALUES(1, 30, 300);";

  registroNiveles:string="INSERT or IGNORE INTO niveles(idN, NombreN, RecompensaN) VALUES(1, 30, 300);";

  //observables de las tablas
  listaUsuario = new BehaviorSubject([]);

  listapreguntas = new BehaviorSubject([]);

  listaRol = new BehaviorSubject([]);

  listaLogro = new BehaviorSubject([]);

  listaIntento = new BehaviorSubject([]);

  listaNiveles = new BehaviorSubject([]);

  //observable para la BD
  private isBDReady:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform:Platform,public sqlite:SQLite,public toastController: ToastController, private alertController: AlertController) { 
    this.crearBD();
  }

//Crear Base de datos
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
//Fin Base de datos



  //Tablas
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
      await this.database.executeSql(this.tblNiveles,[]);
      //ejecuto los insert
      await this.database.executeSql(this.registroNiveles,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (errorN){
      this.presentAlert("Error en Crear Tabla:"+errorN);
    }

    try{
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.tblIntento,[]);
      //ejecuto los insert
      await this.database.executeSql(this.registroIntento,[]);
      this.presentAlert("Tabla creada")
      //cambio mi observable de BD
      this.isBDReady.next(true);
    }catch (errorN){
      this.presentAlert("Error en Crear Tabla:"+errorN);
    }
  }
  //Fin Tablas




  //Fetchs
  fetchUsuario():Observable<Usuario[]>{
    return this.listaUsuario.asObservable();
  }

  fetchPregunta():Observable<Pregunta[]>{
    return this.listapreguntas.asObservable();
  }

  fetchrol():Observable<Rol[]>{
    return this.listaRol.asObservable();
  }

  fetchLogro():Observable<Logro[]>{
    return this.listaLogro.asObservable();
  }

  fetchIntento():Observable<Intento[]>{
    return this.listaIntento.asObservable();
  }

  fetchNiveles():Observable<Niveles[]>{
    return this.listaNiveles.asObservable();
  }
//Fin Fetchs


//Usuario
buscarUsuario(){
  return this.database.executeSql('SELECT * FROM usuario',[]).then(res=>{
    //variable para lmacenar el resultado
    let items:Usuario[]=[];
    //verifico la cantidad de registros
    if(res.rows.length > 0 ){
      //agrego registro a registro em mi variable
      for(var i = 0; i< res.rows.length; i++){
        items.push({
          idU:res.rows.item(i).idU,
          respuesta:res.rows.item(i).respuesta,
          nombreU:res.rows.item(i).nombreU,
          contrasena:res.rows.item(i).contrasena,
          correo:res.rows.item(i).correo,
          descripcion:res.rows.item(i).descripcion,
          foto:res.rows.item(i).foto,
          monedas:res.rows.item(i).monedas
        })
      }
    }
    this.listaUsuario.next(items as any);
    })
  }

  insertarUsuario(respuesta:any, nombreU:any, contrasena:any, correo:any, descripcion:any, foto:any, monedas:any){
    return this.database.executeSql('INSERT INTO usuario(respuesta, nombreU, contrasena, correo, descripcion, foto, monedas) VALUES(?,?,?,?,?,?,?)',[respuesta, nombreU, contrasena, correo, descripcion, foto, monedas]).then(res=>{
      this.buscarUsuario();
    })
  }

  actualizarUsuario(idU:any, respuesta:any, nombreU:any, contrasena:any, correo:any, descripcion:any, foto:any, monedas:any ){
    return this.database.executeSql('UPDATE usuario SET respuesta= ?, nombreU= ?, contrasena= ?, correo= ?, descripcion= ?, foto= ?, monedas= ? WHERE idU= ?',[respuesta, nombreU,contrasena,correo,descripcion,foto,monedas,idU]).then(res=>{
      this.buscarUsuario();
    })
  }

  eliminarUsuario(idU:any){
    return this.database.executeSql('DELETE FROM usuario WHERE idU = ?',[idU]).then(res=>{
      this.buscarUsuario();
    })
  }
//Fin Usuario



//Pregunta
  buscarPregunta(){
  return this.database.executeSql('SELECT * FROM pregunta',[]).then(res=>{
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
    this.listaUsuario.next(items as any);
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
  //Fin pregunta



//Rol
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
  //Fin rol



  //Logro
  buscarLogro(){
    return this.database.executeSql('SELECT * FROM logro',[]).then(res=>{
      //variable para lmacenar el resultado
      let items:Logro[]=[];
      //verifico la cantidad de registros
      if(res.rows.length > 0 ){
        //agrego registro a registro em mi variable
        for(var i = 0; i< res.rows.length; i++){
          items.push({
            idL:res.rows.item(i).idL,
            nombreL:res.rows.item(i).nombreL,
            descripcion:res.rows.item(i).descripcion,
            recompensa:res.rows.item(i).recompensa
          })
        }
      }
      this.listaLogro.next(items as any);
    })
  }

  insertarLogro(nombreL:any, descripcion:any, recompensa:any){
    return this.database.executeSql('INSERT INTO logro(nombreL, descripcion, recompensa) VALUES(?,?,?)',[nombreL, descripcion, recompensa]).then(res=>{
      this.buscarLogro();
    })
  }

  actualizarLogro(idL:any, nombreL:any, descripcion:any, recompensa:any){
    return this.database.executeSql('UPDATE logro SET nombreL= ?, descripcion= ?, recompensa= ? WHERE idL= ?',[nombreL,descripcion,recompensa, idL]).then(res=>{
      this.buscarLogro();
    })
  }

  eliminarLogro(idL:any){
    return this.database.executeSql('DELETE FROM logro WHERE idL = ?',[idL]).then(res=>{
      this.buscarLogro();
    })
  }
  //Fin logro


  //Intento
  buscarIntento(){
    return this.database.executeSql('SELECT * FROM intento',[]).then(res=>{
      //variable para lmacenar el resultado
      let items:Intento[]=[];
      //verifico la cantidad de registros
      if(res.rows.length > 0 ){
        //agrego registro a registro em mi variable
        for(var i = 0; i< res.rows.length; i++){
          items.push({
            idI:res.rows.item(i).idI,
            estrellas:res.rows.item(i).estrellas,
            tiempo:res.rows.item(i).tiempo,
            completado:res.rows.item(i).completado
          })
        }
      }
      this.listaIntento.next(items as any);
    })
  }

  insertarIntento(estrellas:any, tiempo:any, completado:any){
    return this.database.executeSql('INSERT INTO intento(estrellas, tiempo, completado) VALUES(?,?,?)',[estrellas, tiempo, completado]).then(res=>{
      this.buscarIntento();
    })
  }

  actualizarIntento(idI:any, estrellas:any, descripcion:any, recompensa:any){
    return this.database.executeSql('UPDATE intento SET estrellas= ?, descripcion= ?, recompensa= ? WHERE idI= ?',[estrellas,descripcion,recompensa,idI]).then(res=>{
      this.buscarIntento();
    })
  }

  eliminarIntento(idI:any){
    return this.database.executeSql('DELETE FROM intento WHERE idL = ?',[idI]).then(res=>{
      this.buscarIntento();
    })
  }
  //Fin Intento


  //Intento
  buscarNiveles(){
    return this.database.executeSql('SELECT * FROM niveles',[]).then(res=>{
      //variable para lmacenar el resultado
      let items:Niveles[]=[];
      //verifico la cantidad de registros
      if(res.rows.length > 0 ){
        //agrego registro a registro em mi variable
        for(var i = 0; i< res.rows.length; i++){
          items.push({
            idN:res.rows.item(i).idN,
            NombreN:res.rows.item(i).NombreN,
            RecompensaN:res.rows.item(i).RecompensaN
          })
        }
      }
      this.listaNiveles.next(items as any);
    })
  }

  insertarNiveles(NombreN:any, RecompensaN:any){
    return this.database.executeSql('INSERT INTO niveles(NombreN, RecompensaN) VALUES(?,?)',[NombreN, RecompensaN]).then(res=>{
      this.buscarNiveles();
    })
  }

  actualizarNiveles(idN:any, NombreN:any, RecompensaN:any){
    return this.database.executeSql('UPDATE niveles SET NombreN= ?, RecompensaN= ? WHERE idN= ?',[NombreN,RecompensaN,idN]).then(res=>{
      this.buscarNiveles();
    })
  }

  eliminarNiveles(idN:any){
    return this.database.executeSql('DELETE FROM niveles WHERE idL = ?',[idN]).then(res=>{
      this.buscarNiveles();
    })
  }
  //Fin Intento



  

  







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
}



