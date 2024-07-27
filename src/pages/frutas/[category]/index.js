import { Category, Fruta } from "@/api";

export { default } from "./category";

export async function getServerSideProps(context) {
  const {
    params: { category },
    query: { page = 1 },
  } = context;

  const categoryCtrl = new Category();
  const responseCategory = await categoryCtrl.getBySlug(category);

  const frutaCtrl = new Fruta();
  const responseFrutas = await frutaCtrl.getFrutasByCategorySlug(
    category,
    page
  );

  return {
    props: {
      category: responseCategory,
      frutas: responseFrutas.data,
      pagination: responseFrutas.meta.pagination,
    },
  };
}
