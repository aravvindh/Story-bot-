export interface StoryData {
  story: string;
  example: string;
}

export type ApiResponse = {
  type: 'story';
  data: StoryData;
} | {
  type: 'greeting';
  data: {
    greeting: string;
  };
};
