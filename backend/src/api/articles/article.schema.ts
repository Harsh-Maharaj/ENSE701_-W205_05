import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/****************************************
 * Type alias: Creating a new name for an existing type.
 * - `ArticleDocument` is equivalent to `HydratedDocument<Article>`.
 * - `Article` refers to the Article class.
 *
 * Document: An instance of a model that represents a single record in a MongoDB collection.
 * - Each individual article in a collection of articles is a document.
 *
 * Hydration: The process of taking raw data (a plain JavaScript object from the database)
 * and turning it into a Mongoose document by adding all the methods and properties defined in
 * the Mongoose schema to this object.
 * - After hydration, the document can call methods like `.save()`, `.remove()`, etc.
 * - This type definition (`ArticleDocument`) ensures that any variable of this type will have all the
 *   properties and methods of a hydrated Article document.
 ****************************************/
export type ArticleDocument = HydratedDocument<Article>; 

/****************************************
 * `@Schema()`: Decorator that marks the class as a schema definition for Mongoose.
 * - It tells Mongoose that this class will be used to define the structure of documents in a MongoDB collection.
 ****************************************/
@Schema()
export class Article {
  @Prop({ required: true })  // Required fields
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  pubyear: number;

  @Prop({ required: true })
  doi: string;

  @Prop({ required: true })
  claim: string;

  @Prop({ required: true })
  evidence: string;

  @Prop({ default: 'submitted' })  // Optional with default
  status: string;

  // Analysis fields (optional)
  @Prop() sePractice: string;
  @Prop() analystClaim: string;
  @Prop() evidenceResult: string;
  @Prop() researchType: string;
  @Prop() participants: string;
  @Prop() researchEvidenceType: string;
  @Prop() keyFindings: string;
  @Prop({ default: false }) peerReviewed: boolean;
  @Prop() publicationType: string;
}


/****************************************
 * `SchemaFactory`: A utility provided by Mongoose to convert a TypeScript class into a Mongoose schema.
 * - It automates the creation of a schema based on the decorators and types defined in the class.
 *
 * `createForClass(Article)`: 
 * - This method takes the `Article` class as an argument and generates a Mongoose schema from it.
 *
 * `ArticleSchema`: 
 * - This constant holds the Mongoose schema that was generated from the `Article` class.
 *
 * You can later use `ArticleSchema` to create a Mongoose model, which allows you to perform operations
 * like creating, reading, updating, and deleting documents in the MongoDB collection that corresponds to the Article schema.
 *
 * Example usage:
 * const ArticleModel = mongoose.model('Article', ArticleSchema);
 ****************************************/
export const ArticleSchema = SchemaFactory.createForClass(Article);
