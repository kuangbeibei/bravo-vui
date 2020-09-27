<template>
    <div 
        class="bravo-table"
        ref="tableWrapper"
    >
        <div class="table-header-wrapper" ref="headerWrapper" :style="{width: `${tableWidth}px`}">
            <table-header
                :store="store"
            />
        </div>
        <div class="table-body-wrapper" ref="bodyWrapper" :style="{width: `${tableWidth}px`}">
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
    directives: {
        loading: {
            bind: function(el, bindings, vnode) {
                console.log('el',el, 'bindings', bindings, 'vnode', vnode);
            }
        }
    },
    props: {
        stripe: Boolean,
        data: {
            type: Array,
            default: () => []
        },
        emptyText: String,
        loading: Boolean
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
            let columnsLength = this.columns.length;
            let computeTableWidth = this.computeTableWrapperWidth();
            this.tableWidth = computeTableWidth > this.$refs.tableWrapper.offsetWidth ? this.$refs.tableWrapper.offsetWidth : computeTableWidth;
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
            let offsetLeft = 0;
            let offsetRight = 0;
            while (parent) {
                offsetLeft += parent.offsetLeft;
                parent = parent.offsetParent;
            };
            return this.winWidth - offsetLeft - offsetRight
        },
    },
}
</script>