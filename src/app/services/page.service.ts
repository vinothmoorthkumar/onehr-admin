import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient , HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  get(slug) {
    return this.http.get<any>(`/api/page/${slug}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getMedia(slug) {
    return this.http.get<any>(`/api/site/media/${slug}`)
      .pipe(map(data => {
        return data;
      }));
  }

  // getExtra(slug) {
  //   return this.http.get<any>(`/api/page/extras/${slug}`)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }

  updateExtra(slug,data) {
    return this.http.put<any>(`/api/page/extras/${slug}`,data)
      .pipe(map(data => {
        return data;
      }));
  }

  update(slug,data) {
    return this.http.put<any>(`/api/page/${slug}`,data)
      .pipe(map(data => {
        return data;
      }));
  }
  
}
