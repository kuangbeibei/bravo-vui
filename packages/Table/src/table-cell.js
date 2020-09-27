export default {
    name: 'BravoTabelCell',
    props: {
        column: Object,
        item: Object,
        prop: String,
        index: Number
    },
    render(h) {
        return <div class="cell" style={{minWidth: '80px', width: this.column.width + 'px'}}>{this.item[this.prop]}</div>
    },
}