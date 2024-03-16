export async function isImageShowableHead(url: string): Promise<boolean> {
  try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && (response.headers.get('content-type')?.startsWith('image/') ?? false);
  } catch (error) {
      return false;
  }
}