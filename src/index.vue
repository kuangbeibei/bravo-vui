<template>
    <div>
        <bravo-table :data="tableData">
            <bravo-table-column
                prop="name"
                label="名字"
            />
            <bravo-table-column
                prop="age"
                label="年龄"
                width=120
            />
        </bravo-table>

        <!-- <kk-hello 
            :name="name"
        />
        <kk-level :t="1">标题</kk-level>
        <kk-level :t="2">标题</kk-level>
        <kk-level :t="3">标题</kk-level>
        <kk-level :t="4">标题</kk-level>
        <kk-level :t="5">标题</kk-level>
        <kk-level :t="6">标题</kk-level> -->

    </div>
</template>
<script>
import KkHello from "../packages/Hello/src/main.vue";
import KkLevel from "../packages/Level/src/Level.js";
import BravoTable from "../packages/Table/src/main.vue";
import BravoTableColumn from "../packages/Table/src/table-column.js";

export default {
    components: {
        KkHello,
        KkLevel,
        BravoTable,
        BravoTableColumn
    },
    data() {
        return {
            name: '我是kk-hello组件',
            tableData: [
                {
                    name: 'laobai',
                    age: 7
                },
                {
                    name: 'kuangkuang',
                    age: 32
                },
            ]
        }
    },
    methods: {

    }
}
</script>