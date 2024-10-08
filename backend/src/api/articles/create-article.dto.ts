import { IsString, IsArray, IsNumber } from 'class-validator';

/****************************************
 * DTO (Data Transfer Object): 
 * - Used in the application layer, often in controllers and services, to validate and transfer data between different parts of the application.
 * - When you receive a request to create a new article, you use this DTO to validate that the incoming data has the correct structure and types.
 * - Think of the DTO as a "validation door" that the incoming data must pass through before it can be used.
 * 
 * **Difference Between Schema and DTO:**
 * 
 * - **Schema:**
 *   - Defines the structure of a document in a MongoDB collection.
 *   - Used in the data layer and directly tied to the database.
 *   - Example: In the `Article` schema, `title` must be a string and is required when saving to the database.
 * 
 * - **DTO (Data Transfer Object):**
 *   - Validates and transfers data within the application, especially when handling requests in controllers.
 *   - Used in the application layer, typically in controllers and services.
 *   - Example: In this `CreateArticleDto`, `title` is validated to ensure it's a string before processing the request.
 *   - Only if the data passes through the "validation door" (i.e., it meets the DTO's rules), it can then be used to create a new record in the database.
 * 
 * Example of data passing through the "validation door":
 * ```typescript
 * const newArticle = {
 *   title: "Understanding DTOs",
 *   authors: ["John Doe", "Jane Smith"],
 *   source: "Tech Journal",
 *   pubyear: 2024,
 *   doi: "10.1234/techjournal.2024.dto",
 *   claim: "DTOs simplify data validation",
 *   evidence: "Numerous case studies support this"
 * };
 * ```
 ****************************************/
export class CreateArticleDto {
  
  /****************************************
   * `@IsString()`:
   * - Validates that the `title` field is a string.
   ****************************************/
  @IsString()
  readonly title: string;

  /****************************************
   * `@IsArray()`:
   * - Validates that the `authors` field is an array.
   ****************************************/
  @IsArray()
  readonly authors: string[];

  /****************************************
   * `@IsString()`:
   * - Validates that the `source` field is a string.
   ****************************************/
  @IsString()
  readonly source: string;

  /****************************************
   * `@IsNumber()`:
   * - Validates that the `pubyear` field is a number.
   ****************************************/
  @IsNumber()
  readonly pubyear: number;

  /****************************************
   * `@IsString()`:
   * - Validates that the `doi` field is a string.
   ****************************************/
  @IsString()
  readonly doi: string;

  /****************************************
   * `@IsString()`:
   * - Validates that the `claim` field is a string.
   ****************************************/
  @IsString()
  readonly claim: string;

  /****************************************
   * `@IsString()`:
   * - Validates that the `evidence` field is a string.
   ****************************************/
  @IsString()
  readonly evidence: string;
}
