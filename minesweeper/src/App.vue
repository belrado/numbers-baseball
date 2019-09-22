<template lang="html">
    <div>
        <controller-component></controller-component>
        <game-table-component :table-data="tableData"></game-table-component>
        <message-component>{{gameMessage}}</message-component>
    </div>
</template>

<script>
/*
    tableData: Array 지뢰찾기 테이블 가로 * 세로 (2차원 배열),
    rowNum: Number 세로 줄,
    cellNum: Number  가로 줄,
    mineNum: Number  지뢰 수,
    totalClick: Number  총 몇번을 클릭해서 클리어했는지,
    runTime: Number 몇초만에 클리어했는지
    clearTime: null setInterval 담을 변수 = clear하기위해
    gameStart: boolean true 게임시작 false 게임 종료

    Controller
        총 몇번 클릭했는지, 시간을 얼마나 걸렸는지
        row, cell, mine 데이터를 사용자가 입력할수 있게 작업한다.
        기본값은 5, 5, 10 미리 정해준다.
    GameTable
        CODE.normal             -1: 처음시작시 디폴트값
        CODE.mine               -2: 지뢰가 설치된 자리
        CODE.opened             -3: 클릭했을때 디폴트값이면 주변지뢰 숫자를 입력해줌
        CODE.flag               -4: 오른쪽클릭 깃발꽂음 ( 공통: 왼쪽으로 클릭 안됨 )
        CODE.flag_mine          -5: 오른쪽클릭 깃발꽂음 지뢰가 깔려있음
        CODE.question           -6: 오른쪽클릭 물음표 깃발꽂음
        CODE.question_mine      -7: 오른쪽클릭 물음표 깃발꽂음 지뢰가 깔려있음
*/
import { mapState } from 'vuex';
import ControllerComponent from './components/ControllerComponent';
import GameTableComponent from './components/GameTableComponent';
import MessageComponent from './components/MessageComponent';
export default {
    data() {
        return {
            message: ''
        }
    },
    computed: {
        ...mapState([
            'tableData', 'gameStart', 'gameMessage'
        ])
    },
    components: {
        ControllerComponent,
        GameTableComponent,
        MessageComponent
    }
}
</script>

<style lang="css" scoped>
</style>
