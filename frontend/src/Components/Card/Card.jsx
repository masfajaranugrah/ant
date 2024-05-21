import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default function CardInformation(props) {
  return (
    <Card className="py-4 bg-[#2f3185]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <h4 className="font-bold text-white text-3xl text-center">Nomer Antrian</h4>
      </CardHeader>
      <hr/>
      <CardBody className="overflow-visible py-2">
    <p className="w-[400px] text-white py-4 text-center font-bold text-6xl">{props.antrian}</p>
      </CardBody>
      <hr />
      <p className="text-center text-[#f5c13a]">lorem more</p>
    </Card>
  );
}
