import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout';
import { doSearch } from 'service/api';

const Articles = dynamic(() => import('@/components/articles'));

const Search = (props: Props.Searcher) => {
  return (
    <Layout title='搜索结果'>
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

  let articles: Props.Paginate<API.Articles[]> | null = null;

  let page: number | undefined = undefined;
  let keyword: string | undefined = undefined;

  if (typeof context.query?.page == 'string') page = parseInt(context.query.page, 10);
  if (typeof context.query?.keyword == 'string') keyword = context.query.keyword;

  if (keyword) articles = await doSearch({ keyword, page });

  return {
    props: {
      articles,
    },
  };
};

export default Search;