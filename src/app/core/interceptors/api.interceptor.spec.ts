import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiInterceptor } from './api.interceptor';
import { TestBed } from '@angular/core/testing';
import { UrlService } from '../services/url.service';

describe('ApiInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let urlServiceSpy: jasmine.SpyObj<UrlService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UrlService', ['isAbsoluteUrl', 'toAbsoluteUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
        { provide: UrlService, useValue: spy }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    urlServiceSpy = TestBed.inject(UrlService) as jasmine.SpyObj<UrlService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add the base URL to relative URLs', () => {
    const testUrl = '/test-endpoint';
    const absoluteUrl = 'http://example.com/test-endpoint';
    urlServiceSpy.isAbsoluteUrl.and.returnValue(false);
    urlServiceSpy.toAbsoluteUrl.and.returnValue(absoluteUrl);

    httpClient.get(testUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(absoluteUrl);
    expect(req.request.url).toBe(absoluteUrl);
    req.flush({ data: 'test' });

    expect(urlServiceSpy.isAbsoluteUrl).toHaveBeenCalledWith(testUrl);
    expect(urlServiceSpy.toAbsoluteUrl).toHaveBeenCalledWith(testUrl);
  });

  it('should not modify absolute URLs', () => {
    const testUrl = 'http://example.com/test-endpoint';
    urlServiceSpy.isAbsoluteUrl.and.returnValue(true);

    httpClient.get(testUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.url).toBe(testUrl);
    req.flush({ data: 'test' });

    expect(urlServiceSpy.isAbsoluteUrl).toHaveBeenCalledWith(testUrl);
    expect(urlServiceSpy.toAbsoluteUrl).not.toHaveBeenCalled();
  });
});
