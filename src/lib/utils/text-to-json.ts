import { Novel, ChapterContent, Dictionary } from '@/lib/definitions';
export function splitChapters(text: string, id: string, name: string) {
  // Remove new lines and carriage returns
  text = text.replace(/[\r\n]+/g, ' ');

  // Regular expression to match "Chapter" or "CHAPTER" followed by Roman numerals
  const chapterRegex = /(Chapter\s+[IVXLCDM]+|CHAPTER\s+[IVXLCDM]+)/g;
  // Regular expression to detect the stopping condition
  const stopRegex = /END OF THE PROJECT GUTENBERG EBOOK/;

  // Split the text using the regex to capture the chapter headings
  // to do: check if it is working, then take alternate routes if not.
  const initialChapters = text.split(chapterRegex);

  // Initialize an empty object to hold the chapters
  let chapterObj: Novel = { id: id, chapters: {}, name: name };

  // Loop through the split text, capturing the chapter headings and their content
  for (let i = 1; i < initialChapters.length; i += 2) {
    const chapterTitle = initialChapters[i].trim().split(' ').join('-');
    let chapterContent = initialChapters[i + 1].trim();

    // Check for the stopping condition
    if (stopRegex.test(chapterContent)) {
      // Extract the content before the stop line
      chapterContent = chapterContent.split(stopRegex)[0].trim();
      chapterObj['chapters'][chapterTitle] = {
        chapterTitle: chapterTitle,
        chapterId: '',
        content: chapterContent,
      };
    } else {
      chapterObj['chapters'][chapterTitle] = {
        chapterTitle: chapterTitle,
        chapterId: '',
        content: chapterContent,
      };
    }
  }

  const processedChapters = addChapterNumber(chapterObj.chapters);
  chapterObj.chapters = processedChapters;

  return chapterObj;
}

// loop through chapters and add chapter number

function addChapterNumber(
  chapters: Dictionary<ChapterContent>
): Dictionary<ChapterContent> {
  let chapterNumber = 1;
  const updatedChapters: Dictionary<ChapterContent> = {};

  for (let chapter in chapters) {
    const id = chapterNumber.toString();
    chapters[chapter].chapterId = id;
    updatedChapters[id] = chapters[chapter];
    chapterNumber++;
  }

  return updatedChapters;
}
