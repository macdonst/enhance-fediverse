import test from 'tape'
import { start, end } from '@architect/sandbox'

const host = 'http://localhost:3333'

test('setup', async (t) => {
  t.pass(await start({ quiet: true }))
  t.end()
})

test('WebFinger: no resource queried', async (t) => {
  const response = await fetch(`${host}/.well-known/webfinger`)
  t.equal(response.status, 400, 'Return 400 when no resource queried')
})

test('WebFinger: invalid resource', async (t) => {
  const response = await fetch(`${host}/.well-known/webfinger?resource=not:valid`)
  t.equal(response.status, 400, 'Return 400 when invalid resource queried')
})

test('WebFinger: query local account', async (t) => {
  const response = await fetch(`${host}/.well-known/webfinger?resource=acct:local`)
  t.equal(response.status, 400, 'Return 400 when querying local account')
})

test('WebFinger: query non-existing account', async (t) => {
  const response = await fetch(`${host}/.well-known/webfinger?resource=acct:nope@example.com`)
  t.equal(response.status, 404, 'Return 404 when querying non-existing account')
})

test('WebFinger: query existing account', async (t) => {
  const response = await fetch(`${host}/.well-known/webfinger?resource=acct:kenzoishii@example.com`)

  t.equal(response.status, 200)
  t.equal(response.headers.get('content-type'), 'application/jrd+json')
})

test('teardown', async (t) => {
  t.pass(await end())
  t.end()
})
