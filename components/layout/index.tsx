import { Props } from 'service/props';
import { useEffect, useState } from 'react';
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
  const [site, setSite] = useState<API.Site | undefined>();
  const [linker, setLinker] = useState<API.Linkers[] | undefined>();
  const [categories, setCategories] = useState<API.Categories[] | undefined>();

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

  const toSite = () => {
    doSite().then((response => setSite(response)));
  };

  const toLinker = () => {
    doLinker().then((response => setLinker(response)));
  };

  const toCategories = () => {
    doCategories().then((response => setCategories(response)));
  };

  useEffect(() => {
    if (!site) toSite();
    if (!linker || linker.length < 0) toLinker();
    if (!categories || categories.length < 0) toCategories();
  }, []);

  return (
    <>
      <Head>
        <title>{props.title}{props.title && site?.name ? ' - ' : ''}{site?.name}</title>
      </Head>
      <div className={styles.layout}>
        <Nav name={site?.name} items={categories} onOpen={onSearchOpen} />
        <Banner uri={props.banner} />
        <div className={styles.container}>
          {props.children}
        </div>
        {
          linker ?
            <Linker items={linker} /> : <></>
        }
        {
          site?.icp && site?.copyright && site?.police ?
            <Footer icp={site.icp} copyright={site.copyright} police={site.police} /> : <></>
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