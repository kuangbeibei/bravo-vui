<template>
    <div 
        class="bravo-table"
        ref="tableWrapper"
        :class="[{
            'bravo-table--striped': stripe,
        }]"
    >
        <div class="table-header-wrapper" ref="headerWrapper">
            <table-header
                :store="store"
            />
        </div>
        <div class="table-body-wrapper" ref="bodyWrapper">
            <table-body
                :store="store"
            />
            <div class="bravo-table__empty-text" v-if="!data || data.length === 0">
                <span>
                    <slot name="empty">{{emptyText || '暂无数据'}}</slot>
                </span>
            </div>
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
        },
        emptyText: String,
        stripe: Boolean,
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
            columns: 'columns',
            expandedRows: 'expandedRows'
        })
    },
    data(){
        this.store = createStore(this);
        return {
            tableWidth: 0
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
            // TODO 优化
            setTimeout(() => {
                let columnsLength = this.columns.length;
                this.tableWidth = this.$refs.tableWrapper.offsetWidth;
                let columnWidthDefault = parseFloat(this.tableWidth/columnsLength).toFixed(1) - 8;
                let columns = this.columns.map(column => {
                    if (!column.width && !column.type) {
                        column.width = columnWidthDefault
                    }
                    if (column.type === 'expand') {
                        column.width = 20
                    }
                    return column
                });
                this.store.commit('updateColumns', columns);
            }, 0);
        },
        computeTableWrapperWidth() {
            let parent = this.$refs.tableWrapper.offsetParent;
            let offsetLeft = 0;
            let offsetRight = 0;
            while (parent) {
                offsetLeft += parent.offsetLeft;
                parent = parent.offsetParent;
            };
            return this.winWidth - offsetLeft - offsetRight;
        },
        changeExpand($index) {
            let _expandedRows = JSON.parse(JSON.stringify(this.expandedRows));
            _expandedRows[$index] = !(this.expandedRows)[$index];
            this.store.commit('updateExpandedRows', _expandedRows)
        }
    },
}
</script>