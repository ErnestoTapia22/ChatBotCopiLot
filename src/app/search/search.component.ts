import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, ChatComponent],
  styleUrl: './search.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchComponent {
  query: FormControl = new FormControl('');
  results: any;
  constructor(private http: HttpClient) { }
  search() {
    this.http.get(`/api/search?query=${this.query.value}&room=currentRoomId`).subscribe(
      {
        next: (data: any) => {
          this.results = data;
        },
        error: (error) => {
          console.error('Error searching:', error);
        }
      }
    );
  }

}
