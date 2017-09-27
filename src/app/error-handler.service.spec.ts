import { TestBed, inject } from '@angular/core/testing';

import { ErrorHandler } from './error-handler.service';

describe('ErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandler]
    });
  });

  it('should be created', inject([ErrorHandler], (service: ErrorHandler) => {
    expect(service).toBeTruthy();
  }));
});
