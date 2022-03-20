import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: 'seller',
        loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)
    },
    { path: 'counter', component: CounterComponent },
    // { path: 'fetch-data', component: FetchDataComponent },
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes),
    ],
})
export class AppRoutingModule {}