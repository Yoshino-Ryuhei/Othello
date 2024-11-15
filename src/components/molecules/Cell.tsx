// 白＝0　黒＝1 何もない=-1
import { FC } from "react";

import { Stone } from "../atom/Stone";
import { SCell } from "../../styles/SCell";
import { SPutCell } from "../../styles/SPutCell";

type Props = {
    color: number;
    x: number;
    y: number;
    isPut: boolean;
    onClick: (x:number, y:number) => void;
}

export const Cell: FC<Props> = (props) => {
    const {color, x, y, isPut, onClick} = props
    
    return(
        isPut ? (
            <SPutCell onClick={() => onClick(x,y)}>
                <Stone color={color}></Stone>
            </SPutCell>)
        :
        (
            <SCell onClick={() => onClick(x,y)}>
                <Stone color={color}></Stone>
            </SCell>)
    )           
};