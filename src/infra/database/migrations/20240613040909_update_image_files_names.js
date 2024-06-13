exports.up = async function up(knex) {
  const projects = await knex('projects')
    .select('id', 'image')
    .whereNotNull('image')

  const persons = await knex('persons')
    .select('id', 'image')
    .whereNotNull('image')

  const promises = []

  projects.forEach((project) => {
    const { image, id } = project
    const imageName = image.split('/').pop()
    promises.push(knex('projects').where({ id }).update({ image: imageName }))
  })

  persons.forEach((person) => {
    const { image, id } = person
    const imageName = image.split('/').pop()
    promises.push(knex('persons').where({ id }).update({ image: imageName }))
  })

  await Promise.all(promises)
}

exports.down = async function down() {}
