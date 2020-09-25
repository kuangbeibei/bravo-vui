import { mapStates } from './store/helper';
import BravoTableCell from "./table-cell";
let round = 0;
export default {
    name: 'KkBody',
    components: {
        BravoTableCell
    },
    props: {
        store: {
            required: true
        }
    },
    data() {
        return {
            widths: [],
        }
    },
    computed: {
        ...mapStates({
            data: 'data',
            columns: 'columns'
        })
    },
    render(h) {
        const data = this.data;
        const columns = this.columns;
        return (
            <table
                cellspacing="0"
                cellpadding="0"
                border="0"
                class="table-body"
            >
                <tbody>
                    {
                        data.map((item, idx) => {
                            round = idx;
                            return <tr>
                                {
                                    columns.map((column, index) => {
                                        return <td class="table-body-td">
                                            <bravo-table-cell 
                                                column={column} 
                                                item={item} 
                                                prop={column.prop} 
                                                index={index} 
                                                widths={this.widths}
                                            />
                                        </td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        )
    },
    updated() {
        if (round === this.data.length - 1) {
            this.$nextTick(() => {})
            this.$emit('setColumnWidth', this.widths);
        }
    }
}