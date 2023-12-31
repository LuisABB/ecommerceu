import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren:() => import("./modules/home/home.module").then(m => m.HomeModule),
  },
  {
    path:'',
    loadChildren:() => import("./modules/shop/shop.module").then(m => m.ShopModule),
  },
  {
    path:'',
    loadChildren:() => import("./modules/ecommerce-guest/ecommerce-guest.module").then(m => m.EcommerceGuestModule),
  },
  {
    path:'auth',
    loadChildren:() => import("./modules/auth-profile/auth-profile.module").then(m => m.AuthProfileModule),
  },
  {
    path: '',
    redirectTo:'/',
    pathMatch:'full',
  }
]
@NgModule({
  //declarations:[],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule,
  ]
})
export class AppRoutingModule { }
