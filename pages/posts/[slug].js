import { gql } from '@apollo/client';
import { client } from '../../lib/apollo';

export const getStaticPaths = async () => {
  const GET_POST_SLUGS = gql`
    query GetSlugs {
      posts {
        nodes {
          slug
        }
      }
    }
  `;
  const response = await client.query({
    query: GET_POST_SLUGS,
  });

  const paths = response.data.posts.nodes.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const GET_POST = gql`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
      }
    }
  `;

  const response = await client.query({
    query: GET_POST,
    variables: {
      slug: params.slug,
    },
  });

  const post = response?.data?.post;

  return {
    props: {
      post,
    },
  };
};

const PostPage = ({ post }) => {
  const { title, content } = post;
  return (
    <main className="px-3 mx-auto max-w-3xl lg:max-w-4xl grid place-content-center h-screen">
      <h1 className="text-xl text-blue-700">{title}</h1>
      <div className="mt-3" dangerouslySetInnerHTML={{ __html: content }}></div>
    </main>
  );
};

export default PostPage;
