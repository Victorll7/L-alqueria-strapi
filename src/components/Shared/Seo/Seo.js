import Head from "next/head";

export function Seo(props) {
  const {
    title = "L´ Alqueria - Frutas y Verduras",
    description = "Las mejores frutas y verduras",
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}
