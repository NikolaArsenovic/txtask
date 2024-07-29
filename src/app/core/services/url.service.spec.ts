import { Environment } from '../models/environment.model';
import { TestBed } from '@angular/core/testing';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  // Setup the test environment
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UrlService,
        { provide: Environment, useValue: { baseApiUrl: 'http://example.com' } }
      ]
    });
    service = TestBed.inject(UrlService);
  });

  // Test cases for isAbsoluteUrl
  describe('isAbsoluteUrl', () => {
    it('should return true for absolute URLs', () => {
      expect(service.isAbsoluteUrl('http://example.com/page')).toBe(true);
      expect(service.isAbsoluteUrl('https://example.com')).toBe(true);
      expect(service.isAbsoluteUrl('ftp://example.com/resource')).toBe(true);
    });

    it('should return false for relative URLs', () => {
      expect(service.isAbsoluteUrl('/page')).toBe(false);
      expect(service.isAbsoluteUrl('page/')).toBe(false);
      expect(service.isAbsoluteUrl('../parent')).toBe(false);
    });
  });

  // Test cases for toAbsoluteUrl
  describe('toAbsoluteUrl', () => {
    it('should correctly convert a relative URL to an absolute URL', () => {
      const result = service.toAbsoluteUrl('/page');
      expect(result).toBe('http://example.com/page');
    });

    it('should handle relative URLs without leading slash', () => {
      const result = service.toAbsoluteUrl('page');
      expect(result).toBe('http://example.com/page');
    });

    it('should handle base URL with trailing slash', () => {
      service.environment.baseApiUrl = 'http://example.com/';
      const result = service.toAbsoluteUrl('/page');
      expect(result).toBe('http://example.com/page');
    });
  });
});
