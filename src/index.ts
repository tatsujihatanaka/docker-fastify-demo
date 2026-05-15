import Fastify from 'fastify'
import fastifyMysql from '@fastify/mysql'
import { appRoutes } from './routes.js'

const fastify = Fastify({ logger: true })

// 型定義
declare module 'fastify' {
  interface FastifyInstance { mysql: any }
}

// DB設定 (docker-compose.yml のサービス名 db-server に合わせる)
fastify.register(fastifyMysql, {
  promise: true,
  connectionString: 'mysql://demo_user:demo_password@db-server:3306/demo_db'
})

// ルーティング登録
fastify.register(appRoutes)

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()