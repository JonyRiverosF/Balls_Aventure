import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Rol } from './rol';
import { Inter } from './inter';
import { Pregunta } from './pregunta';
import { Usuario } from './usuario';
import { Logro } from './logro';
import { Intento } from './intento';
import { Niveles } from './niveles';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbservicioService {

  //variable de conexion a BD
  public database!: SQLiteObject;


  //variables para la creacion de tablas
  tblRol: string = "CREATE TABLE IF NOT EXISTS rol(idR INTEGER PRIMARY KEY AUTOINCREMENT, nombreR VARCHAR(15) NOT NULL);";

  tblPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta(idP INTEGER PRIMARY KEY AUTOINCREMENT, nombreP VARCHAR(30) NOT NULL);";

  tblLogro:string="CREATE TABLE IF NOT EXISTS logro(idL INTEGER PRIMARY KEY autoincrement, nombreL VARCHAR(30) NOT NULL, descripcion VARCHAR(100) NOT NULL, recompensa NUMBER(5) NOT NULL);";

  tblNiveles: string = "CREATE TABLE IF NOT EXISTS niveles(idN INTEGER PRIMARY KEY AUTOINCREMENT, NombreN VARCHAR(30) NOT NULL, RecompensaN NUMBER(6) NOT NULL);";

  tblIntento: string = "CREATE TABLE IF NOT EXISTS intento(idI INTEGER PRIMARY KEY AUTOINCREMENT, estrellas NUMBER(6) NOT NULL, tiempo NUMBER(10) NOT NULL, completado BOOLEAN NOT NULL, idNiveles INTEGER,idUsuario INTERGER, FOREIGN KEY(idNiveles) REFERENCES niveles(idN),FOREIGN KEY(idUsuario) REFERENCES usuario(idU));";

  tblUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idU INTEGER PRIMARY KEY AUTOINCREMENT, respuesta VARCHAR(50) NOT NULL, nombreU VARCHAR(30) NOT NULL, contrasena VARCHAR(12) NOT NULL, correo VARCHAR(50) NOT NULL, descripcion VARCHAR(100), foto BLOB, monedas NUMBER(5) NOT NULL, idRol INTEGER, idPregunta INTEGER, FOREIGN KEY(idRol) REFERENCES rol(idR), FOREIGN KEY(idPregunta) REFERENCES pregunta(idP));";
  
  tblInter: string ="CREATE TABLE IF NOT EXISTS inter(idUsuario INTEGER, idLogro INTEGER, PRIMARY KEY (idUsuario, idLogro),FOREIGN KEY (idUsuario) REFERENCES usuario(idU),FOREIGN KEY (idLogro) REFERENCES logro(idL));";

  //variables para los insert iniciales
  registroRol:string="INSERT or IGNORE INTO rol(idR, nombreR) VALUES(1, 'usuario');";
  registroRol2:string="INSERT or IGNORE INTO rol(idR, nombreR) VALUES(2, 'administrador');";

  registroPregunta:string="INSERT or IGNORE INTO pregunta(idP, nombreP) VALUES(1, '¿cual es tu comida favorita?');";
  registroPregunta2:string="INSERT or IGNORE INTO pregunta(idP, nombreP) VALUES(2, '¿caricatura favorita?');";
  registroPregunta3:string="INSERT or IGNORE INTO pregunta(idP, nombreP) VALUES(3, '¿nombre de tu primera mascota?');";

  registroLogro1:string="INSERT or IGNORE INTO logro(idL, nombreL, descripcion, recompensa) VALUES(1, 'Novato', 'completa el tutorial', 15);";
  registroLogro2:string="INSERT or IGNORE INTO logro(idL, nombreL, descripcion, recompensa) VALUES(2, 'Aprendiz', 'completa dos niveles bien', 30);";
  registroLogro3:string="INSERT or IGNORE INTO logro(idL, nombreL, descripcion, recompensa) VALUES(3, 'Brillante', 'recolecta todas las estrellas', 45);";
  registroLogro4:string="INSERT or IGNORE INTO logro(idL, nombreL, descripcion, recompensa) VALUES(4, 'Premio Mayor', 'completa el juego', 60);";

  registrointer:string="INSERT or IGNORE INTO inter(idUsuario, idLogro) VALUES(1,1);";
  registrointer1:string="INSERT or IGNORE INTO inter(idUsuario, idLogro) VALUES(1,4);";
  registrointer2:string="INSERT or IGNORE INTO inter(idUsuario, idLogro) VALUES(2,3);";
  

  registroNiveles: string = "INSERT or IGNORE INTO niveles(idN, NombreN, RecompensaN) VALUES(1, 'Tutorial', 150);";
  registroNiveles2: string = "INSERT or IGNORE INTO niveles(idN, NombreN, RecompensaN) VALUES(2, 'Nivel-Medio', 300);";
  registroNiveles3: string = "INSERT or IGNORE INTO niveles(idN, NombreN, RecompensaN) VALUES(3, 'Nivel-Dificil', 450);";


  registroUsuario: string = "INSERT or IGNORE INTO usuario(idU,idPregunta,  respuesta, nombreU, contrasena, correo, descripcion, foto, monedas, idRol) VALUES(1, 1, 'pasta', 'Dani123', 'J@ny12', 'dani123@gmail.com', 'Me gusta jugar videojuegos','',0, 1);";
  registroUsuario2: string = "INSERT or IGNORE INTO usuario(idU, idPregunta,  respuesta, nombreU, contrasena, correo, descripcion, foto, monedas, idRol) VALUES(2, 2, 'ben10', 'jony121', 'J@ny12', 'jony123@gmail.com', 'Me gusta jugar videojuegos','',0, 2);";

  //observables de las tablas
  listaRol = new BehaviorSubject([]);

  listapreguntas = new BehaviorSubject([]);

  listaLogro = new BehaviorSubject([]);

  listaNiveles = new BehaviorSubject([]);

  listaIntento = new BehaviorSubject([]);

  listaUsuario = new BehaviorSubject([]);

  listaInter = new BehaviorSubject([]);



  //observable para la BD
  private isBDReady:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private activatedRoute: ActivatedRoute,private platform:Platform,public sqlite:SQLite,public toastController: ToastController, private alertController: AlertController) { 
    this.crearBD();
  }

  //Fetchs
  fetchrol():Observable<Rol[]>{
    return this.listaRol.asObservable();
  }

  fetchPregunta():Observable<Pregunta[]>{
    return this.listapreguntas.asObservable();
  }

  fetchLogro():Observable<Logro[]>{
    return this.listaLogro.asObservable();
  }

  fetchNiveles():Observable<Niveles[]>{
    return this.listaNiveles.asObservable();
  }

  fetchIntento():Observable<Intento[]>{
    return this.listaIntento.asObservable();
  }

  fetchUsuario():Observable<Usuario[]>{
    return this.listaUsuario.asObservable();
  }
  fetchinter():Observable<Inter[]>{
    return this.listaInter.asObservable();
  }
//Fin Fetchs


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
  //Fin pregunta


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


  //Niveles
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
    return this.database.executeSql('DELETE FROM niveles WHERE idN = ?',[idN]).then(res=>{
      this.buscarNiveles();
    })
  }
  //Fin Niveles


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
          completado:res.rows.item(i).completado,
          idNiveles:res.rows.item(i).idNiveles,
          idUsuario:res.rows.item(i).idUsuario
        })
      }
    }
    this.listaIntento.next(items as any);
  })
}

insertarIntento(estrellas:any, tiempo:any, completado:any,idNiveles:any, idUsuario:any){
  return this.database.executeSql('INSERT INTO intento(estrellas, tiempo, completado, idNiveles, idUsuario) VALUES(?,?,?,?,?)',[estrellas, tiempo, completado,idNiveles, idUsuario]).then(res=>{
    this.buscarIntento();
  }).catch(e=>{
    this.presentAlert("Error en insertar intento"+e);
  })
 
}




actualizarIntento(idI:any, estrellas:any, descripcion:any, recompensa:any,idNiveles:any){
  return this.database.executeSql('UPDATE intento SET estrellas= ?, descripcion= ?, recompensa= ?, idNiveles= ?  WHERE idI= ?',[estrellas,descripcion,recompensa,idNiveles,idI]).then(res=>{
    this.buscarIntento();
  })
}

eliminarIntento(idI:any){
  return this.database.executeSql('DELETE FROM intento WHERE idI = ?',[idI]).then(res=>{
    this.buscarIntento();
    
  })
}
//Fin Intento


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
          monedas:res.rows.item(i).monedas,
          idRol:res.rows.item(i).idRol,
          idPregunta:res.rows.item(i).idPregunta
          
        })
      }
    }
    this.listaUsuario.next(items as any);
    })
  }

  insertarUsuario(respuesta:any, nombreU:any, contrasena:any, correo:any, descripcion:any, foto:any, monedas:any, idRol:any, idPregunta:any){
    return this.database.executeSql('INSERT INTO usuario(respuesta, nombreU, contrasena, correo, descripcion, foto, monedas, idRol,idPregunta ) VALUES(?,?,?,?,?,?,?,?,?)',[respuesta, nombreU, contrasena, correo, descripcion, foto, monedas, idRol, idPregunta]).then(res=>{
      this.buscarUsuario();
    }).catch(e=>{
      this.presentAlert("Error en insertar usuario");
    })
  }

  actualizarUsuario(idU:any, respuesta:any, nombreU:any, contrasena:any, correo:any, descripcion:any, foto:any, monedas:any, idRol:any, idPregunta:any){
    return this.database.executeSql('UPDATE usuario SET respuesta= ?, nombreU= ?, contrasena= ?, correo= ?, descripcion= ?, foto= ?, monedas= ?, idRol= ?, idPregunta= ? WHERE idU= ?',[respuesta, nombreU,contrasena,correo,descripcion,foto,monedas,idRol,idPregunta,idU]).then(res=>{
      this.buscarUsuario();
    })
  }

  actualizaPerfilUsuario(idU:any, correo:any, nombreU:any, descripcion:any, foto:any){
    return this.database.executeSql('UPDATE usuario SET correo=?, nombreU= ?, descripcion= ?, foto= ? WHERE idU= ?',[correo, nombreU, descripcion, foto, idU])
    .then(res=>{
      this.buscarUsuario();
    }).catch(e=>{
      this.presentAlert("Error Modificar Usuario "+e)
    })
  }

  actualizarclaveUsuario(idU:any, contrasena:any){
    return this.database.executeSql('UPDATE usuario SET contrasena= ? WHERE idU= ?',[contrasena, idU])
    .then(res=>{
        this.buscarUsuario();
      }).catch(e=>{
        this.presentAlert("Error Modificar Clave: "+e)
      })
  }

  eliminarUsuario(idU:any){
    return this.database.executeSql('DELETE FROM usuario WHERE idU = ?',[idU]).then(res=>{
      this.buscarUsuario();
    })
  }

//Fin Usuario

//Inter
buscarInter(){
  return this.database.executeSql('SELECT * FROM inter',[]).then(res=>{
    //variable para lmacenar el resultado
    let items:Inter[]=[];
    //verifico la cantidad de registros
    if(res.rows.length > 0 ){
      //agrego registro a registro em mi variable
      for(var i = 0; i< res.rows.length; i++){
        items.push({
          
          idUsuario:res.rows.item(i).idUsuario,
          idLogro:res.rows.item(i).idLogro
          
        })
      }
    }
    this.listaInter.next(items as any);
    })
  }

  insertarInter(idUsuario:any, idLogro:any){
    return this.database.executeSql('INSERT INTO inter(idUsuario, idLogro ) VALUES(?,?)',[idUsuario, idLogro]).then(res=>{
      this.buscarInter();
    }).catch(e=>{
      this.presentAlert("Error en insertar inter");
    })
  }
//Fin Inter
 
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
      this.crearTablaRol();
      this.crearTablaPregunta();
      this.crearTablaLogro();
      this.crearTablaNiveles();
      this.crearTablaIntento();
      this.crearTablaUsuario();
      this.crearTablaInter();
    }).catch((e) => this.presentAlert("error en crear BD: "+e));

  })
}

/*crearBD(){
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
}*/
//Fin Base de datos

//Tablas
  /*async crearTablas() {
    const tablas = [
      { tabla: this.tblRol, registro: this.registroRol },
      { tabla: this.tblPregunta, registro: this.registroPregunta },
      { tabla: this.tblLogro, registro: this.registroLogro },
      { tabla: this.tblNiveles, registro: this.registroNiveles },
      { tabla: this.tblIntento, registro: this.registroIntento },
      { tabla: this.tblUsuario, registro: this.registroUsuario },
    ];
  
    for (const { tabla, registro } of tablas) {
      try {
        console.log('Creando tabla: ' + tabla);
        await this.database.executeSql(tabla, []);
        console.log('Tabla creada: ' + tabla); 
        this.presentAlert('Tabla creada: ' + tabla); 
        this.isBDReady.next(true);
  
        console.log('Insertando registros en tabla: ' + tabla);
        await this.database.executeSql(registro, []);
        console.log('Registros insertados en tabla: ' + tabla); 
        this.presentAlert('Registros insertados en tabla: ' + tabla); // 
      } catch (error) {
        console.error('Error al crear tabla ' + tabla + ': ' + error); // 
        this.presentAlert('Error al crear tabla ' + tabla + ': ' + error); 
      }
    }
  }*/
  
async crearTablaRol(){
  try{
    //ejecutar la creación de tablas
    await this.database.executeSql(this.tblRol,[]);


    //ejecuto los insert
    await this.database.executeSql(this.registroRol,[]);
    await this.database.executeSql(this.registroRol2,[]);

    //cambio mi observable de BD
    this.isBDReady.next(true);
    this.buscarRol();

  }catch(e){
    this.presentAlert("Error en crearTablaRol: " + e);
  }

}

async crearTablaPregunta(){
  try{
    //ejecutar la creación de tablas
    await this.database.executeSql(this.tblPregunta,[]);


    //ejecuto los insert
    await this.database.executeSql(this.registroPregunta,[]);
    await this.database.executeSql(this.registroPregunta2,[]);
    await this.database.executeSql(this.registroPregunta3,[]);

    //cambio mi observable de BD
    this.isBDReady.next(true);
    this.buscarPregunta();

  }catch(e){
    this.presentAlert("Error en crearTablaPregunta: " + e);
  }

}

async crearTablaLogro(){
  try{
    //ejecutar la creación de tablas
    await this.database.executeSql(this.tblLogro,[]);


    //ejecuto los insert
    await this.database.executeSql(this.registroLogro1,[]);
    await this.database.executeSql(this.registroLogro2,[]);
    await this.database.executeSql(this.registroLogro3,[]);
    await this.database.executeSql(this.registroLogro4,[]);

    //cambio mi observable de BD
    this.isBDReady.next(true);
    this.buscarLogro();

  }catch(e){
    this.presentAlert("Error en crearTablaLogro: " + e);
  }

}

async crearTablaNiveles(){
  try{
    //ejecutar la creación de tablas
    await this.database.executeSql(this.tblNiveles,[]);


    //ejecuto los insert
    await this.database.executeSql(this.registroNiveles,[]);
    await this.database.executeSql(this.registroNiveles2,[]);
    await this.database.executeSql(this.registroNiveles3,[]);

    //cambio mi observable de BD
    this.isBDReady.next(true);
    this.buscarNiveles();

  }catch(e){
    this.presentAlert("Error en crearTablaNiveles: " + e);
  }

}

async crearTablaIntento(){
  try{
    //ejecutar la creación de tablas
     //this.database.executeSql("DROP TABLE intento",[]);
    await this.database.executeSql(this.tblIntento,[]);


    //ejecuto los insert
   

    //cambio mi observable de BD
    this.isBDReady.next(true);
    this.buscarIntento();

  }catch(e){
    this.presentAlert("Error en crearTablaIntento: " + e);
  }

}

async crearTablaUsuario(){
  try{
    //this.database.executeSql("DROP TABLE usuario",[]);
    //ejecutar la creación de tablas
    await this.database.executeSql(this.tblUsuario,[]);
    


    //ejecuto los insert
    await this.database.executeSql(this.registroUsuario,[]);
    await this.database.executeSql(this.registroUsuario2,[]);

    //cambio mi observable de BD
    this.isBDReady.next(true);
    this.buscarUsuario();

  }catch(e){
    this.presentAlert("Error en crearTablaUsuario: " + e);
  }

}

async crearTablaInter(){
  try{
    //this.database.executeSql("DROP TABLE usuario",[]);
    //ejecutar la creación de tablas
    await this.database.executeSql(this.tblInter,[]);
    
    
    


    //ejecuto los insert
    //await this.database.executeSql(this.registrointer,[]);
    //await this.database.executeSql(this.registrointer1,[]);
    //await this.database.executeSql(this.registrointer2,[]);
   
    //cambio mi observable de BD
    this.isBDReady.next(true);
    this.buscarInter();

  }catch(e){
    this.presentAlert("Error en crearTablaInter: " + e);
  }

}
//Fin Tablas
  







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



