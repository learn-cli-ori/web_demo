<template>
    <section>
        <button @click="test" class="fs-10">接口测试</button>
        <span>数据：</span>{{data}}
    </section>
</template>
<script>
import { test, test_post } from '@/api/test'
export default {
    data () {
        return {
            testData: [],
            msg: '',
            data: null
        }
    },

    methods: {
        async test () {
            let t = await test_post({ sex: this.msg });
            this.data = t.data
            console.log(t);
        }

    }
}
</script>

<style lang="scss" scoped>
</style>