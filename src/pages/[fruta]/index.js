import { Fruta } from "@/api";

export { default } from "./fruta";

export async function getServerSideProps(context) {
  const {
    params: { fruta },
  } = context;

  const frutaCtrl = new Fruta();
  const response = await frutaCtrl.getBySlug(fruta);

  return {
    props: {
      fruta: response,
    },
  };
}
