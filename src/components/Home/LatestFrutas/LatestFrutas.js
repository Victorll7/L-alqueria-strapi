import { useState, useEffect } from "react";
import { Fruta } from "@/api";
import { GridFrutas } from "@/components/Shared";

const frutaCtrl = new Fruta();

export function LatestFrutas(props) {
  const { title, limit = 9, categoryId = null } = props;
  const [frutas, setFrutas] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await frutaCtrl.getLatestPublished({
          limit,
          categoryId,
        });
        setFrutas(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!frutas) return null;

  return (
    <div>
      <h2>{title}</h2>
      <GridFrutas frutas={frutas} showTitle={true} />
    </div>
  );
}
