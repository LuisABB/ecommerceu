import { Component, OnInit } from '@angular/core';
import { ShopService } from './_services/shop.service';

declare var $: any;
declare function HOMEINITTEMPLATE([]): any;
declare function ModalProductDetail():any;


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  categories: any = [];
  our_products: any = [];
  product_selected: any = null;
  currentPage = 1; // Página actual
  itemsPerPage = 12;
  selectedCategory: string = '';
  product_selected_modal:any=[];

  constructor(
    public shopService: ShopService,
  ) { }

  ngOnInit(): void {

    this.shopService.listShop().subscribe((resp: any) => {
      
      this.categories = resp.categorie;
      this.our_products = resp.our_products;
      console.log(this.selectedCategory);
      console.log(resp);
      console.log(resp.our_products.categorie);
      setTimeout(() => {
        HOMEINITTEMPLATE($);
      }, 50);
    });


  }

  chunkArray(arr: any[], chunkSize: number): any[] {
    const groups = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    console.log("GROUP")
    console.log(groups)
    return groups;
  }


  OpenModal(bestProd: any) {
    this.product_selected_modal = null;

    setTimeout(()=>{
      this.product_selected_modal = bestProd;
      setTimeout(() => {
        ModalProductDetail();
        
      }, 50);
    },100);

  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
  }
  

}
