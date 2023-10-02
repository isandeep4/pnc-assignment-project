import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { RegistrationAuthGuardGuard } from './auth/registration-auth-guard.guard';

const routes: Routes = [
  {path: '', component: RegisterComponent, canActivate: [RegistrationAuthGuardGuard] },
  {path:'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
