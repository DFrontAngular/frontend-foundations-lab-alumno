export type Parser<T> = (value: unknown) => T;

export interface Page<T> {
  items: T[];
  meta: {
    page: number;
    total: number;
    totalPages: number;
  };
}

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiContractError extends Error {
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, options);
    this.name = 'ApiContractError';
  }
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  options: { parser: Parser<T>; init?: RequestInit; fetcher?: typeof fetch }
): Promise<T> {
  const fetcher = options.fetcher ?? fetch;
  const response = await fetcher(input, options.init);
  // TODO: rechaza HTTP no satisfactorio y valida el JSON mediante options.parser.
  return response.json() as Promise<T>;
}

export function parsePage<T>(itemParser: Parser<T>): Parser<Page<T>> {
  // TODO: valida la forma de la pagina y delega cada item en itemParser.
  return () => {
    throw new ApiContractError('Parser de pagina no implementado.');
  };
}
