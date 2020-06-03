import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  create(data) {
    var formData: any = new FormData();
    console.log
    for(let i =0; i < data.files.length; i++){
      formData.append("files", data.files[i]);
    }
    formData.append("name", data.name);
    formData.append("page", data.page);
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
}
