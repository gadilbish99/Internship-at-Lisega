<template>
    <b-pagination-nav :link-gen="linkGen" :number-of-pages="numberOfPages" align="center"></b-pagination-nav>
</template>

<script>
export default {
    props: {
      numberOfPages: Number
    },
    methods: {
        linkGen(pageNum) {
            if (pageNum === 1) {
                return {
                    path: '/'
                }
            }
            else {
                return {
                    path: '/',
                    query: { page: pageNum }
                }
            }
        }
    },
    
}
</script>