import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.baseUrl}?q=${query}`)
      .pipe(map((result: any) => result.items || []));
  }
}
