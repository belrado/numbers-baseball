<template>
    <div id="root">
        <h1>{{title}}</h1>
        <div class="response-box" v-bind:class="status" v-on:click="onClickResponseBox">
            {{message}}
        </div>
        <div class="response-check-result">
            <div>이번시간: {{result[result.length-1] || 0}}ms</div>
            <div v-if="result.length>0"><strong>최고시간: {{bestScore}}</strong></div>
            <div>평균시간: {{average}}ms</div>
            <button @click="onClickReset">Reset</button>
        </div>

    </div>
</template>
<script>
    let startTime = 0;
    let endTime = 0;
    let timer = null;
    export default {
        data () {
            return {
                title: 'Response Check Game',
                status: 'wating',
                message: '클릭하세요.',
                result: []
            }
        },
        computed: {
            average() {
                return this.result.reduce(function(a, c){return a+c;}, 0) / this.result.length || 0
            },
            bestScore() {
                return this.result.reduce(function(p,n){return p>n?n:p;});
            }
        },
        methods: {
            onClickReset: function() {
                this.result = [];
                clearTimeout(timer);
                this.message = '클릭해서 시작 하세요.';
                this.status = 'wating';
            },
            onClickResponseBox: function() {
                console.log(this.status)
                if(this.status === 'wating') {
                    this.status = 'ready';
                    this.message = '오렌지색이 되면 클릭하세요.';
                    timer = setTimeout(() => {
                        this.status = 'now';
                        this.message = '지금 클릭하세요!!';
                        startTime = new Date();
                    }, Math.floor(Math.random() * 1000) + 3000);
                } else if(this.status === 'ready') {
                    clearTimeout(timer);
                    this.status = 'wating';
                    this.message = '너무 빨리 눌렀습니다. 다시 시작하세요.';
                } else {
                    this.status = 'wating';
                    this.message = '클릭해서 시작 하세요.';
                    endTime = new Date();
                    this.result.push(endTime - startTime);
                }
            }
        }
    }
</script>
<style>
#root{padding:100px 0}
#root .response-box{
    width:80%; max-width:500px; margin:0 auto 30px auto; padding:150px 0; cursor:pointer; text-align:center
}
#root .response-box.wating{background:silver}
#root .response-box.ready{background:pink}
#root .response-box.now{background:orange}
#root .response-check-result{text-align:center}
</style>
