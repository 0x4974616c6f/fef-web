import { Card, CardContent } from "@mui/material";
import React from "react";
import { IMoney } from "../../../interfaces/money.interface";
import s from "./styles.module.scss";
import { formatDate } from "../../../utils/formatDate";
import formatSalario from "../../../utils/formatSalary";

type Props = {
  data: IMoney;
};

function Monetario({ data }: Props) {
  return (
    <CardContent className={s.card_item}>
      <div
        className={data.status === "entrada" ? s.status_green : s.status_red}
      ></div>
      <div className={s.side_left}>
        <h3>{data.description}</h3>
        <p>{data.category}</p>
      </div>
      <div>
        <h3>{formatSalario(data.amount)}</h3>
        <p>{formatDate(String(data.date))}</p>
      </div>
    </CardContent>
  );
}

export default Monetario;
