

export class RangeRdo {

    
    startDate?: Date;

    endDate?: Date;

    limit: number;

    constructor(startDate?: Date, endDate?: Date, limit: number = 1000) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.limit = limit;
    }

}