// 白＝0　黒＝1 何もない=-1
import { FC } from "react";

import { Stone } from "../atom/Stone";
import { SCell } from "../../styles/SCell";

type Props = {
    color: number;
    x: number;
    y: number;
    onClick: (x:number, y:number) => void;
}

export const Cell: FC<Props> = (props) => {
    const {color, x, y, onClick} = props
    
    return(
        <SCell onClick={() => onClick(x,y)}>
            <Stone color={color}></Stone>
        </SCell>
    );
};