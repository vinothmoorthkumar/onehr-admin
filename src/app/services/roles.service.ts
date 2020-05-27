import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient , HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  create(data) {
    return this.http.post<any>(`/api/role`, data)
      .pipe(map(data => {
        return data;
      }));
  }

  get(page) {
    console.log('page',page)
    let params = new HttpParams();
    params = params.append('skip', page.skip);
    params = params.append('limit', page.perPage);
    return this.http.get<any>(`/api/role`, {params: params})
      .pipe(map(data => {
        return data;
      }));
  }

  getByid(id) {
    return this.http.get<any>(`/api/role/${id}`)
      .pipe(map(data => {
        return data;
      }));
  }

  update(id,data) {
    return this.http.put<any>(`/api/role/${id}`,data)
      .pipe(map(data => {
        return data;
      }));
  }

  delete(id) {
    return this.http.delete<any>(`/api/role/${id}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
