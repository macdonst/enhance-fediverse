export function actorURL(domain, id) {
  return new URL(`/ap/users/${id}`, 'https://' + domain)
}
