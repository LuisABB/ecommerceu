import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { URL_SERVICES } from 'src/app/config/config';
import { AuthService } from '../../auth-profile/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = new BehaviorSubject<Array<any>>([]);
  public currenDAtaCarts$ = this.cart.asObservable();
  constructor(
    public _authService: AuthService,
    public https: HttpClient,
  ) { }

  changeCart(DATACART:any){
    let listCart = this.cart.getValue();
    let INDEX = listCart.findIndex((item:any)=> item._id == DATACART._id);
    if(INDEX != -1){
      listCart[INDEX] = DATACART;
    }else{
      listCart.unshift(DATACART);
    }
    this.cart.next(listCart);
  }

  resetCart(){
    let listCart:any = [];
    this.cart.next(listCart);
  }
  removeItemCart(DATACART:any){
    let listCart = this.cart.getValue();
    let INDEX = listCart.findIndex((item:any)=> item._id == DATACART._id);
    if(INDEX != -1){
      listCart.splice(INDEX,1);
    }
    this.cart.next(listCart);
  }

  registerCart(data:any){
    let headers = new HttpHeaders({'token': this._authService.token});
    let URL = URL_SERVICES+"cart/register";
    return this.https.post(URL,data,{headers:headers});
  }

  listCarts(user_id:any){
    let headers = new HttpHeaders({'token': this._authService.token});
    let URL = URL_SERVICES+"cart/list?user_id="+user_id;
    return this.https.get(URL,{headers:headers});
  }
}
