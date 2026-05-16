//import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'
import type { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'

// ルートディレクトリ (/) 用の処理
export const getHome = async (request: FastifyRequest, reply: FastifyReply) => {
  return { message: 'Welcome to the Fastify App Home! Next test is /mysql_test and html_test' }
}

// /mysql_test 用の処理
export const getMysqlTest = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  const connection = await fastify.mysql.getConnection()
  try {
    const [rows]: any = await connection.query('SELECT NOW() as currentTime')
    return {
      status: 'success',
      endpoint: '/mysql_test',
      db_time: rows[0].currentTime
    }
  } catch (err) {
    return reply.status(500).send({ error: 'DB Connection Failed' })
  } finally {
    connection.release()
  }
}

export const getHtmlTest = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.type('text/html')

  // 最小限のHTML（bodyタグすら省略可能ですが、ブラウザのために最低限維持）
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
</head>
<body>
<h1>Hello Fastify!</h1>
<p>これで日本語も正しく表示されます。</p>
<hr>
<a href="/">ホームへ戻る</a>
</body>
</html>
  `
}
