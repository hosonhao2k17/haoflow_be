


export class Week {

    monday: number;//percent
    tueday: number;//percent
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
}

export class Month {
    [key: string]: number; // day1..day31, percent
}

export class Year {
    january: number;  
    february: number;  
    march: number;    
    april: number;     
    may: number;       
    june: number;     
    july: number;     
    august: number;   
    september: number; 
    october: number;   
    november: number;  
    december: number;  
}


export class DailyPlanStats {
    week: Week;
    month: Month;
    year: Year
}