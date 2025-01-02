import {Card, CardHeader, CardBody} from "@nextui-org/react";
import Image from "next/image";

export default function RandomCard() {
  return (
    <Card className="w-[600px] rounded-[10px]  bg-customYellow">
      <CardHeader className="p-0">
        <Image
          src="/chinese.jpg"
          alt="Chinese"
          width={0}
          height={0}
          className="w-auto h-auto rounded-none"
        />
      </CardHeader>
      <CardBody className="py-8 px-5">
        <div className="flex flex-row items-end">
            <div className=" w-[400px] mr-3">
                <h1 className="font-serif font-bold text-left text-[30px]">Chinese noodle combo for your next party</h1>
            </div>

            <div>
                <button className="border-[1px] border-black px-4 hover:bg-gray-500 active:bg-slate-200">156 recipes</button>
            </div>
        </div>
        
      </CardBody>
    </Card>
  );
}