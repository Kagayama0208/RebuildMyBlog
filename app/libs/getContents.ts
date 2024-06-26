import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
} from "microcms-js-sdk";
import { apiClient } from "./apiClient";

export type Category = {
  name: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
  };
  tag: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      name: string;
    }
  ];
} & MicroCMSDate;

export type Tag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export const getBlogs = async (queries?: MicroCMSQueries) => {
  return apiClient.getList<Blog>({
    endpoint: "blogs",
    queries,
    customRequestInit: {
      next: {
        revalidate: 60 * 60,
      },
    },
  });
};

export const getAllTags = async () => {
  return apiClient.getList<Tag>({ endpoint: "tags" });
};

export const getBlogCount = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  const data = await apiClient.get({
    endpoint: "blogs",
    queries: { offset: offset, limit: limit },
    customRequestInit: {
      next: {
        revalidate: 60 * 60,
      },
    },
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export const getPostDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await apiClient.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: 60 * 60,
      },
    },
  });
  return detailData;
};

export const getCategories = async (queries?: MicroCMSQueries) =>
  apiClient.getList<Category>({ endpoint: "categories", queries });
