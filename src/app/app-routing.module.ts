import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutMeComponent } from './about-me/about-me.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'aboutme',
        component: AboutMeComponent
    },
    {
        path: 'aboutme/:sectionId',
        component: SectionDetailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
