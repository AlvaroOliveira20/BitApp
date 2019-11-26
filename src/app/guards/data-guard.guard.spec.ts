import { TestBed, async, inject } from '@angular/core/testing';

import { DataGuardGuard } from './data-guard.guard';

describe('DataGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataGuardGuard]
    });
  });

  it('should ...', inject([DataGuardGuard], (guard: DataGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
