import { FC, memo, useState } from "react";
import { Board } from "../../types/Board";
import { Cell } from "../molecules/Cell"
import { SRow } from "../../styles/SRow";

const OthelloBoard = new Board(8,8);

export const Field: FC = memo(() => {

    const [othello, setOthello] = useState(OthelloBoard.board)

    const onClickCell = (x: number, y:number) => {
        if (OthelloBoard.isPutPosion(x,y)){
            console.log("click")
            othello[x][y] = OthelloBoard.player
            OthelloBoard.checkLine(x,y)
            const NewBoard = [...othello]
            setOthello(NewBoard)
        }
        else{
            alert("can`t change turn")
        }
        OthelloBoard.changeTurn()
    }

    return (
        <div className="container">
            {OthelloBoard.board.map((row,x) => [
                <SRow>
                    {row.map((column,y) => {
                        return(<Cell 
                            key={`${x}-${y}`}
                            x={x}
                            y={y} 
                            color={column}
                            onClick={onClickCell}/>)
                    })}
                </SRow>
            ])}
        </div>
    )
})

const isPutPosion = (player:number) => {

} 