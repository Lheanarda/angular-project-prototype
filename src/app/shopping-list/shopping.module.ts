import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from "@angular/core";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports:[RouterModule.forChild([
    { path: '', component: ShoppingListComponent },
  ]
  ),SharedModule,FormsModule]
})
export class ShoppingModule{}
