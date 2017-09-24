import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/Observable';

import { Section } from '../Section';

import sections from '../data/sections.json';

export class InMemorySectionService implements InMemoryDbService
{
    createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}>
    {
        return { sections: sections.data };
    }

}
