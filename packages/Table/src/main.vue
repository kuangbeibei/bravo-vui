<template>
    <div 
        class="bravo-table"
    >
        <table-header />
        <table-body>
            <slot></slot>
        </table-body>
    </div>
</template>
<script>
import "../style/table.scss";
import TableHeader from './table-header';
import TableBody from "./table-body";
import {createStore, mapStates} from "./store/helper";
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
    }
}
</script>