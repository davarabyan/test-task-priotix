import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SavedItemsComponent } from './components/saved-items/saved-items.component';

const routes: Routes = [
  { path: '', component: MainComponent, title: 'Search for Cat breed' },
  { path: "saveditems", component: SavedItemsComponent, title: 'Saved Cats breeds' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }