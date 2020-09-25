import Vue from "vue";

export default Vue.extend({
    data(){
        return {
            states: {
                data: [], // 渲染的数据来源，是对 table 中的 data 过滤排序后的结果
                columns: [],
            }
        }
    }
})
