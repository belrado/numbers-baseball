<template>
    <div>
        <h1>{{title}}</h1>
        <div>
            <strong>당첨결과</strong>
            <ul class="lotto-ball-list" v-if="effectNumbers.numbers.length>0">
                <li v-for="ball in effectNumbers.numbers" :key="ball">
                    <lotto-ball :number="ball"></lotto-ball>
                </li>
            </ul>
        </div>
        <div>
            <strong>보너스번호</strong>
            <div v-if="effectNumbers.bonus !== null">
                <lotto-ball :number="effectNumbers.bonus"></lotto-ball>
            </div>
        </div>
        <div v-if="reStart">
            <button @click="onClickReStart">한번더</button>
        </div>
        <ul v-if="tries.length>0">
            <li v-for="list in tries">
                {{list}}
            </li>
        </ul>
    </div>
</template>
<script>
    import LottoBall from './LottoBall';

    const getLottoNumbers = function() {
        let numbers = Array(45).fill(1).map((n, i) => n+i);
        let shuffle = [];
        while(numbers.length>0) {
            let randNum = Math.floor(Math.random() * numbers.length);
            shuffle.push(numbers.splice(randNum, 1)[0]);
        }
        let lottoNumbers = shuffle.slice(0, 6).sort((a, b) => a-b);
        let bonusNumber = shuffle[shuffle.length-1];
        return {
            numbers: lottoNumbers,
            bonus: bonusNumber
        };
    }
    const LottoNumbers = getLottoNumbers();
    let timmer = [];

    export default {
        components: {
            LottoBall
        },
        data: function() {
            return {
                title: 'Rotto Generator',
                reStart:false,
                origNumbers: LottoNumbers,
                effectNumbers: {
                    numbers:[],
                    bonus:null
                },
                tries: []
            }
        },
        methods: {
            onClickReStart() {
                let LottoNumbers = getLottoNumbers();
                this.reStart = false,
                this.origNumbers = LottoNumbers,
                this.effectNumbers = {
                    numbers:[],
                    bonus:null
                };
                this.setEffectBall();
            },
            setEffectBall() {
                var self = this;
                for(let i=0; i<this.origNumbers.numbers.length; i++) {
                    timmer[i] = setTimeout(function() {
                        self.effectNumbers.numbers.push(
                            self.origNumbers.numbers[i]
                        )
                    }, 500 * (i+1));
                }
                timmer[this.origNumbers.numbers.length] = setTimeout(function() {
                    self.effectNumbers.bonus = self.origNumbers.bonus;
                    self.reStart = true;
                }, 500 * (this.origNumbers.numbers.length+1));
                this.tries.push(
                    this.effectNumbers
                )
            }
        },
        mounted: function() {
            this.setEffectBall();
        },
        beforeDestroy: function() {
            timmer.map((n) => {
                clearTimeout(n);
            })
        }
    }
</script>
<style>
.lotto-ball-list{list-style:none; padding:0; margin:0}
.lotto-ball-list>li {display:inline-block; padding:0 10px 0 0}
</style>
