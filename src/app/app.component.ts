import * as moment from "moment";
import * as momentTz from "moment-timezone";

// import { forkJoin } from 'rxjs';
// import { Quote } from '@angular/compiler';
// import { createElement } from '@angular/core/src/view/element';
// import { Weekdays } from "./type";

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MQuote, T, Weekdays, ColorArrayClass } from "./type";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    httpOptions: { headers; observe; } = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        observe: 'response'
    };

    calendarApiUrl: string;
    riddleUrl: string;

    todayIs: string;
    riddle: string;
    namesDay: string;
    weekNr: string;
    quotes: Array<MQuote>;

    IST: any;
    CET: any;

	dayOfWeekNumber: number;
	dayOfWeekString: string;

	colors: { [day: string]: Array<string> };

    constructor(public http: HttpClient) {
        this.quotes = [];
        // const today : Date = new Date();
        // this.calendarApiUrl = `https://api.dryg.net/dagar/v2.1/${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
        // this.riddleUrl      = 'https://www.riddles.com/riddle-of-the-day';
        
        // Default color scheme ["B70225", "00ff72", "ed55ff", "f4c030", "f05a4f"]

		this.colors = { };
		this.colors.Sunday      = ["ffa76c", "ffdb3b", "8be1dd", "e08153"];     // Daisy
		this.colors.Monday      = ["FDD50B", "E870A0", "78226D", "0D8129"];     // Wario
		this.colors.Tuesday     = ["5d23ac", "737c86", "ff9e57", "faf22b"];     // Waluigi
		this.colors.Wednesday   = ["ff000a", "ffd300", "0024f7", "c6744a"];     // Toad
		this.colors.Thursday    = ["439c19", "2b4674", "a27059", "fffa03"];     // Luigi
		this.colors.Friday      = ["FE0002", "0001FC", "FFD987", "6A0400"];     // Mario
		this.colors.Saturday    = ["fbcae0", "d77a9f", "0269aa", "fef564"];     // Peach

        setInterval(() => {
            this.IST = momentTz().tz("Asia/Kolkata").format("HH:mm:ss");
            this.CET = momentTz().tz("Europe/Stockholm").format("HH:mm:ss");
        }, 1000);

		this.dayOfWeekNumber = moment().day();
		this.dayOfWeekString = moment().format("dddd");
    }

    ngOnInit() {
        this.http.get<Array<T>>("https://sheetsu.com/apis/v1.0su/2453f9630a26").subscribe(e => {
            this.todayIs = e[0].todayIs;
            this.riddle = e[0].todaysRiddle;
            this.namesDay = e[0].nameDay;
            this.quotes = e.map((item: T, i: number) => ({
                visible: i === 0,
                quote: item.quote
            } as MQuote));
            

            setInterval(() => {
                this.http.get<Array<T>>("https://sheetsu.com/apis/v1.0su/2453f9630a26").subscribe(e => {
                    this.todayIs = e[0].todayIs;
                });
            }, 3600000); // 1 Hour


            setInterval(() => {
                this.setQuoteVisibility();
            }, 600000); // 1 Min
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
        setInterval(() => {
            this.generateSquare();
        }, 150);
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
            if (item.visible) {
                return (i + 1 !== tmp.length) ? tmp[i + 1] : tmp[0];
            }
        })
        .filter((item: MQuote) => item);

        return this.quotes.indexOf(tmp[0]);
    }

    generateball() {
        const section = document.querySelector('section');
        const ball = document.createElement('span');
        const tail = document.createElement('span');

        // BALL
        var posx = Math.random() * window.innerWidth;
        var posy = Math.random() * window.innerHeight;
        var colorIndex = Math.floor(Math.random() * this.colors[0].length);
        var color = '#' + this.colors[colorIndex];

        ball.style.left = posx + 'px';
        ball.style.top = posy + 'px';
        ball.style.background = color;

        tail.style.left = posx + 'px';
        tail.style.top = posy + 'px';
        tail.style.background = `linear-gradient(0deg, ${color}, #222)`;

        ball.appendChild(tail);
        section.appendChild(ball);

        setInterval(() => {
            ball.remove();
        }, 12000);
    }

    generateSquare() {
        const section = document.querySelector('section');
        const square = document.createElement('span');

        var size = Math.random() * 50;
        var posx = Math.random() * window.innerWidth;
        var posy = Math.random() * window.innerHeight;
        var colorIndex = Math.floor(Math.random() * this.colors[this.dayOfWeekString].length);

        square.style.width = 20 + size + 'px';
        square.style.height = 20 + size + 'px';
        square.style.left = posx + 'px';
        square.style.top = posy + 'px';
        square.style.background = '#' + this.colors[this.dayOfWeekString][colorIndex];

        section.appendChild(square);

        setInterval(() => {
            square.remove();
        }, 5000);
	}
	
	getDaysStringByInteger(day: Weekdays) {
		switch(day) {
			case Weekdays.Monday:
				return "Monday";
			case Weekdays.Tuesday:
				return "Tuesday";
			case Weekdays.Wednesday:
				return "Wednesday";
			case Weekdays.Thursday:
				return "Thursday";
			case Weekdays.Friday:
				return "Friday";
			case Weekdays.Saturday:
				return "Saturday";
			case Weekdays.Sunday:
				return "Sunday";
		}
	}

	getDayImageByInteger(day: Weekdays) {
		switch(day) {
			case Weekdays.Monday:
				return "./assets/WarioIcon.png";
			case Weekdays.Tuesday:
				return "./assets/WaluigiIcon.png";
			case Weekdays.Wednesday:
				return "./assets/ToadIcon.png";
			case Weekdays.Thursday:
				return "./assets/LuigiIcon.png";
			case Weekdays.Friday:
				return "./assets/MarioIcon.png";
			case Weekdays.Saturday:
				return "./assets/PeachIcon.png";
			case Weekdays.Sunday:
				return "./assets/DaisyIcon.png";
		}
	}
}
