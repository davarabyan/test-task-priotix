import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap, EMPTY } from 'rxjs';
import { ApiService } from 'src/app/services/main.service';
import { Icat } from '../../interfaces/Icat.interface'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private apiService: ApiService, private matSnackBar: MatSnackBar) { }
  private searchText$ = new Subject<string>();
  iunputText = ''
  breeds: Icat[] = []
  savedItems = JSON.parse(localStorage.getItem("savedCats") || "[]") as Icat[]
  loader = false
  ngOnInit(): void {
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(breedsName =>
        this.apiService.getbreeds(breedsName))

    ).subscribe(res => {
      this.breeds = res.slice(0, 10)
      this.loader = false

    })
  }

  mainSearch(breed: string) {
    this.iunputText = breed
    if (breed) {
      this.loader = true
      this.searchText$.next(breed);
    } else {
      this.breeds = []
    }
  }

  saveItem(breed: Icat) {
    this.breeds = []
    this.iunputText = ''
    this.savedItems.push(breed)
    this.openSnackBar()
    localStorage.setItem('savedCats', JSON.stringify(this.savedItems))
  }

  openSnackBar() {
    this.matSnackBar.openFromComponent(SnackComponent, {
      duration: 1500,
    });
  }
}

@Component({
  selector: 'snack-bar-component',
  template: 'Saved!',
  styles: [``],
})
export class SnackComponent { }
