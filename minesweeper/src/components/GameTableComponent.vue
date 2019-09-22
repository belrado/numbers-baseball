<template lang="html">
    <div class="game-table-box">
        <table v-if="tableData.length > 0" class="tableA">
            <tr v-for="(rowData, rowIndex) in tableData">
                <td v-for="(cellData, cellIndex) in rowData"
                :class="setCellClass(rowIndex, cellIndex)"
                @click="onClickCell(rowIndex, cellIndex)"
                @contextmenu.prevent="oonRightClickCell(rowIndex, cellIndex)">
                    {{setCellText(rowIndex, cellIndex)}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { GAMECODE } from '../store';

export default {
    props: {
        tableData: Array
    },
    computed: {
        ...mapState([
            'gameStart'
        ]),
        setCellClass (state) {
            return (row, cell) => {
                switch(this.$store.state.tableData[row][cell]) {
                    case GAMECODE.NORMAL :
                    case GAMECODE.MINE :
                        return 'normal-cell';
                    case GAMECODE.OPENED :
                        return 'opened-cell';
                    case GAMECODE.FLAG :
                    case GAMECODE.FLAG_MINE :
                        return 'flag-cell';
                    case GAMECODE.QUESTION :
                    case GAMECODE.QUESTION_MINE :
                        return 'question-cell'
                }
            }
        },
        setCellText (state) {
            return (row, cell) => {
                switch(this.$store.state.tableData[row][cell]) {
                    case GAMECODE.NORMAL :
                        return '';
                    case GAMECODE.MINE :
                        return '';
                    case GAMECODE.FLAG :
                    case GAMECODE.FLAG_MINE :
                        return '!';
                    case GAMECODE.QUESTION :
                    case GAMECODE.QUESTION_MINE :
                        return '?';
                    case GAMECODE.GAMEOVER :
                        return '펑!';
                    default :
                        return this.$store.state.tableData[row][cell] || '';
                }
            }
        }
    },
    methods: {
        ...mapMutations([
            'OPENCELL', 'FLAGCELL', 'QUESTIONCELL', 'NORMALCELL'
        ]),
        onClickCell(row, cell) {
            this.OPENCELL({ row: parseInt(row), cell: parseInt(cell) });
        },
        oonRightClickCell(row, cell) {
            switch(this.$store.state.tableData[row][cell]) {
                case GAMECODE.NORMAL :
                case GAMECODE.MINE :
                    this.FLAGCELL({ row: parseInt(row), cell: parseInt(cell) });
                    return;
                case GAMECODE.FLAG :
                case GAMECODE.FLAG_MINE :
                    this.QUESTIONCELL({ row: parseInt(row), cell: parseInt(cell) });
                    return;
                case GAMECODE.QUESTION :
                case GAMECODE.QUESTION_MINE :
                    this.NORMALCELL({ row: parseInt(row), cell: parseInt(cell) });
                    return;
            }
        }
    }
}
</script>

<style lang="css" scoped>
.game-table-box{margin:0 0 30px 0}
.game-table-box .tableA{margin:0 auto; border-collapse:collapse; border-spacing:0 none; border:1px solid #999; overflow:hidden}
.game-table-box .tableA td{width:45px; height:45px; border:1px solid #999; vertical-align:middle; text-align:center; cursor:pointer; overflow:hidden}
.game-table-box .tableA .normal-cell{background:#f4f4f4}
.game-table-box .tableA .opened-cell{background:#fff}
.game-table-box .tableA .flag-cell{background:pink}
.game-table-box .tableA .question-cell{background:yellow}
</style>
