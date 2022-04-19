import { gql } from '@apollo/client';
import Link from 'next/link';
import { client } from '../lib/apollo';

export default function Home({ posts }) {
  return (
    <main className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-bold underline">
          Next.js with Headless WordPress
        </h1>
        <div className="mt-5 space-y-2">
          {posts.map((post) => {
            const { id, slug, title } = post;
            return (
              <Link key={id} href={`/posts/${slug}`}>
                <a className="block">{title}</a>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const GET_POSTS = gql`
    query AllPostsQuery {
      posts {
        nodes {
          id
          slug
          title
        }
      }
    }
  `;

  const response = await client.query({
    query: GET_POSTS,
  });

  const posts = response?.data?.posts?.nodes;

  return {
    props: {
      posts,
    },
  };
};
