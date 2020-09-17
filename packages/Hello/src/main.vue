<template>
    <div>Hello {{name}}</div>
</template>
<script>
export default {
    name: 'KkHello',
    props: {
        name: {
            type: String,
            default: 'KK'
        }
    }
}
</script>