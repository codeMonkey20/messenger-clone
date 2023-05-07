import { useRouter } from "next/router"

export default (queryValue: string | number, key: string): boolean => {
  const router = useRouter();
  const queries = router.query;
  return queries[key] === queryValue.toString();
}