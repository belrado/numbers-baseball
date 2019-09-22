<template lang="html">
    <div class="controller-box">
        <div>
            <input type="text" v-model="row" id="">
            <input type="text" v-model="cell" id="">
            <input type="text" v-model="mine" id="">
        </div>
        <div>
            <button @click="onClickStartGame">게임시작</button>
        </div>
    </div>
</template>

<script>
import {GAMESTART} from '../store';
import MessageComponent from './MessageComponent';

export default {
    data() {
        return {
            row: 10,
            cell: 10,
            mine: 15
        }
    },
    methods: {
        onClickStartGame() {
            this.$store.commit(GAMESTART, {
                row: parseInt(this.row),
                cell: parseInt(this.cell),
                mine: parseInt(this.mine)
            });
        }
    }
}
</script>

<style lang="css" scoped>
.controller-box{border:1px solid #999; margin:0 0 30px 0; padding:15px}
</style>
