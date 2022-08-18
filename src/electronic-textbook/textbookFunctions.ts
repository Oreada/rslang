import { getWords } from "../components/api/api";
import { storage } from "../storage/storage";

export async function updateTextbook(group: string, page: string) {
  const words = await getWords(group, page);
  
  storage.currentPage = words;
  storage.chapterCount = group;
  storage.pageCount = page;
}