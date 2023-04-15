import { Injectable } from '@nestjs/common';
import { TopicScore } from 'src/interfaces/companies';
import { PrismaService } from '../../database/prisma.service';
import { TopicsScoresRepository } from './topics-scores.repository';

@Injectable()
export class PrismaTopicsScoresRepository implements TopicsScoresRepository {
  constructor(private prisma: PrismaService) {}

  async getTopicsByProgress(progressId: string): Promise<TopicScore[]> {
    return this.prisma.topics_scores.findMany({
      where: {
        progress_id: progressId,
      },
    });
  }

  async createTopic(topicScore: TopicScore): Promise<TopicScore> {
    return this.prisma.topics_scores.create({ data: topicScore });
  }

  async updateTopic(topicScore: TopicScore): Promise<TopicScore> {
    return this.prisma.topics_scores.update({
      where: {
        id: topicScore.id,
      },
      data: topicScore,
    });
  }
}
