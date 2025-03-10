import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { StoresService } from './stores.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';


@Controller('stores')
export class StoresController {
    constructor(private readonly storesService: StoresService){}

    @Get()
    findAll(@Query()paginationQuery: PaginationQueryDto){
        return this.storesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.storesService.findOne(id)
    }

    @Post()
    create(@Body() createStoreDto: CreateStoreDto){
        console.log(createStoreDto instanceof CreateStoreDto );
        return this.storesService.create(createStoreDto);
    }

    @Patch(':id')
    update(@Param('id') id: string , @Body() updateStoreDto: UpdateStoreDto) {
        return this.storesService.update(id, updateStoreDto);
    }

     @Delete(':id')
        remove(@Param('id') id: string) {
        return this.storesService.remove(id);
    }
}
