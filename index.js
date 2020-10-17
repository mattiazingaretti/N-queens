/*
* Solving the classical N queens problem. Given a N x N chess board, in how many different
* ways we can place N queens such that they do not threat each other ?
* */





function diagCheck(q1 , q2){
    let i = q1.x;
    let j = q1.y;
    while(i < N && j < N){
        if (q2.x == i && q2.y == j){
            return true;
        }
        i++;
        j++;
    }

    i = q1.x;
    j = q1.y;
    while(i >= 0 && j >= 0){
        if (q2.x == i && q2.y == j){
            return true;
        }
        i--;
        j--;
    }

    i = q1.x;
    j = q1.y;
    while(i < N && j >= 0){
        if (q2.x == i && q2.y == j){
            return true;
        }
        i++;
        j--;
    }

    i = q1.x;
    j = q1.y;
    while(i >= 0 && j < N){
        if (q2.x == i && q2.y == j){
            return true;
        }
        i--;
        j++;
    }

    return false;
}











//Chess dimension and #Queens to place
const N = 5;

/*
* Base 2d Matrix
* 0: No queen in that cell.
* 1: Queen placed in that cell.
* */
let CHESS = initChess([]);


function initChess(arr){
    for(let i=0; i<N; i++) {
        arr[i] = [];
        for(let j=0; j<N; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}


const CONSTRAINTS = {

}

/*
* Base Model.
* */
class Queen{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}



/*
Returns true if the 2 queen placements are valid.
* */
function validityCheck(q1 , q2 ){
    //Not in same position
    let pos_check = q1.x == q2.x && q1.y == q2.y ? true:false;
    //Not in same row
    let row_check = q1.x == q2.x ? true:false;
       //row_check = false; UNCOMMENT FOR LESS STRICTLY RESULT
    //Not in same col
    let col_check = q2.y == q1.y ? true:false;
       //col_check = false; UNCOMMENT FOR LESS STRICTLY RESULT
    //Not in same diag
    let diag_check = diagCheck(q1,q2) ? true:false;

    return row_check || col_check || diag_check || pos_check ? false: true;
}

/*
Returns true if all queens are correctly placed i.e. problem solved.
* */
function completeCheck(i){
    return i == N;
}

/*
* Solution data structure is a JSON of Queens.
* */
let SOLUTION = {};


function select_unassigned_place(){
    return Object.keys(SOLUTION).length +1;
}


function consistent(value,assignment){
    if (Object.keys(assignment).length == 0){
        return true;
    }
    for (let key in assignment){
        if (validityCheck(assignment[key], value) == false){
            return false;
        }
    }
    return true;
}

function backtrack(assignment) {
    if (Object.keys(assignment).length == N) {
        return assignment;
    }
    let key = select_unassigned_place();
    //For value in pos's domain
    for (let i = 0 ; i < N ; i++){
        for (let j = 0 ; j < N ; j++){
            let value = new Queen(i,j);
            if (consistent(value, assignment)){

                assignment[key] = value;
                let result = backtrack(assignment);
                if (result != null){
                    return result;
                }
            }
            delete assignment.key;
        }
    }
    return null;
}



console.log(backtrack(SOLUTION) == null? "No solution available": SOLUTION );



