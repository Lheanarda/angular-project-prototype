import { RecipeResolverService } from './recipe-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuardService } from './../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

const routes:Routes=[
  { path: '', component: RecipesComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
    { path: ':id/edit', component: RecipeEditComponent,resolve: [RecipeResolverService] },
  ] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class RecipesRoutingModule{}
