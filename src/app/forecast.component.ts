import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component ({
	selector: 'forecast',
	templateUrl: 'forecast.component.html',
	styleUrls: ['./style.css']
})

export class ForecastComponent {
	private city_name: string;
	public forecast: any = [];
	private date: string;
	private temp;
	private sub;
	private dt;
	private current_date;
	private data: any = [];
	
	constructor(private route: ActivatedRoute, private http: Http){
		this.sub = this.route.params.subscribe(params => {
            this.city_name = params['name'];
			this.current_date = new Date();
			this.data = [];
			this.forecast = this.getForecast(this.city_name);
		});	
	}
		
	getForecast(x){
		let forecast;
		this.http.get('http://api.openweathermap.org/data/2.5/forecast/?cnt=40&units=metric&APPID=a21999153d8ce9beb63835a655132c73&q='+x+',IN')
	.subscribe(
		(res:Response) => {
			forecast = res.json();
			console.log(forecast);
			let day = this.getDayFromDate(this.current_date);
			let temp = forecast.list[0].main.temp;
			let desc = forecast.list[0].weather[0].description;
			this.data.push({'day':day,'temp':temp,'desc':desc});
			for(let i of forecast.list){
				let d = new Date(i.dt_txt);
				//console.log(d);
				if(this.current_date.getDate() < d.getDate()){
					this.current_date = d;
					day = this.getDayFromDate(this.current_date);
					temp = i.main.temp;
					desc = i.weather[0].description;
					this.data.push({'day':day,'temp':temp,'desc':desc});
				}
			}
			console.log(this.data);
		}
	);
	
	
	}
	
	getDayFromDate(dt){
		var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var day = dayNames[dt.getDay()];
		return day;
	}
	
}