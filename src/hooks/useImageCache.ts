import { useEffect } from "react";
import { useMap } from "react-use";

export default function useImageCache(urls: string[]) {
  const [, { get: getImage, set: setImage }] =
    useMap<Record<string, CanvasImageSource | undefined>>();
  const [, { get: getRequest, set: setRequest }] =
    useMap<Record<string, Promise<CanvasImageSource>>>();

  useEffect(() => {
    for (const url of urls) {
      if (!getRequest(url))
        setRequest(
          url,
          new Promise<CanvasImageSource>((resolve, reject) => {
            const img = document.createElement("img");
            img.addEventListener("load", () => resolve(img));

            img.addEventListener("error", () => reject());
            img.src = url;
          }).then((img) => {
            setImage(url, img);
            return img;
          })
        );
    }
  }, [getRequest, setImage, setRequest, urls]);

  return getImage;
}
