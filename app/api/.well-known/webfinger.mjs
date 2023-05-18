/**
 * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
 */

import { parseHandle } from '../../../shared/utils/parse-handle.mjs'
import { actorURL } from '../../../shared/utils/actor-url.mjs'
import { getActor } from '../../models/actors.mjs'

/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const { resource } = req.query
  const domain = process.env.DOMAIN_NAME

	if (!resource) {
		return {
      statusCode: 400,
    }
	}

	const parts = resource.split(':')
	if (parts.length !== 2 || parts[0] !== 'acct') {
		return {
      statusCode: 400,
    }
	}

	const handle = parseHandle(parts[1])
	if (handle.domain === null) {
		return {
      statusCode: 400,
    }
	}

	if (handle.domain !== domain) {
    return {
      statusCode: 403,
    }
	}

  // Query the database for users
  const actor = await getActor(actorURL(domain, handle.localPart))
  if (actor === null) {
    return {
      statusCode: 404
    }
  }
  //console.log(actor)

  const jsonLink = actor.id.toString()

  return {
    headers: {
      'content-type': 'application/jrd+json'
    },
    json: {
      subject: `acct:${handle.localPart}@${handle.domain}`,
      aliases: [jsonLink],
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: jsonLink,
        },
      ],
    }
  }
}
