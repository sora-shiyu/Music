<template>
  <div class="pagination">
    <el-pagination
      @current-change="pageChange"
      :page-size="page_size"
      background
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="isShow"
    ></el-pagination>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'pagination',
  props: {
    page_size: Number,
    total: Number,
  },

  setup (props, { emit }) {
    let isShow = ref(false)
    if (props.total <= props.page_size) {
      isShow.value = true
    }
    const pageChange = page => {
      emit('pageChange', page)
    }

    return {
      pageChange,
      isShow
    }
  }
}
</script>

<style lang='less' scoped>
.pagination {
  width: 60%;

  margin: 2% 20%;
  text-align: center;
  margin-bottom: 5%;
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(236, 65, 65);
    color: #fff;
  }
  /deep/.el-pagination .btn-next,
  /deep/.el-pagination .btn-prev {
    background: center center no-repeat rgb(58, 58, 58);
    background-size: 16px;
    cursor: pointer;
    margin: 0;
    color: #ffffff61;
    border-radius: 5px;
    &:hover {
      background: center center no-repeat rgba(58, 58, 58, 0);
    }
  }
  /deep/.el-pagination.is-background .el-pager li {
    background-color: #f4f4f500;
    color: #606266;
    border-radius: 5px;
    border: 1px solid rgba(199, 197, 197, 26%);
  }
  /deep/.el-pagination.is-background .btn-next.disabled,
  /deep/.el-pagination.is-background .btn-next:disabled,
  /deep/.el-pagination.is-background .btn-prev.disabled,
  /deep/.el-pagination.is-background .btn-prev:disabled,
  /deep/.el-pagination.is-background .el-pager li.disabled {
    color: rgb(85, 85, 85);
  }
  // /deep/.el-pager li:hover {
  //   color: rgb(207, 208, 210);
  //   border-style: none;
  // }

  /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: rgb(207, 208, 210);
    border-style: none;
  }
}
</style>
