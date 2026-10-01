const test = require('node:test'); const assert = require('node:assert');
const L = require('../schema.js');
test('builds valid JSON-LD', () => {
  const r = L.build({ name: 'Acme Plumbing', type: 'Plumber', url: 'https://example.com', phone: '+1-555-0100', street: '1 Main St', city: 'Tyler', state: 'TX', zip: '75701',
    hours: [{ days: ['mon', 'tue'], opens: '9am', closes: '5:30pm' }], sameAs: 'https://facebook.com/x, https://yelp.com/y' });
  assert.deepEqual(r.errors, []);
  const o = JSON.parse(r.json);
  assert.equal(o['@type'], 'Plumber'); assert.equal(o.address.addressRegion, 'TX');
  assert.equal(o.openingHoursSpecification[0].closes, '17:30'); assert.equal(o.sameAs.length, 2);
});
test('requires name and flags bad url/hours', () => {
  const r = L.build({ url: 'ftp://x', hours: [{ days: ['mon'], opens: '9am', closes: '9am' }] });
  assert.ok(r.errors.length >= 3);
});
test('script tag wrapper', () => { assert.match(L.toScriptTag('{}'), /^<script type="application\/ld\+json">/); });
