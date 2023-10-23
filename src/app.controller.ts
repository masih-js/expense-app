import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const wantToShow = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    if (!wantToShow) return 'Sorry, there is no result for your search';
    return wantToShow;
  }

  @Post()
  createReport(
    @Body() { source, amount }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);

    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('id') id: string,
    @Body() { source, amount }: { source: string; amount: number },
  ) {
    const findingTheData = data.report.find((report) => report.id === id);

    if (findingTheData) {
      findingTheData.amount = amount;
      findingTheData.source = source;
      return {
        message: 'updated',
        findingTheData,
      };
    } else {
      return 'There is no data with this id';
    }
  }

  @Delete(':id')
  deleteReport() {
    return 'delete';
  }
}
