import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  msgError:string =""
  isloading :boolean = false;

  registerForm:FormGroup = this._FormBuilder.group ({
    name: [null, [Validators.required , Validators.maxLength(20)]],
    email: [null, [Validators.required , Validators.email] ],
    password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, {validators:this.confirmPassword})
  

  registerSubmit():void {
    if(this.registerForm.valid){
      this.isloading = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message == 'success'){
            this._Router.navigate(['/login' ])
          }
          this.isloading = false;
        },
        error:(err)=>{
          this.msgError = err.error.message
          console.log(err)
          this.isloading = false;
        }
      })
    }
    else {
      this.registerForm.markAllAsTouched()
    }
  }

  //custom validation for repassword
  confirmPassword( g:AbstractControl ){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null
    }else {
      return {mismatch:true}
    }
  }
}  
