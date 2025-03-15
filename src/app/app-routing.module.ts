import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { Navigation } from './enums/navigation.enum';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: Navigation.LOGIN, pathMatch: 'full' },
  { path: Navigation.LOGIN, component: LoginComponent },
  {
    path: Navigation.USER_FORM,
    component: UserFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Navigation.USER_DETAILS,
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: Navigation.LOGIN },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
