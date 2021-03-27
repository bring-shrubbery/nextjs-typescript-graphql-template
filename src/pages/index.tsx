import Link from 'next/link'
import { useState } from 'react'
import {
  useViewerQuery,
  useUpdateNameMutation,
  ViewerDocument,
  ViewerQuery
} from '@src/lib/graphql/types/viewer.graphql'
import { initializeApollo } from '@src/lib/graphql/apollo'

const Index = () => {
  const { viewer } = useViewerQuery().data!
  const [newName, setNewName] = useState('')
  const [updateNameMutation] = useUpdateNameMutation()

  const onChangeName = () => {
    updateNameMutation({
      variables: {
        name: newName,
      },
      //Follow apollo suggestion to update cache
      //https://www.apollographql.com/docs/angular/features/cache-updates/#update
      update: (
        cache,
        {data}
      ) => {
        const name = data?.updateName.name;
        // Read the data from our cache for this query.
        const query = cache.readQuery<ViewerQuery>({ query: ViewerDocument });
        const newViewer = { viewer: query?.viewer, name: name };
        // Write our data back to the cache.
        cache.writeQuery({ query: ViewerDocument, data: { viewer: newViewer } })
      },
    })
  }

  return (
    <div>
      You're signed in as {viewer.name} and you're {viewer.status}. Go to the{' '}
      <Link href="/about">
        <a>about</a>
      </Link>{' '}
      page.
      <div>
        <input
          type="text"
          placeholder="your new name..."
          onChange={(e) => setNewName(e.target.value)}
        />
        <input type="button" value="change" onClick={onChangeName} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
