// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getActor, upsertActor, validate } from '../../models/actors.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  if (req.session.problems) {
    let { problems, actor, ...session } = req.session
    return {
      session,
      json: { problems, actor }
    }
  }

  const id = req.pathParameters?.id
  const result = await getActor(id)
  return {
    json: { actor: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, actor } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, actor },
      json: { problems, actor },
      location: `/actors/${actor.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, actor: removed, ...newSession } = session
  try {
    const result = await upsertActor({ key: id, ...actor })
    return {
      session: newSession,
      json: { actor: result },
      location: '/actors'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/actors'
    }
  }
}
