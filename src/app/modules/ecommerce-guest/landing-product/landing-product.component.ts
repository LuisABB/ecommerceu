import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceGuestModule } from '../ecommerce-guest.module';
import { CartService } from '../_services/cart.service';
import { EcommerceGuestService } from '../_services/ecommerce-guest.service';

declare var $: any;
declare function LandingProductDetail():any;
declare function ModalProductDetail():any;

@Component({
  selector: 'app-landing-product',
  templateUrl: './landing-product.component.html',
  styleUrls: ['./landing-product.component.css']
})
export class LandingProductComponent {

  slug:any=null;
  product_selected:any=null;
  related_products:any=[];
  product_selected_modal:any=[];
  variedad_selected:any=[];
  constructor(
    public ecommerce_guest: EcommerceGuestService,
    public router:Router,
    public routerActived: ActivatedRoute,
    public cartService: CartService,
  ){}

  ngOnInit(){
    this.routerActived.params.subscribe((resp:any)=>{
      this.slug = resp["slug"];
    })
    console.log(this.slug);
    this.ecommerce_guest.showLandingProduct(this.slug).subscribe((resp:any)=>{
      console.log(resp);
      this.product_selected = resp.product;
      this.related_products = resp.related_products;
      setTimeout(()=>{
        LandingProductDetail();
      },50);
    })
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

  selectedVariedad(variedad:any){
    this.variedad_selected = variedad;
  }

  addCart(product:any){
    if(!this.cartService._authService.user){
      alert("NECESITAS AUTENTICARTE PARA PODER AGREGAR EL PRODUCTO AL CARRITO");
      return;
    }
    if($("#qty-cart").val() == 0){
      alert("NECESITAS AGREGAR UNA CANTIDAD MAYOR A 0 PARA EL CARRITO");
      return;
    }

    if(this.product_selected.type_inventario == 2){
      console.log(this.variedad_selected);  
      console.log(product);
      console.log(this.variedad_selected.length)
      if(this.variedad_selected.length === 0){
        alert("NECESITAS SELECCIONAR UNA VARIEDAD PARA EL PRODUCTO");
      return;
      }

      if(this.variedad_selected){
        console.log("VALUA")
        console.log(this.variedad_selected.stock + "<"+$("#qty-cart").val());
        if(this.variedad_selected.stock < $("#qty-cart").val()){
          alert("NECESITAS SELECCIONAR UNA CANTIDAD MENOR PARA EL PRODUCTO");
        return;
        }
      }
    }

    let data = {
      user: this.cartService._authService.user._id,
      product: this.product_selected._id,
      type_discount: null,
      discount:0,
      cantidad: $("#qty-cart").val(),
      variedad: this.variedad_selected ? this.variedad_selected._id: null,
      code_cupon:null,
      code_discount:null,
      price_unitario:this.product_selected.price_mxn,
      subtotal: this.product_selected.price_mxn*$("#qty-cart").val(),
      total:this.product_selected.price_mxn*$("#qty-cart").val(),
    }
    this.cartService.registerCart(data).subscribe((resp:any)=>{
      if(resp.message == 403){
        alert(resp.message_text);
        return;
      }else{
        this.cartService.changeCart(resp.cart);
      }
    },error=>{
      console.log(error);
      if(error.error.message == "EL TOKEN NO ES VALIDO"){
        this.cartService._authService.logOut();
      }
    })
  }

}
