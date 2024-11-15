import { FC, memo, useState } from "react";
import { Board } from "../../types/Board";
import { Cell } from "../molecules/Cell"
import { SRow } from "../../styles/SRow";
import { PraimaryButton } from "../atom/PraimaryButton";

const OthelloBoard = new Board(8,8);
let check_all_line_list: Array<Array<number>>  = [];
let can_put_stone:Array<Array<number>> = [];
let isPut:boolean = false;

export const Field: FC = () => {

    const [othello, setOthello] = useState(OthelloBoard.board)

    const onClickCell = (x: number, y:number) => {
        if (OthelloBoard.isPutPosion(x,y)){
            check_all_line_list = [];
            console.log("click");
            check_all_line_list = OthelloBoard.checkAllLine(x,y);
            if(check_all_line_list.length === 0){
                alert("can`t put on stone there");
                console.log(OthelloBoard.player);
                return
            }
            for (let i = 0; i < check_all_line_list.length; i++){
                OthelloBoard.board[check_all_line_list[i][0]][check_all_line_list[i][1]] = OthelloBoard.player;
            }
            othello[x][y] = OthelloBoard.player;
            const NewBoard = [...othello];
            setOthello(NewBoard)
        }
        else{
            alert("can`t change turn")
        }

        // ゲーム終了判定
        // if(OthelloBoard.isFullGame()){
        //     alert("game finish");
        //     OthelloBoard.judgeWinner();
        //     return
        // }

        OthelloBoard.changeTurn()
        console.log(OthelloBoard.player)

        can_put_stone = OthelloBoard.canPutStoneCell();
        console.log(`can put stone:${can_put_stone}`);
        
    }

    const onClickReset = () => {
        OthelloBoard.resetGame();
        setOthello(OthelloBoard.board);
        alert("reset game");
    }

    // 配列が等しいか判定
    const isEqualArray = (array1: Array<number>, array2: Array<number>) =>  {
        var i = array1.length;
        if (i !== array2.length) return false;

        while (i--) {
            if (array1[i] !== array2[i]) return false;
        }
        return true;
    };

    // ゲーム終了判定
    if(OthelloBoard.isFullGame()){
        alert("game finish");
        OthelloBoard.judgeWinner();
    }
    
    // 駒を置ける場所を特定
    can_put_stone = OthelloBoard.canPutStoneCell();
    console.log(can_put_stone)
    if(can_put_stone.length === 0 && !OthelloBoard.isFullGame()){
        alert("you can't put stone. Turn change.")
        OthelloBoard.changeTurn()

        if(OthelloBoard.canPutStoneCell().length === 0){
            alert("Both player can't put stone. Game finish")
            OthelloBoard.judgeWinner();
        }
    }



    return (
        <div className="container">
            {OthelloBoard.board.map((row,x) => [
                <SRow>
                    {row.map((column,y) => {
                        console.log(typeof([x,y]));
                        isPut = false;
                        
                        for (let i = 0; i < can_put_stone.length; i++){
                            if(isEqualArray(can_put_stone[i], [x,y])){
                                isPut = true;
                            }
                        }

                        return(<Cell 
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            isPut={isPut} 
                            color={column}
                            onClick={onClickCell}/>)
                    })}
                </SRow>
            ])}
            <PraimaryButton onClick={onClickReset}/>
        </div>
    )
}