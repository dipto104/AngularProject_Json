var app = angular.module("demo", []);
		app.controller("testCtrl", function($scope,$http) {
		   $scope.temp = "";
		   $scope.rows = []; // init empty array
		   $scope.datainput =[];
		   $scope.dataconfig =[];

		   $scope.colornames = ["AliceBlue ",
								"Aqua", 
								"Azure",
								"Aquamarine",
								"Red",
								"Blue",
								"Beige",
								"CornflowerBlue ",
								"Coral",
								"DarkBlue ",
								"DarkCyan ", 
								"DarkSalmon ",
								];
	

		$http({
			method: 'GET',
			url: 'http://localhost:5000/database'
		}).then(function (data){
		$scope.datainput=data.data;
		console.log($scope.datainput);
		},function (error){
		console.log("big error");
		});

		/*datatemp=[
			{status:"payfail",value:500},
			{status:"payinit",value:250},
			{status:"paysuccess",value:1000},
			{status:"payreturn",value:50}
			
		];*/

		//$scope.datainput=datatemp;

		$http({
			method: 'GET',
			url: 'Data/config.json'
		}).then(function (config){
		$scope.dataconfig=config.data;
		//console.log($scope.datainput);
		},function (error){
		console.log("config error");
		});


		
		

			$scope.refresh = function(){
				location.reload();

				
			}

			$scope.bcchange=function(){
				var color=$scope.bcname;
				var jsonconfig=JSON.parse(JSON.stringify($scope.dataconfig));
				console.log(jsonconfig[5].value);

				$scope.mybody = {
				
					"background-color" : jsonconfig[5].value,
					"background-image": "Img/Back1.jpg"
					
				}
			}

			/*$scope.changefont=function(){
				$scope.mybody = {
				
					"font" : " 15px sans-serif",
					"background-color" : $scope.bcname
					
				}
				console.log("fontclick");
			}*/
			
			
		   $scope.startpage = function() {
				var json=JSON.parse(JSON.stringify($scope.datainput));

				var jsonconfig=JSON.parse(JSON.stringify($scope.dataconfig));

				$scope.mybody = {
					
					//"background-color" : jsonconfig[5].value
					//"background-image": "Img/Back1.jpg"
					
				}



				var inputdata=[];
				var input=[];

				for(var i=0;i<json.length;i++){
					var strings=json[i].status+"("+json[i].value+")";
					input.push(strings);
					inputdata.push(json[i].value);
				}

				var cheight=jsonconfig[3].value;
				var cwidth=jsonconfig[4].value;

				var c = document.getElementById("myCanvas");
				c.width=cwidth;
				c.height=cheight;
				var myChart = c.getContext("2d");
				//var input=["payfail("+400+")","payinit","paysuccess","payreturn"];
				

					//myChart.scale(.1,.1);
				
				//let myChart = document.getElementById('myCanvas').getContext('2d');

    		// Global Options
				Chart.defaults.global.defaultFontFamily = jsonconfig[0].value;
				Chart.defaults.global.defaultFontSize = jsonconfig[1].value;
				Chart.defaults.global.defaultFontColor = jsonconfig[8].value;

				let massPopChart = new Chart(myChart, {
				type:jsonconfig[13].value, // bar, horizontalBar, pie, line, doughnut, radar, polarArea
				data:{
					labels:input,
					datasets:[{
					label:'Population',
					data:inputdata,
					//backgroundColor:'green',
					backgroundColor:[
						'rgba(255, 99, 132, 0.6)',
						'rgba(54, 162, 235, 0.6)',
						'rgba(255, 206, 86, 0.6)',
						'rgba(75, 192, 192, 0.6)',
						'rgba(153, 102, 255, 0.6)',
						'rgba(255, 159, 64, 0.6)',
						'rgba(255, 99, 132, 0.6)',
						'rgba(255, 12, 33, 0.6)',
						'rgba(255, 50, 1, 0.6)',
						'rgba(255, 1, 50, 0.6)',
						'rgba(255, 153, 12, 0.6)',
						'rgba(255, 12, 132, 0.6)',
						'rgba(75, 255, 132, 0.6)',
						'rgba(75, 99, 255, 0.6)',
						'rgba(54, 12, 255, 0.6)',
						'rgba(5, 120, 200, 0.6)',
						'rgba(200, 50, 50, 0.6)',
						'rgba(50, 255, 255, 0.6)'
					],
					borderWidth:1,
					borderColor:'#777',
					hoverBorderWidth:3,
					hoverBorderColor:'#000'
					}]
				},
				options:{
					title:{
					display:true,
					text:'Data From Server In Graph',
					},
					legend:{
					display:true,
					position:'left',
					labels:{
						fontColor:'#000',
						fontSize:15
					},
					
					},
					responsive: false,
					maintainAspectRatio: false,
					layout:{
					padding:{
						left:jsonconfig[9].value,
						right:jsonconfig[10].value,
						bottom:jsonconfig[11].value,
						top:jsonconfig[12].value
					}
					},

					tooltips:{
					enabled:true
					}
				}
				});
				
				//var json=JSON.parse($scope.datainput);
				//console.log(json[0].status);

				

				var cheight=jsonconfig[3].value;
				var cwidth=jsonconfig[4].value;

				$scope.rows = [];
				var newx;
				var newy;
				
				/*for(var k=0;k<=1;k++){
					var c = document.getElementById("myCanvas");
					c.width=cwidth;
					c.height=cheight;
					
					var ctx = c.getContext("2d");
					ctx.clearRect(0, 0, cwidth, cheight);
					//console.log(cwidth);
					//console.log(cheight);

					/*var background = new Image();
					background.src = "Img/Back1.jpg";
					
					// Make sure the image is loaded first otherwise nothing will draw.
					background.onload = function(){
						ctx.drawImage(background,0,0);   
					}


					var maxwidth=0;
					var maxvalue=0;
					
					ctx.scale(cwidth/1920,cheight/1080);
					//ctx.translate(newx,newy);

					//var verlegth=[];
					var horlength=[];
					//ctx.scale(1,1);
					var verlegth=0;
					

						

					for(var i=0;i<json.length;i++){//printing the status and value member of json
						var tempfont=jsonconfig[2].value+' '+jsonconfig[1].value+' '+jsonconfig[0].value;
						ctx.font = tempfont;
						
						var strings=json[i].status+"("+json[i].value+")";
						
						

						if(ctx.measureText(strings).width>maxwidth){
							maxwidth=ctx.measureText(strings).width;
						} 
						if(Number(json[i].value)>maxvalue){
							maxvalue=Number(json[i].value);      //updating the max value of json
						}
						ctx.fillText(strings, 100, 100*(i+1));

					}
					
					
					maxvalue=maxvalue+maxvalue+maxwidth+100+5;//maxvalue is the higest range of pixel of bar
					
					var barsize=jsonconfig[7].value;         //size of the small bar
					var nbar=0;				//number of bar
					var vpix=80			//vertical start pixel at for bar
					var scaleing=1;         //scaling number for dynamic page
					if(maxvalue>c.width){
						scaleing=maxvalue/(1920-maxwidth-100-5);			
					}
					
					//console.log(maxvalue);
					//console.log(scaleing);


					var imagePaper = new Image();
					imagePaper.src = "Img/Back2.jpg";

					imagePaper.onload = function(){
						vpix=80;
						for(var i=0;i<json.length;i++){
							var hpix=maxwidth+100+5; //horizontal pixel start at for bar
							
							var value=Number(json[i].value) ;
							//scaleing=1;
							nbar=((value)/barsize)/scaleing; //number of required bar
							nbar=parseInt(nbar);
							//console.log(nbar)


							
							for(var j=0;j<nbar;j++){
								ctx.drawImage(imagePaper,hpix,vpix,barsize,barsize);
								//ctx.fillRect(hpix,vpix,barsize,barsize);
								hpix+=barsize*2;
							}


							horlength.push(hpix+75);
							vpix+=100;
						}
					}



					//console.log(horlength);
					var maxhorlength=0;
					for(var a=0;a<horlength.length;a++){
						if(maxhorlength<Number(horlength[a])){
							maxhorlength=Number(horlength[a]);
						}
					}
					//console.log("hello "+maxhorlength);
					verlegth=vpix-80+50;

					if(jsonconfig[6].value=="centerleft"){
						newx=-100;
						newy=(1080-verlegth)/2;
					}
					else if(jsonconfig[6].value=="center"){
						newx=(1920-maxhorlength)/2;
						newy=(1080-verlegth)/2;
					}
					else if(jsonconfig[6].value=="centerright"){
						newx=1920-maxhorlength+80;
						newy=(1080-verlegth)/2;
					}

					else if(jsonconfig[6].value=="topleft"){
						newx=-100;
						newy=-50;
					}
					else if(jsonconfig[6].value=="topright"){
						newx=1920-maxhorlength+80;;
						newy=-50;
					}
					else if(jsonconfig[6].value=="bottomleft"){
						newx=-100;
						newy=1080-verlegth+20;
					}
					else if(jsonconfig[6].value=="bottomright"){
						newx=1920-maxhorlength+80;;
						newy=1080-verlegth+20;
					}


					


					//newx=(1920-maxhorlength)/2
					//newy=(1080-verlegth)/2;
			
				
			
				
					//console.log(verlegth);
				
				}*/	
				
			  
			
   }
   //$scope.changefont();
		});
