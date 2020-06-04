import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  get(page) {
    let params = new HttpParams();
    params = params.append('skip', page.skip);
    params = params.append('limit', page.perPage);
    params = params.append('sortby', page.sort.col);
    params = params.append('order', page.sort.order);
    if(page.search != ""){
      params = params.append('search', page.search);
    }

    return this.http.get<any>(`/api/media`, {params: params})
      .pipe(map(data => {
        return data;
      }));
  }

  create(data, fileSize) {
    var formData: any = new FormData();
    for(let i =0; i < data.files.length; i++){
      formData.append("files", data.files[i]);
    }
    formData.append("name", data.name);
    formData.append("page", data.page);
    formData.append("fileSize", fileSize);
    formData.append("section", data.section);
    if(data.link){
      formData.append("link", data.link);
    }
    return this.http.post<any>(`/api/media`, formData, {
      reportProgress: true, observe: 'events'
    })
      .pipe(map(data => {
        return data;
      }));
  }

  delete(id) {
    return this.http.delete<any>(`/api/media/${id}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getByid(id) {
    return this.http.get<any>(`/api/media/${id}`)
      .pipe(map(data => {
        return data;
      }));
  }

  update(id,data) {
    var formData: any = new FormData();
    if(data.files && data.files.length>0){
      for(let i =0; i < data.files.length; i++){
        formData.append("files", data.files[i]);
      }
    }
    formData.append("name", data.name);
    formData.append("page", data.page);
    formData.append("section", data.section);
    if(data.link){
      formData.append("link", data.link);
    }
    // , {
    //   reportProgress: true, observe: 'events'
    // }
    return this.http.post<any>(`/api/media/update/${id}`, formData, { observe: 'events', reportProgress: true})
      .pipe(map(data => {
        return data;
      }));
  }
}
