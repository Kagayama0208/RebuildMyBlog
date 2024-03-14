import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (serviceDomain === undefined)
  throw Error(".envファイルに`NEXT_PUBLIC_SERVICE_ID`を設定してください。");
if (apiKey === undefined)
  throw Error(".envファイルに`NEXT_PUBLIC_API_KEY`を設定してください。");

export const apiClient = createClient({
  serviceDomain,
  apiKey,
});
