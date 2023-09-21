import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./pages/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'lobby',
    loadChildren: () => import('./pages/lobby/lobby.module').then( m => m.LobbyPageModule)
  },
  
  {
    path: 'logros',
    loadChildren: () => import('./pages/logros/logros.module').then( m => m.LogrosPageModule)
  },
  {
    path: 'skins',
    loadChildren: () => import('./pages/skins/skins.module').then( m => m.SkinsPageModule)
  },
  {
    path: 'tiempo-carga',
    loadChildren: () => import('./pages/tiempo-carga/tiempo-carga.module').then( m => m.TiempoCargaPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./pages/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule)
  },
  {
    path: 'niveles',
    loadChildren: () => import('./pages/niveles/niveles.module').then( m => m.NivelesPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'olvidaste-c',
    loadChildren: () => import('./pages/olvidaste-c/olvidaste-c.module').then( m => m.OlvidasteCPageModule)
  },
  {
    path: 'creadores-juego',
    loadChildren: () => import('./pages/creadores-juego/creadores-juego.module').then( m => m.CreadoresJuegoPageModule)
  },
  {
    path: 'admin-usuarios',
    loadChildren: () => import('./pages/admin-usuarios/admin-usuarios.module').then( m => m.AdminUsuariosPageModule)
  },
  {
    path: 'admin-logros',
    loadChildren: () => import('./pages/admin-logros/admin-logros.module').then( m => m.AdminLogrosPageModule)
  },
  {
    path: 'admin-skins',
    loadChildren: () => import('./pages/admin-skins/admin-skins.module').then( m => m.AdminSkinsPageModule)
  },
  {
    path: 'usuario-normal',
    loadChildren: () => import('./pages/usuario-normal/usuario-normal.module').then( m => m.UsuarioNormalPageModule)
  },
  {
    path: 'modificar-contra',
    loadChildren: () => import('./pages/modificar-contra/modificar-contra.module').then( m => m.ModificarContraPageModule)
  },
  {
    path: 'nivel-medio',
    loadChildren: () => import('./pages/nivel-medio/nivel-medio.module').then( m => m.NivelMedioPageModule)
  },
  {
    path: 'nivel-dificil',
    loadChildren: () => import('./pages/nivel-dificil/nivel-dificil.module').then( m => m.NivelDificilPageModule)
  },
  
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
 {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
