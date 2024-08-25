import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Image,
} from "@/shared/ui";
import { FC } from "react";

interface CardPhotoProps extends React.HTMLAttributes<HTMLDivElement> {
  img: string;
  hiddenContent?: boolean;
  count?: string | number;
}

export const CardPhoto: FC<CardPhotoProps> = ({
  hiddenContent = false,
  img,
  title,
  count,
  ...props
}) => {
  return (
    <Card
      className="flex flex-col cursor-pointer transition-all hover:border-gray-600"
      {...props}
    >
      <CardHeader className="flex-grow">
        <div className="flex flex-col flex-grow overflow-hidden rounded-lg h-full">
          <Image
            className="flex-grow h-60 w-auto object-cover transition-all hover:scale-105"
            src={img}
          />
        </div>
      </CardHeader>
      {!hiddenContent && (
        <CardContent className="flex flex-col">
          {title && <CardTitle className="text-blue-500">{title}</CardTitle>}
          {count && (
            <CardDescription className="text-gray-500">
              {count} фото
            </CardDescription>
          )}
        </CardContent>
      )}
    </Card>
  );
};
