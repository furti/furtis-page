import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemorySectionService } from './InMemorySectionService';

@NgModule({
    imports: [
        HttpClientInMemoryWebApiModule.forRoot(InMemorySectionService, {
            delay: 500
        })
    ],
    exports: [
        HttpClientInMemoryWebApiModule
    ]
})
export class HttpmockModule { }
