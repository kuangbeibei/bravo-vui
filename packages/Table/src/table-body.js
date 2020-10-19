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
        },
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
                                        return this.renderCell(h, column, item, idx)
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        )
    },
    methods: {
        renderCell(h, column, item, $index) {
            return <td class="table-body-td">
                <div class="cell" style={{width: column.width + 'px'}}>{
                    column.renderCell(h, { item, column, $index })
                }</div>
            </td>
        }
    }
}