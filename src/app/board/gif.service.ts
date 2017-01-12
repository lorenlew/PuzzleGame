import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import GiphyData = Giphy.Data;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GifService {
  private giphyUrl = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=funny+cats";

  constructor(private http: Http) { }
  generateRandomGif(): Observable<string> {
    return this.http.get(this.giphyUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): string {
    let data: GiphyData = res.json().data;
    return data.fixed_height_downsampled_url;
  }
  private handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
