import Fastify from 'fastify'
import fastifyMysql from '@fastify/mysql'

// TypeScriptにプラグインの型を認識させる
declare module 'fastify' {
  interface FastifyInstance {
    mysql: any
  }
}

const fastify = Fastify({ logger: true })

// MySQL への接続登録
// ホスト名は docker-compose.yml で定義したサービス名の "db" を指定します
fastify.register(fastifyMysql, {
  promise: true,
  connectionString: 'mysql://demo_user:demo_password@db-server:3306/demo_db'
})

// ルート定義
fastify.get('/', async (request, reply) => {
  // DBの時間を取得してみる（疎通確認用）
  const connection = await fastify.mysql.getConnection()
  const [rows]: any = await connection.query('SELECT NOW() as now')
  connection.release()

  return {
    hello: 'TypeScript & MySQL!',
    db_time: rows[0].now
  }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
