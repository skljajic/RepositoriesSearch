import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from '../../Search'
import { NgxPaginationModule } from 'ngx-pagination'; 
import { NgForm } from '@angular/forms';

const GITHUB_URL = 'https://api.github.com/search/repositories';

@Component({
  selector: 'app-github-repositories',
  templateUrl: './github-repositories.component.html',
  styleUrls: ['./github-repositories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubRepositoriesComponent {
  searchResult$: Observable<Search>;
  txtQuery: string;
  FavList: string[] = [];
  favName: string; //artIdd
  frm: NgForm;

  constructor(private http: HttpClient) {
  }

 

  addFavorite() {  //run when button add to favorites clicked
    this.FavList.push(this.txtQuery);
  }


  runFav(fav) { //run searching on clicked favorite item
    this.frm.value.favNameItem = fav;
    this.onSubmit(this.frm);
    this.frm.controls["favNameItem"].setValue(fav);
  }


  removeFavorite(erojcina, f: NgForm) {  //remove item when clicked on x on favitem's right side
    let ind = this.FavList.findIndex(dat => dat == erojcina);
    this.FavList.splice(ind, 1);
  }

 

  private fetchRepositories(query: string): Observable<Search> { //getting results from gitHub API
    const params = { q: query };
    return this.http.get<Search>(GITHUB_URL, { params });
  }


  onSubmit(f: NgForm) {  //when Search button is clicked 
    this.favName = f.value.favNameItem;
    this.searchResult$ = this.fetchRepositories(this.favName);
    this.txtQuery = f.value.favNameItem;
    this.frm = f;
 }


}
