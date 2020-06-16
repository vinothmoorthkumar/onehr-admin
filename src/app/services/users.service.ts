import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {

  }

  create(data) {
    return this.http.post<any>(`/api/user`, data)
      .pipe(map(data => {
        return data;
      }));
  }

  get(page) {
    let params = new HttpParams();
    params = params.append('skip', page.skip);
    params = params.append('limit', page.perPage);
    params = params.append('sortby', page.sort.col);
    params = params.append('order', page.sort.order);
    if (page.search != "") {
      params = params.append('search', page.search);
    }
    return this.http.get<any>(`/api/user`, { params: params })
      .pipe(map(data => {
        return data;
      }));
  }

  getRoles() {
    return this.http.get<any>(`/api/role`)
      .pipe(map(data => {
        return data;
      }));
  }

  getByid(id) {
    return this.http.get<any>(`/api/user/${id}`)
      .pipe(map(data => {
        return data;
      }));
  }

  update(id, data) {
    return this.http.put<any>(`/api/user/${id}`, data)
      .pipe(map(data => {
        return data;
      }));
  }

  delete(id) {
    return this.http.delete<any>(`/api/user/${id}`)
      .pipe(map(data => {
        return data;
      }));
  }

 

}
