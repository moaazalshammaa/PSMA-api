import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeController,Employee , EmployeeService, Event])],
  controllers: [EmployeeController],
  providers: [EmployeeService , Employee],
})
export class EmployeeModule {}
