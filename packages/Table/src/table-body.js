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
        console.log('收到了新的 columns body~~~~~',this.columns);
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
}