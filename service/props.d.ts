declare namespace Props {

  type Nav = {
    name?: string;
    children?: any;
    onOpen?: () => void;
    items?: API.Categories[];
  }

  type Search = {
    show?: boolean;
    children?: any;
    onSearch?: (keyword: string) => void;
    onClose?: () => void;
  }

  type Layout = {
    site?: API.Site;
    title?: string;
    banner?: string;
    children?: any;
  }

  type Information = {
    is_meta?: boolean;
    title?: string;
    content?: string;
    category?: string;
    datetime?: string;
    source_url?: string;
    source_name?: string;
  }

  type Footer = {
    copyright?: string;
    icp?: string;
    police?: string;
  }

  type Linker = {
    items?: API.Linkers[];
  }

  type Banner = {
    uri?: string;
  }

  type Home = {
    articles?: Props.Paginate<API.Articles[]>;
  }

  type Category = {
    category?: API.Category;
    articles?: Props.Paginate<API.Articles[]>;
  }

  type Searcher = {
    articles?: Props.Paginate<API.Articles[]>;
  }

  type Articles = {
    paginate?: Paginate<any>;
    items?: API.Articles[];
  }

  type List = {
    id?: number;
    name?: string;
    category?: string;
    author?: string;
    summary?: string;
    created_at?: string;
  }

  type Article = {
    article?: API.Article;
  }

  type Author = {
    name?: string;
    avatar?: string;
  }

  type Paginate<T> = {
    data?: T;
    total?: number;
    size?: number;
    page?: number;
  }
}