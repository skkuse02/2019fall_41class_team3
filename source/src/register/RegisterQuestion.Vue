<template>
    <div>
        RegisterQuestion
        <input v-model="title" placeholder="제목"/>
        <textarea v-model="content" placeholder="내용"/>
        <button @click="write">작성 완료</button>
    </div>
</template>
    
<script>
import data from '@/data'

export default {
    name: 'Question',
    components: {

    },
    data () {
        return {
            data: data,
            title: '',
            content: ''
        }
    },
    methods: {
        write () {
            this.data.push ({
                title: this.title,
                content: this.content
            })
            this.$router.push ({
                path: '/'
            })
        }
    }
}
</script>

<style>

</style>