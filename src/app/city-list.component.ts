import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component ({
	selector: 'cities',
	templateUrl:'city-list.component.html',
	styleUrls: ['./style.css']
})

export class CityListComponent {
	
	private route: ActivatedRoute;
	private router: Router;
	
	constructor (private http: Http){
		this.UpdateTemp();
	}
	current_order = 'Descending';
	sort_order = 'asc'; 

	cities_info = [
	{
	city_name:'Chennai',
	city_temp:0 
    },{
	city_name: 'Delhi', 
	city_temp: 0 
    },{
    city_name: 'Bangalore', 
	city_temp: 0 
    },{
    city_name: 'Chandigarh', 
	city_temp: 0 
    },{
    city_name: 'Mysore', 
	city_temp: 0 
	}
 ];

 ngOnInit() {

  
}
 
 sorting(){
 	let temp;
	if(this.sort_order == 'asc'){
		for(let i=0;i<5;i++){
			
			for(let j=i+1;j<5;j++){
				if(this.cities_info[i].city_temp > this.cities_info[j].city_temp){
					
					temp = this.cities_info[i];
					this.cities_info[i] = this.cities_info[j];
					this.cities_info[j] = temp;
				}
			}
		}
	this.sort_order = 'desc';
	this.current_order = 'Ascending';
	}else if(this.sort_order == 'desc'){
		for(let i=0;i<5;i++){
			
			for(let j=i+1;j<5;j++){
				if(this.cities_info[i].city_temp < this.cities_info[j].city_temp){
					
					temp = this.cities_info[i];
					this.cities_info[i] = this.cities_info[j];
					this.cities_info[j] = temp;
				}
			}
		}
		this.sort_order = 'asc';
		this.current_order = 'Descending';
	}
 }
 
	UpdateTemp(){
		for(let x of this.cities_info){
			this.getTemp(x);
		}
	}
 
 getTemp(x){
	let weather;
	return(this.http.get('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&APPID=a21999153d8ce9beb63835a655132c73&q='+x.city_name+',IN'))
	.subscribe(
		(res:Response) => {
			weather = res.json();
			x.city_temp = weather.main.temp;
			this.sorting();
		}
	)
	
 }
}