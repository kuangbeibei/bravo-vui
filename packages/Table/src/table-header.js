/**
 * colgroup,col很重要，因为要控制每一个列的相同宽度
 */
import { mapStates } from "./store/helper";
export default {
    name: 'KkHeader',
    props: {
        store: {
            required: true
        },
        expo: String
    },
    computed: {
        ...mapStates({
            columns: 'columns',
            data: 'data',
        }),
    },
    mounted() {
        
    },
    render(h) {
        const columns = this.columns;
        return (<table
            cellspacing="0"
            cellpadding="0"
            border="0"
            class="table-header"
        >
            <thead>
                <tr>
                    {
                        columns.map((column, idx) => {
                            return <th>{
                                this.renderHeaderItem(h, columns,column,idx)
                            }</th>
                        })
                    }
                </tr>
            </thead>
        </table>)
    },
    methods: {
        renderHeaderItem(h, columns,column, idx) {
            if (this.expo && idx === columns.length - 1) {
                return this.renderExpoHeader(column)
            } else if (column.sortable) {
                return this.renderSortHeaderCell(h, {column, idx})
            } else {
                return <div class="cell" style={{ width: column.width + 'px' }}>{column.label}</div>
            }
        },
        renderSortHeaderCell(h, {column, idx}) {
            return column.renderSortHeaderCell(h, {column, idx})
        },
        renderExpoHeader(column) {
            return <div class="cell" style={{ width: column.width + 'px' }}>
                <div class="csv-export" on-click={this.exportCsv}>
                    <svg t="1603783025562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M398.933333 170.666667l341.333334 2.133333c8.533333 0 14.933333 4.266667 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v339.2c0 8.533333-2.133333 12.8-6.4 14.933334-4.266667 2.133333-8.533333 0-14.933333-6.4l-117.333334-117.333334-87.466666 87.466667-121.6-121.6 87.466666-87.466667-119.466666-119.466666c-4.266667-4.266667-6.4-10.666667-6.4-14.933334 4.266667-2.133333 8.533333-4.266667 17.066666-4.266666z m98.133334 390.4l-42.666667 44.8c-6.4 4.266667-12.8 8.533333-21.333333 8.533333s-14.933333-2.133333-19.2-8.533333l-81.066667-81.066667c-4.266667-4.266667-8.533333-12.8-8.533333-19.2 0-8.533333 2.133333-14.933333 8.533333-19.2l44.8-44.8 119.466667 119.466667z m-268.8 121.6h569.6c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v142.933333h-625.066667v-142.933333c0-8.533333 2.133333-14.933333 8.533334-19.2 4.266667-6.4 10.666667-8.533333 19.2-8.533333z m482.133333 57.6v27.733333h57.6v-27.733333h-57.6z" fill="#707070"></path></svg>
                </div>
                {column.label}
            </div>
        },
        exportCsv() {
            if (this.data && this.data.length) {
                let keys = Object.keys(this.data[0]);
                let _data = (this.data.reduce((acc, item) => {
                    let _item = [];
                    keys.forEach(key => {
                        _item.push(item[key])
                    });
                    acc.push(_item);
                    return acc;
                }, [keys])).join('\n');
                _data = '\uFEFF' + _data;
                this.saveAs(_data)
            } 
        },
        saveAs(obj, fileName="主机利用率.csv") {
            var tmpa = document.createElement("a");
            tmpa.download = fileName;
            tmpa.href ='data:attachment/csv,' + encodeURI(obj); //绑定a标签
            tmpa.click(); //模拟点击实现下载
            setTimeout(function () { //延时释放
                URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
            }, 100);
        }
    },
}