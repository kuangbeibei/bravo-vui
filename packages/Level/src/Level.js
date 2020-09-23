export default {
    name: 'KkLevel',
    props: {
        t: {
            type: Number
        }
    },
    render(h) { // createElement，render函数重的h会把jsx转换成h('h1', {}, children)这种
        let tag = `h${this.t}`;
        return <tag>{this.$slots.default}</tag>
    }
}