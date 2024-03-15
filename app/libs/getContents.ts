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
} & MicroCMSDate;

export const getBlogs = async (queries?: MicroCMSQueries) =>
  apiClient.getList<Blog>({ endpoint: "blogs", queries });

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
  });
  return detailData;
};

export const getCategories = (queries?: MicroCMSQueries) =>
  apiClient.getList<Category>({ endpoint: "categories", queries });
