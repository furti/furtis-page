import { SectionService } from './section.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DividerComponent } from './divider/divider.component';
import { ErrorHandler } from './error-handler.service';
import { LoadingComponent } from './loading/loading.component';
import { SectionCardComponent } from './section-card/section-card.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { CvComponent } from './cv/cv.component';
import { FuuDatePipe } from './date.pipe';
import { AboutMeBackButtonComponent } from './about-me-back-button/about-me-back-button.component';
import { ErrorComponent } from './error/error.component';
import { AsciiViewComponent } from './ascii-view/ascii-view.component';
import { SecurityService } from './security/security.service';
import { SecurityInterceptor } from './security/SecurityInterceptor';
import { AuthenticationService } from './security/authentication.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { IconListComponent } from './icon-list/icon-list.component';

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
        SectionDetailComponent,
        CvComponent,
        FuuDatePipe,
        AboutMeBackButtonComponent,
        ErrorComponent,
        AsciiViewComponent,
        ForbiddenComponent,
        IconListComponent
    ],
    imports: [BrowserModule, AppRoutingModule, ClarityModule.forRoot(), ReactiveFormsModule, HttpClientModule],
    providers: [
        ErrorHandler,
        SectionService,
        SecurityService,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SecurityInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
