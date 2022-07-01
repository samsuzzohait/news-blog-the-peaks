interface GuardianSingle {
  response: {
    status: string;
    total: number;
    content: {
      id: string;
      sectionId: string;
      sectionName: string;
      webPublicationDate: string;
      webTitle: string;
      webUrl: string;
      apiUrl: string;
      fields?: {
        body?: string;
        trailText?: string;
        main?: string;
      };
    };
  };
}
export default GuardianSingle;
