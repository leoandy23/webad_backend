import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({ relations: ['created_by'] });
  }

  async findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOne({
      where: { id: id },
      relations: ['created_by'],
    });
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const user = await this.usersRepository.findOne({
      where: { id: createProjectDto.created_by },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const newProject = this.projectsRepository.create({
      ...createProjectDto,
      created_by: user,
    });
    return this.projectsRepository.save(newProject);
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.projectsRepository.update(id, updateProjectDto);
    return this.projectsRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
  async findRecentProjects(userId: number): Promise<Project[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.projectsRepository.find({
      where: { created_by: { id: user.id } },
      order: { created_at: 'DESC' },
      take: 2,
    });
  }

  // Metodo para buscar los proyectos de un usuario
  async findUserProjects(userId: number): Promise<Project[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      order: { created_at: 'DESC' },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.projectsRepository.find({
      where: { created_by: { id: user.id } },
    });
  }
}
