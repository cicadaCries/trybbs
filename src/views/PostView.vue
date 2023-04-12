<template>
    <v-container>
        <v-data-table :headers="postList" :items="items.rows" :items-per-page="10"></v-data-table>
        <!-- 报错显示 -->
        <v-alert v-if="error" type="error" class="mt-3">
        {{ error }}
        </v-alert>
    </v-container>
</template>
  
<script>
    import request from '@/utils/request';

    export default {
        data() {
            return {
                items: { rows: [] },
                postList: [
                    { text: "ID", value: "threadId" },
                    { text: "标题", value: "title" },
                    { text: "创建时间", value: "createTime" },
                    { text: "内容", value: "content" },
                    { text: "状态", value: "statue" },
                    { text: "浏览数", value: "viewCount" },
                    { text: "回复数", value: "replyCount" },
                    { text: "分类", value: "category" },
                    { text: "发送人", value: "sendUser" },
                ],
                error: "",
            }
        },
        created() {
            this.fetchItems();  //      发动http请求
        },
        methods: {
            fetchItems() {
                request.get('/system/thread/list')
                    .then(response => {
                        this.items = response.data;
                        console.log("访问thread/list成功之后返回的数据" + this.items);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        }

    }
</script>
   