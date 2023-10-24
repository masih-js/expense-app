import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportservice: ReportService) {}

  calculateSummary() {
    const allExpense = this.reportservice
      .getAllReports(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0);
    const allIncome = this.reportservice
      .getAllReports(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);

    return {
      totalIncome: allExpense,
      totalExpense: allIncome,
      netIncome: allIncome - allExpense,
    };
  }
}
