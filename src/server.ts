import fastify from 'fastify'
import { knex } from 'knex'
import { randomUUID } from 'node:crypto'
import { env } from './env'

const server = fastify()

server.get('/hello', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})
server.get('/hellos', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')
  return transaction
})

server.listen({ port: env.PORT }).then(() => {
  console.log('Running!')
})
