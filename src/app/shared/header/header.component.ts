import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/modules/ecommerce-guest/_services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  listCarts:any = [];
  constructor(
    public router: Router,
    public cartService: CartService,
  ){}

  ngOnInit(): void {
    this.cartService.currenDAtaCarts$.subscribe((resp:any)=>{
      console.log(resp);
      this.listCarts = resp;
    })
    
    if(this.cartService._authService.user){
      this.cartService.listCarts(this.cartService._authService.user._id).subscribe((resp:any)=>{
        console.log("RESP");
        console.log(resp);
        this.listCarts = resp.carts;
      });
    }
  }

}
