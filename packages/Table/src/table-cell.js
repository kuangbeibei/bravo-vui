export default {
    name: 'BravoTabelCell',
    props: {
        column: Object,
        item: Object,
        prop: String,
        index: Number,
        widths: Array,
    },
    render(h) {
        return <div class="cell" style={{minWidth: '80px'}}>{this.item[this.prop]}</div>
    },
    mounted(){
        this.$el.style.width = this.column.width || this.$el.offsetWidth + 'px';
        this.widths[this.index] = this.$el.style.width;
    }
}