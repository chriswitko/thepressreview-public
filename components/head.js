import React from 'react'
import Head from 'next/head'

export default ({ title }) => (
  <Head>
    <title>{ title || 'The Press Review' }</title>
    <meta charSet='utf-8' />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='stylesheet' type='text/css' href='/css/reset.css' />
    <link rel='stylesheet' type='text/css' href='/css/master.css' />
    <link rel='stylesheet' type='text/css' href='/css/nprogress.css' />
  </Head>
)
