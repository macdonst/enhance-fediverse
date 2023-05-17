// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteActor } from '../../../models/actors.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, actor: removed, ...newSession } = session
  try {
    let actor = await deleteActor(id)
    return {
      session: newSession,
      json: { actor },
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
