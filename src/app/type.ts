export interface T {
    todayIs: string,
    todaysRiddle: string,
    nameDay: string,
    quote: string,
};

export interface MQuote {
    visible: boolean,
    quote: string
}

/**
 * Wario	- 	Monday 		- 	#FDD50B
 * Waluigi 	- 	Thuseday	- 	#4336f5
 * Toad 	- 	Wednesday 	- 	#0043ea
 * Luigi 	- 	Thursday 	- 	#58f709
 * Mario 	- 	Friday 		- 	#B70225
 * Peach 	- 	Saturday 	- 	#ed55ff
 * Daisy 	- 	Sunday 		- 	#ffbd1b
 */

export enum Weekdays {
	Sunday = 0,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday
}