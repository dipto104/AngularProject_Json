var app = angular.module("demo", []);
		app.controller("testCtrl", function($scope,$http) {
		   $scope.temp = "";
		   $scope.rows = []; // init empty array
		   $scope.datainput =[];
	

		$http({
			method: 'GET',
			url: 'Data/input.json'
		}).then(function (data){
		$scope.datainput=data.data;
		console.log($scope.datainput);


	
		//console.log($scope.datainput);

		//var json=JSON.parse(JSON.stringify($scope.datainput));
		//console.log(json[0].status);

		
		},function (error){
		console.log("big error");
		});


		
		



		   $scope.printStars = function() {
			
			var json=JSON.parse(JSON.stringify($scope.datainput));
			console.log(json[0].status);

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
			for(var i=0;i<json.length;i++){
				ctx.font = 'italic 32px sans-serif';
				var strings=json[i].status+"("+json[i].value+")";
				
				//console.log(ctx.measureText(strings).width);
				if(ctx.measureText(strings).width>maxwidth){
					maxwidth=ctx.measureText(strings).width;
					
				} 
				if(json[i].value>maxvalue){
					maxvalue=json[i].value;
				}
				ctx.fillText(strings, 100, 100*(i+1));

			}
			//console.log(maxwidth);
			
			maxvalue=maxvalue+maxvalue;
			var barsize=25;
			var nbar=0;
			var vpix=80;
			var scaleing=1;
			if(maxvalue>c.width){
				 scaleing=maxvalue/c.width;
			}
			
			console.log(scaleing);
			for(var i=0;i<json.length;i++){
				var hpix=maxwidth+100+5;
				
				var value=parseInt(json[i].value);
				nbar=(value/barsize)/scaleing;
				nbar=parseInt(nbar);
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
