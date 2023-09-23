import { Component, OnInit } from '@angular/core';
import { HomeService } from './_services/home.service';

declare var $:any;
declare function HOMEINITTEMPLATE([]):any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  sliders:any = [];
  categories:any = [];

  constructor(
    public homeService: HomeService,
  ) { }
  ngOnInit(): void{

    this.homeService.listHome().subscribe((resp:any)=>{
      console.log(resp);
      this.sliders = resp.sliders;
      this.categories = resp.categories;
      setTimeout(()=>{
        HOMEINITTEMPLATE($);
      },50);
    });

    
  }

}
