import { BasicLayout } from "@/layouts";
import { Fruta } from "@/components/Fruta";
import { Separator, Seo } from "@/components/Shared";

export default function FrutaPage(props) {
  const { fruta } = props;
  //   const wallpaper = fruta.attributes.wallpaper;

  return (
    <>
      <Seo title={fruta.attributes.title} />
      <BasicLayout>
        {/* <Fruta.HeaderWallpaper image={wallpaper.data.attributes.url} /> */}

        <Separator height={250} />
        <Fruta.Panel frutaId={fruta.id} fruta={fruta.attributes} />

        <Separator height={50} />

        <Fruta.Info fruta={fruta.attributes} />

        <Separator height={30} />

        {/* <Fruta.Media
          video={fruta.attributes.video}
          screenshots={fruta.attributes.screenshots.data}
        /> */}

        <Separator height={50} />
      </BasicLayout>
    </>
  );
}
