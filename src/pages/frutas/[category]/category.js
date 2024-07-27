import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridFrutas,
  Separator,
  NoResult,
  Seo,
  // Pagination,
} from "@/components/Shared";

export default function CategoryPage(props) {
  const { frutas, category, pagination } = props;
  const hasProducts = size(frutas) > 0;

  return (
    <>
      <Seo title={`${category.attributes.title}`} />
      <BasicLayout relative>
        <Container>
          <Separator height={100} />

          <h2>{category.attributes.title}</h2>

          {hasProducts ? (
            <>
              <GridFrutas frutas={frutas} showTitle={false} />
              <Separator height={30} />
              {/* <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              /> */}
            </>
          ) : (
            <NoResult
              text={`La categoria ${category.attributes.title} aun no tiene productos`}
            />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
