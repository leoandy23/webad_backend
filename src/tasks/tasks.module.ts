// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ProjectsModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module';
import { TaskAssignmentsModule } from 'src/task-assignments/task-assignments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    ProjectsModule,
    UsersModule,
    TaskAssignmentsModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TypeOrmModule],
})
export class TasksModule {}
