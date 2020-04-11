import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CityListComponent } from './city-list.component';
import { ForecastComponent } from './forecast.component';

const routes: Routes = [
	{path: 'forecast', component: ForecastComponent}
];

@NgModule({
  declarations: [
    AppComponent,
	CityListComponent,
	ForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { 
	
}

	
