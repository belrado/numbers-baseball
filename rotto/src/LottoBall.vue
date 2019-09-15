<template>
    <div class="lottoBall" :class="backgroundColor" >{{number}}</div>
</template>
<script>
export default {
    name: 'LottoBall',
    props: {
        number: Number
    },
    computed: {
        backgroundColor: function(){
            if(this.number <= 10){
                return 'ball-color1';
            } else if (this.number <= 20){
                return 'ball-color2';
            } else if (this.number <= 30){
                return 'ball-color3';
            } else if (this.number <= 40){
                return 'ball-color4';
            } else {
                return 'ball-color5';
            }
        }
    },
    data() {
        return {}
    }
}
</script>
<style>
.lottoBall{
    display:inline-block;
    border:1px solid #999;
    border-radius:20px;
    width:40px;
    height:40px;
    line-height:40px;
    font-size:20px;
    text-align:center;
}
.ball-color1{background:pink}
.ball-color2{background:red}
.ball-color3{background:orange}
.ball-color4{background:skyblue}
.ball-color5{background:yellow}
</style>
