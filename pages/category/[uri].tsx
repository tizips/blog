import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout';
import { doArticles, doCategory } from 'service/api';

const Articles = dynamic(() => import('@/components/articles'));
const Information = dynamic(() => import('@/components/information'));

const Category = (props: Props.Category) => {
  return (
    <Layout title={props.category?.name} banner={props.category?.picture}>
      {
        props.category?.is_page ?
          <Information title={props.category.name} content={props.category.page} is_meta={false} /> :
          <Articles items={props.articles?.data}
                    paginate={{
                      size: props.articles?.size,
                      page: props.articles?.page,
                      total: props.articles?.total,
                    }} />
      }
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const category = await doCategory(context.params?.uri as string);

  if (!category) return { redirect: { destination: '/404', permanent: false } };

  let articles: Props.Paginate<API.Articles[]> | null = null;

  let uri: string | undefined = undefined;
  let page: number | undefined = undefined;

  if (typeof context.params?.uri == 'string') uri = context.params.uri;
  if (typeof context.query?.page == 'string') page = parseInt(context.query.page, 10);

  if (category?.is_page !== 1) articles = await doArticles({ uri, page });

  return {
    props: {
      category,
      articles,
    },
  };
};

export default Category;
