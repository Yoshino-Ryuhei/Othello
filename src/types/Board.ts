// 白＝0　黒＝1 何もない=-1
export class Board {
    board: Array<Array<number>>;
    height: number;
    width: number;
    player: number;
    check_line_list: Array<Array<number>>;
    

    constructor(
        height: number,
        width: number,
    ){
        this.height = height;
        this.width = width;
        this.player = 1;
        this.board = Array(height).fill([]).map(_ => Array(width).fill(-1));
        this.board[Math.floor(this.height / 2) - 1][Math.floor(this.width / 2) - 1] = 0;
        this.board[Math.floor(this.height / 2) - 1][Math.floor(this.width / 2)] = 1;
        this.board[Math.floor(this.height / 2)][Math.floor(this.width / 2) - 1] = 1;
        this.board[Math.floor(this.height / 2)][Math.floor(this.width / 2)] = 0;

        this.check_line_list = [
            [0, 1], // 右
            [0, -1], // 左
            [-1, 0], // 上
            [1, 0], // 下
            [-1, -1], // 左上
            [1, -1], // 左下
            [-1, 1], // 右上
            [1, 1], // 右下
        ]
        console.log(`player${this.player}`)
    }

    public cheackColor = (x:number, y:number): number => {
        // 配列の番号から要素を返す
        return this.board[x][y]
    }

    public isPutPosion = (x:number, y:number): boolean => {
        // 現在は何も置いてないならtrue
        if (this.cheackColor(x,y) !== -1) {
            return false
        }
        return true
    }

    public canPutStoneCell = () => {
        let can_put_stone:Array<Array<number>> = [];

        this.board.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                if (this.board[rowIndex][colIndex] !== -1){
                    return
                }

                if (this.checkAllLine(rowIndex,colIndex).length !== 0){
                    can_put_stone = can_put_stone.concat([[rowIndex, colIndex]]);
                }
            })
        })
        return can_put_stone
    }

    public changeTurn = () => {
        // ターンチェンジ
        this.player ? this.player = 0 : this.player = 1
    }

    public checkCell = (x:number,y:number): boolean => {
        // cellがひっくりかえせるか判定
        if(this.board[x][y] !== this.player && this.board[x][y] !== -1){
            return true
        }
        return false
    }

    public checkBoardEdge = (x:number, y:number): boolean => {
        // 端でないならtrue
        if (0 <= x && x < this.height){
            if(0 <= y && y < this.width){
                return true
            }
        }
        return false
    }

    public shouldCheckLine = (check_x:number,check_y:number,vec_x:number,vec_y:number): Array<Array<number>>=> {
        // 方向ベクトルを受け取り、調べないといけない場所を返す
        let list: Array<Array<number>> = [];
        while(this.checkBoardEdge(check_x,check_y)){
            list.push([check_x,check_y])

            check_x += vec_x
            check_y += vec_y
        }
        return list
    }

    public checkLine = (list: Array<Array<number>>):Array<Array<number>>  => {
        // ひっくりかえせる場所を探す

        // 挟まれているか判断するフラグ、1なら挟まれている
        let flag = 0;
        let checked_line_list: Array<Array<number>> = [];

        // 備忘録：　forEachメソッドだと使いにくい場合がある
        // 例：特定の条件で処理を全部スキップしたい場合
        for (let i = 0; i < list.length; i++){
            // 同じ駒なら
            if (this.board[list[i][0]][list[i][1]] === this.player){
                // 端ならリセット
                if (0 === list[i][0] || list[i][0] === (this.height - 1)){
                    if(0 === list[i][1] || list[i][1] === (this.width - 1)){
                        flag = 0;
                    }
                }
                flag = 1;
                break
            }

            // 駒がなかったら
            if (this.board[list[i][0]][list[i][1]] === -1){
                break
            }
            
            // 違う駒なら
            if (this.board[list[i][0]][list[i][1]] !== this.player){
                checked_line_list.push([list[i][0], list[i][1]])
                continue
            }
        }

        if (flag === 0){
            checked_line_list = [];
        }

        return checked_line_list
    }

    public checkAllLine = (x:number,y:number): Array<Array<number>>=> {
        // 引数の場所からひっくりかえせるものがないか探す
        let checked_all_line_list: Array<Array<number>> = [];
        let list: Array<Array<number>> = [];

        // 各方向について調べる
        this.check_line_list.forEach((check_vec:Array<number>) => {
            list = []
            const vec_x = check_vec[0]
            const vec_y = check_vec[1]

            let check_x = x + vec_x
            let check_y = y + vec_y

            // 端まで調べる
            
            list = this.shouldCheckLine(check_x,check_y,vec_x,vec_y);
            
            // 端なら処理を飛ばす
            if(list.length === 0){
                return
            }

            // ひっくりかえせる場所を探す
            checked_all_line_list = checked_all_line_list.concat(this.checkLine(list))
        })
        return checked_all_line_list
    }

    public isFullGame = (): boolean => {
        // ボードが埋まったかどうか判定

        // 終了判定フラグ、0なら終了
        let flag = 0;

        this.board.forEach((row) => {
            row.forEach((col) => {
                if(col === -1){
                    flag = 1;
                    return
                }
            })
        });

        if (flag === 0){
            return true
        }

        return false
    }

    public judgeWinner = (): number => {
        // 勝者を判定

        let white:number = 0;
        let black:number = 0;
        let winner = -1;

        this.board.forEach((row) => {
            row.forEach((col) => {
                if(col === 1){
                    black += 1;
                    return
                }else if(col === 0) {
                    white += 1;
                }
            })
        });

        if (white - black > 0){
            winner = 0;
        }else if(white - black < 0) {
            winner = 1;
        }

        return winner
    }

    public resetGame = () => {
        // ゲームリセットの時の処理

        this.player = 1;
        this.board = Array(this.height).fill([]).map(_ => Array(this.width).fill(-1));
        this.board[Math.floor(this.height / 2) - 1][Math.floor(this.width / 2) - 1] = 0;
        this.board[Math.floor(this.height / 2) - 1][Math.floor(this.width / 2)] = 1;
        this.board[Math.floor(this.height / 2)][Math.floor(this.width / 2) - 1] = 1;
        this.board[Math.floor(this.height / 2)][Math.floor(this.width / 2)] = 0;
    }
}