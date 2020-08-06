export default interface GalleryItemInterface {
    title: string;
    nestedGallery: boolean;
    slug: string;
    //   images?: { fields: { file: { url: string }, title: string };
    frontImage?: string;
    images?: string[];
    nestedGalleryItems?: Array<{
      title: string;
      images: string[];
    }>;
}