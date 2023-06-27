<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <div class="grid-content bg-purple"></div>
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/user.jpg" alt="头像" />
          <div class="userinfo">
            <p class="name">librarian</p>
            <p class="access">图书管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间：<span>2022-10-20</span></p>
          <p>上次登录的地点：<span>邯郸</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="书名"> </el-table-column>
          <el-table-column prop="todayBuy" label="今日浏览"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月游览"> </el-table-column>
          <el-table-column prop="totalBuy" label="总游览量"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!--折线图-->
        <div ref="echarts1" style="height: 270px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 280px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 280px">
          <div ref="echarts3" style="height: 210px"></div
        ></el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      countData: [
        {
          name: "今日游览人数",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日借书人数",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日还书人数",
          value: 1234,
          icon: "s-goods",
          color: "#004F98",
        },
        {
          name: "本月游览人数",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月借书人数",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月还书人数",
          value: 1234,
          icon: "s-goods",
          color: "hsl(231, 44%, 44%)",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      //基于准备好的dom,初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      //指定图表的配置项和数据
      let echarts1Option = {};
      //处理数据xAxis
      const { orderData, userData,videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1Option.xAxis = xAxisData;
      echarts1Option.yAxis = {};
      echarts1Option.legend = xAxisData;
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      console.log(echarts1Option);
      //使用刚指定的配置项和数据显示图表
      echarts1.setOption(echarts1Option);

      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        legend: {
          //图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        //提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", //类目轴
          data: userData.map((item) => item.data),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axislabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts2.setOption(echarts2Option);
      //饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3edlcf",
        ],
        series: [
             { data: videoData,
              type: 'pie',
            }
        ],
      };
      echarts3.setOption(echarts3Option)
    });
  },
};
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 1px;
  margin-bottom: 2px;
  border-bottom: 1px solid #cccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 35px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 20px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 40px;
    text-align: center;
    line-height: 80px;
    color: rgb(245, 240, 240);
  }
  .detail {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 10x;
      margin-bottom: 10px;
      line-height: 10px;
      height: 10px;
    }
    .desc {
      font-size: 14px;
      color: #918e8e;
      text-align: justify;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 10px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
