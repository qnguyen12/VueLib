const Pagination = {
        name: 'pagination',
        template: '#pagination',
        props: {
            totalPages: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            }
        },
        computed: {
            isInFirstPage() {
                return this.currentPage === 1;
            },
            isInLastPage() {
                return this.currentPage === this.totalPages;
            }
        },
        methods: {
            onClickFirstPage() {
                this.$emit('pagechanged', 1);
            },
            onClickPreviousPage() {
                if (this.currentPage - 5 > 1)
                    this.$emit('pagechanged', this.currentPage - 5);
                else
                    this.$emit('pagechanged', 1);    
            },
            onClickNextPage() {
                if(this.totalPages > this.currentPage + 5)
                    this.$emit('pagechanged', this.currentPage + 5);
                else
                    this.$emit('pagechanged', this.totalPages);
            },
            onClickLastPage() {
                this.$emit('pagechanged', this.totalPages);
            }
        }
    };