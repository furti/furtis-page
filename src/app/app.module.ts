import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DividerComponent } from './divider/divider.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutMeComponent,
        LoginComponent,
        HomeComponent,
        DividerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClarityModule.forRoot(),
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
