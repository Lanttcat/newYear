//建立这个js文件的目的是能够动态决定加载的项目
// 原谅我一时兴起
//需要用户定义的数据：
// 1.词组
// 2.题目
// 3.分成的组数
(function(window){   
    var CreatPie = {              
        init: function(){
         
            var myChart = echarts.init(document.getElementById('main'),'infographic');
            
            var username = document.getElementById('username').value;    
            this.creatCharts(myChart,username);
        },
        decodeName: function(username){
            // //获取用户输入的姓名          
            if(username==''){
                return false;
            }
            var buttonclose = document.getElementById("closebutton"),
                testnametextarea = document.getElementById('inputname');

            buttonclose.style.display = 'block';
            testnametextarea.style.display = "none";

            var nametonumreg = /\d/g,
                NumberOfName = 0;
                // 取前13位
            NumberOfName=md5(username).match(nametonumreg).slice(0,13);

            switch(NumberOfName[12]%3){
                case 0:
                    // 分成2块
                    return this.diviPie(2,NumberOfName);
                    break;
                case 1:
                    // 分成3块
                    return this.diviPie(3,NumberOfName);
                    break;
                case 2:
                    // 分成4块
                    return this.diviPie(4,NumberOfName);                   
                    break;
            }
        },
        diviPie: function(num,NumberOfName){
            var PieNumber = 12/num,
            PieNumberStore = PieNumber,//保存初始的值
            PieNumSum = [0,0,0,0,0,0],             //设定数组，保存分开的数
            ArrayI = 0,
            mapNum = [];
        // 将数据分组
            NumberOfName.map(function(item,index,array){
                PieNumSum[parseInt(index/PieNumber)] += item*Math.pow(10,(index%PieNumber));
                if(index%PieNumber==PieNumber-1){
                    mapNum[parseInt(index/PieNumber)] = PieNumSum[parseInt(index/PieNumber)];
                    PieNumSum[parseInt(index/PieNumber)] = PieNumSum[parseInt(index/PieNumber)]%30;
                }
            });
            // 将数组截断
            PieNumSum = PieNumSum.slice(0,num);
            
            PieNumSum = PieNumSum.sort(this.compare);
            for(i=0;i<num-1;i++){
                if( PieNumSum[i+1]<= PieNumSum[i]){
                    if(PieNumSum[i+1]==PieNumSum[i]){
                        PieNumSum[i+1]++;
                    }else{
                    PieNumSum[i+1] = PieNumSum[i]+1;
                    }
                }
            }
            PieName = PieNumSum.map(function(item,index){
                return ShowData[item];
            });
            var mapData = [];
            for(var i=0;i<num;i++){
                mapData.push({value:mapNum[i],name:PieName[i]});
            }
            return mapData;
        },
        compare: function(value1,value2){
            if(value1<value2){
                return -1;
            }else if(value1>value2){
                return 1;
            }else{
                return 0;
            }
        },
        creatCharts: function(myChart,username){
            ChartsData = this.decodeName(username);
            var option = {
            title : {
                text: '2017你的爱情来自哪里',
                subtext: '',
                x:'center'
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    hoverAnimation:false,
                    roseType:false,
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:ChartsData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        },
        closeEchats: function(){
            self.location='./index.html';
        }
    }
    var ShowData = ["食堂","氪星球","菜市场","图书馆","博文楼","逸夫楼","山大路","酒吧","火车站","咖啡厅",
                "非诚勿扰","世纪佳缘","夜店","宿舍上铺","餐厅","酒店","健身房","酒馆","超市","十字路口",
                "医院","雪山","星巴克","公交车","美国","篮球场","上海","德国","耶路撒冷","南非","枣庄"];
    window.$ = CreatPie;
    // return CreatPie;
}(window));