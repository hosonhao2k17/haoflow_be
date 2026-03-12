import { Expose } from "class-transformer";




export class TransactionStatRdo {

    @Expose()
    totalBalance: number;

    @Expose()
    totalIncome: number;

    

    @Expose()
    totalExpense: number;

    @Expose()
    totalAccount: number;

    @Expose()
    netBalance: number;

}