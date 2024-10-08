import { Controller, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { AdminService } from './admin-service';
import { Article } from '../articles/article.schema';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Route to fetch all articles for admin
  @Get()
  async getAllArticles(): Promise<Article[]> {
    return this.adminService.findAll();  // You need to define this service method
  }

  // Route to update an article
  @Patch(':id')
  async updateArticle(@Param('id') id: string, @Body() updateData: any) {
    return this.adminService.updateArticle(id, updateData);
  }

  // Route to delete an article
  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return this.adminService.deleteArticle(id);
  }
}
