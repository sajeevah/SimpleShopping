import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/@core/auth/auth.guards';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: 'seller',
        loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'buyer',
        loadChildren: () => import('./buyer/buyer.module').then(m => m.BuyerModule),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes),
    ],
})
export class AppRoutingModule {}