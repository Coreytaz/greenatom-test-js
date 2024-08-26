import { FC } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  quality?: number
}

export const Image: FC<ImageProps> = ({ src, quality = 100, ...props }) => {
  return <img src={"http://localhost:8055/assets/" + src + `?quality=${quality}`} {...props} />;
};
