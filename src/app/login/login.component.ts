import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FormControlState } from '../FormControlState';
import { ErrorHandler } from './../error-handler.service';
import { AuthenticationService } from './../security/authentication.service';

@Component({
    selector: 'fuu-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitTried: boolean;
    usernameInvalid = true;
    passwordInvalid = true;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private errorHandler: ErrorHandler,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.setupForm();
    }

    ngOnInit() {
        if (this.errorHandler.lastError) {
            this.errorMessage = this.errorHandler.lastError.error;
        }
    }

    login(): void {
        if (this.loginForm.invalid) {
            this.submitTried = true;
            return;
        }

        const username: string = this.loginForm.get('username').value;
        const password: string = this.loginForm.get('password').value;

        this.authenticationService.authenticate(username, password).subscribe(
            result => {
                this.router.navigate(['/aboutme']);
            },
            (error: HttpErrorResponse) => {
                this.errorMessage = error.error;
            }
        );
    }

    private setupForm(): any {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm
            .get('username')
            .statusChanges.subscribe(newStatus => (this.usernameInvalid = this.checkStatus(newStatus)));

        this.loginForm
            .get('password')
            .statusChanges.subscribe(newStatus => (this.passwordInvalid = this.checkStatus(newStatus)));
    }

    private checkStatus(status: FormControlState): boolean {
        return status === 'INVALID';
    }
}
