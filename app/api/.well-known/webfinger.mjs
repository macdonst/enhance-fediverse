/**
 * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
 */

import { parseHandle } from '../../../shared/utils/parse-handle.mjs'

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

  return {
    json: {
      "subject": "acct:user@example.com",
      "aliases": [
          "https://example.com/ap/users/user"
      ],
      "links": [
          {
              "rel": "self",
              "type": "application/activity+json",
              "href": "https://example.com/ap/users/user"
          }
      ]
    }
  }
}
