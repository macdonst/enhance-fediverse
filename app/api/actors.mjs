// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getActors, upsertActor, validate } from '../models/actors.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const actors = await getActors()
  if (req.session.problems) {
    let { problems, actor, ...session } = req.session
    return {
      session,
      json: { problems, actors, actor }
    }
  }

  return {
    json: { actors }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, actor } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, actor },
      json: { problems, actor },
      location: '/actors'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, actor: removed, ...newSession } = session
  try {
    const result = await upsertActor(actor)
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
