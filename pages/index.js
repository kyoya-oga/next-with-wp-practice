import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export default function Home({ posts }) {
  return (
    <main className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-bold underline">
          Next.js with Headless WordPress
        </h1>
        <div className="mt-5 space-y-2">
          {posts.map((post) => {
            const { id, title } = post.node;
            return <h2 key={id}>{title}</h2>;
          })}
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: 'http://wptest.local/graphql',
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
      query MyQuery {
        posts {
          edges {
            node {
              id
              title
              content
              slug
            }
          }
        }
      }
    `,
  });

  const posts = response.data.posts.edges;

  return {
    props: {
      posts,
    },
  };
};
