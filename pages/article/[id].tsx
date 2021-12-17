import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout';
import { doArticle } from 'service/api';

const Information = dynamic(() => import('@/components/information'));
const Author = dynamic(() => import('@/components/author'));

const Article = (props: Props.Article) => {
  return (
    <Layout title={props.article?.name} banner={props.article?.picture}>
      <Information category={props.article?.category} title={props.article?.name} content={props.article?.content}
                   source_name={props.article?.source_name} source_url={props.article?.source_uri}
                   datetime={props.article?.created_at} />
      <Author name={props.article?.author_name} avatar={props.article?.author_avatar} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  let id: number | undefined = undefined;

  if (typeof context.params?.id == 'string') id = parseInt(context.params?.id, 10);

  if (!id || id <= 0) return { redirect: { destination: '/404', permanent: false } };

  const article = await doArticle(id);

  if (!article) return { redirect: { destination: '/404', permanent: false } };

  return {
    props: {
      article,
    },
  };
};


export default Article;