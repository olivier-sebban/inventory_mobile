export default defineEventHandler(
  async (e) => {
    const pages = await Promise.all([
      {
        _path: "/accueil",
        modifiedAt: new Date(),
      },
      {
        _path: "/demander-un-devis",
        modifiedAt: new Date(),
      },
      {
        _path: "/regler-mon-demenagement",
        modifiedAt: new Date(),
      },
      {
        _path: "/calculer-mon-volume",
        modifiedAt: new Date(),
      },
      {
        _path: "/service-client",
        modifiedAt: new Date(),
      },
      {
        _path: "/contact",
        modifiedAt: new Date(),
      },
    ]);
    return pages.map((p) => {
      return {
        loc: p._path,
        lastmod: p.modifiedAt,
      };
    });
  }
);
