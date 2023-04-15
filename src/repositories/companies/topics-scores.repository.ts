import { TopicScore } from 'src/interfaces/companies';

export abstract class TopicsScoresRepository {
  abstract getTopicsByProgress(progressId: string): Promise<TopicScore[]>;
  abstract createTopic(topicScore: TopicScore): Promise<TopicScore>;
  abstract updateTopic(topicScore: TopicScore): Promise<TopicScore>;
}
