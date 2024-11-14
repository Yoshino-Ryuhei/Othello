// 白＝0　黒＝1 何もない=-1
type checked_array = {
    array:Array<void | Array<void | Array<number>>>;
}

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
        this.board[3][3] = 0;
        this.board[3][4] = 1;
        this.board[4][3] = 1;
        this.board[4][4] = 0;

        this.check_line_list = [
            [0, 1], // 右
            [0, -1], // 左
            [-1, 0], // 上
            [1, 0], // 下
            [-1, -1], // 左上
            [1, 1], // 左下
            [-1, 1], // 右上
            [1, -1], // 右下
        ]
        console.log(this.player)
    }

    public cheackColor = (x:number, y:number): number => {
        // 配列の番号から要素を返す
        return this.board[x][y]
    }

    public isPutPosion = (x:number, y:number): boolean => {
        // 現在は何も置いてないならtrue
        if (this.cheackColor(x,y) !== -1) {
            return false
        }else {
            return true
        }
    }

    public changeTurn = () => {
        // ターンチェンジ
        this.player ? this.player = 0 : this.player = 1
        console.log(this.player)
    }

    public checkCell = (x:number,y:number): Array<number> | void => {
        // cellがひっくりかえせるか判定
        let checked_cell;
        if(this.board[x][y] !== this.player){
            checked_cell = [x,y]
        }
        console.log(checked_cell);
        return checked_cell
    }

    public checkBoardEdge = (x:number, y:number): boolean => {
        if (0 <= x && x < this.height){
            if(0 <= y && y < this.width){
                return true
            }
        }
        return false
    } 

    public checkLine = (x:number,y:number): Array<void | Array<number>> => {
        // 引数で指定した方向にひっくりかえせるものがないか探す
        let checked_cell_list = [] as Array<void | Array<number>>;
        this.check_line_list.forEach((check_vec:Array<number>) => {
            const vec_x = check_vec[0]
            const vec_y = check_vec[1]

            let check_x = x + vec_x
            let check_y = y + vec_y

            for (;this.checkBoardEdge(check_x,check_y);){
                if (this.checkCell(check_x,check_y)){
                    checked_cell_list.push(
                        this.checkCell(check_x,check_y))
                }
                check_x += vec_x
                check_y += vec_y
        }
        })
        console.log(checked_cell_list)
        return checked_cell_list
    }
}