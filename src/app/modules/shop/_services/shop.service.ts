import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    public http: HttpClient,
  ) { }

  listShop(){
    let URL = URL_SERVICES+"/shop/list";

    return this.http.get(URL);
  }
}
