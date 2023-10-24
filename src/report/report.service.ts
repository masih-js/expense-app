import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { reportResponseDto } from 'src/dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): reportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new reportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): reportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new reportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: Report,
  ): reportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);

    return new reportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): reportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return new reportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);

    return;
  }
}
