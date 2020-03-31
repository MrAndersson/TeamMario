import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Quote } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  httpOptions: { headers; observe; } = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json'
		}),
		observe: 'response'
	};

	loading: boolean;

	calendarApiUrl: string
	riddleUrl: string;

	todayIs: string;
	riddle: string;
	namesDay: string;
	weekNr: string;
	quotes: Array<MQuote>;

  	constructor(public http: HttpClient) {
		this.loading = true;
		this.quotes = [];
		// const today : Date = new Date();
		// this.calendarApiUrl = `https://api.dryg.net/dagar/v2.1/${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
		// this.riddleUrl      = 'https://www.riddles.com/riddle-of-the-day';
	}

	ngOnInit() {
	this.http.get<Array<T>>('https://sheetsu.com/apis/v1.0su/2453f9630a26').subscribe(e => {
	  	this.todayIs = e[0].todayIs;
	  	this.riddle = e[0].todaysRiddle;
	  	this.namesDay = e[0].nameDay;
		this.quotes = e.map((item: T, i: number) => ( {
			visible: i === 0,
			quote: item.quote
		} as MQuote));

		this.loading = false;
		setInterval(() => { 
			this.setQuoteVisibility(); 
		}, 600000);
		});
		// let calendar = this.http.get<veckodag>(this.calendarApiUrl, { headers: this.httpOptions });
		// let riddle   = this.http.get('https://www.riddles.com/riddle-of-the-day', { headers: this.httpOptions, responseType:'text' });
		// let quotes   = this.http.get<Array<quotes>>('./assets/quotes.json');

		// forkJoin([calendar, riddle, quotes]).subscribe(res => {
		// 	let days = res[0];
		// 	let DOM = res[1];
		// 	let quotesArray = res[2];

		// 	this.todayIs  = days.dagar[0].flaggdag || days.dagar[0].veckodag;
		// 	this.namesDay = days.dagar[0].namnsdag.join(" & ");
		// 	this.weekNr   = days.dagar[0].vecka;

		// 	let resSTR = JSON.stringify(DOM);

		// 	const parser = new DOMParser();
		// 	var doc = parser.parseFromString(resSTR, "text/html");
		// 	this.riddle = doc.body.getElementsByTagName('blockquote')[0].innerText;

		// 	var nr = Math.floor((Math.random() * quotesArray.length) + 1);
		// 	this.quoteOfTheDay = quotesArray[nr].quote;
		// });
	}

	setQuoteVisibility() {
		let pos = this.getNextItemInArray(this.quotes);

		this.quotes.map((item: MQuote, i: number) => {
			item.visible = i === pos;
		});
	}

	getNextItemInArray(array: Array<MQuote>): number {
		let tmp = array.slice(0);
		tmp = tmp.map((item: MQuote, i: number) => {
			if(item.visible) {
				return (i + 1 !== tmp.length) ? tmp[i + 1] : tmp[0];
			}
		})
		.filter((item: MQuote) => item);
		
		return this.quotes.indexOf(tmp[0]);
	}
}
