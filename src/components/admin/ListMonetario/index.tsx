import React from "react";
import { IMoney } from "../../../interfaces/money.interface";
import Monetario from "../Monetario";

type Props = {
  data: IMoney[];
};

function ListMonetario({ data }: Props) {
  return (
    <>
      {data.map((item) => (
        <Monetario key={item._id} data={item} />
      ))}
    </>
  );
}

export default ListMonetario;
