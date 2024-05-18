const convertUrlToImageFile = async (url:string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const fileName = url.split('/').pop();
  const extend = url.split('.').pop();
  const meta = { type : `image/${extend}` }

  return new File([data], fileName as string, meta);
}

export const convertUrlsToImageFiles = async (urls:string[]) => {
  const files:File[] = [];

  for(const url of urls) {
    const file = await convertUrlToImageFile(url);
    files.push(file);
  }

  return files;
}