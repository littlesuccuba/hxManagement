<template>
    <div id="main">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header">
                        <el-switch active-text="深色模式" v-model="deepMode" @change="changeMode"></el-switch>
                    </div>
                    <div id="one"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header">
                        <el-switch active-text="深色模式" v-model="deepMode"></el-switch>
                    </div>
                    <div id="one"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import echarts from 'echarts';
import * as echarts from 'echarts'
export default {
    name: 'index',
    data: ()=>{
        return {
            bodyStyle: {background:''},
            deepModeClass: '',
            deepMode: false,
            option: {
                title: {
                    text: '数据可视化',
                    x:45,
                    y:30,
                    textStyle: {
                        color: '#000'
                    }
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],
                    showBackground: false,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    },
                }],
                grid:{
                    x:70,   //左侧与y轴的距离
                    y:100,   //top部与x轴的距离
                    x2:50,   //右侧与y轴的距离
                    y2:50    //bottom部与x轴的距离
                },
                backgroundColor: '',
            }
        }
    },
    mounted(){
        this.initEcharts()
    },
    watch:{
        '$route':function(e){
            // console.log(222)
            this.initEcharts()
        }
    },
    methods: {
        initEcharts(){
            // 基于准备好的dom，初始化echarts实例
            let elements = document.querySelectorAll('#one')
            for(let i=0;i<elements.length;i++){
                var myChart = echarts.init(elements[i]);
                myChart.clear()
                // 绘制图表
                myChart.setOption(this.option);
            }
            
        },
        changeMode(){
            if(this.deepMode){
                this.option.title.textStyle.color = '#fff'
                this.option.backgroundColor = '#100c2a'
                this.option.xAxis.axisLabel.textStyle.color = '#fff'
                this.option.yAxis.axisLabel.textStyle.color = '#fff'
                this.option.series[0].showBackground = true
                this.initEcharts()
            }else{
                // this.option.text.color = '#6e7079'
                this.option.title.textStyle.color = '#000'
                this.option.backgroundColor = ''
                this.option.xAxis.axisLabel.textStyle.color = '#999'
                this.option.yAxis.axisLabel.textStyle.color = '#999'
                this.option.series[0].showBackground = false
                this.initEcharts()
            }
        }
    }
}
</script>

<style scoped>
    #one{
        height: 20rem;
    }
    .deepMode{
        background-color: #ff40a9 !important;
    }
</style>