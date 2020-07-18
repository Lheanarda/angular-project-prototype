import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub:Subscription;

  constructor(private dataStorageService:DataStorageService, private authService:AuthService){}

  ngOnInit(){
    this.userSub=  this.authService.user.subscribe(user=>{
      this.isAuthenticated = !user ? false : true
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onLogout(){
    this.authService.logout();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
