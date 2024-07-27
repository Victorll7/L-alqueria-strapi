import { Fruta } from "@/api";

export { default } from "./search";

export async function getServerSideProps(context) {
  const {
    query: { s, page = 1 },
  } = context;

  const frutaCtrl = new Fruta();
  const response = await frutaCtrl.searchFrutas(s, page);

  return {
    props: {
      frutas: response.data,
      pagination: response.meta.pagination,
      searchText: s,
    },
  };
}
