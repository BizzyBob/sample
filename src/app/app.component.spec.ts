import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('[AppComponent]', () => {
  let componentUnderTest: AppComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [ AppComponent ]
    });

    componentUnderTest = TestBed.inject(AppComponent);
  });

  describe('INIT', () => {
    it('INIT: should create the app', () => {
      expect(componentUnderTest).toBeTruthy();
    });
  })
});
