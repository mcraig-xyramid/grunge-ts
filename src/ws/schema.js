import path from "path";
import url from "url";
import { fileURLToPath } from "url";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typedefFiles = path.join(__dirname, "resolvers/**/*.graphql");
const typedefsArray = await loadFiles(typedefFiles);
const typeDefs = mergeTypeDefs(typedefsArray);

const schemaPromise = (async () => {
  const resolverFiles = path.join(__dirname, "resolvers/**/*.js");
  const resolversArray = await loadFiles(resolverFiles, {
    requireMethod: async (filePath) => {
      return (await import(url.pathToFileURL(filePath))).default;
    },
  });

  const resolvers = mergeResolvers(resolversArray);

  return makeExecutableSchema({ typeDefs, resolvers });
})();

export { schemaPromise };
