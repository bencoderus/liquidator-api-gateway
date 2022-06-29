import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { SuccessResponse } from '../../common/types/rest-response.type';
import { sendResponse } from '../../common/utils/helper.util';
import { ClientService } from '../services/client.service';
import { Client } from '../types/client.type';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('profile')
  public async getProfile(@Auth() client: Client): Promise<SuccessResponse> {
    return sendResponse('Profile retrieved successfully.', client);
  }

  @Get('credentials')
  public async getCredentials(
    @Auth() client: Client,
  ): Promise<SuccessResponse> {
    const profile = await this.clientService.getCredentials(client.code);

    return sendResponse('Credentials retrieved successfully.', profile);
  }

  @Post('webhooks')
  public async updateWebhookUrl(
    @Auth() client: Client,
    @Body() payload: Record<string, any>,
  ): Promise<SuccessResponse> {
    await this.clientService.updateWebhookUrl(client.code, payload);

    return sendResponse('Webhook URL updated successfully.');
  }
}
