import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)


  msgError:string =""
  isloading :boolean = false;

  loginForm:FormGroup = this._FormBuilder.group ({
    email: [null, [Validators.required , Validators.email] ],
    password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
  })
  

  loginSubmit():void {
    if(this.loginForm.valid){
      this.isloading = true;
      this._AuthService.setloginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          // console.log(res);
          if(res.message == 'success'){
            localStorage.setItem('userToken' , res.token)
            this._AuthService.saveUserData()
            this._Router.navigate(['/home' ])
          }
          this.isloading = false;
        },error:(err)=>{
          this.msgError = err.error.message
          console.log(err)
          this.isloading = false;
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }
  
}
