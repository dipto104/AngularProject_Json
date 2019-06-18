var app = angular.module("demo", []);
		app.controller("testCtrl", function($scope,$http) {
		   $scope.temp = "";
		   $scope.rows = []; // init empty array
		   $scope.datainput =[];

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


		/*datatemp=[
			{status:"payfail",value:500},
			{status:"payinit",value:250},
			{status:"paysuccess",value:1000},
			{status:"payreturn",value:50}
			
		];*/

		//$scope.datainput=datatemp;
		

		
		},function (error){
		console.log("big error");
		});


		
		

			$scope.refresh = function(){
				location.reload();
			}

			$scope.bcchange=function(){
				var color=$scope.bcname;

				$scope.mybody = {
				
					"background-color" : $scope.bcname
					
				}
			}
			

		   $scope.printStars = function() {
			
			var json=JSON.parse(JSON.stringify($scope.datainput));
			//var json=JSON.parse($scope.datainput);
			//console.log(json[0].status);

			var n = $scope.givenNumber;

			var cheight=$scope.height;
			var cwidth=$scope.width;

			$scope.rows = [];
			  
			  
			var c = document.getElementById("myCanvas");
			c.width=$scope.width;
			c.height=$scope.height;
			
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, cwidth, cheight);
			var maxwidth=0;
			var maxvalue=0;
			for(var i=0;i<json.length;i++){//printing the status and value member of json
				ctx.font = 'italic 32px sans-serif';
				var strings=json[i].status+"("+json[i].value+")";
				
			
				if(ctx.measureText(strings).width>maxwidth){
					maxwidth=ctx.measureText(strings).width;
					
				} 
				if(Number(json[i].value)>maxvalue){
					maxvalue=Number(json[i].value);      //updating the max value of json
				}
				ctx.fillText(strings, 100, 100*(i+1));

			}
			
			
			maxvalue=maxvalue+maxvalue+maxwidth+100+5;
			
			var barsize=25;         //size of the small bar
			var nbar=0;				//number of bar
			var vpix=80;			//vertical start pixel at for bar
			var scaleing=1;         //scaling number for dynamic page
			if(maxvalue>c.width){
				 scaleing=maxvalue/(c.width-maxwidth-100-5);			
			}
			
			//console.log(maxvalue);
			console.log(scaleing);
			for(var i=0;i<json.length;i++){
				var hpix=maxwidth+100+5; //horizontal pixel start at for bar
				
				var value=Number(json[i].value) ;
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
