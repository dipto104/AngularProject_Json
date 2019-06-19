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
			url: 'Data/input.json'
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
		console.log($scope.datainput);
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
				
					"background-color" : jsonconfig[5].value
					//"background-image": "Img/Back1.jpg"
					
				}
			}

			/*$scope.changefont=function(){
				$scope.mybody = {
				
					"font" : " 15px sans-serif",
					"background-color" : $scope.bcname
					
				}
				console.log("fontclick");
			}*/
			

		   $scope.changefont = function() {
			
			var json=JSON.parse(JSON.stringify($scope.datainput));

			var jsonconfig=JSON.parse(JSON.stringify($scope.dataconfig));

			$scope.mybody = {
				
				"background-color" : jsonconfig[5].value
				//"background-image": "Img/Back1.jpg"
				
			}
			
			//var json=JSON.parse($scope.datainput);
			//console.log(json[0].status);

			var n = $scope.givenNumber;

			var cheight=jsonconfig[3].value;
			var cwidth=jsonconfig[4].value;

			$scope.rows = [];
			  
			  
			var c = document.getElementById("myCanvas");
			c.width=cwidth;
			c.height=cheight;
			
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, cwidth, cheight);
			console.log(cwidth);
			console.log(cheight);

			/*var background = new Image();
			background.src = "Img/Back1.jpg";
			
			// Make sure the image is loaded first otherwise nothing will draw.
			background.onload = function(){
				ctx.drawImage(background,0,0);   
			}*/


			var maxwidth=0;
			var maxvalue=0;
			ctx.scale(cwidth/1920,cheight/1080);

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
			
			var barsize=25;         //size of the small bar
			var nbar=0;				//number of bar
			var vpix=80;			//vertical start pixel at for bar
			var scaleing=1;         //scaling number for dynamic page
			if(maxvalue>c.width){
				 scaleing=maxvalue/(1920-maxwidth-100-5);			
			}
			
			//console.log(maxvalue);
			console.log(scaleing);
			for(var i=0;i<json.length;i++){
				var hpix=maxwidth+100+5; //horizontal pixel start at for bar
				
				var value=Number(json[i].value) ;
				//scaleing=1;
				nbar=((value)/barsize)/scaleing; //number of required bar
				nbar=parseInt(nbar);
				console.log(nbar)
				for(var j=0;j<nbar;j++){
					ctx.fillRect(hpix,vpix,25,25);
					hpix+=50;
				}
				vpix+=100;
			}
			/*var subi=2,flag=0;
				for(var i = 1; i<=2*n-1; i++){
				for(var j=1;j<=2*n-1;j++){
					if(i>1 && i<2*n-1){
						if(i<=n){
							var x=n-j;
							if(i-x==2){
								while(j<n){
									j++;
								}
								for(k=1;k<=x;k++){
								
									j++;
								}
								
							}
							else{
								ctx.fillRect(j*50,i*50,25,25);
							}
						}
						else if(i>n){
							flag=2;
							var x=n-j;
							if(i-x-subi==2){
								while(j<n){
									j++;
								}
								for(k=1;k<=x;k++){
									j++;
								}
								
							}
							else{
								ctx.fillRect(j*50,i*50,25,25);
							}
						}
						
						
					}
					else{
						ctx.fillRect(j*50,i*50,25,25);
					}
					

					
				}
				if(flag==2){
					subi=subi+2;
				}
				

				}*/
				
			  
			
   }
		});
