import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbservicioService {
  
  constructor() { 

  }

  crearBD(){
    this.platform.ready().then(()=> {
      this.sqlite.create({
        name: 'noticias.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD creada");
        //llamo a crear la(s) tabla(s)
        this.crearTablas();
      }).catch((e: any) => this.presentToast(e));

    })
  }
  
  public database: SQLiteObject | undefined;

  tblUsuario:String="CREATE TABLE IF NO EXISTS usuario(idU INTEGER PRIMARY KEY autoincrement,"+
  "respuesta VARCHAR(50), nombreU VARCHAR(30), contrasena VARCHAR(12),"+ 
  "correo VARCHAR(50), descripcion VARCHAR(100), niveles NUMBER(2), foto FILES, monedas NUMBER(5), pregunta FOREIGN KEY,  logros FOREIGN KEY, skins FOREIGN KEY, rol FOREIGN KEY)";

  tblPregunta:String="CREATE TABLE IF NO EXISTS pregunta(idP INTEGER PRIMARY KEY autoincrement, nombreP VARCHAR(30))";

  tblRol:String="CREATE TABLE IF NO EXISTS rol(idR INTEGER PRIMARY KEY autoincrement, nombreR VARCHAR(15))";

  tblLogro:String="CREATE TABLE IF NO EXISTS logro(idL INTEGER PRIMARY KEY autoincrement, nombreL VARCHAR(30), descripcion VARCHAR(100), recompensa NUMBER(5))";

  tblSkins:String="CREATE TABLE IF NO EXISTS skins(idS INTEGER PRIMARY KEY autoincrement, nombreS VARCHAR(30), foto FILES, precio NUMBER(5))";

  async crearTablas(){
    try{
      await this.database?.executeSql(this.tblPregunta,[]);
      this.presentToast("Tabla creada")
      this.cargarPregunta();
      this.isDbReady.next(true);
    }catch (error){
      this.presentToast("Error en Crear Tabla:"+error);
    }
  }

  addPregunta(nombreP){
    let data=[nombreP];
    return this.database?.executeSql('INSERT INTO pregunta(nombreP) VALUES(?)',data)
    .then(()=>{
      this.cargarPregunta();
    })
  }

  updatePregunta(idP,nombreP){
    let data=[nombreP,idP];
    return this.database?.executeSql('UPDATE pregunta SET nombreP=? WHERE idP=?',data)
    .then(()=>{
      this.cargarPregunta();
    })
  }

  deletePregunta(idP){
    return this.database?.executeSql('DELETE FROM pregunta WHERE id=?'.[id])
    .then(()=>{
      this.cargarPregunta();
    })
  }

  cargarPregunta(){
    return this.database?.executeSql('SELECT * FROM pregunta',[])
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


}
