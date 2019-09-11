<template>
    <div id="root">
        <h1>{{title}}</h1>
        <div id="computer">
            <div class="rps-text">
                <strong>{{computerCoord}}</strong>
                <p v-if="result">{{userCoord}} - {{result}}</p>
            </div>
        </div>
        <button @click="onClickButton('scissors')">가위</button>
        <button @click="onClickButton('rock')">바위</button>
        <button @click="onClickButton('paper')">보</button>
        <ul v-if="tries.length>0">
            <li v-for="val in tries">
                <p>Computer: {{val.computer}}, user: {{val.user}}</p>
                <strong>{{val.result}}</strong>
            </li>
        </ul>
    </div>
</template>
<script>
    const rpsCoord = {
        scissors: '가위',
        rock: '바위',
        paper: '보'
    };
    const rpsScore = {
        scissors: -1,
        rock: 0,
        paper: 1
    };
    const getComputerTextCoord = function(select) {
        return Object.entries(rpsCoord).find((v)=>{return v[1]===select;})[0];
    }
    const getUserTextCoord = function(select) {
        return Object.entries(rpsCoord).find((v)=>{return v[0]===select;})[1];
    }
    let interval = null;

    export default {
        data() {
            return {
                title: 'Rock Paper Scissors Game',
                computerCoord: rpsCoord.scissors,
                userCoord: '',
                tries: [],
                result: ''
            }
        },
        computed: {

        },
        methods: {
            changeHand: function() {
                let num = 1;
                let obj = Object.entries(rpsCoord);
                interval = setInterval(() => {
                    if(obj.length <= num) num = 0;
                    this.computerCoord = obj[num][1];
                    num++;
                }, 100);
            },
            onClickButton: function(select) {
                clearInterval(interval);
                let userRpsScore = rpsScore[select];
                let computerRpsScore = rpsScore[getComputerTextCoord(this.computerCoord)];
                let diff = userRpsScore - computerRpsScore;
                this.userCoord = getUserTextCoord(select);
                if(diff === 0) {
                    this.result = '비겼습니다.';
                } else if ([1, -2].includes(diff)) {
                    this.result = '이겼습니다.';
                } else {
                    this.result = '졌습니다.';
                }
                this.tries.push({
                    computer: this.computerCoord,
                    user: this.userCoord,
                    result: this.result
                });
                console.log(this.tries);
                setTimeout(()=>{
                    this.changeHand();
                    this.result='';
                }, 1000);
            }
        },
        beforeCreate() {
            console.log('beforeCreated');
        },
        created() {
            console.log('created');
        },
        beforeMount() {
            console.log('beforeMounted');
        },
        mounted() {
            console.log('mounted');
            this.changeHand();
        },
        beforeUpdate() {
            //console.log('beforeUpdated');
        },
        updated() {
            //console.log('updated');
        },
        beforeDestory() {
            console.log('beforeDestoryed');
            clearInterval(interval);
        },
        destoryed() {
            console.log('destoryed');
        }
    };
</script>
<style>
    #root {
        width:92%; max-width:500px; margin:0 auto
    }
    #computer {
        position:relative; width:100%; height:300px; margin:0 0 20px 0; background:pink
    }
    #computer .rps-text{position:absolute; left:0; top:50%; width:100%; transform:translateY(-50%); font-size:2.5em; line-height:1.1em; text-align:center; text-align:center;}
</style>
