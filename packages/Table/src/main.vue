<template>
    <div 
        class="bravo-table"
    >
        <table-header 
            :store="store"
        />
        <table-body
            :store="store"
        />
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import "../style/table.scss";
import TableHeader from './table-header';
import TableBody from "./table-body";
import {createStore, mapStates} from "./store/helper";
let tableIdSeed = 1;

export default {
    name: 'KkTable',
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
    computed: {

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

        }
    },
    created(){
        this.tableId = 'bravo-table_' + tableIdSeed++;
    }
}
</script>