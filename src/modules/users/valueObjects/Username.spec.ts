import { Username } from './Username';

describe('Username', () => {
  it('should transform a username correctly', () => {
    const username = 'UsÉr nâme';
    const transformed = Username.create(username).toString();
    expect(transformed).toBe('user-name');
  });

  it('should handle multiple spaces correctly', () => {
    const username = 'User    Name';
    const transformed = Username.create(username).toString();
    expect(transformed).toBe('user-name');
  });

  it('should handle leading and trailing spaces correctly', () => {
    const username = '  User Name  ';
    const transformed = Username.create(username).toString();
    expect(transformed).toBe('user-name');
  });

  it('should handle accented characters correctly', () => {
    const username = 'Àéîöú';
    const transformed = Username.create(username).toString();
    expect(transformed).toBe('aeiou');
  });

  it('should handle multiple dashes correctly', () => {
    const username = 'User--Name';
    const transformed = Username.create(username).toString();
    expect(transformed).toBe('user-name');
  });

  it('should return a lowercase username', () => {
    const username = 'USER NAME';
    const transformed = Username.create(username).toString();
    expect(transformed).toBe('user-name');
  });
});
