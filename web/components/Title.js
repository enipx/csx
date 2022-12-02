import Head from 'next/head'

const Title = ({ name }) => {
  const def = 'CSX' 
  const title = name ? `${name} - ${def}` : def;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  )
}

export default Title
