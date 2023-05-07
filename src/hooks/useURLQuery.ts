import { useRouter } from "next/router";

export default function useURLQuery(
  queryValue: string | number,
  key: string
): boolean {
  const router = useRouter();
  const queries = router.query;
  return queries[key] === queryValue.toString();
}
