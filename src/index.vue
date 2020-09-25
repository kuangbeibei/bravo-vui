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
    </div>
</template>
<script>
export default {
    data() {
        return {
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