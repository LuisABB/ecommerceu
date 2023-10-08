import { Component, OnInit } from '@angular/core';
import { HomeService } from './_services/home.service';

declare var $: any;
declare function HOMEINITTEMPLATE([]): any;
declare function ModalProductDetail():any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliders: any = [];
  categories: any = [];
  bestProducts: any = [];
  our_products: any = [];
  product_selected: any = null;

  constructor(
    public homeService: HomeService,
  ) { }
  ngOnInit(): void {

    this.homeService.listHome().subscribe((resp: any) => {
      this.sliders = resp.sliders;
      this.categories = resp.categorie;
      this.bestProducts = resp.best_products;
      this.our_products = resp.our_products;
      setTimeout(() => {
        HOMEINITTEMPLATE($);
      }, 50);
    });


  }

  OpenModal(bestProd: any) {
    this.product_selected = null;

    setTimeout(()=>{
      this.product_selected = bestProd;
      setTimeout(() => {
        ModalProductDetail();
      }, 50);
    },100);

  }

  showImagen(our_product:any){
    var imagen = "";
    
    return imagen;
  }

}
