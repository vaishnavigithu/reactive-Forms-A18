import { Routes } from '@angular/router';
import { ReactiveFormValidatorsComponent } from './Modules/reactive-form-validators/reactive-form-validators.component';

export const routes: Routes = [
    { path : '', redirectTo : 'auth/signUp', pathMatch : 'full'},
    { path: 'auth',
        loadChildren : () => import('./auth/auth.module').then(m=> m.AuthModule)
    }
];
