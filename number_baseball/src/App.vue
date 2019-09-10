<template>
<div id="root">
    <h1>{{title}}</h1>
    <strong>{{numbers}}</strong>
    <div v-if="gameOver">
        <button @click="onReBaseballGame">New Game</button>
    </div>
    <form v-else method="post" @submit="onSubmitEvent">
        <div>
            <input type="text" v-model="value">
        </div>
        <input type="submit" value="입력">
    </form>
    <ul class="baseball-report-list" v-if="tries.length>0">
        <li v-for="val in tries">
            <div>{{val.insert_num}}</div>
            <div>{{val.insert_result}}</div>
        </li>
    </ul>
</div>
</template>

<script>
const setNumbers = function(num_len=4, max_len=9) {
    let number_arr = [];
    let result_num = [];
    for (let i=1; i<=max_len; i++) number_arr.push(i);
    for (let i=0; i<num_len; i++){
        let random_num = Math.floor(Math.random() * (max_len-i));
        result_num.push(number_arr.splice(random_num, 1)[0]);
    }
    return result_num;
}
export default {
    data() {
        return {
            title: 'Number Baseball Game',
            numbers: setNumbers(),
            tries: [],
            result: '',
            value: '',
            gameOver: false
        }
    },
    methods: {
        onSubmitEvent: function(e) {
            e.preventDefault();
            if (this.value === this.numbers.join('')) {
                this.result = '홈런!!';
                this.gameOver = true;
            } else {
                let strike = 0;
                let ball = 0;
                let value_arr = this.value.split('').map(function(n){return parseInt(n)});

                for(let i=0; i<this.numbers.length; i++) {
                    if(this.numbers[i] === value_arr[i]) {
                        strike++;
                    }else if(value_arr.includes(this.numbers[i])){
                        ball++;
                    }
                }
                this.result = strike+' 스트라이크 '+ball+' 볼';

                if(this.tries.length > 3) {
                    this.result += '\n도전회수를 모두 소비했습니다.';
                    this.gameOver = true;
                }
            }
            this.tries.push({
                'insert_num': this.value,
                'insert_result': this.result
            });
        },
        onReBaseballGame: function() {
            this.value = '';
            this.result = '';
            this.numbers = setNumbers();
            this.tries = [];
            this.gameOver = false;
        }
    }
}
</script>

<style>
#root{padding:30px}
.baseball-report-list {}
.baseball-report-list>li{border:1px solid #ddd; padding:20px; margin:0 0 10px 0}
</style>
