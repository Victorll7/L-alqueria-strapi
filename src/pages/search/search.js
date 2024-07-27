import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import { GridFrutas, NoResult, Separator } from "@/components/Shared";

export default function SearchPage(props) {
  const { frutas, searchText } = props;
  const hasResult = size(frutas) > 0;

  useEffect(() => {
    document.getElementById("search-frutas").focus();
  }, []);

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />

          <h2>Buscando: {searchText}</h2>
          {hasResult ? (
            <>
              <GridFrutas frutas={frutas} />
              <Separator height={30} />
            </>
          ) : (
            <NoResult text="No se han encontrado resultados" />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
