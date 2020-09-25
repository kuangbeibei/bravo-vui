import { mapStates } from './store/helper';
export default {
    name: 'KkBody',
    props: {
        store: {
            required: true
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
            >
                <tbody>
                    {
                        data.map(item => {
                            return <tr>
                                {
                                    columns.map(column => {
                                        return Object.keys(column).map(c => {
                                            if (column[c] in item) {
                                            return <td>{this.renderCell(column, item, c)}</td>
                                            }
                                        })
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
        renderCell(column, item, c) {
            return <div class="cell" style={{width: column.width !== 'auto' ? column.width + 'px' : 'auto', minWidth: '80px'}}>{item[column[c]]}</div>
        }
    }
}