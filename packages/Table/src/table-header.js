/**
 * colgroup,col很重要，因为要控制每一个列的相同宽度
 */
import {mapStates} from "./store/helper";
export default {
    name: 'KkHeader',
    props: {
        store: {
            required: true
        },
        columnWidths: Array
    },
    computed: {
        ...mapStates({
            columns: 'columns',
        })
    },
    render(h) {
        return  (<table
            cellspacing="0"
            cellpadding="0"
            border="0"
            class="table-header"
        >
            <thead>
                <tr>
                    {
                        this.columns.map((column, index) => {
                            return <th><div class="cell" style={{width: this.columnWidths[index], minWidth: '80px'}}>{column.label}</div></th>
                        })
                    }
                </tr>
            </thead>
        </table>)
    },

}