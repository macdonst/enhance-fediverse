// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  let actors = store.actors || []
  const actor = store.actor || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Actors page</h1>
    ${actors.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">id: </strong>${item?.id || ''}</p>
  <p class="pb-2"><strong class="capitalize">type: </strong>${item?.type || ''}</p>
  <p class="pb-2"><strong class="capitalize">outbox: </strong>${item?.outbox || ''}</p>
  <p class="pb-2"><strong class="capitalize">inbox: </strong>${item?.inbox || ''}</p>
  <p class="pb-2"><strong class="capitalize">followers: </strong>${item?.followers || ''}</p>
  <p class="pb-2"><strong class="capitalize">following: </strong>${item?.following || ''}</p>
  <p class="pb-2"><strong class="capitalize">liked: </strong>${item?.liked || ''}</p>
  <p class="pb-2"><strong class="capitalize">preferred Username: </strong>${item?.preferredUsername || ''}</p>
  <p class="pb-2"><strong class="capitalize">proxy Url: </strong>${item?.endpoints?.proxyUrl || ''}</p>
  <p class="pb-2"><strong class="capitalize">oauth Authorization Endpoint: </strong>${item?.endpoints?.oauthAuthorizationEndpoint || ''}</p>
  <p class="pb-2"><strong class="capitalize">oauth Token Endpoint: </strong>${item?.endpoints?.oauthTokenEndpoint || ''}</p>
  <p class="pb-2"><strong class="capitalize">provide Client Key: </strong>${item?.endpoints?.provideClientKey || ''}</p>
  <p class="pb-2"><strong class="capitalize">sign Client Key: </strong>${item?.endpoints?.signClientKey || ''}</p>
  <p class="pb-2"><strong class="capitalize">shared Inbox: </strong>${item?.endpoints?.sharedInbox || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/actors/${item.key}">Edit this actor</enhance-link>
</p>
<form action="/actors/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this actor</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New actor</summary>
    <enhance-form
  action="/actors/${actor.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Actor">
  <enhance-text-input label="Id" type="url" id="id" name="id" required value="${actor?.id}" errors="${problems?.id?.errors}"></enhance-text-input>
  <enhance-text-input label="Type" type="text" id="type" name="type" required value="${actor?.type}" errors="${problems?.type?.errors}"></enhance-text-input>
  <enhance-text-input label="Outbox" type="url" id="outbox" name="outbox" description="A link to an OrderedCollection comprised of all the messages produced by the actor; see 5.1 Outbox." required value="${actor?.outbox}" errors="${problems?.outbox?.errors}"></enhance-text-input>
  <enhance-text-input label="Inbox" type="url" id="inbox" name="inbox" description="A link to an OrderedCollection comprised of all the messages received by the actor; see 5.2 Inbox." required value="${actor?.inbox}" errors="${problems?.inbox?.errors}"></enhance-text-input>
  <enhance-text-input label="Followers" type="url" id="followers" name="followers" description="A link to a collection of the actors that follow this actor; see 5.3 Followers Collection." value="${actor?.followers}" errors="${problems?.followers?.errors}"></enhance-text-input>
  <enhance-text-input label="Following" type="url" id="following" name="following" description="A link to a collection of the actors that this actor is following; see 5.4 Following Collection." value="${actor?.following}" errors="${problems?.following?.errors}"></enhance-text-input>
  <enhance-text-input label="Liked" type="url" id="liked" name="liked" description="A link to a collection of objects this actor has liked; see 5.5 Liked Collection." value="${actor?.liked}" errors="${problems?.liked?.errors}"></enhance-text-input>
  <enhance-text-input label="Preferred Username" type="text" id="preferredUsername" name="preferredUsername" description="A short username which may be used to refer to the actor, with no uniqueness guarantees." value="${actor?.preferredUsername}" errors="${problems?.preferredUsername?.errors}"></enhance-text-input>
  <enhance-fieldset legend="Endpoints"><enhance-text-input label="Proxy Url" type="url" id="endpoints.proxyUrl" name="endpoints.proxyUrl" description="Endpoint URI so this actor's clients may access remote objects which require authentication to access." value="${actor?.endpoints?.proxyUrl}" errors="${problems?.endpoints?.proxyUrl?.errors}"></enhance-text-input>
<enhance-text-input label="Oauth Authorization Endpoint" type="url" id="endpoints.oauthAuthorizationEndpoint" name="endpoints.oauthAuthorizationEndpoint" description="URI for OAuth 2.0 bearer tokens [RFC6749] [RFC6750], so clients may obtain a new authorization grant." value="${actor?.endpoints?.oauthAuthorizationEndpoint}" errors="${problems?.endpoints?.oauthAuthorizationEndpoint?.errors}"></enhance-text-input>
<enhance-text-input label="Oauth Token Endpoint" type="url" id="endpoints.oauthTokenEndpoint" name="endpoints.oauthTokenEndpoint" description="URI for OAuth 2.0 bearer tokens [RFC6749] [RFC6750], so clients may acquire an access token." value="${actor?.endpoints?.oauthTokenEndpoint}" errors="${problems?.endpoints?.oauthTokenEndpoint?.errors}"></enhance-text-input>
<enhance-text-input label="Provide Client Key" type="url" id="endpoints.provideClientKey" name="endpoints.provideClientKey" description="URI at which clients may authorize a client's public key for client to server interactions." value="${actor?.endpoints?.provideClientKey}" errors="${problems?.endpoints?.provideClientKey?.errors}"></enhance-text-input>
<enhance-text-input label="Sign Client Key" type="url" id="endpoints.signClientKey" name="endpoints.signClientKey" description="URI at which clients key may be signed by the actor's key to act on behalf of actor with foreign servers." value="${actor?.endpoints?.signClientKey}" errors="${problems?.endpoints?.signClientKey?.errors}"></enhance-text-input>
<enhance-text-input label="Shared Inbox" type="url" id="endpoints.sharedInbox" name="endpoints.sharedInbox" description="URI optional used for wide delivery of publicly addressed activities and activities sent to followers." value="${actor?.endpoints?.sharedInbox}" errors="${problems?.endpoints?.sharedInbox?.errors}"></enhance-text-input></enhance-fieldset>
  <input type="hidden" id="key" name="key" value="${actor?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</details>
</main>
</enhance-page-container>
  `
}
