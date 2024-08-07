export function splitChapters(text: string, id: string, name: string) {
  // Remove new lines and carriage returns
  text = text.replace(/[\r\n]+/g, ' ');

  // Regular expression to match "Chapter" or "CHAPTER" followed by Roman numerals
  const chapterRegex = /(Chapter\s+[IVXLCDM]+|CHAPTER\s+[IVXLCDM]+)/g;
  // Regular expression to detect the stopping condition
  const stopRegex = /END OF THE PROJECT GUTENBERG EBOOK/;

  // Split the text using the regex to capture the chapter headings
  const chapters = text.split(chapterRegex);

  // Initialize an empty object to hold the chapters
  let chapterObj = { id: id, chapters: {}, name: name } as any;

  // Loop through the split text, capturing the chapter headings and their content
  for (let i = 1; i < chapters.length; i += 2) {
    const chapterTitle = chapters[i].trim().split(' ').join('-');
    let chapterContent = chapters[i + 1].trim();

    // Check for the stopping condition
    if (stopRegex.test(chapterContent)) {
      // Extract the content before the stop line
      chapterContent = chapterContent.split(stopRegex)[0].trim();
      chapterObj['chapters'][chapterTitle] = chapterContent;
    } else {
      chapterObj['chapters'][chapterTitle] = chapterContent;
    }
  }

  return chapterObj;
}
