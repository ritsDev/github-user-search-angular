import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auto-complete',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent implements OnInit {
  searchControl = new FormControl('');
  users: any[] = [];
  isLoading = false;

  constructor(private _searchService: SearchService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query) {
            this.users = [];
            return [];
          }
          this.isLoading = true;
          return this._searchService.search(query);
        })
      )
      .subscribe({
        next: (result) => {
          this.isLoading = false;
          this.users = result;
        },
        error: () => {
          this.isLoading = false;
          this.users = [];
        },
      });
  }
}
