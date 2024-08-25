import { FC } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image: FC<ImageProps> = ({ src, ...props }) => {
  return <img src={"http://localhost:8055/assets/" + src} {...props} />;
};
