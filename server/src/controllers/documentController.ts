import DocumentDAO from "../dao/documentDAO";

class DocumentController {
  private documentDAO: DocumentDAO;

  constructor() {
    this.documentDAO = new DocumentDAO();
  }

  async getDocuments(): Promise<any> {
    return this.documentDAO.getDocuments();
  }

  async createDocument(title: string, description: string): Promise<any> {
    return this.documentDAO.createDocument(title, description);
  }
}

export default DocumentController;
