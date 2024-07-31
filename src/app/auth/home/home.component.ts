import { Component } from '@angular/core';
import { browserRefresh } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router){}
  ngOnInit(){
    if (browserRefresh) {
      localStorage.setItem('email', "");
      this.router.navigate(['/auth/signUp']);
    }
  }

}
