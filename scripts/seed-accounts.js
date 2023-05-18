const db = require('@begin/data')
async function main() {
  await db.set({
    table: 'actors',
    "@context": ["https://www.w3.org/ns/activitystreams"],
    "type": "Person",
    "id": "https://kenzoishii.example.com/",
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
}
main()
