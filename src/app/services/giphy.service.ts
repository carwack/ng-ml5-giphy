import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGiphy } from '../interfaces/igiphy';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {

  constructor(private http: HttpClient) { }

  fetchGiphy(ml5result): Observable<IGiphy> {
      // tslint:disable-next-line: max-line-length
    const giphyUrl = 'https://api.giphy.com/v1/gifs/search?api_key=gnHx8iIxLiE3MLUDnVWJ6pcWDlI8LGqL&limit=1&q=' + ml5result + '&limit=1' + '&offset=' + Math.floor(Math.random() * 100 + 1);

    return this.http.get(giphyUrl)
        .pipe(
          map((res: any) => {
            return {
              title: res.data[0].title,
              gifUrl: res.data[0].images.original.url,
              giphyUrl: res.data[0].url
            };
          })
        );
  }

}
