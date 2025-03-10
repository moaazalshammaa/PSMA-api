import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';


@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly connection: Connection,
  ){}

  findAll(paginationQuery: PaginationQueryDto): Promise<Employee[]> {
    const { limit, offset } = paginationQuery;
    return this.employeeRepository.find(
        {
            take: limit,
            skip: offset,
        }
    );
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOne({
        where: {id: +id} 
     });
    if (!employee) { 
        throw new NotFoundException(`Employee #${id} not found`);
    }
    return employee;
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create({
      ...createEmployeeDto
    });
    return this.employeeRepository.save(employee);
  }

  async update(id: string , updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.preload({
      id: +id,
      ...updateEmployeeDto,
    });
    if (!employee){
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return this.employeeRepository.save(employee);
  }
  

  async remove(id: string) {
    const employee = await this.findOne(id);
    return this.employeeRepository.remove(employee);
  }
}
