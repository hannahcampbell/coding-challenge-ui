import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login";

const routes: Routes = [
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'chat', component: ChatComponent}
];
@NgModule({ 
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [RouterModule] 
}) 
export class AppRoutingModule { }