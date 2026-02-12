import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/offers', pathMatch: 'full' },
  { path: 'offers', loadChildren: () => import('./offers/offers.module').then(m => m.OffersModule) },
  { path: 'policies', loadChildren: () => import('./policies/policies.module').then(m => m.PoliciesModule) },
  { path: 'claims', loadChildren: () => import('./claims/claims.module').then(m => m.ClaimsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
