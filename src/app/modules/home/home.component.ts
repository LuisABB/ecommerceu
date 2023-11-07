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
  marks: any = [];
  // marks = [
  //   ['https://www.sprintcopy.com/wp-content/uploads/2020/06/logo-coca-cola-600x208.png', 'https://www.sprintcopy.com/wp-content/uploads/2020/06/logo-coca-cola-600x208.png', 'https://www.sprintcopy.com/wp-content/uploads/2020/06/logo-coca-cola-600x208.png'],
  //   ['https://www.sprintcopy.com/wp-content/uploads/2020/06/logo-coca-cola-600x208.png', 'https://www.sprintcopy.com/wp-content/uploads/2020/06/logo-coca-cola-600x208.png', 'https://www.sprintcopy.com/wp-content/uploads/2020/06/logo-coca-cola-600x208.png'],
  // ];


  constructor(
    public homeService: HomeService,
  ) { }
  ngOnInit(): void {

    this.homeService.listHome().subscribe((resp: any) => {
      this.sliders = resp.sliders;
      this.categories = resp.categorie;
      this.bestProducts = resp.best_products;
      this.our_products = resp.our_products;
      this.marks = this.chunkArray(resp.marks, 4);
      console.log(resp);
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
