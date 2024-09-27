import e from 'express';

export type Dictionary<T> = {
  [key: string]: T;
};

export interface NovelName {
  name: string;
  id: string;
}

export interface ChapterContent {
  chapterTitle: string;
  content: string;
  chapterId: string;
}

export interface ChapterSummary {
  chapterTitle: string;
  summary: string;
  chapterId: string;
}

export interface ChapterStage {
  stage: string;
  chapterId: string;
}

export interface Scene {
  content: string;
  sceneId: string;
}

export interface Novel {
  id: string;
  name: string;
  chapters: Dictionary<ChapterContent>;
}

export interface FinalChapter
  extends ChapterContent,
    ChapterSummary,
    ChapterStage {
  scenes: Dictionary<Scene>;
}

export interface FinalNovel {
  id: string;
  name: string;
  chapters: Dictionary<FinalChapter>;
}
