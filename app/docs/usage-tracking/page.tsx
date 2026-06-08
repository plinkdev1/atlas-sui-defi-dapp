export default function UsageTrackingDocs() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Usage Tracking Module Documentation</h1>

      <section>
        <h2>Overview</h2>
        <p>
          The Usage Tracking module provides real-time monitoring of API consumption per client. It displays quota usage
          with visual indicators, proxy compatibility notes, and operational guidance.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Per-Client Quotas:</strong> Track API requests for each connected client
          </li>
          <li>
            <strong>Visual Progress Bars:</strong> Color-coded by usage level (green, yellow, red)
          </li>
          <li>
            <strong>Plan Information:</strong> Display associated service plan and limits
          </li>
          <li>
            <strong>Proxy Configuration:</strong> NGINX and Envoy setup examples
          </li>
          <li>
            <strong>Reset Schedules:</strong> Show quota reset times
          </li>
          <li>
            <strong>Realistic Dashboard:</strong> Professional interface for ops teams
          </li>
        </ul>
      </section>

      <section>
        <h2>Client Data Structure</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto">
          {`interface ClientQuota {
  clientId: string;
  clientName: string;
  plan: 'Starter' | 'Growth' | 'Pro';
  apiKey: string;
  requestsUsed: number;
  requestsLimit: number;
  percentageUsed: number;
  status: 'Active' | 'Warning' | 'Exceeded';
  lastReset: string;
  nextReset: string;
  services: string[];
}`}
        </pre>
      </section>

      <section>
        <h2>NGINX Configuration Example</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto">
          {`# Rate limiting by API key
limit_req_zone \\$http_x_api_key zone=api_limit:10m rate=100r/s;

server {
    listen 8080;
    
    location /api/ {
        limit_req zone=api_limit burst=200 nodelay;
        proxy_pass http://backend;
    }
}`}
        </pre>
      </section>

      <section>
        <h2>Envoy Configuration Example</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto">
          {`rate_limits:
  - name: api-quota
    domains: ["*"]
    match_headers:
      - name: x-api-key
        exact_match: "client-key"
    rate_limit_actions:
      - type: GENERIC_KEY
        generic_key:
          descriptor_key: "api_key"
    rate_limit_service: "rate-limiter"`}
        </pre>
      </section>

      <section>
        <h2>Status Indicators</h2>
        <ul>
          <li>
            <strong>Green (0-70%):</strong> Healthy usage, plenty of quota remaining
          </li>
          <li>
            <strong>Yellow (71-90%):</strong> Warning state, approaching limit
          </li>
          <li>
            <strong>Red (91-100%):</strong> Critical, nearly at quota
          </li>
          <li>
            <strong>Red (100%+):</strong> Exceeded quota, requests being throttled
          </li>
        </ul>
      </section>

      <section>
        <h2>Sui-Only Scope</h2>
        <p>
          Usage tracking features are exclusively available on Sui networks. Other chains show "Full functionality on
          Sui" messaging.
        </p>
      </section>
    </article>
  )
}
