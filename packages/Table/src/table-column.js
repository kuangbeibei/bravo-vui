let columnIdSeed = 1;

export default {
    name: 'BravoTableColumn',
    props: {
        prop: String,
        label: String,
        type: {
            type: String,
            default: 'default',
        },
        width: String
    },
    computed: {
        owner() {
            let parent = this.$parent;
            while(parent && !parent.tableId) {
                parent = parent.$parent;
            };
            return parent;
        }
    },
    render(h){
        return h('div', this.$slots.default);
    },
    data(){
        return {
            columns: []
        }
    },
    mounted() {
        const owner = this.owner;
        owner.store.commit('insertColumn', {
            columnId: owner.tableId + '_column_' + columnIdSeed++,
            label: this.label,
            type: this.type,
            prop: this.prop,
            width: this.width ? this.width : 'auto',
            minWidth: 80
        });
    },
}