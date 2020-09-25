/**
 * colgroup,col很重要，因为要控制每一个列的相同宽度
 */
import {mapStates} from "./store/helper";
export default {
    name: 'KkHeader',
    props: {
        store: {
            required: true
        }
    },
    computed: {
        ...mapStates({
            columns: 'columns'
        })
    },
    render(h) {
        return  (<table
            cellspacing="0"
            cellpadding="0"
            border="0"
        >
            <tr>
                {
                    this.columns.map(column => {
                        return <th><div class="cell" style={{width: column.width !== 'auto' ? column.width + 'px' : 'auto', minWidth: '80px'}}>{column.label}</div></th>
                    })
                }
            </tr>
           
        </table>)
    },
}