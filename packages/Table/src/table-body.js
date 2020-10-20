import { mapStates } from './store/helper';
import BravoTableCell from "./table-cell";
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
        }),
        table() {
            return this.$parent;
        },
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
                            if (this.table.renderExpanded) {
                                console.log('我进来renderExpanded');
                                return (
                                    [<tr>
                                        {
                                            columns.map((column, index) => {
                                                return this.cellRender(h, column, item, idx)
                                            })
                                        }
                                    </tr>,
                                    // 这里就要用到colspan了
                                    <tr>
                                        {
                                            this.table.renderExpanded(h, item)
                                        }
                                    </tr>]
                                )
                            } else {
                                return <tr>
                                    {
                                        columns.map((column, index) => {
                                            return this.cellRender(h, column, item, idx)
                                        })
                                    }
                                </tr>
                            }
                        })
                    }
                </tbody>
            </table>
        )
    },
    methods: {
        rowRender() {

        },
        cellRender(h, column, item, $index) {
            return <td class="table-body-td">
                <div class="cell" style={{width: column.width + 'px'}}>{
                    column.renderCell(h, { item, column, $index })
                }</div>
            </td>
        }
    }
}