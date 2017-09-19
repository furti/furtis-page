import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { FormControlState } from '../FormControlState';

@Component({
    selector: 'fuu-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    submitTried: boolean;
    usernameInvalid = true;
    passwordInvalid = true;

    constructor(private formBuilder: FormBuilder)
    {
        this.setupForm();
    }

    ngOnInit()
    {
    }

    login(): void
    {
        if (this.loginForm.invalid)
        {
            this.submitTried = true;
            return;
        }
    }

    private setupForm(): any
    {
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });

        this.loginForm.get('username').statusChanges
            .subscribe(newStatus => this.usernameInvalid = this.checkStatus(newStatus));

        this.loginForm.get('password').statusChanges
            .subscribe(newStatus => this.passwordInvalid = this.checkStatus(newStatus));
    }

    private checkStatus(status: FormControlState): boolean
    {
        return status === 'INVALID';
    }
}
