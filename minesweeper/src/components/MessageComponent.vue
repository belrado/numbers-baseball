<template lang="html">
    <div class="message-box">
        <h2 class="title">Game Message</h2>
        <div class="text-box">
            <div v-if="gameMessage">{{gameMessage}}</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        gameMessage: String
    }
}
</script>

<style lang="css" scoped>
.message-box{border:1px solid #999; font-size:14px; margin:0 0 30px 0}
.message-box .title{font-size:1em; padding:15px; margin:0; background:#f4f4f4}
.message-box .text-box{padding:20px}
</style>
