import data from '@begin/data'
import { validator } from '@begin/validator'
import { Actor } from './schemas/actor.mjs'

const deleteActor = async function (key) {
  await data.destroy({ table: 'actors', key })
  return { key }
}

const upsertActor = async function (actor) {
  return data.set({ table: 'actors', ...actor })
}

const getActor = async function (key) {
  const actor = data.get({ table: 'actors', key })
  actor['@context'] = '"https://www.w3.org/ns/activitystreams'
  return actor
}

const getActors = async function () {
  const databasePageResults = await data.page({
    table: 'actors',
    limit: 25
  })

  let actors = []
  for await (let databasePageResult of databasePageResults) {
    for (let actor of databasePageResult) {
      delete actor.table
      actor['@context'] = '"https://www.w3.org/ns/activitystreams'
      actors.push(actor)
    }
  }

  return actors
}

const validate = {
  shared (req) {
    return validator(req, Actor)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, actor: data } : { actor: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, actor: data } : { actor: data }
  }
}

export {
  deleteActor,
  getActor,
  getActors,
  upsertActor,
  validate
}
