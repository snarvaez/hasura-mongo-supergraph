import { AxiosResponse } from 'axios';
import axios from 'axios';

interface EmbeddingResponse {
  embedding: number[];
  model: string;
  status: string;
}

/**
 * retrieveVectors
 *
 * @param text The string to vectorise
 * @returns Vectorised string
 * @readonly This function should only query data without making modifications
 * @paralleldegree 5
 */
export async function searchMoviesWithVectors(text: string): Promise<EmbeddingResponse> {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  try {
    // Generate embedding for the search text
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`,
    };

    const payload = {
      input: text,
      model: 'text-embedding-ada-002',
    };

    const response: AxiosResponse<any> = await axios.post(
      'https://api.openai.com/v1/embeddings',
      payload,
      { headers }
    );

    const embeddingData = response.data;
    const embedding = embeddingData.data[0].embedding;
    const modelName = embeddingData.model;

    return {
      embedding,
      model: modelName,
      status: 'success',
    };
  } catch (error) {
    console.error(`Error performing semantic search: ${error}`);
    return {
      embedding: [],
      model: '',
      status: 'failure',
    };
  }
}