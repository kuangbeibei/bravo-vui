<template>
<div class="bravo-table" ref="tableWrapper" :class="[{
            'bravo-table--striped': stripe,
        }]">
    <div class="table-header-wrapper" ref="headerWrapper">
        <table-header :store="store" :expo="expo" />
    </div>
    <div class="table-body-wrapper" ref="bodyWrapper">
        <table-body :store="store" />
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

<script>
import "../style/table.scss";
import TableHeader from './table-header';
import TableBody from "./table-body";
import {
    createStore,
    mapStates
} from "./store/helper";
import {
    sortWithCondition
} from "../../../src/utils/tool";

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
        expo: String | undefined
    },
    watch: {
        data: {
            deep: true,
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
            expandedRows: 'expandedRows',
            sortItems: 'sortItems'
        })
    },
    data() {
        this.store = createStore(this);
        return {
            tableWidth: 0
        }
    },
    created() {
        this.tableId = 'bravo-table_' + tableIdSeed++;
    },
    mounted() {
        this.doLayout();
    },
    methods: {
        doLayout() {
            // TODO 优化
            setTimeout(() => {
                let columnsLength = this.columns.length;
                this.tableWidth = this.$refs.tableWrapper.offsetWidth;
                let columnWidthDefault = parseFloat(this.tableWidth / columnsLength).toFixed(1) - 8;
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
        },
        toggleSortArrow($index, flag) {
            let _sortItems = JSON.parse(JSON.stringify(this.sortItems));
            _sortItems = _sortItems.map((item, idx) => {
                if ($index === idx) {
                    if (flag === 'descending') {
                        item.arrowDown = !item.arrowDown;
                        item.arrowUp = false;
                    } else {
                        item.arrowUp = !item.arrowUp;
                        item.arrowDown = false;
                    }
                    if (!item.arrowDown && !item.arrowUp) {
                        // 如果没有选中排序，恢复默认列表
                        this.$nextTick(() => {
                            this.store.commit('updateData', this.data);
                        })
                    }
                } else {
                    item.arrowUp = false;
                    item.arrowDown = false;
                };
                return item;
            });
            this.store.commit('updateSortItems', _sortItems);

            // 排序
            this.store.commit('updateData', sortWithCondition(this.data, this.columns[$index].prop, flag));
        }
    },
}
</script>
