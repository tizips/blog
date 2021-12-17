import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout';
import { doArticles } from 'service/api';

const Articles = dynamic(() => import('@/components/articles'));

const Home = (props: Props.Home) => {
  return (
    <Layout title='首页'>
      <Articles items={props.articles?.data}
                paginate={{
                  size: props.articles?.size,
                  page: props.articles?.page,
                  total: props.articles?.total,
                }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  let page: number | undefined = undefined;

  if (typeof context.query?.page == 'string') page = parseInt(context.query.page, 10);

  const articles = await doArticles({ page });

  return {
    props: {
      articles,
    },
  };
};

export default Home;
