import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  
  isloading :boolean = false;
  msgError:string =""
  msgSuccess:string =""
  step:number = 1;
  
  verfiyEmail:FormGroup = this._FormBuilder.group ({
    email: [null, [Validators.required , Validators.email] ],
  })

  verfiyCode:FormGroup = this._FormBuilder.group ({
    resetCode: [null, [Validators.required , Validators.pattern(/^[0-9]{6}$/)] ],
  })

  resetPassword:FormGroup = this._FormBuilder.group ({
    email: [null, [Validators.required , Validators.email] ],
    newPassword: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
  })

  verfiyEmailSubmit():void {
    this.isloading = true;
    let emailValue = this.verfiyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)

    this._AuthService.setEmailVerfiy(this.verfiyEmail.value).subscribe({
      next:(res)=>{
        if(res.statusMsg == "success"){
          this.step = 2;
          this.msgSuccess = res.message
        }
        // console.log(res);
      },
      error:(err)=>{
        this.msgError = err.error.message
        this.isloading = false;

        console.log(err);
      }
    })
  }

  verfiyCodeSubmit():void {
    this._AuthService.setCodeVerfiy(this.verfiyCode.value).subscribe({
      next:(res)=>{
        if(res.status == "Success"){
          this.step = 3;
        }
        // console.log(res);
      },
      error:(err)=>{
        this.msgError = err.error.message
        console.log(err);
      }
    })
  }

  resetPasswordSubmit():void {
    this.isloading = true;
    this._AuthService.setRestPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        localStorage.setItem('userToken' , res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home' ])
        // console.log(res);
      },
      error:(err)=>{
        this.msgError = err.error.message
        console.log(err);
      }
    })
  }
}
