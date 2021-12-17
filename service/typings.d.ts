declare namespace API {

  type Site = {
    name?: string;
    url?: string;
    analyse?: string;
    copyright?: string;
    icp?: string;
    police?: string;
    signature?: string;
    close?: number;
  }

  type Linkers = {
    name?: string;
    logo?: string;
    uri?: string;
  }

  type Categories = {
    id?: number;
    is_page?: string;
    name?: string;
    uri?: string;
    children?: Categories[];
  }

  type Category = {
    id?: number;
    name?: string;
    picture?: string;
    title?: string;
    keyword?: string;
    description?: string;
    is_page?: number;
    is_comment?: number;
    page?: string;
  }

  type Articles = {
    id?: number;
    name?: string;
    category?: string;
    author?: string;
    summary?: string;
    created_at?: string;
  }

  type Article = {
    id?: number;
    name?: string;
    category?: string;
    author_name?: string;
    author_avatar?: string;
    author_signature?: string;
    picture?: string;
    title?: string;
    keyword?: string;
    description?: string;
    source_name?: string;
    source_uri?: string;
    content?: string;
    is_comment?: number;
    created_at?: string;
  }

  type Response<T> = {
    code?: number;
    data?: T;
    message?: string;
  }

  type Paginate<T> = {
    code?: number;
    data?: {
      data?: T;
      total?: number;
      size?: number;
      page?: number;
    };
    message?: string;
  }

  type Swr<T> = {
    data?: T;
    loading?: boolean;
    error?: any;
  }
}