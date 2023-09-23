import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  email:string="";
  name:string="";
  surname:string="";
  password:string="";
  repeat_password:string="";

  constructor(
    public authServices: AuthService,
    public router: Router,
  ){}

  ngOnInit(): void {
    if(this.authServices.user){
      this.router.navigate(["/"]);
    }
  }

  registro(){
    if(!this.email || 
      !this.name || 
      !this.surname || 
      !this.password || 
      !this.repeat_password
    ){
      alert("Todos los campos son requeridos");
    }

    if(this.password != this.repeat_password){
      alert("Las contraseñas deben ser iguales");
    }
    let data = {
      email : this.email,
      name : this.name,
      surname : this.surname,
      password : this.password,
      rol: 'cliente',
    };
    this.authServices.register(data).subscribe((resp:any) =>{
      console.log(resp);
    });
  }

}
