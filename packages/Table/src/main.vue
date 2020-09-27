<template>
    <div 
        class="bravo-table"
        ref="tableWrapper"
    >
        <div ref="headerWrapper">
            <table-header
                :store="store"
            />
        </div>
        <div ref="bodyWrapper">
            <table-body
                :store="store"
            />
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/babel">
import "../style/table.scss";
import TableHeader from './table-header';
import TableBody from "./table-body";
import {createStore, mapStates} from "./store/helper";
let tableIdSeed = 1;

export default {
    name: 'BravoTable',
    components: {
        TableHeader,
        TableBody
    },
    props: {
        stripe: Boolean,
        data: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        data: {
            immediate: true,
            handler(value) {
                this.store.commit('setData', value);
            }
        }
    },
    computed: {
        tableWrapper() {
            return this.$refs.tableWrapper
        },
        winWidth() {
            return window.innerWidth
        },
        ...mapStates({
            columns: 'columns'
        })
    },
    data(){
        this.store = createStore(this);
        return {
            tableWidth: '100%'
        }
    },
    created(){
        this.tableId = 'bravo-table_' + tableIdSeed++;
    },
    mounted(){
        this.doLayout();
    },
    methods: {
        doLayout() {
            let columnsLength = this.columns.length;
            this.tableWidth = this.computeTableWrapperWidth();
            let columnWidthDefault = parseFloat(this.tableWidth/columnsLength).toFixed(1);
            let columns = this.columns.map(column => {
                if (!column.width) {
                    column.width = columnWidthDefault
                }
                return column
            });
            this.store.commit('updateColumns', columns);
        },
        computeTableWrapperWidth() {
            let parent = this.$refs.tableWrapper.offsetParent;
            console.log('this.$refs.tableWrapper,', parent);
            let offsetLeft = 0;
            let offsetRight = 0;
            while (parent) {
                offsetLeft += parent.offsetLeft;
                parent = parent.offsetParent;
            };
            return this.winWidth - offsetLeft - offsetRight
        },
    },
    beforeDestroy() {

    }
}
</script>