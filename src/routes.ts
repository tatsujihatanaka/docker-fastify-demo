// import { FastifyInstance } from 'fastify'
import type { FastifyInstance } from 'fastify'
import { getHome, getMysqlTest, getHtmlTest } from './controllers/testController.js'

export async function appRoutes(fastify: FastifyInstance) {
  // ルートディレクトリ
  fastify.get('/', getHome)

  // /mysql_test ディレクトリ
  fastify.get('/mysql_test', getMysqlTest(fastify))

  // /mysql_test ディレクトリ
  fastify.get('/html_test', getHtmlTest)
}
