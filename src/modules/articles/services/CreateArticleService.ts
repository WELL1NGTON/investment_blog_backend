import Article, { IArticle } from "@shared/models/article.model";

interface IRequest {
  title: string;
  description: string;
  markdownArticle: string;
  author: string;
  state: "EDITING" | "PUBLISHED" | "DELETED";
  visibility: "ALL" | "EDITORS" | "USERS";
  dateStr?: string;
  category?: string;
  tags: string[];
}

interface IResponse {
  msg: string;
  article: IArticle;
}

class CreateArticleService {
  public async execute({
    title,
    description,
    markdownArticle,
    author,
    state,
    visibility,
    category,
    dateStr,
    tags,
  }: IRequest): Promise<IResponse> {
    let date = new Date(Date.now());
    if (dateStr) date = new Date(Number(dateStr));

    const newArticle = new Article({
      title,
      description,
      markdownArticle,
      date,
      tags,
      author,
      state,
      visibility,
      category,
      // previewImg: imgUrl
    });

    const articleSaved = await newArticle.save();

    //const updateCategories = new UpdateCategoriesService();

    // const updatedCategories =
    // await updateCategories.execute({
    //   newTags: tags,
    //   oldTags: [],
    // });

    return { msg: `Artigo salvo com sucesso.`, article: articleSaved };
  }
}

export default CreateArticleService;
