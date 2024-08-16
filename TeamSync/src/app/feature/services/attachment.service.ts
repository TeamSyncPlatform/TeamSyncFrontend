import { Injectable } from '@angular/core';
import {environment} from "../../core/env/env";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "../models/post/post.model";
import {Attachment} from "../models/attachment/attachment-dto.model";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient) {}

  uploadAttachment(file: File, postId: number): Observable<Attachment> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('postId', postId.toString());

    return this.http.post<Attachment>(environment.apiHost + 'attachments/upload', formData);
  }

  downloadAttachment(filePath: string): Observable<Blob> {
    const requestBody = { path: filePath };

    return this.http.put(environment.apiHost + 'attachments/download', requestBody, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/octet-stream'
      })
    });
  }
}
