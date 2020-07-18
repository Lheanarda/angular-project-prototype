import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping-list/shopping.module';
import { RecipesModule } from './recipes/recipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      RecipesModule,
      ShoppingModule,
      SharedModule,
      CoreModule,
      AuthModule
   ],
   bootstrap: [
      AppComponent
   ],
})
export class AppModule { }
