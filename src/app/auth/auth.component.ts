import { Subscription } from 'rxjs/Subscription';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  @ViewChild(PlaceholderDirective,{static:true}) alertHost: PlaceholderDirective
  isLoginMode = true;
  isLoading = false;
  error:string = null;
  private closeSub:Subscription;
  constructor(private authService:AuthService, private router:Router, private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit() {
  }

  onSwitchMode(){
    const test = 'ak';
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs:Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email,password)
    }else{
      authObs = this.authService.signup(email,password)
    }
    authObs.subscribe(resData=>{
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['./recipes'])
    },
      errorMessage=>{
        console.log(errorMessage);
        this.error = errorMessage
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      }
    );

    form.reset();
  }

  onHandleError(){
    this.error = null
  }

  private showErrorAlert(errorMessage:string){
    const alertCmpFactory=  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef =  hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = errorMessage;
    this.closeSub =  componentRef.instance.close.subscribe( ()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(){
    if(this.closeSub) this.closeSub.unsubscribe();
  }

}
