import { SectionService } from './section.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DividerComponent } from './divider/divider.component';
import { HttpmockModule } from './httpmock/httpmock.module';
import { ErrorHandler } from './error-handler.service';
import { LoadingComponent } from './loading/loading.component';
import { SectionCardComponent } from './section-card/section-card.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutMeComponent,
        LoginComponent,
        HomeComponent,
        DividerComponent,
        LoadingComponent,
        SectionCardComponent,
        ProfileImageComponent,
        SectionDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClarityModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        HttpmockModule
    ],
    providers: [ErrorHandler, SectionService],
    bootstrap: [AppComponent]
})
export class AppModule { }
