import { FC, useState } from "react";
import { Board } from "../../types/Board";
import { Cell } from "../molecules/Cell"
import { SRow } from "../../styles/SRow";
import { PraimaryButton } from "../atom/PraimaryButton";
import { Title } from "../atom/Title";
import { isEqualArray } from "../function/isEqualArray";

// 初期化
// ２よりも大きい数でインスタンス化
const OthelloBoard = new Board(8,8);

// リスト
let check_all_line_list: Array<Array<number>>  = [];
let can_put_stone:Array<Array<number>> = [];

// フラグ
let isPut:boolean = false;
let isGameFinish:boolean = false; 
let isWinner:number = 1;  

export const Field: FC = () => {

    const [othello, setOthello] = useState(OthelloBoard.board)

    const onClickCell = (x: number, y:number) => {
        if (OthelloBoard.isPutPosion(x,y)){

            // クリックした場所に駒がなかったら
            check_all_line_list = [];
            check_all_line_list = OthelloBoard.checkAllLine(x,y);

            // ひっくりかえせなかったら
            if(check_all_line_list.length === 0){
                alert("can`t put on stone there");
                return
            }

            // ひっくりかえす
            for (let i = 0; i < check_all_line_list.length; i++){
                OthelloBoard.board[check_all_line_list[i][0]][check_all_line_list[i][1]] = OthelloBoard.player;
            }

            // ボードを更新
            othello[x][y] = OthelloBoard.player;
            const NewBoard = [...othello];
            setOthello(NewBoard)

            // ターンを変える
            OthelloBoard.changeTurn()

        }else{
            // 置けなかったら
            alert("Can`t put stone.")
        }
    }

    const onClickReset = () => {
        // リセット処理
        OthelloBoard.resetGame();
        isPut = false;
        isGameFinish = false; 
        isWinner = 1;
        setOthello(OthelloBoard.board);
        alert("reset game");
    }

    // ゲーム終了判定
    if(OthelloBoard.isFullGame()){
        alert("game finish");
        isGameFinish = true;
        isWinner = OthelloBoard.judgeWinner();
    }
    
    // 駒を置ける場所を特定
    can_put_stone = OthelloBoard.canPutStoneCell();
    if(can_put_stone.length === 0 && !OthelloBoard.isFullGame()){
        alert("you can't put stone. Turn change.")
        OthelloBoard.changeTurn()

        if(OthelloBoard.canPutStoneCell().length === 0){
            alert("Both player can't put stone. Game finish")
            OthelloBoard.judgeWinner();
            isGameFinish = true;
        }
    }



    return (
        <>
            <Title title={isGameFinish ? (isWinner === -1 ?  ("引き分けです") :
             (isWinner ? ("黒の勝利です") : ("白の勝利です"))) : 
             (OthelloBoard.player ? "黒の番です" : "白の番です")} />
            <div className="container">
                {OthelloBoard.board.map((row,x) => [
                    <SRow>
                        {row.map((column,y) => {
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
        </>
    )
}