import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Pagination } from '../../common/decorators/pagination.decorator';
import { PaginationData } from '../../common/types/pagination.type';
import { SuccessResponse } from '../../common/types/rest-response.type';
import { sendResponse } from '../../common/utils/helper.util';
import { ClientService } from '../services/client.service';

@Controller('clients')
export class ClientAdminController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  public async getClients(
    @Pagination() paginationData: PaginationData,
  ): Promise<SuccessResponse> {
    const clients = await this.clientService.getClients(paginationData);

    return sendResponse('Clients retrieved successfully.', clients);
  }

  @Post('/')
  public async createClient(@Body() body: any): Promise<SuccessResponse> {
    const clients = await this.clientService.createClient(body);

    return sendResponse('Clients retrieved successfully.', clients);
  }

  @Patch(':code/status')
  public async updateClientStatus(
    @Param('code') code: string,
    @Body() body: any,
  ): Promise<SuccessResponse> {
    const clients = await this.clientService.updateClientStatus(code, body);

    return sendResponse('Clients retrieved successfully.', clients);
  }

  @Get(':code')
  public async getClient(
    @Param('code') code: string,
  ): Promise<SuccessResponse> {
    const client = await this.clientService.getClient(code);

    return sendResponse('Clients retrieved successfully.', client);
  }
}
