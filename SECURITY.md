# Security Policy

## Reporting Security Issues

**Do NOT open a public GitHub issue for security vulnerabilities.**

Please email security@atlasprotocol.dev with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

We will respond within 48 hours and work with you to resolve the issue.

## Security Measures

### Environment Variables
- All API keys stored in `.env.local` (never committed)
- Use `.env.example` as template
- Rotate keys regularly

### API Security
- Rate limiting on all public endpoints
- Input validation on all routes
- No sensitive data in URL parameters
- HTTPS only in production

### Database
- Row-level security (RLS) enabled on Supabase
- SQL injection protection via parameterized queries
- Regular backups automated

### Frontend
- No API keys exposed in client-side code
- Sensitive operations only server-side
- Content Security Policy headers
- CORS properly configured

### Authentication
- Wallet-based authentication (non-custodial)
- No password storage
- Secure session management

## Dependencies

- Dependencies updated monthly
- Security patches applied immediately
- Audit run via `pnpm audit`

## Compliance

- GDPR-compliant data handling
- No collection of unnecessary personal data
- User data never shared with third parties
- Data retention policies documented

## Bug Bounty

Security researchers who find and report vulnerabilities may be eligible for rewards. Contact security@atlasprotocol.dev for details.
