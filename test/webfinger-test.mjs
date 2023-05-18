import test from 'tape'
import { start, end } from '@architect/sandbox'
import db from '@begin/data'


const host = 'http://localhost:3333'

test('setup', async (t) => {
  t.pass(await start({ quiet: true }))
  t.end()
})

test('WebFinger: no resource queried', async (t) => {
  t.plan(1)
  const response = await fetch(`${host}/.well-known/webfinger`)
  t.equal(response.status, 400, 'Return 400 when no resource queried')
})

test('WebFinger: invalid resource', async (t) => {
  t.plan(1)
  const response = await fetch(`${host}/.well-known/webfinger?resource=not:valid`)
  t.equal(response.status, 400, 'Return 400 when invalid resource queried')
})

test('WebFinger: query local account', async (t) => {
  t.plan(1)
  const response = await fetch(`${host}/.well-known/webfinger?resource=acct:local`)
  t.equal(response.status, 400, 'Return 400 when querying local account')
})

test('WebFinger: query non-existing account', async (t) => {
  t.plan(1)
  const response = await fetch(`${host}/.well-known/webfinger?resource=acct:nope@example.com`)
  t.equal(response.status, 404, 'Return 404 when querying non-existing account')
})

test('WebFinger: query existing account', async (t) => {
  t.plan(3)
  await db.set({
    table: 'actors',
    key: "https://example.com/ap/users/kenzoishii",
    "id": "https://example.com/ap/users/kenzoishii",
    "@context": ["https://www.w3.org/ns/activitystreams"],
    "type": "Person",
    "following": "https://kenzoishii.example.com/following.json",
    "followers": "https://kenzoishii.example.com/followers.json",
    "liked": "https://kenzoishii.example.com/liked.json",
    "inbox": "https://kenzoishii.example.com/inbox.json",
    "outbox": "https://kenzoishii.example.com/feed.json",
    "preferredUsername": "kenzoishii",
    "name": "石井健蔵",
    "summary": "この方はただの例です",
    "icon": [
      "https://kenzoishii.example.com/image/165987aklre4"
    ]
  })

  const response = await fetch(`${host}/.well-known/webfinger?resource=acct:kenzoishii@example.com`)

  t.equal(response.status, 200, 'account found')
  t.equal(response.headers.get('content-type'), 'application/jrd+json', 'content-type set properly')

  const body = await response.json()
  t.equal(body.subject,'acct:kenzoishii@example.com')
})

test('teardown', async (t) => {
  t.pass(await end())
  t.end()
})
