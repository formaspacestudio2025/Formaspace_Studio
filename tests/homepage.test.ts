import { describe, it, expect } from 'vitest';

describe('Homepage', () => {
  it('should have correct title', () => {
    expect('Formaspace Studio | Digital Engineering, BIM & Project Controls').toContain('Formaspace Studio');
  });
});
