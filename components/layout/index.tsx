import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { doCategories, doLinker, doSite } from 'service/api';

import Nav from '@/components/nav';
import Banner from '@/components/banner';

const Linker = dynamic(() => import('@/components/linker'));
const Search = dynamic(() => import('@/components/search'));
const Footer = dynamic(() => import('@/components/footer'));

import styles from 'styles/layout.module.scss';

function Layout(props: Props.Layout) {

  const router = useRouter();
  const [search, setSearch] = useState<boolean | undefined>();

  const onSearchOpen = () => {
    document.body.style.overflow = 'hidden';
    setSearch(true);
  };

  const onSearchClose = () => {
    document.body.style.overflow = 'auto';
    setSearch(false);
  };

  const onSearch = async (keyword: string) => {
    onSearchClose();
    await router.push(`/search?keyword=${keyword}`);
  };

  // @todo 将数据存储于 Redux 中，避免重复加载
  const site = doSite();
  const linker = doLinker();
  const categories = doCategories();

  return (
    <>
      <Head>
        <title>{props.title}{props.title && site.data?.name ? ' - ' : ''}{site.data?.name}</title>
      </Head>
      <div className={styles.layout}>
        <Nav name={site.data?.name} items={categories.data} onOpen={onSearchOpen} />
        <Banner uri={props.banner} />
        <div className={styles.container}>
          {props.children}
        </div>
        {
          linker.data ?
            <Linker items={linker.data} /> : <></>
        }
        {
          site.data && site.data.icp && site.data.copyright && site.data.police ?
            <Footer icp={site.data.icp} copyright={site.data.copyright} police={site.data.police} /> : <></>
        }
      </div>
      {
        search != undefined ?
          <Search show={search} onClose={onSearchClose} onSearch={onSearch} /> : <></>
      }
    </>
  );
}

export default Layout;