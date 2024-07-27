import { Container } from "semantic-ui-react";
import { BasicLayout } from "@/layouts";
import { Home } from "@/components/Home";
import { BarTrust, Separator, Seo } from "@/components/Shared";

export default function HomePage() {
  return (
    <>
      <Seo />
      <BasicLayout>
        <Separator height={100} />
        <Home.BannerLastFrutaPublished />

        <Separator height={100} />

        <BarTrust />

        <Separator height={100} />

        <Container>
          <Home.LatestFrutas season="Temporada" />
        </Container>

        <Separator height={100} />

        <Home.Contact />
      </BasicLayout>
    </>
  );
}
