require('dotenv').config({path: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env'})

export const DbConfiguration = {
  name: process.env.DB_NAME as string,
  connector: process.env.DB_CONNECTOR as string,
  url: process.env.DB_URL as string,
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string
}
