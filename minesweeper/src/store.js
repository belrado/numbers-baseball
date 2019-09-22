/*
    tableData: Array 지뢰찾기 테이블 가로 * 세로 (2차원 배열),
    rowNum: Number 세로 줄,
    cellNum: Number  가로 줄,
    mineNum: Number  지뢰 수,
    totalClick: Number  총 몇번을 클릭해서 클리어했는지,
    runTime: Number 몇초만에 클리어했는지
    clearTime: null setInterval 담을 변수 = clear하기위해
    gameStart: boolean true 게임시작 false 게임 종료

    CODE.normal             -1: 처음시작시 디폴트값
    CODE.mine               -2: 지뢰가 설치된 자리
    CODE.opened             -3: 클릭했을때 디폴트값이면 주변지뢰 숫자를 입력해줌
    CODE.flag               -4: 오른쪽클릭 깃발꽂음 ( 공통: 왼쪽으로 클릭 안됨 )
    CODE.flag_mine          -5: 오른쪽클릭 깃발꽂음 지뢰가 깔려있음
    CODE.question           -6: 오른쪽클릭 물음표 깃발꽂음
    CODE.question_mine      -7: 오른쪽클릭 물음표 깃발꽂음 지뢰가 깔려있음
*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const GAMESTART = 'GAMESTART';
export const OPENCELL = 'OPENCELL';
export const FLAGCELL = 'FLAGCELL';
export const QUESTIONCELL = 'QUESTIONCELL';
export const NORMALCELL = 'NORMALCELL';
export const GAMECODE = {
    NORMAL             : -1,
    MINE               : -2,
    OPENED             : 0,
    FLAG               : -4,
    FLAG_MINE          : -5,
    QUESTION           : -6,
    QUESTION_MINE      : -7,
    GAMEOVER           : -8
};
const plantMine = (row, cell, mine) => {
    let table = Array(row).fill('');
    table.map((r, i) => {
        table[i] = Array(cell).fill(GAMECODE.NORMAL);
    });
    let total = Array(row * cell).fill('').map((n, i) => i);
    let shuffle = [];
    while(total.length > row * cell - mine) {
        shuffle.push(total.splice(Math.floor(Math.random() * (total.length)), 1)[0]);
    }
    shuffle.forEach((n, i) => {
        let vertical    = Math.floor(n / cell);
        let horizontal  = n % cell;
        table[vertical][horizontal] = GAMECODE.MINE;
    })
    return table
};

export default new Vuex.Store({
    state: {
        tableData: [],
        rowNum: 0,
        cellNum: 0,
        mineNum: 0,
        totalClick: 0,
        runTime: 0,
        clearTime: null,
        gameStart: false,
        gameMessage: 'Row / Cell / Mine 입력 후 시작버튼을 클릭하세요.',
        findMine:0
    },
    getters: {
    },
    mutations: {
        [GAMESTART] (state, {row, cell, mine}) {
            state.rowNum = row;
            state.cellNum = cell;
            state.mineNum = mine;
            state.findMine = 0;
            state.tableData = plantMine(row, cell, mine);
            state.gameStart = true;
            state.gameMessage = state.rowNum + ' * ' + state.cellNum + '칸 지뢰 ' + state.mineNum + '개';
        },
        [OPENCELL] (state, {row, cell}) {
            if(! state.gameStart) return;
            if(state.tableData[row][cell] === GAMECODE.FLAG
                || state.tableData[row][cell] === GAMECODE.FLAG_MINE
                || state.tableData[row][cell] === GAMECODE.QUESTION
                || state.tableData[row][cell] === GAMECODE.QUESTION_MINE) {
                return false;
            }
            if (state.tableData[row][cell] === GAMECODE.MINE) {
                state.tableData.forEach((row, rIdx) => {
                    row.forEach((cell, cIdx) => {
                        if(cell === GAMECODE.MINE || cell === GAMECODE.FLAG_MINE || cell === GAMECODE.QUESTION_MINE) {
                            Vue.set(state.tableData[rIdx], cIdx, GAMECODE.GAMEOVER);
                            state.gameStart = false;
                            state.gameMessage = state.rowNum + ' * ' + state.cellNum + '칸 지뢰 ' + state.mineNum + '개 - 찾은 지뢰 '+state.findMine + '개';
                        }
                    });
                });
            } else {
                const checked = [];
                function checkAroundCell(row, cell) {
                    if (row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length) {
                        return;
                    }
                    if ([GAMECODE.MINE, GAMECODE.FLAG_MINE, GAMECODE.QUESTION_MINE, GAMECODE.GAMEOVER].includes(state.tableData[row][cell])) {
                        return;
                    }
                    if (checked.includes(row + '/' + cell)) {
                        return;
                    } else {
                        checked.push(row + '/' + cell);
                    }
                    let around = [];
                    if (state.tableData[row-1]) {
                        around = around.concat([ state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1] ]);
                    }
                    around = around.concat([ state.tableData[row][cell-1], state.tableData[row][cell+1] ]);
                    if (state.tableData[row+1]) {
                        around = around.concat([ state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1] ]);
                    }
                    let aroundMine = around.filter( (n) => {
                        return [GAMECODE.MINE, GAMECODE.FLAG_MINE, GAMECODE.QUESTION_MINE].includes(n);
                    });

                    if(aroundMine.length === 0 && row > -1) {
                        const near = [];
                        if(row -1 > -1) {
                            near.push([row-1, cell-1]);
                            near.push([row-1, cell]);
                            near.push([row-1, cell+1]);
                        }
                        near.push([row, cell-1]);
                        near.push([row, cell+1]);
                        if(row+1 < state.tableData.length) {
                            near.push([row+1, cell-1]);
                            near.push([row+1, cell]);
                            near.push([row+1, cell+1]);
                        }
                        near.forEach((n) => {
                            if(state.tableData[n[0]][n[1]] !== GAMECODE.MINE && state.tableData[n[0]][n[1]] !== GAMECODE.GAMEOVER) {
                                checkAroundCell(n[0], n[1]);
                            }
                        });
                    }
                    Vue.set(state.tableData[row], cell, aroundMine.length);
                }
                checkAroundCell(row, cell);
            }
        },
        [FLAGCELL] (state, {row, cell}) {
            if(! state.gameStart) return;
            if (state.tableData[row][cell] === GAMECODE.MINE) {
                Vue.set(state.tableData[row], cell, GAMECODE.FLAG_MINE);
                state.findMine++;
            }else {
                Vue.set(state.tableData[row], cell, GAMECODE.FLAG);
            }
        },
        [QUESTIONCELL] (state, {row, cell}) {
            if(! state.gameStart) return;
            if (state.tableData[row][cell] === GAMECODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, GAMECODE.QUESTION_MINE);
                state.findMine--;
            }else {
                Vue.set(state.tableData[row], cell, GAMECODE.QUESTION);
            }
        },
        [NORMALCELL] (state, {row, cell}) {
            if(! state.gameStart) return;
            if (state.tableData[row][cell] === GAMECODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, GAMECODE.MINE);
            }else {
                Vue.set(state.tableData[row], cell, GAMECODE.NORMAL);
            }
        },
    },
    actions: {

    }
});
