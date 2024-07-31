import { Component} from '@angular/core';
import { RouterOutlet,Router, NavigationStart } from '@angular/router';
import { ReactiveFormValidatorsComponent } from './Modules/reactive-form-validators/reactive-form-validators.component';
import { Subscription } from 'rxjs';
export let browserRefresh = false;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormValidatorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactive-Forms-A18';
  subscription : Subscription
  constructor(private router :Router){
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  });
  }
}
