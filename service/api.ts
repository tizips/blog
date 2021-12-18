import Constants from 'utils/constants';
import { Props } from './props';
import { $axios } from './axios';

export const doSite = async () => {
  let data: API.Site | undefined = undefined;
  const res = await $axios().get('/system/site');
  if (res.data) {
    const response: API.Response<API.Site> = res.data;
    if (response.code == Constants.Success) data = response.data;
  }
  return data;
};

export const doLinker = async () => {
  let data: API.Linkers[] | undefined = undefined;
  const res = await $axios().get('/links');
  if (res.data) {
    const response: API.Response<API.Linkers[]> = res.data;
    if (response.code == Constants.Success) data = response.data;
  }
  return data;
};

export const doCategories = async () => {
  let data: API.Categories[] | undefined = undefined;
  const res = await $axios().get('/categories');
  if (res.data) {
    const response: API.Response<API.Categories[]> = res.data;
    if (response.code == Constants.Success) data = response.data;
  }
  return data;
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