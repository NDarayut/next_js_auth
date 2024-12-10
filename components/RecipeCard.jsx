import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default function RecipeCard({src, title}) {
  return (
    <Card className="w-[300px] h-[470px] rounded-[5px]  bg-customYellow">
      <CardHeader className="p-0">
        <Image  
                className="rounded-none"
                src={src}
                alt={title}
            />
      </CardHeader>
      
      <CardBody>
        <h1 className="font-sans font-bold text-left text-[18px]">{title}</h1>
      </CardBody>
    </Card>
  );
}
