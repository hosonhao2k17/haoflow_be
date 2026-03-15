import { ExposeField } from "src/decorators/field.decorator";

export class TransactionStatRdo {

    @ExposeField()
    totalBalance: number;

    @ExposeField()
    totalIncome: number;

    @ExposeField()
    totalExpense: number;

    @ExposeField()
    totalAccount: number;

    @ExposeField()
    netBalance: number;

}