import useSWR from 'swr';
import { $axios } from './axios';
import Constants from 'utils/constants';

export const doSite = () => {

  const fetcher = (url: string) => $axios().get(url).then(res => res.data);
  const { data, error } = useSWR('/system/site', fetcher);

  const response: API.Swr<API.Site> = {
    data: data && data.code == Constants.Success ? data.data : undefined,
    error,
    loading: !data && !error,
  };

  return response;
};

export const doLinker = () => {

  const fetcher = (url: string) => $axios().get(url).then(res => res.data);
  const { data, error } = useSWR('/links', fetcher);

  const response: API.Swr<API.Linkers[]> = {
    data: data && data.code == Constants.Success ? data.data : undefined,
    error,
    loading: !data && !error,
  };

  return response;
};

export const doCategories = () => {

  const fetcher = (url: string) => $axios().get(url).then(res => res.data);
  const { data, error } = useSWR('/categories', fetcher);

  const response: API.Swr<API.Categories[]> = {
    data: data && data.code == Constants.Success ? data.data : undefined,
    error,
    loading: !data && !error,
  };

  return response;
};

export const doCategory = async (uri: string) => {
  let data: API.Category | undefined = undefined;
  const res = await $axios().get(`/categories/${uri}`);
  if (res.data) {
    const response: API.Response<API.Category> = res.data;
    if (response.code == Constants.Success) data = response.data;
  }
  return data;
};

export const doArticles = async ({ uri, page }: { uri?: string; page?: number }) => {

  let data: Props.Paginate<API.Articles[]> = {};
  const res = await $axios().get(`/articles`, { params: { uri, page } });

  if (res.data) {

    const response: API.Paginate<API.Articles[]> = res.data;

    if (response.code == Constants.Success) {
      data = {
        size: response.data?.size,
        page: response.data?.page,
        total: response.data?.total,
        data: response.data?.data,
      };
    }
  }

  return data;
};

export const doSearch = async ({ keyword, page }: { keyword?: string; page?: number }) => {

  let data: Props.Paginate<API.Articles[]> = {};
  const res = await $axios().get(`/article/search`, { params: { keyword, page } });

  if (res.data) {

    const response: API.Paginate<API.Articles[]> = res.data;

    if (response.code == Constants.Success) {
      data = {
        size: response.data?.size,
        page: response.data?.page,
        total: response.data?.total,
        data: response.data?.data,
      };
    }
  }

  return data;
};

export const doArticle = async (id: number) => {
  let data: API.Article | undefined = undefined;
  const res = await $axios().get(`/articles/${id}`);
  if (res.data) {
    const response: API.Response<API.Article> = res.data;
    if (response.code == Constants.Success) data = response.data;
  }
  return data;
};