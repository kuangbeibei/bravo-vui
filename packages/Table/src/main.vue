<template>
    <div 
        class="bravo-table"
    >
        <table-header
            :store="store"
            :columnWidths = widths
        />
        <table-body
            :store="store"
            @setColumnWidth="setColumnWidth"
        />
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
    methods: {
        setColumnWidth(widths) {
            this.widths = widths;
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
    data(){
        this.store = createStore(this);
        return {
            widths: []
        }
    },
    created(){
        this.tableId = 'bravo-table_' + tableIdSeed++;
    }
}
</script>