// 白＝0　黒＝1 何もない=-1
import { FC } from "react";
import { SWhiteStone } from "../../styles/SWhiteStone";
import { SBlackStone } from "../../styles/SBlackStone";
import { SCell } from "../../styles/SCell";

type Props = {
    color: number;
}

export const Stone: FC<Props> = (props) => {
    const {color} = props
    let stone = null;
    if (color === 1){
        stone = <SBlackStone/>
    }else if(color === 0){
        stone = <SWhiteStone />
    }
    return(
        stone
    );
};