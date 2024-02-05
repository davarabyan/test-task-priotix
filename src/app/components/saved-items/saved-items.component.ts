import { Component } from '@angular/core';
import { Icat } from 'src/app/interfaces/Icat.interface';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss']
})
export class SavedItemsComponent {

  savedItems = JSON.parse(localStorage.getItem("savedCats") || "[]") as Icat[]
  saveItem(breed: Icat) {
    if (!this.savedItems.find(x => x.name === breed.name)) {
      this.savedItems.push(breed)
    } else {
      if (!confirm(`Delete ${breed.name} from saved list ? `)) { return }
      let i = this.savedItems.findIndex(x => x.name === breed.name)
      this.savedItems.splice(i, 1);;
    }
    localStorage.setItem('savedCats', JSON.stringify(this.savedItems))

  }
}
